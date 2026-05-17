"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import "./patient-signup.css";

// ── inline SVG icons ──────────────────────────────────────────
const Icon = {
  ID: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <rect x="1" y="3" width="14" height="10" rx="2" stroke="#94a3b8" strokeWidth="1.3"/>
      <circle cx="5.5" cy="8" r="1.5" stroke="#94a3b8" strokeWidth="1.2"/>
      <path d="M9 6.5h4M9 8h3M9 9.5h4" stroke="#94a3b8" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  ),
  User: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <circle cx="8" cy="5.5" r="2.5" stroke="#94a3b8" strokeWidth="1.3"/>
      <path d="M2.5 14c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  Reference: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <circle cx="6" cy="5" r="2.5" stroke="#94a3b8" strokeWidth="1.3"/>
      <path d="M1.5 13c0-2.761 2.015-5 4.5-5" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="12" cy="9" r="2" stroke="#94a3b8" strokeWidth="1.2"/>
      <path d="M9 13c0-1.657 1.343-3 3-3" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M13 10.2c0 .2-.05.4-.14.6-.1.2-.22.38-.38.54-.28.3-.58.45-.9.45-.23 0-.48-.06-.74-.17-.26-.11-.52-.27-.78-.47-.27-.2-.52-.42-.77-.66-.25-.24-.47-.49-.67-.75-.2-.26-.36-.52-.47-.77-.11-.25-.17-.49-.17-.72 0-.22.05-.44.15-.64.1-.2.25-.39.44-.55.23-.18.49-.27.76-.27.1 0 .21.02.31.06.1.04.19.1.26.2l.94 1.33c.07.1.12.18.15.27.03.08.05.16.05.23 0 .09-.03.18-.07.27-.05.09-.11.18-.19.25l-.27.27c-.04.04-.06.08-.06.13 0 .03.01.05.02.08.01.03.03.05.04.07.07.12.18.28.35.47.17.2.34.4.54.59.19.19.38.37.58.54.19.17.35.29.48.35.02.01.04.02.08.03.04.01.07.02.11.02.06 0 .1-.02.14-.07l.27-.27c.09-.09.18-.16.26-.19.08-.04.16-.06.26-.06.07 0 .14.01.22.05.08.03.16.08.25.15l1.36.96c.1.07.17.15.2.25.04.1.05.2.05.31z" stroke="#94a3b8" strokeWidth="1.2"/>
    </svg>
  ),
  Email: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="#94a3b8" strokeWidth="1.3"/>
      <path d="M1.5 4.5L8 9l6.5-4.5" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  Calendar: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <rect x="1.5" y="3" width="13" height="11" rx="1.5" stroke="#94a3b8" strokeWidth="1.3"/>
      <path d="M5 1.5v3M11 1.5v3M1.5 7h13" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  Blood: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M8 2S4 7 4 10a4 4 0 0 0 8 0C12 7 8 2 8 2z" stroke="#94a3b8" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  ),
  Location: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M8 1.5a5 5 0 0 1 5 5c0 4-5 8-5 8s-5-4-5-8a5 5 0 0 1 5-5z" stroke="#94a3b8" strokeWidth="1.3"/>
      <circle cx="8" cy="6.5" r="1.5" stroke="#94a3b8" strokeWidth="1.2"/>
    </svg>
  ),
  Outlet: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <rect x="1.5" y="4" width="13" height="10" rx="1.5" stroke="#94a3b8" strokeWidth="1.3"/>
      <path d="M5.5 4V3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M1.5 9h13" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
      <path d="M4 6l4 4 4-4" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Patient: () => (
    <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
      <path d="M10 2L3 5.5v5C3 14.7 6.1 17.9 10 19c3.9-1.1 7-4.3 7-8.5v-5L10 2z" fill="currentColor"/>
      <path d="M7 10l2 2.5L13 8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Submit: () => (
    <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 10l2 2.5L13 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Secure: () => (
    <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
      <path d="M12 3L4 7v5c0 4.418 3.582 8 8 9 4.418-1 8-4.582 8-9V7l-8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <rect x="10" y="11" width="4" height="5" rx="1" fill="currentColor" opacity="0.85"/>
      <circle cx="12" cy="10" r="1.5" fill="currentColor" opacity="0.7"/>
      <path d="M10 11V9.5a2 2 0 0 1 4 0V11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  Care: () => (
    <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
      <path d="M7 17 C5 15 3 12 5 10 C7 8 9 10 9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M17 17 C19 15 21 12 19 10 C17 8 15 10 15 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 12 Q12 18 15 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 9.5 C10 7.5 12 6.5 12 6.5 C12 6.5 14 7.5 14 9.5 C14 11 12 12.5 12 12.5 C12 12.5 10 11 10 9.5Z" fill="currentColor"/>
    </svg>
  ),
  Support: () => (
    <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6"/>
      <text x="12" y="14.5" textAnchor="middle" fontFamily="sans-serif" fontSize="5.5" fontWeight="700" fill="currentColor">24/7</text>
      <path d="M17 7 C16 5 14 5 14 7 C14 9 17 9 17 7Z" fill="currentColor"/>
    </svg>
  ),
};

// ── reusable field wrapper ────────────────────────────────────
function Field({ label, required, children, className = "" }) {
  return (
    <div className={`ps-field ${className}`}>
      <label className="ps-label">
        {label}
        {required && <span className="required"> *</span>}
      </label>
      {children}
    </div>
  );
}

function Input({ icon: IconComp, hasIcon = true, ...props }) {
  return (
    <div className="ps-input-wrap">
      {IconComp && hasIcon && (
        <span className="ps-input-icon">
          <IconComp />
        </span>
      )}
      <input 
        className={`ps-input ${hasIcon ? '' : 'no-icon'}`} 
        {...props} 
      />
    </div>
  );
}

function Select({ icon: IconComp, children, className = "", ...props }) {
  return (
    <div className="ps-input-wrap ps-select-wrap">
      {IconComp && (
        <span className="ps-input-icon">
          <IconComp />
        </span>
      )}
      <select className={`ps-input ps-select ${className}`} {...props}>
        {children}
      </select>
      <span className="ps-select-chevron">
        <Icon.ChevronDown />
      </span>
    </div>
  );
}

// ── main component ────────────────────────────────────────────
export default function PatientSignUpForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    referenceName: "",
    mobile: "",
    email: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    address: "",
    outlet: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  // auto-calculate age from DOB
  useEffect(() => {
    if (!formData.dob) { setAge(""); return; }
    const birth = new Date(formData.dob);
    const today = new Date();
    let a = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) a--;
    setAge(a >= 0 ? String(a) : "");
  }, [formData.dob]);

  const set = (field) => (e) =>
    setFormData((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (!agreed) {
      setError("Please agree to the Terms & Conditions to proceed");
      return;
    }
    
    // Handle form submission logic here
    console.log("Patient registration submitted:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="ps-success-screen">
        <div className="ps-success-card">
          <div className="ps-success-icon">✓</div>
          <h2>Registration Submitted!</h2>
          <p>Your patient account has been created successfully. You will receive a confirmation SMS shortly.</p>
          <button
            onClick={() => { setSubmitted(false); setAgreed(false); setFormData({
              fullName: "", referenceName: "", mobile: "", email: "", dob: "",
              gender: "", bloodGroup: "", address: "", outlet: "",
            }); }}
            className="ps-success-btn"
          >
            Register Another Patient
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ps-container">
      {/* Background Image */}
      <div className="ps-background">
        <Image
          src="/images/pbg-login.jpg"
          alt="Compassionate healthcare at Renova Life Care"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="ps-overlay" />
      </div>

      {/* Main Card */}
      <div className="ps-card">
        {/* Sidebar - Left Panel */}
        <aside className="ps-sidebar">
          {/* Decorative Elements */}
          <div className="ps-sidebar-dots"></div>
          <svg className="ps-leaf-watermark" viewBox="0 0 80 110" fill="none">
            <path d="M40 10 C10 30 5 70 30 95 C20 70 35 40 70 30 C50 20 40 10 40 10Z" fill="#4CAF50"/>
            <path d="M40 10 L55 85" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>

          {/* Logo Section */}
          <div className="ps-logo-section">
            <div className="ps-logo-image-wrap">
              <Image 
                src="/images/logo.png" 
                alt="Renova Life Care" 
                width={140} 
                height={140}
                priority
                className="ps-logo-image"
              />
            </div>
          </div>

          {/* Sidebar Content */}
          <h2 className="ps-sidebar-title">Your Health,<br/>Our Priority</h2>
          <p className="ps-sidebar-subtitle">
            Please fill in the information carefully.<br/>
            All your data is secure & confidential.
          </p>

          {/* Feature Circles */}
          <div className="ps-features">
            <div className="ps-feature">
              <div className="ps-feature-circle">
                <Icon.Secure />
              </div>
              <span className="ps-feature-label">Secure<br/>Data</span>
            </div>
            <div className="ps-feature">
              <div className="ps-feature-circle">
                <Icon.Care />
              </div>
              <span className="ps-feature-label">Better<br/>Care</span>
            </div>
            <div className="ps-feature">
              <div className="ps-feature-circle">
                <Icon.Support />
              </div>
              <span className="ps-feature-label">24/7<br/>Support</span>
            </div>
          </div>

          {/* Green Accent Bar */}
          <div className="ps-sidebar-accent"></div>
        </aside>

        {/* Form Panel - Right Side */}
        <main className="ps-panel">
          <form onSubmit={handleSubmit} noValidate>
            {/* Form Header */}
            <div className="ps-form-header">
              <div className="ps-form-header-top">
                <div className="ps-header-icon">
                  <Icon.Patient />
                </div>
                <h1 className="ps-form-title">Patient <span>Registration</span></h1>
              </div>
              <div className="ps-pulse-bar">
                <div className="pbl" />
                <svg viewBox="0 0 70 20" fill="none" width="70" height="20">
                  <polyline
                    points="0,10 12,10 17,2 22,18 27,4 32,16 37,10 50,10 55,6 60,10 70,10"
                    stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
                  />
                </svg>
                <div className="pbl" />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="ps-error" role="alert">
                {error}
              </div>
            )}

            {/* Row 1: Patient ID + Full Name */}
            <div className="ps-grid">
              <Field label="Patient ID (Auto-generated)">
                <Input icon={Icon.ID} value="PT-2025-000123" disabled readOnly />
              </Field>
              <Field label="Full Name" required>
                <Input icon={Icon.User} type="text" placeholder="Enter full name" value={formData.fullName} onChange={set("fullName")} required />
              </Field>
            </div>

            {/* Row 2: Reference Name + Mobile (OTP) */}
            <div className="ps-grid">
              <Field label="Reference Name">
                <Input icon={Icon.Reference} type="text" placeholder="Enter reference name" value={formData.referenceName} onChange={set("referenceName")} />
              </Field>
              <Field label="Mobile Number (OTP)" required>
                <div className="ps-otp-row">
                  <Input icon={Icon.Phone} type="tel" placeholder="+880 1XXX-XXXXXX" value={formData.mobile} onChange={set("mobile")} required />
                  <button type="button" className="ps-otp-btn">Send OTP</button>
                </div>
              </Field>
            </div>

            {/* Row 3: Email + DOB */}
            <div className="ps-grid">
              <Field label="Email (Optional)">
                <Input icon={Icon.Email} type="email" placeholder="Enter email address" value={formData.email} onChange={set("email")} />
              </Field>
              <Field label="Date of Birth" required>
                <Input icon={Icon.Calendar} type="date" value={formData.dob} onChange={set("dob")} required />
              </Field>
            </div>

            {/* Row 4: Age (auto) + Gender */}
            <div className="ps-grid">
              <Field label="Age">
                <Input icon={Icon.User} type="text" placeholder="Auto calculated" value={age ? `${age} years` : ""} disabled readOnly />
              </Field>
              <Field label="Gender" required>
                <div className="ps-gender-btns">
                  {["Male", "Female", "Other"].map((g) => (
                    <button
                      key={g}
                      type="button"
                      className={`ps-gender-btn${formData.gender === g ? " active" : ""}`}
                      onClick={() => setFormData(p => ({...p, gender: g}))}
                    >
                      <Icon.User /> {g}
                    </button>
                  ))}
                </div>
              </Field>
            </div>

            {/* Row 5: Blood Group + Address */}
            <div className="ps-grid">
              <Field label="Blood Group" required>
                <Select icon={Icon.Blood} value={formData.bloodGroup} onChange={set("bloodGroup")} required>
                  <option value="">Select blood group</option>
                  {["A+","A−","B+","B−","AB+","AB−","O+","O−"].map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Address" required>
                <div className="ps-input-wrap" style={{alignItems: "flex-start"}}>
                  <span className="ps-input-icon" style={{top: 14, transform: "none"}}>
                    <Icon.Location />
                  </span>
                  <textarea
                    className="ps-textarea"
                    placeholder="Enter your full address"
                    rows={3}
                    value={formData.address}
                    onChange={set("address")}
                    required
                  />
                </div>
              </Field>
            </div>

            {/* Divider */}
            <div className="ps-section-divider"></div>

            {/* Outlet Selection - Full Width */}
            <Field label="Outlet Selection" required>
              <div className="ps-outlet-wrap">
                <span className="ps-outlet-icon">
                  <Icon.Outlet />
                </span>
                <select 
                  className="ps-outlet-select" 
                  value={formData.outlet} 
                  onChange={set("outlet")} 
                  required
                >
                  <option value="">Select outlet</option>
                  <option value="dhaka-main">Dhaka Main Branch</option>
                  <option value="chittagong">Chittagong Branch</option>
                  <option value="sylhet">Sylhet Branch</option>
                  <option value="rajshahi">Rajshahi Branch</option>
                  <option value="khulna">Khulna Branch</option>
                </select>
                <span className="ps-outlet-chevron">
                  <Icon.ChevronDown />
                </span>
              </div>
            </Field>

            {/* Verification Banner */}
            <div className="ps-verify-banner">
              <div className="ps-verify-icon">
                <Icon.Shield />
              </div>
              <div className="ps-verify-text">
                <h4>Your information is safe with us</h4>
                <p>We never share your personal information with anyone. All data is encrypted and stored securely.</p>
              </div>
            </div>

            {/* Form Footer */}
            <div className="ps-form-footer">
              <label className="ps-agree-row">
                <input 
                  type="checkbox" 
                  checked={agreed} 
                  onChange={e => setAgreed(e.target.checked)} 
                />
                I agree to the <a href="/terms" target="_blank">Terms & Conditions</a> and <a href="/privacy" target="_blank">Privacy Policy</a> *
              </label>
              <button type="submit" className="ps-submit-btn" disabled={!agreed}>
                <Icon.Submit />
                Submit Registration
              </button>
            </div>
          </form>

          {/* Security Notice */}
          <div className="ps-security-notice">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>Your connection is secure. All data is encrypted end-to-end.</span>
          </div>
        </main>
      </div>
    </div>
  );
}