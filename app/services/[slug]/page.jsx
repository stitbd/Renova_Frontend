// app/services/[slug]/page.jsx
import { siteConfig, services } from "@/constants/siteData";
import Link from "next/link";
import { notFound } from "next/navigation";
import { doctors } from "@/constants/siteData";
import ServiceIcon from "@/components/common/ServiceIcon";
import DoctorsGrid from "./DoctorsGrid";
import "@/styles/pages/service-details.css";
import "@/styles/components/HeroSection.css";
import "./doctor.css";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  ArrowRight,
  Shield,
  Check,
  ChevronDown,
  AlertCircle,
  User,
  Clock,
  Building2,
  Stethoscope
} from "lucide-react";

// Generate static params for SSG/ISR
export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.href.replace(/^\/services\//, ''),
  }));
}

// Generate SEO metadata dynamically
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.href === `/services/${slug}`);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested medical service could not be found.",
    };
  }

  return {
    title: `${service.title} | ${siteConfig.name}`,
    description: service.seoDescription || `Learn about ${service.title} services at ${siteConfig.name}. Expert care with modern facilities.`,
    openGraph: {
      title: `${service.title} | ${siteConfig.name}`,
      description: service.seoDescription || `Comprehensive ${service.title.toLowerCase()} care at ${siteConfig.name}.`,
      url: `${siteConfig.url}${service.href}`,
      type: "article",
      images: [
        {
          url: service.ogImage || `${siteConfig.url}/images/services/${service.id}-og.jpg`,
          width: 1200,
          height: 630,
          alt: `${service.title} at ${siteConfig.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | ${siteConfig.name}`,
      description: service.seoDescription || `Expert ${service.title.toLowerCase()} care at ${siteConfig.name}.`,
      images: [service.ogImage || `${siteConfig.url}/images/services/${service.id}-og.jpg`],
    },
  };
}

// Service Detail Page Component
export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.href === `/services/${slug}`);

  if (!service) {
    notFound();
  }

  const displayedDoctors = doctors.slice(0, 3);

  // Mock detailed content - replace with CMS/API in production
  const serviceContent = {
    overview: service.description,
    detailedDescription: `Our ${service.title} service provides comprehensive care using evidence-based practices and the latest medical technology. Our team of BMDC-certified specialists works collaboratively to ensure you receive personalized, compassionate care tailored to your unique health needs.`,

    benefits: [
      "Personalized treatment plans designed for your specific health profile",
      "Board-certified specialists with extensive clinical experience",
      "Advanced diagnostic equipment for precise, accurate assessments",
      "Seamless coordination with other departments for holistic care",
      "Patient education resources to empower your health decisions",
      "Flexible scheduling including evening and weekend appointments",
    ],

    process: [
      {
        step: 1,
        title: "Initial Consultation",
        desc: "Meet with our specialist to discuss your symptoms, medical history, and health goals. We take time to listen and understand your concerns.",
        icon: "user-check"
      },
      {
        step: 2,
        title: "Comprehensive Assessment",
        desc: "Undergo thorough evaluation using state-of-the-art diagnostic tools and laboratory testing as needed.",
        icon: "scan-search"
      },
      {
        step: 3,
        title: "Personalized Treatment Plan",
        desc: "Receive a clear, customized care plan with explained options, expected outcomes, and timeline.",
        icon: "file-check"
      },
      {
        step: 4,
        title: "Ongoing Support & Follow-up",
        desc: "Regular check-ins, progress monitoring, and plan adjustments to ensure optimal health outcomes.",
        icon: "heart-pulse"
      },
    ],

    faqs: [
      {
        q: "How do I prepare for my first appointment?",
        a: "Please bring your national ID, insurance card (if applicable), list of current medications, and any relevant medical records or test results. Arrive 15 minutes early to complete registration paperwork. Wear comfortable clothing if diagnostic tests are anticipated."
      },
      {
        q: "Do you accept my insurance?",
        a: "We accept most major insurance providers in Bangladesh. Please contact our billing department at +880 1700-000000 or email billing@renovalifecare.com to verify your specific coverage before your visit."
      },
      {
        q: "What if I need emergency care?",
        a: "For life-threatening emergencies, immediately call 999 or visit our 24/7 Emergency Department. For urgent but non-emergency concerns, call our nurse triage line at +880 1234-567891 for guidance on next steps."
      },
      {
        q: "Can I schedule a virtual consultation?",
        a: "Yes! Many of our services offer secure telehealth appointments via our patient portal. Virtual visits are ideal for follow-ups, medication management, and initial consultations when appropriate. Check with our scheduling team to see if telehealth suits your needs."
      },
      {
        q: "How long will my appointment take?",
        a: "Initial consultations typically last 30-45 minutes. Follow-up appointments are usually 15-20 minutes. Diagnostic procedures vary in duration; our staff will inform you of expected timeframes when scheduling."
      }
    ],

    relatedServices: services
      .filter(s => s.id !== service.id && s.category === service.category)
      .slice(0, 4),
  };

  return (
    <article className="service-detail-page">

      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero__container">
          <span className="page-hero__label">Services</span>
          <h1 className="page-hero__title">{service.title}</h1>
          <p className="page-hero__subtitle">{serviceContent.overview}</p>
          <nav aria-label="Breadcrumb" className="page-hero__breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Services</span>
          </nav>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="container-custom service-detail-grid">

        {/* Left Column - Primary Content */}
        <main className="service-detail-main" id="main-content">

          {/* What to Expect Section */}
          <section className="service-section" aria-labelledby="process-heading">
            <h2 id="process-heading" className="section-title">What to Expect</h2>
            <div className="process-steps">
              {serviceContent.process.map((item) => (
                <div key={item.step} className="process-step">
                  <div className="process-step__number" aria-hidden="true">
                    <ServiceIcon type={item.icon} color="white" />
                  </div>
                  <div className="process-step__content">
                    <h3 className="process-step__title">{item.step}. {item.title}</h3>
                    <p className="process-step__desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section className="service-section service-section--highlight" aria-labelledby="benefits-heading">
            <h2 id="benefits-heading" className="section-title">Why Choose Our {service.title} Services</h2>
            <ul className="benefits-list">
              {serviceContent.benefits.map((benefit, index) => (
                <li key={index} className="benefit-item">
                  <Check size={20} color="var(--color-status-success)" strokeWidth={2.5} className="benefit-icon" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Detailed Description */}
          <section className="service-section" aria-labelledby="about-heading">
            <h2 id="about-heading" className="section-title">About This Service</h2>
            <div className="service-description-content">
              <p>{serviceContent.detailedDescription}</p>
              <p>At {siteConfig.name}, we believe in treating the whole person, not just symptoms. Our integrated approach combines clinical excellence with compassionate care to support your journey to better health.</p>
            </div>
          </section>

          {/* Specialists Section */}
          <section className="service-section" aria-labelledby="specialists-heading">
            <h2 id="specialists-heading" className="section-title">Meet Our Specialists</h2>
            <DoctorsGrid doctors={displayedDoctors} />
          </section>

          {/* FAQ Section */}
          <section className="service-section" id="faqs" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="section-title">Frequently Asked Questions</h2>
            <div className="faq-list" role="list">
              {serviceContent.faqs.map((faq, index) => (
                <details key={index} className="faq-item" role="listitem">
                  <summary className="faq-question">
                    <span>{faq.q}</span>
                    <ChevronDown size={16} className="faq-toggle-icon" />
                  </summary>
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

        </main>

        {/* Right Column - Sticky Sidebar */}
        <aside className="service-detail-sidebar" aria-label="Service actions and information">

          {/* Quick Actions Card */}
          <div className="sidebar-card sidebar-card--primary">
            <h3 className="sidebar-card__title">Get Started Today</h3>
            <p className="sidebar-card__desc">Ready to take the next step in your healthcare journey? Our team is here to help.</p>
            <div className="sidebar-actions">
              <Link href="/appointments" className="btn btn-primary btn-full">
                Schedule Appointment
              </Link>
              <Link href="/contact" className="btn btn-secondary btn-full">
                Ask a Question
              </Link>
            </div>
          </div>

          {/* Contact Info Card */}
          <div className="sidebar-card" id="contact-info">
            <h3 className="sidebar-card__title">Contact Information</h3>
            <div className="contact-info">
              <div className="contact-item">
                <Phone size={18} color="var(--color-primary)" />
                <div>
                  <strong>Phone</strong>
                  <p><a href="tel:+8801234567890">+880 1700-000000</a></p>
                </div>
              </div>
              <div className="contact-item">
                <Mail size={18} color="var(--color-primary)" />
                <div>
                  <strong>Email</strong>
                  <p><a href="mailto:info@renovalifecare.com">info@renovalifecare.com</a></p>
                </div>
              </div>
              <div className="contact-item">
                <MapPin size={18} color="var(--color-primary)" />
                <div>
                  <strong>Location</strong>
                  <p>123 Health Avenue, Dhaka, Bangladesh</p>
                </div>
              </div>
              <div className="contact-item">
                <Calendar size={18} color="var(--color-primary)" />
                <div>
                  <strong>Hours</strong>
                  <p>Sun-Thu: 8AM-8PM<br />Fri-Sat: 9AM-5PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Services */}
          {serviceContent.relatedServices.length > 0 && (
            <div className="sidebar-card">
              <h3 className="sidebar-card__title">Related Services</h3>
              <ul className="related-services-list">
                {serviceContent.relatedServices.map((related) => (
                  <li key={related.id}>
                    <Link href={related.href} className="related-service-link">
                      <ServiceIcon type={related.icon} color="var(--color-primary)" />
                      <span>{related.title}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/services" className="view-all-link">
                View All Services
                <ArrowRight size={14} />
              </Link>
            </div>
          )}

          {/* Emergency Banner */}
          <div className="sidebar-card sidebar-card--emergency" role="complementary" aria-label="Emergency contact">
            <div className="emergency-icon" aria-hidden="true">
              <Shield size={24} />
            </div>
            <h4>Need Emergency Care?</h4>
            <p>Our emergency department is open 24/7 for urgent medical needs.</p>
            <a href="tel:+8801700000000" className="emergency-link">
              Call Emergency: <strong>+880 1700-000000</strong>
            </a>
          </div>

        </aside>
      </div>

      {/* CTA Section */}
      <section className="page-section page-section--green" id="contact" aria-labelledby="cta-heading">
        <div className="container-custom service-cta__content">
          <h2 id="cta-heading" className="service-cta__title">Ready to Start Your Journey to Better Health?</h2>
          <p className="service-cta__subtitle">Our team is here to provide compassionate, expert care tailored to your unique needs.</p>
          <div className="service-cta__actions">
            <Link href="/appointments" className="btn btn-primary btn-lg">
              Book Your Appointment
            </Link>
            <Link href="/contact" className="btn btn-outline-white btn-lg">
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}