// src/app/outlet-portal/outlet-signin/OutletPortalForm.jsx
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import "./outlet-signin.css";
import { User, Lock, Shield, LogIn, RefreshCw, KeyRound } from "lucide-react";

export default function OutletPortalForm() {
  const router = useRouter();
  const [outletId, setOutletId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!outletId.trim() || !password.trim()) {
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

      console.log("Outlet signing in with:", { outletId, password });

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
            <User className="outlet-portal__icon" size={18} />
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
            <Lock className="outlet-portal__icon" size={18} />
          </div>

          <div className="outlet-portal__buttons">
            <button type="submit" className="btn-outlet-portal btn-signin">
              <LogIn size={16} /> Sign In
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn-outlet-portal btn-reset"
            >
              <RefreshCw size={16} /> Reset
            </button>
            <button type="button" className="btn-outlet-portal btn-forgot">
              <KeyRound size={16} /> Forgot Password
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
          <Shield size={14} />
          <span>Your connection is secure. Never share your credentials.</span>
        </div>
      </div>
    </div>
  );
}