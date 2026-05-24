// src/app/supar-admin-panel/supar-admin-signin/page.jsx
import { siteConfig } from "@/constants/siteData";
import SuperAdminPortalForm from "./SuperAdminPortalForm";

export const metadata = {
  title: `Super Admin Portal | ${siteConfig.name}`,
  description: `Access your Super Admin portal account at ${siteConfig.name} to view your medical records, appointments, and health information.`,
  openGraph: {
    title: `Super Admin Portal | ${siteConfig.name}`,
    description: "Secure login to access your Super Admin portal and health records.",
    url: `${siteConfig.url}/supar-admin-panel/supar-admin-signin`,
  },
  // Prevent search engines from indexing login pages
  robots: "noindex, nofollow",
};

export default function SuperAdminPortalPage() {
  return <SuperAdminPortalForm />;
}