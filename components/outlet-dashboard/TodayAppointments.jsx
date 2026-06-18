// components/outlet/TodayAppointments.jsx
import { Clock, ArrowRight, Calendar } from "lucide-react";

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
            <span className="appointment-time">
              <Clock size={12} /> {apt.time}
            </span>
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
        <ArrowRight size={14} />
      </a>
    </div>
  );
}