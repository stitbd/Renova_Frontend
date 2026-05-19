"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { shopProducts } from "@/constants/siteData";
import { Section, SectionHeader } from "@/components/common/Section";
import { useCart } from "@/context/CartContext";
import "./ShopSection.css";

// Animation variants - Same as AboutSection
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/* ── Icons ──────────────────────────────────────────────────── */
const CartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const BuyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const StarIcon = ({ filled }) => (
  <svg width="11" height="11" viewBox="0 0 24 24"
    fill={filled ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

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
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
          stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      <span className="toast__message">{message}</span>
    </div>
  );
}

let toastIdCounter = 0;

/* ════════════════════════════════════════════════════════════════
   PRODUCT CARD - with animations
   ════════════════════════════════════════════════════════════════ */
function ProductCard({ product, index }) {
  const { addToCart, cartItems } = useCart();
  const router = useRouter();

  const inCart = cartItems.some((i) => i.id === product.id);
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
    <motion.article 
      className="spc-card" 
      aria-label={product.name}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -6 }}
    >
      {/* ── Image with Animation ── */}
      <motion.div 
        className="spc-img-wrap"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={`/images/shop/image${product.id}.jpg`}
          alt={product.name}
          fill
          className="spc-img"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Gradient overlay */}
        <div className="spc-img-overlay" aria-hidden="true" />

        {/* Badge with Fade-in */}
        {product.badge && (
          <motion.span 
            className={`spc-badge ${badgeCls}`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.1, type: "spring" }}
          >
            {product.badge}
          </motion.span>
        )}

        {/* Discount pill with Fade-in */}
        {discount && (
          <motion.span 
            className="spc-discount-pill"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.15, type: "spring" }}
          >
            -{discount}%
          </motion.span>
        )}

        {/* Quick-add on image hover */}
        <motion.div 
          className="spc-quick-add" 
          aria-hidden="true"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          <motion.button
            type="button"
            className="spc-quick-btn"
            onClick={handleAddToCart}
            tabIndex={-1}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CartIcon />
            Quick Add
          </motion.button>
        </motion.div>
      </motion.div>

      {/* ── Body with Staggered Content ── */}
      <motion.div 
        className="spc-body"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Category + rating row */}
        <motion.div 
          className="spc-meta"
          variants={fadeInUp}
        >
          <motion.span 
            className="spc-category"
            variants={fadeInUp}
          >
            {product.category}
          </motion.span>
          <motion.div 
            className="spc-stars" 
            aria-label={`${product.rating} stars`}
            variants={staggerContainer}
          >
            {[1, 2, 3, 4, 5].map((s) => (
              <motion.span
                key={s}
                variants={fadeInUp}
                whileHover={{ scale: 1.3, rotate: 10 }}
                transition={{ duration: 0.2 }}
              >
                <StarIcon filled={s <= Math.floor(product.rating)} />
              </motion.span>
            ))}
            <motion.span 
              className="spc-reviews"
              variants={fadeInUp}
            >
              ({product.reviews})
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Name with Hover Color Transition */}
        <motion.h3 
          className="spc-name"
          variants={fadeInUp}
          whileHover={{ color: "var(--color-primary, #1E6FAF)" }}
        >
          {product.name}
        </motion.h3>

        {/* Price row with Fade-in */}
        <motion.div 
          className="spc-price-row"
          variants={fadeInUp}
        >
          <motion.span 
            className="spc-price"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            ৳{product.price.toLocaleString()}
          </motion.span>
          {product.oldPrice && (
            <motion.span 
              className="spc-old-price"
              variants={fadeInUp}
            >
              ৳{product.oldPrice.toLocaleString()}
            </motion.span>
          )}
        </motion.div>

        {/* ── CTA buttons with Hover Effects ── */}
        <motion.div 
          className="spc-actions"
          variants={fadeInUp}
        >
          <motion.button
            type="button"
            onClick={handleAddToCart}
            className={`btn btn-secondary spc-btn-cart ${
              added ? "spc-btn-cart--added" : ""
            }`}
            aria-label={added ? "Added to cart" : `Add ${product.name} to cart`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            {added ? <CheckIcon /> : <CartIcon />}
            <span>{added ? "Added!" : "Add to Cart"}</span>
          </motion.button>

          <motion.button
            type="button"
            onClick={handleBuyNow}
            className="btn btn-primary spc-btn-buy"
            aria-label={`Buy ${product.name} now`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <BuyIcon />
            <span>Buy Now</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

/* ════════════════════════════════════════════════════════════════
   SECTION
   ════════════════════════════════════════════════════════════════ */
export default function ShopSection() {
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
      <Section id="shop" bg="bg-white">
        
        {/* Section Header with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            label="Our Shop"
            title="Health Products, <span class='section-heading-accent'>Delivered to Your Door</span>"
            subtitle="Trusted medical devices, supplements, and health kits from certified brands — all in one place."
          />
        </motion.div>

        {/* Product Grid with Staggered Card Animations */}
        <motion.div 
          className="shop-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {shopProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </motion.div>

        {/* View All Button with Animation */}
        <motion.div 
          className="shop-view-all"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div 
            whileHover={{ scale: 1.03 }} 
            whileTap={{ scale: 0.98 }} 
            transition={{ duration: 0.2 }}
          >
            <Link href="/shop" className="btn btn-primary shop-cta-btn">
              Browse All Products
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </Section>

      {/* Toast Container - Fixed position, outside Section for proper stacking */}
      <div className="toast-container" aria-live="polite" aria-atomic="true">
        {toasts.map((t) => (
          <Toast key={t.id} message={t.message} />
        ))}
      </div>
    </>
  );
}