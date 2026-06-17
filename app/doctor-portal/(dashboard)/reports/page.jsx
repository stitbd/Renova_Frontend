// app/doctor-portal/reports/page.jsx
"use client";

import { useState } from "react";
import "./reports.css";
import { FileText, Download, Eye } from "lucide-react";

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
              <FileText size={22} />
            </div>
            <div className="report-info">
              <h4 className="report-title">{report.title}</h4>
              <p className="report-meta">{report.type} • {report.date} • {report.size}</p>
            </div>
            <div className="report-actions">
              <button className="btn-icon">
                <Download size={16} />
              </button>
              <button className="btn-icon">
                <Eye size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}