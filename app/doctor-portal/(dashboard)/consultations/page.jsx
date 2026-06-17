// app/doctor-portal/consultations/page.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import "./consultations.css";
import {
  Users,
  DollarSign,
  Clock,
  Calendar,
  FileText,
  Search,
  User,
  Phone,
  Mail,
  Eye,
  ChevronDown,
  ChevronUp,
  Prescription,
  Activity
} from "lucide-react";

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
            <Users size={17} />
          </div>
          <div>
            <span className="con-stat-num">{consultationsData.length}</span>
            <span className="con-stat-lbl">Total Consultations</span>
          </div>
        </div>
        <div className="con-stat-card">
          <div className="con-stat-icon revenue-icon">
            <DollarSign size={17} />
          </div>
          <div>
            <span className="con-stat-num">৳{totalRevenue.toLocaleString()}</span>
            <span className="con-stat-lbl">Total Revenue</span>
          </div>
        </div>
        <div className="con-stat-card">
          <div className="con-stat-icon duration-icon">
            <Clock size={17} />
          </div>
          <div>
            <span className="con-stat-num">{avgDuration} min</span>
            <span className="con-stat-lbl">Avg Duration</span>
          </div>
        </div>
        <div className="con-stat-card">
          <div className="con-stat-icon followup-icon">
            <Calendar size={17} />
          </div>
          <div>
            <span className="con-stat-num">{withFollowUp}</span>
            <span className="con-stat-lbl">Follow-ups Booked</span>
          </div>
        </div>
        <div className="con-stat-card">
          <div className="con-stat-icon rx-icon">
            <FileText size={17} />
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
          <Search size={16} />
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
            <FileText size={48} stroke="#cbd5e1" />
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
                      <User size={22} />
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
                    <Calendar size={13} className="con-meta-icon" />
                    <span>{c.date}, {c.time}</span>
                  </div>
                  <div className="con-meta-row">
                    <Clock size={13} className="con-meta-icon" />
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
                      <FileText size={14} />
                      View Prescription
                    </Link>
                  )}
                  <button className="con-btn report">
                    <FileText size={14} />
                    View Report
                  </button>
                  <Link href={`/doctor-portal/patients/patient-profile?id=${c.patientId}`} className="con-btn profile">
                    <User size={14} />
                    Patient Profile
                  </Link>
                </div>
                <button
                  className="con-expand-btn"
                  onClick={() => setExpanded(isOpen ? null : c.id)}
                >
                  {isOpen ? (
                    <>Less <ChevronUp size={13} /></>
                  ) : (
                    <>More <ChevronDown size={13} /></>
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