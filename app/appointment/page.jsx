/* ═══════════════════════════════════════════════════════════════
   app/appointment/page.jsx  —  Next.js Server Component
   ═══════════════════════════════════════════════════════════════ */

import { siteConfig } from "@/constants/siteData";
import AppointmentForm from "./AppointmentForm";
import "@/styles/components/HeroSection.css";

/* ─── SEO metadata ───────────────────────────────────────────── */
export const metadata = {
  title: `Book Appointment | ${siteConfig.name}`,
  description: `Schedule your appointment with expert doctors at ${siteConfig.name}. Fast, secure, and convenient online booking for all medical specialties. Confirmed within 1 hour.`,
  openGraph: {
    title: `Book Appointment | ${siteConfig.name}`,
    description: "Book your health consultation online in minutes.",
    url: `${siteConfig.url}/appointment`,
    type: "website",
  },
};

/* ─── Page ───────────────────────────────────────────────────── */
export default function AppointmentPage() {
  return (
    <main>

      {/* ── HERO ────────────────────────────────────────────────── */}
      
      <section className="page-hero"  aria-label="Book an appointment">
        <div className="page-hero__container">
          <span className="page-hero__label">Book Online</span>
          <h1 className="page-hero__title">
            Schedule Your <span className="page-hero__highlight">Appointment</span>
          </h1>
          <p className="page-hero__subtitle">
            Quick, secure booking with Bangladesh&apos;s trusted healthcare providers.
            Confirmed within 1 hour, zero hassle.
          </p>
          <nav aria-label="Breadcrumb" className="page-hero__breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">About</span>
          </nav>
          

          {/* <div className="appt-hero__stats" aria-label="Key statistics">
            {[
              ["50K+", "Patients served"],
              ["100+", "Expert doctors"],
              ["8",    "Specialties"],
              ["1hr",  "Avg confirmation"],
            ].map(([value, label]) => (
              <div key={label}>
                <div className="appt-hero__stat-val">{value}</div>
                <div className="appt-hero__stat-lbl">{label}</div>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      {/*
        ── CLIENT COMPONENT ──────────────────────────────────────
        AppointmentForm handles:
          • Sticky progress bar (rendered inside the component)
          • appt-body grid (form + sidebar)
          • All 3 steps + confirmation view
      */}
      <AppointmentForm
        phone={siteConfig.phone}
        email={siteConfig.email}
      />

      {/* ── FOOTER TRUST BAR ────────────────────────────────────── */}
      <footer className="page-section page-section--green appt-trust-bar" aria-label="Trust indicators">
        Trusted by <strong>50,000+ patients </strong> across Bangladesh
        &nbsp;·&nbsp; SSL Secured &nbsp;·&nbsp; HIPAA Compliant
      </footer>

    </main>
  );
}