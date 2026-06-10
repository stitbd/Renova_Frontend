"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import "./patient-profile.css";

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
            occupation: "Business Owner",
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
            occupation: "Student",
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

/* ── Inline SVG Icons ──────────────────────────────────────────── */
function Icon({ type, cls = "" }) {
    const map = {
        back: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>,
        user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
        phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12 19.79 19.79 0 0 1 1 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
        mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
        alert: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
        calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
        video: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>,
        clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
        rx: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" /></svg>,
        doc: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
        activity: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
        heart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>,
        thermometer: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" /></svg>,
        droplet: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>,
        zap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
        scissors: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" /></svg>,
        download: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
        eye: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
        chevdown: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>,
        arrowright: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>,
        consult: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
        blood: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>,
        stethoscope: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" /><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" /><circle cx="20" cy="10" r="2" /></svg>,
        note: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
        warning: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /></svg>,
        family: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
        leaf: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 8C8 10 5.9 16.17 3.82 19.22L2 21" /><path d="M8 10s4 2 7-1 3-9 3-9-9 2-10 7c-.4 1.7-.04 3.4.5 5" /></svg>,
        lock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
        followup: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>,
        report: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
        vital: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
    };
    return <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>{map[type] || null}</span>;
}

/* ── Reusable Section Card ─────────────────────────────────────── */
function Section({ icon, title, onViewAll, scrollable, children }) {
    return (
        <div className="pp-section">
            <div className="pp-section-head">
                <h3 className="pp-section-title">
                    <Icon type={icon} />
                    {title}
                </h3>
                {onViewAll && (
                    <button className="pp-view-all" onClick={onViewAll}>
                        View All <Icon type="arrowright" />
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
                <span style={{ width: 16, height: 16, flexShrink: 0, display: "inline-flex" }}>
                    <Icon type="back" />
                </span>
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
                                <Icon type="user" />
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
                                <span style={{ width: 14, height: 14, flexShrink: 0, display: "inline-flex" }}><Icon type="phone" /></span>
                                <span>{p.contact.phone}</span>
                            </div>
                            {/* <div className="pp-contact-row">
                                <span style={{ width: 14, height: 14, flexShrink: 0, display: "inline-flex" }}><Icon type="mail" /></span>
                                <span style={{ fontSize: 11.5 }}>{p.contact.email}</span>
                            </div> */}
                            <div className="pp-contact-row">
                                <span style={{ width: 14, height: 14, flexShrink: 0, display: "inline-flex" }}><Icon type="alert" /></span>
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
                        ].map((s, i) => (
                            <div key={i} className="pp-stat-box">
                                <div className={`pp-stat-icon ${s.color}`}>
                                    <Icon type={s.icon} />
                                </div>
                                <div className="pp-stat-info">
                                    <p className="pp-stat-num">{s.num}</p>
                                    <p className="pp-stat-label">{s.label}</p>
                                </div>
                            </div>
                        ))}


                        {/* Current Consultation spans full row */}
                        <div className="pp-current-consult">
                            <div>
                                <span className="pp-consult-badge"><Icon type="video" />Live Consultation</span>
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
                                    {p.vitals.map((v, i) => (
                                        <tr key={i}>
                                            <td>
                                                <div className="pp-vital-name">
                                                    <span style={{ width: 14, height: 14, flexShrink: 0, display: "inline-flex" }}>
                                                        <Icon type={v.icon} />
                                                    </span>
                                                    {v.name}
                                                </div>
                                            </td>
                                            <td><span className="pp-vital-val">{v.value}</span></td>
                                            <td><span className={`pp-vital-status ${v.status}`}>{v.status.charAt(0).toUpperCase() + v.status.slice(1)}</span></td>
                                            <td style={{ fontSize: 11, color: "#94a3b8" }}>{v.date}</td>
                                        </tr>
                                    ))}
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
                                        <span key={d} className="pp-disease-tag active"><Icon type="warning" />{d}</span>
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
                                            {p.allergies.drug.map(a => <span key={a} className="pp-allergy-tag drug"><Icon type="warning" />{a}</span>)}
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
                            {p.reports.map((r, i) => (
                                <div key={i} className="pp-report-card">
                                    <div className={`pp-report-icon ${r.color}`}>
                                        <Icon type="doc" />
                                    </div>
                                    <div className="pp-report-info">
                                        <p className="pp-report-name">{r.name}</p>
                                        <p className="pp-report-date">{r.date} · {r.category}</p>
                                    </div>
                                    <div className="pp-report-actions">
                                        <button className="pp-report-btn"><Icon type="eye" /></button>
                                        <button className="pp-report-btn"><Icon type="download" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* Allergies + Vital Signs row */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "stretch" }}>
                        {/* Consultation History */}
                        <Section icon="calendar" title="Consultation History" scrollable>
                            <div className="pp-timeline">
                                {p.consultationHistory.map((c, i) => (
                                    <div key={i} className="pp-timeline-item">
                                        <div className={`pp-tl-dot-wrap ${c.color}`}>
                                            <Icon type="consult" />
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
                                                        Hide Details <Icon type="chevdown" />
                                                    </button>
                                                </>
                                            ) : (
                                                <button className="pp-tl-expand-btn" onClick={() => setExpandedTl(i)}>
                                                    View Notes <Icon type="arrowright" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Section>

                        {/* Surgical History */}
                        <Section icon="scissors" title="Surgical History" scrollable>
                            {p.surgeries.length > 0 ? (
                                <div className="pp-surgery-list">
                                    {p.surgeries.map((s, i) => (
                                        <div key={i} className="pp-surgery-item">
                                            <div className="pp-surgery-icon"><Icon type="scissors" /></div>
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
                                    <Icon type="scissors" />
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
                                    <div className="pp-rx-icon"><Icon type="rx" /></div>
                                    <div className="pp-rx-info">
                                        <p className="pp-rx-name">{rx.diagnosis}</p>
                                        <p className="pp-rx-meta">{rx.doctor} · {rx.date}</p>
                                    </div>
                                    <button className="pp-rx-download"><Icon type="download" /></button>
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
                                { emoji: "💼", key: "Occupation", val: p.lifestyle.occupation },
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