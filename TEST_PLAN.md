# TEST_PLAN — Kế hoạch kiểm thử — Track B

## Tóm tắt

Nhóm 28 kiểm thử theo ba tầng: unit cho hàm thuần (dải, biên, đầu vào sai, tính tất định), API/tích hợp trên DB tạm (không lộ đáp án, chấm và lưu đúng, hồi quy type cũ), và kiểm tra thủ công (bàn phím, thông báo lỗi, an toàn). CI chạy `npm ci` và `npm test` trên Node 18 và 20 cho mỗi Pull Request.

## 1. Phạm vi và chiến lược

Kiểm thử bao phủ dạng bài `estimate` và hồi quy cho 4 type hiện có, theo các tiêu chí AC-1…AC-9 và B-01…B-12 (REQUIREMENTS.md). Ba tầng:

1. **Unit** cho hàm thuần (`computeEstimateBand`, `parseBand`, `isReasonableEstimate`, `classifyFeedback`) — nhanh, không cần DB.
2. **API/tích hợp** trên server thật với cơ sở dữ liệu SQLite tạm, đăng nhập bằng tài khoản synthetic của starter qua route hiện có (không sửa `auth.js`).
3. **Thủ công** cho khả năng truy cập bàn phím, thông báo lỗi và checklist an toàn.

**Công cụ.** Trình chạy test tích hợp của Node (`node --test`) và `assert`; gọi HTTP bằng `fetch` có sẵn từ Node 18; không thêm dependency nếu không cần. `npm test` chạy toàn bộ tầng 1–2.

**Môi trường.** Node.js 18 và 20; Ubuntu (CI) và máy cục bộ của nhóm. Trước mỗi lần chạy API test, khởi tạo DB tạm bằng `reset-db` (hoặc đường dẫn DB tạm nếu `db.js` cho cấu hình; cần xác nhận khi đọc mã).

## 2. Ca kiểm thử

### 2.1 Unit — logic ước lượng

| ID | Ca | Kỳ vọng | Loại |
|---|---|---|---|
| T-UNIT-01 | `computeEstimateBand(288)` | `{lo: 231, hi: 345}` | normal |
| T-UNIT-02 | Cả 12 fixture khớp REQUIREMENTS Phụ lục A | khớp từng dòng | normal |
| T-UNIT-03 | Ước lượng đúng bằng `lo` và bằng `hi` | hợp lý | boundary |
| T-UNIT-04 | Ước lượng bằng `lo − 1` và `hi + 1` | không hợp lý | boundary |
| T-UNIT-05 | Đầu vào `""`, `null`, `undefined`, `"abc"`, `"4.5"`, `"-3"`, `"1e3"`, `"  50 "` | chỉ `"  50 "` (sau trim) được xét hợp lệ; còn lại chấm sai, không ném lỗi | invalid |
| T-UNIT-06 | `parseBand("231-345")` hợp lệ; `"345-231"`, `"a-b"`, `"231"` | hợp lệ / bị từ chối có kiểm soát | invalid |
| T-UNIT-07 | Chuỗi số rất dài (`"9" × 30`) | chấm sai, không treo/crash | boundary |
| T-UNIT-08 | Gọi lại 1000 lần cùng đầu vào | cùng kết quả (tất định) | scoring |
| T-UNIT-09 | `classifyFeedback(estimateOk, exactOk)` cho 4 tổ hợp | 4 mã khác nhau | scoring |

### 2.2 API và tích hợp

| ID | Ca | Kỳ vọng |
|---|---|---|
| T-API-01 | Lấy câu hỏi bộ `estimate` | không có `correct_answer`/`correctAnswer`/chuỗi dải |
| T-API-02 | Quét toàn bộ JSON phản hồi tìm giá trị đáp án và dải của mọi câu | không tìm thấy |
| T-API-03 | Nộp toàn đúng | `score_percent = 100`, có bản ghi `attempts` |
| T-API-04 | Estimate đúng, exact sai | điểm một phần; phản hồi đúng tổ hợp |
| T-API-05 | Hồi quy: nộp bộ `phieu-bai-9-10` như trước | điểm không đổi |
| T-API-06 | Thiếu `answers`, id câu lạ, kiểu dữ liệu sai | 4xx hoặc chấm sai; không 5xx |
| T-API-07 | Nộp trực tiếp qua API: (a) `est-NN` bỏ trống/thiếu khoá + `est-NN-exact` đúng; (b) thiếu cả hai câu của một mục | (a) estimate chấm sai, exact chấm đúng, điểm một phần, phản hồi "không hợp lý / đúng"; (b) cả hai chấm sai; không 5xx (ADR-004) |
| T-INT-01 | Lấy danh sách bài học | bộ `estimate` xuất hiện trong luồng bài học (B-01) |
| T-INT-02 | Nộp, khởi động lại server, đọc tiến độ của người dùng | kết quả/tiến độ còn nguyên (B-05) |
| T-FIX-01 | Chạy `reset-db` hai lần liên tiếp | cùng tập câu hỏi `estimate` (B-02) |
| T-FIX-02 | Đếm fixture | ≥ 12 câu `estimate`, mỗi câu có câu `-exact` đi kèm |

### 2.3 Bảo mật, quyền riêng tư, giao diện (thủ công)

| ID | Ca |
|---|---|
| T-SEC-01 | `git diff --stat` so với tag `bkt-2026-v1`: không có thay đổi ở `server/auth.js`, deployment, các route `/api/auth|teacher|admin/*` (B-07) |
| T-SEC-02 | Quét secret/PII (ví dụ `gitleaks` hoặc `grep`): không có `.env`, token, dữ liệu thật (B-11) |
| T-UI-01 | Hiển thị đúng bốn thông điệp phản hồi |
| T-UI-02 | Chỉ dùng bàn phím: Tab đến ô nhập, Enter xác nhận, bước 2 nhận focus, vòng focus nhìn thấy (B-12) |
| T-UI-03 | Nhập sai: thông báo tiếng Việt dễ hiểu, được báo qua `aria-live` |
| T-UI-04 | Làm mới trang giữa bước 1 và bước 2: mục quay về bước 1, không có bản ghi `attempts` mới, không lỗi; hành vi tương tự 4 type cũ (ADR-004) |

## 3. Tự động hoá và CI

Tệp `.github/workflows/ci.yml`: kích hoạt khi mở/cập nhật Pull Request; ma trận Node 18 và 20; các bước `npm ci` rồi `npm test`. CI phải xanh trước khi nộp (B-10).

## 4. Tiêu chí hoàn thành

- Mọi ca T-UNIT, T-API, T-INT, T-FIX đạt từ clean checkout.
- Các ca thủ công có ghi nhận kết quả trong `TEST_REPORT.md`, kể cả giới hạn đã biết (ADR-004).
- Không có thay đổi ngoài phạm vi cho phép (T-SEC-01).
