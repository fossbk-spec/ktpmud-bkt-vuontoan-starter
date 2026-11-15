# PROGRESS — 01 — Track B

- Starter: `ktpmud-bkt-vuontoan-starter`
- Fork: `https://github.com/vie-nv23/ktpmud-bkt-vuontoan-starter`

## PC-1 — 11/11/2026

### 1.1. Tiến độ theo acceptance criteria

| Mã | Trạng thái (Chưa / Đang / Xong) | Bằng chứng (commit / CI / file) | Ghi chú |
|---|---|---|---|
| B-01 | Đang | `REQUIREMENTS.md` §1–2; `DECISIONS.md` ADR 2 | Đã xác định dạng bài mới và hướng tích hợp vào giao diện luyện tập; chưa có bằng chứng UI đã triển khai. |
| B-02 | Đang | `REQUIREMENTS.md` §2, §4 | Đã yêu cầu tối thiểu 12 fixture/câu hỏi synthetic; chưa xác minh có đủ fixture trong `data/seed.json`. |
| B-03 | Đang | `REQUIREMENTS.md` §3; `DECISIONS.md` ADR 1 | Đã đặc tả cách lưu khoảng `min-max` và quy tắc chấm `min <= input <= max`; cần triển khai và kiểm thử. |
| B-04 | Đang | `REQUIREMENTS.md` §2; README §3 | API lấy câu hỏi hiện được mô tả là không kèm đáp án. Cần kiểm tra lại API sau khi bổ sung dạng `estimate` và xác minh không lộ đáp án trước khi nộp. |
| B-05 | Chưa | `REQUIREMENTS.md` §2; README §3 | Yêu cầu server chấm, lưu kết quả và giữ trạng thái khi refresh; chưa có bằng chứng triển khai riêng cho luồng ước lượng. |
| B-06 | Chưa | `REQUIREMENTS.md` §2; `DECISIONS.md` ADR 2 | Đã có hướng thiết kế input cho câu hỏi ước lượng; chưa có bằng chứng feedback phân biệt ước lượng hợp lý và kết quả chính xác. |
| B-07 | Đang | `REQUIREMENTS.md` §2; `DECISIONS.md` ADR 1–2 | Đã ghi nhận yêu cầu không sửa `server/auth.js`, session và tài khoản mẫu; cần đối chiếu Git diff khi triển khai. |
| B-08 | Đang | `REQUIREMENTS.md` §4 | Đã liệt kê các trường hợp test normal, boundary, invalid và regression; chưa có bằng chứng test tự động đã chạy. |
| B-09 | Chưa | `package.json` | Hiện có `start`, `dev`, `reset-db`, `build:css`; chưa thấy script `npm test`. |
| B-10 | Chưa | Repository root; `.github/workflows/` | Chưa thấy workflow CI trong danh sách file hiện tại; cần bổ sung CI chạy `npm ci` và `npm test` trên Pull Request. |
| B-11 | Đang | README §Giới thiệu; `.gitignore`; `data/seed.json` | README mô tả đây là snapshot đã thay dữ liệu thật bằng dữ liệu hư cấu. Cần rà soát các thay đổi mới để bảo đảm không đưa PII/secret vào repo. |
| B-12 | Chưa | `REQUIREMENTS.md` §2, §4; `DECISIONS.md` ADR 2 | Đã nêu yêu cầu giao diện dùng được bằng bàn phím; chưa có bằng chứng kiểm thử accessibility cho giao diện mới. |

### 1.2. Sửa đổi bắt buộc từ Checkpoint 1

| Mục | Trạng thái | Bằng chứng |
|---|---|---|
| #1 — Bổ sung kiểu câu hỏi `estimate` và quy tắc chấm theo khoảng | Đang | `REQUIREMENTS.md` §3; `DECISIONS.md` ADR 1. Đã có thiết kế, chưa xác minh implementation. |
| #2 — Tích hợp giao diện nhập ước lượng vào luồng luyện tập | Đang | `DECISIONS.md` ADR 2. Đã mô tả hàm `renderEstimateQuestion(question)`, chưa có bằng chứng UI chạy. |
| #3 — Bổ sung fixture synthetic và kiểm tra dữ liệu seed | Chưa | `REQUIREMENTS.md` §2, §4. Yêu cầu tối thiểu 12 câu; cần kiểm tra và bổ sung dữ liệu. |
| #4 — Bổ sung test tự động và CI | Chưa | `REQUIREMENTS.md` §2, §4; `package.json`. Chưa thấy `npm test` và workflow CI. |

### 1.3. Timeline dự kiến đến khi hoàn thành

| Việc | Vai trò phụ trách | Mốc (CP2 15/11 · M3 · Freeze 19/11 · M4 20/11) | Ngày dự kiến |
|---|---|---|---|
| Chốt, review yêu cầu/ADR/test plan; hoàn thiện PROGRESS PC-1 | BA / BE | M2 | 11/11 |
| Bổ sung fixture, xử lý seed và logic chấm khoảng ở API | BE | CP2 15/11 | 15/11 |
| Triển khai UI nhập ước lượng và feedback hai phần | FE | CP2 15/11 | 15/11 |
| Viết test tự động, regression và bổ sung CI | BE / FE | M3 | 17/11 |
| Review code, security/privacy, accessibility và chuẩn bị Draft PR | BA / BE / FE | M3, PC-2 | 18/11 |
| Chốt release candidate và SHA | BA / BE / FE | Freeze 19/11 | 19/11 |
| Hoàn thiện hồ sơ và nộp bài theo hướng dẫn giảng viên | BA / BE / FE | M4 20/11 | 20/11 |

### 1.4. Rủi ro / đang vướng

- Tài liệu đã mô tả hướng triển khai nhưng chưa có bằng chứng tính năng Track B đã chạy thực tế.
- Cần bảo đảm logic chấm khoảng chỉ áp dụng cho `type = 'estimate'`, không làm thay đổi cách chấm các dạng câu hỏi cũ.
- Cần kiểm tra dữ liệu seed và database hiện có để tránh thiếu hoặc nhân đôi fixture khi khởi tạo lại.
- API không được trả `correct_answer` hoặc khoảng đáp án trước khi học sinh nộp bài.
- Cần kiểm thử đầu vào rỗng, chữ/ký tự đặc biệt, số thập phân, giá trị ngoài khoảng và hai giá trị đúng tại biên.
- Chưa có bằng chứng về `npm test` và CI; không đánh dấu hoàn thành trước khi có kết quả chạy thực tế.

### 1.5. Câu hỏi cho GV

- Q1: 12 fixture synthetic có cần phân bổ cố định thành 6 câu phép nhân và 6 câu phép chia không?
- Q2: Quy tắc xác định khoảng ước lượng `min-max` có cần theo một công thức cụ thể do giảng viên quy định không?
- Q3: Khi học sinh tải lại trang giữa quá trình làm bài, yêu cầu giữ trạng thái đến mức nào (câu hiện tại, câu đã trả lời, hay toàn bộ lượt làm)?

### 1.6. Phân công (alias hoặc vai trò, KHÔNG ghi họ tên/MSSV)

| Alias / vai trò | Đầu việc chính | Commit/PR tiêu biểu |
|---|---|---|
| BA | Phân tích yêu cầu, quyết định thiết kế, review đặc tả và theo dõi acceptance criteria | `REQUIREMENTS.md`, `DECISIONS.md`, `progress/PROGRESS.md` |
| BE | SQLite, fixture, API, logic chấm khoảng, validation, automated tests và CI | `server/`, `data/seed.json`, `package.json`, `.github/workflows/` |
| FE | Tích hợp luồng giao diện, nhập ước lượng, feedback và accessibility | `public/assets/js/pages/exercise.js` |

## PC-2 — 18/11/2026

### 2.1. Đối chiếu timeline PC-1

| Việc (theo bảng 1.3) | Kế hoạch | Thực tế | Lệch & lý do |
|---|---|---|---|
| Chốt yêu cầu/ADR/test plan và PROGRESS PC-1 | 11/11 | Chưa cập nhật | Cập nhật khi hoàn thành. |
| Fixture, seed và logic chấm khoảng | 15/11 | Chưa cập nhật | Cập nhật commit và kết quả kiểm thử thực tế. |
| UI nhập ước lượng và feedback | 15/11 | Chưa cập nhật | Cập nhật commit và kết quả kiểm thử thực tế. |
| Test tự động, regression và CI | 17/11 | Chưa cập nhật | Cập nhật link CI và kết quả chạy. |
| Review code, security/privacy, accessibility | 18/11 | Chưa cập nhật | Ghi rõ các lỗi còn tồn tại và cách xử lý. |
| Chốt release candidate và SHA | 19/11 | Chưa cập nhật | Điền SHA của commit thực tế. |

### 2.2. Tiến độ theo acceptance criteria (cập nhật toàn bộ bảng 1.1)

| Mã | Trạng thái | Bằng chứng | Ghi chú |
|---|---|---|---|
| B-01 | Chưa cập nhật |  |  |
| B-02 | Chưa cập nhật |  |  |
| B-03 | Chưa cập nhật |  |  |
| B-04 | Chưa cập nhật |  |  |
| B-05 | Chưa cập nhật |  |  |
| B-06 | Chưa cập nhật |  |  |
| B-07 | Chưa cập nhật |  |  |
| B-08 | Chưa cập nhật |  |  |
| B-09 | Chưa cập nhật |  |  |
| B-10 | Chưa cập nhật |  |  |
| B-11 | Chưa cập nhật |  |  |
| B-12 | Chưa cập nhật |  |  |

### 2.3. Sẵn sàng nộp bài (đề thi Mục 6)

| Deliverable | Có / Chưa | Đường dẫn |
|---|---|---|
| `README.md` (cài đặt / chạy / test) | Có sẵn, cần cập nhật hướng dẫn test | `README.md` |
| `REQUIREMENTS.md` | Có | `REQUIREMENTS.md` |
| `DECISIONS.md` / ADR | Có | `DECISIONS.md` |
| Test tự động + CI xanh | Chưa xác minh |  |
| `TEST_REPORT.md` | Chưa thấy |  |
| `SECURITY_PRIVACY_CHECKLIST.md` | Chưa thấy |  |
| `AI_USE.md` | Chưa thấy |  |
| `CONTRIBUTIONS.md` | Chưa thấy |  |
| Slide / demo script ≤ 7 phút | Chưa xác minh |  |
| Draft PR vào `ktpmud-project`, check `validate` xanh | Chưa xác minh |  |

### 2.4. Việc còn lại đến Freeze (23:59 19/11)

| Việc | Vai trò phụ trách | Hạn |
|---|---|---|
| Hoàn thành các acceptance criteria còn thiếu và cập nhật bằng chứng | BA / BE / FE | 18/11 |
| Chạy test hồi quy, kiểm tra accessibility và rà soát secret/PII | BE / FE | 18/11 |
| Hoàn thiện tài liệu, báo cáo test và hồ sơ nộp | BA | 19/11 |
| Chốt commit SHA và kiểm tra trạng thái CI cuối | BA / BE | 19/11 |

### 2.5. Rủi ro / câu hỏi cho GV

- Cập nhật các lỗi còn tồn tại sau khi chạy test và ghi kèm commit xử lý.
- Nếu CI chưa xanh, ghi rõ nguyên nhân và kế hoạch khắc phục trước Freeze.
- Xác nhận các deliverable bắt buộc theo hướng dẫn nộp bài mới nhất của giảng viên.

## Kết quả cuối — Freeze 19/11/2026

- Tag: `bkt-2026-<01>-rc1` · SHA: Chưa cập nhật.
- Trạng thái cuối từng mã AC: Cập nhật bảng 2.2 sau khi hoàn tất kiểm thử.
- Những việc trong timeline chưa hoàn thành và lý do: Cập nhật tại thời điểm Freeze.
