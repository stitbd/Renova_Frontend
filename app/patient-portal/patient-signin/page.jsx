// src/app/PatientPortal/pportal/page.jsx
import { siteConfig } from "@/constants/siteData";
import PatientPortalForm from "./PatientPortalForm";

export const metadata = {
  title: `Patient Portal | ${siteConfig.name}`,
  description: `Access your patient portal account at ${siteConfig.name} to view your medical records, appointments, and health information.`,
  openGraph: {
    title: `Patient Portal | ${siteConfig.name}`,
    description: "Secure login to access your patient portal and health records.",
    url: `${siteConfig.url}/patient-portal/patient-signin`,
  },
  // Prevent search engines from indexing login pages
  robots: "noindex, nofollow",
};

export default function PatientPortalPage() {
  return <PatientPortalForm />;
}