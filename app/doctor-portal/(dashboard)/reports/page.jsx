// app/doctor-portal/reports/page.jsx
"use client";

import { useState } from "react";
import "@/styles/pages/doctor-dashboard.css";

const reportsData = [
  { id: 1, title: "ECG Report - Masud Rana", type: "ECG", date: "10 May 2025", size: "2.4 MB", status: "completed" },
  { id: 2, title: "Blood Test - Farhana Akter", type: "Lab", date: "09 May 2025", size: "1.8 MB", status: "completed" },
  { id: 3, title: "Chest X-Ray - Abdullah Al Mamun", type: "X-Ray", date: "08 May 2025", size: "4.2 MB", status: "completed" },
  { id: 4, title: "Echocardiogram - Sumiya Rahman", type: "Echo", date: "07 May 2025", size: "5.1 MB", status: "pending" },
];

export default function ReportsPage() {

    return (
    <div className="dashboard-content">
          <div className="reports-grid">
            {reportsData.map((report) => (
              <div key={report.id} className="report-card">
                <div className="report-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div className="report-info">
                  <h4 className="report-title">{report.title}</h4>
                  <p className="report-meta">{report.type} • {report.date} • {report.size}</p>
                </div>
                <div className="report-actions">
                  <button className="btn-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </button>
                  <button className="btn-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
  );
}


