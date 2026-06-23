"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import "./outlet-patients.css";
import { Plus, Search, Eye, Edit, Users, Calendar, CheckCircle, ChevronDown, Filter, Trash2 } from "lucide-react";

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
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");

  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [showAgeDropdown, setShowAgeDropdown] = useState(false);

  const patients = [
    { id: "PT-2025-001", name: "Rafiqul Islam", age: 45, gender: "Male", phone: "01712-345678", lastVisit: "15 May 2025", status: "Active", avatar: "/images/patients/01.jpg" },
    { id: "PT-2025-002", name: "Sadita Afrin", age: 32, gender: "Female", phone: "01812-345678", lastVisit: "14 May 2025", status: "Active", avatar: "/images/patients/02.jpg" },
    { id: "PT-2025-003", name: "Rashed Hasan", age: 28, gender: "Male", phone: "01912-345678", lastVisit: "13 May 2025", status: "Inactive", avatar: "/images/patients/03.jpg" },
    { id: "PT-2025-004", name: "Mahmudul Islam", age: 52, gender: "Male", phone: "01612-345678", lastVisit: "12 May 2025", status: "Active", avatar: "/images/patients/04.jpg" },
    { id: "PT-2025-005", name: "Farzana Akter", age: 38, gender: "Female", phone: "01512-345678", lastVisit: "11 May 2025", status: "Active", avatar: "/images/patients/05.jpg" },
  ];

  const stats = [
    { label: "Total Patients", value: patients.length, color: "#014fa1", bg: "#dbeafe", cls: "blue", icon: Users },
    { label: "Active Today", value: "32", color: "#16a34a", bg: "#dcfce7", cls: "green", icon: CheckCircle },
    { label: "New This Week", value: "18", color: "#64748b", bg: "#e2e8f0", cls: "slate", icon: Calendar },
  ];

  const filteredPatients = patients.filter(p => {
    const q = searchTerm.toLowerCase();
    if (q && !p.name.toLowerCase().includes(q) && !p.id.toLowerCase().includes(q)) return false;

    if (statusFilter !== "all" && p.status.toLowerCase() !== statusFilter) return false;
    if (genderFilter !== "all" && p.gender !== genderFilter) return false;

    if (ageFilter !== "all") {
      if (ageFilter === "<18" && p.age >= 18) return false;
      if (ageFilter === "18-60" && (p.age < 18 || p.age > 60)) return false;
      if (ageFilter === ">60" && p.age <= 60) return false;
    }

    return true;
  });

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      {/* Stats Grid */}
      <motion.div className="stats-grid" variants={item}>
        {stats.map(stat => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={stat.label}
              className={`stat-card ${stat.cls}`}
              whileHover={{ y: -6, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", transition: { duration: 0.2 } }}
            >
              <motion.div
                className="stat-icon"
                style={{ background: stat.bg }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <IconComponent size={20} color={stat.color} />
              </motion.div>
              <div>
                <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Filter Bar */}
      <motion.div className="staff-filter-bar" variants={item}>
        <div className="staff-filter-group">
          <div className="staff-filter-group-row">
            {/* Status Dropdown */}
            <div className="staff-filter-dropdown">
              <button
                className="staff-filter-item"
                onClick={() => {
                  setShowStatusDropdown(v => !v);
                  setShowGenderDropdown(false);
                  setShowAgeDropdown(false);
                }}
              >
                <span>{statusFilter === "all" ? "All Status" : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}</span>
                <ChevronDown size={13} color="#94a3b8" className="staff-filter-chevron" />
              </button>
              {showStatusDropdown && (
                <div className="staff-dropdown">
                  {["all", "active", "inactive"].map(s => (
                    <div
                      key={s}
                      className="staff-dropdown-item"
                      onClick={() => {
                        setStatusFilter(s);
                        setShowStatusDropdown(false);
                      }}
                    >
                      {s === "all" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Gender Dropdown */}
            <div className="staff-filter-dropdown">
              <button
                className="staff-filter-item"
                onClick={() => {
                  setShowGenderDropdown(v => !v);
                  setShowStatusDropdown(false);
                  setShowAgeDropdown(false);
                }}
              >
                <span>{genderFilter === "all" ? "All Genders" : genderFilter}</span>
                <ChevronDown size={13} color="#94a3b8" className="staff-filter-chevron" />
              </button>
              {showGenderDropdown && (
                <div className="staff-dropdown">
                  {["all", "Male", "Female"].map(g => (
                    <div
                      key={g}
                      className="staff-dropdown-item"
                      onClick={() => {
                        setGenderFilter(g);
                        setShowGenderDropdown(false);
                      }}
                    >
                      {g === "all" ? "All Genders" : g}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Age Dropdown */}
            <div className="staff-filter-dropdown">
              <button
                className="staff-filter-item"
                onClick={() => {
                  setShowAgeDropdown(v => !v);
                  setShowStatusDropdown(false);
                  setShowGenderDropdown(false);
                }}
              >
                <span>{ageFilter === "all" ? "All Ages" : ageFilter}</span>
                <ChevronDown size={13} color="#94a3b8" className="staff-filter-chevron" />
              </button>
              {showAgeDropdown && (
                <div className="staff-dropdown">
                  {[
                    ["all", "All Ages"],
                    ["<18", "Child (<18)"],
                    ["18-60", "Adult (18-60)"],
                    [">60", "Senior (>60)"]
                  ].map(([val, label]) => (
                    <div
                      key={val}
                      className="staff-dropdown-item"
                      onClick={() => {
                        setAgeFilter(val);
                        setShowAgeDropdown(false);
                      }}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="staff-search-box">
          <Search size={15} color="#94a3b8" />
          <input
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search patient by name or ID..."
          />
        </div>

        <div className="staff-filter-actions">
          <button className="staff-apply-btn">
            <Filter size={14} color="#fff" /> Apply Filter
          </button>
          <button
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setGenderFilter("all");
              setAgeFilter("all");
            }}
            className="staff-reset-btn"
          >
            Reset
          </button>
        </div>
      </motion.div>

      {/* Patients Table */}
      <motion.div className="data-table-container" variants={item}>
        <div className="table-header">
          <span>Patient List ({filteredPatients.length})</span>
          <button className="btn-primary-green">
            <Plus size={15} color="#fff" /> Add Patient
          </button>
        </div>

        <div className="table-wrapper">
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
                    <div className="action-buttons">
                      <button
                        onClick={() => router.push(`/outlet-portal/patients/patient-profile?id=${patient.id}`)}
                        className="action-btn"
                      >
                        <Eye size={14} color="#64748b" />
                      </button>
                      <button
                        onClick={() => router.push(`/outlet-portal/patients/patient-profile?id=${patient.id}&edit=true`)}
                        className="action-btn"
                      >
                        <Edit size={14} color="#64748b" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete ${patient.name}? This action cannot be undone.`)) {
                            // setPatientList(prev => prev.filter(p => p.id !== patient.id));
                          }
                        }}
                        className="action-btn"
                      >
                        <Trash2 size={14} color="#64748b" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards List */}
        <div className="staff-mobile-list">
          {filteredPatients.map((patient) => (
            <div key={patient.id} className="staff-card">
              <div className="staff-card-top">
                <div className="staff-card-profile">
                  <img src={patient.avatar} alt={patient.name} />
                  <div>
                    <div className="staff-name">{patient.name}</div>
                    <div className="staff-id">{patient.id}</div>
                  </div>
                </div>
                <span className={`status-badge ${patient.status.toLowerCase()}`}>{patient.status}</span>
              </div>

              <div className="staff-card-info-grid">
                <div>
                  <div className="staff-card-field-label">Age/Gender</div>
                  <div className="staff-card-field-value">{patient.age} / {patient.gender}</div>
                </div>
                <div>
                  <div className="staff-card-field-label">Phone</div>
                  <div className="staff-card-field-value">{patient.phone}</div>
                </div>
                <div>
                  <div className="staff-card-field-label">Last Visit</div>
                  <div className="staff-card-field-value muted">{patient.lastVisit}</div>
                </div>
              </div>

              <div className="staff-card-actions">
                <button onClick={() => router.push(`/outlet-portal/patients/patient-profile?id=${patient.id}`)} className="action-btn">
                  <Eye size={14} color="#64748b" />
                  <span>View</span>
                </button>
                <button onClick={() => router.push(`/outlet-portal/patients/patient-profile?id=${patient.id}&edit=true`)} className="action-btn">
                  <Edit size={14} color="#64748b" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete ${patient.name}? This action cannot be undone.`)) {
                      // setPatientList(prev => prev.filter(p => p.id !== patient.id));
                    }
                  }}
                  className="action-btn"
                >
                  <Trash2 size={14} color="#64748b" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="empty-state">
            <Search size={32} color="#cbd5e1" />
            <div>No patients found</div>
            <div>Try adjusting your filters</div>
          </div>
        )}
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
