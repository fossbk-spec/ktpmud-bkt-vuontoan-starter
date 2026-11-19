# PROGRESS — 33 — Track B
Sản phẩm: Vườn Toán Lớp 3 — Ước lượng trước khi tính đúng
Track: B
Nhóm: 33
Starter: bkt-2026-v1
Branch báo cáo: submit/hoang_mai_toan-N33
Ngày cập nhật: 17/11/2026
Commit mã nguồn starter đã có CI: be5da68e3e6d4d776aa96a30cf6bfe6ee1675df5 (theo source-ref.json và TEST_REPORT.md).
PR nộp tài liệu: #37, nhánh submit/hoang_mai_toan-N33; trạng thái mở, không phải Draft; bot đã xác nhận hợp lệ về cấu trúc tại commit ae38b95.
Nguyên tắc ghi trạng thái: Chỉ đánh dấu “Xong” khi có bằng chứng tương ứng trong mã nguồn, test chạy được, kết quả kiểm thử hoặc CI. Nội dung mới được mô tả trong tài liệu được ghi là “Đã đặc tả — chưa xác minh triển khai”. Báo cáo này phản ánh bằng chứng quan sát được trên branch tại ngày cập nhật, không thay thế kết quả chạy test/CI.

## PC-1 — 11/11/2026
### 1.1. Tiến độ theo acceptance criteria
| Mã | Trạng thái | Bằng chứng trên branch | Ghi chú |
| --- | --- | --- | --- |
| B-01 | Đang | artifacts/REQUIREMENTS.md FR-01, FR-02; artifacts/DECISIONS.md ADR-01, ADR-08 | Đã đặc tả việc tích hợp vào luồng học tập và type estimate; chưa có mã nguồn frontend để xác minh tích hợp. |
| B-02 | Đang | artifacts/REQUIREMENTS.md mục 8; artifacts/TEST_PLAN.md mục 4 | Đã đồng bộ danh sách 12 fixture trong REQUIREMENTS.md và TEST_PLAN.md. TEST_REPORT.md ghi nhận CI ở commit starter be5da68... có test 12 fixture PASS; chưa khẳng định bộ fixture đã được nạp vào ứng dụng. |
| B-03 | Xong (đặc tả) | artifacts/DECISIONS.md ADR-03; artifacts/TEST_PLAN.md mục 3 | Đã quy định L = ceil(0.9 * R), U = floor(1.1 * R), chấp nhận L <= E <= U; có ví dụ phép nhân, phép chia và giá trị biên. Chưa xác minh bằng test tự động. |
| B-04 | Đang | artifacts/REQUIREMENTS.md FR-08; artifacts/DECISIONS.md ADR-02, ADR-05 | Đã đặc tả không trả đáp án/cận chấm điểm trước khi nộp; chưa có bằng chứng kiểm thử JSON API thực tế. |
| B-05 | Đang | artifacts/REQUIREMENTS.md FR-09; artifacts/DECISIONS.md ADR-05, ADR-06 | Đã mô tả lưu hai câu trả lời trong attempts.answers_json; chưa xác minh triển khai, truy xuất sau refresh hoặc cách ly dữ liệu người dùng. |
| B-06 | Đang | artifacts/REQUIREMENTS.md FR-06, FR-07; artifacts/DECISIONS.md ADR-04; artifacts/TEST_PLAN.md mục 5–6 | Đã đặc tả chấm điểm 50% + 50% và bốn tổ hợp đúng/sai; chưa có mã chấm điểm/feedback được xác minh. |
| B-07 | Đang | artifacts/REQUIREMENTS.md mục 4.2; artifacts/DECISIONS.md ADR-09 | Đã xác định phạm vi không sửa xác thực/session và route ngoài phạm vi; cần đối chiếu diff mã nguồn khi có phần triển khai. |
| B-08 | Đang | artifacts/TEST_PLAN.md mục 6–8 | Đã lập test case TC-01 đến TC-24; chưa có bằng chứng các test này đã được tự động hóa và chạy. |
| B-09 | Chưa | Chưa có bằng chứng npm test trong các file của thư mục nộp bài | Cần bổ sung script test và xác minh chạy được từ checkout sạch. |
| B-10 | Chưa | Chưa có workflow CI/test được xác minh trong thư mục nộp bài | Cần workflow chạy cài đặt phụ thuộc và npm test trên Pull Request, kèm kết quả xanh. |
| B-11 | Đang | artifacts/REQUIREMENTS.md mục 4.2, NFR và mục 9 | Đã nêu yêu cầu dùng dữ liệu tổng hợp và không đưa secret/PII; chưa có checklist rà soát và bằng chứng kiểm tra toàn bộ nội dung nộp. |
| B-12 | Đang | artifacts/REQUIREMENTS.md NFR-06; artifacts/TEST_PLAN.md mục 7 | Đã nêu yêu cầu nhãn, thông báo lỗi, bàn phím và không chỉ dùng màu sắc; chưa có kiểm thử accessibility trên giao diện thực tế. |
### 1.2. Sửa đổi bắt buộc từ Checkpoint 1
| Yêu cầu | Trạng thái | Bằng chứng / việc còn lại |
| --- | --- | --- |
| DEC-03: công thức xác định L, U cho phép nhân/chia | Xong về đặc tả | artifacts/DECISIONS.md ADR-03 và artifacts/TEST_PLAN.md mục 3; công thức và hai ví dụ số đã được ghi rõ. |
| Bổ sung 12 fixture tổng hợp | Đang | Đã đồng bộ hai bảng theo bộ chuẩn tại REQUIREMENTS.md mục 8. CI của starter ghi nhận test 12 fixture PASS; cần giữ đường dẫn fixture thực tế nhất quán với mã nguồn. |
| Bổ sung dữ liệu cụ thể cho TC-05 đến TC-13 | Xong về đặc tả | artifacts/TEST_PLAN.md mục 6.2–6.4 có E, A, khoảng hợp lệ và kết quả mong đợi. |
| Làm rõ chấm điểm khi chỉ đúng một thành phần; ảnh hưởng progress/sao | Xong về đặc tả | artifacts/DECISIONS.md ADR-04, ADR-07; artifacts/REQUIREMENTS.md FR-06, FR-10; artifacts/TEST_PLAN.md mục 5. |
### 1.3. Timeline và đối chiếu tiến độ
| Công việc | Mốc kế hoạch | Trạng thái tại 17/11/2026 | Bằng chứng / ghi chú |
| --- | --- | --- | --- |
| Hoàn thiện luồng estimate trên giao diện | 15/11/2026 | Chưa xác minh | Branch nộp bài hiện chưa có file mã nguồn frontend thay đổi. |
| Triển khai API chấm điểm, lưu câu trả lời và cập nhật tiến độ | 15/11/2026 | Chưa xác minh | Chưa có file mã nguồn backend trong danh sách thay đổi của thư mục nộp bài. |
| Đồng bộ 12 fixture và bổ sung test tự động | 17/11/2026 | Chưa hoàn thành theo bằng chứng hiện có | Hai bảng fixture đang không thống nhất; chưa thấy fixture JSON hoặc test tự động. |
| CI, bảo mật và accessibility | 18/11/2026 | Chưa xác minh | Chưa có bằng chứng workflow xanh, checklist bảo mật hoặc kết quả accessibility. |
| Hoàn thiện báo cáo và tài liệu bàn giao | 19/11/2026 | Đang | Đã có REQUIREMENTS, DECISIONS, TEST_PLAN; các deliverable còn lại được liệt kê tại mục 2.3. |
| PR nộp bài và validate cấu trúc | Trước 11:30 ngày 18/11/2026 | Đã mở PR #37; bot xác nhận bài hợp lệ về cấu trúc | PR đang mở, chưa merge; chờ giảng viên/TA review nội dung. |
| Chốt tag RC và PR nộp cuối | Trước 23:59 ngày 19/11/2026 | Chưa thực hiện | Tag dự kiến: bkt-2026-33-rc1; cần cập nhật SHA và kết quả CI sau khi tạo tag. |
### 1.4. Rủi ro / vấn đề đang vướng
Thiếu bằng chứng triển khai: So sánh branch với main cho thấy các thay đổi trong thư mục nhóm hiện tập trung ở tài liệu; chưa có thay đổi mã nguồn frontend/backend để chứng minh tính năng đã chạy.
Fixture: Danh sách 12 fixture trong REQUIREMENTS.md và TEST_PLAN.md đã được đồng bộ trong lần cập nhật 17/11/2026. CI ở starter commit be5da68... ghi nhận kiểm thử fixture PASS.
Test/CI: TEST_REPORT.md ghi nhận npm ci và npm test thành công, 5 passed/0 failed tại starter commit be5da68...; kết quả này không thay thế kiểm thử tích hợp đầy đủ.
Deliverable: Đã có TEST_REPORT.md, SECURITY_PRIVACY_CHECKLIST.md, AI_USE.md, CONTRIBUTIONS.md và README trong thư mục nộp bài. Slide/demo hoàn chỉnh chưa được xác minh.
Metadata: submission.json và source-ref.json hiện nằm ở thư mục gốc submissions/hoang_mai_toan_33/; đã có mã nhóm, mã bài, MSSV và tham chiếu starter/commit/CI.
Bản sao trong thư mục bài nộp được giữ đồng bộ với file tiến độ tại thư mục gốc repository: `progress/PROGRESS.md`.
### 1.5. Câu hỏi cần xác nhận với giảng viên
Q1: Với câu hỏi estimate, correct_count chỉ tăng khi cả ước lượng và kết quả chính xác đều đúng, còn score_percent vẫn cộng điểm thành phần 50% + 50% — cách hiểu này có đúng với quy ước thống kê của bài không?
Q2: 12 fixture phải được nạp vào dữ liệu câu hỏi của ứng dụng hay có thể được quản lý trong bộ test tự động, miễn là có cấu trúc và tái lập được?
### 1.6. Phân công theo vai trò
| Alias / vai trò | Đầu việc | Commit / bằng chứng |
| --- | --- | --- |
| Lead | Điều phối, theo dõi acceptance criteria, tích hợp và chuẩn bị PR/tag | Chưa gắn alias và commit cụ thể |
| BE | API estimate, xác thực đầu vào, chấm điểm, lưu attempts/progress | Chưa có commit mã nguồn được xác minh |
| FE | Giao diện hai ô nhập, gửi câu trả lời và hiển thị feedback | Chưa có commit mã nguồn được xác minh |
| QA | Đồng bộ fixture, test tự động, kiểm thử biên/hồi quy, CI và bảo mật | Có kế hoạch tại artifacts/TEST_PLAN.md; chưa có kết quả chạy |
| DOCS | REQUIREMENTS, DECISIONS, TEST_PLAN và tài liệu bàn giao | artifacts/REQUIREMENTS.md, artifacts/DECISIONS.md, artifacts/TEST_PLAN.md |
Bảng trên giữ alias theo vai trò để tránh tự gán người hoặc commit khi chưa có dữ liệu xác minh. Nhóm cần thay bằng alias thực tế và commit tương ứng trước khi nộp bản cuối.

## PC-2 — 18/11/2026
Phần này được chuẩn bị theo checklist PC-2. Vì ngày cập nhật báo cáo là 17/11/2026, các mục chưa có bằng chứng được giữ trạng thái “Chưa xác minh/Chưa có”, không ghi nhận trước kết quả của ngày 18/11.

### 2.1. Đối chiếu timeline PC-1
| Công việc | Kế hoạch | Thực tế xác minh được đến 17/11 | Lệch / lý do |
| --- | --- | --- | --- |
| Luồng câu hỏi estimate | 15/11/2026 | Chưa có bằng chứng mã nguồn | Cần bổ sung và chạy thử trên hệ thống. |
| API chấm điểm và lưu dữ liệu | 15/11/2026 | Chưa có bằng chứng mã nguồn | Cần triển khai nhánh estimate và kiểm thử API. |
| Fixture và test tự động | 17/11/2026 | Hai bảng fixture trong REQUIREMENTS/TEST_PLAN đã đồng bộ; TEST_REPORT ghi nhận CI starter có test 12 fixture PASS | Cần tiếp tục đối chiếu dữ liệu fixture của mã nguồn starter với bộ chuẩn tài liệu khi chốt bản cuối. |
| CI, bảo mật và accessibility | 18/11/2026 | Chưa có bằng chứng | Cần hoàn thiện trước hạn PC-2. |
| Tài liệu bàn giao | 19/11/2026 | Có 3 tài liệu đặc tả/kế hoạch | Còn thiếu các deliverable tại mục 2.3. |
| Tag RC và PR nộp cuối | Trước 23:59 ngày 19/11/2026 | Chưa thực hiện | Phụ thuộc hoàn tất triển khai, kiểm thử và validate. |
### 2.2. Tiến độ theo acceptance criteria — cập nhật toàn bộ B-01 đến B-12
| Mã | Trạng thái tại 17/11 | Bằng chứng | Việc cần hoàn tất để chuyển Xong |
| --- | --- | --- | --- |
| B-01 | Đang | REQUIREMENTS FR-01/02; DECISIONS ADR-01/08 | Tích hợp và xác minh luồng estimate trong ứng dụng hiện có. |
| B-02 | Đang | REQUIREMENTS mục 8; TEST_PLAN mục 4 | Đồng bộ 12 fixture, lưu file dữ liệu và chứng minh test nạp được. |
| B-03 | Xong về đặc tả | DECISIONS ADR-03; TEST_PLAN mục 3 | Bổ sung test tự động xác minh công thức và biên. |
| B-04 | Đang | REQUIREMENTS FR-08; DECISIONS ADR-05 | Kiểm thử response API, bảo đảm không lộ đáp án/cận. |
| B-05 | Đang | REQUIREMENTS FR-09; DECISIONS ADR-06 | Chạy kiểm thử lưu/truy xuất attempts và progress. |
| B-06 | Đang | REQUIREMENTS FR-06/07; DECISIONS ADR-04 | Triển khai chấm điểm server và feedback hai thành phần. |
| B-07 | Đang | REQUIREMENTS mục 4.2; DECISIONS ADR-09 | Đối chiếu diff cuối để xác nhận không sửa phần bị cấm. |
| B-08 | Đang | TEST_PLAN mục 6–8 | Chuyển test case thành test tự động và có kết quả chạy. |
| B-09 | Chưa | Chưa có bằng chứng | Bổ sung npm test, chạy thành công từ checkout sạch. |
| B-10 | Chưa | Chưa có bằng chứng CI | Bổ sung workflow và có CI xanh trên PR. |
| B-11 | Đang | REQUIREMENTS NFR và mục 9 | Hoàn thành checklist, rà soát PII/secret trên toàn bộ nội dung nộp. |
| B-12 | Đang | REQUIREMENTS NFR-06; TEST_PLAN mục 7 | Kiểm tra bàn phím, label, thông báo lỗi và trạng thái không phụ thuộc màu sắc. |
### 2.3. Checklist deliverable PC-2
| Deliverable | Trạng thái | Đường dẫn / bằng chứng |
| --- | --- | --- |
| README.md | Có | submissions/hoang_mai_toan_33/README.md; cần rà soát nội dung hướng dẫn cuối cùng |
| REQUIREMENTS.md | Có | artifacts/REQUIREMENTS.md |
| DECISIONS.md / ADR | Có | artifacts/DECISIONS.md |
| Test tự động và CI | Có bằng chứng CI của starter | TEST_REPORT.md: 5 passed, 0 failed tại commit be5da68...; phạm vi test có giới hạn như mục 4 của báo cáo |
| TEST_REPORT.md | Có | artifacts/TEST_REPORT.md |
| SECURITY_PRIVACY_CHECKLIST.md | Có | artifacts/SECURITY_PRIVACY_CHECKLIST.md; nội dung checklist không đồng nghĩa đã có kiểm thử bảo mật động |
| AI_USE.md | Có | artifacts/AI_USE.md |
| CONTRIBUTIONS.md | Có | artifacts/CONTRIBUTIONS.md; cần bảo đảm phân công/commit phản ánh đúng đóng góp thực tế |
| Slide / demo script không quá 7 phút | Chưa có bằng chứng hoàn chỉnh | Thư mục slide/ hiện chưa có slide/demo hoàn chỉnh |
| PR vào ktpmud-project, validate cấu trúc | Đã có PR #37 và bot báo hợp lệ | PR #37 đang mở, chưa merge; chờ review nội dung của giảng viên/TA |
| submission.json và source-ref.json | Đã có ở thư mục gốc nhóm | Đã ghi case study BKT-2, group 33, hai MSSV và tham chiếu starter/commit/CI |
### 2.4. Việc còn lại và người phụ trách
| Việc cần làm | Vai trò phụ trách | Hạn |
| --- | --- | --- |
| Đối chiếu bộ fixture trong mã nguồn starter với bộ chuẩn đã đồng bộ trong REQUIREMENTS/TEST_PLAN | QA / DOCS | 18/11/2026 |
| Hoàn thiện giao diện estimate và API chấm điểm/lưu kết quả | FE / BE | Ưu tiên ngay, trước PC-2 |
| Viết và chạy test tự động cho công thức, scoring, API, lưu dữ liệu và hồi quy | QA / BE | Trước 11:30 ngày 18/11/2026 |
| Bổ sung workflow CI, kiểm tra bảo mật và accessibility | BE / QA / FE | 18/11/2026 |
| Bổ sung README, TEST_REPORT, SECURITY_PRIVACY_CHECKLIST, AI_USE, CONTRIBUTIONS và demo | DOCS / toàn nhóm | 19/11/2026 |
| Hoàn thiện metadata, source reference, tag RC và PR cuối | Lead | Trước 23:59 ngày 19/11/2026 |
### 2.5. Rủi ro / câu hỏi PC-2
Rủi ro lớn nhất là tài liệu đặc tả đã có nhưng chưa có bằng chứng triển khai, test tự động và CI. Không chuyển các tiêu chí này sang “Xong” chỉ dựa trên nội dung tài liệu.
Danh sách fixture trong hai tài liệu đã được đồng bộ; tiếp tục bảo đảm mã nguồn/test sử dụng đúng cùng bộ dữ liệu.
Cần xác nhận mẫu và vị trí chính xác của submission.json, source-ref.json theo hướng dẫn Track B của giảng viên.
Cần cập nhật alias và commit thực tế vào bảng phân công; không để vai trò chung thay cho bằng chứng đóng góp ở bản cuối.
## Kết quả cuối — Freeze 19/11/2026
Phần này phải được cập nhật sau khi nhóm thực sự hoàn tất Freeze; không điền trước kết quả chưa xảy ra.

Tag: bkt-2026-33-rc1
Commit SHA của tag: Chưa tạo / chưa xác minh
PR nộp bài: PR #37 đang mở tại fossbk-spec/ktpmud-project, nhánh submit/hoang_mai_toan-N33; bot đã xác nhận hợp lệ về cấu trúc, chưa có kết luận review nội dung.
Trạng thái cuối B-01 đến B-12: Cập nhật sau khi có mã nguồn, test và CI làm bằng chứng
Deliverable còn thiếu: Đối chiếu lại mục 2.3 sau khi hoàn thiện
Việc chưa hoàn thành và lý do: Cập nhật trung thực tại thời điểm Freeze
