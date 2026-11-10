# ADR-002: Quy tắc chấm ước lượng bằng sai số tương đối 20%

- **Trạng thái:** Accepted (quyết định nội bộ nhóm; chờ GV/TA phản hồi)
- **Ngày:** 08/11/2026 · **Cập nhật:** 11/11/2026
- **Dự án:** Vườn Toán Lớp 3 — Track B
- **Liên quan:** B-02, B-03, B-05, B-06, B-08, B-12
- **Phụ thuộc:** ADR-001

## 1. Bối cảnh

Dạng bài “Ước lượng trước khi tính đúng” yêu cầu học sinh trả lời hai phần:

1. Ước lượng kết quả của phép nhân hoặc phép chia.
2. Tính kết quả chính xác.

Hệ thống phải đánh giá được tính hợp lý của ước lượng theo một quy tắc rõ ràng, tất định, dễ kiểm thử và không phụ thuộc vào AI.

## 2. Các phương án được xem xét

### A. Sai số tuyệt đối cố định

Chấp nhận ước lượng khi độ lệch so với kết quả chính xác không vượt quá một giá trị cố định.

**Ưu điểm:** Đơn giản, dễ cài đặt.

**Nhược điểm:** Cùng một độ lệch có ý nghĩa khác nhau đối với kết quả nhỏ và kết quả lớn.

### B. Sai số tương đối

Chấp nhận ước lượng khi sai số tương đối không vượt quá một tỷ lệ phần trăm cố định.

**Ưu điểm:**
- Ngưỡng thay đổi theo độ lớn kết quả.
- Công thức rõ ràng và dễ kiểm thử.
- Không cần khai báo khoảng chấp nhận riêng cho từng câu hỏi.

**Nhược điểm:**
- Với kết quả nhỏ, khoảng chấp nhận khá hẹp.
- Cần giới hạn miền dữ liệu để tránh trường hợp kết quả bằng 0.
- Ngưỡng phần trăm là lựa chọn thiết kế, không tự chứng minh tính phù hợp về sư phạm.

### C. Khoảng ước lượng riêng cho từng câu hỏi

Mỗi câu hỏi lưu khoảng giá trị được chấp nhận.

**Ưu điểm:** Linh hoạt theo từng phép tính và phương pháp ước lượng.

**Nhược điểm:** Tăng công sức thiết kế dữ liệu và kiểm tra tính nhất quán giữa các câu hỏi.

## 3. Quyết định đề xuất

Chọn **phương án B — Sai số tương đối 20%**.

Quy tắc này được nhóm đề xuất để triển khai thử nghiệm và kiểm thử. Đây không phải ngưỡng bắt buộc của đề thi.

Gọi:

- `A`: Kết quả chính xác, với `A > 0`.
- `E`: Kết quả ước lượng của học sinh.
- `T = 0.20`: Ngưỡng sai số tương đối.

Ước lượng hợp lý khi:

`abs(E - A) / A <= 0.20`

Tương đương:

`4 * A <= 5 * E && 5 * E <= 6 * A`

Hai đầu mút được tính là hợp lệ. **Không dùng phép nhân `0.8 * A` / `1.2 * A` trong điều kiện chấm**, vì sai số dấu phẩy động có thể loại nhầm giá trị ở biên (`A = 35, E = 28`). Dùng `BigInt` sau khi kiểm tra `Number.isSafeInteger` hoặc một miền giá trị nguyên được giới hạn chặt chẽ.

### Miền dữ liệu

- Câu hỏi sử dụng phép nhân hoặc phép chia phù hợp với kiến thức lớp 3.
- Kết quả chính xác phải là số nguyên dương.
- Phép chia trong bộ dữ liệu mẫu là phép chia hết.
- Học sinh nhập số nguyên không âm cho phần ước lượng.
- Học sinh nhập số nguyên không âm cho phần tính chính xác.
- Dữ liệu rỗng, sai kiểu, số âm, số thập phân hoặc không hữu hạn bị từ chối.
- Không sử dụng giá trị kết quả chính xác bằng 0 để tránh phép chia cho 0 trong công thức sai số.

Các giới hạn trên là quyết định về phạm vi dữ liệu của chức năng mới, không phải giới hạn áp dụng cho bốn loại câu hỏi cũ.

## 4. Quy tắc chấm đúng/sai toàn câu — thay thế quyết định 4/6

Nhóm **bỏ điểm thành phần 4/6** sau nhận xét Checkpoint 1. Một câu chỉ được tính đúng (`1`) khi **cả ước lượng đạt** và **kết quả tính chính xác đúng**; mọi trường hợp còn lại là sai (`0`). Không có điểm một phần.

| Ước lượng | Tính chính xác | Đúng toàn câu | Điểm quy ước |
|---|---|---|---:|
| Đạt | Đúng | Có | 1 |
| Đạt | Sai | Không | 0 |
| Không đạt | Đúng | Không | 0 |
| Không đạt | Sai | Không | 0 |

- `correct_count` = số câu đúng toàn phần; `total_count` = số câu được chấm trong bộ bài (12 câu ở phiếu mới).
- `score_percent = round(100 * correct_count / total_count)` theo quy ước làm tròn của hệ thống hiện tại; ví dụ 9/12 = 75%.
- `completed`, sao thưởng và tiến độ **giữ nguyên quy tắc hiện có**, không tự đặt ngưỡng hoàn thành mới. Cần kiểm thử tương thích với backend hiện tại.
- Phản hồi hai phần (`estimateAccepted`, `exactCorrect`) vẫn được lưu/hiển thị để hỗ trợ học tập nhưng **không** làm tăng `correct_count` khi chỉ đúng một phần.
- Học sinh hết thời gian ước lượng: phần ước lượng không đạt; vẫn có thể làm phần chính xác, nhưng câu không thể được tính đúng toàn phần.

## 5. Xử lý các trường hợp biên

Sử dụng phép tính `20 × 5 = 100` để kiểm tra.

| Giá trị E | Sai số | Kết quả |
|---|---|---|
| 100 | 0% | Đạt |
| 90 | 10% | Đạt |
| 80 | 20% | Đạt |
| 120 | 20% | Đạt |
| 79 | 21% | Không đạt |
| 121 | 21% | Không đạt |
| 0 | 100% | Không đạt |
| -10 | Không áp dụng | Input không hợp lệ |
| `abc` | Không áp dụng | Input không hợp lệ |
| Rỗng | Không áp dụng | Input không hợp lệ |

## 6. Quy tắc xử lý dữ liệu không hợp lệ

Frontend phải thông báo lỗi rõ ràng và không cho chuyển bước khi phần ước lượng chưa hợp lệ.

Backend phải kiểm tra độc lập, không tin tưởng dữ liệu từ frontend.

Dữ liệu không hợp lệ phải bị từ chối theo hợp đồng API được thiết kế, không được âm thầm chuyển thành số 0 hoặc được tính là một câu trả lời bình thường.

## 7. Yêu cầu về tính tất định

- Cùng một câu hỏi và cùng một cặp câu trả lời luôn cho cùng kết quả.
- Không sử dụng AI hoặc dữ liệu ngẫu nhiên trong quá trình chấm.
- Không làm tròn tỷ lệ sai số trước khi so sánh với ngưỡng.
- Để tránh sai số số thực ở biên, backend có thể kiểm tra bằng phép so sánh số nguyên tương đương:

`4 * A <= 5 * E && 5 * E <= 6 * A`

Công thức này tương đương ngưỡng 20% khi `A > 0`. Để tránh tràn số, dùng `BigInt(A)` và `BigInt(E)` sau kiểm tra kiểu và miền giá trị. Ví dụ `A=35, E=28` phải đạt ở biên dưới.

## 8. Phản hồi cho học sinh

Phản hồi cần phân biệt:

- Ước lượng hợp lý hoặc chưa hợp lý.
- Kết quả tính chính xác đúng hoặc sai.
- Kết quả đúng/sai **toàn câu** (0 hoặc 1), không có điểm thành phần.

Thông báo cần dễ hiểu, không chỉ dựa vào màu sắc và không sử dụng ngôn ngữ gây áp lực cho học sinh.

## 9. Hệ quả và đánh đổi

**Tích cực:**
- Thuật toán đơn giản, tất định, dễ kiểm thử.
- Không cần lưu khoảng chấp nhận riêng cho từng câu hỏi.
- Có thể kiểm thử biên bằng số nguyên.

**Hạn chế:**
- Ngưỡng 20% chưa được đánh giá thực nghiệm về tính phù hợp sư phạm.
- Cần lựa chọn câu hỏi mẫu cẩn thận, đặc biệt với kết quả nhỏ.
- Việc chấp nhận ước lượng theo khoảng sai số không chứng minh học sinh đã sử dụng phương pháp ước lượng mong muốn.

## 10. Kế hoạch xác minh

- Unit test công thức 20% và các giá trị biên.
- Unit test bốn tổ hợp đúng/sai toàn câu, `correct_count` và `score_percent`.
- Test biên với A = 25, 35, 72, 76, 100 và cả 12 fixture ở TEST_PLAN.md.
- Test dữ liệu thiếu, sai kiểu và ngoài miền cho phép.
- API test để xác nhận backend chấm độc lập với frontend.
- Integration test để xác nhận kết quả được lưu trong SQLite.
- Regression test để bảo đảm bốn dạng câu hỏi cũ không thay đổi.

## 11. Vấn đề còn mở

- Thiết kế JSON chứa hai phần câu trả lời.
- Cách lưu phản hồi hai phần trong `attempts.answers_json` mà không ảnh hưởng các type cũ.
- Cách lựa chọn câu hỏi mẫu để học sinh thực sự thực hành ước lượng thay vì chỉ tính chính xác.
- Cách ánh xạ điểm 0/1 của `estimate` với `questions.points` hiện có (đề xuất tất cả 12 câu có cùng trọng số; giữ cách tính phần trăm theo số câu đúng).
- Xin GV/TA phản hồi về phương án chấm toàn câu và thời hạn ước lượng; quyết định đã được nhóm thống nhất, chưa phải phê duyệt từ GV.
## 12. Trường hợp E trùng A và giới hạn sư phạm

Nếu `E = A`, sai số bằng 0%, do đó **đạt** theo quy tắc 20%. Đây là kết quả đánh giá **độ gần đúng của con số**, không phải bằng chứng học sinh đã dùng phương pháp ước lượng. Giới hạn thời gian và hai giai đoạn chỉ khuyến khích thao tác ước lượng trước; không chứng minh được quá trình tư duy. Không loại đáp án trùng nhau một cách tùy tiện.

## 13. Nhật ký thay đổi quyết định

- 08/11: Đề xuất 4 điểm ước lượng + 6 điểm tính đúng và so sánh theo tỷ lệ số thực.
- 11/11: Theo góp ý Checkpoint 1, chuyển sang **so sánh số nguyên**, **đúng/sai toàn câu**, thống nhất `correct_count` với `score_percent`; giữ phản hồi riêng từng phần.
