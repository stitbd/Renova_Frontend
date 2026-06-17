"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Database,
  HardDrive,
  Users,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function SystemSummary({ data }) {
  const systemItems = [
    { icon: Activity, label: "System Status", value: data.systemStatus, statusClass: data.systemStatus.toLowerCase() },
    { icon: Database, label: "Database", value: data.database, statusClass: data.database.toLowerCase() },
    { icon: HardDrive, label: "Storage Used", value: `${data.storageUsed}%`, isStorage: true },
    { icon: Users, label: "Active Users", value: data.activeUsers },
    { icon: CheckCircle, label: "Backup Status", value: data.backupStatus, statusClass: data.backupStatus.toLowerCase() },
  ];

  return (
    <motion.div
      className="system-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h3 className="card-title">System Summary</h3>
      <div className="system-list">
        {systemItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
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
                <IconComponent size={15} />
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
          );
        })}
      </div>
    </motion.div>
  );
}