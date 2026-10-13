# BÀI TẬP GIỮA KỲ - PHÁT TRIỂN ỨNG DỤNG WEB CƠ BẢN (CSE122)

- **Tên đề tài:** InvoicePilot - Hệ thống Quản lý và Đối soát Hóa đơn Doanh nghiệp
- **Tên trang thực hiện:** Quản lý Danh Sách Hóa Đơn Doanh Nghiệp (Accounting Workspace)
- **Họ tên sinh viên:** Đỗ Duy Nhân
- **Mã sinh viên:** [2551060659]
- **Lớp học phần:** CSE122

---

## 1. Mục đích của trang
Trang **Quản lý Danh sách Hóa đơn** giúp nhân viên kế toán theo dõi, kiểm soát, tìm kiếm và lọc toàn bộ danh sách hóa đơn công nợ của doanh nghiệp theo thời gian thực (Đã thanh toán, Đang chờ, Quá hạn), đồng thời hỗ trợ thao tác xóa hóa đơn nhanh chóng kèm thông báo trực quan.

## 2. Các chức năng chính (JavaScript)
- **Hiển thị danh sách động:** Tự động tải và render dữ liệu hóa đơn từ `localStorage`.
- **Lọc dữ liệu theo trạng thái:** Chuyển đổi qua lại giữa các tab (Tất cả, Đã thanh toán, Đang chờ, Quá hạn) với bộ đếm số lượng cập nhật tự động.
- **Tìm kiếm trực tiếp:** Lọc hóa đơn theo mã HĐ hoặc tên khách hàng ngay khi gõ phím.
- **Xóa bản ghi:** Hộp thoại xác nhận (Confirm) và tự động cập nhật lại bảng dữ liệu kèm hệ thống Toast Notification.

## 3. Công nghệ sử dụng
- **HTML5:** Semantic HTML (`header`, `nav`, `main`, `section`, `table`, `form`).
- **CSS3:** Flexbox, Custom Properties (`:root`), Responsive Design, Glassmorphism.
- **JavaScript (ES6):** DOM Manipulation, Event Handling, Array Methods (`filter`, `forEach`), LocalStorage.

## 4. Các liên kết quan trọng (Bắt buộc)
- **Link Figma:** (https://www.figma.com/make/SOZDA7tWmPkvGa96LsNN5M/Combine-into-one-post?t=RQjs99VFywVA0fZp-20&fullscreen=1)
- **Link Video Trình bày (YouTube):** (https://youtu.be/NyPh7a-_bdw)
- **Link GitHub Repository:** https://github.com/nhancreator/CSE122-GK--Duy-Nh-n-.git