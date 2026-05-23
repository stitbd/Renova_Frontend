// app/outlet/earnings/page.jsx
"use client";

import { motion } from "framer-motion";

export default function EarningsPage() {
  const earnings = {
    total: "৳78,450",
    growth: "+20.6%",
    period: "This Month",
    breakdown: [
      { label: "Consultation Fees", amount: "৳42,000", percent: 53 },
      { label: "Product Sales", amount: "৳28,650", percent: 36 },
      { label: "Device Usage", amount: "৳7,800", percent: 11 },
    ],
    commission: {
      rate: "15%",
      amount: "৳11,767",
      pending: "৳2,340"
    }
  };

  const transactions = [
    { id: "TXN-001", date: "15 May 2025", description: "Consultation - Dr. Ahsan", amount: "৳500", type: "credit", status: "Completed" },
    { id: "TXN-002", date: "14 May 2025", description: "Product Sale - Spirulina", amount: "৳450", type: "credit", status: "Completed" },
    { id: "TXN-003", date: "13 May 2025", description: "Commission Payout", amount: "৳2,340", type: "debit", status: "Pending" },
    { id: "TXN-004", date: "12 May 2025", description: "Device Usage Fee", amount: "৳200", type: "credit", status: "Completed" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Header */}
      <motion.div className="page-header">
        <h1 className="page-title">Earnings & Commission</h1>
        <motion.button className="btn btn-primary" whileHover={{ scale: 1.02 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Statement
        </motion.button>
      </motion.div>

      {/* Summary Cards */}
      <motion.div className="earnings-summary">
        <motion.div className="earnings-card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <span className="earnings-label">Total Earnings</span>
          <span className="earnings-amount">{earnings.total}</span>
          <span className="earnings-growth">{earnings.growth} vs last month</span>
        </motion.div>
        <motion.div className="commission-card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h4>Commission Details</h4>
          <div className="commission-row">
            <span>Rate:</span>
            <span className="commission-rate">{earnings.commission.rate}</span>
          </div>
          <div className="commission-row">
            <span>Earned:</span>
            <span className="commission-earned">{earnings.commission.amount}</span>
          </div>
          <div className="commission-row">
            <span>Pending:</span>
            <span className="commission-pending">{earnings.commission.pending}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Breakdown Chart */}
      <motion.div className="breakdown-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h3 className="card-title">Earnings Breakdown</h3>
        <div className="breakdown-chart">
          {earnings.breakdown.map((item, i) => (
            <motion.div
              key={item.label}
              className="breakdown-item"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <div className="breakdown-header">
                <span className="breakdown-label">{item.label}</span>
                <span className="breakdown-amount">{item.amount}</span>
              </div>
              <div className="breakdown-bar">
                <motion.div
                  className="breakdown-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percent}%` }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                  style={{ backgroundColor: ["#014fa1", "#428a26", "#7c3aed"][i] }}
                />
              </div>
              <span className="breakdown-percent">{item.percent}%</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Transactions */}
      <motion.div className="transactions-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h3 className="section-title">Recent Transactions</h3>
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Description</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, i) => (
                <motion.tr
                  key={txn.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  whileHover={{ backgroundColor: "#f8fafc" }}
                >
                  <td className="txn-id">{txn.id}</td>
                  <td>{txn.description}</td>
                  <td>{txn.date}</td>
                  <td className={txn.type === "credit" ? "amount-credit" : "amount-debit"}>
                    {txn.type === "credit" ? "+" : "-"}{txn.amount}
                  </td>
                  <td><span className={`status-badge ${txn.status.toLowerCase()}`}>{txn.status}</span></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}