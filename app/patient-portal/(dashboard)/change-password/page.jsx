// app/patient/change-password/page.jsx
"use client";

import { useState } from "react";

export default function ChangePasswordPage() {
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
          <div className="form-field">
            <label>Current Password</label>
            <input
              type="password"
              value={formData.currentPassword}
              onChange={(e) => handleChange("currentPassword", e.target.value)}
              className={errors.currentPassword ? "error" : ""}
            />
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