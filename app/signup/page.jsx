import Link from "next/link";
import { siteConfig } from "@/constants/siteData";
import "@/styles/pages/signup-signin.css";
import { User, Stethoscope, Building2, Shield } from "lucide-react";

export const metadata = {
  title: `Sign Up | ${siteConfig.name}`,
  description: `Choose your panel to create an account.`,
};

export default function SignUpSelectionPage() {
  return (
    <section className="page-section page-section--slate">
      <div className="panel-grid">

        <Link href="/patient-portal/patient-signup" className="panel-card">
          <div className="panel-card__icon">
            <User size={28} />
          </div>
          <h3 className="panel-card__title">Patient Panel</h3>
          <p className="panel-card__desc">Create a patient account to manage health records.</p>
          <span className="btn btn-primary panel-card__btn">Sign Up</span>
        </Link>

        <Link href="/doctor-portal/doctor-signup" className="panel-card">
          <div className="panel-card__icon panel-card__icon--accent">
            <Stethoscope size={28} />
          </div>
          <h3 className="panel-card__title">Doctor Panel</h3>
          <p className="panel-card__desc">Register as a doctor to manage patients and schedules.</p>
          <span className="btn btn-secondary panel-card__btn">Sign Up</span>
        </Link>

        <Link href="/outlet-portal/outlet-signup" className="panel-card">
          <div className="panel-card__icon">
            <Building2 size={28} />
          </div>
          <h3 className="panel-card__title">Outlet Panel</h3>
          <p className="panel-card__desc">Register your outlet to manage orders and inventory.</p>
          <span className="btn btn-primary panel-card__btn">Sign Up</span>
        </Link>

        <Link href="/supar-admin-panel/supar-admin-signup" className="panel-card">
          <div className="panel-card__icon">
            <Shield size={28} />
          </div>
          <h3 className="panel-card__title">Super Admin Panel</h3>
          <p className="panel-card__desc">Create a super admin account for the platform.</p>
          <span className="btn btn-primary panel-card__btn">Sign Up</span>
        </Link>

      </div>
    </section>
  );
}