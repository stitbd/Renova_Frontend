"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import "./doctor-signin.css";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setToken, setUser } from "@/redux/features/auth/authSlice";
import { User, Lock, Shield, LogIn, RefreshCw, KeyRound } from "lucide-react";

export default function DoctorPortalForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [uhid, setUhid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    if (!uhid.trim() || !password.trim()) {
      setError("Please enter both Doctor ID and password");
      return;
    }
    try {
      const res = await login({
        phone: uhid.trim(),
        password,
        userType: "DOCTOR",
      }).unwrap();
      dispatch(setUser(res.data.user));
      dispatch(setToken(res.data.accessToken));
      router.push("/doctor-portal/dashboard");
    } catch (err) {
      setError(
        err?.data?.message || err?.error || "Invalid credentials. Please try again."
      );
    }
  };

  const handleReset = () => {
    setUhid("");
    setPassword("");
    setError("");
  };

  return (
    <div className="doctor-portal-container">

      {/* Background Image — existing, unchanged */}
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

        {/* Logo */}
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

        {/* Header */}
        <div className="doctor-portal__header">
          <div className="doctor-portal__badge">
            <Shield size={12} />
            <span>Doctor Portal</span>
          </div>
          <h1 className="doctor-portal__title">Welcome back</h1>
          <p className="doctor-portal__subtitle">Sign in to access your professional dashboard</p>
        </div>

        {/* Error */}
        {error && (
          <div className="doctor-portal__error" role="alert">{error}</div>
        )}

        {/* Form */}
        <form onSubmit={handleSignIn} className="doctor-portal__form" noValidate>

          <div className="doctor-portal__field">
            <label htmlFor="doctor-id" className="doctor-portal__label">
              Doctor ID / Registration No.
            </label>
            <div className="doctor-portal__input-group">
              <input
                id="doctor-id"
                type="text"
                value={uhid}
                onChange={(e) => setUhid(e.target.value)}
                placeholder="e.g. RLC-DOC-00123"
                className="doctor-portal__input"
                autoComplete="username"
                aria-label="Doctor ID or Registration Number"
              />
              <User className="doctor-portal__icon" size={16} />
            </div>
          </div>

          <div className="doctor-portal__field">
            <label htmlFor="password" className="doctor-portal__label">
              Password / Mobile No.
            </label>
            <div className="doctor-portal__input-group">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="doctor-portal__input"
                autoComplete="current-password"
                aria-label="Password"
              />
              <Lock className="doctor-portal__icon" size={16} />
            </div>
          </div>

          <div className="doctor-portal__buttons">
            <button
              type="submit"
              className="btn-doctor-portal btn-signin"
              disabled={isLoading}
            >
              <LogIn size={15} />
              {isLoading ? "Signing in…" : "Sign in"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn-doctor-portal btn-reset"
            >
              <RefreshCw size={14} /> Reset
            </button>
            <button type="button" className="btn-doctor-portal btn-forgot">
              <KeyRound size={14} /> Forgot
            </button>
          </div>

          <div className="doctor-portal__divider" />

          <div className="doctor-portal__links">
            <a href="/portal-help" className="doctor-portal__help-link">
              How to use doctor portal
            </a>
            <span className="doctor-portal__links-new">
              New doctor?{" "}
              <a href="/doctor-portal/doctor-signup" className="doctor-portal__help-link">
                Create account
              </a>
            </span>
          </div>

        </form>

        {/* Security Notice */}
        <div className="doctor-portal__security-notice">
          <Shield size={13} />
          <span>Your connection is secure. Never share your credentials.</span>
        </div>

      </div>
    </div>
  );
}