"use client";

import { motion } from "framer-motion";
import {
  Plus,
  CheckCircle,
  BarChart3,
  Settings,
  Bell,
  ArrowRight
} from "lucide-react";

export default function QuickActions({ actions }) {
  const iconMap = {
    plus: Plus,
    check: CheckCircle,
    chart: BarChart3,
    settings: Settings,
    bell: Bell
  };

  return (
    <motion.div
      className="quick-actions-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h3 className="card-title">Quick Actions</h3>
      <div className="quick-actions-list">
        {actions.map((action, index) => {
          const IconComponent = iconMap[action.icon] || Plus;
          return (
            <motion.a
              key={index}
              href={action.action}
              className="quick-action-item"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.06, duration: 0.3 }}
              whileHover={{
                backgroundColor: "#eff6ff",
                borderColor: "#bfdbfe",
                color: "#014fa1",
                x: 4,
                transition: { duration: 0.15 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="action-icon"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <IconComponent size={15} />
              </motion.span>
              <span className="action-label">{action.label}</span>
              {action.badge && (
                <motion.span
                  className="action-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05, type: "spring" }}
                >
                  {action.badge}
                </motion.span>
              )}
              <ArrowRight size={14} className="action-arrow" />
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
}