// app/patient/logout/page.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./patient-logout.css";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear auth tokens/session
    localStorage.removeItem("patientToken");
    sessionStorage.clear();

    // Redirect to login after short delay
    const timer = setTimeout(() => {
      router.push("/patient-portal/patient-signin");
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="logout-container">
      <div className="logout-card">
        <div className="logout-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </div>
        <h2>Logging Out...</h2>
        <p>You have been securely signed out. Redirecting to login page.</p>
        <div className="logout-spinner" />
      </div>
    </div>
  );
}
