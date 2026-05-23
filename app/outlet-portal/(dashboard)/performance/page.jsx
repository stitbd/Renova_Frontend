// app/outlet/performance/page.jsx
"use client";

import { motion } from "framer-motion";

export default function PerformancePage() {
  const metrics = [
    { label: "Total Patients", value: "1,245", change: "+18.5%", icon: "patients", color: "#014fa1" },
    { label: "Consultations", value: "876", change: "+14.3%", icon: "consultations", color: "#428a26" },
    { label: "Total Sales", value: "৳2,45,650", change: "+16.8%", icon: "sales", color: "#f59e0b" },
    { label: "Earnings", value: "৳78,450", change: "+20.6%", icon: "earnings", color: "#7c3aed" },
  ];

  const categoryData = [
    { name: "Wellness", value: 40, color: "#014fa1" },
    { name: "Supplements", value: 30, color: "#428a26" },
    { name: "Personal Care", value: 20, color: "#f59e0b" },
    { name: "Others", value: 10, color: "#7c3aed" },
  ];

  const monthlyData = [
    { month: "Jan", patients: 850, sales: 180000 },
    { month: "Feb", patients: 920, sales: 195000 },
    { month: "Mar", patients: 1050, sales: 220000 },
    { month: "Apr", patients: 1180, sales: 245000 },
    { month: "May", patients: 1245, sales: 268000 },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <motion.div className="page-header">
        <h1 className="page-title">Outlet Performance</h1>
        <motion.button className="btn btn-primary" whileHover={{ scale: 1.02 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export Report
        </motion.button>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div className="metrics-grid">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            className="metric-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className="metric-icon" style={{ backgroundColor: `${metric.color}20`, color: metric.color }}>
              {metric.icon === "patients" && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
              )}
              {metric.icon === "consultations" && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              )}
              {metric.icon === "sales" && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              )}
              {metric.icon === "earnings" && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              )}
            </div>
            <div className="metric-content">
              <span className="metric-label">{metric.label}</span>
              <span className="metric-value">{metric.value}</span>
              <span className="metric-change" style={{ color: metric.color }}>{metric.change}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <motion.div className="charts-row">
        {/* Donut Chart */}
        <motion.div className="chart-card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h3 className="card-title">Sales by Category</h3>
          <div className="donut-chart-wrapper">
            <div className="donut-chart">
              <svg viewBox="0 0 100 100">
                {categoryData.reduce((acc, cat, i) => {
                  const startAngle = acc.angle;
                  const endAngle = startAngle + (cat.value / 100) * 360;
                  const x1 = 50 + 40 * Math.cos((Math.PI * startAngle) / 180);
                  const y1 = 50 + 40 * Math.sin((Math.PI * startAngle) / 180);
                  const x2 = 50 + 40 * Math.cos((Math.PI * endAngle) / 180);
                  const y2 = 50 + 40 * Math.sin((Math.PI * endAngle) / 180);
                  const largeArc = cat.value > 50 ? 1 : 0;
                  
                  acc.elements.push(
                    <motion.path
                      key={cat.name}
                      d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                      fill={cat.color}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    />
                  );
                  acc.angle = endAngle;
                  return acc;
                }, { angle: -90, elements: [] }).elements}
                <circle cx="50" cy="50" r="25" fill="white" />
              </svg>
              <div className="donut-center">
                <span>Sales</span>
                <span className="donut-total">100%</span>
              </div>
            </div>
            <div className="chart-legend">
              {categoryData.map((cat, i) => (
                <motion.div
                  key={cat.name}
                  className="legend-item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <span className="legend-dot" style={{ backgroundColor: cat.color }} />
                  <span className="legend-label">{cat.name}</span>
                  <span className="legend-value">{cat.value}%</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Line Chart */}
        <motion.div className="chart-card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h3 className="card-title">Monthly Trend</h3>
          <div className="line-chart">
            <svg viewBox="0 0 400 200" className="line-svg">
              {/* Grid lines */}
              {[0, 50, 100, 150, 200].map(y => (
                <line key={y} x1="40" y1={y} x2="400" y2={y} stroke="#e2e8f0" strokeWidth="1" />
              ))}
              {/* Patients line */}
              <motion.path
                d={`M 40 ${200 - (monthlyData[0].patients / 1300) * 200} ` +
                  monthlyData.map((d, i) => `L ${40 + i * 80} ${200 - (d.patients / 1300) * 200}`).join(" ")}
                fill="none"
                stroke="#014fa1"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              {/* Sales line */}
              <motion.path
                d={`M 40 ${200 - (monthlyData[0].sales / 300000) * 200} ` +
                  monthlyData.map((d, i) => `L ${40 + i * 80} ${200 - (d.sales / 300000) * 200}`).join(" ")}
                fill="none"
                stroke="#428a26"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </svg>
            <div className="chart-legend-inline">
              <span className="legend-item"><span className="legend-dot" style={{ backgroundColor: "#014fa1" }} /> Patients</span>
              <span className="legend-item"><span className="legend-dot" style={{ backgroundColor: "#428a26" }} /> Sales</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}