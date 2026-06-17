// app/doctor-portal/layout.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useRoutePrefetch from "@/components/common/useRoutePrefetch";
import "@/styles/pages/doctor-dashboard.css";
import FloatingCallWidget from "@/components/FloatingCallWidget";
import CallProvider from "@/providers/CallProvider";
import IncomingCallPopup from "@/components/IncomingCallPopup";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  User,
  ClipboardList,
  DollarSign,
  MessageSquare,
  Settings,
  Phone,
  Bell,
  Menu,
  X,
  UserCircle,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const messageCount = 3;

const navItems = [
  {
    href: "/doctor-portal/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/doctor-portal/patient-queue",
    label: "Patient Queue",
    icon: Users,
    badge: 5,
  },
  {
    href: "/doctor-portal/appointments",
    label: "Appointments",
    icon: Calendar,
  },
  {
    href: "/doctor-portal/consultations",
    label: "Consultations",
    icon: ClipboardList,
  },
  {
    href: "/doctor-portal/patients",
    label: "Patients",
    icon: User,
  },
  {
    href: "/doctor-portal/prescriptions",
    label: "Prescriptions",
    icon: FileText,
  },
  {
    href: "/doctor-portal/earnings",
    label: "Earnings",
    icon: DollarSign,
  },
  {
    href: "/doctor-portal/messages",
    label: "Messages",
    icon: MessageSquare,
    badge: messageCount,
  },
  {
    href: "/doctor-portal/settings",
    label: "Settings",
    icon: Settings,
  },
];

function isActivePath(pathname, href) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function DoctorPortalDashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const prefetchRoute = useRoutePrefetch(navItems.map((item) => item.href));

  return (
    <CallProvider>
      <div className="doctor-dashboard-container">
        <div
          className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />

        <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <img src="/images/logo2.png" alt="Renova Life Care" />
            </div>
          </div>

          <div className="sidebar-profile">
            <div className="profile-avatar">
              <img
                src="/images/doctors/doctor-2.jpg"
                alt="Dr. Tasnim Farin"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div className="profile-info">
              <h3 className="profile-name">Dr. Tasnim Farin</h3>
              <p className="profile-specialty">Cardiologist</p>
              <span className="profile-status online">
                <span className="status-dot" />
                Online
              </span>
            </div>
          </div>

          <nav className="sidebar-nav">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  href={item.href}
                  key={item.href}
                  className={`nav-item${active ? " active" : ""}`}
                  onMouseEnter={() => prefetchRoute(item.href)}
                  onFocus={() => prefetchRoute(item.href)}
                  onTouchStart={() => prefetchRoute(item.href)}
                  onClick={() => setSidebarOpen(false)}
                >
                  <IconComponent className="nav-icon" size={18} />
                  <span>{item.label}</span>
                  {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
                </Link>
              );
            })}
          </nav>

          <div className="sidebar-footer">
            <button className="support-btn">
              <Phone size={26} />
              <div className="support-text">
                <span>Need Support?</span>
                <span>Contact Support</span>
              </div>
            </button>
          </div>
        </aside>

        <main className="dashboard-main">
          <header className="dashboard-header">
            <div className="header-left">
              <button
                className="menu-toggle"
                onClick={() => setSidebarOpen((prev) => !prev)}
                aria-label="Toggle sidebar"
              >
                <Menu size={22} />
              </button>
              <div className="header-greeting">
                <h1 className="greeting-title">Good Morning, Dr. Tasnim Farin 👋</h1>
                <p className="greeting-subtitle">Here's what's happening with your practice today.</p>
              </div>
            </div>

            <div className="header-right">
              <div className="status-toggle">
                <span className="status-indicator online" />
                <span>Online</span>
              </div>

              <button className="header-icon-btn" aria-label="Notifications">
                <Bell size={20} />
                <span className="notification-badge">5</span>
              </button>

              <Link
                href="/doctor-portal/messages"
                className="header-icon-btn"
                aria-label="Messages"
                onMouseEnter={() => prefetchRoute("/doctor-portal/messages")}
                onFocus={() => prefetchRoute("/doctor-portal/messages")}
              >
                <MessageSquare size={20} />
                <span
                  className="notification-badge"
                  style={{ background: "#014fa1" }}
                >
                  {messageCount}
                </span>
              </Link>

              <div className="header-profile">
                <div className="profile-avatar-small">
                  <UserCircle size={18} />
                </div>
              </div>
            </div>
          </header>

          <div className="doctor-dashboard-content">
            {children}
            <footer className="admin-footer">
              <span>© 2026 Renova Life Care Ltd. All rights reserved.</span>
              <span>Developed by <span className="highlight">STITBD</span></span>
              <span>Version 1.0.0</span>
            </footer>
          </div>
        </main>

        <FloatingCallWidget />
        <IncomingCallPopup />
      </div>
    </CallProvider>
  );
}