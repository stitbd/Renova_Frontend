// app/supar-admin-panel/layout.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useRoutePrefetch from "@/components/common/useRoutePrefetch";
import "@/styles/pages/super-admin-dashboard.css";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  UserCog,
  Building2,
  PlusCircle,
  Settings,
  UserCheck,
  Award,
  DollarSign,
  HandCoins,
  FileText,
  BarChart3,
  LineChart,
  TrendingUp,
  Shield,
  FileCheck,
  Globe,
  Receipt,
  Bell,
  ToggleLeft,
  Wrench,
  LogOut,
  Menu,
  Bell as BellIcon,
  User,
  ChevronDown,
} from "lucide-react";

const navItems = [
  {
    href: "/supar-admin-panel/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    type: "section",
    label: "USER MANAGEMENT",
  },
  {
    href: "/supar-admin-panel/patients",
    label: "Patients",
    icon: Users,
  },
  {
    href: "/supar-admin-panel/doctors",
    label: "Doctors",
    icon: Stethoscope,
  },
  {
    href: "/supar-admin-panel/staff",
    label: "Outlet Staff",
    icon: UserCog,
  },
  {
    type: "section",
    label: "OUTLET MANAGEMENT",
  },
  {
    href: "/supar-admin-panel/outlets",
    label: "All Outlets",
    icon: Building2,
  },
  {
    href: "/supar-admin-panel/outlets/new-outlet",
    label: "Create Outlet",
    icon: PlusCircle,
  },
  {
    type: "section",
    label: "DOCTOR MANAGEMENT",
  },
  {
    href: "/supar-admin-panel/doctor-approval",
    label: "Doctor Approval",
    icon: UserCheck,
  },
  {
    href: "/supar-admin-panel/specializations",
    label: "Specialization",
    icon: Award,
  },
  {
    type: "section",
    label: "FINANCE",
  },
  {
    href: "/supar-admin-panel/finance/expenses",
    label: "Expenses",
    icon: DollarSign,
  },
  {
    href: "/supar-admin-panel/finance/revenue",
    label: "Revenue",
    icon: DollarSign,
  },
  {
    href: "/supar-admin-panel/finance/commissions",
    label: "Commissions",
    icon: HandCoins,
  },
  {
    href: "/supar-admin-panel/finance/settlements",
    label: "Settlements",
    icon: FileText,
  },
  {
    type: "section",
    label: "ANALYTICS",
  },
  {
    href: "/supar-admin-panel/analytics/outlets",
    label: "Outlet Performance",
    icon: BarChart3,
  },
  {
    href: "/supar-admin-panel/analytics/doctors",
    label: "Doctor Performance",
    icon: LineChart,
  },
  {
    href: "/supar-admin-panel/analytics/patients",
    label: "Patient Trends",
    icon: TrendingUp,
  },
  {
    href: "/supar-admin-panel/analytics/website-analytics",
    label: "Website Analytics",
    icon: Globe,
  },
  // {
  //   type: "section",
  //   label: "ACCESS CONTROL",
  // },
  // {
  //   href: "/supar-admin-panel/roles",
  //   label: "Roles & Permissions",
  //   icon: Shield,
  // },
  // {
  //   href: "/supar-admin-panel/audit-logs",
  //   label: "Audit Logs",
  //   icon: FileCheck,
  // },
  {
    type: "section",
    label: "WEBSITE CONTENT",
  },
  {
    href: "/supar-admin-panel/website-content",
    label: "Website Content",
    icon: Globe,
  },
  // {
  //   type: "section",
  //   label: "SYSTEM SETTINGS",
  // },
  // {
  //   href: "/supar-admin-panel/settings/pricing",
  //   label: "Pricing Rules",
  //   icon: Receipt,
  // },
  // {
  //   href: "/supar-admin-panel/settings/notifications",
  //   label: "Notification Templates",
  //   icon: Bell,
  // },
  // {
  //   href: "/supar-admin-panel/settings/features",
  //   label: "Feature Toggles",
  //   icon: ToggleLeft,
  // },
  // {
  //   href: "/supar-admin-panel/settings/config",
  //   label: "System Configuration",
  //   icon: Wrench,
  // },
];

function isActivePath(pathname, href) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SuperAdminLayout({ children }) {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    setDropdownOpen(false);
    dispatch(logout());
    window.location.href = "/";
  }
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const prefetchRoute = useRoutePrefetch(navItems.map((item) => item.href).filter(Boolean));

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
          <img src="/images/logo2.png" alt="Renova Life Care" loading="eager" />
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
              <Menu size={22} />
            </button>
            <div className="header-greeting">
              <h1 className="greeting-title">Welcome to Admin Panel 👋</h1>
              <p className="greeting-subtitle">Manage your healthcare platform</p>
            </div>
          </div>

          <div className="header-right">
            <div className="status-toggle">
              <span className="status-indicator online" />
              <span>Online</span>
            </div>
            <button className="notification-btn" aria-label="Notifications">
              <BellIcon size={20} />
              <span className="notification-badge">3</span>
            </button>

            <div
              className="user-profile"
              ref={dropdownRef}
              style={{ position: "relative" }}
            >
              <div
                className="user-profile-trigger"
                onClick={() => setDropdownOpen((prev) => !prev)}
                style={{ display: "flex", gap: 10 }}
              >
                <div className="user-avatar">
                  <img
                    src="/images/users/01.jpg"
                    alt="Super Admin"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextSibling.style.display = "flex";
                    }}
                  />
                  <User size={18} style={{ display: "none" }} />
                </div>
                <div className="user-info">
                  <span className="user-name">Super Admin</span>
                  <span className="user-role">System Administrator</span>
                </div>
                <ChevronDown
                  size={14}
                  className="dropdown-arrow"
                  style={{
                    transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                    stroke: "#94a3b8",
                  }}
                />
              </div>

              {dropdownOpen && (
                <div className="user-dropdown">
                  <div className="user-dropdown-header">
                    <div className="user-avatar" style={{ width: 42, height: 42 }}>
                      <img
                        src="/images/users/01.jpg"
                        alt="Super Admin"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.nextSibling.style.display = "flex";
                        }}
                      />
                      <User size={20} style={{ display: "none" }} />
                    </div>
                    <div>
                      <p className="user-dropdown-name">Super Admin</p>
                      <p className="user-dropdown-id">SA-2025-000001</p>
                    </div>
                  </div>
                  <div className="user-dropdown-divider" />
                  <button className="user-dropdown-item" onClick={handleLogout}>
                    <LogOut size={15} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="admin-dashboard-content">
          {children}
          <footer className="admin-footer">
            <span>© 2026 Renova Life Care Ltd. All rights reserved.</span>
            <span>Developed by <span className="highlight">STITBD</span></span>
            <span>Version 1.0.0</span>
          </footer>
        </div>
      </main>
    </div>
  );
}