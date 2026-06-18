// components/common/MobileBottomNav.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useRoutePrefetch from "@/components/common/useRoutePrefetch";
import { Home, Stethoscope, Package, ShoppingBag, ShoppingCart, User, LogIn, UserPlus } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const prefetchRoute = useRoutePrefetch([
    "/",
    "/doctors",
    "/packages",
    "/shop",
    "/cart",
    "/signup",
    "/signin",
  ]);
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
          onTouchStart={() => prefetchRoute("/")}
        >
          <span className="mob-nav-icon"><Home size={22} /></span>
          <span className="mob-nav-label">Home</span>
        </Link>

        {/* Doctors */}
        <Link
          href="/doctors"
          className={`mob-nav-item${isActive("/doctors") ? " mob-nav-item--active" : ""}`}
          aria-label="Doctors"
          onTouchStart={() => prefetchRoute("/doctors")}
        >
          <span className="mob-nav-icon"><Stethoscope size={22} /></span>
          <span className="mob-nav-label">Doctors</span>
        </Link>

        {/* Packages */}
        <Link
          href="/packages"
          className={`mob-nav-item${isActive("/packages") ? " mob-nav-item--active" : ""}`}
          aria-label="Packages"
          onTouchStart={() => prefetchRoute("/packages")}
        >
          <span className="mob-nav-icon"><Package size={22} /></span>
          <span className="mob-nav-label">Packages</span>
        </Link>

        {/* Shop */}
        <Link
          href="/shop"
          className={`mob-nav-item${isActive("/shop") ? " mob-nav-item--active" : ""}`}
          aria-label="Shop"
          onTouchStart={() => prefetchRoute("/shop")}
        >
          <span className="mob-nav-icon"><ShoppingBag size={22} /></span>
          <span className="mob-nav-label">Shop</span>
        </Link>

        {/* Cart */}
        <Link
          href="/cart"
          className={`mob-nav-item${isActive("/cart") ? " mob-nav-item--active" : ""}`}
          aria-label="Cart"
          onTouchStart={() => prefetchRoute("/cart")}
        >
          <span className="mob-nav-icon">
            <ShoppingCart size={22} />
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
                onTouchStart={() => prefetchRoute("/signup")}
                onClick={() => setAccountOpen(false)}
              >
                <UserPlus size={16} />
                <span>Sign Up</span>
              </Link>
              <div className="mob-nav-dropup-divider" />
              <Link
                href="/signin"
                className="mob-nav-dropup-item"
                role="menuitem"
                onTouchStart={() => prefetchRoute("/signin")}
                onClick={() => setAccountOpen(false)}
              >
                <LogIn size={16} />
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
            <span className="mob-nav-icon"><User size={22} /></span>
            <span className="mob-nav-label">Account</span>
          </button>
        </div>

      </nav>
    </>
  );
}