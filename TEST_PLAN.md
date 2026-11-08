# TEST PLAN — Vườn Toán Lớp 3 (Track B)

## 1. Mục tiêu

Kiểm tra chức năng “Ước lượng trước khi tính đúng” đáp ứng các yêu cầu B-01 đến B-12 của đề thi, đồng thời không làm ảnh hưởng đến các chức năng hiện có.

## 2. Phạm vi kiểm thử

**Trong phạm vi:**
- Luồng nhập ước lượng trước khi tính chính xác.
- Quy tắc đánh giá ước lượng.
- Kiểm tra kết quả tính chính xác.
- Chấm điểm trên backend.
- Lưu và truy xuất kết quả từ SQLite.
- Bảo vệ đáp án trước khi nộp bài.
- Kiểm thử hồi quy bốn dạng câu hỏi cũ.
- Khả năng sử dụng bằng bàn phím.
- Chạy kiểm thử tự động và CI.

**Ngoài phạm vi thay đổi:**
- Cơ chế đăng nhập và session.
- Các chức năng quản trị, quản lý giáo viên.
- Hệ thống triển khai production.

Các chức năng ngoài phạm vi thay đổi vẫn có thể được kiểm tra hồi quy.

## 3. Các mức kiểm thử

| Mức kiểm thử | Mục đích |
|---|---|
| Unit Test | Kiểm tra thuật toán ước lượng, điều kiện biên và tính điểm |
| API Test | Kiểm tra API lấy câu hỏi, nộp bài và phản hồi |
| Integration Test | Kiểm tra sự phối hợp giữa backend và SQLite |
| UI Test | Kiểm tra luồng thao tác học sinh |
| Regression Test | Đảm bảo bốn loại câu hỏi cũ không bị ảnh hưởng |
| CI Test | Kiểm tra test tự động khi tạo Pull Request |

## 4. Danh sách test case dự kiến

| ID | Tình huống kiểm thử | Kết quả mong đợi | Yêu cầu |
|---|---|---|---|
| TC-01 | Học sinh mở bộ câu hỏi ước lượng | Câu hỏi hiển thị trong luồng học hiện có | B-01 |
| TC-02 | Chưa nhập ước lượng nhưng muốn chuyển bước | Không cho chuyển, hiển thị thông báo | B-01, B-12 |
| TC-03 | Nhập ước lượng hợp lý | Backend đánh giá theo quy tắc đã thiết kế | B-03 |
| TC-04 | Nhập ước lượng không hợp lý | Backend đánh giá không đạt phần ước lượng | B-03 |
| TC-05 | Nhập giá trị đúng tại ngưỡng chấp nhận | Xử lý đúng theo quy tắc biên đã công bố | B-03, B-08 |
| TC-06 | Nhập giá trị ngay ngoài ngưỡng chấp nhận | Xử lý đúng theo quy tắc biên đã công bố | B-03, B-08 |
| TC-07 | Nhập chữ hoặc giá trị không hợp lệ | Từ chối dữ liệu và trả thông báo rõ ràng | B-08, B-12 |
| TC-08 | Ước lượng hợp lý, tính chính xác đúng | Phản hồi riêng cho hai phần và tính điểm đúng | B-05, B-06 |
| TC-09 | Ước lượng hợp lý, tính chính xác sai | Phản hồi riêng cho hai phần và tính điểm đúng | B-05, B-06 |
| TC-10 | Ước lượng không hợp lý, tính chính xác đúng | Phản hồi riêng cho hai phần và tính điểm đúng | B-05, B-06 |
| TC-11 | Ước lượng không hợp lý, tính chính xác sai | Phản hồi riêng cho hai phần và tính điểm đúng | B-05, B-06 |
| TC-12 | Gọi API lấy câu hỏi trước khi nộp | Không tiết lộ đáp án hoặc dữ liệu chấm nhạy cảm | B-04 |
| TC-13 | Nộp bài thành công | Kết quả được ghi vào SQLite | B-05 |
| TC-14 | Tải lại trang sau khi nộp | Có thể truy xuất kết quả đã lưu | B-05 |
| TC-15 | Chạy lại bộ dữ liệu mẫu | Tạo được ít nhất 12 câu hỏi xác định trước | B-02 |
| TC-16 | Làm câu hỏi thuộc bốn type cũ | Kết quả chấm không thay đổi | B-07 |
| TC-17 | Sử dụng bàn phím để làm bài | Có thể hoàn thành luồng mà không cần chuột | B-12 |
| TC-18 | Chạy `npm test` từ checkout sạch | Test chạy được và báo đúng trạng thái | B-09 |
| TC-19 | Tạo Pull Request | GitHub Actions chạy `npm ci` và `npm test` | B-10 |
| TC-20 | Kiểm tra repository | Không chứa dữ liệu cá nhân thật hoặc secret | B-11 |

## 5. Dữ liệu kiểm thử

Sử dụng dữ liệu synthetic, không dùng thông tin học sinh thật.

Bộ dữ liệu kiểm thử cần có:
- Phép nhân và phép chia.
- Phép tính có kết quả nhỏ và lớn trong phạm vi kiến thức lớp 3.
- Trường hợp ước lượng hợp lý và không hợp lý.
- Trường hợp tại ngưỡng và ngay ngoài ngưỡng.
- Dữ liệu thiếu, sai kiểu, không phải số.
- Trường hợp tính đúng và tính sai.

Các giá trị ngưỡng cụ thể sẽ được bổ sung sau khi nhóm chốt quy tắc chấm trong ADR.

## 6. Tiêu chí hoàn thành kiểm thử

- Các acceptance criteria B-01 đến B-12 có bằng chứng kiểm thử tương ứng.
- Các test tự động bắt buộc chạy thành công.
- Không có lỗi nghiêm trọng làm hỏng luồng học hoặc chấm điểm.
- Bốn dạng câu hỏi hiện có vẫn hoạt động.
- CI chạy thành công trên Pull Request.
- Các hạn chế còn tồn tại được ghi rõ trong tài liệu bàn giao.

## 7. Công cụ dự kiến

- Node.js và npm: chạy ứng dụng, kiểm thử.
- Công cụ test JavaScript phù hợp với cấu hình repository.
- SQLite: kiểm tra dữ liệu được lưu.
- GitHub Actions: tự động chạy kiểm thử.
- Trình duyệt: kiểm tra giao diện và thao tác bằng bàn phím.

Việc lựa chọn framework test cụ thể sẽ được xác nhận sau khi kiểm tra `package.json` và cấu trúc test hiện có.

## 8. Test case chi tiết cho quy tắc chấm ước lượng

Các test case dưới đây dựa trên quy tắc đề xuất tại ADR-002:

- Sai số tương đối tối đa: 20%.
- Hai đầu mút được chấp nhận.
- Điểm ước lượng: 4 điểm.
- Điểm tính chính xác: 6 điểm.
- Hai phần được chấm độc lập.

### 8.1. Kiểm thử ngưỡng sai số

Sử dụng phép tính `20 × 5 = 100`.

| Test ID | Ước lượng E | Kết quả mong đợi |
|---|---:|---|
| UT-01 | 100 | Đạt — Sai số 0% |
| UT-02 | 90 | Đạt — Sai số 10% |
| UT-03 | 80 | Đạt — Đúng biên dưới 20% |
| UT-04 | 120 | Đạt — Đúng biên trên 20% |
| UT-05 | 79 | Không đạt — Ngoài biên dưới |
| UT-06 | 121 | Không đạt — Ngoài biên trên |
| UT-07 | 0 | Không đạt — Sai số 100% |

### 8.2. Kiểm thử tính điểm

Sử dụng phép tính `20 × 5 = 100`.

| Test ID | Ước lượng E | Kết quả tính | Điểm mong đợi |
|---|---:|---:|---:|
| UT-08 | 90 | 100 | 10/10 |
| UT-09 | 90 | 99 | 4/10 |
| UT-10 | 150 | 100 | 6/10 |
| UT-11 | 150 | 99 | 0/10 |

### 8.3. Kiểm thử dữ liệu không hợp lệ

| Test ID | Dữ liệu đầu vào | Kết quả mong đợi |
|---|---|---|
| UT-12 | Ước lượng rỗng | Từ chối |
| UT-13 | Ước lượng `abc` | Từ chối |
| UT-14 | Ước lượng `-10` | Từ chối |
| UT-15 | Ước lượng `10.5` | Từ chối |
| UT-16 | Thiếu kết quả tính chính xác | Từ chối |
| UT-17 | Kết quả tính là chuỗi không phải số | Từ chối |
| UT-18 | Kết quả chính xác của câu hỏi bằng 0 | Từ chối cấu hình câu hỏi không hợp lệ |

### 8.4. Kiểm thử bảo mật API

| Test ID | Tình huống | Kết quả mong đợi |
|---|---|---|
| API-01 | Gọi API lấy câu hỏi trước khi nộp | Không có `correctAnswer`, `correct_answer` hoặc đáp án trong dữ liệu trả về |
| API-02 | Gửi ước lượng và kết quả tính đến backend | Backend tự chấm, không tin điểm do client gửi |
| API-03 | Gửi dữ liệu sai kiểu hoặc thiếu trường | Backend từ chối và trả lỗi phù hợp |
| API-04 | Nộp bài hợp lệ | Lưu kết quả vào SQLite |
| API-05 | Truy xuất lại tiến độ đã lưu | Kết quả phù