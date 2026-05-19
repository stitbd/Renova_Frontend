"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { doctors } from "@/constants/siteData";
import Button from "@/components/common/Button";

// ── Animation Variants ───────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// ── Icons ─────────────────────────────────────────────────────
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

// ── Initials Fallback Component ───────────────────────────────
const InitialsFallback = ({ name, accentFrom, accentTo }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

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
      <span className="initials-fallback">{initials}</span>
    </div>
  );
};

// ── Main DoctorsGrid Component ────────────────────────────────
export default function DoctorsGrid() {
  const accentColors = [
    { from: "var(--color-authority)", to: "var(--color-secondary)" },
    { from: "var(--color-primary-dark)", to: "var(--color-primary)" },
    { from: "var(--color-primary)", to: "var(--color-authority)" },
    { from: "var(--color-secondary)", to: "var(--color-primary-dark)" },
  ];

  const [imageErrors, setImageErrors] = useState({});

  return (
    <div id="doctors" className="doctors-section-wrapper">
      
      {/* Section Header */}
      <motion.header 
        className="doctors-header-wrapper"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="doctors-label-pill">
          <span className="doctors-label-dot" aria-hidden="true" />
          Meet Our Team
        </div>
        <h2 className="doctors-heading">
          Expert Specialists, <span className="doctors-heading-accent">Compassionate Care</span>
        </h2>
        <p className="doctors-subheading">
          Our doctors bring decades of experience and international training to
          deliver the best healthcare in Bangladesh.
        </p>
      </motion.header>

      {/* Doctors Grid with Staggered Animations */}
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
              style={{
                "--accent-from": accent.from,
                "--accent-to": accent.to,
              }}
              variants={fadeInUp}
            >
              {/* Top accent line */}
              <div className="dcard__accent-bar" aria-hidden="true" />

              {/* Image / Avatar Section */}
              <motion.div 
                className="dcard__visual"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <div className="dcard__image-ring" aria-hidden="true" />
                
                {hasImageError ? (
                  <InitialsFallback 
                    name={doc.name} 
                    accentFrom={accent.from} 
                    accentTo={accent.to} 
                  />
                ) : (
                  <motion.div 
                    className="dcard__image-wrap"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
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

                {/* Availability Badge */}
                <motion.div 
                  className="dcard__status" 
                  role="status" 
                  aria-label="Available for appointments"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <span className="dcard__status-dot" aria-hidden="true" />
                  <span className="dcard__status-text">Available</span>
                </motion.div>
              </motion.div>

              {/* Card Body Content */}
              <div className="dcard__body">
                <motion.h3 
                  className="dcard__name"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Dr. {doc.name}
                </motion.h3>
                
                <motion.p 
                  className="dcard__specialty"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {doc.specialty}
                </motion.p>
                
                <motion.p 
                  className="dcard__qualification"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {doc.qualification}
                </motion.p>

                {/* Stats Row */}
                <motion.div 
                  className="dcard__stats"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="dcard__stat">
                    <span className="dcard__stat-value">{doc.experience}</span>
                    <span className="dcard__stat-label">Experience</span>
                  </div>
                  <div className="dcard__stat-divider" aria-hidden="true" />
                  <div className="dcard__stat">
                    <span className="dcard__stat-value">
                      <StarIcon />
                      {doc.rating}
                    </span>
                    <span className="dcard__stat-label">Rating</span>
                  </div>
                  <div className="dcard__stat-divider" aria-hidden="true" />
                  <div className="dcard__stat">
                    <span className="dcard__stat-value">{doc.patients}+</span>
                    <span className="dcard__stat-label">Patients</span>
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div 
                  className="dcard-cta-group"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Button variant="secondary" href={`/doctors/${doc.id}`}>
                    <ProfileIcon /> Profile
                  </Button>
                  <Button variant="primary" href={`/appointment?doctor=${doc.id}`}>
                    <CalendarIcon /> Appointment
                  </Button>
                </motion.div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  );
}