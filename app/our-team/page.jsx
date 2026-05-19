// app/teams/page.jsx
import { SectionHeader } from "@/components/common/Section";
import { siteConfig } from "@/constants/siteData";
import Image from "next/image";
import "@/styles/pages/teams.css";
import "@/styles/components/HeroSection.css";

export const metadata = {
  title: `Management Team | ${siteConfig.name}`,
  description: `Meet the administrative and operational leaders behind ${siteConfig.name} — dedicated professionals ensuring seamless healthcare delivery.`,
  openGraph: {
    title: `Management Team | ${siteConfig.name}`,
    description: "Meet the office management team behind our diagnostic center.",
    url: `${siteConfig.url}/teams`,
  },
};

// ── Office Management Team Data ────────────────────────────────────────────
const managementTeam = [
  // ── Executive Leadership ─────────────────────────────────────────
  {
    id: "exec-01",
    name: "Dr. Homayon Kabir",
    role: "Managing Director",
    department: "Executive Office",
    image: "/images/team/md.jpg",
    bio: "Strategic leader with 20+ years in healthcare administration and business development.",
    social: { linkedin: "#", email: "homayon@renovalifecare.com" },
    isExecutive: true,
  },
  {
    id: "exec-02",
    name: "Ms. Kamrun Nahar",
    role: "Chief Operations Officer",
    department: "Executive Office",
    image: "/images/team/02.jpg",
    bio: "Oversees daily operations, process optimization, and service quality across all departments.",
    social: { linkedin: "#", email: "kamrun@renovalifecare.com" },
    isExecutive: true,
  },
  {
    id: "exec-03",
    name: "Mr. Tanvir Ahmed",
    role: "Chief Financial Officer",
    department: "Finance",
    image: "/images/team/04.jpg",
    bio: "Manages financial planning, budgeting, and compliance with healthcare industry standards.",
    social: { linkedin: "#", email: "tanvir@renovalifecare.com" },
    isExecutive: true,
  },

  // ── Operations & Administration ─────────────────────────────────────────
  {
    id: "ops-01",
    name: "Ms. Farhana Begum",
    role: "Head of Nursing Administration",
    department: "Operations",
    image: "/images/team/05.jpg",
    bio: "Coordinates nursing staff schedules, training, and patient care protocols.",
    social: { email: "farhana@renovalifecare.com" },
  },
  {
    id: "ops-02",
    name: "Mr. Rafiqul Islam",
    role: "Lab Operations Manager",
    department: "Operations",
    image: "/images/team/06.jpg",
    bio: "Ensures efficient diagnostic workflows, equipment maintenance, and quality control.",
    social: { email: "rafiqul@renovalifecare.com" },
  },
  {
    id: "ops-03",
    name: "Ms. Nusrat Jahan",
    role: "Front Desk Supervisor",
    department: "Operations",
    image: "/images/team/07.jpg",
    bio: "Leads patient reception, appointment coordination, and first-point customer service.",
    social: { email: "nusrat@renovalifecare.com" },
  },

  // ── Finance & Administration ─────────────────────────────────────────
  {
    id: "fin-01",
    name: "Mr. Kamal Hossain",
    role: "Finance Manager",
    department: "Finance",
    image: "/images/team/08.jpg",
    bio: "Handles accounts payable/receivable, payroll, and financial reporting.",
    social: { email: "kamal@renovalifecare.com" },
  },
  {
    id: "fin-02",
    name: "Ms. Sadia Rahman",
    role: "HR & Admin Manager",
    department: "Human Resources",
    image: "/images/team/09.jpg",
    bio: "Manages recruitment, employee relations, training, and workplace compliance.",
    social: { email: "sadia@renovalifecare.com" },
  },
  {
    id: "fin-03",
    name: "Mr. Mohammad Ali",
    role: "Procurement Officer",
    department: "Finance",
    image: "/images/team/10.jpg",
    bio: "Sources medical supplies, equipment, and vendor management for cost-effective operations.",
    social: { email: "mali@renovalifecare.com" },
  },

  // ── IT & Infrastructure ─────────────────────────────────────────
  {
    id: "it-01",
    name: "Mr. Fahim Rahman",
    role: "IT Systems Manager",
    department: "Information Technology",
    image: "/images/team/11.jpg",
    bio: "Maintains EMR systems, network security, and digital infrastructure for seamless service.",
    social: { linkedin: "#", email: "fahim@renovalifecare.com" },
  },
  {
    id: "it-02",
    name: "Ms. Tahmina Akter",
    role: "Data & Records Officer",
    department: "Information Technology",
    image: "/images/team/12.jpg",
    bio: "Ensures accurate patient data management, privacy compliance, and digital archiving.",
    social: { email: "tahmina@renovalifecare.com" },
  },

  // ── Quality & Compliance ─────────────────────────────────────────
  {
    id: "qa-01",
    name: "Dr. Shirin Sultana",
    role: "Quality Assurance Manager",
    department: "Quality & Compliance",
    image: "/images/team/03.jpg",
    bio: "Leads accreditation processes, internal audits, and continuous improvement initiatives.",
    social: { email: "shirin@renovalifecare.com" },
  },
  {
    id: "qa-02",
    name: "Mr. Jahangir Alam",
    role: "Compliance Officer",
    department: "Quality & Compliance",
    image: "/images/team/13.jpg",
    bio: "Monitors regulatory adherence, policy implementation, and risk management protocols.",
    social: { email: "jahangir@renovalifecare.com" },
  },

  // ── Marketing & Communications ─────────────────────────────────────────
  {
    id: "mkt-01",
    name: "Ms. Ayesha Siddiqua",
    role: "Marketing & Communications Lead",
    department: "Marketing",
    image: "/images/team/14.jpg",
    bio: "Manages brand strategy, community outreach, digital presence, and patient education.",
    social: { linkedin: "#", email: "ayesha@renovalifecare.com" },
  },
  {
    id: "mkt-02",
    name: "Mr. Sabbir Hassan",
    role: "Customer Experience Manager",
    department: "Marketing",
    image: "/images/team/15.jpg",
    bio: "Focuses on patient feedback, service improvement, and relationship management.",
    social: { email: "sabbir@renovalifecare.com" },
  },

  // ── Facilities & Support ─────────────────────────────────────────
  {
    id: "fac-01",
    name: "Mr. Abdul Karim",
    role: "Facilities Manager",
    department: "Facilities",
    image: "/images/team/16.jpg",
    bio: "Oversees building maintenance, utilities, safety protocols, and environmental hygiene.",
    social: { email: "karim@renovalifecare.com" },
  },
  {
    id: "fac-02",
    name: "Ms. Roksana Parvin",
    role: "Housekeeping Supervisor",
    department: "Facilities",
    image: "/images/team/17.jpg",
    bio: "Ensures clinical and administrative areas meet highest standards of cleanliness and safety.",
    social: { email: "roksana@renovalifecare.com" },
  },
];

export default function TeamsPage() {
  return (
    <>
      {/* ══════════════════════════════════════
          PAGE HERO BANNER
      ══════════════════════════════════════ */}
      <section className="page-hero">
        <div className="page-hero__container">
          <span className="page-hero__label">Our Leadership</span>
          <h1 className="page-hero__title">
            Office <span className="page-hero__highlight">Management Team</span>
          </h1>
          <p className="page-hero__subtitle">
            The dedicated administrative professionals who ensure {siteConfig.name} 
            delivers seamless, efficient, and patient-centered diagnostic services.
          </p>
          <nav aria-label="Breadcrumb" className="page-hero__breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Management Team</span>
          </nav>
        </div>
      </section>

      {/* ══════════════════════════════════════
          EXECUTIVE LEADERSHIP
      ══════════════════════════════════════ */}
      <section className="page-section">
        <div className="page-section__container">
          <SectionHeader
            label="Executive Leadership"
            title="Our <span class='text-primary'>Leadership Team</span>"
            subtitle="Visionary administrators guiding operational excellence and strategic growth."
            align="center"
          />

          <div className="teams-featured-grid">
            {managementTeam.filter(m => m.isExecutive).map((member) => (
              <article key={member.id} className="teams-featured-card">
                <div className="teams-featured-image-wrap">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="teams-featured-image"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="teams-featured-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    <span>Executive</span>
                  </div>
                </div>
                <div className="teams-featured-info">
                  <h3 className="teams-featured-name">{member.name}</h3>
                  <p className="teams-featured-role">{member.role}</p>
                  <p className="teams-featured-dept">{member.department}</p>
                  <p className="teams-featured-bio">{member.bio}</p>
                  <div className="teams-featured-social">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="teams-social-link" aria-label={`${member.name} on LinkedIn`} target="_blank" rel="noopener">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </a>
                    )}
                    {member.social.email && (
                      <a href={`mailto:${member.social.email}`} className="teams-social-link" aria-label={`Email ${member.name}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ALL MANAGEMENT MEMBERS GRID
      ══════════════════════════════════════ */}
      <section className="page-section page-section--slate">
        <div className="page-section__container">
          <SectionHeader
            label="Management Staff"
            title="The <span class='text-primary'>Full Team</span>"
            subtitle="Every department leader committed to operational excellence and patient satisfaction."
            align="center"
          />

          <div className="teams-grid">
            {managementTeam.map((member, i) => (
              <article
                key={member.id}
                className={`teams-card anim-fade-up anim-d${(i % 5) + 1}`}
              >
                {/* Green top accent bar */}
                <div className="teams-card-accent" />

                {/* Avatar */}
                <div className="teams-avatar-wrap">
                  <div className="teams-avatar-ring" />
                  <div className="teams-avatar-img">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="teams-img"
                      sizes="120px"
                    />
                  </div>
                  {member.isExecutive && (
                    <div className="teams-exec-flag" title="Executive Leadership">★</div>
                  )}
                </div>

                {/* Info */}
                <div className="teams-info">
                  <h4 className="teams-name">{member.name}</h4>
                  <p className="teams-role">{member.role}</p>
                  <span className="teams-dept-tag">{member.department}</span>
                  <p className="teams-bio">{member.bio}</p>
                </div>

                {/* Social */}
                <div className="teams-social">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="teams-social-btn" aria-label={`${member.name} on LinkedIn`} target="_blank" rel="noopener">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                  )}
                  {member.social.email && (
                    <a href={`mailto:${member.social.email}`} className="teams-social-btn" aria-label={`Email ${member.name}`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          JOIN OUR TEAM CTA
      ══════════════════════════════════════ */}
      <section className="page-section page-section--green">
        <div className="page-section__container">
          <div className="teams-cta-card">
            <h2>Join Our Management Team</h2>
            <p>
              Are you an experienced administrator, operations professional, or support specialist? 
              {siteConfig.name} is growing — explore career opportunities with Bangladesh's trusted diagnostic center.
            </p>
            <div className="teams-cta-buttons">
              <a href="/careers" className="btn btn-primary">View Open Positions</a>
              <a href="/contact" className="btn btn-secondary">Contact HR</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}