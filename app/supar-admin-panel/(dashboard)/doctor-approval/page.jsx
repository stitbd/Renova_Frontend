"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import "./doctor-approval.css";
import {
    Search, ChevronDown, Eye, Check, X, Clock, ShieldCheck,
    Stethoscope, Award, GraduationCap, FileText, Calendar,
    AlertCircle, BadgeCheck, Hourglass, Ban
} from "lucide-react";

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const PENDING_DOCTORS = [
    {
        id: "DR-REQ-1041",
        name: "Dr. Nusrat Jahan",
        specialization: "Dermatology",
        qualification: "MBBS, DDV",
        experience: 6,
        bmdcNumber: "BMDC-88421",
        phone: "01711-223344",
        email: "nusrat.jahan@example.com",
        appliedOn: "2026-06-18",
        avatar: "/images/doctors/doctor-1.jpg",
        status: "pending",
        documents: [
            { name: "NID / Passport", status: "uploaded" },
            { name: "BMDC Certificate", status: "uploaded" },
            { name: "Educational Certificate", status: "uploaded" },
            { name: "Experience Certificate", status: "missing" },
        ],
    },
    {
        id: "DR-REQ-1040",
        name: "Dr. Imran Kabir",
        specialization: "Orthopedics",
        qualification: "MBBS, MS (Ortho)",
        experience: 9,
        bmdcNumber: "BMDC-77310",
        phone: "01812-556677",
        email: "imran.kabir@example.com",
        appliedOn: "2026-06-17",
        avatar: "/images/doctors/doctor-4.jpg",
        status: "pending",
        documents: [
            { name: "NID / Passport", status: "uploaded" },
            { name: "BMDC Certificate", status: "uploaded" },
            { name: "Educational Certificate", status: "uploaded" },
            { name: "Experience Certificate", status: "uploaded" },
        ],
    }, {
        id: "DR-REQ-1039",
        name: "Dr. Aysha Aktar Pripty",
        specialization: "Ginologist",
        qualification: "MBBS, DDV",
        experience: 6,
        bmdcNumber: "BMDC-88421",
        phone: "01711-223345",
        email: "aysha.pripty@example.com",
        appliedOn: "2026-06-18",
        avatar: "/images/doctors/doctor-2.jpg",
        status: "pending",
        documents: [
            { name: "NID / Passport", status: "uploaded" },
            { name: "BMDC Certificate", status: "uploaded" },
            { name: "Educational Certificate", status: "uploaded" },
            { name: "Experience Certificate", status: "missing" },
        ],
    },
    {
        id: "DR-REQ-1038",
        name: "Dr. Ontora Jahan",
        specialization: "Orthopedics",
        qualification: "MBBS, MS (Ortho)",
        experience: 9,
        bmdcNumber: "BMDC-77312",
        phone: "01812-556677",
        email: "antro.jahan@example.com",
        appliedOn: "2026-06-17",
        avatar: "/images/doctors/doctor-3.jpg",
        status: "pending",
        documents: [
            { name: "NID / Passport", status: "uploaded" },
            { name: "BMDC Certificate", status: "uploaded" },
            { name: "Educational Certificate", status: "uploaded" },
            { name: "Experience Certificate", status: "uploaded" },
        ],
    },
    {
        id: "DR-REQ-1037",
        name: "Dr. Farhana Yasmin",
        specialization: "Gynecology",
        qualification: "MBBS, FCPS (Gynae)",
        experience: 11,
        bmdcNumber: "BMDC-65209",
        phone: "01912-998877",
        email: "farhana.yasmin@example.com",
        appliedOn: "2026-06-15",
        avatar: "/images/doctors/doctor-5.jpg",
        status: "approved",
        documents: [
            { name: "NID / Passport", status: "uploaded" },
            { name: "BMDC Certificate", status: "uploaded" },
            { name: "Educational Certificate", status: "uploaded" },
            { name: "Experience Certificate", status: "uploaded" },
        ],
    },
    {
        id: "DR-REQ-1036",
        name: "Dr. Shamim Reza",
        specialization: "ENT",
        qualification: "MBBS, DLO",
        experience: 4,
        bmdcNumber: "BMDC-54187",
        phone: "01612-334455",
        email: "shamim.reza@example.com",
        appliedOn: "2026-06-12",
        avatar: "/images/doctors/doctor-10.jpg",
        status: "rejected",
        rejectionReason: "BMDC certificate could not be verified.",
        documents: [
            { name: "NID / Passport", status: "uploaded" },
            { name: "BMDC Certificate", status: "uploaded" },
            { name: "Educational Certificate", status: "missing" },
            { name: "Experience Certificate", status: "missing" },
        ],
    },
];

function StatusPill({ status }) {
    const map = {
        pending: { bg: "#fef3c7", color: "#b45309", icon: Hourglass, label: "Pending Review" },
        approved: { bg: "#dcfce7", color: "#16a34a", icon: BadgeCheck, label: "Approved" },
        rejected: { bg: "#fee2e2", color: "#dc2626", icon: Ban, label: "Rejected" },
    };
    const s = map[status] || map.pending;
    const Icon = s.icon;
    return (
        <span className="da-status-pill" style={{ background: s.bg, color: s.color }}>
            <Icon size={12} /> {s.label}
        </span>
    );
}

function DocBadge({ doc }) {
    const ok = doc.status === "uploaded";
    return (
        <span className={`da-doc-badge ${ok ? "ok" : "missing"}`}>
            {ok ? <Check size={11} /> : <AlertCircle size={11} />}
            {doc.name}
        </span>
    );
}

function DoctorCard({ doctor, onApprove, onReject, onView }) {
    return (
        <motion.div
            className="da-card"
            variants={item}
            whileHover={{ y: -4, boxShadow: "0 10px 28px rgba(0,0,0,0.10)", transition: { duration: 0.2 } }}
        >
            <div className="da-card-top">
                <div className="da-card-profile">
                    <img src={doctor.avatar} alt={doctor.name} />
                    <div>
                        <div className="da-card-name">{doctor.name}</div>
                        <div className="da-card-id">{doctor.id}</div>
                    </div>
                </div>
                <StatusPill status={doctor.status} />
            </div>

            <div className="da-card-info">
                <div className="da-card-info-row">
                    <Stethoscope size={13} />
                    <span>{doctor.specialization}</span>
                </div>
                <div className="da-card-info-row">
                    <GraduationCap size={13} />
                    <span>{doctor.qualification}</span>
                </div>
                <div className="da-card-info-row">
                    <Award size={13} />
                    <span>{doctor.bmdcNumber}</span>
                </div>
                <div className="da-card-info-row">
                    <Calendar size={13} />
                    <span>Applied {new Date(doctor.appliedOn).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
                </div>
            </div>

            <div className="da-card-docs">
                {doctor.documents.map((doc, i) => <DocBadge key={i} doc={doc} />)}
            </div>

            {doctor.status === "rejected" && doctor.rejectionReason && (
                <div className="da-rejection-note">
                    <AlertCircle size={12} /> {doctor.rejectionReason}
                </div>
            )}

            <div className="da-card-actions">
                <button className="da-btn-view" onClick={() => onView(doctor)}>
                    <Eye size={14} /> Details
                </button>
                {doctor.status === "pending" && (
                    <>
                        <button className="da-btn-approve" onClick={() => onApprove(doctor.id)}>
                            <Check size={14} /> Approve
                        </button>
                        <button className="da-btn-reject" onClick={() => onReject(doctor)}>
                            <X size={14} /> Reject
                        </button>
                    </>
                )}
            </div>
        </motion.div>
    );
}

function SectionHeader({ icon: Icon, title, count, colorClass }) {
    return (
        <div className={`da-section-header da-section-${colorClass}`}>
            <div className="da-section-header-left">
                <Icon size={16} />
                <span>{title}</span>
            </div>
            <span className="da-section-count">{count}</span>
        </div>
    );
}

export default function DoctorApprovalPage() {
    const router = useRouter();
    const [doctors, setDoctors] = useState(PENDING_DOCTORS);
    const [searchTerm, setSearchTerm] = useState("");
    const [specFilter, setSpecFilter] = useState("all");
    const [showSpecDropdown, setShowSpecDropdown] = useState(false);
    const [rejectTarget, setRejectTarget] = useState(null);
    const [rejectReason, setRejectReason] = useState("");

    const stats = [
        { label: "Pending Review", value: doctors.filter(d => d.status === "pending").length, color: "#b45309", bg: "#fef3c7", icon: Hourglass },
        { label: "Approved", value: doctors.filter(d => d.status === "approved").length, color: "#16a34a", bg: "#dcfce7", icon: BadgeCheck },
        { label: "Rejected", value: doctors.filter(d => d.status === "rejected").length, color: "#dc2626", bg: "#fee2e2", icon: Ban },
        { label: "Total Requests", value: doctors.length, color: "#014fa1", bg: "#dbeafe", icon: ShieldCheck },
    ];

    const specializations = [...new Set(doctors.map(d => d.specialization))];

    const applyFilters = (list) => list.filter(d => {
        const q = searchTerm.toLowerCase();
        if (q && !d.name.toLowerCase().includes(q) && !d.id.toLowerCase().includes(q) && !d.bmdcNumber.toLowerCase().includes(q)) return false;
        if (specFilter !== "all" && d.specialization !== specFilter) return false;
        return true;
    });

    const pendingDoctors = applyFilters(doctors.filter(d => d.status === "pending"));
    const approvedDoctors = applyFilters(doctors.filter(d => d.status === "approved"));
    const rejectedDoctors = applyFilters(doctors.filter(d => d.status === "rejected"));

    const handleApprove = (doctorId) => {
        setDoctors(prev => prev.map(d => d.id === doctorId ? { ...d, status: "approved" } : d));
    };

    const openRejectModal = (doctor) => {
        setRejectReason("");
        setRejectTarget(doctor);
    };

    const confirmReject = () => {
        if (!rejectTarget) return;
        setDoctors(prev => prev.map(d =>
            d.id === rejectTarget.id
                ? { ...d, status: "rejected", rejectionReason: rejectReason || "Application did not meet verification requirements." }
                : d
        ));
        setRejectTarget(null);
    };

    const handleViewDetails = (doctor) => {
        router.push(`/supar-admin-panel/doctors/doctor-profile?id=${doctor.id}&from=approval`);
    };

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="da-page">
            {/* Stats Grid */}
            <motion.div className="da-stats-grid" variants={item}>
                {stats.map(stat => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            className="da-stat-card"
                            style={{ borderLeftColor: stat.color }}
                            whileHover={{ y: -6, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", transition: { duration: 0.2 } }}
                        >
                            <motion.div
                                className="da-stat-icon"
                                style={{ background: stat.bg }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <Icon size={20} color={stat.color} />
                            </motion.div>
                            <div>
                                <div className="da-stat-value" style={{ color: stat.color }}>{stat.value}</div>
                                <div className="da-stat-label">{stat.label}</div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Filter Bar */}
            <motion.div className="da-filter-bar" variants={item}>
                <div className="da-filter-group-row">
                    <div className="da-filter-dropdown">
                        <button
                            className="da-filter-item"
                            onClick={() => setShowSpecDropdown(v => !v)}
                        >
                            <span>{specFilter === "all" ? "All Specializations" : specFilter}</span>
                            <ChevronDown size={13} color="#94a3b8" />
                        </button>
                        {showSpecDropdown && (
                            <div className="da-dropdown">
                                <div className="da-dropdown-item" onClick={() => { setSpecFilter("all"); setShowSpecDropdown(false); }}>All Specializations</div>
                                {specializations.map(s => (
                                    <div key={s} className="da-dropdown-item" onClick={() => { setSpecFilter(s); setShowSpecDropdown(false); }}>{s}</div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="da-search-box">
                    <Search size={15} color="#94a3b8" />
                    <input
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Search by name, request ID or BMDC number..."
                    />
                </div>

                <div className="da-filter-actions">
                    <button
                        onClick={() => { setSearchTerm(""); setSpecFilter("all"); }}
                        className="da-reset-btn"
                    >
                        Reset
                    </button>
                </div>
            </motion.div>

            {/* ── SECTION 1: Pending Review ── */}
            <motion.div className="da-section" variants={item}>
                <SectionHeader icon={Hourglass} title="Pending Review" count={pendingDoctors.length} colorClass="pending" />
                {pendingDoctors.length > 0 ? (
                    <div className="da-cards-grid">
                        {pendingDoctors.map(doctor => (
                            <DoctorCard
                                key={doctor.id}
                                doctor={doctor}
                                onApprove={handleApprove}
                                onReject={openRejectModal}
                                onView={handleViewDetails}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="da-section-empty">No pending requests</div>
                )}
            </motion.div>

            {/* ── SECTION 2: Approved ── */}
            <motion.div className="da-section" variants={item}>
                <SectionHeader icon={BadgeCheck} title="Approved Doctors" count={approvedDoctors.length} colorClass="approved" />
                {approvedDoctors.length > 0 ? (
                    <div className="da-cards-grid">
                        {approvedDoctors.map(doctor => (
                            <DoctorCard
                                key={doctor.id}
                                doctor={doctor}
                                onApprove={handleApprove}
                                onReject={openRejectModal}
                                onView={handleViewDetails}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="da-section-empty">No approved doctors</div>
                )}
            </motion.div>

            {/* ── SECTION 3: Rejected ── */}
            <motion.div className="da-section" variants={item}>
                <SectionHeader icon={Ban} title="Rejected Applications" count={rejectedDoctors.length} colorClass="rejected" />
                {rejectedDoctors.length > 0 ? (
                    <div className="da-cards-grid">
                        {rejectedDoctors.map(doctor => (
                            <DoctorCard
                                key={doctor.id}
                                doctor={doctor}
                                onApprove={handleApprove}
                                onReject={openRejectModal}
                                onView={handleViewDetails}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="da-section-empty">No rejected applications</div>
                )}
            </motion.div>

            {/* ── Reject Confirmation Modal ── */}
            <AnimatePresence>
                {rejectTarget && (
                    <motion.div
                        className="da-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setRejectTarget(null)}
                    >
                        <motion.div
                            className="da-modal-content da-reject-modal"
                            initial={{ scale: 0.95, y: 16, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 16, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="da-modal-header">
                                <h4>Reject Application</h4>
                                <button className="da-modal-close" onClick={() => setRejectTarget(null)}><X size={18} /></button>
                            </div>
                            <div className="da-modal-body">
                                <p className="da-reject-text">
                                    Rejecting <strong>{rejectTarget.name}</strong>&apos;s application. Please provide a reason — this will be shared with the applicant.
                                </p>
                                <textarea
                                    className="da-reject-textarea"
                                    rows={4}
                                    placeholder="e.g. BMDC certificate could not be verified."
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                />
                            </div>
                            <div className="da-modal-footer">
                                <button className="da-btn-cancel" onClick={() => setRejectTarget(null)}>Cancel</button>
                                <button className="da-btn-reject-confirm" onClick={confirmReject}>
                                    <Ban size={14} /> Confirm Rejection
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}