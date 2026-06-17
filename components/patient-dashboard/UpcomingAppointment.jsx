// components/patient-dashboard/UpcomingAppointment.jsx
import { Clock, MapPin } from "lucide-react";

export default function UpcomingAppointment({ appointment }) {
  return (
    <div className="upcoming-appointment-card">
      <div className="appointment-header">
        <h3 className="appointment-title">Upcoming Appointment</h3>
        <a href="#" className="view-all-link">View All</a>
      </div>

      <div className="appointment-details">
        {/* Date block */}
        <div className="appointment-date">
          <span className="date-day">{appointment.date}</span>
          <span className="date-month">{appointment.month}</span>
          <span className="date-year">{appointment.year}</span>
        </div>

        {/* Info */}
        <div className="appointment-info">
          <div className="appt-top-row">
            <div className="doctor-info">
              <h4 className="doctor-name">{appointment.doctorName}</h4>
              <span className="doctor-specialty">{appointment.specialty}</span>
            </div>
            <span className="appointment-status-badge">{appointment.status}</span>
          </div>

          <div className="appointment-meta">
            <div className="meta-item">
              <Clock size={16} />
              <span>{appointment.time}</span>
            </div>
            <div className="meta-item">
              <MapPin size={16} />
              <span>{appointment.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="appointment-actions">
        <button className="btn-reschedule">Reschedule</button>
        <button className="btn-cancel">Cancel</button>
      </div>
    </div>
  );
}