// components/outlet/RecentActivities.jsx
import { User, FileText, ShoppingBag, Stethoscope, Pill, ArrowRight } from "lucide-react";

export default function RecentActivities({ activities }) {
  const renderIcon = (type) => {
    const icons = {
      patient: User,
      report: FileText,
      sale: ShoppingBag,
      consultation: Stethoscope,
      prescription: Pill,
    };
    const IconComponent = icons[type] || User;
    return <IconComponent size={14} />;
  };

  return (
    <div className="activities-card">
      <div className="card-header">
        <h3 className="card-title">Recent Activities</h3>
      </div>
      <div className="activities-list">
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div className={`activity-icon ${activity.type}`}>
              {renderIcon(activity.type)}
            </div>
            <div className="activity-content">
              <h4 className="activity-title">{activity.title}</h4>
              <p className="activity-description">{activity.description}</p>
            </div>
            <span className="activity-time">{activity.time}</span>
          </div>
        ))}
      </div>
      <a href="#" className="view-all-activities-link">
        View All Activities
        <ArrowRight size={14} />
      </a>
    </div>
  );
}