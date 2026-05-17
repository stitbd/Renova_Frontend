"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/constants/siteData";
import { footerLinks, socialLinks } from "@/constants/navLinks";
import "../../styles/components/Footer.css";

const SocialIcon = ({ type }) => {
  const paths = {
    facebook: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
    linkedin: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z",
    youtube: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {type === "instagram" ? (
        <>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </>
      ) : type === "youtube" ? (
        <>
          <path d={paths.youtube} />
          <polygon points="10 15 15 11.75 10 8.5 10 15" />
        </>
      ) : (
        <path d={paths[type]} />
      )}
      {type === "linkedin" && <circle cx="2" cy="2" r="1.5" transform="translate(0 7)" />}
    </svg>
  );
};

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith('/PatientPortal')) return null;

  return (
    <footer className="footer" role="contentinfo">
      {/* Main Footer Content */}
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            {/* Logo */}
            <Link href="/" className="footer-logo-wrapper">
              <div className="logo">
                <Image
                  src="/images/logo2.png"
                  alt="Renova Life Care Logo"
                  width={200}
                  height={80}
                  priority
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </Link>
            <p className="footer-description">
              Bangladesh's most trusted healthcare provider, delivering compassionate, world-class medicine since {siteConfig.established}.
            </p>
            
            {/* Contact Info */}
            <div className="footer-contact">
              <div className="footer-contact-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#428a26"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="footer-contact-icon"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  {siteConfig.address.street}, {siteConfig.address.area}<br />
                  {siteConfig.address.city}, {siteConfig.address.country}
                </span>
              </div>
              <a href={`tel:${siteConfig.phone}`} className="footer-contact-link" aria-label={`Call ${siteConfig.phone}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#428a26"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 10a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.44 0h3a2 2 0 0 1 2 1.72A12.84 12.84 0 0 0 9.1 5.07a2 2 0 0 1-.45 2.11L7.5 8.28a16 16 0 0 0 6.29 6.29l1.1-1.1a2 2 0 0 1 2.11-.45A12.84 12.84 0 0 0 20.28 14a2 2 0 0 1 1.72 2z" />
                </svg>
                {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="footer-contact-link" aria-label={`Email ${siteConfig.email}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#428a26"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {siteConfig.email}
              </a>
            </div>

            {/* Social Links */}
            <div className="footer-social" aria-label="Follow us on social media">
              {socialLinks.map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={`Follow us on ${social.label}`}
                >
                  <SocialIcon type={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* About Us Column */}
          <nav className="footer-nav" aria-label="About Us links">
            <h3 className="footer-nav-title">About Us</h3>
            <ul className="footer-nav-list" role="list">
              {footerLinks.company.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-nav-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick Links Column */}
          <nav className="footer-nav" aria-label="Quick links">
            <h3 className="footer-nav-title">Quick Links</h3>
            <ul className="footer-nav-list" role="list">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-nav-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Payment Methods Column */}
          <div className="footer-payment">
            <h3 className="footer-nav-title">Secure Payment</h3>
            <div className="payment-logo-container">
              <Image
                src="/images/online-payment.png"
                alt="Supported Payment Methods"
                width={200}
                height={80}
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} {siteConfig.name} All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link href="/privacy" className="footer-bottom-link">
                Privacy Policy
              </Link>
              <Link href="/terms" className="footer-bottom-link">
                Terms of Use
              </Link>
              <Link href="/sitemap" className="footer-bottom-link">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}