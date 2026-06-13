// app/doctor-portal/patient-queue/page.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/redux/hook";
import "./patient-queue.css";

const API_URL = "http://localhost:5001/api/v1/appointments/my";
const CONFIRM_API_URL = "http://localhost:5001/api/v1/appointments/confirm";
const CANCEL_API_URL = "http://localhost:5001/api/v1/appointments/cancel";
const TZ = "Asia/Dhaka";

function formatTime(date) {
  if (!date) return "N/A";

  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
}

function formatDate(date) {
  if (!date) return "N/A";

  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function normalizeAppointment(apt) {
  return {
    id: apt.id,
    appointmentCode: apt.appointmentCode,
    patientName: apt.patient?.fullName || apt.patientName || "Unknown Patient",
    patientPhone: apt.patient?.mobileNumber || apt.patientPhone || "N/A",
    patientEmail: apt.patient?.email || apt.patientEmail || "N/A",
    patientGender: apt.patient?.gender || apt.patientGender || "N/A",
    patientAge: apt.patient?.age || "N/A",
    reason: apt.reason || "No reason provided",
    medicalHistory: apt.patientMedicalHistory || "No medical history provided",
    appointmentDate: formatDate(apt.appointmentDate),
    startTime: formatTime(apt.startTime),
    endTime: formatTime(apt.endTime),
    type: apt.type,
    status: apt.status,
    paymentStatus: apt.paymentStatus,
    consultationFee: apt.consultationFee,
  };
}

function PatientQueueSkeleton() {
  return (
    <div className="dq-list">
      {[1, 2, 3].map((item) => (
        <div className="dq-card dq-skeleton-card" key={item}>
          <div className="dq-skeleton dq-avatar-skeleton" />
          <div className="dq-skeleton-content">
            <div className="dq-skeleton dq-line-lg" />
            <div className="dq-skeleton dq-line-md" />
            <div className="dq-skeleton dq-line-sm" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PatientQueuePage() {
  const token = useAppSelector((state) => state.auth.accessToken);

  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(Boolean(token));
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const [rejectModal, setRejectModal] = useState({
    open: false,
    appointmentId: null,
    patientName: "",
    reason: "",
    error: "",
  });

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      setError("Authentication token not found. Please login again.");
      return;
    }

    const controller = new AbortController();

    async function fetchDoctorAppointments() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
          cache: "no-store",
        });

        const result = await res.json();

        if (!res.ok || !result.success) {
          throw new Error(result.message || "Failed to load patient queue.");
        }

        setAppointments(Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchDoctorAppointments();

    return () => controller.abort();
  }, [token]);

  const pendingAppointments = useMemo(() => {
    return appointments
      .filter((apt) => apt.status === "PENDING")
      .map(normalizeAppointment);
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return pendingAppointments;

    return pendingAppointments.filter((apt) => {
      return (
        apt.patientName.toLowerCase().includes(query) ||
        apt.patientPhone.toLowerCase().includes(query) ||
        apt.appointmentCode.toLowerCase().includes(query) ||
        apt.reason.toLowerCase().includes(query)
      );
    });
  }, [pendingAppointments, searchTerm]);

  const handleConfirmAppointment = async (appointmentId) => {
    if (!token) {
      setActionError("Authentication token not found. Please login again.");
      return;
    }

    try {
      setActionLoadingId(appointmentId);
      setActionError("");

      const res = await fetch(`${CONFIRM_API_URL}/${appointmentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to confirm appointment.");
      }

      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === appointmentId
            ? {
              ...apt,
              status: "CONFIRMED",
              confirmedAt: new Date().toISOString(),
            }
            : apt
        )
      );
    } catch (err) {
      setActionError(err.message || "Unable to confirm appointment.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const openRejectModal = (appointment) => {
    setActionError("");

    setRejectModal({
      open: true,
      appointmentId: appointment.id,
      patientName: appointment.patientName,
      reason: "",
      error: "",
    });
  };

  const closeRejectModal = () => {
    if (actionLoadingId) return;

    setRejectModal({
      open: false,
      appointmentId: null,
      patientName: "",
      reason: "",
      error: "",
    });
  };

  const handleRejectAppointment = async () => {
    if (!token) {
      setActionError("Authentication token not found. Please login again.");
      return;
    }

    const reason = rejectModal.reason.trim();

    if (reason.length < 2) {
      setRejectModal((prev) => ({
        ...prev,
        error: "Reject reason must be at least 2 characters.",
      }));
      return;
    }

    try {
      setActionLoadingId(rejectModal.appointmentId);
      setActionError("");

      const res = await fetch(`${CANCEL_API_URL}/${rejectModal.appointmentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cancellationReason: reason,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to reject appointment.");
      }

      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === rejectModal.appointmentId
            ? {
              ...apt,
              status: "CANCELLED",
              cancellationReason: reason,
              cancelledAt: new Date().toISOString(),
            }
            : apt
        )
      );

      closeRejectModal();
    } catch (err) {
      setRejectModal((prev) => ({
        ...prev,
        error: err.message || "Unable to reject appointment.",
      }));
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="doctor-queue-page">
      <div className="dq-header">
        <div>
          <h1>Pending Patient Queue</h1>
          <p>
            Review patients waiting for appointment confirmation and manage your
            queue efficiently.
          </p>
        </div>

        <div className="dq-count-card">
          <span>Pending</span>
          <strong>{pendingAppointments.length}</strong>
        </div>
      </div>

      <div className="dq-toolbar">
        <div className="dq-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>

          <input
            type="text"
            placeholder="Search by patient, phone, code, or reason..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="dq-filter-pill">Pending appointments only</div>
      </div>

      {actionError && <div className="dq-action-error">{actionError}</div>}

      {isLoading && <PatientQueueSkeleton />}

      {!isLoading && error && (
        <div className="dq-state dq-error">
          <h3>Unable to load queue</h3>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && filteredAppointments.length === 0 && (
        <div className="dq-state">
          <h3>No pending appointments</h3>
          <p>There are no pending patient appointments right now.</p>
        </div>
      )}

      {!isLoading && !error && filteredAppointments.length > 0 && (
        <div className="dq-list">
          {filteredAppointments.map((apt) => (
            <div className="dq-card" key={apt.id}>
              <div className="dq-time-box">
                <span>{apt.appointmentDate}</span>
                <strong>{apt.startTime}</strong>
              </div>

              <div className="dq-patient-avatar">
                {apt.patientName
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>

              <div className="dq-info">
                <h3>{apt.patientName}</h3>

                <p>
                  {apt.patientAge} yrs • {apt.patientGender} •{" "}
                  {apt.patientPhone}
                </p>

                <h4>{apt.reason}</h4>

                <small>
                  {apt.type === "ONLINE"
                    ? "Online Consultation"
                    : "In-Person Visit"}
                </small>
              </div>

              <div className="dq-status-wrap">
                <span className="dq-status">Pending</span>
              </div>

              <div className="dq-actions">
                <button
                  className="dq-btn primary"
                  onClick={() => handleConfirmAppointment(apt.id)}
                  disabled={actionLoadingId === apt.id}
                >
                  {actionLoadingId === apt.id ? "Confirming..." : "Confirm"}
                </button>

                <button
                  className="dq-btn danger"
                  onClick={() => openRejectModal(apt)}
                  disabled={actionLoadingId === apt.id}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {rejectModal.open && (
        <div className="dq-modal-overlay" onClick={closeRejectModal}>
          <div className="dq-modal" onClick={(e) => e.stopPropagation()}>
            <div className="dq-modal-header">
              <h3>Reject Appointment</h3>
              <button type="button" onClick={closeRejectModal}>
                ×
              </button>
            </div>

            <p className="dq-modal-text">
              Reject appointment for{" "}
              <strong>{rejectModal.patientName}</strong>. Please provide a
              reason.
            </p>

            <label className="dq-modal-label">Reject Reason</label>
            <textarea
              value={rejectModal.reason}
              onChange={(e) =>
                setRejectModal((prev) => ({
                  ...prev,
                  reason: e.target.value,
                  error: "",
                }))
              }
              placeholder="Example: Doctor is unavailable at this time"
              rows={4}
              disabled={!!actionLoadingId}
            />

            {rejectModal.error && (
              <span className="dq-modal-error">{rejectModal.error}</span>
            )}

            <div className="dq-modal-actions">
              <button
                type="button"
                className="dq-modal-cancel"
                onClick={closeRejectModal}
                disabled={!!actionLoadingId}
              >
                Keep
              </button>

              <button
                type="button"
                className="dq-modal-danger"
                onClick={handleRejectAppointment}
                disabled={!!actionLoadingId}
              >
                {actionLoadingId ? "Rejecting..." : "Confirm Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}