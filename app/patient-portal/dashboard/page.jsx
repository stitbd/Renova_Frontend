// app/patient/dashboard/page.jsx
import { Metadata } from "next";
import { siteConfig } from "@/constants/siteData";
import "@/styles/pages/patient-dashboard.css";
import Sidebar from "@/components/patient-dashboard/Sidebar";
import Header from "@/components/patient-dashboard/Header";
import ProfileHeader from "@/components/patient-dashboard/ProfileHeader";
import StatsGrid from "@/components/patient-dashboard/StatsGrid";
import HealthTimeline from "@/components/patient-dashboard/HealthTimeline";
import UpcomingAppointment from "@/components/patient-dashboard/UpcomingAppointment";
import QuickActions from "@/components/patient-dashboard/QuickActions";

export const metadata = {
  title: `Patient Dashboard | ${siteConfig.name}`,
  description: "Manage your health records, appointments, and prescriptions",
};

// Mock data - Replace with actual API calls
const patientData = {
  profile: {
    name: "Md. Rakib Hasan",
    patientId: "PT-2025-000123",
    status: "Active",
    age: 32,
    birthDate: "15 Jan 1993",
    gender: "Male",
    bloodGroup: "B+",
    mobile: "01712-345678",
    outlet: "Dhammondi Outlet",
    avatar: "/images/patients/avatar.jpg",
  },
  stats: {
    totalReports: 12,
    prescriptions: 8,
    consultations: 6,
    upcomingAppointments: 2,
    healthScore: 85,
    healthStatus: "Good",
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
    {
      id: 5,
      type: "Doctor Note",
      title: "Dermatologist",
      description: "Mild acne and skin sensitivity noted.",
      date: "15 Apr 2025",
      time: "09:45 AM",
    },
    {
      id: 6,
      type: "Prescription",
      title: "Topical cream and oral medicine for 5 days.",
      date: "15 Apr 2025",
      time: "09:50 AM",
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
};

export default function PatientDashboardPage() {
  return (
    <div className="patient-dashboard-container">
      <Sidebar />
      <div className="patient-main-content">
        <Header />
        <div className="patient-dashboard-content">
          <ProfileHeader profile={patientData.profile} />
          <StatsGrid stats={patientData.stats} />
          <div className="dashboard-grid-layout">
            <div className="dashboard-left-column">
              <HealthTimeline timeline={patientData.timeline} />
            </div>
            <div className="dashboard-right-column">
              <UpcomingAppointment appointment={patientData.upcomingAppointment} />
              <QuickActions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}