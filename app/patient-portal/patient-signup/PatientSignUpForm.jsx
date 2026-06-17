"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import "./patient-signup.css";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Lock,
  Calendar,
  Droplet,
  MapPin,
  Globe,
  Building2,
  ChevronDown,
  Shield,
  CheckCircle,
  Users,
  Heart,
  Headphones,
  CreditCard,
  Plus,
  X
} from "lucide-react";

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
          <IconComp size={14} />
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
          <IconComp size={14} />
        </span>
      )}
      <select className={`ps-input ps-select ${className}`} {...props}>
        {children}
      </select>
      <span className="ps-select-chevron">
        <ChevronDown size={13} />
      </span>
    </div>
  );
}

// ── main component ────────────────────────────────────────────
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://192.168.0.164:5001/api/v1";

export default function PatientSignUpForm() {
  const router = useRouter();

  const initialFormData = {
    fullName: "",
    referenceName: "",
    mobileNumber: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    address: "",
    emergencyContact: "",
    nationality: "",
    outlet: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const getApiErrorMessage = (errorResponse) => {
    if (!errorResponse) {
      return "Server did not return a valid response. Please try again.";
    }

    if (Array.isArray(errorResponse.errorSources) && errorResponse.errorSources.length > 0) {
      const messages = errorResponse.errorSources
        .map((source) => source?.message)
        .filter(Boolean);

      if (messages.length) return messages.join(", ");
    }

    if (errorResponse.errors && typeof errorResponse.errors === "object") {
      const fieldErrors = Object.entries(errorResponse.errors)
        .flatMap(([field, messages]) => {
          if (Array.isArray(messages)) {
            return messages.map((message) => `${field}: ${message}`);
          }

          if (typeof messages === "string") {
            return `${field}: ${messages}`;
          }

          return [];
        });

      if (fieldErrors.length) return fieldErrors.join(", ");
    }

    if (typeof errorResponse.message === "string" && errorResponse.message.trim()) {
      return errorResponse.message;
    }

    if (typeof errorResponse.err === "string" && errorResponse.err.trim()) {
      return errorResponse.err;
    }

    return "Something went wrong. Please try again.";
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setAge("");
    setAgreed(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (loading) return;

    const fullName = formData.fullName.trim();
    const referenceName = formData.referenceName.trim();
    const mobileNumber = formData.mobileNumber.trim();
    const email = formData.email.trim();
    const password = formData.password;
    const dateOfBirth = formData.dob;
    const parsedAge = Number(age);
    const address = formData.address.trim();
    const emergencyContact = formData.emergencyContact.trim();

    if (!agreed) {
      setError("Please agree to the Terms & Conditions to proceed.");
      return;
    }

    if (!fullName) {
      setError("Full name is required.");
      return;
    }

    if (!/^01[3-9]\d{8}$/.test(mobileNumber)) {
      setError("Please enter a valid 11-digit Bangladeshi mobile number.");
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!dateOfBirth || !Number.isFinite(parsedAge) || parsedAge < 0) {
      setError("Please select a valid date of birth.");
      return;
    }

    if (!formData.gender) {
      setError("Please select gender.");
      return;
    }

    if (!formData.bloodGroup) {
      setError("Please select blood group.");
      return;
    }

    if (!formData.nationality) {
      setError("Please select nationality.");
      return;
    }

    if (!address) {
      setError("Address is required.");
      return;
    }

    if (emergencyContact && !/^01[3-9]\d{8}$/.test(emergencyContact)) {
      setError("Please enter a valid 11-digit emergency contact number.");
      return;
    }

    const payload = {
      referenceName: referenceName || undefined,
      fullName,
      mobileNumber,
      email: email || undefined,
      password,
      dateOfBirth,
      age: parsedAge,
      bloodGroup: formData.bloodGroup,
      gender: formData.gender,
      address,
      emergencyContact: emergencyContact || undefined,
      nationality: formData.nationality,
    };

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/patients/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let result = null;

      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (!response.ok || result?.success === false) {
        throw new Error(getApiErrorMessage(result));
      }

      resetForm();
      router.push("/patient-portal/patient-signin");

    } catch (err) {
      if (err instanceof TypeError) {
        setError("Unable to connect to the server. Please check your internet connection or API URL.");
        return;
      }

      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

        {/* ── SIDEBAR ── */}
        <aside className="ps-sidebar">
          {/* Top white section: dots + logo */}
          <div className="ps-sidebar-top">
            <div className="ps-sidebar-dots" />

            {/* Logo */}
            <div className="ps-logo-section">
              <div className="ps-logo-image-wrap">
                <Image
                  src="/images/logo.png"
                  alt="Renova Life Care"
                  width={200}
                  height={200}
                  priority
                  className="ps-logo-image"
                />
              </div>
            </div>
          </div>

          {/* Wave SVG — seamlessly transitions white → gradient */}
          <div className="ps-sidebar-wave">
            <svg
              viewBox="0 0 340 60"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: "block", width: "100%", height: "60px" }}
            >
              <defs>
                <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#05417d" />
                  <stop offset="50%" stopColor="#1a6faf" />
                  <stop offset="100%" stopColor="#4caf50" />
                </linearGradient>
              </defs>
              {/* White fill above the wave curve */}
              <path
                d="M0 0 L340 0 L340 20 Q270 60 170 35 Q80 12 0 50 Z"
                fill="#ffffff"
              />
              {/* Gradient wave shape */}
              <path
                d="M0 50 Q80 12 170 35 Q270 60 340 20 L340 60 L0 60 Z"
                fill="url(#waveGrad)"
              />
            </svg>
          </div>

          {/* Bottom gradient section: text + features */}
          <div className="ps-sidebar-bottom">
            {/* Decorative leaf */}
            <svg className="ps-leaf-watermark" viewBox="0 0 80 110" fill="none">
              <path d="M40 10 C10 30 5 70 30 95 C20 70 35 40 70 30 C50 20 40 10 40 10Z" fill="#ffffff" />
              <path d="M40 10 L55 85" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>

            <h2 className="ps-sidebar-title">Your Health,<br />Our Priority</h2>
            <p className="ps-sidebar-subtitle">
              Please fill in the information carefully.<br />
              All your data is secure &amp; confidential.
            </p>

            {/* Feature Circles */}
            <div className="ps-features">
              <div className="ps-feature">
                <div className="ps-feature-circle">
                  <Shield size={26} />
                </div>
                <span className="ps-feature-label">Secure<br />Data</span>
              </div>
              <div className="ps-feature">
                <div className="ps-feature-circle">
                  <Heart size={26} />
                </div>
                <span className="ps-feature-label">Better<br />Care</span>
              </div>
              <div className="ps-feature">
                <div className="ps-feature-circle">
                  <Headphones size={26} />
                </div>
                <span className="ps-feature-label">24/7<br />Support</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ── FORM PANEL ── */}
        <main className="ps-panel">
          <form onSubmit={handleSubmit} noValidate>
            {/* Form Header */}
            <div className="ps-form-header">
              <div className="ps-form-header-top">
                <div className="ps-header-icon">
                  <User size={24} />
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
              <div className="ps-error text" role="alert">
                {error}
              </div>
            )}

            {/* Row 1: Patient ID + Full Name */}
            <div className="ps-grid">
              <Field label="Patient ID (Auto-generated)">
                <Input icon={CreditCard} value="PT-2025-000123" disabled readOnly />
              </Field>
              <Field label="Full Name" required>
                <Input icon={User} type="text" placeholder="Enter full name" value={formData.fullName} onChange={set("fullName")} required />
              </Field>
            </div>

            {/* Row 2: Reference Name + Mobile (OTP) */}
            <div className="ps-grid">
              <Field label="Reference Name">
                <Input icon={Users} type="text" placeholder="Enter reference name" value={formData.referenceName} onChange={set("referenceName")} />
              </Field>
              <Field label="Mobile Number (OTP)" required>
                <div className="ps-otp-row">
                  <Input icon={Phone} type="tel" placeholder="+880 1XXX-XXXXXX" value={formData.mobileNumber} onChange={set("mobileNumber")} required />
                  <button type="button" className="ps-otp-btn">Send OTP</button>
                </div>
              </Field>
            </div>

            {/* Row 3: Email + Password */}
            <div className="ps-grid">
              <Field label="Email (Optional)">
                <Input icon={Mail} type="email" placeholder="Enter email address" value={formData.email} onChange={set("email")} />
              </Field>
              <Field label="Password" required>
                <Input icon={Lock} type="password" placeholder="Enter password" value={formData.password} onChange={set("password")} required />
              </Field>
            </div>

            {/* Row 4: DOB + Age */}
            <div className="ps-grid">
              <Field label="Date of Birth" required>
                <Input icon={Calendar} type="date" value={formData.dob} onChange={set("dob")} required />
              </Field>
              <Field label="Age">
                <Input icon={User} type="text" placeholder="Auto calculated" value={age ? `${age} years` : ""} disabled readOnly />
              </Field>
            </div>

            {/* Row 5: Gender + Blood Group */}
            <div className="ps-grid">
              <Field label="Gender" required>
                <Select icon={User} value={formData.gender} onChange={set("gender")} required>
                  <option value="" disabled>Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Select>
              </Field>
              <Field label="Blood Group" required>
                <Select icon={Droplet} value={formData.bloodGroup} onChange={set("bloodGroup")} required>
                  <option value="">Select blood group</option>
                  {["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"].map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </Select>
              </Field>
            </div>

            {/* Row 6: Nationality + Emergency Contact */}
            <div className="ps-grid">
              <Field label="Nationality" required>
                <Select icon={Globe} value={formData.nationality} onChange={set("nationality")} required>
                  <option value="" disabled>Select nationality</option>
                  <option value="Bangladeshi">Bangladeshi</option>
                  <option value="Other">Other</option>
                </Select>
              </Field>
              <Field label="Emergency Contact">
                <Input icon={Phone} type="tel" placeholder="Enter emergency contact" value={formData.emergencyContact} onChange={set("emergencyContact")} />
              </Field>
            </div>

            {/* Row 7: Address */}
            <div className="">
              <Field label="Address" required>
                <div className="ps-input-wrap" style={{ alignItems: "flex-start" }}>
                  <span className="ps-input-icon" style={{ top: 14, transform: "none" }}>
                    <MapPin size={14} />
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

            {/* Outlet Selection */}
            <Field label="Outlet Selection" required>
              <div className="ps-outlet-wrap">
                <span className="ps-outlet-icon">
                  <Building2 size={14} />
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
                  <ChevronDown size={13} />
                </span>
              </div>
            </Field>

            {/* Verification Banner */}
            <div className="ps-verify-banner">
              <div className="ps-verify-icon">
                <Shield size={28} />
              </div>
              <div className="ps-verify-text">
                <h4>Your information is safe with us</h4>
                <p>We never share your personal information with anyone. All data is encrypted and stored securely.</p>
              </div>
            </div>

            {/* Form Footer */}
            <div className="ps-signup__footer">
              <label className="ps-signup__agree">
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
                className="ps-signup__btn-submit"
                disabled={!agreed || loading}
              >
                <CheckCircle size={18} />
                {loading ? "Submitting..." : "Submit Registration"}
              </button>
            </div>
          </form>

          {/* Security Notice */}
          <div className="ps-security-notice">
            <Shield size={14} />
            <span>Your connection is secure. All data is encrypted end-to-end.</span>
          </div>
        </main>
      </div>
    </div>
  );
}