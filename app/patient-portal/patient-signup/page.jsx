import { siteConfig } from "@/constants/siteData";
import PatientSignUpForm from "./PatientSignUpForm";

export const metadata = {
  title: `Patient Sign Up | ${siteConfig.name}`,
  description: `Register as a patient with ${siteConfig.name} to book appointments, access health records, and receive quality healthcare services.`,
  openGraph: {
    title: `Patient Sign Up | ${siteConfig.name}`,
    description: "Create your patient account and start your healthcare journey with us.",
    url: `${siteConfig.url}/patient-signup`,
  },
  robots: "noindex, nofollow",
};

export default function PatientSignUpPage() {
  return (
    <main className="ps-standalone">
      <PatientSignUpForm />
    </main>
  );
}