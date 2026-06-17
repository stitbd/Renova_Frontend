"use client";

import { useRouter } from "next/navigation";
import { User, ArrowRight, Check, X } from "lucide-react";

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
          <ArrowRight size={16} />
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
                <User size={18} />
              )}
            </div>

            <div className="patient-info">
              <p className="patient-name">Sabbir Hossain</p>
              <p className="patient-meta">25Y • Male</p>
              <p className="patient-issue">Fever and headache</p>
            </div>

            <div className="queue-actions">
              <button className="btn-queue-action btn-accept"><Check size={14} /> Accept</button>
              <button className="btn-queue-action btn-reject"><X size={14} /> Reject</button>
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