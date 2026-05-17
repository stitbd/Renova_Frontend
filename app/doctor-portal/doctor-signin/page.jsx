// src/app/doctor-portal/dportal/page.jsx
import { siteConfig } from "@/constants/siteData";
import DoctorPortalForm from "./DoctorPortalForm";

export const metadata = {
  title: `Doctor Portal | ${siteConfig.name}`,
  description: `Access your Doctor portal account at ${siteConfig.name} to view your medical records, appointments, and health information.`,
  openGraph: {
    title: `Doctor Portal | ${siteConfig.name}`,
    description: "Secure login to access your Doctor portal and health records.",
    url: `${siteConfig.url}/doctor-portal/doctor-signin`,
  },
  // Prevent search engines from indexing login pages
  robots: "noindex, nofollow",
};

export default function DoctorPortalPage() {
  return <DoctorPortalForm />;
}