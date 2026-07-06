// app/super-admin/finance/expenses/components/VendorDetailsModal.jsx
"use client";

import {
    Users, Mail, Phone, MapPin, Tag, CreditCard, Star, FileText,
    Image as ImageIcon, Edit, User,
} from "lucide-react";
import Modal from "./Modal";

const StatusBadge = ({ status }) => {
    const config = {
        active: { bg: "#ecfdf5", color: "#059669", label: "Active" },
        warning: { bg: "#fffbeb", color: "#d97706", label: "Warning" },
        inactive: { bg: "#fef2f2", color: "#dc2626", label: "Inactive" },
    };
    const c = config[status] || config.active;
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

export default function VendorDetailsModal({ open, onClose, vendor, onEdit, onOpenDocument }) {
    if (!vendor) return null;

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Vendor Details"
            subtitle={vendor.name}
            icon={Users}
            width={760}
        >
            <div className="em-details">
                {/* ── Top summary ── */}
                <div className="em-details-summary">
                    <div className="em-vendor-details-top">
                        <div className="em-vendor-avatar-lg">
                            {vendor.profileImage ? (
                                <img src={vendor.profileImage} alt={vendor.name} />
                            ) : (
                                <User size={26} />
                            )}
                        </div>
                        <div>
                            <h3 className="em-details-title">{vendor.name}</h3>
                            <div className="em-details-subrow">
                                <StatusBadge status={vendor.status} />
                                {vendor.rating > 0 && (
                                    <span className="em-rating">
                                        <Star size={12} fill="#f59e0b" color="#f59e0b" /> {vendor.rating}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="em-details-amount">
                        <span className="em-details-amount-label">Outstanding</span>
                        <span className="em-details-amount-value">৳{Number(vendor.outstanding || 0).toLocaleString()}</span>
                    </div>
                </div>

                {/* ── Core details grid ── */}
                <div className="em-detail-grid">
                    <DetailItem icon={Mail} label="Email" value={vendor.email || vendor.contact} />
                    <DetailItem icon={Phone} label="Phone" value={vendor.phone} />
                    <DetailItem icon={MapPin} label="Address" value={vendor.address} />
                    <DetailItem icon={Tag} label="Category Supplied" value={vendor.category} />
                    <DetailItem icon={CreditCard} label="Payment Terms" value={vendor.paymentTerms} />
                </div>

                {/* ── Payment breakdown ── */}
                <div className="em-details-breakdown">
                    <div className="em-breakdown-row">
                        <span>Total Paid</span>
                        <span>৳{Number(vendor.paid || 0).toLocaleString()}</span>
                    </div>
                    <div className="em-breakdown-row em-breakdown-total">
                        <span>Outstanding Balance</span>
                        <span>৳{Number(vendor.outstanding || 0).toLocaleString()}</span>
                    </div>
                </div>

                {/* ── Attached Documents ── */}
                {vendor.docs && vendor.docs.length > 0 && (
                    <div className="em-details-docs">
                        <span className="em-detail-label">Attached Documents ({vendor.docs.length})</span>
                        <div className="em-doc-chip-row">
                            {vendor.docs.map((doc, i) => (
                                <button
                                    type="button"
                                    key={i}
                                    className="em-doc-chip-btn"
                                    onClick={() => onOpenDocument?.(vendor.docs, i)}
                                >
                                    {doc.url.toLowerCase().endsWith(".pdf") ? <FileText size={14} /> : <ImageIcon size={14} />}
                                    <span>{doc.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Footer actions ── */}
                <div className="em-form-group span-3 em-form-actions">
                    <button type="button" className="em-btn em-btn-ghost" onClick={onClose}>Close</button>
                    {onEdit && (
                        <button type="button" className="em-btn em-btn-primary" onClick={() => onEdit(vendor)}>
                            <Edit size={14} /> Edit Vendor
                        </button>
                    )}
                </div>
            </div>
        </Modal>
    );
}