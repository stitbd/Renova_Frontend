export const dynamic = "force-static";

export const metadata = {
  robots: "noindex, nofollow",
};

export default function PatientSignUpLayout({ children }) {
  return (
    <main className="ps-standalone">
      {children}
    </main>
  );
}