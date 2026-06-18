"use client";
import { useState } from "react";
import { siteConfig } from "@/constants/siteData";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Contact Info Cards */}
      <section className="page-section page-section--white">
        <div className="page-section__container">
          <div className="page-contact-info-grid">
            {[
              {
                icon: MapPin,
                label: "Our Address",
                value: `${siteConfig.address.street}, ${siteConfig.address.area}`,
                sub: `${siteConfig.address.city}, ${siteConfig.address.country}`,
                href: null,
              },
              {
                icon: Phone,
                label: "Phone",
                value: siteConfig.phone,
                sub: "24/7 Emergency Available",
                href: `tel:${siteConfig.phone}`,
              },
              {
                icon: Mail,
                label: "Email",
                value: siteConfig.email,
                sub: "We reply within 24 hours",
                href: `mailto:${siteConfig.email}`,
              },
              {
                icon: Clock,
                label: "Working Hours",
                value: "Sat – Thu: 8am – 8pm",
                sub: "Fri: 2pm – 8pm",
                href: null,
              },
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.label} className="page-contact-info-card">
                  <div className="page-contact-info-icon">
                    <IconComponent size={24} />
                  </div>
                  <p className="page-contact-info-label">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="page-contact-info-value page-contact-info-value--link">
                      {item.value}
                    </a>
                  ) : (
                    <p className="page-contact-info-value">{item.value}</p>
                  )}
                  <p className="page-contact-info-sub">{item.sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="page-section page-section--slate">
        <div className="page-section__container">
          <div className="page-contact-main-grid">

            {/* Contact Form */}
            <div className="page-contact-form-wrapper">
              <h2 className="page-contact-form-title">Send Us a Message</h2>
              <p className="page-contact-form-subtitle">
                Fill in the form below and we will get back to you within 24 hours.
              </p>

              {submitted ? (
                <div className="page-contact-success">
                  <div className="page-contact-success-icon">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="page-contact-success-title">Message Sent!</h3>
                  <p className="page-contact-success-text">
                    Thank you for contacting us. We will respond within 24 hours.
                  </p>
                  <button
                    type="button"
                    className="page-cta-btn"
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="page-contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="page-form-row">
                    <div className="page-form-group">
                      <label htmlFor="contact-name" className="page-form-label">Full Name *</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="page-form-input"
                        required
                      />
                    </div>
                    <div className="page-form-group">
                      <label htmlFor="contact-email" className="page-form-label">Email Address *</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="page-form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="page-form-row">
                    <div className="page-form-group">
                      <label htmlFor="contact-phone" className="page-form-label">Phone Number</label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+880 1XXX-XXXXXX"
                        className="page-form-input"
                      />
                    </div>
                    <div className="page-form-group">
                      <label htmlFor="contact-subject" className="page-form-label">Subject *</label>
                      <select
                        id="contact-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="page-form-input page-form-select"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="appointment">Book Appointment</option>
                        <option value="inquiry">General Inquiry</option>
                        <option value="services">Services Info</option>
                        <option value="billing">Billing &amp; Payments</option>
                        <option value="feedback">Feedback</option>
                        <option value="media">Media &amp; Press</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="page-form-group">
                    <label htmlFor="contact-message" className="page-form-label">Message *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      className="page-form-input page-form-textarea"
                      rows={5}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary page-form-submit">
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Map + Department Info */}
            <div className="page-contact-sidebar">
              <div className="page-contact-depts">
                <h3 className="page-contact-depts-title">Department Contacts</h3>
                {[
                  { dept: "Emergency", phone: siteConfig.phone },
                  { dept: "Appointments", phone: siteConfig.phone },
                  { dept: "Pharmacy", phone: siteConfig.phone },
                  { dept: "Billing", phone: siteConfig.phone },
                ].map((d) => (
                  <div key={d.dept} className="page-contact-dept-item">
                    <span className="page-contact-dept-name">{d.dept}</span>
                    <a href={`tel:${d.phone}`} className="page-contact-dept-phone">{d.phone}</a>
                  </div>
                ))}
              </div>
              <div className="page-contact-map-wrapper">
                <iframe
                  title="Renova Life Care Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9!2d90.4125!3d23.7905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ3JzI1LjgiTiA5MMKwMjQnNDUuMCJF!5e0!3m2!1sen!2sbd!4v1600000000000!5m2!1sen!2sbd"
                  width="100%"
                  height="260"
                  style={{ border: 0, borderRadius: "12px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}