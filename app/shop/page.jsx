"use client";

import { shopProducts } from "@/constants/siteData";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import "@/styles/pages/shop.css";
import "@/styles/components/HeroSection.css";
import {
  ShoppingCart,
  ArrowRight,
  Check,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Award,
  Package,
  Heart,
  Plus,
  Minus,
  Eye
} from "lucide-react";

/* ── Badge color map ── */
const badgeClass = {
  "Best Seller": "shop-badge-bestseller",
  "New": "shop-badge-new",
};

/* ── Toast ── */
function Toast({ message }) {
  return (
    <div className="toast toast--visible" role="status" aria-live="polite">
      <span className="toast__icon" aria-hidden="true">
        <Check size={11} color="#fff" strokeWidth={3} />
      </span>
      <span className="toast__message">{message}</span>
    </div>
  );
}

let toastIdCounter = 0;

/* ── Star Rating Component ── */
function StarRating({ rating }) {
  return (
    <div className="spc-stars" aria-label={`${rating} stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={11}
          fill={s <= Math.floor(rating) ? "#f59e0b" : "none"}
          stroke="#f59e0b"
          strokeWidth={2}
        />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PRODUCT CARD
   ════════════════════════════════════════════════════════════════ */
function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart();
  const router = useRouter();

  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
    window.dispatchEvent(
      new CustomEvent("show-toast", {
        detail: { message: `${product.name} added to cart!` },
      })
    );
  };

  const handleBuyNow = () => {
    addToCart(product);
    router.push("/cart");
  };

  const badgeKey = product.badge;
  const badgeCls = badgeClass[badgeKey] || "shop-badge-sale";
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <article className="spc-card" aria-label={product.name}>
      {/* ── Image ── */}
      <div className="spc-img-wrap">
        <Image
          src={`/images/shop/image${product.id}.jpg`}
          alt={product.name}
          fill
          className="spc-img"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Gradient overlay */}
        <div className="spc-img-overlay" aria-hidden="true" />

        {/* Badge */}
        {product.badge && (
          <span className={`spc-badge ${badgeCls}`}>{product.badge}</span>
        )}

        {/* Discount pill */}
        {discount && (
          <span className="spc-discount-pill">-{discount}%</span>
        )}

        {/* Quick-add on image hover */}
        <div className="spc-quick-add" aria-hidden="true">
          <button
            type="button"
            className="spc-quick-btn"
            onClick={handleAddToCart}
            tabIndex={-1}
          >
            <ShoppingCart size={14} />
            Quick Add
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="spc-body">
        {/* Category + rating row */}
        <div className="spc-meta">
          <span className="spc-category">{product.category}</span>
          <div className="spc-stars-wrap">
            <StarRating rating={product.rating} />
            <span className="spc-reviews">({product.reviews})</span>
          </div>
        </div>

        {/* Name */}
        <h3 className="spc-name">{product.name}</h3>

        {/* Price row */}
        <div className="spc-price-row">
          <span className="spc-price">৳{product.price.toLocaleString()}</span>
          {product.oldPrice && (
            <span className="spc-old-price">
              ৳{product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* ── CTA buttons ── */}
        <div className="spc-actions">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`btn btn-secondary spc-btn-cart ${added ? "spc-btn-cart--added" : ""
              }`}
            aria-label={added ? "Added to cart" : `Add ${product.name} to cart`}
          >
            {added ? <Check size={14} /> : <ShoppingCart size={14} />}
            <span>{added ? "Added!" : "Add to Cart"}</span>
          </button>

          <button
            type="button"
            onClick={handleBuyNow}
            className="btn btn-primary spc-btn-buy"
            aria-label={`Buy ${product.name} now`}
          >
            <ArrowRight size={14} />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ShopContent() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      const id = ++toastIdCounter;
      setToasts((prev) => [...prev, { id, message: e.detail.message }]);
      setTimeout(
        () => setToasts((prev) => prev.filter((t) => t.id !== id)),
        2400
      );
    };
    window.addEventListener("show-toast", handler);
    return () => window.removeEventListener("show-toast", handler);
  }, []);

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero__container">
          <span className="page-hero__label">Health Store</span>
          <h1 className="page-hero__title">
            Shop <span className="page-hero__highlight">Health Products</span>
          </h1>
          <p className="page-hero__subtitle">
            Certified medical devices, supplements, and healthcare kits — delivered to your doorstep across Bangladesh.
          </p>
          <nav aria-label="Breadcrumb" className="page-hero__breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Shop</span>
          </nav>
        </div>
      </section>

      {/* Shop Highlights */}
      <section className="page-section page-section--white">
        <div className="page-section__container">
          <div className="page-shop-perks">
            {[
              { icon: Award, title: "Certified Products", desc: "All products are certified and approved by health authorities." },
              { icon: Truck, title: "Fast Delivery", desc: "Dhaka delivery within 24 hours. Nationwide within 3 days." },
              { icon: RotateCcw, title: "Easy Returns", desc: "Hassle-free 7-day return policy on all products." },
              { icon: Shield, title: "Secure Payments", desc: "SSL-secured checkout with bKash, Nagad, and card support." },
            ].map((perk) => {
              const IconComponent = perk.icon;
              return (
                <div key={perk.title} className="page-perk-card">
                  <span className="page-perk-icon"><IconComponent size={24} /></span>
                  <div>
                    <h3 className="page-perk-title">{perk.title}</h3>
                    <p className="page-perk-desc">{perk.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="page-section page-section--slate">
        <div className="page-section__container page-cta-center">
          <div className="shop-grid">
            {shopProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-section page-section--green">
        <div className="page-section__container page-cta-center">
          <h2 className="page-cta-title">Need Help Choosing?</h2>
          <p className="page-cta-subtitle">Our pharmacists can recommend the right products for your health needs.</p>
          <Link href="/contact" className="page-cta-btn">
            Contact a Pharmacist
          </Link>
        </div>
      </section>

      {/* Toast Container */}
      <div className="toast-container" aria-live="polite" aria-atomic="true">
        {toasts.map((t) => (
          <Toast key={t.id} message={t.message} />
        ))}
      </div>
    </>
  );
}