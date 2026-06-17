// app/doctor-portal/calendar/page.jsx
"use client";

import { useState } from "react";
import "./calendar.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="dashboard-content">
      <div className="calendar-container">
        <div className="calendar-header">
          <button className="nav-btn"><ChevronLeft size={16} /> Previous</button>
          <h2>May 2025</h2>
          <button className="nav-btn">Next <ChevronRight size={16} /></button>
        </div>
        <div className="calendar-grid">
          {/* Calendar days */}
        </div>
      </div>
    </div>
  );
}