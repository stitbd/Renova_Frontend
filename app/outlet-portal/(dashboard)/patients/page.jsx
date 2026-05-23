// app/outlet/patients/page.jsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const patients = [
    { id: "PT-2025-001", name: "Rafiqul Islam", age: 45, gender: "Male", phone: "01712-345678", lastVisit: "15 May 2025", status: "Active", avatar: "/images/patients/01.jpg" },
    { id: "PT-2025-002", name: "Sadita Afrin", age: 32, gender: "Female", phone: "01812-345678", lastVisit: "14 May 2025", status: "Active", avatar: "/images/patients/02.jpg" },
    { id: "PT-2025-003", name: "Rashed Hasan", age: 28, gender: "Male", phone: "01912-345678", lastVisit: "13 May 2025", status: "Inactive", avatar: "/images/patients/03.jpg" },
    { id: "PT-2025-004", name: "Mahmudul Islam", age: 52, gender: "Male", phone: "01612-345678", lastVisit: "12 May 2025", status: "Active", avatar: "/images/patients/04.jpg" },
    { id: "PT-2025-005", name: "Farzana Akter", age: 38, gender: "Female", phone: "01512-345678", lastVisit: "11 May 2025", status: "Active", avatar: "/images/patients/05.jpg" },
  ];

  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || p.status.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {/* Page Header */}
      <motion.div className="page-header" variants={item}>
        <h1 className="page-title">Patients Management</h1>
        <motion.button 
          className="btn btn-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Patient
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div className="filters-bar" variants={item}>
        <div className="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-tabs">
          {["all", "active", "inactive"].map(f => (
            <motion.button
              key={f}
              className={`filter-tab ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div className="stats-row" variants={item}>
        {[
          { label: "Total Patients", value: "1,245", change: "+12%", color: "#014fa1" },
          { label: "Active Today", value: "32", change: "+8", color: "#428a26" },
          { label: "New This Week", value: "18", change: "+3", color: "#7c3aed" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="stat-card-small"
            variants={item}
            whileHover={{ y: -2 }}
            style={{ borderLeftColor: stat.color }}
          >
            <span className="stat-label">{stat.label}</span>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-change" style={{ color: stat.color }}>{stat.change}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Patients Table */}
      <motion.div className="data-table-container" variants={item}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>ID</th>
              <th>Age/Gender</th>
              <th>Phone</th>
              <th>Last Visit</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <motion.tr key={patient.id} variants={item} whileHover={{ backgroundColor: "#f8fafc" }}>
                <td>
                  <div className="table-patient">
                    <div className="patient-avatar-small">
                      <img src={patient.avatar} alt={patient.name} />
                    </div>
                    <span className="patient-name">{patient.name}</span>
                  </div>
                </td>
                <td className="patient-id">{patient.id}</td>
                <td>{patient.age} / {patient.gender}</td>
                <td>{patient.phone}</td>
                <td>{patient.lastVisit}</td>
                <td><span className={`status-badge ${patient.status.toLowerCase()}`}>{patient.status}</span></td>
                <td>
                  <div className="table-actions">
                    <motion.button className="btn-icon view" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </motion.button>
                    <motion.button className="btn-icon edit" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Pagination */}
      <motion.div className="pagination" variants={item}>
        <button className="page-btn">Previous</button>
        {[1, 2, 3].map(num => (
          <motion.button 
            key={num} 
            className={`page-num ${num === 1 ? "active" : ""}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {num}
          </motion.button>
        ))}
        <button className="page-btn">Next</button>
      </motion.div>
    </motion.div>
  );
}