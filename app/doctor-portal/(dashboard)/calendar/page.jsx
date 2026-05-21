// app/doctor-portal/calendar/page.jsx
"use client";

import { useState } from "react";
import "@/styles/pages/doctor-dashboard.css";

export default function CalendarPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

    return (
    <div className="dashboard-content">
          <div className="calendar-container">
            <div className="calendar-header">
              <button className="nav-btn">Previous</button>
              <h2>May 2025</h2>
              <button className="nav-btn">Next</button>
            </div>
            <div className="calendar-grid">
              {/* Calendar days */}
            </div>
          </div>
        </div>
  );
}


