// components/outlet/DeviceStatus.jsx
export default function DeviceStatus({ devices }) {
    const renderIcon = (iconName) => {
      const icons = {
        checkup: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        ),
        skin: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
        ),
        bp: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        ),
        thermometer: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
          </svg>
        ),
      };
      return icons[iconName] || null;
    };
  
    return (
      <div className="device-card">
        <div className="card-header">
          <h3 className="card-title">Device Status</h3>
          <div className="card-actions">
            <a href="#" className="view-all-link">View All</a>
          </div>
        </div>
        <div className="device-list">
          {devices.map((device, index) => (
            <div key={index} className="device-item">
              <div className={`device-icon ${device.status.toLowerCase()}`}>
                {renderIcon(device.icon)}
              </div>
              <div className="device-info">
                <h4 className="device-name">{device.name}</h4>
                <p className="device-id">Device ID: {device.deviceId}</p>
              </div>
              <span className={`device-status ${device.status.toLowerCase()}`}>
                {device.status}
              </span>
            </div>
          ))}
        </div>
        <a href="#" className="manage-devices-link">
          Manage Devices
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>
      </div>
    );
  }