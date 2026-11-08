# DECISIONS — Track B

## D-01. Lựa chọn đề tài
Nhóm 3 sinh viên chọn Track B — Vườn Toán Lớp 3,
mở rộng dạng bài "Ước lượng trước khi tính đúng".

## D-02. Phạm vi chức năng
Học sinh thực hiện hai bước:
1. Đưa ra ước lượng hoặc khoảng hợp lý.
2. Tính kết quả chính xác.

Hệ thống phản hồi riêng cho hai bước.

## D-03. Tích hợp hệ thống
Phát triển trên starter tag bkt-2026-v1,
tích hợp vào luồng học hiện có.
Tận dụng Node.js, Express, SQLite và
JavaScript/HTML/CSS.

## D-04. Dữ liệu
Sử dụng tối thiểu 12 fixture synthetic
có thể tái lập. Không dùng dữ liệu thật.

## D-05. Chấm điểm và lưu trữ
Server xác định đúng/sai, tính điểm và
lưu kết quả. API không tiết lộ đáp án
trước khi nộp.

Quy tắc ước lượng chi tiết sẽ được
thiết kế và kiểm thử sau Checkpoint 1.

## D-06. Kiểm thử
Bổ sung npm test, kiểm thử normal,
boundary, invalid input, scoring và
CI trên Pull Request.

## D-07. Giới hạn thay đổi
Không sửa server/auth.js, session,
tài khoản mẫu hoặc deployment.
Không viết lại hệ thống.
Không bổ sung nội dung SGK mới.
Không dùng LLM làm nguồn đáp án runtime.

## D-08. Trạng thái
Checkpoint 1: đề xuất phạm vi để TA duyệt.
Chưa chốt thiết kế kỹ thuật chi tiết.

## Tài liệu tham chiếu
- Đề thi chính thức: Mục 8.
- Starter: bkt-2026-v1.
- docs/architecture-reference.md.