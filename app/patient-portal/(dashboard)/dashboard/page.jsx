"use client";
import { useState } from "react";
import Link from "next/link";
import "./patient-dashboard.css";
import {
  Calendar,
  User,
  Droplet,
  Phone,
  Building2,
  FileText,
  Pill,
  Stethoscope,
  Clock,
  CheckCircle,
  Activity,
  Eye,
  Download,
  Upload,
  MessageSquare,
  Plus,
  Edit,
  Camera,
  MapPin,
  Heart,
  ChevronDown,
  ChevronUp
} from "lucide-react";

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
  if (type === "Machine Report") return <FileText size={16} />;
  if (type === "Doctor Note") return <User size={16} />;
  return <Pill size={16} />;
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
              <Camera size={16} />
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
            <Edit size={16} />
            <span>Edit Profile</span>
          </Link>
        </div>

        <div className="profile-info-grid">
          {[
            { icon: Calendar, value: `${dashboardData.profile.age} Years`, label: dashboardData.profile.birthDate },
            { icon: User, value: dashboardData.profile.gender, label: "Gender" },
            { icon: Droplet, value: dashboardData.profile.bloodGroup, label: "Blood Group" },
            { icon: Phone, value: dashboardData.profile.mobile, label: "Mobile" },
            { icon: Building2, value: dashboardData.profile.outlet, label: "Registered Outlet" },
          ].map((item, i) => (
            <div key={i} className="info-item">
              <div className="info-icon">
                <item.icon size={18} />
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
          <div className="stat-icon"><FileText size={22} /></div>
          <div className="stat-content">
            <span className="stat-label">Total Reports</span>
            <span className="stat-value">{String(dashboardData.stats.totalReports).padStart(2, "0")}</span>
            <Link href="/patient-portal/reports" className="stat-link">View all reports →</Link>
          </div>
        </div>
        <div className="stat-card prescriptions">
          <div className="stat-icon"><Pill size={22} /></div>
          <div className="stat-content">
            <span className="stat-label">Prescriptions</span>
            <span className="stat-value">{String(dashboardData.stats.prescriptions).padStart(2, "0")}</span>
            <Link href="/patient-portal/prescriptions" className="stat-link">View all prescriptions →</Link>
          </div>
        </div>
        <div className="stat-card consultations">
          <div className="stat-icon"><Stethoscope size={22} /></div>
          <div className="stat-content">
            <span className="stat-label">Consultations</span>
            <span className="stat-value">{String(dashboardData.stats.consultations).padStart(2, "0")}</span>
            <Link href="/patient-portal/consultations" className="stat-link">View history →</Link>
          </div>
        </div>
        <div className="stat-card appointments">
          <div className="stat-icon"><Calendar size={22} /></div>
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
              {showAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
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
                    <Clock size={16} />
                    <span>{dashboardData.upcomingAppointment.time}</span>
                  </div>
                  <div className="meta-item">
                    <MapPin size={16} />
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
                <div className="action-icon"><Calendar size={20} /></div>
                <span className="action-label">Book Appointment</span>
              </Link>
              <button className="quick-action-btn">
                <div className="action-icon"><Upload size={20} /></div>
                <span className="action-label">Upload Report</span>
              </button>
              <button className="quick-action-btn">
                <div className="action-icon"><Download size={20} /></div>
                <span className="action-label">Download Records</span>
              </button>
              <button className="quick-action-btn">
                <div className="action-icon"><MessageSquare size={20} /></div>
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