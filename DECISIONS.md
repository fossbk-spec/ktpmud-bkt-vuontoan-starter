# DECISIONS.md
# VƯỜN TOÁN LỚP 3 – ƯỚC LƯỢNG TRƯỚC KHI TÍNH ĐÚNG

---

## 1. Mục đích

Tài liệu này trình bày các quyết định kiến trúc và thiết kế của nhóm khi mở rộng hệ thống Vườn Toán Lớp 3 nhằm hỗ trợ dạng bài tập “Ước lượng trước khi tính đúng”.

Các quyết định tập trung vào việc bổ sung loại câu hỏi mới, tổ chức dữ liệu đáp án, xây dựng quy tắc xác định khoảng ước lượng hợp lệ, điều chỉnh cơ chế chấm điểm và xác định những thành phần cần thay đổi trong hệ thống.

Việc thiết kế phải bảo đảm ba nguyên tắc:

- Không làm thay đổi hành vi của bốn loại câu hỏi hiện có.
- Tận dụng kiến trúc và cấu trúc cơ sở dữ liệu hiện tại khi phù hợp.
- Bảo đảm quy tắc ước lượng và chấm điểm có tính xác định, nhất quán và kiểm thử được.

## 2. Bối cảnh và kiến trúc hệ thống hiện tại

### 2.1. Kiến trúc tổng quan

Theo tài liệu `docs/architecture-reference.md`, hệ thống hiện tại sử dụng:

- Backend: Node.js và Express.
- Cơ sở dữ liệu: SQLite thông qua thư viện `better-sqlite3`.
- Frontend: HTML, CSS và JavaScript thuần.
- Giao tiếp: Frontend sử dụng `fetch()` để gọi các REST API.
- Truy vấn dữ liệu: SQL trực tiếp, không sử dụng ORM.

Luồng xử lý luyện tập và chấm điểm:

```text
public/*.html
      |
      v
public/assets/js/pages/exercise.js
      |
      | fetch('/api/...')
      v
server/api.js
      |
      v
server/db.js
      |
      v
SQLite Database
```

### 2.2. Cấu trúc dữ liệu hiện tại

Các bảng liên quan đến chức năng luyện tập gồm:

**Bảng `questions`:**

| Trường | Kiểu dữ liệu | Vai trò |
|---|---|---|
| `id` | TEXT | Mã câu hỏi |
| `set_id` | TEXT | Mã bộ câu hỏi |
| `lesson_id` | TEXT | Mã bài học |
| `type` | TEXT | Loại câu hỏi |
| `prompt` | TEXT | Nội dung câu hỏi |
| `options_json` | TEXT | Các lựa chọn của câu hỏi trắc nghiệm |
| `correct_answer` | TEXT NOT NULL | Đáp án chuẩn |
| `points` | INTEGER | Điểm tối đa |
| `category` | TEXT | Phân loại câu hỏi |
| `sort_order` | INTEGER | Thứ tự hiển thị |

**Bảng `attempts`:** Lưu kết quả mỗi lần làm bài, bao gồm điểm phần trăm, số câu đúng, tổng số câu, số sao đạt được, thời gian làm bài và câu trả lời.

**Bảng `progress`:** Lưu điểm cao nhất và trạng thái hoàn thành của người học đối với từng bài học.

### 2.3. Cơ chế câu hỏi và chấm điểm hiện tại

Hệ thống đang hỗ trợ bốn loại câu hỏi:

| Loại câu hỏi | Ý nghĩa | Dữ liệu đáp án |
|---|---|---|
| `multiple-choice` | Trắc nghiệm | Chuỗi đáp án |
| `input` | Điền số | Chuỗi số |
| `compare` | So sánh | `=`, `<` hoặc `>` |
| `paint` | Tô màu | Tên màu |

Trong API `POST /api/submissions`, hệ thống hiện chuyển câu trả lời thành chuỗi, chuẩn hóa bằng `trim()` và `toLowerCase()`, sau đó so sánh chính xác với `correct_answer`.

Cơ chế này không hỗ trợ việc kiểm tra một giá trị nằm trong khoảng cho phép hoặc chấm điểm riêng cho nhiều thành phần trong cùng một câu hỏi.

Do đó, việc bổ sung dạng bài ước lượng cần có một loại câu hỏi và nhánh xử lý riêng.

---

## 3. Các quyết định thiết kế

### ADR-01. Bổ sung loại câu hỏi `estimate`

**Trạng thái:** Accepted

**Vấn đề:**

Các loại câu hỏi hiện tại chưa đáp ứng yêu cầu đánh giá đồng thời khả năng ước lượng và tính toán chính xác. Việc sử dụng lại loại `input` sẽ khiến hệ thống khó phân biệt hai thành phần trả lời và áp dụng quy tắc chấm điểm riêng.

**Các phương án xem xét:**

- Phương án 1: Sử dụng lại `input`, bổ sung quy ước đặc biệt trong nội dung câu hỏi.
- Phương án 2: Thêm loại câu hỏi mới `estimate`.
- Phương án 3: Tạo một hệ thống câu hỏi riêng bên ngoài mô hình `questions` hiện có.

**Quyết định:**

Chọn phương án 2: Bổ sung giá trị `estimate` vào trường `type` của bảng `questions`.

Dạng câu hỏi `estimate` gồm hai thành phần:

1. Ước lượng: Học sinh nhập một giá trị gần với kết quả chính xác.
2. Tính chính xác: Học sinh thực hiện phép tính và nhập kết quả chính xác.

Ví dụ:

- Phép tính: \(12\times4\).
- Kết quả chính xác: 48.
- Khoảng ước lượng hợp lệ: từ 44 đến 52.

**Lý do lựa chọn:**

- Phân biệt rõ dạng bài mới với các dạng câu hỏi hiện có.
- Cho phép API nhận diện và áp dụng cơ chế chấm điểm riêng.
- Không cần thay đổi ý nghĩa của các loại câu hỏi cũ.
- Thuận tiện mở rộng thêm các dạng bài đánh giá nhiều thành phần trong tương lai.

**Ảnh hưởng:**

Cần bổ sung khả năng nhận diện `estimate` trong frontend và backend. Các loại `multiple-choice`, `input`, `compare`, `paint` tiếp tục sử dụng cơ chế hiện tại.

### ADR-02. Lưu khoảng chấp nhận trong trường `correct_answer`

**Trạng thái:** Accepted

**Vấn đề:**

Câu hỏi ước lượng cần lưu ba thông tin: giới hạn dưới, giới hạn trên và đáp án chính xác. Cấu trúc bảng `questions` hiện tại chỉ có trường `correct_answer` để lưu đáp án chuẩn.

**Các phương án xem xét:**

- Phương án 1: Thêm hai cột `lower_bound` và `upper_bound` vào bảng `questions`.
- Phương án 2: Tạo bảng mới để lưu khoảng ước lượng.
- Phương án 3: Mã hóa các thông tin cần thiết dưới dạng JSON trong trường `correct_answer` hiện có.

**Quyết định:**

Chọn phương án 3: Sử dụng trường `correct_answer` kiểu `TEXT NOT NULL` để lưu đối tượng JSON đối với câu hỏi có `type = estimate`.

Cấu trúc dữ liệu:

```json
{
  "lower": 44,
  "upper": 52,
  "exact": 48
}
```

Ý nghĩa:

- `lower`: Giới hạn dưới của khoảng ước lượng hợp lệ.
- `upper`: Giới hạn trên của khoảng ước lượng hợp lệ.
- `exact`: Đáp án chính xác của phép tính.

Đối với bốn loại câu hỏi hiện tại, định dạng `correct_answer` không thay đổi.

**Lý do lựa chọn:**

- Không cần thay đổi schema SQLite.
- Không phát sinh bảng hoặc cột mới.
- Giảm tác động đến các chức năng hiện có.
- Có thể lưu đầy đủ thông tin cần thiết cho việc chấm điểm.

**Ảnh hưởng:**

Backend phải phân tích JSON trong `correct_answer` khi xử lý câu hỏi `estimate`. Không được áp dụng phép so sánh chuỗi chính xác hiện tại cho loại câu hỏi này.

### ADR-03. Sử dụng sai số tương đối 10% để xác định khoảng ước lượng

**Trạng thái:** Accepted

**Vấn đề:**

Hệ thống cần một quy tắc xác định rõ giá trị ước lượng nào được chấp nhận. Nếu chỉ sử dụng khái niệm “gần đúng” mà không quy định giới hạn, kết quả chấm điểm sẽ không nhất quán và khó kiểm thử.

**Quyết định:**

Nhóm lựa chọn sai số tương đối 10% so với kết quả chính xác để xác định khoảng ước lượng hợp lệ.

Gọi:

- \(R\): Kết quả chính xác.
- \(L\): Giới hạn dưới.
- \(U\): Giới hạn trên.
- \(E\): Giá trị ước lượng do học sinh nhập.

Công thức:

\[
L=\lceil0.9R\rceil
\]

\[
U=\lfloor1.1R\rfloor
\]

Giá trị ước lượng được chấp nhận khi:

\[
L\leq E\leq U
\]

Trong đó, \(\lceil x\rceil\) là phép làm tròn lên và \(\lfloor x\rfloor\) là phép làm tròn xuống.

**Ví dụ 1: Phép nhân**

Với:

\[
12\times4=48
\]

Ta có:

\[
L=\lceil48\times0.9\rceil=44
\]

\[
U=\lfloor48\times1.1\rfloor=52
\]

Vậy khoảng ước lượng hợp lệ là:

\[
44\leq E\leq52
\]

Các giá trị 44, 48 và 52 đều được chấp nhận. Giá trị 43 và 53 không được chấp nhận.

**Ví dụ 2: Phép chia**

Với:

\[
84\div4=21
\]

Ta có:

\[
L=\lceil21\times0.9\rceil=19
\]

\[
U=\lfloor21\times1.1\rfloor=23
\]

Vậy khoảng ước lượng hợp lệ là:

\[
19\leq E\leq23
\]

**Phạm vi áp dụng:**

- Phép nhân có kết quả nguyên không âm.
- Phép chia có số chia khác 0 và kết quả nguyên không âm.
- Giá trị ước lượng và đáp án chính xác được xử lý dưới dạng số nguyên không âm.
- Hai giới hạn được tính bằng phép làm tròn đã quy định, không phụ thuộc vào cách làm tròn mặc định của giao diện.

**Lý do lựa chọn:**

- Quy tắc rõ ràng và tất định.
- Dễ giải thích và phù hợp với mục tiêu rèn luyện tư duy ước lượng.
- Áp dụng thống nhất cho phép nhân và phép chia.
- Dễ xây dựng các trường hợp kiểm thử giá trị biên.

### ADR-04. Chia điểm thành hai thành phần độc lập

**Trạng thái:** Accepted

**Vấn đề:**

Nếu chỉ chấm kết quả tính toán chính xác, hệ thống không ghi nhận được khả năng ước lượng của học sinh. Ngược lại, nếu chỉ chấm kết quả ước lượng, hệ thống không đánh giá được khả năng thực hiện phép tính.

**Quyết định:**

Mỗi câu hỏi `estimate` được chia thành hai phần điểm bằng nhau:

| Thành phần | Tỷ trọng |
|---|---:|
| Ước lượng đúng | 50% |
| Tính toán chính xác đúng | 50% |
| Tổng | 100% |

Gọi \(P\) là điểm tối đa của câu hỏi, \(E\) là giá trị ước lượng và \(A\) là kết quả tính toán chính xác học sinh nhập.

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

Tổng điểm câu hỏi:

\[
C=C_E+C_X
\]

**Bảng các trường hợp chấm điểm:**

| Ước lượng | Tính chính xác | Điểm đạt được |
|---|---|---:|
| Đúng | Đúng | 100% |
| Đúng | Sai | 50% |
| Sai | Đúng | 50% |
| Sai | Sai | 0% |

**Quy ước thống kê:**

- `correct_count` chỉ tăng khi học sinh trả lời đúng cả hai thành phần.
- `total_count` vẫn tính mỗi câu hỏi `estimate` là một câu hỏi.
- Điểm thành phần được cộng vào tổng điểm thực tế.
- Điểm phần trăm được tính theo tổng điểm đạt được chia cho tổng điểm tối đa của bộ câu hỏi, sau đó làm tròn theo quy tắc hệ thống.

**Lý do lựa chọn:**

- Đánh giá được hai kỹ năng riêng biệt.
- Khuyến khích học sinh suy nghĩ và ước lượng trước khi tính.
- Không loại bỏ hoàn toàn điểm số khi học sinh chỉ sai một trong hai phần.

### ADR-05. Bổ sung nhánh xử lý `estimate` trong API `POST /api/submissions`

**Trạng thái:** Accepted

**Vấn đề:**

API hiện tại sử dụng phép so sánh chuỗi chính xác:

```js
const given = answers[q.id] == null
  ? ''
  : String(answers[q.id]).trim().toLowerCase();

const ok = given === String(q.correct_answer).trim().toLowerCase();
```

Cách xử lý này không thể chấm một giá trị nằm trong khoảng hoặc đánh giá hai thành phần trả lời độc lập.

**Quyết định:**

Bổ sung nhánh xử lý riêng cho `q.type === 'estimate'` trong route `POST /api/submissions` thuộc `server/api.js`.

Cấu trúc dữ liệu gửi từ frontend:

```json
{
  "setId": "estimate-set-01",
  "answers": {
    "estimate-01": {
      "estimate": 48,
      "exact": 48
    }
  },
  "durationSec": 60
}
```

Backend thực hiện các bước:

1. Lấy danh sách câu hỏi thuộc bộ đề.
2. Kiểm tra trường `type` của từng câu hỏi.
3. Nếu `type` là `estimate`, phân tích JSON trong `correct_answer`.
4. Kiểm tra hai giá trị đầu vào `estimate` và `exact` là số nguyên không âm hợp lệ.
5. So sánh `estimate` với khoảng `[lower, upper]`.
6. So sánh `exact` với đáp án chính xác được lưu trong `correct_answer`.
7. Tính điểm riêng cho hai thành phần theo tỷ lệ 50/50.
8. Cập nhật tổng điểm, số câu đúng hoàn toàn và tổng số câu.
9. Lưu câu trả lời và kết quả vào `attempts`.
10. Tiếp tục sử dụng cơ chế cập nhật `progress` và cộng sao hiện có.

Đối với các loại câu hỏi còn lại, API tiếp tục sử dụng cơ chế so sánh chuỗi chính xác hiện tại.

**Nguyên tắc tương thích:**

Không thay thế hoặc làm thay đổi nhánh chấm điểm của `multiple-choice`, `input`, `compare` và `paint`.

### ADR-06. Lưu câu trả lời trong `attempts.answers_json`

**Trạng thái:** Accepted

**Vấn đề:**

Câu hỏi `estimate` có hai thành phần trả lời. Hệ thống cần lưu được cả hai để phục vụ việc xem lại kết quả và thống kê.

**Quyết định:**

Tiếp tục sử dụng trường `answers_json` trong bảng `attempts` để lưu câu trả lời.

Ví dụ:

```json
{
  "estimate-01": {
    "estimate": 48,
    "exact": 48
  }
}
```

Dữ liệu lưu phải thể hiện được cả giá trị ước lượng và giá trị tính toán chính xác. Việc lưu thêm trạng thái đúng/sai của từng thành phần có thể được thực hiện trong cấu trúc chi tiết nếu cần phục vụ chức năng xem lại bài.

**Lý do lựa chọn:**

- Tận dụng cấu trúc bảng `attempts` hiện tại.
- Không cần bổ sung bảng mới.
- Lưu được đầy đủ hai thành phần trả lời.
- Hỗ trợ kiểm tra và thống kê kết quả làm bài.

### ADR-07. Giữ nguyên cơ chế cập nhật tiến độ và tính sao

**Trạng thái:** Accepted

**Vấn đề:**

Việc bổ sung dạng bài mới có thể ảnh hưởng đến cách tính điểm, số câu đúng, tiến độ và sao thưởng nếu không thống nhất với cơ chế hiện tại.

**Quyết định:**

Giữ nguyên cơ chế cập nhật `progress` và tính sao đang có trong `server/api.js`.

Dạng `estimate` chỉ thay đổi cách xác định điểm của từng câu hỏi. Sau khi tính được tổng điểm, kết quả vẫn đi qua luồng lưu kết quả, cập nhật tiến độ và cộng sao hiện tại.

Các nguyên tắc cần bảo toàn:

- `best_score` tiếp tục lưu điểm cao nhất theo cơ chế hiện có.
- `completed` tiếp tục được xác định theo ngưỡng hoàn thành hiện có.
- Số sao tiếp tục được tính theo quy tắc thưởng hiện tại.
- Không tạo cơ chế tiến độ hoặc tính sao riêng cho dạng `estimate`.

**Lý do lựa chọn:**

- Bảo đảm tính nhất quán giữa các dạng bài.
- Tránh ảnh hưởng dữ liệu tiến độ đã có.
- Giảm nguy cơ phát sinh lỗi ngoài phạm vi yêu cầu.

### ADR-08. Cập nhật giao diện trong `exercise.js`

**Trạng thái:** Accepted

**Vấn đề:**

File `public/assets/js/pages/exercise.js` hiện dựng giao diện câu hỏi dựa trên trường `type`, thu thập câu trả lời và gửi dữ liệu đến API `POST /api/submissions`.

Giao diện hiện tại chưa có thành phần nhập liệu dành riêng cho câu hỏi ước lượng.

**Quyết định:**

Cập nhật file:

`public/assets/js/pages/exercise.js`

Bổ sung nhánh hiển thị dành cho `type === 'estimate'`.

Giao diện cần có:

1. Nội dung phép tính.
2. Ô nhập kết quả ước lượng.
3. Ô nhập kết quả tính toán chính xác.
4. Nhãn hướng dẫn rõ ràng cho từng ô nhập.
5. Kiểm tra dữ liệu nhập trước khi gửi bài.

Khi học sinh nộp bài, frontend gửi dữ liệu theo cấu trúc:

```json
{
  "estimate-01": {
    "estimate": 48,
    "exact": 48
  }
}
```

Dữ liệu này được đặt trong trường `answers` của request gửi đến `POST /api/submissions`.

**Nguyên tắc giao diện:**

- Thiết kế đơn giản, dễ sử dụng với học sinh lớp 3.
- Hai ô nhập liệu phải phân biệt rõ ràng.
- Không hiển thị giới hạn `lower`, `upper` hoặc đáp án `exact` trước khi nộp bài.
- Không để frontend tự quyết định kết quả đúng/sai.
- Backend là nơi thực hiện chấm điểm cuối cùng.
- Không làm thay đổi cách hiển thị của các dạng câu hỏi cũ.

### ADR-09. Không thay đổi các chức năng xác thực và quản trị

**Trạng thái:** Accepted

**Quyết định:**

Không chỉnh sửa:

- `server/auth.js`.
- Các route `/api/auth/*`.
- Các route `/api/teacher/*`.
- Các route `/api/admin/*`.

Chỉ thay đổi những thành phần trực tiếp liên quan đến dữ liệu câu hỏi, giao diện luyện tập, chấm điểm và lưu kết quả.

**Lý do lựa chọn:**

- Tuân thủ phạm vi B-07 của đề thi.
- Giảm nguy cơ phát sinh lỗi ngoài yêu cầu.
- Bảo đảm các chức năng hiện có tiếp tục hoạt động bình thường.

---

## 4. Tổng hợp quyết định kiến trúc theo từng thành phần

Đây là phần trả lời trực tiếp yêu cầu làm rõ luồng UI, API, DB và kiểm thử.

| Thành phần | Hiện trạng | Quyết định mở rộng |
|---|---|---|
| Question type | Có 4 type | Bổ sung `estimate` |
| Database | `questions.correct_answer` lưu đáp án dạng TEXT | Lưu JSON gồm `lower`, `upper`, `exact` cho `estimate` |
| Database attempts | Có `answers_json` | Lưu cả `estimate` và `exact` |
| Database progress | Có `best_score`, `completed` | Giữ nguyên cơ chế cập nhật |
| API chấm điểm | So sánh chuỗi chính xác | Thêm nhánh riêng `q.type === 'estimate'` trong `POST /api/submissions` |
| Frontend | Dựng câu hỏi theo `type` | Sửa `public/assets/js/pages/exercise.js`, thêm hai ô nhập |
| Kiểm thử | Kiểm tra các type hiện tại | Bổ sung kiểm thử khoảng biên, hai thành phần điểm, dữ liệu không hợp lệ và hồi quy |

### 4.1. Thay đổi cơ sở dữ liệu

Không thêm bảng hoặc cột mới.

Sử dụng:

- `questions.type = 'estimate'`.
- `questions.correct_answer` lưu JSON gồm ba thuộc tính `lower`, `upper`, `exact`.
- `attempts.answers_json` lưu hai giá trị học sinh nhập.
- `attempts.score_percent`, `correct_count`, `total_count` tiếp tục lưu kết quả theo cấu trúc hiện có.
- `progress` tiếp tục lưu điểm cao nhất và trạng thái hoàn thành.

### 4.2. Thay đổi API

Chỉ bổ sung nhánh xử lý dạng `estimate` trong:

`POST /api/submissions`

Nhánh mới thực hiện kiểm tra khoảng ước lượng và đáp án chính xác độc lập, sau đó tính điểm thành phần.

Các dạng câu hỏi cũ tiếp tục đi theo nhánh so sánh chuỗi hiện tại.

### 4.3. Thay đổi giao diện

Chỉnh sửa:

`public/assets/js/pages/exercise.js`

Bổ sung giao diện và logic thu thập hai giá trị trả lời. Frontend gửi dữ liệu đến API theo đúng cấu trúc đã thống nhất.

### 4.4. Thay đổi kiểm thử

Bổ sung các nhóm kiểm thử:

- Kiểm tra giá trị ước lượng tại giới hạn dưới và giới hạn trên.
- Kiểm tra giá trị nằm ngoài khoảng chấp nhận.
- Kiểm tra kết quả tính toán chính xác.
- Kiểm tra bốn trường hợp kết hợp đúng/sai của hai thành phần.
- Kiểm tra dữ liệu thiếu, dữ liệu không phải số và số âm.
- Kiểm tra việc lưu kết quả và cập nhật tiến độ.
- Kiểm thử hồi quy bốn loại câu hỏi hiện có.
- Kiểm tra API không tiết lộ đáp án chuẩn trước khi nộp bài.

Chi tiết dữ liệu kiểm thử và kết quả mong đợi được trình bày trong `TEST_PLAN.md`.

---

## 5. Rủi ro và phương án kiểm soát

| Rủi ro | Ảnh hưởng | Phương án kiểm soát |
|---|---|---|
| JSON trong `correct_answer` sai cấu trúc | Backend không thể chấm điểm | Kiểm tra cấu trúc JSON trước khi xử lý |
| Giá trị nhập không phải số | Lỗi tính toán hoặc chấm điểm | Kiểm tra kiểu dữ liệu ở frontend và backend |
| Tính sai khoảng ước lượng | Đánh giá sai câu trả lời | Kiểm thử giá trị biên |
| Chỉ chấm một thành phần | Điểm không phản ánh đúng kết quả | Kiểm thử đủ bốn trường hợp đúng/sai |
| Làm thay đổi logic type cũ | Phát sinh lỗi hồi quy | Giữ nguyên nhánh xử lý cũ |
| Lộ đáp án chuẩn | Học sinh biết trước kết quả | API lấy câu hỏi không trả `correct_answer` |
| Frontend tự chấm điểm | Có thể bị can thiệp dữ liệu | Backend thực hiện chấm điểm cuối cùng |

---

## 6. Phạm vi triển khai

Trong giai đoạn tiếp theo, nhóm dự kiến thực hiện:

1. Bổ sung loại câu hỏi `estimate`.
2. Cập nhật dữ liệu câu hỏi theo cấu trúc JSON đã thống nhất.
3. Bổ sung nhánh chấm điểm trong `POST /api/submissions`.
4. Cập nhật giao diện `public/assets/js/pages/exercise.js`.
5. Bổ sung dữ liệu mẫu cho phép nhân và phép chia.
6. Xây dựng kiểm thử cho công thức sai số, giá trị biên và điểm thành phần.
7. Kiểm thử việc lưu kết quả, cập nhật tiến độ và tính sao.
8. Kiểm thử hồi quy các loại câu hỏi hiện có.

Không thay đổi các chức năng xác thực, quản trị và các thành phần nằm ngoài phạm vi B-07.

---

## 7. Kết luận

Nhóm lựa chọn mở rộng hệ thống bằng cách bổ sung loại câu hỏi `estimate`, sử dụng trường `correct_answer` hiện có để lưu khoảng ước lượng và đáp án chính xác dưới dạng JSON. Phương án này hạn chế việc thay đổi cấu trúc cơ sở dữ liệu, đồng thời cho phép API áp dụng quy tắc chấm điểm riêng cho dạng câu hỏi mới.

Cơ chế sai số tương đối 10% giúp xác định khoảng ước lượng một cách rõ ràng và tất định. Việc chia điểm thành hai thành phần 50/50 giúp đánh giá đồng thời khả năng ước lượng và tính toán chính xác của học sinh.

Ở phía backend, nhóm bổ sung nhánh xử lý `estimate` trong `POST /api/submissions`; ở phía frontend, nhóm cập nhật `public/assets/js/pages/exercise.js` để hiển thị và thu thập hai câu trả lời. Các loại câu hỏi cũ, cơ chế xác thực, cập nhật tiến độ và tính sao được giữ nguyên.

Những quyết định trên là cơ sở kiến trúc cho giai đoạn triển khai và kiểm thử tiếp theo. Các nội dung được mô tả trong tài liệu là thiết kế dự kiến, không khẳng định tính năng `estimate` đã được triển khai trong mã nguồn hiện tại.
