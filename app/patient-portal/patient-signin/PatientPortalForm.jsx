// src/app/patient-portal/patient-signin/PatientPortalForm.jsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import "./patient-signin.css";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setToken, setUser } from "@/redux/features/auth/authSlice";
import { User, Lock, Shield, LogIn, RefreshCw, KeyRound, Eye, EyeOff } from "lucide-react";


export default function PatientPortalForm() {
  const router = useRouter();
  const [uhid, setUhid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();


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
          <div className="patient-portal__badge">
            <Shield size={12} />
            <span>Patient Portal</span>
          </div>
          <h1 className="patient-portal__title">Welcome back</h1>
          <p className="patient-portal__subtitle">Sign in to access your health records</p>
        </div>

        {error && (
          <div className="patient-portal__error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn} className="patient-portal__form" noValidate>
          <div className="patient-portal__field">
            <label htmlFor="uhid" className="patient-portal__label">
              UHID / Registration No.
            </label>
            <div className="patient-portal__input-group">
              <input
                type="text"
                id="uhid"
                name="uhid"
                value={uhid}
                onChange={(e) => setUhid(e.target.value)}
                placeholder="e.g. RLC-PAT-00123"
                className="patient-portal__input"
                required
                autoComplete="username"
                aria-label="UHID or Registration Number"
              />
              <User className="patient-portal__icon" size={16} />
            </div>
          </div>

          <div className="patient-portal__field">
            <label htmlFor="password" className="patient-portal__label">
              Password / Mobile No.
            </label>
            <div className="patient-portal__input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="patient-portal__input patient-portal__input--password"
                required
                autoComplete="current-password"
                aria-label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="patient-portal__toggle-password"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="patient-portal__buttons">
            <button
              type="submit"
              className="btn-patient-portal btn-signin"
              disabled={isLoading}
            >
              <LogIn size={15} />
              {isLoading ? "Signing in…" : "Sign in"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="btn-patient-portal btn-reset"
            >
              <RefreshCw size={14} /> Reset
            </button>
            <button type="button" className="btn-patient-portal btn-forgot">
              <KeyRound size={14} /> Forgot
            </button>
          </div>

          <div className="patient-portal__divider" />

          <div className="patient-portal__links">
            <a href="/portal-help" className="patient-portal__help-link">
              How to use patient portal
            </a>
            <span className="patient-portal__links-new">
              New patient?{" "}
              <a href="/patient-portal/patient-signup" className="patient-portal__help-link">
                Create account
              </a>
            </span>
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