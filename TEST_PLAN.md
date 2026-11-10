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

**Đã bổ sung 12 fixture xác định dưới đây** theo góp ý Checkpoint 1. Đây là dữ liệu test/seed đề xuất; chưa phải bằng chứng code đã triển khai.

### 5.1. Mười hai fixture nhân/chia (B-02)


**Quy ước kiểm thử:** `A` là đáp án chính xác nguyên dương; `E` là ước lượng nguyên không âm. Chấp nhận khi `4*A <= 5*E && 5*E <= 6*A` (tương đương sai số tương đối không quá 20%). Với số nguyên, `E_min = ceil(4*A/5)`, `E_max = floor(6*A/5)`. Dùng `BigInt` sau khi kiểm tra số nguyên an toàn để không sai số tại biên hoặc tràn phép nhân.

| ID | Phép tính | Đáp án A | E nhỏ nhất | E lớn nhất | E ngay ngoài biên |
|---|---|---:|---:|---:|---|
| F01 | 19 × 4 | 76 | 61 | 91 | 60; 92 |
| F02 | 7 × 5 | 35 | 28 | 42 | 27; 43 |
| F03 | 8 × 9 | 72 | 58 | 86 | 57; 87 |
| F04 | 12 × 4 | 48 | 39 | 57 | 38; 58 |
| F05 | 15 × 6 | 90 | 72 | 108 | 71; 109 |
| F06 | 24 × 3 | 72 | 58 | 86 | 57; 87 |
| F07 | 84 ÷ 2 | 42 | 34 | 50 | 33; 51 |
| F08 | 96 ÷ 3 | 32 | 26 | 38 | 25; 39 |
| F09 | 144 ÷ 4 | 36 | 29 | 43 | 28; 44 |
| F10 | 125 ÷ 5 | 25 | 20 | 30 | 19; 31 |
| F11 | 168 ÷ 7 | 24 | 20 | 28 | 19; 29 |
| F12 | 216 ÷ 6 | 36 | 29 | 43 | 28; 44 |

- Các câu F01–F06 là phép nhân, F07–F12 là phép chia hết; đều có đáp án nguyên dương.
- Khi kiểm thử tự động, với **mỗi** fixture phải thử E ở `E_min`, `E_max` (đạt) và `E_min - 1`, `E_max + 1` (không đạt); đồng thời thử `E = A` (đạt).
- Mỗi fixture cần một `question.id` ổn định, `type = estimate`, `correct_answer = A` phía server, và `points` đồng nhất để tính theo số câu đúng; không gửi đáp án hoặc khoảng chấp nhận qua API lấy câu hỏi.
- Các phép tính và khoảng chấp nhận trong bảng này là đề xuất của nhóm, **không khẳng định là bộ đề do GV cung cấp**.

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
- Không có điểm thành phần 4/6. **Đúng toàn câu** khi E đạt và kết quả tính đúng; ngược lại sai toàn câu.
- `correct_count` là số câu đúng toàn phần; `score_percent` = làm tròn tỷ lệ câu đúng trên tổng số câu.

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
| UT-08 | 90 | 100 | Đúng (1/1) |
| UT-09 | 90 | 99 | Sai (0/1) |
| UT-10 | 150 | 100 | Sai (0/1) |
| UT-11 | 150 | 99 | Sai (0/1) |

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

### 8.5. Kiểm thử số nguyên tại biên với nhiều A (bắt buộc theo nhận xét GV)

| ID | A | E | Kết quả mong đợi | Lý do |
|---|---:|---:|---|---|
| EDGE-01 | 35 | 28 | Đạt | Đúng biên dưới; tránh lỗi `0.8 * 35` |
| EDGE-02 | 35 | 42 | Đạt | Đúng biên trên |
| EDGE-03 | 35 | 27 | Không đạt | Ngoài biên dưới |
| EDGE-04 | 35 | 43 | Không đạt | Ngoài biên trên |
| EDGE-05 | 25 | 20 | Đạt | Biên dưới nguyên |
| EDGE-06 | 25 | 30 | Đạt | Biên trên nguyên |
| EDGE-07 | 72 | 57 | Không đạt | `57 < ceil(57.6)` |
| EDGE-08 | 72 | 58 | Đạt | Nguyên nhỏ nhất hợp lệ |
| EDGE-09 | 72 | 86 | Đạt | Nguyên lớn nhất hợp lệ |
| EDGE-10 | 72 | 87 | Không đạt | Vượt `floor(86.4)` |
| EDGE-11 | 76 | 61 | Đạt | Nguyên nhỏ nhất hợp lệ |
| EDGE-12 | 76 | 92 | Không đạt | Vượt biên trên 91 |
| EDGE-13 | 100 | 80 | Đạt | Biên dưới |
| EDGE-14 | 100 | 120 | Đạt | Biên trên |
| EDGE-15 | 100 | 79 | Không đạt | Ngoài biên dưới |
| EDGE-16 | 100 | 121 | Không đạt | Ngoài biên trên |

### 8.6. Kiểm thử trình tự và giới hạn thời gian (ADR-001)

| ID | Tình huống | Kết quả mong đợi |
|---|---|---|
| FLOW-01 | Mở câu 1 | Chỉ hiển thị câu 1, giai đoạn ước lượng, thời hạn do server đặt |
| FLOW-02 | Gửi đáp án chính xác khi E chưa khóa | Server từ chối, không ghi câu đúng |
| FLOW-03 | Xác nhận E đúng hạn | Server khóa E, chuyển giai đoạn tính đúng |
| FLOW-04 | Sửa E sau khi đã khóa | Server từ chối, E cũ không đổi |
| FLOW-05 | Hết giờ mà chưa xác nhận E | E được đánh dấu không đạt; vẫn cho làm phần tính đúng |
| FLOW-06 | Gửi E sau deadline dù frontend chưa cập nhật | Server từ chối theo đồng hồ server |
| FLOW-07 | Gửi yêu cầu cho câu 2 trước khi hoàn tất câu 1 | Server từ chối |
| FLOW-08 | Refresh/đóng tab/mất kết nối | Khôi phục trạng thái nhất quán theo quy tắc resume đã chốt; không mở lại E đã khóa |
| FLOW-09 | Gửi lặp cùng yêu cầu hoặc hai tab | Không sửa E đã khóa, không tạo lượt làm/điểm thưởng trùng |
| FLOW-10 | E = A, nộp đúng hạn, kết quả chính xác đúng | Đúng toàn câu; đồng thời ghi nhận đây không chứng minh phương pháp ước lượng |

### 8.7. Kiểm thử tỷ lệ câu đúng và phản hồi

| ID | Kịch bản | correct_count | total_count | score_percent |
|---|---|---:|---:|---:|
| SCORE-01 | 12 câu đều đạt cả hai phần | 12 | 12 | 100 |
| SCORE-02 | 9 câu đúng toàn phần, 3 câu chỉ đúng một phần | 9 | 12 | 75 |
| SCORE-03 | 0 câu đúng toàn phần, dù 12 câu đúng phép tính nhưng ước lượng sai | 0 | 12 | 0 |
| SCORE-04 | 1 câu đúng toàn phần trong 12 câu | 1 | 12 | 8 (làm tròn từ 8,33%) |

- Phản hồi phải hiển thị trạng thái từng phần nhưng **không** cộng điểm thành phần.
- Kiểm thử `completed`, sao và `progress` theo logic hiện tại; không tự thay đổi ngưỡng hoàn thành.
- `Number.isSafeInteger`/`BigInt` hoặc giới hạn miền giá trị được kiểm thử để không phát sinh lỗi số thực và tràn phép nhân.

### 8.8. Trạng thái thực hiện

Các bảng trên là **kế hoạch và dữ liệu kỳ vọng**; chưa phải báo cáo kết quả chạy test. Sau M2/M3, ghi kết quả thực tế, commit, CI và bằng chứng vào `TEST_REPORT.md`.
