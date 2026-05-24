"use client";

import { motion } from "framer-motion"; // ✅ Added
import "@/styles/pages/super-admin-dashboard.css";
import StatsGrid from "@/components/supar-admin-dashboard/StatsGrid";
import RevenueOverview from "@/components/supar-admin-dashboard/RevenueOverview";
import ConsultationsOverview from "@/components/supar-admin-dashboard/ConsultationsOverview";
import QuickActions from "@/components/supar-admin-dashboard/QuickActions";
import RecentActivities from "@/components/supar-admin-dashboard/RecentActivities";
import OutletPerformance from "@/components/supar-admin-dashboard/OutletPerformance";
import SystemSummary from "@/components/supar-admin-dashboard/SystemSummary";

// Mock data - Replace with actual API calls
const dashboardData = {
  stats: {
    totalPatients:    { count: "125,430",   change: "+8.5%",  trend: "up" },
    totalDoctors:     { count: "2,456",     change: "+5.2%",  trend: "up" },
    activeOutlets:    { count: "356",       change: "+6.7%",  trend: "up" },
    todaysRevenue:    { count: "1,245,000", currency: "৳",   change: "+12.3%", trend: "up" },
    pendingApprovals: { count: "23",        change: null,     trend: null },
  },
  revenue: {
    total: "38,560,000",
    growth: "+12.8%",
    period: "This Month",
    chartData: [
      { date: "01 May", value: 1200000 },
      { date: "05 May", value: 2400000 },
      { date: "10 May", value: 1800000 },
      { date: "15 May", value: 3200000 },
      { date: "20 May", value: 2800000 },
      { date: "25 May", value: 3600000 },
      { date: "31 May", value: 4200000 },
    ],
  },
  consultations: {
    total: 18752,
    videoCall: { count: 9254,  percentage: 49.3 },
    audioCall: { count: 6128,  percentage: 32.6 },
    chatSMS:   { count: 3370,  percentage: 18.0 },
  },
  quickActions: [
    { label: "Add New Doctor",        icon: "plus",     action: "/supar-admin-panel/doctors/add"         },
    { label: "Create New Outlet",     icon: "plus",     action: "/supar-admin-panel/outlets/create"      },
    { label: "Approve Doctors",       icon: "check",    action: "/supar-admin-panel/doctors/approvals", badge: 8 },
    { label: "View Reports",          icon: "chart",    action: "/supar-admin-panel/reports"             },
    { label: "System Settings",       icon: "settings", action: "/supar-admin-panel/settings"            },
    { label: "Notification Templates",icon: "bell",     action: "/supar-admin-panel/notifications"       },
  ],
  recentActivities: [
    { type: "outlet",  title: 'New outlet "Renova Dhanmondi" has been created',        user: "Super Admin",       time: "10 mins ago"  },
    { type: "doctor",  title: "Doctor Dr. Hasan Mahmud has been approved",             user: "Admin User",        time: "25 mins ago"  },
    { type: "payment", title: "Payment of ৳ 45,000 has been sent to Dr. Sarah Khan",  user: "System",            time: "1 hour ago"   },
    { type: "patient", title: "New patient registration: 125 patients",                user: "Outlet: Renova Mirpur", time: "2 hours ago" },
    { type: "report",  title: "Monthly revenue report generated",                      user: "System",            time: "3 hours ago"  },
  ],
  outletPerformance: [
    { name: "Renova Dhanmondi",  patients: 2543, revenue: "2,450,000", growth: "+15.6%" },
    { name: "Renova Mirpur",     patients: 2187, revenue: "2,125,000", growth: "+12.4%" },
    { name: "Renova Chattogram", patients: 1932, revenue: "1,845,000", growth: "+10.7%" },
    { name: "Renova Sylhet",     patients: 1721, revenue: "1,612,000", growth: "+9.3%"  },
    { name: "Renova Khulna",     patients: 1480, revenue: "1,425,000", growth: "+8.8%"  },
  ],
  systemSummary: {
    systemStatus: "Operational",
    database:     "Healthy",
    storageUsed:  62,
    activeUsers:  245,
    backupStatus: "Success",
  },
};

// ✅ Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function AdminDashboardPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <StatsGrid stats={dashboardData.stats} />
      </motion.div>

      <motion.div 
        className="dashboard-charts-grid"
        variants={itemVariants}
      >
        <motion.div variants={itemVariants}>
          <RevenueOverview data={dashboardData.revenue} />
        </motion.div>
        <div className="charts-right-column">
          <div className="charts-right-inner">
            <motion.div variants={itemVariants}>
              <ConsultationsOverview data={dashboardData.consultations} />
            </motion.div>
            <motion.div variants={itemVariants}>
              <QuickActions actions={dashboardData.quickActions} />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="dashboard-bottom-grid"
        variants={itemVariants}
      >
        <motion.div variants={itemVariants}>
          <RecentActivities activities={dashboardData.recentActivities} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <OutletPerformance data={dashboardData.outletPerformance} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <SystemSummary data={dashboardData.systemSummary} />
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer 
        className="admin-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      >
        <span>© 2026 Renova Life Care Ltd. All rights reserved.</span>
        <span>Developed by <span className="highlight">STITBD</span></span>
        <span>Version 1.0.0</span>
      </motion.footer>
    </motion.div>
  );
}