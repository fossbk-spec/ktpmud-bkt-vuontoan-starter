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