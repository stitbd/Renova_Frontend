// components/outlet/DeviceStatus.jsx
import { Activity, Heart, Thermometer, Monitor, Wifi, WifiOff, ArrowRight } from "lucide-react";

export default function DeviceStatus({ devices }) {
  const renderIcon = (iconName) => {
    const icons = {
      checkup: Monitor,
      skin: Activity,
      bp: Heart,
      thermometer: Thermometer,
    };
    const IconComponent = icons[iconName] || Monitor;
    return <IconComponent size={16} />;
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
              {device.status === "Online" ? <Wifi size={12} /> : <WifiOff size={12} />}
              {device.status}
            </span>
          </div>
        ))}
      </div>
      <a href="#" className="manage-devices-link">
        Manage Devices
        <ArrowRight size={14} />
      </a>
    </div>
  );
}