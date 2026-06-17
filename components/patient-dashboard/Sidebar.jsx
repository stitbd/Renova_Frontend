// components/patient-dashboard/Sidebar.jsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Pill,
  Clock,
  Calendar,
  Activity,
  User,
  Lock,
  HelpCircle,
  LogOut,
  Phone
} from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  return (
    <aside className={`patient-sidebar${isOpen ? " open" : ""}`}>
      {/* Logo — image only */}
      <div className="sidebar-logo">
        <img
          src="/images/logo2.png"
          alt="Renova Life Care"
          onError={(e) => { e.target.style.display = "none"; }}
        />
      </div>

      <nav className="sidebar-nav">
        {/* Dashboard */}
        <Link
          href="/patient/dashboard"
          className={`nav-item ${pathname === "/patient/dashboard" ? "active" : ""}`}
        >
          <span className="nav-icon">
            <LayoutDashboard size={18} />
          </span>
          <span className="nav-label">Dashboard</span>
        </Link>

        {/* MY HEALTH */}
        <div className="nav-section">
          <span className="nav-section-title">MY HEALTH</span>

          <Link href="/patient/reports" className={`nav-item ${pathname === "/patient/reports" ? "active" : ""}`}>
            <span className="nav-icon">
              <FileText size={18} />
            </span>
            <span className="nav-label">Reports</span>
          </Link>

          <Link href="/patient/prescriptions" className={`nav-item ${pathname === "/patient/prescriptions" ? "active" : ""}`}>
            <span className="nav-icon">
              <Pill size={18} />
            </span>
            <span className="nav-label">Prescriptions</span>
          </Link>

          <Link href="/patient/consultations" className={`nav-item ${pathname === "/patient/consultations" ? "active" : ""}`}>
            <span className="nav-icon">
              <Clock size={18} />
            </span>
            <span className="nav-label">Consultation History</span>
          </Link>

          <Link href="/patient/appointments" className={`nav-item ${pathname === "/patient/appointments" ? "active" : ""}`}>
            <span className="nav-icon">
              <Calendar size={18} />
            </span>
            <span className="nav-label">Appointments</span>
          </Link>

          <Link href="/patient/health-summary" className={`nav-item ${pathname === "/patient/health-summary" ? "active" : ""}`}>
            <span className="nav-icon">
              <Activity size={18} />
            </span>
            <span className="nav-label">Health Summary</span>
          </Link>
        </div>

        {/* ACCOUNT */}
        <div className="nav-section">
          <span className="nav-section-title">ACCOUNT</span>

          <Link href="/patient/profile" className={`nav-item ${pathname === "/patient/profile" ? "active" : ""}`}>
            <span className="nav-icon">
              <User size={18} />
            </span>
            <span className="nav-label">My Profile</span>
          </Link>

          <Link href="/patient/change-password" className={`nav-item ${pathname === "/patient/change-password" ? "active" : ""}`}>
            <span className="nav-icon">
              <Lock size={18} />
            </span>
            <span className="nav-label">Change Password</span>
          </Link>
        </div>

        {/* SUPPORT */}
        <div className="nav-section">
          <span className="nav-section-title">SUPPORT</span>

          <Link href="/patient/support" className={`nav-item ${pathname === "/patient/support" ? "active" : ""}`}>
            <span className="nav-icon">
              <HelpCircle size={18} />
            </span>
            <span className="nav-label">Help &amp; Support</span>
          </Link>

          <Link href="/logout" className="nav-item">
            <span className="nav-icon">
              <LogOut size={18} />
            </span>
            <span className="nav-label">Logout</span>
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="support-button">
          <Phone size={20} />
          <div className="support-text">
            <span>Need Help?</span>
            <span>Contact Support</span>
          </div>
        </button>
      </div>
    </aside>
  );
}