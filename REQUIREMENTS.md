# Track B — Ước lượng trước khi tính đúng

## 1. Mục tiêu
Mở rộng Vườn Toán Lớp 3 bằng một dạng bài mới:
học sinh ước lượng kết quả phép nhân/chia trước
khi tính kết quả chính xác.

## 2. Phạm vi
- Tích hợp vào luồng học hiện có.
- Sử dụng phép nhân/chia thuộc starter.
- Có tối thiểu 12 câu hỏi synthetic.
- Server chấm và lưu kết quả.
- Không tiết lộ đáp án trước khi nộp.
- Phân biệt ước lượng hợp lý và kết quả đúng.
- Có test tự động, npm test và CI.
- Giao diện hỗ trợ bàn phím.

## 3. Ngoài phạm vi
- Không viết lại hệ thống.
- Không sửa authentication/session.
- Không sửa tài khoản mẫu hoặc deployment.
- Không dùng dữ liệu học sinh thật.
- Không dùng LLM sinh đáp án runtime.
- Không bổ sung chương trình SGK mới.

## 4. Tiêu chí nghiệm thu
Tuân thủ B-01 đến B-12 của đề thi.

## 5. Căn cứ
Starter: fossbk-spec/ktpmud-bkt-vuontoan-starter
Tag: bkt-2026-v1
Đặc tả: docs/architecture-reference.md
## 6. Kế hoạch kiểm thử ban đầu

### 6.1. Kiểm thử chức năng
- Học sinh truy cập dạng bài mới từ luồng học hiện có.
- Học sinh phải ước lượng trước khi tính chính xác.
- Hệ thống phản hồi riêng cho hai bước.
- Kết quả được lưu sau khi nộp bài.
- Tải lại trang không làm mất tiến độ đã lưu.

### 6.2. Kiểm thử dữ liệu và chấm điểm
- Normal: ước lượng hợp lý, kết quả chính xác đúng.
- Boundary: giá trị nằm đúng biên khoảng hợp lệ.
- Invalid: bỏ trống, nhập chữ, nhập dữ liệu sai định dạng.
- Scoring: tính điểm đúng theo quy tắc đã công bố.
- Security: API không trả đáp án trước khi nộp.

### 6.3. Kiểm thử hồi quy
- Bốn dạng câu hỏi cũ tiếp tục hoạt động.
- Không thay đổi authentication và session.
- Không ảnh hưởng cơ chế lưu điểm và cộng sao.

### 6.4. Kiểm thử tự động
- Bổ sung npm test.
- CI chạy npm ci và npm test trên Pull Request.
- Sử dụng tối thiểu 12 fixture synthetic.
