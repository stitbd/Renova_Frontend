// components/patient-dashboard/HealthTimeline.jsx
export default function HealthTimeline({ timeline }) {
  const getIconConfig = (type) => {
    switch (type) {
      case "Machine Report":
        return {
          className: "green",
          svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          ),
          typeColor: "green",
        };
      case "Doctor Note":
        return {
          className: "blue",
          svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          ),
          typeColor: "blue",
        };
      case "Prescription":
        return {
          className: "prescription",
          svg: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
            </svg>
          ),
          typeColor: "green",
        };
      default:
        return { className: "blue", svg: null, typeColor: "" };
    }
  };

  const getActionLabel = (type) => {
    if (type === "Machine Report") return "View Report";
    if (type === "Doctor Note")    return "View Note";
    if (type === "Prescription")   return "View Prescription";
    return "View";
  };

  return (
    <div className="health-timeline-card">
      <div className="timeline-header">
        <h3 className="timeline-title">Health Timeline</h3>
        <select className="filter-select" defaultValue="all">
          <option value="all">All Types</option>
          <option value="report">Machine Report</option>
          <option value="note">Doctor Note</option>
          <option value="rx">Prescription</option>
        </select>
      </div>

      <div className="timeline-list">
        {timeline.map((item) => {
          const { className, svg, typeColor } = getIconConfig(item.type);
          return (
            <div key={item.id} className="timeline-item">
              <div className={`timeline-icon ${className}`}>{svg}</div>

              <div className="timeline-content">
                <div className="timeline-date">
                  <span className="date">{item.date}</span>
                  <span className="time">{item.time}</span>
                </div>
                <div className="timeline-details">
                  <span className={`detail-type ${typeColor}`}>{item.type}</span>
                  <span className="detail-title">{item.title}</span>
                  {item.description && (
                    <p className="detail-description">{item.description}</p>
                  )}
                  {item.status && (
                    <span className={`status-badge ${item.statusType === "success" ? "status-normal" : "status-risk"}`}>
                      {item.status}
                    </span>
                  )}
                </div>
              </div>

              <button className="timeline-action">{getActionLabel(item.type)}</button>
            </div>
          );
        })}
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