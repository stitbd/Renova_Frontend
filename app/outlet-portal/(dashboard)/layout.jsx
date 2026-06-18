// app/outlet-portal/layout.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useRoutePrefetch from "@/components/common/useRoutePrefetch";
import "@/styles/pages/outlet-dashboard.css";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Stethoscope,
  Monitor,
  ShoppingCart,
  Package,
  BarChart3,
  DollarSign,
  TrendingUp,
  Users2,
  Settings,
  Menu,
  Bell,
  User,
  Phone,
  ChevronDown,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/outlet-portal/dashboard", label: "Dashboard", icon: LayoutDashboard, badge: null },
  { href: "/outlet-portal/patients", label: "Patients", icon: Users, badge: null },
  { href: "/outlet-portal/staff", label: "Staff", icon: Users, badge: null },
  { href: "/outlet-portal/appointments", label: "Appointments", icon: Calendar, badge: 12 },
  { href: "/outlet-portal/consultations", label: "Consultations", icon: Stethoscope, badge: 8 },
  { href: "/outlet-portal/devices", label: "Devices & Reports", icon: Monitor, badge: null },
  { href: "/outlet-portal/pharmacy", label: "Pharmacy / POS", icon: ShoppingCart, badge: null },
  { href: "/outlet-portal/inventory", label: "Inventory", icon: Package, badge: null },
  { href: "/outlet-portal/sales", label: "Sales", icon: BarChart3, badge: null },
  { href: "/outlet-portal/earnings", label: "Earnings & Commission", icon: DollarSign, badge: null },
  { href: "/outlet-portal/performance", label: "Outlet Performance", icon: TrendingUp, badge: null },
  { href: "/outlet-portal/users", label: "Users & Roles", icon: Users2, badge: null },
  { href: "/outlet-portal/settings", label: "Settings", icon: Settings, badge: null },
];

function isActivePath(pathname, href) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function OutletLayout({ children }) {
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
  const prefetchRoute = useRoutePrefetch(navItems.map((item) => item.href));

  return (
    <div className="outlet-dashboard-container">
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`outlet-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <img
            src="/images/logo2.png"
            alt="Renova Life Care"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item${active ? " active" : ""}`}
                onMouseEnter={() => prefetchRoute(item.href)}
                onFocus={() => prefetchRoute(item.href)}
                onTouchStart={() => prefetchRoute(item.href)}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="nav-icon">
                  <IconComponent size={18} />
                </span>
                <span className="nav-label">{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="support-button">
            <Phone size={20} />
            <div className="support-text">
              <span>Need Support?</span>
              <span>Contact Support Center</span>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="outlet-main-content">
        {/* Header */}
        <header className="outlet-header">
          <div className="header-left">
            <button
              className="menu-toggle"
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              <Menu size={22} />
            </button>
            <div className="outlet-info">
              <div className="outlet-name-row">
                <h1 className="outlet-name">
                  Welcome back, <span className="outlet-highlight">Renova Dhanmondi Outlet</span>
                  <svg className="verified-badge" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </h1>
              </div>
              <div className="outlet-meta">
                <span>Outlet ID: #OUT-1001</span>
                <span className="divider">|</span>
                <span>Subdomain:&nbsp;
                  <a href="https://dhanmondi.renova.life" target="_blank" rel="noopener noreferrer" className="subdomain-link">
                    dhanmondi.renova.life
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </span>
              </div>
            </div>
          </div>

          <div className="header-right">
            <div className="status-toggle">
              <span className="status-indicator online" />
              <span>Online</span>
            </div>

            <button className="notification-btn" aria-label="Notifications">
              <Bell size={20} />
              <span className="notification-badge">5</span>
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
                    alt="Outlet Manager"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextSibling.style.display = "flex";
                    }}
                  />
                  <User size={18} style={{ display: "none" }} />
                </div>
                <div className="user-info">
                  <span className="user-name">Mr. Abdul Karim</span>
                  <span className="user-role">Outlet Manager</span>
                </div>
                <ChevronDown
                  size={14}
                  style={{
                    transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                    stroke: "#94a3b8",
                    flexShrink: 0,
                  }}
                />
              </div>

              {dropdownOpen && (
                <div className="user-dropdown">
                  <div className="user-dropdown-header">
                    <div className="user-avatar" style={{ width: 42, height: 42 }}>
                      <img
                        src="/images/users/01.jpg"
                        alt="Outlet Manager"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.nextSibling.style.display = "flex";
                        }}
                      />
                      <User size={20} style={{ display: "none" }} />
                    </div>
                    <div>
                      <p className="user-dropdown-name">Mr. Abdul Karim</p>
                      <p className="user-dropdown-id">OUT-2025-000001</p>
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
        <div className="outlet-dashboard-content">
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