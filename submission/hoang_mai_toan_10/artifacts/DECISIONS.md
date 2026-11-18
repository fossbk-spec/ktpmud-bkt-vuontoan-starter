# QUYẾT ĐỊNH THIẾT KẾ KẾT CẤU (ADR) - TRACK B

## ADR 1: Thiết kế Logic Chấm điểm & Kiểu Câu hỏi mới
* **Bối cảnh:** Tài liệu kiến trúc (Mục 3 & 4) chỉ rõ hệ thống hiện tại chấm điểm bằng so sánh chuỗi chính xác (`===`) và `correct_answer` chỉ lưu một giá trị chuỗi. Không có cấu trúc nào biểu diễn một "khoảng/range".
* **Quyết định:** 
  1. Thêm `type = 'estimate'` vào bảng `questions`.
  2. Mã hóa khoảng ước lượng vào cột `correct_answer` hiện có dưới dạng chuỗi `min-max` (ví dụ: `"40-50"`).
  3. Bổ sung một khối điều kiện `if (q.type === 'estimate')` tại API `POST /submissions` (file `server/api.js`). Logic này sẽ tách chuỗi ra để chấm điểm theo khoảng `[min, max]`, trong khi vẫn giữ nguyên logic `===` cho các `type` khác.
* **Lý do (Rationale):** Giải pháp này tuân thủ tuyệt đối cấu trúc Database gốc, không cần thay đổi Schema (không thêm cột, không dùng ORM). Đồng thời, việc dùng lệnh `if` để cô lập logic của `type` mới đảm bảo an toàn tuyệt đối cho 4 dạng bài cũ, đáp ứng tiêu chuẩn mở rộng hệ thống brownfield.

## ADR 2: Thiết kế giao diện (UI) cho câu hỏi Ước lượng
* **Bối cảnh:** Toàn bộ DOM phía client đang được tự dựng thuần bằng `fetch()` tại `public/assets/js/pages/exercise.js` (không framework).
* **Quyết định:** Tạo thêm hàm `renderEstimateQuestion(question)` bên trong file `exercise.js`. Giao diện sẽ chèn một thẻ `<input type="number">` để học sinh nhập ước lượng, sau đó tái sử dụng lại hàm `submitAnswers()` hiện có để gửi dữ liệu lên server theo đúng luồng cũ.
* **Lý do (Rationale):** Tận dụng tối đa bộ khung render tĩnh hiện tại. Việc ép thẻ input dạng `number` cũng giúp chặn từ sớm các lỗi nhập liệu sai (chữ cái) ngay từ frontend.