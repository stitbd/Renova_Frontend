// components/dashboard/ScheduleTimeline.jsx
export default function ScheduleTimeline({ schedule }) {
    return (
      <div>
        <div className="section-header-dashboard">
          <h2 className="section-title">Today's Schedule</h2>
          <a href="#" className="view-all-link">
            View Calendar
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>
        <div className="schedule-timeline">
          {schedule.map((item, index) => (
            <div key={index} className="schedule-item">
              <div className="schedule-time">{item.time}</div>
              <div className={`schedule-dot ${item.status.toLowerCase()}`} />
              <div className="schedule-event">
                <h4 className="schedule-event-name">{item.event}</h4>
                <p className={`schedule-event-status ${item.status.toLowerCase()}`}>
                  {item.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }