// app/super-admin/finance/expenses/components/AddExpenseModal.jsx
"use client";

import { useMemo, useState, useEffect } from "react";
import { Save, Upload, DollarSign, X as XIcon } from "lucide-react";
import Modal from "./Modal";

const EMPTY = {
    title: "", description: "", category: "", subCategory: "", department: "",
    branch: "", vendor: "", invoice: "", reference: "", amount: "", tax: "",
    discount: "", expenseDate: "", paymentDate: "", paymentMethod: "Bank",
    bankAccount: "", budgetHead: "", costCenter: "", project: "", priority: "Normal",
    status: "Pending", remarks: "", tags: "",
};

export default function AddExpenseModal({ open, onClose, onSave, categories = [], departments = [], branches = [], vendors = [], initialData = null }) {
    const [form, setForm] = useState(EMPTY);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (!open) return;
        if (initialData) {
            const statusCap = initialData.status
                ? initialData.status.charAt(0).toUpperCase() + initialData.status.slice(1)
                : "Pending";
            setForm({
                ...EMPTY,
                title: initialData.title || "",
                category: initialData.category || "",
                subCategory: initialData.sub || "",
                department: initialData.dept || "",
                branch: initialData.branch || "",
                vendor: initialData.vendor || "",
                invoice: initialData.invoice || "",
                amount: initialData.amount ?? "",
                tax: initialData.tax ?? "",
                discount: initialData.discount ?? "",
                expenseDate: initialData.date || "",
                paymentMethod: initialData.method || "Bank",
                status: statusCap,
                remarks: initialData.remarks || "",
            });
            setFiles([]);
        } else {
            setForm(EMPTY);
            setFiles([]);
        }
    }, [open, initialData]);

    

    const net = useMemo(() => {
        const amt = parseFloat(form.amount) || 0;
        const tax = parseFloat(form.tax) || 0;
        const disc = parseFloat(form.discount) || 0;
        return (amt + (amt * tax) / 100 - disc).toFixed(2);
    }, [form.amount, form.tax, form.discount]);

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const handleFiles = (e) => {
        const picked = Array.from(e.target.files || []);
        setFiles((prev) => [...prev, ...picked.map((f) => f.name)]);
    };

    const reset = () => { setForm(EMPTY); setFiles([]); };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave?.({ ...form, net, attachments: files });
        reset();
        onClose?.();
    };

    return (
        <Modal
            open={open}
            onClose={() => { reset(); onClose?.(); }}
            title={initialData ? "Edit Expense" : "Add Expense"}
            subtitle={initialData ? "Update this financial transaction" : "Record a new financial transaction"}
            icon={DollarSign}
            width={860}
        >
            <form className="em-form-grid" onSubmit={handleSubmit}>
                <div className="em-form-group span-2">
                    <label>Expense Title</label>
                    <input required value={form.title} onChange={set("title")} type="text" placeholder="e.g., Q3 Reagent Purchase" />
                </div>
                <div className="em-form-group span-3">
                    <label>Description</label>
                    <textarea value={form.description} onChange={set("description")} placeholder="Detailed description..." rows="2"></textarea>
                </div>

                <div className="em-form-group">
                    <label>Category</label>
                    <select required value={form.category} onChange={set("category")}>
                        <option value="">Select category</option>
                        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div className="em-form-group">
                    <label>Sub Category</label>
                    <input value={form.subCategory} onChange={set("subCategory")} type="text" placeholder="e.g., Diagnostic Reagents" />
                </div>
                <div className="em-form-group">
                    <label>Department</label>
                    <select value={form.department} onChange={set("department")}>
                        <option value="">Select department</option>
                        {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>

                <div className="em-form-group">
                    <label>Branch</label>
                    <select value={form.branch} onChange={set("branch")}>
                        <option value="">Select branch</option>
                        {branches.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                </div>
                <div className="em-form-group">
                    <label>Vendor</label>
                    <select value={form.vendor} onChange={set("vendor")}>
                        <option value="">Select vendor</option>
                        {vendors.map((v) => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
                <div className="em-form-group">
                    <label>Invoice Number</label>
                    <input value={form.invoice} onChange={set("invoice")} type="text" placeholder="INV-XXXX" />
                </div>

                <div className="em-form-group">
                    <label>Reference Number</label>
                    <input value={form.reference} onChange={set("reference")} type="text" placeholder="REF-XXXX" />
                </div>
                <div className="em-form-group">
                    <label>Amount (৳)</label>
                    <input required value={form.amount} onChange={set("amount")} type="number" min="0" step="0.01" placeholder="0.00" />
                </div>
                <div className="em-form-group">
                    <label>Tax (%)</label>
                    <input value={form.tax} onChange={set("tax")} type="number" min="0" step="0.01" placeholder="0" />
                </div>

                <div className="em-form-group">
                    <label>Discount (৳)</label>
                    <input value={form.discount} onChange={set("discount")} type="number" min="0" step="0.01" placeholder="0.00" />
                </div>
                <div className="em-form-group">
                    <label>Net Amount</label>
                    <input value={`৳${net}`} disabled type="text" />
                </div>
                <div className="em-form-group">
                    <label>Expense Date</label>
                    <input required value={form.expenseDate} onChange={set("expenseDate")} type="date" />
                </div>

                <div className="em-form-group">
                    <label>Payment Date</label>
                    <input value={form.paymentDate} onChange={set("paymentDate")} type="date" />
                </div>
                <div className="em-form-group">
                    <label>Payment Method</label>
                    <select value={form.paymentMethod} onChange={set("paymentMethod")}>
                        <option>Cash</option>
                        <option>Bank</option>
                        <option>Mobile Banking</option>
                        <option>Credit Card</option>
                        <option>Cheque</option>
                    </select>
                </div>
                <div className="em-form-group">
                    <label>Bank Account</label>
                    <input value={form.bankAccount} onChange={set("bankAccount")} type="text" placeholder="DBBL - 1234..." />
                </div>

                <div className="em-form-group">
                    <label>Budget Head</label>
                    <input value={form.budgetHead} onChange={set("budgetHead")} type="text" placeholder="Operational" />
                </div>
                <div className="em-form-group">
                    <label>Cost Center</label>
                    <input value={form.costCenter} onChange={set("costCenter")} type="text" placeholder="CC-Lab-01" />
                </div>
                <div className="em-form-group">
                    <label>Project</label>
                    <input value={form.project} onChange={set("project")} type="text" placeholder="Optional" />
                </div>

                <div className="em-form-group">
                    <label>Priority</label>
                    <select value={form.priority} onChange={set("priority")}>
                        <option>Low</option>
                        <option>Normal</option>
                        <option>High</option>
                        <option>Urgent</option>
                    </select>
                </div>
                <div className="em-form-group">
                    <label>Status</label>
                    <select value={form.status} onChange={set("status")}>
                        <option>Pending</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                    </select>
                </div>
                <div className="em-form-group">
                    <label>Tags</label>
                    <input value={form.tags} onChange={set("tags")} type="text" placeholder="urgent, restock" />
                </div>

                <div className="em-form-group span-3">
                    <label>Remarks</label>
                    <textarea value={form.remarks} onChange={set("remarks")} placeholder="Internal notes..." rows="2"></textarea>
                </div>

                <div className="em-form-group span-3">
                    <label>Upload Documents (Invoice, Receipt, Bill, Purchase Order, Supporting Docs)</label>
                    <label className="em-dropzone" htmlFor="expense-files">
                        <Upload size={24} />
                        <p>Drag & drop files here, or click to browse</p>
                        <span className="em-btn em-btn-ghost">Browse Files</span>
                    </label>
                    <input id="expense-files" type="file" multiple hidden onChange={handleFiles} />
                    {files.length > 0 && (
                        <div className="em-file-chip-row">
                            {files.map((f, i) => (
                                <span key={i} className="em-file-chip">
                                    {f}
                                    <button type="button" onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}>
                                        <XIcon size={12} />
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="em-form-group span-3 em-form-actions">
                    <button type="button" className="em-btn em-btn-ghost" onClick={() => { reset(); onClose?.(); }}>Cancel</button>
                    <button type="submit" className="em-btn em-btn-primary"><Save size={14} /> {initialData ? "Update Expense" : "Save Expense"}</button>
                </div>
            </form>
        </Modal>
    );
}