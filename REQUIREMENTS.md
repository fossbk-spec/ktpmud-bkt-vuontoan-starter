# YÊU CẦU ĐẶC TẢ KỸ THUẬT VÀ TIÊU CHÍ NGHIỆM THU (M1)
**Đề tài:** Vườn Toán Lớp 3: "Ước lượng trước khi tính đúng"
**Nhóm thực hiện:** Nhóm 56 - Lớp 173820

## 1. Mục tiêu
- Bổ sung dạng bài rèn kỹ năng ước lượng trước khi thực hiện phép tính chi tiết cho học sinh lớp 3 trên các phép nhân và phép chia.
- Toàn bộ việc sinh đề và kiểm tra đúng/sai phải viết bằng thuật toán code (tất định), tuyệt đối không dùng AI/LLM làm nguồn đáp án.

## 2. Quy tắc ước lượng 
1. **Phép nhân:**
   - Ví dụ: Phép tính `48 x 3`.
   - Làm tròn thừa số 48 thành số tròn chục gần nhất là 50.
   - Ước lượng hợp lý: `50 x 3 = 150` (hoặc chấp nhận khoảng giá trị từ 140 đến 160).
2. **Phép chia:**
   - Ví dụ: Phép tính `87 : 4`.
   - Làm tròn 87 về số tròn chục gần nhất chia hết cho 4 là 80.
   - Ước lượng hợp lý: `80 : 4 = 20`.

## 3. Tiêu chí nghiệm thu (BDD)

### Kịch bản 1: Học sinh ước lượng hợp lý
- **Given:** Học sinh nhận bài toán `48 x 3`.
- **When:** Học sinh nhập số ước lượng là `150` (hoặc chọn khoảng 140 - 160).
- **Then:** Hệ thống báo "Ước lượng hợp lý" và mở khóa bước tiếp theo để học sinh tính kết quả chính xác (`144`).

### Kịch bản 2: Học sinh ước lượng sai lệch quá xa
- **Given:** Học sinh nhận bài toán `48 x 3`.
- **When:** Học sinh nhập ước lượng là `80`.
- **Then:** Hệ thống báo kết quả ước lượng chưa hợp lý và gợi ý học sinh làm tròn thừa số về hàng chục gần nhất trước.

### Kịch bản 3: Bắt buộc ước lượng trước khi tính đúng
- **Given:** Học sinh đang ở màn hình làm bài.
- **When:** Học sinh bỏ trống ô ước lượng mà bấm nộp kết quả tính đúng.
- **Then:** Hệ thống chặn nộp bài và hiện thông báo yêu cầu thực hiện bước ước lượng trước.
