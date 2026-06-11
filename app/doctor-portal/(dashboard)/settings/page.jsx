// app/doctor-portal/settings/page.jsx
"use client";

import { useState } from "react";
import "./settings.css";

// SVG Icons (same as signup form)
const Icon = {
  ID: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <rect x="1" y="3" width="14" height="10" rx="2" stroke="#94a3b8" strokeWidth="1.3" />
      <circle cx="5.5" cy="8" r="1.5" stroke="#94a3b8" strokeWidth="1.2" />
      <path d="M9 6.5h4M9 8h3M9 9.5h4" stroke="#94a3b8" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  ),
  User: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <circle cx="8" cy="5.5" r="2.5" stroke="#94a3b8" strokeWidth="1.3" />
      <path d="M2.5 14c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <path d="M5.2 2H3a1 1 0 0 0-1 1c0 5.523 4.477 10 10 10a1 1 0 0 0 1-1v-2.2a1 1 0 0 0-.684-.949l-2-.667a1 1 0 0 0-1.052.26l-.624.624A7.965 7.965 0 0 1 5.932 5.36l.624-.624a1 1 0 0 0 .26-1.052L6.15 2.684A1 1 0 0 0 5.2 2z" stroke="#94a3b8" strokeWidth="1.2" />
    </svg>
  ),
  Email: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="#94a3b8" strokeWidth="1.3" />
      <path d="M1.5 4.5L8 9l6.5-4.5" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  Calendar: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <rect x="1.5" y="3" width="13" height="11" rx="1.5" stroke="#94a3b8" strokeWidth="1.3" />
      <path d="M5 1.5v3M11 1.5v3M1.5 7h13" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  Blood: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <path d="M8 2S4 7 4 10a4 4 0 0 0 8 0C12 7 8 2 8 2z" stroke="#94a3b8" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  ),
  Globe: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <circle cx="8" cy="8" r="6" stroke="#94a3b8" strokeWidth="1.3" />
      <path d="M8 2c-2 2-2 8 0 12M8 2c2 2 2 8 0 12M2 8h12" stroke="#94a3b8" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  ),
  BMDC: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <rect x="2" y="1.5" width="12" height="13" rx="1.5" stroke="#94a3b8" strokeWidth="1.3" />
      <path d="M5 5h6M5 7.5h6M5 10h4" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  Stethoscope: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <path d="M3 2.5c0 2.5 1.5 4.5 4 4.5s4-2 4-4.5" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M7 7v3.5a2.5 2.5 0 0 0 5 0V9" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="12.5" cy="8.5" r="1" fill="#94a3b8" />
    </svg>
  ),
  Degree: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <path d="M8 2L1 6l7 4 7-4-7-4z" stroke="#94a3b8" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M4 8v3c0 1.105 1.79 2 4 2s4-.895 4-2V8" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  Clock: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <circle cx="8" cy="8" r="6" stroke="#94a3b8" strokeWidth="1.3" />
      <path d="M8 4.5V8l2.5 2" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Designation: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke="#94a3b8" strokeWidth="1.3" />
      <path d="M5 7h6M5 9.5h4" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  Taka: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <text x="3" y="13" fontFamily="serif" fontSize="12" fill="#94a3b8">৳</text>
    </svg>
  ),
  Chevron: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M4 6l4 4 4-4" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Video: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <rect x="1" y="4" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11 6.5l4-2v7l-4-2V6.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
  Audio: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M8 1.5a2.5 2.5 0 0 1 2.5 2.5v4a2.5 2.5 0 0 1-5 0V4A2.5 2.5 0 0 1 8 1.5z" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3 8a5 5 0 0 0 10 0M8 13v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  Chat: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M13.5 8.5c0 2.485-2.462 4.5-5.5 4.5a6.28 6.28 0 0 1-2.236-.407L2 13.5l1.1-2.8A4.24 4.24 0 0 1 2.5 8.5C2.5 6.015 4.962 4 8 4s5.5 2.015 5.5 4.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  ),
  Photo: () => (
    <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
      <circle cx="16" cy="14" r="6" stroke="#64748b" strokeWidth="1.5" />
      <path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  NID: () => (
    <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
      <rect x="3" y="7" width="26" height="18" rx="2" stroke="#64748b" strokeWidth="1.5" />
      <circle cx="11" cy="16" r="3" stroke="#64748b" strokeWidth="1.4" />
      <path d="M17 13h8M17 16h6M17 19h8" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  BMDCID: () => (
    <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
      <rect x="4" y="3" width="24" height="26" rx="2" stroke="#64748b" strokeWidth="1.5" />
      <path d="M9 10h14M9 14h14M9 18h10" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="22" cy="22" r="4" fill="#fff" stroke="#4caf50" strokeWidth="1.5" />
      <path d="M20 22l1.5 1.5L24 20" stroke="#4caf50" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  EduCert: () => (
    <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
      <path d="M16 4L3 11l13 7 13-7-13-7z" stroke="#64748b" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 15v6c0 2.209 4.03 4 9 4s9-1.791 9-4v-6" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  ExpCert: () => (
    <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
      <rect x="3" y="7" width="26" height="20" rx="2" stroke="#64748b" strokeWidth="1.5" />
      <path d="M10 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" stroke="#64748b" strokeWidth="1.5" />
      <path d="M9 17h14M9 21h10" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 28 28" fill="none" width="28" height="28">
      <path d="M14 3L5 7.5v6.5C5 19.7 8.9 23.7 14 25c5.1-1.3 9-5.3 9-11V7.5L14 3z" fill="#4caf50" />
      <path d="M10 14l3 3.5L18 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Settings: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0A1.65 1.65 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0A1.65 1.65 0 0 0 20.91 10H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  ),
};

// Reusable form components
function Field({ label, required, children, hint }) {
  return (
    <div className="settings-field">
      <label className="settings-label">
        {label}
        {required && <span className="required-star">*</span>}
      </label>
      {children}
      {hint && <span className="field-hint">{hint}</span>}
    </div>
  );
}

function SettingsInput({ icon: IconComp, ...props }) {
  return (
    <div className="settings-input-wrap">
      {IconComp && (
        <span className="settings-input-icon">
          <IconComp />
        </span>
      )}
      <input
        className={`settings-input${IconComp ? "" : " no-icon"}`}
        {...props}
      />
    </div>
  );
}

function SettingsSelect({ icon: IconComp, children, ...props }) {
  return (
    <div className="settings-input-wrap">
      {IconComp && (
        <span className="settings-input-icon">
          <IconComp />
        </span>
      )}
      <select className="settings-select" {...props}>
        {children}
      </select>
      <span className="settings-select-chevron">
        <Icon.Chevron />
      </span>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  // Profile state - ALL fields from signup form
  const [profile, setProfile] = useState({
    // Personal Information
    doctorId: "DR-2025-000123",
    fullName: "Dr. Tasnim Farin",
    fatherHusbandName: "Md. Abdul Farin",
    mobile: "+880 1712-345678",
    email: "tasnim.farin@renovalife.com",
    dateOfBirth: "1985-03-15",
    gender: "Female",
    bloodGroup: "O+",
    nationality: "BD",

    // Professional Information
    bmdcNumber: "BMDC-12345",
    specialization: "Cardiology",
    subSpecialization: "Interventional Cardiology",
    qualification: "MBBS, FCPS (Cardiology)",
    experience: "12",
    currentDesignation: "Senior Cardiologist",

    // Work & Availability
    consultationType: "video",
    workSchedule: "Evening (2pm – 8pm)",
    consultationFee: "500",
    currency: "৳",

    // Documents (file names/URLs)
    profilePhoto: "/images/doctors/doctor-2.jpg",
    nidPassport: "",
    bmdcCertificate: "",
    educationalCertificate: "",
    experienceCertificate: "",

    // Account
    bio: "Board-certified cardiologist with 12+ years of experience in cardiovascular care.",
    avatar: "/images/doctors/doctor-2.jpg"
  });

  // Account settings (separate from profile)
  const [account, setAccount] = useState({
    email: "tasnim.farin@renovalife.com",
    phone: "+880 1712-345678",
    twoFactor: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true
  });

  // Chamber settings
  const [chamber, setChamber] = useState({
    name: "Renova Life Care - Dhanmondi",
    address: "House #45, Road #12, Dhanmondi, Dhaka-1209",
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: "patients",
    showContactInfo: true,
    showSchedule: true,
    allowOnlineBooking: true,
    dataSharing: false
  });

  // Handlers
  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleAccountChange = (field, value) => {
    setAccount(prev => ({ ...prev, [field]: value }));
  };

  const handleChamberChange = (field, value) => {
    setChamber(prev => ({ ...prev, [field]: value }));
  };

  const handlePrivacyChange = (field, value) => {
    setPrivacy(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field) => {
    // Handle file upload logic here
    console.log(`Upload triggered for ${field}`);
  };

  const handleSave = () => {
    // API call to save all settings would go here
    setIsEditing(false);
    // Show success toast
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <Icon.User /> },
    { id: "account", label: "Account", icon: <Icon.Settings /> },
    { id: "chamber", label: "Chamber", icon: <Icon.Calendar /> },
    { id: "privacy", label: "Privacy", icon: <Icon.Shield /> },
  ];

  const specializationOptions = [
    "Cardiology", "Dermatology", "ENT", "General Medicine",
    "Gynecology", "Neurology", "Orthopedics", "Pediatrics",
    "Psychiatry", "Surgery",
  ];

  const bloodGroups = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];

  const workSchedules = [
    "Morning (8am – 2pm)",
    "Evening (2pm – 8pm)",
    "Full Day (8am – 8pm)",
    "Night (8pm – 8am)",
    "Flexible"
  ];

  return (
    <div className="dashboard-content">
      <div className="settings-layout">
        {/* Settings Sidebar/Tabs */}
        <aside className="settings-sidebar">
          <nav className="settings-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`settings-nav-item ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="settings-nav-icon">{tab.icon}</span>
                <span className="settings-nav-label">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Settings Content */}
        <div className="settings-content">

          {/* ========== PROFILE TAB (All Signup Fields) ========== */}
          {activeTab === "profile" && (
            <div className="settings-section">
              <div className="section-header">
                <h2 className="section-title">Profile Information</h2>
                <button
                  className={`btn-edit ${isEditing ? "btn-save" : ""}`}
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </button>
              </div>

              {/* Profile Header with Avatar */}
              <div className="profile-header-card">
                <div className="profile-avatar-large">
                  <img src={profile.avatar} alt={profile.fullName} className="avatar-img" />
                  {isEditing && (
                    <label className="avatar-change-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <input type="file" accept="image/*" className="hidden" onChange={() => handleFileUpload("avatar")} />
                    </label>
                  )}
                </div>
                <div className="profile-name-display">
                  <h3>{profile.fullName}</h3>
                  <p className="profile-id">ID: {profile.doctorId}</p>
                </div>
              </div>

              {/* Personal Information Section */}
              <h4 className="settings-subsection-title">Personal Information</h4>

              <div className="settings-form-grid">
                <Field label="Doctor ID">
                  <SettingsInput icon={Icon.ID} value={profile.doctorId} disabled readOnly />
                </Field>

                <Field label="Full Name" required>
                  {isEditing ? (
                    <SettingsInput
                      icon={Icon.User}
                      type="text"
                      value={profile.fullName}
                      onChange={(e) => handleProfileChange("fullName", e.target.value)}
                      placeholder="Enter full name"
                    />
                  ) : (
                    <p className="settings-value">{profile.fullName}</p>
                  )}
                </Field>

                <Field label="Father's / Husband's Name">
                  {isEditing ? (
                    <SettingsInput
                      icon={Icon.User}
                      type="text"
                      value={profile.fatherHusbandName}
                      onChange={(e) => handleProfileChange("fatherHusbandName", e.target.value)}
                      placeholder="Enter name"
                    />
                  ) : (
                    <p className="settings-value">{profile.fatherHusbandName}</p>
                  )}
                </Field>

                <Field label="Mobile Number" required hint="Verified">
                  <div className="settings-input-with-btn">
                    {isEditing ? (
                      <SettingsInput
                        icon={Icon.Phone}
                        type="tel"
                        value={profile.mobile}
                        onChange={(e) => handleProfileChange("mobile", e.target.value)}
                        placeholder="Enter mobile"
                      />
                    ) : (
                      <p className="settings-value">{profile.mobile}</p>
                    )}
                    {isEditing && (
                      <button type="button" className="settings-btn-small">Send OTP</button>
                    )}
                  </div>
                </Field>

                <Field label="Email Address" required>
                  {isEditing ? (
                    <SettingsInput
                      icon={Icon.Email}
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleProfileChange("email", e.target.value)}
                      placeholder="Enter email"
                    />
                  ) : (
                    <p className="settings-value">{profile.email}</p>
                  )}
                </Field>

                <Field label="Date of Birth" required>
                  {isEditing ? (
                    <SettingsInput
                      icon={Icon.Calendar}
                      type="date"
                      value={profile.dateOfBirth}
                      onChange={(e) => handleProfileChange("dateOfBirth", e.target.value)}
                    />
                  ) : (
                    <p className="settings-value">{profile.dateOfBirth}</p>
                  )}
                </Field>

                <Field label="Gender" required>
                  {isEditing ? (
                    <SettingsSelect
                      icon={Icon.User}
                      value={profile.gender}
                      onChange={(e) => handleProfileChange("gender", e.target.value)}
                    >
                      <option value="">Select gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </SettingsSelect>
                  ) : (
                    <p className="settings-value">{profile.gender}</p>
                  )}
                </Field>

                <Field label="Blood Group">
                  {isEditing ? (
                    <SettingsSelect
                      icon={Icon.Blood}
                      value={profile.bloodGroup}
                      onChange={(e) => handleProfileChange("bloodGroup", e.target.value)}
                    >
                      <option value="">Select blood group</option>
                      {bloodGroups.map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </SettingsSelect>
                  ) : (
                    <p className="settings-value">{profile.bloodGroup}</p>
                  )}
                </Field>

                <Field label="Nationality">
                  {isEditing ? (
                    <SettingsSelect
                      icon={Icon.Globe}
                      value={profile.nationality}
                      onChange={(e) => handleProfileChange("nationality", e.target.value)}
                    >
                      <option value="">Select nationality</option>
                      <option value="BD">Bangladeshi</option>
                      <option value="other">Other</option>
                    </SettingsSelect>
                  ) : (
                    <p className="settings-value">{profile.nationality === "BD" ? "Bangladeshi" : "Other"}</p>
                  )}
                </Field>
              </div>

              {/* Professional Information Section */}
              <h4 className="settings-subsection-title">Professional Information</h4>

              <div className="settings-form-grid">
                <Field label="BMDC / Registration Number" required>
                  {isEditing ? (
                    <SettingsInput
                      icon={Icon.BMDC}
                      type="text"
                      value={profile.bmdcNumber}
                      onChange={(e) => handleProfileChange("bmdcNumber", e.target.value)}
                      placeholder="Enter BMDC number"
                    />
                  ) : (
                    <p className="settings-value">{profile.bmdcNumber}</p>
                  )}
                </Field>

                <Field label="Specialization" required>
                  {isEditing ? (
                    <SettingsSelect
                      icon={Icon.Stethoscope}
                      value={profile.specialization}
                      onChange={(e) => handleProfileChange("specialization", e.target.value)}
                    >
                      <option value="">Select specialization</option>
                      {specializationOptions.map((spec) => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </SettingsSelect>
                  ) : (
                    <p className="settings-value">{profile.specialization}</p>
                  )}
                </Field>

                <Field label="Sub Specialization">
                  {isEditing ? (
                    <SettingsSelect
                      icon={Icon.Stethoscope}
                      value={profile.subSpecialization}
                      onChange={(e) => handleProfileChange("subSpecialization", e.target.value)}
                    >
                      <option value="">Select sub specialization</option>
                      <option>Interventional Cardiology</option>
                      <option>Pediatric Surgery</option>
                      <option>Spine Surgery</option>
                    </SettingsSelect>
                  ) : (
                    <p className="settings-value">{profile.subSpecialization || "—"}</p>
                  )}
                </Field>

                <Field label="Qualification" required>
                  {isEditing ? (
                    <SettingsInput
                      icon={Icon.Degree}
                      type="text"
                      value={profile.qualification}
                      onChange={(e) => handleProfileChange("qualification", e.target.value)}
                      placeholder="Enter qualification"
                    />
                  ) : (
                    <p className="settings-value">{profile.qualification}</p>
                  )}
                </Field>

                <Field label="Experience" required>
                  {isEditing ? (
                    <div className="settings-input-with-suffix">
                      <SettingsInput
                        icon={Icon.Clock}
                        type="number"
                        min="0"
                        value={profile.experience}
                        onChange={(e) => handleProfileChange("experience", e.target.value)}
                        placeholder="Years"
                      />
                      <span className="input-suffix">Years</span>
                    </div>
                  ) : (
                    <p className="settings-value">{profile.experience} Years</p>
                  )}
                </Field>

                <Field label="Current Designation">
                  {isEditing ? (
                    <SettingsInput
                      icon={Icon.Designation}
                      type="text"
                      value={profile.currentDesignation}
                      onChange={(e) => handleProfileChange("currentDesignation", e.target.value)}
                      placeholder="Enter designation"
                    />
                  ) : (
                    <p className="settings-value">{profile.currentDesignation}</p>
                  )}
                </Field>
              </div>

              {/* Work & Availability Section */}
              <h4 className="settings-subsection-title">Work & Availability</h4>

              <div className="settings-form-grid">
                <Field label="Consultation Type" required>
                  {isEditing ? (
                    <div className="consult-type-selector">
                      {[
                        { id: "video", label: "Video Call", Ic: Icon.Video },
                        { id: "audio", label: "Audio Call", Ic: Icon.Audio },
                        { id: "chat", label: "Chat Only", Ic: Icon.Chat },
                      ].map(({ id, label, Ic }) => (
                        <button
                          key={id}
                          type="button"
                          className={`consult-type-btn${profile.consultationType === id ? " active" : ""}`}
                          onClick={() => handleProfileChange("consultationType", id)}
                        >
                          <Ic /> {label}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="settings-value capitalize">
                      {profile.consultationType === "video" ? "Video Call" :
                        profile.consultationType === "audio" ? "Audio Call" : "Chat Only"}
                    </p>
                  )}
                </Field>

                <Field label="Work Schedule" required>
                  {isEditing ? (
                    <SettingsSelect
                      icon={Icon.Calendar}
                      value={profile.workSchedule}
                      onChange={(e) => handleProfileChange("workSchedule", e.target.value)}
                    >
                      <option value="">Select schedule</option>
                      {workSchedules.map((ws) => (
                        <option key={ws} value={ws}>{ws}</option>
                      ))}
                    </SettingsSelect>
                  ) : (
                    <p className="settings-value">{profile.workSchedule}</p>
                  )}
                </Field>

                <Field label="Consultation Fee" required>
                  {isEditing ? (
                    <div className="settings-input-with-prefix">
                      <span className="currency-prefix">{profile.currency}</span>
                      <SettingsInput
                        type="number"
                        min="0"
                        value={profile.consultationFee}
                        onChange={(e) => handleProfileChange("consultationFee", e.target.value)}
                        placeholder="Enter fee"
                      />
                    </div>
                  ) : (
                    <p className="settings-value">{profile.currency} {profile.consultationFee}</p>
                  )}
                </Field>
              </div>

              {/* Documents Upload Section */}
              <h4 className="settings-subsection-title">Documents</h4>

              <div className="documents-grid">
                {[
                  { Ic: Icon.Photo, title: "Profile Photo", required: true, hint: "JPG, PNG (Max 2MB)", field: "profilePhoto", btn: "Change Photo" },
                  { Ic: Icon.NID, title: "NID / Passport", required: true, hint: "JPG, PNG (Max 2MB)", field: "nidPassport", btn: "Upload Document" },
                  { Ic: Icon.BMDCID, title: "BMDC Certificate", required: true, hint: "JPG, PNG, PDF (Max 2MB)", field: "bmdcCertificate", btn: "Upload Document" },
                  { Ic: Icon.EduCert, title: "Educational Certificate", required: false, hint: "JPG, PNG, PDF (Max 2MB)", field: "educationalCertificate", btn: "Upload Document" },
                  { Ic: Icon.ExpCert, title: "Experience Certificate", required: false, hint: "JPG, PNG, PDF (Max 2MB)", field: "experienceCertificate", btn: "Upload Document" },
                ].map(({ Ic, title, required, hint, field, btn }) => (
                  <div key={field} className="document-card">
                    <div className="document-icon">
                      <Ic />
                    </div>
                    <div className="document-info">
                      <p className="document-title">
                        {title}
                        {required && <span className="required-star">*</span>}
                      </p>
                      <p className="document-hint">{hint}</p>
                      {profile[field] && !isEditing && (
                        <p className="document-status uploaded">✓ Uploaded</p>
                      )}
                    </div>
                    {isEditing && (
                      <button
                        type="button"
                        className="document-upload-btn"
                        onClick={() => handleFileUpload(field)}
                      >
                        {btn}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Verification Banner */}
              <div className="verification-banner">
                <div className="verification-icon">
                  <Icon.Shield />
                </div>
                <div className="verification-text">
                  <h4>Your information is secure</h4>
                  <p>All documents are encrypted and reviewed by our verification team.</p>
                </div>
              </div>

              {/* Bio Field */}
              <Field label="Bio / About">
                {isEditing ? (
                  <textarea
                    className="settings-textarea"
                    value={profile.bio}
                    onChange={(e) => handleProfileChange("bio", e.target.value)}
                    rows={4}
                    placeholder="Tell patients about your expertise..."
                  />
                ) : (
                  <p className="settings-value">{profile.bio}</p>
                )}
              </Field>
            </div>
          )}

          {/* ========== ACCOUNT TAB ========== */}
          {activeTab === "account" && (
            <div className="settings-section">
              <div className="section-header">
                <h2 className="section-title">Account Settings</h2>
                <button
                  className={`btn-edit ${isEditing ? "btn-save" : ""}`}
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>

              <div className="account-settings">
                <div className="settings-group">
                  <h3 className="group-title">Contact Information</h3>

                  <div className="form-row">
                    <label className="form-label">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        className="form-input"
                        value={account.email}
                        onChange={(e) => handleAccountChange("email", e.target.value)}
                      />
                    ) : (
                      <p className="form-value">{account.email}</p>
                    )}
                  </div>

                  <div className="form-row">
                    <label className="form-label">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        className="form-input"
                        value={account.phone}
                        onChange={(e) => handleAccountChange("phone", e.target.value)}
                      />
                    ) : (
                      <p className="form-value">{account.phone}</p>
                    )}
                  </div>
                </div>

                <div className="settings-group">
                  <h3 className="group-title">Security</h3>

                  <div className="form-row">
                    <label className="form-label">Password</label>
                    <button className="btn-link">Change Password</button>
                  </div>

                  <div className="form-row toggle-row">
                    <div>
                      <label className="form-label">Two-Factor Authentication</label>
                      <p className="form-hint">Add an extra layer of security</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={account.twoFactor}
                        onChange={(e) => handleAccountChange("twoFactor", e.target.checked)}
                        disabled={!isEditing}
                      />
                      <span className="toggle-slider" />
                    </label>
                  </div>
                </div>

                <div className="settings-group">
                  <h3 className="group-title">Notifications</h3>

                  <div className="form-row toggle-row">
                    <div>
                      <label className="form-label">Email Notifications</label>
                      <p className="form-hint">Receive updates via email</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={account.emailNotifications}
                        onChange={(e) => handleAccountChange("emailNotifications", e.target.checked)}
                        disabled={!isEditing}
                      />
                      <span className="toggle-slider" />
                    </label>
                  </div>

                  <div className="form-row toggle-row">
                    <div>
                      <label className="form-label">SMS Notifications</label>
                      <p className="form-hint">Receive text message alerts</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={account.smsNotifications}
                        onChange={(e) => handleAccountChange("smsNotifications", e.target.checked)}
                        disabled={!isEditing}
                      />
                      <span className="toggle-slider" />
                    </label>
                  </div>

                  <div className="form-row toggle-row">
                    <div>
                      <label className="form-label">Push Notifications</label>
                      <p className="form-hint">Browser/app push notifications</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={account.pushNotifications}
                        onChange={(e) => handleAccountChange("pushNotifications", e.target.checked)}
                        disabled={!isEditing}
                      />
                      <span className="toggle-slider" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========== CHAMBER TAB ========== */}
          {activeTab === "chamber" && (
            <div className="settings-section">
              <div className="section-header">
                <h2 className="section-title">Chamber Settings</h2>
                <button
                  className={`btn-edit ${isEditing ? "btn-save" : ""}`}
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>

              <div className="chamber-settings">
                <div className="settings-group">
                  <h3 className="group-title">Chamber Information</h3>

                  <div className="form-row">
                    <label className="form-label">Chamber Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-input"
                        value={chamber.name}
                        onChange={(e) => handleChamberChange("name", e.target.value)}
                      />
                    ) : (
                      <p className="form-value">{chamber.name}</p>
                    )}
                  </div>

                  <div className="form-row full-width">
                    <label className="form-label">Address</label>
                    {isEditing ? (
                      <textarea
                        className="form-textarea"
                        value={chamber.address}
                        onChange={(e) => handleChamberChange("address", e.target.value)}
                        rows={2}
                      />
                    ) : (
                      <p className="form-value">{chamber.address}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========== PRIVACY TAB ========== */}
          {activeTab === "privacy" && (
            <div className="settings-section">
              <div className="section-header">
                <h2 className="section-title">Privacy & Visibility</h2>
                <button
                  className={`btn-edit ${isEditing ? "btn-save" : ""}`}
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>

              <div className="privacy-settings">
                <div className="settings-group">
                  <h3 className="group-title">Profile Visibility</h3>

                  <div className="form-row">
                    <label className="form-label">Who can see your profile</label>
                    {isEditing ? (
                      <select
                        className="form-select"
                        value={privacy.profileVisibility}
                        onChange={(e) => handlePrivacyChange("profileVisibility", e.target.value)}
                      >
                        <option value="public">Public - Anyone</option>
                        <option value="patients">Registered Patients Only</option>
                        <option value="private">Private - Only You</option>
                      </select>
                    ) : (
                      <p className="form-value capitalize">
                        {privacy.profileVisibility === "public" ? "Public" :
                          privacy.profileVisibility === "patients" ? "Registered Patients" : "Private"}
                      </p>
                    )}
                  </div>
                </div>

                <div className="settings-group">
                  <h3 className="group-title">Information Sharing</h3>

                  <div className="form-row toggle-row">
                    <div>
                      <label className="form-label">Show Contact Information</label>
                      <p className="form-hint">Display phone/email on public profile</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={privacy.showContactInfo}
                        onChange={(e) => handlePrivacyChange("showContactInfo", e.target.checked)}
                        disabled={!isEditing}
                      />
                      <span className="toggle-slider" />
                    </label>
                  </div>

                  <div className="form-row toggle-row">
                    <div>
                      <label className="form-label">Show Schedule Publicly</label>
                      <p className="form-hint">Let patients see your available hours</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={privacy.showSchedule}
                        onChange={(e) => handlePrivacyChange("showSchedule", e.target.checked)}
                        disabled={!isEditing}
                      />
                      <span className="toggle-slider" />
                    </label>
                  </div>

                  <div className="form-row toggle-row">
                    <div>
                      <label className="form-label">Allow Online Booking</label>
                      <p className="form-hint">Patients can book appointments online</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={privacy.allowOnlineBooking}
                        onChange={(e) => handlePrivacyChange("allowOnlineBooking", e.target.checked)}
                        disabled={!isEditing}
                      />
                      <span className="toggle-slider" />
                    </label>
                  </div>
                </div>

                <div className="settings-group danger-zone">
                  <h3 className="group-title danger">Danger Zone</h3>
                  <p className="group-description">Once you delete your account, there is no going back.</p>
                  <button className="btn-danger">Delete Account</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}