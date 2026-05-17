"use client";
import { useState } from "react";
import Image from "next/image";

// ── inline SVG icons ──────────────────────────────────────────
const Icon = {
  Doctor: () => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <circle cx="20" cy="20" r="19" stroke="#1E6FAF" strokeWidth="2" fill="white"/>
      <circle cx="20" cy="14" r="5" stroke="#1E6FAF" strokeWidth="1.8"/>
      <path d="M10 32c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#1E6FAF" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M17 22v4M23 22v4M17 24h6" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  ID: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <rect x="1" y="3" width="14" height="10" rx="2" stroke="#64748b" strokeWidth="1.3"/>
      <circle cx="5.5" cy="8" r="1.5" stroke="#64748b" strokeWidth="1.2"/>
      <path d="M9 6.5h4M9 8h3M9 9.5h4" stroke="#64748b" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  ),
  User: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <circle cx="8" cy="5.5" r="2.5" stroke="#64748b" strokeWidth="1.3"/>
      <path d="M2.5 14c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5" stroke="#64748b" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <path d="M14 10.667c0 .244-.053.484-.163.72a2.62 2.62 0 0 1-.437.64c-.333.367-.7.547-1.087.547-.276 0-.573-.067-.89-.205a9.085 9.085 0 0 1-.89-.494 14.21 14.21 0 0 1-.853-.693 14.023 14.023 0 0 1-.787-.8 13.81 13.81 0 0 1-.686-.853 8.853 8.853 0 0 1-.487-.893c-.133-.307-.2-.6-.2-.88 0-.273.06-.534.18-.773.12-.244.3-.467.533-.667.28-.22.587-.327.913-.327.127 0 .254.027.367.08.12.053.226.133.307.253l1.133 1.6c.08.113.14.22.18.32.04.1.06.193.06.28 0 .107-.03.213-.087.32a1.31 1.31 0 0 1-.233.3l-.32.333c-.047.047-.067.1-.067.16 0 .033.007.06.02.093.02.033.04.06.053.087.08.147.22.34.42.573.2.234.413.474.647.707.233.233.46.453.7.66.233.207.426.347.58.42.02.013.053.027.093.04.047.013.087.02.133.02.067 0 .12-.027.167-.08l.32-.32c.107-.107.213-.187.313-.233a.633.633 0 0 1 .32-.08c.087 0 .173.02.267.06.093.04.193.1.3.18l1.633 1.153c.12.08.2.18.247.3.04.12.06.247.06.38z" stroke="#64748b" strokeWidth="1.2"/>
    </svg>
  ),
  Email: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="#64748b" strokeWidth="1.3"/>
      <path d="M1.5 4.5L8 9l6.5-4.5" stroke="#64748b" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  Calendar: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <rect x="1.5" y="3" width="13" height="11" rx="1.5" stroke="#64748b" strokeWidth="1.3"/>
      <path d="M5 1.5v3M11 1.5v3M1.5 7h13" stroke="#64748b" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M4 6l4 4 4-4" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  BMDC: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <rect x="2" y="1.5" width="12" height="13" rx="1.5" stroke="#64748b" strokeWidth="1.3"/>
      <path d="M5 5h6M5 7.5h6M5 10h4" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Stethoscope: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <path d="M3 2.5c0 2.5 1.5 4.5 4 4.5s4-2 4-4.5" stroke="#64748b" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M7 7v3.5a2.5 2.5 0 0 0 5 0V9" stroke="#64748b" strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="12.5" cy="8.5" r="1" fill="#64748b"/>
    </svg>
  ),
  Degree: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <path d="M8 2L1 6l7 4 7-4-7-4z" stroke="#64748b" strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M4 8v3c0 1.105 1.79 2 4 2s4-.895 4-2V8" stroke="#64748b" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  Clock: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <circle cx="8" cy="8" r="6" stroke="#64748b" strokeWidth="1.3"/>
      <path d="M8 4.5V8l2.5 2" stroke="#64748b" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Taka: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <text x="3" y="12.5" fontFamily="serif" fontSize="12" fill="#64748b">৳</text>
    </svg>
  ),
  Video: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <rect x="1" y="4" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M11 6.5l4-2v7l-4-2V6.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  ),
  Audio: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M8 1.5a2.5 2.5 0 0 1 2.5 2.5v4a2.5 2.5 0 0 1-5 0V4A2.5 2.5 0 0 1 8 1.5z" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M3 8a5 5 0 0 0 10 0M8 13v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  Chat: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M13.5 8.5c0 2.485-2.462 4.5-5.5 4.5a6.28 6.28 0 0 1-2.236-.407L2 13.5l1.1-2.8A4.24 4.24 0 0 1 2.5 8.5C2.5 6.015 4.962 4 8 4s5.5 2.015 5.5 4.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  ),
  Photo: () => (
    <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
      <circle cx="16" cy="14" r="6" stroke="#64748b" strokeWidth="1.5"/>
      <path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  NID: () => (
    <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
      <rect x="3" y="7" width="26" height="18" rx="2" stroke="#64748b" strokeWidth="1.5"/>
      <circle cx="11" cy="16" r="3" stroke="#64748b" strokeWidth="1.4"/>
      <path d="M17 13h8M17 16h6M17 19h8" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  BMDCID: () => (
    <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
      <rect x="4" y="3" width="24" height="26" rx="2" stroke="#64748b" strokeWidth="1.5"/>
      <path d="M9 10h14M9 14h14M9 18h10" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="22" cy="22" r="4" fill="white" stroke="#4CAF50" strokeWidth="1.5"/>
      <path d="M20 22l1.5 1.5L24 20" stroke="#4CAF50" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  EduCert: () => (
    <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
      <path d="M16 4L3 11l13 7 13-7-13-7z" stroke="#64748b" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M7 15v6c0 2.209 4.03 4 9 4s9-1.791 9-4v-6" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  ExpCert: () => (
    <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
      <rect x="3" y="7" width="26" height="20" rx="2" stroke="#64748b" strokeWidth="1.5"/>
      <path d="M10 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" stroke="#64748b" strokeWidth="1.5"/>
      <path d="M9 17h14M9 21h10" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
      <path d="M10 2L3 5v5c0 4.418 3.134 7.656 7 8.5C13.866 17.656 17 14.418 17 10V5l-7-3z" stroke="#4CAF50" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M7 10l2 2 4-4" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Submit: () => (
    <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 10l2 2.5L13 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Lock: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <rect x="3" y="7.5" width="10" height="7" rx="1.5" stroke="#4CAF50" strokeWidth="1.3"/>
      <path d="M5.5 7.5V5a2.5 2.5 0 0 1 5 0v2.5" stroke="#4CAF50" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  Designation: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke="#64748b" strokeWidth="1.3"/>
      <path d="M5 7h6M5 9.5h4" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Globe: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <circle cx="8" cy="8" r="6" stroke="#64748b" strokeWidth="1.3"/>
      <path d="M8 2c-2 2-2 8 0 12M8 2c2 2 2 8 0 12M2 8h12" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Blood: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <path d="M8 2S4 7 4 10a4 4 0 0 0 8 0C12 7 8 2 8 2z" stroke="#64748b" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  ),
  Verified: () => (
    <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
      <circle cx="24" cy="24" r="24" fill="rgba(255,255,255,0.15)"/>
      <path d="M24 12L15 21l-3-3-4 4 7 7 13-13-4-4z" fill="white"/>
    </svg>
  ),
  Grow: () => (
    <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
      <circle cx="24" cy="24" r="24" fill="rgba(255,255,255,0.15)"/>
      <path d="M16 32c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="24" cy="18" r="4" stroke="white" strokeWidth="2"/>
      <path d="M30 24l4 4-4 4M34 28h6" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Manage: () => (
    <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
      <circle cx="24" cy="24" r="24" fill="rgba(255,255,255,0.15)"/>
      <path d="M14 34l6-7 5 5 7-10 6 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 38h20" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};

// ── reusable field wrapper ────────────────────────────────────
function Field({ label, required, children, className = "" }) {
  return (
    <div className={`field-group ${className}`}>
      <label className="field-label">
        {label}
        {required && <span className="field-required"> *</span>}
      </label>
      {children}
    </div>
  );
}

function Input({ icon: IconComp, ...props }) {
  return (
    <div className="input-wrap">
      {IconComp && <span className="input-icon"><IconComp /></span>}
      <input className={`field-input ${IconComp ? "has-icon" : ""}`} {...props} />
    </div>
  );
}

function Select({ icon: IconComp, children, ...props }) {
  return (
    <div className="input-wrap">
      {IconComp && <span className="input-icon"><IconComp /></span>}
      <select className={`field-input field-select ${IconComp ? "has-icon" : ""}`} {...props}>
        {children}
      </select>
      <span className="select-chevron"><Icon.ChevronDown /></span>
    </div>
  );
}

// ── main component ────────────────────────────────────────────
export default function DoctorSignUpForm() {
  const [consultType, setConsultType] = useState("video");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (agreed) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="ds-success-screen">
        <div className="ds-success-card">
          <div className="ds-success-icon">✅</div>
          <h2>Registration Submitted!</h2>
          <p>Your application has been received. We'll notify you once verified.</p>
          <button onClick={() => setSubmitted(false)} className="ds-btn-success">Register Another Doctor</button>
        </div>
      </div>
    );
  }

  return (
    <div className="ds-root">
      {/* ── Sidebar ── */}
      <aside className="ds-sidebar">
        {/* Dot pattern */}
        <div className="ds-sidebar-dots"></div>

        {/* Logo card */}
        <div className="ds-sidebar-logo-card">
          <div className="ds-logo-icon-wrap">
            <Image 
              src="/images/logo.png" 
              alt="Renova Life Care" 
              width={52} 
              height={52}
              priority
            />
          </div>
        </div>

        <h2 className="ds-sidebar-title">Join Our Medical<br/>Network</h2>
        <p className="ds-sidebar-subtitle">Register as a doctor and start providing quality care to patients.</p>

        {/* Benefits */}
        <div className="ds-benefit-item">
          <div className="ds-benefit-icon">
            <Icon.Verified />
          </div>
          <div className="ds-benefit-content">
            <h4>Verified & Secure</h4>
            <p>Your data is safe with us</p>
          </div>
        </div>

        <div className="ds-benefit-item">
          <div className="ds-benefit-icon">
            <Icon.Grow />
          </div>
          <div className="ds-benefit-content">
            <h4>Grow Your Practice</h4>
            <p>Connect with more patients</p>
          </div>
        </div>

        <div className="ds-benefit-item">
          <div className="ds-benefit-icon">
            <Icon.Manage />
          </div>
          <div className="ds-benefit-content">
            <h4>Manage Easily</h4>
            <p>Smart tools for doctors</p>
          </div>
        </div>

        {/* Green wave blob */}
        <svg className="ds-sidebar-wave" viewBox="0 0 320 340" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 340 L0 180 Q40 100 100 130 Q160 160 200 110 Q240 60 280 90 Q310 110 320 80 L320 340 Z" fill="#3d9140" opacity="0.55"/>
          <path d="M0 340 L0 210 Q50 150 110 175 Q170 200 210 155 Q250 110 290 140 Q310 155 320 135 L320 340 Z" fill="#4CAF50" opacity="0.75"/>
          <path d="M0 340 L0 250 Q60 200 130 220 Q190 238 230 200 Q265 168 300 185 Q315 193 320 180 L320 340 Z" fill="#5cb85c" opacity="0.9"/>
          <path d="M0 340 L0 290 Q80 255 150 268 Q210 280 255 250 Q285 232 320 245 L320 340 Z" fill="#66bb6a"/>
        </svg>
      </aside>

      {/* ── Form Panel ── */}
      <main className="ds-panel">
        <form className="ds-form-card" onSubmit={handleSubmit} noValidate>
          {/* Header */}
          <div className="ds-form-header">
            <Icon.Doctor />
            <div style={{flex:1}}>
              <h1 className="ds-form-title">Doctor <span>Registration</span></h1>
              <p className="ds-form-subtitle">Fill in the details to create your doctor account</p>
              <div className="ds-pulse-line">
                <div className="line"></div>
                <svg className="ds-pulse-svg" viewBox="0 0 60 18" fill="none">
                  <polyline points="0,9 10,9 15,2 20,16 25,4 30,14 35,9 45,9 50,5 55,9 60,9"
                    stroke="#4CAF50" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
                <div className="line"></div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="ds-form-body">
            {/* Personal Information */}
            <div className="ds-section-title">Personal Information</div>
            <div className="ds-grid-3">
              <Field label="Doctor ID (Auto-generated)">
                <Input icon={Icon.ID} value="DR-2025-000123" disabled readOnly placeholder="DR-2025-000123"/>
              </Field>
              <Field label="Full Name" required>
                <Input icon={Icon.User} type="text" placeholder="Enter full name"/>
              </Field>
              <Field label="Father's / Husband's Name">
                <Input icon={Icon.User} type="text" placeholder="Enter father's / husband's name"/>
              </Field>
            </div>

            <div className="ds-grid-3">
              <Field label="Mobile Number" required>
                <div className="otp-row">
                  <div className="input-wrap" style={{flex:1}}>
                    <span className="input-icon"><Icon.Phone /></span>
                    <input className="field-input has-icon" type="tel" placeholder="Enter mobile number"/>
                  </div>
                  <button type="button" className="btn-otp">Send OTP</button>
                </div>
              </Field>
              <Field label="Email Address" required>
                <Input icon={Icon.Email} type="email" placeholder="Enter email address"/>
              </Field>
              <Field label="Date of Birth" required>
                <Input icon={Icon.Calendar} type="date" placeholder="Select date of birth"/>
              </Field>
            </div>

            <div className="ds-grid-3">
              <Field label="Gender" required>
                <Select icon={Icon.User}>
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Select>
              </Field>
              <Field label="Blood Group">
                <Select icon={Icon.Blood}>
                  <option value="">Select blood group</option>
                  {["A+","A−","B+","B−","AB+","AB−","O+","O−"].map(g=><option key={g}>{g}</option>)}
                </Select>
              </Field>
              <Field label="Nationality">
                <Select icon={Icon.Globe}>
                  <option value="">Select nationality</option>
                  <option>Bangladeshi</option>
                  <option>Other</option>
                </Select>
              </Field>
            </div>

            {/* Professional Information */}
            <div className="ds-section-title" style={{marginTop:28}}>Professional Information</div>
            <div className="ds-grid-3">
              <Field label="BMDC / Registration Number" required>
                <Input icon={Icon.BMDC} type="text" placeholder="Enter BMDC / Reg. number"/>
              </Field>
              <Field label="Specialization" required>
                <Select icon={Icon.Stethoscope}>
                  <option value="">Select specialization</option>
                  <option>Cardiology</option>
                  <option>Dermatology</option>
                  <option>ENT</option>
                  <option>General Medicine</option>
                  <option>Gynecology</option>
                  <option>Neurology</option>
                  <option>Orthopedics</option>
                  <option>Pediatrics</option>
                  <option>Psychiatry</option>
                  <option>Surgery</option>
                </Select>
              </Field>
              <Field label="Sub Specialization">
                <Select icon={Icon.Stethoscope}>
                  <option value="">Select sub specialization</option>
                  <option>Interventional Cardiology</option>
                  <option>Pediatric Surgery</option>
                  <option>Spine Surgery</option>
                </Select>
              </Field>
            </div>

            <div className="ds-grid-3">
              <Field label="Qualification" required>
                <Input icon={Icon.Degree} type="text" placeholder="Enter highest qualification"/>
              </Field>
              <Field label="Experience" required>
                <div className="input-wrap">
                  <span className="input-icon"><Icon.Clock /></span>
                  <input className="field-input has-icon" type="number" min="0" placeholder="Enter years of experience" style={{paddingRight:52}}/>
                  <span style={{position:"absolute",right:12,fontSize:"0.75rem",color:"var(--muted)",pointerEvents:"none"}}>Years</span>
                </div>
              </Field>
              <Field label="Current Designation">
                <Input icon={Icon.Designation} type="text" placeholder="Enter current designation"/>
              </Field>
            </div>

            {/* Work & Availability */}
            <div className="ds-section-title" style={{marginTop:28}}>Work & Availability</div>
            <div className="ds-grid-3">
              <Field label="Consultation Type" required>
                <div className="consult-btns" style={{marginTop:2}}>
                  {[
                    {id:"video", label:"Video Call", Ic: Icon.Video},
                    {id:"audio", label:"Audio Call", Ic: Icon.Audio},
                    {id:"chat",  label:"Chat Only",  Ic: Icon.Chat},
                  ].map(({id,label,Ic}) => (
                    <button
                      key={id}
                      type="button"
                      className={`consult-btn ${consultType === id ? "active" : ""}`}
                      onClick={() => setConsultType(id)}
                    >
                      <Ic /> {label}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Work Schedule" required>
                <Select icon={Icon.Calendar}>
                  <option value="">Select work schedule</option>
                  <option>Morning (8am – 2pm)</option>
                  <option>Evening (2pm – 8pm)</option>
                  <option>Full Day (8am – 8pm)</option>
                  <option>Night (8pm – 8am)</option>
                </Select>
              </Field>
              <Field label="Consultation Fee (৳)" required>
                <Input icon={Icon.Taka} type="number" min="0" placeholder="Enter consultation fee"/>
              </Field>
            </div>

            {/* Documents Upload */}
            <div className="ds-section-title" style={{marginTop:28}}>Documents Upload</div>
            <div className="ds-docs-grid">
              {[
                {Ic: Icon.Photo,   title: "Profile Photo",            req: true,  hint: "JPG, PNG (Max 2MB)",      btn: "Upload Photo"},
                {Ic: Icon.NID,     title: "NID / Passport",           req: true,  hint: "JPG, PNG (Max 2MB)",      btn: "Upload Document"},
                {Ic: Icon.BMDCID,  title: "BMDC Certificate",         req: true,  hint: "JPG, PNG, PDF (Max 2MB)", btn: "Upload Document"},
                {Ic: Icon.EduCert, title: "Educational Certificate",  req: false, hint: "JPG, PNG, PDF (Max 2MB)", btn: "Upload Document"},
                {Ic: Icon.ExpCert, title: "Experience Certificate",   req: false, hint: "JPG, PNG, PDF (Max 2MB)", btn: "Upload Document"},
              ].map(({Ic,title,req,hint,btn}) => (
                <div key={title} className="doc-card">
                  <Ic />
                  <p className="doc-card-title">{title}{req && <span> *</span>}</p>
                  <p className="doc-card-hint">{hint}</p>
                  <button type="button" className="btn-upload">{btn}</button>
                </div>
              ))}
            </div>

            {/* Verification banner */}
            <div className="ds-section-title" style={{marginTop:28}}>Verification</div>
            <div className="ds-verify-banner">
              <Icon.Shield />
              <div className="ds-verify-text">
                <h4>Your information is safe with us.</h4>
                <p>We will review your information and documents. You'll be notified once verified.</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="ds-form-footer">
            <label className="ds-agree-row">
              <input
                type="checkbox"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
              />
              I agree to the <a href="#">Terms &amp; Conditions</a> and <a href="#">Privacy Policy</a> *
            </label>
            <button type="submit" className="btn-submit" disabled={!agreed}>
              <Icon.Submit />
              Submit Registration
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}