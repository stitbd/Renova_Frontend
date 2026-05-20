// components/dashboard/EarningsOverview.jsx
export default function EarningsOverview({ data }) {
    const maxValue = Math.max(...data.chartData.map(d => d.value));
    
    return (
      <div>
        <div className="earnings-header">
          <div className="earnings-total">
            <h2 className="earnings-amount">৳ {data.total}</h2>
            <p className="earnings-label">Total Earnings</p>
          </div>
          <div className="earnings-growth">
            <span className="earnings-period">{data.period}</span>
            <span className="earnings-percentage">{data.growth} vs last week</span>
          </div>
        </div>
        <div className="earnings-chart">
          {data.chartData.map((day, index) => (
            <div key={index} className="chart-bar">
              <div 
                className={`chart-bar-fill ${day.day === 'Thu' ? 'active' : ''}`}
                style={{ height: `${(day.value / maxValue) * 100}%` }}
              />
              <span className="chart-bar-label">{day.day}</span>
            </div>
          ))}
        </div>
        <button className="view-full-report">View Full Report</button>
      </div>
    );
  }