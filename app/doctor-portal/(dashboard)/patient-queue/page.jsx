// app/doctor-portal/patient-queue/page.jsx
"use client";
import Link from "next/link";
import { useState } from "react";
import "./patient-queue.css";

const initialQueue = [
  { id: 1, name: "Masud Rana", age: 32, gender: "Male", issue: "Chest pain, Breathing problem", time: "10:24 AM", waitingTime: "02:15", status: "waiting", avatar: "/images/patients/01.jpg", phone: "01712-345678", patientId: "PT-2025-00123", type: "New Patient", priority: "urgent" },
  { id: 2, name: "Farhana Akter", age: 28, gender: "Female", issue: "Heart palpitations, Anxiety", time: "10:28 AM", waitingTime: "01:48", status: "waiting", avatar: "/images/patients/02.jpg", phone: "01811-223344", patientId: "PT-2025-00098", type: "Follow-up", priority: "normal" },
  { id: 3, name: "Abdullah Al Mamun", age: 45, gender: "Male", issue: "High BP, Headache", time: "10:31 AM", waitingTime: "01:32", status: "in-progress", avatar: "/images/patients/03.jpg", phone: "01912-556677", patientId: "PT-2025-00075", type: "Regular Checkup", priority: "normal" },
  { id: 4, name: "Sumiya Rahman", age: 30, gender: "Female", issue: "Shortness of breath", time: "10:35 AM", waitingTime: "00:58", status: "waiting", avatar: "/images/patients/04.jpg", phone: "01712-998877", patientId: "PT-2025-00061", type: "Consultation", priority: "urgent" },
  { id: 5, name: "Rafiq Hasan", age: 50, gender: "Male", issue: "ECG review", time: "10:35 AM", waitingTime: "00:32", status: "completed", avatar: "/images/patients/05.jpg", phone: "01611-445566", patientId: "PT-2025-00055", type: "ECG Review", priority: "normal" },
  { id: 6, name: "Taslima Begum", age: 35, gender: "Female", issue: "Diabetes checkup", time: "10:40 AM", waitingTime: "00:15", status: "waiting", avatar: "/images/patients/06.jpg", phone: "01922-334455", patientId: "PT-2025-00044", type: "Checkup", priority: "normal" },
  { id: 7, name: "Kamal Hossain", age: 42, gender: "Male", issue: "Regular checkup", time: "10:45 AM", waitingTime: "00:05", status: "waiting", avatar: "/images/patients/07.jpg", phone: "01812-667788", patientId: "PT-2025-00038", type: "Regular Checkup", priority: "normal" },
];

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
];

export default function PatientQueuePage() {
  const [patients, setPatients] = useState(initialQueue);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [rescheduleModal, setRescheduleModal] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [rescheduleNote, setRescheduleNote] = useState("");
  const [rejectModal, setRejectModal] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  const statusOrder = { "waiting": 0, "in-progress": 1, "accepted": 2, "rescheduled": 3, "completed": 4, "rejected": 5 };

  const filteredPatients = patients
    .filter(p => {
      const matchesFilter = filter === "all" || p.status === filter;
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.patientId.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

  const stats = {
    waiting: patients.filter(p => p.status === "waiting").length,
    inProgress: patients.filter(p => p.status === "in-progress").length,
    completed: patients.filter(p => p.status === "completed").length,
    rejected: patients.filter(p => p.status === "rejected").length,
  };

  const handleAccept = (id) => {
    setPatients(prev =>
      prev.map(p => p.id === id ? { ...p, status: "accepted" } : p)
    );
  };

  const handleReject = (patient) => {
    setRejectModal(patient);
    setRejectReason("");
  };

  const confirmReject = () => {
    setPatients(prev =>
      prev.map(p => p.id === rejectModal.id ? { ...p, status: "rejected" } : p)
    );
    setRejectModal(null);
    setRejectReason("");
  };

  const handleReschedule = (patient) => {
    setRescheduleModal(patient);
    setSelectedDate("");
    setSelectedTime("");
    setRescheduleNote("");
  };

  const confirmReschedule = () => {
    if (!selectedDate || !selectedTime) return;
    setPatients(prev =>
      prev.map(p =>
        p.id === rescheduleModal.id
          ? { ...p, time: selectedTime, status: "rescheduled", rescheduleDate: selectedDate }
          : p
      )
    );
    setRescheduleModal(null);
  };

  const handleComplete = (id) => {
    setPatients(prev =>
      prev.map(p => p.id === id ? { ...p, status: "completed" } : p)
    );
  };

  const getStatusMeta = (status) => {
    switch (status) {
      case "in-progress": return { cls: "status-ongoing", label: "In Progress", dot: "dot-blue" };
      case "completed": return { cls: "status-completed", label: "Completed", dot: "dot-green" };
      case "accepted": return { cls: "status-accepted", label: "Accepted", dot: "dot-teal" };
      case "rejected": return { cls: "status-rejected", label: "Rejected", dot: "dot-red" };
      case "rescheduled": return { cls: "status-rescheduled", label: "Rescheduled", dot: "dot-purple" };
      default: return { cls: "status-waiting", label: "Waiting", dot: "dot-amber" };
    }
  };

  const getPriorityBadge = (priority) => priority === "urgent"
    ? <span className="priority-badge urgent">Urgent</span>
    : null;

  // Today's date for date picker min
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="dashboard-content">

      {/* ── Stats Row ─────────────────────────────────────── */}
      <div className="pq-stats-row">
        <div className="pq-stat-card waiting">
          <div className="pq-stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
          </div>
          <div>
            <span className="pq-stat-num">{stats.waiting}</span>
            <span className="pq-stat-lbl">Waiting</span>
          </div>
        </div>
        <div className="pq-stat-card in-progress">
          <div className="pq-stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg>
          </div>
          <div>
            <span className="pq-stat-num">{stats.inProgress}</span>
            <span className="pq-stat-lbl">In Progress</span>
          </div>
        </div>
        <div className="pq-stat-card completed">
          <div className="pq-stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
          <div>
            <span className="pq-stat-num">{stats.completed}</span>
            <span className="pq-stat-lbl">Completed</span>
          </div>
        </div>
        <div className="pq-stat-card avg-wait">
          <div className="pq-stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
          </div>
          <div>
            <span className="pq-stat-num">{patients.length}</span>
            <span className="pq-stat-lbl">Total Today</span>
          </div>
        </div>
        <div className="pq-stat-card avg-time">
          <div className="pq-stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
          </div>
          <div>
            <span className="pq-stat-num">12 min</span>
            <span className="pq-stat-lbl">Avg Wait</span>
          </div>
        </div>
      </div>

      {/* ── Controls ──────────────────────────────────────── */}
      <div className="pq-controls">
        <div className="pq-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          <input
            type="text"
            placeholder="Search by name, issue or patient ID…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="pq-filters">
          {["all", "waiting", "in-progress", "completed", "accepted", "rejected"].map(f => (
            <button
              key={f}
              className={`pq-filter-btn${filter === f ? " active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : f === "in-progress" ? "In Progress" : f.charAt(0).toUpperCase() + f.slice(1)}
              {f !== "all" && (
                <span className="pq-filter-count">
                  {patients.filter(p => p.status === f).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Queue List ────────────────────────────────────── */}
      <div className="pq-list">
        {filteredPatients.length === 0 && (
          <div className="pq-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
            <p>No patients found</p>
          </div>
        )}

        {filteredPatients.map((patient, index) => {
          const meta = getStatusMeta(patient.status);
          return (
            <div key={patient.id} className={`pq-card${patient.priority === "urgent" ? " urgent-border" : ""}`}>
              {/* Card Header */}
              <div className="pq-card-main">
                <div className="pq-queue-num">{index + 1}</div>

                <div className="pq-avatar">
                  <img src={patient.avatar} alt={patient.name}
                    onError={e => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
                  />
                  <span className="pq-avatar-fallback">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  </span>
                </div>

                <div className="pq-info">
                  <div className="pq-name-row">
                    <h3 className="pq-name">{patient.name}</h3>
                    {getPriorityBadge(patient.priority)}
                    <span className="pq-type-badge">{patient.type}</span>
                  </div>
                  <p className="pq-meta">{patient.age} yrs • {patient.gender} • {patient.patientId}</p>
                  <p className="pq-issue">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                    {patient.issue}
                  </p>
                </div>

                <div className="pq-time-block">
                  <div className="pq-time-row">
                    <span className="pq-time-lbl">Arrived</span>
                    <span className="pq-time-val">{patient.time}</span>
                  </div>
                  <div className="pq-time-row">
                    <span className="pq-time-lbl">Waiting</span>
                    <span className={`pq-time-val wait${parseFloat(patient.waitingTime) > 1.5 ? " long" : ""}`}>{patient.waitingTime}</span>
                  </div>
                  {patient.rescheduleDate && (
                    <div className="pq-time-row">
                      <span className="pq-time-lbl">Rescheduled</span>
                      <span className="pq-time-val">{patient.rescheduleDate} {patient.time}</span>
                    </div>
                  )}
                </div>

                <div className={`pq-status-badge ${meta.cls}`}>
                  <span className={`pq-dot ${meta.dot}`} />
                  {meta.label}
                </div>
              </div>

              {/* Actions */}
              <div className="pq-actions">
                {patient.status === "waiting" && (
                  <>
                    <button className="pq-btn accept" onClick={() => handleAccept(patient.id)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      Accept
                    </button>
                    <button className="pq-btn reject" onClick={() => handleReject(patient)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                      Reject
                    </button>
                    <button className="pq-btn reschedule" onClick={() => handleReschedule(patient)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                      Reschedule
                    </button>
                  </>
                )}
                {patient.status === "accepted" && (
                  <>
                    <button className="pq-btn complete" onClick={() => handleComplete(patient.id)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                      Mark Complete
                    </button>
                    <Link href={`/doctor-portal/patients/patient-profile?id=${patient.patientId}&from=/doctor-portal/patient-queue`} className="pq-btn view-profile">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                      View Details
                    </Link>
                  </>
                )}
                {patient.status === "in-progress" && (
                  <>
                    <button className="pq-btn complete" onClick={() => handleComplete(patient.id)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                      Mark Complete
                    </button>
                    <Link href={`/doctor-portal/patients/patient-profile?id=${patient.patientId}&from=/doctor-portal/patient-queue`} className="pq-btn view-profile">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                      View Details
                    </Link>
                  </>
                )}
                {patient.status === "completed" && (
                  <>
                    <Link href={`/doctor-portal/patients/patient-profile?id=${patient.patientId}&from=/doctor-portal/patient-queue`} className="pq-btn view-profile">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                      View Details
                    </Link>
                    <Link href="/doctor-portal/prescriptions/prescriptions-details" className="pq-btn prescription">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" /></svg>
                      Prescription
                    </Link>
                  </>
                )}
                {patient.status === "rescheduled" && (
                  <>
                    <button className="pq-btn accept" onClick={() => handleAccept(patient.id)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      Accept
                    </button>
                    <button className="pq-btn reschedule" onClick={() => handleReschedule(patient)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                      Reschedule Again
                    </button>
                  </>
                )}
                {patient.status === "rejected" && (
                  <span className="pq-rejected-note">Patient has been notified of rejection.</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Reschedule Modal ──────────────────────────────── */}
      {rescheduleModal && (
        <div className="pq-modal-overlay" onClick={() => setRescheduleModal(null)}>
          <div className="pq-modal" onClick={e => e.stopPropagation()}>
            <div className="pq-modal-header">
              <h3>Reschedule Appointment</h3>
              <button className="pq-modal-close" onClick={() => setRescheduleModal(null)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="pq-modal-patient">
              <div className="pq-modal-avatar">
                <img src={rescheduleModal.avatar} alt={rescheduleModal.name}
                  onError={e => { e.currentTarget.style.display = "none"; }}
                />
              </div>
              <div>
                <p className="pq-modal-pname">{rescheduleModal.name}</p>
                <p className="pq-modal-pmeta">{rescheduleModal.age} yrs • {rescheduleModal.gender} • {rescheduleModal.patientId}</p>
                <p className="pq-modal-pissue">{rescheduleModal.issue}</p>
              </div>
            </div>
            <div className="pq-modal-body">
              <label className="pq-modal-label">New Date</label>
              <input
                type="date"
                className="pq-modal-input"
                min={today}
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
              />
              <label className="pq-modal-label">New Time Slot</label>
              <div className="pq-time-grid">
                {timeSlots.map(t => (
                  <button
                    key={t}
                    className={`pq-time-slot${selectedTime === t ? " selected" : ""}`}
                    onClick={() => setSelectedTime(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <label className="pq-modal-label">Note to Patient (optional)</label>
              <textarea
                className="pq-modal-input pq-modal-textarea"
                placeholder="Reason for rescheduling…"
                value={rescheduleNote}
                onChange={e => setRescheduleNote(e.target.value)}
                rows={3}
              />
            </div>
            <div className="pq-modal-footer">
              <button className="pq-modal-btn cancel" onClick={() => setRescheduleModal(null)}>Cancel</button>
              <button
                className={`pq-modal-btn confirm${!selectedDate || !selectedTime ? " disabled" : ""}`}
                onClick={confirmReschedule}
                disabled={!selectedDate || !selectedTime}
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Reject Modal ──────────────────────────────────── */}
      {rejectModal && (
        <div className="pq-modal-overlay" onClick={() => setRejectModal(null)}>
          <div className="pq-modal pq-modal-sm" onClick={e => e.stopPropagation()}>
            <div className="pq-modal-header">
              <h3>Reject Queue Entry</h3>
              <button className="pq-modal-close" onClick={() => setRejectModal(null)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <div className="pq-modal-body">
              <p className="pq-reject-warning">
                You are about to reject <strong>{rejectModal.name}</strong> from the queue. The patient will be notified.
              </p>
              <label className="pq-modal-label">Reason for rejection</label>
              <select className="pq-modal-input" value={rejectReason} onChange={e => setRejectReason(e.target.value)}>
                <option value="">Select a reason…</option>
                <option value="no-slot">No available slot today</option>
                <option value="wrong-dept">Wrong department</option>
                <option value="incomplete-info">Incomplete patient information</option>
                <option value="emergency-only">Emergency cases only</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="pq-modal-footer">
              <button className="pq-modal-btn cancel" onClick={() => setRejectModal(null)}>Cancel</button>
              <button className="pq-modal-btn reject-confirm" onClick={confirmReject}>
                Reject Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}