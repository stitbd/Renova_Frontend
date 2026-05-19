import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { portfolioItems } from "@/constants/siteData";
import { Section, SectionHeader } from "@/components/common/Section";
import "./PortfolioSection.css";


// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function PortfolioSection() {
  const getGradientClass = (index) => {
    const gradients = [
      "gradient-authority-accent",
      "gradient-primary-secondary",
      "gradient-secondary-primary",
      "gradient-accent-authority",
      "gradient-primary-fade",
      "gradient-authority-fade",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <Section id="portfolio">
      <SectionHeader
        label="Our Facilities"
        title="World-Class <span class='section-heading-accent'>Infrastructure</span>"
        subtitle="State-of-the-art facilities designed for your comfort, safety, and the best medical outcomes."
      />

      <div className="portfolio-grid">
        {portfolioItems.map((item, index) => (
          <div
            key={item.id}
            className={`portfolio-item ${index === 0 ? "portfolio-item-large" : ""}`}
            role="button"
            tabIndex={0}
            aria-label={`View ${item.title} facility`}
          >
            {/* Background Image */}
            <div className="portfolio-image-container">
              <Image
                src={`/images/portfolio/image${item.id}.jpg`}
                alt={item.title}
                fill
                className="portfolio-image"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Fallback Gradient */}
              <div className={`portfolio-fallback ${getGradientClass(index)}`} aria-hidden="true" />
            </div>
            {/* Overlay */}
            <div className="portfolio-overlay" aria-hidden="true" />
            {/* Content */}
            <div className="portfolio-content">
              <span className="portfolio-category">
                {item.category}
              </span>
              <h3 className="portfolio-title">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* View All portfolio Button */}
      <div className="portfolio-view-all">
        <Link href="/about#facilities" className="btn btn-primary portfolio-cta-btn">
          View All Facilities
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </Section>
  );
}