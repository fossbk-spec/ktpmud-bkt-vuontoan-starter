# CÁC QUYẾT ĐỊNH THIẾT KẾ KIẾN TRÚC (DECISIONS)

## ADR-01: Thuật toán ước lượng tất định và mở rộng cơ sở dữ liệu SQLite

### 1. Bối cảnh
Cần thêm dạng bài ước lượng trên nền tảng Node.js/Express và SQLite đã có sẵn của starter repo, đảm bảo không sửa cơ chế đăng nhập/session hay tài khoản mẫu.

### 2. Quyết định
1. **Thuật toán tất định (Deterministic Engine):**
   - Tạo module xử lý riêng tại thư mục server.
   - Xây dựng hàm làm tròn số về hàng chục/hàng trăm gần nhất để tính ra khoảng ước lượng hợp lý `[min_estimate, max_estimate]`.
   - Kết quả ước lượng của học sinh được chấp nhận nếu nằm trong khoảng biên tính toán này.
2. **Cơ sở dữ liệu (SQLite):**
   - Kế thừa schema hiện có trong `docs/architecture-reference.md`.
   - Lưu trữ thêm 2 trường dữ liệu vào kết quả làm bài:
     - `uoc_luong`: Lưu giá trị học sinh phỏng đoán.
     - `ket_qua_uoc_luong`: Trạng thái đúng/sai của bước ước lượng.
3. **Luồng API:**
   - Tạo endpoint kiểm tra riêng cho bước ước lượng trước khi học sinh submit đáp án cuối cùng.
