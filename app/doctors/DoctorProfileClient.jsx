"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/common/Button";
import "@/styles/pages/doctor-profile.css";
import "@/styles/components/HeroSection.css";
import {
  Star,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Check,
  Award,
  Book,
  Users,
  Globe,
  ChevronDown,
  Share2,
  Stethoscope,
  Heart,
  User
} from "lucide-react";

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
        <Star key={i} size={16} fill={i <= Math.round(rating) ? "currentColor" : "none"} />
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
                <Check size={16} /> Verified
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
                  <Award size={18} />
                  <span>{doctor.experience}+ Years</span>
                </div>
                <div className="quick-info-item">
                  <Users size={18} />
                  <span>{doctor.patients} Patients</span>
                </div>
                <div className="quick-info-item">
                  <Globe size={18} />
                  <span>{doctor.languages.join(", ")}</span>
                </div>
              </div>

              <div className="doctor-header__actions">
                <Button variant="primary" href="/appointment" className="doctor-cta-btn">
                  <Calendar size={18} /> Book Appointment
                </Button>
                <Button variant="secondary" className="doctor-cta-btn" onClick={() => {
                  navigator.share?.({
                    title: doctor.name,
                    text: `Consult with ${doctor.name}, ${doctor.title}`,
                    url: window.location.href,
                  });
                }}>
                  <Share2 size={18} /> Share Profile
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
                        <Calendar size={18} />
                        <div>
                          <strong>Available Days</strong>
                          <p>{doctor.availableDays.join(", ")}</p>
                        </div>
                      </div>
                      <div className="consultation-item">
                        <Clock size={18} />
                        <div>
                          <strong>Time Slots</strong>
                          <p>{doctor.availableTimes.join(" | ")}</p>
                        </div>
                      </div>
                      <div className="consultation-item">
                        <Award size={18} />
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
                          <Check size={16} />
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
                        <ChevronDown size={20} />
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
                <MapPin size={18} />
                <span>{doctor.location}</span>
              </div>
              <a href={`tel:${doctor.phone}`} className="contact-link">
                <Phone size={18} />
                <span>{doctor.phone}</span>
              </a>
              <a href={`mailto:${doctor.email}`} className="contact-link">
                <Mail size={18} />
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
              <Phone size={18} />
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