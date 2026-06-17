import { ArrowRight, Calendar, Clock, CheckCircle, Circle, Coffee } from "lucide-react";

// components/doctor-dashboard/ScheduleTimeline.jsx
export default function ScheduleTimeline({ schedule }) {
  return (
    <div>
      <div className="section-header-dashboard">
        <h2 className="section-title">Today's Schedule</h2>
        <a href="#" className="view-all-link">
          View Calendar
          <ArrowRight size={16} />
        </a>
      </div>

      <div className="schedule-timeline">
        {schedule.map((item, index) => (
          <div key={index} className="schedule-item">
            <div className="schedule-time">{item.time}</div>
            <div className={`schedule-dot ${item.status.toLowerCase()}`} />
            <div className="schedule-event">
              <h4 className="schedule-event-name">{item.event}</h4>
              <span className={`schedule-event-status ${item.status.toLowerCase()}`}>
                {item.status === 'Completed' ? '✓ Completed' : item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}