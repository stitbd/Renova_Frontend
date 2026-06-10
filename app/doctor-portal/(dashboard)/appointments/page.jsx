// app/doctor-portal/appointments/page.jsx
"use client";

import { useState } from "react";
import "./appointments.css";

const appointmentsData = [
  { id: 1, date: "Today", time: "11:00 AM", patient: "Jannatul Ferdous", type: "Follow-up", status: "confirmed", notes: "Regular follow-up check" },
  { id: 2, date: "Today", time: "11:30 AM", patient: "Sohel Mahmud", type: "Regular Checkup", status: "confirmed", notes: "Annual health checkup" },
  { id: 3, date: "Today", time: "12:00 PM", patient: "Nusrat Jahan", type: "ECG Report Review", status: "confirmed", notes: "Review ECG results" },
  { id: 4, date: "Today", time: "12:30 PM", patient: "Kamal Hossain", type: "Consultation", status: "upcoming", notes: "New patient consultation" },
  { id: 5, date: "Today", time: "01:00 PM", patient: "Mst. Joya Akter", type: "Follow-up", status: "upcoming", notes: "Post-treatment follow-up" },
  { id: 6, date: "Tomorrow", time: "09:00 AM", patient: "Rafiq Hasan", type: "ECG Review", status: "scheduled", notes: "ECG test review" },
  { id: 7, date: "Tomorrow", time: "09:30 AM", patient: "Sumiya Rahman", type: "Consultation", status: "scheduled", notes: "Breathing issues" },
];

export default function AppointmentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // list or calendar
  const [selectedDate, setSelectedDate] = useState("today");

  return (
    <div className="dashboard-content">
      <div className="appointments-controls">
        <div className="date-filter">
          <button
            className={`date-btn ${selectedDate === "today" ? "active" : ""}`}
            onClick={() => setSelectedDate("today")}
          >
            Today
          </button>
          <button
            className={`date-btn ${selectedDate === "tomorrow" ? "active" : ""}`}
            onClick={() => setSelectedDate("tomorrow")}
          >
            Tomorrow
          </button>
          <button
            className={`date-btn ${selectedDate === "week" ? "active" : ""}`}
            onClick={() => setSelectedDate("week")}
          >
            This Week
          </button>
        </div>

        <div className="view-toggle">
          <button
            className={`view-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
          >
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
          <button
            className={`view-btn ${viewMode === "calendar" ? "active" : ""}`}
            onClick={() => setViewMode("calendar")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Calendar
          </button>
        </div>
      </div>

      <div className="appointments-list-full">
        {appointmentsData.map((apt) => (
          <div key={apt.id} className="appointment-card-full">
            <div className="appointment-time-block">
              <span className="appointment-date">{apt.date}</span>
              <span className="appointment-time">{apt.time}</span>
            </div>
            <div className="appointment-content">
              <div className="appointment-patient">
                <div className="patient-avatar-small">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div>
                  <h4 className="patient-name">{apt.patient}</h4>
                  <p className="appointment-type">{apt.type}</p>
                </div>
              </div>
              <div className="appointment-notes">
                <span className="notes-label">Notes:</span>
                <span className="notes-text">{apt.notes}</span>
              </div>
            </div>
            <div className="appointment-actions">
              <span className={`status-badge ${apt.status}`}>
                {apt.status === "confirmed" ? "Confirmed" :
                  apt.status === "upcoming" ? "Upcoming" : "Scheduled"}
              </span>
              <div className="action-buttons">
                <button className="btn-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button className="btn-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


