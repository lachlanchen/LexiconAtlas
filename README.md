[English](README.md) · [العربية](i18n/README.ar.md) · [Español](i18n/README.es.md) · [Français](i18n/README.fr.md) · [日本語](i18n/README.ja.md) · [한국어](i18n/README.ko.md) · [Tiếng Việt](i18n/README.vi.md) · [中文 (简体)](i18n/README.zh-Hans.md) · [中文（繁體）](i18n/README.zh-Hant.md) · [Deutsch](i18n/README.de.md) · [Русский](i18n/README.ru.md)

[![LazyingArt banner](https://github.com/lachlanchen/lachlanchen/raw/main/figs/banner.png)](https://github.com/lachlanchen/lachlanchen/blob/main/figs/banner.png)

# Lexicon Atlas

*Explore the roots, forms, meanings, and translations of words as a local three-dimensional knowledge graph.*

[![Release](https://img.shields.io/github/v/release/lachlanchen/LexiconAtlas?label=dataset)](https://github.com/lachlanchen/LexiconAtlas/releases/latest)
[![Node.js 24+](https://img.shields.io/badge/Node.js-24%2B-339933?logo=nodedotjs&logoColor=white)](package.json)
[![Local first](https://img.shields.io/badge/runtime-local--first-D5F879)](docs/DATASET.md)
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-GitHub-%23ea4aaa?logo=githubsponsors&logoColor=white)](https://github.com/sponsors/lachlanchen)

Lexicon Atlas is a read-only browser for a real lexical graph prepared by
[Local Knowledge Terminal](https://github.com/lachlanchen/LocalKnowledgeTerminal).
It turns words, morphemes, recorded historical forms, meanings, pronunciations,
translations, assertions, and source references into a network that can be searched
and inspected without sending the collection to a cloud service.

| Donate | PayPal | Stripe |
| --- | --- | --- |
| [![Donate](https://img.shields.io/badge/Donate-LazyingArt-0EA5E9?style=for-the-badge&logo=kofi&logoColor=white)](https://chat.lazying.art/donate) | [![PayPal](https://img.shields.io/badge/PayPal-RongzhouChen-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/RongzhouChen) | [![Stripe](https://img.shields.io/badge/Stripe-Donate-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://buy.stripe.com/aFadR8gIaflgfQV6T4fw400) |

[![Actual Lexicon Atlas desktop view](docs/images/atlas-desktop.png)](https://github.com/lachlanchen/LexiconAtlas/releases/latest)

*An actual application screenshot from the local working snapshot; it is not a generated mockup. The public release has a smaller, deliberately filtered dataset.*

## What it shows

- Search words and labels, then follow directed relationships through one-, two-, or three-hop neighborhoods.
- Inspect roots, prefixes, suffixes, historical forms, meanings, pronunciations, translations, confidence, lifecycle status, and stored source identifiers when present.
- Filter by node type, language, evidence basis, and status; switch between spatial and planar layouts.
- Export the currently visible subgraph as JSON.
- Render the force layout in a Web Worker and display nodes and links with Three.js.
- Adapt the same interface to desktop and narrow screens.

Lexicon Atlas visualizes stored claims; it does not infer a word history from spatial
proximity. LKT owns ingestion, retrieval, local-model enrichment, and repair. Atlas
does not call a cloud model, generate citations, or write back to the working graph.

## Current public snapshot

[v0.1.0](https://github.com/lachlanchen/LexiconAtlas/releases/tag/v0.1.0),
published 2026-09-05, provides a dated SQLite database, manifest, and SHA-256 list.
The manifest reports:

| Record | Count | Record | Count |
| --- | ---: | --- | ---: |
| Entities | 15,925 | Terms | 9,484 |
| Morphemes | 1,573 | Historical forms | 404 |
| Meanings | 2,180 | Translations | 847 |
| Pronunciations | 1,046 | Typed entity edges | 15,197 |
| Relation assertions | 9,255 | Evidence records | 13,431 |

English is the main term language; Chinese, Japanese, French, and Arabic are also
represented, with uneven coverage. `accepted` is a pipeline state, not a guarantee
of factual or linguistic accuracy. Missing senses, sparse histories, duplicates,
and incorrect links remain possible.

## Architecture and boundaries

```text
Local books and dictionaries
            |
       Retrieval / RAG
            |
     Local LLM preparation
            |
  LKT typed knowledge graph
            |
   Read-only SQLite snapshot
            |
       Lexicon Atlas
```

The server binds to localhost. After the source, dependencies, and database have
been downloaded, normal exploration is local. Releases are fixed snapshots rather
than a live-growing service, and Atlas does not replace the private LKT working
database.

## Repository map

| Path | Purpose |
| --- | --- |
| `src/main.js` | Search, filtering, inspection, and responsive controls |
| `src/scene.js` | WebGL graph rendering and interaction |
| `src/layout.worker.js` | Three-dimensional force layout in a worker |
| `lib/snapshot.mjs` | Read-only SQLite queries and graph projection |
| `server.mjs` | Localhost API and static asset server |
| `scripts/export-public.mjs` | Allowlisted graph-only snapshot export |
| `scripts/sync-pi.mjs` | Consistent remote SQLite backup workflow |
| `docs/DATASET.md` | Schema, exclusions, verification, and rights notes |

## Quick start

Requires Git and **Node.js 24 or later**.

Windows PowerShell:

```powershell
git clone https://github.com/lachlanchen/LexiconAtlas.git
cd LexiconAtlas
npm ci
npm run build
New-Item -ItemType Directory -Force data | Out-Null
Invoke-WebRequest "https://github.com/lachlanchen/LexiconAtlas/releases/latest/download/english-word-graph.sqlite3" -OutFile "data/english-word-graph.sqlite3"
$env:LKT_GRAPH_DB = (Resolve-Path "data/english-word-graph.sqlite3").Path
npm start
```

Linux or macOS:

```bash
git clone https://github.com/lachlanchen/LexiconAtlas.git
cd LexiconAtlas
npm ci
npm run build
mkdir -p data
curl -fL https://github.com/lachlanchen/LexiconAtlas/releases/latest/download/english-word-graph.sqlite3 -o data/english-word-graph.sqlite3
LKT_GRAPH_DB="$PWD/data/english-word-graph.sqlite3" npm start
```

Open **http://127.0.0.1:8091/** and keep the terminal running. Database binaries
belong in `data/` or release assets and are intentionally excluded from Git.

## Development and validation

```bash
npm test
npm run build
```

The tests cover catalog normalization, snapshot projections, status filtering,
search, neighborhood limits, evidence grouping, and failure behavior. The build
bundles Three.js, d3-force-3d, Vite, and the local font packages.

## Dataset, privacy, and rights

The exporter constructs a new database from allowlisted columns. The public snapshot
omits original books and dictionaries, passages, OCR text, prompts, inquiry history,
runtime state, arbitrary JSON, and private filesystem paths. Source references are
identifiers, not generated citations. Integrity and checksum checks detect structural
problems or accidental corruption; they do not prove each lexical claim.

Read [the dataset guide](docs/DATASET.md) before publishing another snapshot. Only
publish material you are entitled to share. Short source-derived definitions and
linguistic descriptions can still require a rights review even when book passages
are excluded. This repository currently has no license file, so public visibility
alone does not grant permission to reuse its code or data.

## Citation

If you use Lexicon Atlas in research, cite the repository. GitHub reads
[CITATION.cff](CITATION.cff) and shows a **Cite this repository** panel on the repo page.

```bibtex
@software{chen_lexicon_atlas_2026,
  author = {Chen, Lachlan},
  title = {Lexicon Atlas: A Local-First Three-Dimensional Lexical Knowledge Graph Explorer},
  year = {2026},
  url = {https://github.com/lachlanchen/LexiconAtlas}
}
```

## Status

Lexicon Atlas is an early, developing explorer, not an authoritative etymological
dictionary. The first release favors inspectability and explicit gaps over claims of
completeness. Issues that identify reproducible data or interface problems are useful;
upstream content corrections belong in LKT before a new filtered snapshot is exported.
