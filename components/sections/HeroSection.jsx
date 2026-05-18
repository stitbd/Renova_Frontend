"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig, stats } from "@/constants/siteData";
import "./HeroSection.css";

// Animation variants - Same as AboutSection
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
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

/**
 * HeroSection — Primary landing section with animated background slider, stats and CTAs.
 * Designed for high conversion, trust-building, and professional healthcare presentation.
 */
export default function HeroSection() {
  // Background slider images
  const sliderImages = [
    "/images/sliders/01.jpg",
    "/images/sliders/02.jpg",
    "/images/sliders/03.jpg",
    "/images/sliders/04.jpg",
    "/images/sliders/05.jpg",
    "/images/sliders/06.jpg",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate slider every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  return (
    <section
      className="hero-section"
      aria-label="Welcome to Renova Life Care"
    >
      {/* Animated Background Slider - CSS animations preserved */}
      <motion.div 
        className="hero-bg-slider" 
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {sliderImages.map((src, index) => (
          <div
            key={src}
            className={`hero-bg-slide ${
              index === currentSlide ? "active" : ""
            }`}
          >
            <img
              src={src}
              alt={`Healthcare background ${index + 1}`}
              className="hero-bg-image"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <div className="hero-bg-overlay" />
          </div>
        ))}
        
        {/* Slider Navigation Dots with Animation */}
        <motion.div 
          className="hero-slider-dots"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {sliderImages.map((_, index) => (
            <motion.button
              key={index}
              className={`hero-slider-dot ${
                index === currentSlide ? "active" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? "true" : "false"}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </motion.div>
      </motion.div>

      <div className="hero-container">
        <div className="hero-grid">

          {/* Left — Content with Slide-in Animation */}
          <motion.div 
            className="hero-content-left"
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Trust Badge with Fade-in */}
            <motion.div 
              className="hero-trust-badge"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div 
                className="hero-trust-badge-icon" 
                aria-hidden="true"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </motion.div>
              <span className="hero-trust-badge-text">
                Bangladesh's Most Trusted Healthcare
              </span>
            </motion.div>

            {/* Headline with Staggered Animation */}
            <motion.div 
              className="hero-headline"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h1 
                className="hero-title"
                variants={fadeInUp}
              >
                Your Health, Our{" "}
                <motion.span 
                  className="hero-gradient-text"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  Priority
                  {/* Underline decoration */}
                  <svg
                    className="hero-title-underline"
                    viewBox="0 0 200 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 8C40 4 80 2 100 4C120 6 160 8 198 6"
                      stroke="#86b437"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </motion.span>
                {" "}—<br />
                <span className="hero-authority-text">Expert Care,</span> Every Step
              </motion.h1>
              <motion.p 
                className="hero-description"
                variants={fadeInUp}
              >
                {siteConfig.description} Experience compassionate, world-class medicine with a personal touch.
              </motion.p>
            </motion.div>

            {/* CTA Buttons with Stagger + Hover */}
            <motion.div 
              className="hero-buttons"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href="/appointment"
                  className="btn btn-primary"
                  aria-label="Book an appointment with our specialists"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                    <line x1="8" y1="14" x2="8" y2="14"/>
                    <line x1="12" y1="14" x2="12" y2="14"/>
                    <line x1="16" y1="14" x2="16" y2="14"/>
                  </svg>
                  Book Appointment
                </Link>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={`tel:${siteConfig.phone}`}
                  className="btn btn-secondary"
                  aria-label={`Call us at ${siteConfig.phone}`}
                >
                  <span className="hero-btn-call-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#05417d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 10a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.44 0h3a2 2 0 0 1 2 1.72A12.84 12.84 0 0 0 9.1 5.07a2 2 0 0 1-.45 2.11L7.5 8.28a16 16 0 0 0 6.29 6.29l1.1-1.1a2 2 0 0 1 2.11-.45A12.84 12.84 0 0 0 20.28 14a2 2 0 0 1 1.72 2z"/>
                    </svg>
                  </span>
                  {siteConfig.phone}
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Indicators with Staggered Animation */}
            <motion.div 
              className="hero-trust-indicators"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div 
                className="hero-doctor-avatars" 
                aria-hidden="true"
                variants={fadeInUp}
              >
                {[
                  "/images/patients/01.jpg",
                  "/images/patients/02.jpg",
                  "/images/patients/03.jpg",
                  "/images/patients/04.jpg",
                ].map((src, i) => (
                  <motion.div 
                    key={i} 
                    className="hero-avatar"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.15, zIndex: 1 }}
                  >
                    <img
                      src={src}
                      alt={`Patient ${i + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "9999px",
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
              <motion.div 
                className="hero-rating"
                variants={fadeInUp}
              >
                <motion.div 
                  className="hero-stars" 
                  aria-label="5 out of 5 stars rating"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.svg 
                      key={i} 
                      width="13" 
                      height="13" 
                      viewBox="0 0 24 24" 
                      fill="#f59e0b" 
                      aria-hidden="true"
                      variants={fadeInUp}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </motion.svg>
                  ))}
                </motion.div>
                <motion.p 
                  className="hero-rating-text"
                  variants={fadeInUp}
                >
                  <strong className="hero-rating-strong">15,000+ patients</strong> trust us
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right — Visual Card with Slide-in Animation */}
          <motion.div 
            className="hero-visual-right"
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="hero-card-wrapper"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              {/* Central health card */}
              <motion.div 
                className="hero-main-card"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Card background pattern */}
                <div className="hero-card-pattern" aria-hidden="true" />

                {/* Health Illustration with Staggered Content */}
                <motion.div 
                  className="hero-card-content"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {/* SVG Medical Cross with Pop-in */}
                  <motion.div 
                    className="hero-medical-icon" 
                    aria-hidden="true"
                    variants={fadeInUp}
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="18" y="6" width="12" height="36" rx="3" fill="white" opacity="0.9"/>
                      <rect x="6" y="18" width="36" height="12" rx="3" fill="white" opacity="0.9"/>
                    </svg>
                  </motion.div>

                  <motion.div 
                    className="hero-card-text"
                    variants={fadeInUp}
                  >
                    <h2 className="hero-card-title">
                      {siteConfig.name}
                    </h2>
                    <p className="hero-card-slogan">{siteConfig.slogan}</p>
                  </motion.div>

                  {/* Quick Stat Pills with Stagger */}
                  <motion.div 
                    className="hero-stats-grid"
                    variants={staggerContainer}
                  >
                    {stats.map((stat, index) => (
                      <motion.div 
                        key={stat.label} 
                        className="hero-stat-item"
                        variants={fadeInUp}
                        whileHover={{ y: -3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.span 
                          className="hero-stat-value"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                        >
                          {stat.value}
                        </motion.span>
                        <span className="hero-stat-label">{stat.label}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Availability indicator with Pulse */}
                  <motion.div 
                    className="hero-availability"
                    variants={fadeInUp}
                  >
                    <motion.span 
                      className="hero-availability-dot" 
                      aria-hidden="true"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <span className="hero-availability-text">
                      Open Now — Emergency 24/7
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Floating Badge — Top Left with Delayed Entrance */}
              <motion.div 
                className="hero-floating-badge-top" 
                aria-hidden="true"
                initial={{ opacity: 0, x: -30, y: -20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
                whileHover={{ scale: 1.05 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <div>
                  <p className="hero-badge-title">BMDC Certified</p>
                  <p className="hero-badge-subtitle">All Doctors Verified</p>
                </div>
              </motion.div>

              {/* Floating Badge — Bottom Right with Delayed Entrance */}
              <motion.div 
                className="hero-floating-badge-bottom" 
                aria-hidden="true"
                initial={{ opacity: 0, x: 30, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="hero-badge-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#86b437" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <p className="hero-badge-title">ISO 9001:2015</p>
                  <p className="hero-badge-subtitle">Quality Certified</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}