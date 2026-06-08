"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  DEPARTMENTS, DOCTORS, BRANCHES, DOCTOR_SLOTS,
  INITIAL_FORM, validateStep1, validateStep2, validateStep3, validatePayment,
} from "./appointmentData";
import "@/styles/pages/appointment.css";
import { useAppSelector } from "@/redux/hook";
import { API_URL } from "@/config";

/* ═══════════════════════════════════════════════════════════════
   UTILITY: Convert time format to 24-hour HH:MM format
   ═══════════════════════════════════════════════════════════════ */
const convertTo24HourFormat = (timeStr) => {
  if (!timeStr) return timeStr;
  
  // If already in 24-hour format (HH:MM without AM/PM), return as is
  if (/^\d{2}:\d{2}$/.test(timeStr)) return timeStr;
  
  // Parse 12-hour format (e.g., "09:30 AM" or "09:30AM")
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)$/);
  if (match) {
    let [, hours, minutes, period] = match;
    hours = parseInt(hours, 10);
    const isPM = period.toUpperCase() === "PM";
    
    if (isPM && hours !== 12) {
      hours += 12;
    } else if (!isPM && hours === 12) {
      hours = 0;
    }
    
    return `${String(hours).padStart(2, "0")}:${minutes}`;
  }
  
  return timeStr;
};

/* ═══════════════════════════════════════════════════════════════
   INLINE SVG ICONS
   ═══════════════════════════════════════════════════════════════ */
const SVG_PROPS = { fill: "none", stroke: "currentColor", strokeWidth: "1.8" };

const IconUser = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" {...SVG_PROPS}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
const IconMail = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" {...SVG_PROPS}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>;
const IconPhone = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" {...SVG_PROPS}><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 4.08 4.18 2 2 0 0 1 6.06 2h3a2 2 0 0 1 2 1.72c.127.946.36 1.874.69 2.76a2 2 0 0 1-.45 2.11L10.09 9.91a16 16 0 0 0 6.29 6.29l1.13-1.14a2 2 0 0 1 2.11-.45c.886.33 1.814.563 2.76.69A2 2 0 0 1 22 16.92z" /></svg>;
const IconCalendar = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" {...SVG_PROPS}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
const IconPin = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" {...SVG_PROPS}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;
const IconCheck = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" {...SVG_PROPS} strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>;
const IconArrowR = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" {...SVG_PROPS} strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>;
const IconArrowL = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" {...SVG_PROPS} strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>;
const IconLock = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" {...SVG_PROPS}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;
const IconInfo = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" {...SVG_PROPS}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>;
const IconDownload = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" {...SVG_PROPS} strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>;
const IconSearch = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" {...SVG_PROPS} strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
const IconX = ({ size = 16 }) => <svg width={size} height={size} viewBox="0 0 24 24" {...SVG_PROPS} strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;

/* ═══════════════════════════════════════════════════════════════
   FIELD WRAPPER — label + icon + error message
   ═══════════════════════════════════════════════════════════════ */
function Field({ label, error, icon: IconComponent, children }) {
  return (
    <div className="appt-field">
      {label && <label>{label}</label>}
      {IconComponent
        ? (
          <div className="appt-input-wrap">
            <span className="appt-ico"><IconComponent size={16} /></span>
            {children}
          </div>
        )
        : children
      }
      {error && <span className="appt-err-msg">{error}</span>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MODAL — generic overlay used for Terms / Privacy popups
   ═══════════════════════════════════════════════════════════════ */
function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="appt-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div className="appt-modal" onClick={e => e.stopPropagation()}>
        <div className="appt-modal__head">
          <h3 className="appt-modal__title">{title}</h3>
          <button className="appt-modal__close" onClick={onClose} aria-label="Close"><IconX size={18} /></button>
        </div>
        <div className="appt-modal__body">{children}</div>
        <div className="appt-modal__foot">
          <button className="btn btn-primary" onClick={onClose}>I Understand</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TERMS / PRIVACY CONTENT (inline — no external link needed)
   ═══════════════════════════════════════════════════════════════ */
const TERMS_CONTENT = (
  <div className="appt-legal-content">
    <h4>1. Appointment Booking</h4>
    <p>By booking an appointment you agree to attend at the scheduled time or cancel at least 24 hours in advance. Repeated no-shows may result in restricted booking access.</p>
    <h4>2. Medical Information</h4>
    <p>Information you provide is used solely to facilitate your healthcare appointment. It is shared only with the treating physician and necessary clinical staff.</p>
    <h4>3. Payment</h4>
    <p>For online payments, charges are processed securely. Refunds for cancellations made 24+ hours before the appointment will be processed within 5-7 business days.</p>
    <h4>4. Limitation of Liability</h4>
    <p>The clinic is not liable for indirect or consequential damages arising from scheduling errors or service delays beyond our reasonable control.</p>
    <h4>5. Governing Law</h4>
    <p>These terms are governed by the laws of Bangladesh. Any disputes shall be subject to the jurisdiction of courts in Dhaka.</p>
  </div>
);

const PRIVACY_CONTENT = (
  <div className="appt-legal-content">
    <h4>1. Data We Collect</h4>
    <p>We collect your name, contact details, date of birth, gender, and medical history as provided during booking.</p>
    <h4>2. How We Use It</h4>
    <p>Your data is used to confirm your appointment, contact you with reminders, and provide clinical care. We do not sell or share your data with third parties.</p>
    <h4>3. Data Security</h4>
    <p>All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Access is restricted to authorised clinical and administrative staff only.</p>
    <h4>4. Retention</h4>
    <p>Medical records are retained for a minimum of 10 years as required by Bangladesh health regulations. You may request deletion of non-clinical booking data at any time.</p>
    <h4>5. Your Rights</h4>
    <p>You have the right to access, correct, or delete your personal data. Contact our data protection officer at privacy@clinic.com.</p>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   DOCTOR DROPDOWN — searchable select replacing radio list
   ═══════════════════════════════════════════════════════════════ */
function DoctorDropdown({ doctors, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(query.toLowerCase()) ||
    d.title.toLowerCase().includes(query.toLowerCase())
  );
  const selected = doctors.find(d => d.id === value);

  return (
    <div className="appt-doc-dd" style={{ position: "relative" }}>
      {/* Trigger */}
      <button
        type="button"
        className={`appt-doc-dd__trigger${open ? " open" : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected
          ? <><div className="appt-doc-avatar" style={{ width: 28, height: 28, fontSize: ".65rem" }}>{selected.avatar}</div><span>{selected.name}</span><span className="appt-doc-dd__meta">{selected.title}</span></>
          : <span className="appt-doc-dd__placeholder">Search & select a doctor…</span>
        }
        <span className="appt-doc-dd__chevron" style={{ marginLeft: "auto", color: "var(--appt-ink3)" }}>▾</span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="appt-doc-dd__panel" role="listbox">
          {/* Search */}
          <div className="appt-doc-dd__search-wrap">
            <IconSearch size={14} />
            <input
              className="appt-doc-dd__search"
              type="text"
              placeholder="Search by name or specialty…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
            />
            {query && (
              <button type="button" className="appt-doc-dd__clear" onClick={() => setQuery("")}><IconX size={12} /></button>
            )}
          </div>

          {/* List */}
          <div className="appt-doc-dd__list">
            {filtered.length === 0 && (
              <div className="appt-doc-dd__empty">No doctors found</div>
            )}
            {filtered.map(doc => (
              <div
                key={doc.id}
                role="option"
                aria-selected={value === doc.id}
                className={`appt-doc-dd__item${value === doc.id ? " sel" : ""}`}
                onClick={() => { onChange(doc.id); setOpen(false); setQuery(""); }}
              >
                <div className="appt-doc-avatar" style={{ width: 36, height: 36, fontSize: ".7rem", flexShrink: 0 }}>{doc.avatar}</div>
                <div>
                  <div className="appt-doc-name">{doc.name}</div>
                  <div className="appt-doc-meta">{doc.title} · {doc.exp} experience</div>
                </div>
                {value === doc.id && <span style={{ marginLeft: "auto", color: "var(--appt-teal)", fontWeight: 700 }}>✓</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   INVOICE — printable/downloadable on confirmation
   ═══════════════════════════════════════════════════════════════ */
function InvoicePrint({ data, bookingRef }) {
  const dept = DEPARTMENTS.find(d => d.id === data.dept);
  const doctors = data.dept ? (DOCTORS[data.dept] || []) : [];
  const doctor = doctors.find(d => d.id === data.doctor);
  const branch = BRANCHES.find(b => b.id === data.branch);

  const FEE = {
    cardiology: 2000, orthopedics: 1800, general: 800, pediatrics: 900,
    dental: 1200, neurology: 2500, dermatology: 1500, "eye-care": 1400
  };
  const consultFee = FEE[data.dept] || 1000;
  const serviceFee = data.mode === "online" ? 100 : 0;
  const total = consultFee + serviceFee;
  const isOnlinePay = data.paymentMethod === "bkash" || data.paymentMethod === "card";
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  const handlePrint = () => {
    const el = document.getElementById("appt-invoice");
    if (!el) return;
    const w = window.open("", "_blank");
    w.document.write(`<!DOCTYPE html><html><head><title>Invoice ${bookingRef}</title>
      <style>
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'DM Sans',Arial,sans-serif;color:#0d1b2a;background:#fff;padding:32px}
        .inv{max-width:680px;margin:0 auto}
        .inv-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:28px;padding-bottom:20px;border-bottom:2px solid #1E6FAF}
        .inv-left{display:flex;flex-direction:column;gap:4px}
        .inv-logo{font-size:1.4rem;font-weight:800;color:#1E6FAF}
        .inv-logo span{display:block;font-size:.75rem;font-weight:400;color:#6b7b8d;margin-top:2px}
        .inv-logo-img{display:block;max-width:220px;height:auto;object-fit:contain;margin-bottom:8px}
        .inv-phoneAddress{font-size:.72rem;font-weight:400;color:#6b7b8d;line-height:1.5}
        .inv-ref{text-align:right}
        .inv-ref h2{font-size:1rem;color:#1E6FAF;font-weight:700;letter-spacing:.08em}
        .inv-ref p{font-size:.8rem;color:#6b7b8d;margin-top:4px}
        .inv-status{display:inline-block;background:#e0f4f1;color:#1E6FAF;font-size:.72rem;font-weight:700;padding:3px 10px;border-radius:50px;margin-top:6px;text-transform:uppercase;letter-spacing:.06em}
        .inv-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:24px 0}
        .inv-box{background:#f7f6f2;border-radius:10px;padding:16px}
        .inv-box h4{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#6b7b8d;margin-bottom:10px}
        .inv-box p{font-size:.85rem;line-height:1.7;color:#3a4a5c}
        .inv-box strong{color:#0d1b2a}
        table{width:100%;border-collapse:collapse;margin:20px 0}
        th{background:#1E6FAF;color:#fff;font-size:.78rem;font-weight:600;text-align:left;padding:10px 14px}
        td{padding:10px 14px;font-size:.85rem;border-bottom:1px solid #e2ddd8}
        tr:last-child td{border-bottom:none}
        .amt{text-align:right}
        .total-row td{font-weight:700;font-size:.95rem;background:#f0faf8;color:#1E6FAF}
        .inv-foot{margin-top:28px;padding-top:16px;border-top:1px solid #e2ddd8;font-size:.75rem;color:#6b7b8d;text-align:center;line-height:1.8}
        @media print{@page{size:A4 portrait;margin:18mm 16mm 18mm 16mm}html,body{width:210mm;margin:0;padding:0;background:#fff}.inv-logo-img{-webkit-print-color-adjust:exact;print-color-adjust:exact}.inv{max-width:100%;padding:0}body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
      </style></head><body>
      <div class="inv">
        <div class="inv-head">
          <div class="inv-left">
            <img src="/images/logo2.png" alt="Renova Life Care Ltd." class="inv-logo-img" style="height:56px;width:auto" />
            <div class="inv-phoneAddress">House #12, Gulshan 2, Dhaka-1212, Bangladesh</div>
            <div class="inv-phoneAddress">+880 1700-000000</div>
            <div class="inv-phoneAddress">info@renovalifecare.com</div>
          </div>
          <div class="inv-ref">
            <h2>INVOICE</h2>
            <p>Invoice No: ${bookingRef}</p>
            <p>Date: ${today}</p>
            <span class="inv-status">Confirmed</span>
          </div>
        </div>
        <div class="inv-grid">
          <div class="inv-box"><h4>Patient</h4>
            <p><strong>${data.fullName}</strong><br>${data.email}<br>${data.phone}<br>DOB: ${data.dob}</p>
          </div>
          <div class="inv-box"><h4>Appointment</h4>
            <p><strong>${dept?.name || ""} Dept.</strong><br>${doctor?.name || "To be assigned"}<br>${data.mode === "online" ? "🌐 Online Consultation" : branch?.name || ""}<br>${data.date} at ${data.slot}</p>
          </div>
        </div>
        <table>
          <thead><tr><th>Description</th><th class="amt">Amount (BDT)</th></tr></thead>
          <tbody>
            <tr><td>Consultation Fee — ${dept?.name || ""} (${doctor?.name || ""})</td><td class="amt">${consultFee.toLocaleString()}.00</td></tr>
            ${data.mode === "online" ? `<tr><td>Online Service Fee</td><td class="amt">${serviceFee}.00</td></tr>` : ""}
            <tr class="total-row"><td><strong>Total Payable</strong></td><td class="amt"><strong>${total.toLocaleString()}.00</strong></td></tr>
          </tbody>
        </table>
        <div class="inv-box"><h4>Payment</h4>
          <p>Method: <strong>${data.paymentMethod === "bkash" ? "bKash / Mobile Banking" : data.paymentMethod === "card" ? "Credit / Debit Card" : "Cash on Visit"}</strong>
          ${isOnlinePay ? `<br>Status: <strong style="color:#1E6FAF">Paid</strong>` : `<br>Status: <strong style="color:#c94040">Due on Visit</strong>`}</p>
        </div>
        <div class="inv-foot">
          Thank you for choosing Renova Life Care Ltd. For queries call +880 1700-000000 or email appointments@renovalifecare.com<br>
          This is a computer-generated invoice and does not require a physical signature.
        </div>
      </div>
      </body></html>`);
    w.document.close();
    w.focus();
    setTimeout(() => { w.print(); }, 400);
  };

  return (
    <>
      <div id="appt-invoice" style={{ display: "none" }} />
      <button
        type="button"
        className="appt-btn appt-btn-ghost appt-btn--invoice"
        onClick={handlePrint}
        style={{ width: "100%", marginTop: 10 }}
      >
        <IconDownload size={16} /> Download &amp; Print Invoice
      </button>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STEP 1 — Personal Information
   ═══════════════════════════════════════════════════════════════ */
function Step1({ data, errors, upd, onNext }) {
  return (
    <div className="appt-card">
      <div className="appt-card__head">
        <div className="appt-card__icon">🪪</div>
        <div>
          <div className="appt-card__title">Patient Information</div>
          <div className="appt-card__sub">Tell us about yourself so we can serve you better</div>
        </div>
      </div>

      <div className="appt-card__body appt-stack">
        <div className="appt-grid-2">
          <Field label="Full Name *" icon={IconUser} error={errors.fullName}>
            <input
              className={`appt-inp${errors.fullName ? " err" : ""}`}
              type="text"
              placeholder="Fatima Rahman"
              value={data.fullName}
              onChange={e => upd("fullName", e.target.value)}
              autoComplete="name"
              aria-invalid={!!errors.fullName}
            />
          </Field>

          <Field label="Email Address" icon={IconMail} error={errors.email}>
            <input
              className={`appt-inp${errors.email ? " err" : ""}`}
              type="email"
              placeholder="you@example.com"
              value={data.email}
              onChange={e => upd("email", e.target.value)}
              autoComplete="email"
              aria-invalid={!!errors.email}
            />
          </Field>

          <Field label="Phone Number *" icon={IconPhone} error={errors.phone}>
            <input
              className={`appt-inp${errors.phone ? " err" : ""}`}
              type="tel"
              placeholder="+880 1XXX-XXXXXX"
              value={data.phone}
              onChange={e => upd("phone", e.target.value)}
              autoComplete="tel"
              aria-invalid={!!errors.phone}
            />
          </Field>

          <Field label="Date of Birth *" icon={IconCalendar} error={errors.dob}>
            <input
              className={`appt-inp${errors.dob ? " err" : ""}`}
              type="date"
              value={data.dob}
              onChange={e => upd("dob", e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              aria-invalid={!!errors.dob}
            />
          </Field>
        </div>

        <Field label="Gender *" error={errors.gender}>
          <div className="appt-radio-group">
            {["Male", "Female", "Other"].map(g => (
              <label
                key={g}
                className={`appt-radio-pill${data.gender === g.toLowerCase() ? " sel" : ""}`}
              >
                <input
                  type="radio"
                  name="gender"
                  value={g.toLowerCase()}
                  checked={data.gender === g.toLowerCase()}
                  onChange={e => upd("gender", e.target.value)}
                />
                {g}
              </label>
            ))}
          </div>
        </Field>
      </div>

      <div className="appt-card__foot">
        <span className="appt-step-counter">Step 1 of 3</span>
        <button className="btn btn-primary" onClick={onNext} type="button">
          Continue <IconArrowR size={16} />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STEP 2 — Appointment Details
   Flow:
     • Online:  Mode → Dept → Doctor list (scrollable) → Date → Slots
     • Offline: Mode → Dept → Branch → Doctor list → Date → Slots
   ═══════════════════════════════════════════════════════════════ */
function Step2({ data, errors, upd, onNext, onBack, minDate }) {
  const isOnline = data.mode === "online";
  const isOffline = data.mode === "offline";

  /* Doctors for the chosen department */
  const doctors = useMemo(
    () => (data.dept ? DOCTORS[data.dept] || [] : []),
    [data.dept]
  );

  /* Time slots for the chosen doctor */
  const doctorSlots = useMemo(
    () => (data.doctor ? DOCTOR_SLOTS[data.doctor] || [] : []),
    [data.doctor]
  );

  /*
   * Derived flags
   * Online:  dept required (no branch) → show doctor list
   * Offline: dept + branch both required → show doctor list
   */
  const showDoctorList = data.dept && (isOnline || (isOffline && data.branch));
  const dateEnabled = showDoctorList && !!data.doctor;
  const showSlots = dateEnabled && !!data.date;

  /* step label numbers — branch step only exists offline */
  const stepNum = isOnline
    ? { dept: 1, doctor: 2, date: 3, slot: 4 }
    : { dept: 2, branch: 2, doctor: 3, date: 4, slot: 5 };

  return (
    <div className="appt-card">
      <div className="appt-card__head">
        <div className="appt-card__icon">📅</div>
        <div>
          <div className="appt-card__title">Appointment Details</div>
          <div className="appt-card__sub">
            {isOnline
              ? "Online — choose department, doctor, date & time"
              : "Offline — choose department, branch, doctor, date & time"}
          </div>
        </div>
      </div>

      <div className="appt-card__body appt-stack">

        {/* ── 1. Consultation Mode ─────────────────────────────── */}
        <Field label="1. Consultation Type *" error={errors.mode}>
          <div className="appt-mode-group">
            {[
              { val: "online", icon: "💻", label: "Online", sub: "Video / teleconsult" },
              { val: "offline", icon: "🏥", label: "In-Person", sub: "Visit our branch" },
            ].map(({ val, icon, label, sub }) => (
              <button
                key={val}
                type="button"
                className={`appt-mode-card${data.mode === val ? " sel" : ""}`}
                onClick={() => {
                  upd("mode", val);
                  upd("branch", "");
                  upd("doctor", "");
                  upd("date", "");
                  upd("slot", "");
                }}
                aria-pressed={data.mode === val}
              >
                <span className="appt-mode-icon">{icon}</span>
                <div>
                  <span className="appt-mode-label">{label}</span>
                  <span className="appt-mode-sub">{sub}</span>
                </div>
              </button>
            ))}
          </div>
        </Field>

        {/* ── 2. Department ───────────────────────────────────── */}
        {data.mode && (
          <Field label={`${isOnline ? "2" : "2"}. Select Department *`} error={errors.dept}>
            <div className="appt-dept-chips">
              {DEPARTMENTS.map(dept => (
                <button
                  key={dept.id}
                  type="button"
                  className={`appt-dept-chip${data.dept === dept.id ? " sel" : ""}`}
                  onClick={() => {
                    upd("dept", dept.id);
                    upd("doctor", "");
                    upd("date", "");
                    upd("slot", "");
                  }}
                  aria-pressed={data.dept === dept.id}
                >
                  <span className="appt-dept-chip__icon">{dept.icon}</span>
                  <span className="appt-dept-chip__name">{dept.name}</span>
                </button>
              ))}
            </div>
          </Field>
        )}

        {/* ── 3. Branch — OFFLINE only, shown after dept ──────── */}
        {isOffline && data.dept && (
          <Field label="3. Branch Location *" icon={IconPin} error={errors.branch}>
            <select
              className={`appt-sel${errors.branch ? " err" : ""}`}
              value={data.branch}
              onChange={e => {
                upd("branch", e.target.value);
                upd("doctor", "");
                upd("date", "");
                upd("slot", "");
              }}
              aria-invalid={!!errors.branch}
            >
              <option value="">Select a branch</option>
              {BRANCHES.map(b => (
                <option key={b.id} value={b.id}>{b.name} — {b.addr}</option>
              ))}
            </select>
          </Field>
        )}

        {/* ── Doctor list ──────────────────────────────────────── */}
        {showDoctorList && doctors.length > 0 && (
          <Field
            label={`${isOnline ? "3" : "4"}. Select Doctor *`}
            error={errors.doctor}
          >
            <DoctorDropdown
              doctors={doctors}
              value={data.doctor}
              onChange={id => { upd("doctor", id); upd("date", ""); upd("slot", ""); }}
            />
          </Field>
        )}

        {showDoctorList && doctors.length === 0 && (
          <div className="appt-doc-fallback">
            Our team will assign the most suitable specialist upon confirmation.
          </div>
        )}

        {/* ── Preferred Date — unlocks after doctor selected ───── */}
        {data.dept && (isOnline || (isOffline && data.branch)) && (
          <Field
            label={`${isOnline ? "4" : "5"}. Preferred Date *`}
            icon={IconCalendar}
            error={errors.date}
          >
            <input
              className={`appt-inp${errors.date ? " err" : ""}${!dateEnabled ? " appt-inp--disabled" : ""}`}
              type="date"
              value={data.date}
              onChange={e => { upd("date", e.target.value); upd("slot", ""); }}
              min={minDate}
              disabled={!dateEnabled}
              aria-invalid={!!errors.date}
              aria-disabled={!dateEnabled}
              title={!dateEnabled ? "Please select a doctor first" : undefined}
            />
            {!dateEnabled && (
              <p className="appt-field-hint">Select a doctor above to enable date selection</p>
            )}
          </Field>
        )}

        {/* ── Time Slots — per-doctor, shown after date chosen ─── */}
        {showSlots && doctorSlots.length > 0 && (
          <Field
            label={`${isOnline ? "5" : "6"}. Select Time Slot *`}
            error={errors.slot}
          >
            <div className="appt-time-grid">
              {doctorSlots.map(({ time, booked }) => (
                <button
                  key={time}
                  type="button"
                  disabled={booked}
                  className={[
                    "appt-slot-btn",
                    data.slot === time ? "active" : "",
                    booked ? "booked" : "",
                  ].join(" ").trim()}
                  onClick={() => upd("slot", time)}
                  aria-pressed={data.slot === time}
                  aria-disabled={booked}
                >
                  {time}
                  {booked && <span className="appt-slot-badge">Full</span>}
                </button>
              ))}
            </div>
          </Field>
        )}

        {showSlots && doctorSlots.length === 0 && (
          <div className="appt-doc-fallback">
            No available slots for this doctor. Please call us to arrange a time.
          </div>
        )}

      </div>

      <div className="appt-card__foot">
        <button className="btn btn-secondary" onClick={onBack} type="button">
          <IconArrowL size={16} /> Back
        </button>
        <button className="btn btn-primary" onClick={onNext} type="button">
          Continue <IconArrowR size={16} />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STEP 3 — Review & Confirm
   ═══════════════════════════════════════════════════════════════ */
function Step3({ data, errors, upd, onBack, onSubmit, busy }) {
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const dept = DEPARTMENTS.find(d => d.id === data.dept);
  const doctors = data.dept ? DOCTORS[data.dept] || [] : [];
  const doctor = doctors.find(d => d.id === data.doctor);
  const branch = BRANCHES.find(b => b.id === data.branch);

  return (
    <div className="appt-card">
      <div className="appt-card__head">
        <div className="appt-card__icon">✅</div>
        <div>
          <div className="appt-card__title">Review & Confirm</div>
          <div className="appt-card__sub">
            Verify your details before finalising your booking
          </div>
        </div>
      </div>

      <div className="appt-card__body appt-stack">
        <div className="appt-summary-grid">
          <div className="appt-summ-card">
            <h4>👤 Patient</h4>
            <p>
              <strong>{data.fullName}</strong>
              <br />
              {data.email}
              <br />
              {data.phone}
            </p>
          </div>

          <div className="appt-summ-card">
            <h4>🏥 Appointment</h4>
            <p>
              <strong>{dept?.name}</strong>
              <br />
              {doctor?.name || "Doctor to be assigned"}
              <br />
              {data.mode === "online" ? "🌐 Online Consultation" : branch?.name}
            </p>
          </div>

          <div className="appt-summ-card">
            <h4>📅 Schedule</h4>
            <p>
              <strong>{data.date}</strong>
              <br />
              {data.slot}
            </p>
          </div>

          <div className="appt-summ-card">
            <h4>👤 Profile</h4>
            <p>
              DOB: <strong>{data.dob}</strong>
              <br />
              Gender:{" "}
              <strong style={{ textTransform: "capitalize" }}>
                {data.gender}
              </strong>
            </p>
          </div>
        </div>

        <div className="appt-divider" />

        <Field label="Describe Your Symptoms *" error={errors.symptoms}>
          <textarea
            className={`appt-ta${errors.symptoms ? " err" : ""}`}
            rows={4}
            placeholder="Describe what you're experiencing, how long it has been happening, and any relevant details…"
            value={data.symptoms}
            onChange={e => upd("symptoms", e.target.value)}
            aria-invalid={!!errors.symptoms}
          />
        </Field>

        <Field label="Previous Medical History (optional)">
          <textarea
            className="appt-ta"
            rows={3}
            placeholder="Any existing conditions, allergies, or medications you're currently taking…"
            value={data.medHistory}
            onChange={e => upd("medHistory", e.target.value)}
          />
        </Field>

        <Modal
          open={termsOpen}
          onClose={() => setTermsOpen(false)}
          title="Terms of Service"
        >
          {TERMS_CONTENT}
        </Modal>

        <Modal
          open={privacyOpen}
          onClose={() => setPrivacyOpen(false)}
          title="Privacy Policy"
        >
          {PRIVACY_CONTENT}
        </Modal>

        <label className={`appt-check-wrap${errors.consent ? " err" : ""}`}>
          <input
            type="checkbox"
            checked={data.consent}
            onChange={e => upd("consent", e.target.checked)}
          />

          <span>
            I agree to the{" "}
            <button
              type="button"
              className="appt-link-btn"
              onClick={e => {
                e.preventDefault();
                setTermsOpen(true);
              }}
            >
              Terms of Service
            </button>{" "}
            and{" "}
            <button
              type="button"
              className="appt-link-btn"
              onClick={e => {
                e.preventDefault();
                setPrivacyOpen(true);
              }}
            >
              Privacy Policy
            </button>
            . I consent to my information being used to facilitate this
            appointment.
          </span>
        </label>

        {errors.consent && (
          <span className="appt-err-msg">{errors.consent}</span>
        )}

        {errors.submit && (
          <div className="appt-submit-err">⚠️ {errors.submit}</div>
        )}
      </div>

      <div className="appt-card__foot">
        <button type="button" className="btn btn-secondary" onClick={onBack}>
          <IconArrowL size={16} /> Edit Details
        </button>

        <button
          type="button"
          className="btn btn-primary"
          disabled={busy}
          onClick={onSubmit}
        >
          {busy ? (
            <>
              <span className="appt-spinner" />
              Creating Appointment...
            </>
          ) : (
            <>
              <IconLock size={15} />
              Confirm Appointment
            </>
          )}
        </button>
      </div>
    </div>
  );
}
/* ═══════════════════════════════════════════════════════════════
   CONFIRMATION VIEW
   ═══════════════════════════════════════════════════════════════ */
function Confirmation({ data, bookingRef, onReset }) {
  const dept = DEPARTMENTS.find(d => d.id === data.dept);
  const doctors = data.dept ? (DOCTORS[data.dept] || []) : [];
  const doctor = doctors.find(d => d.id === data.doctor);
  const branch = BRANCHES.find(b => b.id === data.branch);

  const rows = [
    ["Patient", data.fullName],
    ["Mode", data.mode === "online" ? "🌐 Online" : "🏥 In-Person"],
    ["Department", dept?.name],
    ["Doctor", doctor?.name || "To be assigned"],
    ["Branch", data.mode === "offline" ? branch?.name : "Online Consultation"],
    ["Date", data.date],
    ["Time", data.slot],
    ["Payment", data.paymentMethod === "bkash" ? "📱 bKash / Mobile Banking"
      : data.paymentMethod === "card" ? "💳 Credit / Debit Card"
        : "💵 Cash on Visit"],

    ["Amount", "BDT " + data.ConsultationFee],
  ];

  return (
    <div className="appt-confirm-wrap">
      <div className="appt-confirm-card appt-card">
        <div className="appt-card__body">
          {/* <div className="appt-confirm-icon">✅</div> */}
          <h2 className="appt-confirm-title">Booking Confirmed!</h2>
          <p style={{ color: "var(--appt-ink3)" }}>Your reference number</p>
          <div className="appt-confirm-ref">{bookingRef}</div>

          <div className="appt-confirm-rows">
            {rows.filter(([, v]) => v).map(([k, v]) => (
              <div className="appt-conf-row" key={k}>
                <span>{k}</span>
                <strong>{v}</strong>
              </div>
            ))}
          </div>

          <div className="appt-confirm-actions appt-confirm-actions--row">
            <button className="btn btn-secondary" onClick={onReset} type="button">
              Book Another Appointment
            </button>
            <a href="/" className="btn btn-primary">
              <IconCheck size={16} /> Go to Homepage
            </a>
          </div>

          <InvoicePrint data={data} bookingRef={bookingRef} />

          <div className="appt-confirm-note">
            <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>💡</span>
            <p>
              <strong>Before your visit:</strong> Arrive 15 minutes early.
              Bring your national ID and any previous medical reports or prescriptions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SIDEBAR
   ═══════════════════════════════════════════════════════════════ */
function Sidebar({ phone, email }) {
  return (
    <aside className="appt-sidebar">
      <div className="appt-sb-card">
        <h4>Why book with us?</h4>
        <ul className="appt-benefit-list">
          {[
            "Instant confirmation",
            "Free rescheduling",
            "SSL-encrypted data",
            "Board-certified doctors",
            "Digital reports delivered",
            "24/7 support available",
          ].map(b => (
            <li key={b}>
              <span className="appt-benefit-dot">✓</span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div className="appt-sb-card">
        <h4>Need help?</h4>
        <p>Our support team is available 24/7</p>
        <a href={`tel:${phone}`} className="appt-contact-link">
          <span className="c-ico">📞</span> {phone}
        </a>
        <a href={`mailto:${email}`} className="appt-contact-link">
          <span className="c-ico">✉️</span> {email}
        </a>
      </div>

      <div className="appt-trust-badge">
        <span style={{ fontSize: 20 }}>🛡️</span>
        <span>Your personal data is never sold or shared with third parties.</span>
      </div>
    </aside>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT — AppointmentForm
   Usage: <AppointmentForm phone="+880 1234-567890" email="appointments@clinic.com" />
   ═══════════════════════════════════════════════════════════════ */
export default function AppointmentForm({
  phone = "+880 1234-567890",
  email = "appointments@clinic.com",
}) {
  const searchParams = useSearchParams();

  const token = useAppSelector((state) => state.auth.accessToken);
  console.log('patient token ', token);

  /*
   * Lazy initial state — runs once on mount, reads ?doctor= URL param.
   * Using useState lazy init (not useEffect) so data is correct on
   * the very first render — avoids the flash/race condition.
   */
  const [data, setData] = useState(() => {
    const preDoctor = searchParams?.get?.("doctor") ?? null;
    const preStep = searchParams?.get?.("step") ?? null;
    const fullName = searchParams?.get?.("fullName") ?? "";
    const email = searchParams?.get?.("email") ?? "";
    const phone = searchParams?.get?.("phone") ?? "";
    const dob = searchParams?.get?.("dob") ?? "";
    const gender = searchParams?.get?.("gender") ?? "";

    // CTA pre-fill (step=2, no doctor)
    if (preStep === "2" && !preDoctor) {
      return { ...INITIAL_FORM, fullName, email, phone, dob, gender };
    }

    // Doctor deep-link (existing behaviour)
    if (!preDoctor) return INITIAL_FORM;
    const preDept = Object.keys(DOCTORS).find(deptId =>
      DOCTORS[deptId].some(d => d.id === preDoctor)
    );
    if (!preDept) return INITIAL_FORM;
    return { ...INITIAL_FORM, fullName, email, phone, dob, gender, mode: "online", dept: preDept, doctor: preDoctor };
  });


  /* If data was pre-filled, start on step 2 immediately */
  const [step, setStep] = useState(() => {
    const preStep = searchParams?.get?.("step") ?? null;
    const preDoctor = searchParams?.get?.("doctor") ?? null;
    if (preStep === "2") return 2;
    if (data.dept && data.doctor) return 2;
    return 1;
  });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [ref, setRef] = useState("");
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  /* Field updater — also clears the matching error */
  const upd = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: null }));
  };

  /* Advance / retreat step */
  const go = (direction) => {
    if (direction === 1) {
      const validators = { 1: validateStep1, 2: validateStep2, 3: validateStep3 };
      const e = validators[step](data);
      if (Object.keys(e).length) { setErrors(e); return; }
      setErrors({});
    }
    setStep(s => s + direction);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* Final submit */
  const handleSubmit = async () => {
    console.log("Confirm button clicked");

    const errs = validateStep3(data);
    console.log("Step 3 errors:", errs);

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setBusy(true);
    setErrors({});

    try {
      const reqBody = {
        doctorId: data.doctor,
        appointmentDate: data.date,
        startTime: convertTo24HourFormat(data.slot),
        type: data.mode === "online" ? "ONLINE" : "IN_PERSON",
        reason: data.symptoms,
        patientName: data.fullName,
        patientEmail: data.email,
        patientPhone: data.phone,
        patientDateOfBirth: data.dob,
        patientGender: data.gender.toUpperCase(),
        patientMedicalHistory: data.medHistory,
      };

      console.log("Patient token:", token);
      console.log("Request body:", reqBody);
      console.log("API URL:", API_URL);

      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch(`${API_URL}/appointments/create`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(reqBody),
      });

      const result = await res.json();
      console.log("API response:", result, "Status:", res.status);

      if (!res.ok || !result.success) {
        throw new Error(result.message || `Appointment booking failed (Status: ${res.status})`);
      }

      setRef(result.data?.appointmentCode || result.data?.id || "Appointment Created");
      setDone(true);
    } catch (error) {
      console.error("Booking error:", error.message);
      setErrors({
        submit: error.message || "Booking failed. Please try again.",
      });
    } finally {
      setBusy(false);
    }
  };

  /* Reset back to step 1 */
  const handleReset = () => {
    setDone(false);
    setStep(1);
    setData(INITIAL_FORM);
    setErrors({});
  };

  /* ── PROGRESS BAR ── */
  const STEPS = [
    { label: "Patient Info", sub: "Personal details" },
    { label: "Schedule", sub: "Date & doctor" },
    { label: "Confirm", sub: "Review & book" },
  ];

  return (
    <>
      {/* Sticky progress */}
      {!done && (
        <div className="appt-progress-wrap">
          <nav className="appt-progress" aria-label="Booking progress">
            {STEPS.map((s, i) => {
              const n = i + 1;
              const cls = [
                "appt-progress__step",
                step === n ? "active" : "",
                step > n ? "done" : "",
              ].join(" ").trim();
              return (
                <div key={n} className={cls}>
                  <div className="appt-progress__num">{step > n ? "✓" : n}</div>
                  <div>
                    <div className="appt-progress__label">{s.label}</div>
                    <div className="appt-progress__sublabel">{s.sub}</div>
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
      )}

      {/* Main body */}
      <div className="appt-body">
        {done && (
          <Confirmation data={data} bookingRef={ref} onReset={handleReset} />
        )}

        {!done && step === 1 && (
          <Step1
            data={data}
            errors={errors}
            upd={upd}
            onNext={() => go(1)}
          />
        )}

        {!done && step === 2 && (
          <Step2
            data={data}
            errors={errors}
            upd={upd}
            onNext={() => go(1)}
            onBack={() => go(-1)}
            minDate={minDate}
          />
        )}

        {!done && step === 3 && (
          <Step3
            data={data}
            errors={errors}
            upd={upd}
            onBack={() => go(-1)}
            onSubmit={handleSubmit}
            busy={busy}
          />
        )}

        {/* Sidebar only during form steps */}
        {!done && (
          <Sidebar phone={phone} email={email} />
        )}
      </div>
    </>
  );
}