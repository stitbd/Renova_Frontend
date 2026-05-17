import { siteConfig } from "@/constants/siteData";
import OutletSignUpForm from "./OutletSignUpForm";
import "./outlet-signup.css";

export const metadata = {
  title: `SignUp Up | ${siteConfig.name}`,
  description: `Get in touch with ${siteConfig.name} — book an appointment, ask a question, or reach our emergency line. We are available 24/7.`,
  openGraph: {
    title: `SignUp Up | ${siteConfig.name}`,
    description: `Reach ${siteConfig.name} for appointments, inquiries, and emergency care.`,
    url: `${siteConfig.url}/outlet-signup`,
  },
};

export default function OutletSignUpPage() {
  return (
    <>
      {/* Client-side interactive form + info */}
      <OutletSignUpForm />
    </>
  );
}

