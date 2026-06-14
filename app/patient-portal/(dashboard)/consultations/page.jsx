// app/patient/consultations/page.jsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import "./patient-consultations.css";

// Icons Component
const Icons = {
  User: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Phone: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Mail: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 7L2 7" />
    </svg>
  ),
  Calendar: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Clock: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  ChevronDown: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  ChevronLeft: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  ChevronRight: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Search: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  Filter: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  ),
  Download: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Printer: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  ),
  Eye: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Video: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="6" width="16" height="12" rx="2" />
      <path d="m22 8-4 4 4 4V8z" />
    </svg>
  ),
  UserCheck: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  ),
  Activity: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  HelpCircle: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  ArrowRight: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Share: ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
};

// Mock Data
const patientData = {
  name: "Ayesha Rahman",
  pid: "PT-2025-000123",
  age: 28,
  gender: "Female",
  phone: "017XXXXXXXXXX",
  email: "ayesha@email.com",
  bloodGroup: "B+",
  dob: "12 Jan 1997",
  address: "Mirpur, Dhaka",
};

const consultationsData = [
  {
    id: 1,
    doctor: { name: "Dr. Abdullah Al Noman", specialty: "Cardiologist" },
    date: "15 May 2025",
    time: "10:30 AM",
    type: "Follow-up",
    visitType: "follow-up",
    diagnosis: "Hypertension - Blood pressure under control. Continue current medication.",
    reason: "Follow-up for high blood pressure",
    prescription: true,
    report: true,
    fee: 800,
    nextVisit: { date: "12 Jun 2025", time: "11:00 AM" },
  },
  {
    id: 2,
    doctor: { name: "Dr. Farhana Akter", specialty: "Cardiologist" },
    date: "28 Apr 2025",
    time: "09:00 AM",
    type: "In-Person",
    visitType: "consultation",
    diagnosis: "Chest pain - ECG normal. Advised stress test.",
    reason: "Chest discomfort",
    prescription: true,
    report: true,
    fee: 1000,
  },
  {
    id: 3,
    doctor: { name: "Dr. Hasan Mahmud", specialty: "Cardiologist" },
    date: "10 Mar 2025",
    time: "02:15 PM",
    type: "Video Call",
    visitType: "consultation",
    diagnosis: "Palpitations - Holter monitor advised",
    reason: "Irregular heartbeat",
    prescription: true,
    report: false,
    fee: 600,
  },
  {
    id: 4,
    doctor: { name: "Dr. Abdullah Al Noman", specialty: "Cardiologist" },
    date: "05 Feb 2025",
    time: "11:30 AM",
    type: "Lab Test",
    visitType: "lab-test",
    diagnosis: "Lipid profile - Cholesterol slightly elevated",
    reason: "Routine checkup",
    prescription: false,
    report: true,
    fee: 500,
  },
  {
    id: 5,
    doctor: { name: "Dr. Farhana Akter", specialty: "Cardiologist" },
    date: "15 Jan 2025",
    time: "03:45 PM",
    type: "Follow-up",
    visitType: "follow-up",
    diagnosis: "Post-surgery follow-up - Recovery progressing well",
    reason: "Post-operation follow-up",
    prescription: true,
    report: true,
    fee: 800,
  },
];

const summaryStats = {
  totalConsultations: 15,
  thisYear: 8,
  thisMonth: 3,
  lastConsultation: "15 May 2025",
  nextScheduled: "12 Jun 2025",
  averageGap: "28 days",
};

const frequentDoctors = [
  { name: "Dr. Abdullah Al Noman", specialty: "Cardiologist", visits: 6 },
  { name: "Dr. Farhana Akter", specialty: "Cardiologist", visits: 4 },
  { name: "Dr. Hasan Mahmud", specialty: "Cardiologist", visits: 3 },
  { name: "Dr. Farhana Akter", specialty: "Cardiologist", visits: 2 },
  { name: "Dr. Hasan Mahmud", specialty: "Cardiologist", visits: 2 },
];

const ITEMS_PER_PAGE = 10;

export default function ConsultationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("all");
  const [selectedVisitType, setSelectedVisitType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDoctorDropdown, setShowDoctorDropdown] = useState(false);
  const [showVisitTypeDropdown, setShowVisitTypeDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Filter consultations
  const filteredConsultations = useMemo(() => {
    return consultationsData.filter((consultation) => {
      const matchesSearch =
        searchTerm === "" ||
        consultation.doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultation.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultation.reason.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDoctor =
        selectedDoctor === "all" || consultation.doctor.name === selectedDoctor;

      const matchesVisitType =
        selectedVisitType === "all" || consultation.visitType === selectedVisitType;

      const matchDate = (() => {
        if (!dateFrom && !dateTo) return true;
        const cDate = new Date(consultation.date);
        const from = dateFrom ? new Date(dateFrom) : null;
        const to = dateTo ? new Date(dateTo) : null;
        if (from && cDate < from) return false;
        if (to && cDate > to) return false;
        return true;
      })();

      return matchesSearch && matchesDoctor && matchesVisitType && matchDate;
    });
  }, [searchTerm, selectedDoctor, selectedVisitType, dateFrom, dateTo]);

  const doctorList = [...new Map(
    consultationsData.map(c => [c.doctor.name, c.doctor])
  ).values()];

  // Pagination
  const totalPages = Math.ceil(filteredConsultations.length / ITEMS_PER_PAGE);
  const paginatedConsultations = filteredConsultations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getVisitTypeBadgeClass = (type) => {
    switch (type) {
      case "follow-up":
        return "follow-up";
      case "lab-test":
        return "lab-test";
      case "consultation":
        return "consultation";
      default:
        return "consultation";
    }
  };

  const getVisitTypeLabel = (type) => {
    switch (type) {
      case "follow-up":
        return "Follow-up";
      case "lab-test":
        return "Lab Test";
      case "consultation":
        return "Consultation";
      default:
        return "Consultation";
    }
  };

  const getDoctorImage = (index) => {
    const imageNum = (index % 9) + 1;
    return `/images/doctors/doctor-${imageNum}.jpg`;
  };

  return (
    <div className="ch-container">
      {/* Sub-header with breadcrumb and export buttons */}
      <div className="ch-sub-header">
        <div className="ch-breadcrumb">
          <Link href="/patient/dashboard">Dashboard</Link>
          <span className="ch-breadcrumb-sep">/</span>
          <span className="ch-breadcrumb-current">Consultation History</span>
        </div>
        <div className="ch-export-btns">
          <button className="ch-export-btn">
            <Icons.Printer />
            Print
          </button>
          <button className="ch-export-btn">
            <Icons.Share />
            Share
          </button>
        </div>
      </div>

      {/* Main 2-column layout */}
      <div className="ch-layout">
        {/* Left Column */}
        <div className="ch-left-col">
          {/* Patient Info Card */}
          <div className="ch-patient-card">
            <div className="ch-patient-top">
              <div className="ch-patient-avatar">
                <img
                  src="/images/patients/01.jpg"
                  alt={patientData.name}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                      svg.setAttribute("viewBox", "0 0 24 24");
                      svg.setAttribute("fill", "none");
                      svg.setAttribute("stroke", "#014fa1");
                      svg.setAttribute("stroke-width", "2");
                      svg.innerHTML = '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>';
                      parent.appendChild(svg);
                    }
                  }}
                />
              </div>
              <div className="ch-patient-main">
                <h2>{patientData.name}</h2>
                <p className="ch-patient-pid">{patientData.pid}</p>
                <div className="ch-patient-contact-row">
                  <span className="ch-contact-item">
                    <Icons.Phone />
                    {patientData.phone}
                  </span>
                  <span className="ch-contact-item">
                    <Icons.Mail />
                    {patientData.email}
                  </span>
                </div>
              </div>
              <div className="ch-patient-stats">
                <div className="ch-stat-row">
                  <span className="ch-stat-row-left">
                    <Icons.Calendar />
                    Total Consultations
                  </span>
                  <span className="ch-stat-val">{summaryStats.totalConsultations}</span>
                </div>
                <div className="ch-stat-row">
                  <span className="ch-stat-row-left">
                    <Icons.Calendar />
                    Last Consultation
                  </span>
                  <span className="ch-stat-val">{summaryStats.lastConsultation}</span>
                </div>
                <div className="ch-stat-row">
                  <span className="ch-stat-row-left">
                    <Icons.UserCheck />
                    Primary Doctor
                  </span>
                  <span className="ch-stat-val-block">
                    <span>Dr. Abdullah Al Noman</span>
                    <span>Cardiologist</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="ch-patient-bottom">
              <div className="ch-patient-extra">
                <span className="ch-extra-item">
                  Blood Group: <span>{patientData.bloodGroup}</span>
                </span>
                <span className="ch-extra-item">
                  Date of Birth: <span>{patientData.dob}</span>
                </span>
                <span className="ch-extra-item">
                  Address: <span>{patientData.address}</span>
                </span>
              </div>
              <button className="ch-view-profile-btn">
                View Full Profile
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="ch-filter-bar">
            <div className="ch-filter-group">
              <div className="ch-filter-group-row">
                {/* Date Range */}
                <div style={{ position: "relative", flex: 1 }}>
                  <button
                    className="ch-filter-item"
                    onClick={() => {
                      setShowDatePicker(v => !v);
                      setShowDoctorDropdown(false);
                      setShowVisitTypeDropdown(false);
                    }}
                  >
                    <Icons.Calendar className="ch-filter-svg" />
                    <span>
                      {dateFrom && dateTo
                        ? `${dateFrom} – ${dateTo}`
                        : dateFrom
                          ? `From ${dateFrom}`
                          : dateTo
                            ? `To ${dateTo}`
                            : "Date Range"}
                    </span>
                    <Icons.ChevronDown className="ch-filter-chevron" />
                  </button>
                  {showDatePicker && (
                    <div className="ch-dropdown ch-date-dropdown">
                      <div className="ch-date-row">
                        <label>From</label>
                        <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
                      </div>
                      <div className="ch-date-row">
                        <label>To</label>
                        <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} />
                      </div>
                      <div className="ch-date-actions">
                        <button onClick={() => { setDateFrom(""); setDateTo(""); }}>Clear</button>
                        <button className="apply" onClick={() => setShowDatePicker(false)}>Apply</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Doctor Dropdown */}
                <div style={{ position: "relative", flex: 1 }}>
                  <button
                    className="ch-filter-item"
                    onClick={() => {
                      setShowDoctorDropdown(v => !v);
                      setShowVisitTypeDropdown(false);
                      setShowDatePicker(false);
                    }}
                  >
                    <span>{selectedDoctor === "all" ? "All Doctors" : selectedDoctor}</span>
                    <Icons.ChevronDown className="ch-filter-chevron" />
                  </button>
                  {showDoctorDropdown && (
                    <div className="ch-dropdown">
                      <div
                        className="ch-dropdown-item"
                        onClick={() => { setSelectedDoctor("all"); setShowDoctorDropdown(false); }}
                      >
                        All Doctors
                      </div>
                      {doctorList.map(d => (
                        <div
                          key={d.name}
                          className="ch-dropdown-item"
                          onClick={() => { setSelectedDoctor(d.name); setShowDoctorDropdown(false); }}
                        >
                          {d.name}
                          <span style={{ color: "#94a3b8", fontSize: "10px", marginLeft: 4 }}>
                            {d.specialty}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Visit Type Dropdown */}
                <div style={{ position: "relative", flex: 1 }}>
                  <button
                    className="ch-filter-item"
                    onClick={() => {
                      setShowVisitTypeDropdown(v => !v);
                      setShowDoctorDropdown(false);
                      setShowDatePicker(false);
                    }}
                  >
                    <span>
                      {selectedVisitType === "all"
                        ? "All Visit Types"
                        : selectedVisitType === "follow-up"
                          ? "Follow-up"
                          : selectedVisitType === "lab-test"
                            ? "Lab Test"
                            : "Consultation"}
                    </span>
                    <Icons.ChevronDown className="ch-filter-chevron" />
                  </button>
                  {showVisitTypeDropdown && (
                    <div className="ch-dropdown">
                      {[
                        ["all", "All Visit Types"],
                        ["follow-up", "Follow-up"],
                        ["lab-test", "Lab Test"],
                        ["consultation", "Consultation"],
                      ].map(([val, label]) => (
                        <div
                          key={val}
                          className="ch-dropdown-item"
                          onClick={() => { setSelectedVisitType(val); setShowVisitTypeDropdown(false); }}
                        >
                          {label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="ch-search-wrap">
              <Icons.Search />
              <input
                type="text"
                placeholder="Search consultations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="ch-filter-actions">
              <button className="ch-apply-btn">
                <Icons.Filter className="ch-filter-svg" /> Apply Filter
              </button>
              <button
                className="ch-reset-btn"
                onClick={() => {
                  setSelectedDoctor("all");
                  setSelectedVisitType("all");
                  setSearchTerm("");
                  setDateFrom("");
                  setDateTo("");
                  setCurrentPage(1);
                }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Consultations Table */}
          <div className="ch-table-section">
            <div className="ch-table-wrap">
              <table className="ch-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date & Time</th>
                    <th>Doctor</th>
                    <th>Visit Type</th>
                    <th>Reason / Diagnosis</th>
                    <th>Next Visit</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedConsultations.map((consultation, idx) => (
                    <tr key={consultation.id}>
                      <td>{(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}</td>
                      <td>
                        <p className="ch-date-val">{consultation.date}</p>
                        <p className="ch-time-val">{consultation.time}</p>
                      </td>
                      <td>
                        <div className="ch-doctor-cell">
                          <div className="ch-doc-avatar">
                            <img
                              src={getDoctorImage(consultation.id)}
                              alt={consultation.doctor.name}
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                                  svg.setAttribute("viewBox", "0 0 24 24");
                                  svg.setAttribute("fill", "none");
                                  svg.setAttribute("stroke", "#16a34a");
                                  svg.setAttribute("stroke-width", "2");
                                  svg.innerHTML = '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>';
                                  parent.appendChild(svg);
                                }
                              }}
                            />
                          </div>
                          <div>
                            <p className="ch-doc-name">{consultation.doctor.name}</p>
                            <p className="ch-doc-spec">{consultation.doctor.specialty}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`ch-visit-badge ${getVisitTypeBadgeClass(consultation.visitType)}`}>
                          {getVisitTypeLabel(consultation.visitType)}
                        </span>
                      </td>
                      <td>
                        <p className="ch-reason-text">{consultation.reason}</p>
                        <p className="ch-diagnosis-text">{consultation.diagnosis.substring(0, 60)}...</p>
                      </td>
                      <td>
                        {consultation.nextVisit ? (
                          <>
                            <p className="ch-next-date">{consultation.nextVisit.date}</p>
                            <p className="ch-next-time">{consultation.nextVisit.time}</p>
                          </>
                        ) : (
                          <span className="ch-next-none">—</span>
                        )}
                      </td>
                      <td>
                        <button className="ch-view-btn" title="View Details">
                          <Icons.Eye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Consultation Cards — mobile only */}
            <div className="ch-con-cards">
              {paginatedConsultations.map((consultation, idx) => (
                <div key={consultation.id} className="ch-con-card">
                  <div className="ch-con-card-top">
                    <span className="ch-con-card-serial">
                      # {(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                    </span>
                    <span className={`ch-visit-badge ${getVisitTypeBadgeClass(consultation.visitType)}`}>
                      {getVisitTypeLabel(consultation.visitType)}
                    </span>
                  </div>
                  <div className="ch-con-card-mid">
                    <div className="ch-con-card-doctor">
                      <div className="ch-con-card-doc-avatar">
                        <img
                          src={getDoctorImage(consultation.id)}
                          alt={consultation.doctor.name}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            const parent = e.currentTarget.parentElement;
                            if (parent) {
                              const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                              svg.setAttribute("viewBox", "0 0 24 24");
                              svg.setAttribute("fill", "none");
                              svg.setAttribute("stroke", "#16a34a");
                              svg.setAttribute("stroke-width", "2");
                              svg.innerHTML = '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>';
                              parent.appendChild(svg);
                            }
                          }}
                        />
                      </div>
                      <div>
                        <p className="ch-con-card-doc-name">{consultation.doctor.name}</p>
                        <p className="ch-con-card-doc-spec">{consultation.doctor.specialty}</p>
                      </div>
                    </div>
                    <div className="ch-con-card-datetime">
                      <p className="ch-con-card-date">{consultation.date}</p>
                      <p className="ch-con-card-time">{consultation.time}</p>
                    </div>
                  </div>
                  <div className="ch-con-card-reason">
                    <p className="ch-con-card-reason-label">Reason / Diagnosis</p>
                    <p className="ch-con-card-reason-text">{consultation.reason}</p>
                    <p className="ch-con-card-diag-text">{consultation.diagnosis}</p>
                  </div>
                  <div className="ch-con-card-footer">
                    <div className="ch-con-card-next">
                      <span className="ch-con-card-next-label">Next Visit</span>
                      {consultation.nextVisit ? (
                        <span className="ch-con-card-next-val">
                          {consultation.nextVisit.date} · {consultation.nextVisit.time}
                        </span>
                      ) : (
                        <span className="ch-con-card-next-none">—</span>
                      )}
                    </div>
                    <button className="ch-con-card-view-btn" title="View Details">
                      <Icons.Eye />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="ch-pagination">
              <span className="ch-pagination-info">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredConsultations.length)} of{" "}
                {filteredConsultations.length} entries
              </span>
              <div className="ch-pagination-btns">
                <button
                  className="ch-page-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <Icons.ChevronLeft />
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      className={`ch-page-btn ${pageNum === currentPage ? "active" : ""}`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  className="ch-page-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <Icons.ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="ch-right-col">
          {/* Visit Type Overview - Donut Chart */}
          <div className="ch-right-card">
            <h3 className="ch-right-card-title">Visit Type Overview</h3>
            <div className="ch-donut-wrap">
              <div className="ch-donut-svg-wrap">
                <svg className="ch-donut-svg" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#014fa1"
                    strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset="70.75"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#428a26"
                    strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset="212.25"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="10"
                    strokeDasharray="283"
                    strokeDashoffset="254.7"
                  />
                  <text x="50" y="45" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1a202c">15</text>
                  <text x="50" y="58" textAnchor="middle" fontSize="7" fill="#64748b">Total</text>
                </svg>
              </div>
              <div className="ch-donut-legend">
                <div className="ch-legend-item">
                  <div className="ch-legend-dot" style={{ background: "#014fa1" }}></div>
                  <span className="ch-legend-label">Consultation</span>
                  <span className="ch-legend-val">8 (53%)</span>
                </div>
                <div className="ch-legend-item">
                  <div className="ch-legend-dot" style={{ background: "#428a26" }}></div>
                  <span className="ch-legend-label">Follow-up</span>
                  <span className="ch-legend-val">4 (27%)</span>
                </div>
                <div className="ch-legend-item">
                  <div className="ch-legend-dot" style={{ background: "#f59e0b" }}></div>
                  <span className="ch-legend-label">Lab Test</span>
                  <span className="ch-legend-val">3 (20%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Consultation Summary */}
          <div className="ch-right-card">
            <h3 className="ch-right-card-title">Consultation Summary</h3>
            <div className="ch-summary-rows">
              <div className="ch-summary-row">
                <span className="ch-summary-key">Total Consultations</span>
                <span className="ch-summary-val">{summaryStats.totalConsultations}</span>
              </div>
              <div className="ch-summary-row">
                <span className="ch-summary-key">This Year (2025)</span>
                <span className="ch-summary-val blue">{summaryStats.thisYear}</span>
              </div>
              <div className="ch-summary-row">
                <span className="ch-summary-key">This Month (May 2025)</span>
                <span className="ch-summary-val green">{summaryStats.thisMonth}</span>
              </div>
              <div className="ch-summary-row">
                <span className="ch-summary-key">Last Consultation</span>
                <span className="ch-summary-val">{summaryStats.lastConsultation}</span>
              </div>
              <div className="ch-summary-row">
                <span className="ch-summary-key">Next Scheduled</span>
                <span className="ch-summary-val blue">{summaryStats.nextScheduled}</span>
              </div>
              <div className="ch-summary-row">
                <span className="ch-summary-key">Average Gap</span>
                <span className="ch-summary-val">{summaryStats.averageGap}</span>
              </div>
            </div>
          </div>

          {/* Frequently Visited Doctors */}
          <div className="ch-right-card">
            <div className="ch-freq-header">
              <h3 className="ch-freq-title">Frequently Visited Doctors</h3>
              <button className="ch-view-all-link">View All</button>
            </div>
            <div className="ch-freq-list">
              {frequentDoctors.slice(0, 5).map((doctor, idx) => (
                <div key={idx} className="ch-freq-item">
                  <div className="ch-freq-avatar">
                    <img
                      src={getDoctorImage(idx)}
                      alt={doctor.name}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                          svg.setAttribute("viewBox", "0 0 24 24");
                          svg.setAttribute("fill", "none");
                          svg.setAttribute("stroke", "#014fa1");
                          svg.setAttribute("stroke-width", "2");
                          svg.innerHTML = '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>';
                          parent.appendChild(svg);
                        }
                      }}
                    />
                  </div>
                  <div className="ch-freq-info">
                    <p className="ch-freq-name">{doctor.name}</p>
                    <p className="ch-freq-spec">{doctor.specialty}</p>
                  </div>
                  <span className="ch-freq-visits">{doctor.visits} visits</span>
                </div>
              ))}
            </div>
          </div>

          {/* Need Help Card */}
          <div className="ch-help-card">
            <div className="ch-help-top">
              <div className="ch-help-icon">
                <Icons.HelpCircle />
              </div>
              <div>
                <h4 className="ch-help-title">Need Help?</h4>
                <p className="ch-help-text">
                  If you have any questions or need assistance, our support team is here to help you.
                </p>
              </div>
            </div>
            <button className="ch-help-btn">Contact Support</button>
          </div>
        </div>
      </div>
    </div>
  );
}