"use client";
import { useState } from "react";
import Image from "next/image";
import "./outlet-signup.css";
import {
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Globe,
  Clock,
  Shield,
  CheckCircle,
  ChevronDown,
  Store,
  Briefcase,
  CreditCard,
  Headphones,
  FileText,
  Calendar,
  Plus,
  X,
  Home,
  Navigation
} from "lucide-react";

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
      {Icon && <span className="os-input-icon"><Icon size={14} /></span>}
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
      {Icon && <span className="os-input-icon"><Icon size={14} /></span>}
      <select
        className={`os-input os-select${Icon ? "" : " no-icon"}`}
        {...props}
      >
        {children}
      </select>
      <span className="os-select-chevron"><ChevronDown size={13} /></span>
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
                d="M0 30 Q85 52 170 38 Q248 24 340 48 L340 60 L0 60 Z"
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
                  <Shield size={26} />
                </div>
                <span className="os-feature-label">
                  Secure
                  <br />
                  Data
                </span>
              </div>
              <div className="os-feature">
                <div className="os-feature-circle">
                  <Store size={26} />
                </div>
                <span className="os-feature-label">
                  Easy
                  <br />
                  Manage
                </span>
              </div>
              <div className="os-feature">
                <div className="os-feature-circle">
                  <Headphones size={26} />
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
                  <Building2 size={24} />
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
                <Input icon={CreditCard} value="OT-2025-000123" disabled readOnly />
              </Field>

              <Field label="Outlet Name" required>
                <Input
                  icon={Building2}
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
                  icon={User}
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
                    icon={Phone}
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
                  icon={Mail}
                  type="email"
                  placeholder="Enter email address"
                  value={form.email}
                  onChange={set("email")}
                />
              </Field>

              <Field label="Website / Facebook" note="(Optional)">
                <Input
                  icon={Globe}
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
                  icon={FileText}
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
                    icon={Clock}
                    type="time"
                    value={form.openingTime}
                    onChange={set("openingTime")}
                    required
                  />
                  <span className="os-time-sep">to</span>
                  <Input
                    icon={Clock}
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
                  icon={Navigation}
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
                  icon={Navigation}
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
                  icon={Navigation}
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
                    <MapPin size={14} />
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
                <Store size={14} />
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
                <ChevronDown size={13} />
              </span>
            </div>

            {/* Verification banner */}
            <div className="os-verify-banner">
              <div className="os-verify-icon">
                <Shield size={28} />
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
                <CheckCircle size={18} />
                Submit Registration
              </button>
            </div>
          </form>

          {/* Security notice */}
          <div className="os-security-notice">
            <Shield size={13} />
            <span>
              Your connection is secure. All data is encrypted end-to-end.
            </span>
          </div>
        </main>
      </div>
    </div>
  );
}