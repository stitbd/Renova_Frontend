// app/super-admin/finance/expenses/components/ExpenseDetailsModal.jsx
"use client";

import {
    Receipt, Calendar, Tag, Layers, Building2, Briefcase, Users,
    CreditCard, FileCheck, UserCog, CheckCircle2, MessageSquare, Edit,
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

const DetailItem = ({ icon: Icon, label, value }) => (
    <div className="em-detail-item">
        <div className="em-detail-icon"><Icon size={14} /></div>
        <div className="em-detail-text">
            <span className="em-detail-label">{label}</span>
            <span className="em-detail-value">{value || "—"}</span>
        </div>
    </div>
);

export default function ExpenseDetailsModal({ open, onClose, expense, onEdit }) {
    if (!expense) return null;

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Expense Details"
            subtitle={expense.id}
            icon={Receipt}
            width={760}
        >
            <div className="em-details">
                {/* ── Top summary ── */}
                <div className="em-details-summary">
                    <div>
                        <h3 className="em-details-title">{expense.title}</h3>
                        <div className="em-details-subrow">
                            <StatusBadge status={expense.status} />
                            <span className="em-attachment-badge">
                                <FileCheck size={12} /> {expense.attachment} attachment{expense.attachment === 1 ? "" : "s"}
                            </span>
                        </div>
                    </div>
                    <div className="em-details-amount">
                        <span className="em-details-amount-label">Net Amount</span>
                        <span className="em-details-amount-value">৳{Number(expense.net || 0).toLocaleString()}</span>
                    </div>
                </div>

                {/* ── Core details grid ── */}
                <div className="em-detail-grid">
                    <DetailItem icon={Calendar} label="Date" value={expense.date} />
                    <DetailItem icon={Tag} label="Category" value={expense.category} />
                    <DetailItem icon={Layers} label="Sub Category" value={expense.sub} />
                    <DetailItem icon={Building2} label="Branch" value={expense.branch} />
                    <DetailItem icon={Briefcase} label="Department" value={expense.dept} />
                    <DetailItem icon={Users} label="Vendor" value={expense.vendor} />
                    <DetailItem icon={CreditCard} label="Payment Method" value={expense.method} />
                    <DetailItem icon={Receipt} label="Invoice No." value={expense.invoice} />
                    <DetailItem icon={UserCog} label="Created By" value={expense.created} />
                    <DetailItem icon={CheckCircle2} label="Approved By" value={expense.approved} />
                </div>

                {/* ── Amount breakdown ── */}
                <div className="em-details-breakdown">
                    <div className="em-breakdown-row">
                        <span>Amount</span>
                        <span>৳{Number(expense.amount || 0).toLocaleString()}</span>
                    </div>
                    <div className="em-breakdown-row">
                        <span>Tax</span>
                        <span>{expense.tax || 0}%</span>
                    </div>
                    <div className="em-breakdown-row">
                        <span>Discount</span>
                        <span>৳{Number(expense.discount || 0).toLocaleString()}</span>
                    </div>
                    <div className="em-breakdown-row em-breakdown-total">
                        <span>Net Payable</span>
                        <span>৳{Number(expense.net || 0).toLocaleString()}</span>
                    </div>
                </div>

                {/* ── Remarks ── */}
                <div className="em-details-remarks">
                    <div className="em-detail-icon"><MessageSquare size={14} /></div>
                    <div className="em-detail-text">
                        <span className="em-detail-label">Remarks</span>
                        <span className="em-detail-value">{expense.remarks || "No remarks added."}</span>
                    </div>
                </div>

                {/* ── Footer actions ── */}
                <div className="em-form-group span-3 em-form-actions">
                    <button type="button" className="em-btn em-btn-ghost" onClick={onClose}>Close</button>
                    {onEdit && (
                        <button type="button" className="em-btn em-btn-primary" onClick={() => onEdit(expense)}>
                            <Edit size={14} /> Edit Expense
                        </button>
                    )}
                </div>
            </div>
        </Modal>
    );
}