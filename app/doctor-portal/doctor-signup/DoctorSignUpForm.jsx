"use client";
import { useState } from "react";
import Image from "next/image";
import "./doctor-signup.css";
import { useRouter } from "next/navigation";


/* ─────────────────────────────────────────────────────────────────
   SVG Icons
───────────────────────────────────────────────────────────────── */
const Icon = {
  /* Header icon — doctor silhouette in circle */
  Doctor: () => (
    <svg viewBox="0 0 56 56" fill="none" width="40" height="40">
      <circle cx="28" cy="28" r="26" stroke="#1e6faf" strokeWidth="2" fill="#eef3f9" />
      <circle cx="28" cy="20" r="6.5" stroke="#1e6faf" strokeWidth="1.8" />
      <path d="M13 44c0-8.284 6.716-15 15-15s15 6.716 15 15" stroke="#1e6faf" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M24 30v5M32 30v5M24 32.5h8" stroke="#4caf50" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),

  /* Field icons */
  ID: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <rect x="1" y="3" width="14" height="10" rx="2" stroke="#94a3b8" strokeWidth="1.3" />
      <circle cx="5.5" cy="8" r="1.5" stroke="#94a3b8" strokeWidth="1.2" />
      <path d="M9 6.5h4M9 8h3M9 9.5h4" stroke="#94a3b8" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  ),
  User: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <circle cx="8" cy="5.5" r="2.5" stroke="#94a3b8" strokeWidth="1.3" />
      <path d="M2.5 14c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <path d="M5.2 2H3a1 1 0 0 0-1 1c0 5.523 4.477 10 10 10a1 1 0 0 0 1-1v-2.2a1 1 0 0 0-.684-.949l-2-.667a1 1 0 0 0-1.052.26l-.624.624A7.965 7.965 0 0 1 5.932 5.36l.624-.624a1 1 0 0 0 .26-1.052L6.15 2.684A1 1 0 0 0 5.2 2z" stroke="#94a3b8" strokeWidth="1.2" />
    </svg>
  ),
  Email: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="#94a3b8" strokeWidth="1.3" />
      <path d="M1.5 4.5L8 9l6.5-4.5" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  Calendar: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <rect x="1.5" y="3" width="13" height="11" rx="1.5" stroke="#94a3b8" strokeWidth="1.3" />
      <path d="M5 1.5v3M11 1.5v3M1.5 7h13" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  Blood: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <path d="M8 2S4 7 4 10a4 4 0 0 0 8 0C12 7 8 2 8 2z" stroke="#94a3b8" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  ),
  Globe: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <circle cx="8" cy="8" r="6" stroke="#94a3b8" strokeWidth="1.3" />
      <path d="M8 2c-2 2-2 8 0 12M8 2c2 2 2 8 0 12M2 8h12" stroke="#94a3b8" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  ),
  BMDC: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <rect x="2" y="1.5" width="12" height="13" rx="1.5" stroke="#94a3b8" strokeWidth="1.3" />
      <path d="M5 5h6M5 7.5h6M5 10h4" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  Stethoscope: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <path d="M3 2.5c0 2.5 1.5 4.5 4 4.5s4-2 4-4.5" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M7 7v3.5a2.5 2.5 0 0 0 5 0V9" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="12.5" cy="8.5" r="1" fill="#94a3b8" />
    </svg>
  ),
  Degree: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <path d="M8 2L1 6l7 4 7-4-7-4z" stroke="#94a3b8" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M4 8v3c0 1.105 1.79 2 4 2s4-.895 4-2V8" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  Clock: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <circle cx="8" cy="8" r="6" stroke="#94a3b8" strokeWidth="1.3" />
      <path d="M8 4.5V8l2.5 2" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Designation: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke="#94a3b8" strokeWidth="1.3" />
      <path d="M5 7h6M5 9.5h4" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  Taka: () => (
    <svg viewBox="0 0 16 16" fill="none" width="15" height="15">
      <text x="3" y="13" fontFamily="serif" fontSize="12" fill="#94a3b8">৳</text>
    </svg>
  ),
  Chevron: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M4 6l4 4 4-4" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  /* Consult type */
  Video: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <rect x="1" y="4" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11 6.5l4-2v7l-4-2V6.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
  Audio: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M8 1.5a2.5 2.5 0 0 1 2.5 2.5v4a2.5 2.5 0 0 1-5 0V4A2.5 2.5 0 0 1 8 1.5z" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3 8a5 5 0 0 0 10 0M8 13v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  Chat: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <path d="M13.5 8.5c0 2.485-2.462 4.5-5.5 4.5a6.28 6.28 0 0 1-2.236-.407L2 13.5l1.1-2.8A4.24 4.24 0 0 1 2.5 8.5C2.5 6.015 4.962 4 8 4s5.5 2.015 5.5 4.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  ),

  /* Document icons */
  Photo: () => (
    <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
      <circle cx="16" cy="14" r="6" stroke="#64748b" strokeWidth="1.5" />
      <path d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  NID: () => (
    <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
      <rect x="3" y="7" width="26" height="18" rx="2" stroke="#64748b" strokeWidth="1.5" />
      <circle cx="11" cy="16" r="3" stroke="#64748b" strokeWidth="1.4" />
      <path d="M17 13h8M17 16h6M17 19h8" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  BMDCID: () => (
    <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
      <rect x="4" y="3" width="24" height="26" rx="2" stroke="#64748b" strokeWidth="1.5" />
      <path d="M9 10h14M9 14h14M9 18h10" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="22" cy="22" r="4" fill="#fff" stroke="#4caf50" strokeWidth="1.5" />
      <path d="M20 22l1.5 1.5L24 20" stroke="#4caf50" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  EduCert: () => (
    <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
      <path d="M16 4L3 11l13 7 13-7-13-7z" stroke="#64748b" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 15v6c0 2.209 4.03 4 9 4s9-1.791 9-4v-6" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  ExpCert: () => (
    <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
      <rect x="3" y="7" width="26" height="20" rx="2" stroke="#64748b" strokeWidth="1.5" />
      <path d="M10 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" stroke="#64748b" strokeWidth="1.5" />
      <path d="M9 17h14M9 21h10" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),

  /* Shield for verify */
  Shield: () => (
    <svg viewBox="0 0 28 28" fill="none" width="28" height="28">
      <path d="M14 3L5 7.5v6.5C5 19.7 8.9 23.7 14 25c5.1-1.3 9-5.3 9-11V7.5L14 3z" fill="#4caf50" />
      <path d="M10 14l3 3.5L18 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  /* Submit */
  Submit: () => (
    <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 10l2.5 2.5L13 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  /* Sidebar benefit icons */
  Verified: () => (
    <svg viewBox="0 0 28 28" fill="none" width="26" height="26">
      <path d="M14 3L5 7.5v6.5C5 19.7 8.9 23.7 14 25c5.1-1.3 9-5.3 9-11V7.5L14 3z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10 14l3 3.5L18 11" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Grow: () => (
    <svg viewBox="0 0 28 28" fill="none" width="26" height="26">
      <circle cx="14" cy="10" r="4" stroke="white" strokeWidth="1.6" />
      <path d="M6 24c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M20 16l3 3-3 3M23 19h-5" stroke="#a5d6a7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Manage: () => (
    <svg viewBox="0 0 28 28" fill="none" width="26" height="26">
      <path d="M4 20l5-6 4 4 5-7 5 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 23h20" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

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
          <IconComp />
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
          <IconComp />
        </span>
      )}
      <select className="doctor-signup__select" {...props}>
        {children}
      </select>
      <span className="doctor-signup__select-chevron">
        <Icon.Chevron />
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Main Component
───────────────────────────────────────────────────────────────── */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001/api/v1";

const DOCUMENT_FIELDS = [
  { Ic: Icon.Photo, title: "Profile Photo", req: false, hint: "JPG, PNG (Max 2MB)", btn: "Upload Photo", documentType: "OTHER" },
  { Ic: Icon.NID, title: "NID / Passport", req: true, hint: "JPG, PNG (Max 2MB)", btn: "Upload Document", documentType: "NID" },
  { Ic: Icon.BMDCID, title: "BMDC Certificate", req: true, hint: "JPG, PNG, PDF (Max 2MB)", btn: "Upload Document", documentType: "LICENSE" },
  { Ic: Icon.EduCert, title: "Educational Certificate", req: false, hint: "JPG, PNG, PDF (Max 2MB)", btn: "Upload Document", documentType: "DEGREE" },
  { Ic: Icon.ExpCert, title: "Experience Certificate", req: false, hint: "JPG, PNG, PDF (Max 2MB)", btn: "Upload Document", documentType: "CERTIFICATE" },
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

      // conslole.log("API Response:", { status: response.status, body: result }); 
      // conslole.log("Submitting registration with payload:", payload);
      if (!response.ok || result?.success === false) {
        const fallbackMessage = response.status >= 500
          ? "Server error occurred while creating doctor. Please try again later."
          : "Failed to create doctor. Please check the form and try again.";

        throw new Error(getApiErrorMessage(result, fallbackMessage));
      }

      resetForm();
      router.push("/doctor-portal/doctor-signin");
      toast.success("Registration successful! Please sign in to continue.");

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

  /* ── Success Screen ─────────────────── */
  // if (submitted) {
  //   return (
  //     <div className="doctor-signup__success">
  //       <div className="doctor-signup__success-card">
  //         <div className="doctor-signup__success-icon">✓</div>
  //         <h2>Registration Submitted!</h2>
  //         <p>
  //           Your application has been received. Our team will review your
  //           documents and notify you via email once verified.
  //         </p>
  //         <button
  //           onClick={() => { setSubmitted(false); resetForm(); }}
  //           className="doctor-signup__btn-success"
  //         >
  //           Register Another Doctor
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

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
                <Icon.Verified />
              </div>
              <div className="doctor-signup__benefit-content">
                <h4>Verified &amp; Secure</h4>
                <p>Your data is safe with us</p>
              </div>
            </div>

            <div className="doctor-signup__benefit">
              <div className="doctor-signup__benefit-icon">
                <Icon.Grow />
              </div>
              <div className="doctor-signup__benefit-content">
                <h4>Grow Your Practice</h4>
                <p>Connect with more patients</p>
              </div>
            </div>

            <div className="doctor-signup__benefit">
              <div className="doctor-signup__benefit-icon">
                <Icon.Manage />
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
                <Icon.Doctor />
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
                <Input icon={Icon.ID} value="DOC_0005" disabled readOnly />
              </Field>
              <Field label="Full Name" required>
                <Input icon={Icon.User} name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" placeholder="Enter full name" required />
              </Field>
              <Field label="Password" required>
                <Input icon={Icon.ID} name="password" value={formData.password} onChange={handleInputChange} type="password" placeholder="Enter password" required />
              </Field>
            </div>

            <div className="doctor-signup__grid-3">
              <Field label="Mobile Number" required>
                <div className="doctor-signup__otp-row">
                  <Input icon={Icon.Phone} name="mobile" value={formData.mobile} onChange={handleInputChange} type="tel" placeholder="Enter mobile number" required />
                  <button type="button" className="doctor-signup__btn-otp">
                    Send OTP
                  </button>
                </div>
              </Field>
              <Field label="Email Address" required>
                <Input icon={Icon.Email} name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="Enter email address" required />
              </Field>
              <Field label="Date of Birth" required>
                <Input icon={Icon.Calendar} name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} type="date" required />
              </Field>
            </div>

            <div className="doctor-signup__grid-3">
              <Field label="Gender" required>
                <Select icon={Icon.User} name="gender" value={formData.gender} onChange={handleInputChange} required>
                  <option value="" disabled>Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Select>
              </Field>
              <Field label="Blood Group">
                <Select icon={Icon.Blood} name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange}>
                  <option value="" disabled>Select blood group</option>
                  {["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"].map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Nationality">
                <Select icon={Icon.Globe} name="nationality" value={formData.nationality} onChange={handleInputChange}>
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
                <Input icon={Icon.BMDC} name="bmdcNumber" value={formData.bmdcNumber} onChange={handleInputChange} type="text" placeholder="Enter BMDC / Reg. number" required />
              </Field>
              <Field label="Specialization" required>
                <Select icon={Icon.Stethoscope} name="specializationName" value={formData.specializationName} onChange={handleInputChange} required>
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
                <Select icon={Icon.Stethoscope} name="subSpecialization" value={formData.subSpecialization} onChange={handleInputChange}>
                  <option value="" disabled>Select sub specialization</option>
                  <option>Interventional Cardiology</option>
                  <option>Pediatric Surgery</option>
                  <option>Spine Surgery</option>
                </Select>
              </Field>
            </div>

            <div className="doctor-signup__grid-3">
              <Field label="Qualification" required>
                <Input icon={Icon.Degree} name="qualification" value={formData.qualification} onChange={handleInputChange} type="text" placeholder="Enter highest qualification" required />
              </Field>
              <Field label="Experience" required>
                <div className="doctor-signup__input-wrap">
                  <span className="doctor-signup__input-icon">
                    <Icon.Clock />
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
                <Input icon={Icon.Designation} name="currentDesignation" value={formData.currentDesignation} onChange={handleInputChange} type="text" placeholder="Enter current designation" />
              </Field>
            </div>

            {/* ── Work & Availability ── */}
            <h3 className="doctor-signup__section-title">Work &amp; Availability</h3>

            <div className="consultation-grid">
              {/* Consultation Type */}
              <Field label="Consultation Type" required>
                <div className="consult-type-buttons">
                  {[
                    { id: "video", label: "Video", Ic: Icon.Video },
                    { id: "audio", label: "Audio", Ic: Icon.Audio },
                    { id: "chat", label: "Chat", Ic: Icon.Chat },
                  ].map(({ id, label, Ic }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setConsultType(id)}
                      className={`consult-type-btn ${consultType === id ? 'active' : ''}`}
                    >
                      <Ic className="icon" />
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
                  <Icon.Taka className="fee-icon" />
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
                    <Ic />
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
                <Icon.Shield />
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
                <Icon.Submit />
                {loading ? "Submitting..." : "Submit Registration"}
              </button>
            </div>
          </form>

          {/* Security notice */}
          <div className="doctor-signup__security-notice">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
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
                    ✕
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