"use client";
// OutletStaffPage.jsx
import { useState } from "react";
import "./outlet-staff.css";
import { motion } from "framer-motion";
import { StatusBadge } from "./StaffFormComponents";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Users,
    CheckCircle,
    Eye,
    Lock,
    ChevronDown,
    Search,
    Filter,
    Plus,
    Edit,
    Trash2
} from "lucide-react";

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
        { label: "Total Staff", value: staffList.length, color: "#014fa1", bg: "#dbeafe", cls: "blue", icon: Users },
        { label: "Active", value: staffList.filter(s => s.status === "active").length, color: "#16a34a", bg: "#dcfce7", cls: "green", icon: CheckCircle },
        { label: "Inactive", value: staffList.filter(s => s.status === "inactive").length, color: "#64748b", bg: "#e2e8f0", cls: "slate", icon: Eye },
        { label: "Suspended", value: staffList.filter(s => s.status === "suspended").length, color: "#ef4444", bg: "#fee2e2", cls: "red", icon: Lock },
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
                {stats.map(stat => {
                    const IconComponent = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            className={`stat-card ${stat.cls}`}
                            whileHover={{ y: -6, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", transition: { duration: 0.2 } }}
                        >
                            <motion.div
                                className="stat-icon"
                                style={{ background: stat.bg }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <IconComponent size={20} color={stat.color} />
                            </motion.div>
                            <div>
                                <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        </motion.div>
                    );
                })}
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
                                <ChevronDown size={13} color="#94a3b8" className="staff-filter-chevron" />
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
                                <ChevronDown size={13} color="#94a3b8" className="staff-filter-chevron" />
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
                                <ChevronDown size={13} color="#94a3b8" className="staff-filter-chevron" />
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
                    <Search size={15} color="#94a3b8" />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search staff by name, ID or email..."
                    />
                </div>

                <div className="staff-filter-actions">
                    <button className="staff-apply-btn">
                        <Filter size={14} color="#fff" /> Apply Filter
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
                    <button onClick={() => router.push("/outlet-portal/staff/new-staff")} className="btn-primary-green">
                        <Plus size={15} color="#fff" /> Add New Staff
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
                                                onClick={() => router.push(`/outlet-portal/staff/staff-profile?id=${staff.id}`)}
                                                className="action-btn"
                                            >
                                                <Eye size={14} color="#64748b" />
                                            </button>
                                            <button
                                                onClick={() => router.push(`/outlet-portal/staff/update-staff?id=${staff.id}`)}
                                                className="action-btn"
                                            >
                                                <Edit size={14} color="#64748b" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (confirm(`Delete ${staff.name}? This action cannot be undone.`)) {
                                                        setStaffList(prev => prev.filter(item => item.id !== staff.id));
                                                    }
                                                }}
                                                className="action-btn"
                                            >
                                                <Trash2 size={14} color="#64748b" />
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
                                    onClick={() => router.push(`/outlet-portal/staff/staff-profile?id=${staff.id}`)}
                                    className="action-btn"
                                >
                                    <Eye size={14} color="#64748b" />
                                    <span>View</span>
                                </button>
                                <button
                                    onClick={() => router.push(`/outlet-portal/staff/update-staff?id=${staff.id}`)}
                                    className="action-btn"
                                >
                                    <Edit size={14} color="#64748b" />
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
                                    <Trash2 size={14} color="#64748b" />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="empty-state">
                        <Search size={32} color="#cbd5e1" />
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