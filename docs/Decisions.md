# DECISIONS.md

Các quyết định thiết kế của nhóm cho Track B. Căn cứ: `docs/architecture-reference.md` (mục 3, 4, 7).

## ADR-001: Thêm loại câu hỏi mới `estimate`, giữ nguyên 4 loại cũ

Vấn đề: hiện tại server chấm bằng so sánh chuỗi chính xác (`given === correct_answer` sau khi trim và viết thường). Không có cách nào biểu diễn "đúng nếu nằm trong một khoảng".

Các cách đã cân nhắc:
- A. Thêm loại mới `estimate` với nhánh chấm riêng.
- B. Sửa loại `input` để nhận cả khoảng.
- C. Thêm cột mới vào bảng `questions` để lưu khoảng.

Chọn A.

Vì sao: tài liệu chuẩn (mục 7) nói chỉ thêm, không đổi hành vi 4 loại cũ. B sẽ làm đổi cách chấm của các bộ câu hỏi đang có. C phải sửa schema trong `server/db.js` và seed, trong khi khoảng chấp nhận hoàn toàn tính được từ đáp án đúng nên không cần lưu thêm.

Đánh đổi: phải thêm nhánh `estimate` trong `server/api.js` và trong `exercise.js`. Nhánh cũ giữ nguyên và có test hồi quy (T-17).

## ADR-002: Khoảng chấp nhận là ±20% quanh đáp án đúng

Vấn đề: đề không khóa ngưỡng sai số, nên nhóm phải tự định nghĩa và giải thích được. Quy tắc cần đủ đơn giản để nói trong một câu với học sinh lớp 3.

Các cách đã cân nhắc:
- A. Ước lượng đúng nếu nằm trong khoảng từ 80% đến 120% đáp án đúng.
- B. Chỉ chấp nhận đúng kết quả khi làm tròn chục (ví dụ `38 × 6` thì chỉ nhận `40 × 6 = 240`).
- C. Học sinh nhập một khoảng ("200 đến 250"), server kiểm tra khoảng đó có chứa đáp án và không quá rộng.

Chọn A. Với đáp án đúng là `n`, tính bằng số nguyên:
- thấp nhất `lo = ⌊(4n + 4) / 5⌋`
- cao nhất `hi = ⌊6n / 5⌋`

Ước lượng hợp lý khi `lo ≤ ước lượng ≤ hi`. Dùng số nguyên để tránh sai số làm tròn của số thực.

Vì sao: B quá hẹp, nhiều cách ước lượng hợp lý khác (làm tròn lên, chọn số tròn dễ nhân) sẽ bị chấm sai. C cần thêm quy tắc "khoảng rộng tối đa" và giao diện hai ô nhập, phức tạp hơn nhiều mà không thêm giá trị sư phạm rõ ràng. A dễ test ở bốn điểm biên (`lo−1`, `lo`, `hi`, `hi+1`).

Kiểm chứng: nhóm đã chạy thử công thức trên 12 câu dự kiến (bảng trong `TEST_PLAN.md`). Tất cả đáp án là số nguyên, ước lượng ví dụ đều nằm trong khoảng, sai số từ 1,4% đến 7,1%.

Đánh đổi: với đáp án rất nhỏ khoảng sẽ hẹp, nên các câu hỏi chọn đáp án đủ lớn (từ 49 trở lên). Hằng số 20% đặt ở một chỗ trong code để dễ đổi. Khoảng này tính ở server từ `correct_answer`, không lưu thêm và không trả về trước khi nộp.

## ADR-003: Một câu có hai đáp án, lưu hai khóa trong `answers`

Vấn đề: `POST /api/submissions` nhận `answers` là một object `{ idCâuHỏi: chuỗi }`, mỗi câu một giá trị. Dạng bài mới cần hai giá trị cho mỗi câu.

Các cách đã cân nhắc:
- A. Giữ nguyên hình dạng `answers`: `answers["est-1"]` là kết quả đúng, `answers["est-1__est"]` là ước lượng.
- B. Gộp hai giá trị vào một chuỗi, ví dụ `"240|228"`.
- C. Đổi `answers` thành object lồng nhau.

Chọn A.

Vì sao: không đổi hình dạng dữ liệu mà client cũ đang dùng, mọi giá trị vẫn là chuỗi, và không phải viết bộ tách chuỗi dễ lỗi như B. `answers_json` trong bảng `attempts` tự lưu cả hai giá trị nên không cần sửa schema.

Đánh đổi: tên khóa `__est` là quy ước của nhóm, phải ghi rõ trong README để người sau không nhầm.

## ADR-004: Một câu tính đúng khi cả ước lượng và kết quả đều đúng

Trạng thái: đề xuất, cả nhóm xác nhận trước khi bắt đầu code.

Vấn đề: cần quyết định khi nào câu `estimate` được tính đúng, để `correct_count` và `score_percent` có nghĩa giống các loại câu khác.

Các cách đã cân nhắc:
- A. Câu đúng khi cả ước lượng hợp lý và kết quả đúng.
- B. Chỉ tính kết quả đúng; ước lượng chỉ để hiển thị phản hồi.
- C. Chia đôi điểm: nửa cho ước lượng, nửa cho kết quả đúng.

Chọn A.

Vì sao: mục tiêu của dạng bài là ước lượng trước khi tính, nên ước lượng phải ảnh hưởng đến điểm. Nếu theo B thì ước lượng chỉ là phần trang trí. C đòi chia điểm ra nửa và xử lý số lẻ, thêm chỗ dễ sai.

Đánh đổi: học sinh ước lượng tốt nhưng tính sai vẫn bị tính sai cả câu. Phản hồi hiển thị riêng 4 trường hợp (R5) để học sinh biết mình sai ở bước nào.