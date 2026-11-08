# REQUIREMENTS.md

Track B – Vườn Toán Lớp 3 – dạng bài "Ước lượng trước khi tính đúng"

- Nhóm: 32
- Mã nhóm: 173820_N32
- Thành viên (MSSV): 202414375; 202414028; 202413965
- Phiên bản: bản nháp cho Checkpoint 1, ngày 08/11/2026

## 1. Mục tiêu

Thêm một dạng bài luyện tập vào Vườn Toán: học sinh ước lượng kết quả của một phép nhân hoặc chia trước, rồi mới tính kết quả đúng. Server chấm cả hai bước bằng code. Không dùng LLM để tạo hay chấm đáp án.

## 2. Phạm vi

Làm:
- Một loại câu hỏi mới (tạm đặt tên `estimate`) và cách chấm riêng cho nó.
- Ít nhất 12 câu hỏi synthetic trong `data/seed.json`.
- Giao diện hai bước trong `public/assets/js/pages/exercise.js`.
- Lệnh `npm test`, CI chạy trên Pull Request, tài liệu bàn giao.

Không làm:
- Đổi cách hoạt động của 4 loại câu hỏi cũ (`multiple-choice`, `input`, `compare`, `paint`).
- Thêm nội dung Toán hay SGK mới.
- Sửa `server/auth.js`, session, tài khoản mẫu, deployment, các route `/api/auth`, `/api/teacher`, `/api/admin`.
- Dùng LLM sinh đáp án, dùng dữ liệu thật, deploy public.

## 3. Yêu cầu

- R1. Có một bộ câu hỏi mới gắn vào một bài học đã có. Học sinh vào từ luồng học bình thường, không qua trang riêng.
- R2. Mỗi câu là một phép nhân hoặc chia số nguyên, và đáp án đúng là số nguyên.
- R3. Học sinh làm hai bước: nhập ước lượng và chốt, sau đó mới nhập kết quả đúng.
- R4. Server tính khoảng chấp nhận từ đáp án đúng bằng một công thức cố định (xem ADR-002) và chấm ước lượng theo khoảng đó. Kết quả đúng được chấm bằng so sánh số.
- R5. Một câu chỉ tính là đúng khi cả ước lượng hợp lý và kết quả đúng (xem ADR-004). Phản hồi cho học sinh phân biệt 4 trường hợp: (1) ước lượng hợp lý, kết quả đúng; (2) ước lượng hợp lý, kết quả sai; (3) ước lượng chưa hợp lý, kết quả đúng; (4) cả hai chưa đúng.
- R6. Đầu vào chỉ nhận chuỗi số nguyên không âm, tối đa 6 chữ số, sau khi bỏ khoảng trắng đầu cuối. Giá trị khác (rỗng, chữ, số âm, số thập phân, `1e3`) coi là không hợp lệ và giao diện báo lỗi dễ hiểu.
- R7. Kết quả được lưu vào bảng `attempts` và `progress` hiện có. Ước lượng và kết quả đúng của học sinh cùng nằm trong `answers_json`. Tải lại trang không làm mất kết quả đã lưu.
- R8. API lấy câu hỏi không trả đáp án đúng và không trả khoảng chấp nhận.
- R9. Các bộ câu hỏi cũ vẫn chấm đúng như trước.
- R10. Luồng chính dùng được bằng bàn phím.

## 4. Acceptance criteria

| ID đề | Đạt khi | Kiểm tra bằng |
|---|---|---|
| B-01 | Từ danh sách bài học mở được bộ câu hỏi mới, không qua trang demo riêng | T-30 |
| B-02 | `data/seed.json` có ít nhất 12 câu `estimate`, id không trùng, đáp án nguyên, chạy lại `npm run reset-db` ra đúng bộ đó | T-20 |
| B-03 | Công thức khoảng và quy tắc chấm được viết trong `DECISIONS.md`; cùng input luôn cho cùng kết quả; có test | T-01 đến T-12 |
| B-04 | Lấy câu hỏi qua API không thấy đáp án đúng hay khoảng chấp nhận | T-31 |
| B-05 | Nộp bài xong, tải lại trang vẫn thấy kết quả đã lưu | T-32 |
| B-06 | Phản hồi phân biệt đúng 4 trường hợp ở R5 | T-13 đến T-16 |
| B-07 | `git diff` so với tag `bkt-2026-v1` không có thay đổi ở `server/auth.js`, các route auth/teacher/admin, tài khoản mẫu, deployment | T-40 |
| B-08 | Có test cho trường hợp bình thường, biên, không hợp lệ và chấm điểm | T-01 đến T-18 |
| B-09 | `npm test` đạt sau `npm ci` trên một bản clone mới | T-41 |
| B-10 | Workflow chạy `npm ci` và `npm test` trên Pull Request và cho kết quả xanh | T-42 |
| B-11 | Repo không có `.env`, token, tên thật; chỉ dùng tài khoản synthetic `hocsinhNN` | T-43 |
| B-12 | Làm trọn một lượt chỉ bằng bàn phím; nhập sai có thông báo dễ hiểu | T-33 |

## 5. Điều chưa chắc

Nhóm mới đọc `architecture-reference.md`, chưa đọc kỹ mã nguồn, nên còn mấy điểm cần kiểm tra:

1. Độ lớn của các phép nhân/chia trong `data/seed.json`. Câu mẫu trong tài liệu là bảng nhân 6 (`6 × 2`, `54 : 6`), mà ước lượng chỉ có ý nghĩa với số lớn hơn như `38 × 6`. Nếu cần dùng số lớn hơn, nhóm sẽ hỏi TA xem có bị tính là "thêm nội dung SGK mới" không.
2. `server/api.js` hoặc `exercise.js` có kiểm tra danh sách `type` hợp lệ hay không.
3. Bộ câu hỏi mới gắn vào bài học nào (`lessonId`).
4. Cách đăng nhập bằng tài khoản mẫu khi viết test API, mà không sửa phần auth.