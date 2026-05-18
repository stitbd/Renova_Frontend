import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/constants/siteData";
import "./EmergencyBanner.css";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function EmergencyBanner() {
  return (
    <div
      className="emergency-banner"
      role="complementary"
      aria-label="Emergency contact information"
    >
      <div className="emergency-banner-container">
        <div className="emergency-banner-content">
          <div className="emergency-banner-info">
            <div className="emergency-banner-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div>
              <p className="emergency-banner-title">
                Emergency? We&rsquo;re Available 24/7
              </p>
              <p className="emergency-banner-subtitle">
                Our emergency team is always ready to help you.
              </p>
            </div>
          </div>
          <div className="emergency-banner-buttons">
            <Link
              href={`tel:${siteConfig.phone}`}
              className="emergency-banner-btn-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 10a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.44 0h3a2 2 0 0 1 2 1.72A12.84 12.84 0 0 0 9.1 5.07a2 2 0 0 1-.45 2.11L7.5 8.28a16 16 0 0 0 6.29 6.29l1.1-1.1a2 2 0 0 1 2.11-.45A12.84 12.84 0 0 0 20.28 14a2 2 0 0 1 1.72 2z" />
              </svg>
              {siteConfig.phone}
            </Link>
            <Link
              href={`tel:${siteConfig.phoneAlt}`}
              className="emergency-banner-btn-secondary"
            >
              {siteConfig.phoneAlt}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}