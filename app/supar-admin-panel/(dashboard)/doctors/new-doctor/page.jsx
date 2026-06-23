"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import "./new-doctor.css";
import {
    User, Mail, Phone, Calendar, MapPin, Award, ArrowLeft, Check,
    Users, Clock, Star, FileText, Stethoscope, GraduationCap,
    Briefcase, Heart, Globe, DollarSign, Video, Mic, MessageCircle, Camera, Plus, X,
    Building, Activity, Shield, Save
} from "lucide-react";

/* ──────────────────────────── Constants ──────────────────────────── */

const DAYS = [
    { id: 'monday', name: 'Monday' },
    { id: 'tuesday', name: 'Tuesday' },
    { id: 'wednesday', name: 'Wednesday' },
    { id: 'thursday', name: 'Thursday' },
    { id: 'friday', name: 'Friday' },
    { id: 'saturday', name: 'Saturday' },
    { id: 'sunday', name: 'Sunday' }
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

const EMPTY_DOCTOR = {
    name: "",
    title: "",
    department: "",
    avatar: "/images/doctors/default-avatar.png",
    status: "active",

    email: "",
    phone: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    nationality: "Bangladeshi",
    fatherHusbandName: "",
    address: "",

    bmdcNumber: "",
    specialization: "",
    subSpecialization: "",
    qualification: "",
    experience: "",
    currentDesignation: "",
    consultationFee: "",
    currency: "৳",

    consultationType: [],
    workSchedule: "",
    outlets: "",

    bio: "",
    languages: "",

    schedule: {
        monday: { isActive: false, start: "", end: "", breaks: [], slotDuration: 30 },
        tuesday: { isActive: false, start: "", end: "", breaks: [], slotDuration: 30 },
        wednesday: { isActive: false, start: "", end: "", breaks: [], slotDuration: 30 },
        thursday: { isActive: false, start: "", end: "", breaks: [], slotDuration: 30 },
        friday: { isActive: false, start: "", end: "", breaks: [], slotDuration: 30 },
        saturday: { isActive: false, start: "", end: "", breaks: [], slotDuration: 30 },
        sunday: { isActive: false, start: "", end: "", breaks: [], slotDuration: 30 },
    },

    education: [{ degree: "", institution: "", year: "" }],
    certifications: [""],

    accountInfo: { username: "", password: "" },
};

/* ──────────────────────────── Components ──────────────────────────── */

function InfoRow({ label, value, icon: Icon, onChange, type = "text", options = [] }) {
    return (
        <div className="info-row">
            <Icon size={15} color="#94a3b8" />
            <div className="info-inner">
                <div className="info-label">{label}</div>
                {type === "select" ? (
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
                )}
            </div>
        </div>
    );
}

function DayScheduleCard({ day, schedule, onUpdate }) {
    const [showBreakForm, setShowBreakForm] = useState(false);
    const [breakPreset, setBreakPreset] = useState(0);

    const BREAK_PRESETS = [
        { label: "Lunch Break (1:00–2:00)", start: "13:00", end: "14:00" },
        { label: "Prayer Break (1:00–1:30)", start: "13:00", end: "13:30" },
        { label: "Custom", start: "", end: "" },
    ];

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
                    />
                    <label>{day.name}</label>
                </div>
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
                                    onChange={(e) => onUpdate({ start: e.target.value })}
                                />
                            </div>
                            <span className="time-sep">—</span>
                            <div className="time-field">
                                <label>End</label>
                                <input
                                    type="time"
                                    value={schedule?.end || ""}
                                    onChange={(e) => onUpdate({ end: e.target.value })}
                                />
                            </div>
                        </div>

                        {(schedule?.breaks || []).length > 0 && (
                            <div className="breaks-list">
                                {schedule.breaks.map((b, idx) => (
                                    <div key={idx} className="break-item">
                                        <span>☕ {b.start} — {b.end}</span>
                                        <button onClick={() => handleDeleteBreak(idx)} className="break-delete">
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {!showBreakForm && (
                            <button className="add-break-btn" onClick={() => setShowBreakForm(true)}>
                                <Plus size={12} /> Add Break
                            </button>
                        )}

                        {showBreakForm && (
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
                    </>
                ) : (
                    <div className="off-day">Day off</div>
                )}
            </div>
        </div>
    );
}

/* ──────────────────────────── Main Page ──────────────────────────── */

export default function NewDoctorAddPage() {
    const router = useRouter();
    const [draft, setDraft] = useState(EMPTY_DOCTOR);
    const [saved, setSaved] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null);

    const updateField = (key) => (e) => {
        setDraft(prev => ({ ...prev, [key]: e.target.value }));
    };

    const toggleConsultationType = (typeId) => {
        setDraft(prev => {
            const current = prev.consultationType || [];
            const updated = current.includes(typeId)
                ? current.filter(t => t !== typeId)
                : [...current, typeId];
            return { ...prev, consultationType: updated };
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

    const addEducation = () => {
        setDraft(prev => ({ ...prev, education: [...prev.education, { degree: "", institution: "", year: "" }] }));
    };

    const removeEducation = (idx) => {
        setDraft(prev => ({ ...prev, education: prev.education.filter((_, i) => i !== idx) }));
    };

    const updateCertification = (idx, value) => {
        setDraft(prev => {
            const certs = [...prev.certifications];
            certs[idx] = value;
            return { ...prev, certifications: certs };
        });
    };

    const addCertification = () => {
        setDraft(prev => ({ ...prev, certifications: [...prev.certifications, ""] }));
    };

    const removeCertification = (idx) => {
        setDraft(prev => ({ ...prev, certifications: prev.certifications.filter((_, i) => i !== idx) }));
    };

    const updateAccountField = (key) => (e) => {
        setDraft(prev => ({ ...prev, accountInfo: { ...prev.accountInfo, [key]: e.target.value } }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setAvatarPreview(URL.createObjectURL(file));
    };

    const handleCreate = () => {
        // TODO: dispatch / API call to create doctor with `draft`
        setSaved(true);
        setTimeout(() => {
            setSaved(false);
            router.push("/supar-admin-panel/staff");
        }, 1200);
    };

    const handleCancel = () => {
        router.push("/supar-admin-panel/staff");
    };

    const activeDayCount = Object.values(draft.schedule || {}).filter(d => d.isActive).length;

    return (
        <div className="doctor-profile-admin">
            {/* Breadcrumb & Header Actions */}
            <div className="rxd-sub-header">
                <div className="rxd-breadcrumb">
                    <span>Home</span>
                    <span className="rxd-breadcrumb-sep">›</span>
                    <span onClick={() => router.push("/supar-admin-panel/staff")} className="rxd-breadcrumb-link">Doctors</span>
                    <span className="rxd-breadcrumb-sep">›</span>
                    <span className="rxd-breadcrumb-current">Add New Doctor</span>
                </div>
                <div className="rxd-header-actions">
                    <button onClick={handleCancel} className="rxd-header-btn rxd-btn-back">
                        <ArrowLeft size={14} /> Back
                    </button>
                    <button onClick={handleCreate} className="rxd-header-btn rxd-btn-primary">
                        <Save size={14} color="#fff" /> Create Doctor
                    </button>
                    <button onClick={handleCancel} className="rxd-header-btn rxd-btn-secondary">
                        <X size={14} /> Cancel
                    </button>
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
                        Doctor profile created successfully!
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ─── PROFILE HEADER ─── */}
            <div className="profile-header">
                <div className="profile-header-content">
                    <div className="profile-avatar-section">
                        <div className="profile-avatar">
                            <img src={avatarPreview || draft.avatar} alt="New doctor" />
                            <label className="avatar-edit-btn">
                                <Camera size={14} />
                                <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
                            </label>
                        </div>
                    </div>

                    <div className="profile-info-section">
                        <div className="profile-name-row">
                            <h1>
                                <input
                                    value={draft.name}
                                    onChange={updateField("name")}
                                    className="name-input"
                                    placeholder="Doctor's Full Name"
                                />
                            </h1>
                        </div>

                        <div className="profile-title-row">
                            <input
                                value={draft.title}
                                onChange={updateField("title")}
                                className="info-edit-input"
                                placeholder="Title (e.g. Senior Cardiologist)"
                                style={{ maxWidth: 220 }}
                            />
                            <select value={draft.department} onChange={updateField("department")} className="info-edit-select" style={{ maxWidth: 200 }}>
                                <option value="">Select Department</option>
                                {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
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
                        <InfoRow label="Full Name" value={draft.name} icon={User} onChange={updateField("name")} />
                        <InfoRow label="Father's Name" value={draft.fatherHusbandName} icon={User} onChange={updateField("fatherHusbandName")} />
                        <InfoRow label="Date of Birth" value={draft.dob} icon={Calendar} onChange={updateField("dob")} type="date" />
                        <InfoRow label="Gender" value={draft.gender} icon={User} onChange={updateField("gender")} type="select" options={GENDERS} />
                        <InfoRow label="Blood Group" value={draft.bloodGroup} icon={Activity} onChange={updateField("bloodGroup")} type="select" options={BLOOD_GROUPS} />
                        <InfoRow label="Nationality" value={draft.nationality} icon={Globe} onChange={updateField("nationality")} />
                        <InfoRow label="Address" value={draft.address} icon={MapPin} onChange={updateField("address")} type="textarea" />
                    </div>

                    <div className="doctor-card-header" style={{ marginTop: 24 }}>
                        <h3><Phone size={18} /> Contact Information</h3>
                    </div>
                    <div className="info-grid">
                        <InfoRow label="Phone" value={draft.phone} icon={Phone} onChange={updateField("phone")} />
                        <InfoRow label="Email" value={draft.email} icon={Mail} onChange={updateField("email")} type="email" />
                        <InfoRow label="Languages" value={draft.languages} icon={Globe} onChange={updateField("languages")} />
                    </div>

                    <div className="doctor-card-header" style={{ marginTop: 24 }}>
                        <h3><Heart size={18} /> About</h3>
                    </div>
                    <div className="bio-section">
                        <textarea value={draft.bio} onChange={updateField("bio")} className="bio-textarea" rows={4} placeholder="Short bio..." />
                    </div>
                </div>

                {/* ─── PROFESSIONAL INFORMATION ─── */}
                <div className="doctor-card">
                    <div className="doctor-card-header">
                        <h3><Stethoscope size={18} /> Professional Information</h3>
                    </div>

                    <div className="info-grid">
                        <InfoRow label="BMDC Number" value={draft.bmdcNumber} icon={Award} onChange={updateField("bmdcNumber")} />
                        <InfoRow label="Specialization" value={draft.specialization} icon={Stethoscope} onChange={updateField("specialization")} type="select" options={SPECIALIZATIONS} />
                        <InfoRow label="Sub Specialization" value={draft.subSpecialization} icon={Stethoscope} onChange={updateField("subSpecialization")} />
                        <InfoRow label="Qualification" value={draft.qualification} icon={GraduationCap} onChange={updateField("qualification")} />
                        <InfoRow label="Experience" value={draft.experience} icon={Clock} onChange={updateField("experience")} type="number" />
                        <InfoRow label="Designation" value={draft.currentDesignation} icon={Briefcase} onChange={updateField("currentDesignation")} />
                        <InfoRow label="Consultation Fee" value={draft.consultationFee} icon={DollarSign} onChange={updateField("consultationFee")} type="number" />
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
                                    const isSelected = draft.consultationType.includes(type.id);
                                    return (
                                        <button
                                            key={type.id}
                                            className={`consult-type-btn ${isSelected ? "active" : ""}`}
                                            onClick={() => toggleConsultationType(type.id)}
                                        >
                                            <Icon size={14} /> {type.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <InfoRow label="Work Schedule" value={draft.workSchedule} icon={Clock} onChange={updateField("workSchedule")} />
                        <InfoRow label="Outlets" value={draft.outlets} icon={Building} onChange={updateField("outlets")} />
                    </div>

                    <div className="doctor-card-header" style={{ marginTop: 24 }}>
                        <h3><GraduationCap size={18} /> Education & Certifications</h3>
                    </div>
                    <div className="education-section">
                        <h4>Education</h4>
                        <div className="timeline">
                            {draft.education.map((edu, idx) => (
                                <div key={idx} className="timeline-item">
                                    <div className="timeline-dot" />
                                    <div className="timeline-content">
                                        <input className="info-edit-input" value={edu.year} onChange={(e) => updateEducation(idx, "year", e.target.value)} placeholder="Year" style={{ maxWidth: 100, marginBottom: 4 }} />
                                        <input className="info-edit-input" value={edu.degree} onChange={(e) => updateEducation(idx, "degree", e.target.value)} placeholder="Degree" style={{ marginBottom: 4 }} />
                                        <div style={{ display: "flex", gap: 6 }}>
                                            <input className="info-edit-input" value={edu.institution} onChange={(e) => updateEducation(idx, "institution", e.target.value)} placeholder="Institution" />
                                            <button className="break-delete" onClick={() => removeEducation(idx)}><X size={14} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="add-break-btn" onClick={addEducation} style={{ marginTop: 8 }}>
                            <Plus size={12} /> Add Education
                        </button>

                        <h4 style={{ marginTop: 16 }}>Certifications</h4>
                        <ul className="certifications-list">
                            {draft.certifications.map((cert, idx) => (
                                <li key={idx}>
                                    <Check size={14} color="#16a34a" />
                                    <input className="info-edit-input" value={cert} onChange={(e) => updateCertification(idx, e.target.value)} placeholder="Certification" />
                                    <button className="break-delete" onClick={() => removeCertification(idx)}><X size={14} /></button>
                                </li>
                            ))}
                        </ul>
                        <button className="add-break-btn" onClick={addCertification} style={{ marginTop: 8 }}>
                            <Plus size={12} /> Add Certification
                        </button>
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
                                schedule={draft.schedule?.[day.id]}
                                onUpdate={(updates) => updateSchedule(day.id, updates)}
                            />
                        ))}
                    </div>
                </div>

                {/* ─── DOCUMENTS ─── */}
                <div className="doctor-card">
                    <div className="doctor-card-header">
                        <h3><FileText size={18} /> Documents</h3>
                        <button className="add-doc-btn">
                            <Plus size={14} /> Add Document
                        </button>
                    </div>
                    <div className="documents-grid">
                        <div className="doc-card" style={{ justifyContent: "center", color: "#94a3b8", fontSize: 13 }}>
                            No documents uploaded yet. Use "Add Document" to upload ID, BMDC certificate, etc.
                        </div>
                    </div>
                </div>

                {/* ─── ACCOUNT INFO ─── */}
                <div className="doctor-card">
                    <div className="doctor-card-header">
                        <h3><Shield size={18} /> Account Setup</h3>
                    </div>
                    <div className="info-grid">
                        <InfoRow label="Username" value={draft.accountInfo.username} icon={User} onChange={updateAccountField("username")} />
                        <InfoRow label="Temporary Password" value={draft.accountInfo.password} icon={Shield} onChange={updateAccountField("password")} type="password" />
                    </div>
                </div>


                {/* ── Bottom Actions ── */}
                <div className="doctor-card" style={{ display: "flex", justifyContent: "flex-end", gap: "12px", padding: "14px 18px" }}>
                    <button className="rxd-header-btn rxd-btn-secondary" onClick={handleCancel}>
                        <X size={14} /> Cancel
                    </button>
                    <button className="rxd-header-btn rxd-btn-primary" onClick={handleCreate}>
                        <Save size={14} color="#fff" /> Create Doctor
                    </button>
                </div>

            </div>
        </div>
    );
}