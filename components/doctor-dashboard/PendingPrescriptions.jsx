// components/dashboard/PendingPrescriptions.jsx
export default function PendingPrescriptions({ prescriptions }) {
    return (
      <div>
        <div className="section-header-dashboard">
          <h2 className="section-title">Pending Prescriptions</h2>
          <a href="#" className="view-all-link">
            View All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>
        <div className="prescriptions-list">
          {prescriptions.map((prescription, index) => (
            <div key={index} className="prescription-item">
              <div className="prescription-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="prescription-info">
                <h4 className="prescription-name">{prescription.name}</h4>
                <p className="prescription-time">{prescription.time}</p>
                <p className="prescription-type">{prescription.type}</p>
              </div>
              <span className="prescription-status">{prescription.status}</span>
              <button className="prescription-action">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }