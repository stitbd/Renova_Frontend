// components/patient-dashboard/StatsGrid.jsx
import { FileText, Pill, Stethoscope, Calendar, Heart } from "lucide-react";

export default function StatsGrid({ stats }) {
  return (
    <div className="stats-grid">
      {/* Total Reports */}
      <div className="stat-card reports">
        <div className="stat-icon">
          <FileText size={22} />
        </div>
        <div className="stat-content">
          <span className="stat-label">Total Reports</span>
          <span className="stat-value">{String(stats.totalReports).padStart(2, "0")}</span>
          <a href="#" className="stat-link">View all reports</a>
        </div>
      </div>

      {/* Prescriptions */}
      <div className="stat-card prescriptions">
        <div className="stat-icon">
          <Pill size={22} />
        </div>
        <div className="stat-content">
          <span className="stat-label">Prescriptions</span>
          <span className="stat-value">{String(stats.prescriptions).padStart(2, "0")}</span>
          <a href="#" className="stat-link">View all prescriptions</a>
        </div>
      </div>

      {/* Consultations */}
      <div className="stat-card consultations">
        <div className="stat-icon">
          <Stethoscope size={22} />
        </div>
        <div className="stat-content">
          <span className="stat-label">Consultations</span>
          <span className="stat-value">{String(stats.consultations).padStart(2, "0")}</span>
          <a href="#" className="stat-link">View history</a>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="stat-card appointments">
        <div className="stat-icon">
          <Calendar size={22} />
        </div>
        <div className="stat-content">
          <span className="stat-label">Upcoming Appointments</span>
          <span className="stat-value">{String(stats.upcomingAppointments).padStart(2, "0")}</span>
          <a href="#" className="stat-link">View appointments</a>
        </div>
      </div>

      {/* Health Score */}
      <div className="stat-card health-score">
        <div className="health-score-circle">
          <svg viewBox="0 0 36 36" className="circular-chart">
            <path
              className="circle-bg"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="circle"
              strokeDasharray={`${stats.healthScore}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="score-value">{stats.healthScore}%</span>
        </div>
        <div className="stat-content">
          <span className="stat-label">Health Score</span>
          <span className="health-status">{stats.healthStatus}</span>
          <a href="#" className="stat-link">View details</a>
        </div>
      </div>
    </div>
  );
}