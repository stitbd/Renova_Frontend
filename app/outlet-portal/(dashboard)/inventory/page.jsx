// app/outlet/inventory/page.jsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function InventoryPage() {
  const [filter, setFilter] = useState("all");

  const inventory = [
    { id: "INV-001", name: "Organic Spirulina 500mg", category: "Supplements", stock: 45, minStock: 20, price: 450, status: "In Stock" },
    { id: "INV-002", name: "Vitamin D3 1000IU", category: "Supplements", stock: 32, minStock: 25, price: 320, status: "In Stock" },
    { id: "INV-003", name: "Digital Thermometer", category: "Devices", stock: 8, minStock: 15, price: 850, status: "Low Stock" },
    { id: "INV-004", name: "Face Mask (Pack of 50)", category: "Personal Care", stock: 89, minStock: 50, price: 280, status: "In Stock" },
    { id: "INV-005", name: "Hand Sanitizer 500ml", category: "Personal Care", stock: 156, minStock: 100, price: 180, status: "In Stock" },
    { id: "INV-006", name: "Blood Pressure Monitor", category: "Devices", stock: 3, minStock: 10, price: 2450, status: "Critical" },
  ];

  const filteredInventory = inventory.filter(item => {
    if (filter === "all") return true;
    if (filter === "low") return item.status === "Low Stock" || item.status === "Critical";
    return item.category.toLowerCase() === filter;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <motion.div className="page-header">
        <h1 className="page-title">Inventory Management</h1>
        <motion.button className="btn btn-primary" whileHover={{ scale: 1.02 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Product
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div className="filters-bar">
        <div className="filter-tabs">
          {[
            { key: "all", label: "All Items" },
            { key: "low", label: "Low Stock" },
            { key: "supplements", label: "Supplements" },
            { key: "devices", label: "Devices" },
            { key: "personal care", label: "Personal Care" }
          ].map(f => (
            <motion.button
              key={f.key}
              className={`filter-tab ${filter === f.key ? "active" : ""}`}
              onClick={() => setFilter(f.key)}
              whileHover={{ scale: 1.05 }}
            >
              {f.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Inventory Table */}
      <motion.div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Min Stock</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item, i) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ backgroundColor: "#f8fafc" }}
              >
                <td className="product-name">{item.name}</td>
                <td>{item.category}</td>
                <td>
                  <div className="stock-bar">
                    <span className="stock-value">{item.stock}</span>
                    <div className="stock-progress" style={{ width: `${Math.min(100, (item.stock / item.minStock) * 100)}%`, backgroundColor: item.stock < item.minStock ? "#ef4444" : "#22c55e" }} />
                  </div>
                </td>
                <td>{item.minStock}</td>
                <td>৳{item.price}</td>
                <td><span className={`status-badge ${item.status.toLowerCase().replace(" ", "-")}`}>{item.status}</span></td>
                <td>
                  <div className="table-actions">
                    <motion.button className="btn-icon edit" whileHover={{ scale: 1.1 }}>Edit</motion.button>
                    <motion.button className="btn-icon restock" whileHover={{ scale: 1.1 }}>Restock</motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Summary Cards */}
      <motion.div className="inventory-summary">
        {[
          { label: "Total Products", value: inventory.length, color: "#014fa1" },
          { label: "Low Stock Items", value: inventory.filter(i => i.status === "Low Stock" || i.status === "Critical").length, color: "#f59e0b" },
          { label: "Total Value", value: `৳${inventory.reduce((sum, i) => sum + i.price * i.stock, 0).toLocaleString()}`, color: "#428a26" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="summary-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            style={{ borderLeftColor: stat.color }}
          >
            <span className="summary-label">{stat.label}</span>
            <span className="summary-value">{stat.value}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}