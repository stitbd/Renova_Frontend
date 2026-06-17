// app/patient/logout/page.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./patient-logout.css";
import { LogOut } from "lucide-react";

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
          <LogOut size={32} />
        </div>
        <h2>Logging Out...</h2>
        <p>You have been securely signed out. Redirecting to login page.</p>
        <div className="logout-spinner" />
      </div>
    </div>
  );
}