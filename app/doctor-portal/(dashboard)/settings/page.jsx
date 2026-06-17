// app/doctor-portal/settings/page.jsx
"use client";

import { useState } from "react";
import "./settings.css";
import "./settings-profile.css";
import "./settings-account.css";
import "./settings-schedule.css";
import "./settings-privacy.css";
import {
  User,
  Phone,
  Mail,
  Calendar,
  Droplet,
  Globe,
  Stethoscope,
  GraduationCap,
  Clock,
  Briefcase,
  DollarSign,
  ChevronDown,
  Video,
  Mic,
  MessageCircle,
  Camera,
  CreditCard,
  Shield,
  Settings,
  Bell,
  Sun,
  Moon,
  Edit,
  Trash2,
  Plus,
  Copy,
  Timer,
  X,
  Check,
  AlertCircle
} from "lucide-react";

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
          <IconComp size={15} />
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
          <IconComp size={15} />
        </span>
      )}
      <select className="settings-select" {...props}>
        {children}
      </select>
      <span className="settings-select-chevron">
        <ChevronDown size={14} />
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
            <Trash2 size={14} />
          </button>
        </>
      )}
      {isEditing && isHovered && (
        <div className="time-slot-edit-overlay">
          <button className="edit-slot-btn" onClick={() => onUpdate(index)}>
            <Edit size={12} /> Edit Time
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
                        <Trash2 size={12} />
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
                <Timer size={14} />
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
                <Timer size={14} />
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
            <Timer size={14} />
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
            <Timer size={14} />
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
              <span className="success-icon"><Check size={20} /></span>
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
                    {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
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
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
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
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
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
          <Calendar size={14} /> Weekly Schedule
        </button>
        <button
          className={`subtab-btn ${activeSubTab === 'leaves' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('leaves')}
        >
          <Bell size={14} /> Leave Management
        </button>
        <button
          className={`subtab-btn ${activeSubTab === 'holidays' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('holidays')}
        >
          <Sun size={14} /> Holidays
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
                <Copy size={14} /> Copy from day
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
                <Plus size={12} /> Request Leave
              </button>
            )}
          </div>
          <div className="leaves-list">
            {leaves.length === 0 ? (
              <div className="empty-state">
                <Bell size={32} />
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
                      <Trash2 size={14} />
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
                <Plus size={12} /> Add Holiday
              </button>
            )}
          </div>
          <div className="holidays-list">
            {holidays.length === 0 ? (
              <div className="empty-state">
                <Sun size={32} />
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
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Modals - keep existing modal code but replace icons with Lucide */}
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

  // Profile state
  const [profile, setProfile] = useState({
    doctorId: "DR-2025-000123",
    fullName: "Dr. Tasnim Farin",
    fatherHusbandName: "Md. Abdul Farin",
    mobile: "+880 1712-345678",
    email: "tasnim.farin@renovalife.com",
    dateOfBirth: "1985-03-15",
    gender: "Female",
    bloodGroup: "O+",
    nationality: "BD",
    bmdcNumber: "BMDC-12345",
    specialization: "Cardiology",
    subSpecialization: "Interventional Cardiology",
    qualification: "MBBS, FCPS (Cardiology)",
    experience: "12",
    currentDesignation: "Senior Cardiologist",
    consultationType: "video",
    workSchedule: "Evening (2pm – 8pm)",
    consultationFee: "500",
    currency: "৳",
    profilePhoto: { url: "", name: "" },
    nidPassport: { url: "", name: "" },
    bmdcCertificate: { url: "", name: "" },
    educationalCertificate: { url: "", name: "" },
    experienceCertificate: { url: "", name: "" },
    bio: "Board-certified cardiologist with 12+ years of experience in cardiovascular care.",
    avatar: "/images/doctors/doctor-2.jpg"
  });

  // Account settings
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
    { id: "profile", label: "Profile", icon: User },
    { id: "account", label: "Account", icon: Settings },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "privacy", label: "Privacy", icon: Shield },
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
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`settings-nav-item ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="settings-nav-icon"><IconComponent size={16} /></span>
                  <span className="settings-nav-label">{tab.label}</span>
                </button>
              );
            })}
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
                      <Camera size={16} />
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
                  <SettingsInput icon={User} value={profile.doctorId} disabled readOnly />
                </Field>

                <Field label="Full Name" required>
                  {isEditing ? (
                    <SettingsInput
                      icon={User}
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
                      icon={User}
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
                        icon={Phone}
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
                      icon={Mail}
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
                      icon={Calendar}
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
                      icon={User}
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
                      icon={Droplet}
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
                      icon={Globe}
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
                      icon={Stethoscope}
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
                      icon={Stethoscope}
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
                      icon={Stethoscope}
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
                      icon={GraduationCap}
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
                        icon={Clock}
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
                      icon={Briefcase}
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
                        { id: "video", label: "Video Call", Icon: Video },
                        { id: "audio", label: "Audio Call", Icon: Mic },
                        { id: "chat", label: "Chat Only", Icon: MessageCircle },
                      ].map(({ id, label, Icon: IconComp }) => {
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
                            <IconComp size={14} /> {label}
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
                      icon={Calendar}
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
                  { Icon: CreditCard, title: "NID / Passport", required: true, hint: "JPG, PNG (Max 2MB)", field: "nidPassport", btn: "Upload Document", accept: "image/*" },
                  { Icon: Stethoscope, title: "BMDC Certificate", required: true, hint: "JPG, PNG, PDF (Max 2MB)", field: "bmdcCertificate", btn: "Upload Document", accept: "image/*,application/pdf" },
                  { Icon: GraduationCap, title: "Educational Certificate", required: false, hint: "JPG, PNG, PDF (Max 2MB)", field: "educationalCertificate", btn: "Upload Document", accept: "image/*,application/pdf" },
                  { Icon: Briefcase, title: "Experience Certificate", required: false, hint: "JPG, PNG, PDF (Max 2MB)", field: "experienceCertificate", btn: "Upload Document", accept: "image/*,application/pdf" },
                ].map(({ Icon: IconComp, title, required, hint, field, btn, accept }) => {
                  const fileData = profile[field];
                  const hasFile = fileData?.url || (typeof fileData === "string" && fileData);
                  return (
                    <div key={field} className="document-card">
                      <div className="document-icon">
                        {hasFile && fileData?.url?.startsWith("blob:") && accept.includes("image") ? (
                          <img src={fileData.url} alt={title} className="doc-preview-img" />
                        ) : (
                          <IconComp size={20} />
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
                  <Shield size={20} />
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