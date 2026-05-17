import Link from "next/link";
import { siteConfig } from "@/constants/siteData";
import "@/styles/components/HeroSection.css";
import "@/styles/pages/about.css";

export const metadata = {
  title: `Sign In | ${siteConfig.name}`,
  description: `Choose your panel to sign in.`,
};

export default function SignInSelectionPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero__container">
          <span className="page-hero__label">Welcome Back</span>
          <h1 className="page-hero__title">
            Sign In <span className="page-hero__highlight">Options</span>
          </h1>
          <p className="page-hero__subtitle">
            Please select your portal panel below to access your account.
          </p>
          <nav aria-label="Breadcrumb" className="page-hero__breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Sign In</span>
          </nav>
        </div>
      </section>

      {/* Selection Cards */}
      <section style={{ padding: '4rem 1rem', background: 'var(--bg-subtle)' }}>
        <style>{`
          .panel-card:hover {
            transform: translateY(-5px) !important;
            box-shadow: var(--shadow-lg) !important;
          }
        `}</style>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          
          <Link href="/patient-portal/patient-signin" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="panel-card" style={{ background: '#fff', borderRadius: '1rem', padding: '2.5rem 1.5rem', textAlign: 'center', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'pointer' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Patient Panel</h3>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Access your health records and appointments.</p>
              <span className="btn btn-primary" style={{ display: 'inline-flex', width: '100%', justifyContent: 'center' }}>Sign In</span>
            </div>
          </Link>

          <Link href="/doctor-portal/doctor-signin" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="panel-card" style={{ background: '#fff', borderRadius: '1rem', padding: '2.5rem 1.5rem', textAlign: 'center', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'pointer' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="9" width="18" height="11" rx="2" /><path d="M8 9V5a4 4 0 0 1 8 0v4" /><line x1="12" y1="13" x2="12" y2="17" /><line x1="10" y1="15" x2="14" y2="15" /></svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Doctor Panel</h3>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Manage your patients, schedules, and reports.</p>
              <span className="btn btn-secondary" style={{ display: 'inline-flex', width: '100%', justifyContent: 'center' }}>Sign In</span>
            </div>
          </Link>

          <Link href="/outlet-portal/outlet-signin" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="panel-card" style={{ background: '#fff', borderRadius: '1rem', padding: '2.5rem 1.5rem', textAlign: 'center', boxShadow: 'var(--shadow-md)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'pointer' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--success-light, #d1fae5)', color: 'var(--success, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Outlet Panel</h3>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Access your pharmacy or diagnostic center portal.</p>
              <span className="btn btn-primary" style={{ display: 'inline-flex', width: '100%', justifyContent: 'center', background: 'var(--success, #059669)', borderColor: 'var(--success, #059669)' }}>Sign In</span>
            </div>
          </Link>

        </div>
      </section>
    </>
  );
}
