// app/outlet-portal/layout.jsx
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/outlet-dashboard/Sidebar";
import Header from "@/components/outlet-dashboard/Header";
import "@/styles/pages/outlet-dashboard.css";

export default function OutletLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="outlet-dashboard-container">
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="outlet-main-content">
        <Header onMenuToggle={() => setSidebarOpen((v) => !v)} />
        <div className="outlet-dashboard-content">{children}</div>
      </main>
    </div>
  );
}