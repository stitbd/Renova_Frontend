"use client";

import "./patient-health-summary.css";
import { motion } from "framer-motion";
import {
  Calendar,
  Phone,
  Mail,
  MapPin,
  Activity,
  Stethoscope,
  FileText,
  TestTube,
  Scan,
  ChevronRight,
  Eye,
  AlertCircle,
  Heart,
  Thermometer,
  Droplet,
  Scale,
  Ruler,
  Clock,
  User
} from "lucide-react";

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

const patientData = {
  name: "Ayesha Rahman",
  id: "PT-2025-000123",
  age: 28,
  gender: "Female",
  phone: "017XXXXXXXXXX",
  email: "ayesha@email.com",
  bloodGroup: "B+",
  dob: "12 Jan 1997",
  address: "Mirpur, Dhaka",
  lastVisit: "31 May 2025",
  nextVisit: "07 Jun 2025",
  primaryDoctor: "Dr. Abdullah Al Noman",
  specialty: "Cardiologist",
  stats: {
    appointments: 18,
    consultations: 15,
    prescriptions: 22,
    labTests: 16,
    imagingTests: 6
  },
  vitals: [
    { label: "Blood Pressure", value: "120/80", unit: "mmHg", icon: Activity, date: "31 May 2025", color: "red" },
    { label: "Heart Rate", value: "72", unit: "bpm", icon: Heart, date: "31 May 2025", color: "pink" },
    { label: "Temperature", value: "36.6", unit: "°C", icon: Thermometer, date: "31 May 2025", color: "blue" },
    { label: "SpO₂", value: "98", unit: "%", icon: Droplet, date: "31 May 2025", color: "cyan" },
    { label: "Weight", value: "58", unit: "kg", icon: Scale, date: "31 May 2025", color: "green" },
    { label: "Height", value: "160", unit: "cm", icon: Ruler, date: "31 May 2025", color: "orange" }
  ],
  healthTrend: {
    labels: ["Dec 2024", "Jan 2025", "Feb 2025", "Mar 2025", "Apr 2025", "May 2025"],
    bloodPressure: [120, 145, 138, 142, 135, 140],
    heartRate: [72, 70, 75, 68, 72, 70],
    weight: [60, 59, 58.5, 58, 58, 58]
  },
  allergies: ["Penicillin", "Peanuts", "Pollen"],
  chronicConditions: [
    { name: "Hypertension", diagnosed: "12 Mar 2023", icon: Heart },
    { name: "Migraine", diagnosed: "05 Aug 2022", icon: AlertCircle }
  ],
  medicalHistory: [
    { date: "31 May 2025", type: "Consultation", doctor: "Dr. Abdullah Al Noman", notes: "Regular checkup and BP follow-up." },
    { date: "15 May 2025", type: "Lab Test", doctor: "Dr. Farhana Akter", notes: "Blood test for lipid profile." },
    { date: "10 May 2025", type: "X-Ray", doctor: "Dr. Hasan Mahmud", notes: "Chest X-Ray for infection." },
    { date: "08 May 2025", type: "Prescription", doctor: "Dr. Abdullah Al Noman", notes: "Medication for BP and headache." },
    { date: "01 May 2025", type: "Consultation", doctor: "Dr. Farhana Akter", notes: "Follow-up for migraine." }
  ],
  healthScore: 82
};

export default function PatientHealthSummary() {
  return (
    <div className="patient-health-summary">
      {/* Main Content Grid */}
      <div className="content-grid">
        {/* Left Column */}
        <div className="left-column">
          {/* Header Section */}
          <motion.div
            className="patient-header"
            variants={item}
            initial="hidden"
            animate="show"
          >
            <div className="patient-info">
              <div className="patient-avatar">
                <img src="/images/patients/01.jpg" alt="Patient" />
              </div>
              <div className="patient-details">
                <h2>{patientData.name}</h2>
                <p className="patient-id">{patientData.id}</p>
                <div className="patient-meta">
                  <span><User size={14} /> {patientData.age} Years, {patientData.gender}</span>
                  <span><Phone size={14} /> {patientData.phone}</span>
                  <span><Mail size={14} /> {patientData.email}</span>
                </div>
                <div className="patient-extra-info">
                  <span>Blood Group: <strong>{patientData.bloodGroup}</strong></span>
                  <span>Date of Birth: <strong>{patientData.dob}</strong></span>
                  <span><MapPin size={14} /> {patientData.address}</span>
                </div>
              </div>
            </div>

            <div className="visit-info">
              <div className="visit-item">
                <Calendar size={16} />
                <div>
                  <span className="label">Last Visit</span>
                  <span className="value">{patientData.lastVisit}</span>
                </div>
              </div>
              <div className="visit-item">
                <Calendar size={16} />
                <div>
                  <span className="label">Next Visit</span>
                  <span className="value">{patientData.nextVisit}</span>
                </div>
              </div>
              <div className="visit-item">
                <Stethoscope size={16} />
                <div>
                  <span className="label">Primary Doctor</span>
                  <div className="value-stack">
                    <span className="value">{patientData.primaryDoctor}</span>
                    <span className="sub-value">{patientData.specialty}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="stats-grid"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {[
              { label: "Total Appointments", value: patientData.stats.appointments, icon: Calendar, color: "green" },
              { label: "Total Consultations", value: patientData.stats.consultations, icon: Stethoscope, color: "blue" },
              { label: "Total Prescriptions", value: patientData.stats.prescriptions, icon: FileText, color: "purple" },
              { label: "Lab Tests", value: patientData.stats.labTests, icon: TestTube, color: "orange" },
              { label: "Imaging Tests", value: patientData.stats.imagingTests, icon: Scan, color: "cyan" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className={`stat-card stat-${stat.color}`}
                variants={item}
                whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
              >
                <div className="stat-content">
                  <span className="stat-label">{stat.label}</span>
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-link">View details</span>
                </div>
                <div className="stat-icon">
                  <stat.icon size={32} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Health Trend Chart */}
          <motion.div
            className="trend-section"
            variants={item}
            initial="hidden"
            animate="show"
          >
            <div className="section-header">
              <h3>Health Trend</h3>
              <select className="time-select">
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>
            <div className="chart-legend">
              <span className="legend-item"><span className="dot bp"></span> Blood Pressure (mmHg)</span>
              <span className="legend-item"><span className="dot hr"></span> Heart Rate (bpm)</span>
              <span className="legend-item"><span className="dot wt"></span> Weight (kg)</span>
            </div>
            <div className="chart-container">
              <svg viewBox="0 0 800 300" className="health-chart">
                {/* Grid lines */}
                {[0, 50, 100, 150, 200, 250, 300].map((y, i) => (
                  <line key={i} x1="0" y1={y} x2="800" y2={y} stroke="#e2e8f0" strokeWidth="1" />
                ))}

                {/* Left Y-axis labels */}
                {[200, 150, 100, 50, 0].map((val, i) => (
                  <text key={i} x="40" y={(i / 4) * 250 + 30} fontSize="11" fill="#94a3b8" textAnchor="end">{val}</text>
                ))}
                {/* Right Y-axis labels */}
                {[120, 100, 80, 60, 40].map((val, i) => (
                  <text key={i} x="770" y={(i / 4) * 250 + 30} fontSize="11" fill="#94a3b8" textAnchor="start">{val}</text>
                ))}

                {/* Blood Pressure Line */}
                <motion.path
                  d={`M ${patientData.healthTrend.labels.map((_, i) =>
                    `${(i / (patientData.healthTrend.labels.length - 1)) * 700 + 50},${300 - (patientData.healthTrend.bloodPressure[i] / 200) * 250}`
                  ).join(" L ")}`}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                />

                {/* Heart Rate Line */}
                <motion.path
                  d={`M ${patientData.healthTrend.labels.map((_, i) =>
                    `${(i / (patientData.healthTrend.labels.length - 1)) * 700 + 50},${300 - (patientData.healthTrend.heartRate[i] / 100) * 250}`
                  ).join(" L ")}`}
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.4 }}
                />

                {/* Weight Line */}
                <motion.path
                  d={`M ${patientData.healthTrend.labels.map((_, i) =>
                    `${(i / (patientData.healthTrend.labels.length - 1)) * 700 + 50},${300 - (patientData.healthTrend.weight[i] / 70) * 250}`
                  ).join(" L ")}`}
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.6 }}
                />
              </svg>
              <div className="x-axis">
                {patientData.healthTrend.labels.map((label, i) => (
                  <span key={i}>{label}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Medical History */}
          <motion.div
            className="history-section"
            variants={item}
            initial="hidden"
            animate="show"
          >
            <div className="section-header">
              <h3>Recent Medical History</h3>
              <button className="view-all">View All</button>
            </div>
            <div className="history-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Doctor</th>
                    <th>Notes</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {patientData.medicalHistory.map((record, idx) => (
                    <motion.tr
                      key={idx}
                      variants={item}
                      whileHover={{ backgroundColor: "rgba(241, 245, 249, 0.5)" }}
                    >
                      <td>{record.date}</td>
                      <td><span className={`type-badge type-${record.type.toLowerCase().replace(" ", "-")}`}>{record.type}</span></td>
                      <td>{record.doctor}</td>
                      <td>{record.notes}</td>
                      <td>
                        <button className="action-btn">
                          <Eye size={16} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="history-cards">
              {patientData.medicalHistory.map((record, idx) => (
                <motion.div
                  key={idx}
                  className="history-card"
                  variants={item}
                >
                  <div className="history-card-header">
                    <span className={`type-badge type-${record.type.toLowerCase().replace(" ", "-")}`}>{record.type}</span>
                    <span className="history-card-date">{record.date}</span>
                  </div>
                  <div className="history-card-body">
                    <div className="history-card-row">
                      <span className="history-card-label">Doctor</span>
                      <span className="history-card-value">{record.doctor}</span>
                    </div>
                    <div className="history-card-row">
                      <span className="history-card-label">Notes</span>
                      <span className="history-card-value">{record.notes}</span>
                    </div>
                  </div>
                  <button className="action-btn history-card-action">
                    <Eye size={16} /> View Details
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Latest Vitals */}
          <motion.div
            className="vitals-section"
            variants={item}
            initial="hidden"
            animate="show"
          >
            <div className="section-header">
              <h3>Latest Vitals</h3>
              <button className="view-all">View All</button>
            </div>
            <div className="vitals-list">
              {patientData.vitals.map((vital, idx) => (
                <motion.div
                  key={idx}
                  className="vital-item"
                  variants={item}
                  whileHover={{ backgroundColor: "rgba(241, 245, 249, 0.8)" }}
                >
                  <div className={`vital-icon vital-icon-${vital.color}`}>
                    <vital.icon size={18} />
                  </div>
                  <span className="vital-label">{vital.label}</span>
                  <span className="vital-value">{vital.value} <span className="unit">{vital.unit}</span></span>
                  <span className="vital-date">{vital.date}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Allergies */}
          <motion.div className="vitals-section" variants={item} initial="hidden" animate="show">
            <div className="section-header">
              <h3>Allergies</h3>
              <button className="view-all">View All</button>
            </div>
            <div className="allergy-tags">
              {patientData.allergies.map((allergy, idx) => (
                <motion.span
                  key={idx}
                  className="allergy-tag"
                  variants={item}
                  whileHover={{ scale: 1.05 }}
                >
                  {allergy}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Chronic Conditions */}
          <motion.div
            className="conditions-section"
            variants={item}
            initial="hidden"
            animate="show"
          >
            <div className="section-header">
              <h3>Chronic Conditions</h3>
              <button className="view-all">View All</button>
            </div>
            <div className="conditions-list">
              {patientData.chronicConditions.map((condition, idx) => (
                <motion.div
                  key={idx}
                  className="condition-item"
                  variants={item}
                  whileHover={{ x: 4 }}
                >
                  <div className="condition-icon">
                    <condition.icon size={20} />
                  </div>
                  <div className="condition-info">
                    <span className="condition-name">{condition.name}</span>
                    <span className="condition-date">Diagnosed on {condition.diagnosed}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Health Score */}
          <motion.div
            className="health-score-section"
            variants={item}
            initial="hidden"
            animate="show"
            whileHover={{ boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
          >
            <div className="section-header">
              <h3>Health Score <AlertCircle size={16} /></h3>
              <select className="time-select">
                <option>This Month</option>
                <option>Last Month</option>
              </select>
            </div>
            <div className="score-content">
              <div className="score-circle">
                <svg viewBox="0 0 100 100" className="circular-chart">
                  <circle
                    className="circle-bg"
                    cx="50"
                    cy="50"
                    r="45"
                  />
                  <motion.circle
                    className="circle"
                    cx="50"
                    cy="50"
                    r="45"
                    strokeDasharray={`${(patientData.healthScore / 100) * 283}, 283`}
                    animate={{ strokeDasharray: `${(patientData.healthScore / 100) * 283}, 283` }}
                    initial={{ strokeDasharray: "0, 283" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </svg>
                <div className="score-value">
                  <span>{patientData.healthScore}</span>
                  <span className="score-total">/100</span>
                </div>
              </div>
              <div className="score-details">
                <h4>Good</h4>
                <p>Great! Your health score is good. Keep maintaining your healthy lifestyle.</p>
                <ul className="score-tips">
                  <li>✓ Eat healthy food</li>
                  <li>✓ Regular exercise</li>
                  <li>✓ Take medicines on time</li>
                  <li>⚠ Reduce stress</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}