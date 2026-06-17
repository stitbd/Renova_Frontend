// StaffProfilePage.jsx
"use client";
import { StatusBadge } from "../StaffFormComponents";
import { useRouter, useSearchParams } from "next/navigation";
import "./staff-profile.css";

function Icon({ n, s = 16, c = "currentColor", cls = "" }) {
    const p = {
        user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
        mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
        phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
        calendar: "M3 4h18v18H3zM16 2v4M8 2v4M3 10h18",
        map: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 7v.01",
        badge: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76zM9 12l2 2 4-4",
        shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
        file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6",
        edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
        trash: "M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z",
        back: "M19 12H5M12 19l-7-7 7-7",
        check: "M20 6 9 17l-5-5",
        lock: "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
    };
    return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} className={cls}>
            <path d={p[n] || ""} />
        </svg>
    );
}

export const staffData = [
    { id: "STF-2025-000124", name: "Nadia Islam", role: "Receptionist", outlet: "Renova Dhanmondi", phone: "+880 1812-345678", email: "nadia@renova.com", status: "active", joined: "01 Jan 2025", avatar: "https://i.pravatar.cc/80?img=5" },
    { id: "STF-2025-000123", name: "Karim Ahmed", role: "Lab Technician", outlet: "Renova Mirpur", phone: "+880 1712-345678", email: "karim@renova.com", status: "active", joined: "15 Dec 2024", avatar: "https://i.pravatar.cc/80?img=11" },
    { id: "STF-2025-000122", name: "Sumaiya Begum", role: "Nurse", outlet: "Renova Chattogram", phone: "+880 1912-345678", email: "sumaiya@renova.com", status: "inactive", joined: "20 Nov 2024", avatar: "https://i.pravatar.cc/80?img=9" },
    { id: "STF-2025-000121", name: "Rafiqul Islam", role: "Pharmacist", outlet: "Renova Sylhet", phone: "+880 1612-345678", email: "rafiq@renova.com", status: "active", joined: "05 Oct 2024", avatar: "https://i.pravatar.cc/80?img=12" },
    { id: "STF-2025-000120", name: "Tania Khanam", role: "Admin Assistant", outlet: "Renova Dhanmondi", phone: "+880 1512-345678", email: "tania@renova.com", status: "active", joined: "22 Sep 2024", avatar: "https://i.pravatar.cc/80?img=16" },
    { id: "STF-2025-000119", name: "Momin Hossain", role: "Receptionist", outlet: "Renova Mirpur", phone: "+880 1412-345678", email: "momin@renova.com", status: "suspended", joined: "10 Aug 2024", avatar: "https://i.pravatar.cc/80?img=14" },
];


export default function StaffProfilePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const s = staffData.find(item => item.id === id) || staffData[0];
    const perms = { dashboard: true, patient: true, reports: true, inventory: true, financial: false, settings: true };
    const permLabels = ["Dashboard Access", "Patient Management", "Reports Access", "Inventory Access", "Financial Access", "Settings Access"];
    const permKeys = ["dashboard", "patient", "reports", "inventory", "financial", "settings"];

    const InfoRow = ({ label, value, icon }) => (
        <div className="info-row">
            <Icon n={icon} s={15} c="#94a3b8" />
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
                    <span onClick={() => router.push("/supar-admin-panel/staff")} className="rxd-breadcrumb-link">Outlet Staff</span>
                    <span className="rxd-breadcrumb-sep">›</span>
                    <span className="rxd-breadcrumb-current">Staff Details</span>
                </div>
                <div className="rxd-header-actions">
                    <button onClick={() => router.push("/supar-admin-panel/staff")} className="rxd-header-btn rxd-btn-back"><Icon n="back" s={14} c="#475569" /> Back</button>
                    <button onClick={() => router.push(`/supar-admin-panel/staff/update-staff?id=${s.id}`)} className="rxd-header-btn rxd-btn-primary"><Icon n="edit" s={14} c="#fff" /> Edit Staff</button>
                    <button onClick={() => { if (confirm(`Delete ${s.name}?`)) { router.push("/supar-admin-panel/staff"); } }} className="rxd-header-btn rxd-btn-danger"><Icon n="trash" s={14} c="#ef4444" /> Delete</button>
                </div>
            </div>

            <div className="details-grid">
                <div className="details-left">
                    <div className="identity-card">
                        <div className="identity-header">
                            <div className="identity-header-top">
                                <div />
                                <StatusBadge status={s.status} />
                            </div>
                            <div className="identity-avatar-wrap">
                                <div className="identity-avatar"><img src={s.avatar} alt={s.name} /></div>
                                <div className="identity-name-block">
                                    <div className="identity-name">{s.name}</div>
                                    <div className="identity-id">{s.id}</div>
                                </div>
                            </div>
                        </div>
                        <div className="identity-body">
                            <div className="identity-tags"><span className="role-badge">{s.role}</span><span className="outlet-badge">{s.outlet}</span><span className="verified-badge">BMDC Verified</span></div>
                            <div className="info-section">
                                <InfoRow label="Staff ID" value={s.id} icon="badge" />
                                <InfoRow label="Mobile" value={s.phone} icon="phone" />
                                <InfoRow label="Email" value={s.email} icon="mail" />
                                <InfoRow label="Date of Birth" value="15 Jun 1998" icon="calendar" />
                                <InfoRow label="Gender" value="Female" icon="user" />
                                <InfoRow label="Joined" value={s.joined} icon="calendar" />
                                <div className="info-row info-row--full">
                                    <Icon n="map" s={15} c="#94a3b8" />
                                    <div className="info-inner">
                                        <div className="info-label">Address</div>
                                        <div className="info-value">House 12, Road 5, Dhanmondi, Dhaka</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="permissions-card">
                        <div className="card-header"><Icon n="shield" s={17} c="#016a1f" /><span>Access Permissions</span></div>
                        <div className="permissions-details-grid">
                            {permKeys.map((k, i) => (
                                <div key={k} className={`perm-item ${perms[k] ? "enabled" : "disabled"}`}>
                                    <div className="perm-item-left">
                                        <div className="perm-icon">
                                            {perms[k] ? <Icon n="check" s={13} c="#16a34a" /> : <Icon n="lock" s={13} c="#94a3b8" />}
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
                            { label: "Patients Handled", value: "1,248", color: "#014fa1", bg: "#eff6ff" },
                            { label: "Months Active", value: "6", color: "#16a34a", bg: "#f0fdf4" },
                            { label: "Tasks Completed", value: "98%", color: "#7c3aed", bg: "#faf5ff" },
                            { label: "Avg. Rating", value: "4.8 / 5", color: "#ca8a04", bg: "#fefce8" },
                        ].map(st => (<div key={st.label} className="quick-stat"><span>{st.label}</span><span className="stat-value-sm" style={{ background: st.bg, color: st.color }}>{st.value}</span></div>))}
                    </div>

                    <div className="documents-card">
                        <div className="card-header">Documents</div>
                        {[
                            { name: "National ID", status: "verified" },
                            { name: "BMDC Certificate", status: "verified" },
                            { name: "Work Permit", status: "pending" },
                        ].map(doc => (<div key={doc.name} className="doc-item"><div><Icon n="file" s={14} c={doc.status === "verified" ? "#16a34a" : "#f59e0b"} /><span>{doc.name}</span></div><span className={`doc-status ${doc.status}`}>{doc.status === "verified" ? "Verified" : "Pending"}</span></div>))}
                    </div>

                    <div className="account-card">
                        <div className="card-header">Account Info</div>
                        <div className="account-row"><span>Username</span><span>nadia.islam98</span></div>
                        <div className="account-row"><span>Last Login</span><span>Today, 09:42 AM</span></div>
                        <div className="account-row"><span>Account Status</span><StatusBadge status={s.status} /></div>
                        <div className="account-row"><span>Created</span><span>{s.joined}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}