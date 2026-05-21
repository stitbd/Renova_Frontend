// app/patient/help/page.jsx
"use client";

import { useState } from "react";

const faqs = [
  { q: "How do I book an appointment?", a: "Click on 'Book Appointment' from the dashboard or appointments page, select your preferred doctor, date, and time slot." },
  { q: "How can I view my prescriptions?", a: "Go to the Prescriptions section from the sidebar. Click on any prescription to view details and download PDF." },
  { q: "What if I need to reschedule?", a: "Navigate to Appointments, find your upcoming appointment, and click 'Reschedule' to choose a new time." },
  { q: "How do I contact support?", a: "Use the chat button in the bottom right corner, or email us at support@renovalife.com" },
  { q: "Is my data secure?", a: "Yes, all your health data is encrypted and stored securely. We comply with healthcare privacy regulations." },
];

const contactOptions = [
  { icon: "chat", title: "Live Chat", desc: "Chat with our support team", action: "Start Chat" },
  { icon: "email", title: "Email Support", desc: "support@renovalife.com", action: "Send Email" },
  { icon: "phone", title: "Call Us", desc: "+880 9612-345678", action: "Call Now" },
  { icon: "faq", title: "FAQs", desc: "Browse common questions", action: "View FAQs" },
];

export default function HelpSupportPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle message submission
    setMessage("Thank you! We'll get back to you soon.");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="help-page">
      {/* Quick Contact */}
      <div className="contact-options-grid">
        {contactOptions.map((opt, idx) => (
          <div key={idx} className="contact-option-card">
            <div className="contact-icon">
              {opt.icon === "chat" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>}
              {opt.icon === "email" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>}
              {opt.icon === "phone" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 0-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>}
              {opt.icon === "faq" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>}
            </div>
            <div className="contact-info">
              <h4>{opt.title}</h4>
              <p>{opt.desc}</p>
            </div>
            <button className="contact-action-btn">{opt.action}</button>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="faqs-section">
        <h3>Frequently Asked Questions</h3>
        <div className="faqs-list">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`faq-item ${openFaq === idx ? "open" : ""}`}>
              <button className="faq-question" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                {faq.q}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points={openFaq === idx ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
                </svg>
              </button>
              {openFaq === idx && <p className="faq-answer">{faq.a}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="contact-form-section">
        <h3>Send us a Message</h3>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-field">
            <label>Subject</label>
            <input type="text" placeholder="What do you need help with?" required />
          </div>
          <div className="form-field full">
            <label>Message</label>
            <textarea rows={4} placeholder="Describe your issue..." required />
          </div>
          <button type="submit" className="btn-send-message">Send Message</button>
          {message && <p className="form-success">{message}</p>}
        </form>
      </div>
    </div>
  );
}