# PROGRESS — 173820_N32 — Track B[cite: 4]

- Starter: `fossbk-spec/ktpmud-bkt-vuontoan-starter` · tag `bkt-2026-v1`[cite: 2]
- Fork: `https://github.com/thangduongworkemail-bot/ktpmud-bkt-vuontoan-starter.git`

---

## PC-1 — 11/11/2026

### 1.1. Tiến độ theo acceptance criteria
| Mã | Trạng thái (Chưa / Đang / Xong) | Bằng chứng (commit / CI / file) | Ghi chú |
|---|---|---|---|
| B-01 | Đang | `REQUIREMENTS.md` (R1)[cite: 4] | Đã xác định gắn vào bài học sẵn có (`bai-10`)[cite: 2]; chuẩn bị nối luồng luyện tập bình thường[cite: 4]. |
| B-02 | Đang | `TEST_PLAN.md` (Mục 2)[cite: 3]; `data/seed.json`[cite: 1, 3] | Đã có danh sách 12 câu synthetic[cite: 3]; đang đưa vào `seed.json` và kiểm tra nạp DB[cite: 1, 4]. |
| B-03 | Đang | `DECISIONS.md` (ADR-002)[cite: 5]; `TEST_PLAN.md` (T-01 đến T-12)[cite: 3] | Công thức khoảng $\pm 20\%$ số nguyên đã được duyệt scope[cite: 5, 6]; chuẩn bị bổ sung lý giải cho trường hợp học sinh nhập luôn đáp án đúng[cite: 6]. |
| B-04 | Đang | `TEST_PLAN.md` (T-31)[cite: 3]; `REQUIREMENTS.md` (R8)[cite: 4] | Đảm bảo API `GET /api/question-sets/:setId/questions` không để lộ đáp án hay khoảng chấp nhận[cite: 2, 4]. |
| B-05 | Đang | `REQUIREMENTS.md` (R7)[cite: 4]; `DECISIONS.md`[cite: 5] | Đang xử lý trường hợp refresh trang giữa bước 1 và bước 2 theo yêu cầu bắt buộc (mục ❗)[cite: 6]. |
| B-06 | Đang | `DECISIONS.md` (ADR-004)[cite: 5]; `TEST_PLAN.md` (T-13 đến T-16)[cite: 3] | Logic phân loại 4 trạng thái phản hồi ở server đã sẵn sàng cài đặt[cite: 4, 5]. |
| B-07 | Đang | `architecture-reference.md`[cite: 2]; `REQUIREMENTS.md` (B-07)[cite: 4] | Giữ nguyên tuyệt đối `server/auth.js`, các route auth/teacher/admin[cite: 2, 4]; theo dõi qua `git diff`[cite: 3, 4]. |
| B-08 | Đang | `TEST_PLAN.md` (T-01 đến T-18)[cite: 3] | Đang code bộ unit test độc lập cho module `server/estimate.js`[cite: 3]. |
| B-09 | Đang | `package.json`; `TEST_PLAN.md` (Mục 1)[cite: 3] | Cấu hình lệnh `npm test` với test runner gốc `node:test` trên Node 18+[cite: 3]. |
| B-10 | Đang | `.github/workflows/test.yml`[cite: 4] | Đang thiết lập workflow chạy `npm ci` và `npm test` tự động trên Pull Request[cite: 3, 4]. |
| B-11 | Đang | Toàn bộ repo | Không lưu `.env`, token, dữ liệu thật; tuân thủ nộp qua PR `ktpmud-project` theo erratum #25[cite: 1, 4, 6]. |
| B-12 | Chưa | `public/assets/js/pages/exercise.js`[cite: 2]; `TEST_PLAN.md` (T-33)[cite: 3] | Giao diện điều hướng bàn phím (Tab/Enter) và thông báo lỗi nhập liệu[cite: 3, 4]. |

### 1.2. Sửa đổi bắt buộc từ Checkpoint 1
| Mục | Trạng thái | Bằng chứng |
|---|---|---|
| ❗ **R3 & B-05: Đảm bảo thứ tự "Ước lượng trước" và xử lý refresh giữa bước 1 và bước 2**<br>- Vấn đề: Nếu gửi cả ước lượng (`est-1__est`) và kết quả trong 1 lần `POST /api/submissions`, thứ tự chốt chỉ do client kiểm soát và dễ bị bypass qua API trực tiếp; nếu người dùng refresh giữa 2 bước sẽ mất trạng thái[cite: 5, 6].<br>- Giải pháp nhóm chọn: **Phương án (a) - Chấp nhận giới hạn kiến trúc này và giải trình trong `DECISIONS.md`** kèm cơ chế client lưu trạng thái tạm thời vào `sessionStorage` để giải quyết vấn đề refresh (B-05)[cite: 4, 6]. Giải trình rõ lý do: Giữ đúng nguyên tắc REST không lưu session dở dang vào DB, không sửa đổi schema SQLite sẵn có (`architecture-reference.md`)[cite: 2], và phù hợp với mô hình làm bài trắc nghiệm nộp một lần của hệ thống hiện tại[cite: 2]. (Hạn sửa: 23:59 15/11/2026)[cite: 6]. | Đang xử lý | Cập nhật `DECISIONS.md` (bổ sung ADR-005: Xử lý thứ tự ước lượng & lưu phiên tạm client); cập nhật R3, R7 trong `REQUIREMENTS.md`[cite: 4, 5]. |

### 1.3. Timeline dự kiến đến khi hoàn thành
| Việc | Vai trò phụ trách | Mốc (CP2 15/11 · M3 · Freeze 19/11 · M4 20/11)[cite: 6] | Ngày dự kiến |
|---|---|---|---|
| Cập nhật `DECISIONS.md` (ADR-005 về thứ tự 2 bước & xử lý refresh; bổ sung lập luận bảo vệ cho khoảng $\pm 20\%$)[cite: 5, 6] | Tech Lead / System Architect | CP2 15/11[cite: 6] | 12/11/2026 |
| Đóng gói logic chấm và validate vào `server/estimate.js`, hoàn thành suite test T-01 đến T-18 bằng `node:test`[cite: 3] | Backend / Logic Dev | CP2 15/11[cite: 6] | 13/11/2026 |
| Thêm 12 câu hỏi `estimate` vào `data/seed.json` gắn vào `bai-10`, kiểm tra `npm run reset-db`[cite: 2, 3] | Backend / Data Dev | CP2 15/11[cite: 6] | 13/11/2026 |
| Cập nhật API `POST /api/submissions` hỗ trợ chấm type `estimate` và trả về 4 trạng thái phản hồi[cite: 2, 4, 5] | Backend Dev | CP2 15/11[cite: 6] | 14/11/2026 |
| Xây dựng UI 2 bước trong `exercise.js` hỗ trợ Tab/Enter và khôi phục trạng thái từ `sessionStorage` khi reload[cite: 2, 4] | Frontend Dev | CP2 15/11[cite: 6] | 14/11/2026 |
| Thiết lập GitHub Actions workflow chạy `npm ci` và `npm test` tự động khi tạo PR[cite: 3, 4] | DevOps / QA | CP2 15/11[cite: 6] | 15/11/2026 |
| Kiểm tra toàn bộ mã sửa đổi bắt buộc (mục ❗) trên fork trước hạn chót Checkpoint 2[cite: 6] | Cả nhóm | CP2 15/11 (23:59)[cite: 6] | 15/11/2026 |
| Kiểm thử tích hợp toàn diện (T-20 đến T-43), kiểm tra hồi quy 4 type cũ[cite: 3] | QA Lead | M3 | 16/11/2026 |
| Hoàn thiện bộ hồ sơ bàn giao: `TEST_REPORT.md`, `SECURITY_PRIVACY_CHECKLIST.md`, `AI_USE.md`, `CONTRIBUTIONS.md` | Tech Lead / Documentation | M3 | 17/11/2026 |
| Mở Draft PR vào `ktpmud-project` (tuân thủ erratum `fossbk-spec/ktpmud-project#25`)[cite: 6] | Cả nhóm | M3 | 18/11/2026 |
| Kiểm tra `git diff` sạch so với tag `bkt-2026-v1`, đóng băng code, gắn tag `bkt-2026-173820_N32-rc1`[cite: 2, 4] | Tech Lead | Freeze 19/11 (23:59) | 19/11/2026 |
| Hoàn thiện slide thuyết trình và kịch bản demo tính năng $\le 7$ phút | Cả nhóm | M4 20/11 | 20/11/2026 |

### 1.4. Rủi ro / đang vướng & Giải pháp kỹ thuật
1. **Thứ tự 2 bước và xử lý reload trang (Mục ❗ từ GV)[cite: 6]:**
   - *Quyết định:* Chọn phương án (a) (chấp nhận giới hạn và giải trình)[cite: 6]. Do ứng dụng không áp dụng stateful session trên DB cho từng câu hỏi dở dang[cite: 2], việc ép server lưu từng bước ước lượng sẽ phá vỡ cấu trúc schema đơn giản hiện tại và tăng độ phức tạp không cần thiết[cite: 2, 5].
   - *Xử lý reload (B-05)[cite: 4, 6]:* Dùng `sessionStorage` tại trình duyệt để ghi nhớ giá trị ước lượng đã chốt. Nếu học sinh F5 khi đang ở bước 2, giao diện tự động khôi phục trạng thái đã chốt ô ước lượng và mở sẵn ô tính đúng, không bắt học sinh nhập lại từ đầu.

2. **Giải đáp 3 điểm "Điều chưa chắc" sau khi đọc mã nguồn:**
   - *Độ lớn số trong seed:* Các bài học cũ tập trung vào bảng nhân/chia nhỏ[cite: 2, 4]. Việc đưa các phép tính 2-3 chữ số (kết quả 49 đến 426) vào bộ bài tập mới là hoàn toàn phù hợp khung phân phối chương trình môn Toán lớp 3 kì 1 và không phải thêm lý thuyết SGK mới[cite: 3, 4].
   - *Kiểm tra danh sách `type`:* Cột `type` trong bảng `questions` là `TEXT NOT NULL` thuần túy, không có ENUM hay check constraint ở tầng DB SQLite (`server/db.js`)[cite: 2]. Việc bổ sung type `estimate` chỉ cần thêm nhánh xử lý tương ứng ở `server/api.js` và `exercise.js`[cite: 2, 5].
   - *Gắn vào `lessonId` nào:* Nhóm quyết định gắn bộ đề `phieu-uoc-luong` vào `lessonId: "bai-10"` ("Bảng nhân 6 & Bảng chia 6") vốn đã có sẵn trong `seed.json` và mở khóa từ đầu, giúp kiểm thử luồng học tự nhiên theo B-01[cite: 2, 4].

### 1.5. Câu hỏi cho GV
- Nhóm đã thống nhất chọn phương án (a) cho mục ❗ (giải trình giới hạn trong ADR và dùng `sessionStorage` để giữ trạng thái khi refresh trang tránh sửa đổi schema DB)[cite: 2, 6]. Nhóm xin ghi nhận định hướng này để hoàn thiện tài liệu nộp cho Checkpoint 2[cite: 6].

### 1.6. Phân công (alias hoặc vai trò, KHÔNG ghi họ tên/MSSV)
| Alias / vai trò | Đầu việc chính | Commit/PR tiêu biểu |
|---|---|---|
| `dev-backend` | Cài đặt logic module `server/estimate.js`; cấu hình nhánh chấm `estimate` tại `server/api.js`; nạp 12 câu hỏi vào `data/seed.json`[cite: 2, 3, 5] | `feat(api): add estimate calculation module and submission handler` |
| `dev-frontend` | Dựng giao diện 2 bước trong `exercise.js`; quản lý lưu/khôi phục trạng thái bước ước lượng qua `sessionStorage`; hỗ trợ phím Tab/Enter[cite: 2, 3, 4] | `feat(ui): implement two-step estimation with reload resilience` |
| `dev-qa-devops` | Viết bộ unit test `test/estimate.test.js`; thiết lập GitHub Actions workflow; rà soát kênh nộp PR theo erratum #25[cite: 3, 4, 6] | `ci: add automated node:test workflow on pull requests` |

---
