"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hook";
import "./patient-appointments.css";
import { CalendarView } from "@/components/patient-dashboard/patient-appointment-calenderView";

const API_URL = "http://localhost:5001/api/v1/appointments/my";
const CANCEL_API_URL = "http://localhost:5001/api/v1/appointments/cancel";
const TZ = "Asia/Dhaka";

const filters = [
  "TODAY APPOINTMENTS",
  "ALL",
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

function formatDate(date) {
  if (!date) return "N/A";

  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function getDateKey(date) {
  if (!date) return "";

  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(date));

  const year = parts.find((p) => p.type === "year")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  const day = parts.find((p) => p.type === "day")?.value;

  return `${year}-${month}-${day}`;
}

function isTodayAppointment(appointmentDate) {
  return getDateKey(appointmentDate) === getDateKey(new Date());
}

function formatTime(date) {
  if (!date) return "N/A";

  return new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
}

function normalizeAppointment(apt) {
  const formattedDate = formatDate(apt.appointmentDate);
  const [day, month, year] = formattedDate.split(" ");

  return {
    id: apt.id,
    appointmentCode: apt.appointmentCode,
    doctor: apt.doctor?.fullName || "Unknown Doctor",
    specialty: apt.doctor?.specialization?.name || "Specialist",
    day,
    month: month?.toUpperCase() || "",
    year,
    date: formattedDate,
    rawAppointmentDate: apt.appointmentDate,
    startTime: formatTime(apt.startTime),
    endTime: formatTime(apt.endTime),
    type: apt.type,
    location: apt.type === "ONLINE" ? "Online Consultation" : "Clinic Visit",
    status: apt.status,
    paymentStatus: apt.paymentStatus,
    consultationFee: apt.consultationFee,
    reason: apt.reason || "No reason provided",
  };
}

function getStatusLabel(status) {
  return String(status || "UNKNOWN").replaceAll("_", " ");
}

function getStatusClass(status) {
  return `status-${String(status || "unknown").toLowerCase()}`;
}

function getStats(appointments) {
  return {
    total: appointments.length,
    today: appointments.filter((apt) =>
      isTodayAppointment(apt.rawAppointmentDate)
    ).length,
    pending: appointments.filter((apt) => apt.status === "PENDING").length,
    confirmed: appointments.filter((apt) => apt.status === "CONFIRMED").length,
    unpaid: appointments.filter((apt) => apt.paymentStatus === "UNPAID").length,
  };
}

function AppointmentSkeleton() {
  return (
    <div className="appointments-list">
      {[1, 2, 3].map((item) => (
        <div className="appointment-card skeleton-card" key={item}>
          <div className="skeleton date-skeleton" />
          <div className="skeleton-content">
            <div className="skeleton line-lg" />
            <div className="skeleton line-md" />
            <div className="skeleton line-sm" />
          </div>
          <div className="skeleton action-skeleton" />
        </div>
      ))}
    </div>
  );
}

export default function AppointmentsPage() {
  const router = useRouter();
  const token = useAppSelector((state) => state.auth.accessToken);

  const [viewMode, setViewMode] = useState("list");
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(Boolean(token));
  const [error, setError] = useState("");
  const [cancelError, setCancelError] = useState("");
  const [cancelingId, setCancelingId] = useState(null);

  const [cancelModal, setCancelModal] = useState({
    open: false,
    appointmentId: null,
    reason: "",
    error: "",
  });

  const openCancelModal = (appointmentId) => {
    setCancelError("");

    setCancelModal({
      open: true,
      appointmentId,
      reason: "",
      error: "",
    });
  };

  const closeCancelModal = () => {
    if (cancelingId) return;

    setCancelModal({
      open: false,
      appointmentId: null,
      reason: "",
      error: "",
    });
  };

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      setError("Authentication token not found. Please login again.");
      return;
    }

    const controller = new AbortController();

    async function fetchAppointments() {
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
          throw new Error(result.message || "Failed to load appointments.");
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

    fetchAppointments();

    return () => controller.abort();
  }, [token]);

  const handleCancelAppointment = async () => {
    if (!token) {
      setCancelError("Authentication token not found. Please login again.");
      return;
    }

    const reason = cancelModal.reason.trim();

    if (reason.length < 2) {
      setCancelModal((prev) => ({
        ...prev,
        error: "Cancellation reason must be at least 2 characters.",
      }));
      return;
    }

    try {
      setCancelingId(cancelModal.appointmentId);
      setCancelError("");

      const res = await fetch(`${CANCEL_API_URL}/${cancelModal.appointmentId}`, {
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
        throw new Error(result.message || "Failed to cancel appointment.");
      }

      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === cancelModal.appointmentId
            ? {
              ...apt,
              status: "CANCELLED",
              cancellationReason: reason,
              cancelledAt: new Date().toISOString(),
            }
            : apt
        )
      );

      closeCancelModal();
    } catch (err) {
      setCancelModal((prev) => ({
        ...prev,
        error: err.message || "Unable to cancel appointment.",
      }));
    } finally {
      setCancelingId(null);
    }
  };
  const normalizedAppointments = useMemo(
    () => appointments.map(normalizeAppointment),
    [appointments]
  );

  const filteredAppointments = useMemo(() => {
    if (activeFilter === "ALL") return normalizedAppointments;

    if (activeFilter === "TODAY APPOINTMENTS") {
      return normalizedAppointments.filter((apt) =>
        isTodayAppointment(apt.rawAppointmentDate)
      );
    }

    return normalizedAppointments.filter((apt) => apt.status === activeFilter);
  }, [normalizedAppointments, activeFilter]);

  const stats = useMemo(
    () => getStats(normalizedAppointments),
    [normalizedAppointments]
  );

  return (
    <motion.div
      className="appointments-page"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div className="appointments-topbar" variants={item}>
        <div>
          <h1>My Appointments</h1>
          <p className="page-subtitle">
            Manage your upcoming consultations, payment status, and appointment
            history.
          </p>
        </div>

        <motion.button
          className="btn-book-appointment"
          onClick={() => router.push("/appointment")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>+</span>
          Book Appointment
        </motion.button>
      </motion.div>

      <motion.div className="appointments-stats" variants={item}>
        <div className="stat-card">
          <span>Total</span>
          <strong>{stats.total}</strong>
        </div>
        <div className="stat-card">
          <span>Today</span>
          <strong>{stats.today}</strong>
        </div>
        <div className="stat-card">
          <span>Pending</span>
          <strong>{stats.pending}</strong>
        </div>
        <div className="stat-card">
          <span>Confirmed</span>
          <strong>{stats.confirmed}</strong>
        </div>
        <div className="stat-card">
          <span>Unpaid</span>
          <strong>{stats.unpaid}</strong>
        </div>
      </motion.div>

      <motion.div className="appointments-toolbar" variants={item}>
        <div className="filter-tabs">
          {filters.map((filter) => (
            <button
              key={filter}
              className={activeFilter === filter ? "active" : ""}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === "ALL"
                ? "All"
                : filter === "TODAY APPOINTMENTS"
                  ? "Today Appointments"
                  : getStatusLabel(filter)}
            </button>
          ))}
        </div>

        <div className="view-toggle">
          {["list", "calendar"].map((mode) => (
            <button
              key={mode}
              className={viewMode === mode ? "active" : ""}
              onClick={() => setViewMode(mode)}
            >
              {mode === "list" ? "List" : "Calendar"}
            </button>
          ))}
        </div>
      </motion.div>

      {cancelError && <div className="appointment-error-alert">{cancelError}</div>}

      {isLoading && <AppointmentSkeleton />}

      {!isLoading && error && (
        <motion.div className="state-box error-box" variants={item}>
          <h3>Unable to load appointments</h3>
          <p>{error}</p>
          <button onClick={() => router.push("/login")}>Go to Login</button>
        </motion.div>
      )}

      {!isLoading && !error && filteredAppointments.length === 0 && (
        <motion.div className="state-box" variants={item}>
          <h3>No appointments found</h3>
          <p>You do not have any appointments for this filter.</p>
          <button onClick={() => router.push("/appointment")}>
            Book New Appointment
          </button>
        </motion.div>
      )}

      {!isLoading &&
        !error &&
        viewMode === "list" &&
        filteredAppointments.length > 0 && (
          <motion.div className="appointments-list" variants={container}>
            {filteredAppointments.map((apt) => (
              <motion.div
                key={apt.id}
                className="appointment-card"
                variants={item}
                whileHover={{
                  y: -4,
                  boxShadow: "0 18px 45px rgba(15, 23, 42, 0.1)",
                }}
              >
                <div className="appointment-date-block">
                  <strong>{apt.day}</strong>
                  <span>{apt.month}</span>
                  <small>{apt.year}</small>
                </div>

                <div className="appointment-main">
                  <div className="appointment-title-row">
                    <div>
                      <h3>{apt.doctor}</h3>
                      <p>{apt.specialty}</p>
                    </div>

                    <span
                      className={`appointment-status ${getStatusClass(
                        apt.status
                      )}`}
                    >
                      {getStatusLabel(apt.status)}
                    </span>
                  </div>

                  <div className="appointment-meta-grid">
                    <div>
                      <span>Time</span>
                      <strong>
                        {apt.startTime} - {apt.endTime}
                      </strong>
                    </div>

                    <div>
                      <span>Consultation</span>
                      <strong>
                        {apt.type === "ONLINE" ? "Online" : "In Person"}
                      </strong>
                    </div>

                    <div>
                      <span>Location</span>
                      <strong>{apt.location}</strong>
                    </div>

                    <div>
                      <span>Payment</span>
                      <strong>{apt.paymentStatus}</strong>
                    </div>
                  </div>

                  <div className="appointment-footer">
                    <p>
                      <span>Code:</span> {apt.appointmentCode}
                    </p>
                    <p>
                      <span>Fee:</span> ৳{apt.consultationFee}
                    </p>
                  </div>
                </div>

                <div className="appointment-actions">
                  {apt.status === "CONFIRMED" && apt.type === "ONLINE" && (
                    <button className="btn-join">Join Call</button>
                  )}

                  {apt.paymentStatus === "UNPAID" &&
                    apt.status !== "CANCELLED" && (
                      <button className="btn-pay">Pay Now</button>
                    )}

                  {apt.status === "PENDING" && (
                    <button
                      className="btn-cancel"
                      onClick={() => openCancelModal(apt.id)}
                      disabled={cancelingId === apt.id}
                    >
                      {cancelingId === apt.id ? "Cancelling..." : "Cancel"}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      {!isLoading && !error && viewMode === "calendar" && (
        <CalendarView appointments={filteredAppointments} />
      )}

      {cancelModal.open && (
        <div className="cancel-modal-overlay" onClick={closeCancelModal}>
          <div className="cancel-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cancel-modal-header">
              <h3>Cancel Appointment</h3>
              <button type="button" onClick={closeCancelModal} disabled={!!cancelingId}>
                ×
              </button>
            </div>

            <p className="cancel-modal-text">
              Please provide a reason for cancelling this appointment.
            </p>

            <div className="cancel-modal-field">
              <label>Cancellation Reason</label>
              <textarea
                value={cancelModal.reason}
                onChange={(e) =>
                  setCancelModal((prev) => ({
                    ...prev,
                    reason: e.target.value,
                    error: "",
                  }))
                }
                placeholder="Example: I am unavailable at this time"
                rows={4}
                disabled={!!cancelingId}
              />
              {cancelModal.error && (
                <span className="cancel-modal-error">{cancelModal.error}</span>
              )}
            </div>

            <div className="cancel-modal-actions">
              <button
                type="button"
                className="btn-modal-secondary"
                onClick={closeCancelModal}
                disabled={!!cancelingId}
              >
                Keep Appointment
              </button>

              <button
                type="button"
                className="btn-modal-danger"
                onClick={handleCancelAppointment}
                disabled={!!cancelingId}
              >
                {cancelingId ? "Cancelling..." : "Confirm Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

    </motion.div>
  );
}