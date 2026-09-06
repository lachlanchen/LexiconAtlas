[English](../README.md) · [العربية](README.ar.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Tiếng Việt](README.vi.md) · [中文 (简体)](README.zh-Hans.md) · [中文（繁體）](README.zh-Hant.md) · [Deutsch](README.de.md) · [Русский](README.ru.md)

[![LazyingArt banner](https://github.com/lachlanchen/lachlanchen/raw/main/figs/banner.png)](https://github.com/lachlanchen/lachlanchen/blob/main/figs/banner.png)

# Lexicon Atlas

*Khám phá gốc từ, hình thái, nghĩa và bản dịch trong một đồ thị tri thức ba chiều chạy cục bộ.*

[![Release](https://img.shields.io/github/v/release/lachlanchen/LexiconAtlas?label=dataset)](https://github.com/lachlanchen/LexiconAtlas/releases/latest)
[![Node.js 24+](https://img.shields.io/badge/Node.js-24%2B-339933?logo=nodedotjs&logoColor=white)](../package.json)
[![Local first](https://img.shields.io/badge/runtime-local--first-D5F879)](../docs/DATASET.md)
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-GitHub-%23ea4aaa?logo=githubsponsors&logoColor=white)](https://github.com/sponsors/lachlanchen)

Lexicon Atlas là trình duyệt chỉ đọc cho một đồ thị từ vựng thực tế do
[Local Knowledge Terminal](https://github.com/lachlanchen/LocalKnowledgeTerminal) chuẩn bị.
Công cụ biến từ, hình vị, dạng lịch sử đã ghi nhận, nghĩa, cách phát âm, bản dịch,
mệnh đề và tham chiếu nguồn thành một mạng có thể tìm kiếm và kiểm tra mà không cần
gửi bộ sưu tập tới dịch vụ đám mây.

| Donate | PayPal | Stripe |
| --- | --- | --- |
| [![Donate](https://img.shields.io/badge/Donate-LazyingArt-0EA5E9?style=for-the-badge&logo=kofi&logoColor=white)](https://chat.lazying.art/donate) | [![PayPal](https://img.shields.io/badge/PayPal-RongzhouChen-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/RongzhouChen) | [![Stripe](https://img.shields.io/badge/Stripe-Donate-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://buy.stripe.com/aFadR8gIaflgfQV6T4fw400) |

[![Giao diện máy tính thực của Lexicon Atlas](../docs/images/atlas-desktop.png)](https://github.com/lachlanchen/LexiconAtlas/releases/latest)

*Đây là ảnh chụp ứng dụng thật với bản chụp dữ liệu làm việc cục bộ, không phải mô hình tạo sinh. Bản phát hành công khai dùng bộ dữ liệu nhỏ hơn và được lọc có chủ đích.*

## Nội dung có thể khám phá

- Tìm từ và nhãn, rồi lần theo quan hệ có hướng trong phạm vi một, hai hoặc ba bước.
- Xem gốc từ, tiền tố, hậu tố, dạng lịch sử, nghĩa, phát âm, bản dịch, độ tin cậy, trạng thái vòng đời và mã nguồn tham chiếu khi có.
- Lọc theo loại nút, ngôn ngữ, cơ sở bằng chứng và trạng thái; chuyển giữa bố cục không gian và phẳng.
- Xuất phần đồ thị đang hiển thị dưới dạng JSON.
- Tính bố cục lực trong Web Worker và vẽ nút, liên kết bằng Three.js.
- Dùng cùng một giao diện trên máy tính và màn hình hẹp.

Lexicon Atlas trực quan hóa các mệnh đề đã lưu; công cụ không suy ra lịch sử từ chỉ vì
các nút ở gần nhau. LKT phụ trách nhập liệu, truy xuất, làm giàu bằng mô hình cục bộ và
sửa chữa. Atlas không gọi mô hình đám mây, không tạo trích dẫn và không ghi ngược vào
đồ thị làm việc.

## Bản chụp công khai hiện tại

Bản [v0.1.0](https://github.com/lachlanchen/LexiconAtlas/releases/tag/v0.1.0), phát hành
ngày 2026-09-05, gồm cơ sở SQLite có ngày tạo, tệp manifest và danh sách SHA-256.
Manifest ghi nhận:

| Bản ghi | Số lượng | Bản ghi | Số lượng |
| --- | ---: | --- | ---: |
| Thực thể | 15,925 | Thuật ngữ | 9,484 |
| Hình vị | 1,573 | Dạng lịch sử | 404 |
| Nghĩa | 2,180 | Bản dịch | 847 |
| Cách phát âm | 1,046 | Cạnh thực thể có kiểu | 15,197 |
| Mệnh đề quan hệ | 9,255 | Bản ghi bằng chứng | 13,431 |

Tiếng Anh là ngôn ngữ thuật ngữ chính; tiếng Trung, Nhật, Pháp và Ả Rập cũng có mặt
nhưng độ phủ không đồng đều. `accepted` chỉ là trạng thái trong quy trình, không bảo
đảm tính đúng đắn về dữ kiện hay ngôn ngữ học. Vẫn có thể thiếu nghĩa, lịch sử thưa,
bản ghi trùng hoặc liên kết sai.

## Kiến trúc và ranh giới

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

Máy chủ chỉ liên kết với localhost. Sau khi tải mã nguồn, phụ thuộc và cơ sở dữ liệu,
việc khám phá thông thường diễn ra cục bộ. Các bản phát hành là bản chụp cố định chứ
không phải dịch vụ tăng trưởng trực tiếp, và Atlas không thay thế cơ sở làm việc riêng
của LKT.

## Bản đồ kho mã

| Đường dẫn | Vai trò |
| --- | --- |
| `src/main.js` | Tìm kiếm, lọc, kiểm tra và điều khiển thích ứng |
| `src/scene.js` | Vẽ và tương tác đồ thị bằng WebGL |
| `src/layout.worker.js` | Bố cục lực ba chiều trong worker |
| `lib/snapshot.mjs` | Truy vấn SQLite chỉ đọc và chiếu đồ thị |
| `server.mjs` | API localhost và máy chủ tài nguyên tĩnh |
| `scripts/export-public.mjs` | Xuất bản chụp chỉ từ các cột được phép |
| `scripts/sync-pi.mjs` | Quy trình sao lưu SQLite từ xa nhất quán |
| `docs/DATASET.md` | Lược đồ, phần loại trừ, kiểm tra và quyền |

## Khởi động nhanh

Cần Git và **Node.js 24 trở lên**.

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

Linux hoặc macOS:

```bash
git clone https://github.com/lachlanchen/LexiconAtlas.git
cd LexiconAtlas
npm ci
npm run build
mkdir -p data
curl -fL https://github.com/lachlanchen/LexiconAtlas/releases/latest/download/english-word-graph.sqlite3 -o data/english-word-graph.sqlite3
LKT_GRAPH_DB="$PWD/data/english-word-graph.sqlite3" npm start
```

Mở **http://127.0.0.1:8091/** và giữ terminal đang chạy. Tệp nhị phân cơ sở dữ liệu
được đặt trong `data/` hoặc tài sản phát hành và được chủ ý loại khỏi Git.

## Phát triển và kiểm tra

```bash
npm test
npm run build
```

Bộ kiểm thử bao quát chuẩn hóa danh mục, phép chiếu bản chụp, lọc trạng thái, tìm kiếm,
giới hạn vùng lân cận, nhóm bằng chứng và hành vi khi lỗi. Bản dựng đóng gói Three.js,
d3-force-3d, Vite và các gói phông chữ cục bộ.

## Dữ liệu, riêng tư và quyền

Trình xuất tạo cơ sở mới từ các cột trong danh sách cho phép. Bản công khai loại bỏ
sách và từ điển gốc, đoạn văn, văn bản OCR, prompt, lịch sử yêu cầu, trạng thái chạy,
JSON tùy ý và đường dẫn riêng. Tham chiếu nguồn là mã định danh, không phải trích dẫn
được tạo tự động. Kiểm tra tính toàn vẹn và checksum phát hiện lỗi cấu trúc hoặc hỏng
ngẫu nhiên, nhưng không chứng minh từng mệnh đề từ vựng.

Hãy đọc [hướng dẫn dữ liệu](../docs/DATASET.md) trước khi công bố bản chụp khác. Chỉ
đăng tài liệu mà bạn có quyền chia sẻ. Định nghĩa ngắn và mô tả ngôn ngữ bắt nguồn từ
tài liệu vẫn có thể cần rà soát quyền dù đã loại đoạn sách. Kho mã hiện chưa có tệp
giấy phép, vì vậy việc công khai không tự động cấp quyền tái sử dụng mã hay dữ liệu.

## Trích dẫn

Nếu dùng Lexicon Atlas trong nghiên cứu, hãy trích dẫn kho mã. GitHub đọc
[CITATION.cff](../CITATION.cff) và hiển thị bảng **Cite this repository** trên trang kho.

```bibtex
@software{chen_lexicon_atlas_2026,
  author = {Chen, Lachlan},
  title = {Lexicon Atlas: A Local-First Three-Dimensional Lexical Knowledge Graph Explorer},
  year = {2026},
  url = {https://github.com/lachlanchen/LexiconAtlas}
}
```

## Trạng thái

Lexicon Atlas là trình khám phá giai đoạn đầu đang phát triển, không phải từ điển từ
nguyên có thẩm quyền. Bản đầu ưu tiên khả năng kiểm tra và thể hiện rõ khoảng trống hơn
là tuyên bố đầy đủ. Báo cáo lỗi dữ liệu hay giao diện có thể tái hiện rất hữu ích; việc
sửa nội dung phải thực hiện trong LKT trước khi xuất bản chụp đã lọc mới.
