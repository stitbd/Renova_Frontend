// src/app/doctor-portal/dportal/layout.jsx
export const dynamic = "force-static";

// Opt-out of root layout (Next.js 14+)
export const metadata = {
  robots: "noindex, nofollow",
};

export default function DoctorPortalLayout({ children }) {
  return (
    <main className="doctor-portal-standalone">
      {children}
    </main>
  );
}