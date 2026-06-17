// components/patient-dashboard/Header.jsx
import { Menu, Bell, User } from "lucide-react";

export default function Header({ onMenuToggle }) {
  return (
    <header className="patient-header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onMenuToggle} aria-label="Toggle sidebar">
          <Menu size={22} />
        </button>
        <h1 className="page-title">Patient Dashboard</h1>
      </div>

      <div className="header-right">
        <button className="notification-btn" aria-label="Notifications">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>

        <div className="user-profile">
          <div className="user-avatar">
            <User size={18} />
          </div>
          <div className="user-info">
            <span className="user-name">Md. Rakib Hasan</span>
            <span className="user-id">PT-2025-000123</span>
          </div>
        </div>
      </div>
    </header>
  );
}