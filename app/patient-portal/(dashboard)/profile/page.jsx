// app/patient/profile/page.jsx
"use client";

import { useState } from "react";

const profileData = {
  name: "Md. Rakib Hasan",
  patientId: "PT-2025-000123",
  email: "rakib.hasan@email.com",
  phone: "+880 1712-345678",
  dob: "15 Jan 1993",
  gender: "Male",
  bloodGroup: "B+",
  address: "House #45, Road #12, Dhanmondi, Dhaka-1209",
  emergencyContact: "+880 1812-987654",
  avatar: "/images/patients/01.jpg",
};

export default function MyProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(profileData);

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // API call to save profile
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-header-card">
        <div className="profile-avatar-wrapper">
          <img src={profile.avatar} alt={profile.name} className="profile-avatar" />
          {isEditing && (
            <label className="edit-avatar-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <input type="file" accept="image/*" className="hidden" />
            </label>
          )}
        </div>
        <div className="profile-details">
          <div className="profile-name-row">
            {isEditing ? (
              <input
                type="text"
                className="profile-name-input"
                value={profile.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            ) : (
              <h2 className="profile-name">{profile.name}</h2>
            )}
            <span className="status-badge active">Active</span>
          </div>
          <p className="profile-id">Patient ID: {profile.patientId}</p>
          <button className="edit-profile-btn" onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>

      <div className="profile-info-grid">
        <div className="info-card">
          <h3>Personal Information</h3>
          <div className="info-field">
            <label>Email</label>
            {isEditing ? (
              <input type="email" value={profile.email} onChange={(e) => handleChange("email", e.target.value)} />
            ) : (
              <p>{profile.email}</p>
            )}
          </div>
          <div className="info-field">
            <label>Phone</label>
            {isEditing ? (
              <input type="tel" value={profile.phone} onChange={(e) => handleChange("phone", e.target.value)} />
            ) : (
              <p>{profile.phone}</p>
            )}
          </div>
          <div className="info-field">
            <label>Date of Birth</label>
            <p>{profile.dob}</p>
          </div>
          <div className="info-field">
            <label>Gender</label>
            {isEditing ? (
              <select value={profile.gender} onChange={(e) => handleChange("gender", e.target.value)}>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            ) : (
              <p>{profile.gender}</p>
            )}
          </div>
          <div className="info-field">
            <label>Blood Group</label>
            {isEditing ? (
              <select value={profile.bloodGroup} onChange={(e) => handleChange("bloodGroup", e.target.value)}>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                  <option key={bg}>{bg}</option>
                ))}
              </select>
            ) : (
              <p>{profile.bloodGroup}</p>
            )}
          </div>
        </div>

        <div className="info-card">
          <h3>Address & Contact</h3>
          <div className="info-field full">
            <label>Address</label>
            {isEditing ? (
              <textarea value={profile.address} onChange={(e) => handleChange("address", e.target.value)} rows={3} />
            ) : (
              <p>{profile.address}</p>
            )}
          </div>
          <div className="info-field">
            <label>Emergency Contact</label>
            {isEditing ? (
              <input type="tel" value={profile.emergencyContact} onChange={(e) => handleChange("emergencyContact", e.target.value)} />
            ) : (
              <p>{profile.emergencyContact}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}