// components/outlet/StatsGrid.jsx
import Link from "next/link";

export default function StatsGrid({ stats }) {
  const icons = {
    patients: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    appointments: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    consultations: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    sales: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    earnings: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  };

  const statCards = [
    {
      icon: "patients",
      title: "Today's Patients",
      count: stats.patients.count,
      label: `${stats.patients.change} vs yesterday`,
      variant: "primary",
      linkText: "View Details",
    },
    {
      icon: "appointments",
      title: "Today's Appointments",
      count: stats.appointments.count,
      label: `${stats.appointments.change} vs yesterday`,
      variant: "secondary",
      linkText: "View Details",
    },
    {
      icon: "consultations",
      title: "Consultations Today",
      count: stats.consultations.count,
      label: `${stats.consultations.change} vs yesterday`,
      variant: "tertiary",
      linkText: "View Details",
    },
    {
      icon: "sales",
      title: "Today's Sales",
      count: `${stats.sales.currency} ${stats.sales.count}`,
      label: `${stats.sales.change} vs yesterday`,
      variant: "quaternary",
      linkText: "View Details",
    },
    {
      icon: "earnings",
      title: "Today's Earnings",
      count: `${stats.earnings.currency} ${stats.earnings.count}`,
      label: `${stats.earnings.change} vs yesterday`,
      variant: "quinary",
      linkText: "View Details",
    },
  ];

  return (
    <div className="stats-grid">
      {statCards.map((stat, index) => (
        <div key={index} className={`stat-card ${stat.variant}`}>
          <div className="stat-card-header">
            <div className="stat-icon">
              {icons[stat.icon]}
            </div>
            <div className="stat-info">
              <h3 className="stat-title">{stat.title}</h3>
              <p className="stat-count">{stat.count}</p>
              {stat.label && <p className="stat-label">{stat.label}</p>}
            </div>
          </div>
          <Link href="#" className="stat-link">
            {stat.linkText}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      ))}
    </div>
  );
}