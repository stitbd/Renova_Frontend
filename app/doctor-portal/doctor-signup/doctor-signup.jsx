import { siteConfig } from "@/constants/siteData";
import DoctorSignUpForm from "./DoctorSignUpForm";
import "./doctor-signup.css";

export const metadata = {
  title: `Sign Up | ${siteConfig.name}`,
  description: `Get in touch with ${siteConfig.name} — book an appointment, ask a question, or reach our emergency line. We are available 24/7.`,
  openGraph: {
    title: `Sign Up | ${siteConfig.name}`,
    description: `Reach ${siteConfig.name} for appointments, inquiries, and emergency care.`,
    url: `${siteConfig.url}/doctor-signup`,
  },
};

export default function DoctorSignPage() {
  return (
    <>
      {/* Client-side interactive form + info */}
      <DoctorSignUpForm />
    </>
  );
}

