"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/common/Button";
<<<<<<< HEAD
import { Search, X, ChevronDown, User, Calendar, Star, Phone, Mail, MapPin, Stethoscope, Award, Users, Globe } from "lucide-react";
=======
import { API_URL } from "@/config";
>>>>>>> a6e516a82a33d49d7708a2eb578dcda2ef8e9d44

const API_URL1 = `${API_URL}`;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const InitialsFallback = ({ name, accentFrom, accentTo }) => {
  const initials = name
    ?.replace(/^Dr\.?\s*/i, "")
    ?.split(" ")
    ?.map((n) => n[0])
    ?.slice(0, 2)
    ?.join("")
    ?.toUpperCase();

  return (
    <div
      className="dcard__image-wrap"
      style={{
        background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-label={`Avatar for ${name}`}
    >
      <span className="initials-fallback">{initials || "DR"}</span>
    </div>
  );
};

const CONSULTATION_TYPES = ["ONLINE", "OFFLINE"];
const GENDERS = ["Male", "Female"];

const mapDoctorFromApi = (doctor) => {
  const cleanName = doctor.fullName?.replace(/^Dr\.?\s*/i, "") || "Unknown Doctor";

  const hasOnlineSchedule = doctor.schedules?.some(
    (s) => s.consultationType === "ONLINE"
  );

  return {
    id: doctor.id,
    name: cleanName,
    fullName: doctor.fullName || `Dr. ${cleanName}`,
    specialty: doctor.specialization?.name || doctor.subSpecialization || "General Physician",
    specializationId: doctor.specializationId,
    qualification: doctor.qualification || "N/A",
    experience: `${doctor.experienceYears || 0}+ Years`,
    rating: "5.0",
    patients: "500",
    gender: doctor.gender || "",
    branch: doctor.outlet?.outletName || doctor.outlet?.name || "",
    outletId: doctor.outletId,
    consultationType: hasOnlineSchedule ? "ONLINE" : "OFFLINE",
    status: doctor.status,
    raw: doctor,
  };
};

export default function DoctorsGrid() {
  const accentColors = [
    { from: "var(--color-authority)", to: "var(--color-secondary)" },
    { from: "var(--color-primary-dark)", to: "var(--color-primary)" },
    { from: "var(--color-primary)", to: "var(--color-authority)" },
    { from: "var(--color-secondary)", to: "var(--color-primary-dark)" },
  ];

  // Data states
  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [outlets, setOutlets] = useState([]);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [imageErrors, setImageErrors] = useState({});

  // Filter states
  const [nameQuery, setNameQuery] = useState("");
  const [gender, setGender] = useState("");
  const [specialtyId, setSpecialtyId] = useState("");
  const [outletId, setOutletId] = useState("");
  const [consultType, setConsultType] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDoctors, setTotalDoctors] = useState(0);

  // Fetch Specializations
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const res = await fetch(`${API_URL1}/doctor-specializations/getAll`);
        const result = await res.json();
        if (result.success) setSpecializations(result.data || []);
      } catch (err) {
        console.error("Failed to fetch specializations");
      }
    };
    fetchSpecializations();
  }, []);

  // Fetch Outlets (Branches)
  useEffect(() => {
    const fetchOutlets = async () => {
      try {
        const res = await fetch(`${API_URL1}/outlets/getAll`);
        const result = await res.json();
        if (result.success) setOutlets(result.data || []);
      } catch (err) {
        console.error("Failed to fetch outlets");
      }
    };
    fetchOutlets();
  }, []);

  // Fetch Doctors
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setApiError("");

      const params = new URLSearchParams();
      if (nameQuery.trim()) params.append("fullName", nameQuery.trim());
      if (gender) params.append("gender", gender.toUpperCase());
      if (specialtyId) params.append("specializationId", specialtyId);
      if (outletId) params.append("outletId", outletId);
      if (consultType) params.append("consultationType", consultType);
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      const res = await fetch(`${API_URL1}/doctors/getAll?${params}`, {
        method: "GET",
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch doctors.");
      }

      const mappedDoctors = Array.isArray(result.data)
        ? result.data.map(mapDoctorFromApi)
        : [];

      setDoctors(mappedDoctors);
      setTotalPages(result.meta?.totalPages || 1);
      setTotalDoctors(result.meta?.total || 0);
    } catch (error) {
      setApiError(error.message || "Something went wrong while loading doctors.");
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when filters or page changes
  useEffect(() => {
    fetchDoctors();
  }, [nameQuery, gender, specialtyId, outletId, consultType, page]);

  // Active filter pills
  const activePills = useMemo(() => {
    const pills = [];

    if (nameQuery) pills.push({ label: `Name: ${nameQuery}`, clear: () => setNameQuery("") });
    if (gender) pills.push({ label: gender, clear: () => setGender("") });
    if (specialtyId) {
      const spec = specializations.find((s) => s.id === specialtyId);
      pills.push({ label: spec?.name || "Specialty", clear: () => setSpecialtyId("") });
    }
    if (outletId) {
      const outlet = outlets.find((o) => o.id === outletId);
      pills.push({ label: outlet?.outletName || outlet?.name || "Branch", clear: () => setOutletId("") });
    }
    if (consultType) pills.push({ label: consultType, clear: () => setConsultType("") });

    return pills;
  }, [nameQuery, gender, specialtyId, outletId, consultType, specializations, outlets]);

  const clearAll = () => {
    setNameQuery("");
    setGender("");
    setSpecialtyId("");
    setOutletId("");
    setConsultType("");
    setPage(1);
  };

  return (
    <div id="doctors" className="doctors-section-wrapper">
      <div className="dfilter-card">
        <p className="dfilter-label">
          <Stethoscope size={13} style={{ marginRight: 5, verticalAlign: "-1px" }} />
          Find a Doctor
        </p>

        <div className="dfilter-top">
          <div className="dfilter-search-wrap">
            <span className="dfilter-search-icon">
              <Search size={17} />
            </span>
            <input
              className="dfilter-input"
              type="text"
              placeholder="Search by doctor name…"
              value={nameQuery}
              onChange={(e) => setNameQuery(e.target.value)}
              aria-label="Search by doctor name"
            />
            {nameQuery && (
              <button className="dfilter-input-clear" onClick={() => setNameQuery("")} aria-label="Clear name search">
                <X size={11} />
              </button>
            )}
          </div>

          <button className="btn btn-primary" onClick={fetchDoctors}>
            <Search size={17} /> Search
          </button>

          {activePills.length > 0 && (
            <button className="btn btn-secondary" onClick={clearAll}>
              <X size={11} /> Clear all
            </button>
          )}
        </div>

        <div className="dfilter-selects">
          {/* Gender */}
          <div className="dfilter-select-wrap">
            <select
              className="dfilter-select"
              value={gender}
              onChange={(e) => { setGender(e.target.value); setPage(1); }}
            >
              <option value="">All Genders</option>
              {GENDERS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <span className="dfilter-chevron"><ChevronDown size={14} /></span>
          </div>

          {/* Specialization */}
          <div className="dfilter-select-wrap">
            <select
              className="dfilter-select"
              value={specialtyId}
              onChange={(e) => { setSpecialtyId(e.target.value); setPage(1); }}
            >
              <option value="">All Specialties</option>
              {specializations.map((spec) => (
                <option key={spec.id} value={spec.id}>
                  {spec.name}
                </option>
              ))}
            </select>
            <span className="dfilter-chevron"><ChevronDown size={14} /></span>
          </div>

          {/* Branch / Outlet */}
          <div className="dfilter-select-wrap">
            <select
              className="dfilter-select"
              value={outletId}
              onChange={(e) => { setOutletId(e.target.value); setPage(1); }}
            >
              <option value="">All Branches</option>
              {outlets.map((outlet) => (
                <option key={outlet.id} value={outlet.id}>
                  {outlet?.outletName || outlet?.name}
                </option>
              ))}
            </select>
            <span className="dfilter-chevron"><ChevronDown size={14} /></span>
          </div>

          {/* Consultation Type */}
          <div className="dfilter-select-wrap">
            <select
              className="dfilter-select"
              value={consultType}
              onChange={(e) => { setConsultType(e.target.value); setPage(1); }}
            >
              <option value="">Consultation Type</option>
              {CONSULTATION_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <span className="dfilter-chevron"><ChevronDown size={14} /></span>
          </div>
        </div>

        {activePills.length > 0 && (
          <div className="dfilter-pills">
            {activePills.map(({ label, clear }, index) => (
              <button key={index} className="dfilter-pill" onClick={clear}>
                {label} <X size={11} />
              </button>
            ))}
          </div>
        )}

        <div className="dfilter-footer">
          <span className="dfilter-count">
            <strong>{totalDoctors}</strong> doctor{totalDoctors !== 1 ? "s" : ""} found
          </span>
        </div>
      </div>

      {/* States */}
      {loading ? (
        <div className="dfilter-empty"><p>Loading doctors...</p></div>
      ) : apiError ? (
        <div className="dfilter-empty">
          <p>{apiError}</p>
          <button className="btn btn-primary" onClick={fetchDoctors}>Try again</button>
        </div>
      ) : doctors.length === 0 ? (
        <div className="dfilter-empty">
          <Search size={40} strokeWidth={1.5} />
          <p>No doctors match your filters.</p>
          <button className="btn btn-primary" onClick={clearAll}>Clear filters</button>
        </div>
      ) : (
        <motion.div
          className="doctors-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {doctors.map((doc, index) => {
            const accent = accentColors[index % accentColors.length];
            const hasImageError = imageErrors[doc.id];

            return (
              <motion.article
                key={doc.id}
                className="dcard"
                style={{ "--accent-from": accent.from, "--accent-to": accent.to }}
                variants={fadeInUp}
              >
                <div className="dcard__accent-bar" aria-hidden="true" />

                <motion.div
                  className="dcard__visual"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <div className="dcard__image-ring" aria-hidden="true" />

                  {hasImageError ? (
                    <InitialsFallback name={doc.name} accentFrom={accent.from} accentTo={accent.to} />
                  ) : (
                    <motion.div
                      className="dcard__image-wrap"
                      style={{ position: "relative" }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&auto=format&fit=crop&q=60"
                        alt={`Dr. ${doc.name}`}
                        fill
                        sizes="(max-width: 559px) 80px, (max-width: 1023px) 120px, 180px"
                        className="dcard__image"
                        onError={() => setImageErrors((prev) => ({ ...prev, [doc.id]: true }))}
                        priority={index < 4}
                      />
                    </motion.div>
                  )}

                  <motion.div className="dcard__status" role="status">
                    <span className="dcard__status-dot" aria-hidden="true" />
                    <span className="dcard__status-text">
                      {doc.status === "ACTIVE" ? "Available" : "Unavailable"}
                    </span>
                  </motion.div>
                </motion.div>

                <div className="dcard__body">
                  <motion.h3 className="dcard__name">Dr. {doc.name}</motion.h3>
                  <motion.p className="dcard__specialty">{doc.specialty}</motion.p>
                  <motion.p className="dcard__qualification">{doc.qualification}</motion.p>

                  <motion.div className="dcard__stats">
                    <div className="dcard__stat">
                      <span className="dcard__stat-value">{doc.experience}</span>
                      <span className="dcard__stat-label">Experience</span>
                    </div>
                    <div className="dcard__stat-divider" />
                    <div className="dcard__stat">
                      <span className="dcard__stat-value"><Star size={14} fill="currentColor" stroke="none" /> {doc.rating}</span>
                      <span className="dcard__stat-label">Rating</span>
                    </div>
                    <div className="dcard__stat-divider" />
                    <div className="dcard__stat">
                      <span className="dcard__stat-value">{doc.patients}+</span>
                      <span className="dcard__stat-label">Patients</span>
                    </div>
                  </motion.div>

                  <motion.div className="dcard-cta-group">
                    <Button variant="secondary" href={`/doctors/${doc.id}`}>
                      <User size={16} /> Profile
                    </Button>
                    <Button variant="primary" href={`/appointment?doctor=${doc.id}`}>
                      <Calendar size={16} /> Appointment
                    </Button>
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination" style={{ textAlign: "center", marginTop: "30px" }}>
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} style={{ marginRight: "10px" }}>
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} style={{ marginLeft: "10px" }}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}