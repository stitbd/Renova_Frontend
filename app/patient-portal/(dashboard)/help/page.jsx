// app/patient/help/page.jsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const faqs = [
  { q: "How do I book an appointment?", a: "Click on 'Book Appointment' from the dashboard or appointments page, select your preferred doctor, date, and time slot." },
  { q: "How can I view my prescriptions?", a: "Go to the Prescriptions section from the sidebar. Click on any prescription to view details and download PDF." },
  { q: "What if I need to reschedule?", a: "Navigate to Appointments, find your upcoming appointment, and click 'Reschedule' to choose a new time." },
  { q: "How do I contact support?", a: "Use the chat button in the bottom right corner, or email us at support@renovalife.com" },
  { q: "Is my data secure?", a: "Yes, all your health data is encrypted and stored securely. We comply with healthcare privacy regulations." },
];

const contactOptions = [
  { icon: "chat", title: "Live Chat", desc: "Chat with our support team", action: "Start Chat", color: "#014fa1" },
  { icon: "email", title: "Email Support", desc: "support@renovalife.com", action: "Send Email", color: "#428a26" },
  { icon: "phone", title: "Call Us", desc: "+880 9612-345678", action: "Call Now", color: "#f59e0b" },
  { icon: "faq", title: "FAQs", desc: "Browse common questions", action: "View FAQs", color: "#7c3aed" },
];

export default function HelpSupportPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Thank you! We'll get back to you soon.");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <motion.div 
      className="help-page"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Quick Contact */}
      <motion.div 
        className="contact-options-grid"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {contactOptions.map((opt, idx) => (
          <motion.div 
            key={idx} 
            className="contact-option-card"
            variants={item}
            whileHover={{ 
              y: -6,
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              transition: { duration: 0.2 }
            }}
            style={{ borderLeftColor: opt.color }}
          >
            <motion.div 
              className="contact-icon"
              style={{ backgroundColor: `${opt.color}15`, color: opt.color }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {opt.icon === "chat" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>}
              {opt.icon === "email" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>}
              {opt.icon === "phone" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 0-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>}
              {opt.icon === "faq" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>}
            </motion.div>
            <div className="contact-info">
              <motion.h4
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {opt.title}
              </motion.h4>
              <p>{opt.desc}</p>
            </div>
            <motion.button 
              className="contact-action-btn"
              style={{ color: opt.color, borderColor: opt.color }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: opt.color, 
                color: "#fff" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              {opt.action}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* FAQs */}
      <motion.div 
        className="faqs-section"
        variants={item}
      >
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Frequently Asked Questions
        </motion.h3>
        <motion.div 
          className="faqs-list"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx} 
              className={`faq-item ${openFaq === idx ? "open" : ""}`}
              variants={item}
              layout
            >
              <motion.button 
                className="faq-question" 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                whileHover={{ backgroundColor: "#f8fafc" }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 }}
                >
                  {faq.q}
                </motion.span>
                <motion.svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  animate={{ rotate: openFaq === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <polyline points={openFaq === idx ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
                </motion.svg>
              </motion.button>
              
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.p 
                    className="faq-answer"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Contact Form */}
      <motion.div 
        className="contact-form-section"
        variants={item}
      >
        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Send us a Message
        </motion.h3>
        <motion.form 
          onSubmit={handleSubmit} 
          className="contact-form"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div 
            className="form-field"
            variants={item}
          >
            <label>Subject</label>
            <motion.input 
              type="text" 
              placeholder="What do you need help with?" 
              required
              whileFocus={{ borderColor: "#014fa1", boxShadow: "0 0 0 3px rgba(1,79,161,0.1)" }}
            />
          </motion.div>
          <motion.div 
            className="form-field full"
            variants={item}
          >
            <label>Message</label>
            <motion.textarea 
              rows={4} 
              placeholder="Describe your issue..." 
              required
              whileFocus={{ borderColor: "#014fa1", boxShadow: "0 0 0 3px rgba(1,79,161,0.1)" }}
            />
          </motion.div>
          <motion.button 
            type="submit" 
            className="btn-send-message"
            variants={item}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Send Message
          </motion.button>
          
          <AnimatePresence>
            {message && (
              <motion.p 
                className="form-success"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </motion.div>
    </motion.div>
  );
}