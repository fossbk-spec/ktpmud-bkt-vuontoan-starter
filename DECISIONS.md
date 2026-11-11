# DECISIONS — Các quyết định thiết kế (ADR) — Track B

## Tóm tắt

Nhóm 28 đưa ra 5 quyết định thiết kế: (1) thêm type mới `estimate`, không sửa 4 type cũ; (2) mã hoá dải chấp nhận `"lo-hi"` trong `correct_answer`, không đổi schema; (3) dung sai ±20% tính bằng số nguyên, có số liệu so sánh với ±10%; (4) hai bước ước lượng rồi tính chính xác trong cùng một lượt nộp, thứ tự do giao diện đảm bảo; (5) server phân loại phản hồi theo bốn tổ hợp.

Các ADR dưới đây ở trạng thái **Đề xuất**, sẽ chuyển sang **Chấp nhận** sau khi đối chiếu với mã nguồn thật (xem REQUIREMENTS.md Mục 7).

---

## ADR-001 — Thêm type mới `estimate`, không sửa 4 type hiện có

- **Bối cảnh.** Chấm điểm hiện tại là so sánh chuỗi chính xác (`given === correct_answer` sau `trim` + `toLowerCase`), không có khái niệm khoảng. Tài liệu kiến trúc (Mục 7) yêu cầu không đổi nghĩa 4 type hiện có.
- **Phương án.**
  - A. Thêm `type = 'estimate'` với một nhánh chấm riêng.
  - B. Sửa `input`/`compare` để chấp nhận khoảng.
  - C. Tạo trang và endpoint riêng cho dạng bài mới.
- **Quyết định.** Chọn A.
- **Lý do.** A chỉ thêm một nhánh `if (q.type === 'estimate')`, không đổi hành vi bộ câu hỏi cũ, và vẫn đi qua luồng nộp/lưu hiện có (B-01, B-05). B làm đổi nghĩa type cũ, trái Mục 7. C tạo trang demo rời, trái B-01.
- **Hệ quả.** Phải sửa `server/api.js` và `exercise.js` (đều thuộc vùng được phép); cần test hồi quy cho 4 type cũ (AC-9).

## ADR-002 — Mã hoá dải trong `correct_answer` dạng `"lo-hi"`, không thêm cột

- **Phương án.**
  - A. Lưu chuỗi `"lo-hi"` trong `correct_answer`.
  - B. Thêm cột mới (`estimate_json` hoặc `tolerance`).
  - C. Lưu đáp án chính xác và tính dải lúc chấm.
- **Quyết định.** Chọn A; dải được tính một lần bằng hàm thuần khi tạo fixture, lúc chấm chỉ so sánh số.
- **Lý do.** Không đổi schema nên không cần migration và `reset-db` từ `seed.json` vẫn tái lập được (B-02); cột `correct_answer` là `NOT NULL` vẫn thoả. Quy tắc nằm ở dữ liệu seed nên kiểm chứng được bằng test fixture (B-03). Vì dải nằm trong `correct_answer`, nó được che cùng cơ chế che đáp án của API lấy câu hỏi (B-04), có test xác nhận.
- **Đánh đổi.** Ngữ nghĩa của `correct_answer` phụ thuộc `type`. Giảm nhẹ bằng một bộ phân tích duy nhất `parseBand()` có kiểm tra đầu vào và test riêng. Phương án C đơn giản hơn nhưng đưa quy tắc dung sai vào lúc chạy, khó kiểm chứng từng fixture; phương án B đổi schema nên rủi ro cao hơn lợi ích.

## ADR-003 — Quy tắc chấp nhận: ±20% quanh đáp án chính xác, tính bằng số nguyên

- **Bối cảnh.** Đề không khóa con số dung sai; tài liệu kiến trúc (Mục 7) yêu cầu nhóm tự định nghĩa rõ ràng, tất định và giải trình được.
- **Quyết định.** `lo = ceil(exact × 80 / 100)`, `hi = floor(exact × 120 / 100)`; hằng số `TOLERANCE_PCT = 20`.
- **Lý do và bằng chứng.** Tiêu chí chọn: mọi chiến lược ước lượng tiêu biểu ở lớp 3 (làm tròn chục, số tương thích) phải được chấp nhận. Trên 12 fixture (REQUIREMENTS Phụ lục A), ±20% chấp nhận cả 12 ước lượng tiêu biểu. Với ±10%, ba ước lượng đúng phương pháp bị từ chối:

  | Phép tính | Ước lượng tiêu biểu | Dải ±10% | Kết quả |
  |---|---|---|---|
  | 24 × 8 | 160 | 173–211 | bị từ chối |
  | 175 : 5 | 30 | 32–38 | bị từ chối |
  | 144 : 6 | 20 | 22–26 | bị từ chối |

- **Đánh đổi.** Dải rộng nên ước lượng sát và ước lượng khá lệch cùng được xem là "hợp lý"; phần phân biệt mức độ chính xác được bù bằng bước tính chính xác riêng (ADR-004) và phản hồi bốn tổ hợp (ADR-005). Dùng số nguyên tránh sai số dấu phẩy động ở biên. Đổi ngưỡng chỉ cần sửa một hằng số và sinh lại fixture.
- **Trường hợp đặc biệt: nhập đúng đáp án chính xác vào ô ước lượng.** Giá trị chính xác luôn nằm trong dải (`lo ≤ exact ≤ hi`) nên được xếp "hợp lý". Nhóm chấp nhận điều này: tiêu chí của quy tắc là "ước lượng có nằm trong khoảng hợp lý quanh kết quả thật hay không", và một số đúng hiển nhiên thoả tiêu chí đó. Hệ thống không thể (và không nên) phân biệt học sinh ước lượng nhẩm giỏi với học sinh đã tính trước, vì cả hai đều tạo ra cùng một con số hợp lý. Giới hạn: quy tắc chấm đo **độ gần đúng của con số**, không đo **quy trình** làm tròn. Giảm nhẹ: ở bước 1 học sinh chưa thấy đáp án (B-04) nên muốn nhập số đúng thì phải tự tính trước; phản hồi bốn tổ hợp (ADR-005) và bước tính chính xác riêng vẫn phân biệt được người làm đúng cả hai bước. Hướng mở rộng, chưa làm ở khoá này: ghi chú không trừ điểm khi ước lượng trùng đáp án chính xác ("Đây là kết quả chính xác rồi, thử làm tròn để nhẩm nhanh hơn nhé").

## ADR-004 — Hai bước trong cùng một bộ đề; thứ tự "ước lượng trước" do giao diện đảm bảo

- **Quyết định.** Mỗi mục gồm câu `estimate` (id `est-NN`) và câu `input` (id `est-NN-exact`) sẵn có. Giao diện chỉ mở bước 2 sau khi bước 1 hợp lệ. Cả hai câu được chấm trong **một** lượt `POST /api/submissions`.
- **Lý do.** Không đổi API/DB, không chạm vùng cấm, vẫn đạt B-05 vì server chấm và lưu `attempts`.
- **Giới hạn đã biết.** Server nhận một lượt nộp nên không tự ép được thứ tự; "ước lượng trước" được thực thi ở giao diện, còn việc không lộ đáp án trước khi nộp được bảo đảm ở API (B-04). Sẽ ghi giới hạn này trong `TEST_REPORT.md`.
- **Hệ quả với B-05 (làm mới trang giữa bước 1 và bước 2).** Vì chỉ có một lượt `POST /api/submissions`, bước 1 chưa được gửi lên server nên chưa có bản ghi `attempts` hay cập nhật `progress`. Nếu học sinh làm mới trang giữa hai bước, mục đó quay về bước 1 và phải ước lượng lại. Đây là chủ ý: B-05 chỉ yêu cầu lưu kết quả **đã nộp**, và không lưu nửa chừng thì không phát sinh trạng thái "đã ước lượng nhưng chưa tính" cần phục hồi. Giao diện có thể giữ nháp bước 1 trong `sessionStorage` cho tiện, nhưng đó chỉ là tiện ích phía trình duyệt, không phải nguồn dữ liệu; nếu nháp mất thì hành vi vẫn đúng. Cần xác nhận khi đọc `exercise.js` rằng 4 type cũ cũng mất nháp khi làm mới (để không tạo khác biệt giữa các type). Ca kiểm thử: T-API-07 và T-UI-04 (TEST_PLAN).
- **Chấm khi bỏ trống câu ước lượng nhưng vẫn nộp câu chính xác.** Giao diện không cho điều này xảy ra (bước 2 chỉ mở sau khi bước 1 hợp lệ), nhưng server không được tin giao diện nên phải có quy tắc rõ ràng khi gọi API trực tiếp: câu `estimate` bỏ trống, thiếu khoá hoặc không hợp lệ bị chấm **sai** (theo FR-9, không trả lỗi 5xx, không bỏ qua câu), còn câu `est-NN-exact` vẫn được chấm bình thường, độc lập. Bỏ trống được coi là "ước lượng không hợp lý", nên `classifyFeedback()` rơi vào hàng "không hợp lý / đúng" hoặc "không hợp lý / sai" như các đầu vào sai khác. Điểm của câu `estimate` là 0, điểm của câu chính xác giữ nguyên, nên tổng điểm là điểm một phần. Ngược lại, nếu thiếu cả hai câu của một mục thì cả hai bị chấm sai. Hệ quả: học sinh không thể "né" bước ước lượng mà vẫn đạt điểm tối đa ở mục đó, dù có thể gọi API thẳng. Ca kiểm thử: T-API-07 (TEST_PLAN).
- **Phương án đã cân nhắc.** Endpoint theo từng bước (khoá ước lượng trước rồi mới mở bước 2) ép thứ tự chặt hơn nhưng cần bảng/route mới và tăng nguy cơ chạm vùng cấm; ghi nhận là hướng mở rộng cho khoá sau.

## ADR-005 — Phản hồi bốn tổ hợp do server phân loại

- **Quyết định.** Server phân loại mỗi mục theo (ước lượng trong dải?) × (kết quả chính xác đúng?) và trả mã phân loại; giao diện chỉ hiển thị thông điệp tương ứng:

  | Ước lượng | Chính xác | Ý nghĩa phản hồi |
  |---|---|---|
  | hợp lý | đúng | Làm tốt cả hai bước |
  | hợp lý | sai | Ước lượng tốt, kiểm tra lại phép tính |
  | không hợp lý | đúng | Tính đúng nhưng cần luyện cách ước lượng |
  | không hợp lý | sai | Ôn lại cả hai bước |

- **Lý do.** Giữ logic đúng/sai tất định ở server (NFR-1), dễ kiểm thử bằng hàm thuần `classifyFeedback()` (T-UNIT-09), đáp ứng B-06.
- **Ràng buộc.** Chỉ **thêm** trường vào `detail` của phản hồi, không đổi hay bỏ trường cũ để không phá giao diện hiện có (cấu trúc `detail` cần xác nhận, REQUIREMENTS Mục 7).
