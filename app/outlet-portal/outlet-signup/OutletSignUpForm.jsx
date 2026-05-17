"use client";
import { useState } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────────
   Reusable tiny SVG icons (stroke-based, 14 × 14)
───────────────────────────────────────────────────────────────── */
const Ic = {
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
  Building: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="#94a3b8" strokeWidth="1.3"/>
      <path d="M5.5 3V2M10.5 3V2" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round"/>
      <rect x="5" y="8" width="2.5" height="3" rx="0.5" fill="#94a3b8" opacity="0.7"/>
      <rect x="8.5" y="8" width="2.5" height="3" rx="0.5" fill="#94a3b8" opacity="0.7"/>
      <path d="M5 5.5h6M5 7h6" stroke="#94a3b8" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  ),
  Map: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M8 1.5a5 5 0 0 1 5 5c0 4-5 8-5 8s-5-4-5-8a5 5 0 0 1 5-5z" stroke="#94a3b8" strokeWidth="1.3"/>
      <circle cx="8" cy="6.5" r="1.5" stroke="#94a3b8" strokeWidth="1.2"/>
    </svg>
  ),
  Location: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M2 4l4-2 4 2 4-2v10l-4 2-4-2-4 2V4z" stroke="#94a3b8" strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M6 2v10M10 4v10" stroke="#94a3b8" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  ),
  License: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <rect x="2" y="1.5" width="12" height="13" rx="1.5" stroke="#94a3b8" strokeWidth="1.3"/>
      <path d="M5 5h6M5 7.5h6M5 10h4" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  Clock: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <circle cx="8" cy="8" r="6" stroke="#94a3b8" strokeWidth="1.3"/>
      <path d="M8 4.5V8l2.5 2" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Globe: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <circle cx="8" cy="8" r="6" stroke="#94a3b8" strokeWidth="1.3"/>
      <path d="M8 2c-2 2-2 8 0 12M8 2c2 2 2 8 0 12M2 8h12" stroke="#94a3b8" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  ),
  Chevron: () => (
    <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
      <path d="M4 6l4 4 4-4" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 20 20" fill="none" width="20" height="20" style={{flexShrink:0,marginTop:1}}>
      <path d="M10 2L3 5.5v5C3 14.7 6.1 17.9 10 19c3.9-1.1 7-4.3 7-8.5v-5L10 2z" fill="#4CAF50"/>
      <path d="M7 10l2 2.5L13 8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Submit: () => (
    <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 10l2 2.5L13 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

/* ─────────────────────────────────────────────────────────────────
   Shared field primitives
───────────────────────────────────────────────────────────────── */
function Field({ label, required, note, children }) {
  return (
    <div className="os-field">
      <label className="os-label">
        {label}
        {note && <span className="os-label-note"> {note}</span>}
        {required && <span className="os-required"> *</span>}
      </label>
      {children}
    </div>
  );
}

function Input({ icon: Icon, className = "", ...props }) {
  return (
    <div className="os-input-wrap">
      {Icon && <span className="os-input-icon"><Icon /></span>}
      <input className={`os-input${Icon ? " has-icon" : ""}${className ? " " + className : ""}`} {...props} />
    </div>
  );
}

function Select({ icon: Icon, children, ...props }) {
  return (
    <div className="os-input-wrap">
      {Icon && <span className="os-input-icon"><Icon /></span>}
      <select className={`os-input os-select${Icon ? " has-icon" : ""}`} {...props}>
        {children}
      </select>
      <span className="os-chevron"><Ic.Chevron /></span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────────────── */
export default function OutletSignUpForm() {
  const [form, setForm] = useState({
    outletName: "", ownerName: "", mobile: "", email: "",
    division: "", district: "", thana: "", address: "",
    outletType: "", licenseNo: "", openingTime: "", closingTime: "",
    website: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (agreed) setSubmitted(true);
  };

  /* ── Success screen ── */
  if (submitted) {
    return (
      <div className="os-success-screen">
        <div className="os-success-card">
          <div className="os-success-icon">✅</div>
          <h2>Outlet Registered!</h2>
          <p>Your outlet registration has been submitted. We'll review and notify you shortly.</p>
          <button onClick={() => { setSubmitted(false); setAgreed(false); }} className="os-success-btn">
            Register Another Outlet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="os-root">

      {/* ══════════════ SIDEBAR ══════════════ */}
      <aside className="os-sidebar">
        <div className="os-dots" />

        <div className="os-sidebar-top">
          <div className="os-logo-wrap">
            {/* Logo Image from public/images/logo.png */}
            <div className="os-logo-image-wrap">
              <Image 
                src="/images/logo.png" 
                alt="Renova Life Care" 
                width={72} 
                height={72}
                priority
                className="os-logo-image"
              />
            </div>
          </div>

          {/* leaf watermark */}
          <svg className="os-leaf" viewBox="0 0 80 110" fill="none">
            <path d="M40 10 C10 30 5 70 30 95 C20 70 35 40 70 30 C50 20 40 10 40 10Z" fill="#4CAF50"/>
            <path d="M40 10 L55 85" stroke="#4CAF50" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Wave divider */}
        <div className="os-wave">
          <svg viewBox="0 0 330 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M180 0 L330 0 L330 55 Q280 80 230 50 Q200 35 180 0Z" fill="#4CAF50"/>
            <path d="M0 0 L180 0 Q200 35 230 50 Q280 80 330 55 L330 80 L0 80 Z" fill="#1565a8"/>
          </svg>
        </div>

        {/* Blue bottom */}
        <div className="os-sidebar-bottom">
          <p className="os-bottom-tagline">Expand Your Reach</p>
          <p className="os-bottom-sub">
            Register your outlet and connect<br/>
            with thousands of patients today.
          </p>

          <div className="os-features">
            {/* Fast Setup */}
            <div className="os-feature">
              <div className="os-feature-circle">
                <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
                  <path d="M12 3L4 7v5c0 4.418 3.582 8 8 9 4.418-1 8-4.582 8-9V7l-8-4z" stroke="white" strokeWidth="1.6" strokeLinejoin="round"/>
                  <rect x="10" y="11" width="4" height="5" rx="1" fill="white" opacity="0.85"/>
                  <path d="M10 11V9.5a2 2 0 0 1 4 0V11" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="os-feature-label">Secure<br/>Data</span>
            </div>

            {/* More Patients */}
            <div className="os-feature">
              <div className="os-feature-circle">
                <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
                  <rect x="3" y="7" width="18" height="13" rx="2" stroke="white" strokeWidth="1.5"/>
                  <path d="M3 11h18" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
                  <path d="M8 7V5a2 2 0 0 1 4 0M12 7V5a2 2 0 0 1 4 0" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                  <path d="M7 15h4M7 18h6" stroke="#4CAF50" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="os-feature-label">Easy<br/>Manage</span>
            </div>

            {/* 24/7 */}
            <div className="os-feature">
              <div className="os-feature-circle">
                <svg viewBox="0 0 24 24" fill="none" width="26" height="26">
                  <circle cx="12" cy="12" r="8.5" stroke="white" strokeWidth="1.6"/>
                  <text x="12" y="14.5" textAnchor="middle" fontFamily="'Sen',sans-serif" fontSize="5.5" fontWeight="700" fill="white">24/7</text>
                  <path d="M17 7 C16 5 14 5 14 7 C14 9 17 9 17 7Z" fill="#4CAF50"/>
                </svg>
              </div>
              <span className="os-feature-label">24/7<br/>Support</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ══════════════ FORM PANEL ══════════════ */}
      <main className="os-panel">
        <form className="os-form-card" onSubmit={handleSubmit} noValidate>

          {/* ── Header ── */}
          <div className="os-form-header">
            <div className="os-form-header-top">
              <div className="os-header-icon">
                <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
                  <rect x="3" y="7" width="18" height="14" rx="2" stroke="#1E6FAF" strokeWidth="1.8"/>
                  <path d="M3 11h18" stroke="#1E6FAF" strokeWidth="1.6" strokeLinecap="round"/>
                  <path d="M8 7V5a2 2 0 0 1 4 0M12 7V5a2 2 0 0 1 4 0" stroke="#1E6FAF" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>
              <h1 className="os-form-title">Outlet <span>Registration</span></h1>
            </div>
            <div className="os-pulse-bar">
              <div className="pbl" />
              <svg viewBox="0 0 70 20" fill="none" width="70" height="20">
                <polyline points="0,10 12,10 17,2 22,18 27,4 32,16 37,10 50,10 55,6 60,10 70,10"
                  stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              <div className="pbl" />
            </div>
          </div>

          {/* ── Body ── */}
          <div className="os-form-body">

            {/* ── Basic Information ── */}
            <div className="os-section">Basic Information</div>

            <div className="os-g2">
              {/* Outlet ID auto */}
              <Field label="Outlet ID" note="(Auto-generated)">
                <Input icon={Ic.ID} value="OT-2025-000123" disabled readOnly/>
              </Field>

              {/* Outlet Name */}
              <Field label="Outlet Name" required>
                <Input icon={Ic.Building} type="text" placeholder="Enter outlet name"
                  value={form.outletName} onChange={set("outletName")} required/>
              </Field>
            </div>

            <div className="os-g2">
              {/* Owner Name */}
              <Field label="Owner / Manager Name" required>
                <Input icon={Ic.User} type="text" placeholder="Enter owner or manager name"
                  value={form.ownerName} onChange={set("ownerName")} required/>
              </Field>

              {/* Mobile + OTP */}
              <Field label="Mobile Number (OTP)" required>
                <div className="os-otp-row">
                  <div className="os-input-wrap">
                    <span className="os-input-icon"><Ic.Phone /></span>
                    <input className="os-input has-icon" type="tel" placeholder="Enter mobile number"
                      value={form.mobile} onChange={set("mobile")} required/>
                  </div>
                  <button type="button" className="os-otp-btn">Send OTP</button>
                </div>
              </Field>
            </div>

            <div className="os-g2">
              {/* Email */}
              <Field label="Email Address" note="(Optional)">
                <Input icon={Ic.Email} type="email" placeholder="Enter email address"
                  value={form.email} onChange={set("email")}/>
              </Field>

              {/* Website */}
              <Field label="Website / Facebook" note="(Optional)">
                <Input icon={Ic.Globe} type="url" placeholder="https://yourwebsite.com"
                  value={form.website} onChange={set("website")}/>
              </Field>
            </div>

            {/* ── Outlet Type ── */}
            <div className="os-section">Outlet Type</div>

            <div className="os-g1">
              <Field label="Select Outlet Type" required>
                <div className="os-type-btns">
                  {[
                    { id: "pharmacy",    label: "Pharmacy" },
                    { id: "clinic",      label: "Clinic" },
                    { id: "diagnostic",  label: "Diagnostic" },
                    { id: "hospital",    label: "Hospital" },
                    { id: "chamber",     label: "Chamber" },
                  ].map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      className={`os-type-btn${form.outletType === id ? " active" : ""}`}
                      onClick={() => setForm(p => ({ ...p, outletType: id }))}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </Field>
            </div>

            {/* License Number */}
            <div className="os-g2">
              <Field label="Trade / License Number" required>
                <Input icon={Ic.License} type="text" placeholder="Enter trade or license number"
                  value={form.licenseNo} onChange={set("licenseNo")} required/>
              </Field>

              {/* Opening / Closing Time */}
              <Field label="Operating Hours" required>
                <div className="os-time-row">
                  <div className="os-input-wrap" style={{flex:1}}>
                    <span className="os-input-icon"><Ic.Clock /></span>
                    <input className="os-input has-icon" type="time" value={form.openingTime}
                      onChange={set("openingTime")} required/>
                  </div>
                  <span className="os-time-sep">to</span>
                  <div className="os-input-wrap" style={{flex:1}}>
                    <span className="os-input-icon"><Ic.Clock /></span>
                    <input className="os-input has-icon" type="time" value={form.closingTime}
                      onChange={set("closingTime")} required/>
                  </div>
                </div>
              </Field>
            </div>

            {/* ── Location ── */}
            <div className="os-section">Location</div>

            <div className="os-g3">
              <Field label="Division" required>
                <Select icon={Ic.Location} value={form.division} onChange={set("division")} required>
                  <option value="">Select division</option>
                  {["Dhaka","Chittagong","Rajshahi","Khulna","Sylhet","Barisal","Rangpur","Mymensingh"].map(d=>(
                    <option key={d}>{d}</option>
                  ))}
                </Select>
              </Field>

              <Field label="District" required>
                <Select icon={Ic.Location} value={form.district} onChange={set("district")} required>
                  <option value="">Select district</option>
                  <option>Dhaka</option>
                  <option>Gazipur</option>
                  <option>Narayanganj</option>
                  <option>Chittagong</option>
                  <option>Sylhet</option>
                </Select>
              </Field>

              <Field label="Thana / Upazila" required>
                <Select icon={Ic.Location} value={form.thana} onChange={set("thana")} required>
                  <option value="">Select thana</option>
                  <option>Mirpur</option>
                  <option>Dhanmondi</option>
                  <option>Gulshan</option>
                  <option>Uttara</option>
                  <option>Motijheel</option>
                  <option>Kafrul</option>
                  <option>Mohammadpur</option>
                </Select>
              </Field>
            </div>

            {/* Full address */}
            <div className="os-g1">
              <Field label="Full Address" required>
                <div className="os-input-wrap" style={{alignItems:"flex-start"}}>
                  <span className="os-input-icon" style={{top:13,transform:"none"}}>
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

            {/* ── Outlet Selection (which network) ── */}
            <div className="os-section">Network Assignment</div>

            <div className="os-outlet-select-wrap">
              <span className="os-outlet-icon-l">
                <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
                  <rect x="1.5" y="4" width="13" height="10" rx="1.5" stroke="#94a3b8" strokeWidth="1.3"/>
                  <path d="M5.5 4V3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M1.5 9h13" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </span>
              <select className="os-outlet-select" required>
                <option value="">Select network / zone</option>
                <option value="dhaka-central">Dhaka Central Network</option>
                <option value="dhaka-north">Dhaka North Zone</option>
                <option value="dhaka-south">Dhaka South Zone</option>
                <option value="chittagong">Chittagong Network</option>
                <option value="sylhet">Sylhet Network</option>
                <option value="rajshahi">Rajshahi Network</option>
              </select>
              <span className="os-outlet-icon-r"><Ic.Chevron /></span>
            </div>

            {/* Verification banner */}
            <div className="os-verify">
              <Ic.Shield />
              <div>
                <h4>Your information is safe with us.</h4>
                <p>We never share your outlet data or personal information with anyone.</p>
              </div>
            </div>

          </div>{/* /form-body */}

          {/* ── Footer ── */}
          <div className="os-form-footer">
            <label className="os-agree">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}/>
              I agree to the <a href="#">Terms &amp; Conditions</a> and <a href="#">Privacy Policy</a> *
            </label>
            <button type="submit" className="os-submit" disabled={!agreed}>
              <Ic.Submit />
              Submit Registration
            </button>
          </div>

        </form>
      </main>

    </div>
  );
}