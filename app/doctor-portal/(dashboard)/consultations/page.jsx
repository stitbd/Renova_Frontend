// app/doctor-portal/consultations/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import "./consultations.css";

const consultationsData = [
  { id: 1, patient: "Khalid Hasan", age: 45, gender: "Male", date: "10 May 2025", time: "09:15 AM", condition: "Hypertension", diagnosis: "Stage 2 Hypertension", treatment: "Prescribed medication and lifestyle changes", fee: "500", duration: "22 min", type: "In-person", followUp: "25 May 2025", prescription: true, status: "completed", patientId: "PT-2025-00210", phone: "01712-345678", avatar: "/images/patients/01.jpg", bloodGroup: "B+", notes: "Patient advised to reduce sodium intake." },
  { id: 2, patient: "Maliha Islam", age: 29, gender: "Female", date: "10 May 2025", time: "08:30 AM", condition: "Anxiety Disorder", diagnosis: "Generalized Anxiety", treatment: "Therapy recommended and mild anxiolytic", fee: "500", duration: "18 min", type: "Video", followUp: "30 May 2025", prescription: true, status: "completed", patientId: "PT-2025-00198", phone: "01811-223344", avatar: "/images/patients/02.jpg", bloodGroup: "A+", notes: "Refer to therapist if no improvement in 2 weeks." },
  { id: 3, patient: "Rashidul Alam", age: 52, gender: "Male", date: "09 May 2025", time: "07:45 PM", condition: "ECG Review", diagnosis: "Normal ECG", treatment: "Regular monitoring advised", fee: "600", duration: "15 min", type: "In-person", followUp: "None", prescription: false, status: "completed", patientId: "PT-2025-00176", phone: "01912-556677", avatar: "/images/patients/03.jpg", bloodGroup: "O+", notes: "Schedule follow-up ECG in 6 months." },
  { id: 4, patient: "Nasrin Akter", age: 38, gender: "Female", date: "09 May 2025", time: "05:30 PM", condition: "Chest Pain", diagnosis: "Angina", treatment: "Medication prescribed, stress test ordered", fee: "700", duration: "25 min", type: "Audio", followUp: "20 May 2025", prescription: true, status: "completed", patientId: "PT-2025-00155", phone: "01712-998877", avatar: "/images/patients/04.jpg", bloodGroup: "AB+", notes: "Avoid strenuous activity until stress test done." },
  { id: 5, patient: "Tariqul Islam", age: 60, gender: "Male", date: "08 May 2025", time: "10:00 AM", condition: "Diabetes Type 2", diagnosis: "Uncontrolled DM", treatment: "Insulin dose adjusted, diet chart given", fee: "500", duration: "30 min", type: "In-person", followUp: "22 May 2025", prescription: true, status: "completed", patientId: "PT-2025-00142", phone: "01611-445566", avatar: "/images/patients/05.jpg", bloodGroup: "B-", notes: "Check HbA1c in next visit." },
  { id: 6, patient: "Sharmin Sultana", age: 34, gender: "Female", date: "08 May 2025", time: "09:00 AM", condition: "Shortness of Breath", diagnosis: "Mild Asthma", treatment: "Inhaler prescribed, avoid allergens", fee: "450", duration: "20 min", type: "Video", followUp: "28 May 2025", prescription: true, status: "completed", patientId: "PT-2025-00130", phone: "01922-334455", avatar: "/images/patients/06.jpg", bloodGroup: "A-", notes: "Spirometry recommended." },
];

const typeColors = {
  "In-person": { bg: "#f0fdf4", color: "#166534" },
  "Video": { bg: "#eff6ff", color: "#1e40af" },
  "Audio": { bg: "#fdf4ff", color: "#7e22ce" },
};

export default function ConsultationsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const filtered = consultationsData.filter(c => {
    const matchSearch = c.patient.toLowerCase().includes(search.toLowerCase()) ||
      c.condition.toLowerCase().includes(search.toLowerCase()) ||
      c.patientId.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || c.type === typeFilter;
    return matchSearch && matchType;
  });

  // Summary stats
  const totalRevenue = consultationsData.reduce((sum, c) => sum + parseInt(c.fee), 0);
  const avgDuration = Math.round(consultationsData.reduce((sum, c) => sum + parseInt(c.duration), 0) / consultationsData.length);
  const withFollowUp = consultationsData.filter(c => c.followUp !== "None").length;
  const withPrescription = consultationsData.filter(c => c.prescription).length;

  return (
    <div className="dashboard-content">

      {/* ── Summary Bar ──────────────────────────────────── */}
      <div className="con-stats-row">
        <div className="con-stat-card">
          <div className="con-stat-icon total-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
          </div>
          <div>
            <span className="con-stat-num">{consultationsData.length}</span>
            <span className="con-stat-lbl">Total Consultations</span>
          </div>
        </div>
        <div className="con-stat-card">
          <div className="con-stat-icon revenue-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
          </div>
          <div>
            <span className="con-stat-num">৳{totalRevenue.toLocaleString()}</span>
            <span className="con-stat-lbl">Total Revenue</span>
          </div>
        </div>
        <div className="con-stat-card">
          <div className="con-stat-icon duration-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
          </div>
          <div>
            <span className="con-stat-num">{avgDuration} min</span>
            <span className="con-stat-lbl">Avg Duration</span>
          </div>
        </div>
        <div className="con-stat-card">
          <div className="con-stat-icon followup-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
          </div>
          <div>
            <span className="con-stat-num">{withFollowUp}</span>
            <span className="con-stat-lbl">Follow-ups Booked</span>
          </div>
        </div>
        <div className="con-stat-card">
          <div className="con-stat-icon rx-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" /></svg>
          </div>
          <div>
            <span className="con-stat-num">{withPrescription}</span>
            <span className="con-stat-lbl">Prescriptions Issued</span>
          </div>
        </div>
      </div>

      {/* ── Controls ─────────────────────────────────────── */}
      <div className="con-controls">
        <div className="con-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          <input
            type="text"
            placeholder="Search by patient, condition, or ID…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="con-type-filters">
          {["all", "In-person", "Video", "Audio"].map(t => (
            <button
              key={t}
              className={`con-type-btn${typeFilter === t ? " active" : ""}`}
              onClick={() => setTypeFilter(t)}
            >
              {t === "all" ? "All Types" : t}
            </button>
          ))}
        </div>
      </div>

      {/* ── Consultation Cards ───────────────────────────── */}
      <div className="con-list">
        {filtered.length === 0 && (
          <div className="con-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" /></svg>
            <p>No consultations found</p>
          </div>
        )}

        {filtered.map(c => {
          const tc = typeColors[c.type] || { bg: "#f8fafc", color: "#64748b" };
          const isOpen = expanded === c.id;
          return (
            <div key={c.id} className="con-card">
              {/* Card Header */}
              <div className="con-card-header">
                {/* Patient */}
                <div className="con-patient-block">
                  <div className="con-avatar">
                    <img src={c.avatar} alt={c.patient}
                      onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
                    />
                    <span className="con-avatar-fallback">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    </span>
                  </div>
                  <div>
                    <div className="con-name-row">
                      <h3 className="con-patient-name">{c.patient}</h3>
                      <span className="con-type-pill" style={{ background: tc.bg, color: tc.color }}>
                        {c.type}
                      </span>
                      {c.prescription && (
                        <span className="con-rx-pill">Rx Issued</span>
                      )}
                    </div>
                    <p className="con-patient-meta">{c.age} yrs • {c.gender} • {c.patientId} • {c.phone}</p>
                    <p className="con-condition">{c.condition}</p>
                  </div>
                </div>

                {/* Meta */}
                <div className="con-meta-block">
                  <div className="con-meta-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="con-meta-icon"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                    <span>{c.date}, {c.time}</span>
                  </div>
                  <div className="con-meta-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="con-meta-icon"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    <span>{c.duration}</span>
                  </div>
                  <div className="con-fee-badge">৳{c.fee}</div>
                </div>
              </div>

              {/* Diagnosis & Treatment Row */}
              <div className="con-details-row">
                <div className="con-detail-item">
                  <span className="con-detail-lbl">Diagnosis</span>
                  <span className="con-detail-val">{c.diagnosis}</span>
                </div>
                <div className="con-detail-item">
                  <span className="con-detail-lbl">Treatment</span>
                  <span className="con-detail-val">{c.treatment}</span>
                </div>
                <div className="con-detail-item">
                  <span className="con-detail-lbl">Follow-up</span>
                  <span className={`con-detail-val${c.followUp === "None" ? " no-followup" : " has-followup"}`}>
                    {c.followUp}
                  </span>
                </div>
              </div>

              {/* Expandable Notes */}
              {isOpen && (
                <div className="con-notes-row">
                  <div className="con-notes-block">
                    <span className="con-notes-lbl">Doctor Notes</span>
                    <p className="con-notes-text">{c.notes}</p>
                  </div>
                  <div className="con-extra-grid">
                    <div className="con-extra-item">
                      <span className="con-extra-lbl">Blood Group</span>
                      <span className="con-extra-val">{c.bloodGroup}</span>
                    </div>
                    <div className="con-extra-item">
                      <span className="con-extra-lbl">Phone</span>
                      <span className="con-extra-val">{c.phone}</span>
                    </div>
                    <div className="con-extra-item">
                      <span className="con-extra-lbl">Patient ID</span>
                      <span className="con-extra-val">{c.patientId}</span>
                    </div>
                    <div className="con-extra-item">
                      <span className="con-extra-lbl">Consultation Type</span>
                      <span className="con-extra-val">{c.type}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="con-actions">
                <div className="con-action-btns">
                  {c.prescription && (

                    <Link href="/doctor-portal/prescriptions/prescriptions-details" className="con-btn prescription">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" /></svg>
                      View Prescription
                    </Link>
                  )}
                  <button className="con-btn report">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                    View Report
                  </button>
                  <Link href={`/doctor-portal/patients/patient-profile?id=${c.patientId}`} className="con-btn profile">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    Patient Profile
                  </Link>
                </div>
                <button
                  className="con-expand-btn"
                  onClick={() => setExpanded(isOpen ? null : c.id)}
                >
                  {isOpen ? (
                    <>Less <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15" /></svg></>
                  ) : (
                    <>More <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg></>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}