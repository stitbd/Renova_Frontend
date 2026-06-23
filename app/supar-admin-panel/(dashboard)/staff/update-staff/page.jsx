// UpdateStaffPage.jsx
"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Field, Input, Select, Textarea, Toggle, UploadBox, SectionCard, Grid2 } from "../StaffFormComponents";
import "./update-staff.css";
import {
    User,
    Mail,
    Phone,
    Calendar,
    MapPin,
    ChevronDown,
    Eye,
    EyeOff,
    Shield,
    Upload,
    File,
    Check,
    ArrowLeft,
    Award,
    Users,
    Lock,
    CheckCircle,
    LogOut
} from "lucide-react";

export const staffData = [
    { id: "STF-2025-000124", name: "Nadia Islam", role: "Receptionist", outlet: "Renova Dhanmondi", phone: "+880 1812-345678", email: "nadia@renova.com", status: "active", joined: "01 Jan 2025", avatar: "https://i.pravatar.cc/80?img=5" },
    { id: "STF-2025-000123", name: "Karim Ahmed", role: "Lab Technician", outlet: "Renova Mirpur", phone: "+880 1712-345678", email: "karim@renova.com", status: "active", joined: "15 Dec 2024", avatar: "https://i.pravatar.cc/80?img=11" },
    { id: "STF-2025-000122", name: "Sumaiya Begum", role: "Nurse", outlet: "Renova Chattogram", phone: "+880 1912-345678", email: "sumaiya@renova.com", status: "inactive", joined: "20 Nov 2024", avatar: "https://i.pravatar.cc/80?img=9" },
    { id: "STF-2025-000121", name: "Rafiqul Islam", role: "Pharmacist", outlet: "Renova Sylhet", phone: "+880 1612-345678", email: "rafiq@renova.com", status: "active", joined: "05 Oct 2024", avatar: "https://i.pravatar.cc/80?img=12" },
    { id: "STF-2025-000120", name: "Tania Khanam", role: "Admin Assistant", outlet: "Renova Dhanmondi", phone: "+880 1512-345678", email: "tania@renova.com", status: "active", joined: "22 Sep 2024", avatar: "https://i.pravatar.cc/80?img=16" },
    { id: "STF-2025-000119", name: "Momin Hossain", role: "Receptionist", outlet: "Renova Mirpur", phone: "+880 1412-345678", email: "momin@renova.com", status: "suspended", joined: "10 Aug 2024", avatar: "https://i.pravatar.cc/80?img=14" },
];

export default function UpdateStaffPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const staff = staffData.find(item => item.id === id) || staffData[0];
    const [showPass, setShowPass] = useState(false);
    const [toggles, setToggles] = useState({ dashboard: true, patient: true, reports: true, inventory: true, financial: false, settings: true });
    const [active, setActive] = useState(true);

    return (
        <div>
            <div className="page-header">
                <div>
                    <div className="page-breadcrumb">Home · Outlet Staff · <span className="breadcrumb-active">Edit Staff</span></div>
                </div>
                <div className="page-actions">
                    <button onClick={() => router.push("/supar-admin-panel/staff")} className="btn-secondary-outline">
                        <ArrowLeft size={14} color="#475569" /> Back
                    </button>
                    <button onClick={() => router.push("/supar-admin-panel/staff")} className="btn-primary-green">
                        <Check size={14} color="#fff" /> Update Staff
                    </button>
                </div>
            </div>

            <div className="alert-banner info">
                <Award size={16} color="#014fa1" />
                <span>Editing: <strong>{staff.id}</strong> — {staff.name} · {staff.role} · {staff.outlet}</span>
            </div>

            <SectionCard title="Staff Information" icon="user">
                <Grid2>
                    <Field label="Staff ID"><Input value="STF-2025-000098" readOnly className="input-readonly" /></Field>
                    <Field label="Full Name" required><Input icon="user" defaultValue="Nadia Islam" /></Field>
                </Grid2>
                <div className="mt-4">
                    <Grid2>
                        <Field label="Mobile Number" required>
                            <div className="phone-input-group">
                                <div className="country-code"><span className="flag">🇧🇩</span><ChevronDown size={13} color="#94a3b8" /><span>+880</span></div>
                                <Input defaultValue="1812345678" />
                            </div>
                        </Field>
                        <Field label="Email Address"><Input icon="mail" defaultValue="nadia.islam@renova.com" /></Field>
                    </Grid2>
                </div>
                <div className="mt-4">
                    <Grid2>
                        <Field label="Role / Designation" required><Select defaultValue="Receptionist"><option>Receptionist</option><option>Nurse</option><option>Lab Technician</option><option>Pharmacist</option><option>Admin Assistant</option></Select></Field>
                        <Field label="Outlet" required><Select defaultValue="Renova Dhanmondi"><option>Renova Dhanmondi</option><option>Renova Mirpur</option><option>Renova Chattogram</option></Select></Field>
                    </Grid2>
                </div>
                <div className="mt-4">
                    <Grid2>
                        <Field label="Username" required><Input icon="user" defaultValue="nadia.islam98" /></Field>
                        <Field label="New Password" hint="Leave blank to keep existing password">
                            <div className="password-wrapper">
                                <Input type={showPass ? "text" : "password"} placeholder="Enter new password (optional)" />
                                <button onClick={() => setShowPass(!showPass)} className="password-toggle">
                                    {showPass ? <EyeOff size={16} color="#94a3b8" /> : <Eye size={16} color="#94a3b8" />}
                                </button>
                            </div>
                        </Field>
                    </Grid2>
                </div>
                <div className="mt-4">
                    <Grid2>
                        <Field label="Gender"><Select defaultValue="Female"><option>Male</option><option>Female</option><option>Other</option></Select></Field>
                        <Field label="Date of Birth"><Input type="date" defaultValue="1998-06-15" /></Field>
                    </Grid2>
                </div>
                <div className="mt-4"><Field label="Address"><Textarea defaultValue="House 12, Road 5, Dhanmondi, Dhaka" /></Field></div>
                <div className="mt-4">
                    <Grid2>
                        <div>
                            <div className="field-label">Profile Image</div>
                            <div className="profile-image-group">
                                <div className="profile-image-preview"><img src="https://i.pravatar.cc/120?img=5" alt="staff" /></div>
                                <UploadBox label="Change photo" sub="PNG, JPG up to 2MB" icon="upload" />
                            </div>
                        </div>
                        <UploadBox label="Upload new document" sub="PNG, JPG, PDF up to 5MB" icon="file" />
                    </Grid2>
                </div>
            </SectionCard>

            <SectionCard title="Access Permissions" icon="shield">
                <div className="permissions-grid">
                    {[
                        { key: "dashboard", label: "Dashboard Access" },
                        { key: "patient", label: "Patient Management" },
                        { key: "reports", label: "Reports Access" },
                        { key: "inventory", label: "Inventory Access" },
                        { key: "financial", label: "Financial Access" },
                        { key: "settings", label: "Settings Access" },
                    ].map(p => (
                        <div key={p.key} className="permission-card">
                            <div className="permission-label">{p.label}</div>
                            <Toggle checked={toggles[p.key]} onChange={v => setToggles(t => ({ ...t, [p.key]: v }))} label="" />
                        </div>
                    ))}
                </div>
            </SectionCard>

            <SectionCard title="Account Status" icon="badge">
                <div className="status-box success"><Toggle checked={active} onChange={setActive} label="Active" desc="Staff account is currently active" /></div>
            </SectionCard>

            <div className="form-footer right">
                <div className="footer-buttons">
                    <button onClick={() => router.push("/supar-admin-panel/staff")} className="btn-secondary-outline">Cancel</button>
                    <button onClick={() => router.push("/supar-admin-panel/staff")} className="btn-primary">
                        <Check size={15} color="#fff" /> Update Staff
                    </button>
                </div>
            </div>
        </div>
    );
}