// app/super-admin/finance/expenses/components/AllExpensesModal.jsx
"use client";

import { useMemo, useState } from "react";
import {
    Search, Filter, RotateCcw, Eye, Edit, Trash2, FileCheck, FileText,
} from "lucide-react";
import Modal from "./Modal";

const StatusBadge = ({ status }) => {
    const config = {
        approved: { bg: "#ecfdf5", color: "#059669", label: "Approved" },
        pending: { bg: "#fffbeb", color: "#d97706", label: "Pending" },
        rejected: { bg: "#fef2f2", color: "#dc2626", label: "Rejected" },
    };
    const c = config[status] || config.pending;
    return <span className="em-badge" style={{ background: c.bg, color: c.color }}>{c.label}</span>;
};

const statusOptions = ["approved", "pending", "rejected"];
const methodOptions = ["Bank Transfer", "Cash", "Credit Card", "Online Payment"];

export default function AllExpensesModal({
    open, onClose, expenses = [], categories = [], branchNames = [], deptNames = [], vendorNames = [],
    onView, onEdit, onDelete, onOpenDocument,
}) {
    const [search, setSearch] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        category: "", branch: "", department: "", vendor: "", status: "", method: "", from: "", to: "",
    });

    const activeFilterCount = Object.values(filters).filter(Boolean).length;
    const clearFilters = () => setFilters({ category: "", branch: "", department: "", vendor: "", status: "", method: "", from: "", to: "" });

    const filtered = useMemo(() => {
        return expenses.filter((row) => {
            const q = search.trim().toLowerCase();
            if (q && !(`${row.id} ${row.title} ${row.vendor} ${row.invoice}`.toLowerCase().includes(q))) return false;
            if (filters.category && row.category !== filters.category) return false;
            if (filters.branch && row.branch !== filters.branch) return false;
            if (filters.department && row.dept !== filters.department) return false;
            if (filters.vendor && row.vendor !== filters.vendor) return false;
            if (filters.status && row.status !== filters.status) return false;
            if (filters.method && row.method !== filters.method) return false;
            if (filters.from && row.date < filters.from) return false;
            if (filters.to && row.date > filters.to) return false;
            return true;
        });
    }, [expenses, search, filters]);

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="All Expenses"
            subtitle={`${filtered.length} of ${expenses.length} expenses`}
            icon={FileText}
            fullWidth
        >
            <div className="em-section" style={{ gap: 16 }}>
                <div className="em-table-actions" style={{ flexWrap: "wrap" }}>
                    <div className="em-search-box">
                        <Search size={14} />
                        <input type="text" placeholder="Search ID, title, vendor, invoice..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <button className={`em-btn em-btn-ghost ${activeFilterCount ? "em-btn-active" : ""}`} onClick={() => setShowFilters((s) => !s)}>
                        <Filter size={14} /> Filters {activeFilterCount > 0 && <span className="em-filter-count">{activeFilterCount}</span>}
                    </button>
                </div>

                {showFilters && (
                    <div className="em-card em-filter-bar">
                        <div className="em-filter-grid">
                            <div className="em-form-group">
                                <label>Category</label>
                                <select value={filters.category} onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}>
                                    <option value="">All Categories</option>
                                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="em-form-group">
                                <label>Branch</label>
                                <select value={filters.branch} onChange={(e) => setFilters((f) => ({ ...f, branch: e.target.value }))}>
                                    <option value="">All Branches</option>
                                    {branchNames.map((b) => <option key={b} value={b}>{b}</option>)}
                                </select>
                            </div>
                            <div className="em-form-group">
                                <label>Department</label>
                                <select value={filters.department} onChange={(e) => setFilters((f) => ({ ...f, department: e.target.value }))}>
                                    <option value="">All Departments</option>
                                    {deptNames.map((d) => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div className="em-form-group">
                                <label>Vendor</label>
                                <select value={filters.vendor} onChange={(e) => setFilters((f) => ({ ...f, vendor: e.target.value }))}>
                                    <option value="">All Vendors</option>
                                    {vendorNames.map((v) => <option key={v} value={v}>{v}</option>)}
                                </select>
                            </div>
                            <div className="em-form-group">
                                <label>Status</label>
                                <select value={filters.status} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}>
                                    <option value="">All Statuses</option>
                                    {statusOptions.map((s) => <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}
                                </select>
                            </div>
                            <div className="em-form-group">
                                <label>Payment Method</label>
                                <select value={filters.method} onChange={(e) => setFilters((f) => ({ ...f, method: e.target.value }))}>
                                    <option value="">All Methods</option>
                                    {methodOptions.map((m) => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>
                            <div className="em-form-group">
                                <label>From Date</label>
                                <input type="date" value={filters.from} onChange={(e) => setFilters((f) => ({ ...f, from: e.target.value }))} />
                            </div>
                            <div className="em-form-group">
                                <label>To Date</label>
                                <input type="date" value={filters.to} onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value }))} />
                            </div>
                        </div>
                        <div className="em-filter-actions">
                            <button className="em-btn em-btn-ghost" onClick={clearFilters}><RotateCcw size={14} /> Clear Filters</button>
                        </div>
                    </div>
                )}

                <div className="em-table-wrapper em-table-scroll-limit">
                    <table className="em-table">
                        <thead>
                            <tr>
                                <th>Expense ID</th><th>Date</th><th>Title</th><th>Category</th><th>Branch</th>
                                <th>Method</th><th>Invoice</th><th>Net Amount</th>
                                <th>Created By</th><th>Approved By</th><th>Status</th><th>Docs</th><th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((row) => (
                                <tr key={row.id}>
                                    <td><strong>{row.id}</strong></td>
                                    <td>{row.date}</td>
                                    <td className="em-cell-title">{row.title}</td>
                                    <td>{row.category}</td>
                                    <td>{row.branch}</td>
                                    <td>{row.method}</td>
                                    <td><code>{row.invoice}</code></td>
                                    <td><strong>৳{row.net.toLocaleString()}</strong></td>
                                    <td>{row.created}</td>
                                    <td>{row.approved}</td>
                                    <td><StatusBadge status={row.status} /></td>
                                    <td>
                                        <button
                                            type="button"
                                            className="em-attachment-badge em-attachment-btn"
                                            onClick={() => onOpenDocument?.(row.docs, 0)}
                                            disabled={!row.docs?.length}
                                            title={row.docs?.length ? "View attached documents" : "No documents attached"}
                                        >
                                            <FileCheck size={12} /> {row.docs?.length ?? row.attachment}
                                        </button>
                                    </td>
                                    <td>
                                        <div className="em-row-actions">
                                            <button title="View" onClick={() => onView?.(row)}><Eye size={14} /></button>
                                            <button title="Edit" onClick={() => onEdit?.(row)}><Edit size={14} /></button>
                                            <button title="Delete" onClick={() => onDelete?.(row.id)}><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr><td colSpan={13} className="em-empty-row">No expenses match the current filters.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Modal>
    );
}