// components/outlet/PharmacySales.jsx
export default function PharmacySales({ data }) {
    const maxValue = Math.max(...data.chartData);
  
    return (
      <div className="pharmacy-card">
        <div className="card-header">
          <h3 className="card-title">Pharmacy Sales Overview</h3>
          <select className="period-select">
            <option>This Week</option>
            <option>Last Week</option>
            <option>This Month</option>
          </select>
        </div>
        <div className="sales-summary">
          <div className="summary-item">
            <span className="summary-label">Total Sales</span>
            <span className="summary-value">৳ {data.totalSales}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Orders</span>
            <span className="summary-value">{data.orders}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Avg. Order Value</span>
            <span className="summary-value">৳ {data.avgOrderValue}</span>
          </div>
        </div>
        <div className="line-chart">
          <div className="chart-y-axis">
            {['30K', '20K', '10K', '0'].map((value) => (
              <span key={value} className="y-axis-label">{value}</span>
            ))}
          </div>
          <div className="chart-content">
            <svg className="line-svg" viewBox="0 0 700 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#428a26" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#428a26" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`M 0 ${200 - (data.chartData[0] / maxValue) * 200} ` +
                  data.chartData.map((value, index) => {
                    const x = (index / (data.chartData.length - 1)) * 700;
                    const y = 200 - (value / maxValue) * 200;
                    return `L ${x} ${y}`;
                  }).join(' ')}
                fill="none"
                stroke="#428a26"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={`M 0 ${200 - (data.chartData[0] / maxValue) * 200} ` +
                  data.chartData.map((value, index) => {
                    const x = (index / (data.chartData.length - 1)) * 700;
                    const y = 200 - (value / maxValue) * 200;
                    return `L ${x} ${y}`;
                  }).join(' ') +
                  ` L 700 200 L 0 200 Z`}
                fill="url(#lineGradient)"
              />
            </svg>
            <div className="chart-x-axis">
              {data.days.map((day) => (
                <span key={day} className="x-axis-label">{day}</span>
              ))}
            </div>
          </div>
        </div>
        <a href="#" className="go-to-pos-link">
          Go to POS
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>
      </div>
    );
  }