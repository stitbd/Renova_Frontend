// components/supar-admin-dashboard/StatsGrid.jsx
import Link from "next/link";

export default function StatsGrid({ stats }) {
  // ✅ Icons object defined INSIDE component (proper scope)
  const icons = {
    patients: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    ),
    doctors: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    outlets: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    revenue: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    approvals: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  };

  // ✅ statCards array with Outlet-style structure
  const statCards = [
    {
      icon: "patients",
      title: "Total Patients",
      count: stats.totalPatients.count,
      label: stats.totalPatients.change ? `${stats.totalPatients.change} vs yesterday` : null,
      variant: "primary",
      linkText: "View Details",
    },
    {
      icon: "doctors",
      title: "Total Doctors",
      count: stats.totalDoctors.count,
      label: stats.totalDoctors.change ? `${stats.totalDoctors.change} vs yesterday` : null,
      variant: "secondary",
      linkText: "View Details",
    },
    {
      icon: "outlets",
      title: "Active Outlets",
      count: stats.activeOutlets.count,
      label: stats.activeOutlets.change ? `${stats.activeOutlets.change} vs yesterday` : null,
      variant: "tertiary",
      linkText: "View Details",
    },
    {
      icon: "revenue",
      title: "Today's Revenue",
      count: `${stats.todaysRevenue.currency} ${stats.todaysRevenue.count}`,
      label: stats.todaysRevenue.change ? `${stats.todaysRevenue.change} vs yesterday` : null,
      variant: "quaternary",
      linkText: "View Details",
    },
    {
      icon: "approvals",
      title: "Pending Approvals",
      count: stats.pendingApprovals.count,
      label: null, // No change label for approvals
      variant: "quinary",
      linkText: "View all",
    },
  ];

  return (
    <div className="stats-grid">
      {statCards.map((stat, index) => (
        <div key={index} className={`stat-card ${stat.variant}`}>
          
          {/* Header section */}
          <div className="stat-card-header">
            
            {/* Icon section */}
            <div className="stat-icon">
              {icons[stat.icon]}
            </div>
            
            {/* Info section */}
            <div className="stat-info">
              <h3 className="stat-title">{stat.title}</h3>
              <p className="stat-count">{stat.count}</p>
              {stat.label && <p className="stat-label">{stat.label}</p>}
            </div>
          </div>
          
          {/* Link section using Next.js Link */}
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