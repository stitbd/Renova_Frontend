// app/supar-admin-panel/layout.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/styles/pages/super-admin-dashboard.css";

const renderIcon = (iconName) => {
  const icons = {
    dashboard: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    patients: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    doctors: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    staff: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    outlets: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    create: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    settings: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    approval: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    specialization: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    commission: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    revenue: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    commissions: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    settlements: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    "outlet-analytics": (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    "doctor-analytics": (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    trends: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    roles: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    audit: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    pricing: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    notifications: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    toggles: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    website: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    config: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    logout: (
      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    ),
  };
  return icons[iconName] || null;
};

const navItems = [
  {
    href: "/supar-admin-panel/dashboard",
    label: "Dashboard",
    icon: "dashboard",
  },
  {
    type: "section",
    label: "USER MANAGEMENT",
  },
  {
    href: "/supar-admin-panel/patients",
    label: "Patients",
    icon: "patients",
  },
  {
    href: "/supar-admin-panel/doctors",
    label: "Doctors",
    icon: "doctors",
  },
  {
    href: "/supar-admin-panel/staff",
    label: "Outlet Staff",
    icon: "staff",
  },
  {
    type: "section",
    label: "OUTLET MANAGEMENT",
  },
  {
    href: "/supar-admin-panel/outlets",
    label: "All Outlets",
    icon: "outlets",
  },
  {
    href: "/supar-admin-panel/outlets/create",
    label: "Create Outlet",
    icon: "create",
  },
  {
    href: "/supar-admin-panel/outlets/settings",
    label: "Outlet Settings",
    icon: "settings",
  },
  {
    type: "section",
    label: "DOCTOR MANAGEMENT",
  },
  {
    href: "/supar-admin-panel/doctors/approvals",
    label: "Doctor Approval",
    icon: "approval",
  },
  {
    href: "/supar-admin-panel/specializations",
    label: "Specialization",
    icon: "specialization",
  },
  {
    href: "/supar-admin-panel/commissions",
    label: "Commission Setup",
    icon: "commission",
  },
  {
    type: "section",
    label: "FINANCE",
  },
  {
    href: "/supar-admin-panel/revenue",
    label: "Revenue",
    icon: "revenue",
  },
  {
    href: "/supar-admin-panel/commissions",
    label: "Commissions",
    icon: "commissions",
  },
  {
    href: "/supar-admin-panel/settlements",
    label: "Settlements",
    icon: "settlements",
  },
  {
    type: "section",
    label: "ANALYTICS",
  },
  {
    href: "/supar-admin-panel/analytics/outlets",
    label: "Outlet Performance",
    icon: "outlet-analytics",
  },
  {
    href: "/supar-admin-panel/analytics/doctors",
    label: "Doctor Performance",
    icon: "doctor-analytics",
  },
  {
    href: "/supar-admin-panel/analytics/trends",
    label: "Patient Trends",
    icon: "trends",
  },
  {
    type: "section",
    label: "ACCESS CONTROL",
  },
  {
    href: "/supar-admin-panel/roles",
    label: "Roles & Permissions",
    icon: "roles",
  },
  {
    href: "/supar-admin-panel/audit-logs",
    label: "Audit Logs",
    icon: "audit",
  },
  {
    type: "section",
    label: "WEBSITE CONTENT",
  },
  {
    href: "/supar-admin-panel/website-content",
    label: "Website Content",
    icon: "website",
  },
  {
    type: "section",
    label: "SYSTEM SETTINGS",
  },
  {
    href: "/supar-admin-panel/settings/pricing",
    label: "Pricing Rules",
    icon: "pricing",
  },
  {
    href: "/supar-admin-panel/settings/notifications",
    label: "Notification Templates",
    icon: "notifications",
  },
  {
    href: "/supar-admin-panel/settings/features",
    label: "Feature Toggles",
    icon: "toggles",
  },
  {
    href: "/supar-admin-panel/settings/config",
    label: "System Configuration",
    icon: "config",
  },
  {
    href: "/supar-admin-panel/logout",
    label: "Logout",
    icon: "logout",
  },
];

function isActivePath(pathname, href) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SuperAdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="admin-dashboard-container">
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
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
            return (
              <Link
                href={item.href}
                key={item.href}
                className={`nav-item${active ? " active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                {renderIcon(item.icon)}
                <span className="nav-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        {/* Header */}
        <header className="admin-header">
          <div className="header-left">
            <button
              className="menu-toggle"
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div className="header-greeting">
              <h1 className="greeting-title">Welcome to Admin Panel 👋</h1>
              <p className="greeting-subtitle">Manage your healthcare platform</p>
            </div>
          </div>

          <div className="header-right">
            <button className="notification-btn" aria-label="Notifications">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="notification-badge">3</span>
            </button>

            <div className="user-profile">
              <div className="user-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="user-info">
                <span className="user-name">Super Admin</span>
                <span className="user-role">System Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="admin-dashboard-content">{children}</div>
      </main>
    </div>
  );
}