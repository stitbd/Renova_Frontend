// app/doctor-portal/prescriptions/page.jsx
"use client";

import { useState } from "react";
import "@/styles/pages/doctor-dashboard.css";

const prescriptionsData = [
  { id: 1, patient: "Masud Rana", date: "10 May 2025", time: "10:24 AM", medications: ["Aspirin 75mg", "Atorvastatin 20mg", "Metoprolol 50mg"], status: "pending", type: "New Prescription" },
  { id: 2, patient: "Farhana Akter", date: "10 May 2025", time: "10:28 AM", medications: ["Alprazolam 0.5mg", "Sertraline 50mg"], status: "pending", type: "New Prescription" },
  { id: 3, patient: "Abdullah Al Mamun", date: "10 May 2025", time: "10:31 AM", medications: ["Amlodipine 5mg", "Losartan 50mg"], status: "pending", type: "New Prescription" },
  { id: 4, patient: "Khalid Hasan", date: "09 May 2025", time: "09:15 AM", medications: ["Lisinopril 10mg", "Hydrochlorothiazide 25mg"], status: "completed", type: "Refill" },
];

export default function PrescriptionsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const filteredPrescriptions = prescriptionsData.filter(pres => 
    filter === "all" || pres.status === filter
  );

    return (
    <div className="dashboard-content">
          <div className="prescription-filters">
            <button 
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All Prescriptions
            </button>
            <button 
              className={`filter-btn ${filter === "pending" ? "active" : ""}`}
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>
            <button 
              className={`filter-btn ${filter === "completed" ? "active" : ""}`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>

          <div className="prescriptions-list">
            {filteredPrescriptions.map((prescription) => (
              <div key={prescription.id} className="prescription-card-full">
                <div className="prescription-header">
                  <div className="prescription-patient">
                    <div className="patient-avatar-small">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="patient-name">{prescription.patient}</h4>
                      <p className="prescription-date">{prescription.date}, {prescription.time}</p>
                    </div>
                  </div>
                  <span className={`status-badge ${prescription.status}`}>
                    {prescription.status === "pending" ? "Pending" : "Completed"}
                  </span>
                </div>
                
                <div className="prescription-medications">
                  <h5>Medications:</h5>
                  <ul className="medication-list">
                    {prescription.medications.map((med, index) => (
                      <li key={index} className="medication-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
                        </svg>
                        {med}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="prescription-actions">
                  <button className="btn-secondary-sm">Edit</button>
                  <button className="btn-primary-sm">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
  );
}


