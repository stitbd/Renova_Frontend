// app/patient/change-password/page.jsx
"use client";

import { useMemo, useState } from "react";
import { useAppSelector } from "@/redux/hook";
import "../../../../styles/pages/patient-change-password.css"

const API_URL = "http://localhost:5001/api/v1/auth/change-password";

export default function ChangePasswordPage() {
  const token = useAppSelector((state) => state.auth.accessToken);

  const [show, setShow] = useState({
    cur: false,
    new: false,
    conf: false,
  });

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordStrength = useMemo(() => {
    let score = 0;

    if (formData.newPassword.length >= 8) score++;
    if (/[a-z]/.test(formData.newPassword)) score++;
    if (/[A-Z]/.test(formData.newPassword)) score++;
    if (/\d/.test(formData.newPassword)) score++;
    if (/[^A-Za-z0-9]/.test(formData.newPassword)) score++;

    return score;
  }, [formData.newPassword]);

  const validate = () => {
    const newErrors = {};

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (!/[a-z]/.test(formData.newPassword)) {
      newErrors.newPassword = "Password must contain at least one lowercase letter";
    } else if (!/[A-Z]/.test(formData.newPassword)) {
      newErrors.newPassword = "Password must contain at least one uppercase letter";
    } else if (!/\d/.test(formData.newPassword)) {
      newErrors.newPassword = "Password must contain at least one number";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    }

    if (
      formData.newPassword &&
      formData.confirmPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (
      formData.currentPassword &&
      formData.newPassword &&
      formData.currentPassword === formData.newPassword
    ) {
      newErrors.newPassword = "New password must be different from current password";
    }

    if (!token) {
      newErrors.api = "Authentication token not found. Please login again.";
    }

    return newErrors;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
      api: "",
    }));

    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      setErrors({});
      setSuccess(false);

      const response = await fetch(API_URL, {
        method: "POST", // change to PATCH if your backend uses PATCH
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to change password");
      }

      setSuccess(true);

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      setErrors({
        api: error.message || "Unable to update password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderEyeIcon = (visible) =>
    visible ? (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    ) : (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    );

  const getStrengthLabel = () => {
    if (!formData.newPassword) return "";
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength === 3) return "Medium";
    return "Strong";
  };

  const getStrengthClass = () => {
    if (!formData.newPassword) return "";
    if (passwordStrength <= 2) return "weak";
    if (passwordStrength === 3) return "medium";
    return "strong";
  };

  return (
    <div className="password-page">
      <div className="password-card">
        <h2 className="page-subtitle">Change Password</h2>
        <p className="page-description">
          Update your password to keep your account secure
        </p>

        {success && (
          <div className="success-message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Password updated successfully!
          </div>
        )}

        {errors.api && <div className="error-alert">{errors.api}</div>}

        <form onSubmit={handleSubmit} className="password-form">
          <div className="form-field password-input-wrap">
            <label htmlFor="currentPassword">Current Password</label>

            <input
              id="currentPassword"
              type={show.cur ? "text" : "password"}
              value={formData.currentPassword}
              onChange={(e) => handleChange("currentPassword", e.target.value)}
              className={errors.currentPassword ? "error" : ""}
              autoComplete="current-password"
              disabled={isLoading}
            />

            <button
              type="button"
              className="password-eye-btn"
              onClick={() => setShow((prev) => ({ ...prev, cur: !prev.cur }))}
              disabled={isLoading}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                {renderEyeIcon(show.cur)}
              </svg>
            </button>

            {errors.currentPassword && (
              <span className="error-message">{errors.currentPassword}</span>
            )}
          </div>

          <div className="form-field password-input-wrap">
            <label htmlFor="newPassword">New Password</label>

            <input
              id="newPassword"
              type={show.new ? "text" : "password"}
              value={formData.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
              className={errors.newPassword ? "error" : ""}
              autoComplete="new-password"
              disabled={isLoading}
            />

            <button
              type="button"
              className="password-eye-btn"
              onClick={() => setShow((prev) => ({ ...prev, new: !prev.new }))}
              disabled={isLoading}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                {renderEyeIcon(show.new)}
              </svg>
            </button>

            {errors.newPassword && (
              <span className="error-message">{errors.newPassword}</span>
            )}

            {formData.newPassword && (
              <div className={`password-strength ${getStrengthClass()}`}>
                <div className="strength-track">
                  <span />
                </div>
                <p>Password strength: {getStrengthLabel()}</p>
              </div>
            )}

            <p className="password-hint">
              Use at least 8 characters with uppercase, lowercase, and numbers.
            </p>
          </div>

          <div className="form-field password-input-wrap">
            <label htmlFor="confirmPassword">Confirm New Password</label>

            <input
              id="confirmPassword"
              type={show.conf ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              className={errors.confirmPassword ? "error" : ""}
              autoComplete="new-password"
              disabled={isLoading}
            />

            <button
              type="button"
              className="password-eye-btn"
              onClick={() => setShow((prev) => ({ ...prev, conf: !prev.conf }))}
              disabled={isLoading}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                {renderEyeIcon(show.conf)}
              </svg>
            </button>

            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="btn-update-password" disabled={isLoading}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {isLoading ? "Updating..." : "Update Password"}
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