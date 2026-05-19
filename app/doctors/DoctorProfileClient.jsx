"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/common/Button";
import "@/styles/pages/doctor-profile.css";
import "@/styles/components/HeroSection.css";

/* ═══════════════════════════════════════════════════════════════
   SVG ICONS
   ═══════════════════════════════════════════════════════════════ */
const Icons = {
  Star: ({ filled = false }) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Calendar: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Clock: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Location: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Phone: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 4.08 4.18 2 2 0 0 1 6.06 2h3a2 2 0 0 1 2 1.72c.127.946.36 1.874.69 2.76a2 2 0 0 1-.45 2.11L10.09 9.91a16 16 0 0 0 6.29 6.29l1.13-1.14a2 2 0 0 1 2.11-.45c.886.33 1.814.563 2.76.69A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Mail: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Award: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  ),
  Book: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  Users: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Globe: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  ChevronDown: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  Share: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
};

/* ═══════════════════════════════════════════════════════════════
   DOCTOR PROFILE CLIENT COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function DoctorProfileClient({ doctor }) {
  const [activeTab, setActiveTab] = useState("about");
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icons.Star key={i} filled={i <= Math.round(rating)} />
      );
    }
    return stars;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <main className="doctor-profile">
      <div className="page-section__container">
        {/* Doctor Header */}
        <section className="doctor-header">
          <div className="doctor-header__content">
            <div className="doctor-header__image">
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="doctor-header__photo"
                loading="eager"
              />
              <div className="doctor-header__badge">
                <Icons.Check /> Verified
              </div>
            </div>
            
            <div className="doctor-header__info">
              <div className="doctor-header__titles">
                <h1 className="doctor-header__name">{doctor.name}</h1>
                <p className="doctor-header__title">{doctor.title}</p>
                <span className="doctor-header__department">{doctor.department}</span>
              </div>
              
              <div className="doctor-header__rating">
                <div className="rating-stars">
                  {renderStars(doctor.rating)}
                </div>
                <span className="rating-value">{doctor.rating}</span>
                <span className="rating-count">({doctor.reviewCount} reviews)</span>
              </div>
              
              <div className="doctor-header__quick-info">
                <div className="quick-info-item">
                  <Icons.Award />
                  <span>{doctor.experience}+ Years</span>
                </div>
                <div className="quick-info-item">
                  <Icons.Users />
                  <span>{doctor.patients} Patients</span>
                </div>
                <div className="quick-info-item">
                  <Icons.Globe />
                  <span>{doctor.languages.join(", ")}</span>
                </div>
              </div>
              
              <div className="doctor-header__actions">
                <Button variant="primary" href="/appointment" className="doctor-cta-btn">
                  <Icons.Calendar /> Book Appointment
                </Button>
                <Button variant="secondary" className="doctor-cta-btn" onClick={() => {
                  navigator.share?.({
                    title: doctor.name,
                    text: `Consult with ${doctor.name}, ${doctor.title}`,
                    url: window.location.href,
                  });
                }}>
                  <Icons.Share /> Share Profile
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="doctor-content-grid">
          {/* Left Column - Main Content */}
          <div className="doctor-main">
            {/* Tabs Navigation */}
            <div className="doctor-tabs">
              {["about", "education", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`doctor-tab ${activeTab === tab ? "active" : ""}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab === "reviews" && ` (${doctor.reviews.length})`}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="doctor-tab-content">
              {/* About Tab */}
              {activeTab === "about" && (
                <div className="tab-panel active">
                  <div className="doctor-bio">
                    <h3>About Dr. {doctor.name.split(" ").pop()}</h3>
                    <p>{doctor.bio}</p>
                  </div>

                  <div className="doctor-specialties">
                    <h3>Specialties & Expertise</h3>
                    <div className="specialties-grid">
                      {doctor.specialties.map((specialty, index) => (
                        <span key={index} className="specialty-tag">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="doctor-consultation-info">
                    <h3>Consultation Details</h3>
                    <div className="consultation-grid">
                      <div className="consultation-item">
                        <Icons.Calendar />
                        <div>
                          <strong>Available Days</strong>
                          <p>{doctor.availableDays.join(", ")}</p>
                        </div>
                      </div>
                      <div className="consultation-item">
                        <Icons.Clock />
                        <div>
                          <strong>Time Slots</strong>
                          <p>{doctor.availableTimes.join(" | ")}</p>
                        </div>
                      </div>
                      <div className="consultation-item">
                        <Icons.Award />
                        <div>
                          <strong>Consultation Fee</strong>
                          <p>BDT {doctor.consultationFee.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Education Tab */}
              {activeTab === "education" && (
                <div className="tab-panel">
                  <div className="education-section">
                    <h3>Education & Training</h3>
                    <div className="timeline">
                      {doctor.education.map((edu, index) => (
                        <div key={index} className="timeline-item">
                          <div className="timeline-dot" />
                          <div className="timeline-content">
                            <span className="timeline-year">{edu.year}</span>
                            <h4>{edu.degree}</h4>
                            <p>{edu.institution}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="certifications-section">
                    <h3>Certifications & Memberships</h3>
                    <ul className="certifications-list">
                      {doctor.certifications.map((cert, index) => (
                        <li key={index}>
                          <Icons.Check />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === "reviews" && (
                <div className="tab-panel">
                  <div className="reviews-summary">
                    <div className="reviews-average">
                      <span className="reviews-score">{doctor.rating}</span>
                      <div className="reviews-stars">
                        {renderStars(doctor.rating)}
                      </div>
                      <span className="reviews-total">{doctor.reviewCount} Reviews</span>
                    </div>
                    <div className="reviews-breakdown">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = doctor.reviews.filter(r => r.rating === star).length;
                        const percentage = (count / doctor.reviews.length) * 100;
                        return (
                          <div key={star} className="review-bar">
                            <span className="review-bar-star">{star} ★</span>
                            <div className="review-bar-progress">
                              <div className="review-bar-fill" style={{ width: `${percentage}%` }} />
                            </div>
                            <span className="review-bar-count">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="reviews-list">
                    {(showAllReviews ? doctor.reviews : doctor.reviews.slice(0, 3)).map((review) => (
                      <div key={review.id} className="review-card">
                        <div className="review-header">
                          <div className="review-patient">
                            <span className="review-patient-name">{review.patient}</span>
                            <span className="review-date">{formatDate(review.date)}</span>
                          </div>
                          <div className="review-rating">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p className="review-comment">{review.comment}</p>
                      </div>
                    ))}
                    
                    {doctor.reviews.length > 3 && (
                      <button 
                        className="reviews-load-more"
                        onClick={() => setShowAllReviews(!showAllReviews)}
                      >
                        {showAllReviews ? "Show Less" : `View All ${doctor.reviews.length} Reviews`}
                        <Icons.ChevronDown />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <aside className="doctor-sidebar">
            <div className="doctor-sidebar__card">
              <h4>📍 Location & Contact</h4>
              <div className="contact-item">
                <Icons.Location />
                <span>{doctor.location}</span>
              </div>
              <a href={`tel:${doctor.phone}`} className="contact-link">
                <Icons.Phone />
                <span>{doctor.phone}</span>
              </a>
              <a href={`mailto:${doctor.email}`} className="contact-link">
                <Icons.Mail />
                <span>{doctor.email}</span>
              </a>
            </div>

            <div className="doctor-sidebar__card">
              <h4>🏥 Branch Information</h4>
              <p className="sidebar-note">
                Dr. {doctor.name.split(" ").pop()} consults at our main facility with state-of-the-art diagnostic equipment and a dedicated cardiac care unit.
              </p>
              <Link href="/facilities" className="sidebar-link">
                View Facility Details →
              </Link>
            </div>

            <div className="doctor-sidebar__card">
              <h4>💡 Before Your Visit</h4>
              <ul className="visit-tips">
                <li>Arrive 15 minutes early for registration</li>
                <li>Bring previous medical reports if any</li>
                <li>Carry a valid ID for verification</li>
                <li>Fast for 8-12 hours if blood tests are scheduled</li>
              </ul>
            </div>

            <div className="doctor-sidebar__emergency">
              <Icons.Phone />
              <div>
                <strong>Emergency?</strong>
                <p>For urgent cardiac concerns, visit our Emergency Ward or call:</p>
                <a href="tel:+8801700000000" className="emergency-phone">+880 1700-000000</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}