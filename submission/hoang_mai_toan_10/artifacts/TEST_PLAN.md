# TEST_PLAN — Track B — Nhóm 10

**Phiên bản:** 1.0  
**Trạng thái:** Kế hoạch kiểm thử; không phải báo cáo kết quả.

## 1. Phạm vi

Kiểm thử dạng bài “Ước lượng kết quả trước khi tính đúng” cho phép nhân/chia, bao gồm tạo câu hỏi, hiển thị giao diện, kiểm tra đầu vào, chấm điểm phía server, lưu kết quả và hồi quy các dạng bài cũ.

## 2. Điều kiện và lệnh dự kiến

- Node.js 18 trở lên.
- Cài dependencies: `npm ci` (nếu lockfile tương ứng với package manifest).
- Chạy test: `npm test` (chỉ khi script test đã được triển khai).
- Chạy ứng dụng: `npm start`.

**Lưu ý:** Chỉ ghi nhận lệnh là PASS sau khi chạy thực tế trên checkout sạch và lưu lại log.

## 3. Ma trận kiểm thử

| ID | Nhóm | Dữ liệu/thao tác | Kết quả mong đợi |
|---|---|---|---|
| TC-EST-01 | Normal | Nhập số nguyên nằm trong khoảng ước lượng | Được chấp nhận là ước lượng hợp lý |
| TC-EST-02 | Boundary | Nhập đúng cận dưới | Được chấp nhận |
| TC-EST-03 | Boundary | Nhập đúng cận trên | Được chấp nhận |
| TC-EST-04 | Invalid | Nhập số nguyên nhỏ hơn cận dưới | Không được chấp nhận |
| TC-EST-05 | Invalid | Nhập số nguyên lớn hơn cận trên | Không được chấp nhận |
| TC-EST-06 | Invalid | Để trống đầu vào | Validation từ chối |
| TC-EST-07 | Invalid | Nhập chữ/ký tự không hợp lệ | Validation từ chối |
| TC-EST-08 | Invalid | Nhập số thập phân | Validation từ chối theo đặc tả số nguyên |
| TC-EST-09 | Security | Tải câu hỏi trước khi nộp | API không trả đáp án/khoảng đáp án |
| TC-EST-10 | Persistence | Nộp câu trả lời rồi tải lại trang | Kết quả/tiến độ được giữ theo yêu cầu |
| TC-EST-11 | Regression | Làm câu hỏi input và multiple-choice cũ | Logic chấm cũ không bị ảnh hưởng |
| TC-EST-12 | Data | Kiểm tra bộ fixture synthetic | Có tối thiểu 12 fixture tái lập được |

## 4. Accessibility

- Thực hiện toàn bộ thao tác nhập và nộp bằng bàn phím.
- Kiểm tra focus có thể nhìn thấy và thứ tự focus hợp lý.
- Kiểm tra nhãn input và thông báo lỗi có thể được nhận biết.
- Ghi lại trình duyệt, phiên bản và kết quả khi thực hiện.

## 5. Ghi nhận kết quả

Kết quả thực tế, môi trường, log và bằng chứng phải được ghi trong `TEST_REPORT.md`. Không chuyển trạng thái test thành PASS nếu chưa chạy.
