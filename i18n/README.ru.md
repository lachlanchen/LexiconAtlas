[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)

[![LazyingArt banner](https://github.com/lachlanchen/lachlanchen/raw/main/figs/banner.png)](https://github.com/lachlanchen/lachlanchen/blob/main/figs/banner.png)

# Lexicon Atlas

*Исследуйте корни, формы, значения и переводы слов в локальном трёхмерном графе знаний.*

[![Release](https://img.shields.io/github/v/release/lachlanchen/LexiconAtlas?label=dataset)](https://github.com/lachlanchen/LexiconAtlas/releases/latest)
[![Node.js 24+](https://img.shields.io/badge/Node.js-24%2B-339933?logo=nodedotjs&logoColor=white)](../package.json)
[![Local first](https://img.shields.io/badge/runtime-local--first-D5F879)](../docs/DATASET.md)
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-GitHub-%23ea4aaa?logo=githubsponsors&logoColor=white)](https://github.com/sponsors/lachlanchen)

Lexicon Atlas — браузер только для чтения реального лексического графа, подготовленного
[Local Knowledge Terminal](https://github.com/lachlanchen/LocalKnowledgeTerminal).
Он представляет слова, морфемы, зафиксированные исторические формы, значения,
произношения, переводы, утверждения и ссылки на источники как сеть для поиска и
проверки, не отправляя коллекцию в облачный сервис.

| Donate | PayPal | Stripe |
| --- | --- | --- |
| [![Donate](https://img.shields.io/badge/Donate-LazyingArt-0EA5E9?style=for-the-badge&logo=kofi&logoColor=white)](https://chat.lazying.art/donate) | [![PayPal](https://img.shields.io/badge/PayPal-RongzhouChen-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/RongzhouChen) | [![Stripe](https://img.shields.io/badge/Stripe-Donate-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://buy.stripe.com/aFadR8gIaflgfQV6T4fw400) |

[![Реальный вид Lexicon Atlas на настольном экране](../docs/images/atlas-desktop.png)](https://github.com/lachlanchen/LexiconAtlas/releases/latest)

*Это настоящий снимок приложения с локальным рабочим снимком данных, а не сгенерированный макет. Публичный выпуск использует меньший, намеренно отфильтрованный набор.*

## Что показывает приложение

- Ищите слова и метки, затем переходите по направленным связям в окрестности одного, двух или трёх шагов.
- Изучайте корни, префиксы, суффиксы, исторические формы, значения, произношения, переводы, уверенность, статус и сохранённые идентификаторы источников.
- Фильтруйте по типу узла, языку, основе свидетельства и статусу; переключайтесь между пространственной и плоской раскладкой.
- Экспортируйте видимый подграф в JSON.
- Вычисляйте силовую раскладку в Web Worker и отображайте узлы и связи через Three.js.
- Используйте один интерфейс на настольных и узких экранах.

Lexicon Atlas визуализирует сохранённые утверждения, но не выводит историю слова из
пространственной близости. LKT отвечает за загрузку, поиск, обогащение локальной моделью
и исправление. Atlas не вызывает облачную модель, не создаёт цитаты и не записывает
изменения в рабочий граф.

## Текущий публичный снимок

Выпуск [v0.1.0](https://github.com/lachlanchen/LexiconAtlas/releases/tag/v0.1.0) от
2026-09-05 содержит датированную базу SQLite, манифест и список SHA-256. В манифесте:

| Запись | Количество | Запись | Количество |
| --- | ---: | --- | ---: |
| Сущности | 15,925 | Термины | 9,484 |
| Морфемы | 1,573 | Исторические формы | 404 |
| Значения | 2,180 | Переводы | 847 |
| Произношения | 1,046 | Типизированные рёбра сущностей | 15,197 |
| Утверждения отношений | 9,255 | Записи свидетельств | 13,431 |

Основной язык терминов — английский; также представлены китайский, японский,
французский и арабский, но покрытие неравномерно. `accepted` — состояние конвейера,
а не гарантия фактической или лингвистической точности. Возможны пропущенные значения,
редкие исторические сведения, дубликаты и неверные связи.

## Архитектура и границы

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

Сервер привязан только к localhost. После загрузки исходного кода, зависимостей и базы
обычный просмотр выполняется локально. Выпуски — фиксированные снимки, а не растущий
в реальном времени сервис; Atlas не заменяет приватную рабочую базу LKT.

## Карта репозитория

| Путь | Назначение |
| --- | --- |
| `src/main.js` | Поиск, фильтры, просмотр и адаптивное управление |
| `src/scene.js` | Отрисовка WebGL и взаимодействие с графом |
| `src/layout.worker.js` | Трёхмерная силовая раскладка в worker |
| `lib/snapshot.mjs` | Запросы SQLite только для чтения и проекция графа |
| `server.mjs` | API на localhost и сервер статических ресурсов |
| `scripts/export-public.mjs` | Экспорт снимка только из разрешённых столбцов |
| `scripts/sync-pi.mjs` | Согласованное резервное копирование удалённой SQLite |
| `docs/DATASET.md` | Схема, исключения, проверка и права |

## Быстрый запуск

Требуются Git и **Node.js 24 или новее**.

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

Linux или macOS:

```bash
git clone https://github.com/lachlanchen/LexiconAtlas.git
cd LexiconAtlas
npm ci
npm run build
mkdir -p data
curl -fL https://github.com/lachlanchen/LexiconAtlas/releases/latest/download/english-word-graph.sqlite3 -o data/english-word-graph.sqlite3
LKT_GRAPH_DB="$PWD/data/english-word-graph.sqlite3" npm start
```

Откройте **http://127.0.0.1:8091/** и не закрывайте терминал. Двоичные файлы базы
следует хранить в `data/` или ресурсах выпуска; они намеренно исключены из Git.

## Разработка и проверка

```bash
npm test
npm run build
```

Тесты охватывают нормализацию каталога, проекции снимка, фильтры статуса, поиск,
ограничения окрестности, группировку свидетельств и обработку ошибок. Сборка включает
Three.js, d3-force-3d, Vite и локальные пакеты шрифтов.

## Данные, конфиденциальность и права

Экспортёр создаёт новую базу только из разрешённых столбцов. Публичный снимок исключает
исходные книги и словари, отрывки, OCR-текст, запросы к моделям, историю обращений,
состояние выполнения, произвольный JSON и приватные пути. Ссылки на источники являются
идентификаторами, а не созданными цитатами. Проверки целостности и контрольных сумм
находят структурные проблемы или повреждения, но не доказывают каждое утверждение.

Перед новой публикацией прочитайте [руководство по данным](../docs/DATASET.md).
Публикуйте только то, чем имеете право делиться. Краткие определения и лингвистические
описания из источников могут требовать проверки прав даже без книжных отрывков. Сейчас
в репозитории нет файла лицензии, поэтому одна публичная доступность не разрешает
повторное использование кода или данных.

## Цитирование

При использовании Lexicon Atlas в исследовании процитируйте репозиторий. GitHub читает
[CITATION.cff](../CITATION.cff) и показывает панель **Cite this repository** на странице.

```bibtex
@software{chen_lexicon_atlas_2026,
  author = {Chen, Lachlan},
  title = {Lexicon Atlas: A Local-First Three-Dimensional Lexical Knowledge Graph Explorer},
  year = {2026},
  url = {https://github.com/lachlanchen/LexiconAtlas}
}
```

## Состояние

Lexicon Atlas — ранний развивающийся обозреватель, а не авторитетный этимологический
словарь. Первый выпуск ставит проверяемость и явные пробелы выше заявлений о полноте.
Воспроизводимые сообщения о данных или интерфейсе полезны; содержание исправляется
сначала в LKT, после чего экспортируется новый отфильтрованный снимок.
