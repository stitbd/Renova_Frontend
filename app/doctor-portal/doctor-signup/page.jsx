import { siteConfig } from "@/constants/siteData";
import DoctorSignUpForm from "./DoctorSignUpForm";

export const metadata = {
  title: `Doctor Sign Up | ${siteConfig.name}`,
  description: `Register as a doctor with ${siteConfig.name} to provide telemedicine consultations and manage your practice online.`,
  openGraph: {
    title: `Doctor Sign Up | ${siteConfig.name}`,
    description: "Join our network of verified healthcare professionals.",
    url: `${siteConfig.url}/doctor-signup`,
  },
  robots: "noindex, nofollow",
};

export default function DoctorSignUpPage() {
  return (
    <main className="doctor-signup-standalone">
      <DoctorSignUpForm />
    </main>
  );
}