"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  BRANCHES, DOCTOR_SLOTS,
  INITIAL_FORM, validateStep1, validateStep2, validateStep3
} from "./appointmentData";
import "@/styles/pages/appointment.css";
import { useAppSelector } from "@/redux/hook";
import { API_URL } from "@/config";

/* ═══════════════════════════════════════════════════════════════
   UTILITY: Convert time format to 24-hour HH:MM format
   ═══════════════════════════════════════════════════════════════ */
const convertTo24HourFormat = (timeStr) => {
  if (!timeStr) return timeStr;
  if (/^\d{2}:\d{2}$/.test(timeStr)) return timeStr;
  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)$/);
  if (match) {
    let [, hours, minutes, period] = match;
    hours = parseInt(hours, 10);
    const isPM = period.toUpperCase() === "PM";
    if (isPM && hours !== 12) hours += 12;
    else if (!isPM && hours === 12) hours = 0;
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
   FIELD WRAPPER
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
   MODAL
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
   TERMS / PRIVACY CONTENT
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
   DOCTOR DROPDOWN — searchable select
   ═══════════════════════════════════════════════════════════════ */
function DoctorDropdown({ doctors, value, onChange, locked = false }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const doctorList = Array.isArray(doctors) ? doctors : [];

  const getDoctorName = (doctor) => {
    return (
      doctor?.fullName ||
      doctor?.name ||
      "Unknown Doctor"
    );
  };

  const getDoctorTitle = (doctor) => {
    // console.log('doctor object in getDoctorTitle:', doctor);
    const title =
      doctor?.title ||
      doctor?.specialization?.name ||
      doctor?._raw?.specialization?.name ||
      doctor?._raw?.subSpecialization ||
      "Specialist";

    return typeof title === "string" ? title : title?.name || "Specialist";
  };

  const getDoctorExp = (doctor) => {
    if (doctor?.exp) return doctor.exp;
    if (doctor?.experience) return doctor.experience;
    if (doctor?.experienceYears) return `${doctor.experienceYears} yrs`;
    if (doctor?._raw?.experienceYears) return `${doctor._raw.experienceYears} yrs`;
    return "";
  };

  const getDoctorInitials = (doctor) => {
    const name = getDoctorName(doctor).replace(/^Dr\.?\s*/i, "");

    return (
      doctor?.initials ||
      name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0]?.toUpperCase())
        .join("") ||
      "DR"
    );
  };

  const filtered = doctorList.filter((doctor) => {
    if (!doctor?.id) return false;

    const name = getDoctorName(doctor).toLowerCase();
    const title = getDoctorTitle(doctor).toLowerCase();
    const q = query.toLowerCase();

    return name.includes(q) || title.includes(q);
  });

  const selected = doctorList.find((doctor) => doctor?.id === value);

  return (
    <div className="appt-doc-dd" style={{ position: "relative" }}>
      <button
        type="button"
        className={`appt-doc-dd__trigger${open ? " open" : ""}${locked ? " appt-doc-dd__trigger--locked" : ""}`}
        onClick={() => {
          if (!locked) setOpen((prev) => !prev);
        }}
        aria-haspopup={locked ? undefined : "listbox"}
        aria-expanded={locked ? undefined : open}
        aria-disabled={locked}
      >
        {selected ? (
          <>
            <div
              className="appt-doc-avatar"
              style={{
                width: 28,
                height: 28,
                fontSize: ".65rem",
                overflow: "hidden",
                padding: 0,
              }}
            >
              {selected.avatar ? (
                <img
                  src={selected.avatar}
                  alt={getDoctorName(selected)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                getDoctorInitials(selected)
              )}
            </div>

            <span>{getDoctorName(selected)}</span>

          </>
        ) : (
          <span className="appt-doc-dd__placeholder">
            Search &amp; select a doctor…
          </span>
        )}

        {!locked && (
          <span
            className="appt-doc-dd__chevron"
            style={{ marginLeft: "auto", color: "var(--appt-ink3)" }}
          >
            ▾
          </span>
        )}
      </button>

      {open && !locked && (
        <div className="appt-doc-dd__panel" role="listbox">
          <div className="appt-doc-dd__search-wrap">
            <IconSearch size={14} />

            <input
              className="appt-doc-dd__search"
              type="text"
              placeholder="Search by name or specialty…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />

            {query && (
              <button
                type="button"
                className="appt-doc-dd__clear"
                onClick={() => setQuery("")}
              >
                <IconX size={12} />
              </button>
            )}
          </div>

          <div className="appt-doc-dd__list">
            {filtered.length === 0 && (
              <div className="appt-doc-dd__empty">No doctors found</div>
            )}

            {filtered.map((doctor) => (
              <div
                key={doctor.id}
                role="option"
                aria-selected={value === doctor.id}
                className={`appt-doc-dd__item${value === doctor.id ? " sel" : ""}`}
                onClick={() => {
                  onChange(doctor.id);
                  setOpen(false);
                  setQuery("");
                }}
              >
                <div
                  className="appt-doc-avatar"
                  style={{
                    width: 36,
                    height: 36,
                    fontSize: ".7rem",
                    flexShrink: 0,
                  }}
                >
                  {getDoctorInitials(doctor)}
                </div>

                <div>
                  <div className="appt-doc-name">
                    {getDoctorName(doctor)}
                  </div>

                  <div className="appt-doc-meta">
                    {/* {getDoctorTitle(doctor)} */}
                    {getDoctorExp(doctor)
                      ? `  ${getDoctorExp(doctor)} experience`
                      : ""}
                  </div>
                </div>

                {value === doctor.id && (
                  <span
                    style={{
                      marginLeft: "auto",
                      color: "var(--appt-teal)",
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
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
   ═══════════════════════════════════════════════════════════════ */
function Step2({ data, errors, upd, onNext, onBack, minDate, doctor, departments, doctorsByDept, loadingDepts, loadingDoctors, availableSlots, loadingSlots }) {
  const isOnline = data.mode === "online";
  const isOffline = data.mode === "offline";

  // console.log('selected doctor object:', doctor);

  /* Doctors for the chosen department (from API) */
  const doctors = useMemo(() => {
    if (doctor) {
      const fullName = doctor.fullName || doctor.name || "Doctor";

      return [
        {
          id: doctor.id,
          name: fullName.startsWith("Dr") ? fullName : `${fullName}`,
          title:
            doctor.specialization?.name ||
            doctor.subSpecialization ||
            "Specialist",
          exp: doctor.experienceYears
            ? `${doctor.experienceYears} yrs`
            : "N/A",
          initials: fullName
            .replace(/^Dr\.?\s*/i, "")
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((n) => n[0].toUpperCase())
            .join(""),
          avatar: doctor.profileImage || doctor.avatar || doctor.photo || null,
          consultationFee: Number(doctor.consultationFee || 0),
          _raw: doctor,
        },
      ];
    }

    return data.dept ? doctorsByDept[data.dept] || [] : [];
  }, [doctor, data.dept, doctorsByDept]);

  /* Time slots — prioritize API slots, fallback to static slots */
  const doctorSlots = useMemo(
    () => (availableSlots.length > 0 ? availableSlots : (data.doctor ? DOCTOR_SLOTS[data.doctor] || [] : [])),
    [data.doctor, availableSlots]
  );

  const showDoctorList = data.dept && (isOnline || (isOffline && data.branch));
  const dateEnabled = showDoctorList && !!data.doctor;
  const showSlots = dateEnabled && !!data.date;

  useEffect(() => {
    if (!doctor?.id) return;

    const fullName = doctor.fullName || doctor.name || "Doctor";

    const normalizedDoctor = {
      id: doctor.id,
      name: fullName.startsWith("Dr") ? fullName : `${fullName}`,
      title:
        doctor.specialization?.name ||
        doctor.subSpecialization ||
        "Specialist",
      exp: doctor.experienceYears
        ? `${doctor.experienceYears} yrs`
        : "N/A",
      initials: fullName
        .replace(/^Dr\.?\s*/i, "")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join(""),
      avatar: doctor.profileImage || doctor.avatar || doctor.photo || null,
      consultationFee: Number(doctor.consultationFee || 0),
      _raw: doctor,
    };

    upd("mode", "online");
    upd("doctor", doctor.id);
    upd("_preDoctor", doctor.id);
    upd("_doctorObj", normalizedDoctor);
    upd("ConsultationFee", Number(doctor.consultationFee || 0));

    if (doctor.specialization?.id) {
      upd("dept", doctor.specialization.id);
      upd("_deptObj", {
        id: doctor.specialization.id,
        name: doctor.specialization.name,
        _raw: doctor.specialization,
      });
    }
  }, [doctor?.id]);

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
              { val: "offline", icon: "🏥", label: "In-Person", sub: "Visit our branch", disabled: true },
            ].map(({ val, icon, label, sub }) => (
              <button
                key={val}
                type="button"
                className={`appt-mode-card${data.mode === val ? " sel" : ""}${val === "offline" ? " appt-mode-card--disabled" : ""}`}
                onClick={() => {
                  if (val === "offline") return;
                  upd("mode", val);
                  upd("branch", "");
                  upd("doctor", "");
                  upd("date", "");
                  upd("slot", "");
                }}
                aria-pressed={data.mode === val}
                aria-disabled={val === "offline"}
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

        {/* ── 2. Department (from API) ─────────────────────────── */}
        {data.mode && (
          <Field label="2. Select Department *" error={errors.dept}>
            {loadingDepts ? (
              <div className="appt-doc-fallback">Loading departments…</div>
            ) : (
              <div className="appt-dept-chips">
                {departments.map(dept => (
                  <button
                    key={dept.id}
                    type="button"
                    className={`appt-dept-chip${data.dept === dept.id ? " sel" : ""}${data._preDoctor && data.dept !== dept.id ? " appt-dept-chip--disabled" : ""}`}
                    onClick={() => {
                      if (data._preDoctor) return;
                      upd("dept", dept.id);
                      upd("_deptObj", dept);
                      upd("doctor", "");
                      upd("_doctorObj", null);
                      upd("date", "");
                      upd("slot", "");
                    }}
                    aria-pressed={data.dept === dept.id}
                    aria-disabled={!!data._preDoctor && data.dept !== dept.id}
                  >
                    <span className="appt-dept-chip__icon">{dept.icon}</span>
                    <span className="appt-dept-chip__name">{dept.name}</span>
                  </button>
                ))}
              </div>
            )}
          </Field>
        )}

        {/* ── 3. Branch — OFFLINE only ─────────────────────────── */}
        {isOffline && data.dept && (
          <Field label="3. Branch Location *" icon={IconPin} error={errors.branch}>
            <select
              className={`appt-sel${errors.branch ? " err" : ""}`}
              value={data.branch}
              onChange={e => {
                upd("branch", e.target.value);
                upd("doctor", "");
                upd("_doctorObj", null);
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

        {/* ── Doctor list (from API) ────────────────────────────── */}
        {showDoctorList && (
          loadingDoctors ? (
            <div className="appt-doc-fallback">Loading doctors…</div>
          ) : doctors.length > 0 ? (
            <Field
              label={`${isOnline ? "3" : "4"}. Select Doctor *`}
              error={errors.doctor}
            >
              <DoctorDropdown
                doctors={doctors}
                value={data.doctor}
                onChange={id => {
                  const docObj = doctors.find(d => d.id === id);

                  upd("doctor", id);
                  upd("_doctorObj", docObj || null);
                  upd("ConsultationFee", Number(docObj?.consultationFee || docObj?._raw?.consultationFee || 0));
                  upd("date", "");
                  upd("slot", "");
                }}
                locked={!!data._preDoctor}
              />
            </Field>
          ) : (
            <div className="appt-doc-fallback">
              Our team will assign the most suitable specialist upon confirmation.
            </div>
          )
        )}

        {/* ── Preferred Date ────────────────────────────────────── */}
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

        {/* ── Time Slots ────────────────────────────────────────── */}
        {showSlots && (
          loadingSlots ? (
            <div className="appt-doc-fallback">Loading available time slots…</div>
          ) : doctorSlots.length > 0 ? (
            <Field
              label={`${isOnline ? "5" : "6"}. Select Time Slot *`}
              error={errors.slot}
            >
              <div className="appt-time-grid">
                {doctorSlots.map(slot => {
                  const time = typeof slot === "string" ? slot : slot.time;
                  const booked = typeof slot === "string" ? false : slot.booked;
                  return (
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
                      {booked && <span className="appt-slot-badge">Booked</span>}
                    </button>
                  );
                })}
              </div>
            </Field>
          ) : (
            <div className="appt-doc-fallback">
              No available slots for this doctor on the selected date. Please choose another date or doctor.
            </div>
          )
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

  const dept = data._deptObj || {};
  const doctor = data._doctorObj || {};
  const branch = BRANCHES.find(b => b.id === data.branch);

  return (
    <div className="appt-card">
      <div className="appt-card__head">
        <div className="appt-card__icon">✅</div>
        <div>
          <div className="appt-card__title">Review &amp; Confirm</div>
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

        <Modal open={termsOpen} onClose={() => setTermsOpen(false)} title="Terms of Service">
          {TERMS_CONTENT}
        </Modal>
        <Modal open={privacyOpen} onClose={() => setPrivacyOpen(false)} title="Privacy Policy">
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
            <button type="button" className="appt-link-btn" onClick={e => { e.preventDefault(); setTermsOpen(true); }}>
              Terms of Service
            </button>{" "}
            and{" "}
            <button type="button" className="appt-link-btn" onClick={e => { e.preventDefault(); setPrivacyOpen(true); }}>
              Privacy Policy
            </button>
            . I consent to my information being used to facilitate this appointment.
          </span>
        </label>

        {errors.consent && <span className="appt-err-msg">{errors.consent}</span>}
        {errors.submit && <div className="appt-submit-err">⚠️ {errors.submit}</div>}
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
            <><span className="appt-spinner" />Creating Appointment...</>
          ) : (
            <><IconLock size={15} />Confirm Appointment</>
          )}
        </button>
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
   DEPT ICON MAP — fallback icons keyed by specialization name
   ═══════════════════════════════════════════════════════════════ */
const DEPT_ICON_MAP = {
  cardiology: "❤️",
  orthopedics: "🦴",
  general: "🩺",
  "general medicine": "🩺",
  pediatrics: "👶",
  dental: "🦷",
  dentistry: "🦷",
  neurology: "🧠",
  dermatology: "🩹",
  "eye care": "👁️",
  ophthalmology: "👁️",
  gynecology: "🌸",
  urology: "💧",
  oncology: "🔬",
  psychiatry: "🧘",
  radiology: "📡",
  surgery: "🔪",
  default: "🏥",
};

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT — AppointmentForm
   ═══════════════════════════════════════════════════════════════ */
export default function AppointmentForm({
  phone = "+880 1234-567890",
  email = "appointments@clinic.com",
}) {
  const searchParams = useSearchParams();
  const doctorIdFromQuery = searchParams?.get?.("doctor") ?? null;


  const token = useAppSelector((state) => state.auth.accessToken);

  /* ── Form state (must be declared before any useEffect that reads it) ── */
  const [data, setData] = useState(() => {
    const preDoctor = searchParams?.get?.("doctor") ?? null;
    const preStep = searchParams?.get?.("step") ?? null;
    const fullName = searchParams?.get?.("fullName") ?? "";
    const emailParam = searchParams?.get?.("email") ?? "";
    const phone = searchParams?.get?.("phone") ?? "";
    const dob = searchParams?.get?.("dob") ?? "";
    const gender = searchParams?.get?.("gender") ?? "";

    const base = {
      fullName, email: emailParam, phone, dob, gender,
      mode: "", dept: "", branch: "", doctor: "",
      date: "", slot: "", symptoms: "", medHistory: "",
      consent: false, paymentMethod: "cash", ConsultationFee: 0,
      _preDoctor: null, _deptObj: null, _doctorObj: null,
    };

    if (preStep === "2" && !preDoctor) return base;
    if (!preDoctor) return { ...base, ...INITIAL_FORM };

    return {
      ...base,
      ...INITIAL_FORM,
      fullName, email: emailParam, phone, dob, gender,
      doctor: preDoctor,
      _preDoctor: preDoctor,
    };
  });

  const [step, setStep] = useState(() => {
    const preStep = searchParams?.get?.("step") ?? null;
    const preDoctor = searchParams?.get?.("doctor") ?? null;
    if (preStep === "2" && !preDoctor) return 2;
    return 1;
  });

  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [ref, setRef] = useState("");
  const [minDate, setMinDate] = useState("");

  /* ── API state ── */
  const [departments, setDepartments] = useState([]);
  const [loadingDepts, setLoadingDepts] = useState(false);
  const [doctorsByDept, setDoctorsByDept] = useState({});
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loadingDoctor, setLoadingDoctor] = useState(false);



  //fetch single doctor if doctorIdFromQuery exists and set selectedDoctor state
  useEffect(() => {
    if (!doctorIdFromQuery) return;

    const fetchDoctor = async () => {
      try {
        setLoadingDoctor(true);

        const res = await fetch(
          `${API_URL}/doctors/getSingle/${doctorIdFromQuery}`,
          {
            credentials: "include",
          }
        );

        const result = await res.json();

        if (!res.ok || !result.success) {
          throw new Error(result.message || "Failed to load doctor");
        }

        const doctor = result.data;

        setSelectedDoctor(doctor);

        // auto select department
        if (doctor.specialization) {
          setData(prev => ({
            ...prev,
            dept: doctor.specialization.id,
            doctor: doctor.id,
            ConsultationFee: Number(doctor.consultationFee || 0),
            _doctorObj: doctor,
          }));
        }
      } catch (error) {
        console.error("Failed to load doctor:", error);
      } finally {
        setLoadingDoctor(false);
      }
    };

    fetchDoctor();
  }, [doctorIdFromQuery]);



  /* ── Fetch all specializations on mount ── */
  useEffect(() => {
    const fetchDepts = async () => {
      setLoadingDepts(true);
      try {
        const res = await fetch(
          `${API_URL}/doctor-specializations/getAll`,
          { credentials: "include" }
        );
        const result = await res.json();
        const raw = result?.data || result || [];
        const normalized = raw.map(doc => {
          const fullName = doc.fullName || doc.name || "Unknown Doctor";

          const title =
            doc.specialization?.name ||
            doc.specializationName ||
            doc.subSpecialization ||
            "Specialist";

          const exp = doc.experienceYears
            ? `${doc.experienceYears} yrs`
            : doc.experienceYears
              ? `${doc.experienceYears} yrs`
              : "N/A";

          const initials = fullName
            .replace(/^Dr\.?\s*/i, "")
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map(n => n[0].toUpperCase())
            .join("");

          return {
            id: doc.id || doc._id,
            fullName: fullName.startsWith("Dr") ? fullName : `${fullName}`,
            name: fullName.startsWith("Dr") ? fullName : `${fullName}`,
            title,
            exp,
            initials: initials || "DR",
            avatar: doc.profileImage || doc.avatar || doc.photo || null,
            consultationFee: Number(doc.consultationFee || 0),
            _raw: doc,
          };
        });

        setDepartments(normalized);
      } catch (err) {
        console.error("Failed to load specializations:", err);
      } finally {
        setLoadingDepts(false);
      }
    };
    fetchDepts();
  }, []);




  /* ── Fetch doctors whenever department changes ── */
  useEffect(() => {
    if (!data.dept) return;
    const selectedDept = departments.find(d => d.id === data.dept);
    if (!selectedDept) return;

    // Already loaded — skip
    if (doctorsByDept[data.dept]) return;

    const fetchDoctors = async () => {
      setLoadingDoctors(true);
      try {
        const specializationName = encodeURIComponent(selectedDept.name);
        const res = await fetch(
          `${API_URL}/doctors/getDoctorsBySpecialization/${specializationName}`,
          { credentials: "include" }
        );
        const result = await res.json();
        const raw = result?.data || result || [];
        const normalized = raw.map(doc => {
          const firstName = doc.firstName || doc.first_name || "";
          const lastName = doc.lastName || doc.last_name || "";
          const fullName = doc.name || doc.fullName || `${firstName} ${lastName}`.trim() || "Dr.";
          const initials = fullName
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map(n => n[0].toUpperCase())
            .join("");
          const rawTitle = doc.specialization || doc.specializationName || doc.title || selectedDept.name;
          const rawExp = doc.experienceYears
            ? `${doc.experienceYears} yrs`
            : doc.experience || doc.exp || "N/A";
          return {
            id: doc.id || doc._id,
            name: fullName.startsWith("Dr") ? fullName : `${fullName}`,
            title: String(rawTitle ?? ""),
            exp: String(rawExp ?? "N/A"),
            initials,
            avatar: doc.profileImage || doc.avatar || doc.photo || null,
            _raw: doc,
          };
        });
        setDoctorsByDept(prev => ({ ...prev, [data.dept]: normalized }));
      } catch (err) {
        console.error("Failed to load doctors:", err);
        setDoctorsByDept(prev => ({ ...prev, [data.dept]: [] }));
      } finally {
        setLoadingDoctors(false);
      }
    };
    fetchDoctors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.dept, departments]);

  /* ── Fetch available time slots when doctor and date are selected ── */
  useEffect(() => {
    if (!data.doctor || !data.date) {
      setAvailableSlots([]);
      return;
    }

    const fetchAvailableSlots = async () => {
      setLoadingSlots(true);
      try {
        const url = `${API_URL}/appointments/getAvailableSlots/${data.doctor}?date=${data.date}`;

        const headers = {
          "Content-Type": "application/json",
        };

        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const res = await fetch(url, {
          method: "GET",
          credentials: "include",
          headers,
        });

        const result = await res.json();

        // Extract slots from response - handle API response format
        const slots = result?.data?.slots || result?.slots || result?.data || [];
        // console.log("Raw slots data received:", slots);

        const normalizedSlots = Array.isArray(slots)
          ? slots.map(slot => ({
            time: slot.startLabel || slot.time || slot,
            booked: !slot.isAvailable || slot.isBooked || false,
          }))
          : [];

        setAvailableSlots(normalizedSlots);
        console.log("✅ Available slots loaded:", normalizedSlots.length, "slots");
      } catch (err) {
        console.error("❌ Failed to load available slots:", err);
        setAvailableSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchAvailableSlots();
  }, [data.doctor, data.date, token]);

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  /* After other useEffects */

  /* Field updater */
  const upd = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: null }));
  };

  /* Step navigation */
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
  /* Inside AppointmentForm component */

  const [paymentInitiated, setPaymentInitiated] = useState(false);

  const handleSubmit = async () => {
    const errs = validateStep3(data);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setBusy(true);
    setErrors({});

    try {
      // 1. Create Appointment
      const reqBody = {
        patientName: data.fullName,
        patientEmail: data.email,
        patientPhone: data.phone,
        patientDateOfBirth: data.dob,
        patientGender: data.gender.toUpperCase(),
        patientMedicalHistory: data.medHistory,
        doctorId: data.doctor,
        appointmentDate: data.date,
        startTime: convertTo24HourFormat(data.slot),
        type: data.mode === "online" ? "ONLINE" : "IN_PERSON",
        reason: data.symptoms,
      };

      const headers = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;

      const res = await fetch(`${API_URL}/appointments/create`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(reqBody),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to create appointment");
      }

      const appointmentId = result.data?.id || result.data?.appointment?.id;
      if (!appointmentId) throw new Error("Appointment ID not returned");

      // 2. Initiate Payment
      const paymentRes = await fetch(`${API_URL}/payments/appointment/initiate`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify({ appointmentId }),
      });

      const paymentResult = await paymentRes.json();

      if (!paymentRes.ok || !paymentResult.success) {
        throw new Error(paymentResult.message || "Payment initiation failed");
      }

      const paymentUrl = paymentResult.data?.paymentUrl;
      if (!paymentUrl) throw new Error("Payment URL not received");

      setPaymentInitiated(true);
      window.location.href = paymentUrl; // Redirect to payment gateway

    } catch (error) {
      console.error("Booking error:", error);
      setErrors({ submit: error.message || "Something went wrong. Please try again." });
    } finally {
      setBusy(false);
    }
  };

  /* Reset */
  const handleReset = () => {
    setDone(false);
    setStep(1);
    setData(INITIAL_FORM);
    setErrors({});
  };

  /* Progress steps */
  const STEPS = [
    { label: "Patient Info", sub: "Personal details" },
    { label: "Schedule", sub: "Date & doctor" },
    { label: "Confirm", sub: "Review & book" },
  ];

  return (
    <>
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

      <div className="appt-body">

        {!done && step === 1 && (
          <Step1 data={data} errors={errors} upd={upd} onNext={() => go(1)} />
        )}

        {!done && step === 2 && (
          <Step2
            data={data}
            errors={errors}
            upd={upd}
            onNext={() => go(1)}
            onBack={() => go(-1)}
            minDate={minDate}
            doctor={selectedDoctor}
            departments={departments}
            doctorsByDept={doctorsByDept}
            loadingDepts={loadingDepts}
            loadingDoctors={loadingDoctors}
            availableSlots={availableSlots}
            loadingSlots={loadingSlots}
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

        {!done && <Sidebar phone={phone} email={email} />}
      </div>
    </>
  );
}