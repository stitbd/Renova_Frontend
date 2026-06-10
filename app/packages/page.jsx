"use client";
/* ═══════════════════════════════════════════════════════════════
   File: /app/packages/page.jsx  (REPLACE existing file)
   ═══════════════════════════════════════════════════════════════ */
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import "@/styles/pages/package.css";
import "@/styles/components/HeroSection.css";

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
    id: "package-5",
    name: "Package-5",
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
    id: "package-6",
    name: "Package-6",
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
    id: "package-7",
    name: "Package-7",
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
    id: "package-8",
    name: "Package-8",
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

/* ── ✅ NEW: Toast Component (ADD THIS BLOCK) ── */
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

let toastIdCounter = 0; // ✅ Global counter for unique toast IDs

/* ═══════════════════════════════════════════════════════════════
   PLAN CARD — individual card with cart logic
   ═══════════════════════════════════════════════════════════════ */
function PlanCard({ plan }) {
  const { addToCart, cartItems } = useCart();
  const router = useRouter();

  // Resolve icon — fallback cycle through 3 icons for package-4 to package-9
  const iconKeys = ["package-1", "package-2", "package-3"];
  const iconKey  = planIcons[plan.id]
    ? plan.id
    : iconKeys[(parseInt(plan.id.split("-")[1]) - 1) % 3];
  const icon = planIcons[iconKey];

  // Check if already in cart
  const inCart = cartItems.some((i) => i.id === plan.id);

  const handleAddToCart = () => {
    addToCart({
      id:       plan.id,
      name:     plan.name,
      price:    plan.price,
      oldPrice: plan.totalCost,
      category: "Health Package",
    });
    
    // ✅ Dispatch toast event (NEW)
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
    <div className={`pricing-card card ${plan.popular ? "popular" : ""}`}>
      <SaveRibbon amount={plan.savings} isPopular={plan.popular} />

      {/* Header: icon + name */}
      <div className="pkg-header">
        <div className={`plan-icon-wrap ${plan.popular ? "icon-popular" : ""}`}>
          {icon}
        </div>
        <div>
          <h3 className={`pkg-plan-name ${plan.popular ? "name-popular" : ""}`}>
            {plan.name}
          </h3>
          <p className="pkg-plan-sub">{plan.description}</p>
        </div>
      </div>

      <div className={`pkg-divider ${plan.popular ? "divider-popular" : ""}`} />

      {/* Feature rows */}
      <ul className="pkg-features">
        {plan.features.map((feature, i) => (
          <li
            key={i}
            className={`pkg-feature-row ${i % 2 === 0 ? "row-even" : "row-odd"}`}
          >
            <span className="pkg-feature-name">{feature.name}</span>
            <span className="pkg-feature-price">
              BDT {feature.price.toLocaleString()}.00
            </span>
          </li>
        ))}
      </ul>

      {/* Price summary */}
      <div className="pkg-price-block">
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
      </div>

      {/* Two CTA buttons */}
      <div className="pkg-cta-group">
        <button
          type="button"
          onClick={handleAddToCart}
          className={`btn pkg-btn-stretch ${inCart ? "btn-secondary pkg-btn--added" : "btn-secondary"}`}
          aria-label={inCart ? `${plan.name} added to cart` : `Add ${plan.name} to cart`}
        >
          {inCart ? <CheckIcon /> : <CartIcon />}
          {inCart ? "Added!" : "Add to Cart"}
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          className="btn btn-primary pkg-btn-stretch"
          aria-label={`Buy ${plan.name} now`}
        >
          <BuyIcon /> Buy Now
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function PackagePage() {
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
          <span className="page-hero__label">Health Packages</span>
          <h1 className="page-hero__title">
            Our <span className="page-hero__highlight">Health Packages & Discounts</span>
          </h1>
          <p className="page-hero__subtitle">
            Comprehensive diagnostic packages for your family's well-being. All prices in BDT.
          </p>
          <nav aria-label="Breadcrumb" className="page-hero__breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Packages</span>
          </nav>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="page-section">
        <div className="page-section__container">
          <div className="pricing-grid">
            {pricingPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>

          <p className="custom-plans-note">
            Custom packages available for corporate health programs.{" "}
            <Link href="/contact" className="contact-link">Contact us →</Link>
          </p>
        </div>
      </section>
      <div className="toast-container" aria-live="polite" aria-atomic="true">
        {toasts.map((t) => (
          <Toast key={t.id} message={t.message} />
        ))}
      </div>
    </>
  );
}