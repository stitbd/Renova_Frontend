// components/dashboard/StatCard.jsx
import Link from "next/link";

export default function StatCard({ icon, title, count, label, variant, linkText }) {
  const variants = {
    primary: { bg: "bg-blue-50", border: "border-blue-100", icon: "text-blue-600" },
    secondary: { bg: "bg-green-50", border: "border-green-100", icon: "text-green-600" },
    tertiary: { bg: "bg-purple-50", border: "border-purple-100", icon: "text-purple-600" },
    quaternary: { bg: "bg-orange-50", border: "border-orange-100", icon: "text-orange-600" },
    quinary: { bg: "bg-cyan-50", border: "border-cyan-100", icon: "text-cyan-600" },
  };

  const currentVariant = variants[variant] || variants.primary;

  const icons = {
    patients: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    calendar: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    consultation: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    prescription: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
      </svg>
    ),
    earnings: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  };

  return (
    <div className={`stat-card ${currentVariant.bg} ${currentVariant.border}`}>
      <div className="stat-card-header">
        <div className={`stat-icon ${currentVariant.icon}`}>
          {icons[icon]}
        </div>
        <div className="stat-info">
          <h3 className="stat-title">{title}</h3>
          <p className="stat-count">{count}</p>
          {label && <p className="stat-label">{label}</p>}
        </div>
      </div>
      <Link href="#" className="stat-link">
        {linkText}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </Link>
    </div>
  );
}