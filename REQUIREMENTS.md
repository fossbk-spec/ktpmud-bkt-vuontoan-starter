# REQUIREMENTS — Dạng bài "Ước lượng trước khi tính đúng"

## Tóm tắt

Nhóm 28 chọn Track B và bổ sung vào Vườn Toán Lớp 3 một dạng bài mới: học sinh **ước lượng kết quả phép nhân/chia trước**, rồi mới tính chính xác. Server chấm tất định theo dải ±20% quanh đáp án, lưu kết quả bằng cơ chế sẵn có, không sửa xác thực và không đổi 4 dạng câu hỏi cũ. Báo cáo gồm: hiện trạng hệ thống, 9 yêu cầu chức năng, 5 yêu cầu phi chức năng, 9 tiêu chí chấp nhận, bảng truy vết với B-01…B-12 và 12 câu fixture.

## 1. Mục tiêu và phạm vi

Bổ sung vào hệ thống Vườn Toán Lớp 3 một dạng luyện tập mới: với phép nhân/chia đã có, người học **đưa ra ước lượng trước**, rồi mới thực hiện bước tính chính xác. Hệ thống chấm tất định phía server, phân biệt "ước lượng hợp lý" với "kết quả chính xác" và lưu kết quả bằng cơ chế sẵn có.

**Trong phạm vi:** một `type` câu hỏi mới (`estimate`); quy tắc sinh và chấm ước lượng; ≥ 12 câu fixture synthetic; chỉnh sửa tối thiểu `server/api.js` (chấm điểm), `public/assets/js/pages/exercise.js` (giao diện), `data/seed.json` (dữ liệu); `npm test`; CI.

**Ngoài phạm vi (theo đề Mục 8.4 và B-07):** `server/auth.js`, session, tài khoản mẫu, deployment, các route `/api/auth/*`, `/api/teacher/*`, `/api/admin/*`; nội dung SGK/chương trình mới; LLM sinh đáp án lúc chạy; dữ liệu thật; thay đổi hành vi của 4 type hiện có (`multiple-choice`, `input`, `compare`, `paint`).

## 2. Hiện trạng liên quan (theo `architecture-reference.md`)

| Hạng mục | Hiện trạng | Hệ quả cho thiết kế |
|---|---|---|
| Kiến trúc | Express + `better-sqlite3`, SQL thuần, giao diện tĩnh HTML/JS | Không có ORM/framework; sửa trực tiếp `api.js`, `db.js`, `exercise.js` |
| Câu hỏi | Bảng `questions`: `type`, `prompt`, `correct_answer` (NOT NULL), `points`, `set_id`, `lesson_id` | Không cần thêm cột nếu mã hoá dải trong `correct_answer` |
| Chấm điểm | `POST /api/submissions`: so sánh chuỗi chính xác sau `trim` + `toLowerCase` | Không có khái niệm "gần đúng"/khoảng — cần nhánh chấm riêng cho `estimate` |
| Che đáp án | `GET /api/question-sets/:setId/questions` không trả đáp án | Phải giữ nguyên cho type mới (B-04) |
| Lưu kết quả | `attempts` (kết quả từng lượt) và `progress` (tiến độ theo bài học) | Tái sử dụng, không thêm bảng |
| Giao diện | `exercise.js` dựng câu hỏi theo `type` | Thêm nhánh giao diện cho `estimate` |
| Kiểm thử | Starter chưa có `npm test` | Nhóm bổ sung script và CI (B-09, B-10) |

## 3. Yêu cầu chức năng

| ID | Yêu cầu |
|---|---|
| FR-1 | Mỗi mục luyện tập gồm hai bước hiển thị tuần tự: (1) học sinh nhập một số ước lượng; (2) sau khi bước 1 hợp lệ, hệ thống mở ô tính chính xác (type `input` sẵn có) cho cùng phép tính. |
| FR-2 | Type mới `estimate`: `correct_answer` mã hoá dải chấp nhận dạng `"lo-hi"` (hai số nguyên không âm, `lo ≤ hi`). Ước lượng hợp lý ⇔ `lo ≤ giá trị ≤ hi`. |
| FR-3 | Dải được tính bằng hàm thuần `computeEstimateBand(exact)`: `lo = ceil(exact × 80 / 100)`, `hi = floor(exact × 120 / 100)`, chỉ dùng số nguyên. Hằng số `TOLERANCE_PCT = 20` đặt tại một nơi duy nhất. |
| FR-4 | API lấy câu hỏi không trả đáp án đúng, kể cả chuỗi dải, của câu `estimate`. |
| FR-5 | `POST /api/submissions` chấm câu `estimate` theo FR-2 trong cùng lượt nộp với các câu khác; kết quả được lưu vào `attempts` và cập nhật `progress`/sao như hiện có. Hành vi chấm của 4 type cũ không đổi. |
| FR-6 | Phản hồi sau khi nộp phân biệt bốn tình huống: ước lượng hợp lý/không hợp lý × kết quả chính xác đúng/sai. Việc phân loại do server quyết định. |
| FR-7 | Bộ câu `estimate` gắn vào một `lesson_id` sẵn có để truy cập từ luồng học hiện có, không tạo trang demo rời. |
| FR-8 | Có ≥ 12 câu fixture synthetic trong `data/seed.json`, tái lập được bằng `npm run reset-db` (Phụ lục A). |
| FR-9 | Đầu vào không hợp lệ (rỗng, không phải số nguyên, âm, vượt miền, quá dài) bị chấm sai; hệ thống không trả lỗi 5xx. |

## 4. Yêu cầu phi chức năng

| ID | Yêu cầu |
|---|---|
| NFR-1 | Đáp án và đúng/sai hoàn toàn tất định bằng mã; không dùng LLM lúc chạy. |
| NFR-2 | Không sửa `server/auth.js`, session, tài khoản mẫu, deployment. |
| NFR-3 | Không chứa PII/secret; chỉ dùng tài khoản/alias synthetic; không commit `.env`. |
| NFR-4 | Luồng chính dùng được bằng bàn phím (Tab/Enter, vòng focus nhìn thấy, nhãn cho ô nhập); thông báo lỗi bằng tiếng Việt dễ hiểu, báo cho trình đọc màn hình qua `aria-live`. |
| NFR-5 | `npm test` đạt từ clean checkout; CI chạy `npm ci` và `npm test` trên Pull Request. |

## 5. Tiêu chí chấp nhận (Given – When – Then)

| ID | Tiêu chí |
|---|---|
| AC-1 | **Given** câu 48 × 6 có dải 231–345, **when** học sinh nhập ước lượng 300, **then** ước lượng được xếp "hợp lý". |
| AC-2 | **Given** dải 231–345, **when** nhập 231 và 345, **then** hợp lý; **when** nhập 230 và 346, **then** không hợp lý. |
| AC-3 | **Given** học sinh đã đăng nhập, **when** gọi API lấy câu hỏi của bộ `estimate`, **then** phản hồi không chứa `correct_answer`, `correctAnswer` hay chuỗi dải. |
| AC-4 | **Given** học sinh nộp bộ đề, **when** server chấm xong, **then** có bản ghi mới trong `attempts`, `progress` được cập nhật, và tải lại trang vẫn thấy kết quả đã lưu. |
| AC-5 | **Given** bốn tổ hợp (ước lượng hợp lý/không × chính xác đúng/sai), **when** nộp, **then** hiển thị bốn thông điệp khác nhau. |
| AC-6 | **Given** đầu vào `""`, `"abc"`, `"4.5"`, `"-3"`, chuỗi rất dài, **when** nộp, **then** câu bị chấm sai và API không trả lỗi 5xx. |
| AC-7 | **Given** học sinh mở bài học đã gắn bộ `estimate`, **then** bộ này xuất hiện trong luồng học hiện có. |
| AC-8 | **Given** chỉ dùng bàn phím, **when** làm hết một mục (bước 1 → bước 2 → nộp), **then** hoàn thành được và focus chuyển hợp lý. |
| AC-9 | **Given** bộ câu hỏi cũ (ví dụ `phieu-bai-9-10`), **when** nộp như trước, **then** điểm số không thay đổi so với trước khi thêm tính năng. |

## 6. Bảng truy vết với đề thi

| Đề | Yêu cầu | Tiêu chí | Kiểm chứng (xem TEST_PLAN.md) |
|---|---|---|---|
| B-01 | FR-7 | AC-7 | T-INT-01, demo |
| B-02 | FR-8 | — | T-FIX-01, T-FIX-02 |
| B-03 | FR-2, FR-3 | AC-1, AC-2 | T-UNIT-01…08 |
| B-04 | FR-4 | AC-3 | T-API-01, T-API-02 |
| B-05 | FR-5 | AC-4, AC-9 | T-API-03…05, T-INT-02 |
| B-06 | FR-6 | AC-5 | T-UNIT-09, T-UI-01 |
| B-07 | NFR-2 | — | T-SEC-01 |
| B-08 | FR-9 | AC-6 | T-UNIT-05…07, T-API-06 |
| B-09 | NFR-5 | — | `npm test` |
| B-10 | NFR-5 | — | workflow CI |
| B-11 | NFR-3 | — | T-SEC-02 |
| B-12 | NFR-4 | AC-8 | T-UI-02, T-UI-03 |

## 7. Giả định, ràng buộc và điểm cần xác nhận khi đọc mã nguồn

**Ràng buộc từ đề:** chỉ thêm, không đổi nghĩa 4 type hiện có (`architecture-reference.md` Mục 7); đề không khóa ngưỡng sai số, nên nhóm tự định nghĩa và giải trình trong `DECISIONS.md` (ADR-003).

**Điểm cần xác nhận (tài liệu chỉ trích đoạn mã, chưa đủ chi tiết):**

1. Cách `exercise.js` xác định bộ đề của một bài học, và nơi cần đăng ký để bộ `estimate` hiện ra (FR-7). Ví dụ trong seed: bộ `phieu-bai-9-10` gắn `lessonId: "bai-10"`; bài học đích của bộ `estimate` sẽ chọn khi rà `data/seed.json`.
2. Cấu trúc đầy đủ của `detail` trong phản hồi `POST /api/submissions`, để thêm trường phân loại phản hồi mà **chỉ bổ sung, không đổi tên hay bỏ trường cũ** (FR-6).
3. Route lấy câu hỏi loại `correct_answer` theo danh sách cột hay xoá sau `SELECT *` (FR-4).
4. Cách tính `points`, `score_percent` và sao khi một bộ có nhiều type; điểm của câu `estimate` sẽ đặt cùng thang với câu hiện có (3–5 điểm).
5. Cách test tích hợp đăng nhập bằng tài khoản synthetic của starter mà không sửa `auth.js`.

## Phụ lục A — 12 fixture synthetic

Mỗi mục gồm câu `est-NN` (type `estimate`) và câu `est-NN-exact` (type `input`). Đáp án và dải tính bằng FR-3. Cột "Ước lượng tiêu biểu" cho thấy cách làm tròn chục/số tương thích ở lớp 3 đều nằm trong dải.

| # | Phép tính | Đáp án | Dải chấp nhận | Ước lượng tiêu biểu |
|---|---|---|---|---|
| 1 | 48 × 6 | 288 | 231–345 | 50 × 6 = 300 |
| 2 | 52 × 4 | 208 | 167–249 | 50 × 4 = 200 |
| 3 | 19 × 7 | 133 | 107–159 | 20 × 7 = 140 |
| 4 | 63 × 5 | 315 | 252–378 | 60 × 5 = 300 |
| 5 | 87 × 3 | 261 | 209–313 | 90 × 3 = 270 |
| 6 | 24 × 8 | 192 | 154–230 | 20 × 8 = 160 |
| 7 | 91 × 2 | 182 | 146–218 | 90 × 2 = 180 |
| 8 | 38 × 6 | 228 | 183–273 | 40 × 6 = 240 |
| 9 | 252 : 6 | 42 | 34–50 | 240 : 6 = 40 |
| 10 | 175 : 5 | 35 | 28–42 | 150 : 5 = 30 |
| 11 | 328 : 4 | 82 | 66–98 | 320 : 4 = 80 |
| 12 | 144 : 6 | 24 | 20–28 | 120 : 6 = 20 |
