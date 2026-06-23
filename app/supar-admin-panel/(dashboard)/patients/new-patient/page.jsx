"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Camera, Check, X, User, Calendar, Droplet,
    Phone, Mail, MapPin, Briefcase, Heart, Ruler, Scale, AlertCircle,
    Pill, Scissors, Users, Cigarette, Wine, Dumbbell,
    Stethoscope, Globe, Flag, Activity, ArrowLeft, Save, Shield
} from "lucide-react";
import "./new-patient.css";

/* ───────────────────────── Helpers ───────────────────────── */
function getBMI(height, weight) {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w) return null;
    const m = h / 100;
    return +(w / (m * m)).toFixed(1);
}

function bmiCategory(bmi) {
    if (bmi == null) return { label: "—", tone: "muted" };
    if (bmi < 18.5) return { label: "Underweight", tone: "blue" };
    if (bmi < 25) return { label: "Normal", tone: "green" };
    if (bmi < 30) return { label: "Overweight", tone: "orange" };
    return { label: "Obese", tone: "red" };
}

/* ───────────────────────── Animation Variants ───────────────────────── */
const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 110 } },
};

/* ───────────────────────── Static Data ───────────────────────── */
const initialNewPatient = {
    avatar: null,
    name: "",
    patientId: "PT-2026-" + String(Math.floor(100000 + Math.random() * 900000)),
    verified: false,
    dob: "",
    gender: "Male",
    bloodGroup: "B+",
    nationality: "",
    maritalStatus: "Single",
    occupation: "",
    phone: "",
    email: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    address: "",
    city: "",
    country: "",
    height: "",
    weight: "",
    allergies: "",
    chronicDiseases: { diabetes: false, hypertension: false, asthma: false, heartDisease: false },
    currentMedications: "",
    pastSurgeries: "",
    familyHistory: "",
    smoking: "Never",
    alcohol: "Never",
    physicalActivity: "Sedentary",
    sleep: "6–7 hrs/night",
    accountInfo: { username: "", password: "" }
};

const personalFields = [
    { key: "name", label: "Full Name", type: "text", icon: User },
    { key: "dob", label: "Date of Birth", type: "date", icon: Calendar },
    { key: "gender", label: "Gender", type: "select", icon: User, options: ["Male", "Female", "Other"] },
    { key: "bloodGroup", label: "Blood Group", type: "select", icon: Droplet, options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
    { key: "nationality", label: "Nationality", type: "text", icon: Flag },
    { key: "maritalStatus", label: "Marital Status", type: "select", icon: Heart, options: ["Single", "Married", "Divorced", "Widowed"] },
    { key: "occupation", label: "Occupation", type: "text", icon: Briefcase },
];

const contactFields = [
    { key: "phone", label: "Mobile Number", type: "tel", icon: Phone },
    { key: "email", label: "Email Address", type: "email", icon: Mail },
    { key: "emergencyContactName", label: "Emergency Contact Name", type: "text", icon: User },
    { key: "emergencyContactPhone", label: "Emergency Contact Number", type: "tel", icon: Phone },
    { key: "address", label: "Address", type: "textarea", icon: MapPin, full: true },
    { key: "city", label: "City", type: "text", icon: MapPin },
    { key: "country", label: "Country", type: "text", icon: Globe },
];

const chronicDiseaseOptions = [
    { key: "diabetes", label: "Diabetes" },
    { key: "hypertension", label: "Hypertension" },
    { key: "asthma", label: "Asthma" },
    { key: "heartDisease", label: "Heart Disease" },
];

const lifestyleFields = [
    { key: "smoking", label: "Smoking", icon: Cigarette, options: ["Never", "Former", "Current"] },
    { key: "alcohol", label: "Alcohol", icon: Wine, options: ["Never", "Occasionally", "Regularly"] },
    { key: "sleep", label: "Sleep", icon: Wine, options: ["6–7 hrs/night", "5–6 hrs/night", "4–5 hrs/night"] },
    { key: "physicalActivity", label: "Physical Activity", icon: Dumbbell, options: ["Sedentary", "Light", "Moderate", "Active"] },
];

/* ───────────────────────── Small Components ───────────────────────── */
function FieldRow({ field, value, onChange }) {
    const Icon = field.icon;
    return (
        <div className={`pp-field${field.full ? " full" : ""}`}>
            <label><Icon size={13} /> {field.label}</label>
            {field.type === "select" ? (
                <select value={value} onChange={onChange}>
                    {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
            ) : field.type === "textarea" ? (
                <textarea rows={3} value={value} onChange={onChange} />
            ) : (
                <input type={field.type} value={value} onChange={onChange} />
            )}
        </div>
    );
}

/* ───────────────────────── Main Page ───────────────────────── */
export default function NewPatientAddPage() {
    const [draft, setDraft] = useState(initialNewPatient);
    const [saved, setSaved] = useState(false);

    const set = (field) => (e) => setDraft((p) => ({ ...p, [field]: e.target.value }));

    const toggleChronic = (key) =>
        setDraft((p) => ({ ...p, chronicDiseases: { ...p.chronicDiseases, [key]: !p.chronicDiseases[key] } }));

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setDraft((p) => ({ ...p, avatar: URL.createObjectURL(file) }));
    };
    const updateAccountField = (key) => (e) => {
        setDraft((p) => ({ ...p, accountInfo: { ...p.accountInfo, [key]: e.target.value } }));
    };

    const handleCancel = () => {
        // Handle cancel logic (e.g., router.back())
        console.log("Cancelled adding patient");
    };

    const handleSave = () => {
        // Handle save logic (e.g., API call to create patient)
        console.log("Creating patient:", draft);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const bmi = getBMI(draft.height, draft.weight);
    const bmiInfo = bmiCategory(bmi);

    return (
        <motion.div className="pp-page" variants={container} initial="hidden" animate="show">
            {/* Success toast */}
            <AnimatePresence>
                {saved && (
                    <motion.div
                        className="pp-success"
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Check size={16} />
                        Patient added successfully!
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Page Header ── */}
            <motion.div className="pp-header-card" variants={item}>
                <div className="pp-header-main" style={{ justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                        <button className="pp-btn pp-btn-outline" style={{ padding: "8px 10px" }} onClick={handleCancel}>
                            <ArrowLeft size={16} />
                        </button>
                        <div>
                            <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: "#1a202c" }}>Add New Patient</h2>
                            <p style={{ margin: 0, fontSize: "12px", color: "#718096" }}>Fill in the details to register a new patient</p>
                        </div>
                    </div>
                    <div className="pp-header-actions">
                        <button className="pp-btn pp-btn-ghost" onClick={handleCancel}>
                            <X size={15} /> Cancel
                        </button>
                        <button className="pp-btn pp-btn-primary" onClick={handleSave}>
                            <Save size={15} /> Create Patient
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* ── Avatar & Basic Info ── */}
            <motion.div className="pp-card" variants={item}>
                <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
                    <div className="pp-avatar-wrap">
                        <div className="pp-avatar">
                            <User size={32} className="pp-avatar-fallback" />
                            {draft.avatar && (
                                <img src={draft.avatar} alt="New Patient" onError={(e) => { e.target.style.display = "none"; }} />
                            )}
                        </div>
                        <label className="pp-avatar-edit" title="Upload photo">
                            <Camera size={13} />
                            <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: "none" }} />
                        </label>
                    </div>
                    <div style={{ flex: 1, minWidth: "200px" }}>
                        <p style={{ margin: "0 0 4px", fontSize: "11.5px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                            Auto-generated Patient ID
                        </p>
                        <p style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: "#014fa1" }}>
                            {draft.patientId}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* ── Main Content Grid ── */}
            <div className="pp-content-grid">
                <div className="pp-main-col">

                    {/* ── Personal + Contact Information ── */}
                    <div className="pp-two-col">
                        <motion.div className="pp-card" variants={item}>
                            <h3 className="pp-card-title"><User size={16} /> Personal Information</h3>
                            <div className="pp-field-grid">
                                {personalFields.map((f) => (
                                    <FieldRow key={f.key} field={f} value={draft[f.key]} onChange={set(f.key)} />
                                ))}
                            </div>
                        </motion.div>

                        <motion.div className="pp-card" variants={item}>
                            <h3 className="pp-card-title"><Phone size={16} /> Contact Information</h3>
                            <div className="pp-field-grid">
                                {contactFields.map((f) => (
                                    <FieldRow key={f.key} field={f} value={draft[f.key]} onChange={set(f.key)} />
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Medical Information ── */}
                    <motion.div className="pp-card" variants={item}>
                        <h3 className="pp-card-title"><Heart size={16} /> Medical Information</h3>

                        <h4 className="pp-sub-heading">Body Metrics</h4>
                        <div className="pp-metrics-row">
                            <div className="pp-metric-box">
                                <span className="pp-metric-label"><Ruler size={13} /> Height</span>
                                <div className="pp-metric-input">
                                    <input type="number" value={draft.height} onChange={set("height")} placeholder="170" />
                                    <span>cm</span>
                                </div>
                            </div>
                            <div className="pp-metric-box">
                                <span className="pp-metric-label"><Scale size={13} /> Weight</span>
                                <div className="pp-metric-input">
                                    <input type="number" value={draft.weight} onChange={set("weight")} placeholder="68" />
                                    <span>kg</span>
                                </div>
                            </div>
                            <div className="pp-metric-box">
                                <span className="pp-metric-label"><Activity size={13} /> BMI (Auto)</span>
                                <span className="pp-metric-value">
                                    {bmi ?? "—"}
                                    {bmi != null && <span className={`pp-bmi-tag pp-tag-${bmiInfo.tone}`}>{bmiInfo.label}</span>}
                                </span>
                            </div>
                        </div>

                        <h4 className="pp-sub-heading">Allergies &amp; Chronic Conditions</h4>
                        <div className="pp-field full">
                            <label><AlertCircle size={13} /> Allergies</label>
                            <input type="text" value={draft.allergies} onChange={set("allergies")} placeholder="Separate with commas" />
                        </div>

                        <div className="pp-field full">
                            <label><Stethoscope size={13} /> Chronic Diseases</label>
                            <div className="pp-check-grid">
                                {chronicDiseaseOptions.map((opt) => (
                                    <label key={opt.key} className="pp-check-item">
                                        <input
                                            type="checkbox"
                                            checked={draft.chronicDiseases[opt.key]}
                                            onChange={() => toggleChronic(opt.key)}
                                        />
                                        {opt.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <h4 className="pp-sub-heading">Medical History</h4>
                        <div className="pp-field-grid">
                            <div className="pp-field full">
                                <label><Pill size={13} /> Current Medications</label>
                                <textarea rows={3} value={draft.currentMedications} onChange={set("currentMedications")} placeholder="e.g. Losartan 50mg — once daily" />
                            </div>
                            <div className="pp-field">
                                <label><Scissors size={13} /> Past Surgeries</label>
                                <textarea rows={2} value={draft.pastSurgeries} onChange={set("pastSurgeries")} placeholder="e.g. Appendectomy (2015)" />
                            </div>
                            <div className="pp-field">
                                <label><Users size={13} /> Family Medical History</label>
                                <textarea rows={2} value={draft.familyHistory} onChange={set("familyHistory")} placeholder="e.g. Father: Diabetes" />
                            </div>
                        </div>

                        <h4 className="pp-sub-heading">Lifestyle Information</h4>
                        <div className="pp-lifestyle-grid">
                            {lifestyleFields.map((f) => (
                                <div key={f.key} className="pp-lifestyle-item">
                                    <span className="pp-lifestyle-icon"><f.icon size={16} /></span>
                                    <div className="pp-lifestyle-body">
                                        <span className="pp-lifestyle-label">{f.label}</span>
                                        <select value={draft[f.key]} onChange={set(f.key)}>
                                            {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ─── ACCOUNT INFO ─── */}
                    <motion.div className="pp-card" variants={item}>
                        <h3 className="pp-card-title"><Shield size={16} /> Account Setup</h3>
                        <div className="pp-field-grid">
                            <div className="pp-field">
                                <label><User size={13} /> Username</label>
                                <input
                                    type="text"
                                    value={draft.accountInfo.username}
                                    onChange={updateAccountField("username")}
                                    placeholder="Enter username"
                                />
                            </div>
                            <div className="pp-field">
                                <label><Shield size={13} /> Temporary Password</label>
                                <input
                                    type="password"
                                    value={draft.accountInfo.password}
                                    onChange={updateAccountField("password")}
                                    placeholder="Enter temporary password"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Bottom Actions ── */}
                    <motion.div className="pp-card" variants={item} style={{ display: "flex", justifyContent: "flex-end", gap: "12px", padding: "14px 18px" }}>
                        <button className="pp-btn pp-btn-ghost" onClick={handleCancel}>
                            <X size={15} /> Cancel
                        </button>
                        <button className="pp-btn pp-btn-primary" onClick={handleSave}>
                            <Save size={15} /> Create Patient
                        </button>
                    </motion.div>

                </div>
            </div>
        </motion.div>
    );
}