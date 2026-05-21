// app/patient/reports/page.jsx
"use client";

import { useState } from "react";

const reportsData = [
  { id: 1, title: "Full Body Check-up", type: "Machine Report", date: "10 May 2025", doctor: "Dr. Afsana Rahman", status: "Normal", file: "full-body-report.pdf" },
  { id: 2, title: "Skin Analyzer Report", type: "Machine Report", date: "15 Apr 2025", doctor: "Dr. Afsana Rahman", status: "Risk", file: "skin-report.pdf" },
  { id: 3, title: "Blood Test Results", type: "Lab Report", date: "02 Apr 2025", doctor: "Lab Technician", status: "Normal", file: "blood-test.pdf" },
  { id: 4, title: "ECG Report", type: "Cardiac Report", date: "20 Mar 2025", doctor: "Dr. Tasnim Farin", status: "Normal", file: "ecg-report.pdf" },
  { id: 5, title: "X-Ray Chest", type: "Imaging Report", date: "10 Mar 2025", doctor: "Dr. Kamal Hossain", status: "Pending", file: "xray-chest.pdf" },
];

export default function ReportsPage() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = reportsData.filter((report) => {
    const matchesFilter = filter === "all" || report.status.toLowerCase() === filter;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      {/* Filters */}
      <div className="reports-controls">
        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-tabs">
          <button className={`filter-tab ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</button>
          <button className={`filter-tab ${filter === "normal" ? "active" : ""}`} onClick={() => setFilter("normal")}>Normal</button>
          <button className={`filter-tab ${filter === "risk" ? "active" : ""}`} onClick={() => setFilter("risk")}>Risk</button>
          <button className={`filter-tab ${filter === "pending" ? "active" : ""}`} onClick={() => setFilter("pending")}>Pending</button>
        </div>
      </div>

      {/* Reports List */}
      <div className="reports-grid">
        {filteredReports.map((report) => (
          <div key={report.id} className="report-card">
            <div className="report-header">
              <div className="report-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div>
                <h3 className="report-title">{report.title}</h3>
                <p className="report-type">{report.type}</p>
              </div>
              <span className={`report-status status-${report.status.toLowerCase()}`}>{report.status}</span>
            </div>
            <div className="report-details">
              <div className="report-detail">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{report.date}</span>
              </div>
              <div className="report-detail">
                <span className="detail-label">Doctor:</span>
                <span className="detail-value">{report.doctor}</span>
              </div>
            </div>
            <div className="report-actions">
              <button className="btn-view-report">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                View Report
              </button>
              <button className="btn-download">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}