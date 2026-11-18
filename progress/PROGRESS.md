# PROGRESS — 01 — Track B

- Starter: `ktpmud-bkt-vuontoan-starter`
- Fork: `https://github.com/vie-nv23/ktpmud-bkt-vuontoan-starter`

## PC-1 — 11/11/2026

### 1.1. Tiến độ theo acceptance criteria

| Mã | Trạng thái (Chưa / Đang / Xong) | Bằng chứng (commit / CI / file) | Ghi chú |
|---|---|---|---|
| B-01 | Đang | `REQUIREMENTS.md` §1–2; `DECISIONS.md` ADR 2 | Đã xác định dạng bài mới và hướng tích hợp vào giao diện luyện tập; chưa có bằng chứng UI đã triển khai. |
| B-02 | Đang | `REQUIREMENTS.md` §2, §4 | Đã yêu cầu tối thiểu 12 fixture/câu hỏi synthetic; chưa xác minh có đủ fixture trong `data/seed.json`. |
| B-03 | Đang | `REQUIREMENTS.md` §3; `DECISIONS.md` ADR 1 | Đã đặc tả cách lưu khoảng `min-max` và quy tắc chấm `min <= input <= max`; cần triển khai và kiểm thử. |
| B-04 | Đang | `REQUIREMENTS.md` §2; README §3 | API lấy câu hỏi hiện được mô tả là không kèm đáp án. Cần kiểm tra lại API sau khi bổ sung dạng `estimate` và xác minh không lộ đáp án trước khi nộp. |
| B-05 | Chưa | `REQUIREMENTS.md` §2; README §3 | Yêu cầu server chấm, lưu kết quả và giữ trạng thái khi refresh; chưa có bằng chứng triển khai riêng cho luồng ước lượng. |
| B-06 | Chưa | `REQUIREMENTS.md` §2; `DECISIONS.md` ADR 2 | Đã có hướng thiết kế input cho câu hỏi ước lượng; chưa có bằng chứng feedback phân biệt ước lượng hợp lý và kết quả chính xác. |
| B-07 | Đang | `REQUIREMENTS.md` §2; `DECISIONS.md` ADR 1–2 | Đã ghi nhận yêu cầu không sửa `server/auth.js`, session và tài khoản mẫu; cần đối chiếu Git diff khi triển khai. |
| B-08 | Đang | `REQUIREMENTS.md` §4 | Đã liệt kê các trường hợp test normal, boundary, invalid và regression; chưa có bằng chứng test tự động đã chạy. |
| B-09 | Chưa | `package.json` | Hiện có `start`, `dev`, `reset-db`, `build:css`; chưa thấy script `npm test`. |
| B-10 | Chưa | Repository root; `.github/workflows/` | Chưa thấy workflow CI trong danh sách file hiện tại; cần bổ sung CI chạy `npm ci` và `npm test` trên Pull Request. |
| B-11 | Đang | README §Giới thiệu; `.gitignore`; `data/seed.json` | README mô tả đây là snapshot đã thay dữ liệu thật bằng dữ liệu hư cấu. Cần rà soát các thay đổi mới để bảo đảm không đưa PII/secret vào repo. |
| B-12 | Chưa | `REQUIREMENTS.md` §2, §4; `DECISIONS.md` ADR 2 | Đã nêu yêu cầu giao diện dùng được bằng bàn phím; chưa có bằng chứng kiểm thử accessibility cho giao diện mới. |

### 1.2. Sửa đổi bắt buộc từ Checkpoint 1

| Mục | Trạng thái | Bằng chứng |
|---|---|---|
| #1 — Bổ sung kiểu câu hỏi `estimate` và quy tắc chấm theo khoảng | Đang | `REQUIREMENTS.md` §3; `DECISIONS.md` ADR 1. Đã có thiết kế, chưa xác minh implementation. |
| #2 — Tích hợp giao diện nhập ước lượng vào luồng luyện tập | Đang | `DECISIONS.md` ADR 2. Đã mô tả hàm `renderEstimateQuestion(question)`, chưa có bằng chứng UI chạy. |
| #3 — Bổ sung fixture synthetic và kiểm tra dữ liệu seed | Chưa | `REQUIREMENTS.md` §2, §4. Yêu cầu tối thiểu 12 câu; cần kiểm tra và bổ sung dữ liệu. |
| #4 — Bổ sung test tự động và CI | Chưa | `REQUIREMENTS.md` §2, §4; `package.json`. Chưa thấy `npm test` và workflow CI. |

### 1.3. Timeline dự kiến đến khi hoàn thành

| Việc | Vai trò phụ trách | Mốc (CP2 15/11 · M3 · Freeze 19/11 · M4 20/11) | Ngày dự kiến |
|---|---|---|---|
| Chốt, review yêu cầu/ADR/test plan; hoàn thiện PROGRESS PC-1 | BA / BE | M2 | 11/11 |
| Bổ sung fixture, xử lý seed và logic chấm khoảng ở API | BE | CP2 15/11 | 15/11 |
| Triển khai UI nhập ước lượng và feedback hai phần | FE | CP2 15/11 | 15/11 |
| Viết test tự động, regression và bổ sung CI | BE / FE | M3 | 17/11 |
| Review code, security/privacy, accessibility và chuẩn bị Draft PR | BA / BE / FE | M3, PC-2 | 18/11 |
| Chốt release candidate và SHA | BA / BE / FE | Freeze 19/11 | 19/11 |
| Hoàn thiện hồ sơ và nộp bài theo hướng dẫn giảng viên | BA / BE / FE | M4 20/11 | 20/11 |

### 1.4. Rủi ro / đang vướng

- Tài liệu đã mô tả hướng triển khai nhưng chưa có bằng chứng tính năng Track B đã chạy thực tế.
- Cần bảo đảm logic chấm khoảng chỉ áp dụng cho `type = 'estimate'`, không làm thay đổi cách chấm các dạng câu hỏi cũ.
- Cần kiểm tra dữ liệu seed và database hiện có để tránh thiếu hoặc nhân đôi fixture khi khởi tạo lại.
- API không được trả `correct_answer` hoặc khoảng đáp án trước khi học sinh nộp bài.
- Cần kiểm thử đầu vào rỗng, chữ/ký tự đặc biệt, số thập phân, giá trị ngoài khoảng và hai giá trị đúng tại biên.
- Chưa có bằng chứng về `npm test` và CI; không đánh dấu hoàn thành trước khi có kết quả chạy thực tế.

### 1.5. Câu hỏi cho GV

- Q1: 12 fixture synthetic có cần phân bổ cố định thành 6 câu phép nhân và 6 câu phép chia không?
- Q2: Quy tắc xác định khoảng ước lượng `min-max` có cần theo một công thức cụ thể do giảng viên quy định không?
- Q3: Khi học sinh tải lại trang giữa quá trình làm bài, yêu cầu giữ trạng thái đến mức nào (câu hiện tại, câu đã trả lời, hay toàn bộ lượt làm)?

### 1.6. Phân công (alias hoặc vai trò, KHÔNG ghi họ tên/MSSV)

| Alias / vai trò | Đầu việc chính | Commit/PR tiêu biểu |
|---|---|---|
| BA | Phân tích yêu cầu, quyết định thiết kế, review đặc tả và theo dõi acceptance criteria | `REQUIREMENTS.md`, `DECISIONS.md`, `progress/PROGRESS.md` |
| BE | SQLite, fixture, API, logic chấm khoảng, validation, automated tests và CI | `server/`, `data/seed.json`, `package.json`, `.github/workflows/` |
| FE | Tích hợp luồng giao diện, nhập ước lượng, feedback và accessibility | `public/assets/js/pages/exercise.js` |

## PC-2 — 18/11/2026

> **Phạm vi xác minh:** Nội dung dưới đây được đối chiếu trực tiếp với ZIP `ktpmud-bkt-vuontoan-starter-main.zip` do nhóm cung cấp. ZIP không chứa lịch sử Git, thông tin SHA/branch, thư mục `.github/workflows/`, thư mục `tests/` hoặc hồ sơ Pull Request. Vì vậy, các thông tin này được ghi là chưa xác minh, không suy đoán từ bài của nhóm khác.

### 2.1. Đối chiếu timeline PC-1

| Việc (theo bảng 1.3) | Kế hoạch | Thực tế theo ZIP PC-2 | Lệch & lý do |
|---|---|---|---|
| Chốt yêu cầu/ADR và cập nhật PROGRESS PC-1 | 11/11 | Có `REQUIREMENTS.md`, `DECISIONS.md` và phần PC-1 trong `progress/PROGRESS.md`. | Đã có tài liệu đặc tả; nội dung PC-2 dưới đây cập nhật theo trạng thái mã nguồn trong ZIP. |
| Bổ sung fixture, seed và logic chấm khoảng | 15/11 | `data/seed.json` có 19 bộ câu hỏi, tổng 164 câu; chưa có câu hỏi `type = "estimate"`. `server/api.js` vẫn so sánh đáp án theo chuỗi chính xác. | Chưa triển khai yêu cầu ước lượng; cần bổ sung fixture và nhánh chấm khoảng. |
| Tích hợp UI nhập ước lượng và feedback | 15/11 | `public/assets/js/pages/exercise.js` chưa có phần xử lý `estimate`; chưa thấy luồng feedback riêng cho “ước lượng hợp lý” và “kết quả chính xác”. | Chưa có bằng chứng triển khai UI của Track B trong ZIP. |
| Test tự động, regression và CI | 17/11 | `package.json` chưa có script `test`; ZIP không có thư mục `tests/` hoặc `.github/workflows/`. | Chưa có bằng chứng test tự động/CI. Không thể kết luận test đã chạy xanh. |
| Review code, security/privacy và accessibility | 18/11 | `.gitignore` đã loại trừ `.env`, database và một số file secret; README mô tả dữ liệu mẫu là hư cấu. Chưa có checklist bảo mật hoặc báo cáo kiểm thử bàn phím trong ZIP. | Mới có biện pháp nền; cần rà soát thực tế secret/PII và kiểm thử accessibility. |
| Chuẩn bị Draft PR và kiểm tra `validate` | Trước 11:30 18/11 | ZIP không chứa URL PR hoặc kết quả check của GitHub. | Chưa xác minh đã tạo Draft PR đúng repository/nhánh và chưa có bằng chứng `validate` xanh. |
| Chốt release candidate và SHA | Freeze 23:59 19/11 | ZIP không có `.git`, tag hoặc commit SHA. | Chưa thể xác minh; cập nhật sau khi lấy SHA và tag trực tiếp từ fork. |

### 2.2. Tiến độ theo acceptance criteria (B-01–B-12)

> Trạng thái được đánh giá theo bằng chứng có trong ZIP, không dựa trên mô tả dự kiến trong tài liệu. “Đang” nghĩa là đã có một phần nền tảng/đặc tả nhưng chưa đủ bằng chứng nghiệm thu tiêu chí Track B.

| Mã | Trạng thái | Bằng chứng trong ZIP | Ghi chú |
|---|---|---|---|
| B-01 | Đang | `REQUIREMENTS.md` §1–2; `DECISIONS.md` ADR 2; `public/assets/js/pages/exercise.js` | Đã có đặc tả và luồng luyện tập hiện hữu, nhưng chưa thấy tích hợp loại câu hỏi `estimate` vào UI. |
| B-02 | Chưa | `data/seed.json` | Có 19 bộ, 164 câu hỏi hiện hữu; không tìm thấy câu hỏi `type = "estimate"`. Chưa đạt tối thiểu 12 fixture Track B. |
| B-03 | Đang | `REQUIREMENTS.md` §3; `DECISIONS.md` ADR 1 | Đã mô tả biểu diễn khoảng `min-max` và quy tắc `min <= input <= max`; chưa có logic tương ứng trong `server/api.js`. |
| B-04 | Đang | `server/api.js` — GET `/question-sets/:setId/questions` và POST `/submissions` | GET hiện chỉ chọn các trường không gồm `correct_answer`; đây là nền tảng bảo vệ đáp án. Tuy nhiên, chưa có loại `estimate` và chưa kiểm thử bảo đảm không lộ khoảng đáp án trước khi nộp. |
| B-05 | Đang | `server/api.js` — POST `/submissions`; `server/db.js` — bảng `attempts`, `progress` | Hệ thống hiện có chấm/lưu kết quả chung cho bài tập; chưa có bằng chứng xử lý đáp án theo khoảng và kiểm tra refresh riêng cho Track B. |
| B-06 | Chưa | `REQUIREMENTS.md` §2; `DECISIONS.md` ADR 2; `public/assets/js/pages/exercise.js` | Chưa thấy feedback phân biệt ước lượng hợp lý với kết quả chính xác. |
| B-07 | Đang | `server/auth.js`; `server/db.js`; `data/seed.json` | ZIP có các file nền cần bảo toàn. Do ZIP không có Git history/baseline nên chưa thể xác nhận bằng `git diff` rằng không sửa file cấm hoặc tài khoản mẫu. |
| B-08 | Chưa | `REQUIREMENTS.md` §4; không có `tests/` trong ZIP | Mới có kế hoạch test normal/boundary/invalid/regression; chưa có test tự động và kết quả chạy. |
| B-09 | Chưa | `package.json` | Chưa khai báo script `npm test`; chưa có bằng chứng chạy test từ clean checkout. |
| B-10 | Chưa | Không tìm thấy `.github/workflows/` trong ZIP | Chưa có workflow CI chạy `npm ci` và `npm test` trên Pull Request trong tài liệu được cung cấp. |
| B-11 | Đang | `.gitignore`; `README.md`; `data/seed.json` | `.gitignore` loại trừ `.env`, database và file secret phổ biến; README nói dữ liệu công khai đã được thay bằng dữ liệu hư cấu. Vẫn cần rà soát secret/PII trên toàn bộ diff và lịch sử Git. |
| B-12 | Chưa | `REQUIREMENTS.md` §2; `DECISIONS.md` ADR 2 | Đã nêu yêu cầu hỗ trợ bàn phím và dự kiến dùng input số; chưa có bằng chứng kiểm thử thao tác bàn phím/focus trên UI mới. |

### 2.3. Sẵn sàng nộp bài

| Deliverable | Có / Chưa | Đường dẫn / trạng thái |
|---|---|---|
| `README.md` (cài đặt/chạy) | Có | `README.md` — có hướng dẫn Node.js, cài dependencies và chạy ứng dụng. |
| `REQUIREMENTS.md` | Có | `REQUIREMENTS.md` — có mục tiêu, B-01–B-12, quy tắc và kế hoạch test. |
| `DECISIONS.md` / ADR | Có | `DECISIONS.md` — có ADR 1 về logic chấm và ADR 2 về UI. |
| Test tự động + CI xanh | Chưa | ZIP không có `tests/` và `.github/workflows/`; chưa có link run CI. |
| `TEST_REPORT.md` | Chưa | Không tìm thấy trong ZIP. `REQUIREMENTS.md` §4 là kế hoạch test, không thay thế báo cáo kết quả. |
| `SECURITY_PRIVACY_CHECKLIST.md` | Chưa | Không tìm thấy trong ZIP. |
| `AI_USE.md` | Chưa | Không tìm thấy trong ZIP. |
| `CONTRIBUTIONS.md` | Chưa | Không tìm thấy trong ZIP. |
| Slide / demo script ≤ 7 phút | Chưa xác minh | Không tìm thấy tài liệu slide/demo trong ZIP. |
| Draft PR vào `fossbk-spec/ktpmud-project`, check `validate` xanh | Chưa xác minh | ZIP không chứa URL PR hoặc kết quả GitHub Checks. Cần bổ sung link PR thực tế và xác nhận check `validate`. |
| `source-ref.json` theo template nộp bài | Chưa xác minh | Không thấy file này trong ZIP; cần kiểm tra hồ sơ submission riêng theo template của giảng viên. |

### 2.4. Thông tin PC-2 theo yêu cầu nộp bài

| Trường / file | Giá trị tại PC-2 theo bằng chứng hiện có | Sau Freeze (23:59 19/11) |
|---|---|---|
| `starter_repo` | `https://github.com/fossbk-spec/ktpmud-bkt-vuontoan-starter` | Giữ nguyên |
| `starter_commit` | Chưa xác định được SHA của tag starter từ ZIP (ZIP không có Git metadata). Cần lấy SHA tag `bkt-2026-v1` hoặc `bkt-2026-v1.1` theo hướng dẫn. | Giữ nguyên SHA đã xác minh |
| `fork_url` | `https://github.com/vie-nv23/ktpmud-bkt-vuontoan-starter` | Giữ nguyên |
| `final_commit` | Chưa xác minh; cần lấy SHA commit PC-2 trên fork sau khi push. | SHA commit đã Freeze |
| `release_tag` | Dự kiến: `bkt-2026-01-rc1` (Track B, mã nhóm 01 theo `progress/PROGRESS.md`; cần đối chiếu quy ước mã nhóm trên lớp). | Tag được tạo thật trên fork |
| `ci_run_url` | Chưa có bằng chứng CI trong ZIP. | Link CI của commit đã Freeze |
| `artifacts/*.md` | Có `REQUIREMENTS.md`, `DECISIONS.md`; các tài liệu báo cáo/checklist còn thiếu theo bảng 2.3. | Bản cuối đã cập nhật và đưa vào đúng thư mục submission |

> Không để nguyên các chuỗi `REPLACE_...` của template. Không điền SHA, URL CI, tag hoặc trạng thái PR bằng giá trị giả định.

### 2.5. Việc còn lại đến Freeze (23:59 19/11)

| Việc | Vai trò phụ trách | Hạn |
|---|---|---|
| Bổ sung tối thiểu 12 fixture `estimate` synthetic vào `data/seed.json`; kiểm tra dữ liệu được nạp vào SQLite | BE | 19/11 |
| Triển khai chấm khoảng cho `type = 'estimate'` trong `server/api.js`, giữ nguyên cách chấm các dạng cũ | BE | 19/11 |
| Tích hợp UI nhập ước lượng và feedback theo yêu cầu B-06 | FE | 19/11 |
| Bổ sung test normal, boundary, invalid, scoring và regression; khai báo `npm test` | BE / QA | 19/11 |
| Tạo workflow CI chạy `npm ci` và `npm test` khi có Pull Request; lưu link run | BE / QA | 19/11 |
| Kiểm tra GET câu hỏi không lộ đáp án/khoảng đáp án; kiểm tra API chấm và lưu kết quả | BE / QA | 19/11 |
| Đối chiếu `git diff` với starter; xác nhận không sửa `server/auth.js`, session và tài khoản mẫu | Lead / BE | 19/11 |
| Rà soát secret/PII, dependency và bổ sung `SECURITY_PRIVACY_CHECKLIST.md` | Lead / BE | 19/11 |
| Kiểm thử UI bằng bàn phím, focus, thông báo lỗi và tải lại trang | FE / QA | 19/11 |
| Hoàn thiện `TEST_REPORT.md`, `AI_USE.md`, `CONTRIBUTIONS.md`, README và slide/demo ≤ 7 phút | Cả nhóm | 19/11 |
| Tạo Draft PR từ fork vào `fossbk-spec/ktpmud-project`, đúng nhánh `submit/<slug>-<ma_nhom>`; kiểm tra `validate` | Lead | Theo mốc nộp của GV |
| Freeze code, tạo tag `bkt-2026-01-rc1`, lấy SHA 40 ký tự và link CI cuối | Lead / BE | Trước 23:59 19/11 |
| Cập nhật `source-ref.json` và chuyển PR sang Ready for review khi đủ điều kiện | Lead | 20/11 |

### 2.6. Rủi ro / câu hỏi còn mở

- **R1 — Chưa có implementation Track B trong ZIP:** `data/seed.json` chưa có fixture `estimate`, API vẫn chấm so sánh chuỗi và `exercise.js` chưa có nhánh UI `estimate`. Đây là phần việc ưu tiên cao nhất.
- **R2 — Chưa có test/CI:** `package.json` chưa có `npm test`; không có thư mục test hoặc workflow CI trong ZIP. Chưa thể tuyên bố test/CI xanh.
- **R3 — Bảo vệ đáp án:** API GET hiện không chọn `correct_answer`, nhưng cần kiểm thử lại sau khi bổ sung dạng estimate để bảo đảm không trả khoảng đáp án trước khi nộp.
- **R4 — Bảo toàn baseline:** ZIP không có Git history nên chưa thể xác minh diff với starter, SHA commit hoặc tag.
- **R5 — Bảo mật và dữ liệu:** `.gitignore` đã loại trừ một số file nhạy cảm và README mô tả dữ liệu giả lập; vẫn cần rà soát toàn bộ repository/diff trước khi nộp.
- **R6 — Hồ sơ nộp bài:** còn thiếu `TEST_REPORT.md`, `SECURITY_PRIVACY_CHECKLIST.md`, `AI_USE.md`, `CONTRIBUTIONS.md`, slide/demo và bằng chứng Draft PR/validate trong ZIP.

**Câu hỏi cần xác nhận với GV (nếu chưa có câu trả lời chính thức):**
- Q1: 12 fixture synthetic có cần phân bổ cố định thành 6 câu phép nhân và 6 câu phép chia không?
- Q2: Quy tắc xác định khoảng `min-max` có cần theo một công thức cụ thể do giảng viên quy định không?
- Q3: Khi học sinh tải lại trang giữa quá trình làm bài, yêu cầu giữ trạng thái đến mức nào (câu hiện tại, câu đã trả lời hay toàn bộ lượt làm)?

### 2.7. Kết luận PC-2

Theo ZIP được cung cấp, nhóm đã có nền tảng ứng dụng Vườn Toán với frontend, backend Express/SQLite, dữ liệu seed và các tài liệu đặc tả `REQUIREMENTS.md`, `DECISIONS.md`. Tuy nhiên, các phần cốt lõi của Track B — fixture estimate, logic chấm theo khoảng, UI/feedback, automated tests và CI — **chưa có bằng chứng triển khai trong ZIP**. Hồ sơ kiểm thử, checklist bảo mật, AI use, contributions và bằng chứng Draft PR cũng chưa có trong gói file này.

Đây là đánh giá theo snapshot ZIP, không khẳng định trạng thái hiện tại trên GitHub có giống hệt hay không. Trước khi nộp, nhóm cần cập nhật từ fork thực tế, bổ sung commit SHA, link CI, URL Draft PR và kết quả `validate`. Hạn comment PC-2 ghi trong hướng dẫn là 11:30 ngày 18/11; thời điểm lập bản cập nhật này đã qua mốc đó, vì vậy không ghi nhận là đã xác nhận đúng hạn.

## Kết quả cuối — Freeze 19/11/2026

- Tag: `bkt-2026-01-rc1` · SHA: **Chưa xác minh — cập nhật sau khi tạo tag trên fork**.
- Trạng thái cuối từng mã AC: **Chưa chốt — cập nhật sau khi triển khai và kiểm thử B-01–B-12**.
- Những việc trong timeline chưa hoàn thành và lý do: **Chốt tại thời điểm Freeze; đối chiếu các mục còn mở tại PC-2 §2.5–2.6.**
