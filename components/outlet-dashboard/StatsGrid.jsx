// components/outlet/StatsGrid.jsx
import Link from "next/link";
import { Users, Calendar, Stethoscope, ShoppingCart, DollarSign, ArrowRight } from "lucide-react";

export default function StatsGrid({ stats }) {
  const icons = {
    patients: Users,
    appointments: Calendar,
    consultations: Stethoscope,
    sales: ShoppingCart,
    earnings: DollarSign,
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
      {statCards.map((stat, index) => {
        const IconComponent = icons[stat.icon];
        return (
          <div key={index} className={`stat-card ${stat.variant}`}>
            <div className="stat-card-header">
              <div className="stat-icon">
                <IconComponent size={22} />
              </div>
              <div className="stat-info">
                <h3 className="stat-title">{stat.title}</h3>
                <p className="stat-count">{stat.count}</p>
                {stat.label && <p className="stat-label">{stat.label}</p>}
              </div>
            </div>
            <Link href="#" className="stat-link">
              {stat.linkText}
              <ArrowRight size={13} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}