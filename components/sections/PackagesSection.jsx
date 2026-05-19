"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Section, SectionHeader } from "@/components/common/Section";
import Button from "@/components/common/Button";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import "./PackagesSection.css";

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
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/* ═══════════════════════════════════════════════════════════════
   STATIC PLANS DATA
   ═══════════════════════════════════════════════════════════════ */
const pricingPlans = [
  {
    id: "package-1",
    name: "Package-1",
    description: "Essential health screening",
    price: 5900,
    totalCost: 7710,
    savings: 1810,
    popular: false,
    features: [
      { name: "Complete Blood Count (CBC)",                 price: 400  },
      { name: "Random Blood Sugar",                         price: 200  },
      { name: "Lipid Profile (Random)",                     price: 1400 },
      { name: "Blood Grouping & RH Factor",                 price: 300  },
      { name: "Serum Creatinine",                           price: 400  },
      { name: "HBsAg",                                      price: 1000 },
      { name: "Urine R/E",                                  price: 400  },
      { name: "ECG",                                        price: 400  },
      { name: "Digital X-Ray of Chest P/A View (Digital)",  price: 600  },
      { name: "Ultrasonography of Whole Abdomen",           price: 2500 },
      { name: "Needle, Tube & Reg. Charges",                price: 110  },
    ],
  },
  {
    id: "package-2",
    name: "Package-2",
    description: "Comprehensive wellness check",
    price: 10650,
    totalCost: 14030,
    savings: 3380,
    popular: true,
    features: [
      { name: "Complete Blood Count (CBC)",                 price: 400  },
      { name: "Blood Sugar (Fasting & 2 hrs ABF)",          price: 400  },
      { name: "HbA1c",                                      price: 1400 },
      { name: "Lipid Profile (Fasting)",                    price: 1400 },
      { name: "Liver Function Test",                        price: 1000 },
      { name: "Serum Creatinine",                           price: 400  },
      { name: "Serum Uric Acid",                            price: 600  },
      { name: "Serum Electrolytes",                         price: 1000 },
      { name: "TSH",                                        price: 1000 },
      { name: "HBsAg",                                      price: 1000 },
      { name: "PSA",                                        price: 1400 },
      { name: "Urine R/E",                                  price: 400  },
      { name: "ECG",                                        price: 400  },
      { name: "Digital X-Ray of Chest P/A View (Digital)",  price: 600  },
      { name: "Ultrasonography of Whole Abdomen",           price: 2500 },
      { name: "Needle, Tube & Reg. Charges",                price: 130  },
    ],
  },
  {
    id: "package-3",
    name: "Package-3",
    description: "Advanced full-body package",
    price: 12850,
    totalCost: 16930,
    savings: 4080,
    popular: false,
    features: [
      { name: "Complete Blood Count (CBC)",                 price: 400  },
      { name: "Blood Sugar (Fasting & 2 hrs ABF)",          price: 400  },
      { name: "HbA1c",                                      price: 1400 },
      { name: "Lipid Profile (Fasting)",                    price: 1400 },
      { name: "Liver Function Test",                        price: 1000 },
      { name: "Serum Creatinine",                           price: 400  },
      { name: "Serum Uric Acid",                            price: 600  },
      { name: "Serum Electrolytes",                         price: 1000 },
      { name: "TSH",                                        price: 1000 },
      { name: "HBsAg",                                      price: 1000 },
      { name: "Pap Smear",                                  price: 1200 },
      { name: "Urine R/E",                                  price: 400  },
      { name: "ECG",                                        price: 400  },
      { name: "Digital X-Ray of Chest P/A View (Digital)",  price: 600  },
      { name: "Mammography of Both Breast",                 price: 3000 },
      { name: "Ultrasonography of Whole Abdomen",           price: 2500 },
      { name: "Needle, Tube & Reg. Charges",                price: 230  },
    ],
  },
  {
    id: "package-4",
    name: "Package-4",
    description: "Comprehensive wellness check",
    price: 10650,
    totalCost: 14030,
    savings: 3380,
    popular: true,
    features: [
      { name: "Complete Blood Count (CBC)",                 price: 400  },
      { name: "Blood Sugar (Fasting & 2 hrs ABF)",          price: 400  },
      { name: "HbA1c",                                      price: 1400 },
      { name: "Lipid Profile (Fasting)",                    price: 1400 },
      { name: "Liver Function Test",                        price: 1000 },
      { name: "Serum Creatinine",                           price: 400  },
      { name: "Serum Uric Acid",                            price: 600  },
      { name: "Serum Electrolytes",                         price: 1000 },
      { name: "TSH",                                        price: 1000 },
      { name: "HBsAg",                                      price: 1000 },
      { name: "PSA",                                        price: 1400 },
      { name: "Urine R/E",                                  price: 400  },
      { name: "ECG",                                        price: 400  },
      { name: "Digital X-Ray of Chest P/A View (Digital)",  price: 600  },
      { name: "Ultrasonography of Whole Abdomen",           price: 2500 },
      { name: "Needle, Tube & Reg. Charges",                price: 130  },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════════════════════ */
const CartIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const BuyIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const planIcons = {
  "package-1": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  ),
  "package-2": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  "package-3": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
};

/* ── Save ribbon ─────────────────────────────────────────────── */
function SaveRibbon({ amount, isPopular }) {
  if (!amount) return null;
  return (
    <div className={`pkg-ribbon ${isPopular ? "ribbon-popular" : ""}`}>
      <span>Save {Number(amount).toLocaleString()}</span>
    </div>
  );
}

/* ── Toast Component ── */
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

/* ═══════════════════════════════════════════════════════════════
   PLAN CARD — individual card with cart logic & animations
   ═══════════════════════════════════════════════════════════════ */
function PlanCard({ plan, index }) {
  const { addToCart, cartItems } = useCart();
  const router = useRouter();
  const icon = planIcons[plan.id];

  const inCart = cartItems.some((i) => i.id === plan.id);

  const handleAddToCart = () => {
    addToCart({
      id:       plan.id,
      name:     plan.name,
      price:    plan.price,
      oldPrice: plan.totalCost,
      category: "Health Package",
    });
    
    window.dispatchEvent(
      new CustomEvent("show-toast", {
        detail: { message: `${plan.name} added to cart!` },
      })
    );
  };

  const handleBuyNow = () => {
    addToCart({
      id:       plan.id,
      name:     plan.name,
      price:    plan.price,
      oldPrice: plan.totalCost,
      category: "Health Package",
    });
    router.push("/cart");
  };

  return (
    <motion.div
      className={`pricing-card card ${plan.popular ? "popular" : ""}`}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <SaveRibbon amount={plan.savings} isPopular={plan.popular} />

      {/* Header: icon + name with Animation */}
      <motion.div 
        className="pkg-header"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.1 }}
      >
        <motion.div 
          className={`plan-icon-wrap ${plan.popular ? "icon-popular" : ""}`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {icon}
        </motion.div>
        <div>
          <h3 className={`pkg-plan-name ${plan.popular ? "name-popular" : ""}`}>
            {plan.name}
          </h3>
          <p className="pkg-plan-sub">{plan.description}</p>
        </div>
      </motion.div>

      <div className={`pkg-divider ${plan.popular ? "divider-popular" : ""}`} />

      {/* Feature rows with Staggered Animation */}
      <motion.ul 
        className="pkg-features"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {plan.features.map((feature, i) => (
          <motion.li
            key={i}
            className={`pkg-feature-row ${i % 2 === 0 ? "row-even" : "row-odd"}`}
            variants={fadeInUp}
            transition={{ delay: i * 0.03 }}
          >
            <span className="pkg-feature-name">{feature.name}</span>
            <span className="pkg-feature-price">
              BDT {feature.price.toLocaleString()}.00
            </span>
          </motion.li>
        ))}
      </motion.ul>

      {/* Price summary with Animation */}
      <motion.div 
        className="pkg-price-block"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.3 }}
      >
        <div className="pkg-price-row">
          <span className="pkg-price-label">Total Cost:</span>
          <span className="pkg-total-value">
            BDT {plan.totalCost.toLocaleString()}.00
          </span>
        </div>
        <div className="pkg-price-row">
          <span className="pkg-price-label strong">Discounted Price:</span>
          <span className="pkg-discounted-value">
            BDT {plan.price.toLocaleString()}.00
          </span>
        </div>
      </motion.div>

      {/* Two CTA buttons with Hover Effects */}
      <motion.div 
        className="pkg-cta-group"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.35 }}
      >
        <motion.button
          type="button"
          onClick={handleAddToCart}
          className={`btn pkg-btn-stretch ${inCart ? "btn-secondary pkg-btn--added" : "btn-secondary"}`}
          aria-label={inCart ? `${plan.name} added to cart` : `Add ${plan.name} to cart`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {inCart ? <CheckIcon /> : <CartIcon />}
          {inCart ? "Added!" : "Add to Cart"}
        </motion.button>

        <motion.button
          type="button"
          onClick={handleBuyNow}
          className="btn btn-primary pkg-btn-stretch"
          aria-label={`Buy ${plan.name} now`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <BuyIcon /> Buy Now
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION
   ═══════════════════════════════════════════════════════════════ */
export default function PackagesSection() {
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
    <Section id="pricing" variant="alternate" className="pricing-section">
      
      {/* Section Header with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeader
          label="Health Packages"
          title="Health Packages <span class='section-heading-accent'>& Discounts</span>"
          subtitle="Comprehensive diagnostic packages for your family's well-being. All prices in BDT."
        />
      </motion.div>

      {/* Pricing Grid with Staggered Card Animations */}
      <motion.div 
        className="pricing-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {pricingPlans.map((plan, index) => (
          <PlanCard key={plan.id} plan={plan} index={index} />
        ))}
      </motion.div>

      {/* Custom Plans Note with Animation */}
      <motion.p 
        className="custom-plans-note"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Custom packages available for corporate health programs.{" "}
        <Link href="/contact" className="contact-link">Contact us →</Link>
      </motion.p>

      {/* View All Packages Button with Animation */}
      <motion.div 
        className="shop-view-all"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
          <Link href="/packages" className="btn btn-primary shop-cta-btn">
            Browse All Packages
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </motion.div>
      </motion.div>

      {/* Toast Container */}
      <div className="toast-container" aria-live="polite" aria-atomic="true">
        {toasts.map((t) => (
          <Toast key={t.id} message={t.message} />
        ))}
      </div>
    </Section>
  );
}