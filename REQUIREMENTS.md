# YÊU CẦU DỰ ÁN & TIÊU CHÍ NGHIỆM THU - TRACK B

## 1. Mục tiêu mở rộng
Bổ sung dạng bài "Ước lượng kết quả trước khi tính đúng" cho các phép nhân/chia.

## 2. Tiêu chí nghiệm thu (Acceptance Criteria)
* B-01: Dạng bài mới truy cập được từ luồng học hiện có.
* B-02: Có tối thiểu 12 fixture/câu hỏi synthetic tái lập được.
* B-03: Quy tắc tạo và chấm ước lượng được mô tả rõ, tất định (deterministic).
* B-04: API không trả đáp án đúng trước khi nộp.
* B-05: Server chấm và lưu kết quả; refresh không mất trạng thái.
* B-06: Có feedback phân biệt "ước lượng hợp lý" với "kết quả chính xác".
* B-07: Không sửa server/auth.js, session, tài khoản mẫu.
* B-08: Có test tự động (normal, boundary, invalid, scoring).
* B-09: Bổ sung lệnh `npm test`; chạy đạt từ clean checkout.
* B-10: Bổ sung CI chạy `npm ci` và `npm test` trên Pull Request.
* B-11: Không dùng PII/secret.
* B-12: Giao diện dùng được bằng bàn phím.

## 3. Quy tắc tạo và chấm điểm (Thuật toán Ước lượng)
Hệ thống xử lý chấm điểm khoảng (range) theo quy tắc tất định sau:
* **Tạo câu hỏi (Fixtures):** Khi tạo câu hỏi, khoảng ước lượng hợp lệ được mã hóa thành chuỗi theo định dạng `cận_dưới-cận_trên` và lưu trực tiếp vào trường `correct_answer` trong cơ sở dữ liệu (Ví dụ: `"40-50"`).
* **Định dạng Input:** Người dùng chỉ được nhập một số nguyên (ví dụ: `45`).
* **Chấm điểm:** Server nhận chuỗi đáp án của người dùng. Nếu là câu hỏi ước lượng, hệ thống sẽ parse chuỗi `correct_answer` ra hai số nguyên (min, max). Nếu số người dùng nhập thỏa mãn `min <= input <= max`, hệ thống ghi nhận là Hợp lý.

## 4. Kế hoạch Test (Dự kiến)
1. Input bình thường: Nhập số nguyên nằm TRONG khoảng ước lượng (chấm Đúng).
2. Input biên: Nhập số nguyên BẰNG đúng cận dưới hoặc cận trên (chấm Đúng).
3. Input sai: Nhập số nguyên NẰM NGOÀI khoảng ước lượng (chấm Sai).
4. Input lỗi: Bỏ trống ô nhập (validation ở frontend và backend chặn lại).
5. Input lỗi: Nhập chữ cái, ký tự đặc biệt, hoặc số thập phân.
6. Hồi quy (Regression): Test lại các câu hỏi cũ (input, multiple-choice) để đảm bảo logic chấm mới không làm hỏng bài cũ.