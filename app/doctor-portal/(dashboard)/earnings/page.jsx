// app/doctor-portal/earnings/page.jsx
"use client";

import { useState } from "react";
import "./earnings.css";

export default function EarningsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [period, setPeriod] = useState("week");

  return (
    <div className="dashboard-content">
      <div className="earnings-summary">
        <div className="earnings-card-large">
          <span className="earnings-label">Total Earnings</span>
          <span className="earnings-amount-large">৳42,850</span>
          <span className="earnings-growth-large">+12.5% vs last week</span>
        </div>
        <div className="period-selector">
          <button className={`period-btn ${period === "week" ? "active" : ""}`} onClick={() => setPeriod("week")}>This Week</button>
          <button className={`period-btn ${period === "month" ? "active" : ""}`} onClick={() => setPeriod("month")}>This Month</button>
          <button className={`period-btn ${period === "year" ? "active" : ""}`} onClick={() => setPeriod("year")}>This Year</button>
        </div>
      </div>

      {/* Chart and detailed earnings table */}
    </div>
  );
}


