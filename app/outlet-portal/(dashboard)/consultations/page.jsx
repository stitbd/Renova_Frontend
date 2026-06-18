// app/outlet/consultations/page.jsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FileText, User, Calendar, Clock, Stethoscope, Eye, FileCheck, FileSpreadsheet } from "lucide-react";

export default function ConsultationsPage() {
  const [filter, setFilter] = useState("all");

  const consultations = [
    { id: 1, patient: "Rafiqul Islam", doctor: "Dr. Ahsan Rahman", date: "15 May 2025", time: "09:30 AM", type: "General Check-up", diagnosis: "Normal findings, advised rest", prescription: true, report: true, fee: "৳500" },
    { id: 2, patient: "Sadita Afrin", doctor: "Dr. Farhana Akter", date: "14 May 2025", time: "10:30 AM", type: "Skin Analysis", diagnosis: "Mild acne, prescribed topical cream", prescription: true, report: true, fee: "৳600" },
    { id: 3, patient: "Rashed Hasan", doctor: "Dr. Kamal Hossain", date: "13 May 2025", time: "11:00 AM", type: "BP Check", diagnosis: "BP normal, continue medication", prescription: false, report: true, fee: "৳400" },
    { id: 4, patient: "Mahmudul Islam", doctor: "Dr. Ahsan Rahman", date: "12 May 2025", time: "02:00 PM", type: "Follow-up", diagnosis: "Improvement noted, continue treatment", prescription: true, report: false, fee: "৳500" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <motion.div className="page-header">
        <h1 className="page-title">Consultation History</h1>
        <motion.button className="btn btn-primary" whileHover={{ scale: 1.02 }}>
          <FileSpreadsheet size={18} />
          Export Report
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div className="filters-bar">
        <div className="filter-tabs">
          {["all", "with-prescription", "with-report"].map(f => (
            <motion.button
              key={f}
              className={`filter-tab ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
              whileHover={{ scale: 1.05 }}
            >
              {f === "all" ? "All" : f === "with-prescription" ? "With Prescription" : "With Report"}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Consultations Grid */}
      <motion.div className="consultations-grid">
        {consultations.map((consult, i) => (
          <motion.div
            key={consult.id}
            className="consultation-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className="consult-header">
              <div className="consult-patient">
                <div className="patient-avatar">
                  <User size={20} />
                </div>
                <div>
                  <h4 className="patient-name">{consult.patient}</h4>
                  <p className="consult-date">{consult.date}, {consult.time}</p>
                </div>
              </div>
              <span className="consult-fee">{consult.fee}</span>
            </div>

            <div className="consult-details">
              <div className="detail-row">
                <span className="detail-label">Doctor:</span>
                <span className="detail-value">{consult.doctor}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Type:</span>
                <span className="detail-value">{consult.type}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Diagnosis:</span>
                <span className="detail-value">{consult.diagnosis}</span>
              </div>
            </div>

            <div className="consult-tags">
              {consult.prescription && <span className="tag prescription">Prescription</span>}
              {consult.report && <span className="tag report">Report</span>}
            </div>

            <div className="consult-actions">
              {consult.prescription && (
                <motion.button className="btn-small" whileHover={{ scale: 1.05 }}>
                  View Prescription
                </motion.button>
              )}
              {consult.report && (
                <motion.button className="btn-small" whileHover={{ scale: 1.05 }}>
                  View Report
                </motion.button>
              )}
              <motion.button className="btn-small outline" whileHover={{ scale: 1.05 }}>
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}