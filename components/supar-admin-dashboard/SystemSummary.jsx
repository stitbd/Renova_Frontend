// components/admin/SystemSummary.jsx
export default function SystemSummary({ data }) {
    return (
      <div className="system-card">
        <h3 className="card-title">System Summary</h3>
        <div className="system-list">
          <div className="system-item">
            <div className="system-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <span className="system-label">System Status</span>
            <span className={`system-status ${data.systemStatus.toLowerCase()}`}>
              <span className="status-dot" />
              {data.systemStatus}
            </span>
          </div>
  
          <div className="system-item">
            <div className="system-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
            </div>
            <span className="system-label">Database</span>
            <span className={`system-status ${data.database.toLowerCase()}`}>
              <span className="status-dot" />
              {data.database}
            </span>
          </div>
  
          <div className="system-item">
            <div className="system-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <span className="system-label">Storage Used</span>
            <div className="storage-bar-wrapper">
              <div className="storage-bar">
                <div className="storage-fill" style={{ width: `${data.storageUsed}%` }} />
              </div>
              <span className="storage-value">{data.storageUsed}%</span>
            </div>
          </div>
  
          <div className="system-item">
            <div className="system-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <span className="system-label">Active Users</span>
            <span className="system-value">{data.activeUsers}</span>
          </div>
  
          <div className="system-item">
            <div className="system-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <span className="system-label">Backup Status</span>
            <span className={`system-status ${data.backupStatus.toLowerCase()}`}>
              <span className="status-dot" />
              {data.backupStatus}
            </span>
          </div>
        </div>
      </div>
    );
  }