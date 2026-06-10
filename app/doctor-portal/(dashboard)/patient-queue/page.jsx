// app/doctor-portal/patient-queue/page.jsx
"use client";

import { useState } from "react";
import "./patient-queue.css";

const patientQueueData = [
  { id: 1, name: "Masud Rana", age: 32, gender: "Male", issue: "Chest pain, Breathing problem", time: "10:24 AM", waitingTime: "02:15", status: "waiting", avatar: "/images/patients/01.jpg" },
  { id: 2, name: "Farhana Akter", age: 28, gender: "Female", issue: "Heart palpitations, Anxiety", time: "10:28 AM", waitingTime: "01:48", status: "waiting", avatar: "/images/patients/02.jpg" },
  { id: 3, name: "Abdullah Al Mamun", age: 45, gender: "Male", issue: "High BP, Headache", time: "10:31 AM", waitingTime: "01:32", status: "in-progress", avatar: "/images/patients/03.jpg" },
  { id: 4, name: "Sumiya Rahman", age: 30, gender: "Female", issue: "Shortness of breath", time: "10:35 AM", waitingTime: "00:58", status: "waiting", avatar: "/images/patients/04.jpg" },
  { id: 5, name: "Rafiq Hasan", age: 50, gender: "Male", issue: "ECG review", time: "10:35 AM", waitingTime: "00:32", status: "completed", avatar: "/images/patients/05.jpg" },
  { id: 6, name: "Taslima Begum", age: 35, gender: "Female", issue: "Diabetes checkup", time: "10:40 AM", waitingTime: "00:15", status: "waiting", avatar: "/images/patients/06.jpg" },
  { id: 7, name: "Kamal Hossain", age: 42, gender: "Male", issue: "Regular checkup", time: "10:45 AM", waitingTime: "00:05", status: "waiting", avatar: "/images/patients/07.jpg" },
];

export default function PatientQueuePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patientQueueData.filter(patient => {
    const matchesFilter = filter === "all" || patient.status === filter;
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.issue.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "in-progress": return "status-ongoing";
      case "completed": return "status-completed";
      default: return "status-waiting";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "in-progress": return "In Progress";
      case "completed": return "Completed";
      default: return "Waiting";
    }
  };

  return (
    <div className="dashboard-content">
      {/* Filters and Search */}
      <div className="queue-controls">
        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All Patients
          </button>
          <button
            className={`filter-tab ${filter === "waiting" ? "active" : ""}`}
            onClick={() => setFilter("waiting")}
          >
            Waiting
          </button>
          <button
            className={`filter-tab ${filter === "in-progress" ? "active" : ""}`}
            onClick={() => setFilter("in-progress")}
          >
            In Progress
          </button>
          <button
            className={`filter-tab ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Queue Stats */}
      <div className="queue-stats">
        <div className="stat-box">
          <span className="stat-number">{patientQueueData.filter(p => p.status === "waiting").length}</span>
          <span className="stat-label">Waiting</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{patientQueueData.filter(p => p.status === "in-progress").length}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{patientQueueData.filter(p => p.status === "completed").length}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">12 min</span>
          <span className="stat-label">Avg Wait Time</span>
        </div>
      </div>

      {/* Patient Queue List */}
      <div className="patient-queue-full">
        {filteredPatients.map((patient, index) => (
          <div key={patient.id} className="queue-item-full">
            <div className="queue-item-header">
              <div className="queue-number-large">{index + 1}</div>
              <div className="patient-avatar-large">
                <img src={patient.avatar} alt={patient.name} />
              </div>
              <div className="patient-details">
                <h3 className="patient-name-large">{patient.name}</h3>
                <p className="patient-meta-large">{patient.age} Years, {patient.gender}</p>
                <p className="patient-issue-large">{patient.issue}</p>
              </div>
              <div className="queue-time-info">
                <span className="time-label">Arrived:</span>
                <span className="time-value">{patient.time}</span>
                <span className="waiting-label">Waiting:</span>
                <span className="waiting-value">{patient.waitingTime}</span>
              </div>
              <div className="status-badge-large">
                <span className={`status-dot-large ${getStatusColor(patient.status)}`} />
                {getStatusText(patient.status)}
              </div>
            </div>

            <div className="queue-item-actions">
              {patient.status === "waiting" && (
                <>
                  <button className="btn-action btn-start">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Start Consultation
                  </button>
                  <button className="btn-action btn-reschedule">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Reschedule
                  </button>
                </>
              )}
              {patient.status === "in-progress" && (
                <button className="btn-action btn-complete">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Complete
                </button>
              )}
              {patient.status === "completed" && (
                <button className="btn-action btn-view">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  View Details
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


