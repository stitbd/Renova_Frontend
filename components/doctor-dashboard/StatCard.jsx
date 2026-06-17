import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function StatCard({ icon: IconComponent, title, count, label, variant, linkText }) {
  return (
    <div className={`stat-card ${variant}`}>
      <div className="stat-card-header">
        <div className="stat-icon">
          <IconComponent size={22} />
        </div>
        <div className="stat-info">
          <h3 className="stat-title">{title}</h3>
          <p className="stat-count">{count}</p>
          {label && <p className="stat-label">{label}</p>}
        </div>
      </div>
      <Link href="#" className="stat-link">
        {linkText}
        <ArrowRight size={13} />
      </Link>
    </div>
  );
}