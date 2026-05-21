"use client";
import { useState } from "react";

const initialProfile = {
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
  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);
  const [saved, setSaved] = useState(false);

  const handleEdit = () => { setDraft({ ...profile }); setIsEditing(true); };

  const handleSave = () => {
    setProfile({ ...draft });
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => { setDraft({ ...profile }); setIsEditing(false); };

  const set = (field) => (e) => setDraft((p) => ({ ...p, [field]: e.target.value }));

  return (
    <div className="profile-page">

      {saved && (
        <div className="success-message">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
          Profile updated successfully!
        </div>
      )}

      {/* Header card */}
      <div className="profile-header-card">
        <div className="profile-avatar-wrapper" style={{ position: "relative", display: "inline-block" }}>
          <img
            src={profile.avatar}
            alt={profile.name}
            className="profile-avatar"
            onError={(e) => { e.target.style.display = "none"; }}
            style={{ width: 80, height: 80, borderRadius: "50%", border: "3px solid #e2e8f0", objectFit: "cover" }}
          />
          {isEditing && (
            <label className="edit-avatar-btn" style={{ cursor: "pointer" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <input type="file" accept="image/*" style={{ display: "none" }} />
            </label>
          )}
        </div>

        <div className="profile-details">
          <div className="profile-name-row">
            {isEditing ? (
              <input
                className="profile-name-input"
                value={draft.name}
                onChange={set("name")}
              />
            ) : (
              <h2 className="profile-name">{profile.name}</h2>
            )}
            <span className="status-badge active">Active</span>
          </div>
          <p className="profile-id-label">Patient ID</p>
          <p className="profile-id">{profile.patientId}</p>
        </div>

        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          {isEditing ? (
            <>
              <button className="edit-profile-btn" onClick={handleSave} style={{ background: "#014fa1", color: "#fff", borderColor: "#014fa1" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Save Changes
              </button>
              <button className="edit-profile-btn" onClick={handleCancel} style={{ color: "#ef4444", borderColor: "#fca5a5" }}>
                Cancel
              </button>
            </>
          ) : (
            <button className="edit-profile-btn" onClick={handleEdit}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Info cards */}
      <div className="profile-info-grid">
        <div className="info-card">
          <h3>Personal Information</h3>

          <div className="info-field">
            <label>Full Name</label>
            {isEditing ? <input type="text" value={draft.name} onChange={set("name")} /> : <p>{profile.name}</p>}
          </div>
          <div className="info-field">
            <label>Email</label>
            {isEditing ? <input type="email" value={draft.email} onChange={set("email")} /> : <p>{profile.email}</p>}
          </div>
          <div className="info-field">
            <label>Phone</label>
            {isEditing ? <input type="tel" value={draft.phone} onChange={set("phone")} /> : <p>{profile.phone}</p>}
          </div>
          <div className="info-field">
            <label>Date of Birth</label>
            <p>{profile.dob}</p>
          </div>
          <div className="info-field">
            <label>Gender</label>
            {isEditing ? (
              <select value={draft.gender} onChange={set("gender")}>
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            ) : <p>{profile.gender}</p>}
          </div>
          <div className="info-field">
            <label>Blood Group</label>
            {isEditing ? (
              <select value={draft.bloodGroup} onChange={set("bloodGroup")}>
                {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(bg => <option key={bg}>{bg}</option>)}
              </select>
            ) : <p>{profile.bloodGroup}</p>}
          </div>
        </div>

        <div className="info-card">
          <h3>Address & Contact</h3>
          <div className="info-field full">
            <label>Address</label>
            {isEditing ? (
              <textarea value={draft.address} onChange={set("address")} rows={3} />
            ) : <p>{profile.address}</p>}
          </div>
          <div className="info-field">
            <label>Emergency Contact</label>
            {isEditing ? (
              <input type="tel" value={draft.emergencyContact} onChange={set("emergencyContact")} />
            ) : <p>{profile.emergencyContact}</p>}
          </div>

          {isEditing && (
            <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
              <button
                onClick={handleSave}
                style={{ flex: 1, padding: "10px", background: "#014fa1", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer" }}
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                style={{ flex: 1, padding: "10px", background: "#fff", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer" }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}