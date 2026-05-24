// app/supar-admin-dashboard/dashboard/page.jsx
"use client";

import { useState } from "react";
import "@/styles/pages/super-admin-dashboard.css";
import Sidebar from "@/components/supar-admin-dashboard/Sidebar";
import Header from "@/components/supar-admin-dashboard/Header";
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
    { label: "Add New Doctor",        icon: "plus",     action: "/admin/doctors/add"         },
    { label: "Create New Outlet",     icon: "plus",     action: "/admin/outlets/create"      },
    { label: "Approve Doctors",       icon: "check",    action: "/admin/doctors/approvals", badge: 8 },
    { label: "View Reports",          icon: "chart",    action: "/admin/reports"             },
    { label: "System Settings",       icon: "settings", action: "/admin/settings"            },
    { label: "Notification Templates",icon: "bell",     action: "/admin/notifications"       },
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

export default function AdminDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-dashboard-container">
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main */}
      <div className="admin-main-content">
        <Header onMenuToggle={() => setSidebarOpen((v) => !v)} />

        <div className="admin-dashboard-content">
          <StatsGrid stats={dashboardData.stats} />

          <div className="dashboard-charts-grid">
            <RevenueOverview data={dashboardData.revenue} />
            <div className="charts-right-column">
              <div className="charts-right-inner">
                <ConsultationsOverview data={dashboardData.consultations} />
                <QuickActions actions={dashboardData.quickActions} />
              </div>
            </div>
          </div>

          <div className="dashboard-bottom-grid">
            <RecentActivities activities={dashboardData.recentActivities} />
            <OutletPerformance data={dashboardData.outletPerformance} />
            <SystemSummary data={dashboardData.systemSummary} />
          </div>
        </div>

        {/* Footer */}
        <footer className="admin-footer">
          <span>© 2026 Renova Life Care Ltd. All rights reserved.</span>
          <span>Developed by <span className="highlight">STITBD</span></span>
          <span>Version 1.0.0</span>
        </footer>
      </div>
    </div>
  );
}