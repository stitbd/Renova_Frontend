// app/faq/page.jsx
import { siteConfig } from "@/constants/siteData";
import "@/styles/pages/faq.css";
import "@/styles/components/HeroSection.css";

export const metadata = {
  title: `FAQ | ${siteConfig.name}`,
  description: `Find answers to common questions about ${siteConfig.name}'s healthcare services, appointments, billing, privacy, and more.`,
  openGraph: {
    title: `FAQ | ${siteConfig.name}`,
    description: "Quick answers to your healthcare questions.",
    url: `${siteConfig.url}/faq`,
  },
};

// FAQ Categories & Questions
const faqCategories = [
  {
    id: "appointments",
    title: "📅 Appointments & Booking",
    questions: [
      {
        q: "How do I book an appointment?",
        a: "You can book an appointment in three ways: (1) Visit our website and click 'Book Appointment', (2) Call our support line at +880 1234-567890, or (3) Visit our clinic in person. Online booking is available 24/7."
      },
      {
        q: "Can I reschedule or cancel my appointment?",
        a: "Yes. You can reschedule or cancel up to 2 hours before your appointment via your account dashboard, our mobile app, or by calling us. Cancellations within 2 hours may incur a small fee to cover provider time."
      },
      {
        q: "What should I bring to my first visit?",
        a: "Please bring: (1) Valid government-issued ID, (2) Any referral letters from other doctors, (3) Current medications list, (4) Previous medical reports if relevant, and (5) Insurance card if applicable."
      },
      {
        q: "Do you offer teleconsultations?",
        a: "Yes! We offer secure video, audio, and chat consultations for non-emergency issues. After booking, you'll receive a link to join your virtual visit. A stable internet connection and device with camera/mic are required."
      }
    ]
  },
  {
    id: "services",
    title: "🩺 Services & Treatments",
    questions: [
      {
        q: "What medical specialties do you offer?",
        a: "We provide consultations across 20+ specialties including General Medicine, Gynecology, Pediatrics, Cardiology, Dermatology, Orthopedics, Mental Health, and more. All our doctors are BMDC-certified."
      },
      {
        q: "Do you provide diagnostic tests?",
        a: "Yes. We offer in-house diagnostics including blood tests, X-rays, ultrasounds, ECG, and basic pathology. For advanced imaging (MRI, CT), we partner with accredited centers and can coordinate referrals."
      },
      {
        q: "Can I get a prescription refilled online?",
        a: "For ongoing treatments, yes—log in to your account, select 'Prescription Refill', and your doctor will review and approve if clinically appropriate. New prescriptions require a consultation."
      },
      {
        q: "Do you offer home visit services?",
        a: "Home visits are available for elderly patients, those with mobility challenges, or post-operative care. Request via phone or your account; additional charges may apply based on location."
      }
    ]
  },
  {
    id: "billing",
    title: "💰 Billing & Insurance",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept credit/debit cards (Visa, Mastercard), mobile financial services (bKash, Nagad, Rocket), bank transfers, and cash at our clinic. All payments are processed securely."
      },
      {
        q: "Do you accept health insurance?",
        a: "We partner with several leading insurance providers in Bangladesh. Check our 'Insurance Partners' page or contact billing@renovalifecare.com to verify your coverage before your visit."
      },
      {
        q: "What is your refund policy?",
        a: "Full refunds are issued if: (1) You cancel >2 hours before appointment, (2) Provider cancels/no-shows, or (3) Technical issues prevent service. Refunds process within 5-7 business days."
      },
      {
        q: "Can I get an itemized bill?",
        a: "Absolutely. After your visit, log in to your account to download a detailed invoice. You can also request one via email or at our front desk."
      }
    ]
  },
  {
    id: "privacy",
    title: "🔒 Privacy & Data",
    questions: [
      {
        q: "How is my health data protected?",
        a: "We use end-to-end encryption (TLS 1.3/AES-256), role-based access controls, regular security audits, and strict staff training. Your data is stored on secure servers compliant with Bangladesh data laws."
      },
      {
        q: "Who can access my medical records?",
        a: "Only you and healthcare providers directly involved in your care can access your records—with your explicit consent. You control sharing permissions via your account settings."
      },
      {
        q: "Can I download or transfer my health data?",
        a: "Yes. Under your right to data portability, you can export your records in PDF or structured format anytime via your account. Contact privacy@renovalifecare.com for assistance."
      },
      {
        q: "Do you share my data with third parties?",
        a: "We never sell your data. We only share with: (1) Providers you authorize, (2) Trusted service providers under strict confidentiality agreements, or (3) Authorities when legally required."
      }
    ]
  },
  {
    id: "technical",
    title: "💻 Technical Support",
    questions: [
      {
        q: "What browsers/devices are supported?",
        a: "Our website works best on Chrome, Firefox, Safari, or Edge (latest versions). Mobile app supports iOS 13+ and Android 8+. For teleconsultations, test your connection beforehand."
      },
      {
        q: "I forgot my password. How do I reset it?",
        a: "Click 'Forgot Password' on the login page, enter your registered email, and follow the secure link sent to you. For security, links expire after 1 hour."
      },
      {
        q: "My video consultation isn't working. What should I do?",
        a: "Try: (1) Refreshing the page, (2) Checking camera/mic permissions, (3) Using a wired connection if possible. If issues persist, contact support@renovalifecare.com or call us for immediate help."
      },
      {
        q: "How do I delete my account?",
        a: "Go to Account Settings → Privacy → Delete Account. Note: Medical records are retained per Bangladesh healthcare regulations (typically 10 years) even after account deletion."
      }
    ]
  },
  {
    id: "emergency",
    title: "🚨 Emergency & Urgent Care",
    questions: [
      {
        q: "What should I do in a medical emergency?",
        a: "Our services are NOT for emergencies. If you experience chest pain, severe bleeding, difficulty breathing, or other life-threatening symptoms: Call 999 (Bangladesh emergency) or go to the nearest hospital immediately."
      },
      {
        q: "Do you offer urgent same-day appointments?",
        a: "Yes. Call +880 1234-567890 and mention 'urgent care'. We reserve daily slots for acute but non-emergency issues like fever, infections, or minor injuries."
      },
      {
        q: "Can I get advice for a child's fever at night?",
        a: "For non-urgent pediatric concerns, our teleconsultation service is available 8AM-10PM daily. For high fever with warning signs (rash, lethargy, dehydration), seek emergency care immediately."
      }
    ]
  }
];

// Quick Links for Common Questions
const quickLinks = [
  { label: "Book an Appointment", href: "/appointment", icon: "📅" },
  { label: "Find a Doctor", href: "/doctors", icon: "🩺" },
  { label: "View Pricing", href: "/packages", icon: "💰" },
  { label: "Contact Support", href: "/contact", icon: "💬" },
];

export default function FAQPage() {
  return (
    <>
      {/* ══════════════════════════════════════
          PAGE HERO BANNER
      ══════════════════════════════════════ */}
      <section className="page-hero">
        <div className="page-hero__container">
          <span className="page-hero__label">Help Center</span>
          <h1 className="page-hero__title">
            Frequently Asked <span className="page-hero__highlight">Questions</span>
          </h1>
          <p className="page-hero__subtitle">
            Quick answers to common questions about our healthcare services. 
            Can't find what you're looking for? <a href="/contact">Contact us</a>.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SEARCH & QUICK LINKS
      ══════════════════════════════════════ */}
      <section className="page-section page-section--light">
        <div className="page-section__container">
          
          {/* Search Bar */}
          <div className="faq-search-wrapper">
            <form className="faq-search-form" role="search" aria-label="Search FAQs">
              <svg className="faq-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input 
                type="search" 
                className="faq-search-input" 
                placeholder="Search questions (e.g., 'insurance', 'teleconsultation', 'refund')..."
                aria-label="Search FAQ questions"
              />
              <button type="submit" className="faq-search-btn" aria-label="Search">
                Search
              </button>
            </form>
            <p className="faq-search-hint">
              Tip: Try keywords like <em>appointment</em>, <em>billing</em>, <em>prescription</em>, or <em>privacy</em>
            </p>
          </div>

          {/* Quick Action Links */}
          <div className="faq-quick-links">
            {quickLinks.map((link) => (
              <a key={link.href} href={link.href} className="faq-quick-link">
                <span className="faq-quick-icon">{link.icon}</span>
                <span className="faq-quick-label">{link.label}</span>
              </a>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          FAQ ACCORDION SECTIONS
      ══════════════════════════════════════ */}
      <article className="page-section">
        <div className="page-section__container">
          <div className="faq-content">
            {faqCategories.map((category) => (
              <section key={category.id} id={category.id} className="faq-category">
                <h2 className="faq-category-title">{category.title}</h2>
                <div className="faq-accordion">
                  {category.questions.map((faq, index) => (
                    <details key={index} className="faq-item">
                      <summary className="faq-question">
                        <span className="faq-q-text">{faq.q}</span>
                        <span className="faq-toggle-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </span>
                      </summary>
                      <div className="faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Still Need Help? */}
          <div className="faq-cta-section">
            <div className="faq-cta-card">
              <span className="faq-cta-icon">💬</span>
              <h3>Still have questions?</h3>
              <p>Our support team is here to help. Get personalized assistance via chat, email, or phone.</p>
              <div className="faq-cta-buttons">
                <a href="/contact" className="btn btn-primary">Contact Support</a>
                <a href="tel:+8801234567890" className="btn btn-secondary">Call: +880 1234-567890</a>
              </div>
            </div>
          </div>

        </div>
      </article>

      {/* ══════════════════════════════════════
          TRUST & SUPPORT BADGES
      ══════════════════════════════════════ */}
      <section className="page-section page-section--slate">
        <div className="page-section__container">
          <div className="faq-support-grid">
            <div className="faq-support-item">
              <span className="faq-support-icon">⚡</span>
              <p><strong>Fast Responses</strong><br />Average reply time: under 2 hours</p>
            </div>
            <div className="faq-support-item">
              <span className="faq-support-icon">🌐</span>
              <p><strong>24/7 Availability</strong><br />Online booking & chat support anytime</p>
            </div>
            <div className="faq-support-item">
              <span className="faq-support-icon">🩺</span>
              <p><strong>Expert Answers</strong><br />Responses reviewed by medical staff</p>
            </div>
            <div className="faq-support-item">
              <span className="faq-support-icon">🔒</span>
              <p><strong>Secure & Private</strong><br />Your inquiries are confidential</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}