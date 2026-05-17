"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* ─── Icons ─── */
const HomeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
    <polyline points="9 21 9 12 15 12 15 21" />
  </svg>
);

const DoctorIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <line x1="12" y1="14" x2="12" y2="18" />
    <line x1="10" y1="16" x2="14" y2="16" />
  </svg>
);

const PackageIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const ShopIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const CartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const AccountIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const SignInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);

const SignUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="23" y1="11" x2="17" y2="11" />
  </svg>
);

/* ─── Main Component ─── */
export default function MobileBottomNav() {
  const pathname = usePathname();
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);

  /* Close dropup on outside click */
  useEffect(() => {
    if (!accountOpen) return;
    const handler = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [accountOpen]);

  /* Close dropup on route change */
  useEffect(() => {
    setAccountOpen(false);
  }, [pathname]);

  /* Hide on PatientPortal */
  if (pathname?.startsWith("/PatientPortal")) return null;

  const cartCount = 0; // CartContext থাকলে এখানে connect করো

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  const isAccountActive =
    pathname?.startsWith("/signin") || pathname?.startsWith("/signup");

  return (
    <>
      {/* Backdrop — dropup খোলা থাকলে */}
      {accountOpen && (
        <div
          className="mob-nav-backdrop"
          onClick={() => setAccountOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav className="mob-nav" aria-label="Mobile bottom navigation">

        {/* Home */}
        <Link
          href="/"
          className={`mob-nav-item${isActive("/") ? " mob-nav-item--active" : ""}`}
          aria-label="Home"
        >
          <span className="mob-nav-icon"><HomeIcon /></span>
          <span className="mob-nav-label">Home</span>
        </Link>

        {/* Doctors */}
        <Link
          href="/doctors"
          className={`mob-nav-item${isActive("/doctors") ? " mob-nav-item--active" : ""}`}
          aria-label="Doctors"
        >
          <span className="mob-nav-icon"><DoctorIcon /></span>
          <span className="mob-nav-label">Doctors</span>
        </Link>

        {/* Packages */}
        <Link
          href="/packages"
          className={`mob-nav-item${isActive("/packages") ? " mob-nav-item--active" : ""}`}
          aria-label="Packages"
        >
          <span className="mob-nav-icon"><PackageIcon /></span>
          <span className="mob-nav-label">Packages</span>
        </Link>

        {/* Shop */}
        <Link
          href="/shop"
          className={`mob-nav-item${isActive("/shop") ? " mob-nav-item--active" : ""}`}
          aria-label="Shop"
        >
          <span className="mob-nav-icon"><ShopIcon /></span>
          <span className="mob-nav-label">Shop</span>
        </Link>

        {/* Cart */}
        <Link
          href="/cart"
          className={`mob-nav-item${isActive("/cart") ? " mob-nav-item--active" : ""}`}
          aria-label="Cart"
        >
          <span className="mob-nav-icon">
            <CartIcon />
            {cartCount > 0 && (
              <span className="mob-nav-badge" aria-label={`${cartCount} items`}>
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </span>
          <span className="mob-nav-label">Cart</span>
        </Link>

        {/* Account — with dropup */}
        <div
          className={`mob-nav-item mob-nav-account${isAccountActive ? " mob-nav-item--active" : ""}`}
          ref={accountRef}
        >
          {/* Dropup panel */}
          {accountOpen && (
            <div className="mob-nav-dropup" role="menu">
              <Link
                href="/signup"
                className="mob-nav-dropup-item"
                role="menuitem"
                onClick={() => setAccountOpen(false)}
              >
                <SignUpIcon />
                <span>Sign Up</span>
              </Link>
              <div className="mob-nav-dropup-divider" />
              <Link
                href="/signin"
                className="mob-nav-dropup-item"
                role="menuitem"
                onClick={() => setAccountOpen(false)}
              >
                <SignInIcon />
                <span>Sign In</span>
              </Link>
            </div>
          )}

          {/* Button */}
          <button
            className="mob-nav-account-btn"
            onClick={() => setAccountOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={accountOpen}
            aria-label="Open account menu"
          >
            <span className="mob-nav-icon"><AccountIcon /></span>
            <span className="mob-nav-label">Account</span>
          </button>
        </div>

      </nav>
    </>
  );
}