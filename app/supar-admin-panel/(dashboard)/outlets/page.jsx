// OutletPage.jsx
"use client";
import { useState } from "react";
import "./outlet.css";
import { motion } from "framer-motion";
import { StatusBadge } from "./OutletFormComponents";
import { useRouter } from "next/navigation";
import {
    Building2,
    CheckCircle,
    Eye,
    XCircle,
    ChevronDown,
    Search,
    Filter,
    Plus,
    Edit,
    Trash2,
    MapPin
} from "lucide-react";

export const outletData = [
    { id: "OUT-2025-000014", name: "Renova Dhanmondi", type: "Main Branch", address: "House 12, Road 5, Dhanmondi, Dhaka", phone: "+880 1812-345678", email: "dhanmondi@renova.com", manager: "Nadia Islam", status: "active", opened: "01 Jan 2023", image: "https://i.pravatar.cc/80?img=31" },
    { id: "OUT-2025-000013", name: "Renova Mirpur", type: "Sub Branch", address: "Sec 6, Mirpur, Dhaka", phone: "+880 1712-345678", email: "mirpur@renova.com", manager: "Karim Ahmed", status: "active", opened: "15 Mar 2023", image: "https://i.pravatar.cc/80?img=32" },
    { id: "OUT-2025-000012", name: "Renova Chattogram", type: "Sub Branch", address: "GEC Circle, Chattogram", phone: "+880 1912-345678", email: "ctg@renova.com", manager: "Sumaiya Begum", status: "inactive", opened: "20 Jun 2023", image: "https://i.pravatar.cc/80?img=33" },
    { id: "OUT-2025-000011", name: "Renova Sylhet", type: "Sub Branch", address: "Zindabazar, Sylhet", phone: "+880 1612-345678", email: "sylhet@renova.com", manager: "Rafiqul Islam", status: "active", opened: "05 Sep 2023", image: "https://i.pravatar.cc/80?img=34" },
    { id: "OUT-2025-000010", name: "Renova Uttara", type: "Sub Branch", address: "Sector 7, Uttara, Dhaka", phone: "+880 1512-345678", email: "uttara@renova.com", manager: "Tania Khanam", status: "closed", opened: "22 Nov 2023", image: "https://i.pravatar.cc/80?img=35" },
];

export default function OutletPage() {
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const router = useRouter();
    const [outletList, setOutletList] = useState(outletData);

    const stats = [
        { label: "Total Outlets", value: outletList.length, color: "#014fa1", bg: "#dbeafe", cls: "blue", icon: Building2 },
        { label: "Active", value: outletList.filter(o => o.status === "active").length, color: "#16a34a", bg: "#dcfce7", cls: "green", icon: CheckCircle },
        { label: "Inactive", value: outletList.filter(o => o.status === "inactive").length, color: "#64748b", bg: "#e2e8f0", cls: "slate", icon: Eye },
        { label: "Closed", value: outletList.filter(o => o.status === "closed").length, color: "#ef4444", bg: "#fee2e2", cls: "red", icon: XCircle },
    ];

    const filtered = outletList.filter(o => {
        const q = search.toLowerCase();
        if (q && !o.name.toLowerCase().includes(q) && !o.id.toLowerCase().includes(q) && !o.email.toLowerCase().includes(q)) return false;
        if (typeFilter !== "all" && o.type !== typeFilter) return false;
        if (statusFilter !== "all" && o.status !== statusFilter) return false;
        return true;
    });

    const tableHeaders = ["Outlet", "Type", "Manager", "Contact", "Opened", "Status", "Actions"];

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

            <div className="outlet-filter-bar">
                <div className="outlet-filter-group">
                    <div className="outlet-filter-group-row">
                        <div className="outlet-filter-dropdown">
                            <button
                                className="outlet-filter-item"
                                onClick={() => {
                                    setShowTypeDropdown(v => !v);
                                    setShowStatusDropdown(false);
                                }}
                            >
                                <span>{typeFilter === "all" ? "All Types" : typeFilter}</span>
                                <ChevronDown size={13} color="#94a3b8" className="outlet-filter-chevron" />
                            </button>
                            {showTypeDropdown && (
                                <div className="outlet-dropdown">
                                    {["all", "Main Branch", "Sub Branch"].map(t => (
                                        <div
                                            key={t}
                                            className="outlet-dropdown-item"
                                            onClick={() => {
                                                setTypeFilter(t);
                                                setShowTypeDropdown(false);
                                            }}
                                        >
                                            {t === "all" ? "All Types" : t}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div style={{ position: "relative", flex: 1 }}>
                            <button
                                className="outlet-filter-item"
                                onClick={() => {
                                    setShowStatusDropdown(v => !v);
                                    setShowTypeDropdown(false);
                                }}
                            >
                                <span>{statusFilter === "all" ? "All Status" : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}</span>
                                <ChevronDown size={13} color="#94a3b8" className="outlet-filter-chevron" />
                            </button>
                            {showStatusDropdown && (
                                <div className="outlet-dropdown">
                                    {[
                                        ["all", "All Status"],
                                        ["active", "Active"],
                                        ["inactive", "Inactive"],
                                        ["closed", "Closed"]
                                    ].map(([val, label]) => (
                                        <div
                                            key={val}
                                            className="outlet-dropdown-item"
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

                <div className="outlet-search-box">
                    <Search size={15} color="#94a3b8" />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search outlet by name, ID or email..."
                    />
                </div>

                <div className="outlet-filter-actions">
                    <button className="outlet-apply-btn">
                        <Filter size={14} color="#fff" /> Apply Filter
                    </button>
                    <button
                        onClick={() => {
                            setSearch("");
                            setTypeFilter("all");
                            setStatusFilter("all");
                        }}
                        className="outlet-reset-btn"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <div className="table-container">
                <div className="table-header">
                    <span>Outlet List ({filtered.length})</span>
                    <button onClick={() => router.push("/supar-admin-panel/outlets/new-outlet")} className="btn-primary-green">
                        <Plus size={15} color="#fff" /> Add New Outlet
                    </button>
                </div>
                <div className="table-wrapper">
                    <table className="outlet-table">
                        <thead>
                            <tr>
                                {tableHeaders.map(header => (
                                    <th key={header}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((outlet) => (
                                <tr key={outlet.id}>
                                    <td>
                                        <div className="outlet-cell">
                                            <img src={outlet.image} alt={outlet.name} />
                                            <div>
                                                <div className="outlet-name">{outlet.name}</div>
                                                <div className="outlet-id">{outlet.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="type-badge">{outlet.type}</span>
                                    </td>
                                    <td>{outlet.manager}</td>
                                    <td>
                                        <div>{outlet.phone}</div>
                                        <div className="outlet-email">{outlet.email}</div>
                                    </td>
                                    <td>{outlet.opened}</td>
                                    <td>
                                        <StatusBadge status={outlet.status} />
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                onClick={() => router.push(`/supar-admin-panel/outlets/outlet-details?id=${outlet.id}`)}
                                                className="action-btn"
                                            >
                                                <Eye size={14} color="#64748b" />
                                            </button>
                                            <button
                                                onClick={() => router.push(`/supar-admin-panel/outlets/update-outlet?id=${outlet.id}`)}
                                                className="action-btn"
                                            >
                                                <Edit size={14} color="#64748b" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (confirm(`Delete ${outlet.name}? This action cannot be undone.`)) {
                                                        setOutletList(prev => prev.filter(item => item.id !== outlet.id));
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

                <div className="outlet-mobile-list">
                    {filtered.map((outlet) => (
                        <div key={outlet.id} className="outlet-card">
                            <div className="outlet-card-top">
                                <div className="outlet-card-profile">
                                    <img src={outlet.image} alt={outlet.name} />
                                    <div>
                                        <div className="outlet-name">{outlet.name}</div>
                                        <div className="outlet-id">{outlet.id}</div>
                                    </div>
                                </div>
                                <StatusBadge status={outlet.status} />
                            </div>

                            <div className="outlet-card-info-grid">
                                <div>
                                    <div className="outlet-card-field-label">Type</div>
                                    <div className="outlet-card-field-value">
                                        <span className="type-badge">{outlet.type}</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="outlet-card-field-label">Manager</div>
                                    <div className="outlet-card-field-value">{outlet.manager}</div>
                                </div>
                                <div>
                                    <div className="outlet-card-field-label">Phone</div>
                                    <div className="outlet-card-field-value">{outlet.phone}</div>
                                </div>
                                <div>
                                    <div className="outlet-card-field-label">Email</div>
                                    <div className="outlet-card-field-value muted">{outlet.email}</div>
                                </div>
                                <div>
                                    <div className="outlet-card-field-label">Opened</div>
                                    <div className="outlet-card-field-value muted">{outlet.opened}</div>
                                </div>
                                <div className="outlet-card-field-full">
                                    <div className="outlet-card-field-label">Address</div>
                                    <div className="outlet-card-field-value muted">
                                        <MapPin size={12} color="#94a3b8" style={{ display: "inline", marginRight: 4 }} />
                                        {outlet.address}
                                    </div>
                                </div>
                            </div>

                            <div className="outlet-card-actions">
                                <button
                                    onClick={() => router.push(`/supar-admin-panel/outlets/outlet-details?id=${outlet.id}`)}
                                    className="action-btn"
                                >
                                    <Eye size={14} color="#64748b" />
                                    <span>View</span>
                                </button>
                                <button
                                    onClick={() => router.push(`/supar-admin-panel/outlets/update-outlet?id=${outlet.id}`)}
                                    className="action-btn"
                                >
                                    <Edit size={14} color="#64748b" />
                                    <span>Edit</span>
                                </button>
                                <button
                                    onClick={() => {
                                        if (confirm(`Delete ${outlet.name}? This action cannot be undone.`)) {
                                            setOutletList(prev => prev.filter(item => item.id !== outlet.id));
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
                        <div>No outlets found</div>
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