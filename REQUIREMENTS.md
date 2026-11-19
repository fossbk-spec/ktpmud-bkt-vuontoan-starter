# REQUIREMENTS.md
# VƯỜN TOÁN LỚP 3 – ƯỚC LƯỢNG TRƯỚC KHI TÍNH ĐÚNG
---

1. Mục đích và phạm vi tài liệu
Tài liệu này đặc tả yêu cầu cho việc mở rộng hệ thống Vườn Toán Lớp 3 bằng dạng bài “Ước lượng trước khi tính đúng”. Tài liệu là căn cứ chung cho phân tích, thiết kế, triển khai, kiểm thử và nghiệm thu tính năng.

Tính năng yêu cầu học sinh thực hiện hai bước trong cùng một câu hỏi:
1. Đưa ra một giá trị ước lượng cho kết quả phép tính.
2. Nhập kết quả tính chính xác.
Hệ thống đánh giá riêng hai phần, phản hồi rõ phần nào hợp lý và phần nào chính xác. Tính năng phải được tích hợp vào hệ thống hiện có, không phải một ứng dụng độc lập.

Tài liệu này phải được đọc cùng DECISIONS.md, TEST_PLAN.md và docs/architecture-reference.md. Khi có khác biệt giữa tài liệu nhóm và mã nguồn/đặc tả chính thức, nhóm phải kiểm tra và ghi nhận khác biệt, không tự giả định.
2. Thông tin và bối cảnh hệ thống
Thuộc tính	Nội dung
Sản phẩm	Vườn Toán Lớp 3
Cuộc thi	KTPMUD Hack Marathon 2026
Track	B – Vườn Toán Lớp 3
Nhóm	33
Phiên bản starter	bkt-2026-v1
Backend	Node.js 18+, Express
Cơ sở dữ liệu	SQLite thông qua better-sqlite3
Frontend	HTML, CSS và JavaScript thuần
Dạng bài mới	Ước lượng trước khi tính đúng
Đối tượng sử dụng	Học sinh sử dụng hệ thống học tập hiện có


Theo docs/architecture-reference.md, ứng dụng hiện tại sử dụng Express, SQLite và giao diện tĩnh. Các câu hỏi hiện có gồm các type multiple-choice, input, compare, paint; đáp án hiện được lưu trong questions.correct_answer. Luồng nộp bài hiện tại đi qua POST /api/submissions, lưu kết quả vào attempts và cập nhật tiến độ. Cơ chế xác thực nằm trong server/auth.js và ngoài phạm vi thay đổi của tính năng.
3. Mục tiêu
3.1. Mục tiêu nghiệp vụ
- Giúp học sinh luyện tư duy ước lượng trước khi tính toán.
- Khuyến khích học sinh kiểm tra tính hợp lý của kết quả.
- Cung cấp phản hồi dễ hiểu, phù hợp với học sinh lớp 3.
- Duy trì trải nghiệm học tập và tiến độ của hệ thống hiện có.
3.2. Mục tiêu kỹ thuật
- Bổ sung type câu hỏi mới mà không làm thay đổi hành vi của bốn type cũ.
- Có quy tắc ước lượng và chấm điểm tất định, có thể giải thích và kiểm thử.
- Để server xác thực dữ liệu, chấm điểm và lưu kết quả.
- Không tiết lộ đáp án hoặc dữ liệu chấm điểm nội bộ trước khi nộp bài.
- Có ít nhất 12 fixture tổng hợp, test tự động, lệnh npm test và CI chạy test trên Pull Request.
- Có thể cài đặt và chạy lại từ trạng thái repository sạch.
4. Phạm vi
4.1. Trong phạm vi
- Tích hợp dạng bài vào luồng học tập hiện có.
- Bổ sung câu hỏi phép nhân và phép chia phù hợp với phạm vi lớp 3.
- Thu nhận hai câu trả lời: ước lượng và kết quả chính xác.
- Tính khoảng ước lượng theo công thức thống nhất tại DECISIONS.md.
- Chấm điểm riêng hai thành phần theo tỷ trọng 50% – 50%.
- Lưu kết quả bằng cơ chế lưu trữ hiện có.
- Trả phản hồi sau khi nộp bài.
- Bổ sung kiểm thử đơn vị, tích hợp, API và giao diện.
- Bổ sung lệnh test và CI phù hợp với repository.
4.2. Ngoài phạm vi
- Xây dựng ứng dụng hoặc hệ thống đăng nhập mới.
- Thay đổi cơ chế xác thực, session, cookie hoặc tài khoản mẫu.
- Chỉnh sửa các route /api/auth/*, /api/teacher/*, /api/admin/* ngoài yêu cầu được cho phép.
- Sử dụng dữ liệu cá nhân thật của học sinh/giáo viên.
- Dùng AI/LLM hoặc dịch vụ bên ngoài để chấm câu trả lời.
- Thay đổi các type câu hỏi hiện có hoặc viết lại toàn bộ kiến trúc.
- Triển khai production mới.
5. Quy tắc nghiệp vụ và thuật ngữ
Với mỗi câu hỏi:
- R: kết quả chính xác của phép tính.
- L: cận dưới của khoảng ước lượng.
- U: cận trên của khoảng ước lượng.
- E: giá trị ước lượng học sinh nhập.
- A: kết quả chính xác học sinh nhập.
Một câu trả lời ước lượng hợp lý khi L <= E <= U. Hai cận đều được tính là hợp lệ. Đáp án tính chính xác đúng khi A = R.

Quy tắc xử lý dữ liệu cần phân biệt:
- Dữ liệu sai định dạng, thiếu trường bắt buộc, không phải số nguyên hoặc nằm ngoài giới hạn đầu vào được công bố: server từ chối request bằng lỗi phù hợp; không chấm và không lưu một attempt hợp lệ.
- Một số nguyên hợp lệ nhưng nằm ngoài [L,U]: vẫn là câu trả lời hợp lệ về mặt định dạng; server ghi nhận phần ước lượng là sai, vẫn chấm phần đáp án chính xác.
- Không được dùng từ “từ chối dữ liệu” cho trường hợp số nguyên hợp lệ nhưng nằm ngoài khoảng ước lượng.
6. Yêu cầu chức năng
FR-01 – Tích hợp vào luồng học tập
Tính năng phải được truy cập từ khu vực học tập hiện có. Không tạo trang demo tách rời hoặc yêu cầu người dùng đăng nhập bằng cơ chế mới.

Tiêu chí chấp nhận: Người học có thể mở dạng bài từ điều hướng học tập hiện có và quay lại luồng học tập mà không làm hỏng chức năng cũ.
FR-02 – Hỗ trợ type câu hỏi ước lượng
Hệ thống bổ sung một type mới, đề xuất định danh estimate. Type mới phải được xử lý riêng và không làm thay đổi cách hiển thị/chấm điểm của multiple-choice, input, compare, paint.

Tiêu chí chấp nhận: Câu hỏi estimate hiển thị đủ hai vùng nhập; các type cũ vẫn hoạt động như trước.
FR-03 – Bộ dữ liệu câu hỏi tái lập
Hệ thống phải có tối thiểu 12 câu hỏi/fixture tổng hợp, có ID duy nhất, bao gồm phép nhân và phép chia, có thể dùng lặp lại trong test và demo.

Tiêu chí chấp nhận: Có ít nhất 12 fixture được lưu thành dữ liệu có cấu trúc trong repository; test có thể nạp và kiểm tra chúng.
FR-04 – Tính khoảng ước lượng xác định
Với kết quả chính xác nguyên dương R, hệ thống tính:
- L = ceil(0.9 × R)
- U = floor(1.1 × R)
Khoảng được hiểu là đóng [L,U]. Công thức, miền dữ liệu và ví dụ phải được thống nhất trong DECISIONS.md. Không dùng số ngẫu nhiên hoặc đánh giá chủ quan.

Tiêu chí chấp nhận: Cùng một R luôn tạo cùng L,U; test kiểm tra kết quả ở trong khoảng, đúng hai cận và ngoài hai cận.
FR-05 – Thu nhận và xác thực câu trả lời
Mỗi câu trả lời gồm giá trị ước lượng E và đáp án chính xác A. Server xác thực kiểu dữ liệu, trường bắt buộc và giới hạn đầu vào trước khi chấm.

Tiêu chí chấp nhận: Dữ liệu thiếu/sai kiểu/không phải số nguyên bị từ chối; số nguyên hợp lệ ngoài khoảng vẫn được chấm là ước lượng sai.
FR-06 – Chấm điểm phía server
Server là nơi duy nhất quyết định kết quả. Mỗi câu hỏi có hai thành phần điểm bằng nhau:
- Ước lượng hợp lý: 50% điểm câu hỏi.
- Đáp án chính xác: 50% điểm câu hỏi.
Điểm câu hỏi = points × (0.5 × estimateCorrect + 0.5 × exactCorrect), trong đó mỗi biến đúng/sai có giá trị 1 hoặc 0. Tổng điểm phần trăm được tính từ tổng điểm đạt được chia tổng điểm tối đa, nhân 100 và làm tròn theo một quy tắc duy nhất được triển khai trong server.

Tiêu chí chấp nhận: Cả hai đúng được 100% điểm câu hỏi; chỉ một phần đúng được 50%; cả hai sai được 0%. Frontend không tự quyết định điểm.
FR-07 – Phản hồi riêng biệt
Sau khi nộp, hệ thống phải thông báo riêng:
- Ước lượng hợp lý hay chưa.
- Kết quả tính chính xác đúng hay chưa.
- Điểm đạt được và lời giải thích phù hợp.
Không hiển thị đáp án chuẩn trước khi nộp.

Tiêu chí chấp nhận: Bốn tổ hợp đúng/sai của hai thành phần có phản hồi phân biệt được.
FR-08 – Bảo vệ đáp án
API lấy câu hỏi chỉ trả dữ liệu cần để hiển thị và nhập câu trả lời. Không trả correct_answer, R, L, U, exact, hoặc dữ liệu nội bộ tương đương trước khi nộp.

Tiêu chí chấp nhận: Kiểm tra toàn bộ JSON của API lấy câu hỏi và các trường lồng nhau; không có đáp án hoặc cận chấm điểm. Server tự lấy đáp án từ dữ liệu lưu trữ khi chấm.
FR-09 – Lưu kết quả và tiến độ
Kết quả được lưu ở server bằng cơ chế attempts/`progress` hiện có hoặc cách mở rộng tương thích đã được nhóm giải trình. Dữ liệu lưu phải đủ để xem lại hai câu trả lời và kết quả hai thành phần.

Tiêu chí chấp nhận: Sau khi nộp và tải lại trang, kết quả đã lưu vẫn truy xuất được; không ghi đè sai attempt của người dùng khác.
FR-10 – Bảo toàn quy tắc tiến độ và sao
Tính năng phải tích hợp với cơ chế cập nhật tiến độ và phần thưởng hiện có, không tự tạo cơ chế tiến độ hoặc sao xung đột. correct_count chỉ tăng cho câu hỏi được xác định là đúng hoàn toàn theo quy ước của hệ thống; việc lưu điểm thành phần phải được mô tả rõ trong thiết kế.

Tiêu chí chấp nhận: Kết quả nộp bài cập nhật tiến độ theo quy tắc hiện có và không cộng trùng phần thưởng.
FR-11 – Kiểm thử tự động và CI
Có test tự động cho công thức, chấm điểm, xác thực dữ liệu, API, lưu/truy xuất và bảo vệ đáp án. Có script npm test; CI cài phụ thuộc và chạy test trên Pull Request.

Tiêu chí chấp nhận: npm ci và npm test chạy được từ checkout sạch; CI báo trạng thái thành công/thất bại rõ ràng.
FR-12 – Bảo toàn chức năng hiện có
Không thay đổi hành vi của các type câu hỏi cũ và các chức năng không liên quan. Không sửa server/auth.js, cơ chế session, tài khoản mẫu hoặc route ngoài phạm vi bị cấm.

Tiêu chí chấp nhận: Diff được rà soát; test hồi quy cho các type cũ chạy đạt; không có chỉnh sửa ngoài phạm vi.
7. Yêu cầu phi chức năng
NFR-01 – Tính xác định
Cùng dữ liệu đầu vào và cùng phiên bản quy tắc phải tạo cùng khoảng ước lượng và điểm số.
NFR-02 – Bảo mật đáp án
Không gửi đáp án chuẩn hoặc dữ liệu nội bộ chấm điểm trước khi nộp. Không tin tưởng điểm số do client gửi lên.
NFR-03 – Quyền riêng tư
Chỉ dùng dữ liệu giả lập, không ghi thông tin nhận dạng thật của trẻ em hoặc người dùng vào fixture, log, ảnh chụp hay báo cáo.
NFR-04 – Khả năng tương thích
Sử dụng stack và cấu trúc hiện có của starter; không thêm framework frontend hoặc ORM mới nếu không có lý do và phê duyệt trong ADR.
NFR-05 – Khả năng bảo trì
Quy tắc tính khoảng và chấm điểm phải tách thành hàm/module có thể kiểm thử; tránh lặp logic ở frontend và backend.
NFR-06 – Khả năng sử dụng và truy cập
Nhãn trường nhập rõ ràng; thông báo lỗi dễ hiểu; các thao tác chính dùng được bằng bàn phím; giao diện không phụ thuộc riêng vào màu sắc để truyền đạt đúng/sai.
8. Dữ liệu mẫu và quy ước
Bộ fixture chuẩn đề xuất được lưu ở test/fixtures/estimate-fixtures.json (hoặc vị trí tương đương được xác nhận trong repository). Từng fixture có id, operation, left, right, result, lower, upper.
ID	Phép tính	R	L	U
F01	12 × 4	48	44	52
F02	15 × 3	45	41	49
F03	18 × 5	90	81	99
F04	24 × 4	96	87	105
F05	32 × 3	96	87	105
F06	27 × 6	162	146	178
F07	72 ÷ 6	12	11	13
F08	84 ÷ 7	12	11	13
F09	96 ÷ 8	12	11	13
F10	144 ÷ 12	12	11	13
F11	180 ÷ 9	20	18	22
F12	216 ÷ 6	36	33	39


Các phép chia trong bộ fixture này đều có thương nguyên. Các giá trị L,U phải được kiểm tra tự động theo công thức, không nhập độc lập mà không xác minh.
9. Ràng buộc và giả định
- Chỉ áp dụng công thức trên cho kết quả nguyên dương trong phạm vi dữ liệu câu hỏi của tính năng.
- Bộ dữ liệu chia phải bảo đảm phép chia hợp lệ và có thương nguyên; nếu mở rộng sang phép chia có dư hoặc kết quả thập phân, cần ADR cập nhật.
- correct_answer hiện là chuỗi và logic hiện tại so sánh chuỗi chính xác. Nếu mã hóa dữ liệu của type estimate bằng JSON trong trường này, server phải parse/validate JSON an toàn và chỉ dùng ở server.
- Tên endpoint, schema DB, vị trí file test và công cụ test phải đối chiếu mã nguồn thực tế trước khi chốt triển khai.
- Không tuyên bố một yêu cầu đã triển khai chỉ vì nó đã được mô tả trong tài liệu.
10. Ma trận truy vết yêu cầu
Mã	Nội dung	Tài liệu thiết kế	Kiểm thử
B-01	Tích hợp vào luồng học tập	DEC-01	TC-01, TC-02
B-02	Ít nhất 12 fixture	DEC-02	TC-03
B-03	Quy tắc ước lượng tất định	DEC-03	TC-04 đến TC-10
B-04	Không lộ đáp án trước khi nộp	DEC-04	TC-18
B-05	Server lưu kết quả	DEC-05	TC-19, TC-20
B-06	Phản hồi/chấm hai thành phần	DEC-03, DEC-05	TC-11 đến TC-15
B-07	Không sửa xác thực/session/tài khoản mẫu	DEC-07	TC-24
B-08	Kiểm thử chức năng và biên	DEC-08	TC-04 đến TC-24
B-09	Có npm test	DEC-08	TC-22
B-10	CI chạy test trên PR	DEC-08	TC-23
B-11	Không có dữ liệu cá nhân thật/secret	DEC-07	TC-24
B-12	Khả năng truy cập và thông báo lỗi	DEC-01, DEC-08	TC-16, TC-17, TC-21


11. Điều kiện nghiệm thu tài liệu và triển khai
Một yêu cầu chỉ được đánh dấu “Hoàn thành” khi có bằng chứng tương ứng: mã nguồn, test chạy được, kết quả kiểm thử hoặc diff xác minh. Các nội dung mới chỉ được mô tả trong tài liệu phải ghi trạng thái “Đã đặc tả – chưa xác minh triển khai”.

Tính năng được nghiệm thu khi:
1. Đáp ứng các tiêu chí FR-01 đến FR-12 và NFR-01 đến NFR-06.
2. Có ít nhất 12 fixture thực tế, dùng được trong test.
3. Server chấm điểm và lưu kết quả.
4. API không lộ đáp án trước khi nộp.
5. npm test chạy đạt.
6. CI chạy đạt trên Pull Request.
7. Không vi phạm ràng buộc bảo mật, quyền riêng tư và phạm vi.
8. Có hướng dẫn chạy/test và báo cáo kết quả kiểm thử.
12. Tài liệu tham chiếu
- docs/architecture-reference.md – tài liệu kiến trúc chuẩn của Track B.
- README.md – cách cài đặt, chạy và mô tả starter.
- DECISIONS.md – quyết định thiết kế.
- TEST_PLAN.md – kế hoạch kiểm thử.
- Đề thi và rubric chính thức KTPMUD Hack Marathon 2026 do giảng viên cung cấp.
