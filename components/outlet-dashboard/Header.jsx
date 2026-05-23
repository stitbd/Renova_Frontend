// components/outlet/Header.jsx
"use client";

import { motion } from "framer-motion";

export default function Header({ onMenuToggle }) {
  const outlet = {
    name: "Renova Dhanmondi Outlet",
    outletId: "OUT-1001",
    subdomain: "dhanmondi.renova.life",
    verified: true,
  };

  const user = {
    name: "Aminul Hasan",
    role: "Outlet Manager",
    avatar: "/images/doctors/doctor-2.jpg",
  };

  return (
    <motion.header
      className="outlet-header"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-left">
        <motion.button
          className="menu-toggle"
          onClick={onMenuToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </motion.button>

        <div className="outlet-info">
          <div className="outlet-name-row">
            <span>Welcome back,</span>
            <h1 className="outlet-name">
              {outlet.name}
              {outlet.verified && (
                <motion.svg
                  className="verified-badge"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="#16a34a" />
                  <polyline points="22 4 12 14.01 9 11.01" stroke="#16a34a" />
                </motion.svg>
              )}
            </h1>
          </div>
          <div className="outlet-meta">
            <span>Outlet ID: {outlet.outletId}</span>
            <span className="divider">|</span>
            <span>Subdomain:</span>
            <a href={`https://${outlet.subdomain}`} className="subdomain-link" target="_blank" rel="noreferrer">
              {outlet.subdomain}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="header-right">
        <motion.div
          className="date-display"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>Thursday, 15 May 2025</span>
        </motion.div>

        <motion.button
          className="notification-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="notification-badge">8</span>
        </motion.button>

        <motion.div
          className="user-profile"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="user-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            )}
          </div>
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-role">{user.role}</span>
          </div>
          <svg className="dropdown-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </div>
    </motion.header>
  );
}