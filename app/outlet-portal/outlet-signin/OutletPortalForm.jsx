// src/app/OutletPortal/oportal/OutletPortalForm.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import "./outlet-portal.css";

export default function OutletPortalForm() {
  const [outletId, setOutletId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (!outletId.trim() || !password.trim()) {
      setError("Please enter both Outlet ID and password");
      return;
    }
    
    // Handle sign in logic (replace with actual API call)
    console.log("Signing in with:", { outletId, password });
  };

  const handleReset = () => {
    setOutletId("");
    setPassword("");
    setError("");
  };

  return (
    <div className="patient-portal-container">
      {/* Background Image */}
      <div className="patient-portal__background">
        <Image
          src="/images/obg-login.jpg"
          alt="Compassionate care at Renova Life Care"
          fill
          className="object-cover"
          priority
        />
        <div className="patient-portal__overlay" />
      </div>

      {/* Login Card */}
      <div className="patient-portal__card">
        <div className="patient-portal__logo-section">
          <div className="patient-portal__logos">
            <Image
              src="/images/logo.png"
              alt="Renova Life Care Logo"
              width={160}
              height={60}
              className="patient-portal__logo"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <div className="patient-portal__header">
          <h1 className="patient-portal__title">Outlet Portal</h1>
          <p className="patient-portal__subtitle">Sign in to access your outlet dashboard</p>
        </div>

        {error && (
          <div className="patient-portal__error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="patient-portal__form" noValidate>
          <div className="patient-portal__input-group">
            <input
              type="text"
              id="outletId"
              name="outletId"
              value={outletId}
              onChange={(e) => setOutletId(e.target.value)}
              placeholder="Enter your Outlet ID"
              className="patient-portal__input"
              required
              autoComplete="username"
              aria-label="Outlet ID"
            />
            <svg
              className="patient-portal__icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>

          <div className="patient-portal__input-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="patient-portal__input"
              required
              autoComplete="current-password"
              aria-label="Password"
            />
            <svg
              className="patient-portal__icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <div className="patient-portal__buttons">
            <button type="submit" className="btn-patient-portal btn-signin">
              Sign In
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn-patient-portal btn-reset"
            >
              Reset
            </button>
            <button type="button" className="btn-patient-portal btn-forgot">
              Forgot Password
            </button>
          </div>

          <div className="patient-portal__help">
            <a href="/portal-help" className="patient-portal__help-link">
              How to use outlet portal
            </a>
          </div>
        </form>

        {/* Security Notice */}
        <div className="patient-portal__security-notice">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <span>Your connection is secure. Never share your credentials.</span>
        </div>
      </div>
    </div>
  );
}