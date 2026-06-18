// components/outlet/Header.jsx
"use client";

import { motion } from "framer-motion";
import { Menu, BadgeCheck, ExternalLink, Calendar, Bell, User, ChevronDown, Globe } from "lucide-react";

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
          <Menu size={22} />
        </motion.button>

        <div className="outlet-info">
          <div className="outlet-name-row">
            <span>Welcome back,</span>
            <h1 className="outlet-name">
              {outlet.name}
              {outlet.verified && (
                <motion.div
                  className="verified-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <BadgeCheck size={18} color="#16a34a" />
                </motion.div>
              )}
            </h1>
          </div>
          <div className="outlet-meta">
            <span>Outlet ID: {outlet.outletId}</span>
            <span className="divider">|</span>
            <span>Subdomain:</span>
            <a href={`https://${outlet.subdomain}`} className="subdomain-link" target="_blank" rel="noreferrer">
              {outlet.subdomain}
              <ExternalLink size={14} />
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
          <Calendar size={16} />
          <span>Thursday, 15 May 2025</span>
        </motion.div>

        <motion.button
          className="notification-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Bell size={20} />
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
              <User size={18} />
            )}
          </div>
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-role">{user.role}</span>
          </div>
          <ChevronDown size={14} className="dropdown-arrow" />
        </motion.div>
      </div>
    </motion.header>
  );
}