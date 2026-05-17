// src/app/OutletPortal/oportal/layout.jsx
export const dynamic = "force-static";

// Opt-out of root layout (Next.js 14+)
export const metadata = {
  robots: "noindex, nofollow",
};

export default function OutletPortalLayout({ children }) {
  return (
    <main className="outlet-portal-standalone">
      {children}
    </main>
  );
}