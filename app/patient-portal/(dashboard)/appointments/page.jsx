// app/patient/appointments/page.jsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const appointmentsData = [
  { id: 1, doctor: "Dr. Afsana Rahman", specialty: "Dermatologist", date: "16 May 2025", time: "11:30 AM", location: "Dhanmondi Outlet", status: "Confirmed", type: "Follow-up" },
  { id: 2, doctor: "Dr. Tasnim Farin", specialty: "Cardiologist", date: "25 May 2025", time: "10:00 AM", location: "Gulshan Outlet", status: "Scheduled", type: "Regular Checkup" },
  { id: 3, doctor: "Dr. Kamal Hossain", specialty: "General Physician", date: "02 Jun 2025", time: "02:00 PM", location: "Online", status: "Pending", type: "Consultation" },
];

export default function AppointmentsPage() {
  const [viewMode, setViewMode] = useState("list");

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div className="appointments-header" variants={item}>
        <motion.div className="view-toggle">
          {[
            { mode: "list", icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            ), label: "List" },
            { mode: "calendar", icon: (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            ), label: "Calendar" }
          ].map(btn => (
            <motion.button
              key={btn.mode}
              className={`view-btn ${viewMode === btn.mode ? "active" : ""}`}
              onClick={() => setViewMode(btn.mode)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {btn.icon}
              {btn.label}
            </motion.button>
          ))}
        </motion.div>
        
        <motion.button 
          className="btn-book-appointment"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Book New Appointment
        </motion.button>
      </motion.div>

      {viewMode === "list" ? (
        <motion.div className="appointments-list">
          {appointmentsData.map((apt, index) => (
            <motion.div
              key={apt.id}
              className="appointment-card"
              variants={item}
              whileHover={{ 
                y: -4, 
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="appointment-date-block"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.span 
                  className="appointment-day"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05, type: "spring" }}
                >
                  {apt.date.split(" ")[0]}
                </motion.span>
                <span className="appointment-month">{apt.date.split(" ")[1].toUpperCase()}</span>
              </motion.div>
              
              <div className="appointment-content">
                <div className="appointment-doctor">
                  <motion.h3 
                    className="doctor-name"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    {apt.doctor}
                  </motion.h3>
                  <p className="doctor-specialty">{apt.specialty}</p>
                  <motion.span 
                    className="appointment-type"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    {apt.type}
                  </motion.span>
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
                <motion.span 
                  className={`appointment-status status-${apt.status.toLowerCase()}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.05, type: "spring" }}
                >
                  {apt.status}
                </motion.span>
                <div className="appointment-btns">
                  {apt.status === "Confirmed" && (
                    <>
                      <motion.button 
                        className="btn-join"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Join Call
                      </motion.button>
                      <motion.button 
                        className="btn-reschedule"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Reschedule
                      </motion.button>
                    </>
                  )}
                  {apt.status === "Scheduled" && (
                    <motion.button 
                      className="btn-confirm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Confirm
                    </motion.button>
                  )}
                  {apt.status === "Pending" && (
                    <motion.button 
                      className="btn-cancel"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="calendar-view"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="calendar-placeholder"
            animate={{ 
              y: [0, -10, 0],
              transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            Calendar view coming soon
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}