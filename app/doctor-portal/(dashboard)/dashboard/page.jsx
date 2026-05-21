// app/doctor-portal/page.jsx
"use client";

import { useState } from "react";
import { siteConfig } from "@/constants/siteData";
import "@/styles/pages/doctor-dashboard.css";
import StatCard from "@/components/doctor-dashboard/StatCard";
import PatientQueueList from "@/components/doctor-dashboard/PatientQueueList";
import AppointmentsList from "@/components/doctor-dashboard/AppointmentsList";
import ScheduleTimeline from "@/components/doctor-dashboard/ScheduleTimeline";
import RecentConsultations from "@/components/doctor-dashboard/RecentConsultations";
import PendingPrescriptions from "@/components/doctor-dashboard/PendingPrescriptions";
import EarningsOverview from "@/components/doctor-dashboard/EarningsOverview";

// Mock data - Replace with actual API calls
const dashboardData = {
  stats: {
    newPatients:   { count: "05", label: "In Queue" },
    appointments:  { count: "12", label: "Scheduled" },
    consultations: { count: "18", label: "Completed" },
    prescriptions: { count: "07", label: "Pending" },
    earnings:      { amount: "8,450", currency: "৳" },
  },
  patientQueue: [
    { id: 1, name: "Masud Rana",       age: 32, gender: "Male",   issue: "Chest pain, Breathing problem",  time: "10:24 AM", waitingTime: "02:15", avatar: "/images/patients/01.jpg" },
    { id: 2, name: "Farhana Akter",    age: 28, gender: "Female", issue: "Heart palpitations, Anxiety",    time: "10:28 AM", waitingTime: "01:48", avatar: "/images/patients/02.jpg" },
    { id: 3, name: "Abdullah Al Mamun",age: 45, gender: "Male",   issue: "High BP, Headache",              time: "10:31 AM", waitingTime: "01:32", avatar: "/images/patients/03.jpg" },
    { id: 4, name: "Sumiya Rahman",    age: 30, gender: "Female", issue: "Shortness of breath",            time: "10:35 AM", waitingTime: "00:58", avatar: "/images/patients/04.jpg" },
    { id: 5, name: "Rafiq Hasan",      age: 50, gender: "Male",   issue: "ECG review",                     time: "10:35 AM", waitingTime: "00:32", avatar: "/images/patients/05.jpg" },
  ],
  appointments: [
    { time: "11:00 AM", name: "Jannatul Ferdous", type: "Follow-up",         status: "Confirmed" },
    { time: "11:30 AM", name: "Sohel Mahmud",     type: "Regular Checkup",   status: "Confirmed" },
    { time: "12:00 PM", name: "Nusrat Jahan",     type: "ECG Report Review", status: "Confirmed" },
    { time: "12:30 PM", name: "Kamal Hossain",    type: "Consultation",      status: "Upcoming"  },
    { time: "01:00 PM", name: "Mst. Joya Akter",  type: "Follow-up",         status: "Upcoming"  },
  ],
  schedule: [
    { time: "09:00 AM", event: "Chamber Start",       status: "Completed" },
    { time: "09:30 AM", event: "Patient Consultation", status: "Completed" },
    { time: "10:00 AM", event: "Patient Consultation", status: "Completed" },
    { time: "11:00 AM", event: "Jannatul Ferdous",     status: "Confirmed" },
    { time: "11:30 AM", event: "Sohel Mahmud",         status: "Confirmed" },
    { time: "12:00 PM", event: "Nusrat Jahan",         status: "Confirmed" },
    { time: "01:00 PM", event: "Lunch Break",          status: "Break"     },
    { time: "02:00 PM", event: "Next Appointments",    status: "Upcoming"  },
  ],
  recentConsultations: [
    { name: "Khalid Hasan",  age: 45, gender: "Male",   condition: "Hypertension",    date: "10 May 2025", time: "09:15 AM", fee: "500", status: "Completed" },
    { name: "Maliha Islam",  age: 29, gender: "Female", condition: "Anxiety Disorder", date: "10 May 2025", time: "08:30 AM", fee: "500", status: "Completed" },
    { name: "Rashidul Alam", age: 52, gender: "Male",   condition: "ECG Review",       date: "09 May 2025", time: "07:45 PM", fee: "600", status: "Completed" },
  ],
  pendingPrescriptions: [
    { name: "Masud Rana",        time: "10:24 AM", type: "New Prescription", status: "Pending" },
    { name: "Farhana Akter",     time: "10:28 AM", type: "New Prescription", status: "Pending" },
    { name: "Abdullah Al Mamun", time: "10:31 AM", type: "New Prescription", status: "Pending" },
  ],
  earningsData: {
    total:  "42,850",
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

    return (
    <div className="dashboard-content">

          {/* Stats */}
          <div className="stats-grid">
            <StatCard icon="patients"     title="New Patients"         count={dashboardData.stats.newPatients.count}   label={dashboardData.stats.newPatients.label}   variant="primary"    linkText="View Queue"    />
            <StatCard icon="calendar"     title="Today's Appointments" count={dashboardData.stats.appointments.count}  label={dashboardData.stats.appointments.label}  variant="secondary"  linkText="View All"      />
            <StatCard icon="consultation" title="Consultations"        count={dashboardData.stats.consultations.count} label={dashboardData.stats.consultations.label} variant="tertiary"   linkText="View All"      />
            <StatCard icon="prescription" title="Prescriptions"        count={dashboardData.stats.prescriptions.count} label={dashboardData.stats.prescriptions.label} variant="quaternary" linkText="View All"      />
            <StatCard icon="earnings"     title="Today's Earnings"     count={`${dashboardData.stats.earnings.currency} ${dashboardData.stats.earnings.amount}`} label="" variant="quinary" linkText="View Earnings" />
          </div>

          {/* Middle 3-column grid */}
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

          {/* Bottom 3-column grid */}
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

        </div>
  );
}


