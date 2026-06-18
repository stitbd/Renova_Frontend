"use client";
import { StatusBadge } from "../StaffFormComponents";
import { useRouter, useSearchParams } from "next/navigation";
import "./staff-profile.css";
import {
    User,
    Mail,
    Phone,
    Calendar,
    MapPin,
    Award,
    Shield,
    File,
    Edit,
    Trash2,
    ArrowLeft,
    Check,
    Lock,
    BadgeCheck,
    Users,
    Clock,
    Star,
    FileText,
    Eye,
    EyeOff
} from "lucide-react";

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

    const getIcon = (iconName) => {
        const icons = {
            user: User,
            mail: Mail,
            phone: Phone,
            calendar: Calendar,
            map: MapPin,
            badge: Award,
            shield: Shield,
            file: File,
            edit: Edit,
            trash: Trash2,
            back: ArrowLeft,
            check: Check,
            lock: Lock,
            badgeCheck: BadgeCheck,
            users: Users,
            clock: Clock,
            star: Star,
            fileText: FileText,
            eye: Eye,
            eyeOff: EyeOff
        };
        return icons[iconName] || User;
    };

    const InfoRow = ({ label, value, icon }) => {
        const IconComponent = getIcon(icon);
        return (
            <div className="info-row">
                <IconComponent size={15} color="#94a3b8" />
                <div className="info-inner">
                    <div className="info-label">{label}</div>
                    <div className="info-value">{value}</div>
                </div>
            </div>
        );
    };

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
                    <button onClick={() => router.push("/supar-admin-panel/staff")} className="rxd-header-btn rxd-btn-back">
                        <ArrowLeft size={14} color="#475569" /> Back
                    </button>
                    <button onClick={() => router.push(`/supar-admin-panel/staff/update-staff?id=${s.id}`)} className="rxd-header-btn rxd-btn-primary">
                        <Edit size={14} color="#fff" /> Edit Staff
                    </button>
                    <button onClick={() => { if (confirm(`Delete ${s.name}?`)) { router.push("/supar-admin-panel/staff"); } }} className="rxd-header-btn rxd-btn-danger">
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
                                    <MapPin size={15} color="#94a3b8" />
                                    <div className="info-inner">
                                        <div className="info-label">Address</div>
                                        <div className="info-value">House 12, Road 5, Dhanmondi, Dhaka</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="permissions-card">
                        <div className="card-header">
                            <Shield size={17} color="#016a1f" />
                            <span>Access Permissions</span>
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
                        ].map(doc => (
                            <div key={doc.name} className="doc-item">
                                <div>
                                    <File size={14} color={doc.status === "verified" ? "#16a34a" : "#f59e0b"} />
                                    <span>{doc.name}</span>
                                </div>
                                <span className={`doc-status ${doc.status}`}>{doc.status === "verified" ? "Verified" : "Pending"}</span>
                            </div>
                        ))}
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