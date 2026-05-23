// app/patient/reports/page.jsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Animation variants - Reusable & Consistent
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const reportsData = [
  { id: 1, title: "Full Body Check-up", type: "Machine Report", date: "10 May 2025", doctor: "Dr. Afsana Rahman", status: "Normal", file: "full-body-report.pdf", description: "Comprehensive health screening including blood work, vitals, and organ function tests." },
  { id: 2, title: "Skin Analyzer Report", type: "Machine Report", date: "15 Apr 2025", doctor: "Dr. Afsana Rahman", status: "Risk", file: "skin-report.pdf", description: "Detailed skin analysis showing mild acne and sensitivity in T-zone area." },
  { id: 3, title: "Blood Test Results", type: "Lab Report", date: "02 Apr 2025", doctor: "Lab Technician", status: "Normal", file: "blood-test.pdf", description: "Complete blood count and metabolic panel - all values within normal range." },
  { id: 4, title: "ECG Report", type: "Cardiac Report", date: "20 Mar 2025", doctor: "Dr. Tasnim Farin", status: "Normal", file: "ecg-report.pdf", description: "Electrocardiogram showing normal sinus rhythm with no abnormalities detected." },
  { id: 5, title: "X-Ray Chest", type: "Imaging Report", date: "10 Mar 2025", doctor: "Dr. Kamal Hossain", status: "Pending", file: "xray-chest.pdf", description: "Chest X-ray pending radiologist review for final interpretation." },
];

const reportIcons = {
  "Machine Report": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  "Lab Report": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2zM9 9h6v6H9V9z"/>
    </svg>
  ),
  "Cardiac Report": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  "Imaging Report": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <path d="M21 15l-5-5L5 21"/>
    </svg>
  ),
};

const statusColors = {
  normal: { bg: "#dcfce7", text: "#16a34a", border: "#bbf7d0" },
  risk: { bg: "#fef3c7", text: "#d97706", border: "#fde68a" },
  pending: { bg: "#dbeafe", text: "#014fa1", border: "#bfdbfe" },
};

export default function ReportsPage() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedReport, setExpandedReport] = useState(null);

  const filteredReports = reportsData.filter((report) => {
    const matchesFilter = filter === "all" || report.status.toLowerCase() === filter;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusConfig = (status) => statusColors[status.toLowerCase()] || statusColors.pending;

  return (
    <motion.div 
      className="reports-page"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Page Header */}
      <motion.div 
        className="page-header"
        variants={itemVariants}
      >
        <motion.h1 
          className="page-title"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Medical Reports
        </motion.h1>
        <motion.button 
          className="btn btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export All Reports
        </motion.button>
      </motion.div>

      {/* Filters & Search */}
      <motion.div 
        className="reports-controls"
        variants={itemVariants}
      >
        <motion.div 
          className="search-box"
          whileFocus={{ borderColor: "#014fa1", boxShadow: "0 0 0 3px rgba(1,79,161,0.1)" }}
          transition={{ duration: 0.2 }}
        >
          <motion.svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </motion.svg>
          <input
            type="text"
            placeholder="Search reports by title, type, or doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>
        
        <motion.div className="filter-tabs">
          {["all", "normal", "risk", "pending"].map((f, i) => (
            <motion.button
              key={f}
              className={`filter-tab ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f !== "all" && (
                <motion.span 
                  className="filter-count"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.05, type: "spring" }}
                >
                  {reportsData.filter(r => r.status.toLowerCase() === f).length}
                </motion.span>
              )}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Stats Summary */}
      <motion.div 
        className="reports-stats"
        variants={itemVariants}
      >
        {[
          { label: "Total Reports", value: reportsData.length, color: "#014fa1" },
          { label: "Normal", value: reportsData.filter(r => r.status === "Normal").length, color: "#22c55e" },
          { label: "Needs Attention", value: reportsData.filter(r => r.status === "Risk").length, color: "#f59e0b" },
          { label: "Pending", value: reportsData.filter(r => r.status === "Pending").length, color: "#014fa1" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="stat-card-small"
            variants={itemVariants}
            whileHover={{ y: -4 }}
            style={{ borderLeftColor: stat.color }}
          >
            <motion.span 
              className="stat-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              {stat.label}
            </motion.span>
            <motion.span 
              className="stat-value"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05, type: "spring", stiffness: 200 }}
            >
              {stat.value}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>

      {/* Reports Grid */}
      <AnimatePresence mode="wait">
        {filteredReports.length > 0 ? (
          <motion.div 
            className="reports-grid"
            key="grid"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
          >
            {filteredReports.map((report, index) => {
              const statusConfig = getStatusConfig(report.status);
              const IconComponent = reportIcons[report.type] || reportIcons["Machine Report"];
              
              return (
                <motion.div
                  key={report.id}
                  className="report-card"
                  variants={itemVariants}
                  layout
                  whileHover={{ 
                    y: -6,
                    boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Report Header */}
                  <motion.div 
                    className="report-header"
                    onClick={() => setExpandedReport(expandedReport === report.id ? null : report.id)}
                    whileHover={{ backgroundColor: "#f8fafc" }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className="report-icon"
                      style={{ backgroundColor: `${statusConfig.bg}`, color: statusConfig.text }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {IconComponent}
                    </motion.div>
                    <div className="report-info">
                      <motion.h3 
                        className="report-title"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        {report.title}
                      </motion.h3>
                      <motion.p 
                        className="report-type"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 + index * 0.05 }}
                      >
                        {report.type}
                      </motion.p>
                    </div>
                    <motion.span 
                      className={`report-status status-${report.status.toLowerCase()}`}
                      style={{ backgroundColor: statusConfig.bg, color: statusConfig.text }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.05, type: "spring" }}
                    >
                      {report.status}
                    </motion.span>
                    <motion.svg 
                      className="expand-icon"
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      animate={{ rotate: expandedReport === report.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </motion.svg>
                  </motion.div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedReport === report.id && (
                      <motion.div 
                        className="report-details"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div 
                          className="report-description"
                          variants={fadeInUp}
                          initial="hidden"
                          animate="visible"
                        >
                          <h4>Report Summary:</h4>
                          <p>{report.description}</p>
                        </motion.div>
                        
                        <motion.div 
                          className="report-meta"
                          variants={containerVariants}
                          initial="hidden"
                          animate="show"
                        >
                          <motion.div 
                            className="meta-item"
                            variants={itemVariants}
                          >
                            <span className="meta-label">Date:</span>
                            <span className="meta-value">{report.date}</span>
                          </motion.div>
                          <motion.div 
                            className="meta-item"
                            variants={itemVariants}
                          >
                            <span className="meta-label">Doctor:</span>
                            <span className="meta-value">{report.doctor}</span>
                          </motion.div>
                          <motion.div 
                            className="meta-item"
                            variants={itemVariants}
                          >
                            <span className="meta-label">File:</span>
                            <span className="meta-value">{report.file}</span>
                          </motion.div>
                        </motion.div>

                        <motion.div 
                          className="report-actions"
                          variants={containerVariants}
                          initial="hidden"
                          animate="show"
                        >
                          <motion.button 
                            className="btn-view-report"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                            View Full Report
                          </motion.button>
                          <motion.button 
                            className="btn-download"
                            variants={itemVariants}
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
                            className="btn-share"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="18" cy="5" r="3" />
                              <circle cx="6" cy="12" r="3" />
                              <circle cx="18" cy="19" r="3" />
                              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                            </svg>
                            Share
                          </motion.button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div 
            key="empty"
            className="reports-empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="empty-icon"
              animate={{ 
                y: [0, -10, 0],
                transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </motion.div>
            <h3>No reports found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <motion.button 
              className="btn-clear-filters"
              onClick={() => { setSearchTerm(""); setFilter("all"); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {filteredReports.length > 0 && (
        <motion.div 
          className="pagination"
          variants={itemVariants}
        >
          <motion.button 
            className="page-btn"
            disabled
            whileHover={{ scale: 1 }}
          >
            Previous
          </motion.button>
          {[1, 2, 3].map(num => (
            <motion.button 
              key={num} 
              className={`page-num ${num === 1 ? "active" : ""}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {num}
            </motion.button>
          ))}
          <motion.button 
            className="page-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}