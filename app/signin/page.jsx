import Link from "next/link";
import { siteConfig } from "@/constants/siteData";
import "@/styles/pages/signup-signin.css";

export const metadata = {
  title: `Sign In | ${siteConfig.name}`,
  description: `Choose your panel to sign in.`,
};

export default function SignInSelectionPage() {
  return (
    <section className="page-section page-section--slate">
      <div className="panel-grid">

        <Link href="/patient-portal/patient-signin" className="panel-card">
          <div className="panel-card__icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          </div>
          <h3 className="panel-card__title">Patient Panel</h3>
          <p className="panel-card__desc">Access your health records and appointments.</p>
          <span className="btn btn-primary panel-card__btn">Sign In</span>
        </Link>

        <Link href="/doctor-portal/doctor-signin" className="panel-card">
          <div className="panel-card__icon panel-card__icon--accent">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="9" width="18" height="11" rx="2" /><path d="M8 9V5a4 4 0 0 1 8 0v4" /><line x1="12" y1="13" x2="12" y2="17" /><line x1="10" y1="15" x2="14" y2="15" /></svg>
          </div>
          <h3 className="panel-card__title">Doctor Panel</h3>
          <p className="panel-card__desc">Manage your patients, schedules, and reports.</p>
          <span className="btn btn-secondary panel-card__btn">Sign In</span>
        </Link>

        <Link href="/outlet-portal/outlet-signin" className="panel-card">
          <div className="panel-card__icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
          </div>
          <h3 className="panel-card__title">Outlet Panel</h3>
          <p className="panel-card__desc">Manage outlet orders, inventory, and reports.</p>
          <span className="btn btn-primary panel-card__btn">Sign In</span>
        </Link>

        <Link href="/supar-admin-panel/supar-admin-signin" className="panel-card">
          <div className="panel-card__icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
          </div>
          <h3 className="panel-card__title">Super Admin Panel</h3>
          <p className="panel-card__desc">Manage the entire platform and settings.</p>
          <span className="btn btn-primary panel-card__btn">Sign In</span>
        </Link>

      </div>
    </section>
  );
}