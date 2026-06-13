// app/doctor-portal/settings/page.jsx
"use client";

import { useState } from "react";
import "./settings.css";
import "./settings-profile.css";
import "./settings-account.css";
import "./settings-schedule.css";
import "./settings-privacy.css";

// SVG Icons (same as signup form)
const Icon = {
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
  Shield: () => (
    <svg viewBox="0 0 28 28" fill="none" width="28" height="28">
      <path d="M14 3L5 7.5v6.5C5 19.7 8.9 23.7 14 25c5.1-1.3 9-5.3 9-11V7.5L14 3z" fill="#4caf50" />
      <path d="M10 14l3 3.5L18 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Settings: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0A1.65 1.65 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0A1.65 1.65 0 0 0 20.91 10H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  ),
  // Schedule Management Icons
  ClockOutline: () => (
    <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 5V10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  CalendarDays: () => (
    <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
      <rect x="2.5" y="3.5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 1.5V5.5M15 1.5V5.5M2.5 7.5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  BellOff: () => (
    <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
      <path d="M10 16.5C11.5 16.5 12.5 15.5 12.5 14H7.5C7.5 15.5 8.5 16.5 10 16.5Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3.5 14H16.5L14.5 8.5C14.5 5.5 13 3.5 10 3.5C7 3.5 5.5 5.5 5.5 8.5L3.5 14Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3 3L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Copy: () => (
    <svg viewBox="0 0 20 20" fill="none" width="14" height="14">
      <rect x="6.5" y="6.5" width="9" height="10" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4.5 13.5H3.5C2.5 13.5 2 13 2 12V3.5C2 2.5 2.5 2 3.5 2H12C13 2 13.5 2.5 13.5 3.5V4.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  Plus: () => (
    <svg viewBox="0 0 14 14" fill="none" width="12" height="12">
      <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Trash: () => (
    <svg viewBox="0 0 14 14" fill="none" width="14" height="14">
      <path d="M2 3.5H12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M5 1.5H9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M5 6V10.5M9 6V10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M10.5 3.5V11.5C10.5 12.5 10 13 9 13H5C4 13 3.5 12.5 3.5 11.5V3.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  Sun: () => (
    <svg viewBox="0 0 18 18" fill="none" width="14" height="14">
      <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9 1V2.5M9 15.5V17M17 9H15.5M2.5 9H1M15 3L14 4M4 14L3 15M15 15L14 14M4 4L3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  Moon: () => (
    <svg viewBox="0 0 18 18" fill="none" width="14" height="14">
      <path d="M9 1C5 1 2 4 2 8C2 12 5 15 9 15C10.5 15 12 14.5 13 13.5C10.5 14 8 12 8 9.5C8 7 9.5 4.5 12 3.5C11 2 10 1 9 1Z" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  Edit: () => (
    <svg viewBox="0 0 14 14" fill="none" width="12" height="12">
      <path d="M8 2L12 6L4.5 13.5L1 13L1.5 9.5L8 2Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6.5 3.5L10.5 7.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  Timer: () => (
    <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 4V8L10 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M5 1H11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
};

// Reusable form components
function Field({ label, required, children, hint }) {
  return (
    <div className="settings-field">
      <label className="settings-label">
        {label}
        {required && <span className="required-star">*</span>}
      </label>
      {children}
      {hint && <span className="field-hint">{hint}</span>}
    </div>
  );
}

function SettingsInput({ icon: IconComp, ...props }) {
  return (
    <div className="settings-input-wrap">
      {IconComp && (
        <span className="settings-input-icon">
          <IconComp />
        </span>
      )}
      <input
        className={`settings-input${IconComp ? "" : " no-icon"}`}
        {...props}
      />
    </div>
  );
}

function SettingsSelect({ icon: IconComp, children, ...props }) {
  return (
    <div className="settings-input-wrap">
      {IconComp && (
        <span className="settings-input-icon">
          <IconComp />
        </span>
      )}
      <select className="settings-select" {...props}>
        {children}
      </select>
      <span className="settings-select-chevron">
        <Icon.Chevron />
      </span>
    </div>
  );
}

// ========== SCHEDULE MANAGEMENT COMPONENTS ==========
const DAYS = [
  { id: 'monday', name: 'Monday', short: 'Mon' },
  { id: 'tuesday', name: 'Tuesday', short: 'Tue' },
  { id: 'wednesday', name: 'Wednesday', short: 'Wed' },
  { id: 'thursday', name: 'Thursday', short: 'Thu' },
  { id: 'friday', name: 'Friday', short: 'Fri' },
  { id: 'saturday', name: 'Saturday', short: 'Sat' },
  { id: 'sunday', name: 'Sunday', short: 'Sun' }
];

const SLOT_DURATIONS = [
  { value: 15, label: "15 minutes" },
  { value: 20, label: "20 minutes" },
  { value: 30, label: "30 minutes" },
  { value: 45, label: "45 minutes" },
  { value: 60, label: "60 minutes" }
];

const BREAK_PRESETS = [
  { label: "Lunch Break (1:00–2:00)", start: "13:00", end: "14:00" },
  { label: "Prayer Break (1:00–1:30)", start: "13:00", end: "13:30" },
  { label: "Prayer Break (4:30–5:00)", start: "16:00", end: "16:30" },
  { label: "Custom", start: "", end: "" },
];

function TimeSlot({ slot, index, onUpdate, onDelete, isEditing, slotDuration, onDurationChange }) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate slot end time based on start time and duration
  const getCalculatedEndTime = (startTime, durationMinutes) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    date.setMinutes(date.getMinutes() + durationMinutes);
    return date.toTimeString().slice(0, 5);
  };

  const calculatedEnd = getCalculatedEndTime(slot.start, slotDuration);


  return (
    <div
      className="time-slot-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="time-slot-range">
        <span className="time-start">{slot.start}</span>
        <span className="time-separator">—</span>
        <span className="time-end">{slot.end || calculatedEnd}</span>
      </div>
      {isEditing && (
        <>
          <div className="slot-duration-selector">
            <span className="duration-label">Slot:</span>
            <select
              value={slotDuration}
              onChange={(e) => onDurationChange(parseInt(e.target.value))}
              className="duration-select"
            >
              {SLOT_DURATIONS.map(d => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
          </div>
          <button
            className="time-slot-delete"
            onClick={() => onDelete(index)}
            aria-label="Delete time slot"
          >
            <Icon.Trash />
          </button>
        </>
      )}
      {isEditing && isHovered && (
        <div className="time-slot-edit-overlay">
          <button className="edit-slot-btn" onClick={() => onUpdate(index)}>
            <Icon.Edit /> Edit Time
          </button>
        </div>
      )}
    </div>
  );
}

function DaySchedule({ day, schedule, onUpdate, isEditing }) {
  const [showBreakForm, setShowBreakForm] = useState(false);
  const [breakPreset, setBreakPreset] = useState(0);
  const [customBreak, setCustomBreak] = useState({ start: "", end: "" });

  const slotDuration = schedule?.slotDuration || 30;
  const breaks = schedule?.breaks || [];

  const patientCount = () => {
    if (!schedule?.start || !schedule?.end) return 0;
    const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
    let total = toMin(schedule.end) - toMin(schedule.start);
    breaks.forEach(b => { total -= (toMin(b.end) - toMin(b.start)); });
    return total > 0 ? Math.floor(total / slotDuration) : 0;
  };

  const handleAddBreak = () => {
    const preset = BREAK_PRESETS[breakPreset];
    const b = breakPreset === BREAK_PRESETS.length - 1 ? customBreak : preset;
    if (!b.start || !b.end || b.start >= b.end) return;
    onUpdate({ breaks: [...breaks, { start: b.start, end: b.end }] });
    setShowBreakForm(false);
    setCustomBreak({ start: "", end: "" });
  };

  const handleDeleteBreak = (idx) => {
    onUpdate({ breaks: breaks.filter((_, i) => i !== idx) });
  };

  return (
    <div className="day-schedule-card">
      <div className="day-header">
        <div className="day-name">
          <input
            type="checkbox"
            id={`active-${day.id}`}
            checked={schedule?.isActive || false}
            onChange={(e) => onUpdate({ isActive: e.target.checked })}
            disabled={!isEditing}
            className="day-active-checkbox"
          />
          <label htmlFor={`active-${day.id}`} className="day-name-label">{day.name}</label>
        </div>
        <span className="slots-count">{patientCount()} patients</span>
      </div>

      <div className="time-slots-container">
        {schedule?.isActive ? (
          <>
            <div className="single-time-range">
              <div className="time-field-inline">
                <label>Start</label>
                <input
                  type="time"
                  value={schedule?.start || ""}
                  disabled={!isEditing}
                  onChange={(e) => onUpdate({ start: e.target.value })}
                />
              </div>
              <span className="time-separator">—</span>
              <div className="time-field-inline">
                <label>End</label>
                <input
                  type="time"
                  value={schedule?.end || ""}
                  disabled={!isEditing}
                  onChange={(e) => onUpdate({ end: e.target.value })}
                />
              </div>
            </div>

            {/* Breaks */}
            {breaks.length > 0 && (
              <div className="breaks-list">
                {breaks.map((b, idx) => (
                  <div key={idx} className="break-item">
                    <span className="break-icon">☕</span>
                    <span className="break-time">{b.start} — {b.end}</span>
                    {isEditing && (
                      <button className="break-delete-btn" onClick={() => handleDeleteBreak(idx)}>
                        <Icon.Trash />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Add Break */}
            {isEditing && !showBreakForm && (
              <button className="add-break-btn" onClick={() => setShowBreakForm(true)}>
                + Add Break
              </button>
            )}

            {isEditing && showBreakForm && (
              <div className="break-form">
                <select
                  className="break-preset-select"
                  value={breakPreset}
                  onChange={(e) => setBreakPreset(parseInt(e.target.value))}
                >
                  {BREAK_PRESETS.map((p, i) => (
                    <option key={i} value={i}>{p.label}</option>
                  ))}
                </select>
                {breakPreset === BREAK_PRESETS.length - 1 && (
                  <div className="break-custom-inputs">
                    <input
                      type="time"
                      value={customBreak.start}
                      onChange={(e) => setCustomBreak(p => ({ ...p, start: e.target.value }))}
                    />
                    <span>—</span>
                    <input
                      type="time"
                      value={customBreak.end}
                      onChange={(e) => setCustomBreak(p => ({ ...p, end: e.target.value }))}
                    />
                  </div>
                )}
                <div className="break-form-actions">
                  <button className="break-confirm-btn" onClick={handleAddBreak}>Add</button>
                  <button className="break-cancel-btn" onClick={() => setShowBreakForm(false)}>Cancel</button>
                </div>
              </div>
            )}

            {isEditing && (
              <div className="duration-row">
                <Icon.Timer />
                <span>Per patient:</span>
                <select
                  value={slotDuration}
                  onChange={(e) => onUpdate({ slotDuration: parseInt(e.target.value) })}
                  className="duration-select-small"
                >
                  {SLOT_DURATIONS.map(d => (
                    <option key={d.value} value={d.value}>{d.label}</option>
                  ))}
                </select>
              </div>
            )}

            {!isEditing && schedule?.start && schedule?.end && (
              <div className="duration-row">
                <Icon.Timer />
                <span>{slotDuration} min/patient · {patientCount()} slots</span>
              </div>
            )}
          </>
        ) : (
          <div className="no-slots-message"><span>Day off</span></div>
        )}
      </div>
    </div>
  );
}

function AddTimeSlotModal({ dayName, onClose, onSave, existingSlots, currentSlotDuration }) {
  const [startTime, setStartTime] = useState('09:00');
  const [error, setError] = useState('');

  const getCalculatedEndTime = (start, durationMinutes) => {
    const [hours, minutes] = start.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    date.setMinutes(date.getMinutes() + durationMinutes);
    return date.toTimeString().slice(0, 5);
  };

  const calculatedEnd = getCalculatedEndTime(startTime, currentSlotDuration);

  const handleSave = () => {
    if (!startTime) {
      setError('Please select start time');
      return;
    }

    const endTime = getCalculatedEndTime(startTime, currentSlotDuration);

    // Check for overlapping slots
    const isOverlapping = existingSlots.some(slot =>
      (startTime >= slot.start && startTime < (slot.end || getCalculatedEndTime(slot.start, currentSlotDuration))) ||
      (endTime > slot.start && endTime <= (slot.end || getCalculatedEndTime(slot.start, currentSlotDuration))) ||
      (startTime <= slot.start && endTime >= (slot.end || getCalculatedEndTime(slot.start, currentSlotDuration)))
    );

    if (isOverlapping) {
      setError('This time slot overlaps with an existing slot');
      return;
    }

    onSave({ start: startTime, end: endTime });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4>Add Time Slot - {dayName}</h4>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="info-banner">
            <Icon.Timer />
            <span>Slot duration: {currentSlotDuration} minutes per patient</span>
          </div>
          <div className="time-input-group">
            <div className="time-field">
              <label>Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => { setStartTime(e.target.value); setError(''); }}
                step="900"
              />
            </div>
            <div className="time-field">
              <label>End Time (Auto-calculated)</label>
              <input
                type="time"
                value={calculatedEnd}
                disabled
                className="calculated-time"
              />
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave}>Add Slot</button>
        </div>
      </div>
    </div>
  );
}

function EditTimeSlotModal({ dayName, slot, index, onClose, onSave, existingSlots, currentSlotDuration }) {
  const [startTime, setStartTime] = useState(slot.start);
  const [error, setError] = useState('');

  const getCalculatedEndTime = (start, durationMinutes) => {
    const [hours, minutes] = start.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    date.setMinutes(date.getMinutes() + durationMinutes);
    return date.toTimeString().slice(0, 5);
  };

  const calculatedEnd = getCalculatedEndTime(startTime, currentSlotDuration);

  const handleSave = () => {
    if (!startTime) {
      setError('Please select start time');
      return;
    }

    const endTime = getCalculatedEndTime(startTime, currentSlotDuration);

    // Check for overlapping with other slots (excluding current)
    const isOverlapping = existingSlots.some((s, idx) =>
      idx !== index && (
        (startTime >= s.start && startTime < (s.end || getCalculatedEndTime(s.start, currentSlotDuration))) ||
        (endTime > s.start && endTime <= (s.end || getCalculatedEndTime(s.start, currentSlotDuration))) ||
        (startTime <= s.start && endTime >= (s.end || getCalculatedEndTime(s.start, currentSlotDuration)))
      )
    );

    if (isOverlapping) {
      setError('This time slot overlaps with an existing slot');
      return;
    }

    onSave({ start: startTime, end: endTime });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4>Edit Time Slot - {dayName}</h4>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="info-banner">
            <Icon.Timer />
            <span>Slot duration: {currentSlotDuration} minutes per patient</span>
          </div>
          <div className="time-input-group">
            <div className="time-field">
              <label>Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => { setStartTime(e.target.value); setError(''); }}
                step="900"
              />
            </div>
            <div className="time-field">
              <label>End Time (Auto-calculated)</label>
              <input
                type="time"
                value={calculatedEnd}
                disabled
                className="calculated-time"
              />
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

function LeaveRequestModal({ onClose, onAdd, existingLeaves }) {
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [type, setType] = useState('vacation');
  const [isHalfDay, setIsHalfDay] = useState(false);
  const [halfDayType, setHalfDayType] = useState('morning');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!date) {
      setError('Please select a date');
      return;
    }
    if (existingLeaves.some(leave => leave.date === date)) {
      setError('A leave request already exists for this date');
      return;
    }
    onAdd({
      id: Date.now().toString(),
      date,
      reason: reason || (type === 'vacation' ? 'Vacation' : type === 'sick' ? 'Sick Leave' : 'Personal Leave'),
      type,
      isHalfDay,
      halfDayType: isHalfDay ? halfDayType : null,
      status: 'approved'
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4>Request Leave</h4>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Leave Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="vacation">Vacation</option>
              <option value="sick">Sick Leave</option>
              <option value="personal">Personal Leave</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
          </div>
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" checked={isHalfDay} onChange={(e) => setIsHalfDay(e.target.checked)} />
              Half Day Leave
            </label>
            {isHalfDay && (
              <div className="halfday-options">
                <label>
                  <input type="radio" name="halfDayType" value="morning" checked={halfDayType === 'morning'} onChange={() => setHalfDayType('morning')} />
                  Morning (9am - 1pm)
                </label>
                <label>
                  <input type="radio" name="halfDayType" value="afternoon" checked={halfDayType === 'afternoon'} onChange={() => setHalfDayType('afternoon')} />
                  Afternoon (2pm - 6pm)
                </label>
              </div>
            )}
          </div>
          <div className="form-group">
            <label>Reason (Optional)</label>
            <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={2} placeholder="Add a reason for your leave..." />
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit}>Submit Request</button>
        </div>
      </div>
    </div>
  );
}

function HolidayModal({ onClose, onAdd, existingHolidays }) {
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!date || !name) {
      setError('Please fill in all fields');
      return;
    }
    if (existingHolidays.some(h => h.date === date)) {
      setError('A holiday already exists on this date');
      return;
    }
    onAdd({
      id: Date.now().toString(),
      date,
      name,
      type: 'public'
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4>Add Holiday</h4>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Holiday Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Eid-ul-Fitr, Pohela Boishakh" />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit}>Add Holiday</button>
        </div>
      </div>
    </div>
  );
}

function ChangePasswordModal({ onClose }) {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = () => {
    if (!current || !newPass || !confirm) {
      setError('All fields are required');
      return;
    }
    if (newPass.length < 8) {
      setError('New password must be at least 8 characters');
      return;
    }
    if (newPass !== confirm) {
      setError('New passwords do not match');
      return;
    }
    setError('');
    setSuccess(true);
    setTimeout(() => onClose(), 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4>Change Password</h4>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {success ? (
            <div className="password-success">
              <span className="success-icon">✓</span>
              <p>Password changed successfully!</p>
            </div>
          ) : (
            <>
              <div className="form-group">
                <label>Current Password</label>
                <div className="password-input-wrap">
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={current}
                    onChange={(e) => { setCurrent(e.target.value); setError(''); }}
                    placeholder="Enter current password"
                  />
                  <button className="eye-btn" onClick={() => setShowCurrent(p => !p)}>
                    {showCurrent ? "🙈" : "👁"}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>New Password</label>
                <div className="password-input-wrap">
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPass}
                    onChange={(e) => { setNewPass(e.target.value); setError(''); }}
                    placeholder="Min. 8 characters"
                  />
                  <button className="eye-btn" onClick={() => setShowNew(p => !p)}>
                    {showNew ? "🙈" : "👁"}
                  </button>
                </div>
                {newPass && (
                  <div className="password-strength">
                    <div className={`strength-bar ${newPass.length >= 12 ? 'strong' : newPass.length >= 8 ? 'medium' : 'weak'}`} />
                    <span>{newPass.length >= 12 ? 'Strong' : newPass.length >= 8 ? 'Medium' : 'Weak'}</span>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <div className="password-input-wrap">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => { setConfirm(e.target.value); setError(''); }}
                    placeholder="Re-enter new password"
                  />
                  <button className="eye-btn" onClick={() => setShowConfirm(p => !p)}>
                    {showConfirm ? "🙈" : "👁"}
                  </button>
                </div>
              </div>
              {error && <div className="error-message">{error}</div>}
            </>
          )}
        </div>
        {!success && (
          <div className="modal-footer">
            <button className="btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn-primary" onClick={handleSubmit}>Update Password</button>
          </div>
        )}
      </div>
    </div>
  );
}

// Schedule Management Main Component
function ScheduleManagement({ isEditing, onSave, onCancel }) {
  const [weeklySchedule, setWeeklySchedule] = useState({
    monday: { isActive: true, slotDuration: 30, start: "09:00", end: "13:00", breaks: [], timeSlots: [] },
    tuesday: { isActive: true, slotDuration: 30, start: "09:00", end: "13:00", breaks: [], timeSlots: [] },
    wednesday: { isActive: true, slotDuration: 30, start: "09:00", end: "13:00", breaks: [], timeSlots: [] },
    thursday: { isActive: true, slotDuration: 30, start: "09:00", end: "13:00", breaks: [], timeSlots: [] },
    friday: { isActive: false, slotDuration: 30, start: "", end: "", breaks: [], timeSlots: [] },
    saturday: { isActive: true, slotDuration: 30, start: "10:00", end: "14:00", breaks: [], timeSlots: [] },
    sunday: { isActive: false, slotDuration: 30, start: "", end: "", breaks: [], timeSlots: [] },
  });

  const [leaves, setLeaves] = useState([
    { id: "1", date: "2025-04-15", reason: "Family Event", type: "personal", status: "approved" },
    { id: "2", date: "2025-05-01", reason: "International Workers' Day", type: "vacation", status: "approved" }
  ]);

  const [holidays, setHolidays] = useState([
    { id: "1", date: "2025-03-26", name: "Independence Day", type: "public" },
    { id: "2", date: "2025-04-14", name: "Pohela Boishakh", type: "public" }
  ]);

  const [slotModal, setSlotModal] = useState({ open: false, dayId: null, slotIndex: null, slot: null });
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [holidayModalOpen, setHolidayModalOpen] = useState(false);
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [copyFromDay, setCopyFromDay] = useState('monday');
  const [copyToDays, setCopyToDays] = useState([]);
  const [activeSubTab, setActiveSubTab] = useState('weekly');

  const handleDayUpdate = (dayId, updates) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [dayId]: { ...prev[dayId], ...updates }
    }));
  };

  const handleDurationChange = (dayId, newDuration) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [dayId]: { ...prev[dayId], slotDuration: newDuration }
    }));
  };

  const handleAddSlot = (dayId) => {
    setSlotModal({ open: true, dayId, slotIndex: null, slot: null });
  };

  const handleEditSlot = (dayId, slotIndex) => {
    const slot = weeklySchedule[dayId].timeSlots[slotIndex];
    setSlotModal({ open: true, dayId, slotIndex, slot });
  };

  const getCalculatedEndTime = (startTime, durationMinutes) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    date.setMinutes(date.getMinutes() + durationMinutes);
    return date.toTimeString().slice(0, 5);
  };

  const handleSaveSlot = (dayId, slotIndex, newSlot) => {
    const slotDuration = weeklySchedule[dayId].slotDuration;
    const endTime = newSlot.end || getCalculatedEndTime(newSlot.start, slotDuration);

    if (slotIndex === null) {
      setWeeklySchedule(prev => ({
        ...prev,
        [dayId]: {
          ...prev[dayId],
          timeSlots: [...(prev[dayId].timeSlots || []), { start: newSlot.start, end: endTime }]
        }
      }));
    } else {
      setWeeklySchedule(prev => ({
        ...prev,
        [dayId]: {
          ...prev[dayId],
          timeSlots: (prev[dayId].timeSlots || []).map((slot, idx) =>
            idx === slotIndex ? { start: newSlot.start, end: endTime } : slot
          )
        }
      }));
    }
  };

  const handleDeleteSlot = (dayId, slotIndex) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        timeSlots: (prev[dayId].timeSlots || []).filter((_, idx) => idx !== slotIndex)
      }
    }));
  };

  const handleAddLeave = (leave) => {
    setLeaves(prev => [...prev, leave]);
  };

  const handleDeleteLeave = (leaveId) => {
    setLeaves(prev => prev.filter(l => l.id !== leaveId));
  };

  const handleAddHoliday = (holiday) => {
    setHolidays(prev => [...prev, holiday]);
  };

  const handleDeleteHoliday = (holidayId) => {
    setHolidays(prev => prev.filter(h => h.id !== holidayId));
  };

  const handleCopySchedule = () => {
    const sourceSchedule = weeklySchedule[copyFromDay];
    const newSchedule = { ...weeklySchedule };
    copyToDays.forEach(dayId => {
      if (dayId !== copyFromDay) {
        newSchedule[dayId] = {
          isActive: sourceSchedule.isActive,
          slotDuration: sourceSchedule.slotDuration,
          start: sourceSchedule.start,
          end: sourceSchedule.end,
          breaks: sourceSchedule.breaks.map(b => ({ ...b })),
          timeSlots: (sourceSchedule.timeSlots || []).map(s => ({ ...s }))
        };
      }
    });
    setWeeklySchedule(newSchedule);
    setCopyModalOpen(false);
    setCopyToDays([]);
  };

  const getScheduleSummary = () => {
    const activeDays = DAYS.filter(day => weeklySchedule[day.id]?.isActive).length;
    const totalSlots = DAYS.reduce((sum, day) => sum + (weeklySchedule[day.id]?.timeSlots?.length || 0), 0);
    return { activeDays, totalSlots };
  };

  const summary = getScheduleSummary();

  return (
    <div className="schedule-management">
      <div className="schedule-subtabs">
        <button
          className={`subtab-btn ${activeSubTab === 'weekly' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('weekly')}
        >
          <Icon.CalendarDays /> Weekly Schedule
        </button>
        <button
          className={`subtab-btn ${activeSubTab === 'leaves' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('leaves')}
        >
          <Icon.BellOff /> Leave Management
        </button>
        <button
          className={`subtab-btn ${activeSubTab === 'holidays' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('holidays')}
        >
          <Icon.Sun /> Holidays
        </button>
      </div>

      {activeSubTab === 'weekly' && (
        <>
          <div className="schedule-summary-bar">
            <div className="summary-item">
              <span className="summary-label">Active Days:</span>
              <span className="summary-value">{summary.activeDays} / 7</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total Slots:</span>
              <span className="summary-value">{summary.totalSlots}</span>
            </div>
            {isEditing && (
              <button className="copy-schedule-btn" onClick={() => setCopyModalOpen(true)}>
                <Icon.Copy /> Copy from day
              </button>
            )}
          </div>

          <div className="weekly-schedule-grid">
            {DAYS.map(day => (
              <DaySchedule
                key={day.id}
                day={day}
                schedule={weeklySchedule[day.id]}
                isEditing={isEditing}
                onUpdate={(updates) =>
                  setWeeklySchedule(prev => ({
                    ...prev,
                    [day.id]: { ...prev[day.id], ...updates }
                  }))
                }
              />
            ))}
          </div>
        </>
      )}

      {activeSubTab === 'leaves' && (
        <div className="leaves-section">
          <div className="section-header">
            <h3 className="section-subtitle">Leave Requests</h3>
            {isEditing && (
              <button className="btn-primary-small" onClick={() => setLeaveModalOpen(true)}>
                <Icon.Plus /> Request Leave
              </button>
            )}
          </div>
          <div className="leaves-list">
            {leaves.length === 0 ? (
              <div className="empty-state">
                <Icon.BellOff />
                <p>No leave requests</p>
              </div>
            ) : (
              leaves.map(leave => (
                <div key={leave.id} className="leave-item">
                  <div className="leave-date">
                    <span className="date-number">{new Date(leave.date).getDate()}</span>
                    <span className="date-month">{new Date(leave.date).toLocaleString('default', { month: 'short' })}</span>
                  </div>
                  <div className="leave-info">
                    <span className="leave-reason">{leave.reason}</span>
                    <span className={`leave-type ${leave.type}`}>{leave.type}</span>
                  </div>
                  {isEditing && (
                    <button className="delete-leave-btn" onClick={() => handleDeleteLeave(leave.id)}>
                      <Icon.Trash />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeSubTab === 'holidays' && (
        <div className="holidays-section">
          <div className="section-header">
            <h3 className="section-subtitle">Public Holidays</h3>
            {isEditing && (
              <button className="btn-primary-small" onClick={() => setHolidayModalOpen(true)}>
                <Icon.Plus /> Add Holiday
              </button>
            )}
          </div>
          <div className="holidays-list">
            {holidays.length === 0 ? (
              <div className="empty-state">
                <Icon.Sun />
                <p>No holidays added</p>
              </div>
            ) : (
              holidays.map(holiday => (
                <div key={holiday.id} className="holiday-item">
                  <div className="holiday-date">
                    <span className="date-number">{new Date(holiday.date).getDate()}</span>
                    <span className="date-month">{new Date(holiday.date).toLocaleString('default', { month: 'short' })}</span>
                  </div>
                  <div className="holiday-info">
                    <span className="holiday-name">{holiday.name}</span>
                    <span className="holiday-badge">Public Holiday</span>
                  </div>
                  {isEditing && (
                    <button className="delete-holiday-btn" onClick={() => handleDeleteHoliday(holiday.id)}>
                      <Icon.Trash />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      {slotModal.open && (
        slotModal.slotIndex === null ? (
          <AddTimeSlotModal
            dayName={DAYS.find(d => d.id === slotModal.dayId)?.name}
            existingSlots={weeklySchedule[slotModal.dayId]?.timeSlots || []}
            currentSlotDuration={weeklySchedule[slotModal.dayId]?.slotDuration || 30}
            onClose={() => setSlotModal({ open: false, dayId: null, slotIndex: null, slot: null })}
            onSave={(newSlot) => handleSaveSlot(slotModal.dayId, null, newSlot)}
          />
        ) : (
          <EditTimeSlotModal
            dayName={DAYS.find(d => d.id === slotModal.dayId)?.name}
            slot={slotModal.slot}
            index={slotModal.slotIndex}
            existingSlots={weeklySchedule[slotModal.dayId]?.timeSlots || []}
            currentSlotDuration={weeklySchedule[slotModal.dayId]?.slotDuration || 30}
            onClose={() => setSlotModal({ open: false, dayId: null, slotIndex: null, slot: null })}
            onSave={(updatedSlot) => handleSaveSlot(slotModal.dayId, slotModal.slotIndex, updatedSlot)}
          />
        )
      )}

      {leaveModalOpen && (
        <LeaveRequestModal
          existingLeaves={leaves}
          onClose={() => setLeaveModalOpen(false)}
          onAdd={handleAddLeave}
        />
      )}

      {holidayModalOpen && (
        <HolidayModal
          existingHolidays={holidays}
          onClose={() => setHolidayModalOpen(false)}
          onAdd={handleAddHoliday}
        />
      )}

      {copyModalOpen && (
        <div className="modal-overlay" onClick={() => setCopyModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h4>Copy Schedule from Day</h4>
              <button className="modal-close" onClick={() => setCopyModalOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Copy from</label>
                <select value={copyFromDay} onChange={(e) => setCopyFromDay(e.target.value)}>
                  {DAYS.map(day => (
                    <option key={day.id} value={day.id}>{day.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Copy to (select multiple)</label>
                <div className="checkbox-group-multi">
                  {DAYS.filter(day => day.id !== copyFromDay).map(day => (
                    <label key={day.id} className="checkbox-label">
                      <input
                        type="checkbox"
                        value={day.id}
                        checked={copyToDays.includes(day.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCopyToDays([...copyToDays, day.id]);
                          } else {
                            setCopyToDays(copyToDays.filter(d => d !== day.id));
                          }
                        }}
                      />
                      {day.name}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setCopyModalOpen(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleCopySchedule} disabled={copyToDays.length === 0}>
                Copy Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);


  // Profile state - ALL fields from signup form
  const [profile, setProfile] = useState({
    // Personal Information
    doctorId: "DR-2025-000123",
    fullName: "Dr. Tasnim Farin",
    fatherHusbandName: "Md. Abdul Farin",
    mobile: "+880 1712-345678",
    email: "tasnim.farin@renovalife.com",
    dateOfBirth: "1985-03-15",
    gender: "Female",
    bloodGroup: "O+",
    nationality: "BD",

    // Professional Information
    bmdcNumber: "BMDC-12345",
    specialization: "Cardiology",
    subSpecialization: "Interventional Cardiology",
    qualification: "MBBS, FCPS (Cardiology)",
    experience: "12",
    currentDesignation: "Senior Cardiologist",

    // Work & Availability
    consultationType: "video",
    workSchedule: "Evening (2pm – 8pm)",
    consultationFee: "500",
    currency: "৳",

    // Documents (file names/URLs)
    profilePhoto: { url: "", name: "" },
    nidPassport: { url: "", name: "" },
    bmdcCertificate: { url: "", name: "" },
    educationalCertificate: { url: "", name: "" },
    experienceCertificate: { url: "", name: "" },

    // Account
    bio: "Board-certified cardiologist with 12+ years of experience in cardiovascular care.",
    avatar: "/images/doctors/doctor-2.jpg"
  });

  // Account settings (separate from profile)
  const [account, setAccount] = useState({
    email: "tasnim.farin@renovalife.com",
    phone: "+880 1712-345678",
    twoFactor: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: "patients",
    showContactInfo: true,
    showSchedule: true,
    allowOnlineBooking: true,
    dataSharing: false
  });

  // Handlers
  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleConsultationTypeToggle = (id) => {
    setProfile(prev => {
      const current = Array.isArray(prev.consultationType)
        ? prev.consultationType
        : prev.consultationType ? [prev.consultationType] : [];
      const updated = current.includes(id)
        ? current.filter(t => t !== id)
        : [...current, id];
      return { ...prev, consultationType: updated.length ? updated : current };
    });
  };

  const handleAccountChange = (field, value) => {
    setAccount(prev => ({ ...prev, [field]: value }));
  };

  const handlePrivacyChange = (field, value) => {
    setPrivacy(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field, file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfile(prev => ({ ...prev, [field]: { url, name: file.name } }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile(prev => ({ ...prev, avatar: { url, name: file.name } }));
    }
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <Icon.User /> },
    { id: "account", label: "Account", icon: <Icon.Settings /> },
    { id: "schedule", label: "Schedule", icon: <Icon.Calendar /> },
    { id: "privacy", label: "Privacy", icon: <Icon.Shield /> },
  ];

  const specializationOptions = [
    "Cardiology", "Dermatology", "ENT", "General Medicine",
    "Gynecology", "Neurology", "Orthopedics", "Pediatrics",
    "Psychiatry", "Surgery",
  ];

  const bloodGroups = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];

  const workSchedules = [
    "Morning (8am – 2pm)",
    "Evening (2pm – 8pm)",
    "Full Day (8am – 8pm)",
    "Night (8pm – 8am)",
    "Flexible"
  ];

  return (
    <div className="dashboard-content">
      <div className="settings-layout">
        <aside className="settings-sidebar">
          <nav className="settings-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`settings-nav-item ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="settings-nav-icon">{tab.icon}</span>
                <span className="settings-nav-label">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="settings-content">

          {activeTab === "profile" && (
            <div className="settings-section">
              <div className="section-header">
                <h2 className="section-title">Profile Information</h2>
                <button
                  className={`btn-edit ${isEditing ? "btn-save" : ""}`}
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </button>
              </div>

              <div className="profile-header-card">
                <div className="profile-avatar-large">
                  {profile.avatar && (typeof profile.avatar === 'string' ? (
                    <img src={profile.avatar} alt={profile.fullName} className="avatar-img" />
                  ) : (
                    <img src={profile.avatar.url} alt={profile.fullName} className="avatar-img" />
                  ))}
                  {isEditing && (
                    <label className="avatar-change-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                    </label>
                  )}
                </div>
                <div className="profile-name-display">
                  <h3>{profile.fullName}</h3>
                  <p className="profile-id">ID: {profile.doctorId}</p>
                </div>
              </div>

              <h4 className="settings-subsection-title">Personal Information</h4>

              <div className="settings-form-grid">
                <Field label="Doctor ID">
                  <SettingsInput icon={Icon.ID} value={profile.doctorId} disabled readOnly />
                </Field>

                <Field label="Full Name" required>
                  {isEditing ? (
                    <SettingsInput
                      icon={Icon.User}
                      type="text"
                      value={profile.fullName}
                      onChange={(e) => handleProfileChange("fullName", e.target.value)}
                      placeholder="Enter full name"
                    />
                  ) : (
                    <p className="settings-value">{profile.fullName}</p>
                  )}
                </Field>

                <Field label="Father's / Husband's Name">
                  {isEditing ? (
                    <SettingsInput
                      icon={Icon.User}
                      type="text"
                      value={profile.fatherHusbandName}
                      onChange={(e) => handleProfileChange("fatherHusbandName", e.target.value)}
                      placeholder="Enter name"
                    />
                  ) : (
                    <p className="settings-value">{profile.fatherHusbandName}</p>
                  )}
                </Field>

                <Field label="Mobile Number" required hint="Verified">
                  <div className="settings-input-with-btn">
                    {isEditing ? (
                      <SettingsInput
                        icon={Icon.Phone}
                        type="tel"
                        value={profile.mobile}
                        onChange={(e) => handleProfileChange("mobile", e.target.value)}
                        placeholder="Enter mobile"
                      />
                    ) : (
                      <p className="settings-value">{profile.mobile}</p>
                    )}
                    {isEditing && (
                      <button type="button" className="settings-btn-small">Send OTP</button>
                    )}
                  </div>
                </Field>

                <Field label="Email Address" required>
                  {isEditing ? (
                    <SettingsInput
                      icon={Icon.Email}
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleProfileChange("email", e.target.value)}
                      placeholder="Enter email"
                    />
                  ) : (
                    <p className="settings-value">{profile.email}</p>
                  )}
                </Field>

                <Field label="Date of Birth" required>
                  {isEditing ? (
                    <SettingsInput
                      icon={Icon.Calendar}
                      type="date"
                      value={profile.dateOfBirth}
                      onChange={(e) => handleProfileChange("dateOfBirth", e.target.value)}
                    />
                  ) : (
                    <p className="settings-value">{profile.dateOfBirth}</p>
                  )}
                </Field>

                <Field label="Gender" required>
                  {isEditing ? (
                    <SettingsSelect
                      icon={Icon.User}
                      value={profile.gender}
                      onChange={(e) => handleProfileChange("gender", e.target.value)}
                    >
                      <option value="">Select gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </SettingsSelect>
                  ) : (
                    <p className="settings-value">{profile.gender}</p>
                  )}
                </Field>

                <Field label="Blood Group">
                  {isEditing ? (
                    <SettingsSelect
                      icon={Icon.Blood}
                      value={profile.bloodGroup}
                      onChange={(e) => handleProfileChange("bloodGroup", e.target.value)}
                    >
                      <option value="">Select blood group</option>
                      {bloodGroups.map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </SettingsSelect>
                  ) : (
                    <p className="settings-value">{profile.bloodGroup}</p>
                  )}
                </Field>

                <Field label="Nationality">
                  {isEditing ? (
                    <SettingsSelect
                      icon={Icon.Globe}
                      value={profile.nationality}
                      onChange={(e) => handleProfileChange("nationality", e.target.value)}
                    >
                      <option value="">Select nationality</option>
                      <option value="BD">Bangladeshi</option>
                      <option value="other">Other</option>
                    </SettingsSelect>
                  ) : (
                    <p className="settings-value">{profile.nationality === "BD" ? "Bangladeshi" : "Other"}</p>
                  )}
                </Field>
              </div>

              <h4 className="settings-subsection-title">Professional Information</h4>

              <div className="settings-form-grid">
                <Field label="BMDC / Registration Number" required>
                  {isEditing ? (
                    <SettingsInput
                      icon={Icon.BMDC}
                      type="text"
                      value={profile.bmdcNumber}
                      onChange={(e) => handleProfileChange("bmdcNumber", e.target.value)}
                      placeholder="Enter BMDC number"
                    />
                  ) : (
                    <p className="settings-value">{profile.bmdcNumber}</p>
                  )}
                </Field>

                <Field label="Specialization" required>
                  {isEditing ? (
                    <SettingsSelect
                      icon={Icon.Stethoscope}
                      value={profile.specialization}
                      onChange={(e) => handleProfileChange("specialization", e.target.value)}
                    >
                      <option value="">Select specialization</option>
                      {specializationOptions.map((spec) => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </SettingsSelect>
                  ) : (
                    <p className="settings-value">{profile.specialization}</p>
                  )}
                </Field>

                <Field label="Sub Specialization">
                  {isEditing ? (
                    <SettingsSelect
                      icon={Icon.Stethoscope}
                      value={profile.subSpecialization}
                      onChange={(e) => handleProfileChange("subSpecialization", e.target.value)}
                    >
                      <option value="">Select sub specialization</option>
                      <option>Interventional Cardiology</option>
                      <option>Pediatric Surgery</option>
                      <option>Spine Surgery</option>
                    </SettingsSelect>
                  ) : (
                    <p className="settings-value">{profile.subSpecialization || "—"}</p>
                  )}
                </Field>

                <Field label="Qualification" required>
                  {isEditing ? (
                    <SettingsInput
                      icon={Icon.Degree}
                      type="text"
                      value={profile.qualification}
                      onChange={(e) => handleProfileChange("qualification", e.target.value)}
                      placeholder="Enter qualification"
                    />
                  ) : (
                    <p className="settings-value">{profile.qualification}</p>
                  )}
                </Field>

                <Field label="Experience" required>
                  {isEditing ? (
                    <div className="settings-input-with-suffix">
                      <SettingsInput
                        icon={Icon.Clock}
                        type="number"
                        min="0"
                        value={profile.experience}
                        onChange={(e) => handleProfileChange("experience", e.target.value)}
                        placeholder="Years"
                      />
                      <span className="input-suffix">Years</span>
                    </div>
                  ) : (
                    <p className="settings-value">{profile.experience} Years</p>
                  )}
                </Field>

                <Field label="Current Designation">
                  {isEditing ? (
                    <SettingsInput
                      icon={Icon.Designation}
                      type="text"
                      value={profile.currentDesignation}
                      onChange={(e) => handleProfileChange("currentDesignation", e.target.value)}
                      placeholder="Enter designation"
                    />
                  ) : (
                    <p className="settings-value">{profile.currentDesignation}</p>
                  )}
                </Field>
              </div>

              <h4 className="settings-subsection-title">Work & Availability</h4>

              <div className="settings-form-grid">
                <Field label="Consultation Type" required>
                  {isEditing ? (
                    <div className="consult-type-selector">
                      {[
                        { id: "video", label: "Video Call", Ic: Icon.Video },
                        { id: "audio", label: "Audio Call", Ic: Icon.Audio },
                        { id: "chat", label: "Chat Only", Ic: Icon.Chat },
                      ].map(({ id, label, Ic }) => {
                        const selected = Array.isArray(profile.consultationType)
                          ? profile.consultationType.includes(id)
                          : profile.consultationType === id;
                        return (
                          <button
                            key={id}
                            type="button"
                            className={`consult-type-btn${selected ? " active" : ""}`}
                            onClick={() => handleConsultationTypeToggle(id)}
                          >
                            <Ic /> {label}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="settings-value capitalize">
                      {profile.consultationType === "video" ? "Video Call" :
                        profile.consultationType === "audio" ? "Audio Call" : "Chat Only"}
                    </p>
                  )}
                </Field>

                <Field label="Work Schedule" required>
                  {isEditing ? (
                    <SettingsSelect
                      icon={Icon.Calendar}
                      value={profile.workSchedule}
                      onChange={(e) => handleProfileChange("workSchedule", e.target.value)}
                    >
                      <option value="">Select schedule</option>
                      {workSchedules.map((ws) => (
                        <option key={ws} value={ws}>{ws}</option>
                      ))}
                    </SettingsSelect>
                  ) : (
                    <p className="settings-value">
                      {profile.workSchedule}
                    </p>
                  )}
                </Field>

                <Field label="Consultation Fee" required>
                  {isEditing ? (
                    <div className="settings-input-with-prefix">
                      <span className="currency-prefix">{profile.currency}</span>
                      <SettingsInput
                        type="number"
                        min="0"
                        value={profile.consultationFee}
                        onChange={(e) => handleProfileChange("consultationFee", e.target.value)}
                        placeholder="Enter fee"
                      />
                    </div>
                  ) : (
                    <p className="settings-value">
                      {profile.currency} {profile.consultationFee}
                    </p>
                  )}
                </Field>
              </div>

              <h4 className="settings-subsection-title">Documents</h4>

              <div className="documents-grid">
                {[
                  { Ic: Icon.NID, title: "NID / Passport", required: true, hint: "JPG, PNG (Max 2MB)", field: "nidPassport", btn: "Upload Document", accept: "image/*" },
                  { Ic: Icon.BMDCID, title: "BMDC Certificate", required: true, hint: "JPG, PNG, PDF (Max 2MB)", field: "bmdcCertificate", btn: "Upload Document", accept: "image/*,application/pdf" },
                  { Ic: Icon.EduCert, title: "Educational Certificate", required: false, hint: "JPG, PNG, PDF (Max 2MB)", field: "educationalCertificate", btn: "Upload Document", accept: "image/*,application/pdf" },
                  { Ic: Icon.ExpCert, title: "Experience Certificate", required: false, hint: "JPG, PNG, PDF (Max 2MB)", field: "experienceCertificate", btn: "Upload Document", accept: "image/*,application/pdf" },
                ].map(({ Ic, title, required, hint, field, btn, accept }) => {
                  const fileData = profile[field];
                  const hasFile = fileData?.url || (typeof fileData === "string" && fileData);
                  return (
                    <div key={field} className="document-card">
                      <div className="document-icon">
                        {hasFile && fileData?.url?.startsWith("blob:") && accept.includes("image") ? (
                          <img src={fileData.url} alt={title} className="doc-preview-img" />
                        ) : (
                          <Ic />
                        )}
                      </div>
                      <div className="document-info">
                        <p className="document-title">
                          {title}
                          {required && <span className="required-star">*</span>}
                        </p>
                        <p className="document-hint">{hint}</p>
                        {hasFile && !isEditing && (
                          <p className="document-status uploaded">✓ {fileData?.name || "Uploaded"}</p>
                        )}
                        {hasFile && isEditing && fileData?.name && (
                          <p className="document-status uploaded">✓ {fileData.name}</p>
                        )}
                      </div>
                      {isEditing && (
                        <label className="document-upload-btn">
                          {btn}
                          <input
                            type="file"
                            accept={accept}
                            className="hidden"
                            onChange={(e) => handleFileUpload(field, e.target.files?.[0])}
                          />
                        </label>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="verification-banner">
                <div className="verification-icon">
                  <Icon.Shield />
                </div>
                <div className="verification-text">
                  <h4>Your information is secure</h4>
                  <p>All documents are encrypted and reviewed by our verification team.</p>
                </div>
              </div>

              <Field label="Bio / About">
                {isEditing ? (
                  <textarea
                    className="settings-textarea"
                    value={profile.bio}
                    onChange={(e) => handleProfileChange("bio", e.target.value)}
                    rows={4}
                    placeholder="Tell patients about your expertise..."
                  />
                ) : (
                  <p className="settings-value">{profile.bio}</p>
                )}
              </Field>
            </div>
          )}

          {activeTab === "account" && (
            <div className="settings-section">
              <div className="section-header">
                <h2 className="section-title">Account Settings</h2>
                <button
                  className={`btn-edit ${isEditing ? "btn-save" : ""}`}
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>

              <div className="account-settings">
                <div className="settings-group">
                  <h3 className="group-title">Contact Information</h3>

                  <div className="form-row">
                    <label className="form-label">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        className="form-input"
                        value={account.email}
                        onChange={(e) => handleAccountChange("email", e.target.value)}
                      />
                    ) : (
                      <p className="form-value">{account.email}</p>
                    )}
                  </div>

                  <div className="form-row">
                    <label className="form-label">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        className="form-input"
                        value={account.phone}
                        onChange={(e) => handleAccountChange("phone", e.target.value)}
                      />
                    ) : (
                      <p className="form-value">{account.phone}</p>
                    )}
                  </div>
                </div>

                <div className="settings-group">
                  <h3 className="group-title">Security</h3>

                  <div className="form-row">
                    <label className="form-label">Password</label>
                    <button className="btn-link" onClick={() => setPasswordModalOpen(true)}>Change Password</button>
                  </div>

                  <div className="form-row toggle-row">
                    <div>
                      <label className="form-label">Two-Factor Authentication</label>
                      <p className="form-hint">Add an extra layer of security</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={account.twoFactor}
                        onChange={(e) => handleAccountChange("twoFactor", e.target.checked)}
                        disabled={!isEditing}
                      />
                      <span className="toggle-slider" />
                    </label>
                  </div>
                </div>

                <div className="settings-group">
                  <h3 className="group-title">Notifications</h3>

                  <div className="form-row toggle-row">
                    <div>
                      <label className="form-label">Email Notifications</label>
                      <p className="form-hint">Receive updates via email</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={account.emailNotifications}
                        onChange={(e) => handleAccountChange("emailNotifications", e.target.checked)}
                        disabled={!isEditing}
                      />
                      <span className="toggle-slider" />
                    </label>
                  </div>

                  <div className="form-row toggle-row">
                    <div>
                      <label className="form-label">SMS Notifications</label>
                      <p className="form-hint">Receive text message alerts</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={account.smsNotifications}
                        onChange={(e) => handleAccountChange("smsNotifications", e.target.checked)}
                        disabled={!isEditing}
                      />
                      <span className="toggle-slider" />
                    </label>
                  </div>

                  <div className="form-row toggle-row">
                    <div>
                      <label className="form-label">Push Notifications</label>
                      <p className="form-hint">Browser/app push notifications</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={account.pushNotifications}
                        onChange={(e) => handleAccountChange("pushNotifications", e.target.checked)}
                        disabled={!isEditing}
                      />
                      <span className="toggle-slider" />
                    </label>
                  </div>
                </div>
              </div>
              {passwordModalOpen && (
                <ChangePasswordModal onClose={() => setPasswordModalOpen(false)} />
              )}
            </div>
          )}

          {activeTab === "schedule" && (
            <div className="settings-section">
              <div className="section-header">
                <h2 className="section-title">Schedule Management</h2>
                <button
                  className={`btn-edit ${isEditing ? "btn-save" : ""}`}
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  {isEditing ? "Save Changes" : "Edit Schedule"}
                </button>
              </div>
              <ScheduleManagement
                isEditing={isEditing}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="settings-section">
              <div className="section-header">
                <h2 className="section-title">Privacy & Visibility</h2>
                <button
                  className={`btn-edit ${isEditing ? "btn-save" : ""}`}
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>

              <div className="privacy-settings">
                <div className="settings-group">
                  <h3 className="group-title">Profile Visibility</h3>

                  <div className="form-row">
                    <label className="form-label">Who can see your profile</label>
                    {isEditing ? (
                      <select
                        className="form-select"
                        value={privacy.profileVisibility}
                        onChange={(e) => handlePrivacyChange("profileVisibility", e.target.value)}
                      >
                        <option value="public">Public - Anyone</option>
                        <option value="patients">Registered Patients Only</option>
                        <option value="private">Private - Only You</option>
                      </select>
                    ) : (
                      <p className="form-value capitalize">
                        {privacy.profileVisibility === "public" ? "Public" :
                          privacy.profileVisibility === "patients" ? "Registered Patients" : "Private"}
                      </p>
                    )}
                  </div>
                </div>

                <div className="settings-group">
                  <h3 className="group-title">Information Sharing</h3>

                  <div className="form-row toggle-row">
                    <div>
                      <label className="form-label">Show Contact Information</label>
                      <p className="form-hint">Display phone/email on public profile</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={privacy.showContactInfo}
                        onChange={(e) => handlePrivacyChange("showContactInfo", e.target.checked)}
                        disabled={!isEditing}
                      />
                      <span className="toggle-slider" />
                    </label>
                  </div>

                  <div className="form-row toggle-row">
                    <div>
                      <label className="form-label">Show Schedule Publicly</label>
                      <p className="form-hint">Let patients see your available hours</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={privacy.showSchedule}
                        onChange={(e) => handlePrivacyChange("showSchedule", e.target.checked)}
                        disabled={!isEditing}
                      />
                      <span className="toggle-slider" />
                    </label>
                  </div>

                  <div className="form-row toggle-row">
                    <div>
                      <label className="form-label">Allow Online Booking</label>
                      <p className="form-hint">Patients can book appointments online</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={privacy.allowOnlineBooking}
                        onChange={(e) => handlePrivacyChange("allowOnlineBooking", e.target.checked)}
                        disabled={!isEditing}
                      />
                      <span className="toggle-slider" />
                    </label>
                  </div>
                </div>

                <div className="settings-group danger-zone">
                  <h3 className="group-title danger">Danger Zone</h3>
                  <p className="group-description">Once you delete your account, there is no going back.</p>
                  <button className="btn-danger">Delete Account</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}