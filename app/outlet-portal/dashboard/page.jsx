// app/outlet/dashboard/page.jsx
"use client";

import { useState } from "react";
import "@/styles/pages/outlet-dashboard.css";
import Sidebar from "@/components/outlet-dashboard/Sidebar";
import Header from "@/components/outlet-dashboard/Header";
import StatsGrid from "@/components/outlet-dashboard/StatsGrid";
import PatientRegistrations from "@/components/outlet-dashboard/PatientRegistrations";
import DeviceStatus from "@/components/outlet-dashboard/DeviceStatus";
import TodayAppointments from "@/components/outlet-dashboard/TodayAppointments";
import PharmacySales from "@/components/outlet-dashboard/PharmacySales";
import RecentActivities from "@/components/outlet-dashboard/RecentActivities";
import OutletPerformance from "@/components/outlet-dashboard/OutletPerformance";

// Mock data - Replace with actual API calls
const dashboardData = {
  outlet: {
    name: "Renova Dhanmondi Outlet",
    outletId: "OUT-1001",
    subdomain: "dhanmondi.renova.life",
    verified: true,
  },
  user: {
    name: "Dr. Tasnim Farin",
    role: "Outlet Manager",
    avatar: "/images/users/01.jpg",
  },
  stats: {
    patients:      { count: 32,       change: "+12%", trend: "up" },
    appointments:  { count: 18,       change: "+8%",  trend: "up" },
    consultations: { count: 14,       change: "+7%",  trend: "up" },
    sales:         { count: "28,650", currency: "৳",  change: "+15%", trend: "up" },
    earnings:      { count: "12,450", currency: "৳",  change: "+10%", trend: "up" },
  },
  patientRegistrations: {
    thisWeek: [18, 22, 25, 30, 32, 28, 20],
    lastWeek: [15, 19, 21, 26, 28, 24, 18],
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
  devices: [
    { name: "Full Body Check-up Machine", deviceId: "FBC-1001", status: "Online",  icon: "checkup"     },
    { name: "Skin Analyzer Machine",      deviceId: "SKN-1002", status: "Online",  icon: "skin"        },
    { name: "Blood Pressure Monitor",     deviceId: "BPM-1003", status: "Online",  icon: "bp"          },
    { name: "Digital Thermometer",        deviceId: "DTH-1004", status: "Offline", icon: "thermometer" },
  ],
  appointments: [
    { time: "09:30 AM", patient: "Sadia Afrin",      service: "General Check-up",   status: "Completed" },
    { time: "10:30 AM", patient: "Rashed Hasan",     service: "Skin Analysis",      status: "Completed" },
    { time: "11:30 AM", patient: "Mahmudul Islam",   service: "Full Body Check-up", status: "Ongoing"   },
    { time: "01:00 PM", patient: "Farzana Akter",    service: "Consultation",       status: "Upcoming"  },
    { time: "02:00 PM", patient: "Jannatul Ferdous", service: "Follow-up",          status: "Upcoming"  },
  ],
  pharmacySales: {
    totalSales: "86,540",
    orders: 146,
    avgOrderValue: "592",
    chartData: [12000, 16000, 13000, 18000, 26000, 20000, 18000],
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
  recentActivities: [
    { type: "patient",      title: "New patient registered",  description: "Rafiqul Islam (PT-2025-00125)", time: "10:24 AM" },
    { type: "report",       title: "Machine report uploaded", description: "Full Body Check-up",            time: "10:15 AM" },
    { type: "sale",         title: "Product sold",            description: "Organic Spirulina 500mg",       time: "09:50 AM" },
    { type: "consultation", title: "Consultation completed",  description: "Dr. Tasnim Farin",              time: "09:30 AM" },
    { type: "prescription", title: "Prescription added",      description: "By Dr. Tasnim Farin",           time: "09:25 AM" },
  ],
  outletPerformance: {
    totalPatients:     { count: "1,245",    change: "+18.5%" },
    totalConsultations:{ count: "876",      change: "+14.3%" },
    totalSales:        { count: "2,45,650", currency: "৳", change: "+16.8%" },
    totalEarnings:     { count: "78,450",   currency: "৳", change: "+20.6%" },
    salesByCategory: [
      { name: "Wellness",      value: 40, color: "#014fa1" },
      { name: "Supplements",   value: 30, color: "#428a26" },
      { name: "Personal Care", value: 20, color: "#f59e0b" },
      { name: "Others",        value: 10, color: "#8b5cf6" },
    ],
  },
};

export default function OutletDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="outlet-dashboard-container">
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main */}
      <div className="outlet-main-content">
        <Header
          outlet={dashboardData.outlet}
          user={dashboardData.user}
          onMenuToggle={() => setSidebarOpen((v) => !v)}
        />
        <div className="outlet-dashboard-content">
          <StatsGrid stats={dashboardData.stats} />

          <div className="dashboard-middle-grid">
            <PatientRegistrations data={dashboardData.patientRegistrations} />
            <DeviceStatus devices={dashboardData.devices} />
            <TodayAppointments appointments={dashboardData.appointments} />
          </div>

          <div className="dashboard-bottom-grid">
            <PharmacySales data={dashboardData.pharmacySales} />
            <RecentActivities activities={dashboardData.recentActivities} />
            <OutletPerformance data={dashboardData.outletPerformance} />
          </div>
        </div>
      </div>
    </div>
  );
}