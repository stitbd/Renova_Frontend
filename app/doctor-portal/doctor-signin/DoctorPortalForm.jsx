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

  const user = useAppSelector((state) => state.auth.user);
  // console.log('doctor form redux', user);

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

      // console.log("login res ", res);

      dispatch(setUser(res.data.user));

      dispatch(setToken(res.data.accessToken));

      router.push("/doctor-portal/dashboard");
    } catch (err) {
      const message =
        err?.data?.message ||
        err?.error ||
        "Invalid credentials. Please try again.";

      setError(message);
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
            <User className="doctor-portal__icon" size={18} />
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
            <Lock className="doctor-portal__icon" size={18} />
          </div>

          <div className="doctor-portal__buttons">
            {/* only update submit button */}
            <button
              type="submit"
              className="btn-doctor-portal btn-signin"
              disabled={isLoading}
            >
              <LogIn size={16} /> {isLoading ? "Signing In..." : "Sign In"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn-doctor-portal btn-reset"
            >
              <RefreshCw size={16} /> Reset
            </button>
            <button type="button" className="btn-doctor-portal btn-forgot">
              <KeyRound size={16} /> Forgot Password
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
          <Shield size={14} />
          <span>Your connection is secure. Never share your credentials.</span>
        </div>
      </div>
    </div>
  );
}