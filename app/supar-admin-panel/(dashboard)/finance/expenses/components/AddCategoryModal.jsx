// app/super-admin/finance/expenses/components/AddCategoryModal.jsx
"use client";

import { useState } from "react";
import { Save, Layers } from "lucide-react";
import Modal from "./Modal";

const EMPTY = { name: "", type: "Operational", budgetHead: "", description: "", status: "Enabled" };

export default function AddCategoryModal({ open, onClose, onSave }) {
    const [form, setForm] = useState(EMPTY);
    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave?.(form);
        setForm(EMPTY);
        onClose?.();
    };

    return (
        <Modal
            open={open}
            onClose={() => { setForm(EMPTY); onClose?.(); }}
            title="Add Expense Category"
            subtitle="Create a new expense classification"
            icon={Layers}
            width={520}
        >
            <form className="em-form-grid" onSubmit={handleSubmit}>
                <div className="em-form-group span-3">
                    <label>Category Name</label>
                    <input required value={form.name} onChange={set("name")} type="text" placeholder="e.g., Diagnostic Reagents" />
                </div>
                <div className="em-form-group span-2">
                    <label>Category Type</label>
                    <select value={form.type} onChange={set("type")}>
                        <option>Operational</option>
                        <option>Capital</option>
                        <option>Payroll</option>
                        <option>Administrative</option>
                    </select>
                </div>
                <div className="em-form-group">
                    <label>Status</label>
                    <select value={form.status} onChange={set("status")}>
                        <option>Enabled</option>
                        <option>Disabled</option>
                    </select>
                </div>
                <div className="em-form-group span-3">
                    <label>Default Budget Head</label>
                    <input value={form.budgetHead} onChange={set("budgetHead")} type="text" placeholder="Optional" />
                </div>
                <div className="em-form-group span-3">
                    <label>Description</label>
                    <textarea value={form.description} onChange={set("description")} rows="2" placeholder="Optional notes about this category"></textarea>
                </div>
                <div className="em-form-group span-3 em-form-actions">
                    <button type="button" className="em-btn em-btn-ghost" onClick={() => { setForm(EMPTY); onClose?.(); }}>Cancel</button>
                    <button type="submit" className="em-btn em-btn-primary"><Save size={14} /> Save Category</button>
                </div>
            </form>
        </Modal>
    );
}