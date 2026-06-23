// src/app/supar-admin-panel/supar-admin-signin/SuperAdminPortalForm.jsx
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import "./supar-admin-signin.css";
// 🔽 UPDATED: Added Eye and EyeOff icons for password toggle
import { User, Lock, Shield, LogIn, RefreshCw, KeyRound, Eye, EyeOff } from "lucide-react";

export default function SuperAdminPortalForm() {
  const router = useRouter();
  const [outletId, setOutletId] = useState(""); // Kept variable name as requested
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // 🔽 ADDED: State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    if (!outletId.trim() || !password.trim()) {
      setError("Please enter both Super Admin ID and password");
      return;
    }

    try {
      console.log("Super Admin signing in with:", { outletId, password });
      router.push("/supar-admin-panel/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  const handleReset = () => {
    setOutletId("");
    setPassword("");
    setError("");
  };

  return (
    // 🔽 UPDATED: Changed class names from outlet-portal to super-admin-portal
    <div className="super-admin-portal-container">
      {/* Background Image */}
      <div className="super-admin-portal__background">
        <Image
          src="/images/obg-login.jpg"
          alt="Compassionate care at Renova Life Care"
          fill
          className="object-cover"
          priority
        />
        <div className="super-admin-portal__overlay" />
      </div>

      {/* Login Card */}
      <div className="super-admin-portal__card">
        <div className="super-admin-portal__logo-section">
          <div className="super-admin-portal__logos">
            <Image
              src="/images/logo2.png"
              alt="Renova Life Care Logo"
              width={160}
              height={60}
              className="super-admin-portal__logo"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <div className="super-admin-portal__header">
          {/* 🔽 ADDED: Badge component matching Doctor Portal */}
          <div className="super-admin-portal__badge">
            <Shield size={12} />
            <span>Super Admin Portal</span>
          </div>
          {/* 🔽 UPDATED: Title text to match Doctor Portal structure */}
          <h1 className="super-admin-portal__title">Welcome back</h1>
          <p className="super-admin-portal__subtitle">Sign in to access your super admin dashboard</p>
        </div>

        {error && (
          <div className="super-admin-portal__error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="super-admin-portal__form" noValidate>
          {/* 🔽 UPDATED: Wrapped input in .super-admin-portal__field with a label */}
          <div className="super-admin-portal__field">
            <label htmlFor="outletId" className="super-admin-portal__label">
              Super Admin ID
            </label>
            <div className="super-admin-portal__input-group">
              <input
                type="text"
                id="outletId"
                name="outletId"
                value={outletId}
                onChange={(e) => setOutletId(e.target.value)}
                placeholder="Enter your Super Admin ID"
                className="super-admin-portal__input"
                required
                autoComplete="username"
                aria-label="Super Admin ID"
              />
              <User className="super-admin-portal__icon" size={16} />
            </div>
          </div>

          {/* 🔽 UPDATED: Wrapped input in .super-admin-portal__field, added password toggle button */}
          <div className="super-admin-portal__field">
            <label htmlFor="password" className="super-admin-portal__label">
              Password
            </label>
            <div className="super-admin-portal__input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="super-admin-portal__input super-admin-portal__input--password"
                required
                autoComplete="current-password"
                aria-label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="super-admin-portal__toggle-password"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="super-admin-portal__buttons">
            <button type="submit" className="btn-super-admin-portal btn-signin">
              {/* 🔽 UPDATED: Icon sizes to match Doctor Portal */}
              <LogIn size={15} /> Sign in
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn-super-admin-portal btn-reset"
            >
              <RefreshCw size={14} /> Reset
            </button>
            <button type="button" className="btn-super-admin-portal btn-forgot">
              <KeyRound size={14} /> Forgot Password
            </button>
          </div>

          {/* 🔽 UPDATED: Replaced old help divs with Divider and Links layout */}
          <div className="super-admin-portal__divider" />
          <div className="super-admin-portal__links">
            <a href="/portal-help" className="super-admin-portal__help-link">
              How to use super admin portal
            </a>
            <span className="super-admin-portal__links-new">
              New super admin?{" "}
              <a href="/supar-admin-panel/supar-admin-signup" className="super-admin-portal__help-link">
                Create account
              </a>
            </span>
          </div>
        </form>

        {/* Security Notice */}
        <div className="super-admin-portal__security-notice">
          <Shield size={13} />
          <span>Your connection is secure. Never share your credentials.</span>
        </div>
      </div>
    </div>
  );
}