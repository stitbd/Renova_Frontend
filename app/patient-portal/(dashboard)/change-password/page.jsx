// app/patient/change-password/page.jsx
"use client";

import { useState } from "react";

export default function ChangePasswordPage() {
  const [show, setShow] = useState({ cur: false, new: false, conf: false });
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.currentPassword) newErrors.currentPassword = "Current password is required";
    if (!formData.newPassword) newErrors.newPassword = "New password is required";
    if (formData.newPassword && formData.newPassword.length < 8) newErrors.newPassword = "Password must be at least 8 characters";
    if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // API call to change password
    setSuccess(true);
    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  return (
    <div className="password-page">
      <div className="password-card">
        <h2 className="page-subtitle">Change Password</h2>
        <p className="page-description">Update your password to keep your account secure</p>

        {success && (
          <div className="success-message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Password updated successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="password-form">
          {/* Current Password field — replace existing input div */}
          <div className="form-field" style={{ position: "relative" }}>
            <label>Current Password</label>
            <input
              type={show.cur ? "text" : "password"}
              value={formData.currentPassword}
              onChange={(e) => handleChange("currentPassword", e.target.value)}
              className={errors.currentPassword ? "error" : ""}
              style={{ paddingRight: 40 }}
            />
            <button
              type="button"
              onClick={() => setShow(s => ({ ...s, cur: !s.cur }))}
              style={{ position: "absolute", right: 10, top: 34, background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                {show.cur
                  ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                  : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                }
              </svg>
            </button>
            {errors.currentPassword && <span className="error-message">{errors.currentPassword}</span>}
          </div>

          <div className="form-field">
            <label>New Password</label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
              className={errors.newPassword ? "error" : ""}
            />
            {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
            <p className="password-hint">Must be at least 8 characters with letters and numbers</p>
          </div>

          <div className="form-field">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              className={errors.confirmPassword ? "error" : ""}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="btn-update-password">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Update Password
          </button>
        </form>

        <div className="password-tips">
          <h4>Password Tips:</h4>
          <ul>
            <li>Use at least 8 characters</li>
            <li>Include uppercase and lowercase letters</li>
            <li>Add numbers and special characters</li>
            <li>Avoid using personal information</li>
          </ul>
        </div>
      </div>
    </div>
  );
}