# ADR-001: Bổ sung loại câu hỏi ước lượng độc lập

- **Trạng thái:** Accepted (quyết định thiết kế nội bộ nhóm; chờ GV/TA phản hồi)
- **Ngày:** 08/11/2026 · **Cập nhật:** 11/11/2026
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

Nhóm thống nhất chọn loại `estimate` độc lập; việc triển khai và đánh giá vẫn đang thực hiện.

Hướng triển khai dự kiến:

1. Bổ sung loại `estimate` vào dữ liệu câu hỏi.
2. Tạo **một phiếu riêng gồm 12 câu nhân/chia**, dùng chung hệ thống `question_sets`; học sinh làm **từng câu một**.
3. Mỗi câu có hai giai đoạn: **ước lượng nhanh có thời hạn**, sau đó **tính chính xác**. Không cho quay lại sửa ước lượng sau khi đã xác nhận hoặc hết giờ.
4. Backend kiểm soát **trình tự và thời hạn** bằng thời gian server, lưu ước lượng đã khóa; không tin đồng hồ hoặc trạng thái do frontend cung cấp.
5. Backend chấm theo ADR-002: chỉ đúng toàn câu khi **ước lượng đạt VÀ tính chính xác đúng**; kết quả lưu SQLite và phản hồi hai phần.
6. Bốn loại câu hỏi cũ giữ nguyên cơ chế chấm hiện tại.

## 4. Nguyên tắc thiết kế

- Server là nơi quyết định kết quả chấm điểm.
- Không gửi đáp án đúng hoặc thông tin chấm nhạy cảm qua API lấy câu hỏi.
- Không thay đổi hành vi bốn loại câu hỏi cũ.
- Không sửa các route xác thực, giáo viên, quản trị viên.
- Không sử dụng AI để chấm điểm trong thời gian chạy.
- Quy tắc ước lượng phải rõ ràng, tất định và kiểm thử được.
- Thời gian ước lượng **dự kiến 10–15 giây/câu để thử nghiệm**, chưa phải con số cố định; cần kiểm tra khả năng đọc đề và nhập liệu của học sinh lớp 3.
- Nếu hết thời gian mà chưa xác nhận E: đánh dấu ước lượng không đạt, vẫn cho chuyển sang tính chính xác để nhận phản hồi; không chấp nhận cập nhật E muộn.
- Không công bố đáp án hoặc kết quả chấm cho đến khi hoàn thành cả hai giai đoạn.

## 5. Thiết kế luồng và ranh giới bảo đảm

- Trạng thái mỗi câu: `estimate_open` → `estimate_locked` → `exact_submitted`; chỉ backend cho phép chuyển trạng thái.
- Khi bắt đầu câu, backend phát sinh lượt làm có định danh gắn với session, `started_at`/`deadline_at` do server quyết định; cần lưu trạng thái tạm bền vững hoặc bảng bổ sung phù hợp SQLite. Không chỉ gửi đồng hồ đếm ngược ở frontend.
- API xác nhận E kiểm tra đúng lượt làm, câu hiện tại, thời hạn, kiểu dữ liệu và việc chưa khóa; ghi E bất biến. Khi quá hạn, backend đánh dấu E bỏ lỡ. Sau đó API tính đúng mới được chấp nhận; chống gửi lại/chuyển thẳng sang giai đoạn hai.
- Chỉ ghi `attempts`/`progress` theo cơ chế hiện tại sau khi kết thúc bộ câu hỏi; phải tránh cộng sao hoặc ghi lượt làm trùng khi retry.
- **Giới hạn:** backend chứng minh được thứ tự **gửi/xác nhận** và thời hạn, không chứng minh học sinh đã suy nghĩ bằng cách ước lượng. Học sinh có thể tính đúng rất nhanh rồi nhập cùng một số ở hai bước.
- **Sai số 0% vẫn hợp lệ** theo ADR-002; không cấm `E = A`. Đề bài và hướng dẫn khuyến khích làm tròn/ước lượng nhanh nhưng không khẳng định xác minh được phương pháp tư duy.
- Không thêm dữ liệu chấm hoặc đáp án vào API phát câu hỏi. Không chỉnh sửa `server/auth.js` hoặc các route auth/teacher/admin.
- **Cần quyết định trước khi code:** thời lượng cụ thể, xử lý mất mạng/đóng tab, thời gian server, cơ chế resume và schema/API tối thiểu; các mục này chưa được triển khai.

## 6. Hệ quả và đánh đổi

**Tích cực:**
- Giảm nguy cơ phá vỡ chức năng hiện có.
- Dễ bảo trì và kiểm thử.
- Phù hợp với kiến trúc API hiện tại.

**Hạn chế:**
- Cần bổ sung nhánh xử lý cho `estimate` ở nhiều lớp.
- Phải duy trì tính tương thích giữa dữ liệu câu hỏi, API và giao diện.
- Phát sinh lưu trạng thái và API theo từng giai đoạn; tăng độ phức tạp so với chỉ kiểm tra thứ tự ở frontend.
- Cần kiểm thử hồi quy để xác nhận hành vi cũ không thay đổi.

## 7. Kế hoạch xác minh

Quyết định được coi là phù hợp khi:

- Dạng `estimate` hoạt động trong luồng học hiện có.
- Backend chấm và lưu kết quả đúng thiết kế.
- API không tiết lộ đáp án trước khi nộp.
- Bốn loại câu hỏi cũ vẫn vượt qua regression test.
- Các test tự động và CI chạy thành công.
- Test gửi đáp án tính đúng trước khi khóa ước lượng, sửa E sau khi khóa, hết giờ, retry, mở hai tab và nộp lặp đều có kết quả xác định.