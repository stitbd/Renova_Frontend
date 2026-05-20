// components/patient/HealthTimeline.jsx
export default function HealthTimeline({ timeline }) {
    const getIconForType = (type) => {
      switch (type) {
        case "Machine Report":
          return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          );
        case "Doctor Note":
          return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          );
        case "Prescription":
          return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
            </svg>
          );
        default:
          return null;
      }
    };
  
    const getStatusClass = (statusType) => {
      switch (statusType) {
        case "success":
          return "status-normal";
        case "warning":
          return "status-risk";
        default:
          return "";
      }
    };
  
    return (
      <div className="health-timeline-card">
        <div className="timeline-header">
          <h3 className="timeline-title">Health Timeline</h3>
          <div className="timeline-filter">
            <select className="filter-select">
              <option>All Types</option>
              <option>Machine Report</option>
              <option>Doctor Note</option>
              <option>Prescription</option>
            </select>
          </div>
        </div>
  
        <div className="timeline-list">
          {timeline.map((item, index) => (
            <div key={item.id} className="timeline-item">
              <div className={`timeline-icon ${item.type === 'Machine Report' ? 'green' : item.type === 'Doctor Note' ? 'blue' : 'green'}`}>
                {getIconForType(item.type)}
              </div>
              <div className="timeline-content">
                <div className="timeline-date">
                  <span className="date">{item.date}</span>
                  <span className="time">{item.time}</span>
                </div>
                <div className="timeline-details">
                  <span className="detail-type">{item.type}</span>
                  <span className="detail-title">{item.title}</span>
                  {item.description && <p className="detail-description">{item.description}</p>}
                  {item.status && (
                    <span className={`status-badge ${getStatusClass(item.statusType)}`}>
                      {item.status}
                    </span>
                  )}
                </div>
              </div>
              <button className="timeline-action">
                {item.type === "Machine Report" && "View Report"}
                {item.type === "Doctor Note" && "View Note"}
                {item.type === "Prescription" && "View Prescription"}
              </button>
            </div>
          ))}
        </div>
  
        <button className="load-more-btn">
          Load More
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    );
  }