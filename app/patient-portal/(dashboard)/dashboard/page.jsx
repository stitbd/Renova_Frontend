"use client";
import { useState } from "react";
import Link from "next/link";
import "./patient-dashboard.css";

const dashboardData = {
  profile: {
    name: "Md. Rakib Hasan",
    patientId: "PT-2025-000123",
    status: "Active",
    age: 32,
    birthDate: "15 Jan 1993",
    gender: "Male",
    bloodGroup: "B+",
    mobile: "01712-345678",
    outlet: "Dhanmondi Outlet",
    avatar: "/images/patients/01.jpg",
  },
  stats: {
    totalReports: 12,
    prescriptions: 8,
    consultations: 6,
    appointments: 2,
    healthScore: 85,
    healthStatus: "Good",
  },
  timeline: [
    { id: 1, type: "Machine Report", title: "Full Body Check-up", date: "10 May 2025", time: "10:30 AM", status: "Normal", statusType: "success" },
    { id: 2, type: "Doctor Note", title: "General Physician", description: "Patient is doing well. Advised regular exercise and healthy diet.", date: "10 May 2025", time: "11:00 AM" },
    { id: 3, type: "Prescription", title: "Medicine prescribed for 7 days.", date: "10 May 2025", time: "11:05 AM" },
    { id: 4, type: "Machine Report", title: "Skin Analyzer Report", date: "15 Apr 2025", time: "09:20 AM", status: "Risk", statusType: "warning" },
    { id: 5, type: "Doctor Note", title: "Dermatologist", description: "Mild acne and skin sensitivity noted.", date: "15 Apr 2025", time: "09:45 AM" },
    { id: 6, type: "Prescription", title: "Topical cream and oral medicine for 5 days.", date: "15 Apr 2025", time: "09:50 AM" },
  ],
  upcomingAppointment: {
    date: "16", month: "MAY", year: "2025",
    doctorName: "Dr. Afsana Rahman",
    specialty: "Dermatologist",
    time: "11:30 AM",
    location: "Dhanmondi Outlet",
    status: "Confirmed",
  },
};

function TimelineIcon({ type, statusType }) {
  if (type === "Machine Report") return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
  if (type === "Doctor Note") return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
    </svg>
  );
}

function getTimelineColor(type, statusType) {
  if (statusType === "warning") return "orange";
  if (type === "Machine Report") return "green";
  if (type === "Doctor Note") return "blue";
  if (type === "Prescription") return "purple";
  return "blue";
}

function getActionLabel(type) {
  if (type === "Machine Report") return "View Report";
  if (type === "Doctor Note") return "View Note";
  return "View Prescription";
}

export default function PatientDashboardPage() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? dashboardData.timeline : dashboardData.timeline.slice(0, 4);

  return (
    <div className="">

      {/* ── Profile Header ── */}
      <div className="profile-header-card">
        <div className="profile-main-info">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
              <img
                src={dashboardData.profile.avatar}
                alt={dashboardData.profile.name}
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>
            <button className="edit-avatar-btn" aria-label="Change photo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </button>
          </div>
          <div className="profile-details">
            <div className="profile-name-row">
              <h2 className="profile-name">{dashboardData.profile.name}</h2>
              <span className="status-badge active">{dashboardData.profile.status}</span>
            </div>
            <p className="profile-id-label">Patient ID</p>
            <p className="profile-id">{dashboardData.profile.patientId}</p>
          </div>
          <Link href="/patient-portal/profile" className="edit-profile-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span>Edit Profile</span>
          </Link>
        </div>

        <div className="profile-info-grid">
          {[
            { icon: "age", value: `${dashboardData.profile.age} Years`, label: dashboardData.profile.birthDate },
            { icon: "gender", value: dashboardData.profile.gender, label: "Gender" },
            { icon: "blood", value: dashboardData.profile.bloodGroup, label: "Blood Group" },
            { icon: "phone", value: dashboardData.profile.mobile, label: "Mobile" },
            { icon: "outlet", value: dashboardData.profile.outlet, label: "Registered Outlet" },
          ].map((item, i) => (
            <div key={i} className="info-item">
              <div className="info-icon">
                {item.icon === "age" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>}
                {item.icon === "gender" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>}
                {item.icon === "blood" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>}
                {item.icon === "phone" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>}
                {item.icon === "outlet" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>}
              </div>
              <div className="info-content">
                <span className="info-value">{item.value}</span>
                <span className="info-label">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div className="stats-grid">
        <div className="stat-card reports">
          <div className="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg></div>
          <div className="stat-content">
            <span className="stat-label">Total Reports</span>
            <span className="stat-value">{String(dashboardData.stats.totalReports).padStart(2, "0")}</span>
            <Link href="/patient-portal/reports" className="stat-link">View all reports →</Link>
          </div>
        </div>
        <div className="stat-card prescriptions">
          <div className="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" /></svg></div>
          <div className="stat-content">
            <span className="stat-label">Prescriptions</span>
            <span className="stat-value">{String(dashboardData.stats.prescriptions).padStart(2, "0")}</span>
            <Link href="/patient-portal/prescriptions" className="stat-link">View all prescriptions →</Link>
          </div>
        </div>
        <div className="stat-card consultations">
          <div className="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg></div>
          <div className="stat-content">
            <span className="stat-label">Consultations</span>
            <span className="stat-value">{String(dashboardData.stats.consultations).padStart(2, "0")}</span>
            <Link href="/patient-portal/consultations" className="stat-link">View history →</Link>
          </div>
        </div>
        <div className="stat-card appointments">
          <div className="stat-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><polyline points="9 16 11 18 15 14" /></svg></div>
          <div className="stat-content">
            <span className="stat-label">Upcoming Appointments</span>
            <span className="stat-value">{String(dashboardData.stats.appointments).padStart(2, "0")}</span>
            <Link href="/patient-portal/appointments" className="stat-link">View appointments →</Link>
          </div>
        </div>
        <div className="stat-card health-score">
          <div className="health-score-circle">
            <svg className="circular-chart" viewBox="0 0 36 36">
              <circle className="circle-bg" cx="18" cy="18" r="15.9155" />
              <circle className="circle" cx="18" cy="18" r="15.9155"
                strokeDasharray={`${dashboardData.stats.healthScore}, 100`} />
            </svg>
            <span className="score-value">{dashboardData.stats.healthScore}%</span>
          </div>
          <div className="stat-content">
            <span className="stat-label">Health Score</span>
            <span className="health-status">{dashboardData.stats.healthStatus}</span>
            <Link href="/patient-portal/health-summary" className="stat-link">View details →</Link>
          </div>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="dashboard-grid-layout">
        <div className="dashboard-left-column">
          <div className="health-timeline-card">
            <div className="timeline-header">
              <h3 className="timeline-title">Health Timeline</h3>
              <select className="filter-select">
                <option>All Types</option>
                <option>Machine Report</option>
                <option>Doctor Note</option>
                <option>Prescription</option>
              </select>
            </div>
            <div className="timeline-list">
              {visible.map((item) => {
                const color = getTimelineColor(item.type, item.statusType);
                return (
                  <div key={item.id} className="timeline-item">
                    <div className={`timeline-icon ${color}`}>
                      <TimelineIcon type={item.type} statusType={item.statusType} />
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-date">
                        <span className="date">{item.date}</span>
                        <span className="time">{item.time}</span>
                      </div>
                      <div className="timeline-details">
                        <span className={`detail-type ${color}`}>{item.type}</span>
                        <p className="detail-title">{item.title}</p>
                        {item.description && <p className="detail-description">{item.description}</p>}
                        {item.status && (
                          <span className={`status-badge status-${item.statusType === "success" ? "normal" : "risk"}`}>
                            {item.status}
                          </span>
                        )}
                      </div>
                    </div>
                    <button className="timeline-action">{getActionLabel(item.type)}</button>
                  </div>
                );
              })}
            </div>
            <button className="load-more-btn" onClick={() => setShowAll(!showAll)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points={showAll ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
              </svg>
              {showAll ? "Show Less" : "Load More"}
            </button>
          </div>
        </div>

        <div className="dashboard-right-column">
          {/* Upcoming Appointment */}
          <div className="upcoming-appointment-card">
            <div className="appointment-header">
              <h3 className="appointment-title">Upcoming Appointment</h3>
              <Link href="/patient-portal/appointments" className="view-all-link">View All →</Link>
            </div>
            <div className="appointment-details">
              <div className="appointment-date">
                <span className="date-day">{dashboardData.upcomingAppointment.date}</span>
                <span className="date-month">{dashboardData.upcomingAppointment.month}</span>
                <span className="date-year">{dashboardData.upcomingAppointment.year}</span>
              </div>
              <div className="appointment-info">
                <div className="appt-top-row">
                  <div className="doctor-info">
                    <h4 className="doctor-name">{dashboardData.upcomingAppointment.doctorName}</h4>
                    <p className="doctor-specialty">{dashboardData.upcomingAppointment.specialty}</p>
                  </div>
                  <span className="appointment-status-badge">{dashboardData.upcomingAppointment.status}</span>
                </div>
                <div className="appointment-meta">
                  <div className="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    <span>{dashboardData.upcomingAppointment.time}</span>
                  </div>
                  <div className="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    <span>{dashboardData.upcomingAppointment.location}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="appointment-actions">
              <button className="btn-reschedule">Reschedule</button>
              <button className="btn-cancel">Cancel</button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions-card">
            <h3 className="quick-actions-title">Quick Actions</h3>
            <div className="quick-actions-grid">
              <Link href="/patient-portal/appointments" className="quick-action-btn">
                <div className="action-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg></div>
                <span className="action-label">Book Appointment</span>
              </Link>
              <button className="quick-action-btn">
                <div className="action-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg></div>
                <span className="action-label">Upload Report</span>
              </button>
              <button className="quick-action-btn">
                <div className="action-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg></div>
                <span className="action-label">Download Records</span>
              </button>
              <button className="quick-action-btn">
                <div className="action-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg></div>
                <span className="action-label">Contact Doctor</span>
              </button>
            </div>
          </div>

          {/* Health Tip */}
          <div className="health-tip-card">
            <div className="health-tip-text">
              <h4>Take Care of Your Health</h4>
              <p>Stay healthy, stay happy. Regular check-ups help you live a better life.</p>
            </div>
            <span className="health-tip-icon">💙</span>
          </div>
        </div>
      </div>
    </div>
  );
}
