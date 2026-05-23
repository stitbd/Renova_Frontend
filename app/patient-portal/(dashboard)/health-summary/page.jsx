// app/patient/health-summary/page.jsx
"use client";

import { motion } from "framer-motion";

const healthData = {
  score: 85,
  status: "Good",
  vitals: [
    { label: "Blood Pressure", value: "120/80", unit: "mmHg", status: "normal" },
    { label: "Heart Rate", value: "72", unit: "bpm", status: "normal" },
    { label: "Blood Sugar", value: "95", unit: "mg/dL", status: "normal" },
    { label: "BMI", value: "22.5", unit: "", status: "normal" },
    { label: "Oxygen Level", value: "98", unit: "%", status: "normal" },
    { label: "Cholesterol", value: "180", unit: "mg/dL", status: "borderline" },
  ],
  trends: [
    { label: "Weight", data: [70, 69.5, 69, 68.5, 68], unit: "kg" },
    { label: "Blood Pressure (Systolic)", data: [125, 122, 120, 118, 120], unit: "mmHg" },
  ],
  recommendations: [
    "Continue regular exercise routine",
    "Maintain healthy diet with reduced sodium",
    "Schedule next checkup in 3 months",
  ],
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};

export default function HealthSummaryPage() {
  return (
    <motion.div 
      className="health-summary"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Health Score Card */}
      <motion.div 
        className="health-score-card"
        variants={item}
        whileHover={{ 
          boxShadow: "0 8px 24px rgba(22, 163, 74, 0.15)",
          transition: { duration: 0.3 }
        }}
      >
        <motion.div 
          className="score-circle"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <svg className="circular-chart" viewBox="0 0 100 100">
            <motion.circle 
              className="circle-bg" 
              cx="50" 
              cy="50" 
              r="45"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            />
            <motion.circle 
              className="circle" 
              cx="50" 
              cy="50" 
              r="45" 
              strokeDasharray={`${healthData.score}, 100`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            />
          </svg>
          <motion.span 
            className="score-value"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
          >
            {healthData.score}
          </motion.span>
        </motion.div>
        <div className="score-info">
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Health Score
          </motion.h3>
          <motion.p 
            className="score-status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {healthData.status}
          </motion.p>
          <motion.p 
            className="score-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Based on your recent checkups and vitals
          </motion.p>
        </div>
      </motion.div>

      {/* Vitals Grid */}
      <motion.div 
        className="vitals-grid"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {healthData.vitals.map((vital, idx) => (
          <motion.div 
            key={idx} 
            className="vital-card"
            variants={item}
            whileHover={{ 
              y: -4,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: { duration: 0.2 }
            }}
          >
            <motion.span 
              className="vital-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
            >
              {vital.label}
            </motion.span>
            <motion.span 
              className="vital-value"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.05, type: "spring" }}
            >
              {vital.value}
              {vital.unit && <span className="vital-unit">{vital.unit}</span>}
            </motion.span>
            <motion.span 
              className={`vital-status status-${vital.status}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + idx * 0.05, type: "spring" }}
            >
              {vital.status}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>

      {/* Trends Charts */}
      <motion.div 
        className="trends-section"
        variants={item}
      >
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Health Trends
        </motion.h3>
        <motion.div 
          className="trends-grid"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {healthData.trends.map((trend, idx) => (
            <motion.div 
              key={idx} 
              className="trend-card"
              variants={item}
              whileHover={{ y: -4 }}
            >
              <motion.h4
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {trend.label}
              </motion.h4>
              <div className="trend-chart">
                <motion.div 
                  className="chart-bars"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {trend.data.map((val, i) => (
                    <motion.div 
                      key={i} 
                      className="chart-bar" 
                      style={{ height: `${(val / Math.max(...trend.data)) * 100}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${(val / Math.max(...trend.data)) * 100}%` }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.3 + i * 0.1,
                        ease: "easeOut"
                      }}
                    >
                      <motion.span 
                        className="bar-value"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        {val}
                      </motion.span>
                    </motion.div>
                  ))}
                </motion.div>
                <span className="chart-unit">{trend.unit}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Recommendations */}
      <motion.div 
        className="recommendations-card"
        variants={item}
        whileHover={{ 
          boxShadow: "0 8px 24px rgba(66, 138, 38, 0.1)",
          transition: { duration: 0.3 }
        }}
      >
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Personalized Recommendations
        </motion.h3>
        <motion.ul 
          className="recommendations-list"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {healthData.recommendations.map((rec, idx) => (
            <motion.li 
              key={idx} 
              className="recommendation-item"
              variants={item}
              whileHover={{ x: 4 }}
            >
              <motion.svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <polyline points="20 6 9 17 4 12" />
              </motion.svg>
              {rec}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}