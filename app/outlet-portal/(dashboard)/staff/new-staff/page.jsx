"use client";
// NewStaffPage.jsx
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Field, Input, Select, Textarea, Toggle, UploadBox, SectionCard, Grid2, Grid3 } from "../StaffFormComponents";
import "./new-staff.css";

// Inline Icon component (same as above)
function Icon({ n, s = 16, c = "currentColor", cls = "" }) {
    const p = {
        user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
        mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
        phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
        calendar: "M3 4h18v18H3zM16 2v4M8 2v4M3 10h18",
        map: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 7v.01",
        chevDown: "M6 9l6 6 6-6",
        eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 12m-3 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0",
        eyeOff: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22",
        shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
        upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
        file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6",
        check: "M20 6 9 17l-5-5",
        plus: "M12 5v14M5 12h14",
        back: "M19 12H5M12 19l-7-7 7-7",
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

export default function NewStaffPage() {
    const router = useRouter();
    const [showPass, setShowPass] = useState(false);
    const [toggles, setToggles] = useState({ dashboard: true, patient: true, reports: true, inventory: false, financial: false, settings: true });
    const [active, setActive] = useState(true);
    const [confirmed, setConfirmed] = useState(false);

    return (
        <div>
            <div className="page-header">
                <div>
                    <div className="page-breadcrumb">Home · Outlet Staff · <span className="breadcrumb-active">Add New Staff</span></div>
                </div>
                <div className="page-actions">
                    <button onClick={() => router.push("/outlet-portal/staff")} className="btn-secondary-outline">Cancel</button>
                    <button onClick={() => router.push("/outlet-portal/staff")} className="btn-primary-green">
                        <Icon n="user" s={14} c="#fff" /> Create Staff Account
                    </button>
                </div>
            </div>

            <SectionCard title="Staff Information" icon="user">
                <Grid2>
                    <Field label="Staff ID (Auto-generated)">
                        <Input value="STF-2025-000124" readOnly className="input-readonly" />
                    </Field>
                    <Field label="Full Name" required>
                        <Input icon="user" placeholder="Enter full name" />
                    </Field>
                </Grid2>
                <div className="mt-4">
                    <Grid2>
                        <Field label="Mobile Number" required>
                            <div className="phone-input-group">
                                <div className="country-code">
                                    <span className="flag">🇧🇩</span>
                                    <Icon n="chevDown" s={13} c="#94a3b8" />
                                    <span>+880</span>
                                </div>
                                <Input placeholder="Enter mobile number" />
                                <button className="btn-otp">Send OTP</button>
                            </div>
                        </Field>
                        <Field label="Email Address">
                            <Input icon="mail" placeholder="Enter email address" />
                        </Field>
                    </Grid2>
                </div>
                <div className="mt-4">
                    <Grid2>
                        <Field label="Role / Designation" required>
                            <Select>
                                <option value="">Select role / designation</option>
                                <option>Receptionist</option>
                                <option>Nurse</option>
                                <option>Lab Technician</option>
                                <option>Pharmacist</option>
                                <option>Admin Assistant</option>
                            </Select>
                        </Field>
                        <Field label="Outlet" required>
                            <Select>
                                <option value="">Select outlet</option>
                                <option>Renova Dhanmondi</option>
                                <option>Renova Mirpur</option>
                                <option>Renova Chattogram</option>
                                <option>Renova Sylhet</option>
                            </Select>
                        </Field>
                    </Grid2>
                </div>
                <div className="mt-4">
                    <Grid2>
                        <Field label="Username" required>
                            <Input icon="user" placeholder="Enter username" />
                        </Field>
                        <Field label="Password" required>
                            <div className="password-wrapper">
                                <Input type={showPass ? "text" : "password"} placeholder="Enter password" />
                                <button onClick={() => setShowPass(!showPass)} className="password-toggle">
                                    <Icon n={showPass ? "eyeOff" : "eye"} s={16} c="#94a3b8" />
                                </button>
                                <div className="strength-bar"><div className="strength-fill weak" /></div>
                                <div className="strength-text weak">Password strength: <strong>Weak</strong></div>
                            </div>
                        </Field>
                    </Grid2>
                </div>
                <div className="mt-4">
                    <Grid2>
                        <Field label="Gender">
                            <Select><option value="">Select gender</option><option>Male</option><option>Female</option><option>Other</option></Select>
                        </Field>
                        <Field label="Date of Birth">
                            <Input type="date" icon="calendar" />
                        </Field>
                    </Grid2>
                </div>
                <div className="mt-4">
                    <Field label="Address">
                        <div className="textarea-icon-wrapper">
                            <span className="textarea-icon"><Icon n="map" s={15} c="#94a3b8" /></span>
                            <Textarea placeholder="Enter full address" />
                        </div>
                    </Field>
                </div>
                <div className="mt-4">
                    <Grid2>
                        <UploadBox label="Upload profile image" sub="PNG, JPG up to 2MB" icon="user" />
                        <UploadBox label="Upload document" sub="PNG, JPG, PDF up to 5MB" icon="file" />
                    </Grid2>
                    <div className="upload-labels">
                        <div>Profile Image</div>
                        <div>Document Upload (NID / Certificate)</div>
                    </div>
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
                <div className="status-box success">
                    <Toggle checked={active} onChange={setActive} label="Active" desc="Staff account will be active" />
                </div>
            </SectionCard>

            <div className="form-footer">
                <label className="checkbox-label">
                    <input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} />
                    I confirm all information is correct
                </label>
                <div className="footer-buttons">
                    <button onClick={() => router.push("/outlet-portal/staff")} className="btn-secondary-outline">Cancel</button>
                    <button onClick={() => router.push("/outlet-portal/staff")} className="btn-primary">
                        <Icon n="user" s={15} c="#fff" /> Create Staff Account
                    </button>
                </div>
            </div>
        </div>
    );
}