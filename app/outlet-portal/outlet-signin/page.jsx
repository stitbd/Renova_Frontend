// src/app/outlet-portal/outlet-signin/page.jsx
import { siteConfig } from "@/constants/siteData";
import OutletPortalForm from "./OutletPortalForm";

export const metadata = {
  title: `Outlet Portal | ${siteConfig.name}`,
  description: `Access your outlet portal account at ${siteConfig.name} to view your medical records, appointments, and health information.`,
  openGraph: {
    title: `Outlet Portal | ${siteConfig.name}`,
    description: "Secure login to access your Outlet portal and health records.",
    url: `${siteConfig.url}/outlet-portal/outlet-signin`,
  },
  // Prevent search engines from indexing login pages
  robots: "noindex, nofollow",
};

export default function OutletPortalPage() {
  return <OutletPortalForm />;
}