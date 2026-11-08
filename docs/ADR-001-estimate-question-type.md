# ADR-001: Bổ sung loại câu hỏi ước lượng độc lập

- **Trạng thái:** Proposed — Đề xuất, chờ nhóm thống nhất
- **Ngày:** 08/11/2026
- **Dự án:** Vườn Toán Lớp 3 — Track B
- **Liên quan:** B-01, B-03, B-04, B-05, B-06, B-07

## 1. Bối cảnh

Hệ thống Vườn Toán hiện hỗ trợ bốn loại câu hỏi:

- `multiple-choice`
- `input`
- `compare`
- `paint`

Cơ chế chấm điểm hiện tại so sánh chuỗi đáp án của học sinh với `correct_answer` được lưu trong SQLite.

Dạng bài mới “Ước lượng trước khi tính đúng” yêu cầu học sinh đưa ra hai câu trả lời theo trình tự: ước lượng và tính chính xác.

Do đó, hệ thống cần hỗ trợ cấu trúc câu trả lời và quy tắc chấm điểm mới, đồng thời bảo toàn hành vi của các loại câu hỏi hiện có.

## 2. Các phương án được xem xét

### Phương án A: Mở rộng loại `input`

Sử dụng loại câu hỏi `input` hiện có và bổ sung trường dữ liệu cho ước lượng.

**Ưu điểm:**
- Có thể tái sử dụng phần giao diện nhập số.

**Nhược điểm:**
- Loại `input` phải xử lý thêm nhiều trường hợp đặc biệt.
- Tăng nguy cơ ảnh hưởng đến các bộ câu hỏi hiện có.
- Khó phân biệt rõ hai loại câu hỏi khi kiểm thử.

### Phương án B: Tạo loại `estimate` mới

Bổ sung giá trị `estimate` vào hệ thống câu hỏi.

**Ưu điểm:**
- Giữ nguyên ý nghĩa bốn loại câu hỏi cũ.
- Tách riêng giao diện và logic chấm điểm.
- Dễ viết unit test và regression test.
- Có thể tiếp tục sử dụng API nộp bài hiện tại.

**Nhược điểm:**
- Cần mở rộng xử lý ở frontend và backend.
- Cần thiết kế cách biểu diễn hai câu trả lời và quy tắc chấm.
- Có thể cần mở rộng cấu trúc dữ liệu.

### Phương án C: Xây dựng hệ thống bài tập riêng

Tạo các endpoint và bảng dữ liệu riêng cho dạng bài ước lượng.

**Ưu điểm:**
- Tách biệt chức năng mới với hệ thống cũ.

**Nhược điểm:**
- Tăng số lượng API và mã nguồn.
- Có nguy cơ trùng lặp logic lưu tiến độ và chấm điểm.
- Khó tích hợp vào luồng học tập hiện có.

## 3. Quyết định đề xuất

Chọn **phương án B: bổ sung loại câu hỏi `estimate`**.

Đây là quyết định đề xuất, cần được nhóm xem xét và thống nhất trước khi chuyển trạng thái sang Accepted.

Hướng triển khai dự kiến:

1. Bổ sung loại `estimate` vào dữ liệu câu hỏi.
2. Frontend yêu cầu nhập ước lượng trước khi nhập kết quả chính xác.
3. Backend nhận hai phần câu trả lời và chấm theo quy tắc tất định.
4. Kết quả được lưu trong SQLite.
5. Phản hồi phân biệt kết quả ước lượng và kết quả tính chính xác.
6. Bốn loại câu hỏi cũ tiếp tục sử dụng cơ chế chấm điểm hiện tại.

## 4. Nguyên tắc thiết kế

- Server là nơi quyết định kết quả chấm điểm.
- Không gửi đáp án đúng hoặc thông tin chấm nhạy cảm qua API lấy câu hỏi.
- Không thay đổi hành vi bốn loại câu hỏi cũ.
- Không sửa các route xác thực, giáo viên, quản trị viên.
- Không sử dụng AI để chấm điểm trong thời gian chạy.
- Quy tắc ước lượng phải rõ ràng, tất định và kiểm thử được.

## 5. Các quyết định cần tiếp tục nghiên cứu

ADR này mới quyết định cách mở rộng loại câu hỏi, chưa chốt toàn bộ thuật toán.

Các vấn đề sẽ được giải quyết trong ADR tiếp theo:

- Ước lượng hợp lý được xác định bằng công thức nào?
- Sai số chấp nhận được tính theo giá trị tuyệt đối hay tương đối?
- Ngưỡng biên được xử lý như thế nào?
- Điểm ước lượng và điểm tính chính xác được phân bổ ra sao?
- Hai phần trả lời được biểu diễn trong API như thế nào?
- Có cần thêm cột hoặc bảng SQLite không?

## 6. Hệ quả và đánh đổi

**Tích cực:**
- Giảm nguy cơ phá vỡ chức năng hiện có.
- Dễ bảo trì và kiểm thử.
- Phù hợp với kiến trúc API hiện tại.

**Hạn chế:**
- Cần bổ sung nhánh xử lý cho `estimate` ở nhiều lớp.
- Phải duy trì tính tương thích giữa dữ liệu câu hỏi, API và giao diện.
- Cần kiểm thử hồi quy để xác nhận hành vi cũ không thay đổi.

## 7. Kế hoạch xác minh

Quyết định được coi là phù hợp khi:

- Dạng `estimate` hoạt động trong luồng học hiện có.
- Backend chấm và lưu kết quả đúng thiết kế.
- API không tiết lộ đáp án trước khi nộp.
- Bốn loại câu hỏi cũ vẫn vượt qua regression test.
- Các test tự động và CI chạy thành công.