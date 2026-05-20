// components/patient/UpcomingAppointment.jsx
export default function UpcomingAppointment({ appointment }) {
    return (
      <div className="upcoming-appointment-card">
        <div className="appointment-header">
          <h3 className="appointment-title">Upcoming Appointment</h3>
          <a href="#" className="view-all-link">View All</a>
        </div>
  
        <div className="appointment-details">
          <div className="appointment-date">
            <span className="date-day">{appointment.date}</span>
            <span className="date-month">{appointment.month}</span>
            <span className="date-year">{appointment.year}</span>
          </div>
  
          <div className="appointment-info">
            <div className="doctor-info">
              <h4 className="doctor-name">{appointment.doctorName}</h4>
              <span className="doctor-specialty">{appointment.specialty}</span>
            </div>
            
            <div className="appointment-meta">
              <div className="meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{appointment.time}</span>
              </div>
              <div className="meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{appointment.location}</span>
              </div>
            </div>
  
            <span className={`appointment-status ${appointment.status.toLowerCase()}`}>
              {appointment.status}
            </span>
          </div>
        </div>
  
        <div className="appointment-actions">
          <button className="btn-reschedule">Reschedule</button>
          <button className="btn-cancel">Cancel</button>
        </div>
      </div>
    );
  }