"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Stethoscope,
  DollarSign,
  Users,
  FileText,
  ArrowRight
} from "lucide-react";

export default function RecentActivities({ activities }) {
  const iconMap = {
    outlet: Building2,
    doctor: Stethoscope,
    payment: DollarSign,
    patient: Users,
    report: FileText
  };

  return (
    <motion.div
      className="activities-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="card-header">
        <h3 className="card-title">Recent Activities</h3>
        <a href="#" className="view-all-link">
          View All
          <ArrowRight size={13} />
        </a>
      </div>
      <div className="activities-list">
        {activities.map((activity, index) => {
          const IconComponent = iconMap[activity.type] || FileText;
          return (
            <motion.div
              key={index}
              className="activity-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.07, duration: 0.3 }}
              whileHover={{
                backgroundColor: "#f0f7ff",
                transition: { duration: 0.15 }
              }}
            >
              <motion.div
                className={`activity-icon ${activity.type}`}
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <IconComponent size={16} />
              </motion.div>
              <div className="activity-content">
                <p className="activity-title">{activity.title}</p>
                <div className="activity-meta">
                  <span className="activity-user">{activity.user}</span>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}