// app/outlet/appointments/page.jsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function AppointmentsPage() {
  const [viewMode, setViewMode] = useState("list");
  const [selectedDate, setSelectedDate] = useState("today");

  const appointments = [
    { id: 1, time: "09:30 AM", patient: "Sadita Afrin", service: "General Check-up", doctor: "Dr. Ahsan", status: "Completed", duration: "30 min" },
    { id: 2, time: "10:30 AM", patient: "Rashed Hasan", service: "Skin Analysis", doctor: "Dr. Farhana", status: "Completed", duration: "45 min" },
    { id: 3, time: "11:30 AM", patient: "Mahmudul Islam", service: "Full Body Check-up", doctor: "Dr. Ahsan", status: "Ongoing", duration: "60 min" },
    { id: 4, time: "01:00 PM", patient: "Farzana Akter", service: "Consultation", doctor: "Dr. Kamal", status: "Upcoming", duration: "30 min" },
    { id: 5, time: "02:00 PM", patient: "Jannatul Ferdous", service: "Follow-up", doctor: "Dr. Ahsan", status: "Upcoming", duration: "20 min" },
    { id: 6, time: "03:00 PM", patient: "Kamal Hossain", service: "BP Check", doctor: "Dr. Farhana", status: "Upcoming", duration: "15 min" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <motion.div className="page-header">
        <h1 className="page-title">Appointments</h1>
        <motion.button className="btn btn-primary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Book Appointment
        </motion.button>
      </motion.div>

      {/* Controls */}
      <motion.div className="appointments-controls">
        <div className="date-filter">
          {["today", "tomorrow", "week"].map(d => (
            <motion.button
              key={d}
              className={`date-btn ${selectedDate === d ? "active" : ""}`}
              onClick={() => setSelectedDate(d)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {d === "today" ? "Today" : d === "tomorrow" ? "Tomorrow" : "This Week"}
            </motion.button>
          ))}
        </div>
        <div className="view-toggle">
          <motion.button
            className={`view-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
            whileHover={{ scale: 1.05 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
            </svg>
            List
          </motion.button>
          <motion.button
            className={`view-btn ${viewMode === "calendar" ? "active" : ""}`}
            onClick={() => setViewMode("calendar")}
            whileHover={{ scale: 1.05 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
            </svg>
            Calendar
          </motion.button>
        </div>
      </motion.div>

      {/* Appointments List */}
      {viewMode === "list" ? (
        <motion.div className="appointments-list">
          {appointments.map((apt, i) => (
            <motion.div
              key={apt.id}
              className="appointment-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
            >
              <div className="apt-time-block">
                <span className="apt-time">{apt.time}</span>
                <span className="apt-duration">{apt.duration}</span>
              </div>
              <div className="apt-content">
                <div className="apt-patient">
                  <h4 className="patient-name">{apt.patient}</h4>
                  <p className="apt-service">{apt.service}</p>
                </div>
                <div className="apt-doctor">
                  <span className="doctor-label">Doctor:</span>
                  <span className="doctor-name">{apt.doctor}</span>
                </div>
              </div>
              <div className="apt-actions">
                <span className={`status-badge ${apt.status.toLowerCase()}`}>{apt.status}</span>
                <div className="action-buttons">
                  {apt.status === "Upcoming" && (
                    <>
                      <motion.button className="btn-small start" whileHover={{ scale: 1.05 }}>Start</motion.button>
                      <motion.button className="btn-small reschedule" whileHover={{ scale: 1.05 }}>Reschedule</motion.button>
                    </>
                  )}
                  {apt.status === "Ongoing" && (
                    <motion.button className="btn-small complete" whileHover={{ scale: 1.05 }}>Complete</motion.button>
                  )}
                  {apt.status === "Completed" && (
                    <motion.button className="btn-small view" whileHover={{ scale: 1.05 }}>View</motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div className="calendar-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="calendar-placeholder">Calendar view coming soon</div>
        </motion.div>
      )}
    </motion.div>
  );
}