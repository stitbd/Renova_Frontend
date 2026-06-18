"use client";
/* ═══════════════════════════════════════════════════════════════
   File: /app/cart/page.jsx  (REPLACE existing file)
   ═══════════════════════════════════════════════════════════════ */
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import "@/styles/pages/cart.css";
import "@/styles/components/HeroSection.css";
import {
  Trash2,
  Minus,
  Plus,
  Shield,
  Truck,
  RefreshCw,
  Check,
  ShoppingCart,
  ArrowLeft
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   PACKAGE FEATURES MAP
   ═══════════════════════════════════════════════════════════════ */
const packageFeaturesMap = {
  "package-1": [
    "Complete Blood Count (CBC)",
    "Random Blood Sugar",
    "Lipid Profile (Random)",
    "Blood Grouping & RH Factor",
    "Serum Creatinine",
    "HBsAg",
    "Urine R/E",
    "ECG",
    "Digital X-Ray of Chest P/A View",
    "Ultrasonography of Whole Abdomen",
    "Needle, Tube & Reg. Charges",
  ],
  "package-2": [
    "Complete Blood Count (CBC)",
    "Blood Sugar (Fasting & 2 hrs ABF)",
    "HbA1c",
    "Lipid Profile (Fasting)",
    "Liver Function Test",
    "Serum Creatinine",
    "Serum Uric Acid",
    "Serum Electrolytes",
    "TSH",
    "HBsAg",
    "PSA",
    "Urine R/E",
    "ECG",
    "Digital X-Ray of Chest P/A View",
    "Ultrasonography of Whole Abdomen",
    "Needle, Tube & Reg. Charges",
  ],
  "package-3": [
    "Complete Blood Count (CBC)",
    "Blood Sugar (Fasting & 2 hrs ABF)",
    "HbA1c",
    "Lipid Profile (Fasting)",
    "Liver Function Test",
    "Serum Creatinine",
    "Serum Uric Acid",
    "Serum Electrolytes",
    "TSH",
    "HBsAg",
    "Pap Smear",
    "Urine R/E",
    "ECG",
    "Digital X-Ray of Chest P/A View",
    "Mammography of Both Breast",
    "Ultrasonography of Whole Abdomen",
    "Needle, Tube & Reg. Charges",
  ],
};

/* Reuse features for package-4 to package-9 (cycle through 1-2-3) */
["4", "5", "6", "7", "8", "9"].forEach((n) => {
  const base = ["1", "2", "3"][(parseInt(n) - 1) % 3];
  packageFeaturesMap[`package-${n}`] = packageFeaturesMap[`package-${base}`];
});

/* ── Helper: is this item a Health Package? ── */
const isPackage = (item) => item.category === "Health Package";

/* ═══════════════════════════════════════════════════════════════
   PACKAGE DETAIL PANEL
   ═══════════════════════════════════════════════════════════════ */
function PackageDetail({ item }) {
  const [expanded, setExpanded] = useState(false);
  const features = packageFeaturesMap[item.id] || [];
  const showCount = 4;
  const visible = expanded ? features : features.slice(0, showCount);
  const remaining = features.length - showCount;

  return (
    <div className="cart-pkg-detail">
      <ul className="cart-pkg-features">
        {visible.map((f, i) => (
          <li key={i} className="cart-pkg-feature-item">
            <span className="cart-pkg-check"><Check size={12} /></span>
            <span>{f}</span>
          </li>
        ))}
        {!expanded && remaining > 0 && (
          <li className="cart-pkg-more" onClick={() => setExpanded(true)}>
            <span className="cart-pkg-check"><Check size={12} /></span>
            <span>+{remaining} more tests</span>
          </li>
        )}
        {expanded && (
          <li className="cart-pkg-more" onClick={() => setExpanded(false)}>
            <span className="cart-pkg-check"><Check size={12} /></span>
            <span>Show less</span>
          </li>
        )}
      </ul>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function CartPage() {
  const { cartItems, removeFromCart, updateQty, totalPrice } = useCart();

  const tax = Math.round(totalPrice * 0.05);
  const total = totalPrice + tax;

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero__container">
          <span className="page-hero__label">Your Cart</span>
          <h1 className="page-hero__title">
            Review Your <span className="page-hero__highlight">Selected Items</span>
          </h1>
          <p className="page-hero__subtitle">
            Verify your selections before proceeding to checkout. All prices in BDT.
          </p>
          <nav aria-label="Breadcrumb" className="page-hero__breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Cart</span>
          </nav>
        </div>
      </section>

      {/* Cart Content */}
      <section className="page-section">
        <div className="page-section__container">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty__icon"><ShoppingCart size={48} /></div>
              <h3>Your cart is empty</h3>
              <p>Browse our health products and packages to get started.</p>
              <Link href="/shop" className="btn btn-primary cart-empty__btn">
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="cart-grid">

              {/* ── Cart Items ── */}
              <div className="cart-items">
                {cartItems.map((item) => {
                  const pkg = isPackage(item);
                  const savings = item.oldPrice
                    ? (item.oldPrice - item.price) * item.quantity
                    : 0;

                  return (
                    <article key={item.id} className="cart-item card">

                      {/* ── Header row ── */}
                      <div className="cart-item__header">
                        <div className="cart-item__badge">
                          {pkg && item.popular
                            ? "Popular"
                            : item.category || "Product"}
                        </div>
                        <button
                          className="cart-item__remove"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 size={16} />
                          <span>Remove</span>
                        </button>
                      </div>

                      {/* ── Content grid ──
                          Package  → full-width feature list (no image column)
                          Product  → image + info + actions (3 columns)
                      ── */}
                      {pkg ? (
                        /* ══ PACKAGE LAYOUT ══ */
                        <div className="cart-item__content cart-item__content--pkg">
                          {/* Left: name + description */}
                          <div className="cart-item__info">
                            <h3 className="cart-item__name">{item.name}</h3>
                            <p className="cart-item__desc">Discounted health package</p>
                            {/* Feature list */}
                            <PackageDetail item={item} />
                          </div>

                          {/* Right: qty + price */}
                          <div className="cart-item__actions">
                            <div className="qty-control">
                              <button className="qty-btn"
                                onClick={() => updateQty(item.id, item.quantity - 1)}
                                aria-label="Decrease quantity">
                                <Minus size={14} />
                              </button>
                              <span className="qty-value">{item.quantity}</span>
                              <button className="qty-btn"
                                onClick={() => updateQty(item.id, item.quantity + 1)}
                                aria-label="Increase quantity">
                                <Plus size={14} />
                              </button>
                            </div>
                            <div className="cart-item__price">
                              {item.oldPrice && (
                                <span className="cart-item__original">
                                  BDT {(item.oldPrice * item.quantity).toLocaleString()}
                                </span>
                              )}
                              <span className="cart-item__current">
                                BDT {(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* ══ PRODUCT LAYOUT ══ */
                        <div className="cart-item__content">
                          {/* Product image */}
                          <div className="cart-item__img-wrap">
                            <Image
                              src={`/images/shop/image${item.id}.jpg`}
                              alt={item.name}
                              fill
                              className="cart-item__img"
                              sizes="96px"
                            />
                          </div>

                          {/* Name */}
                          <div className="cart-item__info">
                            <h3 className="cart-item__name">{item.name}</h3>
                            {item.oldPrice && (
                              <p className="cart-item__desc">
                                Was ৳{item.oldPrice.toLocaleString()}
                              </p>
                            )}
                          </div>

                          {/* Qty + price */}
                          <div className="cart-item__actions">
                            <div className="qty-control">
                              <button className="qty-btn"
                                onClick={() => updateQty(item.id, item.quantity - 1)}
                                aria-label="Decrease quantity">
                                <Minus size={14} />
                              </button>
                              <span className="qty-value">{item.quantity}</span>
                              <button className="qty-btn"
                                onClick={() => updateQty(item.id, item.quantity + 1)}
                                aria-label="Increase quantity">
                                <Plus size={14} />
                              </button>
                            </div>
                            <div className="cart-item__price">
                              {item.oldPrice && (
                                <span className="cart-item__original">
                                  ৳{(item.oldPrice * item.quantity).toLocaleString()}
                                </span>
                              )}
                              <span className="cart-item__current">
                                ৳{(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ── Savings strip ── */}
                      {savings > 0 && (
                        <div className="cart-item__savings">
                          You save {pkg ? "BDT" : "৳"} {savings.toLocaleString()}
                        </div>
                      )}

                    </article>
                  );
                })}
              </div>

              {/* ── Order Summary ── */}
              <aside className="cart-summary card">
                <h3 className="cart-summary__title">Order Summary</h3>
                <div className="cart-summary__row">
                  <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span>৳{totalPrice.toLocaleString()}.00</span>
                </div>
                <div className="cart-summary__row">
                  <span>Tax (5%)</span>
                  <span>৳{tax.toLocaleString()}.00</span>
                </div>
                <div className="cart-summary__divider" />
                <div className="cart-summary__total">
                  <span>Total</span>
                  <span className="cart-summary__total-value">
                    ৳{total.toLocaleString()}.00
                  </span>
                </div>
                <div className="cart-summary__trust">
                  <div className="trust-item"><Shield size={18} /><span>Secure Payment</span></div>
                  <div className="trust-item"><Truck size={18} /><span>Home Delivery Available</span></div>
                  <div className="trust-item"><RefreshCw size={18} /><span>Easy Returns</span></div>
                </div>
                <Link href="/checkout" className="btn btn-primary cart-summary__checkout">
                  Proceed to Checkout
                </Link>
                <Link href="/shop" className="cart-summary__continue">
                  <ArrowLeft size={14} /> Continue Shopping
                </Link>
              </aside>

            </div>
          )}
        </div>
      </section>
    </>
  );
}