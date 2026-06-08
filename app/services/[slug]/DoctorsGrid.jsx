"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/common/Button";

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
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
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
      <span className="dcard__initials">{initials}</span>
    </div>
  );
};

// ── Main Client Component ─────────────────────────────────────
export default function DoctorsGrid({ doctors = [] }) {  // ← ADDED: accept doctors as prop with default empty array
  const accentColors = [
    { from: "var(--color-authority)", to: "var(--color-secondary)" },
    { from: "var(--color-primary-dark)", to: "var(--color-primary)" },
    { from: "var(--color-primary)", to: "var(--color-authority)" },
    { from: "var(--color-secondary)", to: "var(--color-primary-dark)" },
  ];

  const [imageErrors, setImageErrors] = useState({});

  // If no doctors provided, don't render anything
  if (!doctors || doctors.length === 0) {
    return null;
  }

  return (
    <>
      {/* Decorative Background Elements */}
      <div id="doctors">
        {/* Doctors Grid */}
        <div className="doctors-grid">
          {doctors.map((doc, index) => {
            const accent = accentColors[index % accentColors.length];
            const hasImageError = imageErrors[doc.id];

            return (
              <article
                key={doc.id}
                className="dcard"
                style={{
                  "--accent-from": accent.from,
                  "--accent-to": accent.to,
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Top accent line */}
                <div className="dcard__accent-bar" aria-hidden="true" />

                {/* Image / Avatar */}
                <div className="dcard__visual">
                  <div className="dcard__image-ring" aria-hidden="true" />

                  {hasImageError ? (
                    <InitialsFallback
                      name={doc.name}
                      accentFrom={accent.from}
                      accentTo={accent.to}
                    />
                  ) : (
                    <div className="dcard__image-wrap">
                      <Image
                        src={`/images/doctors/doctor-${doc.id}.jpg`}
                        alt={`Portrait of Dr. ${doc.name}`}
                        fill
                        sizes="(max-width: 559px) 150px, (max-width: 1023px) 180px, 180px"
                        className="dcard__image"
                        onError={() => setImageErrors((prev) => ({ ...prev, [doc.id]: true }))}
                      />
                    </div>
                  )}

                  {/* Availability indicator */}
                  <div className="dcard__status" role="status" aria-label="Available for appointments">
                    <span className="dcard__status-dot" aria-hidden="true" />
                    <span className="dcard__status-text">Available</span>
                  </div>
                </div>

                {/* Content */}
                <div className="dcard__body">
                  <h3 className="dcard__name">Dr. {doc.name}</h3>
                  <p className="dcard__specialty">{doc.specialty}</p>
                  <p className="dcard__qualification">{doc.qualification}</p>

                  {/* Stats row */}
                  <div className="dcard__stats">
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
                  </div>

                  {/* Two CTA buttons - Stacked */}
                  <div className="dcard-cta-group">
                    <Button variant="secondary" href={`/doctors/${doc.id}`}>
                      <ProfileIcon /> Doctor Profile
                    </Button>
                    <Button variant="primary" href={`/appointment?doctor=${doc.id}`}>
                      <CalendarIcon /> Book Appointment
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}