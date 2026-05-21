// app/patient/health-summary/page.jsx
"use client";

const healthData = {
  score: 85,
  status: "Good",
  vitals: [
    { label: "Blood Pressure", value: "120/80", unit: "mmHg", status: "normal" },
    { label: "Heart Rate", value: "72", unit: "bpm", status: "normal" },
    { label: "Blood Sugar", value: "95", unit: "mg/dL", status: "normal" },
    { label: "BMI", value: "22.5", unit: "", status: "normal" },
    { label: "Oxygen Level", value: "98", unit: "%", status: "normal" },
    { label: "Cholesterol", value: "180", unit: "mg/dL", status: "borderline" },
  ],
  trends: [
    { label: "Weight", data: [70, 69.5, 69, 68.5, 68], unit: "kg" },
    { label: "Blood Pressure (Systolic)", data: [125, 122, 120, 118, 120], unit: "mmHg" },
  ],
  recommendations: [
    "Continue regular exercise routine",
    "Maintain healthy diet with reduced sodium",
    "Schedule next checkup in 3 months",
  ],
};

export default function HealthSummaryPage() {
  return (
    <div className="health-summary">
      {/* Health Score Card */}
      <div className="health-score-card">
        <div className="score-circle">
          <svg className="circular-chart" viewBox="0 0 100 100">
            <circle className="circle-bg" cx="50" cy="50" r="45" />
            <circle className="circle" cx="50" cy="50" r="45" strokeDasharray={`${healthData.score}, 100`} />
          </svg>
          <span className="score-value">{healthData.score}</span>
        </div>
        <div className="score-info">
          <h3>Health Score</h3>
          <p className="score-status">{healthData.status}</p>
          <p className="score-description">Based on your recent checkups and vitals</p>
        </div>
      </div>

      {/* Vitals Grid */}
      <div className="vitals-grid">
        {healthData.vitals.map((vital, idx) => (
          <div key={idx} className="vital-card">
            <span className="vital-label">{vital.label}</span>
            <span className="vital-value">
              {vital.value}
              {vital.unit && <span className="vital-unit">{vital.unit}</span>}
            </span>
            <span className={`vital-status status-${vital.status}`}>{vital.status}</span>
          </div>
        ))}
      </div>

      {/* Trends Charts */}
      <div className="trends-section">
        <h3>Health Trends</h3>
        <div className="trends-grid">
          {healthData.trends.map((trend, idx) => (
            <div key={idx} className="trend-card">
              <h4>{trend.label}</h4>
              <div className="trend-chart">
                {/* Simple bar chart visualization */}
                <div className="chart-bars">
                  {trend.data.map((val, i) => (
                    <div key={i} className="chart-bar" style={{ height: `${(val / Math.max(...trend.data)) * 100}%` }}>
                      <span className="bar-value">{val}</span>
                    </div>
                  ))}
                </div>
                <span className="chart-unit">{trend.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="recommendations-card">
        <h3>Personalized Recommendations</h3>
        <ul className="recommendations-list">
          {healthData.recommendations.map((rec, idx) => (
            <li key={idx} className="recommendation-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {rec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}