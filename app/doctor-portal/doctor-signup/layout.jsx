export const dynamic = "force-static";

export const metadata = {
  robots: "noindex, nofollow",
};

export default function DoctorSignUpLayout({ children }) {
  return (
    <main className="doctor-signup-standalone">
      {children}
    </main>
  );
}