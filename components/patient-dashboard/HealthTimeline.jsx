// components/patient-dashboard/HealthTimeline.jsx
import { FileText, User, Pill, ChevronDown } from "lucide-react";

export default function HealthTimeline({ timeline }) {
  const getIconConfig = (type) => {
    switch (type) {
      case "Machine Report":
        return {
          className: "green",
          svg: <FileText size={16} />,
          typeColor: "green",
        };
      case "Doctor Note":
        return {
          className: "blue",
          svg: <User size={16} />,
          typeColor: "blue",
        };
      case "Prescription":
        return {
          className: "prescription",
          svg: <Pill size={16} />,
          typeColor: "green",
        };
      default:
        return { className: "blue", svg: null, typeColor: "" };
    }
  };

  const getActionLabel = (type) => {
    if (type === "Machine Report") return "View Report";
    if (type === "Doctor Note") return "View Note";
    if (type === "Prescription") return "View Prescription";
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
        <ChevronDown size={18} />
      </button>
    </div>
  );
}