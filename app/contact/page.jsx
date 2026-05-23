import { siteConfig } from "@/constants/siteData";
import ContactForm from "./ContactForm";
import "@/styles/components/HeroSection.css";
import "@/styles/pages/contact.css";

export const metadata = {
  title: `Contact Us | ${siteConfig.name}`,
  description: `Get in touch with ${siteConfig.name} — book an appointment, ask a question, or reach our emergency line. We are available 24/7.`,
  openGraph: {
    title: `Contact Us | ${siteConfig.name}`,
    description: `Reach ${siteConfig.name} for appointments, inquiries, and emergency care.`,
    url: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero__container">
          <span className="page-hero__label">Get in Touch</span>
          <h1 className="page-hero__title">
            Contact <span className="page-hero__highlight">Us</span>
          </h1>
          <p className="page-hero__subtitle">
            Have a question or want to book an appointment? We are here to help — reach out to us anytime.
          </p>
          <nav aria-label="Breadcrumb" className="page-hero__breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Contact</span>
          </nav>
        </div>
      </section>

      {/* Client-side interactive form + info */}
      <ContactForm />
    </>
  );
}
