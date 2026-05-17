import AuthScreen from "./AuthScreen";
import { Suspense } from "react";

export const metadata = {
  title: "Authentication | Renova Life Care",
  description: "Sign in or create an account for Renova Life Care portal.",
};

export default function AuthPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <AuthScreen />
    </Suspense>
  );
}
