// app/super-admin-panel/analytics/outlets/page.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./outlet-performance.css";
import {
    DollarSign, Calendar, Users, Star, TrendingUp, TrendingDown,
    Building2, Activity, Heart, Shield, Brain, Bell, CheckCircle,
    AlertTriangle, Info, XCircle, Download, FileText, Share2, RefreshCw,
    Eye, BarChart3, Search, Filter, ChevronDown, MapPin, Phone, Mail,
    Stethoscope, Clock, CheckSquare, XSquare, ArrowUpRight, ArrowDownRight,
    Target, Zap, CreditCard, RotateCcw, UserCheck, UserX, Percent,
    TrendingUp as Growth, AlertCircle, ChevronUp, ChevronLeft, ChevronRight,
    SlidersHorizontal, Save, MoreHorizontal, ExternalLink, X, Wifi,
    PieChart, Layers, Award, Package, Settings
} from "lucide-react";

// ─── Animation Variants ─────────────────────────────────────────
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } }
};
const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
};
const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } }
};

// ─── Mock Data ──────────────────────────────────────────────────
const kpiData = [
    { label: "Total Revenue", value: "৳38.5M", change: "+12.8%", trend: "up", sub: "vs last month", icon: DollarSign, color: "#014fa1", bg: "#dbeafe" },
    { label: "Net Revenue", value: "৳32.1M", change: "+9.4%", trend: "up", sub: "after expenses", icon: CreditCard, color: "#428a26", bg: "#dcfce7" },
    { label: "Profit Margin", value: "23.6%", change: "+2.1%", trend: "up", sub: "net margin", icon: Percent, color: "#7c3aed", bg: "#ede9fe" },
    { label: "Total Appointments", value: "18,752", change: "+8.2%", trend: "up", sub: "all outlets", icon: Calendar, color: "#0891b2", bg: "#cffafe" },
    { label: "Completed", value: "16,840", change: "+6.5%", trend: "up", sub: "89.8% rate", icon: CheckSquare, color: "#16a34a", bg: "#dcfce7" },
    { label: "Cancelled", value: "1,210", change: "-3.2%", trend: "up", sub: "6.5% rate", icon: XSquare, color: "#ef4444", bg: "#fee2e2" },
    { label: "Total Patients", value: "12,543", change: "+5.6%", trend: "up", sub: "all outlets", icon: Users, color: "#014fa1", bg: "#dbeafe" },
    { label: "New Patients", value: "4,218", change: "+11.2%", trend: "up", sub: "33.6% of total", icon: UserCheck, color: "#428a26", bg: "#dcfce7" },
    { label: "Returning", value: "8,325", change: "+2.4%", trend: "up", sub: "66.4% retention", icon: RotateCcw, color: "#ea580c", bg: "#ffedd5" },
    { label: "Avg Rating", value: "4.8", change: "+0.2", trend: "up", sub: "patient rating", icon: Star, color: "#f59e0b", bg: "#fef3c7" },
    { label: "Avg Wait Time", value: "12 min", change: "-2 min", trend: "up", sub: "vs 14 min prior", icon: Clock, color: "#0891b2", bg: "#cffafe" },
    { label: "Rev / Patient", value: "৳3,070", change: "+6.8%", trend: "up", sub: "revenue per visit", icon: Target, color: "#7c3aed", bg: "#ede9fe" },
    { label: "Collection Rate", value: "94.5%", change: "+1.2%", trend: "up", sub: "payments cleared", icon: CheckCircle, color: "#16a34a", bg: "#dcfce7" },
    { label: "Pending", value: "৳2.1M", change: "-8.4%", trend: "up", sub: "outstanding dues", icon: AlertCircle, color: "#f59e0b", bg: "#fef3c7" },
    { label: "Outlet Health", value: "86/100", change: "+4pts", trend: "up", sub: "overall score", icon: Award, color: "#014fa1", bg: "#dbeafe" },
];

const scores = [
    { label: "Overall Health", value: 86, color: "#014fa1" },
    { label: "Financial", value: 92, color: "#428a26" },
    { label: "Operational", value: 78, color: "#7c3aed" },
    { label: "Service Quality", value: 88, color: "#0891b2" },
    { label: "Patient CSAT", value: 95, color: "#f59e0b" },
    { label: "Growth Index", value: 81, color: "#ea580c" },
];

const insights = [
    { type: "success", title: "Revenue Milestone", text: "Total revenue increased 12.8% — Dhanmondi outlet contributed 32% of growth." },
    { type: "warning", title: "High Cancellation", text: "Renova Mirpur cancellation rate hit 18%. Immediate scheduling review recommended." },
    { type: "info", title: "Patient Growth", text: "New patient registrations up 11.2% after the Dhanmondi marketing campaign." },
    { type: "success", title: "Efficiency Gain", text: "Average wait time reduced by 2 minutes through optimized scheduling." },
    { type: "info", title: "Forecast", text: "Revenue on track to exceed ৳42M next month if current growth holds." },
];

const alerts = [
    { type: "error", title: "Revenue Drop", desc: "Renova Uttara down 15% this week. Requires immediate action.", time: "2h ago" },
    { type: "warning", title: "High Cancellation", desc: "2 outlets exceed 15% cancellation threshold.", time: "4h ago" },
    { type: "warning", title: "Pending Settlements", desc: "3 payments older than 7 days — ৳340K outstanding.", time: "1d ago" },
    { type: "error", title: "Low CSAT Alert", desc: "Sylhet outlet patient satisfaction dropped to 3.9/5.", time: "6h ago" },
];

const revenueTrend = [
    { label: "Jan", income: 28, expense: 18 },
    { label: "Feb", income: 31, expense: 20 },
    { label: "Mar", income: 27, expense: 17 },
    { label: "Apr", income: 35, expense: 22 },
    { label: "May", income: 33, expense: 19 },
    { label: "Jun", income: 38, expense: 23 },
];

const apptTrend = [
    { label: "Week 1", completed: 3200, cancelled: 340, noshow: 120 },
    { label: "Week 2", completed: 3450, cancelled: 280, noshow: 100 },
    { label: "Week 3", completed: 3180, cancelled: 390, noshow: 145 },
    { label: "Week 4", completed: 4010, cancelled: 200, noshow: 90 },
];

const services = [
    { name: "General Consultation", revenue: "৳12.5M", appointments: 6420, growth: "+14%", percent: 85, color: "#014fa1" },
    { name: "Specialist Visit", revenue: "৳9.2M", appointments: 3870, growth: "+8%", percent: 70, color: "#428a26" },
    { name: "Diagnostic Tests", revenue: "৳7.8M", appointments: 4210, growth: "+11%", percent: 60, color: "#7c3aed" },
    { name: "Dental Care", revenue: "৳5.4M", appointments: 2130, growth: "+6%", percent: 45, color: "#0891b2" },
    { name: "Physiotherapy", revenue: "৳3.6M", appointments: 1540, growth: "+19%", percent: 30, color: "#ea580c" },
];

const lowServices = [
    { name: "Dermatology", revenue: "৳1.1M", percent: 12, trend: "-4%", color: "#ef4444" },
    { name: "Ophthalmology", revenue: "৳0.9M", percent: 9, trend: "-2%", color: "#f59e0b" },
    { name: "ENT", revenue: "৳0.7M", percent: 7, trend: "-6%", color: "#ef4444" },
];

const regions = [
    { name: "Dhaka", value: "৳22.5M", patients: 6840, percent: 85, color: "#014fa1" },
    { name: "Chattogram", value: "৳8.2M", patients: 2910, percent: 60, color: "#428a26" },
    { name: "Sylhet", value: "৳4.5M", patients: 1620, percent: 40, color: "#7c3aed" },
    { name: "Khulna", value: "৳3.3M", patients: 1173, percent: 30, color: "#0891b2" },
];

const paymentMethods = [
    { name: "Bkash / Mobile", value: "৳14.2M", percent: 37, color: "#e11d48" },
    { name: "Cash", value: "৳11.5M", percent: 30, color: "#428a26" },
    { name: "Card", value: "৳8.9M", percent: 23, color: "#014fa1" },
    { name: "Insurance", value: "৳3.9M", percent: 10, color: "#7c3aed" },
];

const ageGroups = [
    { label: "0–17", male: 8, female: 7 },
    { label: "18–34", male: 22, female: 28 },
    { label: "35–54", male: 19, female: 17 },
    { label: "55+", male: 14, female: 11 },
];

const comparisonData = [
    { metric: "Revenue", dhanmondi: "৳2.45M", mirpur: "৳2.12M", uttara: "৳1.42M", avg: "৳1.85M" },
    { metric: "Appointments", dhanmondi: "2,543", mirpur: "2,187", uttara: "1,480", avg: "1,950" },
    { metric: "Completion Rate", dhanmondi: "92%", mirpur: "88%", uttara: "78%", avg: "86%" },
    { metric: "Cancellation", dhanmondi: "8%", mirpur: "12%", uttara: "22%", avg: "11%" },
    { metric: "Avg Rating", dhanmondi: "4.9", mirpur: "4.7", uttara: "4.4", avg: "4.6" },
    { metric: "Rev Growth", dhanmondi: "+15.6%", mirpur: "+12.4%", uttara: "-2.1%", avg: "+9.8%" },
];

const outletData = [
    { id: "OUT-001", name: "Renova Dhanmondi", revenue: "৳2.45M", appointments: "2,543", patients: "1,850", rating: "4.9", revGrowth: "+15.6%", apptGrowth: "+12.4%", profit: "৳1.20M", completion: 92, cancellation: 8, score: 95, status: "active", trend: [20, 32, 28, 45, 38, 52, 47, 58] },
    { id: "OUT-002", name: "Renova Mirpur", revenue: "৳2.12M", appointments: "2,187", patients: "1,620", rating: "4.7", revGrowth: "+12.4%", apptGrowth: "+9.8%", profit: "৳980K", completion: 88, cancellation: 12, score: 88, status: "active", trend: [15, 22, 19, 31, 28, 38, 34, 42] },
    { id: "OUT-003", name: "Renova Chattogram", revenue: "৳1.84M", appointments: "1,932", patients: "1,450", rating: "4.6", revGrowth: "+10.7%", apptGrowth: "+8.2%", profit: "৳850K", completion: 85, cancellation: 15, score: 82, status: "active", trend: [12, 18, 15, 24, 21, 30, 27, 35] },
    { id: "OUT-004", name: "Renova Sylhet", revenue: "৳1.61M", appointments: "1,721", patients: "1,280", rating: "4.5", revGrowth: "+9.3%", apptGrowth: "+7.5%", profit: "৳720K", completion: 82, cancellation: 18, score: 78, status: "inactive", trend: [10, 14, 12, 18, 16, 22, 19, 24] },
    { id: "OUT-005", name: "Renova Uttara", revenue: "৳1.42M", appointments: "1,480", patients: "1,120", rating: "4.4", revGrowth: "-2.1%", apptGrowth: "-1.5%", profit: "৳580K", completion: 78, cancellation: 22, score: 65, status: "at-risk", trend: [18, 16, 20, 15, 18, 14, 17, 13] },
];

const operationalMetrics = [
    { label: "Avg Queue Time", value: "8 min", target: "≤ 10 min", ok: true },
    { label: "Avg Wait Time", value: "12 min", target: "≤ 15 min", ok: true },
    { label: "Avg Consult Time", value: "18 min", target: "≥ 15 min", ok: true },
    { label: "Room Utilization", value: "85%", target: "≥ 80%", ok: true },
    { label: "Staff Utilization", value: "78%", target: "≥ 75%", ok: true },
    { label: "Capacity Usage", value: "68%", target: "≥ 70%", ok: false },
];

// ─── Helpers ─────────────────────────────────────────────────────
const getScoreColor = (s) => s >= 90 ? "#16a34a" : s >= 80 ? "#014fa1" : s >= 70 ? "#f59e0b" : "#ef4444";
const getScoreBg = (s) => s >= 90 ? "#dcfce7" : s >= 80 ? "#dbeafe" : s >= 70 ? "#fef3c7" : "#fee2e2";
const statusConfig = {
    active: { bg: "#dcfce7", color: "#16a34a", label: "Active" },
    inactive: { bg: "#f1f5f9", color: "#64748b", label: "Inactive" },
    "at-risk": { bg: "#fee2e2", color: "#ef4444", label: "At Risk" },
    closed: { bg: "#fef3c7", color: "#d97706", label: "Closed" },
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

const GaugeChart = ({ value, color, size = 100 }) => {
    const r = 38, cx = 50, cy = 50;
    const circ = Math.PI * r;
    const offset = circ - (value / 100) * circ;
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
    const c = statusConfig[status] || statusConfig.inactive;
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
    <motion.div className="op-kpi-card" variants={itemVariants} whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(4,65,125,0.11)" }}>
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

// ─── Main Page ───────────────────────────────────────────────────
export default function OutletPerformancePage() {
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortCol, setSortCol] = useState(null);
    const [sortDir, setSortDir] = useState("asc");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterOpen, setFilterOpen] = useState(false);
    const [outletFilter, setOutletFilter] = useState("All Outlets");
    const [visibleCols, setVisibleCols] = useState({
        revenue: true, appointments: true, patients: true, rating: true,
        revGrowth: true, profit: true, completion: true, cancellation: true,
        score: true, status: true, actions: true
    });
    const rowsPerPage = 5;

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 1400);
        return () => clearTimeout(t);
    }, []);

    const filtered = outletData.filter(o => {
        const matchSearch = o.name.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search);
        const matchStatus = filterStatus === "all" || o.status === filterStatus;
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
                    <h1 className="op-page-title">Outlet Performance Analytics</h1>
                    <p className="op-page-sub">Last updated 2 minutes ago · All data is outlet-level aggregated</p>
                </div>
                <div className="op-header-actions">
                    <select className="op-ctrl-select" title="Select Outlet" value={outletFilter} onChange={e => setOutletFilter(e.target.value)}>
                        <option>All Outlets</option>
                        {outletData.map(o => <option key={o.id}>{o.name}</option>)}
                    </select>
                    <input type="date" className="op-ctrl-input" title="Date" />
                    <select className="op-ctrl-select" title="Compare Period">
                        <option>vs Previous Period</option>
                        <option>vs Same Period Last Year</option>
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
                    <input type="text" placeholder="Search outlets or IDs…" value={search} onChange={e => setSearch(e.target.value)} />
                    {search && <button onClick={() => setSearch("")}><X size={12} /></button>}
                </div>
                <select className="op-ctrl-select" title="Department"><option>All Departments</option></select>
                <select className="op-ctrl-select" title="Service"><option>All Services</option></select>
                <select className="op-ctrl-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="at-risk">At Risk</option>
                </select>
                <input type="date" className="op-ctrl-input" />
                <input type="date" className="op-ctrl-input" />
                <div className="op-filter-actions">
                    <button className="op-btn-ghost" onClick={() => { setSearch(""); setFilterStatus("all"); }}>
                        <RotateCcw size={13} /> Reset
                    </button>
                    <button className="op-btn-primary" style={{ padding: "7px 14px" }}>
                        <Save size={13} /> Save
                    </button>
                </div>
            </motion.div>

            {/* ── Executive KPI Cards ─────────────────────── */}
            <motion.section className="op-section" variants={itemVariants}>
                <SectionTitle icon={Zap} iconBg="#fef3c7" iconColor="#d97706" title="Executive KPIs" subtitle="Real-time performance metrics across all outlets" />
                <motion.div className="op-kpi-grid" variants={containerVariants}>
                    {loading
                        ? Array(15).fill(0).map((_, i) => <SkeletonKPI key={i} />)
                        : kpiData.map((k, i) => <KPICard key={i} {...k} />)
                    }
                </motion.div>
            </motion.section>

            {/* ── Performance Score Gauges ─────────────────── */}
            <motion.section className="op-section" variants={itemVariants}>
                <SectionTitle icon={Award} iconBg="#ede9fe" iconColor="#7c3aed" title="Performance Score" subtitle="Composite health indicators per dimension" />
                <div className="op-score-grid">
                    {scores.map((s, i) => (
                        <motion.div key={i} className="op-score-card" variants={itemVariants}>
                            <GaugeChart value={s.value} color={s.color} size={110} />
                            <div className="op-score-label">{s.label}</div>
                            <div className="op-score-tag" style={{ background: getScoreBg(s.value), color: getScoreColor(s.value) }}>
                                {s.value >= 90 ? "Excellent" : s.value >= 80 ? "Good" : s.value >= 70 ? "Fair" : "Needs Attention"}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* ── AI Insights + Alerts ─────────────────────── */}
            <motion.section className="op-section" variants={itemVariants}>
                <div className="op-two-col">
                    <motion.div className="op-card" variants={itemVariants}>
                        <SectionTitle icon={Brain} iconBg="#ede9fe" iconColor="#7c3aed" title="AI Business Insights" />
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
                        <SectionTitle icon={Bell} iconBg="#fee2e2" iconColor="#ef4444" title="Critical Alerts"
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

            {/* ── Revenue Analytics ───────────────────────── */}
            <motion.section className="op-section" variants={itemVariants}>
                <SectionTitle icon={DollarSign} iconBg="#dbeafe" iconColor="#014fa1" title="Revenue Analytics" subtitle="Monthly income vs expense, service and payment breakdown" />
                <div className="op-two-col">
                    {/* Bar Chart — Income vs Expense */}
                    <motion.div className="op-card" variants={itemVariants}>
                        <h3 className="op-card-subtitle">Monthly Revenue vs Expense</h3>
                        <div className="op-bar-chart">
                            {revenueTrend.map((d, i) => (
                                <div key={i} className="op-bar-group">
                                    <div className="op-bars">
                                        <div className="op-bar-wrap">
                                            <div className="op-bar op-bar--income" style={{ height: `${(d.income / 40) * 100}%` }} title={`Income: ৳${d.income}M`} />
                                            <div className="op-bar op-bar--expense" style={{ height: `${(d.expense / 40) * 100}%` }} title={`Expense: ৳${d.expense}M`} />
                                        </div>
                                        <div className="op-bar-val">৳{d.income}M</div>
                                    </div>
                                    <div className="op-bar-label">{d.label}</div>
                                </div>
                            ))}
                        </div>
                        <div className="op-chart-legend">
                            <span className="op-legend-dot" style={{ background: "#014fa1" }} /> Income
                            <span className="op-legend-dot" style={{ background: "#ef4444", marginLeft: 14 }} /> Expense
                        </div>
                    </motion.div>

                    {/* Revenue by Service */}
                    <motion.div className="op-card" variants={itemVariants}>
                        <h3 className="op-card-subtitle">Revenue by Service</h3>
                        <div className="op-hbars">
                            {services.map((s, i) => (
                                <div key={i} className="op-hbar-item">
                                    <div className="op-hbar-meta">
                                        <span className="op-hbar-name">{s.name}</span>
                                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                            <span className="op-hbar-growth" style={{ color: "#16a34a" }}>{s.growth}</span>
                                            <span className="op-hbar-val">{s.revenue}</span>
                                        </div>
                                    </div>
                                    <ProgressBar value={s.percent} color={s.color} height={7} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="op-two-col" style={{ marginTop: 16 }}>
                    {/* Revenue by Payment Method */}
                    <motion.div className="op-card" variants={itemVariants}>
                        <h3 className="op-card-subtitle">Revenue by Payment Method</h3>
                        <div className="op-donut-row">
                            <svg viewBox="0 0 100 100" width={130} height={130}>
                                {paymentMethods.reduce((acc, pm, i) => {
                                    const offset = acc.offset;
                                    const dash = pm.percent * 2.827;
                                    const gap = 251.2;
                                    acc.elements.push(
                                        <circle key={i} cx="50" cy="50" r="40" fill="none" stroke={pm.color} strokeWidth="18"
                                            strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-offset}
                                            style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }} />
                                    );
                                    acc.offset += dash;
                                    return acc;
                                }, { offset: 0, elements: [] }).elements}
                                <text x="50" y="46" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1e293b">৳38.5M</text>
                                <text x="50" y="58" textAnchor="middle" fontSize="7" fill="#64748b">Total</text>
                            </svg>
                            <div className="op-donut-legend">
                                {paymentMethods.map((pm, i) => (
                                    <div key={i} className="op-donut-item">
                                        <span className="op-legend-dot" style={{ background: pm.color }} />
                                        <span className="op-donut-label">{pm.name}</span>
                                        <span className="op-donut-val">{pm.percent}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Low Performing Services */}
                    <motion.div className="op-card" variants={itemVariants}>
                        <h3 className="op-card-subtitle">Low Performing Services</h3>
                        <div className="op-low-list">
                            {lowServices.map((s, i) => (
                                <div key={i} className="op-low-item">
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                        <span className="op-hbar-name">{s.name}</span>
                                        <span style={{ fontSize: 12, color: "#ef4444", fontWeight: 700 }}>{s.trend}</span>
                                    </div>
                                    <ProgressBar value={s.percent} color={s.color} height={6} showLabel />
                                    <p style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>{s.revenue} this month</p>
                                </div>
                            ))}
                            <div className="op-low-tip">
                                <Info size={13} color="#014fa1" />
                                <span>Consider targeted campaigns or capacity adjustment for these services.</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Appointment Analytics ───────────────────── */}
            <motion.section className="op-section" variants={itemVariants}>
                <SectionTitle icon={Calendar} iconBg="#cffafe" iconColor="#0891b2" title="Appointment Analytics" subtitle="Trends, heatmap, and type distribution" />
                <div className="op-two-col">
                    {/* Stacked bar — weekly trend */}
                    <motion.div className="op-card" variants={itemVariants}>
                        <h3 className="op-card-subtitle">Weekly Appointment Trend</h3>
                        <div className="op-stacked-chart">
                            {apptTrend.map((w, i) => {
                                const total = w.completed + w.cancelled + w.noshow;
                                return (
                                    <div key={i} className="op-stacked-group">
                                        <div className="op-stacked-bar-wrap">
                                            <div className="op-stacked-bar-total">{total.toLocaleString()}</div>
                                            <div className="op-stacked-bar">
                                                <div style={{ height: `${(w.completed / 4500) * 100}%`, background: "#016034" }} title={`Completed: ${w.completed}`} />
                                                <div style={{ height: `${(w.cancelled / 4500) * 100}%`, background: "#ef4444" }} title={`Cancelled: ${w.cancelled}`} />
                                                <div style={{ height: `${(w.noshow / 4500) * 100}%`, background: "#f59e0b" }} title={`No-Show: ${w.noshow}`} />
                                            </div>
                                        </div>
                                        <div className="op-bar-label">{w.label}</div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="op-chart-legend" style={{ marginTop: 10 }}>
                            <span className="op-legend-dot" style={{ background: "#016034" }} /> Completed
                            <span className="op-legend-dot" style={{ background: "#ef4444", marginLeft: 14 }} /> Cancelled
                            <span className="op-legend-dot" style={{ background: "#f59e0b", marginLeft: 14 }} /> No-Show
                        </div>
                    </motion.div>

                    {/* Heatmap */}
                    <motion.div className="op-card" variants={itemVariants}>
                        <h3 className="op-card-subtitle">Appointment Heatmap (Peak Hours)</h3>
                        <div className="op-heatmap">
                            <div className="op-heatmap-header">
                                <div></div>
                                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
                                    <div key={d} className="op-hm-label">{d}</div>
                                ))}
                            </div>
                            {["8AM", "10AM", "12PM", "2PM", "4PM", "6PM"].map(t => (
                                <div key={t} className="op-heatmap-row">
                                    <div className="op-hm-time">{t}</div>
                                    {[...Array(7)].map((_, i) => {
                                        const v = Math.floor(Math.random() * 100);
                                        return (
                                            <div key={i} className="op-hm-cell"
                                                style={{ background: `rgba(1,79,161,${0.08 + (v / 100) * 0.85})`, color: v > 60 ? "#fff" : "#014fa1" }}
                                                title={`${v} appts`}>{v}</div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Patient Analytics ───────────────────────── */}
            <motion.section className="op-section" variants={itemVariants}>
                <SectionTitle icon={Users} iconBg="#dcfce7" iconColor="#428a26" title="Patient Analytics" subtitle="Demographics, retention, and growth metrics" />
                <div className="op-three-col">
                    {/* Age/Gender */}
                    <motion.div className="op-card" variants={itemVariants}>
                        <h3 className="op-card-subtitle">Age & Gender Distribution</h3>
                        <div className="op-age-chart">
                            {ageGroups.map((g, i) => (
                                <div key={i} className="op-age-row">
                                    <div className="op-age-label">{g.label}</div>
                                    <div className="op-age-bars">
                                        <div className="op-age-male" style={{ width: `${g.male * 2}px` }} title={`Male ${g.male}%`}>{g.male}%</div>
                                        <div className="op-age-fem" style={{ width: `${g.female * 2}px` }} title={`Female ${g.female}%`}>{g.female}%</div>
                                    </div>
                                </div>
                            ))}
                            <div className="op-chart-legend" style={{ marginTop: 10 }}>
                                <span className="op-legend-dot" style={{ background: "#014fa1" }} /> Male
                                <span className="op-legend-dot" style={{ background: "#ec4899", marginLeft: 14 }} /> Female
                            </div>
                        </div>
                    </motion.div>

                    {/* Retention */}
                    <motion.div className="op-card" variants={itemVariants}>
                        <h3 className="op-card-subtitle">Patient Retention</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 8 }}>
                            {[
                                { label: "Retention Rate", value: 66.4, color: "#428a26" },
                                { label: "Churn Rate", value: 33.6, color: "#ef4444" },
                                { label: "Repeat Visit Rate", value: 52, color: "#014fa1" },
                                { label: "Avg Visits / Patient", value: 3.2, isNum: true, unit: "visits", color: "#7c3aed" },
                            ].map((m, i) => (
                                <div key={i}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                                        <span style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>{m.label}</span>
                                        <span style={{ fontSize: 12, fontWeight: 800, color: m.color }}>{m.isNum ? `${m.value} ${m.unit}` : `${m.value}%`}</span>
                                    </div>
                                    {!m.isNum && <ProgressBar value={m.value} color={m.color} height={6} />}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Lifetime Value + Growth */}
                    <motion.div className="op-card" variants={itemVariants}>
                        <h3 className="op-card-subtitle">Patient Value Metrics</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
                            {[
                                { label: "Avg Spend / Visit", value: "৳3,070", icon: DollarSign, color: "#428a26" },
                                { label: "Lifetime Value", value: "৳9,820", icon: TrendingUp, color: "#014fa1" },
                                { label: "Patient Growth", value: "+5.6% MoM", icon: Users, color: "#7c3aed" },
                                { label: "New Patient Rate", value: "33.6%", icon: UserCheck, color: "#0891b2" },
                            ].map((m, i) => (
                                <div key={i} className="op-metric-row">
                                    <div className="op-metric-icon" style={{ background: `${m.color}18`, color: m.color }}>
                                        <m.icon size={14} />
                                    </div>
                                    <div>
                                        <div className="op-metric-label">{m.label}</div>
                                        <div className="op-metric-val" style={{ color: m.color }}>{m.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Operational Analytics ───────────────────── */}
            <motion.section className="op-section" variants={itemVariants}>
                <SectionTitle icon={Activity} iconBg="#ffedd5" iconColor="#ea580c" title="Operational Analytics" subtitle="Efficiency metrics, utilization, and bottlenecks" />
                <div className="op-two-col">
                    <motion.div className="op-card" variants={itemVariants}>
                        <h3 className="op-card-subtitle">Operational KPIs vs Targets</h3>
                        <div className="op-ops-grid">
                            {operationalMetrics.map((m, i) => (
                                <div key={i} className="op-ops-item">
                                    <div className="op-ops-top">
                                        <span className="op-ops-label">{m.label}</span>
                                        <span className={`op-ops-badge ${m.ok ? "op-ops-badge--ok" : "op-ops-badge--warn"}`}>
                                            {m.ok ? <CheckCircle size={11} /> : <AlertTriangle size={11} />}
                                            {m.ok ? "On Target" : "Below"}
                                        </span>
                                    </div>
                                    <div className="op-ops-value">{m.value}</div>
                                    <div className="op-ops-target">Target: {m.target}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="op-card" variants={itemVariants}>
                        <h3 className="op-card-subtitle">Resource Utilization</h3>
                        <div className="op-hbars">
                            {[
                                { label: "Room Utilization", value: 85, color: "#014fa1" },
                                { label: "Staff Utilization", value: 78, color: "#428a26" },
                                { label: "Equipment Usage", value: 92, color: "#7c3aed" },
                                { label: "Capacity Usage", value: 68, color: "#0891b2" },
                                { label: "Consultation Rooms", value: 74, color: "#ea580c" },
                            ].map((item, i) => (
                                <div key={i} className="op-hbar-item">
                                    <div className="op-hbar-meta">
                                        <span className="op-hbar-name">{item.label}</span>
                                        <span className="op-hbar-val">{item.value}%</span>
                                    </div>
                                    <ProgressBar value={item.value} color={item.color} height={8} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Geographic + Financial ──────────────────── */}
            <motion.section className="op-section" variants={itemVariants}>
                <div className="op-two-col">
                    <motion.div className="op-card" variants={itemVariants}>
                        <SectionTitle icon={MapPin} iconBg="#cffafe" iconColor="#0891b2" title="Revenue by Region" />
                        <div className="op-region-list">
                            {regions.map((r, i) => (
                                <div key={i} className="op-region-item">
                                    <div className="op-region-meta">
                                        <span className="op-region-name">{r.name}</span>
                                        <div style={{ textAlign: "right" }}>
                                            <div className="op-region-val">{r.value}</div>
                                            <div style={{ fontSize: 10, color: "#94a3b8" }}>{r.patients.toLocaleString()} patients</div>
                                        </div>
                                    </div>
                                    <ProgressBar value={r.percent} color={r.color} height={8} />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Financial overview */}
                    <motion.div className="op-card" variants={itemVariants}>
                        <SectionTitle icon={BarChart3} iconBg="#dcfce7" iconColor="#428a26" title="Financial Overview" />
                        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
                            {[
                                { label: "Gross Revenue", value: "৳38.5M", sub: "+12.8% MoM", color: "#428a26", icon: DollarSign },
                                { label: "Total Expense", value: "৳6.4M", sub: "-5.2% MoM", color: "#ef4444", icon: TrendingDown },
                                { label: "Net Profit", value: "৳32.1M", sub: "+15.3% MoM", color: "#014fa1", icon: TrendingUp },
                                { label: "Pending Collection", value: "৳2.1M", sub: "22 invoices", color: "#f59e0b", icon: Clock },
                                { label: "Refund Amount", value: "৳0.28M", sub: "0.7% of revenue", color: "#7c3aed", icon: RotateCcw },
                            ].map((m, i) => (
                                <div key={i} className="op-fin-row">
                                    <div className="op-metric-icon" style={{ background: `${m.color}18`, color: m.color }}>
                                        <m.icon size={14} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div className="op-metric-label">{m.label}</div>
                                        <div style={{ fontSize: 10, color: "#94a3b8" }}>{m.sub}</div>
                                    </div>
                                    <div className="op-metric-val" style={{ color: m.color }}>{m.value}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Outlet Comparison Table ─────────────────── */}
            <motion.section className="op-section" variants={itemVariants}>
                <SectionTitle icon={BarChart3} iconBg="#dbeafe" iconColor="#014fa1" title="Outlet Comparison" subtitle="Key metrics side-by-side across outlets" />
                <motion.div className="op-card" variants={itemVariants}>
                    <div className="op-comp-wrapper">
                        <table className="op-comp-table">
                            <thead>
                                <tr>
                                    <th>Metric</th>
                                    <th>Dhanmondi</th>
                                    <th>Mirpur</th>
                                    <th>Uttara</th>
                                    <th>Company Avg</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((row, i) => (
                                    <tr key={i}>
                                        <td><strong>{row.metric}</strong></td>
                                        <td className="op-comp-best">{row.dhanmondi}</td>
                                        <td>{row.mirpur}</td>
                                        <td className={row.uttara.startsWith("-") ? "op-comp-bad" : ""}>{row.uttara}</td>
                                        <td style={{ color: "#64748b" }}>{row.avg}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </motion.section>

            {/* ── Outlet Performance Table ─────────────────── */}
            <motion.section className="op-section" variants={itemVariants}>
                <SectionTitle icon={Building2} iconBg="#f0fdf4" iconColor="#16a34a"
                    title={`Outlet Performance Details (${filtered.length})`}
                    subtitle="Comprehensive outlet-level metrics with sorting and filtering"
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
                                    <th>Outlet</th>
                                    {visibleCols.revenue && <th onClick={() => handleSort("revenue")} className="op-sortable">Revenue <SortIcon col="revenue" /></th>}
                                    {visibleCols.appointments && <th>Appointments</th>}
                                    {visibleCols.patients && <th>Patients</th>}
                                    {visibleCols.rating && <th onClick={() => handleSort("rating")} className="op-sortable">Rating <SortIcon col="rating" /></th>}
                                    {visibleCols.revGrowth && <th onClick={() => handleSort("revGrowth")} className="op-sortable">Rev Growth <SortIcon col="revGrowth" /></th>}
                                    {visibleCols.profit && <th>Profit</th>}
                                    {visibleCols.completion && <th onClick={() => handleSort("completion")} className="op-sortable">Completion <SortIcon col="completion" /></th>}
                                    {visibleCols.cancellation && <th onClick={() => handleSort("cancellation")} className="op-sortable">Cancellation <SortIcon col="cancellation" /></th>}
                                    {visibleCols.score && <th onClick={() => handleSort("score")} className="op-sortable">Score <SortIcon col="score" /></th>}
                                    {visibleCols.status && <th>Status</th>}
                                    {visibleCols.actions && <th>Trend</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.length === 0 ? (
                                    <tr><td colSpan={13} className="op-empty-state">
                                        <Search size={32} color="#cbd5e1" />
                                        <div>No outlets match your search.</div>
                                        <button className="op-btn-ghost" onClick={() => { setSearch(""); setFilterStatus("all"); }}>Clear Filters</button>
                                    </td></tr>
                                ) : paginated.map((o) => (
                                    <tr key={o.id} className="op-table-row">
                                        <td>
                                            <div className="op-outlet-cell">
                                                <div className="op-outlet-avatar">
                                                    <Building2 size={16} color="#014fa1" />
                                                </div>
                                                <div>
                                                    <div className="op-outlet-name">{o.name}</div>
                                                    <div className="op-outlet-id">{o.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        {visibleCols.revenue && <td><strong style={{ color: "#1e293b" }}>{o.revenue}</strong></td>}
                                        {visibleCols.appointments && <td>{o.appointments}</td>}
                                        {visibleCols.patients && <td>{o.patients}</td>}
                                        {visibleCols.rating && (
                                            <td>
                                                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                                    <Star size={12} fill="#f59e0b" color="#f59e0b" /> {o.rating}
                                                </div>
                                            </td>
                                        )}
                                        {visibleCols.revGrowth && (
                                            <td>
                                                <span className={`op-growth ${o.revGrowth.startsWith("+") ? "op-growth--up" : "op-growth--down"}`}>
                                                    {o.revGrowth.startsWith("+") ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                                    {o.revGrowth}
                                                </span>
                                            </td>
                                        )}
                                        {visibleCols.profit && <td>{o.profit}</td>}
                                        {visibleCols.completion && (
                                            <td><ProgressBar value={o.completion} color="#16a34a" height={6} showLabel /></td>
                                        )}
                                        {visibleCols.cancellation && (
                                            <td><ProgressBar value={o.cancellation} color="#ef4444" height={6} showLabel /></td>
                                        )}
                                        {visibleCols.score && (
                                            <td>
                                                <span className="op-score-pill" style={{ background: getScoreBg(o.score), color: getScoreColor(o.score) }}>
                                                    {o.score}
                                                </span>
                                            </td>
                                        )}
                                        {visibleCols.status && <td><StatusBadge status={o.status} /></td>}
                                        {visibleCols.actions && (
                                            <td>
                                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                    <Sparkline data={o.trend} color={o.revGrowth.startsWith("+") ? "#16a34a" : "#ef4444"} />
                                                </div>
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
                            Showing {Math.min((currentPage - 1) * rowsPerPage + 1, sorted.length)}–{Math.min(currentPage * rowsPerPage, sorted.length)} of {sorted.length} outlets
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