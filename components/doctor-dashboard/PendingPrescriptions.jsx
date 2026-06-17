import { ArrowRight, User, FileText, Eye } from "lucide-react";

// components/doctor-dashboard/PendingPrescriptions.jsx
export default function PendingPrescriptions({ prescriptions }) {
  return (
    <div>
      <div className="section-header-dashboard">
        <h2 className="section-title">Pending Prescriptions</h2>
        <a href="#" className="view-all-link">
          View All
          <ArrowRight size={16} />
        </a>
      </div>

      <div className="prescriptions-list">
        {prescriptions.map((rx, index) => (
          <div key={index} className="prescription-item">
            <div className="prescription-avatar">
              {rx.avatar ? (
                <img src={rx.avatar} alt={rx.name} />
              ) : (
                <User size={18} />
              )}
            </div>

            <div className="prescription-info">
              <h4 className="prescription-name">{rx.name}</h4>
              <p className="prescription-time">{rx.time}</p>
              <p className="prescription-type">{rx.type}</p>
            </div>

            <span className="prescription-status">{rx.status}</span>

            <button className="prescription-action" title="View Prescription">
              <Eye size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}