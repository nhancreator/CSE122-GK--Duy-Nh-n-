/**
 * InvoicePilot - Script Độc Lập Bài Tập Giữa Kỳ CSE122
 * Tự khởi tạo mock data, xử lý tìm kiếm, lọc tab trạng thái và xóa dữ liệu trực tiếp.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Khởi tạo dữ liệu mẫu mặc định nếu trong localStorage chưa có
    const STORAGE_KEY = 'invoicepilot_midterm_invoices';
    
    const DEFAULT_INVOICES = [
        { id: 'INV-001', customerName: 'Công ty Cổ phần Alpha', amount: 15000000, issueDate: '2026-09-01', dueDate: '2026-09-30', status: 'pending' },
        { id: 'INV-002', customerName: 'Cửa hàng Tiện lợi Beta', amount: 8500000, issueDate: '2026-09-05', dueDate: '2026-09-20', status: 'paid' },
        { id: 'INV-003', customerName: 'Tập đoàn Công nghệ X', amount: 30000000, issueDate: '2026-09-15', dueDate: '2026-09-30', status: 'overdue' },
        { id: 'INV-004', customerName: 'Doanh nghiệp Tư nhân Gamma', amount: 12400000, issueDate: '2026-09-18', dueDate: '2026-10-05', status: 'pending' },
        { id: 'INV-005', customerName: 'Chuỗi Siêu thị Delta', amount: 24500000, issueDate: '2026-08-10', dueDate: '2026-08-25', status: 'paid' }
    ];

    function getInvoices() {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_INVOICES));
            return DEFAULT_INVOICES;
        }
        try {
            return JSON.parse(data);
        } catch (e) {
            return DEFAULT_INVOICES;
        }
    }

    function saveInvoices(invoices) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
    }

    // 2. Hệ thống Toast Notification
    function showToast(message, type = 'success') {
        let container = document.getElementById('toastContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toastContainer';
            container.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 8px;';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        const bgColor = type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#ef4444';
        toast.style.cssText = `
            background: ${bgColor};
            color: #ffffff;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            font-size: 0.85rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        toast.innerHTML = `<i class='bx bx-check-circle' style="font-size: 1.2rem;"></i> <span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Format tiền tệ VNĐ
    function formatVND(amount) {
        return String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    // 3. Render bảng dữ liệu & Bộ lọc / Tìm kiếm
    const invoiceTableBody = document.getElementById('invoiceTableBody');
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let currentStatusFilter = 'all';

    function renderTable() {
        const invoices = getInvoices();
        const keyword = searchInput ? searchInput.value.trim().toLowerCase() : '';

        // Lọc theo trạng thái và từ khóa
        const filtered = invoices.filter(inv => {
            const status = inv.status || 'pending';
            if (currentStatusFilter === 'paid' && status !== 'paid') return false;
            if (currentStatusFilter === 'pending' && status !== 'pending') return false;
            if (currentStatusFilter === 'overdue' && status !== 'overdue') return false;

            const matchId = (inv.id || '').toLowerCase().includes(keyword);
            const matchCustomer = (inv.customerName || '').toLowerCase().includes(keyword);
            return !keyword || matchId || matchCustomer;
        });

        // Cập nhật số lượng trên các nút Badge
        const countAll = invoices.length;
        const countPaid = invoices.filter(i => i.status === 'paid').length;
        const countPending = invoices.filter(i => i.status === 'pending').length;
        const countOverdue = invoices.filter(i => i.status === 'overdue').length;

        document.getElementById('count-all').innerText = `(${countAll})`;
        document.getElementById('count-paid').innerText = `(${countPaid})`;
        document.getElementById('count-pending').innerText = `(${countPending})`;
        document.getElementById('count-overdue').innerText = `(${countOverdue})`;

        document.getElementById('showingCount').innerText = filtered.length;
        document.getElementById('totalCount').innerText = countAll;

        if (filtered.length === 0) {
            invoiceTableBody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; color: var(--text-secondary); padding: 36px;">
                        <i class='bx bx-folder-open' style="font-size: 2.5rem; display: block; margin-bottom: 8px;"></i>
                        Không tìm thấy hóa đơn nào phù hợp.
                    </td>
                </tr>
            `;
            return;
        }

        invoiceTableBody.innerHTML = '';
        filtered.forEach(inv => {
            const tr = document.createElement('tr');
            
            let badgeHtml = '<span class="badge badge-warning">Đang chờ</span>';
            if (inv.status === 'paid') badgeHtml = '<span class="badge badge-success">Đã thanh toán</span>';
            if (inv.status === 'overdue') badgeHtml = '<span class="badge" style="background:rgba(239,68,68,0.15); color:#f87171; border:1px solid rgba(239,68,68,0.3)">Quá hạn</span>';

            tr.innerHTML = `
                <td><strong style="color: var(--primary-color);">${inv.id}</strong></td>
                <td>${inv.customerName}</td>
                <td>${inv.issueDate}</td>
                <td>${inv.dueDate}</td>
                <td style="font-weight: 600; text-align: right;">${formatVND(inv.amount)} VNĐ</td>
                <td>${badgeHtml}</td>
                <td style="text-align: center;">
                    <button class="btn btn-outline btn-delete" data-id="${inv.id}" title="Xóa hóa đơn" style="padding: 6px 10px; font-size: 0.8rem; color: #f87171; border-color: rgba(239,68,68,0.3);">
                        <i class='bx bx-trash'></i> Xóa
                    </button>
                </td>
            `;
            invoiceTableBody.appendChild(tr);
        });

        // Gắn sự kiện xóa bản ghi
        invoiceTableBody.querySelectorAll('.btn-delete').forEach(btn => {
            btn.onclick = (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                if (confirm(`Bạn có chắc chắn muốn xóa hóa đơn ${id}?`)) {
                    let currentList = getInvoices();
                    currentList = currentList.filter(item => item.id !== id);
                    saveInvoices(currentList);
                    showToast(`Đã xóa thành công hóa đơn ${id}!`, 'error');
                    renderTable();
                }
            };
        });
    }

    // Sự kiện chuyển Tab lọc trạng thái
    filterButtons.forEach(btn => {
        btn.onclick = () => {
            filterButtons.forEach(b => {
                b.classList.remove('btn-primary');
                b.classList.add('btn-outline');
            });
            btn.classList.remove('btn-outline');
            btn.classList.add('btn-primary');
            currentStatusFilter = btn.getAttribute('data-status');
            renderTable();
        };
    });

    // Sự kiện tìm kiếm theo thời gian thực
    if (searchInput) {
        searchInput.oninput = () => renderTable();
    }

    // Chạy render lần đầu khi load trang
    renderTable();
});