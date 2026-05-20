// src/app/outlet-portal/outlet-signin/OutletPortalForm.jsx
"use client";
import { useRouter } from "next/navigation"; // ADD THIS
import { useState } from "react";
import Image from "next/image";
import "./outlet-signin.css";

export default function OutletPortalForm() {
  const router = useRouter(); // ADD THIS
  const [outletId, setOutletId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!uhid.trim() || !password.trim()) {
      setError("Please enter both Outlet ID and password");
      return;
    }

    try {
      // Example API Login Logic
      // const response = await fetch("/api/outlet-login", {
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

      console.log("Outlet signing in with:", { uhid, password });

      // SUCCESS LOGIN → REDIRECT
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
              className="outlet-portal__logo"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <div className="outlet-portal__header">
          <h1 className="outlet-portal__title">Outlet Portal</h1>
          <p className="outlet-portal__subtitle">Sign in to access your outlet dashboard</p>
        </div>

        {error && (
          <div className="outlet-portal__error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="outlet-portal__form" noValidate>
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
            <svg
              className="outlet-portal__icon"
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

          <div className="outlet-portal__input-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="outlet-portal__input"
              required
              autoComplete="current-password"
              aria-label="Password"
            />
            <svg
              className="outlet-portal__icon"
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

          <div className="outlet-portal__buttons">
            <button type="submit" className="btn-outlet-portal btn-signin">
              Sign In
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn-outlet-portal btn-reset"
            >
              Reset
            </button>
            <button type="button" className="btn-outlet-portal btn-forgot">
              Forgot Password
            </button>
          </div>

          <div className="outlet-portal__help">
            <a href="/portal-help" className="outlet-portal__help-link">
              How to use outlet portal
            </a>
          </div>

          <div className="outlet-portal__help">
            New Outlet? <a href="/outlet-portal/outlet-signup" className="outlet-portal__help-link">
              Create your account
            </a>
          </div>
        </form>

        {/* Security Notice */}
        <div className="outlet-portal__security-notice">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <span>Your connection is secure. Never share your credentials.</span>
        </div>
      </div>
    </div>
  );
}