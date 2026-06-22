import { useRouter } from "next/navigation";
<<<<<<< HEAD:components/doctor-dashboard/AppointmentsList.jsx
import { ArrowRight, Clock, Calendar, User } from "lucide-react";
=======
import "../../styles/pages/TodayAppointmentList.css"
>>>>>>> a6e516a82a33d49d7708a2eb578dcda2ef8e9d44:components/doctor-dashboard/TodayAppointmentsList.jsx

// components/doctor-dashboard/AppointmentsList.jsx
export default function TodayAppointmentsList({ appointments }) {
  const router = useRouter()
  return (
    <div>
      <div className="section-header-dashboard">
        <h2 className="section-title">Today's Appointments</h2>
        <a href="#" onClick={() => router.push('/doctor-portal/appointments')} className="view-all-link">
          View All
          <ArrowRight size={16} />
        </a>
      </div>

      <div className="appointments-list">
        {appointments?.map((apt, index) => (
          <div key={index} className="appointment-item">
            <div className="appointment-time">
              {new Date(apt?.startTime || apt?.time).toLocaleTimeString("en-BD", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="appointment-info">
              <h4 className="appointment-name">{apt?.patient?.fullName}</h4>
              <p className="appointment-type">{apt.type}</p>
            </div>
            <span
              className={`rounded-full px-2 py-1 text-[11px] font-medium ${apt?.status?.toLowerCase() === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : apt?.status?.toLowerCase() === "confirmed"
                  ? "bg-green-100 text-green-700"
                  : apt?.status?.toLowerCase() === "cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
            >
              {apt?.status}
            </span>
          </div>
        ))}
      </div>

      <button onClick={() => router.push("/doctor-portal/appointments")} className="view-full-schedule-btn">View Full Schedule</button>
    </div>
  );
}