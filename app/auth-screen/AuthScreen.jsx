"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import "./auth-screen.css";

const PANELS = [
  {
    id: "patient",
    label: "Patient Panel",
    colorClass: "panel--patient",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    loginFields: [
      { id: "uhid",  name: "uhid",  type: "text",     label: "UHID / Registration No.",      placeholder: "e.g. RLC-2024-00123",         autoComplete: "username" },
      { id: "ppass", name: "ppass", type: "password",  label: "Mobile No. / Password",        placeholder: "Enter your password",         autoComplete: "current-password" },
    ],
    signupFields: [
      { id: "fullName", name: "fullName", type: "text",     label: "Full Name",             placeholder: "Your full name",              autoComplete: "name" },
      { id: "dob",      name: "dob",      type: "date",     label: "Date of Birth",         placeholder: "" },
      { id: "gender",   name: "gender",   type: "select",   label: "Gender",                options: ["Select gender", "Male", "Female", "Other"] },
      { id: "mobile",   name: "mobile",   type: "tel",      label: "Mobile Number",         placeholder: "+880 1XXX-XXXXXX",            autoComplete: "tel" },
      { id: "email",    name: "email",    type: "email",    label: "Email Address",         placeholder: "patient@email.com",           autoComplete: "email" },
      { id: "nid",      name: "nid",      type: "text",     label: "NID / Birth Cert. No.", placeholder: "National ID number" },
      { id: "password", name: "password", type: "password", label: "Password",              placeholder: "Create a strong password",    autoComplete: "new-password" },
      { id: "confirm",  name: "confirm",  type: "password", label: "Confirm Password",      placeholder: "Repeat your password" },
    ],
  },
  {
    id: "doctor",
    label: "Doctor Panel",
    colorClass: "panel--doctor",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="9" width="18" height="11" rx="2" />
        <path d="M8 9V5a4 4 0 0 1 8 0v4" />
        <line x1="12" y1="13" x2="12" y2="17" />
        <line x1="10" y1="15" x2="14" y2="15" />
      </svg>
    ),
    loginFields: [
      { id: "docId",   name: "docId",   type: "text",     label: "Doctor ID / Email",   placeholder: "DR-RLC-001 or doc@email.com", autoComplete: "username" },
      { id: "docPass", name: "docPass", type: "password",  label: "Password",            placeholder: "Enter your password",        autoComplete: "current-password" },
    ],
    signupFields: [
      { id: "drName",      name: "drName",      type: "text",     label: "Full Name",          placeholder: "Dr. First Last" },
      { id: "designation", name: "designation", type: "text",     label: "Designation",        placeholder: "e.g. Consultant Cardiologist" },
      { id: "dept",        name: "dept",        type: "select",   label: "Department",         options: ["Select department", "Cardiology", "Neurology", "Orthopedics", "Gynecology", "Pediatrics", "Oncology", "Radiology", "General Medicine", "Other"] },
      { id: "bmdc",        name: "bmdc",        type: "text",     label: "BMDC Reg. No.",      placeholder: "Bangladesh Medical Council No." },
      { id: "drMobile",    name: "drMobile",    type: "tel",      label: "Mobile Number",      placeholder: "+880 1XXX-XXXXXX" },
      { id: "drEmail",     name: "drEmail",     type: "email",    label: "Work Email",         placeholder: "doctor@renovalifecare.com" },
      { id: "drPass",      name: "drPass",      type: "password", label: "Password",           placeholder: "Create a strong password" },
      { id: "drConfirm",   name: "drConfirm",   type: "password", label: "Confirm Password",   placeholder: "Repeat your password" },
    ],
  },
  {
    id: "outlet",
    label: "Outlet Panel",
    colorClass: "panel--outlet",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    loginFields: [
      { id: "outletId",   name: "outletId",   type: "text",    label: "Outlet ID / Username", placeholder: "e.g. OUT-RLC-DHAKA-01", autoComplete: "username" },
      { id: "outletPass", name: "outletPass", type: "password", label: "Password",             placeholder: "Enter your password",  autoComplete: "current-password" },
    ],
    signupFields: [
      { id: "outletName",    name: "outletName",    type: "text",     label: "Outlet Name",           placeholder: "e.g. Renova Pharmacy Dhanmondi" },
      { id: "outletType",    name: "outletType",    type: "select",   label: "Outlet Type",           options: ["Select type", "Pharmacy", "Diagnostic Center", "Blood Bank", "Pathology Lab", "Imaging Center", "Other"] },
      { id: "outletAddress", name: "outletAddress", type: "text",     label: "Address",               placeholder: "Full outlet address" },
      { id: "district",      name: "district",      type: "text",     label: "District",              placeholder: "e.g. Dhaka" },
      { id: "managerName",   name: "managerName",   type: "text",     label: "Manager / Contact Name",placeholder: "Responsible person" },
      { id: "outMobile",     name: "outMobile",     type: "tel",      label: "Contact Number",        placeholder: "+880 1XXX-XXXXXX" },
      { id: "outEmail",      name: "outEmail",      type: "email",    label: "Outlet Email",          placeholder: "outlet@renovalifecare.com" },
      { id: "outPass",       name: "outPass",       type: "password", label: "Password",              placeholder: "Create a strong password" },
    ],
  },
];

/* ─── Single field renderer ──────────────────────────────────── */
function AuthField({ field, value, onChange }) {
  if (field.type === "select") {
    return (
      <div className="auth-field">
        <label htmlFor={field.id} className="auth-label">{field.label}</label>
        <select
          id={field.id}
          name={field.name}
          value={value}
          onChange={onChange}
          className="auth-input auth-select"
          required
        >
          {field.options.map((opt, i) => (
            <option key={opt} value={i === 0 ? "" : opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }
  return (
    <div className="auth-field">
      <label htmlFor={field.id} className="auth-label">{field.label}</label>
      <input
        id={field.id}
        name={field.name}
        type={field.type}
        value={value}
        onChange={onChange}
        placeholder={field.placeholder}
        className="auth-input"
        autoComplete={field.autoComplete}
        required
      />
    </div>
  );
}

/* ─── Login Form ─────────────────────────────────────────────── */
function LoginForm({ panel, onSwitchToSignup }) {
  const [values, setValues]   = useState({});
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const missing = panel.loginFields.some((f) => !values[f.name]?.trim());
    if (missing) { setError("Please fill in all required fields."); return; }
    setLoading(true);
    // Replace with actual API call
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <form className={`auth-form ${panel.colorClass}`} onSubmit={handleSubmit} noValidate>
      {error && <div className="auth-error" role="alert">{error}</div>}

      {panel.loginFields.map((field) => (
        <AuthField
          key={field.id}
          field={field}
          value={values[field.name] || ""}
          onChange={handleChange}
        />
      ))}

      <div className="auth-forgot">
        <a href="#" className="auth-link">Forgot Password?</a>
      </div>

      <button
        type="submit"
        className={`auth-btn auth-btn--primary ${panel.colorClass}`}
        disabled={loading}
      >
        {loading && <span className="auth-spinner" aria-hidden="true" />}
        {loading ? "Signing in…" : "Sign In"}
      </button>

      <p className="auth-switch-text">
        Don&apos;t have an account?{" "}
        <button type="button" className="auth-link" onClick={onSwitchToSignup}>
          Sign Up
        </button>
      </p>
    </form>
  );
}

/* ─── Sign Up Form ───────────────────────────────────────────── */
function SignupForm({ panel, onSwitchToLogin }) {
  const [values, setValues]     = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);

  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Replace with actual API call
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  if (submitted) {
    return (
      <div className="auth-success">
        <div className="auth-success__icon" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="auth-success__title">Registration Submitted!</h3>
        <p className="auth-success__text">
          Your account request has been received. You will be notified once approved.
        </p>
        <button
          type="button"
          className={`auth-btn auth-btn--primary ${panel.colorClass}`}
          style={{ maxWidth: "220px" }}
          onClick={() => { setSubmitted(false); setValues({}); onSwitchToLogin(); }}
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  const half = Math.ceil(panel.signupFields.length / 2);
  const col1 = panel.signupFields.slice(0, half);
  const col2 = panel.signupFields.slice(half);

  return (
    <form className={`auth-form auth-form--signup ${panel.colorClass}`} onSubmit={handleSubmit} noValidate>
      <div className="auth-form__cols">
        <div className="auth-form__col">
          {col1.map((field) => (
            <AuthField key={field.id} field={field} value={values[field.name] || ""} onChange={handleChange} />
          ))}
        </div>
        <div className="auth-form__col">
          {col2.map((field) => (
            <AuthField key={field.id} field={field} value={values[field.name] || ""} onChange={handleChange} />
          ))}
        </div>
      </div>

      <button
        type="submit"
        className={`auth-btn auth-btn--primary ${panel.colorClass}`}
        disabled={loading}
      >
        {loading && <span className="auth-spinner" aria-hidden="true" />}
        {loading ? "Registering…" : "Create Account"}
      </button>

      <p className="auth-switch-text">
        Already have an account?{" "}
        <button type="button" className="auth-link" onClick={onSwitchToLogin}>
          Sign In
        </button>
      </p>
    </form>
  );
}

/* ─── Main Auth Screen ───────────────────────────────────────── */
export default function AuthScreen() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const panelParam = searchParams.get('panel');

  const [activePanel, setActivePanel] = useState(
    panelParam && PANELS.some((p) => p.id === panelParam) ? panelParam : "patient"
  );
  const [mode, setMode] = useState(tab === 'signup' ? "signup" : "login"); // "login" | "signup"

  useEffect(() => {
    if (tab === 'signup') {
      setMode("signup");
    } else if (tab === 'signin') {
      setMode("login");
    }
  }, [tab]);

  useEffect(() => {
    if (panelParam && PANELS.some((p) => p.id === panelParam)) {
      setActivePanel(panelParam);
    }
  }, [panelParam]);

  const panel = PANELS.find((p) => p.id === activePanel) || PANELS[0];

  return (
    <div className="auth-root">
      {/* Decorative blobs */}
      <div className="auth-bg" aria-hidden="true">
        <div className="auth-bg__blob auth-bg__blob--1" />
        <div className="auth-bg__blob auth-bg__blob--2" />
        <div className="auth-bg__blob auth-bg__blob--3" />
      </div>

      <div className="auth-container">
        {/* Branding */}
        <div className="auth-brand">
          <div className="auth-brand__logo" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <div>
            <h1 className="auth-brand__name">Renova Life Care</h1>
            <p className="auth-brand__tagline">Healthcare Management System</p>
          </div>
        </div>

        {/* Card */}
        <div className="auth-card">

          {/* Header */}
          <div className="auth-card__header">
            <h2 className="auth-card__title">
              {mode === "login" ? "Welcome back" : "Create Account"}
            </h2>
            <p className="auth-card__subtitle">
              {mode === "login"
                ? "Sign in to your portal to continue"
                : "Register to access your portal"}
            </p>
          </div>

          {/* Mode toggle */}
          <div className="auth-mode-toggle">
            <div className="auth-mode-row" role="group" aria-label="Auth mode">
              <button
                type="button"
                className={`auth-mode-btn ${mode === "login" ? "auth-mode-btn--active" : ""}`}
                onClick={() => setMode("login")}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`auth-mode-btn ${mode === "signup" ? "auth-mode-btn--active" : ""}`}
                onClick={() => setMode("signup")}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Panel Tabs Removed */}

          {/* Panel content */}
          <div
            id={`panel-${panel.id}`}
            role="tabpanel"
            className="auth-panel"
            key={`${activePanel}-${mode}`}
          >
            {mode === "login" ? (
              <LoginForm panel={panel} onSwitchToSignup={() => setMode("signup")} />
            ) : (
              <SignupForm panel={panel} onSwitchToLogin={() => setMode("login")} />
            )}
          </div>
        </div>

        {/* Security footer */}
        <p className="auth-footer">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Secured connection · Never share your credentials
        </p>
      </div>
    </div>
  );
}