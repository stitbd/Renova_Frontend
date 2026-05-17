// src/app/PatientPortal/pportal/layout.jsx
export const dynamic = "force-static";

// Opt-out of root layout (Next.js 14+)
export const metadata = {
  robots: "noindex, nofollow",
};

export default function PatientPortalLayout({ children }) {
  return (
    <main className="patient-portal-standalone">
      {children}
    </main>
  );
}