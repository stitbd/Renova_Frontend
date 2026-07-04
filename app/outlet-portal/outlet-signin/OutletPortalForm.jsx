// src/app/outlet-portal/outlet-signin/OutletPortalForm.jsx
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import "./outlet-signin.css";
// 🔽 UPDATED: Added Eye and EyeOff icons for password toggle
import { User, Lock, Shield, LogIn, RefreshCw, KeyRound, Eye, EyeOff } from "lucide-react";

export default function OutletPortalForm() {
  const router = useRouter();
  const [outletId, setOutletId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // 🔽 ADDED: State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    if (!outletId.trim() || !password.trim()) {
      setError("Please enter both Outlet ID and password");
      return;
    }

    try {
      console.log("Outlet signing in with:", { outletId, password });
      router.push("/outlet-portal/dashboard");
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
    <div className="outlet-portal-container">
      {/* Background Image */}
      <div className="outlet-portal__background">
        <Image
          src="/images/obg-login.jpg"
          alt="Compassionate care at Renova Life Care"
          fill
          className="object-cover"
          priority
        />
        <div className="outlet-portal__overlay" />
      </div>

      {/* Login Card */}
      <div className="outlet-portal__card">
        <div className="outlet-portal__logo-section">
          <div className="outlet-portal__logos">
            <Image
              src="/images/logo2.png"
              alt="Renova Life Care Logo"
              width={160}
              height={60}
              loading="eager"
              className="outlet-portal__logo"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <div className="outlet-portal__header">
          {/* 🔽 ADDED: Badge component matching Doctor Portal */}
          <div className="outlet-portal__badge">
            <Shield size={12} />
            <span>Outlet Portal</span>
          </div>
          {/* 🔽 UPDATED: Title text to match Doctor Portal structure */}
          <h1 className="outlet-portal__title">Welcome back</h1>
          <p className="outlet-portal__subtitle">Sign in to access your outlet dashboard</p>
        </div>

        {error && (
          <div className="outlet-portal__error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="outlet-portal__form" noValidate>
          {/* 🔽 UPDATED: Wrapped input in .outlet-portal__field with a label */}
          <div className="outlet-portal__field">
            <label htmlFor="outletId" className="outlet-portal__label">
              Outlet ID
            </label>
            <div className="outlet-portal__input-group">
              <input
                type="text"
                id="outletId"
                name="outletId"
                value={outletId}
                onChange={(e) => setOutletId(e.target.value)}
                placeholder="Enter your Outlet ID"
                className="outlet-portal__input"
                required
                autoComplete="username"
                aria-label="Outlet ID"
              />
              <User className="outlet-portal__icon" size={16} />
            </div>
          </div>

          {/* 🔽 UPDATED: Wrapped input in .outlet-portal__field, added password toggle button */}
          <div className="outlet-portal__field">
            <label htmlFor="password" className="outlet-portal__label">
              Password
            </label>
            <div className="outlet-portal__input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="outlet-portal__input outlet-portal__input--password"
                required
                autoComplete="current-password"
                aria-label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="outlet-portal__toggle-password"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="outlet-portal__buttons">
            <button type="submit" className="btn-outlet-portal btn-signin">
              {/* 🔽 UPDATED: Icon sizes to match Doctor Portal */}
              <LogIn size={15} /> Sign In
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn-outlet-portal btn-reset"
            >
              <RefreshCw size={14} /> Reset
            </button>
            <button type="button" className="btn-outlet-portal btn-forgot">
              <KeyRound size={14} /> Forgot Password
            </button>
          </div>

          {/* 🔽 UPDATED: Replaced old help divs with Divider and Links layout */}
          <div className="outlet-portal__divider" />
          <div className="outlet-portal__links">
            <a href="/portal-help" className="outlet-portal__help-link">
              How to use outlet portal
            </a>
            <span className="outlet-portal__links-new">
              New outlet?{" "}
              <a href="/outlet-portal/outlet-signup" className="outlet-portal__help-link">
                Create account
              </a>
            </span>
          </div>
        </form>

        {/* Security Notice */}
        <div className="outlet-portal__security-notice">
          <Shield size={13} />
          <span>Your connection is secure. Never share your credentials.</span>
        </div>
      </div>
    </div>
  );
}