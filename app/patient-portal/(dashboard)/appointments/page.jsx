// app/patient/appointments/page.jsx
"use client";

import { useState } from "react";

const appointmentsData = [
  { id: 1, doctor: "Dr. Afsana Rahman", specialty: "Dermatologist", date: "16 May 2025", time: "11:30 AM", location: "Dhanmondi Outlet", status: "Confirmed", type: "Follow-up" },
  { id: 2, doctor: "Dr. Tasnim Farin", specialty: "Cardiologist", date: "25 May 2025", time: "10:00 AM", location: "Gulshan Outlet", status: "Scheduled", type: "Regular Checkup" },
  { id: 3, doctor: "Dr. Kamal Hossain", specialty: "General Physician", date: "02 Jun 2025", time: "02:00 PM", location: "Online", status: "Pending", type: "Consultation" },
];

export default function AppointmentsPage() {
  const [viewMode, setViewMode] = useState("list");

  return (
    <>
      <div className="appointments-header">
        <div className="view-toggle">
          <button className={`view-btn ${viewMode === "list" ? "active" : ""}`} onClick={() => setViewMode("list")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            List
          </button>
          <button className={`view-btn ${viewMode === "calendar" ? "active" : ""}`} onClick={() => setViewMode("calendar")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Calendar
          </button>
        </div>
        <button className="btn-book-appointment">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Book New Appointment
        </button>
      </div>

      {viewMode === "list" ? (
        <div className="appointments-list">
          {appointmentsData.map((apt) => (
            <div key={apt.id} className="appointment-card">
              <div className="appointment-date-block">
                <span className="appointment-day">{apt.date.split(" ")[0]}</span>
                <span className="appointment-month">{apt.date.split(" ")[1].toUpperCase()}</span>
              </div>
              <div className="appointment-content">
                <div className="appointment-doctor">
                  <h3 className="doctor-name">{apt.doctor}</h3>
                  <p className="doctor-specialty">{apt.specialty}</p>
                  <span className="appointment-type">{apt.type}</span>
                </div>
                <div className="appointment-details">
                  <div className="detail-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{apt.time}</span>
                  </div>
                  <div className="detail-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{apt.location}</span>
                  </div>
                </div>
              </div>
              <div className="appointment-status-actions">
                <span className={`appointment-status status-${apt.status.toLowerCase()}`}>{apt.status}</span>
                <div className="appointment-btns">
                  {apt.status === "Confirmed" && (
                    <>
                      <button className="btn-join">Join Call</button>
                      <button className="btn-reschedule">Reschedule</button>
                    </>
                  )}
                  {apt.status === "Scheduled" && <button className="btn-confirm">Confirm</button>}
                  {apt.status === "Pending" && <button className="btn-cancel">Cancel</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="calendar-view">
          {/* Calendar component would go here */}
          <div className="calendar-placeholder">Calendar view coming soon</div>
        </div>
      )}
    </>
  );
}