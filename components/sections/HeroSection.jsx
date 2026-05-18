"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig, stats } from "@/constants/siteData";
import "./HeroSection.css";

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
      {/* Animated Background Slider */}
      <div className="hero-bg-slider" aria-hidden="true">
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
        
        {/* Slider Navigation Dots */}
        <div className="hero-slider-dots">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              className={`hero-slider-dot ${
                index === currentSlide ? "active" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? "true" : "false"}
            />
          ))}
        </div>
      </div>

      <div className="hero-container">
        <div className="hero-grid">

          {/* Left — Content */}
          <div className="hero-content-left">
            {/* Trust Badge */}
            <div className="hero-trust-badge">
              <div className="hero-trust-badge-icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span className="hero-trust-badge-text">
                Bangladesh's Most Trusted Healthcare
              </span>
            </div>

            {/* Headline */}
            <div className="hero-headline">
              <h1 className="hero-title">
                Your Health, Our{" "}
                <span className="hero-gradient-text">
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
                </span>
                {" "}—<br />
                <span className="hero-authority-text">Expert Care,</span> Every Step
              </h1>
              <p className="hero-description">
                {siteConfig.description} Experience compassionate, world-class medicine with a personal touch.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="hero-buttons">
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
            </div>

            {/* Trust Indicators */}
            <div className="hero-trust-indicators">
              <div className="hero-doctor-avatars" aria-hidden="true">
                {[
                  "/images/patients/01.jpg",
                  "/images/patients/02.jpg",
                  "/images/patients/03.jpg",
                  "/images/patients/04.jpg",
                ].map((src, i) => (
                  <div key={i} className="hero-avatar">
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
                  </div>
                ))}
              </div>
              <div className="hero-rating">
                <div className="hero-stars" aria-label="5 out of 5 stars rating">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden="true">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <p className="hero-rating-text">
                  <strong className="hero-rating-strong">15,000+ patients</strong> trust us
                </p>
              </div>
            </div>
          </div>

          {/* Right — Visual Card */}
          <div className="hero-visual-right">
            <div className="hero-card-wrapper">
              {/* Central health card */}
              <div className="hero-main-card">
                {/* Card background pattern */}
                <div className="hero-card-pattern" aria-hidden="true" />

                {/* Health Illustration */}
                <div className="hero-card-content">
                  {/* SVG Medical Cross */}
                  <div className="hero-medical-icon" aria-hidden="true">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="18" y="6" width="12" height="36" rx="3" fill="white" opacity="0.9"/>
                      <rect x="6" y="18" width="36" height="12" rx="3" fill="white" opacity="0.9"/>
                    </svg>
                  </div>

                  <div className="hero-card-text">
                    <h2 className="hero-card-title">
                      {siteConfig.name}
                    </h2>
                    <p className="hero-card-slogan">{siteConfig.slogan}</p>
                  </div>

                  {/* Quick Stat Pills */}
                  <div className="hero-stats-grid">
                    {stats.map((stat) => (
                      <div key={stat.label} className="hero-stat-item">
                        <span className="hero-stat-value">
                          {stat.value}
                        </span>
                        <span className="hero-stat-label">{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Availability indicator */}
                  <div className="hero-availability">
                    <span className="hero-availability-dot" aria-hidden="true" />
                    <span className="hero-availability-text">
                      Open Now — Emergency 24/7
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Badge — Top Left */}
              <div className="hero-floating-badge-top" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <div>
                  <p className="hero-badge-title">BMDC Certified</p>
                  <p className="hero-badge-subtitle">All Doctors Verified</p>
                </div>
              </div>

              {/* Floating Badge — Bottom Right */}
              <div className="hero-floating-badge-bottom" aria-hidden="true">
                <div className="hero-badge-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#86b437" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <p className="hero-badge-title">ISO 9001:2015</p>
                  <p className="hero-badge-subtitle">Quality Certified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}