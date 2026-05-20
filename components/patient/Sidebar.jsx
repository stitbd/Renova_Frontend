// components/patient/Sidebar.jsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = {
    main: [
      { icon: "dashboard", label: "Dashboard", href: "/patient/dashboard" },
    ],
    myHealth: [
      { icon: "report", label: "Reports", href: "/patient/reports" },
      { icon: "prescription", label: "Prescriptions", href: "/patient/prescriptions" },
      { icon: "history", label: "Consultation History", href: "/patient/consultations" },
      { icon: "calendar", label: "Appointments", href: "/patient/appointments" },
      { icon: "health", label: "Health Summary", href: "/patient/health-summary" },
    ],
    account: [
      { icon: "profile", label: "My Profile", href: "/patient/profile" },
      { icon: "lock", label: "Change Password", href: "/patient/change-password" },
    ],
    support: [
      { icon: "help", label: "Help & Support", href: "/patient/support" },
      { icon: "logout", label: "Logout", href: "/logout" },
    ],
  };

  const renderIcon = (iconName) => {
    const icons = {
      dashboard: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
      report: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
      prescription: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
        </svg>
      ),
      history: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      calendar: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
      health: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      profile: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      lock: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      help: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
      logout: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      ),
    };
    return icons[iconName] || null;
  };

  return (
    <aside className="patient-sidebar">
      <div className="sidebar-logo">
        <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="40" fill="url(#logoGradient)" />
          <path d="M40 20V60M20 40H60" stroke="white" strokeWidth="4" strokeLinecap="round" />
          <defs>
            <linearGradient id="logoGradient" x1="0" y1="0" x2="80" y2="80">
              <stop stopColor="#428a26" />
              <stop offset="1" stopColor="#4CAF50" />
            </linearGradient>
          </defs>
        </svg>
        <div className="logo-text">
          <span className="logo-name">Renova</span>
          <span className="logo-tagline">LIFE CARE LTD</span>
          <span className="logo-slogan">Caring Today, Healthy Tomorrow</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <Link href={menuItems.main[0].href} className={`nav-item ${pathname === menuItems.main[0].href ? 'active' : ''}`}>
          <span className="nav-icon">{renderIcon(menuItems.main[0].icon)}</span>
          <span className="nav-label">{menuItems.main[0].label}</span>
        </Link>

        <div className="nav-section">
          <span className="nav-section-title">MY HEALTH</span>
          {menuItems.myHealth.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`nav-item ${pathname === item.href ? 'active' : ''}`}
            >
              <span className="nav-icon">{renderIcon(item.icon)}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="nav-section">
          <span className="nav-section-title">ACCOUNT</span>
          {menuItems.account.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`nav-item ${pathname === item.href ? 'active' : ''}`}
            >
              <span className="nav-icon">{renderIcon(item.icon)}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="nav-section">
          <span className="nav-section-title">SUPPORT</span>
          {menuItems.support.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`nav-item ${pathname === item.href ? 'active' : ''}`}
            >
              <span className="nav-icon">{renderIcon(item.icon)}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="support-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <div className="support-text">
            <span>Need Help?</span>
            <span>Contact Support</span>
          </div>
        </button>
      </div>
    </aside>
  );
}