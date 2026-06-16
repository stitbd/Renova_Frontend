// app/patient/help/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Mail, Phone, HelpCircle, AlertTriangle, ChevronDown } from "lucide-react";
import "./patient-help.css";

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

const quickSupport = [
  { icon: "chat", title: "Live Chat", desc: "Chat with Support", meta: "Avg. response: < 2 mins • Online", action: "Start Chat", color: "#014fa1" },
  { icon: "email", title: "Email Support", desc: "support@renovalifecare.com", meta: "Response within 24 hours", action: "Send Email", color: "#428a26" },
  { icon: "phone", title: "Call Support", desc: "+880 9612-345678", meta: "Sat–Thu, 9 AM – 10 PM", action: "Call Now", color: "#f59e0b" },
  { icon: "faq", title: "FAQs", desc: "Browse common questions", meta: "120+ Answers Available", action: "View FAQs", color: "#7c3aed" },
];

const myTickets = [
  { id: "#SUP-1005", subject: "Payment Issue for Consultation", date: "Jun 14, 2026", status: "Open", priority: "High" },
  { id: "#SUP-1002", subject: "Video freezing during session", date: "Jun 10, 2026", status: "Pending", priority: "Medium" },
  { id: "#SUP-0998", subject: "Refund request for cancelled app", date: "Jun 05, 2026", status: "Closed", priority: "Low" },
];

const systemStatus = [
  { name: "Video Service", status: "Operational", type: "operational" },
  { name: "Payment Gateway", status: "Operational", type: "operational" },
  { name: "Notifications", status: "Under Maintenance", type: "maintenance" },
];

const categorizedFaqs = {
  "Appointments": [
    { q: "How do I book an appointment?", a: "Click on 'Book Appointment' from the dashboard, select your preferred doctor, date, and time slot." },
    { q: "Can I cancel an appointment?", a: "Yes, go to Appointments, find your booking, and click 'Cancel'. Cancellations are free up to 2 hours before the slot." },
  ],
  "Video Consultation": [
    { q: "Camera/Microphone isn't working.", a: "Please check your browser permissions. Ensure you have allowed camera and mic access for our website." },
    { q: "Doctor didn't join the session.", a: "Wait for 5 minutes. If the doctor doesn't join, you will automatically receive a full refund and can reschedule." },
  ],
  "Prescriptions": [
    { q: "How do I download my prescription?", a: "Go to the Prescriptions section, click on the specific prescription, and select 'Download PDF'." },
  ],
  "Payments": [
    { q: "My payment failed but amount was deducted.", a: "Don't worry. Failed transactions are automatically reversed within 5-7 working days." },
  ],
  "Account": [
    { q: "How do I change my password?", a: "Go to Profile > Security > Change Password. You will need to verify your email/phone." },
  ]
};

const contactDetails = [
  { label: "Email", value: "support@renovalifecare.com" },
  { label: "Phone", value: "+880 9612-345678" },
  { label: "Office Hours", value: "Sat–Thu, 9 AM – 10 PM" },
  { label: "Address", value: "House 12, Road 5, Dhanmondi, Dhaka" },
];

export default function HelpSupportPage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState(null);
  const [activeFaqCategory, setActiveFaqCategory] = useState("Appointments");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    category: "",
    priority: "Medium",
    subject: "",
    message: "",
    contactMethod: "Email",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Thank you! Your support request has been submitted.");
    setTimeout(() => setMessage(""), 4000);
  };

  const handleFileChange = (e) => {
    // Handle file upload logic here
  };

  return (
    <motion.div
      className="help-page"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Support Header */}
      <motion.div className="support-header" variants={item}>
        <h1>Help & Support</h1>
        <p>We're here to help you 24/7. Find answers, contact support, or report a problem.</p>
      </motion.div>

      {/* Quick Support Cards */}
      <motion.div className="contact-options-grid" variants={container} initial="hidden" animate="show">
        {quickSupport.map((opt, idx) => (
          <motion.div
            key={idx}
            className="contact-option-card"
            variants={item}
            whileHover={{ y: -6, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", transition: { duration: 0.2 } }}
            style={{ borderLeftColor: opt.color }}
          >
            <motion.div className="contact-icon" style={{ backgroundColor: `${opt.color}15`, color: opt.color }} whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 400 }}>
              {opt.icon === "chat" && <MessageCircle size={20} />}
              {opt.icon === "email" && <Mail size={20} />}
              {opt.icon === "phone" && <Phone size={20} />}
              {opt.icon === "faq" && <HelpCircle size={20} />}
            </motion.div>
            <div className="contact-info">
              <h4>{opt.title}</h4>
              <p>{opt.desc}</p>
              <small style={{ color: "#94a3b8", fontSize: "11px" }}>{opt.meta}</small>
            </div>
            <motion.button
              className="contact-action-btn"
              style={{ color: opt.color, borderColor: opt.color }}
              whileHover={{ scale: 1.05, backgroundColor: opt.color, color: "#fff" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => opt.icon === "faq" ? router.push("/patient-portal/help/faq") : undefined}
            >
              {opt.action}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      {/* Emergency Support */}
      <motion.div className="emergency-card" variants={item}>
        <div className="emergency-icon">
          <AlertTriangle size={24} color="#fff" />
        </div>
        <div className="emergency-content">
          <h4>Medical Emergency?</h4>
          <p>If this is a life-threatening emergency, call your local emergency services immediately. Do not use this app for emergencies.</p>
          <div className="emergency-number">Call 999</div>
        </div>
      </motion.div>

      {/* My Support Tickets */}
      <motion.div className="tickets-section" variants={item}>
        <div className="tickets-section-header">
          <h3>My Support Tickets List</h3>
          <button className="btn-create-ticket">
            <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Create Ticket
          </button>
        </div>
        <div className="tickets-table">
          <table>
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Subject</th>
                <th>Created Date</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myTickets.map((ticket, idx) => (
                <tr key={idx}>
                  <td>{ticket.id}</td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.date}</td>
                  <td><span className={`status-badge status-${ticket.status.toLowerCase()}`}>{ticket.status}</span></td>
                  <td><span className={`priority-${ticket.priority.toLowerCase()}`}>{ticket.priority}</span></td>
                  <td><button className="btn-view-ticket">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Cards */}
          <div className="ticket-cards">
            {myTickets.map((ticket, idx) => (
              <div key={idx} className="ticket-card">
                <div className="ticket-card-header">
                  <div>
                    <div className="ticket-card-id">{ticket.id}</div>
                    <div className="ticket-card-subject">{ticket.subject}</div>
                  </div>
                  <span className={`status-badge status-${ticket.status.toLowerCase()}`}>{ticket.status}</span>
                </div>
                <div className="ticket-card-footer">
                  <div className="ticket-card-meta">
                    <span className="ticket-card-date">{ticket.date}</span>
                    <span className={`priority-${ticket.priority.toLowerCase()}`}>● {ticket.priority}</span>
                  </div>
                  <button className="btn-view-ticket">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Contact Information */}
      <motion.div className="contact-info-section" variants={item}>
        <h3>Contact Information</h3>
        <div className="contact-info-grid">
          {contactDetails.map((info, idx) => (
            <div key={idx} className="contact-detail-card">
              <h4>{info.label}</h4>
              <p>{info.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Enhanced Contact Form */}
      <motion.div className="contact-form-section" variants={item}>
        <h3>Send a Support Request</h3>
        <motion.form onSubmit={handleSubmit} className="contact-form" variants={container} initial="hidden" animate="show">
          <div className="form-grid">
            <motion.div className="form-field" variants={item}>
              <label>Issue Category</label>
              <select required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                <option value="">Select Category</option>
                <option>Appointment</option>
                <option>Video Consultation</option>
                <option>Prescription</option>
                <option>Payment</option>
                <option>Refund</option>
                <option>Account</option>
                <option>Technical Issue</option>
                <option>Other</option>
              </select>
            </motion.div>
            <motion.div className="form-field" variants={item}>
              <label>Priority</label>
              <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </motion.div>
          </div>

          <motion.div className="form-field" variants={item}>
            <label>Subject</label>
            <input type="text" placeholder="Brief summary of your issue" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
          </motion.div>

          <motion.div className="form-field" variants={item}>
            <label>Message</label>
            <textarea rows={4} placeholder="Describe your issue in detail..." required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
          </motion.div>

          <motion.div className="form-field" variants={item}>
            <label>Attachment (Optional)</label>
            <label className="file-upload-area">
              <input type="file" hidden accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileChange} />
              <p>Drag & drop or <span>browse files</span></p>
              <p style={{ fontSize: "11px", marginTop: "4px" }}>Supported: JPG, PNG, PDF</p>
            </label>
          </motion.div>

          <motion.div className="form-field" variants={item}>
            <label>Preferred Contact Method</label>
            <div className="radio-group">
              {["Email", "Phone", "Live Chat"].map((method) => (
                <label key={method} className="radio-option">
                  <input type="radio" name="contactMethod" value={method} checked={formData.contactMethod === method} onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })} />
                  {method}
                </label>
              ))}
            </div>
          </motion.div>

          <motion.button type="submit" className="btn-send-message" variants={item} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 300 }}>
            Submit Support Request
          </motion.button>

          <AnimatePresence>
            {message && (
              <motion.p className="form-success" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ type: "spring", stiffness: 300 }}>
                {message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </motion.div>

    </motion.div>
  );
}