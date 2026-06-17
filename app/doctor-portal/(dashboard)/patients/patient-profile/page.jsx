// app/doctor-portal/patients/patient-profile/page.jsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import "./patient-profile.css";
import {
    ArrowLeft,
    User,
    Phone,
    Mail,
    AlertTriangle,
    Calendar,
    Video,
    Clock,
    FileText,
    Activity,
    Heart,
    Thermometer,
    Droplet,
    Zap,
    Scissors,
    Download,
    Eye,
    ChevronDown,
    ArrowRight,
    Users,
    Droplets,
    Stethoscope,
    FileCheck,
    AlertCircle,
    UserCheck,
    Award,
    Home,
    Lock,
    CalendarDays,
    ClipboardList,
    HeartPulse
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   STATIC PATIENT DATA  (swap with API later)
   ═══════════════════════════════════════════════════════ */
const patientsDB = {
    "PT-2025-00123": {
        id: "PT-2025-00123",
        name: "Masud Rana",
        photo: "/images/patients/01.jpg",
        age: 32,
        gender: "Male",
        dob: "14 March 1993",
        bloodGroup: "B+",
        height: "5'8\"",
        weight: "72 kg",
        bmi: "24.2",
        maritalStatus: "Married",
        online: true,
        contact: {
            phone: "01712-345678",
            email: "masud.rana@email.com",
            emergency: { name: "Rina Rana", relation: "Wife", phone: "01712-987654" },
        },
        alerts: [
            { type: "red", label: "Severe Penicillin Allergy" },
            { type: "orange", label: "Hypertension Patient" },
            { type: "orange", label: "Diabetes Patient" },
        ],
        stats: {
            totalConsultations: 12,
            lastConsultation: "10 May 2025",
            activePrescriptions: 3,
            uploadedReports: 8,
            chronicCount: 2,
        },
        currentConsult: {
            date: "11 Jun 2026",
            time: "10:30 AM",
            type: "Video",
            complaint: "Chest pain, Breathing difficulty",
            symptoms: "Sharp chest pain, shortness of breath, mild dizziness",
            duration: "3 Days",
            notes: "Patient reports worsening symptoms after exertion",
        },
        chronicDiseases: ["Hypertension", "Type 2 Diabetes"],
        pastIllnesses: ["Typhoid (2018)", "Dengue Fever (2021)"],
        hospitalAdmissions: ["National Heart Foundation (2024) – Chest Pain Eval"],
        allergies: {
            drug: ["Penicillin", "Sulfa Drugs"],
            food: ["Seafood"],
            other: [],
        },
        medications: [
            { name: "Metformin", dosage: "500mg", frequency: "Twice Daily", since: "2022" },
            { name: "Amlodipine", dosage: "5mg", frequency: "Once Daily", since: "2023" },
            { name: "Aspirin", dosage: "75mg", frequency: "Once Daily", since: "2024" },
        ],
        prescriptions: [
            { date: "10 May 2025", doctor: "Dr. Tasnim Farin", diagnosis: "Hypertension – BP medication adjustment" },
            { date: "25 Apr 2025", doctor: "Dr. Tasnim Farin", diagnosis: "Regular follow-up – Diabetes management" },
            { date: "10 Mar 2025", doctor: "Dr. Ahsan Rahman", diagnosis: "Chest pain evaluation – ECG + Echo" },
        ],
        consultationHistory: [
            { date: "10 May 2025", dept: "Cardiology", doctor: "Dr. Tasnim Farin", type: "Video", notes: "BP controlled. Adjusted Amlodipine to 5mg. Next follow-up in 4 weeks.", color: "blue" },
            { date: "25 Apr 2025", dept: "Endocrinology", doctor: "Dr. Ahsan Rahman", type: "In-Person", notes: "HbA1c: 7.2%. Continue Metformin. Diet chart given.", color: "green" },
            { date: "10 Mar 2025", dept: "General Medicine", doctor: "Dr. Sumaiya Islam", type: "Video", notes: "ECG normal. Stress echo scheduled. Rest advised.", color: "purple" },
        ],
        reports: [
            { name: "Full Body Check-up", date: "12 May 2025", category: "Blood", color: "red" },
            { name: "Chest X-Ray", date: "10 May 2025", category: "X-Ray", color: "blue" },
            { name: "ECG Report", date: "09 May 2025", category: "ECG", color: "green" },
            { name: "Blood Sugar Fasting", date: "08 May 2025", category: "Blood", color: "red" },
            { name: "Echo Cardiogram", date: "05 May 2025", category: "Echo", color: "purple" },
            { name: "Kidney Function Test", date: "01 May 2025", category: "Blood", color: "orange" },
        ],
        vitals: [
            { name: "Blood Pressure", icon: "heart", value: "145/90 mmHg", status: "high", date: "10 Jun 2026" },
            { name: "Heart Rate", icon: "activity", value: "82 bpm", status: "normal", date: "10 Jun 2026" },
            { name: "Temperature", icon: "thermometer", value: "98.6°F", status: "normal", date: "10 Jun 2026" },
            { name: "Oxygen Saturation", icon: "droplet", value: "97%", status: "normal", date: "10 Jun 2026" },
            { name: "Blood Sugar", icon: "zap", value: "182 mg/dL", status: "elevated", date: "10 Jun 2026" },
        ],
        surgeries: [
            { name: "Appendectomy", hospital: "Square Hospital, Dhaka", date: "March 2019", outcome: "Successful" },
        ],
        familyHistory: [
            { condition: "Diabetes", emoji: "🩸", present: true },
            { condition: "Hypertension", emoji: "❤️", present: true },
            { condition: "Heart Disease", emoji: "💔", present: false },
            { condition: "Cancer", emoji: "🔬", present: false },
            { condition: "Stroke", emoji: "🧠", present: false },
            { condition: "Kidney Disease", emoji: "🫘", present: false },
        ],
        lifestyle: {
            smoking: "Non-Smoker",
            alcohol: "None",
            activity: "Moderate",
            sleep: "6–7 hrs/night",
        },
        doctorNotes: "Patient is compliant with medication. BP remains slightly elevated despite Amlodipine. Consider adding ARB if no improvement in next visit. Advise strict low-sodium diet and daily 30-min walk.",
        noteDate: "10 May 2025",
        noteBy: "Dr. Tasnim Farin",
        followUp: { date: "10 July 2026", status: "upcoming" },
        documents: [
            { name: "National ID", status: "uploaded" },
            { name: "Insurance Card", status: "uploaded" },
            { name: "Referral Letter", status: "pending" },
        ],
    },

    "PT-2025-00098": {
        id: "PT-2025-00098",
        name: "Sadia Afrin",
        photo: "/images/patients/02.jpg",
        age: 26,
        gender: "Female",
        dob: "20 June 1999",
        bloodGroup: "A+",
        height: "5'4\"",
        weight: "55 kg",
        bmi: "20.9",
        maritalStatus: "Single",
        online: false,
        contact: {
            phone: "01811-223344",
            email: "sadia.afrin@email.com",
            emergency: { name: "Kamal Afrin", relation: "Father", phone: "01711-556677" },
        },
        alerts: [
            { type: "orange", label: "Penicillin Allergy" },
            { type: "green", label: "No Chronic Disease" },
        ],
        stats: {
            totalConsultations: 4,
            lastConsultation: "09 May 2025",
            activePrescriptions: 1,
            uploadedReports: 3,
            chronicCount: 0,
        },
        currentConsult: {
            date: "11 Jun 2026",
            time: "10:20 AM",
            type: "Video",
            complaint: "Fever, Headache",
            symptoms: "High fever (101°F), frontal headache, body ache, fatigue",
            duration: "2 Days",
            notes: "No improvement with OTC medications",
        },
        chronicDiseases: [],
        pastIllnesses: ["Chicken Pox (2015)", "Dengue Fever (2023)"],
        hospitalAdmissions: [],
        allergies: {
            drug: ["Penicillin"],
            food: [],
            other: ["Dust", "Pollen"],
        },
        medications: [
            { name: "Paracetamol", dosage: "500mg", frequency: "Every 6 hrs (PRN)", since: "2026" },
        ],
        prescriptions: [
            { date: "09 May 2025", doctor: "Dr. Tasnim Farin", diagnosis: "Viral Fever – Symptomatic treatment" },
            { date: "15 Jan 2025", doctor: "Dr. Sumaiya Islam", diagnosis: "Rhinitis – Antihistamine" },
        ],
        consultationHistory: [
            { date: "09 May 2025", dept: "General Medicine", doctor: "Dr. Tasnim Farin", type: "Video", notes: "Viral fever confirmed. Paracetamol + hydration advised. CBC normal.", color: "green" },
            { date: "15 Jan 2025", dept: "ENT", doctor: "Dr. Sumaiya Islam", type: "In-Person", notes: "Allergic rhinitis. Cetirizine prescribed. Avoid dust exposure.", color: "blue" },
        ],
        reports: [
            { name: "Complete Blood Count", date: "09 May 2025", category: "Blood", color: "red" },
            { name: "Chest X-Ray", date: "09 May 2025", category: "X-Ray", color: "blue" },
            { name: "Dengue NS1 Test", date: "01 May 2025", category: "Blood", color: "red" },
        ],
        vitals: [
            { name: "Blood Pressure", icon: "heart", value: "118/76 mmHg", status: "normal", date: "09 Jun 2026" },
            { name: "Heart Rate", icon: "activity", value: "95 bpm", status: "elevated", date: "09 Jun 2026" },
            { name: "Temperature", icon: "thermometer", value: "101.2°F", status: "high", date: "09 Jun 2026" },
            { name: "Oxygen Saturation", icon: "droplet", value: "98%", status: "normal", date: "09 Jun 2026" },
            { name: "Blood Sugar", icon: "zap", value: "92 mg/dL", status: "normal", date: "09 Jun 2026" },
        ],
        surgeries: [],
        familyHistory: [
            { condition: "Diabetes", emoji: "🩸", present: false },
            { condition: "Hypertension", emoji: "❤️", present: true },
            { condition: "Heart Disease", emoji: "💔", present: false },
            { condition: "Cancer", emoji: "🔬", present: false },
            { condition: "Stroke", emoji: "🧠", present: false },
            { condition: "Kidney Disease", emoji: "🫘", present: false },
        ],
        lifestyle: {
            smoking: "Non-Smoker",
            alcohol: "None",
            activity: "Light",
            sleep: "7–8 hrs/night",
        },
        doctorNotes: "Young patient with recurrent viral illnesses. Immunity may be low. Advise Vitamin C supplements and balanced diet. Rule out underlying cause if fever persists.",
        noteDate: "09 May 2025",
        noteBy: "Dr. Tasnim Farin",
        followUp: { date: "25 June 2026", status: "upcoming" },
        documents: [
            { name: "National ID", status: "pending" },
            { name: "Insurance Card", status: "pending" },
        ],
    },
};

/* ── Icon mapping for patient profile ──────────────────────────────────────────── */
function getIcon(iconName) {
    const icons = {
        back: ArrowLeft,
        user: User,
        phone: Phone,
        mail: Mail,
        alert: AlertTriangle,
        calendar: Calendar,
        video: Video,
        clock: Clock,
        rx: FileText,
        doc: FileText,
        activity: Activity,
        heart: Heart,
        thermometer: Thermometer,
        droplet: Droplet,
        zap: Zap,
        scissors: Scissors,
        download: Download,
        eye: Eye,
        chevdown: ChevronDown,
        arrowright: ArrowRight,
        consult: Users,
        blood: Droplets,
        stethoscope: Stethoscope,
        note: FileCheck,
        warning: AlertCircle,
        family: Users,
        leaf: Award,
        lock: Lock,
        followup: CalendarDays,
        report: ClipboardList,
        vital: HeartPulse,
        usercheck: UserCheck
    };
    return icons[iconName] || User;
}

/* ── Reusable Section Card ─────────────────────────────────────── */
function Section({ icon, title, onViewAll, scrollable, children }) {
    const IconComponent = getIcon(icon);
    return (
        <div className="pp-section">
            <div className="pp-section-head">
                <h3 className="pp-section-title">
                    <IconComponent size={16} />
                    {title}
                </h3>
                {onViewAll && (
                    <button className="pp-view-all" onClick={onViewAll}>
                        View All <ArrowRight size={13} />
                    </button>
                )}
            </div>
            <div className={`pp-section-body${scrollable ? " pp-scrollable" : ""}`}>{children}</div>
        </div>
    );
}

/* ════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════ */
export default function PatientProfilePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pid = searchParams.get("id") || "PT-2025-00123";
    const p = patientsDB[pid] || patientsDB["PT-2025-00123"];
    const [expandedTl, setExpandedTl] = useState(null);
    const from = decodeURIComponent(searchParams.get("from") || "");

    return (
        <div className="pp-wrap">

            {/* Back link */}
            <button onClick={() => router.back()} className="pp-back-link">
                <ArrowLeft size={16} />
                Back to {from.includes("video") ? "Video Call" : from.includes("audio") ? "Audio Call" : from.includes("patients") ? "Patient List" : "Messages"}
            </button>

            {/* ── TOP ROW: Hero card + Stats ──────────────────────── */}
            <div className="pp-top-row">

                {/* Hero Identity Card */}
                <div className="pp-hero-card">
                    <div className="pp-hero-banner">
                        <div className="pp-avatar-wrap">
                            <img
                                src={p.photo}
                                alt={p.name}
                                className="pp-avatar"
                                onError={e => {
                                    e.currentTarget.style.display = "none";
                                    e.currentTarget.nextSibling.style.display = "flex";
                                }}
                            />
                            <div className="pp-avatar-placeholder" style={{ display: "none" }}>
                                <User size={32} />
                            </div>
                            {p.online && <span className="pp-online-ring" />}
                        </div>
                        <div className="pp-hero-banner-overlay">
                            <h2 className="pp-hero-banner-name">{p.name}</h2>
                            <p className="pp-hero-banner-id">{p.id}</p>
                        </div>
                    </div>
                    <div className="pp-hero-body">
                        <div className="pp-basic-chips">
                            <span className="pp-chip">{p.age} years</span>
                            <span className="pp-chip">{p.gender}</span>
                            <span className="pp-chip blood">🩸 {p.bloodGroup}</span>
                            <span className="pp-chip">{p.height} / {p.weight}</span>
                        </div>
                        <div className="pp-contact-list">
                            <div className="pp-contact-row">
                                <Phone size={14} />
                                <span>{p.contact.phone}</span>
                            </div>
                            <div className="pp-contact-row">
                                <AlertTriangle size={14} />
                                <span style={{ fontSize: 11.5 }}>{p.contact.emergency.phone} · {p.contact.emergency.name} ({p.contact.emergency.relation})</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary Stats */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div className="pp-summary-grid">
                        {[
                            { icon: "consult", color: "blue", num: p.stats.totalConsultations, label: "Total Consultations" },
                            { icon: "calendar", color: "green", num: p.stats.lastConsultation, label: "Last Consultation" },
                            { icon: "rx", color: "purple", num: p.stats.activePrescriptions, label: "Active Prescriptions" },
                            { icon: "report", color: "orange", num: p.stats.uploadedReports, label: "Uploaded Reports" },
                            { icon: "heart", color: "pink", num: p.stats.chronicCount, label: "Chronic Conditions" },
                        ].map((s, i) => {
                            const IconComponent = getIcon(s.icon);
                            return (
                                <div key={i} className={`pp-stat-box ${s.color}`}>
                                    <div className={`pp-stat-icon ${s.color}`}>
                                        <IconComponent size={20} />
                                    </div>
                                    <div className="pp-stat-info">
                                        <p className="pp-stat-num">{s.num}</p>
                                        <p className="pp-stat-label">{s.label}</p>
                                    </div>
                                </div>
                            );
                        })}


                        {/* Current Consultation spans full row */}
                        <div className="pp-current-consult">
                            <div>
                                <span className="pp-consult-badge"><Video size={12} />Live Consultation</span>
                            </div>
                            {[
                                { key: "Date & Time", val: `${p.currentConsult.date} · ${p.currentConsult.time}` },
                                { key: "Type", val: p.currentConsult.type },
                                { key: "Duration", val: p.currentConsult.duration },
                                { key: "Chief Complaint", val: p.currentConsult.complaint },
                                { key: "Symptoms", val: p.currentConsult.symptoms },
                            ].map((item) => (
                                <div key={item.key} className="pp-consult-group">
                                    <span className="pp-consult-key">{item.key}</span>
                                    <span className="pp-consult-val">{item.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MAIN CONTENT ROW ───────────────────────────────── */}
            <div className="pp-content-row">

                {/* LEFT COLUMN */}
                <div className="pp-main-col">

                    {/* Current Medications row + Vital Signs row*/}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "stretch" }}>


                        {/* Current Medications */}
                        <Section icon="rx" title="Current Medications" scrollable>
                            <table className="pp-med-table">
                                <thead>
                                    <tr>
                                        <th>Medicine</th>
                                        <th>Dosage</th>
                                        <th>Frequency</th>
                                        <th>Since</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {p.medications.map((m, i) => (
                                        <tr key={i}>
                                            <td style={{ fontWeight: 700 }}>{m.name}</td>
                                            <td><span className="pp-med-pill">{m.dosage}</span></td>
                                            <td><span className="pp-med-freq">{m.frequency}</span></td>
                                            <td style={{ color: "#94a3b8", fontSize: 12 }}>{m.since}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Section>

                        {/* Vital Signs */}
                        <Section icon="vital" title="Vital Signs" scrollable>
                            <table className="pp-vitals-table">
                                <thead>
                                    <tr>
                                        <th>Parameter</th>
                                        <th>Value</th>
                                        <th>Status</th>
                                        <th>Recorded</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {p.vitals.map((v, i) => {
                                        const IconComponent = getIcon(v.icon);
                                        return (
                                            <tr key={i}>
                                                <td>
                                                    <div className="pp-vital-name">
                                                        <IconComponent size={14} />
                                                        {v.name}
                                                    </div>
                                                </td>
                                                <td><span className="pp-vital-val">{v.value}</span></td>
                                                <td><span className={`pp-vital-status ${v.status}`}>{v.status.charAt(0).toUpperCase() + v.status.slice(1)}</span></td>
                                                <td style={{ fontSize: 11, color: "#94a3b8" }}>{v.date}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </Section>
                    </div>

                    {/* Medical History  + Allergies */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "stretch" }}>


                        {/* Medical History */}
                        <Section icon="stethoscope" title="Medical History" scrollable>
                            <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Chronic Diseases</p>
                            <div className="pp-disease-list" style={{ marginBottom: 14 }}>
                                {p.chronicDiseases.length > 0
                                    ? p.chronicDiseases.map(d => (
                                        <span key={d} className="pp-disease-tag active"><AlertCircle size={12} />{d}</span>
                                    ))
                                    : <span className="pp-no-allergy">✓ No Chronic Diseases</span>
                                }
                            </div>
                            <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Past Illnesses</p>
                            <div className="pp-disease-list" style={{ marginBottom: 14 }}>
                                {p.pastIllnesses.map(d => (
                                    <span key={d} className="pp-disease-tag resolved">{d}</span>
                                ))}
                            </div>
                            {p.hospitalAdmissions.length > 0 && (
                                <>
                                    <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Hospital Admissions</p>
                                    <div className="pp-disease-list">
                                        {p.hospitalAdmissions.map(d => (
                                            <span key={d} className="pp-disease-tag active" style={{ background: "#fff7ed", color: "#ea580c", borderColor: "#fed7aa" }}>{d}</span>
                                        ))}
                                    </div>
                                </>
                            )}
                        </Section>

                        {/* Allergies */}
                        <Section icon="alert" title="Allergies & Sensitivities" scrollable>
                            <div className="pp-allergy-group">
                                {p.allergies.drug.length > 0 && (
                                    <div>
                                        <p className="pp-allergy-category">Drug Allergies</p>
                                        <div className="pp-allergy-tags">
                                            {p.allergies.drug.map(a => <span key={a} className="pp-allergy-tag drug"><AlertCircle size={12} />{a}</span>)}
                                        </div>
                                    </div>
                                )}
                                {p.allergies.food.length > 0 && (
                                    <div>
                                        <p className="pp-allergy-category">Food Allergies</p>
                                        <div className="pp-allergy-tags">
                                            {p.allergies.food.map(a => <span key={a} className="pp-allergy-tag food">{a}</span>)}
                                        </div>
                                    </div>
                                )}
                                {p.allergies.other.length > 0 && (
                                    <div>
                                        <p className="pp-allergy-category">Environmental / Other</p>
                                        <div className="pp-allergy-tags">
                                            {p.allergies.other.map(a => <span key={a} className="pp-allergy-tag other">{a}</span>)}
                                        </div>
                                    </div>
                                )}
                                {p.allergies.drug.length === 0 && p.allergies.food.length === 0 && p.allergies.other.length === 0 && (
                                    <span className="pp-no-allergy">✓ No Known Allergies</span>
                                )}
                            </div>
                        </Section>

                    </div>

                    {/* Medical Reports */}
                    <Section icon="report" title="Medical Reports" scrollable>
                        <div className="pp-reports-grid">
                            {p.reports.map((r, i) => {
                                const IconComponent = getIcon("doc");
                                return (
                                    <div key={i} className="pp-report-card">
                                        <div className={`pp-report-icon ${r.color}`}>
                                            <IconComponent size={18} />
                                        </div>
                                        <div className="pp-report-info">
                                            <p className="pp-report-name">{r.name}</p>
                                            <p className="pp-report-date">{r.date} · {r.category}</p>
                                        </div>
                                        <div className="pp-report-actions">
                                            <button className="pp-report-btn"><Eye size={13} /></button>
                                            <button className="pp-report-btn"><Download size={13} /></button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Section>

                    {/* Allergies + Vital Signs row */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "stretch" }}>
                        {/* Consultation History */}
                        <Section icon="calendar" title="Consultation History" scrollable>
                            <div className="pp-timeline">
                                {p.consultationHistory.map((c, i) => {
                                    const IconComponent = getIcon("consult");
                                    return (
                                        <div key={i} className="pp-timeline-item">
                                            <div className={`pp-tl-dot-wrap ${c.color}`}>
                                                <IconComponent size={16} />
                                            </div>
                                            <div className="pp-tl-body">
                                                <div className="pp-tl-header">
                                                    <h4 className="pp-tl-title">{c.dept}</h4>
                                                    <span className="pp-tl-date">{c.date}</span>
                                                </div>
                                                <p className="pp-tl-meta">{c.doctor} · {c.type} Consultation</p>
                                                {expandedTl === i ? (
                                                    <>
                                                        <div className="pp-tl-detail">{c.notes}</div>
                                                        <button className="pp-tl-expand-btn" style={{ marginTop: 8 }} onClick={() => setExpandedTl(null)}>
                                                            Hide Details <ChevronDown size={12} />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button className="pp-tl-expand-btn" onClick={() => setExpandedTl(i)}>
                                                        View Notes <ArrowRight size={12} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Section>

                        {/* Surgical History */}
                        <Section icon="scissors" title="Surgical History" scrollable>
                            {p.surgeries.length > 0 ? (
                                <div className="pp-surgery-list">
                                    {p.surgeries.map((s, i) => (
                                        <div key={i} className="pp-surgery-item">
                                            <div className="pp-surgery-icon"><Scissors size={16} /></div>
                                            <div className="pp-surgery-info">
                                                <p className="pp-surgery-name">{s.name}</p>
                                                <p className="pp-surgery-meta">{s.hospital} · {s.date}</p>
                                            </div>
                                            <span className="pp-surgery-outcome success">{s.outcome}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="pp-empty">
                                    <Scissors size={32} />
                                    <p>No surgical history recorded</p>
                                </div>
                            )}
                        </Section>
                    </div>

                </div>

                {/* RIGHT SIDEBAR */}
                <div className="pp-side-col">

                    {/* Past Prescriptions */}
                    <Section icon="rx" title="Past Prescriptions" scrollable>
                        <div className="pp-rx-list">
                            {p.prescriptions.map((rx, i) => (
                                <div key={i} className="pp-rx-item">
                                    <div className="pp-rx-icon"><FileText size={18} /></div>
                                    <div className="pp-rx-info">
                                        <p className="pp-rx-name">{rx.diagnosis}</p>
                                        <p className="pp-rx-meta">{rx.doctor} · {rx.date}</p>
                                    </div>
                                    <button className="pp-rx-download"><Download size={14} /></button>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* Family Medical History */}
                    <Section icon="family" title="Family Medical History" scrollable>
                        <div className="pp-family-grid">
                            {p.familyHistory.map((f, i) => (
                                <div key={i} className={`pp-family-item ${f.present ? "yes" : "no"}`}>
                                    <span className="pp-family-icon">{f.emoji}</span>
                                    <span className="pp-family-label">{f.condition}</span>
                                    <span className="pp-family-status">{f.present ? "Present" : "None"}</span>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* Lifestyle */}
                    <Section icon="leaf" title="Lifestyle & Habits" scrollable>
                        <div className="pp-lifestyle-grid">
                            {[
                                { emoji: "🚬", key: "Smoking", val: p.lifestyle.smoking },
                                { emoji: "🍷", key: "Alcohol", val: p.lifestyle.alcohol },
                                { emoji: "🏃", key: "Activity", val: p.lifestyle.activity },
                                { emoji: "😴", key: "Sleep", val: p.lifestyle.sleep },
                            ].map((l) => (
                                <div key={l.key} className="pp-lifestyle-item">
                                    <span className="pp-lifestyle-icon">{l.emoji}</span>
                                    <div>
                                        <p className="pp-lifestyle-key">{l.key}</p>
                                        <p className="pp-lifestyle-val">{l.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>

                </div>
            </div>
        </div >
    );
}