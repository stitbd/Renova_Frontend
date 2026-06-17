// components/patient-dashboard/ProfileHeader.jsx
import { Calendar, User, Droplet, Phone, Building2, Edit, Camera } from "lucide-react";

export default function ProfileHeader({ profile }) {
  return (
    <div className="profile-header-card">
      {/* Top row: avatar + name + edit button */}
      <div className="profile-main-info">
        <div className="profile-avatar-wrapper">
          <div className="profile-avatar">
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.name} onError={(e) => { e.target.style.display = "none"; }} />
            ) : (
              <User size={24} />
            )}
          </div>
          <button className="edit-avatar-btn" aria-label="Edit avatar">
            <Camera size={16} />
          </button>
        </div>

        <div className="profile-details">
          <div className="profile-name-row">
            <h2 className="profile-name">{profile.name}</h2>
            <span className="status-badge active">{profile.status}</span>
          </div>
          <div className="profile-id-label">Patient ID</div>
          <div className="profile-id">{profile.patientId}</div>
        </div>

        <button className="edit-profile-btn">
          <Edit size={16} />
          Edit Profile
        </button>
      </div>

      {/* Bottom row: info items */}
      <div className="profile-info-grid">
        <div className="info-item">
          <div className="info-icon">
            <Calendar size={18} />
          </div>
          <div className="info-content">
            <span className="info-value">{profile.age} Years</span>
            <span className="info-label">{profile.birthDate}</span>
          </div>
        </div>

        <div className="info-item">
          <div className="info-icon">
            <User size={18} />
          </div>
          <div className="info-content">
            <span className="info-value">{profile.gender}</span>
            <span className="info-label">Gender</span>
          </div>
        </div>

        <div className="info-item">
          <div className="info-icon">
            <Droplet size={18} />
          </div>
          <div className="info-content">
            <span className="info-value">{profile.bloodGroup}</span>
            <span className="info-label">Blood Group</span>
          </div>
        </div>

        <div className="info-item">
          <div className="info-icon">
            <Phone size={18} />
          </div>
          <div className="info-content">
            <span className="info-value">{profile.mobile}</span>
            <span className="info-label">Mobile</span>
          </div>
        </div>

        <div className="info-item">
          <div className="info-icon">
            <Building2 size={18} />
          </div>
          <div className="info-content">
            <span className="info-value">{profile.outlet}</span>
            <span className="info-label">Registered Outlet</span>
          </div>
        </div>
      </div>
    </div>
  );
}