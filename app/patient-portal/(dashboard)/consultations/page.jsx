// app/patient/consultations/page.jsx
"use client";

import { motion } from "framer-motion";

// Animation variants
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
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const consultationsData = [
  { id: 1, doctor: "Dr. Afsana Rahman", specialty: "Dermatologist", date: "10 May 2025", time: "11:00 AM", type: "Video Call", diagnosis: "Mild acne and skin sensitivity", prescription: true, report: true, fee: "৳500" },
  { id: 2, doctor: "Dr. Tasnim Farin", specialty: "Cardiologist", date: "20 Mar 2025", time: "09:30 AM", type: "In-Person", diagnosis: "Routine cardiac checkup - Normal findings", prescription: true, report: true, fee: "৳700" },
  { id: 3, doctor: "Dr. Kamal Hossain", specialty: "General Physician", date: "05 Feb 2025", time: "03:00 PM", type: "Video Call", diagnosis: "Viral fever - Advised rest and hydration", prescription: true, report: false, fee: "৳400" },
];

export default function ConsultationsPage() {
  return (
    <motion.div 
      className="consultations-list"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {consultationsData.map((consultation, index) => (
        <motion.div 
          key={consultation.id} 
          className="consultation-card"
          variants={item}
          whileHover={{ 
            y: -4,
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            transition: { duration: 0.2 }
          }}
        >
          <motion.div 
            className="consultation-header"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <div className="consultation-doctor">
              <motion.div 
                className="doctor-avatar-large"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </motion.div>
              <div>
                <motion.h3 
                  className="doctor-name"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                >
                  {consultation.doctor}
                </motion.h3>
                <motion.p 
                  className="doctor-specialty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  {consultation.specialty}
                </motion.p>
                <motion.span 
                  className="consultation-type"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 + index * 0.05 }}
                >
                  {consultation.type}
                </motion.span>
              </div>
            </div>
            <div className="consultation-meta">
              <motion.div 
                className="consultation-datetime"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <span className="consultation-date">{consultation.date}</span>
                <span className="consultation-time">{consultation.time}</span>
              </motion.div>
              <motion.span 
                className="consultation-fee"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05, type: "spring" }}
              >
                {consultation.fee}
              </motion.span>
            </div>
          </motion.div>

          <motion.div 
            className="consultation-body"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
          >
            <div className="diagnosis-section">
              <motion.h4
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 + index * 0.05 }}
              >
                Diagnosis:
              </motion.h4>
              <motion.p 
                className="diagnosis-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                {consultation.diagnosis}
              </motion.p>
            </div>
            <motion.div 
              className="consultation-tags"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {consultation.prescription && (
                <motion.span 
                  className="tag tag-prescription"
                  variants={item}
                  whileHover={{ scale: 1.05 }}
                >
                  Prescription Available
                </motion.span>
              )}
              {consultation.report && (
                <motion.span 
                  className="tag tag-report"
                  variants={item}
                  whileHover={{ scale: 1.05 }}
                >
                  Report Available
                </motion.span>
              )}
            </motion.div>
          </motion.div>

          <motion.div 
            className="consultation-actions"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.button 
              className="btn-view-details"
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details
            </motion.button>
            {consultation.prescription && (
              <motion.button 
                className="btn-view-prescription"
                variants={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Prescription
              </motion.button>
            )}
            {consultation.report && (
              <motion.button 
                className="btn-view-report"
                variants={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Report
              </motion.button>
            )}
            <motion.button 
              className="btn-book-again"
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Again
            </motion.button>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}