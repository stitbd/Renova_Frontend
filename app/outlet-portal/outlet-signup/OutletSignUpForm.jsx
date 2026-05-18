"use client";
import { useState } from "react";
import Image from "next/image";
import "./outlet-signup.css";

/* ─────────────────────────────────────────────────────────────────
   SVG Icon Library
───────────────────────────────────────────────────────────────── */
const Ic = {
  ID: () => (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
      <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.3"/>
      <circle cx="5.5" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M9 6.5h4M9 8h3M9 9.5h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  ),
  User: () => (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
      <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M2.5 14c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
      <path d="M5.2 2H3a1 1 0 0 0-1 1c0 5.523 4.477 10 10 10a1 1 0 0 0 1-1v-2.2a1 1 0 0 0-.684-.949l-2-.667a1 1 0 0 0-1.052.26l-.624.624A7.965 7.965 0 0 1 5.932 5.36l.624-.624a1 1 0 0 0 .26-1.052L6.15 2.684A1 1 0 0 0 5.2 2z" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
  Email: () => (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M1.5 4.5L8 9l6.5-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  Building: () => (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
      <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M5 6h6M5 8.5h6M5 11h3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  ),
  Map: () => (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
      <path d="M8 1.5a5 5 0 0 1 5 5c0 4-5 8-5 8s-5-4-5-8a5 5 0 0 1 5-5z" stroke="currentColor" strokeWidth="1.3"/>
      <circle cx="8" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
  Location: () => (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
      <path d="M2 4l4-2 4 2 4-2v10l-4 2-4-2-4 2V4z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M6 2v10M10 4v10" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  ),
  License: () => (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
      <rect x="2" y="1.5" width="12" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M5 5h6M5 7.5h6M5 10h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Clock: () => (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M8 4.5V8l2.5 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Globe: () => (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M8 2c-2 2-2 8 0 12M8 2c2 2 2 8 0 12M2 8h12" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  ),
  Network: () => (
    <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
      <rect x="1.5" y="4" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M5.5 4V3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M1.5 9h13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Chevron: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M4 6l4 4 4-4" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 28 28" fill="none" width="28" height="28">
      <path d="M14 3L5 7.5v6.5C5 19.7 8.9 23.7 14 25c5.1-1.3 9-5.3 9-11V7.5L14 3z" fill="#4caf50"/>
      <path d="M10 14l3 3.5L18 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  OutletIcon: () => (
    <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
      <rect x="3" y="7" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M3 11h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M8 7V5a2 2 0 0 1 4 0M12 7V5a2 2 0 0 1 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  Submit: () => (
    <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M7 10l2.5 2.5L13 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  /* Sidebar icons */
  Secure: () => (
    <svg viewBox="0 0 28 28" fill="none" width="28" height="28">
      <path d="M14 3L5 7.5v6.5C5 19.7 8.9 23.7 14 25c5.1-1.3 9-5.3 9-11V7.5L14 3z" stroke="white" strokeWidth="1.6" strokeLinejoin="round"/>
      <rect x="11" y="13" width="6" height="6" rx="1" fill="white" opacity="0.9"/>
      <path d="M11 13v-2a3 3 0 0 1 6 0v2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Manage: () => (
    <svg viewBox="0 0 28 28" fill="none" width="28" height="28">
      <rect x="4" y="8" width="20" height="15" rx="2" stroke="white" strokeWidth="1.5"/>
      <path d="M4 13h20" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M9 8V6a2 2 0 0 1 4 0M14 8V6a2 2 0 0 1 4 0" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M8 18h5M8 21h8" stroke="#a5d6a7" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  Support: () => (
    <svg viewBox="0 0 28 28" fill="none" width="28" height="28">
      <circle cx="14" cy="14" r="10" stroke="white" strokeWidth="1.6"/>
      <text x="14" y="17" textAnchor="middle" fontFamily="sans-serif" fontSize="6" fontWeight="800" fill="white">24/7</text>
    </svg>
  ),
};

/* ─────────────────────────────────────────────────────────────────
   Reusable primitives
───────────────────────────────────────────────────────────────── */
function Field({ label, required, note, children }) {
  return (
    <div className="os-field">
      <label className="os-label">
        {label}
        {note && <span className="os-label-note"> {note}</span>}
        {required && <span className="required"> *</span>}
      </label>
      {children}
    </div>
  );
}

function Input({ icon: Icon, noIcon, ...props }) {
  return (
    <div className="os-input-wrap">
      {Icon && <span className="os-input-icon"><Icon /></span>}
      <input
        className={`os-input${noIcon || !Icon ? " no-icon" : ""}`}
        {...props}
      />
    </div>
  );
}

function SelectField({ icon: Icon, children, ...props }) {
  return (
    <div className="os-input-wrap os-select-wrap">
      {Icon && <span className="os-input-icon"><Icon /></span>}
      <select
        className={`os-input os-select${Icon ? "" : " no-icon"}`}
        {...props}
      >
        {children}
      </select>
      <span className="os-select-chevron"><Ic.Chevron /></span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────────── */
export default function OutletSignUpForm() {
  const [form, setForm] = useState({
    outletName: "",
    ownerName: "",
    mobile: "",
    email: "",
    division: "",
    district: "",
    thana: "",
    address: "",
    outletType: "",
    licenseNo: "",
    openingTime: "",
    closingTime: "",
    website: "",
    network: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!agreed) {
      setError("Please agree to the Terms & Conditions to proceed.");
      return;
    }
    console.log("Outlet registration submitted:", form);
    setSubmitted(true);
  };

  /* ── Success Screen ─────────────────── */
  if (submitted) {
    return (
      <div className="os-success-screen">
        <div className="os-success-card">
          <div className="os-success-icon">✓</div>
          <h2>Outlet Registered!</h2>
          <p>
            Your outlet registration has been submitted successfully. We&apos;ll
            review your information and notify you via email once verified.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setAgreed(false);
              setForm({
                outletName: "", ownerName: "", mobile: "", email: "",
                division: "", district: "", thana: "", address: "",
                outletType: "", licenseNo: "", openingTime: "",
                closingTime: "", website: "", network: "",
              });
            }}
            className="os-success-btn"
          >
            Register Another Outlet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="os-container">
      {/* Background Image */}
      <div className="os-background">
        <Image
          src="/images/obg-login.jpg"
          alt="Compassionate healthcare at Renova Life Care"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="os-overlay" />
      </div>

      {/* Main Card */}
    <div className="os-card">
      {/* ══════════════════════════════
          SIDEBAR — Left Panel
      ══════════════════════════════ */}
      <aside className="os-sidebar">
        {/* Top white section */}
        <div className="os-sidebar-top">
          <div className="os-sidebar-dots" />

          {/* Logo */}
          <div className="os-logo-section">
            <div className="os-logo-wrap">
              <Image
                src="/images/logo.png"
                alt="Renova Life Care Logo"
                width={150}
                height={150}
                priority
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>

        {/* Wave SVG divider */}
        <div className="os-wave-divider">
          <svg
            viewBox="0 0 340 60"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* White upper shape */}
            <path
              d="M0 0 Q85 20 170 10 Q255 0 340 20 L340 0 Z"
              fill="#ffffff"
            />
            {/* Green accent wave */}
            <path
              d="M0 20 Q85 40 170 28 Q255 16 340 38 L340 60 L0 60 Z"
              fill="#2e7d32"
              opacity="0.85"
            />
            {/* Blue main fill */}
            <path
              d="M0 30 Q85 52 170 38 Q255 24 340 48 L340 60 L0 60 Z"
              fill="#1256a0"
            />
          </svg>
        </div>

        {/* Bottom blue section */}
        <div className="os-sidebar-bottom">
          {/* Leaf watermark */}
          <svg
            className="os-leaf-bg"
            viewBox="0 0 100 140"
            fill="none"
            width="90"
            height="120"
          >
            <path
              d="M50 15 C15 40 8 90 38 120 C26 88 44 52 90 38 C65 26 50 15 50 15Z"
              fill="#fff"
            />
            <path
              d="M50 15 L68 108"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          <h2 className="os-sidebar-tagline">Your Health, Our Priority</h2>
          <p className="os-sidebar-desc">
            Please fill in the information carefully.
            <br />
            All your data is secure &amp; confidential.
          </p>

          {/* Feature circles */}
          <div className="os-features">
            <div className="os-feature">
              <div className="os-feature-circle">
                <Ic.Secure />
              </div>
              <span className="os-feature-label">
                Secure
                <br />
                Data
              </span>
            </div>
            <div className="os-feature">
              <div className="os-feature-circle">
                <Ic.Manage />
              </div>
              <span className="os-feature-label">
                Easy
                <br />
                Manage
              </span>
            </div>
            <div className="os-feature">
              <div className="os-feature-circle">
                <Ic.Support />
              </div>
              <span className="os-feature-label">
                24/7
                <br />
                Support
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* ══════════════════════════════
          FORM PANEL — Right Side
      ══════════════════════════════ */}
      <main className="os-panel">
        <form onSubmit={handleSubmit} noValidate>
          {/* ── Header ── */}
          <div className="os-form-header">
            <div className="os-form-header-top">
              <div className="os-header-icon">
                <Ic.OutletIcon />
              </div>
              <h1 className="os-form-title">
                Outlet <span>Registration</span>
              </h1>
            </div>
            {/* Heartbeat bar */}
            <div className="os-pulse-bar">
              <div className="pbl" />
              <svg viewBox="0 0 70 20" fill="none" width="70" height="20">
                <polyline
                  points="0,10 10,10 14,3 19,17 24,5 29,15 34,10 44,10 49,7 54,10 64,10 70,10"
                  stroke="#4caf50"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <div className="pbl" />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="os-error" role="alert">
              {error}
            </div>
          )}

          {/* ── Basic Information ── */}
          <h3 className="os-section-title">Basic Information</h3>

          <div className="os-grid">
            <Field label="Outlet ID" note="(Auto-generated)">
              <Input icon={Ic.ID} value="OT-2025-000123" disabled readOnly />
            </Field>

            <Field label="Outlet Name" required>
              <Input
                icon={Ic.Building}
                type="text"
                placeholder="Enter outlet name"
                value={form.outletName}
                onChange={set("outletName")}
                required
              />
            </Field>
          </div>

          <div className="os-grid">
            <Field label="Owner / Manager Name" required>
              <Input
                icon={Ic.User}
                type="text"
                placeholder="Enter owner or manager name"
                value={form.ownerName}
                onChange={set("ownerName")}
                required
              />
            </Field>

            <Field label="Mobile Number (OTP)" required>
              <div className="os-otp-row">
                <Input
                  icon={Ic.Phone}
                  type="tel"
                  placeholder="+880 1XXX-XXXXXX"
                  value={form.mobile}
                  onChange={set("mobile")}
                  required
                />
                <button type="button" className="os-otp-btn">
                  Send OTP
                </button>
              </div>
            </Field>
          </div>

          <div className="os-grid">
            <Field label="Email Address" note="(Optional)">
              <Input
                icon={Ic.Email}
                type="email"
                placeholder="Enter email address"
                value={form.email}
                onChange={set("email")}
              />
            </Field>

            <Field label="Website / Facebook" note="(Optional)">
              <Input
                icon={Ic.Globe}
                type="url"
                placeholder="https://yourwebsite.com"
                value={form.website}
                onChange={set("website")}
              />
            </Field>
          </div>

          {/* ── Outlet Type ── */}
          <h3 className="os-section-title">Outlet Type</h3>

          <div style={{ marginBottom: 16 }}>
            <Field label="Select Outlet Type" required>
              <div className="os-type-btns">
                {[
                  { id: "pharmacy", label: "Pharmacy" },
                  { id: "clinic", label: "Clinic" },
                  { id: "diagnostic", label: "Diagnostic" },
                  { id: "hospital", label: "Hospital" },
                  { id: "chamber", label: "Chamber" },
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    className={`os-type-btn${form.outletType === id ? " active" : ""}`}
                    onClick={() =>
                      setForm((p) => ({ ...p, outletType: id }))
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>
            </Field>
          </div>

          <div className="os-grid">
            <Field label="Trade / License Number" required>
              <Input
                icon={Ic.License}
                type="text"
                placeholder="Enter trade or license number"
                value={form.licenseNo}
                onChange={set("licenseNo")}
                required
              />
            </Field>

            <Field label="Operating Hours" required>
              <div className="os-time-row">
                <Input
                  icon={Ic.Clock}
                  type="time"
                  value={form.openingTime}
                  onChange={set("openingTime")}
                  required
                />
                <span className="os-time-sep">to</span>
                <Input
                  icon={Ic.Clock}
                  type="time"
                  value={form.closingTime}
                  onChange={set("closingTime")}
                  required
                />
              </div>
            </Field>
          </div>

          {/* ── Location ── */}
          <h3 className="os-section-title">Location</h3>

          <div className="os-grid os-grid-3">
            <Field label="Division" required>
              <SelectField
                icon={Ic.Location}
                value={form.division}
                onChange={set("division")}
                required
              >
                <option value="">Select division</option>
                {[
                  "Dhaka",
                  "Chittagong",
                  "Rajshahi",
                  "Khulna",
                  "Sylhet",
                  "Barisal",
                  "Rangpur",
                  "Mymensingh",
                ].map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </SelectField>
            </Field>

            <Field label="District" required>
              <SelectField
                icon={Ic.Location}
                value={form.district}
                onChange={set("district")}
                required
              >
                <option value="">Select district</option>
                <option>Dhaka</option>
                <option>Gazipur</option>
                <option>Narayanganj</option>
                <option>Chittagong</option>
                <option>Sylhet</option>
              </SelectField>
            </Field>

            <Field label="Thana / Upazila" required>
              <SelectField
                icon={Ic.Location}
                value={form.thana}
                onChange={set("thana")}
                required
              >
                <option value="">Select thana</option>
                <option>Mirpur</option>
                <option>Dhanmondi</option>
                <option>Gulshan</option>
                <option>Uttara</option>
                <option>Motijheel</option>
                <option>Kafrul</option>
                <option>Mohammadpur</option>
              </SelectField>
            </Field>
          </div>

          <div style={{ marginBottom: 16 }}>
            <Field label="Full Address" required>
              <div className="os-input-wrap" style={{ alignItems: "flex-start" }}>
                <span
                  className="os-input-icon"
                  style={{ top: 13, transform: "none" }}
                >
                  <Ic.Map />
                </span>
                <textarea
                  className="os-textarea"
                  rows={3}
                  placeholder="Enter outlet full address (House, Road, Area…)"
                  value={form.address}
                  onChange={set("address")}
                  required
                />
              </div>
            </Field>
          </div>

          {/* ── Network Assignment ── */}
          <h3 className="os-section-title">Network Assignment</h3>

          <div className="os-outlet-select-wrap">
            <span className="os-outlet-icon">
              <Ic.Network />
            </span>
            <select
              className="os-outlet-select"
              value={form.network}
              onChange={set("network")}
              required
            >
              <option value="">Select network / zone</option>
              <option value="dhaka-central">Dhaka Central Network</option>
              <option value="dhaka-north">Dhaka North Zone</option>
              <option value="dhaka-south">Dhaka South Zone</option>
              <option value="chittagong">Chittagong Network</option>
              <option value="sylhet">Sylhet Network</option>
              <option value="rajshahi">Rajshahi Network</option>
            </select>
            <span className="os-select-chevron">
              <Ic.Chevron />
            </span>
          </div>

          {/* Verification banner */}
          <div className="os-verify-banner">
            <div className="os-verify-icon">
              <Ic.Shield />
            </div>
            <div className="os-verify-text">
              <h4>Your information is safe with us.</h4>
              <p>
                We never share your outlet data or personal information with
                anyone. All data is encrypted and stored securely.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="os-form-footer">
            <label className="os-agree-row">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              I agree to the{" "}
              <a href="/terms" target="_blank" rel="noreferrer">
                Terms &amp; Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" target="_blank" rel="noreferrer">
                Privacy Policy
              </a>{" "}
              *
            </label>

            <button
              type="submit"
              className="os-submit-btn"
              disabled={!agreed}
            >
              <Ic.Submit />
              Submit Registration
            </button>
          </div>
        </form>

        {/* Security notice */}
        <div className="os-security-notice">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>
            Your connection is secure. All data is encrypted end-to-end.
          </span>
        </div>
      </main>
    </div>
  );
    </div>
  );
}