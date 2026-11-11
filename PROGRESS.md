# PROGRESS — 28 — Track B

- Starter: ktpmud-bkt-vuontoan-starter · tag bkt-2026-v1
- Fork: <URL fork>

## PC-1 — 11/11/2026

### 1.1. Tiến độ theo acceptance criteria
<!-- Track B: B-01…B-12 theo bảng truy vết trong REQUIREMENTS.md Mục 6. Đối chiếu lại với đề thi Mục 7.3 / 8.3. -->
Tình trạng chung: xong giai đoạn M1 (yêu cầu, ADR, kế hoạch test); giai đoạn M2 (Build) mới bắt đầu, chưa có mã nguồn cho tính năng.

| Mã | Trạng thái (Chưa / Đang / Xong) | Bằng chứng (commit / CI / file) | Ghi chú |
|---|---|---|---|
| B-01 | Chưa | REQUIREMENTS.md FR-7, AC-7; TEST_PLAN.md T-INT-01 | Đã thiết kế; chưa chọn bài học đích khi rà `data/seed.json`; chưa code |
| B-02 | Chưa | REQUIREMENTS.md FR-8, Phụ lục A (12 fixture); T-FIX-01, T-FIX-02 | Đã tính sẵn 12 fixture; chưa đưa vào `data/seed.json` |
| B-03 | Chưa | DECISIONS.md ADR-002, ADR-003; T-UNIT-01…08 | Quy tắc ±20% đã chốt trên giấy; chưa có hàm `computeEstimateBand` |
| B-04 | Chưa | REQUIREMENTS.md FR-4, AC-3; T-API-01, T-API-02 | Cần xác nhận route lấy câu hỏi loại `correct_answer` theo danh sách cột hay sau `SELECT *` |
| B-05 | Chưa | DECISIONS.md ADR-001, ADR-004; T-API-03…05, T-INT-02 | Đã mô tả hệ quả làm mới trang và bỏ trống câu ước lượng; chưa code |
| B-06 | Chưa | DECISIONS.md ADR-005; T-UNIT-09, T-UI-01 | Cần xác nhận cấu trúc `detail` của `POST /api/submissions` |
| B-07 | Chưa | REQUIREMENTS.md NFR-2; T-SEC-01 | Chưa sửa mã nên chưa chạm vùng cấm; sẽ kiểm bằng `git diff --stat` với tag `bkt-2026-v1` |
| B-08 | Chưa | REQUIREMENTS.md FR-9, AC-6; T-UNIT-05…07, T-API-06 | Đã liệt kê đầu vào sai cần xử lý; chưa code |
| B-09 | Chưa | TEST_PLAN.md Mục 1, 2 | Chưa có script `npm test` |
| B-10 | Chưa | TEST_PLAN.md Mục 3 | Chưa có `.github/workflows/ci.yml` |
| B-11 | Chưa | REQUIREMENTS.md NFR-3; T-SEC-02 | Chỉ dùng dữ liệu synthetic; sẽ quét secret/PII ở M3 |
| B-12 | Chưa | REQUIREMENTS.md NFR-4, AC-8; T-UI-02, T-UI-03 | Chưa làm giao diện |

### 1.2. Sửa đổi bắt buộc từ Checkpoint 1
| Mục | Trạng thái | Bằng chứng |
|---|---|---|
| ❗ ADR-004: bổ sung hệ quả với B-05 (làm mới giữa bước 1 và bước 2) và cách chấm khi bỏ trống câu ước lượng nhưng vẫn nộp câu chính xác | Xong | DECISIONS.md ADR-004; ca kiểm thử mới T-API-07, T-UI-04 trong TEST_PLAN.md |
| Nhỏ: README trỏ sai đường dẫn `artifacts/…` | Xong | README.md Mục 6 |

### 1.3. Timeline dự kiến đến khi hoàn thành
| Việc | Vai trò phụ trách | Mốc (CP2 15/11 · M3 · Freeze 19/11 · M4 20/11) | Ngày dự kiến |
|---|---|---|---|
| Đọc mã nguồn, xác nhận 5 điểm ở REQUIREMENTS.md Mục 7, chuyển ADR từ Đề xuất sang Chấp nhận | <vai trò> | CP2 | 12/11 |
| Hàm thuần `computeEstimateBand`, `parseBand`, `isReasonableEstimate`, `classifyFeedback` + unit test | <vai trò> | CP2 | 13/11 |
| Nhánh chấm `estimate` trong `server/api.js`, thêm trường vào `detail`, che đáp án | <vai trò> | CP2 | 14/11 |
| 12 fixture trong `data/seed.json`, gắn vào bài học đích, kiểm tra `reset-db` | <vai trò> | CP2 | 14/11 |
| Giao diện hai bước trong `exercise.js` (bàn phím, `aria-live`) | <vai trò> | CP2 | 15/11 |
| Test API/tích hợp, hồi quy 4 type cũ | <vai trò> | M3 | 16–17/11 |
| `npm test`, workflow CI trên Node 18 và 20 | <vai trò> | M3 | 17/11 |
| Rà bảo mật/quyền riêng tư, `TEST_REPORT.md`, `SECURITY_PRIVACY_CHECKLIST.md`, `AI_USE.md`, `CONTRIBUTIONS.md` | <vai trò> | M3 | 18/11 |
| Slide/demo ≤ 7 phút, đóng băng, gắn tag | <vai trò> | Freeze 19/11 · M4 20/11 | 19–20/11 |

### 1.4. Rủi ro / đang vướng
- Chưa đọc mã nguồn thật; 5 điểm cần xác nhận ở REQUIREMENTS.md Mục 7 có thể làm đổi thiết kế (đặc biệt cấu trúc `detail` và cách tính điểm khi một bộ trộn nhiều type).
- Thứ tự "ước lượng trước" chỉ do giao diện bảo đảm (ADR-004); sẽ ghi rõ giới hạn này trong `TEST_REPORT.md`.
- Thời gian build ngắn (09–15/11) nên ưu tiên vertical slice trước, hoàn thiện sau.
- Chưa biết test tích hợp đăng nhập bằng tài khoản synthetic mà không sửa `auth.js` có khả thi theo cách đã dự kiến không.

### 1.5. Câu hỏi cho GV
- Không có câu hỏi mới ở PC-1.

### 1.6. Phân công (alias hoặc vai trò, KHÔNG ghi họ tên/MSSV)
| Alias / vai trò | Đầu việc chính | Commit/PR tiêu biểu |
|---|---|---|
| <alias/vai trò 1> | | |
| <alias/vai trò 2> | | |
| <alias/vai trò 3> | | |

## PC-2 — 18/11/2026

### 2.1. Đối chiếu timeline PC-1
| Việc (theo bảng 1.3) | Kế hoạch | Thực tế | Lệch & lý do |
|---|---|---|---|

### 2.2. Tiến độ theo acceptance criteria (cập nhật toàn bộ bảng 1.1)
| Mã | Trạng thái | Bằng chứng | Ghi chú |
|---|---|---|---|

### 2.3. Sẵn sàng nộp bài (đề thi Mục 6)
| Deliverable | Có / Chưa | Đường dẫn |
|---|---|---|
| README.md (cài đặt / chạy / test) | | |
| REQUIREMENTS.md | | |
| DECISIONS.md / ADR | | |
| Test tự động + CI xanh | | |
| TEST_REPORT.md | | |
| SECURITY_PRIVACY_CHECKLIST.md | | |
| AI_USE.md | | |
| CONTRIBUTIONS.md | | |
| Slide / demo script ≤ 7 phút | | |
| Draft PR vào `ktpmud-project`, check `validate` xanh | | |

### 2.4. Việc còn lại đến Freeze (23:59 19/11)
| Việc | Vai trò phụ trách | Hạn |
|---|---|---|

### 2.5. Rủi ro / câu hỏi cho GV
- 

## Kết quả cuối — Freeze 19/11/2026
- Tag: bkt-2026-28-rc1 · SHA: 
- Trạng thái cuối từng mã AC: (cập nhật bảng 2.2 hoặc ghi "như 2.2 trừ: …")
- Những việc trong timeline chưa hoàn thành và lý do:
