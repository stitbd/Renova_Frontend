// app/outlet-portal/dashboard/page.jsx
"use client";

import { motion } from "framer-motion";
import StatsGrid from "@/components/outlet-dashboard/StatsGrid";
import PatientRegistrations from "@/components/outlet-dashboard/PatientRegistrations";
import DeviceStatus from "@/components/outlet-dashboard/DeviceStatus";
import TodayAppointments from "@/components/outlet-dashboard/TodayAppointments";
import PharmacySales from "@/components/outlet-dashboard/PharmacySales";
import RecentActivities from "@/components/outlet-dashboard/RecentActivities";
import OutletPerformance from "@/components/outlet-dashboard/OutletPerformance";

// Mock data
const dashboardData = {
  stats: {
    patients: { count: "32", change: "+12%", currency: "" },
    appointments: { count: "18", change: "+8%", currency: "" },
    consultations: { count: "14", change: "+7%", currency: "" },
    sales: { count: "28,650", change: "+15%", currency: "৳" },
    earnings: { count: "12,450", change: "+10%", currency: "৳" },
  },
  patientRegistrations: {
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    thisWeek: [18, 22, 25, 30, 32, 28, 20],
    lastWeek: [15, 18, 20, 24, 28, 22, 16],
  },
  devices: [
    { name: "Full Body Check-up Machine", deviceId: "FBC-1001", status: "Online", icon: "checkup" },
    { name: "Skin Analyzer Machine", deviceId: "SKN-1002", status: "Online", icon: "skin" },
    { name: "Blood Pressure Monitor", deviceId: "BPM-1003", status: "Online", icon: "bp" },
    { name: "Digital Thermometer", deviceId: "DTH-1004", status: "Offline", icon: "thermometer" },
  ],
  appointments: [
    { time: "09:30 AM", patient: "Sadita Afrin", service: "General Check-up", status: "Completed" },
    { time: "10:30 AM", patient: "Rashed Hasan", service: "Skin Analysis", status: "Completed" },
    { time: "11:30 AM", patient: "Mahmudul Islam", service: "Full Body Check-up", status: "Ongoing" },
    { time: "01:00 PM", patient: "Farzana Akter", service: "Consultation", status: "Upcoming" },
    { time: "02:00 PM", patient: "Jannatul Ferdous", service: "Follow-up", status: "Upcoming" },
  ],
  pharmacySales: {
    totalSales: "86,540",
    orders: 146,
    avgOrderValue: "592",
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    chartData: [12000, 15000, 11000, 18000, 25000, 19000, 16000],
  },
  activities: [
    { type: "patient", title: "New patient registered", description: "Rafiqul Islam (PT-2025-00125)", time: "10:24 AM" },
    { type: "report", title: "Machine report uploaded", description: "Full Body Check-up", time: "10:15 AM" },
    { type: "sale", title: "Product sold", description: "Organic Spirulina 500mg", time: "09:50 AM" },
    { type: "consultation", title: "Consultation completed", description: "Dr. Ahsan Rahman", time: "09:30 AM" },
    { type: "prescription", title: "Prescription added", description: "By Dr. Ahsan Rahman", time: "09:25 AM" },
  ],
  performance: {
    totalPatients: { count: "1,245", change: "+18.5%" },
    totalConsultations: { count: "876", change: "+14.3%" },
    totalSales: { count: "2,45,650", change: "+16.8%", currency: "৳" },
    totalEarnings: { count: "78,450", change: "+20.6%", currency: "৳" },
    salesByCategory: [
      { name: "Wellness", value: 40, color: "#014fa1" },
      { name: "Supplements", value: 30, color: "#428a26" },
      { name: "Personal Care", value: 20, color: "#f59e0b" },
      { name: "Others", value: 10, color: "#7c3aed" },
    ],
  },
};

export default function OutletDashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Stats Grid */}
      <StatsGrid stats={dashboardData.stats} />

      {/* Middle Grid */}
      <div className="dashboard-middle-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <PatientRegistrations data={dashboardData.patientRegistrations} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DeviceStatus devices={dashboardData.devices} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <TodayAppointments appointments={dashboardData.appointments} />
        </motion.div>
      </div>

      {/* Bottom Grid */}
      <div className="dashboard-bottom-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <PharmacySales data={dashboardData.pharmacySales} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <RecentActivities activities={dashboardData.activities} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <OutletPerformance data={dashboardData.performance} />
        </motion.div>
      </div>
    </motion.div>
  );
}