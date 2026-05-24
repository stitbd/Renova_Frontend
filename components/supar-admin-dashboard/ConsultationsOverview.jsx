// components/admin/ConsultationsOverview.jsx
export default function ConsultationsOverview({ data }) {
  const consultations = [
    { label: "Video Call", count: data.videoCall.count, percentage: data.videoCall.percentage, color: "#014fa1" },
    { label: "Audio Call", count: data.audioCall.count, percentage: data.audioCall.percentage, color: "#428a26" },
    { label: "Chat/SMS", count: data.chatSMS.count, percentage: data.chatSMS.percentage, color: "#64748b" },
  ];

  // Calculate donut chart segments
  let cumulativePercent = 0;
  const segments = consultations.map((item) => {
    const startPercent = cumulativePercent;
    cumulativePercent += item.percentage;
    return {
      ...item,
      startPercent,
      endPercent: cumulativePercent,
    };
  });

  return (
    <div className="consultations-card">
      <div className="card-header">
        <h3 className="card-title">Consultations Overview</h3>
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
              const largeArc = segment.percentage > 50 ? 1 : 0;

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
            <span className="total-count">{data.total.toLocaleString()}</span>
            <span className="total-label">Total</span>
          </div>
        </div>

        <div className="chart-legend">
          {consultations.map((item, index) => (
            <div key={index} className="legend-item">
              <span className="legend-dot" style={{ backgroundColor: item.color }} />
              <div className="legend-info">
                <span className="legend-label">{item.label}</span>
                <span className="legend-value">
                  {item.count.toLocaleString()} ({item.percentage}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}