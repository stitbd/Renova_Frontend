// components/admin/RevenueOverview.jsx
export default function RevenueOverview({ data }) {
    const maxValue = Math.max(...data.chartData.map((d) => d.value));
  
    return (
      <div className="revenue-card">
        <div className="card-header">
          <div className="card-title-wrapper">
            <div className="title-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h3 className="card-title">Revenue Overview</h3>
          </div>
          <div className="card-actions">
            <select className="period-select">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>
        </div>
  
        <div className="revenue-summary">
          <div className="revenue-total">
            <span className="total-amount">৳ {data.total}</span>
            <span className="total-label">Total Revenue</span>
          </div>
          <div className="revenue-growth">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            <span className="growth-value">{data.growth}</span>
            <span className="growth-label">Growth from last month</span>
          </div>
        </div>
  
        <div className="line-chart">
          <div className="chart-y-axis">
            {["50M", "40M", "30M", "20M", "10M", "0"].map((value) => (
              <span key={value} className="y-axis-label">
                {value}
              </span>
            ))}
          </div>
          <div className="chart-content">
            <svg className="line-svg" viewBox="0 0 700 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#014fa1" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#014fa1" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`M 0 ${200 - (data.chartData[0].value / maxValue) * 200} ` +
                  data.chartData
                    .map((point, index) => {
                      const x = (index / (data.chartData.length - 1)) * 700;
                      const y = 200 - (point.value / maxValue) * 200;
                      return `L ${x} ${y}`;
                    })
                    .join(" ")}
                fill="none"
                stroke="#014fa1"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={`M 0 ${200 - (data.chartData[0].value / maxValue) * 200} ` +
                  data.chartData
                    .map((point, index) => {
                      const x = (index / (data.chartData.length - 1)) * 700;
                      const y = 200 - (point.value / maxValue) * 200;
                      return `L ${x} ${y}`;
                    })
                    .join(" ") +
                  ` L 700 200 L 0 200 Z`}
                fill="url(#revenueGradient)"
              />
              {data.chartData.map((point, index) => {
                const x = (index / (data.chartData.length - 1)) * 700;
                const y = 200 - (point.value / maxValue) * 200;
                return (
                  <circle key={index} cx={x} cy={y} r="4" fill="#014fa1" />
                );
              })}
            </svg>
            <div className="chart-x-axis">
              {data.chartData.map((point, index) => (
                <span key={index} className="x-axis-label">
                  {point.date}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }