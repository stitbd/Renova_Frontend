"use client";

import { motion } from "framer-motion"; // ✅ Added

export default function ConsultationsOverview({ data }) {
  const consultations = [
    { label: "Video Call", count: data.videoCall.count, percentage: data.videoCall.percentage, color: "#014fa1" },
    { label: "Audio Call", count: data.audioCall.count, percentage: data.audioCall.percentage, color: "#428a26" },
    { label: "Chat/SMS", count: data.chatSMS.count, percentage: data.chatSMS.percentage, color: "#64748b" },
  ];

  let cumulativePercent = 0;
  const segments = consultations.map((item) => {
    const startPercent = cumulativePercent;
    cumulativePercent += item.percentage;
    return {
      ...item,
      startPercent,
      endPercent: cumulativePercent,
    };
  });

  return (
    <motion.div 
      className="consultations-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="card-header">
        <h3 className="card-title">Consultations Overview</h3>
      </div>

      <div className="donut-chart-wrapper">
        <motion.div 
          className="donut-chart"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4, type: "spring", stiffness: 200 }}
        >
          <svg viewBox="0 0 100 100">
            {segments.map((segment, index) => {
              const startAngle = (segment.startPercent / 100) * 360;
              const endAngle = (segment.endPercent / 100) * 360;
              const x1 = 50 + 40 * Math.cos((Math.PI * startAngle) / 180);
              const y1 = 50 + 40 * Math.sin((Math.PI * startAngle) / 180);
              const x2 = 50 + 40 * Math.cos((Math.PI * endAngle) / 180);
              const y2 = 50 + 40 * Math.sin((Math.PI * endAngle) / 180);
              const largeArc = segment.percentage > 50 ? 1 : 0;

              return (
                <motion.path
                  key={index}
                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill={segment.color}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                />
              );
            })}
            <circle cx="50" cy="50" r="26" fill="white" />
              {/* Center text rendered inside SVG to avoid rotation issues */}
              <text
                x="50"
                y="47"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10"
                fontWeight="800"
                fill="#1a202c"
                style={{ transform: "rotate(90deg)", transformOrigin: "50px 50px" }}
              >
                {data.total.toLocaleString()}
              </text>
              <text
                x="50"
                y="57"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="5.5"
                fontWeight="400"
                fill="#718096"
                style={{ transform: "rotate(90deg)", transformOrigin: "50px 50px" }}
              >
                Total
              </text>
          </svg>
        </motion.div>

        <motion.div 
          className="chart-legend"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          {consultations.map((item, index) => (
            <motion.div 
              key={index} 
              className="legend-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.08, duration: 0.3 }}
              whileHover={{ x: 3, transition: { duration: 0.15 } }}
            >
              <span className="legend-dot" style={{ backgroundColor: item.color }} />
              <div className="legend-info">
                <span className="legend-label">{item.label}</span>
                <span className="legend-value">
                  {item.count.toLocaleString()} ({item.percentage}%)
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}