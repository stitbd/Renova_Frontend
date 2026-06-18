// app/patient/layout.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useRoutePrefetch from "@/components/common/useRoutePrefetch";
import "@/styles/pages/patient-dashboard.css";
import CallProvider from "@/providers/CallProvider";
import FloatingCallWidget from "@/components/FloatingCallWidget";
import IncomingCallPopup from "@/components/IncomingCallPopup";
import PermissionErrorModal from "@/components/PermissionErrorModal";

const messageCount = 3;

const navItems = [
  {
    href: "/patient-portal/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    type: "section",
    label: "MY HEALTH",
  },
  {
    href: "/patient-portal/reports",
    label: "Reports",
    icon: FileText,
  },
  {
    href: "/patient-portal/prescriptions",
    label: "Prescriptions",
    icon: Pill,
  },
  {
    href: "/patient-portal/consultations",
    label: "Consultation History",
    icon: Clock,
  },
  {
    href: "/patient-portal/appointments",
    label: "Appointments",
    icon: Calendar,
  },
  {
    href: "/patient-portal/health-summary",
    label: "Health Summary",
    icon: Activity,
  },
  {
    href: "/patient-portal/messages",
    label: "Messages",
    icon: MessageSquare,
    badge: messageCount,
  },
  {
    type: "section",
    label: "ACCOUNT",
  },
  {
    href: "/patient-portal/profile",
    label: "My Profile",
    icon: User,
  },
  {
    href: "/patient-portal/change-password",
    label: "Change Password",
    icon: Lock,
  },
  {
    type: "section",
    label: "SUPPORT",
  },
  {
    href: "/patient-portal/help",
    label: "Help & Support",
    icon: HelpCircle,
  },
  {
    href: "/patient-portal/logout",
    label: "Logout",
    icon: LogOut,
  },
];

function isActivePath(pathname, href) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function PatientPortalLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const prefetchRoute = useRoutePrefetch(navItems.map((item) => item.href));

  return (
    <CallProvider>
      <div className="patient-dashboard-container">
        {/* Mobile overlay */}
        <div
          className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        <aside className={`patient-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="sidebar-logo">
            <img src="/images/logo2.png" alt="Renova Life Care" />
          </div>

          <nav className="sidebar-nav">
            {navItems.map((item, index) => {
              // Render section header
              if (item.type === "section") {
                return (
                  <div key={index} className="nav-section-title">
                    {item.label}
                  </div>
                );
              }

              // Render nav item
              const active = isActivePath(pathname, item.href);
              const IconComponent = item.icon;
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
                  <span className="nav-label">{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="patient-main-content">
          {/* Header */}
          <header className="patient-header">
            <div className="header-left">
              <button
                className="menu-toggle"
                onClick={() => setSidebarOpen((prev) => !prev)}
                aria-label="Toggle menu"
              >
                <Menu size={22} />
              </button>
              <div className="header-greeting">
                <h1 className="greeting-title" id="header-title">Hello, Rakib 👋</h1>
                <p className="greeting-subtitle" id="header-sub">Here's your health overview today.</p>
              </div>
            </div>

            <div className="header-right">
              <button className="notification-btn" aria-label="Notifications">
                <Bell size={20} />
                <span className="notification-badge">3</span>
              </button>

              <Link
                href="/patient-portal/messages"
                className="header-icon-btn"
                aria-label="Messages"
                onMouseEnter={() => prefetchRoute("/patient-portal/messages")}
                onFocus={() => prefetchRoute("/patient-portal/messages")}
              >
                <MessageSquare size={20} />
                <span
                  className="notification-badge"
                  style={{ background: "#014fa1" }}
                >
                  {messageCount}
                </span>
              </Link>

              <div className="user-profile">
                <div className="user-avatar">
                  <User size={18} />
                </div>
                <div className="user-info">
                  <span className="user-name">Rakib Hasan</span>
                  <span className="user-id">PT-2025-000123</span>
                </div>
                <ChevronDown size={14} className="dropdown-arrow" />
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="patient-dashboard-content">
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
        <PermissionErrorModal />
      </div>
    </CallProvider>
  );
}