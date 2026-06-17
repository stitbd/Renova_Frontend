// src/app/patient-portal/patient-signin/PatientPortalForm.jsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import "./patient-signin.css";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setToken, setUser } from "@/redux/features/auth/authSlice";
import { User, Lock, Shield, LogIn, RefreshCw, KeyRound } from "lucide-react";


export default function PatientPortalForm() {
  const router = useRouter();
  const [uhid, setUhid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();


  const user = useAppSelector((state) => state.auth.accessToken);
  // console.log('patient form redux', user);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    if (!uhid.trim() || !password.trim()) {
      setError("Please enter both UHID and password");
      return;
    }

    try {
      const res = await login({
        phone: uhid.trim(),
        password,
        userType: "PATIENT",
      }).unwrap();

      dispatch(setUser(res.data.user));
      dispatch(setToken(res.data.accessToken));

      router.push("/patient-portal/dashboard");
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
    <div className="patient-portal-container">
      {/* Background Image */}
      <div className="patient-portal__background">
        <Image
          src="/images/pbg-login.jpg"
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
              src="/images/logo2.png"
              alt="Renova Life Care Logo"
              width={160}
              height={60}
              className="patient-portal__logo"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <div className="patient-portal__header">
          <h1 className="patient-portal__title">Patient Portal</h1>
          <p className="patient-portal__subtitle">Sign in to access your health records</p>
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
              id="uhid"
              name="uhid"
              value={uhid}
              onChange={(e) => setUhid(e.target.value)}
              placeholder="Enter your UHID/Registration No."
              className="patient-portal__input"
              required
              autoComplete="username"
              aria-label="UHID or Registration Number"
            />
            <User className="patient-portal__icon" size={18} />
          </div>

          <div className="patient-portal__input-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your registered Mobile No/Password"
              className="patient-portal__input"
              required
              autoComplete="current-password"
              aria-label="Password"
            />
            <Lock className="patient-portal__icon" size={18} />
          </div>

          <div className="patient-portal__buttons">
            <button type="submit" className="btn-patient-portal btn-signin">
              <LogIn size={16} /> Sign In
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn-patient-portal btn-reset"
            >
              <RefreshCw size={16} /> Reset
            </button>
            <button type="button" className="btn-patient-portal btn-forgot">
              <KeyRound size={16} /> Forgot Password
            </button>
          </div>

          <div className="patient-portal__help">
            <a href="/portal-help" className="patient-portal__help-link">
              How to use patient portal
            </a>
          </div>

          <div className="patient-portal__help">
            New Patient? <a href="/patient-portal/patient-signup" className="patient-portal__help-link">
              Create your account
            </a>
          </div>
        </form>

        {/* Security Notice */}
        <div className="patient-portal__security-notice">
          <Shield size={14} />
          <span>Your connection is secure. Never share your credentials.</span>
        </div>
      </div>
    </div>
  );
}