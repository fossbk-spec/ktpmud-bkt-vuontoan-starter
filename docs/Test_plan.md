# TEST_PLAN.md

Kế hoạch test cho Track B, bản nháp cho Checkpoint 1.

Công cụ: `node:test` có sẵn trong Node 18 trở lên, không cài thêm thư viện. Lệnh: `npm test` chạy `node --test`. Phần logic chấm sẽ tách thành một module riêng (dự kiến `server/estimate.js`) để test trực tiếp, không cần chạy server.

## 1. Quy tắc được test

- Đáp án đúng `n` là số nguyên.
- Khoảng chấp nhận: `lo = ⌊(4n + 4) / 5⌋`, `hi = ⌊6n / 5⌋` (ADR-002).
- Đầu vào hợp lệ: khớp `^\d{1,6}$` sau khi bỏ khoảng trắng đầu cuối (R6).
- Câu tính đúng khi ước lượng nằm trong `[lo, hi]` và kết quả đúng bằng `n` (ADR-004).

## 2. 12 câu hỏi dự kiến

Nhóm đã chạy thử để kiểm tra mọi đáp án là số nguyên và ước lượng ví dụ nằm trong khoảng. Cột ước lượng ví dụ chỉ để kiểm tra, không phải quy tắc chấm.

| # | Phép tính | Đáp án đúng | Khoảng chấp nhận | Ước lượng ví dụ | Sai số |
|---|---|---|---|---|---|
| 1 | 38 × 6 | 228 | 183 – 273 | 240 | 5,3% |
| 2 | 47 × 5 | 235 | 188 – 282 | 250 | 6,4% |
| 3 | 62 × 4 | 248 | 199 – 297 | 240 | 3,2% |
| 4 | 19 × 7 | 133 | 107 – 159 | 140 | 5,3% |
| 5 | 53 × 3 | 159 | 128 – 190 | 150 | 5,7% |
| 6 | 28 × 4 | 112 | 90 – 134 | 120 | 7,1% |
| 7 | 71 × 6 | 426 | 341 – 511 | 420 | 1,4% |
| 8 | 84 × 5 | 420 | 336 – 504 | 400 | 4,8% |
| 9 | 245 : 5 | 49 | 40 – 58 | 50 | 2,0% |
| 10 | 312 : 6 | 52 | 42 – 62 | 50 (300 : 6) | 3,8% |
| 11 | 427 : 7 | 61 | 49 – 73 | 60 (420 : 7) | 1,6% |
| 12 | 568 : 8 | 71 | 57 – 85 | 70 (560 : 8) | 1,4% |

Với phép chia, nếu làm tròn số bị chia lên chục (312 thành 310) thì chia cho 6, 7, 8 không ra số nguyên. Học sinh lớp 3 thường chọn số tròn dễ chia hơn (300 : 6), nên bảng dùng cách đó. Cả hai cách đều nằm trong khoảng.

Cần đối chiếu lại độ lớn của các số này với `data/seed.json` thật (xem mục 5 của `REQUIREMENTS.md`).

## 3. Test đơn vị cho hàm chấm

Trường hợp bình thường:

| ID | Nội dung | Kỳ vọng |
|---|---|---|
| T-01 | n = 228 | khoảng 183 – 273 |
| T-02 | Ước lượng 240, kết quả 228 | cả hai đúng, câu tính đúng |
| T-03 | Chạy cả 12 câu với ước lượng ví dụ ở mục 2 | cả 12 ước lượng hợp lý |
| T-04 | Chạy cùng input hai lần | cùng kết quả |

Trường hợp biên:

| ID | Nội dung | Kỳ vọng |
|---|---|---|
| T-05 | Ước lượng đúng `lo` (183 với n = 228) | hợp lý |
| T-06 | Ước lượng `lo − 1` (182) | chưa hợp lý |
| T-07 | Ước lượng đúng `hi` (273) | hợp lý |
| T-08 | Ước lượng `hi + 1` (274) | chưa hợp lý |
| T-09 | n nhỏ nhất (49) và lớn nhất (426) trong bộ câu hỏi | `lo`, `hi` đúng công thức |

Đầu vào không hợp lệ:

| ID | Nội dung | Kỳ vọng |
|---|---|---|
| T-10 | Rỗng, `null`, `undefined` | không hợp lệ, không ném lỗi |
| T-11 | `"abc"`, `"-5"`, `"12.5"`, `"1e3"`, `"12 3"` | không hợp lệ |
| T-12 | `"0000000"` (7 chữ số), chuỗi rất dài | không hợp lệ |

Phản hồi và điểm:

| ID | Nội dung | Kỳ vọng |
|---|---|---|
| T-13 | Ước lượng hợp lý, kết quả đúng | trường hợp 1 |
| T-14 | Ước lượng hợp lý, kết quả sai | trường hợp 2 |
| T-15 | Ước lượng chưa hợp lý, kết quả đúng | trường hợp 3 |
| T-16 | Cả hai sai | trường hợp 4 |
| T-17 | Câu `input`, `compare`, `paint`, `multiple-choice` cũ | chấm đúng như trước |
| T-18 | Điểm câu `estimate` theo ADR-004 | `correct_count`, `score_percent` đúng |

Dữ liệu:

| ID | Nội dung | Kỳ vọng |
|---|---|---|
| T-20 | Seed có ít nhất 12 câu `estimate`, id không trùng, đáp án nguyên, phép tính khớp với `prompt` | đạt |

## 4. Test qua API

Cần đăng nhập bằng tài khoản synthetic có sẵn và không sửa phần auth. Nếu khó tự động hóa, nhóm sẽ kiểm tra tay bằng checklist và ghi vào `TEST_REPORT.md` như một giới hạn.

| ID | Nội dung | Kỳ vọng |
|---|---|---|
| T-30 | Từ danh sách bài học mở bộ câu hỏi mới | thấy các câu `estimate` |
| T-31 | Gọi `GET /api/question-sets/:setId/questions` | không có đáp án đúng, không có khoảng chấp nhận |
| T-32 | Nộp bài, rồi tải lại trang hoặc gọi `GET /api/me/progress` | kết quả vẫn còn |

## 5. Kiểm tra giao diện (làm tay)

| ID | Nội dung |
|---|---|
| T-33 | Làm trọn một lượt chỉ bằng bàn phím: Tab giữa các ô, Enter để chốt ước lượng, Enter để nộp. Nhập sai thì có thông báo dễ hiểu. |

## 6. Kiểm tra quy trình

| ID | Nội dung | Cách làm |
|---|---|---|
| T-40 | Không sửa `server/auth.js` và các route auth/teacher/admin | `git diff` so với tag `bkt-2026-v1` |
| T-41 | `npm test` đạt sau `npm ci` | chạy trên bản clone mới |
| T-42 | CI chạy `npm ci` và `npm test` trên Pull Request | xem workflow xanh |
| T-43 | Không có secret hay thông tin thật | tìm `.env`, token, tên thật trong repo |

## 7. Giới hạn đã biết

Sẽ ghi vào `TEST_REPORT.md` về sau:

- Test API phụ thuộc cách đăng nhập tài khoản mẫu, có thể phải kiểm tra tay.
- Thứ tự "ước lượng trước, tính sau" do giao diện đảm bảo. Server không tự chứng minh được thứ tự thời gian, nhưng API không bao giờ trả đáp án trước khi nộp.
- Test giao diện làm tay, không tự động.