// src/app/supar-admin-panel/supar-admin-signin/layout.jsx
export const dynamic = "force-static";

// Opt-out of root layout (Next.js 14+)
export const metadata = {
  robots: "noindex, nofollow",
};

export default function SuperAdminPortalLayout({ children }) {
  return (
    <main className="patient-portal-standalone">
      {children}
    </main>
  );
}