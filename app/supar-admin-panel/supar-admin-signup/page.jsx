// src/app/supar-admin-panel/supar-admin-signup/page.jsx
import { siteConfig } from "@/constants/siteData";
import SuperAdminSignUpForm from "./SuperAdminSignUpForm";

export const metadata = {
    title: `Super Admin Registration | ${siteConfig.name}`,
    description: `Create a Super Admin account to manage ${siteConfig.name}'s outlets, doctors, patients and platform settings.`,
    robots: "noindex, nofollow",
};

export default function SuperAdminSignUpPage() {
    return <SuperAdminSignUpForm />;
}