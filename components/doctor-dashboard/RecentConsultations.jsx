// components/dashboard/RecentConsultations.jsx
export default function RecentConsultations({ consultations }) {
    return (
      <div>
        <div className="section-header-dashboard">
          <h2 className="section-title">Recent Consultations</h2>
          <a href="#" className="view-all-link">
            View All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>
        <div className="consultations-list">
          {consultations.map((consultation, index) => (
            <div key={index} className="consultation-item">
              <div className="consultation-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="consultation-info">
                <h4 className="consultation-name">{consultation.name}</h4>
                <p className="consultation-meta">
                  {consultation.age} Years, {consultation.gender}
                </p>
                <p className="consultation-condition">{consultation.condition}</p>
              </div>
              <div className="consultation-details">
                <div className="consultation-fee">৳ {consultation.fee}</div>
                <span className="consultation-status">{consultation.status}</span>
              </div>
              <button className="consultation-view">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }