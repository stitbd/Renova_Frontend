// app/outlet/pharmacy/page.jsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function PharmacyPage() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    { id: 1, name: "Organic Spirulina 500mg", price: 450, stock: 45, category: "Supplements", image: "/images/shop/image1.jpg" },
    { id: 2, name: "Vitamin D3 1000IU", price: 320, stock: 32, category: "Supplements", image: "/images/shop/image2.jpg" },
    { id: 3, name: "Digital Thermometer", price: 850, stock: 12, category: "Devices", image: "/images/shop/image3.jpg" },
    { id: 4, name: "Face Mask (Pack of 50)", price: 280, stock: 89, category: "Personal Care", image: "/images/shop/image4.jpg" },
    { id: 5, name: "Hand Sanitizer 500ml", price: 180, stock: 156, category: "Personal Care", image: "/images/shop/image1.jpg" },
    { id: 6, name: "Blood Pressure Monitor", price: 2450, stock: 8, category: "Devices", image: "/images/shop/image2.jpg" },
  ];

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pharmacy-layout">
      {/* Products Grid */}
      <motion.div className="products-section">
        <div className="section-header">
          <h2 className="section-title">Products</h2>
          <div className="search-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <motion.div className="products-grid">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              className="product-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                {product.stock < 10 && <span className="stock-warning">Low Stock</span>}
              </div>
              <div className="product-info">
                <h4 className="product-name">{product.name}</h4>
                <p className="product-category">{product.category}</p>
                <div className="product-price">
                  <span className="price">৳{product.price}</span>
                  <span className="stock">Stock: {product.stock}</span>
                </div>
                <motion.button
                  className="btn-add-to-cart"
                  onClick={() => addToCart(product)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Cart Sidebar */}
      <motion.div className="cart-sidebar" initial={{ x: 400 }} animate={{ x: 0 }}>
        <h3 className="cart-title">Current Order</h3>
        
        {cart.length === 0 ? (
          <p className="cart-empty">Cart is empty</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <motion.div key={item.id} className="cart-item" layout>
                  <div className="cart-item-info">
                    <h4 className="item-name">{item.name}</h4>
                    <p className="item-price">৳{item.price} × {item.qty}</p>
                  </div>
                  <div className="cart-item-actions">
                    <span className="item-total">৳{item.price * item.qty}</span>
                    <motion.button
                      className="btn-remove"
                      onClick={() => removeFromCart(item.id)}
                      whileHover={{ scale: 1.1 }}
                    >
                      ×
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>৳{cartTotal}</span>
              </div>
              <div className="summary-row">
                <span>Tax (5%):</span>
                <span>৳{(cartTotal * 0.05).toFixed(0)}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>৳{(cartTotal * 1.05).toFixed(0)}</span>
              </div>
            </div>
            
            <motion.button
              className="btn-checkout"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Process Payment
            </motion.button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}