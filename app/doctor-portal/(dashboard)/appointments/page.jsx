// app/doctor-portal/appointments/page.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hook";
import "./appointments.css";

const API_URL = "http://localhost:5001/api/v1/appointments/my";
const TZ = "Asia/Dhaka";

const STATUS_FILTERS = [
  { label: "All Status", value: "ALL" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];

function formatDate(date) {
  if (!date) return "N/A";

  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
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

function isToday(date) {
  return getDateKey(date) === getDateKey(new Date());
}

function isTomorrow(date) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return getDateKey(date) === getDateKey(tomorrow);
}

function getInitials(name) {
  return String(name || "Patient")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function normalizeAppointment(apt) {
  return {
    id: apt.id,
    appointmentCode: apt.appointmentCode,
    patientId: apt.patientId,
    patientName: apt.patient?.fullName || apt.patientName || "Unknown Patient",
    patientPhone: apt.patient?.mobileNumber || apt.patientPhone || "N/A",
    patientGender: apt.patient?.gender || apt.patientGender || "N/A",
    patientAge: apt.patient?.age || "N/A",
    reason: apt.reason || "No reason provided",
    appointmentDateRaw: apt.appointmentDate,
    startTimeRaw: apt.startTime,
    appointmentDate: formatDate(apt.appointmentDate),
    startTime: formatTime(apt.startTime),
    endTime: formatTime(apt.endTime),
    type: apt.type,
    status: apt.status,
    paymentStatus: apt.paymentStatus,
    consultationFee: apt.consultationFee,
  };
}

function statusMeta(status) {
  switch (status) {
    case "CONFIRMED":
      return { cls: "apt-badge-confirmed", label: "Confirmed" };
    case "COMPLETED":
      return { cls: "apt-badge-completed", label: "Completed" };
    case "CANCELLED":
      return { cls: "apt-badge-cancelled", label: "Cancelled" };
    default:
      return { cls: "apt-badge-confirmed", label: status };
  }
}

function AppointmentsSkeleton() {
  return (
    <div className="apt-list">
      {[1, 2, 3].map((item) => (
        <div className="apt-card" key={item}>
          <div className="apt-time-block">
            <span className="apt-date-lbl">Loading</span>
            <span className="apt-time-val">--:--</span>
          </div>
          <div className="apt-patient-block">
            <div className="apt-avatar">--</div>
            <div className="apt-patient-info">
              <h4 className="apt-patient-name">Loading appointment...</h4>
              <p className="apt-patient-meta">Please wait</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AppointmentsPage() {
  const token = useAppSelector((state) => state.auth.accessToken);

  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("today");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isLoading, setIsLoading] = useState(Boolean(token));
  const [error, setError] = useState("");

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

  const normalizedAppointments = useMemo(() => {
    return appointments
      .filter((apt) => apt.status !== "PENDING")
      .map(normalizeAppointment);
  }, [appointments]);

  const visibleList = useMemo(() => {
    let list = [...normalizedAppointments];

    if (selectedDate === "today") {
      list = list.filter((apt) => isToday(apt.appointmentDateRaw));
    }

    if (selectedDate === "tomorrow") {
      list = list.filter((apt) => isTomorrow(apt.appointmentDateRaw));
    }

    if (statusFilter !== "ALL") {
      list = list.filter((apt) => apt.status === statusFilter);
    }

    const now = Date.now();

    return list.sort((a, b) => {
      const aIsBottom = ["COMPLETED", "CANCELLED"].includes(a.status);
      const bIsBottom = ["COMPLETED", "CANCELLED"].includes(b.status);

      if (aIsBottom && !bIsBottom) return 1;
      if (!aIsBottom && bIsBottom) return -1;

      const aTime = new Date(a.startTimeRaw || a.appointmentDateRaw).getTime();
      const bTime = new Date(b.startTimeRaw || b.appointmentDateRaw).getTime();

      if (!aIsBottom && !bIsBottom) {
        const aDistance = Math.abs(aTime - now);
        const bDistance = Math.abs(bTime - now);

        return aDistance - bDistance;
      }

      return bTime - aTime;
    });
  }, [normalizedAppointments, selectedDate, statusFilter]);

  const stats = useMemo(() => {
    return {
      today: normalizedAppointments.filter((apt) => isToday(apt.appointmentDateRaw)).length,
      confirmed: normalizedAppointments.filter((apt) => apt.status === "CONFIRMED").length,
      completed: normalizedAppointments.filter((apt) => apt.status === "COMPLETED").length,
      cancelled: normalizedAppointments.filter((apt) => apt.status === "CANCELLED").length,
      total: normalizedAppointments.length,
    };
  }, [normalizedAppointments]);


  // console.log('visibleList', visibleList)


  return (
    <div className="dashboard-content">
      <div className="apt-summary-bar">
        <div className="apt-sum-card">
          <span className="apt-sum-num">{stats.today}</span>
          <span className="apt-sum-lbl">Today</span>
        </div>

        <div className="apt-sum-card">
          <span className="apt-sum-num">{stats.confirmed}</span>
          <span className="apt-sum-lbl">Confirmed</span>
        </div>

        <div className="apt-sum-card">
          <span className="apt-sum-num">{stats.completed}</span>
          <span className="apt-sum-lbl">Completed</span>
        </div>

        <div className="apt-sum-card">
          <span className="apt-sum-num">{stats.cancelled}</span>
          <span className="apt-sum-lbl">Cancelled</span>
        </div>

        <div className="apt-sum-card">
          <span className="apt-sum-num">{stats.total}</span>
          <span className="apt-sum-lbl">Total</span>
        </div>
      </div>

      <div className="apt-controls">
        <div className="apt-date-tabs">
          {["today", "tomorrow", "all"].map((date) => (
            <button
              key={date}
              className={`apt-date-btn${selectedDate === date ? " active" : ""}`}
              onClick={() => setSelectedDate(date)}
            >
              {date === "today" ? "Today" : date === "tomorrow" ? "Tomorrow" : "All"}
            </button>
          ))}
        </div>

        <select
          className="apt-status-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {STATUS_FILTERS.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      {isLoading && <AppointmentsSkeleton />}

      {!isLoading && error && (
        <div className="apt-empty">
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && visibleList.length === 0 && (
        <div className="apt-empty">
          <p>No appointments found</p>
        </div>
      )}

      {!isLoading && !error && visibleList.length > 0 && (
        <div className="apt-list">
          {visibleList.map((apt) => {
            const { cls, label } = statusMeta(apt.status);
            const isDisabled = apt.status === "COMPLETED" || apt.status === "CANCELLED";

            return (
              <div
                key={apt.id}
                className={`apt-card${isDisabled ? " apt-card-done" : ""}`}
              >
                <div className="apt-time-block">
                  <span className="apt-date-lbl">{apt.appointmentDate}</span>
                  <span className="apt-time-val">{apt.startTime}</span>
                </div>

                <div className="apt-patient-block">
                  <div className="apt-avatar">
                    {getInitials(apt.patientName)}
                  </div>

                  <div className="apt-patient-info">
                    <h4 className="apt-patient-name">{apt.patientName}</h4>

                    <p className="apt-patient-meta">
                      {apt.patientAge} yrs • {apt.patientGender} • {apt.patientPhone}
                    </p>

                    <p className="apt-type">
                      {apt.type === "ONLINE" ? "Online Consultation" : "In-Person Visit"}
                    </p>

                    <p className="apt-issue">{apt.reason}</p>

                  </div>
                </div>

                <div className="apt-actions-block">
                  <span className={`apt-status-badge ${cls}`}>{label}</span>

                  <div className="apt-action-btns">
                    <Link
                      href={`/doctor-portal/messages?receiverId=${apt.patientId}&appointmentId=${apt.id}`}
                      className="apt-action-btn message-btn"
                    >
                      Message
                    </Link>

                    <Link
                      href={`/doctor-portal/patients/patient-profile?id=${apt?.patientId}`}
                      className="apt-action-btn details-btn"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                      </svg>
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}