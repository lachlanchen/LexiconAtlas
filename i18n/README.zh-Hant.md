[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)

[![LazyingArt banner](https://github.com/lachlanchen/lachlanchen/raw/main/figs/banner.png)](https://github.com/lachlanchen/lachlanchen/blob/main/figs/banner.png)

# Lexicon Atlas

*在本機三維知識圖譜中探索單字的詞根、形態、意義與翻譯。*

[![Release](https://img.shields.io/github/v/release/lachlanchen/LexiconAtlas?label=dataset)](https://github.com/lachlanchen/LexiconAtlas/releases/latest)
[![Node.js 24+](https://img.shields.io/badge/Node.js-24%2B-339933?logo=nodedotjs&logoColor=white)](../package.json)
[![Local first](https://img.shields.io/badge/runtime-local--first-D5F879)](../docs/DATASET.md)
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-GitHub-%23ea4aaa?logo=githubsponsors&logoColor=white)](https://github.com/sponsors/lachlanchen)

Lexicon Atlas 是一個唯讀瀏覽器，用來查看由
[Local Knowledge Terminal](https://github.com/lachlanchen/LocalKnowledgeTerminal) 整理的真實詞彙圖譜。
它把單字、語素、已有紀錄的歷史形式、意義、發音、翻譯、斷言與來源參照組織成可搜尋、可檢查的網絡，
無須把資料集合送到雲端服務。

| Donate | PayPal | Stripe |
| --- | --- | --- |
| [![Donate](https://img.shields.io/badge/Donate-LazyingArt-0EA5E9?style=for-the-badge&logo=kofi&logoColor=white)](https://chat.lazying.art/donate) | [![PayPal](https://img.shields.io/badge/PayPal-RongzhouChen-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/RongzhouChen) | [![Stripe](https://img.shields.io/badge/Stripe-Donate-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://buy.stripe.com/aFadR8gIaflgfQV6T4fw400) |

[![Lexicon Atlas 實際桌面介面](../docs/images/atlas-desktop.png)](https://github.com/lachlanchen/LexiconAtlas/releases/latest)

*這是使用本機工作快照的真實應用程式截圖，不是生成的概念圖。公開發行版使用規模更小、經過有意篩選的資料集。*

## 可以看到什麼

- 搜尋單字與標籤，並沿有向關係查看一跳、兩跳或三跳鄰域。
- 檢查詞根、前綴、後綴、歷史形式、意義、發音、翻譯、信賴度、生命週期狀態，以及存在時的來源識別碼。
- 按節點類型、語言、證據基礎與狀態篩選，並在空間配置與平面配置之間切換。
- 把目前可見的子圖匯出為 JSON。
- 在 Web Worker 中計算力導向配置，並用 Three.js 繪製節點與連線。
- 同一套介面可適配桌面與較窄螢幕。

Lexicon Atlas 只呈現已經儲存的斷言，不會根據節點在空間中的距離推斷詞語歷史。資料擷取、檢索、
本機模型補充與修復由 LKT 負責。Atlas 不呼叫雲端模型，不生成引文，也不會把變更寫回工作圖譜。

## 目前公開快照

2026-09-05 發布的 [v0.1.0](https://github.com/lachlanchen/LexiconAtlas/releases/tag/v0.1.0)
提供帶日期的 SQLite 資料庫、清單與 SHA-256 校驗列表。清單記錄如下：

| 記錄 | 數量 | 記錄 | 數量 |
| --- | ---: | --- | ---: |
| 實體 | 15,925 | 詞項 | 9,484 |
| 語素 | 1,573 | 歷史形式 | 404 |
| 意義 | 2,180 | 翻譯 | 847 |
| 發音 | 1,046 | 帶類型的實體邊 | 15,197 |
| 關係斷言 | 9,255 | 證據記錄 | 13,431 |

詞項以英語為主，也包括中文、日語、法語與阿拉伯語，但涵蓋程度並不均衡。`accepted` 表示處理流程中的
狀態，並不保證事實或語言學上的正確性。資料中仍可能存在意義缺失、歷史紀錄稀疏、重複以及錯誤連線。

## 架構與邊界

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

伺服器只綁定 localhost。下載原始碼、相依套件與資料庫之後，日常瀏覽在本機完成。每個發行版都是固定快照，
並不是即時增長的線上服務；Atlas 也不能取代私有的 LKT 工作資料庫。

## 儲存庫結構

| 路徑 | 用途 |
| --- | --- |
| `src/main.js` | 搜尋、篩選、檢查與回應式控制項 |
| `src/scene.js` | WebGL 圖譜繪製與互動 |
| `src/layout.worker.js` | 在 worker 中執行三維力導向配置 |
| `lib/snapshot.mjs` | 唯讀 SQLite 查詢與圖譜投影 |
| `server.mjs` | localhost API 與靜態資源伺服器 |
| `scripts/export-public.mjs` | 只使用許可欄位匯出圖譜快照 |
| `scripts/sync-pi.mjs` | 一致地備份遠端 SQLite 資料庫 |
| `docs/DATASET.md` | 結構、排除項、驗證與權利說明 |

## 快速開始

需要 Git 與 **Node.js 24 或更高版本**。

Windows PowerShell：

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

Linux 或 macOS：

```bash
git clone https://github.com/lachlanchen/LexiconAtlas.git
cd LexiconAtlas
npm ci
npm run build
mkdir -p data
curl -fL https://github.com/lachlanchen/LexiconAtlas/releases/latest/download/english-word-graph.sqlite3 -o data/english-word-graph.sqlite3
LKT_GRAPH_DB="$PWD/data/english-word-graph.sqlite3" npm start
```

開啟 **http://127.0.0.1:8091/** 並保持終端機執行。資料庫二進位檔案應放在 `data/` 或發行版資源中，
專案有意將它們排除在 Git 之外。

## 開發與驗證

```bash
npm test
npm run build
```

測試涵蓋目錄正規化、快照投影、狀態篩選、搜尋、鄰域限制、證據分組與失敗處理。建置會打包 Three.js、
d3-force-3d、Vite 與本機字型套件。

## 資料集、隱私與權利

匯出器只用許可欄位建立全新的資料庫。公開快照不包含原始書籍與詞典、正文片段、OCR 文字、提示詞、
查詢歷史、執行狀態、任意 JSON 與私有檔案路徑。來源參照只是識別碼，不是自動生成的引文。完整性檢查與
校驗和可以發現結構問題或意外損壞，但不能證明每一條詞彙斷言都正確。

發布其他快照之前，請閱讀[資料集指南](../docs/DATASET.md)。只能發布你有權分享的材料。即使沒有包含
書籍正文，來自資料源的簡短定義與語言描述仍可能需要權利審查。本儲存庫目前沒有授權條款檔案，因此公開可見
本身並不授予重用程式碼或資料的許可。

## 引用

如果在研究中使用 Lexicon Atlas，請引用本儲存庫。GitHub 會讀取
[CITATION.cff](../CITATION.cff)，並在儲存庫頁面顯示 **Cite this repository** 面板。

```bibtex
@software{chen_lexicon_atlas_2026,
  author = {Chen, Lachlan},
  title = {Lexicon Atlas: A Local-First Three-Dimensional Lexical Knowledge Graph Explorer},
  year = {2026},
  url = {https://github.com/lachlanchen/LexiconAtlas}
}
```

## 狀態

Lexicon Atlas 是處於早期開發階段的探索工具，不是權威詞源詞典。首個版本強調可檢查性與明確標出空缺，
而不聲稱內容完備。能夠重現的資料或介面問題很有幫助；內容修正應先在 LKT 中完成，再匯出新的篩選快照。
