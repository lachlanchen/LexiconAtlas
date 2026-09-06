[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)

[![LazyingArt banner](https://github.com/lachlanchen/lachlanchen/raw/main/figs/banner.png)](https://github.com/lachlanchen/lachlanchen/blob/main/figs/banner.png)

# Lexicon Atlas

*在本地三维知识图谱中探索单词的词根、形态、含义与翻译。*

[![Release](https://img.shields.io/github/v/release/lachlanchen/LexiconAtlas?label=dataset)](https://github.com/lachlanchen/LexiconAtlas/releases/latest)
[![Node.js 24+](https://img.shields.io/badge/Node.js-24%2B-339933?logo=nodedotjs&logoColor=white)](../package.json)
[![Local first](https://img.shields.io/badge/runtime-local--first-D5F879)](../docs/DATASET.md)
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-GitHub-%23ea4aaa?logo=githubsponsors&logoColor=white)](https://github.com/sponsors/lachlanchen)

Lexicon Atlas 是一个只读浏览器，用来查看由
[Local Knowledge Terminal](https://github.com/lachlanchen/LocalKnowledgeTerminal) 整理的真实词汇图谱。
它把单词、语素、已有记录的历史形式、含义、发音、翻译、断言和来源引用组织成可搜索、可检查的网络，
无需把资料集合发送到云端服务。

| Donate | PayPal | Stripe |
| --- | --- | --- |
| [![Donate](https://img.shields.io/badge/Donate-LazyingArt-0EA5E9?style=for-the-badge&logo=kofi&logoColor=white)](https://chat.lazying.art/donate) | [![PayPal](https://img.shields.io/badge/PayPal-RongzhouChen-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/RongzhouChen) | [![Stripe](https://img.shields.io/badge/Stripe-Donate-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://buy.stripe.com/aFadR8gIaflgfQV6T4fw400) |

[![Lexicon Atlas 实际桌面界面](../docs/images/atlas-desktop.png)](https://github.com/lachlanchen/LexiconAtlas/releases/latest)

*这是使用本地工作快照的真实应用截图，不是生成的概念图。公开发行版使用规模更小、经过有意筛选的数据集。*

## 可以看到什么

- 搜索单词和标签，并沿有向关系查看一跳、两跳或三跳邻域。
- 检查词根、前缀、后缀、历史形式、含义、发音、翻译、置信度、生命周期状态，以及存在时的来源标识。
- 按节点类型、语言、证据基础和状态筛选，并在空间布局与平面布局之间切换。
- 把当前可见的子图导出为 JSON。
- 在 Web Worker 中计算力导向布局，并用 Three.js 绘制节点和连线。
- 同一套界面可适配桌面和较窄屏幕。

Lexicon Atlas 只呈现已经存储的断言，不会根据节点在空间中的距离推断词语历史。数据摄取、检索、
本地模型补充和修复由 LKT 负责。Atlas 不调用云端模型，不生成引用，也不会把更改写回工作图谱。

## 当前公开快照

2026-09-05 发布的 [v0.1.0](https://github.com/lachlanchen/LexiconAtlas/releases/tag/v0.1.0)
提供带日期的 SQLite 数据库、清单和 SHA-256 校验列表。清单记录如下：

| 记录 | 数量 | 记录 | 数量 |
| --- | ---: | --- | ---: |
| 实体 | 15,925 | 词项 | 9,484 |
| 语素 | 1,573 | 历史形式 | 404 |
| 含义 | 2,180 | 翻译 | 847 |
| 发音 | 1,046 | 带类型的实体边 | 15,197 |
| 关系断言 | 9,255 | 证据记录 | 13,431 |

词项以英语为主，也包括中文、日语、法语和阿拉伯语，但覆盖程度并不均衡。`accepted` 表示处理流水线中的
状态，并不保证事实或语言学上的正确性。数据中仍可能存在含义缺失、历史记录稀疏、重复以及错误连线。

## 架构与边界

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

服务器只绑定 localhost。下载源代码、依赖和数据库之后，日常浏览在本地完成。每个发行版都是固定快照，
并不是实时增长的在线服务；Atlas 也不能替代私有的 LKT 工作数据库。

## 仓库结构

| 路径 | 用途 |
| --- | --- |
| `src/main.js` | 搜索、筛选、检查和响应式控件 |
| `src/scene.js` | WebGL 图谱绘制与交互 |
| `src/layout.worker.js` | 在 worker 中运行三维力导向布局 |
| `lib/snapshot.mjs` | 只读 SQLite 查询与图谱投影 |
| `server.mjs` | localhost API 与静态资源服务器 |
| `scripts/export-public.mjs` | 只使用许可字段导出图谱快照 |
| `scripts/sync-pi.mjs` | 一致地备份远程 SQLite 数据库 |
| `docs/DATASET.md` | 模式、排除项、验证与权利说明 |

## 快速开始

需要 Git 和 **Node.js 24 或更高版本**。

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

打开 **http://127.0.0.1:8091/** 并保持终端运行。数据库二进制文件应放在 `data/` 或发行版资源中，
项目有意将它们排除在 Git 之外。

## 开发与验证

```bash
npm test
npm run build
```

测试覆盖目录标准化、快照投影、状态筛选、搜索、邻域限制、证据分组和失败处理。构建会打包 Three.js、
d3-force-3d、Vite 与本地字体包。

## 数据集、隐私与权利

导出器只用许可字段创建全新的数据库。公开快照不包含原始书籍和词典、正文片段、OCR 文本、提示词、
查询历史、运行状态、任意 JSON 和私有文件路径。来源引用只是标识符，不是自动生成的引文。完整性检查和
校验和可以发现结构问题或意外损坏，但不能证明每一条词汇断言都正确。

发布其他快照之前，请阅读[数据集指南](../docs/DATASET.md)。只能发布你有权分享的材料。即使没有包含
书籍正文，来自资料源的简短定义和语言描述仍可能需要权利审查。本仓库目前没有许可证文件，因此公开可见
本身并不授予复用代码或数据的许可。

## 引用

如果在研究中使用 Lexicon Atlas，请引用本仓库。GitHub 会读取
[CITATION.cff](../CITATION.cff)，并在仓库页面显示 **Cite this repository** 面板。

```bibtex
@software{chen_lexicon_atlas_2026,
  author = {Chen, Lachlan},
  title = {Lexicon Atlas: A Local-First Three-Dimensional Lexical Knowledge Graph Explorer},
  year = {2026},
  url = {https://github.com/lachlanchen/LexiconAtlas}
}
```

## 状态

Lexicon Atlas 是处于早期开发阶段的探索工具，不是权威词源词典。首个版本强调可检查性和明确标出空缺，
而不声称内容完备。能够复现的数据或界面问题很有帮助；内容修正应先在 LKT 中完成，再导出新的筛选快照。
反馈时请附上可复现的查询、筛选条件与观察到的关系，这样更容易把界面问题与上游数据问题分开处理。
