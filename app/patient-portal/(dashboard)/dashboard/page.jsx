// app/patient/dashboard/page.jsx
"use client";

import { useState } from "react";
import "@/styles/pages/patient-dashboard.css";

// Mock data — replace with actual API calls
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
    totalReports: { count: "12", label: "Reports" },
    prescriptions: { count: "08", label: "Prescriptions" },
    consultations: { count: "06", label: "Consultations" },
    appointments: { count: "02", label: "Upcoming" },
    healthScore: { score: "85", status: "Good" },
  },
  timeline: [
    {
      id: 1,
      type: "Machine Report",
      title: "Full Body Check-up",
      date: "10 May 2025",
      time: "10:30 AM",
      status: "Normal",
      statusType: "success",
    },
    {
      id: 2,
      type: "Doctor Note",
      title: "General Physician",
      description: "Patient is doing well. Advised regular exercise and healthy diet.",
      date: "10 May 2025",
      time: "11:00 AM",
    },
    {
      id: 3,
      type: "Prescription",
      title: "Medicine prescribed for 7 days.",
      date: "10 May 2025",
      time: "11:05 AM",
    },
    {
      id: 4,
      type: "Machine Report",
      title: "Skin Analyzer Report",
      date: "15 Apr 2025",
      time: "09:20 AM",
      status: "Risk",
      statusType: "warning",
    },
  ],
  upcomingAppointment: {
    date: "16",
    month: "MAY",
    year: "2025",
    doctorName: "Dr. Afsana Rahman",
    specialty: "Dermatologist",
    time: "11:30 AM",
    location: "Dhanmondi Outlet",
    status: "Confirmed",
  },
  quickActions: [
    { label: "Book Appointment", icon: "calendar", href: "/patient/appointments" },
    { label: "View Reports", icon: "reports", href: "/patient/reports" },
    { label: "Prescriptions", icon: "prescription", href: "/patient/prescriptions" },
    { label: "Contact Doctor", icon: "chat", href: "/patient/messages" },
  ],
};

export default function PatientDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="patient-dashboard-content">
      {/* Profile Header Card */}
      <div className="profile-header-card">
        <div className="profile-main-info">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
              <img src={dashboardData.profile.avatar} alt={dashboardData.profile.name} />
            </div>
            <button className="edit-avatar-btn" aria-label="Change photo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
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
          <button className="edit-profile-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Profile Info Grid */}
        <div className="profile-info-grid">
          <div className="info-item">
            <div className="info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="info-content">
              <span className="info-value">{dashboardData.profile.age} Years</span>
              <span className="info-label">Age</span>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div className="info-content">
              <span className="info-value">{dashboardData.profile.birthDate}</span>
              <span className="info-label">Birth Date</span>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="info-content">
              <span className="info-value">{dashboardData.profile.gender}</span>
              <span className="info-label">Gender</span>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="info-content">
              <span className="info-value">{dashboardData.profile.bloodGroup}</span>
              <span className="info-label">Blood Group</span>
            </div>
          </div>
          <div className="info-item">
            <div className="info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12 19.79 19.79 0 0 1 1 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className="info-content">
              <span className="info-value">{dashboardData.profile.mobile}</span>
              <span className="info-label">Mobile</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card reports">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">{dashboardData.stats.totalReports.label}</span>
            <span className="stat-value">{dashboardData.stats.totalReports.count}</span>
            <a href="/patient/reports" className="stat-link">View All →</a>
          </div>
        </div>
        <div className="stat-card prescriptions">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">{dashboardData.stats.prescriptions.label}</span>
            <span className="stat-value">{dashboardData.stats.prescriptions.count}</span>
            <a href="/patient/prescriptions" className="stat-link">View All →</a>
          </div>
        </div>
        <div className="stat-card consultations">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">{dashboardData.stats.consultations.label}</span>
            <span className="stat-value">{dashboardData.stats.consultations.count}</span>
            <a href="/patient/consultations" className="stat-link">View All →</a>
          </div>
        </div>
        <div className="stat-card appointments">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-label">{dashboardData.stats.appointments.label}</span>
            <span className="stat-value">{dashboardData.stats.appointments.count}</span>
            <a href="/patient/appointments" className="stat-link">View All →</a>
          </div>
        </div>
        <div className="stat-card health-score">
          <div className="health-score-circle">
            <svg className="circular-chart" viewBox="0 0 100 100">
              <circle className="circle-bg" cx="50" cy="50" r="45" />
              <circle className="circle" cx="50" cy="50" r="45" strokeDasharray={`${dashboardData.stats.healthScore.score}, 100`} />
            </svg>
            <span className="score-value">{dashboardData.stats.healthScore.score}</span>
          </div>
          <div className="stat-content">
            <span className="stat-label">Health Score</span>
            <span className="health-status">{dashboardData.stats.healthScore.status}</span>
            <a href="/patient/health-summary" className="stat-link">View Details →</a>
          </div>
        </div>
      </div>

      {/* Dashboard Grid Layout */}
      <div className="dashboard-grid-layout">
        <div className="dashboard-left-column">
          {/* Health Timeline */}
          <div className="health-timeline-card">
            <div className="timeline-header">
              <h3 className="timeline-title">Health Timeline</h3>
              <select className="filter-select">
                <option>All Time</option>
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
              </select>
            </div>
            <div className="timeline-list">
              {dashboardData.timeline.map((item) => (
                <div key={item.id} className="timeline-item">
                  <div className={`timeline-icon ${item.type === "Prescription" ? "prescription" : item.statusType === "warning" ? "orange" : "green"}`}>
                    {item.type === "Machine Report" && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    )}
                    {item.type === "Doctor Note" && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    )}
                    {item.type === "Prescription" && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
                      </svg>
                    )}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-date">
                      <span className="date">{item.date}</span>
                      <span className="time">{item.time}</span>
                    </div>
                    <div className="timeline-details">
                      <span className={`detail-type ${item.type === "Prescription" ? "purple" : item.statusType === "warning" ? "orange" : "green"}`}>
                        {item.type}
                      </span>
                      <p className="detail-title">{item.title}</p>
                      {item.description && <p className="detail-description">{item.description}</p>}
                    </div>
                    {item.status && (
                      <span className={`status-badge status-${item.statusType}`}>{item.status}</span>
                    )}
                  </div>
                  <button className="timeline-action">View Details</button>
                </div>
              ))}
            </div>
            <button className="load-more-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15" />
              </svg>
              Load More
            </button>
          </div>
        </div>

        <div className="dashboard-right-column">
          {/* Upcoming Appointment */}
          <div className="upcoming-appointment-card">
            <div className="appointment-header">
              <h3 className="appointment-title">Upcoming Appointment</h3>
              <a href="/patient/appointments" className="view-all-link">View All →</a>
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
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{dashboardData.upcomingAppointment.time}</span>
                  </div>
                  <div className="meta-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
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
              {dashboardData.quickActions.map((action, idx) => (
                <a key={idx} href={action.href} className="quick-action-btn">
                  <div className="action-icon">
                    {action.icon === "calendar" && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    )}
                    {action.icon === "reports" && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    )}
                    {action.icon === "prescription" && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
                      </svg>
                    )}
                    {action.icon === "chat" && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                    )}
                  </div>
                  <span className="action-label">{action.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Health Tip Card */}
          <div className="health-tip-card">
            <div className="health-tip-text">
              <h4>💡 Health Tip of the Day</h4>
              <p>Stay hydrated! Drink at least 8 glasses of water daily to maintain optimal health.</p>
            </div>
            <span className="health-tip-icon">💧</span>
          </div>
        </div>
      </div>
    </div>
  );
}