// app/outlet/sales/page.jsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function SalesPage() {
  const [period, setPeriod] = useState("week");

  const salesData = {
    week: {
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      values: [12000, 15000, 11000, 18000, 25000, 19000, 16000],
      total: "৳1,16,000",
      orders: 146,
      avgOrder: "৳794"
    },
    month: {
      labels: ["W1", "W2", "W3", "W4"],
      values: [45000, 52000, 48000, 58000],
      total: "৳2,03,000",
      orders: 512,
      avgOrder: "৳396"
    }
  };

  const currentData = salesData[period];
  const maxValue = Math.max(...currentData.values);

  const recentSales = [
    { id: "ORD-1245", customer: "Rafiqul Islam", items: 3, total: "৳1,240", time: "10:24 AM", status: "Completed" },
    { id: "ORD-1246", customer: "Sadita Afrin", items: 2, total: "৳680", time: "10:15 AM", status: "Completed" },
    { id: "ORD-1247", customer: "Rashed Hasan", items: 5, total: "৳2,150", time: "09:50 AM", status: "Completed" },
    { id: "ORD-1248", customer: "Mahmudul Islam", items: 1, total: "৳450", time: "09:30 AM", status: "Pending" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <motion.div className="page-header">
        <h1 className="page-title">Sales Overview</h1>
        <motion.button className="btn btn-primary" whileHover={{ scale: 1.02 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export Report
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div className="stats-row">
        {[
          { label: "Total Sales", value: currentData.total, change: "+15%", color: "#428a26" },
          { label: "Total Orders", value: currentData.orders.toString(), change: "+12", color: "#014fa1" },
          { label: "Avg Order Value", value: currentData.avgOrder, change: "+3%", color: "#7c3aed" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="stat-card-small"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -2 }}
            style={{ borderLeftColor: stat.color }}
          >
            <span className="stat-label">{stat.label}</span>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-change" style={{ color: stat.color }}>{stat.change}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Chart */}
      <motion.div className="chart-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="card-header">
          <h3 className="card-title">Sales Trend</h3>
          <div className="period-selector">
            {["week", "month"].map(p => (
              <motion.button
                key={p}
                className={`period-btn ${period === p ? "active" : ""}`}
                onClick={() => setPeriod(p)}
                whileHover={{ scale: 1.05 }}
              >
                {p === "week" ? "This Week" : "This Month"}
              </motion.button>
            ))}
          </div>
        </div>
        <div className="bar-chart">
          <div className="chart-y-axis">
            {[80000, 60000, 40000, 20000, 0].map(val => (
              <span key={val} className="y-axis-label">{val.toLocaleString()}</span>
            ))}
          </div>
          <div className="chart-bars">
            {currentData.values.map((val, i) => (
              <motion.div
                key={i}
                className="bar-group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
              >
                <motion.div
                  className="bar"
                  style={{ height: `${(val / maxValue) * 100}%` }}
                  initial={{ height: 0 }}
                  animate={{ height: `${(val / maxValue) * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.05 }}
                >
                  <span className="bar-value">৳{(val/1000).toFixed(0)}K</span>
                </motion.div>
                <span className="bar-label">{currentData.labels[i]}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Recent Sales */}
      <motion.div className="recent-sales" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <h3 className="section-title">Recent Orders</h3>
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map((sale, i) => (
                <motion.tr
                  key={sale.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  whileHover={{ backgroundColor: "#f8fafc" }}
                >
                  <td className="order-id">{sale.id}</td>
                  <td>{sale.customer}</td>
                  <td>{sale.items}</td>
                  <td>{sale.total}</td>
                  <td>{sale.time}</td>
                  <td><span className={`status-badge ${sale.status.toLowerCase()}`}>{sale.status}</span></td>
                  <td>
                    <motion.button className="btn-icon view" whileHover={{ scale: 1.1 }}>View</motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}