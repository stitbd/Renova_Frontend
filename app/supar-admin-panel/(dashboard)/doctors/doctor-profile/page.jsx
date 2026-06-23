// app/supar-admin-panel/doctor-profile/page.jsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import "./doctor-profile.css";
import {
    User, Mail, Phone, Calendar, MapPin, Award, Edit, Trash2, ArrowLeft, Check,
    BadgeCheck, Users, Clock, Star, FileText, Eye, Stethoscope, GraduationCap,
    Briefcase, Heart, Globe, DollarSign, Video, Mic, MessageCircle, Camera, Plus, X,
    AlertCircle, Building, Activity, Download, Shield
} from "lucide-react";

/* ──────────────────────────── Constants ──────────────────────────── */

const DAYS = [
    { id: 'monday', name: 'Monday', short: 'Mon' },
    { id: 'tuesday', name: 'Tuesday', short: 'Tue' },
    { id: 'wednesday', name: 'Wednesday', short: 'Wed' },
    { id: 'thursday', name: 'Thursday', short: 'Thu' },
    { id: 'friday', name: 'Friday', short: 'Fri' },
    { id: 'saturday', name: 'Saturday', short: 'Sat' },
    { id: 'sunday', name: 'Sunday', short: 'Sun' }
];

const SPECIALIZATIONS = [
    "Cardiology", "Dermatology", "ENT", "General Medicine",
    "Gynecology", "Neurology", "Orthopedics", "Pediatrics",
    "Psychiatry", "Surgery", "Ophthalmology", "Urology",
    "Nephrology", "Oncology", "Radiology"
];

const BLOOD_GROUPS = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];
const GENDERS = ["Male", "Female", "Other"];

const CONSULTATION_TYPES = [
    { id: "video", label: "Video Call", icon: Video },
    { id: "audio", label: "Audio Call", icon: Mic },
    { id: "chat", label: "Chat Only", icon: MessageCircle },
    { id: "in-person", label: "In-Person", icon: Building },
];

const DOC_ICON_MAP = {
    id: FileText,
    certificate: Award,
    education: GraduationCap,
    experience: Briefcase,
};

/* ──────────────────────────── Mock Data ──────────────────────────── */

const DOCTOR_DATA = {
    id: "DR-2025-000123",
    name: "Dr. Tasnim Farin",
    title: "Senior Cardiologist",
    department: "Cardiology",
    avatar: "/images/doctors/doctor-2.jpg",
    status: "active",
    verified: true,

    email: "tasnim.farin@renovalife.com",
    phone: "+880 1712-345678",
    dob: "1985-03-15",
    gender: "Female",
    bloodGroup: "O+",
    nationality: "Bangladeshi",
    fatherHusbandName: "Md. Abdul Farin",
    address: "House 12, Road 5, Dhanmondi, Dhaka-1205",

    bmdcNumber: "BMDC-12345",
    specialization: "Cardiology",
    subSpecialization: "Interventional Cardiology",
    qualification: "MBBS, FCPS (Cardiology)",
    experience: 12,
    currentDesignation: "Senior Cardiologist",
    consultationFee: 500,
    currency: "৳",

    consultationType: ["video", "in-person"],
    workSchedule: "Evening (2pm – 8pm)",
    outlets: ["Renova Dhanmondi", "Renova Mirpur"],

    bio: "Board-certified cardiologist with 12+ years of experience in cardiovascular care. Specializes in interventional cardiology and preventive cardiac care.",

    patientsHandled: 1248,
    monthsActive: 6,
    tasksCompleted: 98,
    avgRating: 4.8,
    reviewCount: 127,

    languages: ["Bengali", "English", "Hindi"],

    schedule: {
        monday: { isActive: true, start: "09:00", end: "17:00", breaks: [{ start: "13:00", end: "14:00" }], slotDuration: 30 },
        tuesday: { isActive: true, start: "09:00", end: "17:00", breaks: [{ start: "13:00", end: "14:00" }], slotDuration: 30 },
        wednesday: { isActive: true, start: "09:00", end: "17:00", breaks: [{ start: "13:00", end: "14:00" }], slotDuration: 30 },
        thursday: { isActive: true, start: "09:00", end: "17:00", breaks: [{ start: "13:00", end: "14:00" }], slotDuration: 30 },
        friday: { isActive: false, start: "", end: "", breaks: [], slotDuration: 30 },
        saturday: { isActive: true, start: "10:00", end: "14:00", breaks: [], slotDuration: 30 },
        sunday: { isActive: false, start: "", end: "", breaks: [], slotDuration: 30 },
    },

    documents: [
        { name: "National ID", status: "verified", iconType: "id" },
        { name: "BMDC Certificate", status: "verified", iconType: "certificate" },
        { name: "Educational Certificate", status: "verified", iconType: "education" },
        { name: "Experience Certificate", status: "pending", iconType: "experience" },
    ],

    education: [
        { degree: "MBBS", institution: "Dhaka Medical College", year: "2010" },
        { degree: "FCPS (Cardiology)", institution: "Bangladesh College of Physicians and Surgeons", year: "2016" },
        { degree: "Interventional Cardiology Fellowship", institution: "National Institute of Cardiovascular Diseases", year: "2018" },
    ],

    certifications: [
        "BMDC Registered",
        "Bangladesh Cardiac Society Member",
        "American College of Cardiology Associate",
        "Advanced Cardiac Life Support (ACLS) Certified",
    ],

    reviews: [
        { id: 1, patient: "Md. Rakib Hasan", rating: 5, date: "2025-05-28", comment: "Excellent doctor! Very knowledgeable and caring." },
        { id: 2, patient: "Sumaiya Rahman", rating: 5, date: "2025-05-25", comment: "Dr. Farin is the best cardiologist in Dhaka. Highly recommended." },
        { id: 3, patient: "Abdullah Al Mamun", rating: 4, date: "2025-05-20", comment: "Good experience. The doctor explained everything clearly." },
        { id: 4, patient: "Nadia Islam", rating: 5, date: "2025-05-15", comment: "Very professional and thorough consultation." },
    ],

    accountInfo: {
        username: "dr.tasnim.farin",
        lastLogin: "Today, 09:42 AM",
        created: "01 Jan 2025",
    }
};

/* ──────────────────────────── Helpers ──────────────────────────── */

const formatDate = (dateString) => {
    if (!dateString) return "—";
    const d = new Date(dateString);
    if (isNaN(d)) return dateString;
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const calculateAge = (dob) => {
    if (!dob) return "—";
    const birth = new Date(dob);
    if (isNaN(birth)) return "—";
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
};

const getStatusStyle = (status) => {
    const styles = {
        active: { bg: "#dcfce7", color: "#16a34a", dot: "#16a34a" },
        inactive: { bg: "#f1f5f9", color: "#64748b", dot: "#64748b" },
        suspended: { bg: "#fee2e2", color: "#ef4444", dot: "#ef4444" },
        pending: { bg: "#fef3c7", color: "#f59e0b", dot: "#f59e0b" },
    };
    return styles[status] || styles.inactive;
};

/* ──────────────────────────── Components ──────────────────────────── */

function StatusBadge({ status }) {
    const style = getStatusStyle(status);
    return (
        <span className="status-badge" style={{ background: style.bg, color: style.color }}>
            <span className="status-dot" style={{ background: style.color }} />
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}

function InfoRow({ label, value, icon: Icon, editing, onChange, type = "text", options = [] }) {
    return (
        <div className="info-row">
            <Icon size={15} color="#94a3b8" />
            <div className="info-inner">
                <div className="info-label">{label}</div>
                {editing ? (
                    type === "select" ? (
                        <select value={value || ""} onChange={onChange} className="info-edit-select">
                            <option value="">Select {label}</option>
                            {options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    ) : type === "textarea" ? (
                        <textarea value={value || ""} onChange={onChange} className="info-edit-textarea" rows={2} />
                    ) : (
                        <input type={type} value={value || ""} onChange={onChange} className="info-edit-input" />
                    )
                ) : (
                    <div className="info-value">{value || "—"}</div>
                )}
            </div>
        </div>
    );
}

function DayScheduleCard({ day, schedule, isEditing, onUpdate }) {
    const [showBreakForm, setShowBreakForm] = useState(false);
    const [breakPreset, setBreakPreset] = useState(0);

    const BREAK_PRESETS = [
        { label: "Lunch Break (1:00–2:00)", start: "13:00", end: "14:00" },
        { label: "Prayer Break (1:00–1:30)", start: "13:00", end: "13:30" },
        { label: "Custom", start: "", end: "" },
    ];

    const slotsCount = () => {
        if (!schedule?.start || !schedule?.end) return 0;
        const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
        let total = toMin(schedule.end) - toMin(schedule.start);
        (schedule?.breaks || []).forEach(b => { total -= (toMin(b.end) - toMin(b.start)); });
        return total > 0 ? Math.floor(total / (schedule?.slotDuration || 30)) : 0;
    };

    const handleAddBreak = () => {
        const preset = BREAK_PRESETS[breakPreset];
        if (!preset.start || !preset.end || preset.start >= preset.end) return;
        onUpdate({ breaks: [...(schedule?.breaks || []), { start: preset.start, end: preset.end }] });
        setShowBreakForm(false);
    };

    const handleDeleteBreak = (idx) => {
        onUpdate({ breaks: (schedule?.breaks || []).filter((_, i) => i !== idx) });
    };

    return (
        <div className="day-schedule-card">
            <div className="day-header">
                <div className="day-name">
                    <input
                        type="checkbox"
                        checked={schedule?.isActive || false}
                        onChange={(e) => onUpdate({ isActive: e.target.checked })}
                        disabled={!isEditing}
                    />
                    <label>{day.name}</label>
                </div>
                <span className="slots-count">{slotsCount()} patients</span>
            </div>

            <div className="time-slots-container">
                {schedule?.isActive ? (
                    <>
                        <div className="time-range">
                            <div className="time-field">
                                <label>Start</label>
                                <input
                                    type="time"
                                    value={schedule?.start || ""}
                                    disabled={!isEditing}
                                    onChange={(e) => onUpdate({ start: e.target.value })}
                                />
                            </div>
                            <span className="time-sep">—</span>
                            <div className="time-field">
                                <label>End</label>
                                <input
                                    type="time"
                                    value={schedule?.end || ""}
                                    disabled={!isEditing}
                                    onChange={(e) => onUpdate({ end: e.target.value })}
                                />
                            </div>
                        </div>

                        {(schedule?.breaks || []).length > 0 && (
                            <div className="breaks-list">
                                {schedule.breaks.map((b, idx) => (
                                    <div key={idx} className="break-item">
                                        <span>☕ {b.start} — {b.end}</span>
                                        {isEditing && (
                                            <button onClick={() => handleDeleteBreak(idx)} className="break-delete">
                                                <X size={12} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {isEditing && !showBreakForm && (
                            <button className="add-break-btn" onClick={() => setShowBreakForm(true)}>
                                <Plus size={12} /> Add Break
                            </button>
                        )}

                        {isEditing && showBreakForm && (
                            <div className="break-form">
                                <select value={breakPreset} onChange={(e) => setBreakPreset(Number(e.target.value))}>
                                    {BREAK_PRESETS.map((p, i) => (
                                        <option key={i} value={i}>{p.label}</option>
                                    ))}
                                </select>
                                <div className="break-actions">
                                    <button className="break-confirm" onClick={handleAddBreak}>Add</button>
                                    <button className="break-cancel" onClick={() => setShowBreakForm(false)}>Cancel</button>
                                </div>
                            </div>
                        )}

                        {isEditing && (
                            <div className="duration-row">
                                <Clock size={12} />
                                <span>Per patient:</span>
                                <select
                                    value={schedule?.slotDuration || 30}
                                    onChange={(e) => onUpdate({ slotDuration: Number(e.target.value) })}
                                >
                                    <option value={15}>15 min</option>
                                    <option value={20}>20 min</option>
                                    <option value={30}>30 min</option>
                                    <option value={45}>45 min</option>
                                    <option value={60}>60 min</option>
                                </select>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="off-day">Day off</div>
                )}
            </div>
        </div>
    );
}

/* ──────────────────────────── Main Page ──────────────────────────── */

export default function DoctorProfileAdminPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const doctorId = searchParams.get("id");

    const [isEditing, setIsEditing] = useState(false);
    const [doctor, setDoctor] = useState(DOCTOR_DATA);
    const [draft, setDraft] = useState(DOCTOR_DATA);
    const [saved, setSaved] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showAllReviews, setShowAllReviews] = useState(false);

    const handleEdit = () => {
        setDraft(JSON.parse(JSON.stringify(doctor)));
        setIsEditing(true);
    };

    const handleSave = () => {
        setDoctor(JSON.parse(JSON.stringify(draft)));
        setIsEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleCancel = () => {
        setDraft(JSON.parse(JSON.stringify(doctor)));
        setIsEditing(false);
    };

    const handleDelete = () => {
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        router.push("/supar-admin-panel/staff");
    };

    const updateField = (key) => (e) => {
        setDraft(prev => ({ ...prev, [key]: e.target.value }));
    };

    const toggleConsultationType = (typeId) => {
        setDraft(prev => {
            const current = Array.isArray(prev.consultationType)
                ? prev.consultationType
                : prev.consultationType ? [prev.consultationType] : [];
            const updated = current.includes(typeId)
                ? current.filter(t => t !== typeId)
                : [...current, typeId];
            return { ...prev, consultationType: updated.length ? updated : current };
        });
    };

    const updateSchedule = (dayId, updates) => {
        setDraft(prev => ({
            ...prev,
            schedule: {
                ...prev.schedule,
                [dayId]: { ...prev.schedule[dayId], ...updates }
            }
        }));
    };

    const updateEducation = (idx, field, value) => {
        setDraft(prev => {
            const edu = [...prev.education];
            edu[idx] = { ...edu[idx], [field]: value };
            return { ...prev, education: edu };
        });
    };

    const updateCertification = (idx, value) => {
        setDraft(prev => {
            const certs = [...prev.certifications];
            certs[idx] = value;
            return { ...prev, certifications: certs };
        });
    };

    const updateDocumentName = (idx, value) => {
        setDraft(prev => {
            const docs = [...prev.documents];
            docs[idx] = { ...docs[idx], name: value };
            return { ...prev, documents: docs };
        });
    };

    const updateAccountField = (key) => (e) => {
        setDraft(prev => ({
            ...prev,
            accountInfo: { ...prev.accountInfo, [key]: e.target.value }
        }));
    };

    const current = isEditing ? draft : doctor;
    const age = calculateAge(current.dob);
    const activeDayCount = Object.values(current.schedule || {}).filter(d => d.isActive).length;

    return (
        <div className="doctor-profile-admin">
            {/* Breadcrumb & Header Actions */}
            <div className="rxd-sub-header">
                <div className="rxd-breadcrumb">
                    <span>Home</span>
                    <span className="rxd-breadcrumb-sep">›</span>
                    <span onClick={() => router.push("/supar-admin-panel/doctors")} className="rxd-breadcrumb-link">Doctors</span>
                    <span className="rxd-breadcrumb-sep">›</span>
                    <span className="rxd-breadcrumb-current">Doctor Profile</span>
                </div>
                <div className="rxd-header-actions">
                    <button onClick={() => router.push(searchParams.get("from") === "approval" ? "/supar-admin-panel/doctor-approval" : "/supar-admin-panel/doctors")} className="rxd-header-btn rxd-btn-back">
                        <ArrowLeft size={14} /> Back
                    </button>
                    {isEditing ? (
                        <>
                            <button onClick={handleSave} className="rxd-header-btn rxd-btn-primary">
                                <Check size={14} color="#fff" /> Save Changes
                            </button>
                            <button onClick={handleCancel} className="rxd-header-btn rxd-btn-secondary">
                                <X size={14} /> Cancel
                            </button>
                        </>
                    ) : (
                        searchParams.get("from") !== "approval" && (
                            <button onClick={handleEdit} className="rxd-header-btn rxd-btn-primary">
                                <Edit size={14} color="#fff" /> Edit Profile
                            </button>
                        )
                    )}
                    {searchParams.get("from") !== "approval" && (
                        <button onClick={handleDelete} className="rxd-header-btn rxd-btn-danger">
                            <Trash2 size={14} color="#ef4444" /> Delete
                        </button>
                    )}
                </div>
            </div>

            {/* Success Toast */}
            <AnimatePresence>
                {saved && (
                    <motion.div
                        className="success-toast"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <Check size={16} color="#16a34a" />
                        Doctor profile updated successfully!
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteConfirm && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowDeleteConfirm(false)}
                    >
                        <motion.div
                            className="modal-content delete-modal"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h4>Delete Doctor</h4>
                                <button className="modal-close" onClick={() => setShowDeleteConfirm(false)}>×</button>
                            </div>
                            <div className="modal-body">
                                <AlertCircle size={40} color="#ef4444" />
                                <p>Are you sure you want to delete <strong>{current.name}</strong>?</p>
                                <p className="delete-warning">This action cannot be undone. All associated data will be permanently removed.</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn-secondary" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                                <button className="btn-danger" onClick={confirmDelete}>Delete Doctor</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ─── PROFILE HEADER ─── */}
            <div className="profile-header">
                <div className="profile-header-content">
                    <div className="profile-avatar-section">
                        <div className="profile-avatar">
                            <img src={current.avatar} alt={current.name} />
                            {isEditing && (
                                <label className="avatar-edit-btn">
                                    <Camera size={14} />
                                    <input type="file" accept="image/*" style={{ display: "none" }} />
                                </label>
                            )}
                        </div>
                    </div>

                    <div className="profile-info-section">
                        <div className="profile-name-row">
                            <h1>
                                {isEditing ? (
                                    <input value={draft.name} onChange={updateField("name")} className="name-input" />
                                ) : (
                                    current.name
                                )}
                            </h1>
                            {current.verified && (
                                <span className="verified-badge"><BadgeCheck size={14} /> Verified</span>
                            )}
                            <StatusBadge status={current.status} />
                        </div>

                        <div className="profile-title-row">
                            <span className="profile-title">{current.title}</span>
                            <span className="profile-department">{current.department}</span>
                        </div>

                        <div className="profile-quick-stats">
                            <div className="quick-stat">
                                <Award size={14} />
                                <span>{current.experience}+ Years</span>
                            </div>
                            <div className="quick-stat">
                                <Users size={14} />
                                <span>{current.patientsHandled} Patients</span>
                            </div>
                            <div className="quick-stat">
                                <Star size={14} />
                                <span>{current.avgRating} ({current.reviewCount} reviews)</span>
                            </div>
                            <div className="quick-stat">
                                <Globe size={14} />
                                <span>{current.languages.join(", ")}</span>
                            </div>
                        </div>

                        <div className="profile-contact-row">
                            <a href={`tel:${current.phone}`} className="contact-link">
                                <Phone size={14} /> {current.phone}
                            </a>
                            <a href={`mailto:${current.email}`} className="contact-link">
                                <Mail size={14} /> {current.email}
                            </a>
                            <span className="contact-link">
                                <MapPin size={14} /> {current.outlets.join(", ")}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── SUMMARY GRID (QUICK STATS) ─── */}
            <div className="doctor-summary-grid">
                <div className="doctor-summary-card doctor-blue">
                    <div className="doctor-summary-icon"><Users size={20} /></div>
                    <div className="doctor-summary-text">
                        <span className="doctor-summary-value">{current.patientsHandled}</span>
                        <span className="doctor-summary-label">Patients Handled</span>
                    </div>
                </div>
                <div className="doctor-summary-card doctor-green">
                    <div className="doctor-summary-icon"><Clock size={20} /></div>
                    <div className="doctor-summary-text">
                        <span className="doctor-summary-value">{current.monthsActive}</span>
                        <span className="doctor-summary-label">Months Active</span>
                    </div>
                </div>
                <div className="doctor-summary-card doctor-purple">
                    <div className="doctor-summary-icon"><Check size={20} /></div>
                    <div className="doctor-summary-text">
                        <span className="doctor-summary-value">{current.tasksCompleted}%</span>
                        <span className="doctor-summary-label">Tasks Completed</span>
                    </div>
                </div>
                <div className="doctor-summary-card doctor-orange">
                    <div className="doctor-summary-icon"><Star size={20} /></div>
                    <div className="doctor-summary-text">
                        <span className="doctor-summary-value">{current.avgRating}</span>
                        <span className="doctor-summary-label">Avg. Rating</span>
                    </div>
                </div>
                <div className="doctor-summary-card doctor-cyan">
                    <div className="doctor-summary-icon"><MessageCircle size={20} /></div>
                    <div className="doctor-summary-text">
                        <span className="doctor-summary-value">{current.reviewCount}</span>
                        <span className="doctor-summary-label">Reviews</span>
                    </div>
                </div>
            </div>

            {/* ─── MAIN CONTENT ─── */}
            <div className="doctor-content-grid">

                {/* ─── PERSONAL INFORMATION ─── */}
                <div className="doctor-card">
                    <div className="doctor-card-header">
                        <h3><User size={18} /> Personal Information</h3>
                    </div>

                    <div className="info-grid">
                        <InfoRow label="Doctor ID" value={current.id} icon={BadgeCheck} />
                        <InfoRow label="Full Name" value={current.name} icon={User} editing={isEditing} onChange={updateField("name")} />
                        <InfoRow label="Father's Name" value={current.fatherHusbandName} icon={User} editing={isEditing} onChange={updateField("fatherHusbandName")} />
                        <InfoRow label="Date of Birth" value={formatDate(current.dob)} icon={Calendar} editing={isEditing} onChange={updateField("dob")} type="date" />
                        <InfoRow label="Age" value={`${age} Years`} icon={Calendar} />
                        <InfoRow label="Gender" value={current.gender} icon={User} editing={isEditing} onChange={updateField("gender")} type="select" options={GENDERS} />
                        <InfoRow label="Blood Group" value={current.bloodGroup} icon={Activity} editing={isEditing} onChange={updateField("bloodGroup")} type="select" options={BLOOD_GROUPS} />
                        <InfoRow label="Nationality" value={current.nationality} icon={Globe} editing={isEditing} onChange={updateField("nationality")} />
                        <InfoRow label="Address" value={current.address} icon={MapPin} editing={isEditing} onChange={updateField("address")} type="textarea" />
                    </div>

                    <div className="doctor-card-header" style={{ marginTop: 24 }}>
                        <h3><Phone size={18} /> Contact Information</h3>
                    </div>
                    <div className="info-grid">
                        <InfoRow label="Phone" value={current.phone} icon={Phone} editing={isEditing} onChange={updateField("phone")} />
                        <InfoRow label="Email" value={current.email} icon={Mail} editing={isEditing} onChange={updateField("email")} type="email" />
                        <InfoRow label="Languages" value={current.languages.join(", ")} icon={Globe} editing={isEditing} onChange={updateField("languages")} />
                    </div>

                    <div className="doctor-card-header" style={{ marginTop: 24 }}>
                        <h3><Heart size={18} /> About</h3>
                    </div>
                    <div className="bio-section">
                        {isEditing ? (
                            <textarea value={draft.bio} onChange={updateField("bio")} className="bio-textarea" rows={4} />
                        ) : (
                            <p className="bio-text">{current.bio}</p>
                        )}
                    </div>
                </div>

                {/* ─── PROFESSIONAL INFORMATION ─── */}
                <div className="doctor-card">
                    <div className="doctor-card-header">
                        <h3><Stethoscope size={18} /> Professional Information</h3>
                    </div>

                    <div className="info-grid">
                        <InfoRow label="BMDC Number" value={current.bmdcNumber} icon={Award} editing={isEditing} onChange={updateField("bmdcNumber")} />
                        <InfoRow label="Specialization" value={current.specialization} icon={Stethoscope} editing={isEditing} onChange={updateField("specialization")} type="select" options={SPECIALIZATIONS} />
                        <InfoRow label="Sub Specialization" value={current.subSpecialization || "—"} icon={Stethoscope} editing={isEditing} onChange={updateField("subSpecialization")} />
                        <InfoRow label="Qualification" value={current.qualification} icon={GraduationCap} editing={isEditing} onChange={updateField("qualification")} />
                        <InfoRow label="Experience" value={`${current.experience} Years`} icon={Clock} editing={isEditing} onChange={updateField("experience")} type="number" />
                        <InfoRow label="Designation" value={current.currentDesignation} icon={Briefcase} editing={isEditing} onChange={updateField("currentDesignation")} />
                        <InfoRow label="Consultation Fee" value={`${current.currency} ${current.consultationFee}`} icon={DollarSign} editing={isEditing} onChange={updateField("consultationFee")} type="number" />
                    </div>

                    <div className="doctor-card-header" style={{ marginTop: 24 }}>
                        <h3><Building size={18} /> Work Details</h3>
                    </div>
                    <div className="info-grid">
                        <div className="info-row-full">
                            <div className="info-label">Consultation Types</div>
                            <div className="consultation-types">
                                {CONSULTATION_TYPES.map(type => {
                                    const Icon = type.icon;
                                    const isSelected = Array.isArray(current.consultationType)
                                        ? current.consultationType.includes(type.id)
                                        : current.consultationType === type.id;
                                    return (
                                        <button
                                            key={type.id}
                                            className={`consult-type-btn ${isSelected ? "active" : ""}`}
                                            onClick={() => isEditing && toggleConsultationType(type.id)}
                                            disabled={!isEditing}
                                        >
                                            <Icon size={14} /> {type.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <InfoRow label="Work Schedule" value={current.workSchedule} icon={Clock} editing={isEditing} onChange={updateField("workSchedule")} />
                        <InfoRow label="Outlets" value={current.outlets.join(", ")} icon={Building} editing={isEditing} onChange={updateField("outlets")} />
                    </div>

                    <div className="doctor-card-header" style={{ marginTop: 24 }}>
                        <h3><GraduationCap size={18} /> Education & Certifications</h3>
                    </div>
                    <div className="education-section">
                        <h4>Education</h4>
                        <div className="timeline">
                            {current.education.map((edu, idx) => (
                                <div key={idx} className="timeline-item">
                                    <div className="timeline-dot" />
                                    <div className="timeline-content">
                                        {isEditing ? (
                                            <>
                                                <input className="info-edit-input" value={edu.year} onChange={(e) => updateEducation(idx, "year", e.target.value)} style={{ maxWidth: 100, marginBottom: 4 }} />
                                                <input className="info-edit-input" value={edu.degree} onChange={(e) => updateEducation(idx, "degree", e.target.value)} style={{ marginBottom: 4 }} />
                                                <input className="info-edit-input" value={edu.institution} onChange={(e) => updateEducation(idx, "institution", e.target.value)} />
                                            </>
                                        ) : (
                                            <>
                                                <span className="timeline-year">{edu.year}</span>
                                                <h4>{edu.degree}</h4>
                                                <p>{edu.institution}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h4 style={{ marginTop: 16 }}>Certifications</h4>
                        <ul className="certifications-list">
                            {current.certifications.map((cert, idx) => (
                                <li key={idx}>
                                    <Check size={14} color="#16a34a" />
                                    {isEditing ? (
                                        <input className="info-edit-input" value={cert} onChange={(e) => updateCertification(idx, e.target.value)} />
                                    ) : (
                                        <span>{cert}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ─── SCHEDULE ─── */}
                <div className="doctor-card">
                    <div className="doctor-card-header">
                        <h3><Calendar size={18} /> Weekly Schedule</h3>
                        <span className="active-days-badge">{activeDayCount} Active Days</span>
                    </div>
                    <div className="weekly-schedule-grid">
                        {DAYS.map(day => (
                            <DayScheduleCard
                                key={day.id}
                                day={day}
                                schedule={current.schedule?.[day.id]}
                                isEditing={isEditing}
                                onUpdate={(updates) => updateSchedule(day.id, updates)}
                            />
                        ))}
                    </div>
                </div>

                {/* ─── DOCUMENTS ─── */}
                <div className="doctor-card">
                    <div className="doctor-card-header">
                        <h3><FileText size={18} /> Documents</h3>
                        {isEditing && (
                            <button className="add-doc-btn">
                                <Plus size={14} /> Add Document
                            </button>
                        )}
                    </div>
                    <div className="documents-grid">
                        {current.documents.map((doc, idx) => {
                            const Icon = DOC_ICON_MAP[doc.iconType] || FileText;
                            return (
                                <div key={idx} className="doc-card">
                                    <div className="doc-icon">
                                        <Icon size={20} />
                                    </div>
                                    <div className="doc-info">
                                        {isEditing ? (
                                            <input className="info-edit-input" value={doc.name} onChange={(e) => updateDocumentName(idx, e.target.value)} style={{ marginBottom: 4 }} />
                                        ) : (
                                            <span className="doc-name">{doc.name}</span>
                                        )}
                                        <span className={`doc-status ${doc.status}`}>
                                            {doc.status === "verified" ? "✓ Verified" : "⏳ Pending"}
                                        </span>
                                    </div>
                                    <div className="doc-actions">
                                        <button className="doc-action-btn" title="View">
                                            <Eye size={14} />
                                        </button>
                                        <button className="doc-action-btn" title="Download">
                                            <Download size={14} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ─── ACCOUNT INFO & REVIEWS ─── */}
                <div className="doctor-two-col">
                    <div className="doctor-card">
                        <div className="doctor-card-header">
                            <h3><Shield size={18} /> Account Info</h3>
                        </div>
                        <div className="account-info-list">
                            {/* <div className="account-row">
                                <span>Username</span>
                                <span>{current.accountInfo.username}</span>
                            </div> */}
                            <div className="account-row">
                                <span>Username</span>
                                {isEditing ? (
                                    <input
                                        className="info-edit-input"
                                        style={{ maxWidth: 160, textAlign: "right" }}
                                        value={current.accountInfo.username}
                                        onChange={updateAccountField("username")}
                                    />
                                ) : (
                                    <span>{current.accountInfo.username}</span>
                                )}
                            </div>
                            <div className="account-row">
                                <span>Last Login</span>
                                <span>{current.accountInfo.lastLogin}</span>
                            </div>
                            <div className="account-row">
                                <span>Status</span>
                                <StatusBadge status={current.status} />
                            </div>
                            <div className="account-row">
                                <span>Created</span>
                                <span>{current.accountInfo.created}</span>
                            </div>
                        </div>
                    </div>

                    <div className="doctor-card">
                        <div className="doctor-card-header">
                            <h3><Star size={18} /> Recent Reviews</h3>
                        </div>
                        <div className="reviews-list">
                            {current.reviews.slice(0, 3).map((review, idx) => (
                                <div key={idx} className="review-item">
                                    <div className="review-header-mini">
                                        <span className="reviewer-name">{review.patient}</span>
                                        <div className="mini-stars">
                                            {[1, 2, 3, 4, 5].map(s => (
                                                <Star key={s} size={10} fill={s <= review.rating ? "#f59e0b" : "none"} color={s <= review.rating ? "#f59e0b" : "#d1d5db"} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="review-mini-comment">{review.comment.slice(0, 60)}...</p>
                                </div>
                            ))}
                            {current.reviews.length > 3 && (
                                <button className="view-all-btn" onClick={() => setShowAllReviews(!showAllReviews)}>
                                    {showAllReviews ? "Show Less" : `View All ${current.reviews.length} Reviews`}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}