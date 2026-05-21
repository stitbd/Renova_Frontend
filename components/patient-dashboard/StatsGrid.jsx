// components/patient-dashboard/StatsGrid.jsx
export default function StatsGrid({ stats }) {
  return (
    <div className="stats-grid">
      {/* Total Reports */}
      <div className="stat-card reports">
        <div className="stat-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
          </svg>
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <polyline points="9 16 11 18 15 14" />
          </svg>
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