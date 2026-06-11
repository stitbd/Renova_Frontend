// app/doctor-portal/appointments/page.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import "./appointments.css";


// Accepted patients from queue feed into appointments
const allAppointments = [
  // ─── Today ───
  { id: 1, date: "today", time: "09:00 AM", patient: "Masud Rana", age: 32, gender: "Male", type: "Follow-up", status: "completed", phone: "01712-345678", patientId: "PT-2025-00123", issue: "Chest pain, Breathing problem", avatar: "/images/patients/01.jpg" },
  { id: 2, date: "today", time: "10:00 AM", patient: "Farhana Akter", age: 28, gender: "Female", type: "Consultation", status: "completed", phone: "01811-223344", patientId: "PT-2025-00098", issue: "Heart palpitations, Anxiety", avatar: "/images/patients/02.jpg" },
  { id: 3, date: "today", time: "11:00 AM", patient: "Jannatul Ferdous", age: 26, gender: "Female", type: "Regular Checkup", status: "in-progress", phone: "01922-334455", patientId: "PT-2025-00044", issue: "Regular health checkup", avatar: "/images/patients/06.jpg" },
  { id: 4, date: "today", time: "11:30 AM", patient: "Sohel Mahmud", age: 38, gender: "Male", type: "ECG Report Review", status: "upcoming", phone: "01611-445566", patientId: "PT-2025-00031", issue: "ECG review", avatar: "/images/patients/04.jpg" },
  { id: 5, date: "today", time: "12:00 PM", patient: "Nusrat Jahan", age: 33, gender: "Female", type: "Consultation", status: "upcoming", phone: "01712-998877", patientId: "PT-2025-00061", issue: "Shortness of breath", avatar: "/images/patients/05.jpg" },
  { id: 6, date: "today", time: "01:00 PM", patient: "Kamal Hossain", age: 42, gender: "Male", type: "Follow-up", status: "upcoming", phone: "01812-667788", patientId: "PT-2025-00038", issue: "Regular checkup", avatar: "/images/patients/07.jpg" },
  // ─── Tomorrow ───
  { id: 7, date: "tomorrow", time: "09:00 AM", patient: "Rafiq Hasan", age: 50, gender: "Male", type: "ECG Review", status: "scheduled", phone: "01711-223366", patientId: "PT-2025-00055", issue: "ECG review follow-up", avatar: "/images/patients/03.jpg" },
  { id: 8, date: "tomorrow", time: "09:30 AM", patient: "Sumiya Rahman", age: 30, gender: "Female", type: "Consultation", status: "scheduled", phone: "01922-334455", patientId: "PT-2025-00072", issue: "Breathing issues", avatar: "/images/patients/04.jpg" },
  { id: 9, date: "tomorrow", time: "10:30 AM", patient: "Taslima Begum", age: 35, gender: "Female", type: "Diabetes Checkup", status: "scheduled", phone: "01812-445566", patientId: "PT-2025-00081", issue: "Diabetes management", avatar: "/images/patients/06.jpg" },
  { id: 10, date: "tomorrow", time: "11:00 AM", patient: "Abdullah Al Mamun", age: 45, gender: "Male", type: "Regular Checkup", status: "scheduled", phone: "01812-667788", patientId: "PT-2025-00075", issue: "High BP, Headache", avatar: "/images/patients/03.jpg" },
];

// Lifetime stats (static for now)
const lifetimeStats = {
  totalEver: 1248,
  completedEver: 1103,
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(allAppointments);
  const [viewMode, setViewMode] = useState("list");
  const [selectedDate, setSelectedDate] = useState("today");
  const [calendarDate, setCalendarDate] = useState(new Date().toISOString().split("T")[0]);

  const [calPopupOpen, setCalPopupOpen] = useState(false);
  const [calMode, setCalMode] = useState("single" | "single" | "multi" | "range");
  const [selectedDates, setSelectedDates] = useState([]);
  const [rangeStart, setRangeStart] = useState(null);
  const [calViewYear, setCalViewYear] = useState(new Date().getFullYear());
  const [calViewMonth, setCalViewMonth] = useState(new Date().getMonth());
  const calPopupRef = useRef(null);

  const fmtDate = (y, m, d) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const handleCalCell = (dateStr) => {
    if (calMode === "single") {
      setSelectedDates([dateStr]);
    } else if (calMode === "multi") {
      setSelectedDates(prev =>
        prev.includes(dateStr) ? prev.filter(d => d !== dateStr) : [...prev, dateStr]
      );
    } else {
      if (!rangeStart) {
        setRangeStart(dateStr);
        setSelectedDates([dateStr]);
      } else {
        const [s, e] = [rangeStart, dateStr].sort();
        const range = [];
        const cur = new Date(s);
        const end = new Date(e);
        while (cur <= end) {
          range.push(cur.toISOString().split("T")[0]);
          cur.setDate(cur.getDate() + 1);
        }
        setSelectedDates(range);
        setRangeStart(null);
      }
    }
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (calPopupRef.current && !calPopupRef.current.contains(e.target)) {
        setCalPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Computed stats
  const todayAppts = appointments.filter(a => a.date === "today");
  const tomorrowAppts = appointments.filter(a => a.date === "tomorrow");
  const todayCompleted = todayAppts.filter(a => a.status === "completed").length;
  const todayPending = todayAppts.filter(a => a.status !== "completed").length;
  const todayTotal = todayAppts.length;

  // Visible list: separate completed to bottom
  const getFilteredList = () => {
    let list = [];
    if (selectedDates.length > 0) {
      // calendar filter active — match against apt.date string or a real date
      const today = new Date().toISOString().split("T")[0];
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
      list = appointments.filter(a => {
        const d = a.date === "today" ? today : a.date === "tomorrow" ? tomorrow : a.date;
        return selectedDates.includes(d);
      });
    } else if (selectedDate === "today") {
      list = [...todayAppts];
    } else if (selectedDate === "tomorrow") {
      list = [...tomorrowAppts];
    } else {
      list = [...appointments];
    }
    const active = list.filter(a => a.status !== "completed").sort((a, b) => a.time.localeCompare(b.time));
    const done = list.filter(a => a.status === "completed").sort((a, b) => a.time.localeCompare(b.time));
    return [...active, ...done];
  };

  const handleComplete = (id) => {
    setAppointments(prev =>
      prev.map(a => a.id === id ? { ...a, status: "completed" } : a)
    );
  };

  const statusMeta = (status) => {
    switch (status) {
      case "completed": return { cls: "apt-badge-completed", label: "Completed" };
      case "in-progress": return { cls: "apt-badge-inprogress", label: "In Progress" };
      case "upcoming": return { cls: "apt-badge-upcoming", label: "Upcoming" };
      case "scheduled": return { cls: "apt-badge-scheduled", label: "Scheduled" };
      default: return { cls: "apt-badge-upcoming", label: "Upcoming" };
    }
  };

  const visibleList = getFilteredList();

  return (
    <div className="dashboard-content">

      {/* ── Summary Bar ─────────────────────────────────── */}
      <div className="apt-summary-bar">
        <div className="apt-sum-card">
          <div className="apt-sum-icon today-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
          </div>
          <div>
            <span className="apt-sum-num">{todayTotal}</span>
            <span className="apt-sum-lbl">Today's Appointments</span>
          </div>
        </div>
        <div className="apt-sum-card">
          <div className="apt-sum-icon done-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <div>
            <span className="apt-sum-num">{todayCompleted}</span>
            <span className="apt-sum-lbl">Completed Today</span>
          </div>
        </div>
        <div className="apt-sum-card">
          <div className="apt-sum-icon pending-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
          </div>
          <div>
            <span className="apt-sum-num">{todayPending}</span>
            <span className="apt-sum-lbl">Pending Today</span>
          </div>
        </div>
        <div className="apt-sum-card">
          <div className="apt-sum-icon lifetime-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
          </div>
          <div>
            <span className="apt-sum-num">{lifetimeStats.totalEver.toLocaleString()}</span>
            <span className="apt-sum-lbl">Total All-Time</span>
          </div>
        </div>
        <div className="apt-sum-card">
          <div className="apt-sum-icon alltime-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></svg>
          </div>
          <div>
            <span className="apt-sum-num">{lifetimeStats.completedEver.toLocaleString()}</span>
            <span className="apt-sum-lbl">All-Time Completed</span>
          </div>
        </div>
      </div>

      {/* ── Controls ────────────────────────────────────── */}
      <div className="apt-controls">
        <div className="apt-date-tabs">
          {["today", "tomorrow", "all"].map(d => (
            <button
              key={d}
              className={`apt-date-btn${selectedDate === d ? " active" : ""}`}
              onClick={() => setSelectedDate(d)}
            >
              {d === "today" ? "Today" : d === "tomorrow" ? "Tomorrow" : "All"}
            </button>
          ))}
        </div>

        <div className="apt-view-toggle">
          <div className="apt-calendar-wrap" ref={calPopupRef}>
            <button
              className={`apt-view-btn${calPopupOpen ? " active" : ""}`}
              onClick={() => setCalPopupOpen(p => !p)}
              title="Calendar View"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              Calendar {selectedDates.length > 0 && `(${selectedDates.length})`}
            </button>

            {calPopupOpen && (() => {
              const daysInMonth = new Date(calViewYear, calViewMonth + 1, 0).getDate();
              const firstDay = new Date(calViewYear, calViewMonth, 1).getDay();
              const today = new Date();
              const todayStr = today.toISOString().split("T")[0];
              const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
              const cells = [];
              for (let i = 0; i < firstDay; i++) cells.push(null);
              for (let d = 1; d <= daysInMonth; d++) cells.push(d);

              return (
                <div className="apt-cal-popup">
                  <div className="apt-cal-header">
                    <button className="apt-cal-nav" onClick={() => {
                      if (calViewMonth === 0) { setCalViewMonth(11); setCalViewYear(y => y - 1); }
                      else setCalViewMonth(m => m - 1);
                    }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                    </button>
                    <span className="apt-cal-title">{monthNames[calViewMonth]} {calViewYear}</span>
                    <button className="apt-cal-nav" onClick={() => {
                      if (calViewMonth === 11) { setCalViewMonth(0); setCalViewYear(y => y + 1); }
                      else setCalViewMonth(m => m + 1);
                    }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                    </button>
                  </div>
                  <div className="apt-cal-grid-head">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                      <div key={d} className="apt-cal-day-name">{d}</div>
                    ))}
                  </div>
                  <div className="apt-cal-grid">
                    {cells.map((d, i) => {
                      if (!d) return <div key={`e-${i}`} className="apt-cal-cell empty" />;
                      const dateStr = fmtDate(calViewYear, calViewMonth, d);
                      const isSelected = selectedDates.includes(dateStr);
                      const isToday = dateStr === todayStr;
                      const isRangeStart = calMode === "range" && selectedDates[0] === dateStr;
                      const isRangeEnd = calMode === "range" && selectedDates[selectedDates.length - 1] === dateStr && selectedDates.length > 1;
                      const isInRange = calMode === "range" && isSelected && !isRangeStart && !isRangeEnd;
                      let cls = "apt-cal-cell";
                      if (isRangeStart) cls += " range-start";
                      else if (isRangeEnd) cls += " range-end";
                      else if (isInRange) cls += " in-range";
                      else if (isSelected) cls += " selected";
                      if (isToday && !isSelected) cls += " today-marker";
                      return (
                        <button key={dateStr} className={cls} onClick={() => handleCalCell(dateStr)}>{d}</button>
                      );
                    })}
                  </div>
                  <div className="apt-cal-footer">
                    <button className="apt-cal-clear" onClick={() => { setSelectedDates([]); setRangeStart(null); }}>Clear</button>
                    <button className="apt-cal-apply" onClick={() => setCalPopupOpen(false)}>Apply</button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* ── Calendar View ───────────────────────────────── */}
      {viewMode === "calendar" && (
        <div className="apt-calendar-wrap">
          <input
            type="date"
            className="apt-calendar-input"
            value={calendarDate}
            onChange={e => setCalendarDate(e.target.value)}
          />
          <p className="apt-calendar-hint">
            {appointments.filter(a => a.date === "today" || a.date === "tomorrow").length} appointments in range. Expand calendar integration as needed.
          </p>
        </div>
      )}

      {/* ── List View ───────────────────────────────────── */}
      {viewMode === "list" && (
        <div className="apt-list">
          {visibleList.length === 0 && (
            <div className="apt-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              <p>No appointments for this period</p>
            </div>
          )}

          {visibleList.map(apt => {
            const { cls, label } = statusMeta(apt.status);
            const isCompleted = apt.status === "completed";
            return (
              <div key={apt.id} className={`apt-card${isCompleted ? " apt-card-done" : ""}`}>

                {/* Time Block */}
                <div className="apt-time-block">
                  <span className="apt-date-lbl">{apt.date === "today" ? "Today" : apt.date === "tomorrow" ? "Tomorrow" : apt.date}</span>
                  <span className="apt-time-val">{apt.time}</span>
                </div>

                {/* Patient Info */}
                <div className="apt-patient-block">
                  <div className="apt-avatar">
                    <img src={apt.avatar} alt={apt.patient}
                      onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
                    />
                    <span className="apt-avatar-fallback">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    </span>
                  </div>
                  <div className="apt-patient-info">
                    <h4 className="apt-patient-name">{apt.patient}</h4>
                    <p className="apt-patient-meta">{apt.age} yrs • {apt.gender} • {apt.patientId}</p>
                    <p className="apt-type">{apt.type}</p>
                    <p className="apt-issue">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                      {apt.issue}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="apt-actions-block">
                  <span className={`apt-status-badge ${cls}`}>{label}</span>

                  {!isCompleted && (
                    <div className="apt-action-btns">
                      <Link href="/doctor-portal/messages" className="apt-action-btn msg" title="Message">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                        <span>Message</span>
                      </Link>
                      <Link href="/doctor-portal/messages/audio-call" className="apt-action-btn audio" title="Audio Call">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12 19.79 19.79 0 0 1 1 4.11 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                        <span>Audio</span>
                      </Link>
                      <Link href="/doctor-portal/messages/video-call" className="apt-action-btn video" title="Video Call">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
                        <span>Video</span>
                      </Link>
                      <button className="apt-action-btn done" title="Mark as done" onClick={() => handleComplete(apt.id)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                        <span>Done</span>
                      </button>
                    </div>
                  )}

                  {isCompleted && (
                    <div className="apt-action-btns">
                      <Link href={`/doctor-portal/patients/patient-profile?id=${apt.patientId}`} className="apt-action-btn view-profile">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                        <span>View Details</span>
                      </Link>
                      <Link href="/doctor-portal/prescriptions/prescriptions-details" className="apt-action-btn prescription">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" /></svg>
                        Prescription
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}