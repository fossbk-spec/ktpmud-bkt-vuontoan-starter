# PROGRESS --- 31 --- Track B

-   Starter: `ktpmud-bkt-vuontoan-starter` · tag `bkt-2026-v1`
-   Fork:
    https://github.com/tranlam592006-beep/ktpmud-bkt-vuontoan-starter
-   Nhánh làm việc: `develop`
-   Phạm vi: Vườn Toán Lớp 3 --- dạng bài "Ước lượng trước khi tính
    đúng"
-   Nguyên tắc: Trạng thái và bằng chứng dưới đây phản ánh công việc đã
    xác nhận; chưa coi kế hoạch là kết quả.

## PC-1 --- 11/11/2026

### 1.1. Tiến độ theo acceptance criteria

> Đối chiếu lại tên/diễn giải từng mã với đề thi chính thức trước khi
> nộp. Bảng này dùng 10 mã B-01...B-10 theo mẫu Progress Check của GV.
> "Xong" ở mức tài liệu không đồng nghĩa đã hoàn tất chức năng.

  -------------------------------------------------------------------------------------------------
  Mã                Trạng thái (Chưa  Bằng chứng (commit / CI / file)             Ghi chú
                    / Đang / Xong)                                                
  ----------------- ----------------- ------------------------------------------- -----------------
  B-01              Đang              `REQUIREMENTS.md`;                          Đã đề xuất dạng
                                      `docs/ADR-001-estimate-question-type.md`;   `estimate`; chưa
                                      commit `b96aa50`                            triển khai giao
                                                                                  diện và API.

  B-02              Đang              `TEST_PLAN.md`; nhận xét Checkpoint 1       Chưa bổ sung đủ
                                                                                  12 fixture
                                                                                  nhân/chia kèm đáp
                                                                                  án và khoảng chấp
                                                                                  nhận.

  B-03              Đang              `docs/ADR-002-estimation-grading.md`; nhận  Đang sửa phép so
                                      xét Checkpoint 1                            sánh biên bằng số
                                                                                  nguyên và đổi
                                                                                  sang chấm
                                                                                  đúng/sai toàn
                                                                                  câu.

  B-04              Chưa              `REQUIREMENTS.md` (kế hoạch)                Chưa có kiểm thử
                                                                                  triển khai chứng
                                                                                  minh API không lộ
                                                                                  đáp án.

  B-05              Chưa              `TEST_PLAN.md` (kế hoạch)                   Chưa triển khai
                                                                                  chấm và lưu kết
                                                                                  quả dạng mới.

  B-06              Chưa              `REQUIREMENTS.md` (kế hoạch)                Chưa triển khai
                                                                                  phản hồi riêng
                                                                                  cho ước lượng và
                                                                                  kết quả chính
                                                                                  xác.

  B-07              Đang              `docs/ADR-001-estimate-question-type.md`    Đã xác định giới
                                                                                  hạn phạm vi thay
                                                                                  đổi; chưa kiểm
                                                                                  chứng hồi quy các
                                                                                  dạng bài cũ.

  B-08              Đang              `TEST_PLAN.md`                              Đã có kế hoạch
                                                                                  test; chưa có bộ
                                                                                  test tự động chạy
                                                                                  được cho tính
                                                                                  năng mới.

  B-09              Chưa              Chưa có CI cho thay đổi mới                 Cần cấu hình/chạy
                                                                                  test tự động theo
                                                                                  yêu cầu đề.

  B-10              Chưa              Chưa có kết quả kiểm thử tích hợp           Cần chứng minh
                                                                                  luồng frontend →
                                                                                  API → SQLite và
                                                                                  hồi quy.
  -------------------------------------------------------------------------------------------------

### 1.2. Sửa đổi bắt buộc từ Checkpoint 1

  ---------------------------------------------------------------------------------------------
  Mục                           Trạng thái              Bằng chứng
  ----------------------------- ----------------------- ---------------------------------------
  ❗ 1. Sửa điều kiện biên sai  Đang                    Nhận xét Checkpoint 1; cần cập nhật
  số 20% sang số nguyên:                                `docs/ADR-002-estimation-grading.md`,
  `4*A <= 5*E && 5*E <= 6*A`;                           `TEST_PLAN.md` và test tự động.
  kiểm thử biên với nhiều A                             

  ❗ 2. Bổ sung 12 fixture      Chưa                    Nhận xét Checkpoint 1; sẽ cập nhật
  nhân/chia cụ thể, đáp án và                           `TEST_PLAN.md` và dữ liệu câu hỏi.
  khoảng chấp nhận                                      

  ❗ 3. Làm rõ điểm thành phần  Đang                    Nhóm đã chọn phương án mới: chỉ đúng
  4/6 và tương thích                                    khi **cả ước lượng đạt và đáp án chính
  `correct_count` /                                     xác đúng**; cần ghi lại ADR và test.
  `score_percent`                                       

  4\. Làm rõ thứ tự "ước lượng  Đang                    Đề xuất phiếu 12 câu tuần tự, mỗi câu
  trước" do frontend hay server                         có giai đoạn ước lượng giới hạn thời
  kiểm soát                                             gian; backend xác nhận thứ tự/thời hạn.
                                                        Chưa triển khai.

  5\. Giải thích trường hợp     Đang                    Dự kiến vẫn chấp nhận về mặt toán học;
  nhập đáp án chính xác vào ô                           giới hạn thời gian chỉ khuyến khích ước
  ước lượng (sai số 0%)                                 lượng, không chứng minh được cách suy
                                                        nghĩ. Cần ghi rõ trong ADR.
  ---------------------------------------------------------------------------------------------

### 1.3. Timeline dự kiến đến khi hoàn thành

  -----------------------------------------------------------------------
  Việc              Vai trò phụ trách Mốc (CP2 15/11 ·  Ngày dự kiến
                                      M3 · Freeze 19/11 
                                      · M4 20/11)       
  ----------------- ----------------- ----------------- -----------------
  Chốt phản hồi     Phân tích / kiểm  M2 / CP2          12/11
  Checkpoint 1; sửa thử                                 
  ADR, yêu cầu,                                         
  test plan; thêm                                       
  12 fixture                                            

  Thiết kế dữ liệu, Backend           M2 / CP2          13/11
  API, quy tắc chấm                                     
  số nguyên và                                          
  đúng/sai toàn câu                                     

  Giao diện 12 câu  Frontend          M2 / CP2          14/11
  tuần tự, ước                                          
  lượng có thời                                         
  hạn, sau đó tính                                      
  đúng                                                  

  Tích hợp frontend Frontend +        CP2               15/11
  → backend →       Backend                             
  SQLite; demo                                          
  luồng hoàn chỉnh                                      

  Test biên, test   Kiểm thử +        M3                17/11
  API, test hồi     Backend                             
  quy, CI và rà                                         
  soát bảo mật                                          

  Hoàn thiện tài    Tài liệu + cả     M3                18/11
  liệu, báo cáo     nhóm                                
  test, kịch bản                                        
  demo và rà soát                                       
  PC-2                                                  

  Chốt commit, tag  Điều phối / Git   Freeze 19/11      19/11
  release                                               
  candidate, không                                      
  sửa sau Freeze                                        

  Nộp PR chính thức Điều phối / Git   M4                20/11
  và kiểm tra                                           
  CI/validate                                           
  -----------------------------------------------------------------------

### 1.4. Rủi ro / đang vướng

-   Giới hạn thời gian không chứng minh chắc chắn học sinh đã thực hiện
    phép ước lượng; cần diễn đạt đúng phạm vi kiểm soát.
-   Cần quyết định thời lượng hợp lý với học sinh lớp 3 và phương án khi
    hết giờ/mất kết nối.
-   Cần bảo đảm thay đổi không làm sai bốn dạng câu hỏi hiện có.
-   Cần sửa tài liệu M1 trước khi triển khai để thống nhất quy tắc chấm
    mới.
-   Chưa có bằng chứng test tự động và CI cho tính năng mới.

### 1.5. Câu hỏi cho GV

-   Q1: Nhóm dự kiến bỏ điểm thành phần 4/6, chỉ tính một câu đúng khi
    **ước lượng trong khoảng ±20% và kết quả chính xác đúng**, để
    `score_percent` phản ánh tỷ lệ câu đúng. Thầy có đồng ý phương án
    này không?
-   Q2: Nhóm đề xuất 12 câu làm tuần tự, mỗi câu có thời gian ước lượng
    ngắn do backend kiểm soát. Thầy có chấp nhận đây là biện pháp khuyến
    khích ước lượng (không phải bằng chứng tuyệt đối về cách học sinh
    suy nghĩ) không?
-   Q3: Khi học sinh nhập đúng đáp án vào ô ước lượng (sai số 0%), nhóm
    dự kiến vẫn tính là ước lượng đạt về mặt số học. Thầy có yêu cầu
    thêm tiêu chí đánh giá phương pháp không?

### 1.6. Phân công (alias hoặc vai trò, KHÔNG ghi họ tên/MSSV)

> Bảng phân công **dự kiến** theo vai trò; nhóm cần xác nhận người phụ
> trách thực tế trước khi nộp.

  -----------------------------------------------------------------------
  Alias / vai trò         Đầu việc chính          Commit/PR tiêu biểu
  ----------------------- ----------------------- -----------------------
  Điều phối / Git         Tổng hợp tài liệu, quản `b96aa50` (tài liệu M1;
                          lý nhánh, commit, PR,   xác nhận người thực
                          tiến độ                 hiện)

  Backend                 Dữ liệu câu hỏi, API,   Chưa có commit tính
                          thuật toán chấm, lưu    năng mới
                          SQLite                  

  Frontend                Giao diện tuần tự 12    Chưa có commit tính
                          câu, bộ đếm và phản hồi năng mới

  Kiểm thử / tài liệu     Fixture, test biên, hồi `TEST_PLAN.md` trong
                          quy, CI, báo cáo        `b96aa50` (xác nhận
                                                  người thực hiện)
  -----------------------------------------------------------------------

## PC-2 --- 18/11/2026

> Chưa đến thời điểm PC-2. Các bảng dưới đây là khung để cập nhật bằng
> kết quả thực tế.

### 2.1. Đối chiếu timeline PC-1

  Việc (theo bảng 1.3)              Kế hoạch   Thực tế         Lệch & lý do
  --------------------------------- ---------- --------------- --------------
  Sửa tài liệu và bổ sung fixture   12/11      Chưa cập nhật   
  Backend và chấm điểm              13/11      Chưa cập nhật   
  Frontend hai giai đoạn            14/11      Chưa cập nhật   
  Tích hợp và demo                  15/11      Chưa cập nhật   
  Test, CI, bảo mật                 17/11      Chưa cập nhật   
  Hoàn thiện tài liệu và PC-2       18/11      Chưa cập nhật   

### 2.2. Tiến độ theo acceptance criteria (cập nhật toàn bộ bảng 1.1)

  Mã     Trạng thái           Bằng chứng   Ghi chú
  ------ -------------------- ------------ ---------
  B-01   Chưa cập nhật PC-2                
  B-02   Chưa cập nhật PC-2                
  B-03   Chưa cập nhật PC-2                
  B-04   Chưa cập nhật PC-2                
  B-05   Chưa cập nhật PC-2                
  B-06   Chưa cập nhật PC-2                
  B-07   Chưa cập nhật PC-2                
  B-08   Chưa cập nhật PC-2                
  B-09   Chưa cập nhật PC-2                
  B-10   Chưa cập nhật PC-2                

### 2.3. Sẵn sàng nộp bài (đề thi Mục 6)

  ---------------------------------------------------------------------------------------------------
  Deliverable                     Có / Chưa               Đường dẫn
  ------------------------------- ----------------------- -------------------------------------------
  README.md (cài đặt / chạy /     Có bản starter; cần cập `README.md`
  test)                           nhật                    

  REQUIREMENTS.md                 Có bản M1; cần cập nhật `REQUIREMENTS.md`

  DECISIONS.md / ADR              Có 2 ADR; cần cập nhật  `docs/ADR-001-estimate-question-type.md`,
                                                          `docs/ADR-002-estimation-grading.md`

  Test tự động + CI xanh          Chưa xác nhận           

  TEST_REPORT.md                  Chưa                    

  SECURITY_PRIVACY_CHECKLIST.md   Chưa                    

  AI_USE.md                       Chưa                    

  CONTRIBUTIONS.md                Chưa                    

  Slide / demo script ≤ 7 phút    Chưa                    

  Draft PR vào `ktpmud-project`,  Chưa                    
  check `validate` xanh                                   
  ---------------------------------------------------------------------------------------------------

### 2.4. Việc còn lại đến Freeze (23:59 19/11)

  Việc                               Vai trò phụ trách    Hạn
  ---------------------------------- -------------------- --------------------
  Chốt kết quả test, CI và báo cáo   Kiểm thử + Backend   18/11
  Hoàn thiện tài liệu và demo        Tài liệu + cả nhóm   19/11
  Tạo tag RC và lưu SHA cuối         Điều phối / Git      19/11, trước 23:59

### 2.5. Rủi ro / câu hỏi cho GV

-   Chưa cập nhật; bổ sung theo tình hình PC-2.

## Kết quả cuối --- Freeze 19/11/2026

-   Tag: `bkt-2026-31-rc1` · SHA: **Chưa tạo**
-   Trạng thái cuối từng mã AC: **Chưa cập nhật** (đối chiếu bảng 2.2
    tại Freeze)
-   Những việc trong timeline chưa hoàn thành và lý do: **Chưa cập
    nhật**
