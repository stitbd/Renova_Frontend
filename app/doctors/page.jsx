import { siteConfig } from "@/constants/siteData";
import DoctorsGrid from "./DoctorsGrid";
import "@/styles/pages/doctors.css";
import "@/styles/components/HeroSection.css";

export const metadata = {
  title: `Our Doctors | ${siteConfig.name}`,
  description: `Meet the expert medical team at ${siteConfig.name} — BMDC-certified specialists with international training and years of experience in their fields.`,
  openGraph: {
    title: `Our Doctors | ${siteConfig.name}`,
    description: `Expert specialists at ${siteConfig.name} — compassionate, certified, and committed to your health.`,
    url: `${siteConfig.url}/doctors`,
  },
};

export default function DoctorsPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero__container">
          <span className="page-hero__label">Our Medical Team</span>
          <h1 className="page-hero__title">
            Meet Our <span className="page-hero__highlight">Specialist Doctors</span>
          </h1>
          <p className="page-hero__subtitle">
            Internationally trained, BMDC-certified doctors dedicated to delivering the highest standard of patient care.
          </p>
          <nav aria-label="Breadcrumb" className="page-hero__breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Doctors</span>
          </nav>
        </div>
      </section>

      {/* Doctors Grid (Client Component) */}


      {/* Doctor */}
      <section className="page-section">
        <div className="page-section__container">
          <DoctorsGrid />
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="page-section page-section--slate">
        <div className="page-section__container">
          <div className="page-join-grid">
            <div className="page-join-content">
              <span className="page-section__label">Career Opportunities</span>
              <h2 className="page-join-title">Are You a Medical Professional?</h2>
              <p className="page-join-text">
                We are always looking for talented, passionate doctors and healthcare workers to join our growing team.
                If you are dedicated to making a difference in patient lives, we want to hear from you.
              </p>
              <div className="page-join-benefits">
                {[
                  "Competitive salary and benefits",
                  "International training opportunities",
                  "Modern, well-equipped facilities",
                  "Collaborative and supportive team",
                ].map((benefit) => (
                  <div key={benefit} className="page-join-benefit-item">
                    <span className="page-join-check" aria-hidden="true">✓</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              <a href="/contact" className="page-cta-btn page-cta-btn--outline">
                Apply Now
              </a>
            </div>
            <div className="page-join-visual">
              <div className="page-join-badge-stack">
                <div className="page-join-badge">
                  <span className="page-join-badge-num">50+</span>
                  <span className="page-join-badge-label">Specialists</span>
                </div>
                <div className="page-join-badge page-join-badge--accent">
                  <span className="page-join-badge-num">15+</span>
                  <span className="page-join-badge-label">Departments</span>
                </div>
                <div className="page-join-badge page-join-badge--green">
                  <span className="page-join-badge-num">100%</span>
                  <span className="page-join-badge-label">BMDC Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment CTA */}
      <section className="page-section page-section--green">
        <div className="page-section__container page-cta-center">
          <h2 className="page-cta-title">Book a Consultation</h2>
          <p className="page-cta-subtitle">Choose your preferred specialist and schedule an appointment at your convenience.</p>
          <a href="/appointment" className="page-cta-btn">
            Book Appointment
          </a>
        </div>
      </section>
    </>
  );
}