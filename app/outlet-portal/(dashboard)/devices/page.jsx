// app/outlet/devices/page.jsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function DevicesPage() {
  const [activeTab, setActiveTab] = useState("devices");

  const devices = [
    { name: "Full Body Check-up Machine", id: "FBC-1001", status: "Online", lastUsed: "15 May 2025", reports: 124 },
    { name: "Skin Analyzer Machine", id: "SKN-1002", status: "Online", lastUsed: "14 May 2025", reports: 89 },
    { name: "Blood Pressure Monitor", id: "BPM-1003", status: "Online", lastUsed: "15 May 2025", reports: 256 },
    { name: "Digital Thermometer", id: "DTH-1004", status: "Offline", lastUsed: "10 May 2025", reports: 45 },
    { name: "ECG Machine", id: "ECG-1005", status: "Maintenance", lastUsed: "05 May 2025", reports: 32 },
  ];

  const reports = [
    { id: "RPT-001", device: "Full Body Check-up", patient: "Rafiqul Islam", date: "15 May 2025", status: "Completed" },
    { id: "RPT-002", device: "Skin Analyzer", patient: "Sadita Afrin", date: "14 May 2025", status: "Completed" },
    { id: "RPT-003", device: "BP Monitor", patient: "Rashed Hasan", date: "13 May 2025", status: "Pending" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <motion.div className="page-header">
        <h1 className="page-title">Devices & Reports</h1>
        <motion.button className="btn btn-primary" whileHover={{ scale: 1.02 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Device
        </motion.button>
      </motion.div>

      {/* Tabs */}
      <motion.div className="tabs-bar">
        {["devices", "reports"].map(tab => (
          <motion.button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab === "devices" ? "Devices" : "Reports"}
          </motion.button>
        ))}
      </motion.div>

      {activeTab === "devices" ? (
        /* Devices List */
        <motion.div className="devices-grid">
          {devices.map((device, i) => (
            <motion.div
              key={device.id}
              className="device-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="device-header">
                <div className="device-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <span className={`device-status ${device.status.toLowerCase()}`}>{device.status}</span>
              </div>
              <h4 className="device-name">{device.name}</h4>
              <p className="device-id">ID: {device.id}</p>
              <div className="device-stats">
                <div className="stat">
                  <span className="stat-label">Last Used:</span>
                  <span className="stat-value">{device.lastUsed}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Reports:</span>
                  <span className="stat-value">{device.reports}</span>
                </div>
              </div>
              <div className="device-actions">
                <motion.button className="btn-small" whileHover={{ scale: 1.05 }}>View Reports</motion.button>
                <motion.button className="btn-small outline" whileHover={{ scale: 1.05 }}>Settings</motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* Reports List */
        <motion.div className="reports-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Device</th>
                <th>Patient</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <motion.tr key={report.id} whileHover={{ backgroundColor: "#f8fafc" }}>
                  <td className="report-id">{report.id}</td>
                  <td>{report.device}</td>
                  <td>{report.patient}</td>
                  <td>{report.date}</td>
                  <td><span className={`status-badge ${report.status.toLowerCase()}`}>{report.status}</span></td>
                  <td>
                    <div className="table-actions">
                      <motion.button className="btn-icon view" whileHover={{ scale: 1.1 }}>View</motion.button>
                      <motion.button className="btn-icon download" whileHover={{ scale: 1.1 }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </motion.div>
  );
}