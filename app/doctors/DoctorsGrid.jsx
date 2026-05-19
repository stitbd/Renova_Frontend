"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { doctors } from "@/constants/siteData";
import Button from "@/components/common/Button";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const ProfileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-status-warning)" stroke="none" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const XIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const InitialsFallback = ({ name, accentFrom, accentTo }) => {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className="dcard__image-wrap" style={{ background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})`, display: "flex", alignItems: "center", justifyContent: "center" }} aria-label={`Avatar for ${name}`}>
      <span className="initials-fallback">{initials}</span>
    </div>
  );
};

// ── Specialties & branches derived from data ──────────────────
const SPECIALTIES = [...new Set(doctors.map((d) => d.specialty))];
const BRANCHES = ["Gulshan Branch", "Mirpur Branch", "Dhanmondi Branch"]; // update as needed
const CONSULTATION_TYPES = ["Face to Face", "Video / Audio Call"];
const GENDERS = ["Male", "Female"];

export default function DoctorsGrid() {
  const accentColors = [
    { from: "var(--color-authority)", to: "var(--color-secondary)" },
    { from: "var(--color-primary-dark)", to: "var(--color-primary)" },
    { from: "var(--color-primary)", to: "var(--color-authority)" },
    { from: "var(--color-secondary)", to: "var(--color-primary-dark)" },
  ];

  const [imageErrors, setImageErrors] = useState({});

  // ── Filter state ──────────────────────────────────────────────
  const [nameQuery, setNameQuery] = useState("");
  const [gender, setGender] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [branch, setBranch] = useState("");
  const [consultType, setConsultType] = useState("");

  // ── Active filter pills ───────────────────────────────────────
  const activePills = [
    nameQuery && { label: `Name: ${nameQuery}`, clear: () => setNameQuery("") },
    gender && { label: gender, clear: () => setGender("") },
    specialty && { label: specialty, clear: () => setSpecialty("") },
    branch && { label: branch, clear: () => setBranch("") },
    consultType && { label: consultType, clear: () => setConsultType("") },
  ].filter(Boolean);

  const clearAll = () => {
    setNameQuery(""); setGender(""); setSpecialty(""); setBranch(""); setConsultType("");
  };

  // ── Filtered doctors ──────────────────────────────────────────
  // Note: gender, branch, consultType are not in the data model yet.
  // They filter against doc.gender, doc.branch, doc.consultationType if present.
  // For now they act as UI-ready filters that will work once data fields are added.
  const filtered = useMemo(() => {
    return doctors.filter((doc) => {
      if (nameQuery && !doc.name.toLowerCase().includes(nameQuery.toLowerCase())) return false;
      if (specialty && doc.specialty !== specialty) return false;
      if (gender && doc.gender && doc.gender !== gender) return false;
      if (branch && doc.branch && doc.branch !== branch) return false;
      if (consultType && doc.consultationType && doc.consultationType !== consultType) return false;
      return true;
    });
  }, [nameQuery, gender, specialty, branch, consultType]);

  return (
    <div id="doctors" className="doctors-section-wrapper">

      {/* ── Filter Bar ───────────────────────────────────────── */}
      <div className="dfilter-card">
        <p className="dfilter-label">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" style={{ marginRight: 5, verticalAlign: "-1px" }}>
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
          Find a Doctor
        </p>

        {/* Search row */}
        <div className="dfilter-top">
          <div className="dfilter-search-wrap">
            <span className="dfilter-search-icon"><SearchIcon /></span>
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
                <XIcon />
              </button>
            )}
          </div>
          <button className="btn btn-primary" onClick={() => {}}>
            <SearchIcon /> Search
          </button>
          {activePills.length > 0 && (
            <button className="btn btn-secondary" onClick={clearAll}>
              <XIcon /> Clear all
            </button>
          )}
        </div>

        {/* Filter dropdowns */}
        <div className="dfilter-selects">
          {[
            { value: gender, setter: setGender, options: GENDERS, placeholder: "All Genders" },
            { value: specialty, setter: setSpecialty, options: SPECIALTIES, placeholder: "All Specialties" },
            { value: branch, setter: setBranch, options: BRANCHES, placeholder: "All Branches" },
            { value: consultType, setter: setConsultType, options: CONSULTATION_TYPES, placeholder: "Consultation Type" },
          ].map(({ value, setter, options, placeholder }) => (
            <div className="dfilter-select-wrap" key={placeholder}>
              <select
                className="dfilter-select"
                value={value}
                onChange={(e) => setter(e.target.value)}
                aria-label={placeholder}
              >
                <option value="">{placeholder}</option>
                {options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              <span className="dfilter-chevron"><ChevronIcon /></span>
            </div>
          ))}
        </div>

        {/* Active filter pills */}
        {activePills.length > 0 && (
          <div className="dfilter-pills">
            {activePills.map(({ label, clear }) => (
              <button key={label} className="dfilter-pill" onClick={clear}>
                {label} <XIcon />
              </button>
            ))}
          </div>
        )}

        {/* Results count */}
        <div className="dfilter-footer">
          <span className="dfilter-count">
            <strong>{filtered.length}</strong> doctor{filtered.length !== 1 ? "s" : ""} found
          </span>
          {activePills.length === 0 && (
            <span className="dfilter-hint">Use one or more filters to narrow results</span>
          )}
        </div>
      </div>

      {/* ── Doctors Grid ─────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="dfilter-empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
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
          {filtered.map((doc, index) => {
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

                <motion.div className="dcard__visual" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
                  <div className="dcard__image-ring" aria-hidden="true" />
                  {hasImageError ? (
                    <InitialsFallback name={doc.name} accentFrom={accent.from} accentTo={accent.to} />
                  ) : (
                    <motion.div className="dcard__image-wrap" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                      <Image
                        src={`/images/doctors/doctor-${doc.id}.jpg`}
                        alt={`Portrait of Dr. ${doc.name}`}
                        fill
                        sizes="(max-width: 559px) 80px, (max-width: 1023px) 120px, 180px"
                        className="dcard__image"
                        onError={() => setImageErrors((prev) => ({ ...prev, [doc.id]: true }))}
                        priority={index < 4}
                      />
                    </motion.div>
                  )}
                  <motion.div className="dcard__status" role="status" aria-label="Available for appointments" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                    <span className="dcard__status-dot" aria-hidden="true" />
                    <span className="dcard__status-text">Available</span>
                  </motion.div>
                </motion.div>

                <div className="dcard__body">
                  <motion.h3 className="dcard__name" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    Dr. {doc.name}
                  </motion.h3>
                  <motion.p className="dcard__specialty" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>{doc.specialty}</motion.p>
                  <motion.p className="dcard__qualification" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>{doc.qualification}</motion.p>

                  <motion.div className="dcard__stats" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                    <div className="dcard__stat">
                      <span className="dcard__stat-value">{doc.experience}</span>
                      <span className="dcard__stat-label">Experience</span>
                    </div>
                    <div className="dcard__stat-divider" aria-hidden="true" />
                    <div className="dcard__stat">
                      <span className="dcard__stat-value"><StarIcon />{doc.rating}</span>
                      <span className="dcard__stat-label">Rating</span>
                    </div>
                    <div className="dcard__stat-divider" aria-hidden="true" />
                    <div className="dcard__stat">
                      <span className="dcard__stat-value">{doc.patients}+</span>
                      <span className="dcard__stat-label">Patients</span>
                    </div>
                  </motion.div>

                  <motion.div className="dcard-cta-group" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <Button variant="secondary" href={`/doctors/${doc.id}`}><ProfileIcon /> Profile</Button>
                    <Button variant="primary" href={`/appointment?doctor=${doc.id}`}><CalendarIcon /> Appointment</Button>
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}