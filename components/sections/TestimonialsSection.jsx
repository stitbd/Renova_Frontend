"use client";

import { testimonials } from "@/constants/siteData";
import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/common/Section";
import "./TestimonialsSection.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const statSpring = { type: "spring", stiffness: 180, damping: 16 };

export default function TestimonialsSection() {
  return (
    <Section id="testimonials">

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <SectionHeader
          label="Patient Stories"
          title="Real Patients, <span class='section-heading-accent'>Real Transformations</span>"
          subtitle="Thousands of families across Bangladesh trust Renova Life Care with their most precious asset — their health."
        />
      </motion.div>

      {/* Testimonials Grid */}
      <motion.div
        className="testimonials-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {testimonials.map((t, index) => (
          <motion.div
            key={t.id}
            className="testimonial-card"
            variants={fadeInUp}
            whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
          >
            {/* Teal top accent — visible on hover via CSS */}
            <span className="testimonial-card__accent" aria-hidden="true" />

            {/* Stars */}
            <div className="testimonial-card__stars">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    fill={i < t.rating ? "#f59e0b" : "none"}
                    stroke="#f59e0b"
                    strokeWidth={i < t.rating ? "0" : "1.5"}
                  />
                </svg>
              ))}
            </div>

            {/* Review */}
            <blockquote className="testimonial-card__review">
              &ldquo;{t.review}&rdquo;
            </blockquote>

            {/* Divider */}
            <hr className="testimonial-card__divider" />

            {/* Author */}
            <div className="testimonial-card__author">
              <div
                className="testimonial-card__avatar"
                data-initial={t.name.charAt(0)}
              >
                <img
                  src={`/images/patients/${String(index + 1).padStart(2, "0")}.jpg`}
                  alt={`Photo of ${t.name}`}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.classList.add(
                      "testimonial-card__avatar--fallback"
                    );
                  }}
                />
              </div>

              <div className="testimonial-card__author-info">
                <p className="testimonial-card__author-name">{t.name}</p>
                <p className="testimonial-card__author-meta">
                  {t.location}
                  {t.service && (
                    <>
                      {" · "}
                      <span className="testimonial-card__service">
                        {t.service}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Trust Bar */}
      <motion.div
        className="trust-bar"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {[
          { value: "98%",     label: "Patient Satisfaction" },
          { value: "4.9/5",   label: "Average Rating" },
          { value: "15,000+", label: "Reviews Collected" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="trust-bar__stat"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ ...statSpring, delay: 0.3 + i * 0.1 }}
          >
            <p className="trust-bar__value">{stat.value}</p>
            <p className="trust-bar__label">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

    </Section>
  );
}