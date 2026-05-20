// components/doctor-dashboard/EarningsOverview.jsx
export default function EarningsOverview({ data }) {
  const maxValue = Math.max(...data.chartData.map((d) => d.value));

  return (
    <div>
      {/* Header row: title + period selector */}
      <div className="section-header-dashboard">
        <h2 className="section-title">Earnings Overview</h2>
        <select className="earnings-period">
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      {/* Amount + growth */}
      <div className="earnings-header">
        <div className="earnings-total">
          <h3 className="earnings-amount">৳ {data.total}</h3>
          <p className="earnings-label">Total Earnings</p>
        </div>
        <div className="earnings-growth">
          <span className="earnings-percentage">{data.growth}</span>
          <span style={{ fontSize: '10.5px', color: '#718096' }}>vs last week</span>
        </div>
      </div>

      {/* Bar chart */}
      <div className="earnings-chart">
        {data.chartData.map((day, index) => {
          const heightPct = Math.round((day.value / maxValue) * 100);
          const isActive = day.day === 'Thu';
          return (
            <div key={index} className="chart-bar">
              <div
                className={`chart-bar-fill${isActive ? ' active' : ''}`}
                style={{ height: `${heightPct}%` }}
              />
              <span className="chart-bar-label">{day.day}</span>
            </div>
          );
        })}
      </div>

      <button className="view-full-report">View Full Report</button>
    </div>
  );
}