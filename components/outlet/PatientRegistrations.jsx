// components/outlet/PatientRegistrations.jsx
export default function PatientRegistrations({ data }) {
    const maxValue = Math.max(...data.thisWeek, ...data.lastWeek);
  
    return (
      <div className="chart-card">
        <div className="card-header">
          <h3 className="card-title">Patient Registrations</h3>
          <div className="card-actions">
            <div className="chart-legend">
              <span className="legend-item">
                <span className="legend-dot blue" />
                This Week
              </span>
              <span className="legend-item">
                <span className="legend-dot gray" />
                Last Week
              </span>
            </div>
            <a href="#" className="view-report-link">View Report</a>
          </div>
        </div>
        <div className="bar-chart">
          <div className="chart-y-axis">
            {[40, 30, 20, 10, 0].map((value) => (
              <span key={value} className="y-axis-label">{value}</span>
            ))}
          </div>
          <div className="chart-bars">
            {data.days.map((day, index) => (
              <div key={day} className="bar-group">
                <div className="bars">
                  <div 
                    className="bar this-week"
                    style={{ height: `${(data.thisWeek[index] / maxValue) * 100}%` }}
                  >
                    <span className="bar-value">{data.thisWeek[index]}</span>
                  </div>
                  <div 
                    className="bar last-week"
                    style={{ height: `${(data.lastWeek[index] / maxValue) * 100}%` }}
                  />
                </div>
                <span className="bar-label">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }