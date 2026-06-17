import { User, ArrowRight, FileText, Calendar, Clock, DollarSign } from "lucide-react";

export default function RecentConsultations({ appointments = [] }) {

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
        <h2 className="section-title">Recent Consultations</h2>
        <a href="#" className="view-all-link">
          View All
          <ArrowRight size={16} />
        </a>
      </div>

      <div className="consultations-list">
        {appointments?.map((c, index) => {
          const patient = c?.patient;

          return (
            <div key={c?.id || index} className="consultation-item">
              <div className="consultation-avatar">
                {patient?.avatar ? (
                  <img src={patient.avatar} alt={patient?.fullName || "Patient"} />
                ) : (
                  <User size={18} />
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
                <button>
                  <FileText size={16} />
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