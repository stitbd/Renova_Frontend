// OutletDetailsPage.jsx
"use client";
import { StatusBadge } from "../OutletFormComponents";
import { useRouter, useSearchParams } from "next/navigation";
import "./outlet-details.css";
import {
    Mail,
    Phone,
    Calendar,
    MapPin,
    Award,
    Shield,
    Check,
    Lock,
    Clock,
    Star,
    FileText,
    Edit,
    Trash2,
    ArrowLeft,
    User as UserIcon
} from "lucide-react";

export const outletData = [
    { id: "OUT-2025-000014", name: "Renova Dhanmondi", type: "Main Branch", address: "House 12, Road 5, Dhanmondi, Dhaka", phone: "+880 1812-345678", email: "dhanmondi@renova.com", manager: "Nadia Islam", status: "active", opened: "01 Jan 2023", image: "/images/logo.png" },
    { id: "OUT-2025-000013", name: "Renova Mirpur", type: "Sub Branch", address: "Sec 6, Mirpur, Dhaka", phone: "+880 1712-345678", email: "mirpur@renova.com", manager: "Karim Ahmed", status: "active", opened: "15 Mar 2023", image: "/images/logo.png" },
    { id: "OUT-2025-000012", name: "Renova Chattogram", type: "Sub Branch", address: "GEC Circle, Chattogram", phone: "+880 1912-345678", email: "ctg@renova.com", manager: "Sumaiya Begum", status: "inactive", opened: "20 Jun 2023", image: "/images/logo.png" },
    { id: "OUT-2025-000011", name: "Renova Sylhet", type: "Sub Branch", address: "Zindabazar, Sylhet", phone: "+880 1612-345678", email: "sylhet@renova.com", manager: "Rafiqul Islam", status: "active", opened: "05 Sep 2023", image: "/images/logo.png" },
    { id: "OUT-2025-000010", name: "Renova Uttara", type: "Sub Branch", address: "Sector 7, Uttara, Dhaka", phone: "+880 1512-345678", email: "uttara@renova.com", manager: "Tania Khanam", status: "closed", opened: "22 Nov 2023", image: "/images/logo.png" },
];
export default function OutletDetailsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const o = outletData.find(item => item.id === id) || outletData[0];
    const perms = { doctorPortal: true, patientPortal: true, billing: true, pharmacy: true, lab: false, inventory: true };
    const permLabels = ["Doctor Portal", "Patient Portal", "Billing Module", "Pharmacy Module", "Lab Module", "Inventory Module"];
    const permKeys = ["doctorPortal", "patientPortal", "billing", "pharmacy", "lab", "inventory"];

    const InfoRow = ({ label, value, icon: IconComponent }) => (
        <div className="info-row">
            <IconComponent size={15} color="#94a3b8" />
            <div className="info-inner">
                <div className="info-label">{label}</div>
                <div className="info-value">{value}</div>
            </div>
        </div>
    );

    return (
        <div>
            <div className="rxd-sub-header">
                <div className="rxd-breadcrumb">
                    <span>Home</span>
                    <span className="rxd-breadcrumb-sep">›</span>
                    <span onClick={() => router.push("/supar-admin-panel/outlets")} className="rxd-breadcrumb-link">Outlets</span>
                    <span className="rxd-breadcrumb-sep">›</span>
                    <span className="rxd-breadcrumb-current">Outlet Details</span>
                </div>
                <div className="rxd-header-actions">
                    <button onClick={() => router.push("/supar-admin-panel/outlets")} className="rxd-header-btn rxd-btn-back">
                        <ArrowLeft size={14} color="#475569" /> Back
                    </button>
                    <button onClick={() => router.push(`/supar-admin-panel/outlets/update-outlet?id=${o.id}`)} className="rxd-header-btn rxd-btn-primary">
                        <Edit size={14} color="#fff" /> Edit Outlet
                    </button>
                    <button onClick={() => { if (confirm(`Delete ${o.name}?`)) { router.push("/supar-admin-panel/outlets"); } }} className="rxd-header-btn rxd-btn-danger">
                        <Trash2 size={14} color="#ef4444" /> Delete
                    </button>
                </div>
            </div>

            <div className="details-grid">
                <div className="details-left">
                    <div className="identity-card">
                        <div className="identity-header">
                            <div className="identity-header-top">
                                <div />
                                <StatusBadge status={o.status} />
                            </div>
                            <div className="identity-avatar-wrap">
                                <div className="identity-avatar"><img src={o.image} alt={o.name} /></div>
                                <div className="identity-name-block">
                                    <div className="identity-name">{o.name}</div>
                                    <div className="identity-id">{o.id}</div>
                                </div>
                            </div>
                        </div>
                        <div className="identity-body">
                            <div className="identity-tags"><span className="type-badge">{o.type}</span><span className="verified-badge">Verified Outlet</span></div>
                            <div className="info-section">
                                <InfoRow label="Outlet ID" value={o.id} icon={Award} />
                                <InfoRow label="Manager" value={o.manager} icon={UserIcon} />
                                <InfoRow label="Phone" value={o.phone} icon={Phone} />
                                <InfoRow label="Email" value={o.email} icon={Mail} />
                                <InfoRow label="Opened" value={o.opened} icon={Calendar} />
                                <InfoRow label="Operating Hours" value="9:00 AM - 9:00 PM" icon={Clock} />
                                <div className="info-row info-row--full">
                                    <MapPin size={15} color="#94a3b8" />
                                    <div className="info-inner">
                                        <div className="info-label">Address</div>
                                        <div className="info-value">{o.address}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="permissions-card">
                        <div className="card-header">
                            <Shield size={17} color="#016a1f" />
                            <span>Module Access</span>
                        </div>
                        <div className="permissions-details-grid">
                            {permKeys.map((k, i) => (
                                <div key={k} className={`perm-item ${perms[k] ? "enabled" : "disabled"}`}>
                                    <div className="perm-item-left">
                                        <div className="perm-icon">
                                            {perms[k] ? <Check size={13} color="#16a34a" /> : <Lock size={13} color="#94a3b8" />}
                                        </div>
                                        <span>{permLabels[i]}</span>
                                    </div>
                                    <label className="perm-toggle">
                                        <input type="checkbox" defaultChecked={perms[k]} readOnly />
                                        <span className="perm-toggle-track" />
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="details-right">
                    <div className="quick-stats-card">
                        <div className="card-header">Quick Stats</div>
                        {[
                            { label: "Total Staff", value: "24", color: "#014fa1", bg: "#eff6ff" },
                            { label: "Total Doctors", value: "8", color: "#16a34a", bg: "#f0fdf4" },
                            { label: "Patients Served", value: "3,420", color: "#7c3aed", bg: "#faf5ff" },
                            { label: "Avg. Rating", value: "4.7 / 5", color: "#ca8a04", bg: "#fefce8" },
                        ].map(st => (<div key={st.label} className="quick-stat"><span>{st.label}</span><span className="stat-value-sm" style={{ background: st.bg, color: st.color }}>{st.value}</span></div>))}
                    </div>

                    <div className="documents-card">
                        <div className="card-header">Documents</div>
                        {[
                            { name: "Trade License", status: "verified" },
                            { name: "Health Permit", status: "verified" },
                            { name: "Fire Safety Cert", status: "pending" },
                        ].map(doc => (
                            <div key={doc.name} className="doc-item">
                                <div>
                                    <FileText size={14} color={doc.status === "verified" ? "#16a34a" : "#f59e0b"} />
                                    <span>{doc.name}</span>
                                </div>
                                <span className={`doc-status ${doc.status}`}>{doc.status === "verified" ? "Verified" : "Pending"}</span>
                            </div>
                        ))}
                    </div>

                    <div className="account-card">
                        <div className="card-header">Outlet Info</div>
                        <div className="account-row"><span>Type</span><span>{o.type}</span></div>
                        <div className="account-row"><span>Manager</span><span>{o.manager}</span></div>
                        <div className="account-row"><span>Status</span><StatusBadge status={o.status} /></div>
                        <div className="account-row"><span>Opened</span><span>{o.opened}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}