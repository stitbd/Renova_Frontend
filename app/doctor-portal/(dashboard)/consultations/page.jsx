// app/doctor-portal/consultations/page.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { API_URL } from "@/config";
import { useAppSelector } from "@/redux/hook";
import "./consultations.css";

const typeColors = {
  ONLINE: { bg: "#eff6ff", color: "#1e40af", label: "Video" },
  VIDEO: { bg: "#eff6ff", color: "#1e40af", label: "Video" },
  IN_PERSON: { bg: "#f0fdf4", color: "#166534", label: "In-person" },
};

function Icon({ type, cls = "" }) {
  const icons = {
    users: (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    money: (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    clock: (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    calendar: (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    rx: (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414A1 1 0 0 1 19 9.414V19a2 2 0 0 1-2 2z" />
      </svg>
    ),
    search: (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
    user: (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    file: (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    chevDown: (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    ),
    chevUp: (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    ),
  };

  return icons[type] || null;
}

const formatCurrency = (value) => {
  const amount = Number(value || 0);
  return `৳${amount.toLocaleString("en-BD")}`;
};

const formatFollowUp = (date) => {
  if (!date) return "None";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const normalizeType = (type) => {
  if (!type) return "IN_PERSON";
  return String(type).toUpperCase();
};

const getInitials = (name = "") => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

export default function ConsultationsPage() {
  const token = useAppSelector((state) => state.auth.accessToken);

  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const fetchConsultations = async () => {
    if (!token) return;

    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch(`${API_URL}/appointments/doctor/consultations`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result?.message || "Failed to load consultations.");
      }

      setConsultations(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      setConsultations([]);
      setErrorMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, [token]);

  const stats = useMemo(() => {
    const totalRevenue = consultations.reduce(
      (sum, item) => sum + Number(item.consultation?.fee || 0),
      0
    );

    const totalDuration = consultations.reduce(
      (sum, item) => sum + Number(item.consultation?.duration || 0),
      0
    );

    const avgDuration = consultations.length
      ? Math.round(totalDuration / consultations.length)
      : 0;

    const followUps = consultations.filter((item) => Boolean(item.followUpDate)).length;
    const prescriptions = consultations.filter((item) => Boolean(item.prescription?.id)).length;

    return [
      {
        label: "Total Consultations",
        value: consultations.length,
        sub: "Completed encounters",
        icon: "users",
        className: "total-icon",
      },
      {
        label: "Total Revenue",
        value: formatCurrency(totalRevenue),
        sub: "Consultation fees",
        icon: "money",
        className: "revenue-icon",
      },
      {
        label: "Avg Duration",
        value: `${avgDuration} min`,
        sub: "Per consultation",
        icon: "clock",
        className: "duration-icon",
      },
      {
        label: "Follow-ups",
        value: followUps,
        sub: "Scheduled follow-ups",
        icon: "calendar",
        className: "followup-icon",
      },
      {
        label: "Prescriptions",
        value: prescriptions,
        sub: "Issued prescriptions",
        icon: "rx",
        className: "rx-icon",
      },
    ];
  }, [consultations]);

  const filteredConsultations = useMemo(() => {
    const query = search.trim().toLowerCase();

    return consultations.filter((item) => {
      const consultationType = normalizeType(item.consultation?.type);

      const matchesType =
        typeFilter === "all" ||
        consultationType === typeFilter ||
        typeColors[consultationType]?.label === typeFilter;

      const searchableText = [
        item.appointmentCode,
        item.patient?.fullName,
        item.patient?.phone,
        item.patient?.id,
        item.clinical?.chiefComplaint,
        item.clinical?.diagnosis,
        item.clinical?.advice,
        item.prescription?.code,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchableText.includes(query);

      return matchesType && matchesSearch;
    });
  }, [consultations, search, typeFilter]);

  return (
    <div className="dashboard-content">
      <div className="con-stats-row">
        {stats.map((stat) => (
          <div key={stat.label} className="con-stat-card">
            <div className={`con-stat-icon ${stat.className}`}>
              <Icon type={stat.icon} />
            </div>

            <div>
              <span className="con-stat-num">{stat.value}</span>
              <span className="con-stat-lbl">{stat.label}</span>
              <span className="con-stat-lbl" style={{ fontSize: 11, opacity: 0.7 }}>
                {stat.sub}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="con-controls">
        <div className="con-search">
          <Icon type="search" />
          <input
            type="text"
            placeholder="Search by patient, phone, appointment, diagnosis, or prescription..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="con-type-filters">
          {[
            { value: "all", label: "All Types" },
            { value: "IN_PERSON", label: "In-person" },
            { value: "ONLINE", label: "Video" },
          ].map((item) => (
            <button
              key={item.value}
              className={`con-type-btn${typeFilter === item.value ? " active" : ""}`}
              onClick={() => setTypeFilter(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
        
      </div>

      <div className="con-list">
        {loading && (
          <div className="con-empty">
            <p>Loading consultations...</p>
          </div>
        )}

        {!loading && errorMessage && (
          <div className="con-empty">
            <p style={{ color: "#b91c1c" }}>{errorMessage}</p>
          </div>
        )}

        {!loading && !errorMessage && filteredConsultations.length === 0 && (
          <div className="con-empty">
            <Icon type="file" />
            <p>No consultations found</p>
          </div>
        )}

        {!loading &&
          !errorMessage &&
          filteredConsultations.map((item) => {
            const typeKey = normalizeType(item.consultation?.type);
            const typeMeta = typeColors[typeKey] || typeColors.IN_PERSON;
            const isOpen = expanded === item.appointmentId;
            const hasPrescription = Boolean(item.prescription?.id);

            return (
              <div key={item.appointmentId} className="con-card">
                <div className="con-card-header">
                  <div className="con-patient-block">
                    <div className="con-avatar">
                      <span className="con-avatar-fallback" style={{ display: "flex" }}>
                        {getInitials(item.patient?.fullName) || <Icon type="user" />}
                      </span>
                    </div>

                    <div>
                      <div className="con-name-row">
                        <h3 className="con-patient-name">
                          {item.patient?.fullName || "Unknown Patient"}
                        </h3>

                        <span
                          className="con-type-pill"
                          style={{ background: typeMeta.bg, color: typeMeta.color }}
                        >
                          {typeMeta.label}
                        </span>

                        <span className="con-rx-pill">
                          {hasPrescription ? "Rx Issued" : "No Rx"}
                        </span>
                      </div>

                      <p className="con-patient-meta">
                        {item.patient?.age || "N/A"} yrs • {item.patient?.gender || "N/A"} •{" "}
                        {item.patient?.phone || "N/A"}
                      </p>

                      <p className="con-condition">
                        {item.clinical?.chiefComplaint || "No chief complaint recorded"}
                      </p>
                    </div>
                  </div>

                  <div className="con-meta-block">
                    <div className="con-meta-row">
                      <Icon type="calendar" cls="con-meta-icon" />
                      <span>
                        {item.consultation?.date || "N/A"}, {item.consultation?.startTime || ""}
                      </span>
                    </div>

                    <div className="con-meta-row">
                      <Icon type="clock" cls="con-meta-icon" />
                      <span>{item.consultation?.duration || 0} min</span>
                    </div>

                    <div className="con-fee-badge">
                      {formatCurrency(item.consultation?.fee)}
                    </div>
                  </div>
                </div>

                <div className="con-details-row">
                  <div className="con-detail-item">
                    <span className="con-detail-lbl">Diagnosis</span>
                    <span className="con-detail-val">
                      {item.clinical?.diagnosis || "N/A"}
                    </span>
                  </div>

                  <div className="con-detail-item">
                    <span className="con-detail-lbl">Treatment Advice</span>
                    <span className="con-detail-val">
                      {item.clinical?.advice || "N/A"}
                    </span>
                  </div>

                  <div className="con-detail-item">
                    <span className="con-detail-lbl">Follow-up</span>
                    <span
                      className={`con-detail-val${
                        item.followUpDate ? " has-followup" : " no-followup"
                      }`}
                    >
                      {formatFollowUp(item.followUpDate)}
                    </span>
                  </div>
                </div>

                {isOpen && (
                  <div className="con-notes-row">
                    <div className="con-notes-block">
                      <span className="con-notes-lbl">Consultation Summary</span>
                      <p className="con-notes-text">
                        {item.clinical?.chiefComplaint || "No chief complaint"}{" "}
                        {item.clinical?.diagnosis
                          ? `Diagnosis: ${item.clinical.diagnosis}.`
                          : ""}
                      </p>
                    </div>

                    <div className="con-extra-grid">
                      <div className="con-extra-item">
                        <span className="con-extra-lbl">Appointment Code</span>
                        <span className="con-extra-val">{item.appointmentCode}</span>
                      </div>

                      <div className="con-extra-item">
                        <span className="con-extra-lbl">Time</span>
                        <span className="con-extra-val">
                          {item.consultation?.startTime} - {item.consultation?.endTime}
                        </span>
                      </div>

                      <div className="con-extra-item">
                        <span className="con-extra-lbl">Payment</span>
                        <span className="con-extra-val">
                          {item.consultation?.paymentStatus || "N/A"}
                        </span>
                      </div>

                      <div className="con-extra-item">
                        <span className="con-extra-lbl">Prescription</span>
                        <span className="con-extra-val">
                          {hasPrescription ? item.prescription.code : "Not issued"}
                        </span>
                      </div>

                      <div className="con-extra-item">
                        <span className="con-extra-lbl">Medicines</span>
                        <span className="con-extra-val">
                          {item.prescription?.medicinesCount || 0}
                        </span>
                      </div>

                      <div className="con-extra-item">
                        <span className="con-extra-lbl">Tests</span>
                        <span className="con-extra-val">
                          {item.prescription?.testsCount || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="con-actions">
                  <div className="con-action-btns">
                    {hasPrescription && (
                      <Link
                        href={`/doctor-portal/prescriptions/prescriptions-details?id=${item.prescription.id}`}
                        className="con-btn prescription"
                      >
                        <Icon type="rx" />
                        View Prescription
                      </Link>
                    )}

                    <Link
                      href={`/doctor-portal/patients/patient-profile?id=${item.patient?.id}&from=/doctor-portal/consultations`}
                      className="con-btn profile"
                    >
                      <Icon type="user" />
                      Patient Profile
                    </Link>
                  </div>

                  <button
                    type="button"
                    className="con-expand-btn"
                    onClick={() => setExpanded(isOpen ? null : item.appointmentId)}
                  >
                    {isOpen ? (
                      <>
                        Less <Icon type="chevUp" />
                      </>
                    ) : (
                      <>
                        More <Icon type="chevDown" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}