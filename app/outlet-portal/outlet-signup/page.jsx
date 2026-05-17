import { siteConfig } from "@/constants/siteData";
import OutletSignUpForm from "./OutletSignUpForm";

export const metadata = {
  title: `Outlet Sign Up | ${siteConfig.name}`,
  description: `Register your pharmacy, clinic, or diagnostic center with ${siteConfig.name} to connect with patients and grow your healthcare business.`,
  openGraph: {
    title: `Outlet Sign Up | ${siteConfig.name}`,
    description: "Join our network of verified healthcare outlets and expand your reach.",
    url: `${siteConfig.url}/outlet-signup`,
  },
  robots: "noindex, nofollow",
};

export default function OutletSignUpPage() {
  return (
    <main className="os-standalone">
      <OutletSignUpForm />
    </main>
  );
}