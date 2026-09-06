[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)

[![LazyingArt banner](https://github.com/lachlanchen/lachlanchen/raw/main/figs/banner.png)](https://github.com/lachlanchen/lachlanchen/blob/main/figs/banner.png)

# Lexicon Atlas

*استكشف جذور الكلمات وصيغها ومعانيها وترجماتها في رسم معرفة محلي ثلاثي الأبعاد.*

[![Release](https://img.shields.io/github/v/release/lachlanchen/LexiconAtlas?label=dataset)](https://github.com/lachlanchen/LexiconAtlas/releases/latest)
[![Node.js 24+](https://img.shields.io/badge/Node.js-24%2B-339933?logo=nodedotjs&logoColor=white)](../package.json)
[![Local first](https://img.shields.io/badge/runtime-local--first-D5F879)](../docs/DATASET.md)
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-GitHub-%23ea4aaa?logo=githubsponsors&logoColor=white)](https://github.com/sponsors/lachlanchen)

Lexicon Atlas هو متصفح للقراءة فقط لرسم معجمي حقيقي أعدّه
[Local Knowledge Terminal](https://github.com/lachlanchen/LocalKnowledgeTerminal).
وهو يحول الكلمات والمورفيمات والصيغ التاريخية المسجلة والمعاني والنطق والترجمات
والادعاءات ومراجع المصادر إلى شبكة قابلة للبحث والفحص، من دون إرسال المجموعة إلى
خدمة سحابية.

| Donate | PayPal | Stripe |
| --- | --- | --- |
| [![Donate](https://img.shields.io/badge/Donate-LazyingArt-0EA5E9?style=for-the-badge&logo=kofi&logoColor=white)](https://chat.lazying.art/donate) | [![PayPal](https://img.shields.io/badge/PayPal-RongzhouChen-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/RongzhouChen) | [![Stripe](https://img.shields.io/badge/Stripe-Donate-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://buy.stripe.com/aFadR8gIaflgfQV6T4fw400) |

[![واجهة سطح المكتب الفعلية لـ Lexicon Atlas](../docs/images/atlas-desktop.png)](https://github.com/lachlanchen/LexiconAtlas/releases/latest)

*هذه لقطة فعلية للتطبيق من لقطة العمل المحلية وليست نموذجًا مولدًا. يحتوي الإصدار العام على مجموعة بيانات أصغر جرى ترشيحها عمدًا.*

## ما الذي يعرضه

- ابحث عن الكلمات والتسميات، ثم اتبع العلاقات الموجهة ضمن جوار من قفزة أو قفزتين أو ثلاث.
- افحص الجذور والبادئات واللواحق والصيغ التاريخية والمعاني والنطق والترجمات والثقة وحالة دورة الحياة ومعرّفات المصادر المخزنة عند توفرها.
- رشّح حسب نوع العقدة واللغة وأساس الدليل والحالة، وانتقل بين التخطيط المكاني والمسطح.
- صدّر الرسم الفرعي الظاهر حاليًا بصيغة JSON.
- شغّل تخطيط القوى داخل Web Worker واعرض العقد والروابط باستخدام Three.js.
- استخدم الواجهة نفسها على سطح المكتب والشاشات الضيقة.

يعرض Lexicon Atlas الادعاءات المخزنة ولا يستنتج تاريخ الكلمة من تقاربها المكاني.
يتولى LKT الاستيعاب والاسترجاع والإثراء بالنموذج المحلي والإصلاح. لا يستدعي Atlas
نموذجًا سحابيًا، ولا ينشئ استشهادات، ولا يكتب في رسم العمل.

## اللقطة العامة الحالية

يوفر الإصدار [v0.1.0](https://github.com/lachlanchen/LexiconAtlas/releases/tag/v0.1.0)،
المنشور في 2026-09-05، قاعدة SQLite مؤرخة وبيانًا وصيغة تحقق SHA-256. ويسجل البيان:

| السجل | العدد | السجل | العدد |
| --- | ---: | --- | ---: |
| الكيانات | 15,925 | المصطلحات | 9,484 |
| المورفيمات | 1,573 | الصيغ التاريخية | 404 |
| المعاني | 2,180 | الترجمات | 847 |
| النطق | 1,046 | حواف الكيانات المعرّفة النوع | 15,197 |
| ادعاءات العلاقات | 9,255 | سجلات الأدلة | 13,431 |

الإنجليزية هي اللغة الرئيسية للمصطلحات، وتظهر أيضًا الصينية واليابانية والفرنسية
والعربية بتغطية متفاوتة. تمثل `accepted` حالة في خط المعالجة، لا ضمانًا للصحة
الواقعية أو اللغوية. ما زالت المعاني المفقودة والتواريخ المتفرقة والتكرارات
والروابط غير الصحيحة ممكنة.

## البنية والحدود

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

يرتبط الخادم بالمضيف المحلي. بعد تنزيل المصدر والاعتماديات وقاعدة البيانات، يعمل
الاستكشاف المعتاد محليًا. الإصدارات لقطات ثابتة وليست خدمة تنمو مباشرة، ولا يحل
Atlas محل قاعدة عمل LKT الخاصة.

## خريطة المستودع

| المسار | الغرض |
| --- | --- |
| `src/main.js` | البحث والترشيح والفحص وعناصر التحكم المتجاوبة |
| `src/scene.js` | رسم WebGL والتفاعل مع الشبكة |
| `src/layout.worker.js` | تخطيط قوى ثلاثي الأبعاد داخل عامل |
| `lib/snapshot.mjs` | استعلامات SQLite للقراءة فقط وإسقاط الرسم |
| `server.mjs` | واجهة API محلية وخادم الأصول الثابتة |
| `scripts/export-public.mjs` | تصدير لقطة رسم مقتصرة على أعمدة مسموحة |
| `scripts/sync-pi.mjs` | نسخ احتياطي متسق لقاعدة SQLite البعيدة |
| `docs/DATASET.md` | المخطط والاستثناءات والتحقق وملاحظات الحقوق |

## تشغيل سريع

يتطلب Git و **Node.js 24 أو أحدث**.

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

Linux أو macOS:

```bash
git clone https://github.com/lachlanchen/LexiconAtlas.git
cd LexiconAtlas
npm ci
npm run build
mkdir -p data
curl -fL https://github.com/lachlanchen/LexiconAtlas/releases/latest/download/english-word-graph.sqlite3 -o data/english-word-graph.sqlite3
LKT_GRAPH_DB="$PWD/data/english-word-graph.sqlite3" npm start
```

افتح **http://127.0.0.1:8091/** وأبقِ الطرفية قيد التشغيل. توضع ملفات قاعدة البيانات
في `data/` أو ضمن أصول الإصدار، وهي مستبعدة من Git عمدًا.

## التطوير والتحقق

```bash
npm test
npm run build
```

تغطي الاختبارات تطبيع الفهرس وإسقاطات اللقطة وترشيح الحالات والبحث وحدود الجوار
وتجميع الأدلة وسلوك الإخفاق. تجمع عملية البناء Three.js وd3-force-3d وVite وحزم
الخطوط المحلية.

## مجموعة البيانات والخصوصية والحقوق

ينشئ المصدّر قاعدة جديدة من أعمدة مسموحة فقط. تستبعد اللقطة العامة الكتب والقواميس
الأصلية والمقاطع ونص OCR والمطالبات وسجل الاستفسارات وحالة التشغيل وJSON العشوائي
ومسارات الملفات الخاصة. مراجع المصادر معرّفات وليست استشهادات مولدة. تكشف اختبارات
السلامة والمجموع الاختباري المشكلات البنيوية أو التلف العرضي، لكنها لا تثبت كل ادعاء.

اقرأ [دليل مجموعة البيانات](../docs/DATASET.md) قبل نشر لقطة أخرى. لا تنشر إلا ما
تملك حق مشاركته. قد تحتاج التعريفات القصيرة والأوصاف اللغوية المأخوذة من المصادر
إلى مراجعة حقوق حتى بعد استبعاد مقاطع الكتب. لا يتضمن هذا المستودع حاليًا ملف ترخيص؛
لذلك لا تمنح رؤيته العامة وحدها إذنًا بإعادة استخدام الكود أو البيانات.

## الاستشهاد

إذا استخدمت Lexicon Atlas في بحث، فاستشهد بالمستودع. يقرأ GitHub ملف
[CITATION.cff](../CITATION.cff) ويعرض لوحة **Cite this repository** في صفحة المستودع.

```bibtex
@software{chen_lexicon_atlas_2026,
  author = {Chen, Lachlan},
  title = {Lexicon Atlas: A Local-First Three-Dimensional Lexical Knowledge Graph Explorer},
  year = {2026},
  url = {https://github.com/lachlanchen/LexiconAtlas}
}
```

## الحالة

Lexicon Atlas مستكشف مبكر قيد التطوير، وليس قاموسًا تأثيليًا موثوقًا. يفضل الإصدار
الأول قابلية الفحص وإظهار الفجوات على ادعاء الاكتمال. تفيد المشكلات التي تحدد أخطاء
بيانات أو واجهة قابلة لإعادة الإنتاج؛ أما تصحيح المحتوى فيتم أولًا في LKT قبل تصدير
لقطة مرشحة جديدة.
