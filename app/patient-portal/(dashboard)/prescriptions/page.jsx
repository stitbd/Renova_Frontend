// app/patient/prescriptions/page.jsx
"use client";

import { useState } from "react";

const prescriptionsData = [
  { id: 1, doctor: "Dr. Afsana Rahman", specialty: "Dermatologist", date: "10 May 2025", medications: ["Cetirizine 10mg - 1 tablet daily", "Calamine Lotion - Apply twice daily"], duration: "7 days", status: "Active" },
  { id: 2, doctor: "Dr. Tasnim Farin", specialty: "Cardiologist", date: "20 Mar 2025", medications: ["Atorvastatin 20mg - 1 tablet at night", "Aspirin 75mg - 1 tablet daily"], duration: "30 days", status: "Completed" },
  { id: 3, doctor: "Dr. Kamal Hossain", specialty: "General Physician", date: "05 Feb 2025", medications: ["Paracetamol 500mg - As needed for fever", "Vitamin C 500mg - 1 tablet daily"], duration: "5 days", status: "Completed" },
];

export default function PrescriptionsPage() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="prescriptions-list">
      {prescriptionsData.map((prescription) => (
        <div key={prescription.id} className="prescription-card">
          <div className="prescription-header" onClick={() => setExpandedId(expandedId === prescription.id ? null : prescription.id)}>
            <div className="prescription-doctor">
              <div className="doctor-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <h3 className="doctor-name">{prescription.doctor}</h3>
                <p className="doctor-specialty">{prescription.specialty}</p>
              </div>
            </div>
            <div className="prescription-meta">
              <span className="prescription-date">{prescription.date}</span>
              <span className={`prescription-status status-${prescription.status.toLowerCase()}`}>{prescription.status}</span>
            </div>
            <svg className={`expand-icon ${expandedId === prescription.id ? "expanded" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {expandedId === prescription.id && (
            <div className="prescription-details">
              <div className="medications-list">
                <h4>Medications:</h4>
                <ul>
                  {prescription.medications.map((med, idx) => (
                    <li key={idx} className="medication-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
                      </svg>
                      {med}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="prescription-footer">
                <span className="duration">Duration: {prescription.duration}</span>
                <div className="prescription-actions">
                  <button className="btn-download-pdf">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download PDF
                  </button>
                  <button className="btn-reminder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Set Reminder
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}