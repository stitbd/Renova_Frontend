// app/super-admin/finance/expenses/components/PrintableReport.jsx
"use client";

const monthLabels = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

const PrintableReport = ({
    kpiMetrics,
    periodLabel,
    topCategorySpend,
    topVendorsSpend,
    yearlyComparison,
    monthlyTrend,
    categoryDistribution,
    cashFlowMonths,
}) => {
    const maxCash = Math.max(...cashFlowMonths);

    return (
        <div id="em-printable-report" className="em-print-report">
            <div className="em-print-header">
                <h1>Renova Life Care Ltd.</h1>
                <p>Expense Management — Financial Overview &amp; Analytics Report</p>
                <span>
                    Generated on {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                </span>
            </div>

            {/* ─── Financial Overview ─── */}
            <h2 className="em-print-section-title">Financial Overview{periodLabel ? ` — ${periodLabel}` : ""}</h2>
            <div className="em-print-kpi-grid">
                {kpiMetrics.map((k, i) => (
                    <div key={i} className={`em-print-kpi-card ${k.variant || ""}`}>
                        <span className="em-print-kpi-label">{k.label}</span>
                        <span className="em-print-kpi-value">{k.value}</span>
                        <span className={`em-print-kpi-trend ${k.up ? "up" : "down"}`}>{k.trend}</span>
                    </div>
                ))}
            </div>

            {/* ─── Expense Analytics ─── */}
            <h2 className="em-print-section-title">Expense Analytics</h2>

            {/* Row 1: Monthly Expense Trend & Expense Category Distribution */}
            <div className="em-print-row-2">
                <div className="em-print-block em-print-card">
                    <h3>Monthly Expense Trend</h3>
                    <div className="em-print-bars">
                        {monthlyTrend.map((val, i) => (
                            <div key={i} className="em-print-bar-col">
                                <div className="em-print-bar" style={{ height: `${val}%` }} />
                                <span>{monthLabels[i]}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="em-print-block em-print-card">
                    <h3>Expense Category Distribution</h3>
                    <div className="em-print-donut-row">
                        <svg viewBox="0 0 100 100" className="em-print-donut">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#2563eb" strokeWidth="15" strokeDasharray="80 251" strokeDashoffset="0" />
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#059669" strokeWidth="15" strokeDasharray="60 251" strokeDashoffset="-80" />
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#7c3aed" strokeWidth="15" strokeDasharray="50 251" strokeDashoffset="-140" />
                            <circle cx="50" cy="50" r="40" fill="none" stroke="#ea580c" strokeWidth="15" strokeDasharray="61 251" strokeDashoffset="-190" />
                        </svg>
                        <div className="em-print-legend">
                            {categoryDistribution.map((c, i) => (
                                <div key={i}><span style={{ background: c.color }} />{c.label} ({c.pct}%)</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 2: Yearly Comparison & Cash Flow */}
            <div className="em-print-row-2">
                <div className="em-print-block em-print-card">
                    <h3>Yearly Comparison (৳ Millions)</h3>
                    <div className="em-print-bars em-print-bars-yearly">
                        {yearlyComparison.map((y) => (
                            <div key={y.year} className="em-print-bar-col">
                                <div className="em-print-bar em-print-bar-green" style={{ height: `${(y.value / 50) * 100}%` }} />
                                <span>{y.year}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="em-print-block em-print-card">
                    <h3>Cash Flow (Outflow Trend)</h3>
                    <svg viewBox="0 0 300 90" className="em-print-cashflow" preserveAspectRatio="none">
                        <polyline
                            fill="none" stroke="#2563eb" strokeWidth="2.5"
                            points={cashFlowMonths.map((v, i) => `${(i / (cashFlowMonths.length - 1)) * 300},${90 - (v / maxCash) * 80}`).join(" ")}
                        />
                        <polygon
                            fill="#2563eb" opacity="0.15"
                            points={`0,90 ${cashFlowMonths.map((v, i) => `${(i / (cashFlowMonths.length - 1)) * 300},${90 - (v / maxCash) * 80}`).join(" ")} 300,90`}
                        />
                    </svg>
                    <p className="em-print-footnote">Monthly outflow, Jan – Dec 2026</p>
                </div>
            </div>

            {/* Row 3: Top Spending Categories & Top Vendors */}
            <div className="em-print-row-2">
                <div className="em-print-block em-print-card">
                    <h3>Top Spending Categories</h3>
                    <table className="em-print-table">
                        <tbody>
                            {topCategorySpend.map((c, i) => (
                                <tr key={i}>
                                    <td>{i + 1}. {c.name}</td>
                                    <td className="em-print-right">৳{(c.value / 1000).toFixed(0)}K</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="em-print-block em-print-card">
                    <h3>Top Vendors by Spend</h3>
                    <table className="em-print-table">
                        <tbody>
                            {topVendorsSpend.map((v, i) => (
                                <tr key={i}>
                                    <td>{i + 1}. {v.name}</td>
                                    <td className="em-print-right">৳{(v.value / 1000).toFixed(0)}K</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PrintableReport;