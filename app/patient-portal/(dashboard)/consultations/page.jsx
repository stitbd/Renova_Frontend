// app/patient/consultations/page.jsx
"use client";

const consultationsData = [
  { id: 1, doctor: "Dr. Afsana Rahman", specialty: "Dermatologist", date: "10 May 2025", time: "11:00 AM", type: "Video Call", diagnosis: "Mild acne and skin sensitivity", prescription: true, report: true, fee: "৳500" },
  { id: 2, doctor: "Dr. Tasnim Farin", specialty: "Cardiologist", date: "20 Mar 2025", time: "09:30 AM", type: "In-Person", diagnosis: "Routine cardiac checkup - Normal findings", prescription: true, report: true, fee: "৳700" },
  { id: 3, doctor: "Dr. Kamal Hossain", specialty: "General Physician", date: "05 Feb 2025", time: "03:00 PM", type: "Video Call", diagnosis: "Viral fever - Advised rest and hydration", prescription: true, report: false, fee: "৳400" },
];

export default function ConsultationsPage() {
  return (
    <div className="consultations-list">
      {consultationsData.map((consultation) => (
        <div key={consultation.id} className="consultation-card">
          <div className="consultation-header">
            <div className="consultation-doctor">
              <div className="doctor-avatar-large">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <h3 className="doctor-name">{consultation.doctor}</h3>
                <p className="doctor-specialty">{consultation.specialty}</p>
                <span className="consultation-type">{consultation.type}</span>
              </div>
            </div>
            <div className="consultation-meta">
              <div className="consultation-datetime">
                <span className="consultation-date">{consultation.date}</span>
                <span className="consultation-time">{consultation.time}</span>
              </div>
              <span className="consultation-fee">{consultation.fee}</span>
            </div>
          </div>

          <div className="consultation-body">
            <div className="diagnosis-section">
              <h4>Diagnosis:</h4>
              <p className="diagnosis-text">{consultation.diagnosis}</p>
            </div>
            <div className="consultation-tags">
              {consultation.prescription && <span className="tag tag-prescription">Prescription Available</span>}
              {consultation.report && <span className="tag tag-report">Report Available</span>}
            </div>
          </div>

          <div className="consultation-actions">
            <button className="btn-view-details">View Details</button>
            {consultation.prescription && <button className="btn-view-prescription">View Prescription</button>}
            {consultation.report && <button className="btn-view-report">View Report</button>}
            <button className="btn-book-again">Book Again</button>
          </div>
        </div>
      ))}
    </div>
  );
}