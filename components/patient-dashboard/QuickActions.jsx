// components/patient-dashboard/QuickActions.jsx
export default function QuickActions() {
  return (
    <div className="quick-actions-card">
      <h3 className="quick-actions-title">Quick Actions</h3>

      <div className="quick-actions-grid">
        {/* Book Appointment */}
        <button className="quick-action-btn">
          <span className="action-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </span>
          <span className="action-label">Book Appointment</span>
        </button>

        {/* Upload Report */}
        <button className="quick-action-btn">
          <span className="action-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </span>
          <span className="action-label">Upload Report</span>
        </button>

        {/* Download Records */}
        <button className="quick-action-btn">
          <span className="action-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </span>
          <span className="action-label">Download Records</span>
        </button>

        {/* Contact Doctor — full width row */}
        <button className="quick-action-btn">
          <span className="action-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
          <span className="action-label">Contact Doctor</span>
        </button>
      </div>

      {/* Health tip */}
      <div className="health-tip-card" style={{ marginTop: "14px" }}>
        <div className="health-tip-text">
          <h4>Take Care of Your Health</h4>
          <p>Stay healthy, stay happy. Regular check-ups help you live a better life.</p>
        </div>
        <div className="health-tip-icon">💙</div>
      </div>
    </div>
  );
}