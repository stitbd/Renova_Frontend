"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navLinks, socialLinks } from "@/constants/navLinks";
import { siteConfig } from "@/constants/siteData";
import CartBadge from "@/components/common/CartBadge";
import "../../styles/components/Navbar.css";

/* ── Inline SVG social icons ── */
const SocialIcon = ({ type }) => {
  const paths = {
    facebook:
      "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
    linkedin:
      "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z",
    youtube:
      "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
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
      {type === "linkedin" && (
        <circle cx="2" cy="2" r="1.5" transform="translate(0 7)" />
      )}
    </svg>
  );
};

/* ── Phone SVG ── */
const PhoneIcon = ({ size = 15 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 10a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.44 0h3a2 2 0 0 1 2 1.72A12.84 12.84 0 0 0 9.1 5.07a2 2 0 0 1-.45 2.11L7.5 8.28a16 16 0 0 0 6.29 6.29l1.1-1.1a2 2 0 0 1 2.11-.45A12.84 12.84 0 0 0 20.28 14a2 2 0 0 1 1.72 2z" />
  </svg>
);

/* ── Report/PDF SVG ── */
const ReportIcon = ({ size = 15 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

/* ── Calendar SVG ── */
const CalendarIcon = ({ size = 15 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

/* ── Close SVG ── */
const CloseIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ── Email SVG ── */
const EmailIcon = ({ size = 13 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

/* ── Chevron Down SVG ── */
const ChevronDownIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ── Cart SVG ── */
const CartIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

/* ── User SVG ── */
const UserIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

/* ════════════════════════════════════════════
   MAIN NAVBAR COMPONENT
   ════════════════════════════════════════════ */
export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [expandedMobileMenu, setExpandedMobileMenu] = useState(null);
  const drawerRef = useRef(null);

  if (pathname?.startsWith('/PatientPortal')) return null;

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* Close on Escape key */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const closeDrawer = () => setMobileOpen(false);
  const toggleMobileSubmenu = (href) => {
    setExpandedMobileMenu(expandedMobileMenu === href ? null : href);
  };

  /* ── Helper: Split array into N chunks for mega menu ── */
  const chunkArray = (arr, chunks = 3) => {
    const result = [];
    const chunkSize = Math.ceil(arr.length / chunks);
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  return (
    <>
      {/* ── Top Announcement Bar ── */}
      <div className="top-bar" role="banner">
        <div className="top-bar-container">
          <div className="top-bar-left">
            <span className="emergency-badge">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 10a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.44 0h3a2 2 0 0 1 2 1.72A12.84 12.84 0 0 0 9.1 5.07a2 2 0 0 1-.45 2.11L7.5 8.28a16 16 0 0 0 6.29 6.29l1.1-1.1a2 2 0 0 1 2.11-.45A12.84 12.84 0 0 0 20.28 14a2 2 0 0 1 1.72 2z" />
              </svg>
              Emergency:&nbsp;{siteConfig.phone}
            </span>
            <span className="email-badge">
              <EmailIcon />
              {siteConfig.email}
            </span>
          </div>
          <div className="top-bar-right">
            <div className="topbar-actions">
              {/* Cart */}
              <CartBadge />

              {/* My Account with dropdown */}
              <div className="topbar-account">
                <button className="topbar-action-link topbar-account-btn" aria-haspopup="true" aria-label="My Account">
                  <UserIcon size={15} />
                  <span>My Account</span>
                  <ChevronDownIcon />
                </button>
                <div className="topbar-account-dropdown">
                  <Link href="/signup" className="topbar-dropdown-item">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>
                    </svg>
                    Sign Up
                  </Link>
                  <Link href="/signin" className="topbar-dropdown-item">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
                    </svg>
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Header ── */}
      <header className={`main-header${isScrolled ? " scrolled" : ""}`}>
        <nav className="nav-container" role="navigation" aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" className="logo-wrapper" aria-label="Renova Life Care — Home">
            <div className="logo">
              <Image
                src="/images/logo2.png"
                alt="Renova Life Care"
                width={180}
                height={64}
                priority
                style={{ width: "auto", height: "52px", maxHeight: "52px", objectFit: "contain" }}
              />
            </div>
          </Link>

          {/* Desktop Nav Links with Dropdown Support */}
          <ul className="nav-links" role="list">
            {navLinks.map((link) => {
              const hasDropdown = link.children && link.children.length > 0;
              
              if (hasDropdown) {
                // ✅ Check if this is Services → use Mega Menu
                const isMegaMenu = link.href === "/services";
                const menuColumns = isMegaMenu ? chunkArray(link.children, 3) : [link.children];
                
                return (
                  <li key={link.href} className="nav-item-dropdown" role="menuitem">
                    <Link
                      href={link.href}
                      className={`nav-link dropdown-toggle${activeLink === link.href ? " active" : ""}`}
                      onClick={() => setActiveLink(link.href)}
                      aria-current={activeLink === link.href ? "page" : undefined}
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {link.label}
                      <ChevronDownIcon />
                    </Link>
                    
                    {/* ✅ Conditional: Mega Menu or Regular Dropdown */}
                    <div className={`dropdown-menu${isMegaMenu ? " mega-menu" : ""}`} role="menu">
                      {menuColumns.map((columnItems, colIndex) => (
                        <div key={colIndex} className="dropdown-column">
                          {/* ✅ Headers removed - only menu items */}
                          {columnItems.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`dropdown-item${activeLink === child.href ? " active" : ""}`}
                              onClick={() => setActiveLink(child.href)}
                              role="menuitem"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </li>
                );
              }
              
              // Regular menu item (no dropdown)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`nav-link${activeLink === link.href ? " active" : ""}`}
                    onClick={() => setActiveLink(link.href)}
                    aria-current={activeLink === link.href ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA Buttons */}
          <div className="nav-buttons">
            <Link href="/doctor-portal/doctor-signin" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <ReportIcon size={15} />
              Doctor Login
            </Link>
            <Link href="/appointment" className="btn btn-primary">
              <CalendarIcon size={15} />
              Book Appointment
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className={`mobile-menu-btn${mobileOpen ? " open" : ""}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      {/* ── Backdrop Overlay ── */}
      <div
        className={`mobile-overlay${mobileOpen ? " visible" : ""}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* ── Side Drawer with Submenu Support ── */}
      <aside
        id="mobile-drawer"
        className={`mobile-drawer${mobileOpen ? " open" : ""}`}
        ref={drawerRef}
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <Link href="/" className="drawer-logo" onClick={closeDrawer} aria-label="Home">
            <Image
              src="/images/logo2.png"
              alt="Renova Life Care"
              width={160}
              height={56}
              style={{ width: "auto", height: "38px", maxHeight: "38px", objectFit: "contain" }}
            />
          </Link>
          <button className="drawer-close-btn" onClick={closeDrawer} aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>

        {/* Contact strip inside drawer */}
        <div className="drawer-contact-info">
          <div className="drawer-contact-item">
            <PhoneIcon size={14} />
            <span>{siteConfig.phone}</span>
          </div>
          <div className="drawer-contact-item">
            <EmailIcon size={14} />
            <span>{siteConfig.email}</span>
          </div>
        </div>

        <hr className="drawer-divider" style={{ margin: "0.75rem 1rem 0.25rem" }} />

        {/* Drawer Nav Links with Submenu Support */}
        <div className="drawer-body">
          {navLinks.map((link) => {
            const hasSubmenu = link.children && link.children.length > 0;
            const isExpanded = expandedMobileMenu === link.href;
            
            if (hasSubmenu) {
                const isMegaMenu = link.href === "/services";
                
                return (
                  <div key={link.href} className="mobile-nav-item">
                    <button
                      className={`mobile-nav-toggle${isExpanded ? " expanded" : ""}`}
                      onClick={() => toggleMobileSubmenu(link.href)}
                      aria-expanded={isExpanded}
                      aria-controls={`submenu-${link.href.replace(/\//g, '')}`}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                        <span className="nav-dot" aria-hidden="true" />
                        {link.label}
                      </span>
                      <span className="toggle-icon">
                        <ChevronDownIcon />
                      </span>
                    </button>
                    
                    <div
                      id={`submenu-${link.href.replace(/\//g, '')}`}
                      className={`mobile-submenu${isExpanded ? " expanded" : ""}`}
                    >
                      {/* ✅ Mobile: Single stacked list for ALL menus (including Services) */}
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`dropdown-item${activeLink === child.href ? " active" : ""}`}
                          onClick={() => {
                            setActiveLink(child.href);
                            closeDrawer();
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`mobile-nav-link${activeLink === link.href ? " active" : ""}`}
                onClick={() => {
                  setActiveLink(link.href);
                  closeDrawer();
                }}
                aria-current={activeLink === link.href ? "page" : undefined}
              >
                <span className="nav-dot" aria-hidden="true" />
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Drawer Footer CTAs */}
        <div className="drawer-footer">
          <Link href={`tel:${siteConfig.phone}`} className="mobile-btn-call" onClick={closeDrawer}>
            <PhoneIcon size={16} />
            Call Now
          </Link>
          <Link href="/appointment" className="mobile-btn-appointment" onClick={closeDrawer}>
            <CalendarIcon size={16} />
            Book Appointment
          </Link>

          {/* Social row */}
          <nav className="drawer-social" aria-label="Social media links">
            {socialLinks.map((social) => (
              <a
                key={social.icon}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="drawer-social-link"
                aria-label={`Follow us on ${social.label}`}
              >
                <SocialIcon type={social.icon} />
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* ── Fixed Right Side Button ── */}
      <div className="fixed-report-wrapper">
        <Link href="/PatientPortal/pportal" target="_blank" rel="noopener noreferrer" className="fixed-report-btn">
          <ReportIcon size={15} />
          Report Download
        </Link>
      </div>
    </>
  );
}