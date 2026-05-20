// components/outlet/TodayAppointments.jsx
export default function TodayAppointments({ appointments }) {
    const getStatusClass = (status) => {
      switch (status.toLowerCase()) {
        case 'completed':
          return 'completed';
        case 'ongoing':
          return 'ongoing';
        case 'upcoming':
          return 'upcoming';
        default:
          return '';
      }
    };
  
    return (
      <div className="appointments-card">
        <div className="card-header">
          <h3 className="card-title">Today's Appointments</h3>
          <a href="#" className="view-calendar-link">View Calendar</a>
        </div>
        <div className="appointments-list">
          {appointments.map((apt, index) => (
            <div key={index} className="appointment-item">
              <span className="appointment-time">{apt.time}</span>
              <div className="appointment-dot" />
              <div className="appointment-info">
                <h4 className="appointment-patient">{apt.patient}</h4>
                <p className="appointment-service">{apt.service}</p>
              </div>
              <span className={`appointment-status ${getStatusClass(apt.status)}`}>
                {apt.status}
              </span>
            </div>
          ))}
        </div>
        <a href="#" className="view-all-appointments-link">
          View All Appointments
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>
      </div>
    );
  }