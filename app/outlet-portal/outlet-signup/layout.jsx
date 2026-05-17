export const dynamic = "force-static";

export const metadata = {
  robots: "noindex, nofollow",
};

export default function OutletSignUpLayout({ children }) {
  return (
    <main className="os-standalone">
      {children}
    </main>
  );
}