import { siteConfig } from "@/constants/siteData";
import Link from "next/link";
import "@/styles/pages/careers.css";
import "@/styles/components/HeroSection.css";

export const metadata = {
  title: `Careers | ${siteConfig.name}`,
  description: `Join the team at ${siteConfig.name} — explore open positions in medicine, nursing, diagnostics, and administration.`,
  openGraph: {
    title: `Careers | ${siteConfig.name}`,
    description: `Build your career at ${siteConfig.name}, Bangladesh's trusted diagnostic and telemedicine provider.`,
    url: `${siteConfig.url}/careers`,
  },
};

const perks = [
  { icon: "💰", title: "Competitive Salary", desc: "Market-leading compensation with annual performance reviews." },
  { icon: "🏥", title: "Health Coverage", desc: "Full medical insurance for you and your immediate family." },
  { icon: "📚", title: "Learning & Training", desc: "Sponsored certifications, workshops, and conference access." },
  { icon: "⏰", title: "Flexible Scheduling", desc: "Shift flexibility for clinical and non-clinical roles." },
  { icon: "🌱", title: "Career Growth", desc: "Clear promotion pathways and internal mobility across departments." },
  { icon: "🤝", title: "Inclusive Culture", desc: "A collaborative, respectful workplace that values every voice." },
];

const openPositions = [
  { id: 1, title: "Consultant Cardiologist", dept: "Medical", type: "Full-time", location: "Dhaka", posted: "3 days ago" },
  { id: 2, title: "Senior Staff Nurse", dept: "Nursing", type: "Full-time", location: "Dhaka", posted: "5 days ago" },
  { id: 3, title: "Lab Technologist", dept: "Diagnostics", type: "Full-time", location: "Dhaka", posted: "1 week ago" },
  { id: 4, title: "Front Desk Coordinator", dept: "Operations", type: "Full-time", location: "Dhaka", posted: "1 week ago" },
  { id: 5, title: "Radiologic Technician", dept: "Diagnostics", type: "Full-time", location: "Chattogram", posted: "2 weeks ago" },
  { id: 6, title: "HR Executive", dept: "Human Resources", type: "Full-time", location: "Dhaka", posted: "2 weeks ago" },
  { id: 7, title: "Telemedicine Support Officer", dept: "IT & Telehealth", type: "Full-time", location: "Remote", posted: "3 weeks ago" },
  { id: 8, title: "Pharmacist", dept: "Pharmacy", type: "Full-time", location: "Dhaka", posted: "3 weeks ago" },
];

const deptColors = {
  Medical: "#428a26",
  Nursing: "#1d6fb5",
  Diagnostics: "#8e44ad",
  Operations: "#e67e22",
  "Human Resources": "#c0392b",
  "IT & Telehealth": "#16a085",
  Pharmacy: "#2980b9",
};

const steps = [
  { step: 1, title: "Apply Online", desc: "Submit your CV and cover letter through our careers portal." },
  { step: 2, title: "Initial Screening", desc: "Our HR team reviews your application and schedules a call." },
  { step: 3, title: "Interview & Assessment", desc: "Meet the hiring team and showcase your skills." },
  { step: 4, title: "Offer & Onboarding", desc: "Receive your offer and join our welcoming onboarding program." },
];

export default function CareersPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero__container">
          <span className="page-hero__label">Join Our Team</span>
          <h1 className="page-hero__title">
            Build Your <span className="page-hero__highlight">Career With Us</span>
          </h1>
          <p className="page-hero__subtitle">
            At {siteConfig.name}, we're always looking for compassionate, skilled
            professionals who want to make a real difference in healthcare.
          </p>
          <nav aria-label="Breadcrumb" className="page-hero__breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Careers</span>
          </nav>
        </div>
      </section>

      {/* Perks */}
      <section className="page-section page-section--white">
        <div className="page-section__container">
          <div className="page-section__header">
            <span className="page-section__label">Why Work Here</span>
            <h2 className="page-section__title">Benefits & Perks</h2>
            <p className="page-section__subtitle">
              We invest in our people because they're the heart of everything we do.
            </p>
          </div>

          <div className="careers-perks-grid">
            {perks.map((perk) => (
              <div key={perk.title} className="careers-perk-card">
                <div className="careers-perk-icon">{perk.icon}</div>
                <h3 className="careers-perk-title">{perk.title}</h3>
                <p className="careers-perk-desc">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="page-section page-section--slate">
        <div className="page-section__container">
          <div className="page-section__header">
            <span className="page-section__label">Current Openings</span>
            <h2 className="page-section__title">Open Positions</h2>
            <p className="page-section__subtitle">
              Explore opportunities across our clinical, diagnostic, and administrative teams.
            </p>
          </div>

          <div className="careers-positions-list">
            {openPositions.map((job) => (
              <div key={job.id} className="careers-job-row">
                <div className="careers-job-row__main">
                  <span
                    className="careers-job-row__dept"
                    style={{
                      backgroundColor: `${deptColors[job.dept] || "#428a26"}18`,
                      color: deptColors[job.dept] || "#428a26",
                    }}
                  >
                    {job.dept}
                  </span>
                  <h3 className="careers-job-row__title">{job.title}</h3>
                  <div className="careers-job-row__meta">
                    <span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {job.location}
                    </span>
                    <span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                      {job.type}
                    </span>
                    <span className="careers-job-row__posted">{job.posted}</span>
                  </div>
                </div>
                <Link href="/contact" className="careers-job-row__btn">
                  Apply Now
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="page-section page-section--white">
        <div className="page-section__container">
          <div className="page-section__header">
            <span className="page-section__label">How It Works</span>
            <h2 className="page-section__title">Our Hiring Process</h2>
            <p className="page-section__subtitle">
              A transparent, four-step journey from application to your first day.
            </p>
          </div>

          <div className="careers-steps-grid">
            {steps.map((s) => (
              <div key={s.step} className="careers-step-card">
                <div className="careers-step-number">{s.step}</div>
                <h3 className="careers-step-title">{s.title}</h3>
                <p className="careers-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-section page-section--green">
        <div className="page-section__container page-cta-center">
          <span className="page-section__label">Don't See a Fit?</span>
          <h2 className="page-cta-title">Send Us Your Resume Anyway</h2>
          <p className="page-cta-subtitle">
            We're always on the lookout for great talent. Reach out and let's talk.
          </p>
          <Link href="/contact" className="page-cta-btn">
            Submit Your CV
          </Link>
        </div>
      </section>
    </>
  );
}