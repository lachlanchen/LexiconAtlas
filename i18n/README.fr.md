[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)

[![LazyingArt banner](https://github.com/lachlanchen/lachlanchen/raw/main/figs/banner.png)](https://github.com/lachlanchen/lachlanchen/blob/main/figs/banner.png)

# Lexicon Atlas

*Explorez les racines, les formes, les sens et les traductions des mots dans un graphe de connaissances local en trois dimensions.*

[![Release](https://img.shields.io/github/v/release/lachlanchen/LexiconAtlas?label=dataset)](https://github.com/lachlanchen/LexiconAtlas/releases/latest)
[![Node.js 24+](https://img.shields.io/badge/Node.js-24%2B-339933?logo=nodedotjs&logoColor=white)](../package.json)
[![Local first](https://img.shields.io/badge/runtime-local--first-D5F879)](../docs/DATASET.md)
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-GitHub-%23ea4aaa?logo=githubsponsors&logoColor=white)](https://github.com/sponsors/lachlanchen)

Lexicon Atlas est un navigateur en lecture seule pour un véritable graphe lexical
préparé par [Local Knowledge Terminal](https://github.com/lachlanchen/LocalKnowledgeTerminal).
Il transforme mots, morphèmes, formes historiques attestées, sens, prononciations,
traductions, assertions et références de sources en un réseau consultable, sans
envoyer la collection vers un service cloud.

| Donate | PayPal | Stripe |
| --- | --- | --- |
| [![Donate](https://img.shields.io/badge/Donate-LazyingArt-0EA5E9?style=for-the-badge&logo=kofi&logoColor=white)](https://chat.lazying.art/donate) | [![PayPal](https://img.shields.io/badge/PayPal-RongzhouChen-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/RongzhouChen) | [![Stripe](https://img.shields.io/badge/Stripe-Donate-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://buy.stripe.com/aFadR8gIaflgfQV6T4fw400) |

[![Vue bureau réelle de Lexicon Atlas](../docs/images/atlas-desktop.png)](https://github.com/lachlanchen/LexiconAtlas/releases/latest)

*Capture réelle de l’application utilisant l’instantané de travail local, et non maquette générée. La version publique emploie un jeu de données plus petit, filtré volontairement.*

## Ce que l’outil montre

- Recherchez mots et libellés, puis suivez les relations orientées sur un voisinage d’un, deux ou trois sauts.
- Examinez racines, préfixes, suffixes, formes historiques, sens, prononciations, traductions, confiance, statut et identifiants de source lorsqu’ils existent.
- Filtrez par type de nœud, langue, fondement de la preuve et statut, puis alternez entre dispositions spatiale et plane.
- Exportez le sous-graphe actuellement visible au format JSON.
- Calculez la disposition par forces dans un Web Worker et affichez nœuds et liens avec Three.js.
- Utilisez la même interface sur ordinateur ou écran étroit.

Lexicon Atlas visualise des assertions enregistrées ; il ne déduit pas l’histoire d’un
mot de sa proximité spatiale. LKT gère ingestion, recherche, enrichissement par modèle
local et réparation. Atlas n’appelle aucun modèle cloud, ne génère pas de citations et
n’écrit pas dans le graphe de travail.

## Instantané public actuel

La version [v0.1.0](https://github.com/lachlanchen/LexiconAtlas/releases/tag/v0.1.0),
publiée le 2026-09-05, fournit une base SQLite datée, un manifeste et une liste SHA-256.
Le manifeste indique :

| Enregistrement | Nombre | Enregistrement | Nombre |
| --- | ---: | --- | ---: |
| Entités | 15,925 | Termes | 9,484 |
| Morphèmes | 1,573 | Formes historiques | 404 |
| Sens | 2,180 | Traductions | 847 |
| Prononciations | 1,046 | Arêtes d’entité typées | 15,197 |
| Assertions de relation | 9,255 | Enregistrements de preuve | 13,431 |

L’anglais est la principale langue des termes ; le chinois, le japonais, le français
et l’arabe sont aussi présents, avec une couverture inégale. `accepted` désigne un
état du pipeline et ne garantit ni exactitude factuelle ni exactitude linguistique.
Des sens absents, histoires lacunaires, doublons et liens erronés restent possibles.

## Architecture et limites

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

Le serveur écoute uniquement sur l’hôte local. Une fois le code, les dépendances et
la base téléchargés, l’exploration courante reste locale. Les versions sont des
instantanés fixes et non un service vivant ; Atlas ne remplace pas la base privée de LKT.

## Plan du dépôt

| Chemin | Rôle |
| --- | --- |
| `src/main.js` | Recherche, filtres, inspection et commandes adaptatives |
| `src/scene.js` | Rendu WebGL et interaction avec le graphe |
| `src/layout.worker.js` | Disposition tridimensionnelle par forces dans un worker |
| `lib/snapshot.mjs` | Requêtes SQLite en lecture seule et projection du graphe |
| `server.mjs` | API locale et serveur de ressources statiques |
| `scripts/export-public.mjs` | Export du graphe limité aux colonnes autorisées |
| `scripts/sync-pi.mjs` | Sauvegarde cohérente d’une base SQLite distante |
| `docs/DATASET.md` | Schéma, exclusions, validation et droits |

## Démarrage rapide

Nécessite Git et **Node.js 24 ou version ultérieure**.

Windows PowerShell :

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

Linux ou macOS :

```bash
git clone https://github.com/lachlanchen/LexiconAtlas.git
cd LexiconAtlas
npm ci
npm run build
mkdir -p data
curl -fL https://github.com/lachlanchen/LexiconAtlas/releases/latest/download/english-word-graph.sqlite3 -o data/english-word-graph.sqlite3
LKT_GRAPH_DB="$PWD/data/english-word-graph.sqlite3" npm start
```

Ouvrez **http://127.0.0.1:8091/** et laissez le terminal actif. Les binaires de base
vont dans `data/` ou dans les ressources de version et sont volontairement exclus de Git.

## Développement et validation

```bash
npm test
npm run build
```

Les tests couvrent normalisation du catalogue, projections d’instantané, filtres de
statut, recherche, limites de voisinage, regroupement des preuves et erreurs. Le build
regroupe Three.js, d3-force-3d, Vite et les polices locales.

## Données, vie privée et droits

L’exporteur construit une nouvelle base à partir de colonnes autorisées. L’instantané
public exclut livres et dictionnaires originaux, passages, OCR, prompts, historique des
requêtes, état d’exécution, JSON arbitraire et chemins privés. Les références sont des
identifiants, pas des citations générées. Intégrité et sommes de contrôle détectent
les défauts structurels ou une corruption accidentelle sans prouver chaque assertion.

Lisez [le guide du jeu de données](../docs/DATASET.md) avant de publier un autre
instantané. Ne publiez que ce que vous êtes autorisé à partager. Définitions courtes et
descriptions linguistiques dérivées de sources peuvent encore nécessiter une vérification
des droits même sans passages de livres. Ce dépôt ne contient actuellement aucun fichier
de licence : sa visibilité publique ne donne pas à elle seule le droit de réutiliser le
code ou les données.

## Citation

Si vous utilisez Lexicon Atlas en recherche, citez le dépôt. GitHub lit
[CITATION.cff](../CITATION.cff) et affiche le panneau **Cite this repository** sur sa page.

```bibtex
@software{chen_lexicon_atlas_2026,
  author = {Chen, Lachlan},
  title = {Lexicon Atlas: A Local-First Three-Dimensional Lexical Knowledge Graph Explorer},
  year = {2026},
  url = {https://github.com/lachlanchen/LexiconAtlas}
}
```

## État

Lexicon Atlas est un explorateur précoce en développement, non un dictionnaire
étymologique faisant autorité. La première version privilégie l’inspection et les
lacunes explicites plutôt qu’une promesse d’exhaustivité. Les signalements reproductibles
de données ou d’interface sont utiles ; les corrections de contenu se font d’abord dans
LKT avant l’export d’un nouvel instantané filtré.
