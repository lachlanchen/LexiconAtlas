# English word knowledge graph dataset

**[Download the latest release](https://github.com/lachlanchen/LexiconAtlas/releases/latest)**

This is the lexical portion of a real Local Knowledge Terminal graph, prepared
from local dictionary/book retrieval and local language-model output. It has
incomplete coverage and potentially incorrect claims.

## Release files

| File | Purpose |
| --- | --- |
| `english-word-graph.sqlite3` | Database readable directly by Atlas |
| `english-word-graph.manifest.json` | Export time, counts, coverage, omissions, checksum |
| `SHA256SUMS` | SHA-256 checksums of the database and manifest |

Use Node.js 24 or later and set `LKT_GRAPH_DB` to the downloaded database path.
No account, cloud inference, or external database server is required.

## Knowledge model

Every lexical node has a stable `entity_id` in `entities`. Typed tables add its
linguistic attributes. Equal labels can represent different languages, senses,
roles, or historical forms: display labels are not global identities.

| Tables | Contents |
| --- | --- |
| `entities`, `terms` | Words, languages, lifecycle status, quality metadata |
| `morphemes`, `term_morphemes` | Roots, affixes, free parts, decomposition |
| `historical_forms`, `history_events` | Historical forms, periods, recorded changes |
| `meanings`, `translations` | Subject-linked senses and multilingual translations |
| `pronunciations`, `phoneme_segments` | Readings and sound segments |
| `entity_edges` | Materialized, directed, typed relationships |
| `relation_assertions` | Subject-scoped assertions and confidence |
| `evidence_records`, `entity_evidence`, `assertion_evidence` | Source identifiers and links, without book passages |

Other source-schema tables remain empty for read-only application compatibility.
This is **not** an operational backup from which to resume LKT jobs.

Edges and assertions can describe the same relationship. Atlas groups matching
source/target/relation/status records for display while retaining their original
identities. Do not sum their row counts as unique semantic relationships.

## What is excluded

- Original books, dictionaries, indexes, model weights, and runtime files.
- Question/answer and grammar-analysis entities.
- Book excerpts, OCR passages, and free-text evidence claims.
- Inquiry/chat history, model prompts, artifacts, revisions, and worker jobs.
- Arbitrary entity, edge, assertion, and evidence JSON payloads.
- Private filesystem locations in source-reference fields.

Evidence claim text is replaced with a stable hash. Source-reference fields that
look like filesystem paths are also hashed. References remain stored identifiers,
not generated citations. Excerpt inspection requires the private working snapshot.

The exporter creates a **new** database from allowlisted columns, rather than
deleting sensitive rows and leaving their bytes in free pages. It retains all
lexical statuses; Atlas hides archived/rejected records by default.

## Integrity and coverage

Export checks SQLite integrity and foreign-key consistency and records counts,
node types, languages, and statuses. Structural checks do **not** prove factual
correctness. Language coverage is uneven; words can lack translations or history.
Do not infer verified etymology from proximity, layout, confidence, or an edge.

Verify the database in PowerShell and compare with the manifest or `SHA256SUMS`:

```powershell
Get-FileHash data/english-word-graph.sqlite3 -Algorithm SHA256
```

The checksum detects accidental corruption; it is not an independent signature.

## Export your own snapshot

```powershell
node scripts/export-public.mjs "C:\path\to\knowledge.sqlite3" "releases\english-word-graph.sqlite3"
```

Use a consistent snapshot, such as one created by `npm run sync`. The output must
not already exist. The script writes a manifest and checksums beside it. Publish
these as release assets, outside Git.

Only publish source-derived text you are entitled to share. Short definitions and
linguistic descriptions remain; excluding book passages does not automatically
resolve every upstream licensing question. This repo grants no blanket license
to third-party source material.

[LKT](https://github.com/lachlanchen/LocalKnowledgeTerminal) owns the working graph
and local-LLM enrichment. Atlas consumes a snapshot. Future releases can expose
later repairs, but this database does not grow on its own and does not imply
that all upstream repair work is complete.
