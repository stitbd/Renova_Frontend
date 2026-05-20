// components/outlet/StatsGrid.jsx
export default function StatsGrid({ stats }) {
    const statCards = [
      {
        icon: "patients",
        title: "Today's Patients",
        count: stats.patients.count,
        change: stats.patients.change,
        trend: stats.patients.trend,
        link: "View Details",
        color: "blue",
      },
      {
        icon: "appointments",
        title: "Today's Appointments",
        count: stats.appointments.count,
        change: stats.appointments.change,
        trend: stats.appointments.trend,
        link: "View Details",
        color: "green",
      },
      {
        icon: "consultations",
        title: "Consultations Today",
        count: stats.consultations.count,
        change: stats.consultations.change,
        trend: stats.consultations.trend,
        link: "View Details",
        color: "purple",
      },
      {
        icon: "sales",
        title: "Today's Sales",
        count: `${stats.sales.currency} ${stats.sales.count}`,
        change: stats.sales.change,
        trend: stats.sales.trend,
        link: "View Details",
        color: "orange",
      },
      {
        icon: "earnings",
        title: "Today's Earnings",
        count: `${stats.earnings.currency} ${stats.earnings.count}`,
        change: stats.earnings.change,
        trend: stats.earnings.trend,
        link: "View Details",
        color: "cyan",
      },
    ];
  
    const renderIcon = (iconName) => {
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
      return icons[iconName] || null;
    };
  
    return (
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-header">
              <div className="stat-icon-wrapper">
                {renderIcon(stat.icon)}
              </div>
              <div className="stat-content">
                <h3 className="stat-title">{stat.title}</h3>
                <p className="stat-count">{stat.count}</p>
                <p className={`stat-change ${stat.trend}`}>
                  {stat.change} vs yesterday
                </p>
              </div>
            </div>
            <a href="#" className="stat-link">
              {stat.link}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    );
  }