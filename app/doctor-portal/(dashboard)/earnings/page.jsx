"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import "./earnings.css";
import {
  Wallet,
  Calendar,
  TrendingUp,
  BarChart3,
  Clock,
  CheckCircle,
  Building2,
  Users,
  Video,
  RotateCw,
  Zap,
  FileText,
  Search,
  Download,
  Smartphone,
  Banknote,
  ArrowLeft,
  ArrowRight
} from "lucide-react";

// ========== DATA ==========
export const earningsSummary = {
  totalEarnings: 125000,
  todayEarnings: 3200,
  weekEarnings: 18500,
  monthEarnings: 42850,
  pendingEarnings: 5200,
  withdrawnAmount: 101300,
  availableBalance: 18500,
  totalConsultations: 240,
};

export const earningsChartData = {
  daily: [
    { label: "Mon", value: 2800 },
    { label: "Tue", value: 3400 },
    { label: "Wed", value: 2100 },
    { label: "Thu", value: 4200 },
    { label: "Fri", value: 5100 },
    { label: "Sat", value: 3800 },
    { label: "Sun", value: 3200 },
  ],
  weekly: [
    { label: "Week 1", value: 18500 },
    { label: "Week 2", value: 22300 },
    { label: "Week 3", value: 19800 },
    { label: "Week 4", value: 25600 },
  ],
  monthly: [
    { label: "Jan", value: 38000 },
    { label: "Feb", value: 42000 },
    { label: "Mar", value: 39500 },
    { label: "Apr", value: 45200 },
    { label: "May", value: 48900 },
    { label: "Jun", value: 42850 },
  ],
  yearly: [
    { label: "2022", value: 320000 },
    { label: "2023", value: 410000 },
    { label: "2024", value: 489000 },
    { label: "2025", value: 542000 },
    { label: "2026", value: 125000 },
  ],
};

export const revenueBreakdown = [
  { type: "Video Consultation", consultations: 120, earnings: 60000, icon: "video" },
  { type: "Follow-up Consultation", consultations: 50, earnings: 15000, icon: "repeat" },
  { type: "Instant Consultation", consultations: 40, earnings: 20000, icon: "bolt" },
  { type: "Prescription Renewal", consultations: 30, earnings: 8000, icon: "prescription" },
];

export const transactions = [
  { id: "TRX-1001", patient: "Ahmed Karim", appointmentId: "APT-2201", type: "Video Consultation", date: "10 Jun 2026", fee: 1000, charge: 100, net: 900, status: "Completed" },
  { id: "TRX-1002", patient: "Nusrat Jahan", appointmentId: "APT-2202", type: "Follow-up", date: "10 Jun 2026", fee: 500, charge: 50, net: 450, status: "Completed" },
  { id: "TRX-1003", patient: "Kamal Hossain", appointmentId: "APT-2203", type: "Instant Consultation", date: "09 Jun 2026", fee: 800, charge: 80, net: 720, status: "Pending" },
  { id: "TRX-1004", patient: "Sumiya Rahman", appointmentId: "APT-2204", type: "Prescription Renewal", date: "09 Jun 2026", fee: 300, charge: 30, net: 270, status: "Completed" },
  { id: "TRX-1005", patient: "Rafiq Hasan", appointmentId: "APT-2205", type: "Video Consultation", date: "08 Jun 2026", fee: 1000, charge: 100, net: 900, status: "Refunded" },
  { id: "TRX-1006", patient: "Jannatul Ferdous", appointmentId: "APT-2206", type: "Video Consultation", date: "08 Jun 2026", fee: 1000, charge: 100, net: 900, status: "Cancelled" },
  { id: "TRX-1007", patient: "Sohel Mahmud", appointmentId: "APT-2207", type: "Follow-up", date: "07 Jun 2026", fee: 500, charge: 50, net: 450, status: "Completed" },
];

export const withdrawalHistory = [
  { date: "10 Jun 2026", method: "bKash", amount: 5000, status: "Completed" },
  { date: "01 Jun 2026", method: "Bank Account", amount: 10000, status: "Completed" },
  { date: "25 May 2026", method: "Nagad", amount: 3000, status: "Processing" },
  { date: "18 May 2026", method: "Rocket", amount: 2500, status: "Failed" },
];

export const settlementInfo = {
  cycle: "Weekly",
  nextDate: "15 June 2026",
  amount: 5200,
};

export const refunds = [
  { patient: "Rashidul Alam", appointmentId: "APT-2150", amount: 500, reason: "Appointment Cancelled", date: "07 Jun 2026" },
  { patient: "Maliha Islam", appointmentId: "APT-2148", amount: 1000, reason: "Doctor Unavailable", date: "05 Jun 2026" },
];

export const earningsInsights = {
  highestEarningDay: "Friday",
  avgPerConsultation: 850,
  avgMonthly: 38500,
  totalActivePatients: 186,
  successRate: 96.5,
};

export const withdrawalMethods = [
  { id: "bank", label: "Bank Account", icon: "bank" },
  { id: "bkash", label: "bKash", icon: "bkash" },
  { id: "nagad", label: "Nagad", icon: "nagad" },
  { id: "rocket", label: "Rocket", icon: "rocket" },
];

const PERIODS = [
  { key: "daily", label: "Last 7 Days" },
  { key: "weekly", label: "Last 30 Days" },
  { key: "monthly", label: "Last 3 Months" },
  { key: "yearly", label: "Last 12 Months" },
];

const FILTERS = ["All", "Today", "Yesterday", "This Week", "This Month"];
const PAGE_SIZE = 5;

// ========== LINE CHART COMPONENT ==========
function LineChart({ data, maxValue }) {
  const width = 700;
  const height = 220;
  const padding = 30;
  const step = data.length > 1 ? (width - padding * 2) / (data.length - 1) : 0;

  const points = data.map((d, i) => {
    const x = padding + i * step;
    const y = height - padding - (d.value / maxValue) * (height - padding * 2);
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = points.length
    ? `${linePath} L${points[points.length - 1].x},${height - padding} L${points[0].x},${height - padding} Z`
    : "";

  return (
    <svg className="line-chart-svg" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <path className="line-chart-area" d={areaPath} />
      <path className="line-chart-line" d={linePath} />
      {points.map((p) => (
        <g key={p.label}>
          <circle className="line-chart-dot" cx={p.x} cy={p.y} r="4" />
          <text className="line-chart-axis-label" x={p.x} y={height - 8} textAnchor="middle">
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ========== EARNINGS SUMMARY CARDS ==========
function EarningsSummaryCards({ data }) {
  const cards = [
    { key: "totalEarnings", label: "Total Earnings", value: data.totalEarnings, color: "c-blue", icon: Wallet },
    { key: "todayEarnings", label: "Today's Earnings", value: data.todayEarnings, color: "c-green", icon: Calendar },
    { key: "weekEarnings", label: "This Week", value: data.weekEarnings, color: "c-purple", icon: TrendingUp },
    { key: "monthEarnings", label: "This Month", value: data.monthEarnings, color: "c-orange", icon: BarChart3 },
    { key: "pendingEarnings", label: "Pending Earnings", value: data.pendingEarnings, color: "c-amber", icon: Clock },
    { key: "withdrawnAmount", label: "Withdrawn", value: data.withdrawnAmount, color: "c-teal", icon: CheckCircle },
    { key: "availableBalance", label: "Available Balance", value: data.availableBalance, color: "c-cyan", icon: Building2 },
    { key: "totalConsultations", label: "Total Consultations", value: data.totalConsultations, color: "c-pink", icon: Users, isCount: true },
  ];

  return (
    <div className="earnings-overview-grid">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <motion.div
            key={card.key}
            className={`earnings-overview-card ${card.color}`}
            whileHover={{ y: -6, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", transition: { duration: 0.2 } }}
          >
            <motion.div
              className="earnings-overview-icon"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <IconComponent size={20} />
            </motion.div>
            <div className="earnings-overview-info">
              <p className="earnings-overview-label">{card.label}</p>
              <h3 className="earnings-overview-value">
                {card.isCount ? card.value : `৳${card.value.toLocaleString("en-IN")}`}
              </h3>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ========== EARNINGS CHART SECTION ==========
function EarningsChartSection({ chartData }) {
  const [period, setPeriod] = useState("daily");
  const [chartType, setChartType] = useState("line");
  const [showCustom, setShowCustom] = useState(false);

  const data = chartData[period] || [];
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="earnings-section-card">
      <div className="earnings-section-header">
        <h3 className="earnings-section-title">Earnings Trend</h3>
        <div className="earnings-chart-controls">
          <div className="period-selector">
            {PERIODS.map((p) => (
              <button
                key={p.key}
                className={`period-btn ${period === p.key ? "active" : ""}`}
                onClick={() => {
                  setPeriod(p.key);
                  setShowCustom(false);
                }}
              >
                {p.label}
              </button>
            ))}
            <button
              className={`period-btn ${showCustom ? "active" : ""}`}
              onClick={() => setShowCustom((s) => !s)}
            >
              Custom
            </button>
          </div>
          <div className="chart-type-toggle">
            <button
              className={`chart-type-btn ${chartType === "line" ? "active" : ""}`}
              onClick={() => setChartType("line")}
            >
              Line
            </button>
            <button
              className={`chart-type-btn ${chartType === "bar" ? "active" : ""}`}
              onClick={() => setChartType("bar")}
            >
              Bar
            </button>
          </div>
        </div>
      </div>

      {showCustom && (
        <div className="custom-range-row">
          <input type="date" defaultValue="2026-06-01" />
          <span>to</span>
          <input type="date" defaultValue="2026-06-14" />
          <button className="export-btn">Apply</button>
        </div>
      )}

      {chartType === "bar" ? (
        <div className="earnings-bar-chart">
          {data.map((d) => (
            <div className="chart-bar-wrapper" key={d.label}>
              <div
                className="chart-bar-visual"
                style={{ height: `${(d.value / maxValue) * 100}%` }}
                data-value={`৳${d.value.toLocaleString("en-IN")}`}
              />
              <span className="chart-bar-label">{d.label}</span>
            </div>
          ))}
        </div>
      ) : (
        <LineChart data={data} maxValue={maxValue} />
      )}
    </div>
  );
}

// ========== REVENUE BREAKDOWN ==========
function RevenueBreakdown({ data }) {
  const icons = {
    video: Video,
    repeat: RotateCw,
    bolt: Zap,
    prescription: FileText,
  };

  return (
    <div className="earnings-section-card">
      <div className="earnings-section-header">
        <h3 className="earnings-section-title">Consultation Revenue Breakdown</h3>
      </div>
      <div className="earnings-breakdown">
        {data.map((item) => {
          const IconComponent = icons[item.icon];
          return (
            <div className="breakdown-card" key={item.type}>
              <div className="breakdown-icon">
                <IconComponent size={20} />
              </div>
              <div className="breakdown-body">
                <p className="breakdown-title">
                  {item.type} • {item.consultations} consultations
                </p>
                <p className="breakdown-amount">৳{item.earnings.toLocaleString("en-IN")}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ========== TRANSACTION HISTORY ==========
function TransactionHistory({ transactions }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = transactions.filter((t) => {
    const q = search.toLowerCase();
    return (
      t.id.toLowerCase().includes(q) ||
      t.patient.toLowerCase().includes(q) ||
      t.appointmentId.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="earnings-section-card">
      <div className="earnings-section-header">
        <h3 className="earnings-section-title">Transaction History</h3>
      </div>

      <div className="transaction-filters">
        <div className="filter-pills">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-pill ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="transaction-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search Transaction ID, Patient, Appointment ID"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="export-buttons">
          <button className="export-btn">
            <Download size={14} /> PDF
          </button>
          <button className="export-btn">
            <Download size={14} /> Excel
          </button>
        </div>
      </div>

      <div className="table-scroll transaction-table-wrapper">
        <table className="earnings-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Patient</th>
              <th>Appointment ID</th>
              <th>Type</th>
              <th>Date</th>
              <th>Fee</th>
              <th>Charge</th>
              <th>Receives</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.patient}</td>
                <td>{t.appointmentId}</td>
                <td>{t.type}</td>
                <td>{t.date}</td>
                <td>৳{t.fee}</td>
                <td>৳{t.charge}</td>
                <td className="amount-cell">৳{t.net}</td>
                <td>
                  <span className={`status-cell ${t.status.toLowerCase()}`}>{t.status}</span>
                </td>
              </tr>
            ))}
            {paged.length === 0 && (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", color: "var(--color-text-muted)" }}>
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="transaction-cards">
        {paged.map((t) => (
          <div key={t.id} className="transaction-card">
            <div className="transaction-card-header">
              <div>
                <div className="transaction-card-id">{t.id}</div>
                <div className="transaction-card-patient">{t.patient}</div>
                <div className="transaction-card-type">{t.type}</div>
              </div>
              <span className={`status-cell ${t.status.toLowerCase()}`}>{t.status}</span>
            </div>
            <div className="transaction-card-body">
              <div className="transaction-card-field">
                <span className="transaction-card-field-label">Fee</span>
                <span className="transaction-card-field-value">৳{t.fee}</span>
              </div>
              <div className="transaction-card-field">
                <span className="transaction-card-field-label">Charge</span>
                <span className="transaction-card-field-value">৳{t.charge}</span>
              </div>
              <div className="transaction-card-field">
                <span className="transaction-card-field-label">Receives</span>
                <span className="transaction-card-field-value net">৳{t.net}</span>
              </div>
            </div>
            <div className="transaction-card-footer">
              <span className="transaction-card-apt">{t.appointmentId}</span>
              <span className="transaction-card-date">{t.date}</span>
            </div>
          </div>
        ))}
        {paged.length === 0 && (
          <p style={{ textAlign: "center", color: "var(--color-text-muted)", padding: "20px 0" }}>
            No transactions found
          </p>
        )}
      </div>

      <div className="table-pagination">
        <span>
          Page {page} of {totalPages}
        </span>
        <div className="pagination-buttons">
          <button
            className="pagination-btn"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ArrowLeft size={14} />
          </button>
          <button
            className="pagination-btn"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ========== WITHDRAWAL SECTION ==========
function WithdrawalSection({ balance, methods }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(methods[0]?.id);
  const [amount, setAmount] = useState("");

  const icons = {
    bank: Building2,
    bkash: Smartphone,
    nagad: Smartphone,
    rocket: Smartphone,
  };

  return (
    <div className="earnings-section-card">
      <div className="earnings-section-header">
        <h3 className="earnings-section-title">Withdraw Earnings</h3>
      </div>

      <div className="withdrawal-balance-card">
        <span className="withdrawal-balance-label">Available Balance</span>
        <span className="withdrawal-balance-amount">৳{balance.toLocaleString("en-IN")}</span>
        <button className="withdraw-btn" onClick={() => setShowModal(true)}>
          Withdraw Earnings
        </button>
      </div>

      <p className="withdrawal-methods-label">Withdrawal Methods</p>
      <div className="withdrawal-methods-grid">
        {methods.map((m) => {
          const IconComponent = icons[m.icon] || Smartphone;
          return (
            <div
              key={m.id}
              className={`withdrawal-method-item ${selectedMethod === m.id ? "selected" : ""}`}
              onClick={() => setSelectedMethod(m.id)}
            >
              <IconComponent size={18} />
              <span>{m.label}</span>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h4 className="modal-title">Withdraw Earnings</h4>
            <p className="modal-subtitle">Available Balance: ৳{balance.toLocaleString("en-IN")}</p>
            <input
              type="number"
              className="input-field"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid var(--color-border-default)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <p className="withdrawal-methods-label" style={{ marginTop: "14px" }}>
              Select Method
            </p>
            <div className="withdrawal-methods-grid">
              {methods.map((m) => {
                const IconComponent = icons[m.icon] || Smartphone;
                return (
                  <div
                    key={m.id}
                    className={`withdrawal-method-item ${selectedMethod === m.id ? "selected" : ""}`}
                    onClick={() => setSelectedMethod(m.id)}
                  >
                    <IconComponent size={18} />
                    <span>{m.label}</span>
                  </div>
                );
              })}
            </div>
            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button className="confirm-btn" onClick={() => setShowModal(false)}>
                Confirm Withdrawal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ========== WITHDRAWAL HISTORY ==========
function WithdrawalHistory({ history }) {
  return (
    <div className="earnings-section-card">
      <div className="earnings-section-header">
        <h3 className="earnings-section-title">Withdrawal History</h3>
      </div>
      <div className="table-scroll">
        <table className="earnings-table withdrawal-history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Method</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, i) => (
              <tr key={i}>
                <td>{h.date}</td>
                <td>{h.method}</td>
                <td className="amount-cell">৳{h.amount.toLocaleString("en-IN")}</td>
                <td>
                  <span className={`status-cell ${h.status.toLowerCase()}`}>{h.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ========== SETTLEMENT AND REFUNDS ==========
function SettlementAndRefunds({ settlement, refunds }) {
  return (
    <div className="earnings-section-card">
      <div className="earnings-section-header">
        <h3 className="earnings-section-title">Settlement & Refunds</h3>
      </div>

      <div className="settlement-card">
        <div className="settlement-info-block">
          <span className="settlement-label">Next Settlement</span>
          <span className="settlement-value">{settlement.nextDate}</span>
        </div>
        <div className="settlement-info-block">
          <span className="settlement-label">Amount</span>
          <span className="settlement-value">৳{settlement.amount.toLocaleString("en-IN")}</span>
        </div>
        <span className="settlement-cycle-badge">{settlement.cycle} Settlement</span>
      </div>

      {refunds.length > 0 && (
        <>
          <div className="table-scroll refund-table-wrapper" style={{ marginTop: "16px" }}>
            <table className="earnings-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Appointment ID</th>
                  <th>Amount</th>
                  <th>Reason</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {refunds.map((r, i) => (
                  <tr key={i}>
                    <td>{r.patient}</td>
                    <td>{r.appointmentId}</td>
                    <td className="amount-cell">৳{r.amount}</td>
                    <td>{r.reason}</td>
                    <td>{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Refund Cards */}
          <div className="refund-cards">
            {refunds.map((r, i) => (
              <div key={i} className="refund-card">
                <div className="refund-card-header">
                  <div>
                    <div className="refund-card-patient">{r.patient}</div>
                    <div className="refund-card-apt">{r.appointmentId}</div>
                  </div>
                  <div className="refund-card-amount">৳{r.amount}</div>
                </div>
                <div className="refund-card-footer">
                  <span className="refund-card-reason">{r.reason}</span>
                  <span className="refund-card-date">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ========== EARNINGS INSIGHTS ==========
function EarningsInsights({ data }) {
  const items = [
    { label: "Highest Earning Day", value: data.highestEarningDay },
    { label: "Avg / Consultation", value: `৳${data.avgPerConsultation}` },
    { label: "Avg Monthly Earnings", value: `৳${data.avgMonthly.toLocaleString("en-IN")}` },
    { label: "Active Patients", value: data.totalActivePatients },
    { label: "Success Rate", value: `${data.successRate}%` },
  ];

  return (
    <div className="earnings-section-card">
      <div className="earnings-section-header">
        <h3 className="earnings-section-title">Earnings Insights</h3>
      </div>
      <div className="insights-grid">
        {items.map((item) => (
          <div className="insight-item" key={item.label}>
            <span className="insight-label">{item.label}</span>
            <span className="insight-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========== MAIN PAGE ==========
export default function EarningsPage() {
  return (
    <div className="earnings-page">
      <EarningsSummaryCards data={earningsSummary} />

      <div className="earnings-main-grid">
        <div className="earnings-main-col">
          <EarningsChartSection chartData={earningsChartData} />
          <RevenueBreakdown data={revenueBreakdown} />
          <TransactionHistory transactions={transactions} />
          <SettlementAndRefunds settlement={settlementInfo} refunds={refunds} />
        </div>

        <div className="earnings-side-col">
          <WithdrawalSection balance={earningsSummary.availableBalance} methods={withdrawalMethods} />
          <EarningsInsights data={earningsInsights} />
          <WithdrawalHistory history={withdrawalHistory} />
        </div>
      </div>
    </div>
  );
}