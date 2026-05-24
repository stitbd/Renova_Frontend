"use client";

import { motion } from "framer-motion"; // ✅ Added

export default function SystemSummary({ data }) {
  const systemItems = [
    { icon: "status", label: "System Status", value: data.systemStatus, statusClass: data.systemStatus.toLowerCase() },
    { icon: "database", label: "Database", value: data.database, statusClass: data.database.toLowerCase() },
    { icon: "storage", label: "Storage Used", value: `${data.storageUsed}%`, isStorage: true },
    { icon: "users", label: "Active Users", value: data.activeUsers },
    { icon: "backup", label: "Backup Status", value: data.backupStatus, statusClass: data.backupStatus.toLowerCase() },
  ];

  const renderIcon = (iconName) => {
    const icons = {
      status: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      database: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
      storage: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      ),
      users: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      backup: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    };
    return icons[iconName] || null;
  };

  return (
    <motion.div 
      className="system-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h3 className="card-title">System Summary</h3>
      <div className="system-list">
        {systemItems.map((item, index) => (
          <motion.div 
            key={index} 
            className="system-item"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.07, duration: 0.3 }}
            whileHover={{ backgroundColor: "#f1f5f9", transition: { duration: 0.15 } }}
          >
            <motion.div 
              className="system-icon"
              whileHover={{ scale: 1.1, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {renderIcon(item.icon)}
            </motion.div>
            <span className="system-label">{item.label}</span>
            
            {item.isStorage ? (
              <div className="storage-bar-wrapper">
                <motion.div 
                  className="storage-bar"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <motion.div 
                    className="storage-fill" 
                    style={{ width: `${data.storageUsed}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${data.storageUsed}%` }}
                    transition={{ delay: 0.4 + index * 0.05, duration: 0.8, ease: "easeOut" }}
                  />
                </motion.div>
                <span className="storage-value">{data.storageUsed}%</span>
              </div>
            ) : item.statusClass ? (
              <motion.span 
                className={`system-status ${item.statusClass}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 + index * 0.05 }}
              >
                <motion.span 
                  className="status-dot"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.35 + index * 0.05, type: "spring" }}
                />
                {item.value}
              </motion.span>
            ) : (
              <span className="system-value">{item.value}</span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}