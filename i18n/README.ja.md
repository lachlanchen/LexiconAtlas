[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)

[![LazyingArt banner](https://github.com/lachlanchen/lachlanchen/raw/main/figs/banner.png)](https://github.com/lachlanchen/lachlanchen/blob/main/figs/banner.png)

# Lexicon Atlas

*単語の語根・形・意味・翻訳を、ローカルで動く三次元知識グラフとして探索します。*

[![Release](https://img.shields.io/github/v/release/lachlanchen/LexiconAtlas?label=dataset)](https://github.com/lachlanchen/LexiconAtlas/releases/latest)
[![Node.js 24+](https://img.shields.io/badge/Node.js-24%2B-339933?logo=nodedotjs&logoColor=white)](../package.json)
[![Local first](https://img.shields.io/badge/runtime-local--first-D5F879)](../docs/DATASET.md)
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-GitHub-%23ea4aaa?logo=githubsponsors&logoColor=white)](https://github.com/sponsors/lachlanchen)

Lexicon Atlas は、[Local Knowledge Terminal](https://github.com/lachlanchen/LocalKnowledgeTerminal)
が準備した実際の語彙グラフを閲覧するための読み取り専用ブラウザーです。単語、形態素、記録された
歴史的形態、意味、発音、翻訳、アサーション、出典参照を、検索して詳しく確認できるネットワークに
変換します。コレクションをクラウドサービスへ送る必要はありません。

| Donate | PayPal | Stripe |
| --- | --- | --- |
| [![Donate](https://img.shields.io/badge/Donate-LazyingArt-0EA5E9?style=for-the-badge&logo=kofi&logoColor=white)](https://chat.lazying.art/donate) | [![PayPal](https://img.shields.io/badge/PayPal-RongzhouChen-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/RongzhouChen) | [![Stripe](https://img.shields.io/badge/Stripe-Donate-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://buy.stripe.com/aFadR8gIaflgfQV6T4fw400) |

[![Lexicon Atlas の実際のデスクトップ画面](../docs/images/atlas-desktop.png)](https://github.com/lachlanchen/LexiconAtlas/releases/latest)

*ローカル作業スナップショットを使った実際のアプリ画面であり、生成したモックアップではありません。公開版は意図的に絞り込んだ、より小さなデータセットを使用します。*

## 表示できるもの

- 単語やラベルを検索し、有向関係を1・2・3ホップの近傍までたどれます。
- 語根、接頭辞、接尾辞、歴史的形態、意味、発音、翻訳、信頼度、ライフサイクル状態、保存済みの出典識別子を確認できます。
- ノード種別、言語、根拠、状態で絞り込み、空間表示と平面表示を切り替えられます。
- 現在表示中の部分グラフを JSON として書き出せます。
- 力学レイアウトを Web Worker で計算し、Three.js でノードとリンクを描画します。
- 同じインターフェースがデスクトップと狭い画面の両方に適応します。

Lexicon Atlas は保存済みの主張を可視化します。空間的な近さから語史を推定するものではありません。
取り込み、検索、ローカルモデルによる拡充、修復は LKT が担当します。Atlas はクラウドモデルを呼び出さず、
引用を生成せず、作業用グラフへ書き戻しません。

## 現在の公開スナップショット

2026-09-05 公開の [v0.1.0](https://github.com/lachlanchen/LexiconAtlas/releases/tag/v0.1.0)
には、日付付き SQLite データベース、マニフェスト、SHA-256 一覧があります。マニフェストの件数は次の通りです。

| レコード | 件数 | レコード | 件数 |
| --- | ---: | --- | ---: |
| エンティティ | 15,925 | 用語 | 9,484 |
| 形態素 | 1,573 | 歴史的形態 | 404 |
| 意味 | 2,180 | 翻訳 | 847 |
| 発音 | 1,046 | 型付きエンティティ辺 | 15,197 |
| 関係アサーション | 9,255 | 根拠レコード | 13,431 |

用語の中心言語は英語です。中国語、日本語、フランス語、アラビア語も含みますが、網羅度は均一ではありません。
`accepted` は処理パイプライン上の状態であり、事実または言語学的な正確さを保証しません。欠けた語義、薄い
語史、重複、不正確なリンクが残っている可能性があります。

## 構成と境界

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

サーバーは localhost のみにバインドします。ソース、依存関係、データベースをダウンロードした後の通常の探索は
ローカルで完結します。リリースは固定スナップショットであり、リアルタイムに成長するサービスではありません。
また Atlas は非公開の LKT 作業データベースを置き換えるものではありません。

## リポジトリ構成

| パス | 役割 |
| --- | --- |
| `src/main.js` | 検索、絞り込み、詳細表示、レスポンシブ操作 |
| `src/scene.js` | WebGL によるグラフ描画と操作 |
| `src/layout.worker.js` | worker 内の三次元力学レイアウト |
| `lib/snapshot.mjs` | 読み取り専用 SQLite クエリとグラフ射影 |
| `server.mjs` | localhost API と静的アセット配信 |
| `scripts/export-public.mjs` | 許可列だけを使うグラフスナップショット出力 |
| `scripts/sync-pi.mjs` | リモート SQLite の整合したバックアップ手順 |
| `docs/DATASET.md` | スキーマ、除外内容、検証、権利上の注意 |

## クイックスタート

Git と **Node.js 24 以降**が必要です。

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

Linux または macOS：

```bash
git clone https://github.com/lachlanchen/LexiconAtlas.git
cd LexiconAtlas
npm ci
npm run build
mkdir -p data
curl -fL https://github.com/lachlanchen/LexiconAtlas/releases/latest/download/english-word-graph.sqlite3 -o data/english-word-graph.sqlite3
LKT_GRAPH_DB="$PWD/data/english-word-graph.sqlite3" npm start
```

**http://127.0.0.1:8091/** を開き、ターミナルは動かしたままにします。データベースバイナリは `data/`
またはリリースアセットに置き、Git からは意図的に除外されています。

## 開発と検証

```bash
npm test
npm run build
```

テストは、カタログ正規化、スナップショット射影、状態フィルター、検索、近傍上限、根拠のグループ化、失敗時の
動作を対象とします。ビルドには Three.js、d3-force-3d、Vite、ローカルフォントパッケージをまとめます。

## データセット、プライバシー、権利

エクスポーターは許可された列だけから新しいデータベースを構築します。公開スナップショットからは、元の書籍・
辞書、本文、OCR テキスト、プロンプト、問い合わせ履歴、実行状態、任意 JSON、非公開ファイルパスを除外します。
出典参照は識別子であり、自動生成された引用ではありません。整合性検査とチェックサムは構造上の問題や偶発的な
破損を見つけますが、個々の語彙的主張の正しさまでは証明しません。

別のスナップショットを公開する前に[データセットガイド](../docs/DATASET.md)を読んでください。共有する権利のある
資料だけを公開してください。書籍本文を除いても、出典由来の短い定義や言語記述には別途権利確認が必要な場合が
あります。このリポジトリには現在ライセンスファイルがないため、公開されているというだけではコードやデータの
再利用許可になりません。

## 引用

研究で Lexicon Atlas を利用する場合は、このリポジトリを引用してください。GitHub は
[CITATION.cff](../CITATION.cff) を読み、リポジトリページに **Cite this repository** パネルを表示します。

```bibtex
@software{chen_lexicon_atlas_2026,
  author = {Chen, Lachlan},
  title = {Lexicon Atlas: A Local-First Three-Dimensional Lexical Knowledge Graph Explorer},
  year = {2026},
  url = {https://github.com/lachlanchen/LexiconAtlas}
}
```

## 状態

Lexicon Atlas は開発初期の探索ツールであり、権威ある語源辞典ではありません。初回リリースは完全性を主張するより、
検査可能で不足点が明示されることを優先しています。再現可能なデータや UI の問題報告は有用です。内容の修正はまず
LKT で行い、その後に新しいフィルター済みスナップショットを出力します。
