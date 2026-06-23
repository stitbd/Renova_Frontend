// NewOutletPage.jsx
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Field, Input, Select, Textarea, Toggle, UploadBox, SectionCard, Grid2 } from "../OutletFormComponents";
import "./new-outlet.css";

export const outletData = [
    { id: "OUT-2025-000014", name: "Renova Dhanmondi", type: "Main Branch", address: "House 12, Road 5, Dhanmondi, Dhaka", phone: "+880 1812-345678", email: "dhanmondi@renova.com", manager: "Nadia Islam", status: "active", opened: "01 Jan 2023", image: "https://i.pravatar.cc/80?img=31" },
    { id: "OUT-2025-000013", name: "Renova Mirpur", type: "Sub Branch", address: "Sec 6, Mirpur, Dhaka", phone: "+880 1712-345678", email: "mirpur@renova.com", manager: "Karim Ahmed", status: "active", opened: "15 Mar 2023", image: "https://i.pravatar.cc/80?img=32" },
    { id: "OUT-2025-000012", name: "Renova Chattogram", type: "Sub Branch", address: "GEC Circle, Chattogram", phone: "+880 1912-345678", email: "ctg@renova.com", manager: "Sumaiya Begum", status: "inactive", opened: "20 Jun 2023", image: "https://i.pravatar.cc/80?img=33" },
    { id: "OUT-2025-000011", name: "Renova Sylhet", type: "Sub Branch", address: "Zindabazar, Sylhet", phone: "+880 1612-345678", email: "sylhet@renova.com", manager: "Rafiqul Islam", status: "active", opened: "05 Sep 2023", image: "https://i.pravatar.cc/80?img=34" },
    { id: "OUT-2025-000010", name: "Renova Uttara", type: "Sub Branch", address: "Sector 7, Uttara, Dhaka", phone: "+880 1512-345678", email: "uttara@renova.com", manager: "Tania Khanam", status: "closed", opened: "22 Nov 2023", image: "https://i.pravatar.cc/80?img=35" },
];
export default function NewOutletPage() {
    const router = useRouter();
    const [toggles, setToggles] = useState({ doctorPortal: true, patientPortal: true, billing: true, pharmacy: false, lab: false, inventory: true });
    const [active, setActive] = useState(true);
    const [confirmed, setConfirmed] = useState(false);

    return (
        <div>
            <div className="page-header">
                <div>
                    <div className="page-breadcrumb">Home · Outlets · <span className="breadcrumb-active">Add New Outlet</span></div>
                </div>
                <div className="page-actions">
                    <button onClick={() => router.push("/supar-admin-panel/outlets")} className="btn-secondary-outline">Cancel</button>
                    <button onClick={() => router.push("/supar-admin-panel/outlets")} className="btn-primary-green">
                        Create Outlet
                    </button>
                </div>
            </div>

            <SectionCard title="Outlet Information" icon="user">
                <Grid2>
                    <Field label="Outlet ID (Auto-generated)">
                        <Input value="OUT-2025-000015" readOnly className="input-readonly" />
                    </Field>
                    <Field label="Outlet Name" required>
                        <Input icon="user" placeholder="Enter outlet name" />
                    </Field>
                </Grid2>
                <div className="mt-4">
                    <Grid2>
                        <Field label="Outlet Type" required>
                            <Select>
                                <option value="">Select outlet type</option>
                                <option>Main Branch</option>
                                <option>Sub Branch</option>
                            </Select>
                        </Field>
                        <Field label="Outlet Manager" required>
                            <Select>
                                <option value="">Select manager</option>
                                <option>Nadia Islam</option>
                                <option>Karim Ahmed</option>
                                <option>Sumaiya Begum</option>
                                <option>Rafiqul Islam</option>
                            </Select>
                        </Field>
                    </Grid2>
                </div>
                <div className="mt-4">
                    <Grid2>
                        <Field label="Mobile Number" required>
                            <div className="phone-input-group">
                                <div className="country-code">
                                    <span className="flag">🇧🇩</span>
                                    <span>+880</span>
                                </div>
                                <Input placeholder="Enter outlet phone number" />
                            </div>
                        </Field>
                        <Field label="Email Address">
                            <Input icon="mail" placeholder="Enter outlet email address" />
                        </Field>
                    </Grid2>
                </div>
                <div className="mt-4">
                    <Field label="Address" required>
                        <div className="textarea-icon-wrapper">
                            <span className="textarea-icon"></span>
                            <Textarea placeholder="Enter full outlet address" />
                        </div>
                    </Field>
                </div>
                <div className="mt-4">
                    <Grid2>
                        <Field label="Opening Date">
                            <Input type="date" icon="calendar" />
                        </Field>
                        <Field label="Operating Hours">
                            <Input placeholder="e.g. 9:00 AM - 9:00 PM" />
                        </Field>
                    </Grid2>
                </div>
                <div className="mt-4">
                    <UploadBox label="Upload outlet image" sub="PNG, JPG up to 2MB" icon="user" />
                </div>
            </SectionCard>

            <SectionCard title="Module Access" icon="shield">
                <div className="permissions-grid">
                    {[
                        { key: "doctorPortal", label: "Doctor Portal" },
                        { key: "patientPortal", label: "Patient Portal" },
                        { key: "billing", label: "Billing Module" },
                        { key: "pharmacy", label: "Pharmacy Module" },
                        { key: "lab", label: "Lab Module" },
                        { key: "inventory", label: "Inventory Module" },
                    ].map(p => (
                        <div key={p.key} className="permission-card">
                            <div className="permission-label">{p.label}</div>
                            <Toggle checked={toggles[p.key]} onChange={v => setToggles(t => ({ ...t, [p.key]: v }))} label="" />
                        </div>
                    ))}
                </div>
            </SectionCard>

            <SectionCard title="Outlet Status" icon="badge">
                <div className="status-box success">
                    <Toggle checked={active} onChange={setActive} label="Active" desc="Outlet will be active and visible to patients" />
                </div>
            </SectionCard>

            <div className="form-footer">
                <label className="checkbox-label">
                    <input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} />
                    I confirm all information is correct
                </label>
                <div className="footer-buttons">
                    <button onClick={() => router.push("/supar-admin-panel/outlets")} className="btn-secondary-outline">Cancel</button>
                    <button onClick={() => router.push("/supar-admin-panel/outlets")} className="btn-primary">
                        Create Outlet
                    </button>
                </div>
            </div>
        </div>
    );
}