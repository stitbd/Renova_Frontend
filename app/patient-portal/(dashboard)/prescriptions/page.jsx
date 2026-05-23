// app/patient/prescriptions/page.jsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const prescriptionsData = [
  { id: 1, doctor: "Dr. Afsana Rahman", specialty: "Dermatologist", date: "10 May 2025", medications: ["Cetirizine 10mg - 1 tablet daily", "Calamine Lotion - Apply twice daily"], duration: "7 days", status: "Active" },
  { id: 2, doctor: "Dr. Tasnim Farin", specialty: "Cardiologist", date: "20 Mar 2025", medications: ["Atorvastatin 20mg - 1 tablet at night", "Aspirin 75mg - 1 tablet daily"], duration: "30 days", status: "Completed" },
  { id: 3, doctor: "Dr. Kamal Hossain", specialty: "General Physician", date: "05 Feb 2025", medications: ["Paracetamol 500mg - As needed for fever", "Vitamin C 500mg - 1 tablet daily"], duration: "5 days", status: "Completed" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};

export default function PrescriptionsPage() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <motion.div 
      className="prescriptions-list"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <AnimatePresence>
        {prescriptionsData.map((prescription) => (
          <motion.div 
            key={prescription.id} 
            className="prescription-card"
            variants={item}
            layout
          >
            <motion.div 
              className="prescription-header" 
              onClick={() => setExpandedId(expandedId === prescription.id ? null : prescription.id)}
              whileHover={{ backgroundColor: "#f8fafc" }}
              transition={{ duration: 0.2 }}
            >
              <div className="prescription-doctor">
                <motion.div 
                  className="doctor-avatar"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </motion.div>
                <div>
                  <h3 className="doctor-name">{prescription.doctor}</h3>
                  <p className="doctor-specialty">{prescription.specialty}</p>
                </div>
              </div>
              <div className="prescription-meta">
                <span className="prescription-date">{prescription.date}</span>
                <motion.span 
                  className={`prescription-status status-${prescription.status.toLowerCase()}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  {prescription.status}
                </motion.span>
              </div>
              <motion.svg 
                className={`expand-icon ${expandedId === prescription.id ? "expanded" : ""}`} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                animate={{ rotate: expandedId === prescription.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <polyline points="6 9 12 15 18 9" />
              </motion.svg>
            </motion.div>

            <AnimatePresence>
              {expandedId === prescription.id && (
                <motion.div 
                  className="prescription-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="medications-list">
                    <motion.h4
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      Medications:
                    </motion.h4>
                    <motion.ul
                      variants={container}
                      initial="hidden"
                      animate="show"
                    >
                      {prescription.medications.map((med, idx) => (
                        <motion.li 
                          key={idx} 
                          className="medication-item"
                          variants={item}
                        >
                          <motion.svg 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2"
                            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 0.3 }}
                          >
                            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
                          </motion.svg>
                          {med}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                  <div className="prescription-footer">
                    <span className="duration">Duration: {prescription.duration}</span>
                    <div className="prescription-actions">
                      <motion.button 
                        className="btn-download-pdf"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download PDF
                      </motion.button>
                      <motion.button 
                        className="btn-reminder"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        Set Reminder
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}