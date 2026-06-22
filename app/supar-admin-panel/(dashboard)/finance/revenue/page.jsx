// app/super-admin-panel/finance/revenue/page.jsx
"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./revenue-analytics.css";
import {
    // Core Icons
    DollarSign, TrendingUp, TrendingDown, Calendar, Users, Star,
    Building2, Activity, Heart, Shield, Brain, Bell, CheckCircle,
    AlertTriangle, Info, XCircle, Download, FileText, Share2, RefreshCw,
    Eye, BarChart3, Search, Filter, ChevronDown, MapPin, Phone, Mail,
    Stethoscope, Clock, CheckSquare, XSquare, ArrowUpRight, ArrowDownRight,
    Target, Zap, CreditCard, RotateCcw, UserCheck, UserX, Percent,
    AlertCircle, ChevronUp, ChevronLeft, ChevronRight, SlidersHorizontal,
    Save, MoreHorizontal, ExternalLink, X, Wifi, PieChart, Layers,
    Award, Package, Settings, Wallet, Receipt, PiggyBank, Landmark,
    Globe, Store, ClipboardList, TrendingUp as Growth, LineChart,
    AreaChart, Activity as ActivityIcon, BarChart, Table, List,
    Filter as FilterIcon, DownloadCloud, Printer, BookOpen, Hash,
    Link, Maximize2, Minimize2, Play, Pause, SkipForward, SkipBack,
    // Payment Icons
    CreditCard as CardIcon, Banknote, Smartphone, Building,
    // Revenue Specific
    Coins, ChartColumn, ChartLine, ChartArea, ChartBar,
    CircleDollarSign, CircleEuro, CircleOff, CircleCheck,
    BanknoteIcon, HandCoins, ReceiptText, FileChartColumn,
    FolderKanban, BookCheck, BadgeDollarSign, BadgePercent,
    ChartNoAxesCombined, ChartColumnStacked, ChartSpline,
    CircleArrowUp, CircleArrowDown, LoaderCircle
} from "lucide-react";

// ─── Animation Variants ─────────────────────────────────────────
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.03 } }
};
const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
};
const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
};

// ─── Mock Data ──────────────────────────────────────────────────

// Executive KPI Data
const kpiData = [
    { label: "Total Revenue", value: "৳38.5M", change: "+12.8%", trend: "up", sub: "vs last month", icon: DollarSign, color: "#014fa1", bg: "#dbeafe" },
    { label: "Net Revenue", value: "৳32.1M", change: "+9.4%", trend: "up", sub: "after expenses", icon: CircleDollarSign, color: "#428a26", bg: "#dcfce7" },
    { label: "Gross Revenue", value: "৳42.7M", change: "+11.2%", trend: "up", sub: "before expenses", icon: Coins, color: "#7c3aed", bg: "#ede9fe" },
    { label: "Revenue Growth", value: "+12.8%", change: "+3.2%", trend: "up", sub: "month-over-month", icon: TrendingUp, color: "#0891b2", bg: "#cffafe" },
    { label: "Avg Daily Revenue", value: "৳1.28M", change: "+6.4%", trend: "up", sub: "last 30 days", icon: Calendar, color: "#ea580c", bg: "#ffedd5" },
    { label: "Avg Rev / Appointment", value: "৳2,050", change: "+8.2%", trend: "up", sub: "per completed visit", icon: Users, color: "#016034", bg: "#dcfce7" },
    { label: "Avg Rev / Patient", value: "৳3,070", change: "+6.8%", trend: "up", sub: "per unique patient", icon: UserCheck, color: "#7c3aed", bg: "#ede9fe" },
    { label: "Total Collections", value: "৳36.4M", change: "+10.5%", trend: "up", sub: "received amount", icon: Wallet, color: "#428a26", bg: "#dcfce7" },
    { label: "Pending Collections", value: "৳2.1M", change: "-8.4%", trend: "up", sub: "outstanding dues", icon: Clock, color: "#f59e0b", bg: "#fef3c7" },
    { label: "Collection Rate", value: "94.5%", change: "+1.2%", trend: "up", sub: "payments cleared", icon: CheckCircle, color: "#16a34a", bg: "#dcfce7" },
    { label: "Refund Amount", value: "৳0.28M", change: "+4.2%", trend: "down", sub: "0.7% of revenue", icon: RotateCcw, color: "#ef4444", bg: "#fee2e2" },
    { label: "Profit Margin", value: "23.6%", change: "+2.1%", trend: "up", sub: "net margin", icon: Percent, color: "#7c3aed", bg: "#ede9fe" },
    { label: "Gross Profit", value: "৳9.2M", change: "+15.3%", trend: "up", sub: "after operating costs", icon: PiggyBank, color: "#016034", bg: "#dcfce7" },
    { label: "Net Profit", value: "৳7.6M", change: "+14.8%", trend: "up", sub: "after all expenses", icon: Banknote, color: "#428a26", bg: "#dcfce7" },
    { label: "Operating Cost", value: "৳6.4M", change: "+5.2%", trend: "down", sub: "total expenses", icon: Receipt, color: "#ea580c", bg: "#ffedd5" },
];

// Revenue Trend Data (Monthly)
const revenueTrend = [
    { month: "Jan", revenue: 28.5, forecast: 29.0, growth: 3.2 },
    { month: "Feb", revenue: 30.2, forecast: 30.5, growth: 6.0 },
    { month: "Mar", revenue: 29.8, forecast: 31.0, growth: 4.6 },
    { month: "Apr", revenue: 33.5, forecast: 33.0, growth: 17.5 },
    { month: "May", revenue: 35.1, forecast: 35.0, growth: 4.8 },
    { month: "Jun", revenue: 38.5, forecast: 37.5, growth: 9.7 },
    { month: "Jul", revenue: 36.2, forecast: 38.0, growth: -6.0 },
    { month: "Aug", revenue: 39.4, forecast: 39.5, growth: 8.8 },
    { month: "Sep", revenue: 41.8, forecast: 41.0, growth: 6.1 },
    { month: "Oct", revenue: 42.5, forecast: 42.5, growth: 1.7 },
    { month: "Nov", revenue: 44.2, forecast: 44.0, growth: 4.0 },
    { month: "Dec", revenue: 48.1, forecast: 47.0, growth: 8.8 },
];

// Revenue by Outlet
const revenueByOutlet = [
    { name: "Renova Dhanmondi", revenue: 12.5, growth: 15.6, appointments: 2543, percent: 32.5, color: "#014fa1" },
    { name: "Renova Mirpur", revenue: 9.8, growth: 12.4, appointments: 2187, percent: 25.5, color: "#428a26" },
    { name: "Renova Chattogram", revenue: 7.2, growth: 10.7, appointments: 1932, percent: 18.7, color: "#7c3aed" },
    { name: "Renova Sylhet", revenue: 5.8, growth: 9.3, appointments: 1721, percent: 15.1, color: "#0891b2" },
    { name: "Renova Uttara", revenue: 3.2, growth: -2.1, appointments: 1480, percent: 8.2, color: "#ea580c" },
];

// Revenue by Service
const revenueByService = [
    { name: "General Consultation", revenue: 12.5, growth: 14.2, appointments: 6420, percent: 32.5, color: "#014fa1" },
    { name: "Specialist Visit", revenue: 9.2, growth: 8.4, appointments: 3870, percent: 23.9, color: "#428a26" },
    { name: "Diagnostic Tests", revenue: 7.8, growth: 11.3, appointments: 4210, percent: 20.3, color: "#7c3aed" },
    { name: "Dental Care", revenue: 5.4, growth: 6.2, appointments: 2130, percent: 14.0, color: "#0891b2" },
    { name: "Physiotherapy", revenue: 3.6, growth: 18.7, appointments: 1540, percent: 9.3, color: "#ea580c" },
];

// Revenue by Department
const revenueByDepartment = [
    { name: "Cardiology", revenue: 8.4, growth: 12.5, percent: 21.8, color: "#014fa1" },
    { name: "Orthopedics", revenue: 7.2, growth: 9.8, percent: 18.7, color: "#428a26" },
    { name: "Neurology", revenue: 6.5, growth: 15.2, percent: 16.9, color: "#7c3aed" },
    { name: "Pediatrics", revenue: 5.8, growth: 8.4, percent: 15.1, color: "#0891b2" },
    { name: "Gynecology", revenue: 5.2, growth: 11.7, percent: 13.5, color: "#ea580c" },
    { name: "Dermatology", revenue: 3.8, growth: 6.2, percent: 9.9, color: "#f59e0b" },
    { name: "Ophthalmology", revenue: 3.6, growth: 7.1, percent: 9.4, color: "#ef4444" },
];

// Revenue by Consultation Type
const consultationTypes = [
    { name: "Physical", revenue: 28.5, percent: 74.0, growth: 8.5, color: "#014fa1" },
    { name: "Video", revenue: 10.0, percent: 26.0, growth: 25.3, color: "#428a26" },
];

// Revenue by Payment Method
const paymentMethods = [
    { name: "Bkash / Mobile", revenue: 14.2, percent: 36.9, color: "#e11d48" },
    { name: "Cash", revenue: 11.5, percent: 29.9, color: "#428a26" },
    { name: "Card", revenue: 8.9, percent: 23.1, color: "#014fa1" },
    { name: "Insurance", revenue: 3.9, percent: 10.1, color: "#7c3aed" },
];

// Collection Trend
const collectionTrend = [
    { month: "Jan", collected: 26.0, pending: 2.5 },
    { month: "Feb", collected: 28.5, pending: 2.3 },
    { month: "Mar", collected: 27.8, pending: 2.0 },
    { month: "Apr", collected: 31.0, pending: 2.5 },
    { month: "May", collected: 33.0, pending: 2.1 },
    { month: "Jun", collected: 36.4, pending: 2.1 },
];

// Profitability Data
const profitabilityData = [
    { month: "Jan", revenue: 28.5, expense: 18.2, profit: 10.3 },
    { month: "Feb", revenue: 30.2, expense: 19.5, profit: 10.7 },
    { month: "Mar", revenue: 29.8, expense: 18.9, profit: 10.9 },
    { month: "Apr", revenue: 33.5, expense: 21.2, profit: 12.3 },
    { month: "May", revenue: 35.1, expense: 22.4, profit: 12.7 },
    { month: "Jun", revenue: 38.5, expense: 24.6, profit: 13.9 },
];

// Refund Data
const refundData = [
    { month: "Jan", amount: 0.18, percent: 0.63 },
    { month: "Feb", amount: 0.22, percent: 0.73 },
    { month: "Mar", amount: 0.19, percent: 0.64 },
    { month: "Apr", amount: 0.24, percent: 0.72 },
    { month: "May", amount: 0.21, percent: 0.60 },
    { month: "Jun", amount: 0.28, percent: 0.73 },
];

// Growth Metrics
const growthMetrics = [
    { label: "Monthly Growth", value: "12.8%", change: "+3.2%", color: "#16a34a", icon: TrendingUp },
    { label: "Quarterly Growth", value: "18.5%", change: "+4.1%", color: "#014fa1", icon: TrendingUp },
    { label: "Yearly Growth", value: "42.3%", change: "+8.7%", color: "#7c3aed", icon: TrendingUp },
    { label: "Target Achievement", value: "107%", change: "+7%", color: "#0891b2", icon: Target },
];

// Geographic Revenue
const geographicRevenue = [
    { region: "Dhaka", revenue: 22.5, percent: 58.4, color: "#014fa1" },
    { region: "Chattogram", revenue: 8.2, percent: 21.3, color: "#428a26" },
    { region: "Sylhet", revenue: 4.5, percent: 11.7, color: "#7c3aed" },
    { region: "Khulna", revenue: 3.3, percent: 8.6, color: "#0891b2" },
];

// AI Insights
const insights = [
    { type: "success", title: "Revenue Milestone", text: "Total revenue crossed ৳38.5M — 12.8% growth driven by Dhanmondi and specialist services." },
    { type: "info", title: "Digital Growth", text: "Video consultations revenue up 25.3% — now accounts for 26% of total revenue." },
    { type: "success", title: "Collection Efficiency", text: "Collection rate improved to 94.5% — 1.2% increase from last month." },
    { type: "warning", title: "Revenue Alert", text: "Renova Uttara revenue declined 2.1% — investigate operational issues." },
    { type: "info", title: "Growth Opportunity", text: "Physiotherapy and Neurology show highest growth potential at 18.7% and 15.2% respectively." },
];

// Alerts
const alerts = [
    { type: "error", title: "Revenue Drop", desc: "Renova Uttara revenue down 15% this week — immediate action required.", time: "2h ago" },
    { type: "warning", title: "High Refund Rate", desc: "Refund rate increased to 0.73% — investigate root cause.", time: "4h ago" },
    { type: "warning", title: "Pending Collections", desc: "৳2.1M outstanding — 3 payments older than 7 days.", time: "1d ago" },
    { type: "error", title: "Collection Rate Drop", desc: "Mirpur outlet collection rate dropped to 82% — follow up with billing team.", time: "6h ago" },
];

// Revenue Comparison Data
const comparisonData = [
    { metric: "Revenue", current: "৳38.5M", previous: "৳34.1M", change: "+12.8%", status: "up" },
    { metric: "Appointments", current: "18,752", previous: "17,320", change: "+8.2%", status: "up" },
    { metric: "Avg Rev/Appt", current: "৳2,050", previous: "৳1,970", change: "+4.1%", status: "up" },
    { metric: "Collection Rate", current: "94.5%", previous: "93.3%", change: "+1.2%", status: "up" },
    { metric: "Refund Rate", current: "0.73%", previous: "0.61%", change: "+0.12%", status: "down" },
    { metric: "Profit Margin", current: "23.6%", previous: "21.5%", change: "+2.1%", status: "up" },
];

// Revenue Leaderboard
const topOutlets = [
    { name: "Renova Dhanmondi", revenue: "৳12.5M", growth: "+15.6%", share: "32.5%", color: "#014fa1" },
    { name: "Renova Mirpur", revenue: "৳9.8M", growth: "+12.4%", share: "25.5%", color: "#428a26" },
    { name: "Renova Chattogram", revenue: "৳7.2M", growth: "+10.7%", share: "18.7%", color: "#7c3aed" },
    { name: "Renova Sylhet", revenue: "৳5.8M", growth: "+9.3%", share: "15.1%", color: "#0891b2" },
    { name: "Renova Uttara", revenue: "৳3.2M", growth: "-2.1%", share: "8.2%", color: "#ea580c" },
];

const topServices = [
    { name: "General Consultation", revenue: "৳12.5M", growth: "+14.2%", share: "32.5%", color: "#014fa1" },
    { name: "Specialist Visit", revenue: "৳9.2M", growth: "+8.4%", share: "23.9%", color: "#428a26" },
    { name: "Diagnostic Tests", revenue: "৳7.8M", growth: "+11.3%", share: "20.3%", color: "#7c3aed" },
    { name: "Dental Care", revenue: "৳5.4M", growth: "+6.2%", share: "14.0%", color: "#0891b2" },
    { name: "Physiotherapy", revenue: "৳3.6M", growth: "+18.7%", share: "9.3%", color: "#ea580c" },
];

// ─── Sub-Components ──────────────────────────────────────────────

// ── Mini Sparkline ──
const MiniSparkline = ({ color }) => {
    const pts = "0,22 12,18 24,20 36,12 48,15 60,8 72,11 84,4";
    return (
        <svg viewBox="0 0 84 28" width="84" height="28" style={{ display: "block" }}>
            <defs>
                <linearGradient id={`rsg-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.18" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon fill={`url(#rsg-${color.replace("#", "")})`} points={`0,22 12,18 24,20 36,12 48,15 60,8 72,11 84,4 84,28 0,28`} />
            <polyline fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" points={pts} />
        </svg>
    );
};

// ── Progress Bar ──
const ProgressBar = ({ value, color, height = 6, showLabel = false }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {showLabel && <span style={{ fontSize: 11, fontWeight: 700, color: "#1e293b", minWidth: 32 }}>{value}%</span>}
        <div style={{ flex: 1, height, background: "#f1f5f9", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${value}%`, background: color, borderRadius: 99, transition: "width 0.8s ease" }} />
        </div>
        {!showLabel && <span style={{ fontSize: 10, fontWeight: 700, color: "#64748b", minWidth: 28 }}>{value}%</span>}
    </div>
);

// ── Status Badge ──
const StatusBadge = ({ type, label }) => {
    const config = {
        active: { bg: "#dcfce7", color: "#16a34a" },
        growth: { bg: "#dcfce7", color: "#16a34a" },
        decline: { bg: "#fee2e2", color: "#ef4444" },
        warning: { bg: "#fef3c7", color: "#d97706" },
        critical: { bg: "#fee2e2", color: "#ef4444" },
        stable: { bg: "#dbeafe", color: "#014fa1" },
    };
    const c = config[type] || config.active;
    return (
        <span className="rv-status-badge" style={{ background: c.bg, color: c.color }}>
            <span className="rv-status-dot" style={{ background: c.color }} />
            {label || type}
        </span>
    );
};

// ── Section Title ──
const SectionTitle = ({ icon: Icon, iconBg, iconColor, title, subtitle, action }) => (
    <div className="rv-section-title">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="rv-title-icon" style={{ background: iconBg, color: iconColor }}>
                <Icon size={16} />
            </div>
            <div>
                <h2 className="rv-title-text">{title}</h2>
                {subtitle && <p className="rv-title-sub">{subtitle}</p>}
            </div>
        </div>
        {action && <div className="rv-title-action">{action}</div>}
    </div>
);

// ── KPI Card ──
const KPICard = ({ label, value, change, trend, sub, icon: Icon, color, bg }) => (
    <motion.div className="rv-kpi-card" variants={itemVariants} whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(4,65,125,0.12)" }}>
        <div className="rv-kpi-top">
            <div className="rv-kpi-icon" style={{ background: bg }}>
                <Icon size={17} color={color} />
            </div>
            <div className={`rv-kpi-badge ${trend === "up" ? "rv-kpi-badge--up" : "rv-kpi-badge--down"}`}>
                {trend === "up" ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                {change}
            </div>
        </div>
        <div className="rv-kpi-value">{value}</div>
        <div className="rv-kpi-label">{label}</div>
        <div className="rv-kpi-sub">{sub}</div>
        <div className="rv-kpi-spark">
            <MiniSparkline color={color} />
        </div>
    </motion.div>
);

// ── Skeleton KPI ──
const SkeletonKPI = () => (
    <div className="rv-kpi-card rv-skeleton-card">
        <div className="rv-sk rv-sk--icon" />
        <div className="rv-sk rv-sk--val" />
        <div className="rv-sk rv-sk--lbl" />
        <div className="rv-sk rv-sk--spark" />
    </div>
);

// ── Revenue Chart ──
const RevenueChart = ({ data, height = 200, showForecast = true }) => {
    const maxVal = Math.max(...data.map(d => Math.max(d.revenue, d.forecast || 0))) * 1.15;
    const points = data.map((d, i) =>
        `${(i / (data.length - 1)) * 100},${100 - (d.revenue / maxVal) * 85 - 5}`
    ).join(" ");
    const forecastPoints = data.map((d, i) =>
        `${(i / (data.length - 1)) * 100},${100 - ((d.forecast || d.revenue) / maxVal) * 85 - 5}`
    ).join(" ");

    return (
        <div className="rv-chart-container" style={{ height }}>
            <svg viewBox={`0 0 100 100`} width="100%" height="100%" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="rv-revenue-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#014fa1" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#014fa1" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="rv-forecast-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {/* Grid lines */}
                {[20, 40, 60, 80].map(y => (
                    <line key={y} x1="0" y1={100 - y} x2="100" y2={100 - y} stroke="#f1f5f9" strokeWidth="0.3" strokeDasharray="2,2" />
                ))}
                {/* Revenue Area */}
                <polygon fill="url(#rv-revenue-grad)" points={`0,100 ${points} 100,100`} />
                {/* Revenue Line */}
                <polyline fill="none" stroke="#014fa1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
                {/* Forecast Line (dashed) */}
                {showForecast && (
                    <polyline fill="none" stroke="#7c3aed" strokeWidth="2" strokeDasharray="4,3" strokeLinecap="round" strokeLinejoin="round" points={forecastPoints} />
                )}
                {/* Data points */}
                {data.map((d, i) => {
                    const x = (i / (data.length - 1)) * 100;
                    const y = 100 - (d.revenue / maxVal) * 85 - 5;
                    return (
                        <circle key={i} cx={x} cy={y} r="1.5" fill="#014fa1" />
                    );
                })}
            </svg>
            {/* Month labels */}
            <div className="rv-chart-labels">
                {data.map((d, i) => (
                    <span key={i} className="rv-chart-label">{d.month}</span>
                ))}
            </div>
            <div className="rv-chart-legend">
                <span><span className="rv-legend-dot" style={{ background: "#014fa1" }} /> Revenue</span>
                {showForecast && <span><span className="rv-legend-dot" style={{ background: "#7c3aed", border: "2px dashed #7c3aed" }} /> Forecast</span>}
            </div>
        </div>
    );
};

// ── Donut Chart ──
const DonutChart = ({ data, total, label }) => {
    const circumference = 2 * Math.PI * 40;
    let offset = 0;
    const elements = data.map((item, i) => {
        const dash = (item.percent / 100) * circumference;
        const element = (
            <circle
                key={i}
                cx="50" cy="50" r="40"
                fill="none"
                stroke={item.color}
                strokeWidth="14"
                strokeDasharray={`${dash} ${circumference}`}
                strokeDashoffset={-offset}
                style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%", transition: "stroke-dashoffset 1s ease" }}
            />
        );
        offset += dash;
        return element;
    });

    return (
        <div className="rv-donut-wrapper">
            <svg viewBox="0 0 100 100" width={140} height={140}>
                {elements}
                <text x="50" y="46" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1e293b">{total}</text>
                <text x="50" y="58" textAnchor="middle" fontSize="7" fill="#64748b">{label}</text>
            </svg>
        </div>
    );
};

// ── Revenue Table ──
const RevenueTable = ({ data, columns, visibleColumns = {} }) => {
    return (
        <div className="rv-table-wrapper">
            <table className="rv-table">
                <thead>
                    <tr>
                        {columns.map((col, i) => (
                            <th key={i} style={{ display: visibleColumns[col.key] !== false ? "table-cell" : "none" }}>
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i}>
                            {columns.map((col, j) => (
                                <td key={j} style={{ display: visibleColumns[col.key] !== false ? "table-cell" : "none" }}>
                                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// ─── Main Page ───────────────────────────────────────────────────
export default function RevenueAnalyticsPage() {
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [dateRange, setDateRange] = useState({ start: "2026-01-01", end: "2026-06-22" });
    const [comparePeriod, setComparePeriod] = useState("previous");
    const [selectedOutlet, setSelectedOutlet] = useState("all");
    const [selectedDepartment, setSelectedDepartment] = useState("all");
    const [selectedService, setSelectedService] = useState("all");
    const [selectedConsultationType, setSelectedConsultationType] = useState("all");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("all");
    const [selectedRegion, setSelectedRegion] = useState("all");
    const [filterOpen, setFilterOpen] = useState(false);
    const [showForecast, setShowForecast] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(t);
    }, []);

    const handleRefresh = () => {
        setLoading(true);
        setRefreshKey(prev => prev + 1);
        setLastUpdated(new Date());
        setTimeout(() => setLoading(false), 800);
    };

    // ── Filter State ──
    const filters = {
        search,
        dateRange,
        outlet: selectedOutlet,
        department: selectedDepartment,
        service: selectedService,
        consultationType: selectedConsultationType,
        paymentMethod: selectedPaymentMethod,
        region: selectedRegion,
    };

    const resetFilters = () => {
        setSearch("");
        setSelectedOutlet("all");
        setSelectedDepartment("all");
        setSelectedService("all");
        setSelectedConsultationType("all");
        setSelectedPaymentMethod("all");
        setSelectedRegion("all");
    };

    // ── Table Columns ──
    const tableColumns = [
        { key: "category", label: "Category" },
        { key: "revenue", label: "Revenue" },
        { key: "growth", label: "Growth" },
        { key: "appointments", label: "Appointments" },
        { key: "avgRevenue", label: "Avg Revenue" },
        { key: "refund", label: "Refund" },
        { key: "collection", label: "Collection Rate" },
        { key: "profit", label: "Profit Margin" },
        { key: "status", label: "Status" },
    ];

    const [visibleCols, setVisibleCols] = useState({
        category: true,
        revenue: true,
        growth: true,
        appointments: true,
        avgRevenue: true,
        refund: true,
        collection: true,
        profit: true,
        status: true,
    });

    // ── Table Data ──
    const tableData = [
        {
            category: "Dhanmondi",
            revenue: "৳12.5M",
            growth: "+15.6%",
            appointments: "2,543",
            avgRevenue: "৳4,915",
            refund: "৳0.09M",
            collection: "96%",
            profit: "28.5%",
            status: "growth",
            growthVal: 15.6
        },
        {
            category: "Mirpur",
            revenue: "৳9.8M",
            growth: "+12.4%",
            appointments: "2,187",
            avgRevenue: "৳4,481",
            refund: "৳0.07M",
            collection: "93%",
            profit: "25.2%",
            status: "growth",
            growthVal: 12.4
        },
        {
            category: "Chattogram",
            revenue: "৳7.2M",
            growth: "+10.7%",
            appointments: "1,932",
            avgRevenue: "৳3,727",
            refund: "৳0.06M",
            collection: "91%",
            profit: "23.8%",
            status: "growth",
            growthVal: 10.7
        },
        {
            category: "Sylhet",
            revenue: "৳5.8M",
            growth: "+9.3%",
            appointments: "1,721",
            avgRevenue: "৳3,370",
            refund: "৳0.05M",
            collection: "89%",
            profit: "21.4%",
            status: "stable",
            growthVal: 9.3
        },
        {
            category: "Uttara",
            revenue: "৳3.2M",
            growth: "-2.1%",
            appointments: "1,480",
            avgRevenue: "৳2,162",
            refund: "৳0.04M",
            collection: "82%",
            profit: "15.6%",
            status: "decline",
            growthVal: -2.1
        },
    ];

    // ── Render ──
    return (
        <motion.div className="rv-page" initial="hidden" animate="visible" variants={containerVariants}>

            {/* ── Page Header ────────────────────────────── */}
            <motion.div className="rv-header" variants={itemVariants}>
                <div className="rv-header-left">
                    <div className="rv-live-badge">
                        <span className="rv-live-dot" />
                        <span>Live</span>
                    </div>
                    <h1 className="rv-page-title">Revenue Analytics</h1>
                    <p className="rv-page-sub">
                        Last updated: {lastUpdated.toLocaleTimeString()} · All financial data is real-time aggregated
                    </p>
                </div>
                <div className="rv-header-actions">
                    <input
                        type="date"
                        className="rv-ctrl-input"
                        value={dateRange.start}
                        onChange={e => setDateRange({ ...dateRange, start: e.target.value })}
                        title="Start Date"
                    />
                    <input
                        type="date"
                        className="rv-ctrl-input"
                        value={dateRange.end}
                        onChange={e => setDateRange({ ...dateRange, end: e.target.value })}
                        title="End Date"
                    />
                    <select className="rv-ctrl-select" value={comparePeriod} onChange={e => setComparePeriod(e.target.value)}>
                        <option value="previous">vs Previous Period</option>
                        <option value="lastyear">vs Same Period Last Year</option>
                    </select>
                    <button className="rv-btn-ghost" onClick={handleRefresh} title="Refresh">
                        <RefreshCw size={14} className={loading ? "rv-spin" : ""} />
                    </button>
                    <button className="rv-btn-ghost" title="Export Excel"><Download size={14} /> <span>Excel</span></button>
                    <button className="rv-btn-ghost" title="Export PDF"><FileText size={14} /> <span>PDF</span></button>
                    <button className="rv-btn-primary" title="Share Report"><Share2 size={14} /> Share</button>
                </div>
            </motion.div>

            {/* ── Smart Filters ───────────────────────────── */}
            <motion.div className="rv-filters" variants={itemVariants}>
                <div className="rv-filter-search">
                    <Search size={14} color="#94a3b8" />
                    <input
                        type="text"
                        placeholder="Search revenue categories..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    {search && <button onClick={() => setSearch("")}><X size={12} /></button>}
                </div>
                <select className="rv-ctrl-select" value={selectedOutlet} onChange={e => setSelectedOutlet(e.target.value)}>
                    <option value="all">All Outlets</option>
                    <option value="dhanmondi">Dhanmondi</option>
                    <option value="mirpur">Mirpur</option>
                    <option value="chattogram">Chattogram</option>
                    <option value="sylhet">Sylhet</option>
                    <option value="uttara">Uttara</option>
                </select>
                <select className="rv-ctrl-select" value={selectedDepartment} onChange={e => setSelectedDepartment(e.target.value)}>
                    <option value="all">All Departments</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="orthopedics">Orthopedics</option>
                    <option value="neurology">Neurology</option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="gynecology">Gynecology</option>
                </select>
                <select className="rv-ctrl-select" value={selectedService} onChange={e => setSelectedService(e.target.value)}>
                    <option value="all">All Services</option>
                    <option value="general">General Consultation</option>
                    <option value="specialist">Specialist Visit</option>
                    <option value="diagnostic">Diagnostic Tests</option>
                    <option value="dental">Dental Care</option>
                    <option value="physiotherapy">Physiotherapy</option>
                </select>
                <select className="rv-ctrl-select" value={selectedConsultationType} onChange={e => setSelectedConsultationType(e.target.value)}>
                    <option value="all">All Consultation Types</option>
                    <option value="physical">Physical</option>
                    <option value="video">Video</option>
                </select>
                <select className="rv-ctrl-select" value={selectedPaymentMethod} onChange={e => setSelectedPaymentMethod(e.target.value)}>
                    <option value="all">All Payment Methods</option>
                    <option value="bkash">Bkash</option>
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="insurance">Insurance</option>
                </select>
                <div className="rv-filter-actions">
                    <button className="rv-btn-ghost" onClick={resetFilters}>
                        <RotateCcw size={13} /> Reset
                    </button>
                    <button className="rv-btn-primary" style={{ padding: "7px 14px" }}>
                        <Save size={13} /> Save
                    </button>
                </div>
            </motion.div>

            {/* ── Executive KPI Cards ─────────────────────── */}
            <motion.section className="rv-section" variants={itemVariants}>
                <SectionTitle
                    icon={Zap}
                    iconBg="#fef3c7"
                    iconColor="#d97706"
                    title="Executive KPIs"
                    subtitle="Real-time financial performance metrics"
                />
                <motion.div className="rv-kpi-grid" variants={containerVariants}>
                    {loading
                        ? Array(15).fill(0).map((_, i) => <SkeletonKPI key={i} />)
                        : kpiData.map((k, i) => <KPICard key={i} {...k} />)
                    }
                </motion.div>
            </motion.section>

            {/* ── Revenue Trend + Forecast ─────────────────── */}
            <motion.section className="rv-section" variants={itemVariants}>
                <div className="rv-two-col">
                    <motion.div className="rv-card" variants={itemVariants}>
                        <SectionTitle
                            icon={ChartLine}
                            iconBg="#dbeafe"
                            iconColor="#014fa1"
                            title="Revenue Trend & Forecast"
                            subtitle="Monthly revenue with AI-powered forecast"
                            action={
                                <button
                                    className={`rv-toggle-btn ${showForecast ? "rv-toggle-btn--active" : ""}`}
                                    onClick={() => setShowForecast(!showForecast)}
                                >
                                    <LineChart size={14} /> Forecast
                                </button>
                            }
                        />
                        <RevenueChart data={revenueTrend} height={220} showForecast={showForecast} />
                    </motion.div>

                    <motion.div className="rv-card" variants={itemVariants}>
                        <SectionTitle
                            icon={TrendingUp}
                            iconBg="#dcfce7"
                            iconColor="#16a34a"
                            title="Growth Metrics"
                            subtitle="Revenue growth indicators"
                        />
                        <div className="rv-growth-grid">
                            {growthMetrics.map((g, i) => (
                                <div key={i} className="rv-growth-card">
                                    <div className="rv-growth-icon" style={{ color: g.color }}>
                                        <g.icon size={18} />
                                    </div>
                                    <div className="rv-growth-value">{g.value}</div>
                                    <div className="rv-growth-label">{g.label}</div>
                                    <div className="rv-growth-change" style={{ color: g.change.startsWith("+") ? "#16a34a" : "#ef4444" }}>
                                        {g.change}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Revenue Breakdown ───────────────────────── */}
            <motion.section className="rv-section" variants={itemVariants}>
                <SectionTitle
                    icon={PieChart}
                    iconBg="#ede9fe"
                    iconColor="#7c3aed"
                    title="Revenue Breakdown"
                    subtitle="Revenue distribution by multiple dimensions"
                />
                <div className="rv-three-col">
                    {/* By Outlet */}
                    <motion.div className="rv-card" variants={itemVariants}>
                        <h3 className="rv-card-subtitle">By Outlet</h3>
                        <div className="rv-breakdown-list">
                            {revenueByOutlet.map((item, i) => (
                                <div key={i} className="rv-breakdown-item">
                                    <div className="rv-breakdown-meta">
                                        <span className="rv-breakdown-name">{item.name}</span>
                                        <span className="rv-breakdown-val">৳{item.revenue}M</span>
                                    </div>
                                    <ProgressBar value={item.percent} color={item.color} height={6} />
                                    <div className="rv-breakdown-sub">
                                        <span>{item.growth}% growth</span>
                                        <span>{item.appointments.toLocaleString()} appts</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* By Service */}
                    <motion.div className="rv-card" variants={itemVariants}>
                        <h3 className="rv-card-subtitle">By Service</h3>
                        <div className="rv-breakdown-list">
                            {revenueByService.map((item, i) => (
                                <div key={i} className="rv-breakdown-item">
                                    <div className="rv-breakdown-meta">
                                        <span className="rv-breakdown-name">{item.name}</span>
                                        <span className="rv-breakdown-val">৳{item.revenue}M</span>
                                    </div>
                                    <ProgressBar value={item.percent} color={item.color} height={6} />
                                    <div className="rv-breakdown-sub">
                                        <span>{item.growth}% growth</span>
                                        <span>{item.appointments.toLocaleString()} appts</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* By Department */}
                    <motion.div className="rv-card" variants={itemVariants}>
                        <h3 className="rv-card-subtitle">By Department</h3>
                        <div className="rv-breakdown-list">
                            {revenueByDepartment.map((item, i) => (
                                <div key={i} className="rv-breakdown-item">
                                    <div className="rv-breakdown-meta">
                                        <span className="rv-breakdown-name">{item.name}</span>
                                        <span className="rv-breakdown-val">৳{item.revenue}M</span>
                                    </div>
                                    <ProgressBar value={item.percent} color={item.color} height={6} />
                                    <div className="rv-breakdown-sub">
                                        <span>{item.growth}% growth</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Consultation Type + Payment Method ────── */}
            <motion.section className="rv-section" variants={itemVariants}>
                <div className="rv-two-col">
                    {/* Consultation Type */}
                    <motion.div className="rv-card" variants={itemVariants}>
                        <h3 className="rv-card-subtitle">Consultation Type Revenue</h3>
                        <div className="rv-consult-types">
                            {consultationTypes.map((type, i) => (
                                <div key={i} className="rv-consult-item">
                                    <div className="rv-consult-header">
                                        <span className="rv-consult-name">{type.name}</span>
                                        <span className="rv-consult-revenue">৳{type.revenue}M</span>
                                    </div>
                                    <ProgressBar value={type.percent} color={type.color} height={8} showLabel />
                                    <div className="rv-consult-sub">
                                        <span>{type.growth}% growth</span>
                                        <span>{type.percent}% of total</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Payment Methods */}
                    <motion.div className="rv-card" variants={itemVariants}>
                        <h3 className="rv-card-subtitle">Payment Method Distribution</h3>
                        <div className="rv-payment-section">
                            <div className="rv-payment-donut">
                                <DonutChart data={paymentMethods} total="৳38.5M" label="Total Revenue" />
                            </div>
                            <div className="rv-payment-list">
                                {paymentMethods.map((pm, i) => (
                                    <div key={i} className="rv-payment-item">
                                        <span className="rv-legend-dot" style={{ background: pm.color }} />
                                        <span className="rv-payment-name">{pm.name}</span>
                                        <span className="rv-payment-revenue">{pm.revenue}M</span>
                                        <span className="rv-payment-percent">{pm.percent}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Collections + Profitability ────────────── */}
            <motion.section className="rv-section" variants={itemVariants}>
                <div className="rv-two-col">
                    {/* Collections Analytics */}
                    <motion.div className="rv-card" variants={itemVariants}>
                        <SectionTitle
                            icon={Wallet}
                            iconBg="#dcfce7"
                            iconColor="#16a34a"
                            title="Collections Analytics"
                            subtitle="Collection trend and pending status"
                        />
                        <div className="rv-collection-grid">
                            {[
                                { label: "Collection Rate", value: "94.5%", change: "+1.2%", color: "#16a34a" },
                                { label: "Pending Amount", value: "৳2.1M", change: "-8.4%", color: "#f59e0b" },
                                { label: "Avg Collection Time", value: "4.2 days", change: "-0.8d", color: "#014fa1" },
                                { label: "Overdue Payments", value: "৳0.8M", change: "+5.2%", color: "#ef4444" },
                            ].map((item, i) => (
                                <div key={i} className="rv-collection-card">
                                    <div className="rv-collection-label">{item.label}</div>
                                    <div className="rv-collection-value" style={{ color: item.color }}>{item.value}</div>
                                    <div className={`rv-collection-change ${item.change.startsWith("+") ? "rv-change--up" : "rv-change--down"}`}>
                                        {item.change}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="rv-collection-trend">
                            <h4 className="rv-collection-trend-title">Monthly Collection Trend</h4>
                            <div className="rv-collection-bars">
                                {collectionTrend.map((d, i) => (
                                    <div key={i} className="rv-collection-bar-group">
                                        <div className="rv-collection-bar-wrap">
                                            <div
                                                className="rv-collection-bar rv-collection-bar--collected"
                                                style={{ height: `${(d.collected / 40) * 100}%` }}
                                                title={`Collected: ৳${d.collected}M`}
                                            />
                                            <div
                                                className="rv-collection-bar rv-collection-bar--pending"
                                                style={{ height: `${(d.pending / 40) * 100}%` }}
                                                title={`Pending: ৳${d.pending}M`}
                                            />
                                        </div>
                                        <span className="rv-collection-bar-label">{d.month}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="rv-chart-legend" style={{ marginTop: 8 }}>
                                <span><span className="rv-legend-dot" style={{ background: "#16a34a" }} /> Collected</span>
                                <span><span className="rv-legend-dot" style={{ background: "#f59e0b" }} /> Pending</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Profitability */}
                    <motion.div className="rv-card" variants={itemVariants}>
                        <SectionTitle
                            icon={PiggyBank}
                            iconBg="#ffedd5"
                            iconColor="#ea580c"
                            title="Profitability Analysis"
                            subtitle="Revenue vs expense and profit trends"
                        />
                        <div className="rv-profit-grid">
                            {[
                                { label: "Gross Profit", value: "৳9.2M", change: "+15.3%", color: "#16a34a" },
                                { label: "Net Profit", value: "৳7.6M", change: "+14.8%", color: "#014fa1" },
                                { label: "Profit Margin", value: "23.6%", change: "+2.1%", color: "#7c3aed" },
                                { label: "Operating Cost", value: "৳6.4M", change: "+5.2%", color: "#ea580c" },
                            ].map((item, i) => (
                                <div key={i} className="rv-profit-card">
                                    <div className="rv-profit-label">{item.label}</div>
                                    <div className="rv-profit-value" style={{ color: item.color }}>{item.value}</div>
                                    <div className={`rv-profit-change ${item.change.startsWith("+") ? "rv-change--up" : "rv-change--down"}`}>
                                        {item.change}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="rv-profit-chart">
                            <h4 className="rv-profit-chart-title">Revenue vs Expense Trend</h4>
                            <div className="rv-profit-bars">
                                {profitabilityData.map((d, i) => (
                                    <div key={i} className="rv-profit-bar-group">
                                        <div className="rv-profit-bar-wrap">
                                            <div
                                                className="rv-profit-bar rv-profit-bar--revenue"
                                                style={{ height: `${(d.revenue / 45) * 100}%` }}
                                                title={`Revenue: ৳${d.revenue}M`}
                                            />
                                            <div
                                                className="rv-profit-bar rv-profit-bar--expense"
                                                style={{ height: `${(d.expense / 45) * 100}%` }}
                                                title={`Expense: ৳${d.expense}M`}
                                            />
                                        </div>
                                        <span className="rv-profit-bar-label">{d.month}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="rv-chart-legend" style={{ marginTop: 8 }}>
                                <span><span className="rv-legend-dot" style={{ background: "#014fa1" }} /> Revenue</span>
                                <span><span className="rv-legend-dot" style={{ background: "#ef4444" }} /> Expense</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Refund + Geographic ────────────────────── */}
            <motion.section className="rv-section" variants={itemVariants}>
                <div className="rv-two-col">
                    {/* Refund Analytics */}
                    <motion.div className="rv-card" variants={itemVariants}>
                        <SectionTitle
                            icon={RotateCcw}
                            iconBg="#fee2e2"
                            iconColor="#ef4444"
                            title="Refund & Adjustment Analytics"
                            subtitle="Monthly refund trends and impact"
                        />
                        <div className="rv-refund-metrics">
                            {[
                                { label: "Total Refunds", value: "৳0.28M", change: "+4.2%", color: "#ef4444" },
                                { label: "Refund Rate", value: "0.73%", change: "+0.12%", color: "#f59e0b" },
                                { label: "Avg Refund Value", value: "৳2,450", change: "+3.8%", color: "#ea580c" },
                                { label: "Refund Count", value: "114", change: "+8.6%", color: "#7c3aed" },
                            ].map((item, i) => (
                                <div key={i} className="rv-refund-card">
                                    <div className="rv-refund-label">{item.label}</div>
                                    <div className="rv-refund-value" style={{ color: item.color }}>{item.value}</div>
                                    <div className={`rv-refund-change ${item.change.startsWith("+") ? "rv-change--up" : "rv-change--down"}`}>
                                        {item.change}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="rv-refund-trend">
                            <h4 className="rv-refund-trend-title">Monthly Refund Trend</h4>
                            <div className="rv-refund-bars">
                                {refundData.map((d, i) => (
                                    <div key={i} className="rv-refund-bar-group">
                                        <div className="rv-refund-bar-wrap">
                                            <div
                                                className="rv-refund-bar"
                                                style={{ height: `${(d.amount / 0.35) * 100}%` }}
                                                title={`Refund: ৳${d.amount}M (${d.percent}%)`}
                                            />
                                        </div>
                                        <span className="rv-refund-bar-label">{d.month}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Geographic Revenue */}
                    <motion.div className="rv-card" variants={itemVariants}>
                        <SectionTitle
                            icon={MapPin}
                            iconBg="#cffafe"
                            iconColor="#0891b2"
                            title="Geographic Revenue"
                            subtitle="Revenue distribution by region"
                        />
                        <div className="rv-geo-list">
                            {geographicRevenue.map((item, i) => (
                                <div key={i} className="rv-geo-item">
                                    <div className="rv-geo-meta">
                                        <span className="rv-geo-name">{item.region}</span>
                                        <div style={{ textAlign: "right" }}>
                                            <div className="rv-geo-revenue">৳{item.revenue}M</div>
                                            <div className="rv-geo-percent">{item.percent}% of total</div>
                                        </div>
                                    </div>
                                    <ProgressBar value={item.percent} color={item.color} height={8} />
                                </div>
                            ))}
                        </div>
                        <div className="rv-geo-stats">
                            <div className="rv-geo-stat">
                                <span className="rv-geo-stat-label">Top Region</span>
                                <span className="rv-geo-stat-value">Dhaka (58.4%)</span>
                            </div>
                            <div className="rv-geo-stat">
                                <span className="rv-geo-stat-label">Fastest Growing</span>
                                <span className="rv-geo-stat-value" style={{ color: "#16a34a" }}>Chattogram (+15.2%)</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── AI Insights ─────────────────────────────── */}
            <motion.section className="rv-section" variants={itemVariants}>
                <div className="rv-two-col">
                    <motion.div className="rv-card" variants={itemVariants}>
                        <SectionTitle
                            icon={Brain}
                            iconBg="#ede9fe"
                            iconColor="#7c3aed"
                            title="AI Financial Insights"
                            subtitle="Intelligent revenue analysis and recommendations"
                        />
                        <div className="rv-insights-list">
                            {insights.map((ins, i) => (
                                <div key={i} className={`rv-insight-item rv-insight--${ins.type}`}>
                                    <div className="rv-insight-icon"><InsightIcon type={ins.type} /></div>
                                    <div>
                                        <div className="rv-insight-title">{ins.title}</div>
                                        <div className="rv-insight-text">{ins.text}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="rv-card" variants={itemVariants}>
                        <SectionTitle
                            icon={Bell}
                            iconBg="#fee2e2"
                            iconColor="#ef4444"
                            title="Financial Alerts"
                            action={<span className="rv-alert-count">{alerts.filter(a => a.type === "error").length} Critical</span>}
                        />
                        <div className="rv-alerts-list">
                            {alerts.map((a, i) => (
                                <div key={i} className={`rv-alert-item rv-insight--${a.type}`}>
                                    <div className="rv-insight-icon"><AlertTriangle size={15} /></div>
                                    <div style={{ flex: 1 }}>
                                        <div className="rv-alert-header">
                                            <span className="rv-insight-title">{a.title}</span>
                                            <span className="rv-alert-time">{a.time}</span>
                                        </div>
                                        <div className="rv-insight-text">{a.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Leaderboards ────────────────────────────── */}
            <motion.section className="rv-section" variants={itemVariants}>
                <SectionTitle
                    icon={Award}
                    iconBg="#fef3c7"
                    iconColor="#d97706"
                    title="Revenue Leaderboards"
                    subtitle="Top performing categories"
                />
                <div className="rv-two-col">
                    <motion.div className="rv-card" variants={itemVariants}>
                        <h3 className="rv-card-subtitle">Top Revenue Outlets</h3>
                        <div className="rv-leaderboard">
                            {topOutlets.map((item, i) => (
                                <div key={i} className={`rv-leaderboard-item ${i === 0 ? "rv-leaderboard-item--first" : ""}`}>
                                    <div className="rv-leaderboard-rank">{i + 1}</div>
                                    <div className="rv-leaderboard-info">
                                        <span className="rv-leaderboard-name">{item.name}</span>
                                        <span className="rv-leaderboard-share">{item.share}</span>
                                    </div>
                                    <div className="rv-leaderboard-right">
                                        <span className="rv-leaderboard-revenue">{item.revenue}</span>
                                        <span className={`rv-leaderboard-growth ${item.growth.startsWith("+") ? "rv-growth--up" : "rv-growth--down"}`}>
                                            {item.growth}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="rv-card" variants={itemVariants}>
                        <h3 className="rv-card-subtitle">Top Revenue Services</h3>
                        <div className="rv-leaderboard">
                            {topServices.map((item, i) => (
                                <div key={i} className={`rv-leaderboard-item ${i === 0 ? "rv-leaderboard-item--first" : ""}`}>
                                    <div className="rv-leaderboard-rank">{i + 1}</div>
                                    <div className="rv-leaderboard-info">
                                        <span className="rv-leaderboard-name">{item.name}</span>
                                        <span className="rv-leaderboard-share">{item.share}</span>
                                    </div>
                                    <div className="rv-leaderboard-right">
                                        <span className="rv-leaderboard-revenue">{item.revenue}</span>
                                        <span className={`rv-leaderboard-growth ${item.growth.startsWith("+") ? "rv-growth--up" : "rv-growth--down"}`}>
                                            {item.growth}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Revenue Comparison Table ─────────────────── */}
            <motion.section className="rv-section" variants={itemVariants}>
                <SectionTitle
                    icon={BarChart3}
                    iconBg="#dbeafe"
                    iconColor="#014fa1"
                    title="Revenue Comparison"
                    subtitle="Current vs previous period analysis"
                />
                <motion.div className="rv-card" variants={itemVariants}>
                    <div className="rv-comp-wrapper">
                        <table className="rv-comp-table">
                            <thead>
                                <tr>
                                    <th>Metric</th>
                                    <th>Current Period</th>
                                    <th>Previous Period</th>
                                    <th>Change</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((row, i) => (
                                    <tr key={i}>
                                        <td><strong>{row.metric}</strong></td>
                                        <td>{row.current}</td>
                                        <td>{row.previous}</td>
                                        <td className={row.status === "up" ? "rv-comp-positive" : "rv-comp-negative"}>
                                            {row.change}
                                        </td>
                                        <td>
                                            <StatusBadge
                                                type={row.status === "up" ? "growth" : "decline"}
                                                label={row.status === "up" ? "Improving" : "Declining"}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </motion.section>

            {/* ── Revenue Analytics Table ──────────────────── */}
            <motion.section className="rv-section" variants={itemVariants}>
                <SectionTitle
                    icon={Table}
                    iconBg="#f0fdf4"
                    iconColor="#16a34a"
                    title="Revenue Analytics Table"
                    subtitle="Comprehensive revenue data with sorting and filtering"
                    action={
                        <div style={{ display: "flex", gap: 8 }}>
                            <button className="rv-btn-ghost"><SlidersHorizontal size={13} /> Columns</button>
                            <button className="rv-btn-ghost"><Download size={13} /> Export</button>
                            <button className="rv-btn-primary"><FileText size={13} /> PDF</button>
                        </div>
                    }
                />
                <motion.div className="rv-card rv-table-card" variants={itemVariants}>
                    <RevenueTable
                        data={tableData}
                        columns={tableColumns}
                        visibleColumns={visibleCols}
                    />
                </motion.div>
            </motion.section>

        </motion.div>
    );
}

// ─── Helper: Insight Icon ──────────────────────────────────────
const InsightIcon = ({ type }) => {
    const map = { success: CheckCircle, warning: AlertTriangle, info: Info, error: XCircle };
    const Icon = map[type] || Info;
    return <Icon size={15} />;
};