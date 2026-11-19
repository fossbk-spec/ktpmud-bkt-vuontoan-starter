# TEST_PLAN.md
# VƯỜN TOÁN LỚP 3 – ƯỚC LƯỢNG TRƯỚC KHI TÍNH ĐÚNG
---

## 1. Mục đích kiểm thử

Tài liệu này xác định phạm vi, phương pháp, dữ liệu đầu vào và kết quả mong đợi khi kiểm thử chức năng “Ước lượng trước khi tính đúng” trong hệ thống Vườn Toán Lớp 3.

Mục tiêu kiểm thử:

- Xác minh hệ thống nhận diện và hiển thị đúng loại câu hỏi `estimate`.
- Kiểm tra công thức xác định khoảng ước lượng hợp lệ.
- Kiểm tra khả năng đánh giá độc lập kết quả ước lượng và kết quả tính toán chính xác.
- Kiểm tra cơ chế tính điểm của câu hỏi.
- Kiểm tra việc lưu kết quả làm bài và cập nhật tiến độ.
- Đảm bảo các loại câu hỏi hiện có không bị ảnh hưởng sau khi bổ sung chức năng mới.

## 2. Phạm vi kiểm thử

### 2.1. Trong phạm vi

Kiểm thử các thành phần:

| Thành phần | Nội dung kiểm thử |
|---|---|
| Frontend | Hiển thị câu hỏi và hai ô nhập dữ liệu |
| Backend | Nhận và xử lý câu trả lời |
| Công thức | Xác định giới hạn dưới và giới hạn trên |
| Chấm điểm | Đánh giá hai thành phần độc lập |
| Database | Lưu đáp án và kết quả làm bài |
| Progress | Cập nhật điểm cao nhất và trạng thái hoàn thành |
| Sao thưởng | Kiểm tra cơ chế tính sao hiện có |
| Regression | Kiểm tra lại bốn loại câu hỏi cũ |

### 2.2. Ngoài phạm vi

Không kiểm thử hoặc thay đổi:

- Chức năng đăng nhập và xác thực.
- Chức năng quản trị và quản lý giáo viên.
- Các chức năng không liên quan đến quá trình luyện tập.
- Cơ chế tính sao và cập nhật tiến độ ngoài những kiểm tra cần thiết để xác nhận khả năng tương thích.

## 3. Quy tắc tính khoảng ước lượng

### 3.1. Công thức

Để kiểm tra kết quả ước lượng, hệ thống sử dụng sai số tương đối tối đa 10% so với kết quả chính xác.

Gọi:

- \(R\): Kết quả chính xác của phép tính.
- \(L\): Giới hạn dưới của khoảng chấp nhận.
- \(U\): Giới hạn trên của khoảng chấp nhận.
- \(E\): Kết quả ước lượng do học sinh nhập.

Công thức:

\[
L=\lceil0.9R\rceil
\]

\[
U=\lfloor1.1R\rfloor
\]

Kết quả ước lượng được chấp nhận khi:

\[
L\leq E\leq U
\]

Trong đó:

- \(\lceil x\rceil\): Làm tròn lên đến số nguyên gần nhất.
- \(\lfloor x\rfloor\): Làm tròn xuống đến số nguyên gần nhất.
- Hai giới hạn đều được tính là giá trị hợp lệ.
- Giá trị nằm ngoài khoảng không được chấp nhận.

Quy tắc áp dụng cho phép nhân và phép chia có kết quả nguyên không âm. Đối với phép chia, số chia phải khác 0 và phép chia phải cho kết quả nguyên.

### 3.2. Ví dụ tính khoảng đối với phép nhân

Phép tính:

\[
12\times4=48
\]

Kết quả chính xác:

\[
R=48
\]

Giới hạn dưới:

\[
L=\lceil0.9\times48\rceil
=\lceil43.2\rceil=44
\]

Giới hạn trên:

\[
U=\lfloor1.1\times48\rfloor
=\lfloor52.8\rfloor=52
\]

Khoảng ước lượng hợp lệ:

\[
44\leq E\leq52
\]

Ví dụ:

- \(E=44\): Chấp nhận.
- \(E=48\): Chấp nhận.
- \(E=52\): Chấp nhận.
- \(E=43\): Không chấp nhận.
- \(E=53\): Không chấp nhận.

### 3.3. Ví dụ tính khoảng đối với phép chia

Phép tính:

\[
84\div4=21
\]

Kết quả chính xác:

\[
R=21
\]

Giới hạn dưới:

\[
L=\lceil0.9\times21\rceil
=\lceil18.9\rceil=19
\]

Giới hạn trên:

\[
U=\lfloor1.1\times21\rfloor
=\lfloor23.1\rfloor=23
\]

Khoảng ước lượng hợp lệ:

\[
19\leq E\leq23
\]

Ví dụ:

- \(E=19\): Chấp nhận.
- \(E=21\): Chấp nhận.
- \(E=23\): Chấp nhận.
- \(E=18\): Không chấp nhận.
- \(E=24\): Không chấp nhận.

## 4. Bộ dữ liệu kiểm thử (Fixtures)

### 4.1. Danh sách 12 fixture

Bộ dữ liệu gồm 12 phép tính cụ thể, trong đó có 6 phép nhân và 6 phép chia.

| Mã fixture | Phép tính | Đáp án chính xác (R) | Giới hạn dưới (L) | Giới hạn trên (U) |
|---|---|---:|---:|---:|
| F01 | 12 × 4 | 48 | 44 | 52 |
| F02 | 15 × 3 | 45 | 41 | 49 |
| F03 | 18 × 5 | 90 | 81 | 99 |
| F04 | 24 × 4 | 96 | 87 | 105 |
| F05 | 32 × 3 | 96 | 87 | 105 |
| F06 | 27 × 6 | 162 | 146 | 178 |
| F07 | 72 ÷ 6 | 12 | 11 | 13 |
| F08 | 84 ÷ 7 | 12 | 11 | 13 |
| F09 | 96 ÷ 8 | 12 | 11 | 13 |
| F10 | 144 ÷ 12 | 12 | 11 | 13 |
| F11 | 180 ÷ 9 | 20 | 18 | 22 |
| F12 | 216 ÷ 6 | 36 | 33 | 39 |

### 4.2. Kiểm tra tính đúng đắn của fixture

Mỗi fixture phải đáp ứng các điều kiện:

1. Phép tính có kết quả chính xác là số nguyên không âm.
2. Đáp án chính xác phải được lưu trong trường `exact`.
3. Giới hạn dưới phải được tính theo công thức \(L=\lceil0.9R\rceil\).
4. Giới hạn trên phải được tính theo công thức \(U=\lfloor1.1R\rfloor\).
5. Khoảng chấp nhận phải được lưu cùng câu hỏi trong `correct_answer`.

Ví dụ dữ liệu lưu cho fixture F01:

```json
{
  "lower": 44,
  "upper": 52,
  "exact": 48
}
```

## 5. Quy tắc chấm điểm cần kiểm thử

### 5.1. Chia điểm thành hai thành phần

Mỗi câu hỏi `estimate` có hai thành phần:

| Thành phần | Tỷ trọng |
|---|---:|
| Ước lượng đúng | 50% |
| Tính toán chính xác đúng | 50% |
| Tổng | 100% |

Gọi \(P\) là điểm tối đa của câu hỏi.

Điểm thành phần ước lượng:

\[
C_E=
\begin{cases}
0.5P & \text{nếu }L\leq E\leq U\\
0 & \text{nếu ngược lại}
\end{cases}
\]

Điểm thành phần tính chính xác:

\[
C_X=
\begin{cases}
0.5P & \text{nếu }A=R\\
0 & \text{nếu ngược lại}
\end{cases}
\]

Tổng điểm:

\[
C=C_E+C_X
\]

Trong đó \(A\) là kết quả tính chính xác do học sinh nhập.

### 5.2. Bảng kết quả chấm điểm

| Trường hợp | Ước lượng | Tính chính xác | Điểm đạt được |
|---|---|---|---:|
| TH01 | Đúng | Đúng | 100% |
| TH02 | Đúng | Sai | 50% |
| TH03 | Sai | Đúng | 50% |
| TH04 | Sai | Sai | 0% |

### 5.3. Ảnh hưởng đến `attempts`, `progress` và sao

Khi học sinh nộp bài:

**Bảng `attempts`:**

- Lưu kết quả của lần làm bài.
- `score_percent` phản ánh tổng điểm thực tế, bao gồm cả điểm thành phần của câu hỏi `estimate`.
- `correct_count` chỉ tăng đối với câu hỏi có cả hai thành phần đúng.
- `total_count` tính mỗi câu hỏi `estimate` là một câu hỏi.
- `answers_json` lưu cả giá trị ước lượng và giá trị tính chính xác.

**Bảng `progress`:**

- Điểm của câu hỏi `estimate` được cộng vào tổng điểm bài làm.
- `best_score` được cập nhật nếu kết quả mới cao hơn điểm cao nhất hiện có, theo cơ chế hiện tại.
- `completed` tiếp tục được xác định theo điều kiện hoàn thành hiện có.
- Việc chỉ đúng một trong hai thành phần vẫn đóng góp 50% điểm câu hỏi vào kết quả bài làm; tuy nhiên, không được tính là một câu trả lời đúng hoàn toàn.

**Sao thưởng:**

- Điểm thành phần được đưa vào tổng điểm bài làm trước khi hệ thống áp dụng quy tắc tính sao hiện có.
- Không cộng sao riêng cho từng thành phần ước lượng hoặc tính chính xác.
- Việc học sinh chỉ đúng một thành phần có thể làm thay đổi tổng điểm, từ đó ảnh hưởng đến kết quả tính sao theo quy tắc hiện tại.
- Không tự đặt thêm ngưỡng hoàn thành hoặc công thức tính sao mới.

Lưu ý: Ngưỡng hoàn thành và công thức tính sao phải được giữ theo mã nguồn hiện tại. Kế hoạch kiểm thử không giả định một ngưỡng hoặc công thức mới.

## 6. Các trường hợp kiểm thử chi tiết

### 6.1. Kiểm thử giao diện và nhập dữ liệu

| Mã | Trường hợp kiểm thử | Dữ liệu đầu vào | Kết quả mong đợi |
|---|---|---|---|
| TC-01 | Hiển thị câu hỏi `estimate` | `type = estimate` | Hiển thị nội dung phép tính và hai ô nhập |
| TC-02 | Nhập hai giá trị hợp lệ | Ước lượng = 48; chính xác = 48 | Hệ thống tiếp nhận hai giá trị |
| TC-03 | Nhập dữ liệu không hợp lệ | Ước lượng = "abc"; chính xác = 48 | Hệ thống từ chối dữ liệu không phải số nguyên |
| TC-04 | Bỏ trống một ô nhập | Ước lượng = 48; chính xác = rỗng | Hệ thống yêu cầu nhập đầy đủ dữ liệu |

### 6.2. Kiểm thử khoảng ước lượng (TC-05 đến TC-09)

Sử dụng fixture F01:

- Phép tính: \(12\times4\).
- Đáp án chính xác: 48.
- Giới hạn dưới: 44.
- Giới hạn trên: 52.

| Mã | Giá trị ước lượng (E) | Khoảng hợp lệ | Kết quả mong đợi |
|---|---:|---|---|
| TC-05 | 48 | 44–52 | Chấp nhận |
| TC-06 | 44 | 44–52 | Chấp nhận vì bằng giới hạn dưới |
| TC-07 | 52 | 44–52 | Chấp nhận vì bằng giới hạn trên |
| TC-08 | 43 | 44–52 | Không chấp nhận vì nhỏ hơn giới hạn dưới |
| TC-09 | 53 | 44–52 | Không chấp nhận vì lớn hơn giới hạn trên |

### 6.3. Kiểm thử kết quả tính toán chính xác (TC-10 đến TC-11)

Tiếp tục sử dụng fixture F01:

- Phép tính: \(12\times4\).
- Đáp án chính xác: 48.

| Mã | Giá trị nhập (A) | Đáp án chính xác (R) | Kết quả mong đợi |
|---|---:|---:|---|
| TC-10 | 48 | 48 | Tính chính xác đúng |
| TC-11 | 47 | 48 | Tính chính xác sai |

### 6.4. Kiểm thử kết hợp hai thành phần (TC-12 đến TC-13)

Sử dụng fixture F01:

- Phép tính: \(12\times4\).
- Đáp án chính xác: 48.
- Khoảng ước lượng: 44–52.
- Điểm tối đa giả định của câu hỏi: 10 điểm.

| Mã | Giá trị ước lượng (E) | Giá trị chính xác (A) | Kết quả ước lượng | Kết quả tính chính xác | Điểm mong đợi |
|---|---:|---:|---|---|---:|
| TC-12 | 48 | 47 | Đúng | Sai | 5/10 điểm |
| TC-13 | 43 | 48 | Sai | Đúng | 5/10 điểm |

### 6.5. Kiểm thử các trường hợp tính điểm còn lại

| Mã | Giá trị ước lượng (E) | Giá trị chính xác (A) | Kết quả mong đợi |
|---|---:|---:|---|
| TC-14 | 48 | 48 | Cả hai đúng, đạt 10/10 điểm |
| TC-15 | 43 | 47 | Cả hai sai, đạt 0/10 điểm |

### 6.6. Kiểm thử lưu dữ liệu và bảo mật

| Mã | Trường hợp kiểm thử | Dữ liệu hoặc thao tác | Kết quả mong đợi |
|---|---|---|---|
| TC-16 | Lưu câu trả lời | E = 48; A = 48 | `answers_json` lưu đủ hai giá trị |
| TC-17 | Kiểm tra API lấy câu hỏi | Gọi API lấy danh sách câu hỏi | Không trả về `correct_answer`, `lower`, `upper`, `exact` |
| TC-18 | Cập nhật tiến độ | Nộp bài có câu `estimate` đạt 50% điểm | Tổng điểm bài làm được sử dụng để cập nhật `progress` theo cơ chế hiện tại |
| TC-19 | Tính sao | Nộp bài có kết quả chứa điểm thành phần | Sao được tính theo quy tắc hiện có dựa trên kết quả bài làm |
| TC-20 | Kiểm tra số câu đúng | Một câu `estimate` chỉ đúng một thành phần | `correct_count` không tăng đối với câu đó; điểm thành phần vẫn được ghi nhận |

### 6.7. Kiểm thử hồi quy

| Mã | Loại câu hỏi | Thao tác | Kết quả mong đợi |
|---|---|---|---|
| TC-21 | `multiple-choice` | Chọn đáp án đúng | Hệ thống chấm đúng |
| TC-22 | `input` | Nhập đáp án đúng | Hệ thống chấm đúng |
| TC-23 | `compare` | Nhập ký hiệu so sánh đúng | Hệ thống chấm đúng |
| TC-24 | `paint` | Chọn màu đúng | Hệ thống chấm đúng |

## 7. Phương pháp thực hiện kiểm thử

### 7.1. Kiểm thử đơn vị (Unit Testing)

Kiểm tra riêng các chức năng:

- Tính giới hạn dưới.
- Tính giới hạn trên.
- Kiểm tra giá trị ước lượng trong khoảng.
- So sánh đáp án chính xác.
- Tính điểm hai thành phần.

Mỗi chức năng cần có dữ liệu đầu vào và kết quả đầu ra cụ thể.

### 7.2. Kiểm thử tích hợp (Integration Testing)

Kiểm tra sự phối hợp giữa:

- Frontend và API.
- API và cơ sở dữ liệu.
- API chấm điểm và cơ chế lưu kết quả.
- Kết quả bài làm và cơ chế cập nhật tiến độ.

### 7.3. Kiểm thử hồi quy (Regression Testing)

Thực hiện lại các bài kiểm thử đối với bốn loại câu hỏi hiện có nhằm xác nhận việc bổ sung `estimate` không gây ảnh hưởng đến chức năng cũ.

### 7.4. Kiểm thử dữ liệu biên (Boundary Testing)

Tập trung vào:

- Giá trị bằng giới hạn dưới.
- Giá trị bằng giới hạn trên.
- Giá trị nhỏ hơn giới hạn dưới một đơn vị.
- Giá trị lớn hơn giới hạn trên một đơn vị.

Các trường hợp này giúp phát hiện lỗi trong phép so sánh khoảng và quy tắc làm tròn.

## 8. Điều kiện hoàn thành kiểm thử

Chức năng được xem là đáp ứng yêu cầu kiểm thử khi:

1. Hệ thống nhận diện đúng loại câu hỏi `estimate`.
2. Giao diện hiển thị được hai ô nhập độc lập.
3. Công thức xác định khoảng ước lượng hoạt động chính xác.
4. Cả 12 fixture đều có đáp án và khoảng chấp nhận đúng.
5. Các trường hợp kiểm thử TC-05 đến TC-09 cho kết quả đúng với giá trị biên.
6. Các trường hợp TC-10 đến TC-15 cho điểm đúng theo quy tắc 50/50.
7. Dữ liệu câu trả lời được lưu đầy đủ.
8. API không tiết lộ đáp án chuẩn trước khi nộp bài.
9. `progress` và sao tiếp tục hoạt động theo cơ chế hiện có.
10. Bốn loại câu hỏi cũ vượt qua kiểm thử hồi quy.

## 9. Kết luận

Kế hoạch kiểm thử tập trung đánh giá tính chính xác của quy tắc ước lượng, cơ chế chấm điểm hai thành phần và khả năng tích hợp của dạng câu hỏi `estimate` vào hệ thống hiện tại.

Bộ dữ liệu gồm 12 fixture cho phép nhân và phép chia được sử dụng để kiểm tra công thức xác định khoảng chấp nhận. Các trường hợp kiểm thử từ TC-05 đến TC-13 sử dụng dữ liệu số cụ thể, bao gồm cả giá trị nằm trong khoảng, tại giới hạn và ngoài giới hạn.

Ngoài ra, kế hoạch kiểm thử đánh giá tác động của điểm thành phần đến kết quả bài làm, `progress` và sao thưởng, đồng thời xác nhận các chức năng hiện có vẫn hoạt động bình thường.

Tài liệu này là cơ sở để nhóm triển khai và đánh giá chức năng trong giai đoạn tiếp theo.
