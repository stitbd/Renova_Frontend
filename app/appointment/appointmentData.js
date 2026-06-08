/* ═══════════════════════════════════════════════════════════════
   appointmentData.js — Static data & validation helpers
   ═══════════════════════════════════════════════════════════════ */

/* ─── DEPARTMENTS ──────────────────────────────────────────── */
export const DEPARTMENTS = [
  { id: "general",     name: "General",     icon: "🩺", wait: "15–30 min" },
  { id: "cardiology",  name: "Cardiology",  icon: "❤️", wait: "30–45 min" },
  { id: "orthopedics", name: "Orthopedics", icon: "🦴", wait: "30–45 min" },
  { id: "neurology",   name: "Neurology",   icon: "🧠", wait: "45–60 min" },
  { id: "pediatrics",  name: "Pediatrics",  icon: "👶", wait: "20–35 min" },
  { id: "dental",      name: "Dental",      icon: "🦷", wait: "30–60 min" },
  { id: "dermatology", name: "Dermatology", icon: "🧴", wait: "25–40 min" },
  { id: "eye-care",    name: "Eye Care",    icon: "👁️", wait: "30–50 min" },
];

/* ─── DOCTORS ─────────────────────────────────────────────── */
export const DOCTORS = {
  cardiology: [
    { id: "c1", name: "Dr. Fatima Rahman",   title: "Senior Cardiologist",        exp: "15 yrs", avatar: "FR" },
    { id: "c2", name: "Dr. Ahmed Hassan",    title: "Interventional Cardiologist", exp: "12 yrs", avatar: "AH" },
  ],
  orthopedics: [
    { id: "o1", name: "Dr. Kamal Uddin",     title: "Orthopedic Surgeon",          exp: "18 yrs", avatar: "KU" },
  ],
  general: [
    { id: "g1", name: "Dr. Nadia Islam",     title: "General Practitioner",        exp: "10 yrs", avatar: "NI" },
    { id: "g2", name: "Dr. Rahim Chowdhury", title: "Family Medicine",             exp: "8 yrs",  avatar: "RC" },
  ],
  pediatrics: [
    { id: "p1", name: "Dr. Laila Ahmed",     title: "Pediatrician",                exp: "14 yrs", avatar: "LA" },
  ],
  dental: [
    { id: "d1", name: "Dr. Sumon Hossain",   title: "Dental Surgeon",              exp: "11 yrs", avatar: "SH" },
  ],
  neurology: [
    { id: "n1", name: "Dr. Tanvir Malik",    title: "Neurologist",                 exp: "16 yrs", avatar: "TM" },
  ],
  dermatology: [
    { id: "sk1", name: "Dr. Priya Das",      title: "Dermatologist",               exp: "9 yrs",  avatar: "PD" },
  ],
  "eye-care": [
    { id: "e1", name: "Dr. Omar Faruk",      title: "Ophthalmologist",             exp: "13 yrs", avatar: "OF" },
  ],
};

/* ─── BRANCHES ────────────────────────────────────────────── */
export const BRANCHES = [
  { id: "dhaka-main", name: "Dhaka — Main",   addr: "House 45, Road 12, Dhanmondi" },
  { id: "uttara",     name: "Dhaka — Uttara", addr: "Sector 7, Road 4, Uttara" },
  { id: "ctg",        name: "Chittagong",     addr: "GEC Circle, Agrabad" },
  { id: "sylhet",     name: "Sylhet",         addr: "Zindabazar, Amberkhana" },
  { id: "rajshahi",   name: "Rajshahi",       addr: "Shaheb Bazar" },
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
  // Cardiology
  c1: [
    { time: "08:00 AM", booked: false }, { time: "08:30 AM", booked: true  },
    { time: "09:00 AM", booked: false }, { time: "09:30 AM", booked: false },
    { time: "10:00 AM", booked: true  }, { time: "11:00 AM", booked: false },
    { time: "02:00 PM", booked: false }, { time: "03:00 PM", booked: true  },
    { time: "04:00 PM", booked: false }, { time: "05:00 PM", booked: false },
  ],
  c2: [
    { time: "09:00 AM", booked: false }, { time: "09:30 AM", booked: true  },
    { time: "10:30 AM", booked: false }, { time: "11:00 AM", booked: false },
    { time: "02:30 PM", booked: true  }, { time: "03:30 PM", booked: false },
    { time: "04:30 PM", booked: false }, { time: "05:30 PM", booked: true  },
  ],
  // Orthopedics
  o1: [
    { time: "08:00 AM", booked: true  }, { time: "09:00 AM", booked: false },
    { time: "10:00 AM", booked: false }, { time: "11:30 AM", booked: false },
    { time: "02:00 PM", booked: false }, { time: "03:00 PM", booked: true  },
    { time: "04:00 PM", booked: false },
  ],
  // General
  g1: [
    { time: "08:00 AM", booked: false }, { time: "08:30 AM", booked: false },
    { time: "09:00 AM", booked: true  }, { time: "10:00 AM", booked: false },
    { time: "11:00 AM", booked: false }, { time: "02:00 PM", booked: true  },
    { time: "03:00 PM", booked: false }, { time: "04:00 PM", booked: false },
    { time: "05:00 PM", booked: false },
  ],
  g2: [
    { time: "09:30 AM", booked: false }, { time: "10:30 AM", booked: true  },
    { time: "11:30 AM", booked: false }, { time: "02:30 PM", booked: false },
    { time: "03:30 PM", booked: false }, { time: "04:30 PM", booked: true  },
  ],
  // Pediatrics
  p1: [
    { time: "08:30 AM", booked: false }, { time: "09:30 AM", booked: true  },
    { time: "10:30 AM", booked: false }, { time: "11:00 AM", booked: false },
    { time: "02:00 PM", booked: false }, { time: "03:00 PM", booked: true  },
    { time: "04:00 PM", booked: false }, { time: "05:00 PM", booked: false },
  ],
  // Dental
  d1: [
    { time: "08:00 AM", booked: false }, { time: "09:00 AM", booked: false },
    { time: "10:00 AM", booked: true  }, { time: "11:00 AM", booked: false },
    { time: "02:00 PM", booked: false }, { time: "04:00 PM", booked: false },
    { time: "05:00 PM", booked: true  },
  ],
  // Neurology
  n1: [
    { time: "09:00 AM", booked: false }, { time: "10:00 AM", booked: false },
    { time: "11:00 AM", booked: true  }, { time: "02:00 PM", booked: false },
    { time: "03:00 PM", booked: false }, { time: "04:00 PM", booked: true  },
    { time: "05:00 PM", booked: false },
  ],
  // Dermatology
  sk1: [
    { time: "08:00 AM", booked: false }, { time: "08:30 AM", booked: true  },
    { time: "10:00 AM", booked: false }, { time: "11:00 AM", booked: false },
    { time: "02:30 PM", booked: false }, { time: "03:30 PM", booked: true  },
    { time: "04:30 PM", booked: false },
  ],
  // Eye Care
  e1: [
    { time: "09:00 AM", booked: false }, { time: "09:30 AM", booked: false },
    { time: "10:30 AM", booked: true  }, { time: "11:30 AM", booked: false },
    { time: "02:00 PM", booked: true  }, { time: "03:00 PM", booked: false },
    { time: "04:00 PM", booked: false }, { time: "05:30 PM", booked: false },
  ],
};

/* ─── INITIAL FORM STATE ──────────────────────────────────── */
export const INITIAL_FORM = {
  fullName:      "",
  email:         "",
  phone:         "",
  dob:           "",
  gender:        "",
  mode:          "",        /* "online" | "offline" */
  dept:          "",
  doctor:        "",
  branch:        "",
  date:          "",
  slot:          "",
  paymentMethod: "",        /* "bkash" | "card" | "cash" */
  bkashNumber:   "",        /* bKash sub-form */
  transactionId: "",        /* bKash sub-form */
  cardNumber:    "",        /* Card sub-form */
  cardExpiry:    "",        /* Card sub-form */
  cardCvv:       "",        /* Card sub-form */
  cardName:      "",        /* Card sub-form */
  symptoms:      "",
  medHistory:    "",
  consent:       false,
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
  if (!d.mode)   e.mode   = "Select Online or Offline";
  if (!d.dept)   e.dept   = "Select a department";
  if (!d.doctor) e.doctor = "Select a doctor";
  /* branch required only for offline */
  if (d.mode === "offline" && !d.branch) e.branch = "Select a branch";
  if (!d.date)   e.date   = "Choose a preferred date";
  if (!d.slot)   e.slot   = "Choose a time slot";
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