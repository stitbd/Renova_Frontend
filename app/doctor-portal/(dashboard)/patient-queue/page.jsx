// app/doctor-portal/patient-queue/page.jsx
"use client";
import Link from "next/link";
import { useState } from "react";
import "./patient-queue.css";

const initialQueue = [
  { id: 1, name: "Masud Rana", age: 32, gender: "Male", issue: "Chest pain, Breathing problem", time: "10:24 AM", waitingTime: "02:15", status: "pending", avatar: "/images/patients/01.jpg", phone: "01712-345678", patientId: "PT-2025-00123", type: "New Patient", priority: "urgent" },
  { id: 2, name: "Farhana Akter", age: 28, gender: "Female", issue: "Heart palpitations, Anxiety", time: "10:28 AM", waitingTime: "01:48", status: "pending", avatar: "/images/patients/02.jpg", phone: "01811-223344", patientId: "PT-2025-00098", type: "Follow-up", priority: "normal" },
  { id: 3, name: "Abdullah Al Mamun", age: 45, gender: "Male", issue: "High BP, Headache", time: "10:31 AM", waitingTime: "01:32", status: "in-progress", avatar: "/images/patients/03.jpg", phone: "01912-556677", patientId: "PT-2025-00075", type: "Regular Checkup", priority: "normal" },
  { id: 4, name: "Sumiya Rahman", age: 30, gender: "Female", issue: "Shortness of breath", time: "10:35 AM", waitingTime: "00:58", status: "pending", avatar: "/images/patients/04.jpg", phone: "01712-998877", patientId: "PT-2025-00061", type: "Consultation", priority: "urgent" },
  { id: 5, name: "Rafiq Hasan", age: 50, gender: "Male", issue: "ECG review", time: "10:35 AM", waitingTime: "00:32", status: "pending", avatar: "/images/patients/05.jpg", phone: "01611-445566", patientId: "PT-2025-00055", type: "ECG Review", priority: "normal" },
  { id: 6, name: "Taslima Begum", age: 35, gender: "Female", issue: "Diabetes checkup", time: "10:40 AM", waitingTime: "00:15", status: "pending", avatar: "/images/patients/06.jpg", phone: "01922-334455", patientId: "PT-2025-00044", type: "Checkup", priority: "normal" },
  { id: 7, name: "Kamal Hossain", age: 42, gender: "Male", issue: "Regular checkup", time: "10:45 AM", waitingTime: "00:05", status: "pending", avatar: "/images/patients/07.jpg", phone: "01812-667788", patientId: "PT-2025-00038", type: "Regular Checkup", priority: "normal" },
];

export default function PatientQueuePage() {
  const [patients, setPatients] = useState(initialQueue);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [rejectModal, setRejectModal] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  // Filter out completed patients from being displayed
  const activePatients = patients.filter(p => p.status !== "completed");

  const statusOrder = { "pending": 0, "in-progress": 1, "rejected": 2 };

  const filteredPatients = activePatients
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
    pending: patients.filter(p => p.status === "pending").length,
    inProgress: patients.filter(p => p.status === "in-progress").length,
    rejected: patients.filter(p => p.status === "rejected").length,
  };

  const handleAccept = (id) => {
    // Accept now changes status to "in-progress" directly
    setPatients(prev =>
      prev.map(p => p.id === id ? { ...p, status: "in-progress" } : p)
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

  const handleComplete = (id) => {
    // When marked complete, remove the patient from the active queue entirely
    setPatients(prev =>
      prev.map(p => p.id === id ? { ...p, status: "completed" } : p)
    );
  };

  const getStatusMeta = (status) => {
    switch (status) {
      case "in-progress": return { cls: "status-ongoing", label: "In Progress", dot: "dot-blue" };
      case "rejected": return { cls: "status-rejected", label: "Rejected", dot: "dot-red" };
      default: return { cls: "status-pending", label: "Pending", dot: "dot-amber" };
    }
  };

  const getPriorityBadge = (priority) => priority === "urgent"
    ? <span className="priority-badge urgent">Urgent</span>
    : null;

  return (
    <div className="dashboard-content">

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
          {["all", "pending", "in-progress", "rejected"].map(f => (
            <button
              key={f}
              className={`pq-filter-btn${filter === f ? " active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : f === "in-progress" ? "In Progress" : f.charAt(0).toUpperCase() + f.slice(1)}
              {f !== "all" && (
                <span className="pq-filter-count">
                  {activePatients.filter(p => p.status === f).length}
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
                </div>

                <div className={`pq-status-badge ${meta.cls}`}>
                  <span className={`pq-dot ${meta.dot}`} />
                  {meta.label}
                </div>
              </div>

              {/* Actions */}
              <div className="pq-actions">
                {patient.status === "pending" && (
                  <>
                    <button className="pq-btn accept" onClick={() => handleAccept(patient.id)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                      Accept
                    </button>
                    <button className="pq-btn reject" onClick={() => handleReject(patient)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                      Reject
                    </button>
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
                {patient.status === "rejected" && (
                  <span className="pq-rejected-note">Patient has been notified of rejection.</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

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