// app/super-admin-panel/finance/commissions/page.jsx
"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./commission-analytics.css";
import {
    DollarSign, Calendar, Users, Star, TrendingUp, TrendingDown,
    Building2, Activity, Heart, Shield, Brain, Bell, CheckCircle,
    AlertTriangle, Info, XCircle, Download, FileText, Share2, RefreshCw,
    Eye, BarChart3, Search, Filter, ChevronDown, MapPin, Phone, Mail,
    Stethoscope, Clock, CheckSquare, XSquare, ArrowUpRight, ArrowDownRight,
    Target, Zap, CreditCard, RotateCcw, UserCheck, UserX, Percent,
    TrendingUp as Growth, AlertCircle, ChevronUp, ChevronLeft, ChevronRight,
    SlidersHorizontal, Save, MoreHorizontal, ExternalLink, X, Wifi,
    PieChart, Layers, Award, Package, Settings, Wallet, Banknote,
    PiggyBank, Receipt, Briefcase, Users2, Award as Trophy,
    CalendarDays, LineChart, Timer, ShieldCheck, Gauge,
    Wallet2, Coins, HandCoins, Landmark, BadgeDollarSign,
    ReceiptText, FileSpreadsheet, Printer, Send, ClockArrowUp,
    Hourglass, UserCog, Sparkles, Lightbulb, Megaphone, Flag
} from "lucide-react";

// ─── Animation Variants ─────────────────────────────────────────
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } }
};
const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
};
const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } }
};

// ─── Mock Data ──────────────────────────────────────────────────
const commissionKPIData = [
    { label: "Total Commission", value: "৳42.8M", change: "+15.3%", trend: "up", sub: "vs last month", icon: DollarSign, color: "#014fa1", bg: "#dbeafe" },
    { label: "Paid Commission", value: "৳31.2M", change: "+12.7%", trend: "up", sub: "73% of total", icon: CheckCircle, color: "#16a34a", bg: "#dcfce7" },
    { label: "Pending Commission", value: "৳8.6M", change: "+5.2%", trend: "up", sub: "20% of total", icon: Clock, color: "#f59e0b", bg: "#fef3c7" },
    { label: "Processing Commission", value: "৳3.0M", change: "-2.1%", trend: "down", sub: "7% in process", icon: RotateCcw, color: "#0891b2", bg: "#cffafe" },
    { label: "Outstanding Commission", value: "৳11.6M", change: "+4.8%", trend: "up", sub: "27% outstanding", icon: AlertCircle, color: "#ef4444", bg: "#fee2e2" },
    { label: "Commission Growth", value: "+15.3%", change: "+3.2%", trend: "up", sub: "accelerating", icon: TrendingUp, color: "#428a26", bg: "#dcfce7" },
    { label: "Avg Commission/Doctor", value: "৳428K", change: "+8.4%", trend: "up", sub: "per doctor", icon: Users, color: "#7c3aed", bg: "#ede9fe" },
    { label: "Avg Commission/Consult", value: "৳2,280", change: "+6.2%", trend: "up", sub: "per consultation", icon: Stethoscope, color: "#ea580c", bg: "#ffedd5" },
    { label: "Settlement Rate", value: "92.4%", change: "+2.1%", trend: "up", sub: "settled on time", icon: ShieldCheck, color: "#16a34a", bg: "#dcfce7" },
    { label: "Avg Settlement Time", value: "3.2 days", change: "-0.8 days", trend: "up", sub: "improving", icon: Timer, color: "#0891b2", bg: "#cffafe" },
    { label: "Total Incentives", value: "৳4.2M", change: "+18.6%", trend: "up", sub: "performance bonuses", icon: Trophy, color: "#f59e0b", bg: "#fef3c7" },
    { label: "Total Deductions", value: "৳1.8M", change: "+3.4%", trend: "up", sub: "adjustments", icon: XCircle, color: "#ef4444", bg: "#fee2e2" },
];

const commissionTrend = [
    { label: "Jan", commission: 32, paid: 24, pending: 6, processing: 2 },
    { label: "Feb", commission: 35, paid: 26, pending: 7, processing: 2 },
    { label: "Mar", commission: 30, paid: 22, pending: 5, processing: 3 },
    { label: "Apr", commission: 38, paid: 28, pending: 8, processing: 2 },
    { label: "May", commission: 36, paid: 27, pending: 6, processing: 3 },
    { label: "Jun", commission: 42, paid: 31, pending: 8, processing: 3 },
    { label: "Jul", commission: 40, paid: 29, pending: 7, processing: 4 },
    { label: "Aug", commission: 46, paid: 34, pending: 9, processing: 3 },
    { label: "Sep", commission: 43, paid: 32, pending: 8, processing: 3 },
    { label: "Oct", commission: 48, paid: 36, pending: 9, processing: 3 },
    { label: "Nov", commission: 45, paid: 34, pending: 8, processing: 3 },
    { label: "Dec", commission: 52, paid: 39, pending: 10, processing: 3 },
];

const doctorCommissionData = [
    { name: "Dr. Ahmed Khan", outlet: "Dhanmondi", dept: "Cardiology", commission: "৳825K", paid: "৳720K", pending: "৳105K", incentive: "৳45K", bonus: "৳15K", growth: "+18%", rating: 4.9, consultations: 342 },
    { name: "Dr. Fatima Rahman", outlet: "Mirpur", dept: "Neurology", commission: "৳710K", paid: "৳620K", pending: "৳90K", incentive: "৳38K", bonus: "৳12K", growth: "+14%", rating: 4.8, consultations: 298 },
    { name: "Dr. Mohammad Ali", outlet: "Chattogram", dept: "Orthopedics", commission: "৳650K", paid: "৳565K", pending: "৳85K", incentive: "৳32K", bonus: "৳10K", growth: "+12%", rating: 4.7, consultations: 275 },
    { name: "Dr. Nusrat Jahan", outlet: "Sylhet", dept: "Gynecology", commission: "৳590K", paid: "৳510K", pending: "৳80K", incentive: "৳28K", bonus: "৳8K", growth: "+10%", rating: 4.6, consultations: 248 },
    { name: "Dr. Kamal Hossain", outlet: "Uttara", dept: "Dermatology", commission: "৳520K", paid: "৳440K", pending: "৳80K", incentive: "৳22K", bonus: "৳6K", growth: "-2%", rating: 4.4, consultations: 210 },
    { name: "Dr. Sumaiya Akter", outlet: "Dhanmondi", dept: "Ophthalmology", commission: "৳480K", paid: "৳415K", pending: "৳65K", incentive: "৳20K", bonus: "৳5K", growth: "+8%", rating: 4.5, consultations: 195 },
];

const outletCommissionData = [
    { name: "Renova Dhanmondi", commission: "৳12.8M", paid: "৳9.6M", pending: "৳2.2M", processing: "৳1.0M", doctors: 18, growth: "+16%", percentage: 30 },
    { name: "Renova Mirpur", commission: "৳10.2M", paid: "৳7.8M", pending: "৳1.6M", processing: "৳0.8M", doctors: 14, growth: "+12%", percentage: 24 },
    { name: "Renova Chattogram", commission: "৳8.6M", paid: "৳6.5M", pending: "৳1.4M", processing: "৳0.7M", doctors: 11, growth: "+10%", percentage: 20 },
    { name: "Renova Sylhet", commission: "৳6.4M", paid: "৳4.8M", pending: "৳1.0M", processing: "৳0.6M", doctors: 9, growth: "+8%", percentage: 15 },
    { name: "Renova Uttara", commission: "৳4.8M", paid: "৳3.5M", pending: "৳0.9M", processing: "৳0.4M", doctors: 7, growth: "-3%", percentage: 11 },
];

const departmentCommissionData = [
    { name: "Cardiology", commission: "৳12.8M", percentage: 30, growth: "+18%", color: "#014fa1" },
    { name: "Neurology", commission: "৳9.4M", percentage: 22, growth: "+15%", color: "#428a26" },
    { name: "Orthopedics", commission: "৳8.2M", percentage: 19, growth: "+12%", color: "#7c3aed" },
    { name: "Gynecology", commission: "৳5.6M", percentage: 13, growth: "+10%", color: "#0891b2" },
    { name: "Dermatology", commission: "৳4.2M", percentage: 10, growth: "+6%", color: "#ea580c" },
    { name: "Ophthalmology", commission: "৳2.6M", percentage: 6, growth: "+4%", color: "#f59e0b" },
];

const specializationCommissionData = [
    { name: "Interventional", commission: "৳8.4M", percentage: 20, growth: "+22%" },
    { name: "Clinical", commission: "৳7.8M", percentage: 18, growth: "+16%" },
    { name: "Surgical", commission: "৳7.2M", percentage: 17, growth: "+14%" },
    { name: "Diagnostic", commission: "৳6.2M", percentage: 15, growth: "+11%" },
    { name: "Preventive", commission: "৳5.0M", percentage: 12, growth: "+8%" },
];

const payoutAnalytics = [
    { label: "Total Payouts", value: "৳31.2M", change: "+12.7%", color: "#16a34a" },
    { label: "Successful Payouts", value: "৳28.8M", change: "+13.2%", color: "#014fa1" },
    { label: "Failed Payouts", value: "৳2.4M", change: "-5.8%", color: "#ef4444" },
    { label: "Processing Payouts", value: "৳3.0M", change: "-2.1%", color: "#f59e0b" },
    { label: "Average Payout Time", value: "2.8 days", change: "-0.4d", color: "#0891b2" },
    { label: "Settlement Success Rate", value: "92.4%", change: "+2.1%", color: "#16a34a" },
];

const settlementData = [
    { status: "Completed", amount: "৳31.2M", percentage: 73, color: "#16a34a" },
    { status: "Pending", amount: "৳8.6M", percentage: 20, color: "#f59e0b" },
    { status: "Processing", amount: "৳3.0M", percentage: 7, color: "#0891b2" },
    { status: "Delayed", amount: "৳2.1M", percentage: 5, color: "#ef4444" },
];

const incentiveData = [
    { label: "Performance Bonus", amount: "৳2.8M", percentage: 67, color: "#f59e0b" },
    { label: "Special Incentive", amount: "৳0.9M", percentage: 21, color: "#7c3aed" },
    { label: "Retention Bonus", amount: "৳0.5M", percentage: 12, color: "#0891b2" },
];

const commissionLiabilities = [
    { label: "Outstanding Liability", value: "৳11.6M", change: "+4.8%", color: "#ef4444" },
    { label: "Pending Payments", value: "৳8.6M", change: "+5.2%", color: "#f59e0b" },
    { label: "Delayed Payments", value: "৳2.1M", change: "-3.4%", color: "#ef4444" },
    { label: "Upcoming Obligations", value: "৳4.5M", change: "+8.6%", color: "#7c3aed" },
    { label: "Cash Requirement", value: "৳6.8M", change: "+6.2%", color: "#014fa1" },
];

const comparisonData = [
    { metric: "Commission", current: "৳42.8M", previous: "৳37.1M", change: "+15.3%" },
    { metric: "Paid", current: "৳31.2M", previous: "৳27.7M", change: "+12.7%" },
    { metric: "Pending", current: "৳8.6M", previous: "৳8.2M", change: "+5.2%" },
    { metric: "Settlement Rate", current: "92.4%", previous: "90.3%", change: "+2.1%" },
    { metric: "Avg Commission/Doctor", current: "৳428K", previous: "৳395K", change: "+8.4%" },
];

const insights = [
    { type: "success", title: "Commission Growth", text: "Total commission increased 15.3% — driven by higher consultation volumes and incentive programs." },
    { type: "warning", title: "Outstanding Liability", text: "Outstanding commission grew 4.8% — ৳11.6M pending settlements need attention." },
    { type: "info", title: "Settlement Efficiency", text: "Average settlement time reduced to 3.2 days — 92.4% on-time settlements." },
    { type: "success", title: "Top Performers", text: "Dr. Ahmed Khan generated ৳825K in commission — highest among all doctors." },
    { type: "info", title: "Incentive Impact", text: "Performance bonuses increased 18.6% — positively correlated with revenue growth." },
    { type: "warning", title: "Payout Failures", text: "2.4M in failed payouts — check bank account verification and payment processing." },
];

const alerts = [
    { type: "error", title: "High Outstanding Commission", desc: "৳11.6M outstanding — exceeds 25% threshold. Immediate action required.", time: "1h ago" },
    { type: "error", title: "Payout Failure Alert", desc: "3 payouts failed in the last 24 hours — total ৳120K.", time: "3h ago" },
    { type: "warning", title: "Delayed Settlement", desc: "2 settlements delayed beyond 7 days — total ৳680K.", time: "5h ago" },
    { type: "warning", title: "Commission Adjustment", desc: "Large adjustment of ৳45K processed — review for accuracy.", time: "1d ago" },
    { type: "info", title: "Cash Requirement Update", desc: "Cash requirement increased to ৳6.8M for upcoming payouts.", time: "2d ago" },
];

// ─── Helpers ─────────────────────────────────────────────────────
const getScoreColor = (s) => s >= 90 ? "#16a34a" : s >= 80 ? "#014fa1" : s >= 70 ? "#f59e0b" : "#ef4444";
const getScoreBg = (s) => s >= 90 ? "#dcfce7" : s >= 80 ? "#dbeafe" : s >= 70 ? "#fef3c7" : "#fee2e2";

const statusConfig = {
    completed: { bg: "#dcfce7", color: "#16a34a", label: "Completed" },
    pending: { bg: "#fef3c7", color: "#f59e0b", label: "Pending" },
    processing: { bg: "#cffafe", color: "#0891b2", label: "Processing" },
    failed: { bg: "#fee2e2", color: "#ef4444", label: "Failed" },
    delayed: { bg: "#fee2e2", color: "#ef4444", label: "Delayed" },
};

// ─── Sub-Components ──────────────────────────────────────────────

const Sparkline = ({ data, color }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const w = 80, h = 28;
    const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * (h - 4) - 2}`).join(" ");
    return (
        <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={{ display: "block" }}>
            <polyline fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" points={pts} opacity="0.7" />
        </svg>
    );
};

const MiniSparkline = ({ color }) => {
    const pts = "0,22 12,18 24,20 36,12 48,15 60,8 72,11 84,4";
    return (
        <svg viewBox="0 0 84 28" width="84" height="28" style={{ display: "block" }}>
            <defs>
                <linearGradient id={`sg-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.18" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon fill={`url(#sg-${color.replace("#", "")})`} points={`0,22 12,18 24,20 36,12 48,15 60,8 72,11 84,4 84,28 0,28`} />
            <polyline fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" points={pts} />
        </svg>
    );
};

const ProgressBar = ({ value, color, height = 6, showLabel = false }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {showLabel && <span style={{ fontSize: 11, fontWeight: 700, color: "#1e293b", minWidth: 32 }}>{value}%</span>}
        <div style={{ flex: 1, height, background: "#f1f5f9", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${value}%`, background: color, borderRadius: 99, transition: "width 0.8s ease" }} />
        </div>
        {!showLabel && <span style={{ fontSize: 10, fontWeight: 700, color: "#64748b", minWidth: 28 }}>{value}%</span>}
    </div>
);

const StatusBadge = ({ status }) => {
    const c = statusConfig[status] || statusConfig.pending;
    return (
        <span className="op-status-badge" style={{ background: c.bg, color: c.color }}>
            <span className="op-status-dot" style={{ background: c.color }} />
            {c.label}
        </span>
    );
};

const InsightIcon = ({ type }) => {
    const map = { success: CheckCircle, warning: AlertTriangle, info: Info, error: XCircle };
    const Icon = map[type] || Info;
    return <Icon size={15} />;
};

const SectionTitle = ({ icon: Icon, iconBg, iconColor, title, subtitle, action }) => (
    <div className="op-section-title">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="op-title-icon" style={{ background: iconBg, color: iconColor }}>
                <Icon size={16} />
            </div>
            <div>
                <h2 className="op-title-text">{title}</h2>
                {subtitle && <p className="op-title-sub">{subtitle}</p>}
            </div>
        </div>
        {action && <div className="op-title-action">{action}</div>}
    </div>
);

const KPICard = ({ label, value, change, trend, sub, icon: Icon, color, bg }) => (
    <motion.div className="op-kpi-card" variants={itemVariants} whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(4,65,125,0.12)" }}>
        <div className="op-kpi-accent" style={{ background: color }} />
        <div className="op-kpi-body">
            <div className="op-kpi-top">
                <div className="op-kpi-icon" style={{ background: bg }}>
                    <Icon size={16} color={color} />
                </div>
                <div className={`op-kpi-badge ${trend === "up" ? "op-kpi-badge--up" : "op-kpi-badge--down"}`}>
                    {trend === "up" ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    {change}
                </div>
            </div>
            <div className="op-kpi-value">{value}</div>
            <div className="op-kpi-label">{label}</div>
            <div className="op-kpi-footer">
                <span className="op-kpi-trend-label">{sub}</span>
                <div className="op-kpi-spark">
                    <MiniSparkline color={color} />
                </div>
            </div>
        </div>
    </motion.div>
);

const SkeletonKPI = () => (
    <div className="op-kpi-card op-skeleton-card">
        <div className="op-sk" style={{ height: 3, borderRadius: 0, width: "100%" }} />
        <div className="op-kpi-body" style={{ gap: 8 }}>
            <div className="op-kpi-top">
                <div className="op-sk op-sk--icon" />
                <div className="op-sk" style={{ height: 20, width: 52, borderRadius: 20 }} />
            </div>
            <div className="op-sk op-sk--val" />
            <div className="op-sk op-sk--lbl" />
            <div className="op-sk op-sk--spark" style={{ marginTop: 6 }} />
        </div>
    </div>
);

const GaugeChart = ({ value, color, size = 100, label, max = 100 }) => {
    const r = 38, cx = 50, cy = 50;
    const circ = Math.PI * r;
    const offset = circ - (value / max) * circ;
    return (
        <div style={{ position: "relative", width: size, height: size / 2 + 10, overflow: "hidden" }}>
            <svg viewBox="0 0 100 60" width={size} height={size * 0.65}>
                <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="#f1f5f9" strokeWidth="9" strokeLinecap="round" />
                <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke={color} strokeWidth="9" strokeLinecap="round"
                    strokeDasharray={circ} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 1.2s ease" }} />
            </svg>
            <span style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", fontSize: 16, fontWeight: 800, color, lineHeight: 1 }}>{value}</span>
        </div>
    );
};

// ─── Main Page ───────────────────────────────────────────────────
export default function CommissionAnalyticsPage() {
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortCol, setSortCol] = useState(null);
    const [sortDir, setSortDir] = useState("asc");
    const [filterStatus, setFilterStatus] = useState("all");
    const [commissionFilter, setCommissionFilter] = useState("All Commissions");
    const [dateRange, setDateRange] = useState("lastMonth");
    const [comparePeriod, setComparePeriod] = useState("previous");
    const [departmentFilter, setDepartmentFilter] = useState("all");
    const [specializationFilter, setSpecializationFilter] = useState("all");
    const [outletFilter, setOutletFilter] = useState("all");
    const [doctorFilter, setDoctorFilter] = useState("all");
    const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");
    const [settlementStatusFilter, setSettlementStatusFilter] = useState("all");
    const [filterOpen, setFilterOpen] = useState(false);
    const [visibleCols, setVisibleCols] = useState({
        name: true, outlet: true, department: true, commission: true,
        paid: true, pending: true, incentive: true, bonus: true,
        growth: true, status: true, actions: true
    });
    const rowsPerPage = 5;

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 1400);
        return () => clearTimeout(t);
    }, []);

    const filtered = doctorCommissionData.filter(d => {
        const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.outlet.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === "all" || d.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const sorted = sortCol
        ? [...filtered].sort((a, b) => {
            const av = a[sortCol]; const bv = b[sortCol];
            if (typeof av === "number") return sortDir === "asc" ? av - bv : bv - av;
            return sortDir === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
        })
        : filtered;

    const paginated = sorted.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    const totalPages = Math.ceil(sorted.length / rowsPerPage);

    const handleSort = (col) => {
        if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
        else { setSortCol(col); setSortDir("asc"); }
    };

    const SortIcon = ({ col }) => (
        <span className="op-sort-icon">
            {sortCol === col ? (sortDir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />) : <ChevronDown size={12} style={{ opacity: 0.3 }} />}
        </span>
    );

    return (
        <motion.div className="op-page" initial="hidden" animate="visible" variants={containerVariants}>

            {/* ── Page Header ────────────────────────────── */}
            <motion.div className="op-header" variants={itemVariants}>
                <div className="op-header-left">
                    <div className="op-live-badge">
                        <span className="op-live-dot" />
                        <span>Live</span>
                    </div>
                    <h1 className="op-page-title">Commission Analytics</h1>
                    <p className="op-page-sub">Last updated 3 minutes ago · Real-time commission, payout, and settlement analytics</p>
                </div>
                <div className="op-header-actions">
                    <select className="op-ctrl-select" title="Date Range" value={dateRange} onChange={e => setDateRange(e.target.value)}>
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="last7days">Last 7 Days</option>
                        <option value="last30days">Last 30 Days</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="lastQuarter">Last Quarter</option>
                        <option value="lastYear">Last Year</option>
                        <option value="custom">Custom Range</option>
                    </select>
                    <select className="op-ctrl-select" title="Compare Period" value={comparePeriod} onChange={e => setComparePeriod(e.target.value)}>
                        <option value="previous">vs Previous Period</option>
                        <option value="lastYear">vs Same Period Last Year</option>
                    </select>
                    <select className="op-ctrl-select" title="Outlet" value={outletFilter} onChange={e => setOutletFilter(e.target.value)}>
                        <option value="all">All Outlets</option>
                        {outletCommissionData.map(o => <option key={o.name} value={o.name}>{o.name}</option>)}
                    </select>
                    <select className="op-ctrl-select" title="Department" value={departmentFilter} onChange={e => setDepartmentFilter(e.target.value)}>
                        <option value="all">All Departments</option>
                        {departmentCommissionData.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                    </select>
                    <button className="op-btn-ghost" title="Refresh"><RefreshCw size={14} /></button>
                    <button className="op-btn-ghost" title="Download Excel"><Download size={14} /> <span>Excel</span></button>
                    <button className="op-btn-ghost" title="Download PDF"><FileText size={14} /> <span>PDF</span></button>
                    <button className="op-btn-primary" title="Share Report"><Share2 size={14} /> Share</button>
                </div>
            </motion.div>

            {/* ── Smart Filters ───────────────────────────── */}
            <motion.div className="op-filters" variants={itemVariants}>
                <div className="op-filter-search">
                    <Search size={14} color="#94a3b8" />
                    <input type="text" placeholder="Search commissions, doctors, outlets…" value={search} onChange={e => setSearch(e.target.value)} />
                    {search && <button onClick={() => setSearch("")}><X size={12} /></button>}
                </div>
                <select className="op-ctrl-select" title="Doctor" value={doctorFilter} onChange={e => setDoctorFilter(e.target.value)}>
                    <option value="all">All Doctors</option>
                    {doctorCommissionData.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                </select>
                <select className="op-ctrl-select" title="Specialization" value={specializationFilter} onChange={e => setSpecializationFilter(e.target.value)}>
                    <option value="all">All Specializations</option>
                    {specializationCommissionData.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                </select>
                <select className="op-ctrl-select" title="Commission Status" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="failed">Failed</option>
                </select>
                <select className="op-ctrl-select" title="Payment Status" value={paymentStatusFilter} onChange={e => setPaymentStatusFilter(e.target.value)}>
                    <option value="all">All Payments</option>
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                    <option value="partial">Partial</option>
                </select>
                <select className="op-ctrl-select" title="Settlement Status" value={settlementStatusFilter} onChange={e => setSettlementStatusFilter(e.target.value)}>
                    <option value="all">All Settlements</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="delayed">Delayed</option>
                </select>
                <div className="op-filter-actions">
                    <button className="op-btn-ghost" onClick={() => { setSearch(""); setFilterStatus("all"); setOutletFilter("all"); setDepartmentFilter("all"); setSpecializationFilter("all"); setDoctorFilter("all"); setPaymentStatusFilter("all"); setSettlementStatusFilter("all"); }}>
                        <RotateCcw size={13} /> Reset
                    </button>
                    <button className="op-btn-primary" style={{ padding: "7px 14px" }}>
                        <Save size={13} /> Save
                    </button>
                </div>
            </motion.div>

            {/* ── Executive KPI Cards ─────────────────────── */}
            <motion.section className="op-section" variants={itemVariants}>
                <SectionTitle icon={Coins} iconBg="#fef3c7" iconColor="#d97706" title="Commission KPIs" subtitle="Real-time commission metrics across all outlets and doctors" />
                <motion.div className="op-kpi-grid" variants={containerVariants}>
                    {loading
                        ? Array(12).fill(0).map((_, i) => <SkeletonKPI key={i} />)
                        : commissionKPIData.map((k, i) => <KPICard key={i} {...k} />)
                    }
                </motion.div>
            </motion.section>

            {/* ── Commission Trend Analytics ──────────────── */}
            <motion.section className="op-section" variants={itemVariants}>
                <SectionTitle icon={LineChart} iconBg="#dbeafe" iconColor="#014fa1" title="Commission Trend" subtitle="Monthly commission generation and payout breakdown" />
                <div className="op-two-col">
                    <motion.div className="op-card" variants={itemVariants}>
                        <h3 className="op-card-subtitle">Monthly Commission Breakdown</h3>
                        <div className="op-stacked-chart" style={{ height: 220 }}>
                            {commissionTrend.map((d, i) => {
                                const total = d.commission;
                                return (
                                    <div key={i} className="op-stacked-group">
                                        <div className="op-stacked-bar-wrap">
                                            <div className="op-stacked-bar-total">৳{d.commission}M</div>
                                            <div className="op-stacked-bar">
                                                <div style={{ height: `${(d.paid / 55) * 100}%`, background: "#16a34a" }} title={`Paid: ৳${d.paid}M`} />
                                                <div style={{ height: `${(d.pending / 55) * 100}%`, background: "#f59e0b" }} title={`Pending: ৳${d.pending}M`} />
                                                <div style={{ height: `${(d.processing / 55) * 100}%`, background: "#0891b2" }} title={`Processing: ৳${d.processing}M`} />
                                            </div>
                                        </div>
                                        <div className="op-bar-label">{d.label}</div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="op-chart-legend" style={{ marginTop: 10 }}>
                            <span className="op-legend-dot" style={{ background: "#16a34a" }} /> Paid
                            <span className="op-legend-dot" style={{ background: "#f59e0b", marginLeft: 14 }} /> Pending
                            <span className="op-legend-dot" style={{ background: "#0891b2", marginLeft: 14 }} /> Processing
                        </div>
                    </motion.div>

                    <motion.div className="op-card" variants={itemVariants}>
                        <h3 className="op-card-subtitle">Commission Growth & Forecast</h3>
                        <div className="op-bar-chart" style={{ height: 160, paddingTop: 10 }}>
                            {commissionTrend.slice(0, 6).map((d, i) => (
                                <div key={i} className="op-bar-group">
                                    <div className="op-bars">
                                        <div className="op-bar-wrap">
                                            <div className="op-bar op-bar--income" style={{ height: `${(d.commission / 55) * 100}%`, background: "#014fa1" }} title={`Commission: ৳${d.commission}M`} />
                                        </div>
                                        <div className="op-bar-val">৳{d.commission}M</div>
                                    </div>
                                    <div className="op-bar-label">{d.label}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, padding: "8px 12px", background: "#f8fafc", borderRadius: 8 }}>
                            <span style={{ fontSize: 11, color: "#64748b" }}>Forecast: ৳48M this quarter</span>
                            <span style={{ fontSize: 11, color: "#16a34a", fontWeight: 700 }}>↑ +12.8%</span>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── AI Insights + Alerts ─────────────────────── */}
            <motion.section className="op-section" variants={itemVariants}>
                <div className="op-two-col">
                    <motion.div className="op-card" variants={itemVariants}>
                        <SectionTitle icon={Brain} iconBg="#ede9fe" iconColor="#7c3aed" title="AI Commission Insights" />
                        <div className="op-insights-list">
                            {insights.map((ins, i) => (
                                <div key={i} className={`op-insight-item op-insight--${ins.type}`}>
                                    <div className="op-insight-icon"><InsightIcon type={ins.type} /></div>
                                    <div>
                                        <div className="op-insight-title">{ins.title}</div>
                                        <div className="op-insight-text">{ins.text}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="op-card" variants={itemVariants}>
                        <SectionTitle icon={Bell} iconBg="#fee2e2" iconColor="#ef4444" title="Commission Alerts"
                            action={<span className="op-alert-count">{alerts.filter(a => a.type === "error").length} Critical</span>} />
                        <div className="op-alerts-list">
                            {alerts.map((a, i) => (
                                <div key={i} className={`op-alert-item op-insight--${a.type}`}>
                                    <div className="op-insight-icon"><AlertTriangle size={15} /></div>
                                    <div style={{ flex: 1 }}>
                                        <div className="op-alert-header">
                                            <span className="op-insight-title">{a.title}</span>
                                            <span className="op-alert-time">{a.time}</span>
                                        </div>
                                        <div className="op-insight-text">{a.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Commission Distribution ──────────────────── */}
            <motion.section className="op-section" variants={itemVariants}>
                <SectionTitle icon={PieChart} iconBg="#dcfce7" iconColor="#428a26" title="Commission Distribution" subtitle="Commission breakdown by outlet, department, and specialization" />
                <div className="op-three-col">
                    <motion.div className="op-card" variants={itemVariants}>
                        <h3 className="op-card-subtitle">By Outlet</h3>
                        <div className="op-hbars">
                            {outletCommissionData.map((o, i) => (
                                <div key={i} className="op-hbar-item">
                                    <div className="op-hbar-meta">
                                        <span className="op-hbar-name">{o.name}</span>
                                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                            <span className="op-hbar-growth" style={{ color: o.growth.startsWith("+") ? "#16a34a" : "#ef4444" }}>{o.growth}</span>
                                            <span className="op-hbar-val">{o.commission}</span>
                                        </div>
                                    </div>
                                    <ProgressBar value={o.percentage} color={o.growth.startsWith("+") ? "#014fa1" : "#ef4444"} height={7} />
                                    <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>{o.doctors} doctors · {o.percentage}% share</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="op-card" variants={itemVariants}>
                        <h3 className="op-card-subtitle">By Department</h3>
                        <div className="op-hbars">
                            {departmentCommissionData.map((d, i) => (
                                <div key={i} className="op-hbar-item">
                                    <div className="op-hbar-meta">
                                        <span className="op-hbar-name">{d.name}</span>
                                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                            <span className="op-hbar-growth" style={{ color: "#16a34a" }}>{d.growth}</span>
                                            <span className="op-hbar-val">{d.commission}</span>
                                        </div>
                                    </div>
                                    <ProgressBar value={d.percentage} color={d.color} height={7} />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="op-card" variants={itemVariants}>
                        <h3 className="op-card-subtitle">By Specialization</h3>
                        <div className="op-hbars">
                            {specializationCommissionData.map((s, i) => (
                                <div key={i} className="op-hbar-item">
                                    <div className="op-hbar-meta">
                                        <span className="op-hbar-name">{s.name}</span>
                                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                            <span className="op-hbar-growth" style={{ color: "#16a34a" }}>{s.growth}</span>
                                            <span className="op-hbar-val">{s.commission}</span>
                                        </div>
                                    </div>
                                    <ProgressBar value={s.percentage} color={s.percentage > 15 ? "#014fa1" : "#7c3aed"} height={7} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Payout & Settlement Analytics ───────────── */}
            <motion.section className="op-section" variants={itemVariants}>
                <div className="op-two-col">
                    <motion.div className="op-card" variants={itemVariants}>
                        <SectionTitle icon={Wallet} iconBg="#cffafe" iconColor="#0891b2" title="Payout Analytics" subtitle="Payout performance and success metrics" />
                        <div className="op-payout-grid">
                            {payoutAnalytics.map((p, i) => (
                                <div key={i} className="op-payout-item">
                                    <div className="op-payout-label">{p.label}</div>
                                    <div className="op-payout-value" style={{ color: p.color }}>{p.value}</div>
                                    <div className={`op-payout-change ${p.change.startsWith("+") ? "op-growth--up" : "op-growth--down"}`}>
                                        {p.change.startsWith("+") ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                                        {p.change}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="op-card" variants={itemVariants}>
                        <SectionTitle icon={ShieldCheck} iconBg="#dcfce7" iconColor="#16a34a" title="Settlement Status" subtitle="Breakdown of commission settlements" />
                        <div className="op-settlement-grid">
                            {settlementData.map((s, i) => (
                                <div key={i} className="op-settlement-item">
                                    <div className="op-settlement-header">
                                        <span className="op-settlement-label">{s.status}</span>
                                        <span className="op-settlement-amount" style={{ color: s.color }}>{s.amount}</span>
                                    </div>
                                    <ProgressBar value={s.percentage} color={s.color} height={8} showLabel />
                                    <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 4 }}>{s.percentage}% of total</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, padding: "8px 12px", background: "#f8fafc", borderRadius: 8 }}>
                            <span style={{ fontSize: 11, color: "#64748b" }}>Total Settled</span>
                            <span style={{ fontSize: 13, fontWeight: 700, color: "#16a34a" }}>৳31.2M</span>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Incentive Analytics ──────────────────────── */}
            <motion.section className="op-section" variants={itemVariants}>
                <SectionTitle icon={Trophy} iconBg="#fef3c7" iconColor="#d97706" title="Incentive Analytics" subtitle="Performance bonuses, special incentives, and retention rewards" />
                <div className="op-two-col">
                    <motion.div className="op-card" variants={itemVariants}>
                        <h3 className="op-card-subtitle">Incentive Breakdown</h3>
                        <div className="op-donut-row">
                            <svg viewBox="0 0 100 100" width={130} height={130}>
                                {incentiveData.reduce((acc, item, i) => {
                                    const offset = acc.offset;
                                    const dash = item.percentage * 2.827;
                                    const gap = 251.2;
                                    acc.elements.push(
                                        <circle key={i} cx="50" cy="50" r="40" fill="none" stroke={item.color} strokeWidth="18"
                                            strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-offset}
                                            style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }} />
                                    );
                                    acc.offset += dash;
                                    return acc;
                                }, { offset: 0, elements: [] }).elements}
                                <text x="50" y="46" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1e293b">৳4.2M</text>
                                <text x="50" y="58" textAnchor="middle" fontSize="7" fill="#64748b">Total</text>
                            </svg>
                            <div className="op-donut-legend">
                                {incentiveData.map((item, i) => (
                                    <div key={i} className="op-donut-item">
                                        <span className="op-legend-dot" style={{ background: item.color }} />
                                        <span className="op-donut-label">{item.label}</span>
                                        <span className="op-donut-val">{item.percentage}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="op-card" variants={itemVariants}>
                        <h3 className="op-card-subtitle">Incentive Trend</h3>
                        <div className="op-bar-chart" style={{ height: 150, paddingTop: 10 }}>
                            {commissionTrend.slice(0, 6).map((d, i) => (
                                <div key={i} className="op-bar-group">
                                    <div className="op-bars">
                                        <div className="op-bar-wrap">
                                            <div className="op-bar" style={{ height: `${(d.commission * 0.1 / 5.5) * 100}%`, background: "#f59e0b" }} title={`Incentive: ৳${(d.commission * 0.1).toFixed(1)}M`} />
                                        </div>
                                        <div className="op-bar-val">৳{(d.commission * 0.1).toFixed(1)}M</div>
                                    </div>
                                    <div className="op-bar-label">{d.label}</div>
                                </div>
                            ))}
                        </div>
                        <div className="op-chart-legend">
                            <span className="op-legend-dot" style={{ background: "#f59e0b" }} /> Incentive Amount (10% of commission)
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Financial Liability Analytics ────────────── */}
            <motion.section className="op-section" variants={itemVariants}>
                <SectionTitle icon={Landmark} iconBg="#fee2e2" iconColor="#ef4444" title="Financial Liability" subtitle="Outstanding commission, pending payments, and cash requirements" />
                <div className="op-liability-grid">
                    {commissionLiabilities.map((l, i) => (
                        <motion.div key={i} className="op-liability-item" variants={itemVariants}>
                            <div className="op-liability-header">
                                <span className="op-liability-label">{l.label}</span>
                                <span className={`op-liability-change ${l.change.startsWith("+") ? "op-growth--up" : "op-growth--down"}`}>
                                    {l.change}
                                </span>
                            </div>
                            <div className="op-liability-value" style={{ color: l.color }}>{l.value}</div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* ── Comparison Analytics ─────────────────────── */}
            <motion.section className="op-section" variants={itemVariants}>
                <SectionTitle icon={BarChart3} iconBg="#dbeafe" iconColor="#014fa1" title="Period Comparison" subtitle="Current vs previous period performance" />
                <motion.div className="op-card" variants={itemVariants}>
                    <div className="op-comp-wrapper">
                        <table className="op-comp-table">
                            <thead>
                                <tr>
                                    <th>Metric</th>
                                    <th>Current Period</th>
                                    <th>Previous Period</th>
                                    <th>Change</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((row, i) => (
                                    <tr key={i}>
                                        <td><strong>{row.metric}</strong></td>
                                        <td style={{ color: "#1e293b", fontWeight: 700 }}>{row.current}</td>
                                        <td style={{ color: "#64748b" }}>{row.previous}</td>
                                        <td>
                                            <span className={`op-growth ${row.change.startsWith("+") ? "op-growth--up" : "op-growth--down"}`}>
                                                {row.change.startsWith("+") ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                                {row.change}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </motion.section>

            {/* ── Commission Leaderboards ──────────────────── */}
            <motion.section className="op-section" variants={itemVariants}>
                <SectionTitle icon={Trophy} iconBg="#fef3c7" iconColor="#f59e0b" title="Commission Leaderboards" subtitle="Top performers by commission generation" />
                <div className="op-leaderboard-grid">
                    {/* Top Doctors */}
                    <motion.div className="op-card" variants={itemVariants}>
                        <h3 className="op-card-subtitle">🏆 Top Earning Doctors</h3>
                        <div className="op-leaderboard-list">
                            {doctorCommissionData.slice(0, 5).map((d, i) => (
                                <div key={i} className={`op-leaderboard-item ${i === 0 ? "op-leaderboard-item--first" : ""}`}>
                                    <div className="op-leaderboard-rank">{i + 1}</div>
                                    <div className="op-leaderboard-info">
                                        <div className="op-leaderboard-name">{d.name}</div>
                                        <div className="op-leaderboard-meta">{d.outlet} · {d.dept}</div>
                                    </div>
                                    <div className="op-leaderboard-amount">{d.commission}</div>
                                    <div className={`op-leaderboard-growth ${d.growth.startsWith("+") ? "op-growth--up" : "op-growth--down"}`}>
                                        {d.growth}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Top Outlets */}
                    <motion.div className="op-card" variants={itemVariants}>
                        <h3 className="op-card-subtitle">🏢 Top Commission Outlets</h3>
                        <div className="op-leaderboard-list">
                            {outletCommissionData.slice(0, 5).map((o, i) => (
                                <div key={i} className={`op-leaderboard-item ${i === 0 ? "op-leaderboard-item--first" : ""}`}>
                                    <div className="op-leaderboard-rank">{i + 1}</div>
                                    <div className="op-leaderboard-info">
                                        <div className="op-leaderboard-name">{o.name}</div>
                                        <div className="op-leaderboard-meta">{o.doctors} doctors</div>
                                    </div>
                                    <div className="op-leaderboard-amount">{o.commission}</div>
                                    <div className={`op-leaderboard-growth ${o.growth.startsWith("+") ? "op-growth--up" : "op-growth--down"}`}>
                                        {o.growth}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Commission Details Table ──────────────────── */}
            <motion.section className="op-section" variants={itemVariants}>
                <SectionTitle icon={Receipt} iconBg="#f0fdf4" iconColor="#16a34a"
                    title={`Commission Details (${filtered.length})`}
                    subtitle="Comprehensive doctor-level commission breakdown"
                    action={
                        <div style={{ display: "flex", gap: 8 }}>
                            <button className="op-btn-ghost"><SlidersHorizontal size={13} /> Columns</button>
                            <button className="op-btn-ghost"><Download size={13} /> Export</button>
                            <button className="op-btn-primary"><FileText size={13} /> PDF</button>
                        </div>
                    }
                />

                <motion.div className="op-card op-table-card" variants={itemVariants}>
                    <div className="op-table-wrapper">
                        <table className="op-perf-table">
                            <thead>
                                <tr>
                                    <th>Doctor / Category</th>
                                    {visibleCols.outlet && <th>Outlet</th>}
                                    {visibleCols.department && <th>Department</th>}
                                    {visibleCols.commission && <th onClick={() => handleSort("commission")} className="op-sortable">Commission <SortIcon col="commission" /></th>}
                                    {visibleCols.paid && <th onClick={() => handleSort("paid")} className="op-sortable">Paid <SortIcon col="paid" /></th>}
                                    {visibleCols.pending && <th onClick={() => handleSort("pending")} className="op-sortable">Pending <SortIcon col="pending" /></th>}
                                    {visibleCols.incentive && <th>Incentive</th>}
                                    {visibleCols.bonus && <th>Bonus</th>}
                                    {visibleCols.growth && <th onClick={() => handleSort("growth")} className="op-sortable">Growth <SortIcon col="growth" /></th>}
                                    {visibleCols.status && <th>Status</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.length === 0 ? (
                                    <tr><td colSpan={12} className="op-empty-state">
                                        <Search size={32} color="#cbd5e1" />
                                        <div>No commission records match your search.</div>
                                        <button className="op-btn-ghost" onClick={() => { setSearch(""); setFilterStatus("all"); }}>Clear Filters</button>
                                    </td></tr>
                                ) : paginated.map((d) => (
                                    <tr key={d.name} className="op-table-row">
                                        <td>
                                            <div className="op-outlet-cell">
                                                <div className="op-outlet-avatar" style={{ background: "#ede9fe" }}>
                                                    <Stethoscope size={16} color="#7c3aed" />
                                                </div>
                                                <div>
                                                    <div className="op-outlet-name">{d.name}</div>
                                                    <div className="op-outlet-id">{d.consultations} consults</div>
                                                </div>
                                            </div>
                                        </td>
                                        {visibleCols.outlet && <td>{d.outlet}</td>}
                                        {visibleCols.department && <td>{d.dept}</td>}
                                        {visibleCols.commission && <td><strong style={{ color: "#1e293b" }}>{d.commission}</strong></td>}
                                        {visibleCols.paid && <td style={{ color: "#16a34a", fontWeight: 600 }}>{d.paid}</td>}
                                        {visibleCols.pending && <td style={{ color: "#f59e0b", fontWeight: 600 }}>{d.pending}</td>}
                                        {visibleCols.incentive && <td style={{ color: "#7c3aed", fontWeight: 600 }}>{d.incentive}</td>}
                                        {visibleCols.bonus && <td style={{ color: "#f59e0b", fontWeight: 600 }}>{d.bonus}</td>}
                                        {visibleCols.growth && (
                                            <td>
                                                <span className={`op-growth ${d.growth.startsWith("+") ? "op-growth--up" : "op-growth--down"}`}>
                                                    {d.growth.startsWith("+") ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                                    {d.growth}
                                                </span>
                                            </td>
                                        )}
                                        {visibleCols.status && (
                                            <td>
                                                <StatusBadge status={d.commission === "৳825K" ? "completed" : "pending"} />
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="op-pagination">
                        <span className="op-pagination-info">
                            Showing {Math.min((currentPage - 1) * rowsPerPage + 1, sorted.length)}–{Math.min(currentPage * rowsPerPage, sorted.length)} of {sorted.length} records
                        </span>
                        <div className="op-pagination-controls">
                            <button className="op-page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                                <ChevronLeft size={14} />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button key={i} className={`op-page-btn ${currentPage === i + 1 ? "op-page-btn--active" : ""}`}
                                    onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                            ))}
                            <button className="op-page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.section>

        </motion.div>
    );
}