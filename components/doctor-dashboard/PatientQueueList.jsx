"use client";

import { useRouter } from "next/navigation";

// components/doctor-dashboard/PatientQueueList.jsx
export default function PatientQueueList({ appointments }) {
  const router = useRouter();

  return (
    <div>
      <div className="section-header-dashboard">
        <h2 className="section-title">
          Pending Patients
          <span className="section-count-badge">6</span>
        </h2>
        <a
          href="/doctor-portal/patient-queue"
          onClick={(e) => {
            e.preventDefault();
            router.push("/doctor-portal/patient-queue");
          }}
          className="view-all-link"
        >
          View All
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>
      </div>

      <div className="patient-queue-list">
        {appointments?.slice(0, 5)?.map?.((patient, index) => (
          <div key={patient?.id || index} className="patient-queue-item">
            <div className="queue-number">{index + 1}</div>

            <div className="patient-avatar">
              {patient?.patient?.avatar ? (
                <img
                  src={patient.patient.avatar}
                  alt={patient?.patient?.fullName}
                />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
            </div>

            <div className="patient-info">
              <p className="patient-name">Sabbir Hossain</p>
              <p className="patient-meta">25Y • Male</p>
              <p className="patient-issue">Fever and headache</p>
            </div>

            <div className="queue-actions">
              <button className="btn-queue-action btn-accept">Accept</button>
              <button className="btn-queue-action btn-reject">Reject</button>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => router.push("/doctor-portal/patient-queue")}
        className="view-all-queue-btn"
      >
        View All Queue
      </button>
    </div>
  );
}