import Link from "next/link";
import { siteConfig } from "@/constants/siteData";
import "@/styles/pages/signup-signin.css";
import { User, Stethoscope, Building2, Shield } from "lucide-react";

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
            <User size={28} />
          </div>
          <h3 className="panel-card__title">Patient Panel</h3>
          <p className="panel-card__desc">Access your health records and appointments.</p>
          <span className="btn btn-primary panel-card__btn">Sign In</span>
        </Link>

        <Link href="/doctor-portal/doctor-signin" className="panel-card">
          <div className="panel-card__icon panel-card__icon--accent">
            <Stethoscope size={28} />
          </div>
          <h3 className="panel-card__title">Doctor Panel</h3>
          <p className="panel-card__desc">Manage your patients, schedules, and reports.</p>
          <span className="btn btn-secondary panel-card__btn">Sign In</span>
        </Link>

        <Link href="/outlet-portal/outlet-signin" className="panel-card">
          <div className="panel-card__icon">
            <Building2 size={28} />
          </div>
          <h3 className="panel-card__title">Outlet Panel</h3>
          <p className="panel-card__desc">Manage outlet orders, inventory, and reports.</p>
          <span className="btn btn-primary panel-card__btn">Sign In</span>
        </Link>

        <Link href="/supar-admin-panel/supar-admin-signin" className="panel-card">
          <div className="panel-card__icon">
            <Shield size={28} />
          </div>
          <h3 className="panel-card__title">Super Admin Panel</h3>
          <p className="panel-card__desc">Manage the entire platform and settings.</p>
          <span className="btn btn-primary panel-card__btn">Sign In</span>
        </Link>

      </div>
    </section>
  );
}