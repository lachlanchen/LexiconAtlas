import { DatabaseSync } from 'node:sqlite';
import { createHash } from 'node:crypto';
import { createReadStream, existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';

const [inputArg, outputArg] = process.argv.slice(2);
if (!inputArg || !outputArg) {
  console.error('Usage: node scripts/export-public.mjs SOURCE.sqlite3 OUTPUT.sqlite3');
  process.exit(1);
}
const input = resolve(inputArg);
const output = resolve(outputArg);
if (input === output || existsSync(output)) throw new Error('Output must be a new file, separate from the source.');
const manifestPath = output.replace(/\.sqlite3$/i, '') + '.manifest.json';
const sumsPath = resolve(dirname(output), 'SHA256SUMS');
if (existsSync(manifestPath) || existsSync(sumsPath)) throw new Error('Manifest or SHA256SUMS already exists; use a new release directory.');
mkdirSync(dirname(output), { recursive: true });

const quote = value => '"' + value.replaceAll('"', '""') + '"';
const digest = value => createHash('sha256').update(value).digest('hex');
const opaque = value => value ? 'sha256:' + digest(String(value)) : '';
const safeReference = value => /(?:^[A-Za-z]:[\\/]|^[/\\]|[\\]|(?:^|\/)Users\/|(?:^|\/)home\/|:\/\/)/i.test(String(value)) ? opaque(value) : value;
const columns = {
  entities: ['entity_id', 'entity_type', 'canonical_key', 'label', 'status', 'quality_score', 'created_at', 'updated_at'],
  terms: ['entity_id', 'language', 'text', 'normalized', 'kind'],
  morphemes: ['entity_id', 'language', 'form', 'normalized', 'kind', 'meaning'],
  historical_forms: ['entity_id', 'language', 'form', 'normalized', 'period_label', 'date_min', 'date_max', 'meaning'],
  history_events: ['entity_id', 'subject_entity_id', 'event_type', 'language', 'period_label', 'date_min', 'date_max', 'description'],
  meanings: ['entity_id', 'subject_entity_id', 'term_id', 'language', 'definition', 'part_of_speech', 'register_label', 'domain_label', 'sense_order'],
  translations: ['entity_id', 'source_term_id', 'source_meaning_id', 'target_language', 'target_term_id', 'text', 'normalized', 'transliteration'],
  pronunciations: ['entity_id', 'term_id', 'language', 'system', 'reading', 'dialect'],
  phoneme_segments: ['segment_id', 'pronunciation_id', 'ordinal', 'grapheme', 'phoneme', 'syllable', 'color_key'],
  term_morphemes: ['term_id', 'morpheme_id', 'ordinal', 'surface', 'confidence', 'basis'],
  entity_edges: ['edge_id', 'source_entity_id', 'target_entity_id', 'relation', 'basis', 'confidence', 'status', 'created_at', 'updated_at'],
  relation_assertions: ['assertion_id', 'subject_entity_id', 'source_entity_id', 'target_entity_id', 'relation', 'basis', 'confidence', 'status', 'revision', 'created_at', 'updated_at'],
  evidence_records: ['evidence_id', 'corpus_id', 'source_entry_id', 'source_hash', 'locator'],
  entity_evidence: ['entity_id', 'evidence_id', 'claim', 'confidence'],
  assertion_evidence: ['assertion_id', 'evidence_id'],
};
const lexicalTypes = new Set(['term', 'morpheme', 'historical-form', 'history-event', 'meaning', 'translation', 'pronunciation']);
const source = new DatabaseSync(input, { readOnly: true });
const target = new DatabaseSync(output);
const counts = {};
const omittedRows = {};
let manifest;

try {
  source.exec('PRAGMA query_only=ON; BEGIN');
  target.exec('PRAGMA journal_mode=DELETE; PRAGMA foreign_keys=OFF; BEGIN IMMEDIATE');
  const ordinary = new Set(source.prepare('PRAGMA table_list').all()
    .filter(row => row.schema === 'main' && row.type === 'table').map(row => row.name));
  const tables = source.prepare("SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND sql IS NOT NULL").all()
    .filter(row => ordinary.has(row.name));
  const names = new Set(tables.map(row => row.name));
  for (const table of tables) target.exec(table.sql);
  for (const required of ['entities', 'terms', 'morphemes', 'entity_edges']) {
    if (!names.has(required)) throw new Error('Missing required LKT table: ' + required);
  }

  const parentQueries = new Map();
  const parentExists = (table, column, value) => {
    if (value === null || value === undefined) return true;
    const key = table + '.' + column;
    if (!parentQueries.has(key)) parentQueries.set(key, target.prepare(`SELECT 1 FROM ${quote(table)} WHERE ${quote(column)}=? LIMIT 1`));
    return Boolean(parentQueries.get(key).get(value));
  };
  let neededEvidence;
  for (const [table, fields] of Object.entries(columns)) {
    if (!names.has(table)) continue;
    const available = new Set(source.prepare(`PRAGMA table_info(${quote(table)})`).all().map(row => row.name));
    const selected = fields.filter(field => available.has(field));
    const foreignKeys = source.prepare(`PRAGMA foreign_key_list(${quote(table)})`).all();
    const insert = target.prepare(`INSERT INTO ${quote(table)} (${selected.map(quote).join(',')}) VALUES (${selected.map(() => '?').join(',')})`);
    counts[table] = 0;
    omittedRows[table] = 0;
    if (table === 'evidence_records') {
      neededEvidence = new Set();
      if (names.has('entity_evidence')) {
        for (const row of source.prepare('SELECT entity_id, evidence_id FROM entity_evidence').iterate()) {
          if (parentExists('entities', 'entity_id', row.entity_id)) neededEvidence.add(row.evidence_id);
        }
      }
      if (names.has('assertion_evidence')) {
        for (const row of source.prepare('SELECT assertion_id, evidence_id FROM assertion_evidence').iterate()) {
          if (parentExists('relation_assertions', 'assertion_id', row.assertion_id)) neededEvidence.add(row.evidence_id);
        }
      }
    }
    for (const row of source.prepare(`SELECT ${selected.map(quote).join(',')} FROM ${quote(table)}`).iterate()) {
      if ((table === 'entities' && !lexicalTypes.has(row.entity_type)) ||
          (table === 'evidence_records' && !neededEvidence.has(row.evidence_id)) ||
          foreignKeys.some(fk => !parentExists(fk.table, fk.to, row[fk.from]))) {
        omittedRows[table]++;
        continue;
      }
      if (table === 'entity_evidence') row.claim = opaque(row.claim);
      if (table === 'evidence_records') {
        for (const field of ['corpus_id', 'source_entry_id', 'locator']) row[field] = safeReference(row[field]);
      }
      insert.run(...selected.map(field => row[field]));
      counts[table]++;
    }
  }

  const indexes = [
    'CREATE INDEX IF NOT EXISTS atlas_edge_source ON entity_edges(source_entity_id)',
    'CREATE INDEX IF NOT EXISTS atlas_edge_target ON entity_edges(target_entity_id)',
    'CREATE INDEX IF NOT EXISTS atlas_entity_type ON entities(entity_type, status)',
  ];
  if (names.has('relation_assertions')) indexes.push(
    'CREATE INDEX IF NOT EXISTS atlas_assertion_source ON relation_assertions(source_entity_id)',
    'CREATE INDEX IF NOT EXISTS atlas_assertion_target ON relation_assertions(target_entity_id)'
  );
  for (const sql of indexes) target.exec(sql);
  const foreignErrors = target.prepare('PRAGMA foreign_key_check').all();
  if (foreignErrors.length) throw new Error('Export has foreign-key errors: ' + JSON.stringify(foreignErrors.slice(0, 5)));
  const integrity = target.prepare('PRAGMA quick_check').all();
  if (integrity.length !== 1 || Object.values(integrity[0])[0] !== 'ok') throw new Error('Export failed SQLite integrity check');
  const languages = {};
  for (const [table, field] of [['terms', 'language'], ['meanings', 'language'], ['translations', 'target_language'], ['morphemes', 'language'], ['historical_forms', 'language']]) {
    if (names.has(table)) languages[table] = target.prepare(`SELECT ${quote(field)} AS language, count(*) AS records FROM ${quote(table)} GROUP BY ${quote(field)} ORDER BY records DESC`).all();
  }
  manifest = {
    format: 'lkt-lexical-public-snapshot-v1',
    createdAt: new Date().toISOString(),
    file: basename(output),
    readOnlyUse: true,
    sourceProject: 'https://github.com/lachlanchen/LocalKnowledgeTerminal',
    explorerProject: 'https://github.com/lachlanchen/LexiconAtlas',
    counts,
    omittedRows,
    entityTypes: target.prepare('SELECT entity_type, count(*) AS records FROM entities GROUP BY entity_type ORDER BY records DESC').all(),
    statuses: target.prepare('SELECT status, count(*) AS records FROM entities GROUP BY status ORDER BY records DESC').all(),
    languages,
    emptyTables: tables.map(row => row.name).filter(name => !(name in counts)).sort(),
    exclusions: ['book excerpts', 'OCR text', 'question/answer and grammar content', 'inquiry/chat history', 'job records and artifacts', 'arbitrary JSON payloads', 'free-text evidence claims', 'private paths in source-reference fields'],
    integrity: { sqliteQuickCheck: 'ok', foreignKeyViolations: 0 },
    limitations: ['Not an operational LKT backup.', 'Draft and accepted records can contain factual errors.', 'Short source-derived definitions remain; upstream rights are not relicensed.'],
  };
  target.exec('COMMIT');
  source.exec('COMMIT');
} catch (error) {
  try { target.exec('ROLLBACK'); } catch {}
  throw error;
} finally {
  target.close();
  source.close();
}

const hash = createHash('sha256');
for await (const chunk of createReadStream(output)) hash.update(chunk);
manifest.sha256 = hash.digest('hex');
manifest.bytes = statSync(output).size;
const manifestText = JSON.stringify(manifest, null, 2) + '\n';
writeFileSync(manifestPath, manifestText, { flag: 'wx' });
writeFileSync(sumsPath, `${manifest.sha256}  ${basename(output)}\n${digest(manifestText)}  ${basename(manifestPath)}\n`, { flag: 'wx' });
console.log(JSON.stringify({ file: output, bytes: manifest.bytes, sha256: manifest.sha256, counts, integrity: manifest.integrity }, null, 2));
