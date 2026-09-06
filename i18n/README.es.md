[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)

[![LazyingArt banner](https://github.com/lachlanchen/lachlanchen/raw/main/figs/banner.png)](https://github.com/lachlanchen/lachlanchen/blob/main/figs/banner.png)

# Lexicon Atlas

*Explora raíces, formas, significados y traducciones como un grafo de conocimiento tridimensional y local.*

[![Release](https://img.shields.io/github/v/release/lachlanchen/LexiconAtlas?label=dataset)](https://github.com/lachlanchen/LexiconAtlas/releases/latest)
[![Node.js 24+](https://img.shields.io/badge/Node.js-24%2B-339933?logo=nodedotjs&logoColor=white)](../package.json)
[![Local first](https://img.shields.io/badge/runtime-local--first-D5F879)](../docs/DATASET.md)
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-GitHub-%23ea4aaa?logo=githubsponsors&logoColor=white)](https://github.com/sponsors/lachlanchen)

Lexicon Atlas es un navegador de solo lectura para un grafo léxico real preparado por
[Local Knowledge Terminal](https://github.com/lachlanchen/LocalKnowledgeTerminal).
Convierte palabras, morfemas, formas históricas registradas, significados,
pronunciaciones, traducciones, afirmaciones y referencias de fuentes en una red que
puede buscarse e inspeccionarse sin enviar la colección a un servicio en la nube.

| Donate | PayPal | Stripe |
| --- | --- | --- |
| [![Donate](https://img.shields.io/badge/Donate-LazyingArt-0EA5E9?style=for-the-badge&logo=kofi&logoColor=white)](https://chat.lazying.art/donate) | [![PayPal](https://img.shields.io/badge/PayPal-RongzhouChen-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/RongzhouChen) | [![Stripe](https://img.shields.io/badge/Stripe-Donate-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://buy.stripe.com/aFadR8gIaflgfQV6T4fw400) |

[![Vista de escritorio real de Lexicon Atlas](../docs/images/atlas-desktop.png)](https://github.com/lachlanchen/LexiconAtlas/releases/latest)

*Captura real de la aplicación con la instantánea de trabajo local; no es una maqueta generada. La versión pública contiene un conjunto de datos menor y filtrado deliberadamente.*

## Qué muestra

- Busca palabras y etiquetas, y sigue relaciones dirigidas por vecindarios de uno, dos o tres saltos.
- Examina raíces, prefijos, sufijos, formas históricas, significados, pronunciaciones, traducciones, confianza, estado y referencias de fuentes almacenadas cuando existen.
- Filtra por tipo de nodo, idioma, base de evidencia y estado; cambia entre diseños espaciales y planos.
- Exporta el subgrafo visible como JSON.
- Calcula el diseño de fuerzas en un Web Worker y representa nodos y enlaces con Three.js.
- Adapta la misma interfaz a pantallas de escritorio y estrechas.

Lexicon Atlas visualiza afirmaciones almacenadas; no deduce la historia de una palabra
por cercanía espacial. LKT se ocupa de la ingesta, recuperación, enriquecimiento con
modelos locales y reparación. Atlas no llama a modelos en la nube, no genera citas y
no escribe en el grafo de trabajo.

## Instantánea pública actual

La versión [v0.1.0](https://github.com/lachlanchen/LexiconAtlas/releases/tag/v0.1.0),
publicada el 2026-09-05, incluye una base SQLite fechada, un manifiesto y una lista
SHA-256. El manifiesto informa:

| Registro | Cantidad | Registro | Cantidad |
| --- | ---: | --- | ---: |
| Entidades | 15,925 | Términos | 9,484 |
| Morfemas | 1,573 | Formas históricas | 404 |
| Significados | 2,180 | Traducciones | 847 |
| Pronunciaciones | 1,046 | Aristas de entidad tipadas | 15,197 |
| Afirmaciones de relación | 9,255 | Registros de evidencia | 13,431 |

El inglés es el idioma principal de los términos; también aparecen chino, japonés,
francés y árabe, con cobertura desigual. `accepted` es un estado del flujo de trabajo,
no una garantía de exactitud factual o lingüística. Puede haber sentidos ausentes,
historias escasas, duplicados y enlaces incorrectos.

## Arquitectura y límites

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

El servidor se enlaza a localhost. Tras descargar el código, las dependencias y la
base, la exploración normal es local. Las versiones son instantáneas fijas, no un
servicio que crece en vivo, y Atlas no sustituye la base privada de trabajo de LKT.

## Mapa del repositorio

| Ruta | Función |
| --- | --- |
| `src/main.js` | Búsqueda, filtros, inspección y controles adaptables |
| `src/scene.js` | Renderizado WebGL e interacción del grafo |
| `src/layout.worker.js` | Diseño tridimensional de fuerzas en un worker |
| `lib/snapshot.mjs` | Consultas SQLite de solo lectura y proyección del grafo |
| `server.mjs` | API local y servidor de recursos estáticos |
| `scripts/export-public.mjs` | Exportación del grafo limitada a columnas permitidas |
| `scripts/sync-pi.mjs` | Flujo de copia coherente de SQLite remoto |
| `docs/DATASET.md` | Esquema, exclusiones, verificación y derechos |

## Inicio rápido

Requiere Git y **Node.js 24 o posterior**.

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

Linux o macOS:

```bash
git clone https://github.com/lachlanchen/LexiconAtlas.git
cd LexiconAtlas
npm ci
npm run build
mkdir -p data
curl -fL https://github.com/lachlanchen/LexiconAtlas/releases/latest/download/english-word-graph.sqlite3 -o data/english-word-graph.sqlite3
LKT_GRAPH_DB="$PWD/data/english-word-graph.sqlite3" npm start
```

Abre **http://127.0.0.1:8091/** y mantén la terminal activa. Los binarios de la base
se guardan en `data/` o como recursos de una versión y se excluyen de Git a propósito.

## Desarrollo y validación

```bash
npm test
npm run build
```

Las pruebas cubren normalización del catálogo, proyecciones de la instantánea, filtros
de estado, búsqueda, límites de vecindad, agrupación de evidencias y fallos. La
compilación incluye Three.js, d3-force-3d, Vite y las fuentes locales.

## Datos, privacidad y derechos

El exportador construye una base nueva solo con columnas permitidas. La instantánea
pública omite libros y diccionarios originales, pasajes, OCR, prompts, consultas,
estado de ejecución, JSON arbitrario y rutas privadas. Las referencias de fuentes
son identificadores, no citas generadas. Las pruebas de integridad y los checksums
detectan problemas estructurales o corrupción accidental, pero no prueban cada dato.

Lee [la guía del conjunto de datos](../docs/DATASET.md) antes de publicar otra
instantánea. Publica solo material que tengas derecho a compartir. Las definiciones
breves y descripciones lingüísticas derivadas de fuentes aún pueden requerir una
revisión de derechos aunque se omitan pasajes. Este repositorio no incluye actualmente
un archivo de licencia; ser públicamente visible no autoriza por sí solo a reutilizar
su código o sus datos.

## Cita

Si utilizas Lexicon Atlas en investigación, cita el repositorio. GitHub lee
[CITATION.cff](../CITATION.cff) y muestra el panel **Cite this repository** en la página.

```bibtex
@software{chen_lexicon_atlas_2026,
  author = {Chen, Lachlan},
  title = {Lexicon Atlas: A Local-First Three-Dimensional Lexical Knowledge Graph Explorer},
  year = {2026},
  url = {https://github.com/lachlanchen/LexiconAtlas}
}
```

## Estado

Lexicon Atlas es un explorador temprano en desarrollo, no un diccionario etimológico
autoritativo. La primera versión favorece la inspección y las lagunas explícitas frente
a promesas de exhaustividad. Los problemas reproducibles de datos o interfaz son útiles;
las correcciones de contenido deben hacerse en LKT antes de exportar otra instantánea.
