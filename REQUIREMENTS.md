# REQUIREMENTS — Vườn Toán Lớp 3 (Track B)

## 1. Thông tin dự án

- **Môn học:** Kỹ thuật Phần mềm Ứng dụng (KTPMUD)
- **Bài kiểm tra:** Hack Marathon 2026 — BKT-2
- **Track:** B — Vườn Toán Lớp 3
- **Repository:** `ktpmud-bkt-vuontoan-starter`
- **Giai đoạn:** M1 → M2 · cập nhật sau Checkpoint 1 ngày 11/11/2026

## 2. Bối cảnh

Vườn Toán Lớp 3 là website hỗ trợ học sinh lớp 3 học tập, luyện tập và kiểm tra môn Toán.

Hệ thống hiện có giao diện học sinh và giáo viên, backend Node.js/Express, cơ sở dữ liệu SQLite và chức năng chấm điểm trên server.

Hệ thống hiện hỗ trợ bốn loại câu hỏi: `multiple-choice`, `input`, `compare` và `paint`.

Tuy nhiên, cơ chế chấm điểm hiện tại chủ yếu dựa trên so sánh đáp án chính xác, chưa hỗ trợ đầy đủ dạng bài yêu cầu học sinh ước lượng trước khi tính kết quả đúng.

## 3. Mục tiêu

Bổ sung dạng bài **“Ước lượng trước khi tính đúng”** cho phép học sinh:

1. Nhận câu hỏi về phép nhân hoặc phép chia.
2. Làm một phiếu riêng gồm 12 câu nhân/chia, **mỗi lần chỉ một câu**, nhập ước lượng trong thời hạn ngắn trước khi tính chính xác.
3. Nhập kết quả tính chính xác.
4. Nhận phản hồi riêng cho phần ước lượng và phần tính đúng.
5. Được lưu kết quả và tiến độ học tập trên hệ thống.

Chức năng mới phải tích hợp với luồng học hiện tại, không làm thay đổi hành vi của các loại câu hỏi cũ.

## 4. Phạm vi thực hiện

### Trong phạm vi

- Bổ sung dạng câu hỏi ước lượng.
- Thiết kế giao diện nhập và hiển thị phản hồi.
- Xây dựng quy tắc chấm điểm tất định trên server.
- Lưu kết quả bằng SQLite.
- Bổ sung tối thiểu 12 câu hỏi mẫu có thể tái lập.
- Viết kiểm thử tự động và cấu hình CI.
- Đảm bảo khả năng sử dụng bằng bàn phím và thông báo lỗi rõ ràng.

### Ngoài phạm vi

- Xây dựng lại toàn bộ website.
- Thay đổi chức năng đăng nhập, session và phân quyền.
- Sửa các API giáo viên hoặc quản trị viên.
- Thay đổi hành vi của bốn loại câu hỏi hiện có.
- Kết nối dữ liệu học sinh thật hoặc hệ thống production.
- Sử dụng AI để sinh hoặc chấm đáp án trong lúc học sinh làm bài.

## 5. Các quyết định cần làm rõ

- Cách biểu diễn câu hỏi ước lượng trong dữ liệu.
- Quy tắc xác định một ước lượng hợp lý.
- **Đã chốt nội bộ:** đúng toàn câu khi cả ước lượng đạt (±20%) và tính chính xác đúng; không chia điểm 4/6.
- Cách lưu hai phần trả lời và kết quả chấm.
- Cách tích hợp dạng bài mới mà không phá vỡ các chức năng cũ.

Các quyết định đã thống nhất được ghi trong ADR-001 và ADR-002; thời lượng cụ thể và hợp đồng API cần hoàn thiện trước khi lập trình.
## 6. Yêu cầu và tiêu chí chấp nhận

Các tiêu chí dưới đây cụ thể hóa B-01 đến B-12 của đề thi Track B. Ngưỡng 20% và đúng/sai toàn câu đã được nhóm chốt trong ADR; việc triển khai chưa hoàn thành.

### B-01 — Tích hợp dạng bài mới

**Yêu cầu:** Dạng bài “Ước lượng trước khi tính đúng” phải hoạt động trong luồng học tập hiện có.

**Acceptance Criteria:**
- AC-01.1: Học sinh đăng nhập bằng tài khoản mẫu có thể truy cập bộ câu hỏi ước lượng.
- AC-01.2: Mỗi câu được trình bày theo thứ tự ước lượng có thời hạn → tính chính xác; backend xác thực trình tự, khóa E sau khi xác nhận hoặc hết giờ.
- AC-01.4: Bộ 12 câu được làm tuần tự, không mở đồng thời toàn bộ câu; hết giờ ước lượng không làm mất quyền làm bước tính chính xác.
- AC-01.3: Học sinh có thể hoàn thành và nộp bài mà không phải sử dụng một website riêng.

### B-02 — Dữ liệu câu hỏi mẫu

**Yêu cầu:** Có tối thiểu 12 câu hỏi synthetic, tái lập được.

**Acceptance Criteria:**
- AC-02.1: Bộ dữ liệu có ít nhất 12 câu hỏi thuộc dạng bài mới.
- AC-02.2: Các câu hỏi sử dụng phép nhân và phép chia phù hợp với học sinh lớp 3.
- AC-02.3: Có thể tái tạo bộ câu hỏi từ dữ liệu hoặc công cụ được lưu trong repository.
- AC-02.4: 12 fixture xác định rõ phép tính, đáp án nguyên dương và khoảng E nguyên chấp nhận; xem `TEST_PLAN.md` §5.

### B-03 — Quy tắc ước lượng

**Yêu cầu:** Việc tạo và chấm ước lượng phải rõ ràng, tất định và kiểm thử được.

**Acceptance Criteria:**
- AC-03.1: Quy tắc xác định ước lượng hợp lý được mô tả bằng công thức hoặc thuật toán cụ thể.
- AC-03.2: Cùng một câu hỏi và câu trả lời luôn tạo ra cùng kết quả đánh giá.
- AC-03.3: Các trường hợp ở ngưỡng biên được định nghĩa và kiểm thử bằng `4*A <= 5*E && 5*E <= 6*A`, không so sánh số thực.
- AC-03.5: E = A (sai số 0%) được chấp nhận về mặt toán học; không khẳng định chứng minh được phương pháp tư duy.
- AC-03.4: Không sử dụng AI để quyết định đáp án trong lúc chấm bài.

### B-04 — Không tiết lộ đáp án

**Yêu cầu:** API lấy câu hỏi không được trả về đáp án đúng trước khi học sinh nộp bài.

**Acceptance Criteria:**
- AC-04.1: API trả về nội dung và dữ liệu cần thiết để hiển thị câu hỏi.
- AC-04.2: API không trả về đáp án chính xác hoặc dữ liệu cho phép đọc trực tiếp đáp án chấm.
- AC-04.3: Việc chấm điểm thực hiện ở backend.

### B-05 — Chấm và lưu kết quả

**Yêu cầu:** Server chấm bài và lưu kết quả vào SQLite.

**Acceptance Criteria:**
- AC-05.1: Backend nhận được câu trả lời ước lượng và kết quả chính xác.
- AC-05.2: Backend chỉ tính câu đúng nếu **ước lượng đạt VÀ đáp án chính xác đúng**; `correct_count` đếm số câu đúng toàn phần và `score_percent` là tỷ lệ phần trăm số câu đúng (làm tròn theo hệ thống hiện tại).
- AC-05.3: Lượt làm bài được lưu trong SQLite.
- AC-05.4: Sau khi tải lại trang, dữ liệu đã lưu vẫn có thể được truy xuất.

### B-06 — Phản hồi học tập

**Yêu cầu:** Phản hồi phải phân biệt phần ước lượng và phần tính chính xác.

**Acceptance Criteria:**
- AC-06.1: Học sinh biết ước lượng của mình có hợp lý hay không.
- AC-06.2: Học sinh biết kết quả tính chính xác đúng hay sai.
- AC-06.4: Phản hồi hai phần không đồng nghĩa được cộng điểm thành phần; câu chỉ có 0 hoặc 1 kết quả đúng.
- AC-06.3: Thông báo phản hồi dễ hiểu, phù hợp với học sinh lớp 3.

### B-07 — Giới hạn phạm vi thay đổi

**Yêu cầu:** Không làm ảnh hưởng đến hệ thống đăng nhập, quản trị và triển khai hiện có.

**Acceptance Criteria:**
- AC-07.1: Không chỉnh sửa `server/auth.js`.
- AC-07.2: Không chỉnh sửa các route `/api/auth/*`, `/api/teacher/*`, `/api/admin/*`.
- AC-07.3: Không thay đổi tài khoản mẫu hoặc cấu hình deployment ngoài phạm vi cho phép.
- AC-07.4: Bốn dạng câu hỏi cũ vẫn hoạt động như trước.

### B-08 — Kiểm thử

**Yêu cầu:** Có kiểm thử các trường hợp bình thường, biên, dữ liệu không hợp lệ và tính điểm.

**Acceptance Criteria:**
- AC-08.1: Có test cho ước lượng hợp lý và không hợp lý.
- AC-08.2: Có test cho giá trị tại ngưỡng biên.
- AC-08.3: Có test cho dữ liệu thiếu, sai kiểu hoặc không hợp lệ.
- AC-08.4: Có test bốn tổ hợp đúng/sai, test `correct_count` và `score_percent`.
- AC-08.5: Có test hết hạn, gửi E muộn, sửa E đã khóa, vượt giai đoạn, retry và gửi yêu cầu trực tiếp không qua UI.

### B-09 — Chạy test tự động

**Yêu cầu:** Có thể chạy kiểm thử bằng `npm test`.

**Acceptance Criteria:**
- AC-09.1: Repository có script `test` hoạt động.
- AC-09.2: Sau khi checkout sạch và cài dependencies, chạy `npm test` không cần thao tác thủ công bổ sung ngoài hướng dẫn.
- AC-09.3: Test thất bại trả về mã thoát khác 0.

### B-10 — Continuous Integration

**Yêu cầu:** CI chạy khi có Pull Request.

**Acceptance Criteria:**
- AC-10.1: Có GitHub Actions workflow phù hợp.
- AC-10.2: Workflow chạy `npm ci` và `npm test`.
- AC-10.3: Khi test thất bại, workflow hiển thị trạng thái thất bại.

### B-11 — Bảo mật và dữ liệu

**Yêu cầu:** Không sử dụng dữ liệu cá nhân thật hoặc đưa secret vào repository.

**Acceptance Criteria:**
- AC-11.1: Câu hỏi và tài khoản demo sử dụng dữ liệu synthetic.
- AC-11.2: Không commit mật khẩu bí mật, token hoặc file môi trường chứa secret.
- AC-11.3: Không sử dụng dữ liệu học sinh thật.

### B-12 — Khả năng sử dụng

**Yêu cầu:** Giao diện có thể thao tác bằng bàn phím và thông báo lỗi rõ ràng.

**Acceptance Criteria:**
- AC-12.1: Có thể nhập ước lượng, chuyển bước và nộp bài bằng bàn phím.
- AC-12.2: Các trường nhập có nhãn rõ ràng.
- AC-12.3: Khi nhập dữ liệu không hợp lệ, học sinh nhận được thông báo dễ hiểu.
- AC-12.4: Trạng thái focus và phản hồi không chỉ được thể hiện bằng màu sắc.
## 7. Quyết định sau Checkpoint 1 (11/11/2026)

1. Giữ type `estimate` độc lập, một phiếu riêng gồm **12 câu nhân/chia** trong hệ thống bài tập hiện có.
2. Làm **từng câu một**; mỗi câu có giai đoạn ước lượng giới hạn thời gian (dự kiến thử nghiệm 10–15 giây, **chưa chốt**) và giai đoạn tính chính xác. Backend chịu trách nhiệm kiểm tra thứ tự và thời hạn.
3. Chấm ước lượng bằng so sánh số nguyên `4*A <= 5*E && 5*E <= 6*A`, với A nguyên dương và E nguyên không âm.
4. **Chỉ tính đúng câu khi cả hai phần đều đúng**; bỏ điểm thành phần 4/6. Phần trăm = tỷ lệ câu đúng hoàn toàn.
5. `E = A` vẫn đạt vì sai số 0%; giới hạn thời gian **không chứng minh** phương pháp tư duy của học sinh.
6. 12 fixture và test biên cụ thể nằm trong `TEST_PLAN.md`; đây là **dữ liệu đề xuất**, chưa được tích hợp vào `data/seed.json`.
7. Giữ nguyên các vùng cấm sửa của B-07; các thay đổi backend chỉ nằm ở nhánh xử lý type mới và phần lưu trạng thái cần thiết.

**Cần GV/TA xác nhận:** Quy tắc chấm đúng/sai toàn câu thay cho 4/6 và cách áp dụng thời hạn ước lượng cho học sinh lớp 3.
