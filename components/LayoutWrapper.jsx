"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import MobileBottomNav from "@/components/common/MobileBottomNav";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Hide header and footer on all portal routes
  const isDashboardRoute =
    pathname.startsWith("/doctor-portal") ||
    pathname.startsWith("/patient-portal") ||
    pathname.startsWith("/outlet-portal");

  return (
    <>
      {!isDashboardRoute && <Navbar />}
      <main id="main-content">{children}</main>
      {!isDashboardRoute && <MobileBottomNav />}
      {!isDashboardRoute && <Footer />}
    </>
  );
}
