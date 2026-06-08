/* ═══════════════════════════════════════════════════════════════
   appointmentData.js — Static data & validation helpers
   ═══════════════════════════════════════════════════════════════ */

import { doctors as siteDocators } from "@/constants/siteData";

/* ─── DEPARTMENTS ──────────────────────────────────────────── */
export const DEPARTMENTS = [
  { id: "general", name: "General", icon: "🩺", wait: "15–30 min" },
  { id: "cardiology", name: "Cardiology", icon: "❤️", wait: "30–45 min" },
  { id: "orthopedics", name: "Orthopedics", icon: "🦴", wait: "30–45 min" },
  { id: "neurology", name: "Neurology", icon: "🧠", wait: "45–60 min" },
  { id: "pediatrics", name: "Pediatrics", icon: "👶", wait: "20–35 min" },
  { id: "dental", name: "Dental", icon: "🦷", wait: "30–60 min" },
  { id: "dermatology", name: "Dermatology", icon: "🧴", wait: "25–40 min" },
  { id: "eye-care", name: "Eye Care", icon: "👁️", wait: "30–50 min" },
];

// Specialty → department ID map
const SPECIALTY_TO_DEPT = {
  "Cardiologist": "cardiology",
  "Neurologist": "neurology",
  "Pediatrician": "pediatrics",
  "Orthopedic Surgeon": "orthopedics",
  "General Practitioner": "general",
  "Dental Surgeon": "dental",
  "Dermatologist": "dermatology",
  "Ophthalmologist": "eye-care",
};

export const DOCTORS = siteDocators.reduce((acc, doc) => {
  const deptId = SPECIALTY_TO_DEPT[doc.specialty];
  if (!deptId) return acc;
  if (!acc[deptId]) acc[deptId] = [];
  acc[deptId].push({
    id: String(doc.id),
    name: `Dr. ${doc.name}`,
    title: doc.title,
    exp: doc.experience,
    avatar: doc.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase(),
    branchId: doc.branchId || "",
    consultationType: doc.consultationType || "Video / Audio Call",
  });
  return acc;
}, {});

/* ─── BRANCHES ────────────────────────────────────────────── */
export const BRANCHES = [
  { id: "dhaka-main", name: "Dhaka — Main", addr: "House 45, Road 12, Dhanmondi" },
  { id: "uttara", name: "Dhaka — Uttara", addr: "Sector 7, Road 4, Uttara" },
  { id: "ctg", name: "Chittagong", addr: "GEC Circle, Agrabad" },
  { id: "mirpur", name: "Mirpur", addr: "Zindabazar, Amberkhana" },
  { id: "dhanmondi", name: "Dhanmondi", addr: "Shaheb Bazar" },
];

/* ─── TIME SLOTS (fallback / base list) ──────────────────── */
export const SLOTS = [
  "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
];

/* ─── DOCTOR SLOTS ────────────────────────────────────────── */
/*
   Each doctor has their own available time slots.
   "booked" slots are marked so the UI can show "Full" badges.
   Format: { time: string, booked: boolean }
*/
export const DOCTOR_SLOTS = {
  // Doctor 1 — Fariha Rahman (Cardiologist)
  "1": [
    { time: "09:00 AM", booked: false }, { time: "09:30 AM", booked: false },
    { time: "10:00 AM", booked: true }, { time: "10:30 AM", booked: false },
    { time: "11:00 AM", booked: false }, { time: "02:00 PM", booked: false },
    { time: "03:00 PM", booked: true }, { time: "04:00 PM", booked: false },
    { time: "05:00 PM", booked: false },
  ],
  // Doctor 2 — Tasnim Farin (Neurologist)
  "2": [
    { time: "10:00 AM", booked: false }, { time: "10:30 AM", booked: false },
    { time: "11:00 AM", booked: true }, { time: "02:00 PM", booked: false },
    { time: "03:00 PM", booked: false }, { time: "04:00 PM", booked: true },
    { time: "05:00 PM", booked: false },
  ],
  // Doctor 3 — Aysha Aktar Tripti (Pediatrician)
  "3": [
    { time: "08:30 AM", booked: false }, { time: "09:30 AM", booked: true },
    { time: "10:30 AM", booked: false }, { time: "11:00 AM", booked: false },
    { time: "02:00 PM", booked: false }, { time: "03:00 PM", booked: true },
    { time: "04:00 PM", booked: false }, { time: "05:00 PM", booked: false },
  ],
  // Doctor 4 — Humayon Kabir (Orthopedic Surgeon)
  "4": [
    { time: "09:00 AM", booked: false }, { time: "10:00 AM", booked: false },
    { time: "11:30 AM", booked: false }, { time: "02:00 PM", booked: true },
    { time: "03:00 PM", booked: false }, { time: "04:00 PM", booked: false },
  ],
  // Doctor 5 — Nasreen Akter (Cardiologist)
  "5": [
    { time: "10:00 AM", booked: false }, { time: "10:30 AM", booked: true },
    { time: "11:00 AM", booked: false }, { time: "02:30 PM", booked: false },
    { time: "03:30 PM", booked: false }, { time: "04:30 PM", booked: true },
    { time: "05:00 PM", booked: false },
  ],
  // Doctor 6 — Katrina Kaif (Neurologist)
  "6": [
    { time: "11:00 AM", booked: false }, { time: "11:30 AM", booked: false },
    { time: "02:00 PM", booked: true }, { time: "03:00 PM", booked: false },
    { time: "04:00 PM", booked: false }, { time: "05:30 PM", booked: false },
  ],
  // Doctor 7 — Alifa Aktar (Pediatrician)
  "7": [
    { time: "09:00 AM", booked: false }, { time: "09:30 AM", booked: false },
    { time: "10:30 AM", booked: true }, { time: "11:00 AM", booked: false },
    { time: "02:00 PM", booked: false }, { time: "03:30 PM", booked: true },
    { time: "04:30 PM", booked: false },
  ],
  // Doctor 8 — Maria Hoque (Orthopedic Surgeon)
  "8": [
    { time: "10:00 AM", booked: false }, { time: "10:30 AM", booked: false },
    { time: "11:30 AM", booked: true }, { time: "02:00 PM", booked: false },
    { time: "03:00 PM", booked: false }, { time: "04:00 PM", booked: true },
    { time: "05:00 PM", booked: false },
  ],
};

/* ─── INITIAL FORM STATE ──────────────────────────────────── */
export const INITIAL_FORM = {
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  mode: "",        /* "online" | "offline" */
  dept: "",
  doctor: "",
  branch: "",
  date: "",
  slot: "",
  paymentMethod: "",        /* "bkash" | "card" | "cash" */
  bkashNumber: "",        /* bKash sub-form */
  transactionId: "",        /* bKash sub-form */
  cardNumber: "",        /* Card sub-form */
  cardExpiry: "",        /* Card sub-form */
  cardCvv: "",        /* Card sub-form */
  cardName: "",        /* Card sub-form */
  symptoms: "",
  medHistory: "",
  consent: false,
};

/* ─── VALIDATION ──────────────────────────────────────────── */

/** Step 1 — Personal info */
export const validateStep1 = (d) => {
  const e = {};
  if (!d.fullName?.trim() || d.fullName.trim().length < 3)
    e.fullName = "Enter your full name (min 3 chars)";
  if (!d.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email))
    e.email = "Enter a valid email address";
  if (!d.phone?.trim() || !/^(\+880|01)[0-9]{8,10}$/.test(d.phone.replace(/\s/g, "")))
    e.phone = "Enter a valid BD phone number";
  if (!d.dob)
    e.dob = "Date of birth is required";
  if (!d.gender)
    e.gender = "Please select your gender";
  return e;
};

/** Step 2 — Scheduling */
export const validateStep2 = (d) => {
  const e = {};
  if (!d.mode) e.mode = "Select Online or Offline";
  if (!d.dept) e.dept = "Select a department";
  if (!d.doctor) e.doctor = "Select a doctor";
  /* branch required only for offline */
  if (d.mode === "offline" && !d.branch) e.branch = "Select a branch";
  if (!d.date) e.date = "Choose a preferred date";
  if (!d.slot) e.slot = "Choose a time slot";
  return e;
};

/** Step 3 — Payment method */
export const validatePayment = (d) => {
  const e = {};
  if (!d.paymentMethod) e.paymentMethod = "Select a payment method";
  return e;
};

/** Step 3 — Confirm */
export function validateStep3(data) {
  const errors = {};
  if (!data.symptoms?.trim()) errors.symptoms = "Please describe your symptoms";
  if (!data.consent) errors.consent = "You must agree to the terms";
  // remove paymentMethod validation
  return errors;
}