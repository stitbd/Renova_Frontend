// components/doctor-dashboard/Recentappointments.jsx
import { MdInsertPageBreak } from "react-icons/md";



export default function Recentappointments({ appointments = [] }) {

  console.log('completed appointment', appointments);
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-BD", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    if (!time) return "N/A";

    return new Date(time).toLocaleTimeString("en-BD", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <div className="section-header-dashboard">
        <h2 className="section-title">Recent appointments</h2>
        <a href="#" className="view-all-link">
          View All
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>
      </div>

      <div className="appointments-list">
        {appointments?.map((c, index) => {
          const patient = c?.patient;

          return (
            <div key={c?.id || index} className="consultation-item">
              <div className="consultation-avatar">
                {patient?.avatar ? (
                  <img src={patient.avatar} alt={patient?.fullName || "Patient"} />
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )}
              </div>

              <div className="consultation-info">
                <h4 className="consultation-name">
                  {patient?.fullName || c?.name || "Unknown Patient"}
                </h4>

                <p className="consultation-condition">
                  {c?.reason || c?.condition || "Consultation"}
                </p>

                <p className="consultation-meta">
                  {patient?.age || c?.age || "N/A"} Years,{" "}
                  {patient?.gender || c?.gender || "N/A"}
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  {formatDate(c?.appointmentDate || c?.startTime || c?.date)}
                  &nbsp;&nbsp;
                  {formatTime(c?.startTime || c?.time)}
                </p>
              </div>

              <div className="consultation-details">
                <div className="consultation-fee">
                  ৳ {c?.consultationFee || c?.fee || 0}
                </div>

                <span className="consultation-status">
                  {c?.status || "Pending"}
                </span>
              </div>

              <div className="consultation-view flex flex-col justify-between " title="View Report">
                <button >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </button>
                <p className="text-sm hover:text-white ">View </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}