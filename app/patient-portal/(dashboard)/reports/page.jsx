"use client";

import { useState } from "react";
import "./patient-reports.css";

/* ── Mock Data ─────────────────────────────────────────────────── */
const reportsData = [
  { id: 1, name: "Complete Blood Count (CBC)", patient: "Md. Rakib Hasan", patientId: "PT-2025-000123", type: "lab", date: "15 May 2025", time: "10:30 AM", status: "normal" },
  { id: 2, name: "Chest X-Ray", patient: "Md. Rakib Hasan", patientId: "PT-2025-000123", type: "imaging", date: "14 May 2025", time: "02:15 PM", status: "abnormal" },
  { id: 3, name: "Urine Routine Examination", patient: "Md. Rakib Hasan", patientId: "PT-2025-000123", type: "lab", date: "12 May 2025", time: "11:20 AM", status: "normal" },
  { id: 4, name: "ECG Report", patient: "Md. Rakib Hasan", patientId: "PT-2025-000123", type: "other", date: "10 May 2025", time: "09:45 AM", status: "normal" },
  { id: 5, name: "Lipid Profile Test", patient: "Md. Rakib Hasan", patientId: "PT-2025-000123", type: "lab", date: "08 May 2025", time: "03:10 PM", status: "abnormal" },
  { id: 6, name: "Ultrasound Abdomen", patient: "Md. Rakib Hasan", patientId: "PT-2025-000123", type: "imaging", date: "05 May 2025", time: "01:40 PM", status: "normal" },
];

const typeLabel = { lab: "Lab Report", imaging: "Imaging Report", other: "Other Report" };
const statusLabel = { normal: "Normal", abnormal: "Abnormal", pending: "Pending" };

const donutSegments = [
  { label: "Lab Reports", value: 12, pct: "50%", color: "#428a26", dash: 125.6, offset: 0 },
  { label: "Imaging Reports", value: 6, pct: "25%", color: "#014fa1", dash: 62.8, offset: -125.6 },
  { label: "Prescription Reports", value: 4, pct: "16.7%", color: "#7c3aed", dash: 41.9, offset: -188.4 },
  { label: "Other Reports", value: 2, pct: "8.3%", color: "#f59e0b", dash: 20.9, offset: -230.3 },
];

const trendPoints = [
  { x: 0, y: 2 },
  { x: 120, y: 5 },
  { x: 240, y: 3 },
  { x: 360, y: 6 },
  { x: 480, y: 2 },
  { x: 600, y: 6 },
  { x: 720, y: 4 },
  { x: 840, y: 5 },
];

const MAX_Y = 8;
const CHART_H = 160;
const CHART_W = 840;

function yPos(val) {
  return CHART_H - (val / MAX_Y) * CHART_H;
}

const polylinePoints = trendPoints.map(p => `${p.x},${yPos(p.y)}`).join(" ");
const areaPath = `M${trendPoints[0].x},${yPos(trendPoints[0].y)} ` +
  trendPoints.slice(1).map(p => `L${p.x},${yPos(p.y)}`).join(" ") +
  ` L${trendPoints[trendPoints.length - 1].x},${CHART_H} L0,${CHART_H} Z`;

const xLabels = ["01 May", "06 May", "11 May", "16 May", "21 May", "26 May", "31 May"];

const summaryData = [
  { label: "Total Reports", val: "24", cls: "dark" },
  { label: "Normal Reports", val: "18 (75%)", cls: "green" },
  { label: "Abnormal Reports", val: "06 (25%)", cls: "red" },
  { label: "Pending Reports", val: "00 (0%)", cls: "orange" },
  { label: "This Month", val: "08", cls: "blue" },
];

/* ── Icons ─────────────────────────────────────────────────────── */
function Icon({ type }) {
  const map = {
    reports: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
    lab: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2zM9 9h6v6H9V9z" /></svg>,
    imaging: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>,
    other: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
    calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
    chevdown: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>,
    search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>,
    filter: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>,
    reset: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" /></svg>,
    download: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
    upload: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>,
    view: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
    share: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>,
    user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
    chevleft: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>,
    chevright: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>,
  };
  return <>{map[type] || null}</>;
}

/* ── Page ──────────────────────────────────────────────────────── */
export default function ReportsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = reportsData.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.patient.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || r.type === typeFilter;
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <>
      {/* Stats Row */}
      <div className="rpt-stats-row">
        {[
          { label: "Total Reports", value: "24", sub: "View all reports", color: "green", icon: "reports" },
          { label: "Lab Reports", value: "12", sub: "View lab reports", color: "blue", icon: "lab" },
          { label: "Imaging Reports", value: "06", sub: "View imaging reports", color: "purple", icon: "imaging" },
          { label: "Other Reports", value: "06", sub: "View other reports", color: "orange", icon: "other" },
          { label: "This Month", value: "08", sub: "New reports added", color: "teal", icon: "calendar" },
        ].map(s => (
          <div key={s.label} className={`rpt-stat-card ${s.color}`}>
            <div className={`rpt-stat-icon ${s.color}`}><Icon type={s.icon} /></div>
            <div className="rpt-stat-body">
              <p className="rpt-stat-label">{s.label}</p>
              <p className={`rpt-stat-value ${s.color}`}>{s.value}</p>
              <p className="rpt-stat-sub">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="rpt-filter-bar">
        {/* Date range */}
        <div className="rpt-filter-select-wrap">
          <svg className="rpt-filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
          <select className="rpt-filter-select">
            <option>01 May 2025 – 31 May 2025</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
          <svg className="rpt-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
        </div>

        {/* All Types */}
        <div className="rpt-filter-select-wrap">
          <select
            className="rpt-filter-select"
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="lab">Lab Reports</option>
            <option value="imaging">Imaging Reports</option>
            <option value="other">Other Reports</option>
          </select>
          <svg className="rpt-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
        </div>

        {/* All Status */}
        <div className="rpt-filter-select-wrap">
          <select
            className="rpt-filter-select"
            value={statusFilter}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="normal">Normal</option>
            <option value="abnormal">Abnormal</option>
            <option value="pending">Pending</option>
          </select>
          <svg className="rpt-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
        </div>

        {/* Search */}
        <div className="rpt-search-wrap">
          <Icon type="search" />
          <input
            type="text"
            placeholder="Search reports..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="rpt-filter-bar-spacer" />

        <button className="rpt-apply-btn" onClick={() => { }}>
          <Icon type="filter" /> Apply Filter
        </button>
        <button className="rpt-reset-btn" onClick={() => { setSearch(""); setTypeFilter("all"); setStatus("all"); }}>
          <Icon type="reset" /> Reset
        </button>
      </div>

      {/* Charts Row */}
      <div className="rpt-charts-row">

        {/* Donut: Reports by Type */}
        <div className="rpt-chart-card">
          <h3 className="rpt-chart-title">Reports by Type</h3>
          <div className="rpt-donut-wrap">
            <div className="rpt-donut-svg-wrap">
              <svg viewBox="0 0 100 100" className="rpt-donut-svg">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                {donutSegments.map((seg, i) => (
                  <circle
                    key={i}
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="12"
                    strokeDasharray={`${seg.dash} 251.2`}
                    strokeDashoffset={seg.offset}
                    transform="rotate(-90 50 50)"
                  />
                ))}
              </svg>
              <div className="rpt-donut-center">
                <span className="rpt-donut-total">24</span>
                <span className="rpt-donut-label">Total</span>
              </div>
            </div>
            <div className="rpt-donut-legend">
              {donutSegments.map((seg, i) => (
                <div key={i} className="rpt-legend-item">
                  <span className="rpt-legend-dot" style={{ backgroundColor: seg.color }} />
                  <span className="rpt-legend-label">{seg.label}</span>
                  <span className="rpt-legend-val">{seg.value} ({seg.pct})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Line: Reports Trend */}
        <div className="rpt-chart-card">
          <div className="rpt-chart-header">
            <h3 className="rpt-chart-title" style={{ margin: 0 }}>Reports Trend (This Month)</h3>
            <select className="rpt-trend-select">
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="rpt-line-chart-wrap">
            <svg
              viewBox={`0 0 ${CHART_W} ${CHART_H}`}
              className="rpt-line-svg"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="rptGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#014fa1" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#014fa1" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Y grid lines */}
              {[0, 2, 4, 6, 8].map(v => (
                <line
                  key={v}
                  x1="0" y1={yPos(v)}
                  x2={CHART_W} y2={yPos(v)}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
              ))}
              {/* Area fill */}
              <path d={areaPath} fill="url(#rptGrad)" />
              {/* Line */}
              <polyline
                points={polylinePoints}
                fill="none"
                stroke="#014fa1"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Dots */}
              {trendPoints.map((p, i) => (
                <circle key={i} cx={p.x} cy={yPos(p.y)} r="5" fill="#014fa1" />
              ))}
            </svg>
            {/* X-axis labels */}
            <div className="rpt-x-axis">
              {xLabels.map(l => (
                <span key={l} className="rpt-x-label">{l}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Reports Summary */}
        <div className="rpt-chart-card">
          <h3 className="rpt-chart-title">Reports Summary</h3>
          <div className="rpt-summary-list">
            {summaryData.map(s => (
              <div key={s.label} className="rpt-summary-item">
                <span className="rpt-summary-label">{s.label}</span>
                <span className={`rpt-summary-val ${s.cls}`}>{s.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="rpt-table-section">
        <div className="rpt-table-header">
          <h3 className="rpt-table-title">Reports List</h3>
          <div className="rpt-table-btns">
            <button className="rpt-tbl-btn outline">
              <Icon type="download" /> Download All
            </button>
            <button className="rpt-tbl-btn green">
              <Icon type="upload" /> Upload Report
            </button>
          </div>
        </div>

        <div className="rpt-table-wrap">
          <table className="rpt-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Report Name</th>
                <th>Patient Name</th>
                <th>Report Type</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.id}>
                  <td>{i + 1}</td>
                  <td className="rpt-report-name">{r.name}</td>
                  <td>
                    <div className="rpt-patient-cell">
                      <div className="rpt-patient-avatar">
                        <Icon type="user" />
                      </div>
                      <div>
                        <p className="rpt-patient-name">{r.patient}</p>
                        <p className="rpt-patient-id">{r.patientId}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`rpt-type-badge ${r.type}`}>
                      {typeLabel[r.type]}
                    </span>
                  </td>
                  <td>
                    <p className="rpt-date-val">{r.date}</p>
                    <p className="rpt-time-val">{r.time}</p>
                  </td>
                  <td>
                    <span className={`rpt-status-badge ${r.status}`}>
                      {statusLabel[r.status]}
                    </span>
                  </td>
                  <td>
                    <div className="rpt-action-btns">
                      <button className="rpt-act-btn view" title="View">    <Icon type="view" /></button>
                      <button className="rpt-act-btn download" title="Download"><Icon type="download" /></button>
                      <button className="rpt-act-btn share" title="Share">   <Icon type="share" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="rpt-pagination">
          <span className="rpt-pagination-info">
            Showing 1 to {filtered.length} of 24 entries
          </span>
          <div className="rpt-pagination-btns">
            <button className="rpt-page-btn" disabled>
              <Icon type="chevleft" />
            </button>
            {[1, 2, 3, 4].map(n => (
              <button
                key={n}
                className={`rpt-page-btn${n === currentPage ? " active" : ""}`}
                onClick={() => setCurrentPage(n)}
              >
                {n}
              </button>
            ))}
            <button className="rpt-page-btn" onClick={() => setCurrentPage(p => Math.min(p + 1, 4))}>
              <Icon type="chevright" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}