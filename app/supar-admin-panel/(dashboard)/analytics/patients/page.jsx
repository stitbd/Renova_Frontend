// app/super-admin-panel/analytics/patients/page.jsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./patient-trends.css";
import {
    // Core Icons
    Users, UserPlus, UserCheck, UserX, Calendar, Clock, Star,
    TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
    DollarSign, Heart, Brain, Bell, AlertTriangle, Info,
    CheckCircle, XCircle, Download, FileText, Share2, RefreshCw,
    Search, Filter, SlidersHorizontal, Save, RotateCcw,
    ChevronLeft, ChevronRight, ChevronUp, ChevronDown,
    MapPin, Building2, Activity, Target, Zap, Award,
    Percent, CreditCard, Phone, Mail, Globe, PieChart,
    Layers, BarChart3, LineChart, UsersRound, UserCircle,
    CalendarCheck, CalendarX, Hourglass, Gauge,
    ThumbsUp, ThumbsDown, MessageCircle, FileCheck,
    Briefcase, GraduationCap, MonitorSmartphone,
    Crown, Sparkles, Rocket, Flag, BookOpen,
    Circle, CircleDot, CircleIcon, Check,
    // Additional
    User as UserIcon, UserRound, UserRoundPlus,
    Users2, UserCog, Stethoscope, Syringe,
    Pill, HeartPulse, ActivitySquare, LineChart as LineChartIcon
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

// ─── Mock Data ──────────────────────────────────────────────────

// Patient KPI Data
const patientKpiData = [
    { label: "Total Patients", value: "18,432", change: "+9.8%", trend: "up", sub: "vs last month", icon: Users, color: "#014fa1", bg: "#dbeafe" },
    { label: "Active Patients", value: "14,287", change: "+12.4%", trend: "up", sub: "77.5% active rate", icon: UserCheck, color: "#428a26", bg: "#dcfce7" },
    { label: "Inactive Patients", value: "4,145", change: "-3.2%", trend: "up", sub: "22.5% inactive", icon: UserX, color: "#ef4444", bg: "#fee2e2" },
    { label: "New Patients", value: "5,821", change: "+16.4%", trend: "up", sub: "31.6% of total", icon: UserPlus, color: "#7c3aed", bg: "#ede9fe" },
    { label: "Returning Patients", value: "12,611", change: "+7.2%", trend: "up", sub: "68.4% returning", icon: RotateCcw, color: "#0891b2", bg: "#cffafe" },
    { label: "Patient Growth", value: "11.2%", change: "+2.1%", trend: "up", sub: "monthly growth", icon: TrendingUp, color: "#428a26", bg: "#dcfce7" },
    { label: "Retention Rate", value: "68.4%", change: "+2.8%", trend: "up", sub: "vs 65.6% prior", icon: Target, color: "#014fa1", bg: "#dbeafe" },
    { label: "Churn Rate", value: "31.6%", change: "-2.8%", trend: "up", sub: "reduced churn", icon: AlertTriangle, color: "#f59e0b", bg: "#fef3c7" },
    { label: "Avg Appointments", value: "2.4", change: "+0.3", trend: "up", sub: "per patient", icon: Calendar, color: "#7c3aed", bg: "#ede9fe" },
    { label: "Patient LTV", value: "৳9,820", change: "+6.8%", trend: "up", sub: "lifetime value", icon: DollarSign, color: "#428a26", bg: "#dcfce7" },
    { label: "Avg Rating", value: "4.7", change: "+0.1", trend: "up", sub: "patient rating", icon: Star, color: "#f59e0b", bg: "#fef3c7" },
    { label: "Satisfaction", value: "92%", change: "+3.2%", trend: "up", sub: "CSAT score", icon: Heart, color: "#ec4899", bg: "#fce7f3" },
    { label: "No-show Rate", value: "3.7%", change: "-0.8%", trend: "up", sub: "reduced rate", icon: Clock, color: "#f59e0b", bg: "#fef3c7" },
    { label: "Follow-up Rate", value: "68%", change: "+4.2%", trend: "up", sub: "completion rate", icon: CheckCircle, color: "#16a34a", bg: "#dcfce7" },
    { label: "Daily Active", value: "1,843", change: "+5.2%", trend: "up", sub: "patients active", icon: Activity, color: "#0891b2", bg: "#cffafe" },
    { label: "Weekly Active", value: "8,916", change: "+6.7%", trend: "up", sub: "weekly MAU", icon: UsersRound, color: "#014fa1", bg: "#dbeafe" },
];

// Patient Growth Data
const patientGrowthData = [
    { label: "Jan", newPatients: 280, returning: 420, total: 700 },
    { label: "Feb", newPatients: 310, returning: 445, total: 755 },
    { label: "Mar", newPatients: 290, returning: 460, total: 750 },
    { label: "Apr", newPatients: 350, returning: 510, total: 860 },
    { label: "May", newPatients: 380, returning: 540, total: 920 },
    { label: "Jun", newPatients: 420, returning: 580, total: 1000 },
    { label: "Jul", newPatients: 450, returning: 620, total: 1070 },
    { label: "Aug", newPatients: 490, returning: 680, total: 1170 },
    { label: "Sep", newPatients: 520, returning: 720, total: 1240 },
    { label: "Oct", newPatients: 560, returning: 780, total: 1340 },
    { label: "Nov", newPatients: 580, returning: 820, total: 1400 },
    { label: "Dec", newPatients: 610, returning: 880, total: 1490 },
];

// Monthly Active Data
const monthlyActiveData = [
    { label: "Jan", active: 4200 },
    { label: "Feb", active: 4350 },
    { label: "Mar", active: 4280 },
    { label: "Apr", active: 4620 },
    { label: "May", active: 4810 },
    { label: "Jun", active: 5080 },
    { label: "Jul", active: 5350 },
    { label: "Aug", active: 5680 },
    { label: "Sep", active: 5920 },
    { label: "Oct", active: 6240 },
    { label: "Nov", active: 6560 },
    { label: "Dec", active: 6910 },
];

// Cohort Retention Data
const cohortData = [
    { month: "Jan 2024", m0: 100, m1: 85, m2: 72, m3: 65, m4: 58, m5: 52, m6: 48 },
    { month: "Feb 2024", m0: 100, m1: 82, m2: 70, m3: 62, m4: 55, m5: 50, m6: 0 },
    { month: "Mar 2024", m0: 100, m1: 88, m2: 75, m3: 68, m4: 60, m5: 0, m6: 0 },
    { month: "Apr 2024", m0: 100, m1: 84, m2: 72, m3: 64, m4: 0, m5: 0, m6: 0 },
    { month: "May 2024", m0: 100, m1: 86, m2: 74, m3: 0, m4: 0, m5: 0, m6: 0 },
    { month: "Jun 2024", m0: 100, m1: 83, m2: 0, m3: 0, m4: 0, m5: 0, m6: 0 },
];

// Appointment Behavior Data
const appointmentBehaviorData = [
    { label: "Mon", completed: 320, cancelled: 28, noshow: 12 },
    { label: "Tue", completed: 345, cancelled: 22, noshow: 10 },
    { label: "Wed", completed: 380, cancelled: 30, noshow: 15 },
    { label: "Thu", completed: 410, cancelled: 18, noshow: 8 },
    { label: "Fri", completed: 390, cancelled: 25, noshow: 14 },
    { label: "Sat", completed: 280, cancelled: 20, noshow: 10 },
    { label: "Sun", completed: 220, cancelled: 15, noshow: 8 },
];

// Consultation Type Distribution
const consultationTypeData = [
    { name: "Video", value: 65, color: "#014fa1" },
    { name: "Physical", value: 35, color: "#428a26" },
];

// Peak Hours Data
const peakHoursData = [
    { hour: "6AM", value: 12 },
    { hour: "8AM", value: 45 },
    { hour: "10AM", value: 78 },
    { hour: "12PM", value: 65 },
    { hour: "2PM", value: 82 },
    { hour: "4PM", value: 58 },
    { hour: "6PM", value: 34 },
    { hour: "8PM", value: 18 },
    { hour: "10PM", value: 6 },
];

// Demographics Data
const ageData = [
    { label: "0-17", male: 8, female: 7, other: 1 },
    { label: "18-34", male: 22, female: 28, other: 3 },
    { label: "35-54", male: 19, female: 17, other: 2 },
    { label: "55+", male: 14, female: 11, other: 1 },
];

const genderData = [
    { name: "Male", value: 54, color: "#014fa1" },
    { name: "Female", value: 43, color: "#ec4899" },
    { name: "Other", value: 3, color: "#8b5cf6" },
];

// Geographic Data
const regionData = [
    { name: "Dhaka", patients: 6840, growth: "+12.4%", color: "#014fa1" },
    { name: "Chattogram", patients: 2910, growth: "+9.8%", color: "#428a26" },
    { name: "Sylhet", patients: 1620, growth: "+7.2%", color: "#7c3aed" },
    { name: "Khulna", patients: 1173, growth: "+5.6%", color: "#0891b2" },
    { name: "Rajshahi", patients: 942, growth: "+8.1%", color: "#ea580c" },
    { name: "Barishal", patients: 687, growth: "+4.3%", color: "#ec4899" },
];

const cityData = [
    { name: "Dhanmondi", patients: 3420, growth: "+15.2%" },
    { name: "Mirpur", patients: 2890, growth: "+11.8%" },
    { name: "Uttara", patients: 2350, growth: "+8.4%" },
    { name: "Gulshan", patients: 1980, growth: "+14.6%" },
    { name: "Banani", patients: 1650, growth: "+10.2%" },
];

// Satisfaction Data
const satisfactionData = {
    avg: 4.7,
    distribution: [
        { rating: 5, count: 8420 },
        { rating: 4, count: 5120 },
        { rating: 3, count: 2840 },
        { rating: 2, count: 1200 },
        { rating: 1, count: 852 },
    ],
    positive: 78,
    negative: 22,
};

// Patient Journey Data
const patientJourneyData = [
    { step: "Registration", count: 10000, pct: 100 },
    { step: "First Appointment", count: 8740, pct: 87.4 },
    { step: "Consultation", count: 7910, pct: 79.1 },
    { step: "Follow-up", count: 6120, pct: 61.2 },
    { step: "Returning Visit", count: 4680, pct: 46.8 },
    { step: "Long-term Active", count: 3240, pct: 32.4 },
];

// AI Insights
const patientInsights = [
    { type: "success", title: "Patient Growth Accelerating", text: "Patient registrations increased 16.4% this month — the highest growth rate in 6 months." },
    { type: "success", title: "Retention Improving", text: "Retention rate climbed to 68.4% — up 2.8% from last month's 65.6%." },
    { type: "warning", title: "Follow-up Drop-off", text: "32% of patients don't return for follow-up after first consultation. Consider automated reminders." },
    { type: "info", title: "Video Adoption Rising", text: "Video consultations now represent 65% of all appointments — up from 58% last quarter." },
    { type: "success", title: "Satisfaction Score High", text: "Patient satisfaction at 92% — exceeding industry average of 85%." },
    { type: "warning", title: "Regional Growth Gap", text: "Barishal region growing at 4.3% — significantly below Dhaka's 12.4% growth." },
];

// Alerts
const patientAlerts = [
    { type: "error", title: "High Churn in 18-34", desc: "Patients aged 18-34 showing 38% churn rate — 12% above average.", time: "2h ago" },
    { type: "warning", title: "No-show Rate Increasing", desc: "No-show rate increased to 4.2% this week — trend needs monitoring.", time: "4h ago" },
    { type: "warning", title: "Follow-up Drop-off", desc: "Follow-up completion rate dropped to 62% — below 68% target.", time: "1d ago" },
    { type: "info", title: "New Patient Growth", desc: "New patient registrations in Dhaka region up 22% this month.", time: "6h ago" },
];

// Comparison Data
const comparisonData = [
    { metric: "Active Patients", current: "14,287", previous: "12,713", change: "+12.4%", trend: "up" },
    { metric: "New Patients", current: "5,821", previous: "5,001", change: "+16.4%", trend: "up" },
    { metric: "Retention Rate", current: "68.4%", previous: "65.6%", change: "+2.8%", trend: "up" },
    { metric: "Churn Rate", current: "31.6%", previous: "34.4%", change: "-2.8%", trend: "up" },
    { metric: "Avg Appointments", current: "2.4", previous: "2.1", change: "+0.3", trend: "up" },
    { metric: "Patient LTV", current: "৳9,820", previous: "৳9,190", change: "+6.8%", trend: "up" },
    { metric: "Avg Rating", current: "4.7", previous: "4.6", change: "+0.1", trend: "up" },
    { metric: "Satisfaction", current: "92%", previous: "89%", change: "+3.2%", trend: "up" },
];

// Table Data
const patientTableData = [
    {
        id: "REG-001", region: "Dhaka", registered: "6,840", active: "5,480",
        newPatients: "2,120", returning: "3,360", retention: "71.2%",
        churn: "28.8%", avgVisits: "2.6", satisfaction: "94%", growth: "+12.4%",
        score: 92, trend: "up", trendData: [22, 28, 25, 35, 32, 42, 38, 48]
    },
    {
        id: "REG-002", region: "Chattogram", registered: "2,910", active: "2,210",
        newPatients: "820", returning: "1,390", retention: "65.8%",
        churn: "34.2%", avgVisits: "2.3", satisfaction: "89%", growth: "+9.8%",
        score: 84, trend: "up", trendData: [15, 22, 19, 31, 28, 38, 34, 42]
    },
    {
        id: "REG-003", region: "Sylhet", registered: "1,620", active: "1,200",
        newPatients: "480", returning: "720", retention: "62.4%",
        churn: "37.6%", avgVisits: "2.1", satisfaction: "86%", growth: "+7.2%",
        score: 78, trend: "up", trendData: [12, 18, 15, 24, 21, 30, 27, 35]
    },
    {
        id: "REG-004", region: "Khulna", registered: "1,173", active: "840",
        newPatients: "310", returning: "530", retention: "58.2%",
        churn: "41.8%", avgVisits: "1.9", satisfaction: "82%", growth: "+5.6%",
        score: 72, trend: "up", trendData: [10, 14, 12, 18, 16, 22, 19, 24]
    },
    {
        id: "REG-005", region: "Rajshahi", registered: "942", active: "680",
        newPatients: "250", returning: "430", retention: "60.5%",
        churn: "39.5%", avgVisits: "2.0", satisfaction: "84%", growth: "+8.1%",
        score: 76, trend: "up", trendData: [11, 16, 13, 20, 18, 26, 22, 30]
    },
    {
        id: "REG-006", region: "Barishal", registered: "687", active: "480",
        newPatients: "160", returning: "320", retention: "55.3%",
        churn: "44.7%", avgVisits: "1.8", satisfaction: "80%", growth: "+4.3%",
        score: 65, trend: "up", trendData: [9, 12, 10, 15, 13, 18, 16, 20]
    },
];

// ─── Helpers ─────────────────────────────────────────────────────
const getScoreColor = (s) => s >= 90 ? "#16a34a" : s >= 80 ? "#014fa1" : s >= 70 ? "#f59e0b" : "#ef4444";
const getScoreBg = (s) => s >= 90 ? "#dcfce7" : s >= 80 ? "#dbeafe" : s >= 70 ? "#fef3c7" : "#fee2e2";

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
                <linearGradient id={`pt-sg-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.18" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon fill={`url(#pt-sg-${color.replace("#", "")})`} points={`0,22 12,18 24,20 36,12 48,15 60,8 72,11 84,4 84,28 0,28`} />
            <polyline fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" points={pts} />
        </svg>
    );
};

const ProgressBar = ({ value, color, height = 6, showLabel = false, label = "" }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {showLabel && <span style={{ fontSize: 11, fontWeight: 700, color: "#1e293b", minWidth: 40 }}>{label || `${value}%`}</span>}
        <div style={{ flex: 1, height, background: "#f1f5f9", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${value}%`, background: color, borderRadius: 99, transition: "width 0.8s ease" }} />
        </div>
        {!showLabel && <span style={{ fontSize: 10, fontWeight: 700, color: "#64748b", minWidth: 28 }}>{value}%</span>}
    </div>
);

const InsightIcon = ({ type }) => {
    const map = { success: CheckCircle, warning: AlertTriangle, info: Info, error: XCircle };
    const Icon = map[type] || Info;
    return <Icon size={15} />;
};

const SectionTitle = ({ icon: Icon, iconBg, iconColor, title, subtitle, action }) => (
    <div className="pt-section-title">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="pt-title-icon" style={{ background: iconBg, color: iconColor }}>
                <Icon size={16} />
            </div>
            <div>
                <h2 className="pt-title-text">{title}</h2>
                {subtitle && <p className="pt-title-sub">{subtitle}</p>}
            </div>
        </div>
        {action && <div className="pt-title-action">{action}</div>}
    </div>
);

const KPICard = ({ label, value, change, trend, sub, icon: Icon, color, bg }) => (
    <motion.div className="pt-kpi-card" variants={itemVariants} whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(4,65,125,0.11)" }}>
        <div className="pt-kpi-accent" style={{ background: color }} />
        <div className="pt-kpi-body">
            <div className="pt-kpi-top">
                <div className="pt-kpi-icon" style={{ background: bg }}>
                    <Icon size={16} color={color} />
                </div>
                <div className={`pt-kpi-badge ${trend === "up" ? "pt-kpi-badge--up" : trend === "down" ? "pt-kpi-badge--down" : "pt-kpi-badge--neutral"}`}>
                    {trend === "up" ? <ArrowUpRight size={10} /> : trend === "down" ? <ArrowDownRight size={10} /> : null}
                    {change}
                </div>
            </div>
            <div className="pt-kpi-value">{value}</div>
            <div className="pt-kpi-label">{label}</div>
            <div className="pt-kpi-footer">
                <span className="pt-kpi-trend-label">{sub}</span>
                <div className="pt-kpi-spark">
                    <MiniSparkline color={color} />
                </div>
            </div>
        </div>
    </motion.div>
);

const SkeletonKPI = () => (
    <div className="pt-kpi-card pt-skeleton-card">
        <div className="pt-sk" style={{ height: 3, borderRadius: 0, width: "100%" }} />
        <div className="pt-kpi-body" style={{ gap: 8 }}>
            <div className="pt-kpi-top">
                <div className="pt-sk pt-sk--icon" />
                <div className="pt-sk" style={{ height: 20, width: 52, borderRadius: 20 }} />
            </div>
            <div className="pt-sk pt-sk--val" />
            <div className="pt-sk pt-sk--lbl" />
            <div className="pt-sk pt-sk--spark" style={{ marginTop: 6 }} />
        </div>
    </div>
);
// ─── Main Page ───────────────────────────────────────────────────
export default function PatientTrendsPage() {
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortCol, setSortCol] = useState(null);
    const [sortDir, setSortDir] = useState("asc");
    const [filterRegion, setFilterRegion] = useState("all");
    const [filterAge, setFilterAge] = useState("all");
    const [filterGender, setFilterGender] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const rowsPerPage = 5;

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 1400);
        return () => clearTimeout(t);
    }, []);

    const filtered = patientTableData.filter(d => {
        const matchSearch = d.region.toLowerCase().includes(search.toLowerCase()) || d.id.includes(search);
        const matchRegion = filterRegion === "all" || d.region === filterRegion;
        return matchSearch && matchRegion;
    });

    const sorted = sortCol
        ? [...filtered].sort((a, b) => {
            const av = a[sortCol]; const bv = b[sortCol];
            if (typeof av === "number") return sortDir === "asc" ? av - bv : bv - av;
            if (typeof av === "string" && av.includes("%")) {
                const an = parseFloat(av); const bn = parseFloat(bv);
                return sortDir === "asc" ? an - bn : bn - an;
            }
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
        <span className="pt-sort-icon">
            {sortCol === col ? (sortDir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />) : <ChevronDown size={12} style={{ opacity: 0.3 }} />}
        </span>
    );

    const maxGrowth = Math.max(...patientGrowthData.map(d => d.total));

    return (
        <motion.div className="pt-page" initial="hidden" animate="visible" variants={containerVariants}>

            {/* ── Page Header ────────────────────────────── */}
            <motion.div className="pt-header" variants={itemVariants}>
                <div className="pt-header-left">
                    <div className="pt-live-badge">
                        <span className="pt-live-dot" />
                        <span>Live</span>
                    </div>
                    <h1 className="pt-page-title">Patient Trends Analytics</h1>
                    <p className="pt-page-sub">Last updated 2 minutes ago · Real-time patient behavior, growth, and engagement metrics</p>
                </div>
                <div className="pt-header-actions">
                    <select className="pt-ctrl-select">
                        <option>All Genders</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                    <select className="pt-ctrl-select">
                        <option>All Age Groups</option>
                        <option>0-17</option>
                        <option>18-34</option>
                        <option>35-54</option>
                        <option>55+</option>
                    </select>
                    <select className="pt-ctrl-select">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                    <input type="date" className="pt-ctrl-input" />
                    <input type="date" className="pt-ctrl-input" />
                    <button className="pt-btn-ghost"><RefreshCw size={14} /></button>
                    <button className="pt-btn-ghost"><Download size={14} /> <span>Excel</span></button>
                    <button className="pt-btn-ghost"><FileText size={14} /> <span>PDF</span></button>
                    <button className="pt-btn-primary"><Share2 size={14} /> Share</button>
                </div>
            </motion.div>

            {/* ── Smart Filters ───────────────────────────── */}
            <motion.div className="pt-filters" variants={itemVariants}>
                <div className="pt-filter-search">
                    <Search size={14} color="#94a3b8" />
                    <input type="text" placeholder="Search by region or ID…" value={search} onChange={e => setSearch(e.target.value)} />
                    {search && <button onClick={() => setSearch("")}><X size={12} /></button>}
                </div>
                <select className="pt-ctrl-select" value={filterRegion} onChange={e => setFilterRegion(e.target.value)}>
                    <option value="all">All Regions</option>
                    {regionData.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}
                </select>
                <select className="pt-ctrl-select" value={filterAge} onChange={e => setFilterAge(e.target.value)}>
                    <option value="all">All Ages</option>
                    {ageData.map(a => <option key={a.label} value={a.label}>{a.label}</option>)}
                </select>
                <select className="pt-ctrl-select" value={filterGender} onChange={e => setFilterGender(e.target.value)}>
                    <option value="all">All Genders</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <select className="pt-ctrl-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <input type="date" className="pt-ctrl-input" />
                <input type="date" className="pt-ctrl-input" />
                <div className="pt-filter-actions">
                    <button className="pt-btn-ghost" onClick={() => { setSearch(""); setFilterRegion("all"); setFilterAge("all"); setFilterGender("all"); setFilterStatus("all"); }}>
                        <RotateCcw size={13} /> Reset
                    </button>
                    <button className="pt-btn-primary" style={{ padding: "7px 14px" }}>
                        <Save size={13} /> Save
                    </button>
                </div>
            </motion.div>

            {/* ── Executive KPI Cards ─────────────────────── */}
            <motion.section className="pt-section" variants={itemVariants}>
                <SectionTitle icon={Zap} iconBg="#fef3c7" iconColor="#d97706" title="Executive KPIs" subtitle="Real-time patient growth, engagement, and satisfaction metrics" />
                <motion.div className="pt-kpi-grid" variants={containerVariants}>
                    {loading
                        ? Array(16).fill(0).map((_, i) => <SkeletonKPI key={i} />)
                        : patientKpiData.map((k, i) => <KPICard key={i} {...k} />)
                    }
                </motion.div>
            </motion.section>

            {/* ── Patient Growth Analytics ─────────────────── */}
            <motion.section className="pt-section" variants={itemVariants}>
                <SectionTitle
                    icon={LineChartIcon}
                    iconBg="#dbeafe"
                    iconColor="#014fa1"
                    title="Patient Growth Analytics"
                    subtitle="New vs returning patient trends, active patient growth, and forecast"
                    action={
                        <div style={{ display: "flex", gap: 8 }}>
                            <button className="pt-btn-ghost"><TrendingUp size={13} /> Growth</button>
                            <button className="pt-btn-ghost"><Calendar size={13} /> Monthly</button>
                        </div>
                    }
                />
                <div className="pt-two-col">
                    <motion.div className="pt-card" variants={itemVariants}>
                        <h3 className="pt-card-subtitle">Monthly Growth Trend</h3>
                        <div className="pt-growth-chart">
                            {patientGrowthData.map((d, i) => (
                                <div key={i} className="pt-growth-group">
                                    <div className="pt-growth-bars">
                                        <div className="pt-growth-bar-wrap">
                                            <div className="pt-growth-bar pt-growth-bar--returning" style={{ height: `${(d.returning / maxGrowth) * 90}%` }} title={`Returning: ${d.returning}`} />
                                            <div className="pt-growth-bar pt-growth-bar--new" style={{ height: `${(d.newPatients / maxGrowth) * 90}%` }} title={`New: ${d.newPatients}`} />
                                        </div>
                                        <div className="pt-growth-val">{d.total}</div>
                                    </div>
                                    <div className="pt-growth-label">{d.label}</div>
                                </div>
                            ))}
                        </div>
                        <div className="pt-chart-legend" style={{ marginTop: 10 }}>
                            <span className="pt-legend-dot" style={{ background: "#014fa1" }} /> New Patients
                            <span className="pt-legend-dot" style={{ background: "#428a26", marginLeft: 14 }} /> Returning
                        </div>
                    </motion.div>

                    {/* ── Active Patient Trend ─────────────────────────────── */}
                    <motion.div className="pt-card" variants={itemVariants}>
                        <h3 className="pt-card-subtitle">Active Patient Trend</h3>
                        <div className="pt-stacked-area">
                            <svg
                                viewBox="0 0 400 180"
                                preserveAspectRatio="none"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'block',
                                    maxWidth: '100%'
                                }}
                            >
                                <defs>
                                    <linearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#014fa1" stopOpacity="0.3" />
                                        <stop offset="100%" stopColor="#014fa1" stopOpacity="0.05" />
                                    </linearGradient>
                                </defs>
                                {monthlyActiveData.map((d, i) => {
                                    const x = (i / (monthlyActiveData.length - 1)) * 380 + 10;
                                    const y = 170 - (d.active / 8000) * 150;
                                    return (
                                        <circle key={i} cx={x} cy={y} r="3" fill="#014fa1" />
                                    );
                                })}
                                <polygon
                                    fill="url(#activeGrad)"
                                    points={monthlyActiveData.map((d, i) => {
                                        const x = (i / (monthlyActiveData.length - 1)) * 380 + 10;
                                        const y = 170 - (d.active / 8000) * 150;
                                        return `${x},${y}`;
                                    }).join(" ") + ` ${390},170 10,170`}
                                />
                                <polyline
                                    fill="none"
                                    stroke="#014fa1"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    points={monthlyActiveData.map((d, i) => {
                                        const x = (i / (monthlyActiveData.length - 1)) * 380 + 10;
                                        const y = 170 - (d.active / 8000) * 150;
                                        return `${x},${y}`;
                                    }).join(" ")}
                                />
                                <text x="390" y="20" fontSize="11" fontWeight="800" fill="#014fa1" textAnchor="end">
                                    {monthlyActiveData[monthlyActiveData.length - 1].active.toLocaleString()}
                                </text>
                                <text x="390" y="36" fontSize="9" fill="#94a3b8" textAnchor="end">Active</text>
                            </svg>
                        </div>
                        <div className="pt-chart-legend">
                            <span className="pt-legend-dot" style={{ background: "#014fa1" }} /> Monthly Active Patients
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Cohort Retention Analysis ────────────────── */}
            <motion.section className="pt-section" variants={itemVariants}>
                <SectionTitle
                    icon={Target}
                    iconBg="#ede9fe"
                    iconColor="#7c3aed"
                    title="Cohort Retention Analysis"
                    subtitle="Patient retention by acquisition cohort over time"
                />
                <motion.div className="pt-card" variants={itemVariants}>
                    <div className="pt-cohort-wrapper">
                        <table className="pt-cohort-table">
                            <thead>
                                <tr>
                                    <th>Cohort</th>
                                    <th>M0</th>
                                    <th>M1</th>
                                    <th>M2</th>
                                    <th>M3</th>
                                    <th>M4</th>
                                    <th>M5</th>
                                    <th>M6</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cohortData.map((c, i) => (
                                    <tr key={i}>
                                        <td className="pt-cohort-month">{c.month}</td>
                                        {[c.m0, c.m1, c.m2, c.m3, c.m4, c.m5, c.m6].map((v, j) => (
                                            <td key={j}>
                                                <span className="pt-cohort-cell" style={{
                                                    background: v > 80 ? "#dcfce7" : v > 60 ? "#dbeafe" : v > 40 ? "#fef3c7" : "#fee2e2",
                                                    color: v > 80 ? "#16a34a" : v > 60 ? "#014fa1" : v > 40 ? "#d97706" : "#ef4444"
                                                }}>
                                                    {v > 0 ? `${v}%` : "-"}
                                                </span>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </motion.section>

            {/* ── Appointment Behavior ────────────────────── */}
            <motion.section className="pt-section" variants={itemVariants}>
                <SectionTitle
                    icon={Calendar}
                    iconBg="#cffafe"
                    iconColor="#0891b2"
                    title="Appointment Behavior"
                    subtitle="Weekly appointment trends, peak hours, and consultation type distribution"
                />
                <div className="pt-two-col">
                    <motion.div className="pt-card" variants={itemVariants}>
                        <h3 className="pt-card-subtitle">Weekly Appointment Behavior</h3>
                        <div className="pt-stacked-chart" style={{ height: 160 }}>
                            {appointmentBehaviorData.map((d, i) => {
                                const total = d.completed + d.cancelled + d.noshow;
                                return (
                                    <div key={i} className="pt-stacked-group">
                                        <div className="pt-stacked-bar-wrap">
                                            <div className="pt-stacked-bar-total">{total}</div>
                                            <div className="pt-stacked-bar">
                                                <div style={{ height: `${(d.completed / 450) * 100}%`, background: "#016034" }} title={`Completed: ${d.completed}`} />
                                                <div style={{ height: `${(d.cancelled / 450) * 100}%`, background: "#ef4444" }} title={`Cancelled: ${d.cancelled}`} />
                                                <div style={{ height: `${(d.noshow / 450) * 100}%`, background: "#f59e0b" }} title={`No-Show: ${d.noshow}`} />
                                            </div>
                                        </div>
                                        <div className="pt-bar-label">{d.label}</div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="pt-chart-legend" style={{ marginTop: 10 }}>
                            <span className="pt-legend-dot" style={{ background: "#016034" }} /> Completed
                            <span className="pt-legend-dot" style={{ background: "#ef4444", marginLeft: 14 }} /> Cancelled
                            <span className="pt-legend-dot" style={{ background: "#f59e0b", marginLeft: 14 }} /> No-Show
                        </div>
                    </motion.div>

                    <motion.div className="pt-card" variants={itemVariants}>
                        <h3 className="pt-card-subtitle">Consultation Type & Peak Hours</h3>
                        <div className="pt-two-col" style={{ gap: 16 }}>
                            <div>
                                <div className="pt-donut-row">
                                    <svg viewBox="0 0 100 100" width={120} height={120}>
                                        {consultationTypeData.reduce((acc, item, i) => {
                                            const offset = acc.offset;
                                            const dash = item.value * 2.513;
                                            const gap = 251.2;
                                            acc.elements.push(
                                                <circle key={i} cx="50" cy="50" r="40" fill="none" stroke={item.color} strokeWidth="18"
                                                    strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-offset}
                                                    style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }} />
                                            );
                                            acc.offset += dash;
                                            return acc;
                                        }, { offset: 0, elements: [] }).elements}
                                        <text x="50" y="46" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1e293b">24.6K</text>
                                        <text x="50" y="58" textAnchor="middle" fontSize="7" fill="#64748b">Total</text>
                                    </svg>
                                    <div className="pt-donut-legend">
                                        {consultationTypeData.map((item, i) => (
                                            <div key={i} className="pt-donut-item">
                                                <span className="pt-legend-dot" style={{ background: item.color }} />
                                                <span className="pt-donut-label">{item.name}</span>
                                                <span className="pt-donut-val">{item.value}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 style={{ fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 8 }}>Peak Booking Hours</h4>
                                <div className="pt-hbars" style={{ gap: 6 }}>
                                    {peakHoursData.slice(0, 6).map((h, i) => (
                                        <div key={i} className="pt-hbar-item" style={{ gap: 3 }}>
                                            <div className="pt-hbar-meta">
                                                <span className="pt-hbar-name" style={{ fontSize: 10 }}>{h.hour}</span>
                                                <span className="pt-hbar-val" style={{ fontSize: 10 }}>{h.value}</span>
                                            </div>
                                            <ProgressBar value={(h.value / 82) * 100} color="#014fa1" height={4} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Patient Demographics ────────────────────── */}
            <motion.section className="pt-section" variants={itemVariants}>
                <SectionTitle
                    icon={UsersRound}
                    iconBg="#dcfce7"
                    iconColor="#428a26"
                    title="Patient Demographics"
                    subtitle="Age distribution, gender breakdown, and patient composition"
                />
                <div className="pt-three-col">
                    <motion.div className="pt-card" variants={itemVariants}>
                        <h3 className="pt-card-subtitle">Age & Gender Distribution</h3>
                        <div className="pt-demo-chart">
                            {ageData.map((g, i) => (
                                <div key={i} className="pt-demo-row">
                                    <div className="pt-demo-label">{g.label}</div>
                                    <div className="pt-demo-bars">
                                        <div className="pt-demo-bar pt-demo-bar--male" style={{ width: `${g.male * 2.5}px` }} title={`Male ${g.male}%`}>{g.male}%</div>
                                        <div className="pt-demo-bar pt-demo-bar--female" style={{ width: `${g.female * 2.5}px` }} title={`Female ${g.female}%`}>{g.female}%</div>
                                        {g.other > 0 && (
                                            <div className="pt-demo-bar pt-demo-bar--other" style={{ width: `${g.other * 2.5}px` }} title={`Other ${g.other}%`}>{g.other}%</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="pt-chart-legend" style={{ marginTop: 10 }}>
                                <span className="pt-legend-dot" style={{ background: "#014fa1" }} /> Male
                                <span className="pt-legend-dot" style={{ background: "#ec4899", marginLeft: 14 }} /> Female
                                <span className="pt-legend-dot" style={{ background: "#8b5cf6", marginLeft: 14 }} /> Other
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="pt-card" variants={itemVariants}>
                        <h3 className="pt-card-subtitle">Gender Distribution</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
                            {genderData.map((g, i) => (
                                <div key={i}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                        <span style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>{g.name}</span>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: g.color }}>{g.value}%</span>
                                    </div>
                                    <ProgressBar value={g.value} color={g.color} height={8} />
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: 12, padding: 12, background: "#f8fafc", borderRadius: 8, textAlign: "center" }}>
                            <span style={{ fontSize: 11, color: "#64748b" }}>Total Patients: <strong style={{ color: "#1e293b" }}>18,432</strong></span>
                        </div>
                    </motion.div>

                    <motion.div className="pt-card" variants={itemVariants}>
                        <h3 className="pt-card-subtitle">Patient Engagement Metrics</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
                            {[
                                { label: "Daily Active", value: "1,843", pct: 10, color: "#014fa1" },
                                { label: "Weekly Active", value: "8,916", pct: 48, color: "#428a26" },
                                { label: "Monthly Active", value: "14,287", pct: 77.5, color: "#7c3aed" },
                                { label: "Engagement Score", value: "84/100", pct: 84, color: "#0891b2" },
                            ].map((m, i) => (
                                <div key={i}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                        <span style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>{m.label}</span>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: m.color }}>{m.value}</span>
                                    </div>
                                    <ProgressBar value={m.pct} color={m.color} height={6} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Geographic Analytics ────────────────────── */}
            <motion.section className="pt-section" variants={itemVariants}>
                <SectionTitle
                    icon={MapPin}
                    iconBg="#ffedd5"
                    iconColor="#ea580c"
                    title="Geographic Analytics"
                    subtitle="Patient distribution by region and city with growth trends"
                />
                <div className="pt-two-col">
                    <motion.div className="pt-card" variants={itemVariants}>
                        <h3 className="pt-card-subtitle">Patients by Region</h3>
                        <div className="pt-geo-list">
                            {regionData.map((r, i) => (
                                <div key={i} className="pt-geo-item">
                                    <div className="pt-geo-meta">
                                        <span className="pt-geo-name">{r.name}</span>
                                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                            <span className="pt-geo-growth" style={{ color: r.growth.startsWith("+") ? "#16a34a" : "#ef4444" }}>
                                                {r.growth}
                                            </span>
                                            <span className="pt-geo-value">{r.patients.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <ProgressBar value={(r.patients / 7000) * 100} color={r.color} height={7} />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="pt-card" variants={itemVariants}>
                        <h3 className="pt-card-subtitle">Top Cities</h3>
                        <div className="pt-geo-list">
                            {cityData.map((c, i) => (
                                <div key={i} className="pt-geo-item">
                                    <div className="pt-geo-meta">
                                        <span className="pt-geo-name">{c.name}</span>
                                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                            <span className="pt-geo-growth" style={{ color: c.growth.startsWith("+") ? "#16a34a" : "#ef4444" }}>
                                                {c.growth}
                                            </span>
                                            <span className="pt-geo-value">{c.patients.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <ProgressBar value={(c.patients / 3500) * 100} color={["#014fa1", "#428a26", "#7c3aed", "#0891b2", "#ea580c"][i]} height={7} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Patient Satisfaction ────────────────────── */}
            <motion.section className="pt-section" variants={itemVariants}>
                <SectionTitle
                    icon={Star}
                    iconBg="#fef3c7"
                    iconColor="#d97706"
                    title="Patient Satisfaction Analytics"
                    subtitle="Average ratings, sentiment distribution, and feedback trends"
                />
                <div className="pt-two-col">
                    <motion.div className="pt-card" variants={itemVariants}>
                        <h3 className="pt-card-subtitle">Satisfaction Score Overview</h3>
                        <div className="pt-satisfaction-grid">
                            {[
                                { label: "Average Rating", value: "4.7/5", icon: Star, color: "#f59e0b" },
                                { label: "Satisfaction Score", value: "92%", icon: Heart, color: "#ec4899" },
                                { label: "Positive Feedback", value: "78%", icon: ThumbsUp, color: "#428a26" },
                                { label: "Negative Feedback", value: "22%", icon: ThumbsDown, color: "#ef4444" },
                            ].map((item, i) => (
                                <div key={i} className="pt-satisfaction-item">
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                                        <item.icon size={16} color={item.color} />
                                        <div className="pt-satisfaction-value" style={{ color: item.color }}>{item.value}</div>
                                    </div>
                                    <div className="pt-satisfaction-label">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="pt-card" variants={itemVariants}>
                        <h3 className="pt-card-subtitle">Rating Distribution</h3>
                        <div className="pt-hbars" style={{ gap: 8 }}>
                            {satisfactionData.distribution.map((d, i) => (
                                <div key={i} className="pt-hbar-item" style={{ gap: 3 }}>
                                    <div className="pt-hbar-meta">
                                        <span className="pt-hbar-name" style={{ fontSize: 11 }}>
                                            {d.rating} {d.rating === 5 ? "★" : d.rating === 4 ? "★" : ""}
                                        </span>
                                        <span className="pt-hbar-val" style={{ fontSize: 11 }}>{d.count.toLocaleString()}</span>
                                    </div>
                                    <ProgressBar value={(d.count / 8500) * 100} color={d.rating >= 4 ? "#428a26" : d.rating >= 3 ? "#f59e0b" : "#ef4444"} height={6} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Patient Journey Funnel ──────────────────── */}
            <motion.section className="pt-section" variants={itemVariants}>
                <SectionTitle
                    icon={ActivitySquare}
                    iconBg="#ede9fe"
                    iconColor="#7c3aed"
                    title="Patient Journey Funnel"
                    subtitle="Complete patient lifecycle from registration to long-term active status"
                />
                <motion.div className="pt-card" variants={itemVariants}>
                    <div className="pt-funnel">
                        {patientJourneyData.map((step, i) => (
                            <div key={i} className="pt-funnel-step" style={{ borderLeftColor: ["#014fa1", "#428a26", "#7c3aed", "#0891b2", "#f59e0b", "#ec4899"][i] }}>
                                <div className="pt-funnel-step-label">{step.step}</div>
                                <div className="pt-funnel-step-bar">
                                    <div className="pt-funnel-step-fill" style={{ width: `${step.pct}%`, background: `linear-gradient(90deg, ${["#014fa1", "#428a26", "#7c3aed", "#0891b2", "#f59e0b", "#ec4899"][i]}, ${["#014fa1", "#428a26", "#7c3aed", "#0891b2", "#f59e0b", "#ec4899"][i]}88)` }} />
                                </div>
                                <div className="pt-funnel-step-value">{step.count.toLocaleString()}</div>
                                <div className="pt-funnel-step-pct">{step.pct}%</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.section>

            {/* ── AI Insights + Alerts ─────────────────────── */}
            <motion.section className="pt-section" variants={itemVariants}>
                <div className="pt-two-col">
                    <motion.div className="pt-card" variants={itemVariants}>
                        <SectionTitle icon={Brain} iconBg="#ede9fe" iconColor="#7c3aed" title="AI Business Insights" />
                        <div className="pt-insights-list">
                            {patientInsights.map((ins, i) => (
                                <div key={i} className={`pt-insight-item pt-insight--${ins.type}`}>
                                    <div className="pt-insight-icon"><InsightIcon type={ins.type} /></div>
                                    <div>
                                        <div className="pt-insight-title">{ins.title}</div>
                                        <div className="pt-insight-text">{ins.text}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="pt-card" variants={itemVariants}>
                        <SectionTitle icon={Bell} iconBg="#fee2e2" iconColor="#ef4444" title="Critical Alerts"
                            action={<span className="pt-alert-count">{patientAlerts.filter(a => a.type === "error").length} Critical</span>} />
                        <div className="pt-alerts-list">
                            {patientAlerts.map((a, i) => (
                                <div key={i} className={`pt-alert-item pt-insight--${a.type}`}>
                                    <div className="pt-insight-icon"><AlertTriangle size={15} /></div>
                                    <div style={{ flex: 1 }}>
                                        <div className="pt-alert-header">
                                            <span className="pt-insight-title">{a.title}</span>
                                            <span className="pt-alert-time">{a.time}</span>
                                        </div>
                                        <div className="pt-insight-text">{a.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Comparison Analytics ────────────────────── */}
            <motion.section className="pt-section" variants={itemVariants}>
                <SectionTitle
                    icon={BarChart3}
                    iconBg="#dbeafe"
                    iconColor="#014fa1"
                    title="Period Comparison"
                    subtitle="Current vs previous period performance comparison"
                />
                <motion.div className="pt-card" variants={itemVariants}>
                    <div className="pt-comp-wrapper">
                        <table className="pt-comp-table">
                            <thead>
                                <tr>
                                    <th>Metric</th>
                                    <th>Current</th>
                                    <th>Previous</th>
                                    <th>Change</th>
                                    <th>Trend</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((row, i) => (
                                    <tr key={i}>
                                        <td><strong>{row.metric}</strong></td>
                                        <td className="pt-comp-best">{row.current}</td>
                                        <td>{row.previous}</td>
                                        <td className={row.change.startsWith("+") ? "pt-comp-best" : row.change.startsWith("-") ? "pt-comp-bad" : ""}>
                                            {row.change}
                                        </td>
                                        <td>
                                            <span className={`pt-growth ${row.trend === "up" ? "pt-growth--up" : "pt-growth--down"}`}>
                                                {row.trend === "up" ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                                {row.trend === "up" ? "Improving" : "Declining"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </motion.section>

            {/* ── Patient Trends Table ─────────────────────── */}
            <motion.section className="pt-section" variants={itemVariants}>
                <SectionTitle
                    icon={Users}
                    iconBg="#f0fdf4"
                    iconColor="#16a34a"
                    title={`Patient Trends by Region (${filtered.length})`}
                    subtitle="Comprehensive regional patient metrics with sorting and filtering"
                    action={
                        <div style={{ display: "flex", gap: 8 }}>
                            <button className="pt-btn-ghost"><SlidersHorizontal size={13} /> Columns</button>
                            <button className="pt-btn-ghost"><Download size={13} /> Export</button>
                            <button className="pt-btn-primary"><FileText size={13} /> PDF</button>
                        </div>
                    }
                />

                <motion.div className="pt-card pt-table-card" variants={itemVariants}>
                    <div className="pt-table-wrapper">
                        <table className="pt-trend-table">
                            <thead>
                                <tr>
                                    <th>Region</th>
                                    <th onClick={() => handleSort("registered")} className="pt-sortable">Registered <SortIcon col="registered" /></th>
                                    <th onClick={() => handleSort("active")} className="pt-sortable">Active <SortIcon col="active" /></th>
                                    <th onClick={() => handleSort("newPatients")} className="pt-sortable">New Patients <SortIcon col="newPatients" /></th>
                                    <th onClick={() => handleSort("returning")} className="pt-sortable">Returning <SortIcon col="returning" /></th>
                                    <th onClick={() => handleSort("retention")} className="pt-sortable">Retention <SortIcon col="retention" /></th>
                                    <th onClick={() => handleSort("churn")} className="pt-sortable">Churn <SortIcon col="churn" /></th>
                                    <th onClick={() => handleSort("avgVisits")} className="pt-sortable">Avg Visits <SortIcon col="avgVisits" /></th>
                                    <th onClick={() => handleSort("satisfaction")} className="pt-sortable">Satisfaction <SortIcon col="satisfaction" /></th>
                                    <th onClick={() => handleSort("growth")} className="pt-sortable">Growth <SortIcon col="growth" /></th>
                                    <th>Trend</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.length === 0 ? (
                                    <tr><td colSpan={11} className="pt-empty-state">
                                        <Search size={32} color="#cbd5e1" />
                                        <div>No regions match your search criteria.</div>
                                        <button className="pt-btn-ghost" onClick={() => { setSearch(""); setFilterRegion("all"); }}>
                                            Clear Filters
                                        </button>
                                    </td></tr>
                                ) : paginated.map((d) => (
                                    <tr key={d.id} className="pt-table-row">
                                        <td>
                                            <div className="pt-region-cell">
                                                <div className="pt-region-avatar" style={{ background: ["#dbeafe", "#dcfce7", "#ede9fe", "#cffafe", "#ffedd5", "#fce7f3"][regionData.findIndex(r => r.name === d.region)] || "#f1f5f9" }}>
                                                    <MapPin size={16} color="#014fa1" />
                                                </div>
                                                <div>
                                                    <div className="pt-region-name">{d.region}</div>
                                                    <div className="pt-region-sub">{d.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td><strong style={{ color: "#1e293b" }}>{d.registered}</strong></td>
                                        <td>{d.active}</td>
                                        <td>{d.newPatients}</td>
                                        <td>{d.returning}</td>
                                        <td>
                                            <span className="pt-score-pill" style={{ background: parseFloat(d.retention) >= 65 ? "#dcfce7" : "#fef3c7", color: parseFloat(d.retention) >= 65 ? "#16a34a" : "#d97706" }}>
                                                {d.retention}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="pt-score-pill" style={{ background: parseFloat(d.churn) <= 35 ? "#dcfce7" : "#fee2e2", color: parseFloat(d.churn) <= 35 ? "#16a34a" : "#ef4444" }}>
                                                {d.churn}
                                            </span>
                                        </td>
                                        <td>{d.avgVisits}</td>
                                        <td>
                                            <ProgressBar value={parseInt(d.satisfaction)} color={parseInt(d.satisfaction) >= 85 ? "#428a26" : parseInt(d.satisfaction) >= 70 ? "#f59e0b" : "#ef4444"} height={6} showLabel label={d.satisfaction} />
                                        </td>
                                        <td>
                                            <span className={`pt-growth ${d.growth.startsWith("+") ? "pt-growth--up" : "pt-growth--down"}`}>
                                                {d.growth.startsWith("+") ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                                {d.growth}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                <Sparkline data={d.trendData} color={d.growth.startsWith("+") ? "#16a34a" : "#ef4444"} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="pt-pagination">
                        <span className="pt-pagination-info">
                            Showing {Math.min((currentPage - 1) * rowsPerPage + 1, sorted.length)}–{Math.min(currentPage * rowsPerPage, sorted.length)} of {sorted.length} regions
                        </span>
                        <div className="pt-pagination-controls">
                            <button className="pt-page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                                <ChevronLeft size={14} />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button key={i} className={`pt-page-btn ${currentPage === i + 1 ? "pt-page-btn--active" : ""}`}
                                    onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                            ))}
                            <button className="pt-page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.section>

        </motion.div>
    );
}