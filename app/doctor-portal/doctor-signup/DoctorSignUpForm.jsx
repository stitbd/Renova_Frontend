"use client";
import { useState } from "react";
import Image from "next/image";
import "./doctor-signup.css";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Lock,
  Calendar,
  Droplet,
  Globe,
  Shield,
  CheckCircle,
  Stethoscope,
  GraduationCap,
  Clock,
  Briefcase,
  Video,
  Mic,
  MessageCircle,
  Camera,
  CreditCard,
  ChevronDown,
  Heart,
  TrendingUp,
  LayoutDashboard,
  FileText,
  Plus,
  X,
  DollarSign
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────
   Reusable primitives
───────────────────────────────────────────────────────────────── */
function Field({ label, required, children }) {
  return (
    <div className="doctor-signup__field">
      <label className="doctor-signup__label">
        {label}
        {required && <span className="required"> *</span>}
      </label>
      {children}
    </div>
  );
}

function Input({ icon: IconComp, noIcon, ...props }) {
  return (
    <div className="doctor-signup__input-wrap">
      {IconComp && (
        <span className="doctor-signup__input-icon">
          <IconComp size={14} />
        </span>
      )}
      <input
        className={`doctor-signup__input${noIcon || !IconComp ? " has-no-icon" : ""}`}
        {...props}
      />
    </div>
  );
}

function Select({ icon: IconComp, children, ...props }) {
  return (
    <div className="doctor-signup__input-wrap">
      {IconComp && (
        <span className="doctor-signup__input-icon">
          <IconComp size={14} />
        </span>
      )}
      <select className="doctor-signup__select" {...props}>
        {children}
      </select>
      <span className="doctor-signup__select-chevron">
        <ChevronDown size={13} />
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────────── */
const API_BASE_URL = API_URL;

const DOCUMENT_FIELDS = [
  { Ic: Camera, title: "Profile Photo", req: false, hint: "JPG, PNG (Max 2MB)", btn: "Upload Photo", documentType: "OTHER" },
  { Ic: CreditCard, title: "NID / Passport", req: true, hint: "JPG, PNG (Max 2MB)", btn: "Upload Document", documentType: "NID" },
  { Ic: Shield, title: "BMDC Certificate", req: true, hint: "JPG, PNG, PDF (Max 2MB)", btn: "Upload Document", documentType: "LICENSE" },
  { Ic: GraduationCap, title: "Educational Certificate", req: false, hint: "JPG, PNG, PDF (Max 2MB)", btn: "Upload Document", documentType: "DEGREE" },
  { Ic: FileText, title: "Experience Certificate", req: false, hint: "JPG, PNG, PDF (Max 2MB)", btn: "Upload Document", documentType: "CERTIFICATE" },
];

const initialFormData = {
  fullName: "",
  mobile: "",
  email: "",
  password: "",
  bmdcNumber: "",
  specializationName: "",
  subSpecialization: "",
  qualification: "",
  experienceYears: "",
  currentDesignation: "",
  consultationFee: "",
  gender: "",
  dateOfBirth: "",
  nationality: "",
  bloodGroup: "",
};

export default function DoctorSignUpForm() {
  const router = useRouter();
  const [consultType, setConsultType] = useState("video");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [documentFiles, setDocumentFiles] = useState({});

  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const [addingSchedule, setAddingSchedule] = useState(false);

  const [scheduleForm, setScheduleForm] = useState({
    dayName: "",
    startTime: "09:00",
    endTime: "17:00",
    slotDuration: "30",
  });

  const [schedules, setSchedules] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDocumentChange = (documentType, file) => {
    setDocumentFiles((prev) => ({
      ...prev,
      [documentType]: file || null,
    }));
  };

  const handleRemoveSchedule = (scheduleId) => {
    setSchedules((prev) => prev.filter((schedule) => schedule.id !== scheduleId));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setSchedules([]);
    setDocumentFiles({});
    setConsultType("video");
    setAgreed(false);
  };

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;

    setScheduleForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSchedule = async () => {
    try {
      setAddingSchedule(true);
      setError("");

      if (!scheduleForm.dayName) {
        setError("Please select a day.");
        return;
      }

      const alreadyExists = schedules.some(
        (schedule) => schedule.dayName === scheduleForm.dayName
      );

      if (alreadyExists) {
        setError("This day schedule has already been added.");
        return;
      }

      if (scheduleForm.startTime >= scheduleForm.endTime) {
        setError("Start time must be earlier than end time.");
        return;
      }

      const newSchedule = {
        id: Date.now(),
        dayName: scheduleForm.dayName,
        startTime: scheduleForm.startTime,
        endTime: scheduleForm.endTime,
        slotDuration: Number(scheduleForm.slotDuration),
        status: "ACTIVE",
      };

      await new Promise((resolve) => setTimeout(resolve, 300));

      setSchedules((prev) => [...prev, newSchedule]);

      setScheduleForm({
        dayName: "",
        startTime: "09:00",
        endTime: "17:00",
        slotDuration: "30",
      });
    } finally {
      setAddingSchedule(false);
    }
  };
  const getApiErrorMessage = (errorResponse, fallbackMessage = "Something went wrong. Please try again.") => {
    if (!errorResponse) {
      return fallbackMessage;
    }

    const messages = [];

    const pushMessage = (message) => {
      if (typeof message === "string" && message.trim()) {
        messages.push(message.trim());
      }
    };

    const collectNestedMessages = (value, parentKey = "") => {
      if (!value) return;

      if (typeof value === "string") {
        pushMessage(parentKey ? `${parentKey}: ${value}` : value);
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((item) => collectNestedMessages(item, parentKey));
        return;
      }

      if (typeof value === "object") {
        if (typeof value.message === "string") {
          pushMessage(parentKey ? `${parentKey}: ${value.message}` : value.message);
        }

        if (typeof value.path === "string" && typeof value.message === "string") {
          pushMessage(`${value.path}: ${value.message}`);
        }

        Object.entries(value).forEach(([key, nestedValue]) => {
          if (["message", "path"].includes(key)) return;
          collectNestedMessages(nestedValue, parentKey || key);
        });
      }
    };

    collectNestedMessages(errorResponse.errorSources);
    collectNestedMessages(errorResponse.errors);
    collectNestedMessages(errorResponse.err);
    pushMessage(errorResponse.message);

    const uniqueMessages = [...new Set(messages)].filter(
      (message) => message && message.toLowerCase() !== "validation failed"
    );

    if (uniqueMessages.length > 0) {
      return uniqueMessages.slice(0, 5).join(" | ");
    }

    if (typeof errorResponse.message === "string" && errorResponse.message.trim()) {
      return errorResponse.message.trim();
    }

    return fallbackMessage;
  };

  const getSafeJsonResponse = async (response) => {
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      const text = await response.text().catch(() => "");
      return text ? { message: text } : null;
    }

    try {
      return await response.json();
    } catch {
      return null;
    }
  };

  const validateRegistrationForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const bdMobileRegex = /^(?:\+?88)?01[3-9]\d{8}$/;

    if (!formData.fullName.trim()) {
      return "Full name is required.";
    }

    if (formData.fullName.trim().length < 2) {
      return "Full name must be at least 2 characters.";
    }

    if (!formData.password || formData.password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    if (!formData.mobile.trim() || !bdMobileRegex.test(formData.mobile.trim())) {
      return "Please enter a valid Bangladeshi mobile number.";
    }

    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      return "Please enter a valid email address.";
    }

    if (!formData.dateOfBirth) {
      return "Date of birth is required.";
    }

    if (!formData.gender) {
      return "Gender is required.";
    }

    if (!formData.bmdcNumber.trim()) {
      return "BMDC / Registration Number is required.";
    }

    if (!formData.specializationName) {
      return "Specialization is required.";
    }

    if (!formData.qualification.trim()) {
      return "Qualification is required.";
    }

    if (formData.experienceYears === "" || Number(formData.experienceYears) < 0) {
      return "Experience must be a valid number.";
    }

    if (formData.consultationFee === "" || Number(formData.consultationFee) < 0) {
      return "Consultation Fee must be a valid amount.";
    }

    if (!agreed) {
      return "Please agree to the Terms & Conditions to proceed.";
    }

    if (!schedules.length) {
      return "Please add at least one work schedule.";
    }

    const invalidSchedule = schedules.find(
      (schedule) => !schedule.dayName || !schedule.startTime || !schedule.endTime || schedule.startTime >= schedule.endTime || Number(schedule.slotDuration) <= 0
    );

    if (invalidSchedule) {
      return "Please fix invalid schedule information before submitting.";
    }

    const missingRequiredDocument = DOCUMENT_FIELDS.some(
      (doc) => doc.req && !documentFiles[doc.documentType]
    );

    if (missingRequiredDocument) {
      return "Please upload all required documents.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (loading) return;

    const validationMessage = validateRegistrationForm();

    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    const selectedDocuments = DOCUMENT_FIELDS
      .map((doc) => ({
        ...doc,
        file: documentFiles[doc.documentType],
      }))
      .filter((doc) => Boolean(doc.file));

    const payload = {
      fullName: formData.fullName.trim(),
      mobile: formData.mobile.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      bmdcNumber: formData.bmdcNumber.trim(),
      subSpecialization: formData.subSpecialization || undefined,
      qualification: formData.qualification.trim(),
      experienceYears: Number(formData.experienceYears),
      currentDesignation: formData.currentDesignation.trim() || undefined,
      consultationFee: Number(formData.consultationFee),
      gender: formData.gender || undefined,
      dateOfBirth: formData.dateOfBirth || undefined,
      nationality: formData.nationality || undefined,
      bloodGroup: formData.bloodGroup || undefined,
      specializationName: formData.specializationName || undefined,
      schedules: schedules.map(({ id, ...schedule }) => ({
        ...schedule,
        slotDuration: Number(schedule.slotDuration),
      })),
      documents: selectedDocuments.map((doc) => ({
        documentType: doc.documentType,
        verificationStatus: "PENDING",
      })),
    };


    const body = new FormData();
    body.append("data", JSON.stringify(payload));

    selectedDocuments.forEach((doc) => {
      if (doc.file) {
        body.append("documents", doc.file);
      }
    });

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 30000);

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/doctors/create`, {
        method: "POST",
        body,
        signal: controller.signal,
      });

      const result = await getSafeJsonResponse(response);

      if (!response.ok || result?.success === false) {
        const fallbackMessage = response.status >= 500
          ? "Server error occurred while creating doctor. Please try again later."
          : "Failed to create doctor. Please check the form and try again.";

        throw new Error(getApiErrorMessage(result, fallbackMessage));
      }

      resetForm();
      router.push("/doctor-portal/doctor-signin");

    } catch (err) {
      if (err?.name === "AbortError") {
        setError("Request timed out. Please check your connection and try again.");
        return;
      }

      if (err instanceof TypeError) {
        setError("Unable to connect to the server. Please check your internet connection or API URL.");
        return;
      }

      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      window.clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  return (
    <div className="doctor-container">
      {/* Background Image */}
      <div className="doctor-background">
        <Image
          src="/images/dbg-login.jpg"
          alt="Compassionate healthcare at Renova Life Care"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="doctor-overlay" />
      </div>

      {/* Main Card */}
      <div className="doctor-signup__card">
        {/* ══════════════════════════════
            SIDEBAR
        ══════════════════════════════ */}
        <aside className="doctor-signup__sidebar">
          {/* Top white section */}
          <div className="doctor-signup__sidebar-top">
            <div className="doctor-signup__sidebar-dots" />

            {/* Leaf watermark */}
            <svg
              className="doctor-signup__leaf"
              viewBox="0 0 100 140"
              fill="none"
              width="100"
              height="130"
            >
              <path
                d="M50 15 C15 40 8 90 38 120 C26 88 44 52 90 38 C65 26 50 15 50 15Z"
                fill="#4caf50"
              />
              <path
                d="M50 15 L68 108"
                stroke="#4caf50"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            {/* Logo */}
            <div className="doctor-signup__logo-wrap">
              <Image
                src="/images/logo.png"
                alt="Renova Life Care Logo"
                width={148}
                height={148}
                priority
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          {/* Wave divider */}
          <div className="doctor-signup__wave">
            <svg
              viewBox="0 0 330 55"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M0 0 Q82 18 165 9 Q248 0 330 18 L330 0 Z"
                fill="#ffffff"
              />
              <path
                d="M0 18 Q82 36 165 25 Q248 14 330 35 L330 55 L0 55 Z"
                fill="#2e7d32"
                opacity="0.8"
              />
              <path
                d="M0 28 Q82 48 165 35 Q248 22 330 46 L330 55 L0 55 Z"
                fill="#1256a0"
              />
            </svg>
          </div>

          {/* Bottom dark blue */}
          <div className="doctor-signup__sidebar-bottom">
            <h2 className="doctor-signup__sidebar-title">
              Join Our Medical Network
            </h2>
            <p className="doctor-signup__sidebar-subtitle">
              Register as a doctor and start providing quality care to patients.
            </p>

            <div className="doctor-signup__benefit">
              <div className="doctor-signup__benefit-icon">
                <Shield size={26} />
              </div>
              <div className="doctor-signup__benefit-content">
                <h4>Verified &amp; Secure</h4>
                <p>Your data is safe with us</p>
              </div>
            </div>

            <div className="doctor-signup__benefit">
              <div className="doctor-signup__benefit-icon">
                <TrendingUp size={26} />
              </div>
              <div className="doctor-signup__benefit-content">
                <h4>Grow Your  Practice</h4>
                <p>Connect with more patients</p>
              </div>
            </div>

            <div className="doctor-signup__benefit">
              <div className="doctor-signup__benefit-icon">
                <LayoutDashboard size={26} />
              </div>
              <div className="doctor-signup__benefit-content">
                <h4>Manage Easily</h4>
                <p>Smart tools for doctors</p>
              </div>
            </div>
          </div>
        </aside>

        {/* ══════════════════════════════
            FORM PANEL
        ══════════════════════════════ */}
        <main className="doctor-signup__panel">
          <form onSubmit={handleSubmit} noValidate>
            {/* Header */}
            <div className="doctor-signup__form-header">
              <div className="doctor-signup__form-icon">
                <Stethoscope size={40} />
              </div>
              <div>
                <h1 className="doctor-signup__form-title">
                  Doctor <span>Registration</span>
                </h1>
                <p className="doctor-signup__form-subtitle">
                  Fill in the details to create your doctor account
                </p>
              </div>
            </div>

            {/* Heartbeat divider */}
            <div className="doctor-signup__pulse-bar">
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

            {/* Error */}
            {error && (
              <div className="doctor-signup__error" role="alert">
                {error}
              </div>
            )}

            {/* ── Personal Information ── */}
            <h3 className="doctor-signup__section-title">Personal Information</h3>

            <div className="doctor-signup__grid-3">
              <Field label="Doctor ID (Auto-generated)">
                <Input icon={CreditCard} value="DOC_0005" disabled readOnly />
              </Field>
              <Field label="Full Name" required>
                <Input icon={User} name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" placeholder="Enter full name" required />
              </Field>
              <Field label="Password" required>
                <Input icon={Lock} name="password" value={formData.password} onChange={handleInputChange} type="password" placeholder="Enter password" required />
              </Field>
            </div>

            <div className="doctor-signup__grid-3">
              <Field label="Mobile Number" required>
                <div className="doctor-signup__otp-row">
                  <Input icon={Phone} name="mobile" value={formData.mobile} onChange={handleInputChange} type="tel" placeholder="Enter mobile number" required />
                  <button type="button" className="doctor-signup__btn-otp">
                    Send OTP
                  </button>
                </div>
              </Field>
              <Field label="Email Address" required>
                <Input icon={Mail} name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="Enter email address" required />
              </Field>
              <Field label="Date of Birth" required>
                <Input icon={Calendar} name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} type="date" required />
              </Field>
            </div>

            <div className="doctor-signup__grid-3">
              <Field label="Gender" required>
                <Select icon={User} name="gender" value={formData.gender} onChange={handleInputChange} required>
                  <option value="" disabled>Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Select>
              </Field>
              <Field label="Blood Group">
                <Select icon={Droplet} name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange}>
                  <option value="" disabled>Select blood group</option>
                  {["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"].map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Nationality">
                <Select icon={Globe} name="nationality" value={formData.nationality} onChange={handleInputChange}>
                  <option value="" disabled>Select nationality</option>
                  <option value="Bangladeshi">Bangladeshi</option>
                  <option value="other">Other</option>
                </Select>
              </Field>
            </div>

            {/* ── Professional Information ── */}
            <h3 className="doctor-signup__section-title">Professional Information</h3>

            <div className="doctor-signup__grid-3">
              <Field label="BMDC / Registration Number" required>
                <Input icon={Shield} name="bmdcNumber" value={formData.bmdcNumber} onChange={handleInputChange} type="text" placeholder="Enter BMDC / Reg. number" required />
              </Field>
              <Field label="Specialization" required>
                <Select icon={Stethoscope} name="specializationName" value={formData.specializationName} onChange={handleInputChange} required>
                  <option value="" disabled>Select specialization</option>
                  {[
                    "Cardiology", "Dermatology", "ENT", "General Medicine",
                    "Gynecology", "Neurology", "Orthopedics", "Pediatrics",
                    "Psychiatry", "Surgery",
                  ].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Sub Specialization">
                <Select icon={Stethoscope} name="subSpecialization" value={formData.subSpecialization} onChange={handleInputChange}>
                  <option value="" disabled>Select sub specialization</option>
                  <option>Interventional Cardiology</option>
                  <option>Pediatric Surgery</option>
                  <option>Spine Surgery</option>
                </Select>
              </Field>
            </div>

            <div className="doctor-signup__grid-3">
              <Field label="Qualification" required>
                <Input icon={GraduationCap} name="qualification" value={formData.qualification} onChange={handleInputChange} type="text" placeholder="Enter highest qualification" required />
              </Field>
              <Field label="Experience" required>
                <div className="doctor-signup__input-wrap">
                  <span className="doctor-signup__input-icon">
                    <Clock size={14} />
                  </span>
                  <input
                    className="doctor-signup__input"
                    type="number"
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="Enter years of experience"
                    required
                    style={{ paddingRight: "52px" }}
                  />
                  <span className="doctor-signup__exp-suffix">Years</span>
                </div>
              </Field>
              <Field label="Current Designation">
                <Input icon={Briefcase} name="currentDesignation" value={formData.currentDesignation} onChange={handleInputChange} type="text" placeholder="Enter current designation" />
              </Field>
            </div>

            {/* ── Work & Availability ── */}
            <h3 className="doctor-signup__section-title">Work &amp; Availability</h3>

            <div className="consultation-grid">
              {/* Consultation Type */}
              <Field label="Consultation Type" required>
                <div className="consult-type-buttons">
                  {[
                    { id: "video", label: "Video", Ic: Video },
                    { id: "audio", label: "Audio", Ic: Mic },
                    { id: "chat", label: "Chat", Ic: MessageCircle },
                  ].map(({ id, label, Ic }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setConsultType(id)}
                      className={`consult-type-btn ${consultType === id ? 'active' : ''}`}
                    >
                      <Ic size={14} />
                      {label}
                    </button>
                  ))}
                </div>
              </Field>

              {/* Work Schedule */}
              <Field label="Work Schedule" required>
                <div className="schedule-box">
                  <div className="schedule-grid">
                    <select
                      name="dayName"
                      value={scheduleForm.dayName}
                      onChange={handleScheduleChange}
                      className="schedule-input"
                    >
                      <option value="">Day</option>
                      <option value="MONDAY">Monday</option>
                      <option value="TUESDAY">Tuesday</option>
                      <option value="WEDNESDAY">Wednesday</option>
                      <option value="THURSDAY">Thursday</option>
                      <option value="FRIDAY">Friday</option>
                      <option value="SATURDAY">Saturday</option>
                      <option value="SUNDAY">Sunday</option>
                    </select>

                    <input
                      type="time"
                      name="startTime"
                      value={scheduleForm.startTime}
                      onChange={handleScheduleChange}
                      className="schedule-input"
                    />

                    <input
                      type="time"
                      name="endTime"
                      value={scheduleForm.endTime}
                      onChange={handleScheduleChange}
                      className="schedule-input"
                    />

                    <select
                      name="slotDuration"
                      value={scheduleForm.slotDuration}
                      onChange={handleScheduleChange}
                      className="schedule-input"
                    >
                      <option value="15">15m</option>
                      <option value="30">30m</option>
                      <option value="45">45m</option>
                      <option value="60">60m</option>
                    </select>

                    <button
                      type="button"
                      onClick={handleAddSchedule}
                      disabled={addingSchedule}
                      className={`add-btn ${addingSchedule ? 'loading' : ''}`}
                    >
                      {addingSchedule ? (
                        <>
                          <svg className="spinner" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                            <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                          Adding...
                        </>
                      ) : (
                        "Add"
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setOpenScheduleModal(true)}
                      className="view-btn"
                    >
                      View
                    </button>
                  </div>
                </div>
              </Field>

              {/* Consultation Fee */}
              <Field label="Consultation Fee (৳)" required>
                <div className="fee-input-wrapper">
                  <DollarSign size={14} className="fee-icon" />
                  <Input
                    name="consultationFee"
                    value={formData.consultationFee}
                    onChange={handleInputChange}
                    type="number"
                    min="0"
                    placeholder="Fee"
                    required
                  />
                </div>
              </Field>
            </div>

            {/* ── Documents Upload ── */}
            <h3 className="doctor-signup__section-title">Documents Upload</h3>

            <div className="doctor-signup__docs-grid">
              {DOCUMENT_FIELDS.map(({ Ic, title, req, hint, btn, documentType }) => (
                <div key={title} className="doctor-signup__doc-card">
                  <div className="doctor-signup__doc-icon">
                    <Ic size={28} />
                  </div>
                  <p className="doctor-signup__doc-title">
                    {title}
                    {req && <span className="required"> *</span>}
                  </p>
                  <p className="doctor-signup__doc-hint">
                    {documentFiles[documentType]?.name || hint}
                  </p>
                  <label className="doctor-signup__btn-upload" style={{ cursor: "pointer" }}>
                    {documentFiles[documentType] ? "Change File" : btn}
                    <input
                      type="file"
                      hidden
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => handleDocumentChange(documentType, e.target.files?.[0])}
                    />
                  </label>
                </div>
              ))}
            </div>

            {/* ── Verification ── */}
            <h3 className="doctor-signup__section-title">Verification</h3>

            <div className="doctor-signup__verify-banner">
              <div className="doctor-signup__verify-icon">
                <Shield size={28} />
              </div>
              <div className="doctor-signup__verify-text">
                <h4>Your information is safe with us.</h4>
                <p>
                  We will review your information and documents. You&apos;ll be
                  notified once verified.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="doctor-signup__footer">
              <label className="doctor-signup__agree">
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
                className="doctor-signup__btn-submit"
                disabled={!agreed || loading}
              >
                <CheckCircle size={18} />
                {loading ? "Submitting..." : "Submit Registration"}
              </button>
            </div>
          </form>

          {/* Security notice */}
          <div className="doctor-signup__security-notice">
            <Shield size={13} />
            <span>Your connection is secure. All data is encrypted end-to-end.</span>
          </div>
        </main>
        {
          openScheduleModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
              <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl">

                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Created Schedules
                  </h3>

                  <button
                    onClick={() => setOpenScheduleModal(false)}
                    className="text-sm text-gray-500 hover:text-black"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {schedules.length === 0 ? (
                    <p className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-3 text-sm text-gray-500">
                      No schedule added yet.
                    </p>
                  ) : (
                    schedules.map((schedule) => (
                      <div key={schedule.id} className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-3 py-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {schedule.dayName}
                          </p>

                          <p className="text-xs text-gray-500">
                            {schedule.startTime} - {schedule.endTime}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                            {schedule.slotDuration} min
                          </span>

                          <button
                            type="button"
                            onClick={() => handleRemoveSchedule(schedule.id)}
                            className="text-xs text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )
        }
      </div>

    </div>
  );
}