"use client";

import { motion } from "framer-motion"; // ✅ Added

export default function OutletPerformance({ data }) {
  return (
    <motion.div 
      className="performance-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="card-header">
        <h3 className="card-title">Outlet Performance (Top 5)</h3>
        <a href="#" className="view-all-link">
          View All
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>
      </div>
      <div className="performance-table">
        <div className="table-header">
          <span className="header-col">Outlet</span>
          <span className="header-col">Total Patients</span>
          <span className="header-col">Revenue (৳)</span>
          <span className="header-col">Growth</span>
        </div>
        {data.map((outlet, index) => (
          <motion.div 
            key={index} 
            className="table-row"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.06, duration: 0.3 }}
            whileHover={{ backgroundColor: "#f8fafc", transition: { duration: 0.15 } }}
          >
            <span className="row-col outlet-name">{outlet.name}</span>
            <span className="row-col">{outlet.patients.toLocaleString()}</span>
            <span className="row-col">৳ {outlet.revenue}</span>
            <motion.span 
              className="row-col growth-positive"
              whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              {outlet.growth}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}