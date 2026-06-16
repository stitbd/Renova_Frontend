"use client";

import { useState, useMemo } from "react";
import "@/styles/pages/faq.css";
import "@/styles/components/HeroSection.css";

// Note: Since this is a Client Component ("use client"), `metadata` cannot be exported here.
// Please move the `metadata` export to a `layout.js` file or a separate Server Component wrapper.

// =============================================
// FAQ DATA
// =============================================
const faqCategories = [
  {
    id: "popular",
    title: "🔥 Most Popular",
    questions: [
      { id: "pop1", q: "How do I join a video consultation?", a: "Go to 'My Appointments', find your upcoming consultation, and click the 'Join Video Call' button 5 minutes before the scheduled time. Ensure your camera and microphone permissions are enabled.", related: ["Camera isn't working", "How early should I join?"] },
      { id: "pop2", q: "How do I book an appointment?", a: "Click 'Book Appointment' on the dashboard, select your preferred doctor, specialty, and time slot. You can pay online or choose to pay at the time of consultation.", related: ["How do I reschedule?", "Can I book for my family member?"] },
      { id: "pop3", q: "Doctor didn't join the consultation.", a: "Please wait for 5 minutes. If the doctor still hasn't joined, click 'Report No-Show' in the consultation room. You will receive a full refund or can reschedule for free.", related: ["Refund policy", "Urgent consultation"] },
      { id: "pop4", q: "How can I download my prescription?", a: "After your consultation, go to 'Prescriptions' in your dashboard. Click on the relevant prescription and select 'Download PDF'. You can also share it directly via email or WhatsApp.", related: ["Lost prescription", "Medication refill"] },
      { id: "pop5", q: "How do I reschedule an appointment?", a: "Go to 'My Appointments', select the appointment, and click 'Reschedule'. Choose a new available slot. You can reschedule up to 2 hours before the original time without any fee.", related: ["Can I cancel an appointment?", "What happens if I miss my appointment?"] }
    ]
  },
  {
    id: "appointments",
    title: "📅 Appointments",
    questions: [
      { id: "apt1", q: "How do I book an appointment?", a: "Click 'Book Appointment' on the dashboard, select your preferred doctor, specialty, and time slot. You can pay online or choose to pay at the time of consultation." },
      { id: "apt2", q: "How do I reschedule?", a: "Go to 'My Appointments', select the appointment, and click 'Reschedule'. Choose a new available slot. You can reschedule up to 2 hours before the original time without any fee." },
      { id: "apt3", q: "Can I cancel an appointment?", a: "Yes, you can cancel up to 2 hours before the scheduled time for a full refund. Cancellations within 2 hours may incur a small fee." },
      { id: "apt4", q: "Will I get appointment reminders?", a: "Yes, you will receive SMS and email reminders 24 hours and 1 hour before your appointment. You can manage notification preferences in your account settings." },
      { id: "apt5", q: "Can I book for my family member?", a: "Yes. During booking, select 'Book for someone else' and enter their details. You can manage multiple family profiles under your account." },
      { id: "apt6", q: "What happens if I miss my appointment?", a: "If you miss your appointment without canceling, it will be marked as a 'No-Show'. Repeated no-shows may restrict your ability to book future appointments." }
    ]
  },
  {
    id: "videoConsultation",
    title: "📹 Video Consultation",
    questions: [
      { id: "vid1", q: "How do I join my video consultation?", a: "Go to 'My Appointments', find your upcoming consultation, and click the 'Join Video Call' button 5 minutes before the scheduled time." },
      { id: "vid2", q: "How early should I join?", a: "We recommend joining 5 minutes early to test your audio and video setup and ensure a stable connection." },
      { id: "vid3", q: "Camera isn't working.", a: "Check if your browser or app has camera permissions enabled. Try refreshing the page or switching browsers. If using the app, ensure no other app is using the camera." },
      { id: "vid4", q: "Microphone isn't working.", a: "Ensure microphone permissions are granted. Check your device's sound settings to make sure the correct microphone is selected and not muted." },
      { id: "vid5", q: "Doctor hasn't joined.", a: "Please wait for 5 minutes. If the doctor still hasn't joined, click 'Report No-Show' in the consultation room. You will receive a full refund or can reschedule for free." },
      { id: "vid6", q: "Video freezes.", a: "This is usually due to a slow internet connection. Try moving closer to your router, switching to mobile data, or lowering the video quality in settings." },
      { id: "vid7", q: "Audio echo issue.", a: "Ensure you are using headphones or earphones. If using speakers, lower the volume and move the microphone away from the speakers to prevent feedback." },
      { id: "vid8", q: "Internet requirements.", a: "For a smooth HD video consultation, we recommend a stable internet connection with at least 5 Mbps download and 2 Mbps upload speed." },
      { id: "vid9", q: "Can I switch devices?", a: "Yes, you can join from a different device if needed. Simply log in to your account on the new device and click 'Join Video Call' from the appointment details." },
      { id: "vid10", q: "Can I reconnect after disconnecting?", a: "Yes. If you get disconnected, simply click the 'Join Video Call' link again. The doctor will be notified, and the consultation timer will not run while you are disconnected." },
      { id: "vid11", q: "Can I record the consultation?", a: "For privacy and legal reasons, patients cannot record the consultation. However, you will receive a summary and prescription in your dashboard after the call." },
      { id: "vid12", q: "Can someone join with me?", a: "Yes, you can share the consultation link with a family member or caregiver so they can join the video call with you." }
    ]
  },
  {
    id: "doctors",
    title: "🩺 Doctors",
    questions: [
      { id: "doc1", q: "How do I find a doctor?", a: "Use the 'Find a Doctor' section. You can filter by specialty, location, availability, and patient ratings to find the best match for your needs." },
      { id: "doc2", q: "Can I choose another doctor?", a: "Yes, you can change your doctor at any time before confirming the appointment. You can also switch doctors for future consultations." },
      { id: "doc3", q: "How do I view doctor's profile?", a: "Click on the doctor's name during booking or in 'My Appointments' to see their full profile, qualifications, experience, and patient reviews." },
      { id: "doc4", q: "Can I consult the same doctor again?", a: "Yes, go to 'Past Consultations' and click 'Consult Again' to book a follow-up with the same doctor." },
      { id: "doc5", q: "How do I rate a doctor?", a: "After your consultation, you will receive a prompt to rate the doctor and leave a review. Your feedback helps us maintain high quality care." }
    ]
  },
  {
    id: "prescriptions",
    title: "💊 Prescriptions",
    questions: [
      { id: "pre1", q: "Where can I find my prescriptions?", a: "Go to the 'Prescriptions' tab in your dashboard to view all past and current prescriptions issued by our doctors." },
      { id: "pre2", q: "How to download Prescription PDF?", a: "Open the prescription in your dashboard and click the 'Download PDF' button to save it to your device." },
      { id: "pre3", q: "How to share Prescription?", a: "Click the 'Share' icon next to the prescription to send it securely via email, WhatsApp, or SMS." },
      { id: "pre4", q: "Prescription validity?", a: "Prescriptions are typically valid for 30 days from the date of issue, unless specified otherwise by the doctor." },
      { id: "pre5", q: "Medication refill?", a: "Go to 'Prescriptions', select the medication, and click 'Request Refill'. Your doctor will review and approve it if clinically appropriate." },
      { id: "pre6", q: "Lost prescription?", a: "All your prescriptions are securely stored in your digital dashboard. You can access and download them anytime." }
    ]
  },
  {
    id: "medicalRecords",
    title: "📄 Medical Records",
    questions: [
      { id: "rec1", q: "How to upload reports?", a: "Go to 'Medical Records', click 'Upload', and select files from your device. Supported formats: PDF, JPG, PNG (Max 5MB)." },
      { id: "rec2", q: "How to download reports?", a: "Open the report in 'Medical Records' and click 'Download' to save a copy to your device." },
      { id: "rec3", q: "Can I delete reports?", a: "Yes, you can delete reports you uploaded yourself. Note: Records uploaded by doctors during consultations cannot be deleted by patients." },
      { id: "rec4", q: "How to share reports?", a: "Click the 'Share' icon next to the report to share it securely with another doctor or family member via a temporary link." },
      { id: "rec5", q: "Lab reports?", a: "Lab reports from our partner diagnostic centers are automatically synced and added to your 'Medical Records'." },
      { id: "rec6", q: "Imaging reports?", a: "X-rays, MRIs, and other imaging reports are also automatically synced if done through our network hospitals." }
    ]
  },
  {
    id: "payments",
    title: "💳 Payments & Billing",
    questions: [
      { id: "pay1", q: "Payment methods?", a: "We accept Credit/Debit Cards, Mobile Banking (bKash, Nagad, Rocket), Bank Transfer, and Renova Wallet payments." },
      { id: "pay2", q: "Payment failed?", a: "Check your internet connection and payment details. If the amount was deducted but the booking failed, it will be refunded within 5-7 business days." },
      { id: "pay3", q: "Refund policy?", a: "Full refunds are issued for cancellations >2 hours before the appointment, doctor no-shows, or technical failures during consultation." },
      { id: "pay4", q: "Invoice download?", a: "Go to 'Payments' -> 'Invoices' to download detailed, itemized invoices for all your transactions." },
      { id: "pay5", q: "Consultation fee?", a: "Fees vary by doctor and specialty. The exact fee is clearly displayed before you confirm the booking." },
      { id: "pay6", q: "Promo code?", a: "Enter your promo code in the 'Apply Coupon' field during checkout to avail discounts on your consultation fee." },
      { id: "pay7", q: "Wallet payment?", a: "You can add funds to your Renova Wallet and use it for fast, one-click payments without entering card details every time." }
    ]
  },
  {
    id: "account",
    title: "👤 Account & Profile",
    questions: [
      { id: "acc1", q: "Edit profile?", a: "Go to 'Profile Settings' to update your name, contact info, and medical history." },
      { id: "acc2", q: "Change password?", a: "Go to 'Security Settings' -> 'Change Password'. You will need to enter your current password for verification." },
      { id: "acc3", q: "Change phone number?", a: "Go to 'Profile Settings' -> 'Contact Info'. You will need to verify the new number via an OTP sent via SMS." },
      { id: "acc4", q: "Change email?", a: "Go to 'Profile Settings' -> 'Contact Info'. Verify the new email via a confirmation link sent to your inbox." },
      { id: "acc5", q: "Delete account?", a: "Go to 'Settings' -> 'Delete Account'. Note: Medical records are retained for 10 years as per national healthcare regulations." },
      { id: "acc6", q: "Logout all devices?", a: "Go to 'Security Settings' -> 'Logout from all devices' to secure your account if you suspect unauthorized access." },
      { id: "acc7", q: "Enable 2FA?", a: "Go to 'Security Settings' -> 'Two-Factor Authentication' to add an extra layer of security to your account." }
    ]
  },
  {
    id: "privacy",
    title: "🔒 Privacy & Security",
    questions: [
      { id: "pri1", q: "Is my data secure?", a: "Yes, we use end-to-end encryption and comply with national data protection laws to ensure your health data is completely secure." },
      { id: "pri2", q: "Who can access my records?", a: "Only you and healthcare providers you explicitly authorize can access your medical records." },
      { id: "pri3", q: "Data encryption?", a: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256) to prevent unauthorized access." },
      { id: "pri4", q: "Download my data?", a: "Go to 'Privacy Settings' -> 'Download My Data' to get a secure ZIP file of all your personal and medical records." },
      { id: "pri5", q: "Delete my data?", a: "You can request data deletion in 'Privacy Settings'. Some data is retained for legal and medical compliance requirements." },
      { id: "pri6", q: "Sharing permissions?", a: "Go to 'Privacy Settings' -> 'Sharing Permissions' to control exactly who can view your records and for how long." }
    ]
  },
  {
    id: "technical",
    title: "🛠 Technical Support",
    questions: [
      { id: "tec1", q: "Browser support?", a: "We support the latest versions of Chrome, Firefox, Safari, and Edge for the best experience." },
      { id: "tec2", q: "Mobile app support?", a: "Our app supports iOS 13+ and Android 8.0+. Ensure you have the latest version installed." },
      { id: "tec3", q: "Camera permission?", a: "If prompted, allow camera access in your browser or app settings. You can change this in your device's privacy settings." },
      { id: "tec4", q: "Microphone permission?", a: "Ensure microphone access is allowed in your device settings for both the browser and the operating system." },
      { id: "tec5", q: "Notifications?", a: "Manage push and email notifications in 'App Settings' -> 'Notifications' to stay updated on appointments." },
      { id: "tec6", q: "App crashes?", a: "Try updating the app, clearing cache, or reinstalling. If it persists, contact support with your device model." },
      { id: "tec7", q: "Slow loading?", a: "Check your internet speed. Clear app cache or browser history to improve performance." },
      { id: "tec8", q: "White screen?", a: "Refresh the page or restart the app. If it continues, check for app updates or clear your browser cache." },
      { id: "tec9", q: "Login problem?", a: "Ensure you are using the correct credentials. Use 'Forgot Password' if needed, or check if your account is locked." },
      { id: "tec10", q: "OTP not received?", a: "Check your spam folder or signal strength. Click 'Resend OTP' after 30 seconds. Ensure your phone number is correct." }
    ]
  },
  {
    id: "emergency",
    title: "🚨 Emergency Help",
    questions: [
      { id: "eme1", q: "Medical emergency?", a: "Our platform is NOT for emergencies. Call 999 or go to the nearest hospital emergency room immediately." },
      { id: "eme2", q: "Ambulance?", a: "For ambulance services, call 999 or use dedicated ambulance apps. We do not provide ambulance dispatch services." },
      { id: "eme3", q: "Emergency hotline?", a: "For medical emergencies, call 999. For platform support, call our 24/7 helpline at +880 1234-567890." },
      { id: "eme4", q: "Urgent consultation?", a: "For non-life-threatening urgent issues, book an 'Urgent Care' slot or use our 24/7 telemedicine hotline." },
      { id: "eme5", q: "Emergency symptoms?", a: "If you experience chest pain, severe bleeding, difficulty breathing, or sudden numbness, seek emergency care immediately." }
    ]
  },
  {
    id: "insurance",
    title: "🏥 Insurance",
    questions: [
      { id: "ins1", q: "Insurance support?", a: "We partner with major insurance providers. Check the 'Insurance' page for a list of our partner companies." },
      { id: "ins2", q: "Cashless treatment?", a: "Cashless treatment is available at our physical partner hospitals for insured patients. Not applicable for teleconsultations." },
      { id: "ins3", q: "Claim process?", a: "For teleconsultations, download your invoice and prescription from the dashboard, then submit them to your insurance provider for reimbursement." },
      { id: "ins4", q: "Policy verification?", a: "Contact our billing team at billing@renovalifecare.com to verify your insurance coverage and eligibility before booking." }
    ]
  }
];

// =============================================
// COMPONENT
// =============================================
export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [feedback, setFeedback] = useState({});
  const [savedFaqs, setSavedFaqs] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const categories = [
    { id: "all", label: "All" },
    { id: "popular", label: "Most Popular" },
    { id: "appointments", label: "Appointments" },
    { id: "videoConsultation", label: "Video Consultation" },
    { id: "doctors", label: "Doctors" },
    { id: "prescriptions", label: "Prescriptions" },
    { id: "medicalRecords", label: "Medical Records" },
    { id: "payments", label: "Payments" },
    { id: "account", label: "Account" },
    { id: "privacy", label: "Privacy" },
    { id: "technical", label: "Technical" },
    { id: "emergency", label: "Emergency" },
    { id: "insurance", label: "Insurance" },
  ];

  const popularSearches = ["Video Call", "Refund", "Prescription", "Camera", "Reschedule"];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value) setActiveCategory("all");
  };

  const handlePopularSearch = (term) => {
    setSearchQuery(term);
    setActiveCategory("all");
  };

  const handleToggle = (faqId) => {
    setRecentlyViewed(prev => {
      const newRecent = [faqId, ...prev.filter(id => id !== faqId)];
      return newRecent.slice(0, 5); // Keep last 5
    });
  };

  const toggleSave = (faqId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedFaqs(prev =>
      prev.includes(faqId) ? prev.filter(id => id !== faqId) : [...prev, faqId]
    );
  };

  const handleFeedback = (faqId, type) => {
    setFeedback(prev => ({ ...prev, [faqId]: type }));
  };

  const getFaqById = (id) => {
    for (const cat of faqCategories) {
      const faq = cat.questions.find(q => q.id === id);
      if (faq) return { ...faq, categoryTitle: cat.title };
    }
    return null;
  };

  const filteredCategories = useMemo(() => {
    let cats = faqCategories;

    if (activeCategory !== "all") {
      cats = cats.filter(cat => cat.id === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      cats = cats.map(cat => ({
        ...cat,
        questions: cat.questions.filter(q =>
          q.q.toLowerCase().includes(query) ||
          q.a.toLowerCase().includes(query)
        )
      })).filter(cat => cat.questions.length > 0);
    }

    return cats;
  }, [activeCategory, searchQuery]);

  const recentFaqs = recentlyViewed.map(getFaqById).filter(Boolean);
  const savedFaqsList = savedFaqs.map(getFaqById).filter(Boolean);

  const scrollToFaq = (faqId) => {
    const el = document.getElementById(`faq-${faqId}`);
    if (el) {
      el.open = true;
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <>
      {/* ══════════════════════════════════════
          PAGE HERO BANNER
      ══════════════════════════════════════ */}
      <section className="page-hero">
        <div className="page-hero__container">
          <span className="page-hero__label">Patient Support</span>
          <h1 className="page-hero__title">
            Frequently Asked <span className="page-hero__highlight">Questions</span>
          </h1>
          <p className="page-hero__subtitle">
            Browse common questions about your appointments, video consultations, and more.
          </p>
          <div className="page-hero__meta">
            <span className="page-hero__badge">120+ Answers Available</span>
            <span className="page-hero__badge">Last Updated: June 2026</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SEARCH & POPULAR SEARCHES
      ══════════════════════════════════════ */}
      <section className="page-section page-section--light">
        <div className="page-section__container">
          <div className="faq-search-wrapper">
            <form className="faq-search-form" role="search" onSubmit={(e) => e.preventDefault()}>
              <svg className="faq-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="search"
                className="faq-search-input"
                placeholder="Search FAQs (e.g., 'video call', 'refund')..."
                value={searchQuery}
                onChange={handleSearch}
                aria-label="Search FAQ questions"
              />
              {searchQuery && (
                <button type="button" className="faq-search-clear" onClick={() => setSearchQuery("")}>
                  ✕
                </button>
              )}
            </form>
            <div className="faq-popular-searches">
              <span className="faq-popular-label">Popular:</span>
              {popularSearches.map(term => (
                <button key={term} className="faq-popular-tag" onClick={() => handlePopularSearch(term)}>
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CATEGORY CHIPS
      ══════════════════════════════════════ */}
      <section className="page-section">
        <div className="page-section__container">
          <div className="faq-chips-wrapper">
            <div className="faq-chips">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`faq-chip ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          RECENTLY VIEWED
      ══════════════════════════════════════ */}
      {recentFaqs.length > 0 && activeCategory === 'all' && !searchQuery && (
        <section className="page-section">
          <div className="page-section__container">
            <div className="faq-secondary-section">
              <h3 className="faq-secondary-title">🕒 Recently Viewed</h3>
              <div className="faq-secondary-list">
                {recentFaqs.map(faq => (
                  <div key={faq.id} className="faq-secondary-item" onClick={() => scrollToFaq(faq.id)}>
                    <strong>{faq.q}</strong>
                    <span className="faq-secondary-cat">{faq.categoryTitle}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          SAVED FAQs
      ══════════════════════════════════════ */}
      {savedFaqsList.length > 0 && activeCategory === 'all' && !searchQuery && (
        <section className="page-section">
          <div className="page-section__container">
            <div className="faq-secondary-section">
              <h3 className="faq-secondary-title">⭐ Saved FAQs</h3>
              <div className="faq-secondary-list">
                {savedFaqsList.map(faq => (
                  <div key={faq.id} className="faq-secondary-item" onClick={() => scrollToFaq(faq.id)}>
                    <strong>{faq.q}</strong>
                    <span className="faq-secondary-cat">{faq.categoryTitle}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          FAQ ACCORDION SECTIONS
      ══════════════════════════════════════ */}
      <article className="page-section">
        <div className="page-section__container">
          <div className="faq-content">
            {filteredCategories.length === 0 ? (
              <div className="faq-empty">
                <h3>No results found</h3>
                <p>Try searching with different keywords or browse all categories.</p>
                <button className="btn btn-primary" onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}>
                  Clear Search
                </button>
              </div>
            ) : (
              filteredCategories.map((category) => (
                <section key={category.id} id={category.id} className="faq-category">
                  <h2 className="faq-category-title">{category.title}</h2>
                  <div className="faq-accordion">
                    {category.questions.map((faq) => (
                      <details
                        key={faq.id}
                        id={`faq-${faq.id}`}
                        className="faq-item"
                        onToggle={(e) => e.target.open && handleToggle(faq.id)}
                      >
                        <summary className="faq-question">
                          <span className="faq-q-text">{faq.q}</span>
                          <div className="faq-question-actions">
                            <button
                              className="faq-save-btn"
                              onClick={(e) => toggleSave(faq.id, e)}
                              title={savedFaqs.includes(faq.id) ? "Remove from saved" : "Save FAQ"}
                            >
                              {savedFaqs.includes(faq.id) ? "⭐" : "☆"}
                            </button>
                            <span className="faq-toggle-icon" aria-hidden="true">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </span>
                          </div>
                        </summary>
                        <div className="faq-answer">
                          <p>{faq.a}</p>

                          {faq.related && faq.related.length > 0 && (
                            <div className="faq-related">
                              <strong>Related Questions:</strong>
                              <ul>
                                {faq.related.map((r, i) => <li key={i}>{r}</li>)}
                              </ul>
                            </div>
                          )}

                          <div className="faq-feedback">
                            <span>Was this answer helpful?</span>
                            <button
                              className={`faq-feedback-btn ${feedback[faq.id] === 'yes' ? 'active' : ''}`}
                              onClick={() => handleFeedback(faq.id, 'yes')}
                            >
                              👍 Yes
                            </button>
                            <button
                              className={`faq-feedback-btn ${feedback[faq.id] === 'no' ? 'active' : ''}`}
                              onClick={() => handleFeedback(faq.id, 'no')}
                            >
                              👎 No
                            </button>
                          </div>

                          {feedback[faq.id] === 'no' && (
                            <div className="faq-feedback-negative">
                              <p>Still need help?</p>
                              <div className="faq-feedback-actions">
                                <a href="/support/chat" className="btn btn-sm btn-primary">Start Chat</a>
                                <a href="/contact" className="btn btn-sm btn-secondary">Contact Support</a>
                              </div>
                            </div>
                          )}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>

          {/* ══════════════════════════════════════
              CONTACT SUPPORT CTA
          ══════════════════════════════════════ */}
          <div className="faq-cta-section">
            <div className="faq-cta-card">
              <span className="faq-cta-icon">💬</span>
              <h3>Didn't find your answer?</h3>
              <p>Our support team is here to help. Get personalized assistance via chat, email, or phone.</p>
              <div className="faq-cta-buttons">
                <a href="/support/chat" className="btn btn-primary">Start Live Chat</a>
                <a href="/support/ticket" className="btn btn-secondary">Create Ticket</a>
                <a href="mailto:support@renovalifecare.com" className="btn btn-secondary">Email Support</a>
                <a href="tel:+8801234567890" className="btn btn-secondary">Call: +880 1234-567890</a>
              </div>
            </div>
          </div>

        </div>
      </article>
    </>
  );
}