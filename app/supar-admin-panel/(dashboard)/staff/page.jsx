"use client";
// OutletStaffPage.jsx
import { useState } from "react";
import "./outlet-staff.css";
import { StatusBadge } from "./StaffFormComponents";
import { useRouter, useSearchParams } from "next/navigation";

// Inline Icon component
function Icon({ n, s = 16, c = "currentColor", cls = "" }) {
    const p = {
        staff: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm12 14v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
        check: "M20 6 9 17l-5-5",
        eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 12m-3 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0",
        lock: "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
        plus: "M12 5v14M5 12h14",
        chevDown: "M6 9l6 6 6-6",
        search: "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z",
        filter: "M22 3H2l8 9.46V19l4 2V12.46L22 3z",
        edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
        trash: "M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14z",
        user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
        mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
        phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
        calendar: "M3 4h18v18H3zM16 2v4M8 2v4M3 10h18",
        map: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 7v.01",
        badge: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76zM9 12l2 2 4-4",
        shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
        upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
        file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6",
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

export default function OutletStaffPage() {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [outletFilter, setOutletFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showRoleDropdown, setShowRoleDropdown] = useState(false);
    const [showOutletDropdown, setShowOutletDropdown] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const router = useRouter();
    const [staffList, setStaffList] = useState(staffData);

    const stats = [
        { label: "Total Staff", value: staffList.length, color: "#014fa1", bg: "#dbeafe", cls: "blue", icon: "staff" },
        { label: "Active", value: staffList.filter(s => s.status === "active").length, color: "#16a34a", bg: "#dcfce7", cls: "green", icon: "check" },
        { label: "Inactive", value: staffList.filter(s => s.status === "inactive").length, color: "#64748b", bg: "#e2e8f0", cls: "slate", icon: "eye" },
        { label: "Suspended", value: staffList.filter(s => s.status === "suspended").length, color: "#ef4444", bg: "#fee2e2", cls: "red", icon: "lock" },
    ];

    const filtered = staffList.filter(s => {
        const q = search.toLowerCase();
        if (q && !s.name.toLowerCase().includes(q) && !s.id.toLowerCase().includes(q) && !s.email.toLowerCase().includes(q)) return false;
        if (roleFilter !== "all" && s.role !== roleFilter) return false;
        if (outletFilter !== "all" && s.outlet !== outletFilter) return false;
        if (statusFilter !== "all" && s.status !== statusFilter) return false;
        return true;
    });

    const tableHeaders = ["Staff", "Role", "Outlet", "Contact", "Joined", "Status", "Actions"];

    return (
        <div>
            <div className="stats-grid">
                {stats.map(stat => (
                    <div key={stat.label} className={`stat-card ${stat.cls}`}>
                        <div className="stat-icon" style={{ background: stat.bg }}>
                            <Icon n={stat.icon} s={20} c={stat.color} />
                        </div>
                        <div>
                            <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="staff-filter-bar">
                <div className="staff-filter-group">
                    <div className="staff-filter-group-row">
                        <div className="staff-filter-dropdown">
                            <button
                                className="staff-filter-item"
                                onClick={() => {
                                    setShowRoleDropdown(v => !v);
                                    setShowOutletDropdown(false);
                                    setShowStatusDropdown(false);
                                }}
                            >
                                <span>{roleFilter === "all" ? "All Roles" : roleFilter}</span>
                                <Icon n="chevDown" s={13} c="#94a3b8" cls="staff-filter-chevron" />
                            </button>
                            {showRoleDropdown && (
                                <div className="staff-dropdown">
                                    {["all", "Receptionist", "Nurse", "Lab Technician", "Pharmacist", "Admin Assistant"].map(r => (
                                        <div
                                            key={r}
                                            className="staff-dropdown-item"
                                            onClick={() => {
                                                setRoleFilter(r);
                                                setShowRoleDropdown(false);
                                            }}
                                        >
                                            {r === "all" ? "All Roles" : r}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div style={{ position: "relative", flex: 1 }}>
                            <button
                                className="staff-filter-item"
                                onClick={() => {
                                    setShowOutletDropdown(v => !v);
                                    setShowRoleDropdown(false);
                                    setShowStatusDropdown(false);
                                }}
                            >
                                <span>{outletFilter === "all" ? "All Outlets" : outletFilter}</span>
                                <Icon n="chevDown" s={13} c="#94a3b8" cls="staff-filter-chevron" />
                            </button>
                            {showOutletDropdown && (
                                <div className="staff-dropdown">
                                    {["all", "Renova Dhanmondi", "Renova Mirpur", "Renova Chattogram", "Renova Sylhet"].map(o => (
                                        <div
                                            key={o}
                                            className="staff-dropdown-item"
                                            onClick={() => {
                                                setOutletFilter(o);
                                                setShowOutletDropdown(false);
                                            }}
                                        >
                                            {o === "all" ? "All Outlets" : o}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div style={{ position: "relative", flex: 1 }}>
                            <button
                                className="staff-filter-item"
                                onClick={() => {
                                    setShowStatusDropdown(v => !v);
                                    setShowRoleDropdown(false);
                                    setShowOutletDropdown(false);
                                }}
                            >
                                <span>{statusFilter === "all" ? "All Status" : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}</span>
                                <Icon n="chevDown" s={13} c="#94a3b8" cls="staff-filter-chevron" />
                            </button>
                            {showStatusDropdown && (
                                <div className="staff-dropdown">
                                    {[
                                        ["all", "All Status"],
                                        ["active", "Active"],
                                        ["inactive", "Inactive"],
                                        ["suspended", "Suspended"]
                                    ].map(([val, label]) => (
                                        <div
                                            key={val}
                                            className="staff-dropdown-item"
                                            onClick={() => {
                                                setStatusFilter(val);
                                                setShowStatusDropdown(false);
                                            }}
                                        >
                                            {label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="staff-search-box">
                    <Icon n="search" s={15} c="#94a3b8" />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search staff by name, ID or email..."
                    />
                </div>

                <div className="staff-filter-actions">
                    <button className="staff-apply-btn">
                        <Icon n="filter" s={14} c="#fff" /> Apply Filter
                    </button>
                    <button
                        onClick={() => {
                            setSearch("");
                            setRoleFilter("all");
                            setOutletFilter("all");
                            setStatusFilter("all");
                        }}
                        className="staff-reset-btn"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <div className="table-container">
                <div className="table-header">
                    <span>Staff List ({filtered.length})</span>
                    <button onClick={() => router.push("/supar-admin-panel/staff/new-staff")} className="btn-primary-green">
                        <Icon n="plus" s={15} c="#fff" /> Add New Staff
                    </button>
                </div>
                <div className="table-wrapper">
                    <table className="staff-table">
                        <thead>
                            <tr>
                                {tableHeaders.map(header => (
                                    <th key={header}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((staff) => (
                                <tr key={staff.id}>
                                    <td>
                                        <div className="staff-cell">
                                            <img src={staff.avatar} alt={staff.name} />
                                            <div>
                                                <div className="staff-name">{staff.name}</div>
                                                <div className="staff-id">{staff.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="role-badge">{staff.role}</span>
                                    </td>
                                    <td>{staff.outlet}</td>
                                    <td>
                                        <div>{staff.phone}</div>
                                        <div className="staff-email">{staff.email}</div>
                                    </td>
                                    <td>{staff.joined}</td>
                                    <td>
                                        <StatusBadge status={staff.status} />
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                onClick={() => router.push(`/supar-admin-panel/staff/staff-profile?id=${staff.id}`)}
                                                className="action-btn"
                                            >
                                                <Icon n="eye" s={14} c="#64748b" />
                                            </button>
                                            <button
                                                onClick={() => router.push(`/supar-admin-panel/staff/update-staff?id=${staff.id}`)}
                                                className="action-btn"
                                            >
                                                <Icon n="edit" s={14} c="#64748b" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (confirm(`Delete ${staff.name}? This action cannot be undone.`)) {
                                                        setStaffList(prev => prev.filter(item => item.id !== staff.id));
                                                    }
                                                }}
                                                className="action-btn"
                                            >
                                                <Icon n="trash" s={14} c="#64748b" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="staff-mobile-list">
                    {filtered.map((staff) => (
                        <div key={staff.id} className="staff-card">
                            <div className="staff-card-top">
                                <div className="staff-card-profile">
                                    <img src={staff.avatar} alt={staff.name} />
                                    <div>
                                        <div className="staff-name">{staff.name}</div>
                                        <div className="staff-id">{staff.id}</div>
                                    </div>
                                </div>
                                <StatusBadge status={staff.status} />
                            </div>

                            <div className="staff-card-info-grid">
                                <div>
                                    <div className="staff-card-field-label">Role</div>
                                    <div className="staff-card-field-value">
                                        <span className="role-badge">{staff.role}</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="staff-card-field-label">Outlet</div>
                                    <div className="staff-card-field-value">{staff.outlet}</div>
                                </div>
                                <div>
                                    <div className="staff-card-field-label">Phone</div>
                                    <div className="staff-card-field-value">{staff.phone}</div>
                                </div>
                                <div>
                                    <div className="staff-card-field-label">Email</div>
                                    <div className="staff-card-field-value muted">{staff.email}</div>
                                </div>
                                <div>
                                    <div className="staff-card-field-label">Joined</div>
                                    <div className="staff-card-field-value muted">{staff.joined}</div>
                                </div>
                            </div>

                            <div className="staff-card-actions">
                                <button
                                    onClick={() => router.push(`/supar-admin-panel/staff/staff-profile?id=${staff.id}`)}
                                    className="action-btn"
                                >
                                    <Icon n="eye" s={14} c="#64748b" />
                                    <span>View</span>
                                </button>
                                <button
                                    onClick={() => router.push(`/supar-admin-panel/staff/update-staff?id=${staff.id}`)}
                                    className="action-btn"
                                >
                                    <Icon n="edit" s={14} c="#64748b" />
                                    <span>Edit</span>
                                </button>
                                <button
                                    onClick={() => {
                                        if (confirm(`Delete ${staff.name}? This action cannot be undone.`)) {
                                            setStaffList(prev => prev.filter(item => item.id !== staff.id));
                                        }
                                    }}
                                    className="action-btn"
                                >
                                    <Icon n="trash" s={14} c="#64748b" />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="empty-state">
                        <Icon n="search" s={32} c="#cbd5e1" />
                        <div>No staff found</div>
                        <div>Try adjusting your filters</div>
                    </div>
                )}
                <div className="table-footer">
                    <span>Showing 1–{Math.min(10, filtered.length)} of {filtered.length} entries</span>
                    <div className="pagination">
                        {["1", "2", "3"].map(pageNum => (
                            <button key={pageNum} className={`page-btn ${pageNum === "1" ? "active" : ""}`}>
                                {pageNum}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}