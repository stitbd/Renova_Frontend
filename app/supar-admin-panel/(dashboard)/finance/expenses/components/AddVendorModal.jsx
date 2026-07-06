// app/super-admin/finance/expenses/components/AddVendorModal.jsx
"use client";

import { useState, useEffect } from "react";
import { Save, Users, Upload, User } from "lucide-react";
import Modal from "./Modal";

const EMPTY = {
    name: "", contactPerson: "", email: "", phone: "", address: "",
    category: "", paymentTerms: "Net 30", openingBalance: "", status: "Active",
};

export default function AddVendorModal({ open, onClose, onSave, initialData = null }) {
    const [form, setForm] = useState(EMPTY);
    const [doc, setDoc] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        if (!open) return;
        if (initialData) {
            const statusCap = initialData.status
                ? initialData.status.charAt(0).toUpperCase() + initialData.status.slice(1)
                : "Active";
            setForm({
                name: initialData.name || "",
                contactPerson: initialData.contactPerson || "",
                email: initialData.email || initialData.contact || "",
                phone: initialData.phone || "",
                address: initialData.address || "",
                category: initialData.category || "",
                paymentTerms: initialData.paymentTerms || "Net 30",
                openingBalance: initialData.outstanding ?? "",
                status: statusCap,
            });
            setProfileImage(initialData.profileImage || null);
            setDoc(null);
        } else {
            setForm(EMPTY);
            setProfileImage(null);
            setDoc(null);
        }
    }, [open, initialData]);

    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

    const handleProfilePick = (e) => {
        const file = e.target.files?.[0];
        if (file) setProfileImage(URL.createObjectURL(file));
    };

    const resetAll = () => { setForm(EMPTY); setDoc(null); setProfileImage(null); };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave?.({ ...form, document: doc, profileImage });
        resetAll();
        onClose?.();
    };

    return (
        <Modal
            open={open}
            onClose={() => { resetAll(); onClose?.(); }}
            title={initialData ? "Edit Vendor" : "Add Vendor"}
            subtitle={initialData ? "Update supplier or service provider details" : "Onboard a new supplier or service provider"}
            icon={Users}
            width={640}
        >
            <form className="em-form-grid" onSubmit={handleSubmit}>
                <div className="em-form-group span-3">
                    <label>Vendor Profile Image</label>
                    <div className="em-vendor-avatar-upload">
                        <div className="em-vendor-avatar-preview">
                            {profileImage ? <img src={profileImage} alt="Vendor profile" /> : <User size={24} />}
                        </div>
                        <label className="em-btn em-btn-ghost" htmlFor="vendor-profile-image">
                            <Upload size={14} /> {profileImage ? "Change Photo" : "Upload Photo"}
                        </label>
                        <input id="vendor-profile-image" type="file" accept="image/*" hidden onChange={handleProfilePick} />
                    </div>
                </div>

                <div className="em-form-group span-2">
                    <label>Vendor Name</label>
                    <input required value={form.name} onChange={set("name")} type="text" placeholder="e.g., MedSupply Co." />
                </div>
                <div className="em-form-group">
                    <label>Status</label>
                    <select value={form.status} onChange={set("status")}>
                        <option>Active</option>
                        <option>Warning</option>
                        <option>Inactive</option>
                    </select>
                </div>

                <div className="em-form-group">
                    <label>Contact Person</label>
                    <input value={form.contactPerson} onChange={set("contactPerson")} type="text" placeholder="Full name" />
                </div>
                <div className="em-form-group">
                    <label>Email</label>
                    <input value={form.email} onChange={set("email")} type="email" placeholder="vendor@company.com" />
                </div>
                <div className="em-form-group">
                    <label>Phone</label>
                    <input value={form.phone} onChange={set("phone")} type="tel" placeholder="+880 1XXXXXXXXX" />
                </div>

                <div className="em-form-group span-2">
                    <label>Address</label>
                    <input value={form.address} onChange={set("address")} type="text" placeholder="Street, City" />
                </div>
                <div className="em-form-group">
                    <label>Category Supplied</label>
                    <input value={form.category} onChange={set("category")} type="text" placeholder="e.g., Laboratory" />
                </div>

                <div className="em-form-group">
                    <label>Payment Terms</label>
                    <select value={form.paymentTerms} onChange={set("paymentTerms")}>
                        <option>Immediate</option>
                        <option>Net 15</option>
                        <option>Net 30</option>
                        <option>Net 60</option>
                    </select>
                </div>
                <div className="em-form-group span-2">
                    <label>Opening Balance (৳)</label>
                    <input value={form.openingBalance} onChange={set("openingBalance")} type="number" min="0" placeholder="0.00" />
                </div>

                <div className="em-form-group span-3">
                    <label>Vendor Document (Agreement, Trade License, etc.)</label>
                    <label className="em-dropzone" htmlFor="vendor-doc">
                        <Upload size={24} />
                        <p>{doc || "Click to attach a document"}</p>
                        <span className="em-btn em-btn-ghost">Browse Files</span>
                    </label>
                    <input id="vendor-doc" type="file" hidden onChange={(e) => setDoc(e.target.files?.[0]?.name || null)} />
                </div>

                <div className="em-form-group span-3 em-form-actions">
                    <button type="button" className="em-btn em-btn-ghost" onClick={() => { resetAll(); onClose?.(); }}>Cancel</button>
                    <button type="submit" className="em-btn em-btn-primary"><Save size={14} /> {initialData ? "Update Vendor" : "Save Vendor"}</button>
                </div>
            </form>
        </Modal>
    );
}