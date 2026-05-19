// components/sections/AboutSection.jsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { siteConfig, stats } from "@/constants/siteData";
import Button from "@/components/common/Button";
import { Section, SectionHeader } from "@/components/common/Section";
import "./AboutSection.css";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AboutSection() {
  return (
    <Section id="about" variant="alternate">
      <div className="about-grid">
        
        {/* Left - Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="about-image-wrapper"
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
            {/* Overlay Badge */}
            <div className="about-overlay-badge">
              <div className="about-badge-content">
                <div className="about-badge-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#428a26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <polyline points="9 12 11 14 15 10"/>
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
            className="about-floating-card"
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

        {/* Right - Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="about-content"
        >
          <SectionHeader
            label="About Us"
            title="Compassionate Care, <span class='section-heading-accent'>Expert Medicine</span>"
            subtitle={siteConfig.description}
            align="left"
            titleClassName="!text-left"
          />

          <div className="about-features">
            {[
              { icon: "🩺", title: "Expert Doctors", desc: "BMDC-certified specialists with international training" },
              { icon: "🏥", title: "Modern Facilities", desc: "State-of-the-art equipment and hygienic environment" },
              { icon: "💙", title: "Patient-First Approach", desc: "Compassionate care tailored to your needs" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="about-feature-item"
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
          <div className="about-stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="about-stat-item">
                <p className="about-stat-value">{stat.value}</p>
                <p className="about-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="about-buttons">
            <Button variant="primary" href="/about">
              Learn More About Us
            </Button>
            <Button variant="secondary" href="/doctors">
              Meet Our Doctors
            </Button>
          </div>
          
        </motion.div>
      </div>
    </Section>
  );
}