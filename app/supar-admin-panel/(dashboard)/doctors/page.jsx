"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import "./supar-admin-panel-doctors.css";
import { Plus, Search, Eye, Edit, Users, Stethoscope, CheckCircle, Calendar, ChevronDown, Filter, Trash2 } from "lucide-react";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function DoctorsPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [specFilter, setSpecFilter] = useState("all");
    const [expFilter, setExpFilter] = useState("all");

    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showSpecDropdown, setShowSpecDropdown] = useState(false);
    const [showExpDropdown, setShowExpDropdown] = useState(false);

    const doctors = [
        { id: "DR-2025-001", name: "Dr. Rafiqul Islam", specialization: "Cardiology", experience: 12, phone: "01712-345678", patientsHandled: 1240, status: "Active", avatar: "/images/doctors/doctor-1.jpg" },
        { id: "DR-2025-002", name: "Dr. Sadita Afrin", specialization: "Neurology", experience: 8, phone: "01812-345678", patientsHandled: 890, status: "Active", avatar: "/images/doctors/doctor-2.jpg" },
        { id: "DR-2025-003", name: "Dr. Rashed Hasan", specialization: "Pediatrics", experience: 5, phone: "01912-345678", patientsHandled: 560, status: "Inactive", avatar: "/images/doctors/doctor-3.jpg" },
        { id: "DR-2025-004", name: "Dr. Mahmudul Islam", specialization: "Orthopedics", experience: 15, phone: "01612-345678", patientsHandled: 2100, status: "Active", avatar: "/images/doctors/doctor-4.jpg" },
        { id: "DR-2025-005", name: "Dr. Farzana Akter", specialization: "Dermatology", experience: 3, phone: "01512-345678", patientsHandled: 320, status: "Active", avatar: "/images/doctors/doctor-5.jpg" },
    ];

    const stats = [
        { label: "Total Doctors", value: doctors.length, color: "#014fa1", bg: "#dbeafe", cls: "blue", icon: Users },
        { label: "Active Doctors", value: doctors.filter(d => d.status === "Active").length, color: "#16a34a", bg: "#dcfce7", cls: "green", icon: CheckCircle },
        { label: "New This Month", value: "04", color: "#64748b", bg: "#e2e8f0", cls: "slate", icon: Calendar },
        { label: "Total Patients Handled", value: "5,110", color: "#7c3aed", bg: "#ede9fe", cls: "purple", icon: Stethoscope },
    ];

    const filteredDoctors = doctors.filter(d => {
        const q = searchTerm.toLowerCase();
        if (q && !d.name.toLowerCase().includes(q) && !d.id.toLowerCase().includes(q)) return false;

        if (statusFilter !== "all" && d.status.toLowerCase() !== statusFilter) return false;
        if (specFilter !== "all" && d.specialization !== specFilter) return false;

        if (expFilter !== "all") {
            if (expFilter === "0-5" && d.experience > 5) return false;
            if (expFilter === "6-10" && (d.experience < 6 || d.experience > 10)) return false;
            if (expFilter === "10+" && d.experience <= 10) return false;
        }

        return true;
    });

    return (
        <motion.div variants={container} initial="hidden" animate="show">
            {/* Stats Grid */}
            <motion.div className="stats-grid" variants={item}>
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
            </motion.div>

            {/* Filter Bar */}
            <motion.div className="staff-filter-bar" variants={item}>
                <div className="staff-filter-group">
                    <div className="staff-filter-group-row">
                        {/* Status Dropdown */}
                        <div className="staff-filter-dropdown">
                            <button
                                className="staff-filter-item"
                                onClick={() => {
                                    setShowStatusDropdown(v => !v);
                                    setShowSpecDropdown(false);
                                    setShowExpDropdown(false);
                                }}
                            >
                                <span>{statusFilter === "all" ? "All Status" : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}</span>
                                <ChevronDown size={13} color="#94a3b8" className="staff-filter-chevron" />
                            </button>
                            {showStatusDropdown && (
                                <div className="staff-dropdown">
                                    {["all", "active", "inactive"].map(s => (
                                        <div
                                            key={s}
                                            className="staff-dropdown-item"
                                            onClick={() => {
                                                setStatusFilter(s);
                                                setShowStatusDropdown(false);
                                            }}
                                        >
                                            {s === "all" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Specialization Dropdown */}
                        <div className="staff-filter-dropdown">
                            <button
                                className="staff-filter-item"
                                onClick={() => {
                                    setShowSpecDropdown(v => !v);
                                    setShowStatusDropdown(false);
                                    setShowExpDropdown(false);
                                }}
                            >
                                <span>{specFilter === "all" ? "All Specializations" : specFilter}</span>
                                <ChevronDown size={13} color="#94a3b8" className="staff-filter-chevron" />
                            </button>
                            {showSpecDropdown && (
                                <div className="staff-dropdown">
                                    {["all", "Cardiology", "Neurology", "Pediatrics", "Orthopedics", "Dermatology"].map(g => (
                                        <div
                                            key={g}
                                            className="staff-dropdown-item"
                                            onClick={() => {
                                                setSpecFilter(g);
                                                setShowSpecDropdown(false);
                                            }}
                                        >
                                            {g === "all" ? "All Specializations" : g}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Experience Dropdown */}
                        <div className="staff-filter-dropdown">
                            <button
                                className="staff-filter-item"
                                onClick={() => {
                                    setShowExpDropdown(v => !v);
                                    setShowStatusDropdown(false);
                                    setShowSpecDropdown(false);
                                }}
                            >
                                <span>{expFilter === "all" ? "All Experience" : expFilter === "0-5" ? "0-5 Years" : expFilter === "6-10" ? "6-10 Years" : "10+ Years"}</span>
                                <ChevronDown size={13} color="#94a3b8" className="staff-filter-chevron" />
                            </button>
                            {showExpDropdown && (
                                <div className="staff-dropdown">
                                    {[
                                        ["all", "All Experience"],
                                        ["0-5", "0-5 Years"],
                                        ["6-10", "6-10 Years"],
                                        ["10+", "10+ Years"]
                                    ].map(([val, label]) => (
                                        <div
                                            key={val}
                                            className="staff-dropdown-item"
                                            onClick={() => {
                                                setExpFilter(val);
                                                setShowExpDropdown(false);
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
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Search doctor by name or ID..."
                    />
                </div>

                <div className="staff-filter-actions">
                    <button className="staff-apply-btn">
                        <Filter size={14} color="#fff" /> Apply Filter
                    </button>
                    <button
                        onClick={() => {
                            setSearchTerm("");
                            setStatusFilter("all");
                            setSpecFilter("all");
                            setExpFilter("all");
                        }}
                        className="staff-reset-btn"
                    >
                        Reset
                    </button>
                </div>
            </motion.div>

            {/* Doctors Table */}
            <motion.div className="data-table-container" variants={item}>
                <div className="table-header">
                    <span>Doctor List ({filteredDoctors.length})</span>
                    <button onClick={() => router.push("/supar-admin-panel/doctors/new-doctor")} className="btn-primary-green">
                        <Plus size={15} color="#fff" /> Add Doctor
                    </button>
                </div>

                <div className="table-wrapper">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Doctor</th>
                                <th>ID</th>
                                <th>Specialization</th>
                                <th>Phone</th>
                                <th>Experience</th>
                                <th>Patients Handled</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDoctors.map((doctor) => (
                                <motion.tr key={doctor.id} variants={item} whileHover={{ backgroundColor: "#f8fafc" }}>
                                    <td>
                                        <div className="table-patient">
                                            <div className="patient-avatar-small">
                                                <img src={doctor.avatar} alt={doctor.name} />
                                            </div>
                                            <span className="patient-name">{doctor.name}</span>
                                        </div>
                                    </td>
                                    <td className="patient-id">{doctor.id}</td>
                                    <td>{doctor.specialization}</td>
                                    <td>{doctor.phone}</td>
                                    <td>{doctor.experience} Years</td>
                                    <td>{doctor.patientsHandled.toLocaleString()}</td>
                                    <td><span className={`status-badge ${doctor.status.toLowerCase()}`}>{doctor.status}</span></td>
                                    <td>
                                        <div className="table-actions">
                                            <button
                                                onClick={() => router.push(`/supar-admin-panel/doctors/doctor-profile?id=${doctor.id}&from=doctors`)}
                                                className="action-btn"
                                            >
                                                <Eye size={14} color="#64748b" />
                                            </button>
                                            <button
                                                onClick={() => router.push(`/supar-admin-panel/doctors/doctor-profile?id=${doctor.id}&edit=true`)}
                                                className="action-btn"
                                            >
                                                <Edit size={14} color="#64748b" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (confirm(`Delete ${doctor.name}? This action cannot be undone.`)) {
                                                        // setDoctorList(prev => prev.filter(d => d.id !== doctor.id));
                                                    }
                                                }}
                                                className="action-btn"
                                            >
                                                <Trash2 size={14} color="#64748b" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards List */}
                <div className="staff-mobile-list">
                    {filteredDoctors.map((doctor) => (
                        <div key={doctor.id} className="staff-card">
                            <div className="staff-card-top">
                                <div className="staff-card-profile">
                                    <img src={doctor.avatar} alt={doctor.name} />
                                    <div>
                                        <div className="staff-name">{doctor.name}</div>
                                        <div className="staff-id">{doctor.id}</div>
                                    </div>
                                </div>
                                <span className={`status-badge ${doctor.status.toLowerCase()}`}>{doctor.status}</span>
                            </div>

                            <div className="staff-card-info-grid">
                                <div>
                                    <div className="staff-card-field-label">Specialization</div>
                                    <div className="staff-card-field-value">{doctor.specialization}</div>
                                </div>
                                <div>
                                    <div className="staff-card-field-label">Phone</div>
                                    <div className="staff-card-field-value">{doctor.phone}</div>
                                </div>
                                <div>
                                    <div className="staff-card-field-label">Experience</div>
                                    <div className="staff-card-field-value muted">{doctor.experience} Years</div>
                                </div>
                                <div>
                                    <div className="staff-card-field-label">Patients Handled</div>
                                    <div className="staff-card-field-value muted">{doctor.patientsHandled.toLocaleString()}</div>
                                </div>
                            </div>

                            <div className="staff-card-actions">
                                <button onClick={() => router.push(`/supar-admin-panel/doctors/doctor-profile?id=${doctor.id}&from=doctors`)} className="action-btn">
                                    <Eye size={14} color="#64748b" />
                                    <span>View</span>
                                </button>
                                <button onClick={() => router.push(`/supar-admin-panel/doctors/doctor-profile?id=${doctor.id}&edit=true`)} className="action-btn">
                                    <Edit size={14} color="#64748b" />
                                    <span>Edit</span>
                                </button>
                                <button
                                    onClick={() => {
                                        if (confirm(`Delete ${doctor.name}? This action cannot be undone.`)) {
                                            // setDoctorList(prev => prev.filter(d => d.id !== doctor.id));
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

                {filteredDoctors.length === 0 && (
                    <div className="empty-state">
                        <Search size={32} color="#cbd5e1" />
                        <div>No doctors found</div>
                        <div>Try adjusting your filters</div>
                    </div>
                )}
            </motion.div>

            {/* Pagination */}
            <motion.div className="pagination" variants={item}>
                <button className="page-btn">Previous</button>
                {[1, 2, 3].map(num => (
                    <motion.button
                        key={num}
                        className={`page-num ${num === 1 ? "active" : ""}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {num}
                    </motion.button>
                ))}
                <button className="page-btn">Next</button>
            </motion.div>
        </motion.div>
    );
}