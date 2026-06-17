"use client";

import { motion } from "framer-motion";
import { Menu, Search, Bell, User, ChevronDown } from "lucide-react";

export default function Header({ onMenuToggle }) {
  return (
    <motion.header
      className="admin-header"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="header-left">
        <motion.button
          className="menu-toggle"
          onClick={onMenuToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Menu size={22} />
        </motion.button>
        <div className="header-greeting">
          <h1 className="greeting-title">
            Welcome back, <span className="highlight">Super Admin</span> 👋
          </h1>
          <p className="greeting-subtitle">Here's what's happening with your system today.</p>
        </div>
      </div>
      <div className="header-right">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search patients, doctors, outlets..."
            className="search-input"
          />
          <Search size={16} className="search-icon" />
        </div>
        <motion.button
          className="notification-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Bell size={20} />
          <span className="notification-badge">12</span>
        </motion.button>
        <motion.div
          className="user-profile"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="user-avatar">
            <User size={17} />
          </div>
          <div className="user-info">
            <span className="user-name">Super Admin</span>
            <span className="user-role">Super Admin</span>
          </div>
          <ChevronDown size={15} className="dropdown-arrow" />
        </motion.div>
      </div>
    </motion.header>
  );
}