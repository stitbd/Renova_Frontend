'use client';

import { motion } from "framer-motion";
import { partners } from "@/constants/siteData";
import "./PartnersSection.css";


// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function PartnersSection() {
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section
      className="partners-section"
      aria-label="Our trusted partners"
    >
      {/* Animated Background - Light Theme Adapted */}
      <div className="partners-bg-wrapper" aria-hidden="true">
        <div className="partners-bg-gradient" />
        <div className="partners-bg-dots" />
        <div className="partners-bg-blob blob-1" />
        <div className="partners-bg-blob blob-2" />
        <div className="partners-bg-blob blob-3" />
        
        {/* Floating particles */}
        <div className="partners-particles">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="partners-particle"
              style={{
                left: `${15 + i * 14}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${15 + i * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="partners-container">
        <p className="partners-label">
          Trusted Corporate Partners
        </p>
        
        <div className="partners-slider-wrapper" style={{ '--item-width': '160px', '--gap': '2rem' }}>
          <div className="partners-slider-track">
            {/* First set of partners */}
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="partner-slide-item"
                title={partner.name}
                role="listitem"
              >
                <div className="partner-content">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="partner-logo-img"
                    loading="lazy"
                    width={140}
                    height={50}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <span className="partner-fallback-text hidden">
                    {partner.name}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {partners.map((partner) => (
              <div
                key={`${partner.id}-duplicate`}
                className="partner-slide-item"
                title={partner.name}
                role="listitem"
                aria-hidden="true"
              >
                <div className="partner-content">
                  <img
                    src={partner.logo}
                    alt=""
                    className="partner-logo-img"
                    loading="lazy"
                    width={140}
                    height={50}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <span className="partner-fallback-text hidden">
                    {partner.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}