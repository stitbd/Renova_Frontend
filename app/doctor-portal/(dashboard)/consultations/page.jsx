// app/doctor-portal/consultations/page.jsx
"use client";

import { useState } from "react";
import "./consultations.css";

const consultationsData = [
  { id: 1, patient: "Khalid Hasan", age: 45, gender: "Male", date: "10 May 2025", time: "09:15 AM", condition: "Hypertension", diagnosis: "Stage 2 Hypertension", treatment: "Prescribed medication and lifestyle changes", fee: "500", status: "completed" },
  { id: 2, patient: "Maliha Islam", age: 29, gender: "Female", date: "10 May 2025", time: "08:30 AM", condition: "Anxiety Disorder", diagnosis: "Generalized Anxiety", treatment: "Therapy recommended", fee: "500", status: "completed" },
  { id: 3, patient: "Rashidul Alam", age: 52, gender: "Male", date: "09 May 2025", time: "07:45 PM", condition: "ECG Review", diagnosis: "Normal ECG", treatment: "Regular monitoring advised", fee: "600", status: "completed" },
  { id: 4, patient: "Nasrin Akter", age: 38, gender: "Female", date: "09 May 2025", time: "05:30 PM", condition: "Chest Pain", diagnosis: "Angina", treatment: "Medication prescribed", fee: "700", status: "completed" },
];

export default function ConsultationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  return (
    <div className="dashboard-content">
      <div className="consultations-grid">
        {consultationsData.map((consultation) => (
          <div key={consultation.id} className="consultation-card">
            <div className="consultation-header">
              <div className="patient-info-block">
                <div className="patient-avatar-medium">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <h3 className="patient-name-medium">{consultation.patient}</h3>
                  <p className="patient-age-gender">{consultation.age} Years, {consultation.gender}</p>
                </div>
              </div>
              <div className="consultation-meta">
                <span className="date-time">{consultation.date}, {consultation.time}</span>
                <span className="fee-badge">৳{consultation.fee}</span>
              </div>
            </div>

            <div className="consultation-details">
              <div className="detail-row">
                <span className="detail-label">Condition:</span>
                <span className="detail-value">{consultation.condition}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Diagnosis:</span>
                <span className="detail-value">{consultation.diagnosis}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Treatment:</span>
                <span className="detail-value">{consultation.treatment}</span>
              </div>
            </div>

            <div className="consultation-actions">
              <button className="btn-secondary-sm">View Prescription</button>
              <button className="btn-outline-sm">View Report</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


