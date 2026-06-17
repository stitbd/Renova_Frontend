// app/patient/change-password/page.jsx
"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/hook";
import "./change-password.css";
import { Eye, EyeOff, Check, X, ArrowLeft } from "lucide-react";

const API_URL = "http://192.168.0.164:5001/api/v1/auth/change-password";

const PASSWORD_REQUIREMENTS = [
  { id: "length", label: "Minimum 6 characters", test: (v) => v.length >= 6 },
  { id: "uppercase", label: "At least 1 uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { id: "lowercase", label: "At least 1 lowercase letter", test: (v) => /[a-z]/.test(v) },
  { id: "number", label: "At least 1 number", test: (v) => /\d/.test(v) },
  { id: "special", label: "At least 1 special character", test: (v) => /[^A-Za-z0-9]/.test(v) },
];

const INITIAL_FORM_DATA = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  logoutOtherDevices: false,
};

// Adjust these field names to match whatever your auth/user slice actually stores.
function formatDateTime(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChangePasswordPage() {
  const token = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.auth.user);

  const [show, setShow] = useState({
    cur: false,
    new: false,
    conf: false,
  });

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const requirementChecks = useMemo(
    () =>
      PASSWORD_REQUIREMENTS.map((req) => ({
        ...req,
        met: req.test(formData.newPassword),
      })),
    [formData.newPassword]
  );

  const passwordStrength = useMemo(
    () => requirementChecks.filter((req) => req.met).length,
    [requirementChecks]
  );

  const hasStartedTyping = formData.newPassword.length > 0;

  const validate = () => {
    const newErrors = {};

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (passwordStrength < PASSWORD_REQUIREMENTS.length) {
      newErrors.newPassword = "Please choose a stronger password";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "New password and confirm password do not match";
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

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCancel = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setSuccess(false);
    setShow({ cur: false, new: false, conf: false });
    if (searchParams.get("from") === "profile") {
      router.push("/patient-portal/profile");
    } else {
      router.push("/patient-portal/dashboard");
    }
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
          logoutOtherDevices: formData.logoutOtherDevices,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to change password");
      }

      setSuccess(true);
      setFormData(INITIAL_FORM_DATA);
      setShow({ cur: false, new: false, conf: false });

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

  return (
    <div className="password-page">
      <div className="password-card">
        <h2 className="page-subtitle">Change Password</h2>
        <p className="page-description">
          Update your password to keep your account secure
        </p>

        {success && (
          <div className="success-message">
            <Check size={18} />
            Password updated successfully.
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
              aria-label={show.cur ? "Hide current password" : "Show current password"}
            >
              {show.cur ? <EyeOff size={18} /> : <Eye size={18} />}
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
              aria-label={show.new ? "Hide new password" : "Show new password"}
            >
              {show.new ? <EyeOff size={18} /> : <Eye size={18} />}
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

            <ul className="password-requirements" aria-live="polite">
              {requirementChecks.map((req) => {
                const state = req.met ? "met" : hasStartedTyping ? "unmet" : "pending";
                return (
                  <li key={req.id} className={state}>
                    <span className="req-icon" aria-hidden="true">
                      {state !== "pending" && (req.met ? <Check size={12} /> : <X size={12} />)}
                    </span>
                    {req.label}
                  </li>
                );
              })}
            </ul>
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
              aria-label={show.conf ? "Hide confirm password" : "Show confirm password"}
            >
              {show.conf ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="security-info">
            <h4>Security Information</h4>
            <div className="security-info-grid">
              <div className="security-info-item">
                <span className="security-info-label">Last Password Changed</span>
                <span className="security-info-value">
                  {formatDateTime(user?.passwordChangedAt)}
                </span>
              </div>
              <div className="security-info-item">
                <span className="security-info-label">Last Login</span>
                <span className="security-info-value">
                  {formatDateTime(user?.lastLoginAt)}
                </span>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>

            <button type="submit" className="btn-update-password" disabled={isLoading}>
              <Check size={16} />
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Helper functions
function getStrengthLabel() {
  const passwordStrength = this?.passwordStrength || 0;
  if (!this?.formData?.newPassword) return "";
  if (passwordStrength <= 2) return "Weak";
  if (passwordStrength === 3) return "Medium";
  return "Strong";
}

function getStrengthClass() {
  const passwordStrength = this?.passwordStrength || 0;
  if (!this?.formData?.newPassword) return "";
  if (passwordStrength <= 2) return "weak";
  if (passwordStrength === 3) return "medium";
  return "strong";
}