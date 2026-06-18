// app/outlet/appointments/page.jsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, List, Calendar, Clock, User, Stethoscope, CheckCircle, Play, RefreshCw, Eye } from "lucide-react";

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
          <Plus size={18} />
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
            <List size={16} />
            List
          </motion.button>
          <motion.button
            className={`view-btn ${viewMode === "calendar" ? "active" : ""}`}
            onClick={() => setViewMode("calendar")}
            whileHover={{ scale: 1.05 }}
          >
            <Calendar size={16} />
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
                      <motion.button className="btn-small start" whileHover={{ scale: 1.05 }}><Play size={14} /> Start</motion.button>
                      <motion.button className="btn-small reschedule" whileHover={{ scale: 1.05 }}><RefreshCw size={14} /> Reschedule</motion.button>
                    </>
                  )}
                  {apt.status === "Ongoing" && (
                    <motion.button className="btn-small complete" whileHover={{ scale: 1.05 }}><CheckCircle size={14} /> Complete</motion.button>
                  )}
                  {apt.status === "Completed" && (
                    <motion.button className="btn-small view" whileHover={{ scale: 1.05 }}><Eye size={14} /> View</motion.button>
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