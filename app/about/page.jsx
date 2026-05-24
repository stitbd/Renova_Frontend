// app/about/page.jsx
"use client";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/Section";
import { siteConfig, stats } from "@/constants/siteData";
import Image from "next/image";
import "@/styles/pages/about.css";
import "@/styles/components/HeroSection.css";

// Animation variants (matching AboutSection.jsx pattern)
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// ── Management team data ────────────────────────────────────────────────────
const managementTeam = [
  {
    name: "Dr. Homayon Kabir",
    role: "Managing Director",
    specialty: "MBBS, FCPS (Medicine)",
    image: "/images/team/md.jpg",
    isMD: true,
    message:
      "At Renova Life Care, our mission has always been simple: to deliver world-class healthcare with a human touch. Every patient who walks through our doors deserves the best medical expertise paired with genuine compassion. We are committed to continuous growth, ethical practice, and making quality care accessible to all.",
  },
  {
    name: "Prof. Nasrin Akter",
    role: "Medical Director",
    specialty: "MBBS, MS (Gynaecology)",
    image: "/images/team/01.jpg",
  },
  {
    name: "Dr. Kamrun Nahar",
    role: "Chief Operations Officer",
    specialty: "MBA (Healthcare Management)",
    image: "/images/team/02.jpg",
  },
  {
    name: "Dr. Shirin Sultana",
    role: "Head of Diagnostics",
    specialty: "MBBS, MD (Pathology)",
    image: "/images/team/03.jpg",
  },
  {
    name: "Dr. Shehreen Amin Monami",
    role: "Chief Financial Officer",
    specialty: "CA, MBA (Finance)",
    image: "/images/team/04.jpg",
  },
  {
    name: "Dr. Farhana Begum",
    role: "Head of Nursing",
    specialty: "BSc Nursing, MPH",
    image: "/images/team/05.jpg",
  },
];

const [md, ...teamMembers] = managementTeam;

export default function AboutPage() {
  return (
    <>
      {/* ══════════════════════════════════════
          PAGE HERO BANNER
      ══════════════════════════════════════ */}
      <motion.section 
        className="page-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="page-hero__container">
          <motion.span 
            className="page-hero__label"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Who We Are
          </motion.span>
          <motion.h1 
            className="page-hero__title"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            About <span className="page-hero__highlight">Renova Life Care</span>
          </motion.h1>
          <motion.p 
            className="page-hero__subtitle"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Delivering compassionate, world-class medicine to the people of Bangladesh since{" "}
            {siteConfig.established}.
          </motion.p>
          <motion.nav 
            aria-label="Breadcrumb" 
            className="page-hero__breadcrumb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <a href="/">Home</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">About</span>
          </motion.nav>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════
          ABOUT SECTION
      ══════════════════════════════════════ */}
      <section className="page-section">
        <div className="page-section__container">
          <div className="about-grid">

            {/* Left — Image */}
            <motion.div
              className="about-image-wrapper anim-fade-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="about-image-container">
                <Image
                  src="/images/about.jpg"
                  alt="Renova Life Care medical team"
                  fill
                  className="about-image"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="about-overlay-badge">
                  <div className="about-badge-content">
                    <div className="about-badge-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#428a26"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <polyline points="9 12 11 14 15 10" />
                      </svg>
                    </div>
                    <div>
                      <p className="about-badge-title">BMDC Certified</p>
                      <p className="about-badge-subtitle">All doctors verified</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stats Card */}
              <motion.div 
                className="about-floating-card anim-fade-up-d2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="about-floating-content">
                  <div className="about-floating-stat">
                    <p className="about-floating-value">15+</p>
                    <p className="about-floating-label">Years</p>
                  </div>
                  <div className="about-floating-divider" />
                  <div className="about-floating-stat">
                    <p className="about-floating-value">50K+</p>
                    <p className="about-floating-label">Patients</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right — Content */}
            <motion.div
              className="about-content anim-fade-right"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeader
                label="About Us"
                title="Compassionate Care, <span class='text-primary'>Expert Medicine</span>"
                subtitle={siteConfig.description}
                align="left"
                titleClassName="!text-left"
              />

              <div className="about-features">
                {[
                  { icon: "🩺", title: "Expert Doctors",         desc: "BMDC-certified specialists with international training" },
                  { icon: "🏥", title: "Modern Facilities",      desc: "State-of-the-art equipment and hygienic environment" },
                  { icon: "💙", title: "Patient-First Approach", desc: "Compassionate care tailored to your needs" },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    className={`about-feature-item anim-fade-up anim-d${i + 1}`}
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="about-feature-icon">{item.icon}</span>
                    <div>
                      <h4 className="about-feature-title">{item.title}</h4>
                      <p className="about-feature-description">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <motion.div 
                className="about-stats-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {stats.map((stat, i) => (
                  <motion.div 
                    key={stat.label} 
                    className="about-stat-item"
                    variants={fadeInUp}
                    transition={{ delay: i * 0.1 }}
                  >
                    <p className="about-stat-value">{stat.value}</p>
                    <p className="about-stat-label">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MISSION · VISION · VALUES
      ══════════════════════════════════════ */}
      <section className="page-section page-section--slate">
        <div className="page-section__container">
          <motion.div 
            className="page-mv-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="page-mv-card page-mv-card--mission anim-fade-up anim-d1"
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
            >
              <div className="page-mv-icon">🎯</div>
              <h2 className="page-mv-title">Our Mission</h2>
              <p className="page-mv-text">
                To provide accessible, affordable, and high-quality healthcare to every individual in
                Bangladesh — ensuring no one is left without expert medical attention regardless of
                their background.
              </p>
            </motion.div>
            <motion.div 
              className="page-mv-card page-mv-card--vision anim-fade-up anim-d2"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <div className="page-mv-icon">🔭</div>
              <h2 className="page-mv-title">Our Vision</h2>
              <p className="page-mv-text">
                To be the most trusted and comprehensive healthcare network in South Asia — setting
                new standards in patient care, medical innovation, and community wellness.
              </p>
            </motion.div>
            <motion.div 
              className="page-mv-card page-mv-card--values anim-fade-up anim-d3"
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
            >
              <div className="page-mv-icon">💎</div>
              <h2 className="page-mv-title">Our Values</h2>
              <p className="page-mv-text">
                Integrity, compassion, excellence, and continuous learning — these are the pillars
                that define every decision we make and every patient interaction we have.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS BANNER
      ══════════════════════════════════════ */}
      <section className="page-section page-section--green">
        <div className="page-section__container">
          <motion.div 
            className="page-stats-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label} 
                className="page-stat-item"
                variants={fadeInUp}
                transition={{ delay: i * 0.1 }}
              >
                <p className="page-stat-value">{stat.value}</p>
                <p className="page-stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MD MESSAGE
      ══════════════════════════════════════ */}
      <section className="page-section page-section--white" id="md-message">
        <div className="page-section__container">
          <div className="md-section-inner">

            {/* decorative background quote */}
            <span className="md-bg-quote" aria-hidden="true">&ldquo;</span>

            <div className="md-grid">

              {/* Left — Photo */}
              <motion.div 
                className="md-photo-col anim-fade-left"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="md-photo-frame">
                  <div className="md-photo-ring" />
                  <div className="md-photo-img-wrap">
                    <Image
                      src={md.image}
                      alt={md.name}
                      fill
                      className="md-photo-img"
                      sizes="(max-width: 768px) 220px, 300px"
                    />
                  </div>
                  <div className="md-signature-badge">
                    <svg
                      className="md-sig-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline points="9 12 11 14 15 10" />
                    </svg>
                    <span>BMDC Verified</span>
                  </div>
                </div>

                <motion.div 
                  className="md-identity"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="md-name">{md.name}</h3>
                  <p className="md-role">{md.role}</p>
                  <p className="md-specialty">{md.specialty}</p>
                </motion.div>
              </motion.div>

              {/* Right — Message */}
              <motion.div 
                className="md-message-col anim-fade-right"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  className="md-label-row"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="md-label-dot" />
                  <span className="md-label-text">Message from our MD</span>
                </motion.div>

                <motion.h2 
                  className="md-heading"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  A Word From Our{" "}
                  <span className="md-heading-accent">Managing Director</span>
                </motion.h2>

                <motion.div 
                  className="md-quote-wrap"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <svg
                    className="md-open-quote"
                    viewBox="0 0 44 32"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M0 32V19.2C0 8.96 6.187 2.773 18.56 0L20.907 4.48C15.04 5.76 11.733 8.96 10.667 13.867H17.067V32H0ZM26.133 32V19.2C26.133 8.96 32.32 2.773 44.693 0L47.04 4.48C41.173 5.76 37.867 8.96 36.8 13.867H43.2V32H26.133Z" />
                  </svg>
                  <p className="md-message-text">{md.message}</p>
                </motion.div>

                <motion.div 
                  className="md-divider"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                />

                <motion.div 
                  className="md-stats-row"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    { value: "15+",  label: "Years Leading" },
                    { value: "50K+", label: "Lives Touched" },
                    { value: "98%",  label: "Patient Satisfaction" },
                  ].map((s, i) => (
                    <motion.div 
                      key={s.label} 
                      className="md-stat-pill"
                      variants={fadeInUp}
                      transition={{ delay: 0.7 + i * 0.1 }}
                    >
                      <strong className="md-stat-val">{s.value}</strong>
                      <span className="md-stat-lbl">{s.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MANAGEMENT TEAM
      ══════════════════════════════════════ */}
      <section className="page-section page-section--slate" id="management">
        <div className="page-section__container">

          {/* Section header */}
          <motion.div 
            className="mgmt-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span 
              className="mgmt-header__label"
              variants={fadeInUp}
            >
              Our Leadership
            </motion.span>
            <motion.h2 
              className="mgmt-header__title"
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
            >
              The Team Behind{" "}
              <span className="mgmt-header__accent">Our Excellence</span>
            </motion.h2>
            <motion.p 
              className="mgmt-header__subtitle"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              Experienced leaders driving innovation, compassion, and quality across every department.
            </motion.p>
          </motion.div>

          <motion.div 
            className="mgmt-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                className={`mgmt-card anim-fade-up anim-d${(i % 5) + 1}`}
                variants={fadeInUp}
                transition={{ delay: i * 0.1 }}
              >
                {/* Green top bar */}
                <div className="mgmt-card-accent" />

                {/* Avatar */}
                <div className="mgmt-avatar-wrap">
                  <div className="mgmt-avatar-ring" />
                  <div className="mgmt-avatar-img">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="mgmt-img"
                      sizes="120px"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="mgmt-info">
                  <h4 className="mgmt-name">{member.name}</h4>
                  <p className="mgmt-role">{member.role}</p>
                  <span className="mgmt-specialty-tag">{member.specialty}</span>
                </div>

                {/* Social */}
                <motion.div 
                  className="mgmt-social"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  <a href="#" className="mgmt-social-btn" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                  <a href="#" className="mgmt-social-btn" aria-label="Email">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </a>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}