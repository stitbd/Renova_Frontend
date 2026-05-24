// components/admin/OutletPerformance.jsx
export default function OutletPerformance({ data }) {
    return (
      <div className="performance-card">
        <div className="card-header">
          <h3 className="card-title">Outlet Performance (Top 5)</h3>
          <a href="#" className="view-all-link">
            View All
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>
        <div className="performance-table">
          <div className="table-header">
            <span className="header-col">Outlet</span>
            <span className="header-col">Total Patients</span>
            <span className="header-col">Revenue (৳)</span>
            <span className="header-col">Growth</span>
          </div>
          {data.map((outlet, index) => (
            <div key={index} className="table-row">
              <span className="row-col outlet-name">{outlet.name}</span>
              <span className="row-col">{outlet.patients.toLocaleString()}</span>
              <span className="row-col">৳ {outlet.revenue}</span>
              <span className="row-col growth-positive">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
                {outlet.growth}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }