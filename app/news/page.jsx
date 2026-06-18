import { siteConfig } from "@/constants/siteData";
import Link from "next/link";
import "@/styles/components/HeroSection.css";
import { ArrowRight, Download, Mail, Phone, User, FileText, Image, BookOpen, File } from "lucide-react";

export const metadata = {
  title: `News | ${siteConfig.name}`,
  description: `Latest press releases, news coverage, media resources, and announcements from ${siteConfig.name} — Bangladesh's leading healthcare provider.`,
  openGraph: {
    title: `Media & Press | ${siteConfig.name}`,
    description: `Press releases and media resources from ${siteConfig.name}.`,
    url: `${siteConfig.url}/media`,
  },
};

const pressReleases = [
  {
    id: 1,
    date: "April 28, 2026",
    category: "Expansion",
    title: "Renova Life Care Opens New Cardiology Wing with Advanced Cath Lab",
    excerpt: "We are proud to announce the inauguration of our state-of-the-art Cardiac Catheterization Laboratory, equipped with the latest imaging technology to serve patients across Bangladesh.",
    tag: "Press Release",
  },
  {
    id: 2,
    date: "March 15, 2026",
    category: "Award",
    title: "Renova Life Care Receives National Healthcare Excellence Award 2026",
    excerpt: "The Bangladesh Medical Association has recognized Renova Life Care Ltd. with the National Healthcare Excellence Award for outstanding contributions to public health.",
    tag: "News",
  },
  {
    id: 3,
    date: "February 10, 2026",
    category: "Partnership",
    title: "Strategic Partnership with Apollo Hospitals for Advanced Medical Training",
    excerpt: "Renova Life Care announces a landmark partnership with Apollo Hospitals India to provide international training opportunities for our medical staff.",
    tag: "Press Release",
  },
  {
    id: 4,
    date: "January 5, 2026",
    category: "Community",
    title: "Free Health Camp Reaches 10,000 Patients Across Rural Bangladesh",
    excerpt: "Our annual free health camp initiative has successfully provided essential medical check-ups and treatment to over 10,000 underprivileged patients in rural areas.",
    tag: "Community",
  },
  {
    id: 5,
    date: "December 1, 2025",
    category: "Technology",
    title: "Launch of Digital Patient Portal for Seamless Healthcare Access",
    excerpt: "Renova Life Care launches its comprehensive digital patient portal, enabling patients to book appointments, access health records, and consult doctors online.",
    tag: "Press Release",
  },
  {
    id: 6,
    date: "October 22, 2025",
    category: "Research",
    title: "Renova Research Team Publishes Landmark Study on Diabetic Care in Bangladesh",
    excerpt: "Our internal research team's study on diabetes management in Bangladesh has been published in the International Journal of Medicine, drawing global attention.",
    tag: "Research",
  },
];

const mediaContacts = [
  {
    name: "Media Relations Team",
    email: "media@renovalifecare.com",
    phone: siteConfig.phone,
    role: "Press Inquiries",
  },
  {
    name: "Public Relations Office",
    email: "pr@renovalifecare.com",
    phone: siteConfig.phone,
    role: "Partnerships & Events",
  },
];

const tagColors = {
  "Press Release": "#428a26",
  "News": "#1d6fb5",
  "Community": "#e67e22",
  "Research": "#8e44ad",
};

export default function MediaPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero__container">
          <span className="page-hero__label">Media Center</span>
          <h1 className="page-hero__title">
            Press & <span className="page-hero__highlight">Media</span>
          </h1>
          <p className="page-hero__subtitle">
            Latest news, press releases, and media resources from Renova Life Care Ltd.
          </p>
          <nav aria-label="Breadcrumb" className="page-hero__breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Media</span>
          </nav>
        </div>
      </section>

      {/* Press Releases */}
      <section className="page-section page-section--white">
        <div className="page-section__container">
          <div className="page-section__header">
            <span className="page-section__label">Latest Updates</span>
            <h2 className="page-section__title">Press Releases & News</h2>
            <p className="page-section__subtitle">
              Stay informed with our latest announcements, achievements, and community initiatives.
            </p>
          </div>

          <div className="page-press-grid">
            {pressReleases.map((item) => (
              <article key={item.id} className="page-press-card">
                <div className="page-press-card__header">
                  <span
                    className="page-press-tag"
                    style={{ backgroundColor: `${tagColors[item.tag] || "#428a26"}18`, color: tagColors[item.tag] || "#428a26" }}
                  >
                    {item.tag}
                  </span>
                  <span className="page-press-category">{item.category}</span>
                </div>
                <time className="page-press-date" dateTime={item.date}>{item.date}</time>
                <h3 className="page-press-title">{item.title}</h3>
                <p className="page-press-excerpt">{item.excerpt}</p>
                <a href="#" className="page-press-link">
                  Read Full Release
                  <ArrowRight size={14} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="page-section page-section--slate">
        <div className="page-section__container">
          <div className="page-press-kit-grid">
            <div className="page-press-kit-content">
              <span className="page-section__label">Resources</span>
              <h2 className="page-section__title" style={{ textAlign: "left" }}>Media Kit & Resources</h2>
              <p className="page-section__subtitle" style={{ textAlign: "left" }}>
                Download our official media resources including logos, brand guidelines, and press materials for accurate representation of Renova Life Care.
              </p>
              <div className="page-press-downloads">
                {[
                  { icon: Image, label: "Brand Logo Pack", size: "2.4 MB" },
                  { icon: BookOpen, label: "Brand Guidelines PDF", size: "1.8 MB" },
                  { icon: FileText, label: "Press Photo Gallery", size: "15 MB" },
                  { icon: File, label: "Company Profile", size: "3.2 MB" },
                ].map((dl) => {
                  const IconComponent = dl.icon;
                  return (
                    <a key={dl.label} href="#" className="page-press-download-item">
                      <span className="page-press-dl-icon"><IconComponent size={20} /></span>
                      <div>
                        <p className="page-press-dl-label">{dl.label}</p>
                        <p className="page-press-dl-size">{dl.size}</p>
                      </div>
                      <Download size={16} className="page-press-dl-arrow" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Media Contacts */}
            <div>
              <h3 className="page-media-contacts-title">Media Contacts</h3>
              <div className="page-media-contacts">
                {mediaContacts.map((contact) => (
                  <div key={contact.name} className="page-media-contact-card">
                    <div className="page-media-contact-avatar">
                      <User size={18} />
                    </div>
                    <div className="page-media-contact-info">
                      <p className="page-media-contact-name">{contact.name}</p>
                      <p className="page-media-contact-role">{contact.role}</p>
                      <a href={`mailto:${contact.email}`} className="page-media-contact-email">
                        <Mail size={14} /> {contact.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-section page-section--green">
        <div className="page-section__container page-cta-center">
          <h2 className="page-cta-title">Media Inquiry?</h2>
          <p className="page-cta-subtitle">Our PR team is ready to assist journalists and media professionals.</p>
          <Link href="/contact" className="page-cta-btn">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}