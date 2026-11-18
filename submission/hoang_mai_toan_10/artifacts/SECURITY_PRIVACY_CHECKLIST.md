# SECURITY_PRIVACY_CHECKLIST — Track B — Nhóm 10

**Trạng thái:** Checklist khởi tạo; cần hoàn tất rà soát trên fork và trước Freeze.

| Hạng mục | Trạng thái hiện tại | Việc cần làm/bằng chứng |
|---|---|---|
| Không commit `.env`, token, password hoặc secret | Chưa xác minh trên fork | Rà soát `git status`, `git diff` và toàn bộ file được đưa vào PR |
| Không đưa PII/dữ liệu học sinh thật vào fixture | Theo README starter, dữ liệu công khai đã được thay bằng dữ liệu hư cấu; thay đổi mới chưa xác minh | Kiểm tra seed/fixture và file mới |
| API không trả đáp án trước khi nộp | README starter mô tả API câu hỏi không kèm đáp án; thay đổi Track B chưa xác minh | Kiểm tra response thực tế của endpoint |
| Endpoint yêu cầu xác thực được bảo vệ | Có cơ chế xác thực trong mã nguồn starter; cấu hình môi trường triển khai chưa xác minh | Kiểm tra các endpoint liên quan và cấu hình |
| Không sửa file cấm: `server/auth.js`, session, tài khoản mẫu | Chưa xác minh bằng Git diff với starter tag | Chạy `git diff <starter-tag>...HEAD` và rà soát |
| Dependency vulnerabilities | Chưa có kết quả audit trong gói hồ sơ | Chạy `npm audit`, ghi nhận mức độ và phương án xử lý |
| Dữ liệu SQLite/secret không được đưa vào PR | `.gitignore` của starter có quy tắc loại trừ; trạng thái fork chưa xác minh | Kiểm tra danh sách file staged và diff PR |

## Kết luận

Không đánh dấu checklist là hoàn tất cho đến khi nhóm kiểm tra repository thực tế, ghi bằng chứng và cập nhật trạng thái từng dòng.
