# Vườn Toán Lớp 3 — Track B

- **Nhóm:** Nhóm 10
- **Track:** B — Vườn Toán
- **Case study:** `hoang_mai_toan`
- **Mục tiêu Track B:** Bổ sung dạng bài “Ước lượng kết quả trước khi tính đúng” cho các phép nhân/chia.
- **Mã nguồn:** [vie-nv23/ktpmud-bkt-vuontoan-starter](https://github.com/vie-nv23/ktpmud-bkt-vuontoan-starter)

## Tổng quan sản phẩm

Vườn Toán Lớp 3 là ứng dụng web học Toán gồm các khu vực bài học, luyện tập, kiểm tra, trò chơi, bảng xếp hạng và chức năng dành cho giáo viên. Repository mã nguồn mô tả backend Node.js/Express, cơ sở dữ liệu SQLite, đăng nhập và lưu kết quả học tập.

Phạm vi Track B của nhóm là bổ sung dạng câu hỏi ước lượng cho phép nhân/chia, với quy tắc chấm theo khoảng được mô tả trong `artifacts/REQUIREMENTS.md` và `artifacts/DECISIONS.md`.

## Cài đặt và chạy mã nguồn

Thực hiện trong repository mã nguồn (không phải thư mục hồ sơ nộp bài):

```bash
npm install
npm start
```

Sau đó mở `http://localhost:3000`.

Yêu cầu môi trường: Node.js 18 trở lên. Hướng dẫn và lưu ý đầy đủ xem trong README của repository mã nguồn.

## Kiểm thử

Kế hoạch kiểm thử nằm tại `artifacts/TEST_PLAN.md`.

**Lưu ý:** `TEST_REPORT.md` chỉ ghi nhận kết quả đã có bằng chứng. Không coi kế hoạch kiểm thử là kết quả kiểm thử; các mục chưa chạy/xác minh được ghi rõ là chưa xác minh.

## Hồ sơ

- `artifacts/`: tài liệu yêu cầu, quyết định thiết kế, kế hoạch/báo cáo kiểm thử và checklist.
- `slides/`: đặt slide và tài liệu demo của nhóm tại đây.
- `source-ref.json`: tham chiếu repository starter, fork, commit, tag và CI.
- `submission.json`: thông tin case study và nhóm.

Trước khi nộp, nhóm phải thay các giá trị chờ trong `source-ref.json`, điền mã sinh viên vào `submission.json`, bổ sung slide/demo thực tế và kiểm tra toàn bộ đường dẫn.
