// src/app/doctor-portal/doctor-signin/DoctorPortalForm.jsx
"use client";
import { useRouter } from "next/navigation"; // ADD THIS
import { useState } from "react";
import Image from "next/image";
import "./doctor-signin.css";

export default function DoctorPortalForm() {
  const router = useRouter(); // ADD THIS
  const [uhid, setUhid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!uhid.trim() || !password.trim()) {
      setError("Please enter both Doctor ID and password");
      return;
    }

    try {
      // Example API Login Logic
      // const response = await fetch("/api/doctor-login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ uhid, password }),
      // });

      // const data = await response.json();

      // if (!response.ok) {
      //   throw new Error(data.message || "Login failed");
      // }

      console.log("Doctor signing in with:", { uhid, password });

      // SUCCESS LOGIN → REDIRECT
      router.push("/doctor-portal/dashboard");

    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  const handleReset = () => {
    setUhid("");
    setPassword("");
    setError("");
  };

  return (
    <div className="doctor-portal-container">
      {/* Background Image */}
      <div className="doctor-portal__background">
        <Image
          src="/images/dbg-login.jpg"
          alt="Compassionate care at Renova Life Care"
          fill
          className="object-cover"
          priority
        />
        <div className="doctor-portal__overlay" />
      </div>

      {/* Login Card */}
      <div className="doctor-portal__card">
        <div className="doctor-portal__logo-section">
          <div className="doctor-portal__logos">
            <Image
              src="/images/logo2.png"
              alt="Renova Life Care Logo"
              width={160}
              height={60}
              className="doctor-portal__logo"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <div className="doctor-portal__header">
          <h1 className="doctor-portal__title">Doctor Portal</h1>
          <p className="doctor-portal__subtitle">Sign in to access your professional dashboard</p>
        </div>

        {error && (
          <div className="doctor-portal__error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="doctor-portal__form" noValidate>
          <div className="doctor-portal__input-group">
            <input
              type="text"
              id="doctor-id"
              name="doctor-id"
              value={uhid}
              onChange={(e) => setUhid(e.target.value)}
              placeholder="Enter your Doctor ID/Registration No."
              className="doctor-portal__input"
              required
              autoComplete="username"
              aria-label="Doctor ID or Registration Number"
            />
            <svg
              className="doctor-portal__icon"
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

          <div className="doctor-portal__input-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your registered Mobile No/Password"
              className="doctor-portal__input"
              required
              autoComplete="current-password"
              aria-label="Password"
            />
            <svg
              className="doctor-portal__icon"
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

          <div className="doctor-portal__buttons">
            <button type="submit" className="btn-doctor-portal btn-signin">
              Sign In
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn-doctor-portal btn-reset"
            >
              Reset
            </button>
            <button type="button" className="btn-doctor-portal btn-forgot">
              Forgot Password
            </button>
          </div>

          <div className="doctor-portal__help">
            <a href="/portal-help" className="doctor-portal__help-link">
              How to use doctor portal
            </a>
          </div>

          <div className="doctor-portal__help">
            New Doctor? <a href="/doctor-portal/doctor-signup" className="doctor-portal__help-link">
              Create your account
            </a>
          </div>
        </form>

        {/* Security Notice */}
        <div className="doctor-portal__security-notice">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <span>Your connection is secure. Never share your credentials.</span>
        </div>
      </div>
    </div>
  );
}