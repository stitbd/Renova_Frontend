// components/patient-dashboard/QuickActions.jsx
import { Calendar, Upload, Download, User, MessageSquare } from "lucide-react";

export default function QuickActions() {
  return (
    <div className="quick-actions-card">
      <h3 className="quick-actions-title">Quick Actions</h3>

      <div className="quick-actions-grid">
        {/* Book Appointment */}
        <button className="quick-action-btn">
          <span className="action-icon">
            <Calendar size={20} />
          </span>
          <span className="action-label">Book Appointment</span>
        </button>

        {/* Upload Report */}
        <button className="quick-action-btn">
          <span className="action-icon">
            <Upload size={20} />
          </span>
          <span className="action-label">Upload Report</span>
        </button>

        {/* Download Records */}
        <button className="quick-action-btn">
          <span className="action-icon">
            <Download size={20} />
          </span>
          <span className="action-label">Download Records</span>
        </button>

        {/* Contact Doctor — full width row */}
        <button className="quick-action-btn">
          <span className="action-icon">
            <MessageSquare size={20} />
          </span>
          <span className="action-label">Contact Doctor</span>
        </button>
      </div>

      {/* Health tip */}
      <div className="health-tip-card" style={{ marginTop: "14px" }}>
        <div className="health-tip-text">
          <h4>Take Care of Your Health</h4>
          <p>Stay healthy, stay happy. Regular check-ups help you live a better life.</p>
        </div>
        <div className="health-tip-icon">💙</div>
      </div>
    </div>
  );
}