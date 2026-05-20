// components/outlet/OutletPerformance.jsx
export default function OutletPerformance({ data }) {
    const performanceMetrics = [
      {
        icon: "patients",
        label: "Total Patients",
        count: data.totalPatients.count,
        change: data.totalPatients.change,
      },
      {
        icon: "consultations",
        label: "Total Consultations",
        count: data.totalConsultations.count,
        change: data.totalConsultations.change,
      },
      {
        icon: "sales",
        label: "Total Sales",
        count: `${data.totalSales.currency} ${data.totalSales.count}`,
        change: data.totalSales.change,
      },
      {
        icon: "earnings",
        label: "Total Earnings",
        count: `${data.totalEarnings.currency} ${data.totalEarnings.count}`,
        change: data.totalEarnings.change,
      },
    ];
  
    const renderIcon = (iconName) => {
      const icons = {
        patients: (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
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
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="metric-item">
                <div className="metric-icon">{renderIcon(metric.icon)}</div>
                <div className="metric-info">
                  <span className="metric-label">{metric.label}</span>
                  <div className="metric-values">
                    <span className="metric-count">{metric.count}</span>
                    <span className="metric-change positive">{metric.change}</span>
                  </div>
                </div>
              </div>
            ))}
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>
      </div>
    );
  }