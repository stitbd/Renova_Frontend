// components/outlet/OutletPerformance.jsx
import { Users, Stethoscope, ShoppingCart, DollarSign, ArrowRight, TrendingUp } from "lucide-react";

export default function OutletPerformance({ data }) {
  const performanceMetrics = [
    {
      icon: Users,
      label: "Total Patients",
      count: data.totalPatients.count,
      change: data.totalPatients.change,
    },
    {
      icon: Stethoscope,
      label: "Total Consultations",
      count: data.totalConsultations.count,
      change: data.totalConsultations.change,
    },
    {
      icon: ShoppingCart,
      label: "Total Sales",
      count: `${data.totalSales.currency} ${data.totalSales.count}`,
      change: data.totalSales.change,
    },
    {
      icon: DollarSign,
      label: "Total Earnings",
      count: `${data.totalEarnings.currency} ${data.totalEarnings.count}`,
      change: data.totalEarnings.change,
    },
  ];

  // Calculate donut chart segments
  let cumulativePercent = 0;
  const segments = data.salesByCategory.map((category) => {
    const startPercent = cumulativePercent;
    cumulativePercent += category.value;
    return {
      ...category,
      startPercent,
      endPercent: cumulativePercent,
    };
  });

  return (
    <div className="performance-card">
      <div className="card-header">
        <h3 className="card-title">Outlet Performance</h3>
        <select className="period-select">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Quarter</option>
        </select>
      </div>
      <div className="performance-content">
        <div className="performance-metrics">
          {performanceMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div key={index} className="metric-item">
                <div className="metric-icon"><IconComponent size={16} /></div>
                <div className="metric-info">
                  <span className="metric-label">{metric.label}</span>
                  <div className="metric-values">
                    <span className="metric-count">{metric.count}</span>
                    <span className="metric-change positive">{metric.change}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="donut-chart-wrapper">
          <div className="donut-chart">
            <svg viewBox="0 0 100 100">
              {segments.map((segment, index) => {
                const startAngle = (segment.startPercent / 100) * 360;
                const endAngle = (segment.endPercent / 100) * 360;
                const x1 = 50 + 40 * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 50 + 40 * Math.sin((Math.PI * startAngle) / 180);
                const x2 = 50 + 40 * Math.cos((Math.PI * endAngle) / 180);
                const y2 = 50 + 40 * Math.sin((Math.PI * endAngle) / 180);
                const largeArc = segment.value > 50 ? 1 : 0;

                return (
                  <path
                    key={index}
                    d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={segment.color}
                  />
                );
              })}
              <circle cx="50" cy="50" r="25" fill="white" />
            </svg>
            <div className="donut-center">
              <span>Sales by Category</span>
            </div>
          </div>
          <div className="chart-legend-vertical">
            {data.salesByCategory.map((category, index) => (
              <div key={index} className="legend-item-vertical">
                <span className="legend-dot" style={{ backgroundColor: category.color }} />
                <span className="legend-label">{category.name}</span>
                <span className="legend-value">{category.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <a href="#" className="view-full-report-link">
        View Full Report
        <ArrowRight size={14} />
      </a>
    </div>
  );
}