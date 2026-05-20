// app/doctor-portal/page.jsx
import { siteConfig } from "@/constants/siteData";
import "@/styles/pages/doctor-dashboard.css";
import StatCard from "@/components/dashboard/StatCard";
import PatientQueueList from "@/components/dashboard/PatientQueueList";
import AppointmentsList from "@/components/dashboard/AppointmentsList";
import ScheduleTimeline from "@/components/dashboard/ScheduleTimeline";
import RecentConsultations from "@/components/dashboard/RecentConsultations";
import PendingPrescriptions from "@/components/dashboard/PendingPrescriptions";
import EarningsOverview from "@/components/dashboard/EarningsOverview";

export const metadata = {
  title: `Dashboard | ${siteConfig.name}`,
  description: "Doctor dashboard - Manage patients, appointments, and consultations",
};

// Mock data - Replace with actual API calls
const dashboardData = {
  stats: {
    newPatients: { count: "05", label: "In Queue" },
    appointments: { count: "12", label: "Scheduled" },
    consultations: { count: "18", label: "Completed" },
    prescriptions: { count: "07", label: "Pending" },
    earnings: { amount: "8,450", currency: "৳" },
  },
  patientQueue: [
    {
      id: 1,
      name: "Masud Rana",
      age: 32,
      gender: "Male",
      issue: "Chest pain, Breathing problem",
      time: "10:24 AM",
      waitingTime: "02:15",
      avatar: "/images/patients/01.jpg",
    },
    {
      id: 2,
      name: "Farhana Akter",
      age: 28,
      gender: "Female",
      issue: "Heart palpitations, Anxiety",
      time: "10:28 AM",
      waitingTime: "01:48",
      avatar: "/images/patients/02.jpg",
    },
    {
      id: 3,
      name: "Abdullah Al Mamun",
      age: 45,
      gender: "Male",
      issue: "High BP, Headache",
      time: "10:31 AM",
      waitingTime: "01:32",
      avatar: "/images/patients/03.jpg",
    },
    {
      id: 4,
      name: "Sumiya Rahman",
      age: 30,
      gender: "Female",
      issue: "Shortness of breath",
      time: "10:35 AM",
      waitingTime: "00:58",
      avatar: "/images/patients/04.jpg",
    },
    {
      id: 5,
      name: "Rafiq Hasan",
      age: 50,
      gender: "Male",
      issue: "ECG review",
      time: "10:35 AM",
      waitingTime: "00:32",
      avatar: "/images/patients/05.jpg",
    },
  ],
  appointments: [
    { time: "11:00 AM", name: "Jannatul Ferdous", type: "Follow-up", status: "Confirmed" },
    { time: "11:30 AM", name: "Sohel Mahmud", type: "Regular Checkup", status: "Confirmed" },
    { time: "12:00 PM", name: "Nusrat Jahan", type: "ECG Report Review", status: "Confirmed" },
    { time: "12:30 PM", name: "Kamal Hossain", type: "Consultation", status: "Upcoming" },
    { time: "01:00 PM", name: "Mst. Joya Akter", type: "Follow-up", status: "Upcoming" },
  ],
  schedule: [
    { time: "09:00 AM", event: "Chamber Start", status: "Completed" },
    { time: "09:30 AM", event: "Patient Consultation", status: "Completed" },
    { time: "10:00 AM", event: "Patient Consultation", status: "Completed" },
    { time: "11:00 AM", event: "Jannatul Ferdous", status: "Confirmed" },
    { time: "11:30 AM", event: "Sohel Mahmud", status: "Confirmed" },
    { time: "12:00 PM", event: "Nusrat Jahan", status: "Confirmed" },
    { time: "01:00 PM", event: "Lunch Break", status: "Break" },
    { time: "02:00 PM", event: "Next Appointments", status: "Upcoming" },
  ],
  recentConsultations: [
    {
      name: "Khalid Hasan",
      age: 45,
      gender: "Male",
      condition: "Hypertension",
      date: "10 May 2025",
      time: "09:15 AM",
      fee: "500",
      status: "Completed",
    },
    {
      name: "Maliha Islam",
      age: 29,
      gender: "Female",
      condition: "Anxiety Disorder",
      date: "10 May 2025",
      time: "08:30 AM",
      fee: "500",
      status: "Completed",
    },
    {
      name: "Rashidul Alam",
      age: 52,
      gender: "Male",
      condition: "ECG Review",
      date: "09 May 2025",
      time: "07:45 PM",
      fee: "600",
      status: "Completed",
    },
  ],
  pendingPrescriptions: [
    { name: "Masud Rana", time: "10:24 AM", type: "New Prescription", status: "Pending" },
    { name: "Farhana Akter", time: "10:28 AM", type: "New Prescription", status: "Pending" },
    { name: "Abdullah Al Mamun", time: "10:31 AM", type: "New Prescription", status: "Pending" },
  ],
  earningsData: {
    total: "42,850",
    growth: "+12.5%",
    period: "This Week",
    chartData: [
      { day: "Sun", value: 4500 },
      { day: "Mon", value: 3200 },
      { day: "Tue", value: 5100 },
      { day: "Wed", value: 4800 },
      { day: "Thu", value: 6200 },
      { day: "Fri", value: 3800 },
      { day: "Sat", value: 5400 },
    ],
  },
};

export default function DashboardPage() {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20" fill="url(#gradient)" />
              <path d="M20 10V30M10 20H30" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="40" y2="40">
                  <stop stopColor="#428a26" />
                  <stop offset="1" stopColor="#4CAF50" />
                </linearGradient>
              </defs>
            </svg>
            <div className="logo-text">
              <span className="logo-name">Renova</span>
              <span className="logo-tagline">LIFE CARE LTD</span>
              <span className="logo-slogan">Caring Today, Healthy Tomorrow</span>
            </div>
          </div>
        </div>

        <div className="sidebar-profile">
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>
          <div className="profile-info">
            <h3 className="profile-name">Dr. Ahsan Rahman</h3>
            <p className="profile-specialty">Cardiologist</p>
            <span className="profile-status online">
              <span className="status-dot" />
              Online
            </span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a href="/dashboard" className="nav-item active">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
            <span>Dashboard</span>
          </a>
          <a href="/dashboard/patients" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>Patient Queue</span>
            <span className="nav-badge">5</span>
          </a>
          <a href="/dashboard/appointments" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Appointments</span>
          </a>
          <a href="/dashboard/consultations" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span>Consultations</span>
          </a>
          <a href="/dashboard/patients" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Patients</span>
          </a>
          <a href="/dashboard/prescriptions" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
            </svg>
            <span>Prescriptions</span>
          </a>
          <a href="/dashboard/reports" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            <span>Reports & Documents</span>
          </a>
          <a href="/dashboard/earnings" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span>Earnings</span>
          </a>
          <a href="/dashboard/calendar" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Calendar</span>
          </a>
          <a href="/dashboard/messages" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span>Messages</span>
            <span className="nav-badge">3</span>
          </a>
          <a href="/dashboard/settings" className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <span>Settings</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <button className="support-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <div className="support-text">
              <span>Need Support?</span>
              <span>Contact Support</span>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <button className="menu-toggle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div className="header-greeting">
              <h1 className="greeting-title">Good Morning, Dr. Ahsan Rahman 👋</h1>
              <p className="greeting-subtitle">Here's what's happening with your practice today.</p>
            </div>
          </div>
          <div className="header-right">
            <div className="status-toggle">
              <span className="status-indicator online" />
              <span>Online</span>
            </div>
            <button className="header-icon-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="notification-badge">5</span>
            </button>
            <button className="header-icon-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span className="notification-badge">2</span>
            </button>
            <div className="header-profile">
              <div className="profile-avatar-small">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="stats-grid">
          <StatCard
            icon="patients"
            title="New Patients"
            count={dashboardData.stats.newPatients.count}
            label={dashboardData.stats.newPatients.label}
            variant="primary"
            linkText="View Queue"
          />
          <StatCard
            icon="calendar"
            title="Today's Appointments"
            count={dashboardData.stats.appointments.count}
            label={dashboardData.stats.appointments.label}
            variant="secondary"
            linkText="View All"
          />
          <StatCard
            icon="consultation"
            title="Consultations"
            count={dashboardData.stats.consultations.count}
            label={dashboardData.stats.consultations.label}
            variant="tertiary"
            linkText="View All"
          />
          <StatCard
            icon="prescription"
            title="Prescriptions"
            count={dashboardData.stats.prescriptions.count}
            label={dashboardData.stats.prescriptions.label}
            variant="quaternary"
            linkText="View All"
          />
          <StatCard
            icon="earnings"
            title="Today's Earnings"
            count={`${dashboardData.stats.earnings.currency} ${dashboardData.stats.earnings.amount}`}
            label=""
            variant="quinary"
            linkText="View Earnings"
          />
        </div>

        {/* Main Grid - 3 Columns */}
        <div className="dashboard-grid">
          <div className="dashboard-column">
            <PatientQueueList patients={dashboardData.patientQueue} />
          </div>
          <div className="dashboard-column">
            <AppointmentsList appointments={dashboardData.appointments} />
          </div>
          <div className="dashboard-column">
            <ScheduleTimeline schedule={dashboardData.schedule} />
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="bottom-grid">
          <div className="bottom-column">
            <RecentConsultations consultations={dashboardData.recentConsultations} />
          </div>
          <div className="bottom-column">
            <PendingPrescriptions prescriptions={dashboardData.pendingPrescriptions} />
          </div>
          <div className="bottom-column">
            <EarningsOverview data={dashboardData.earningsData} />
          </div>
        </div>
      </main>
    </div>
  );
}