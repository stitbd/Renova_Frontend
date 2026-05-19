"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { doctors } from "@/constants/siteData";
import Button from "@/components/common/Button"
import { Section, SectionHeader } from "@/components/common/Section";
import "./DoctorsSection.css";

// Animation variants - Same as AboutSection
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--color-status-warning)" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// ── Initials Fallback Component (JSX - No TypeScript) ─────────
const InitialsFallback = ({ name, accentFrom, accentTo }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div 
      className="dcard__image-wrap"
      style={{ 
        background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "2rem",
        fontWeight: "var(--font-weight-bold)",
      }}
      aria-label={`${name} - photo unavailable`}
    >
      <span className="initials-fallback">{initials}</span>
    </div>
  );
};

export default function DoctorsSection() {
  const accentColors = [
    { from: "var(--color-authority)", to: "var(--color-secondary)" },
    { from: "var(--color-primary-dark)", to: "var(--color-primary)" },
    { from: "var(--color-primary)", to: "var(--color-authority)" },
    { from: "var(--color-secondary)", to: "var(--color-primary-dark)" },
  ];

  const [imageErrors, setImageErrors] = useState({});

  // ✅ NEW: Show only first 4 doctors on home page section
  const displayedDoctors = doctors.slice(0, 4);

  return (
    <Section id="doctors" variant="alternate">
      
      {/* Section Header with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeader
          label="Meet Our Medical Team"
          title="Expert Specialists, <span class='section-heading-accent'>Compassionate Care</span>"
          subtitle="Our doctors bring decades of experience and international training to
            deliver the best healthcare in Bangladesh."
        />
      </motion.div>

      {/* Doctors Grid with Staggered Card Animations */}
      <div className="doctors-grid">
        {displayedDoctors.map((doc, index) => {
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
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Top accent line */}
              <div className="dcard__accent-bar" aria-hidden="true" />

              {/* Image / Avatar with Animation */}
              <motion.div 
                className="dcard__visual"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.1, type: "spring", stiffness: 200 }}
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
                      alt={`Portrait of ${doc.name}`}
                      fill
                      sizes="(max-width: 559px) 150px, 180px"
                      className="dcard__image"
                      onError={() => setImageErrors((prev) => ({ ...prev, [doc.id]: true }))}
                    />
                  </motion.div>
                )}

                {/* Availability indicator with Fade-in */}
                <motion.div 
                  className="dcard__status" 
                  role="status" 
                  aria-label="Available for appointments"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <span className="dcard__status-dot" aria-hidden="true" />
                  <span className="dcard__status-text">Available</span>
                </motion.div>
              </motion.div>

              {/* Content with Staggered Text Animations */}
              <div className="dcard__body">
                <motion.h3 
                  className="dcard__name"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.15 }}
                >
                  {doc.name}
                </motion.h3>
                
                <motion.p 
                  className="dcard__specialty"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {doc.specialty}
                </motion.p>
                
                <motion.p 
                  className="dcard__qualification"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.25 }}
                >
                  {doc.qualification}
                </motion.p>

                {/* Stats row with Staggered Animation */}
                <motion.div 
                  className="dcard__stats"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <motion.div 
                    className="dcard__stat"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.35 }}
                  >
                    <span className="dcard__stat-value">{doc.experience}</span>
                    <span className="dcard__stat-label">Experience</span>
                  </motion.div>
                  <div className="dcard__stat-divider" aria-hidden="true" />
                  <motion.div 
                    className="dcard__stat"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    <span className="dcard__stat-value">
                      <StarIcon />
                      {doc.rating}
                    </span>
                    <span className="dcard__stat-label">Rating</span>
                  </motion.div>
                  <div className="dcard__stat-divider" aria-hidden="true" />
                  <motion.div 
                    className="dcard__stat"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.45 }}
                  >
                    <span className="dcard__stat-value">{doc.patients}</span>
                    <span className="dcard__stat-label">Patients</span>
                  </motion.div>
                </motion.div>

                {/* Two CTA buttons - Stacked with Animation */}
                <motion.div 
                  className="dcard-cta-group"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5 }}
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
      </div>

      {/* View All CTA with Animation */}
      <motion.div
        style={{ textAlign: "center", marginTop: "var(--space-6)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Button variant="primary" className="btn-lg" href="/doctors">
          <UsersIcon /> View All Doctors
        </Button>
      </motion.div>
    </Section>
  );
}