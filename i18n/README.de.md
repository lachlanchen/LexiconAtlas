[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)

[![LazyingArt banner](https://github.com/lachlanchen/lachlanchen/raw/main/figs/banner.png)](https://github.com/lachlanchen/lachlanchen/blob/main/figs/banner.png)

# Lexicon Atlas

*Erkunde Wortwurzeln, Formen, Bedeutungen und Übersetzungen als lokalen dreidimensionalen Wissensgraphen.*

[![Release](https://img.shields.io/github/v/release/lachlanchen/LexiconAtlas?label=dataset)](https://github.com/lachlanchen/LexiconAtlas/releases/latest)
[![Node.js 24+](https://img.shields.io/badge/Node.js-24%2B-339933?logo=nodedotjs&logoColor=white)](../package.json)
[![Local first](https://img.shields.io/badge/runtime-local--first-D5F879)](../docs/DATASET.md)
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-GitHub-%23ea4aaa?logo=githubsponsors&logoColor=white)](https://github.com/sponsors/lachlanchen)

Lexicon Atlas ist ein Nur-Lese-Browser für einen echten lexikalischen Graphen, den
[Local Knowledge Terminal](https://github.com/lachlanchen/LocalKnowledgeTerminal)
vorbereitet. Wörter, Morpheme, belegte historische Formen, Bedeutungen, Aussprachen,
Übersetzungen, Aussagen und Quellenverweise werden als durchsuchbares Netz dargestellt,
ohne die Sammlung an einen Cloud-Dienst zu senden.

| Donate | PayPal | Stripe |
| --- | --- | --- |
| [![Donate](https://img.shields.io/badge/Donate-LazyingArt-0EA5E9?style=for-the-badge&logo=kofi&logoColor=white)](https://chat.lazying.art/donate) | [![PayPal](https://img.shields.io/badge/PayPal-RongzhouChen-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/RongzhouChen) | [![Stripe](https://img.shields.io/badge/Stripe-Donate-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://buy.stripe.com/aFadR8gIaflgfQV6T4fw400) |

[![Tatsächliche Desktopansicht von Lexicon Atlas](../docs/images/atlas-desktop.png)](https://github.com/lachlanchen/LexiconAtlas/releases/latest)

*Ein echter Screenshot der Anwendung mit dem lokalen Arbeitsstand, kein generiertes Mock-up. Die öffentliche Version enthält einen kleineren, bewusst gefilterten Datensatz.*

## Was sichtbar wird

- Suche Wörter und Bezeichnungen und folge gerichteten Beziehungen über ein, zwei oder drei Schritte.
- Prüfe Wurzeln, Präfixe, Suffixe, historische Formen, Bedeutungen, Aussprachen, Übersetzungen, Konfidenz, Status und gespeicherte Quellenkennungen.
- Filtere nach Knotentyp, Sprache, Evidenzgrundlage und Status; wechsle zwischen räumlichem und ebenem Layout.
- Exportiere den aktuell sichtbaren Teilgraphen als JSON.
- Berechne das Kraftlayout in einem Web Worker und zeichne Knoten und Kanten mit Three.js.
- Nutze dieselbe Oberfläche auf Desktop- und schmalen Bildschirmen.

Lexicon Atlas visualisiert gespeicherte Aussagen; aus räumlicher Nähe wird keine
Wortgeschichte abgeleitet. LKT übernimmt Aufnahme, Retrieval, Anreicherung mit lokalen
Modellen und Korrektur. Atlas ruft kein Cloud-Modell auf, erzeugt keine Zitate und
schreibt nicht in den Arbeitsgraphen zurück.

## Aktueller öffentlicher Snapshot

[v0.1.0](https://github.com/lachlanchen/LexiconAtlas/releases/tag/v0.1.0), veröffentlicht
am 2026-09-05, enthält eine datierte SQLite-Datenbank, ein Manifest und eine SHA-256-Liste.
Das Manifest nennt:

| Datensatz | Anzahl | Datensatz | Anzahl |
| --- | ---: | --- | ---: |
| Entitäten | 15,925 | Terme | 9,484 |
| Morpheme | 1,573 | Historische Formen | 404 |
| Bedeutungen | 2,180 | Übersetzungen | 847 |
| Aussprachen | 1,046 | Typisierte Entitätskanten | 15,197 |
| Relationsaussagen | 9,255 | Evidenzdatensätze | 13,431 |

Englisch ist die wichtigste Termsprache; Chinesisch, Japanisch, Französisch und Arabisch
sind ebenfalls enthalten, jedoch ungleichmäßig. `accepted` ist ein Pipeline-Status und
keine Garantie für sachliche oder sprachwissenschaftliche Richtigkeit. Fehlende
Bedeutungen, lückenhafte Verläufe, Dubletten und falsche Verknüpfungen sind möglich.

## Architektur und Grenzen

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

Der Server bindet nur an localhost. Nach dem Download von Quellcode, Abhängigkeiten und
Datenbank läuft die normale Erkundung lokal. Releases sind feste Snapshots, kein live
wachsender Dienst; Atlas ersetzt nicht die private LKT-Arbeitsdatenbank.

## Repository-Übersicht

| Pfad | Zweck |
| --- | --- |
| `src/main.js` | Suche, Filter, Inspektion und responsive Steuerung |
| `src/scene.js` | WebGL-Darstellung und Interaktion des Graphen |
| `src/layout.worker.js` | Dreidimensionales Kraftlayout in einem Worker |
| `lib/snapshot.mjs` | Nur-Lese-SQLite-Abfragen und Graphprojektion |
| `server.mjs` | Localhost-API und Server für statische Ressourcen |
| `scripts/export-public.mjs` | Graph-Snapshot nur aus erlaubten Spalten |
| `scripts/sync-pi.mjs` | Konsistenter Sicherungsablauf für entferntes SQLite |
| `docs/DATASET.md` | Schema, Ausschlüsse, Prüfung und Rechtehinweise |

## Schnellstart

Erfordert Git und **Node.js 24 oder neuer**.

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

Linux oder macOS:

```bash
git clone https://github.com/lachlanchen/LexiconAtlas.git
cd LexiconAtlas
npm ci
npm run build
mkdir -p data
curl -fL https://github.com/lachlanchen/LexiconAtlas/releases/latest/download/english-word-graph.sqlite3 -o data/english-word-graph.sqlite3
LKT_GRAPH_DB="$PWD/data/english-word-graph.sqlite3" npm start
```

Öffne **http://127.0.0.1:8091/** und lasse das Terminal laufen. Datenbank-Binärdateien
gehören nach `data/` oder in Release-Assets und sind bewusst von Git ausgeschlossen.

## Entwicklung und Prüfung

```bash
npm test
npm run build
```

Die Tests decken Katalognormalisierung, Snapshot-Projektionen, Statusfilter, Suche,
Nachbarschaftsgrenzen, Evidenzgruppierung und Fehlerverhalten ab. Der Build bündelt
Three.js, d3-force-3d, Vite und die lokalen Schriftpakete.

## Datensatz, Datenschutz und Rechte

Der Exporter erstellt eine neue Datenbank ausschließlich aus erlaubten Spalten. Der
öffentliche Snapshot lässt ursprüngliche Bücher und Wörterbücher, Passagen, OCR-Text,
Prompts, Anfrageverlauf, Laufzeitstatus, beliebiges JSON und private Dateipfade aus.
Quellenverweise sind Kennungen, keine generierten Zitate. Integritäts- und Prüfsummen-
tests finden Strukturfehler oder versehentliche Beschädigung, beweisen aber keine Aussage.

Lies vor einem weiteren Export den [Datensatzleitfaden](../docs/DATASET.md). Veröffentliche
nur Material, das du teilen darfst. Kurze quellengestützte Definitionen und sprachliche
Beschreibungen können auch ohne Buchpassagen eine Rechteprüfung benötigen. Dieses
Repository enthält derzeit keine Lizenzdatei; öffentliche Sichtbarkeit allein erteilt
keine Erlaubnis zur Wiederverwendung von Code oder Daten.

## Zitieren

Wenn du Lexicon Atlas in der Forschung nutzt, zitiere das Repository. GitHub liest
[CITATION.cff](../CITATION.cff) und zeigt auf der Seite **Cite this repository** an.

```bibtex
@software{chen_lexicon_atlas_2026,
  author = {Chen, Lachlan},
  title = {Lexicon Atlas: A Local-First Three-Dimensional Lexical Knowledge Graph Explorer},
  year = {2026},
  url = {https://github.com/lachlanchen/LexiconAtlas}
}
```

## Status

Lexicon Atlas ist ein früher, in Entwicklung befindlicher Explorer und kein maßgebliches
etymologisches Wörterbuch. Die erste Version bevorzugt Prüfbarkeit und sichtbare Lücken
gegenüber Vollständigkeitsversprechen. Reproduzierbare Daten- oder Oberflächenfehler sind
hilfreich; Inhaltskorrekturen erfolgen zuerst in LKT und danach in einem neuen Snapshot.
