"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import MobileBottomNav from "@/components/common/MobileBottomNav";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Hide header and footer on dashboard routes
  const isDashboardRoute =
    pathname.includes("/doctor-portal/dashboard") ||
    pathname.includes("/patient-portal/dashboard") ||
    pathname.includes("/outlet-portal/dashboard");

  return (
    <>
      {!isDashboardRoute && <Navbar />}
      <main id="main-content">{children}</main>
      {!isDashboardRoute && <MobileBottomNav />}
      {!isDashboardRoute && <Footer />}
    </>
  );
}
