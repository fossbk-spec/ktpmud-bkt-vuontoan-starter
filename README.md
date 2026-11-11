Vườn Toán Lớp 3 — Dạng bài "Ước lượng trước khi tính đúng"
Nhóm thực hiện: Nhóm 28 — KTPMUD Hack Marathon 2026, Track B (`hoang_mai_toan`)
1. Giới thiệu
Dự án mở rộng ứng dụng Vườn Toán Lớp 3 (fork của `ktpmud-bkt-vuontoan-starter`, tag `bkt-2026-v1`) bằng một dạng luyện tập mới: học sinh ước lượng kết quả phép nhân/chia trước, rồi mới tính chính xác. Server chấm tất định, phân biệt "ước lượng hợp lý" với "kết quả chính xác" và lưu kết quả bằng cơ chế sẵn có (`attempts`, `progress`). Không dùng LLM để sinh đáp án; toàn bộ dữ liệu là synthetic.
2. Cách hoạt động
Hai bước trong một mục luyện tập. Bước 1 là câu `estimate` (id `est-NN`), học sinh nhập một số ước lượng. Sau khi bước 1 hợp lệ, giao diện mở bước 2 là câu `input` sẵn có (id `est-NN-exact`) để tính chính xác. Cả hai câu được chấm trong một lượt `POST /api/submissions`.
Quy tắc chấm. Với đáp án chính xác `E`, ước lượng `x` hợp lý khi `lo ≤ x ≤ hi`, trong đó `lo = ceil(E × 80 / 100)`, `hi = floor(E × 120 / 100)` (sai lệch ±20%, chỉ dùng số nguyên). Ví dụ `48 × 6 = 288` → dải 231–345; ước lượng `50 × 6 = 300` là hợp lý.
Mã hoá dữ liệu. Dải được lưu trong `correct_answer` của câu `estimate` dưới dạng `"lo-hi"`, không đổi schema; API lấy câu hỏi không trả đáp án hay dải.
Phản hồi bốn tổ hợp. Server phân loại (ước lượng hợp lý hay không) × (kết quả chính xác đúng hay sai); mỗi tổ hợp có một thông điệp riêng.
Fixture. 12 câu synthetic (phép nhân và chia) trong `data/seed.json`, tái lập bằng `npm run reset-db`.
3. Phạm vi thay đổi
Có thay đổi: `server/api.js` (nhánh chấm `estimate`), `public/assets/js/pages/exercise.js` (giao diện hai bước), `data/seed.json` (fixture), script `npm test`, workflow CI.
Không thay đổi: `server/auth.js`, session, tài khoản mẫu, deployment, các route `/api/auth|teacher|admin/*`, và hành vi của 4 type câu hỏi hiện có (`multiple-choice`, `input`, `compare`, `paint`).
4. Cài đặt và chạy
Yêu cầu: Node.js 18+.
```bash
npm ci
npm run reset-db     # tạo lại CSDL từ data/seed.json (gồm các câu fixture estimate)
npm start
npm test             # sẽ bổ sung ở giai đoạn Build
```
Đăng nhập bằng tài khoản synthetic của starter.
5. Kiểm thử
Ba tầng: unit cho hàm thuần (`computeEstimateBand`, `parseBand`, `isReasonableEstimate`, `classifyFeedback`), API/tích hợp trên SQLite tạm (không lộ đáp án, chấm và lưu đúng, hồi quy 4 type cũ), và thủ công (bàn phím, thông báo lỗi, an toàn). Dùng `node --test`; CI chạy `npm ci` và `npm test` trên Node 18 và 20 cho mỗi Pull Request.
6. Tài liệu
Tài liệu	Nội dung
`REQUIREMENTS.md`	Hiện trạng hệ thống, 9 yêu cầu chức năng, 5 yêu cầu phi chức năng, 9 tiêu chí chấp nhận (Given–When–Then), bảng truy vết B-01…B-12, 12 fixture
`DECISIONS.md`	5 quyết định thiết kế (ADR-001…005) kèm phương án, lý do, đánh đổi
`TEST_PLAN.md`	Chiến lược, các ca T-UNIT/T-API/T-INT/T-FIX/T-SEC/T-UI, CI, tiêu chí hoàn thành
7. Điểm còn cần xác nhận trong mã nguồn
Theo `REQUIREMENTS.md` Mục 7: cách `exercise.js` chọn bộ đề theo bài học; cấu trúc `detail` của phản hồi `POST /api/submissions`; cách route lấy câu hỏi loại `correct_answer`; cách tính điểm và sao khi một bộ trộn nhiều type; cách test đăng nhập bằng tài khoản synthetic mà không sửa `auth.js`.
8. Tiến độ
Mốc	Ngày	Trạng thái
M1 — Understand: yêu cầu, ADR, kế hoạch test	05–08/11/2026	Đã có tài liệu (Checkpoint 1: cuối 08/11)
M2 — Build: vertical slice, test	09–15/11/2026	Chưa bắt đầu (Checkpoint 2: cuối 15/11)
M3 — Harden: CI, bảo mật, tài liệu bàn giao	16–19/11/2026	Chưa bắt đầu
M4 — Nộp bài	20/11/2026	—
Demo/Viva	21/11/2026	—
Sản phẩm phục vụ học tập, dùng dữ liệu synthetic.
