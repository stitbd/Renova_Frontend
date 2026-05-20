// components/doctor-dashboard/PatientQueueList.jsx
export default function PatientQueueList({ patients }) {
  return (
    <div>
      <div className="section-header-dashboard">
        <h2 className="section-title">
          New Patient Queue
          <span className="section-count-badge">{patients.length}</span>
        </h2>
        <a href="#" className="view-all-link">
          View All
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>
      </div>

      <div className="patient-queue-list">
        {patients.map((patient, index) => (
          <div key={patient.id} className="patient-queue-item">
            <span className="queue-number">{index + 1}</span>

            <div className="patient-avatar">
              {patient.avatar ? (
                <img src={patient.avatar} alt={patient.name} />
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
            </div>

            <div className="patient-info">
              <h4 className="patient-name">{patient.name}</h4>
              <p className="patient-meta">{patient.age} Years, {patient.gender}</p>
              <p className="patient-issue">{patient.issue}</p>
            </div>

            <div className="queue-time">
              <div className="queue-time-value">{patient.time}</div>
              <div className="queue-waiting">Waiting {patient.waitingTime}</div>
            </div>

            <div className="queue-actions">
              <button className="btn-queue-action btn-accept">Accept</button>
              <button className="btn-queue-action btn-reject">Reject</button>
            </div>
          </div>
        ))}
      </div>

      <button className="view-all-queue-btn">View All Queue</button>
    </div>
  );
}