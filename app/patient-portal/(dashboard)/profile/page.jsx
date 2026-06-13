// app/patient/profile/page.jsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import "./patient-profile.css";

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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
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
    <motion.div
      className="profile-page"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <AnimatePresence>
        {saved && (
          <motion.div
            className="success-message"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
            >
              <polyline points="20 6 9 17 4 12" />
            </motion.svg>
            Profile updated successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header card */}
      <motion.div className="profile-header-card" variants={item}>
        <motion.div
          className="profile-avatar-wrapper"
          style={{ position: "relative", display: "inline-block" }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img
            src={profile.avatar}
            alt={profile.name}
            className="profile-avatar"
            onError={(e) => { e.target.style.display = "none"; }}
            style={{ width: 80, height: 80, borderRadius: "50%", border: "3px solid #e2e8f0", objectFit: "cover" }}
          />
          {isEditing && (
            <motion.label
              className="edit-avatar-btn"
              style={{ cursor: "pointer" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <input type="file" accept="image/*" style={{ display: "none" }} />
            </motion.label>
          )}
        </motion.div>

        <div className="profile-details">
          <div className="profile-name-row">
            {isEditing ? (
              <motion.input
                className="profile-name-input"
                value={draft.name}
                onChange={set("name")}
                whileFocus={{ borderColor: "#014fa1", boxShadow: "0 0 0 3px rgba(1,79,161,0.1)" }}
              />
            ) : (
              <motion.h2
                className="profile-name"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {profile.name}
              </motion.h2>
            )}
            <motion.span
              className="status-badge active"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
            >
              Active
            </motion.span>
          </div>
          <p className="profile-id-label">Patient ID</p>
          <motion.p
            className="profile-id"
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            transition={{ duration: 0.4 }}
          >
            {profile.patientId}
          </motion.p>
        </div>

        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          {isEditing ? (
            <>
              <motion.button
                className="edit-profile-btn"
                onClick={handleSave}
                style={{ background: "#014fa1", color: "#fff", borderColor: "#014fa1" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                Save Changes
              </motion.button>
              <motion.button
                className="edit-profile-btn"
                onClick={handleCancel}
                style={{ color: "#ef4444", borderColor: "#fca5a5" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
            </>
          ) : (
            <motion.button
              className="edit-profile-btn"
              onClick={handleEdit}
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit Profile
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Info cards */}
      <motion.div
        className="profile-info-grid"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="info-card" variants={item}>
          <motion.h3
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Personal Information
          </motion.h3>

          {[
            { label: "Full Name", key: "name", type: "text" },
            { label: "Email", key: "email", type: "email" },
            { label: "Phone", key: "phone", type: "tel" },
            { label: "Date of Birth", key: "dob", type: "text", disabled: true },
            { label: "Gender", key: "gender", type: "select", options: ["Male", "Female", "Other"] },
            { label: "Blood Group", key: "bloodGroup", type: "select", options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
          ].map((field, i) => (
            <motion.div
              key={field.key}
              className="info-field"
              variants={item}
              whileHover={{ backgroundColor: "#f8fafc" }}
            >
              <label>{field.label}</label>
              {isEditing && !field.disabled ? (
                field.type === "select" ? (
                  <motion.select
                    value={draft[field.key]}
                    onChange={set(field.key)}
                    whileFocus={{ borderColor: "#014fa1" }}
                  >
                    {field.options.map(opt => <option key={opt}>{opt}</option>)}
                  </motion.select>
                ) : (
                  <motion.input
                    type={field.type}
                    value={draft[field.key]}
                    onChange={set(field.key)}
                    whileFocus={{ borderColor: "#014fa1", boxShadow: "0 0 0 3px rgba(1,79,161,0.1)" }}
                  />
                )
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  {profile[field.key]}
                </motion.p>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="info-card" variants={item}>
          <motion.h3
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Address & Contact
          </motion.h3>

          <motion.div
            className="info-field full"
            variants={item}
            whileHover={{ backgroundColor: "#f8fafc" }}
          >
            <label>Address</label>
            {isEditing ? (
              <motion.textarea
                value={draft.address}
                onChange={set("address")}
                rows={3}
                whileFocus={{ borderColor: "#014fa1" }}
              />
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {profile.address}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            className="info-field"
            variants={item}
            whileHover={{ backgroundColor: "#f8fafc" }}
          >
            <label>Emergency Contact</label>
            {isEditing ? (
              <motion.input
                type="tel"
                value={draft.emergencyContact}
                onChange={set("emergencyContact")}
                whileFocus={{ borderColor: "#014fa1" }}
              />
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {profile.emergencyContact}
              </motion.p>
            )}
          </motion.div>

          {isEditing && (
            <motion.div
              style={{ marginTop: 16, display: "flex", gap: 8 }}
              variants={item}
            >
              <motion.button
                onClick={handleSave}
                style={{ flex: 1, padding: "10px", background: "#014fa1", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Save Changes
              </motion.button>
              <motion.button
                onClick={handleCancel}
                style={{ flex: 1, padding: "10px", background: "#fff", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}