// components/doctor-dashboard/AppointmentsList.jsx
export default function AppointmentsList({ appointments }) {
  return (
    <div>
      <div className="section-header-dashboard">
        <h2 className="section-title">Today's Appointments</h2>
        <a href="#" className="view-all-link">
          View All
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>
      </div>

      <div className="appointments-list">
        {appointments.map((apt, index) => (
          <div key={index} className="appointment-item">
            <div className="appointment-time">{apt.time}</div>
            <div className="appointment-info">
              <h4 className="appointment-name">{apt.name}</h4>
              <p className="appointment-type">{apt.type}</p>
            </div>
            <span className={`appointment-status ${apt.status.toLowerCase()}`}>
              {apt.status}
            </span>
          </div>
        ))}
      </div>

      <button className="view-full-schedule-btn">View Full Schedule</button>
    </div>
  );
}