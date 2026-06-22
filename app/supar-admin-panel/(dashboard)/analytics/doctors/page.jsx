// app/super-admin-panel/analytics/doctors/page.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./doctor-performance.css";
import {
    // Core Icons
    DollarSign, Calendar, Users, Star, TrendingUp, TrendingDown,
    Building2, Activity, Heart, Shield, Brain, Bell, CheckCircle,
    AlertTriangle, Info, XCircle, Download, FileText, Share2, RefreshCw,
    Eye, BarChart3, Search, Filter, ChevronDown, MapPin, Phone, Mail,
    Stethoscope, Clock, CheckSquare, XSquare, ArrowUpRight, ArrowDownRight,
    Target, Zap, CreditCard, RotateCcw, UserCheck, UserX, Percent,
    TrendingUp as Growth, AlertCircle, ChevronUp, ChevronLeft, ChevronRight,
    SlidersHorizontal, Save, MoreHorizontal, ExternalLink, X, Wifi,
    PieChart, Layers, Award, Package, Settings,
    // Doctor-specific Icons
    User, UserPlus, UserMinus, Video, Monitor, Clock as ClockIcon,
    Award as AwardIcon, Medal, Crown, Trophy, Sparkles, Gauge,
    Timer, ThumbsUp, ThumbsDown, MessageCircle, FileCheck,
    Briefcase, GraduationCap, CalendarCheck, CalendarX,
    ActivitySquare, LineChart, PieChart as PieChartIcon,
    Radar, CircleDot, Circle, UserCircle, BadgeCheck,
    Hourglass, Mic, Headphones, MonitorSmartphone,
    Lightbulb, TrendingUp as TrendingUpIcon, ArrowUp,
    ArrowDown, Minus, Circle as CircleIcon, Check,
    Crown as CrownIcon, Medal as MedalIcon, Sparkle,
    Rocket, Target as TargetIcon, Flag, BookOpen,
    UsersRound, Stethoscope as StethoscopeIcon
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

// Doctor KPI Data
const doctorKpiData = [
    { label: "Total Doctors", value: "284", change: "+8", trend: "up", sub: "vs last quarter", icon: Users, color: "#014fa1", bg: "#dbeafe" },
    { label: "Active Doctors", value: "231", change: "+12", trend: "up", sub: "81.3% active rate", icon: UserCheck, color: "#428a26", bg: "#dcfce7" },
    { label: "Inactive Doctors", value: "53", change: "-4", trend: "up", sub: "18.7% inactive", icon: UserX, color: "#ef4444", bg: "#fee2e2" },
    { label: "Total Consultations", value: "24,583", change: "+14.2%", trend: "up", sub: "all consultations", icon: Stethoscope, color: "#0891b2", bg: "#cffafe" },
    { label: "Completed", value: "21,847", change: "+12.8%", trend: "up", sub: "88.9% rate", icon: CheckSquare, color: "#16a34a", bg: "#dcfce7" },
    { label: "Cancelled", value: "1,826", change: "-5.3%", trend: "up", sub: "7.4% rate", icon: XSquare, color: "#ef4444", bg: "#fee2e2" },
    { label: "No-Show", value: "910", change: "+2.1%", trend: "down", sub: "3.7% rate", icon: UserX, color: "#f59e0b", bg: "#fef3c7" },
    { label: "Total Revenue", value: "৳52.6M", change: "+15.6%", trend: "up", sub: "all doctors", icon: DollarSign, color: "#014fa1", bg: "#dbeafe" },
    { label: "Avg/Doctor", value: "৳185K", change: "+7.2%", trend: "up", sub: "revenue per doctor", icon: CreditCard, color: "#428a26", bg: "#dcfce7" },
    { label: "Patients Served", value: "18,432", change: "+9.8%", trend: "up", sub: "total patients", icon: Users, color: "#7c3aed", bg: "#ede9fe" },
    { label: "New Patients", value: "5,821", change: "+16.4%", trend: "up", sub: "31.6% of total", icon: UserPlus, color: "#428a26", bg: "#dcfce7" },
    { label: "Avg Rating", value: "4.7", change: "+0.1", trend: "up", sub: "patient rating", icon: Star, color: "#f59e0b", bg: "#fef3c7" },
    { label: "Patient Satisfaction", value: "92%", change: "+3.2%", trend: "up", sub: "CSAT score", icon: Heart, color: "#ec4899", bg: "#fce7f3" },
    { label: "Completion Rate", value: "88.9%", change: "+1.8%", trend: "up", sub: "consultation rate", icon: CheckCircle, color: "#16a34a", bg: "#dcfce7" },
    { label: "Cancellation Rate", value: "7.4%", change: "-1.2%", trend: "up", sub: "reduced rate", icon: XCircle, color: "#ef4444", bg: "#fee2e2" },
    { label: "Utilization Rate", value: "76%", change: "+4.3%", trend: "up", sub: "capacity used", icon: Gauge, color: "#0891b2", bg: "#cffafe" },
];

// Doctor Performance Scores
const doctorScores = [
    { label: "Overall Performance", value: 84, color: "#014fa1" },
    { label: "Productivity", value: 88, color: "#428a26" },
    { label: "Revenue", value: 82, color: "#7c3aed" },
    { label: "Patient Satisfaction", value: 91, color: "#ec4899" },
    { label: "Quality", value: 86, color: "#0891b2" },
    { label: "Utilization", value: 76, color: "#f59e0b" },
    { label: "Growth", value: 79, color: "#ea580c" },
];

// AI Insights
const doctorInsights = [
    { type: "success", title: "Top Performer", text: "Dr. Sarah Ahmed generated ৳2.8M revenue this month — 32% above department average." },
    { type: "warning", title: "Declining Performance", text: "Dr. Kamal Hasan's consultation volume dropped 18% consecutively over 3 months." },
    { type: "error", title: "High Cancellation", text: "Dr. Rifat Chowdhury has a 22% cancellation rate — immediate intervention needed." },
    { type: "info", title: "Rising Star", text: "Dr. Nabila Khan shows 45% patient growth — potential mentorship opportunity." },
    { type: "success", title: "Quality Excellence", text: "Dr. Farhana Islam maintains 4.9/5 rating consistently across 2,300 consultations." },
];

// Critical Alerts
const doctorAlerts = [
    { type: "error", title: "Low Satisfaction Alert", desc: "Dr. Mahmud Hasan dropped to 3.6/5 rating — 12 complaints this month.", time: "1h ago" },
    { type: "warning", title: "High No-Show Rate", desc: "Dr. Tanvir Ahmed: 28% no-show rate across last 2 weeks.", time: "3h ago" },
    { type: "warning", title: "Underutilization", desc: "Dr. Sajeda Akhter at 42% capacity — need schedule optimization.", time: "5h ago" },
    { type: "error", title: "Revenue Decline", desc: "Dr. Arif Khan down 22% revenue — urgent performance review required.", time: "8h ago" },
];

// Consultation Trends
const consultationTrend = [
    { label: "Mon", completed: 320, cancelled: 28, noshow: 12, video: 180, physical: 140 },
    { label: "Tue", completed: 345, cancelled: 22, noshow: 10, video: 190, physical: 155 },
    { label: "Wed", completed: 380, cancelled: 30, noshow: 15, video: 210, physical: 170 },
    { label: "Thu", completed: 410, cancelled: 18, noshow: 8, video: 230, physical: 180 },
    { label: "Fri", completed: 390, cancelled: 25, noshow: 14, video: 215, physical: 175 },
    { label: "Sat", completed: 280, cancelled: 20, noshow: 10, video: 160, physical: 120 },
    { label: "Sun", completed: 220, cancelled: 15, noshow: 8, video: 130, physical: 90 },
];

// Revenue Trends
const revenueTrend = [
    { label: "Jan", revenue: 2.8, growth: 8 },
    { label: "Feb", revenue: 3.1, growth: 11 },
    { label: "Mar", revenue: 2.9, growth: 7 },
    { label: "Apr", revenue: 3.5, growth: 14 },
    { label: "May", revenue: 3.8, growth: 18 },
    { label: "Jun", revenue: 4.2, growth: 22 },
];

// Specialization Data
const specializations = [
    { name: "Cardiology", doctors: 28, consultations: 4120, revenue: "৳8.5M", growth: "+14%", satisfaction: 93, rating: 4.8 },
    { name: "Neurology", doctors: 22, consultations: 3480, revenue: "৳7.2M", growth: "+11%", satisfaction: 90, rating: 4.7 },
    { name: "Orthopedics", doctors: 35, consultations: 5240, revenue: "৳10.8M", growth: "+18%", satisfaction: 88, rating: 4.5 },
    { name: "Pediatrics", doctors: 18, consultations: 2890, revenue: "৳5.6M", growth: "+9%", satisfaction: 95, rating: 4.9 },
    { name: "Dermatology", doctors: 15, consultations: 2340, revenue: "৳4.8M", growth: "+6%", satisfaction: 87, rating: 4.4 },
    { name: "Psychiatry", doctors: 12, consultations: 1960, revenue: "৳4.1M", growth: "+21%", satisfaction: 89, rating: 4.6 },
];

// Doctor Leaderboard
const doctorLeaderboard = [
    {
        id: "DR-001", rank: 1, name: "Dr. Sarah Ahmed", specialty: "Cardiology", outlet: "Renova Dhanmondi",
        revenue: "৳2.8M", consultations: 1240, rating: 4.9, satisfaction: 96, utilization: 92,
        growth: "+24%", status: "active", badge: "Top Performer", icon: Crown,
        image: "/images/doctors/doctor-1.jpg"
    },
    {
        id: "DR-002", rank: 2, name: "Dr. Farhana Islam", specialty: "Pediatrics", outlet: "Renova Mirpur",
        revenue: "৳2.4M", consultations: 1180, rating: 4.9, satisfaction: 95, utilization: 88,
        growth: "+21%", status: "active", badge: "Rising Star", icon: Medal,
        image: "/images/doctors/doctor-2.jpg"
    },
    {
        id: "DR-003", rank: 3, name: "Dr. Kamal Hasan", specialty: "Orthopedics", outlet: "Renova Chattogram",
        revenue: "৳2.2M", consultations: 1050, rating: 4.6, satisfaction: 87, utilization: 82,
        growth: "+15%", status: "active", badge: "Consistent", icon: Award,
        image: "/images/doctors/doctor-3.jpg"
    },
    {
        id: "DR-004", rank: 4, name: "Dr. Nabila Khan", specialty: "Neurology", outlet: "Renova Sylhet",
        revenue: "৳1.9M", consultations: 920, rating: 4.7, satisfaction: 90, utilization: 78,
        growth: "+32%", status: "active", badge: "Rising Star", icon: Rocket,
        image: "/images/doctors/doctor-4.jpg"
    },
    {
        id: "DR-005", rank: 5, name: "Dr. Rifat Chowdhury", specialty: "Dermatology", outlet: "Renova Uttara",
        revenue: "৳1.5M", consultations: 780, rating: 4.2, satisfaction: 76, utilization: 65,
        growth: "-6%", status: "at-risk", badge: "Needs Support", icon: AlertTriangle,
        image: "/images/doctors/doctor-5.jpg"
    },
    {
        id: "DR-006", rank: 6, name: "Dr. Mahmud Hasan", specialty: "Psychiatry", outlet: "Renova Dhanmondi",
        revenue: "৳1.3M", consultations: 650, rating: 3.6, satisfaction: 68, utilization: 58,
        growth: "-12%", status: "at-risk", badge: "Needs Support", icon: AlertCircle,
        image: "/images/doctors/doctor-6.jpg"
    },
    {
        id: "DR-007", rank: 7, name: "Dr. Sajeda Akhter", specialty: "Cardiology", outlet: "Renova Mirpur",
        revenue: "৳1.1M", consultations: 540, rating: 4.1, satisfaction: 72, utilization: 42,
        growth: "-4%", status: "inactive", badge: "Underutilized", icon: UserMinus,
        image: "/images/doctors/doctor-7.jpg"
    },
];

// Doctor Performance Table Data
const doctorTableData = [
    {
        id: "DR-001", name: "Dr. Sarah Ahmed", specialty: "Cardiology", outlet: "Dhanmondi",
        consultations: "1,240", patients: "980", revenue: "৳2.8M", rating: "4.9",
        satisfaction: 96, utilization: 92, cancellation: 6, growth: "+24%",
        score: 95, status: "active", trend: [22, 28, 25, 35, 32, 42, 38, 48],
        image: "/images/doctors/doctor-1.jpg"
    },
    {
        id: "DR-002", name: "Dr. Farhana Islam", specialty: "Pediatrics", outlet: "Mirpur",
        consultations: "1,180", patients: "920", revenue: "৳2.4M", rating: "4.9",
        satisfaction: 95, utilization: 88, cancellation: 5, growth: "+21%",
        score: 93, status: "active", trend: [18, 22, 20, 28, 25, 34, 30, 40],
        image: "/images/doctors/doctor-2.jpg"
    },
    {
        id: "DR-003", name: "Dr. Kamal Hasan", specialty: "Orthopedics", outlet: "Chattogram",
        consultations: "1,050", patients: "820", revenue: "৳2.2M", rating: "4.6",
        satisfaction: 87, utilization: 82, cancellation: 10, growth: "+15%",
        score: 86, status: "active", trend: [15, 18, 16, 22, 20, 28, 25, 32],
        image: "/images/doctors/doctor-3.jpg"
    },
    {
        id: "DR-004", name: "Dr. Nabila Khan", specialty: "Neurology", outlet: "Sylhet",
        consultations: "920", patients: "710", revenue: "৳1.9M", rating: "4.7",
        satisfaction: 90, utilization: 78, cancellation: 8, growth: "+32%",
        score: 88, status: "active", trend: [12, 15, 14, 18, 16, 24, 20, 28],
        image: "/images/doctors/doctor-4.jpg"
    },
    {
        id: "DR-005", name: "Dr. Rifat Chowdhury", specialty: "Dermatology", outlet: "Uttara",
        consultations: "780", patients: "590", revenue: "৳1.5M", rating: "4.2",
        satisfaction: 76, utilization: 65, cancellation: 22, growth: "-6%",
        score: 65, status: "at-risk", trend: [20, 18, 22, 16, 18, 14, 16, 12],
        image: "/images/doctors/doctor-5.jpg"
    },
    {
        id: "DR-006", name: "Dr. Mahmud Hasan", specialty: "Psychiatry", outlet: "Dhanmondi",
        consultations: "650", patients: "480", revenue: "৳1.3M", rating: "3.6",
        satisfaction: 68, utilization: 58, cancellation: 18, growth: "-12%",
        score: 52, status: "at-risk", trend: [16, 14, 18, 12, 14, 10, 12, 8],
        image: "/images/doctors/doctor-6.jpg"
    },
    {
        id: "DR-007", name: "Dr. Sajeda Akhter", specialty: "Cardiology", outlet: "Mirpur",
        consultations: "540", patients: "410", revenue: "৳1.1M", rating: "4.1",
        satisfaction: 72, utilization: 42, cancellation: 15, growth: "-4%",
        score: 58, status: "inactive", trend: [14, 12, 16, 10, 12, 8, 10, 6],
        image: "/images/doctors/doctor-7.jpg"
    },
];

// Department Data
const departments = [
    { name: "Cardiology", doctors: 28, revenue: "৳8.5M", consultations: 4120, satisfaction: 93 },
    { name: "Orthopedics", doctors: 35, revenue: "৳10.8M", consultations: 5240, satisfaction: 88 },
    { name: "Neurology", doctors: 22, revenue: "৳7.2M", consultations: 3480, satisfaction: 90 },
    { name: "Pediatrics", doctors: 18, revenue: "৳5.6M", consultations: 2890, satisfaction: 95 },
    { name: "Dermatology", doctors: 15, revenue: "৳4.8M", consultations: 2340, satisfaction: 87 },
    { name: "Psychiatry", doctors: 12, revenue: "৳4.1M", consultations: 1960, satisfaction: 89 },
];

// Quality Metrics
const qualityMetrics = [
    { label: "Average Rating", value: "4.7/5", target: "≥ 4.5", ok: true, color: "#428a26" },
    { label: "Patient Satisfaction", value: "92%", target: "≥ 85%", ok: true, color: "#428a26" },
    { label: "Complaint Rate", value: "3.2%", target: "≤ 5%", ok: true, color: "#428a26" },
    { label: "Follow-up Rate", value: "68%", target: "≥ 70%", ok: false, color: "#f59e0b" },
    { label: "Documentation Completion", value: "94%", target: "≥ 90%", ok: true, color: "#428a26" },
];

// Utilization Metrics
const utilizationMetrics = [
    { label: "Overall Utilization", value: "76%", target: "≥ 80%", ok: false, color: "#f59e0b" },
    { label: "Schedule Adherence", value: "88%", target: "≥ 85%", ok: true, color: "#428a26" },
    { label: "Appointment Acceptance", value: "92%", target: "≥ 90%", ok: true, color: "#428a26" },
    { label: "Average Response Time", value: "4 min", target: "≤ 5 min", ok: true, color: "#428a26" },
    { label: "Consultation Completion", value: "88.9%", target: "≥ 85%", ok: true, color: "#428a26" },
    { label: "Availability Rate", value: "72%", target: "≥ 75%", ok: false, color: "#f59e0b" },
];

// ─── Helpers ─────────────────────────────────────────────────────
const getScoreColor = (s) => s >= 90 ? "#16a34a" : s >= 80 ? "#014fa1" : s >= 70 ? "#f59e0b" : "#ef4444";
const getScoreBg = (s) => s >= 90 ? "#dcfce7" : s >= 80 ? "#dbeafe" : s >= 70 ? "#fef3c7" : "#fee2e2";

const statusConfig = {
    active: { bg: "#dcfce7", color: "#16a34a", label: "Active" },
    inactive: { bg: "#f1f5f9", color: "#64748b", label: "Inactive" },
    "at-risk": { bg: "#fee2e2", color: "#ef4444", label: "At Risk" },
};

const badgeConfig = {
    "Top Performer": { bg: "#fef3c7", color: "#d97706", icon: Crown },
    "Rising Star": { bg: "#dbeafe", color: "#014fa1", icon: Rocket },
    "Consistent": { bg: "#dcfce7", color: "#16a34a", icon: Award },
    "Needs Support": { bg: "#fee2e2", color: "#ef4444", icon: AlertTriangle },
    "Underutilized": { bg: "#fef3c7", color: "#d97706", icon: UserMinus },
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
        <span className="dp-status-badge" style={{ background: c.bg, color: c.color }}>
            <span className="dp-status-dot" style={{ background: c.color }} />
            {c.label}
        </span>
    );
};

const BadgeDisplay = ({ badge }) => {
    const c = badgeConfig[badge] || badgeConfig["Consistent"];
    const Icon = c.icon || Award;
    return (
        <span className="dp-badge-display" style={{ background: c.bg, color: c.color }}>
            <Icon size={12} />
            {badge}
        </span>
    );
};

const InsightIcon = ({ type }) => {
    const map = { success: CheckCircle, warning: AlertTriangle, info: Info, error: XCircle };
    const Icon = map[type] || Info;
    return <Icon size={15} />;
};

const SectionTitle = ({ icon: Icon, iconBg, iconColor, title, subtitle, action }) => (
    <div className="dp-section-title">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="dp-title-icon" style={{ background: iconBg, color: iconColor }}>
                <Icon size={16} />
            </div>
            <div>
                <h2 className="dp-title-text">{title}</h2>
                {subtitle && <p className="dp-title-sub">{subtitle}</p>}
            </div>
        </div>
        {action && <div className="dp-title-action">{action}</div>}
    </div>
);

const KPICard = ({ label, value, change, trend, sub, icon: Icon, color, bg }) => (
    <motion.div className="dp-kpi-card" variants={itemVariants} whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(4,65,125,0.11)" }}>
        <div className="dp-kpi-accent" style={{ background: color }} />
        <div className="dp-kpi-body">
            <div className="dp-kpi-top">
                <div className="dp-kpi-icon" style={{ background: bg }}>
                    <Icon size={16} color={color} />
                </div>
                <div className={`dp-kpi-badge ${trend === "up" ? "dp-kpi-badge--up" : "dp-kpi-badge--down"}`}>
                    {trend === "up" ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    {change}
                </div>
            </div>
            <div className="dp-kpi-value">{value}</div>
            <div className="dp-kpi-label">{label}</div>
            <div className="dp-kpi-footer">
                <span className="dp-kpi-trend-label">{sub}</span>
                <div className="dp-kpi-spark">
                    <MiniSparkline color={color} />
                </div>
            </div>
        </div>
    </motion.div>
);

const SkeletonKPI = () => (
    <div className="dp-kpi-card dp-skeleton-card">
        <div className="dp-sk" style={{ height: 3, borderRadius: 0, width: "100%" }} />
        <div className="dp-kpi-body" style={{ gap: 8 }}>
            <div className="dp-kpi-top">
                <div className="dp-sk dp-sk--icon" />
                <div className="dp-sk" style={{ height: 20, width: 52, borderRadius: 20 }} />
            </div>
            <div className="dp-sk dp-sk--val" />
            <div className="dp-sk dp-sk--lbl" />
            <div className="dp-sk dp-sk--spark" style={{ marginTop: 6 }} />
        </div>
    </div>
);

// Leaderboard Card
const LeaderboardCard = ({ doctor, rank }) => {
    const BadgeIcon = doctor.icon || Award;
    const isTop = rank <= 3;
    const [imageError, setImageError] = useState(false);

    return (
        <motion.div className={`dp-leaderboard-card ${isTop ? "dp-leaderboard-card--top" : ""}`} variants={itemVariants}>
            <div className="dp-leaderboard-rank" style={{
                background: isTop ? "#014fa1" : "#f1f5f9",
                color: isTop ? "#fff" : "#64748b"
            }}>
                {rank}
            </div>
            <div className="dp-leaderboard-avatar">
                {!imageError ? (
                    <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="dp-leaderboard-img"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <User size={20} color="#014fa1" />
                )}
            </div>
            <div className="dp-leaderboard-info">
                <div className="dp-leaderboard-name">{doctor.name}</div>
                <div className="dp-leaderboard-specialty">{doctor.specialty}</div>
                <div className="dp-leaderboard-outlet">{doctor.outlet}</div>
            </div>
            <div className="dp-leaderboard-stats">
                <div className="dp-leaderboard-stat">
                    <span className="dp-leaderboard-stat-label">Revenue</span>
                    <span className="dp-leaderboard-stat-value">{doctor.revenue}</span>
                </div>
                <div className="dp-leaderboard-stat">
                    <span className="dp-leaderboard-stat-label">Consultations</span>
                    <span className="dp-leaderboard-stat-value">{doctor.consultations}</span>
                </div>
                <div className="dp-leaderboard-stat">
                    <span className="dp-leaderboard-stat-label">Rating</span>
                    <span className="dp-leaderboard-stat-value" style={{ color: "#f59e0b" }}>★ {doctor.rating}</span>
                </div>
            </div>
            <div className="dp-leaderboard-badge">
                <BadgeDisplay badge={doctor.badge} />
            </div>
            <div className="dp-leaderboard-growth" style={{ color: doctor.growth.startsWith("+") ? "#16a34a" : "#ef4444" }}>
                {doctor.growth.startsWith("+") ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {doctor.growth}
            </div>
        </motion.div>
    );
};

// ─── Main Page ───────────────────────────────────────────────────
export default function DoctorPerformancePage() {
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortCol, setSortCol] = useState(null);
    const [sortDir, setSortDir] = useState("asc");
    const [filterStatus, setFilterStatus] = useState("all");
    const [doctorFilter, setDoctorFilter] = useState("All Doctors");
    const [specialtyFilter, setSpecialtyFilter] = useState("All Specialties");
    const [departmentFilter, setDepartmentFilter] = useState("All Departments");
    const [outletFilter, setOutletFilter] = useState("All Outlets");
    const [experienceFilter, setExperienceFilter] = useState("All Experience");
    const [visibleCols, setVisibleCols] = useState({
        doctor: true, specialty: true, outlet: true, consultations: true,
        patients: true, revenue: true, rating: true, satisfaction: true,
        utilization: true, cancellation: true, growth: true, score: true,
        status: true, actions: true
    });
    const rowsPerPage = 5;

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 1400);
        return () => clearTimeout(t);
    }, []);

    // Filter logic
    const filtered = doctorTableData.filter(d => {
        const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.id.includes(search);
        const matchStatus = filterStatus === "all" || d.status === filterStatus;
        const matchSpecialty = specialtyFilter === "All Specialties" || d.specialty === specialtyFilter;
        const matchOutlet = outletFilter === "All Outlets" || d.outlet === outletFilter;
        return matchSearch && matchStatus && matchSpecialty && matchOutlet;
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
        <span className="dp-sort-icon">
            {sortCol === col ? (sortDir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />) : <ChevronDown size={12} style={{ opacity: 0.3 }} />}
        </span>
    );

    return (
        <motion.div className="dp-page" initial="hidden" animate="visible" variants={containerVariants}>

            {/* ── Page Header ────────────────────────────── */}
            <motion.div className="dp-header" variants={itemVariants}>
                <div className="dp-header-left">
                    <div className="dp-live-badge">
                        <span className="dp-live-dot" />
                        <span>Live</span>
                    </div>
                    <h1 className="dp-page-title">Doctor Performance Analytics</h1>
                    <p className="dp-page-sub">Last updated 2 minutes ago · Real-time doctor performance metrics</p>
                </div>
                <div className="dp-header-actions">
                    <select className="dp-ctrl-select" value={doctorFilter} onChange={e => setDoctorFilter(e.target.value)}>
                        <option>All Doctors</option>
                        {doctorTableData.map(d => <option key={d.id}>{d.name}</option>)}
                    </select>
                    <select className="dp-ctrl-select" value={specialtyFilter} onChange={e => setSpecialtyFilter(e.target.value)}>
                        <option>All Specialties</option>
                        {[...new Set(doctorTableData.map(d => d.specialty))].map(s => <option key={s}>{s}</option>)}
                    </select>
                    <select className="dp-ctrl-select" value={departmentFilter} onChange={e => setDepartmentFilter(e.target.value)}>
                        <option>All Departments</option>
                        {departments.map(d => <option key={d.name}>{d.name}</option>)}
                    </select>
                    <select className="dp-ctrl-select" value={outletFilter} onChange={e => setOutletFilter(e.target.value)}>
                        <option>All Outlets</option>
                        {[...new Set(doctorTableData.map(d => d.outlet))].map(o => <option key={o}>{o}</option>)}
                    </select>
                    <input type="date" className="dp-ctrl-input" />
                    <input type="date" className="dp-ctrl-input" />
                    <button className="dp-btn-ghost"><RefreshCw size={14} /></button>
                    <button className="dp-btn-ghost"><Download size={14} /> <span>Excel</span></button>
                    <button className="dp-btn-ghost"><FileText size={14} /> <span>PDF</span></button>
                    <button className="dp-btn-primary"><Share2 size={14} /> Share</button>
                </div>
            </motion.div>

            {/* ── Smart Filters ───────────────────────────── */}
            <motion.div className="dp-filters" variants={itemVariants}>
                <div className="dp-filter-search">
                    <Search size={14} color="#94a3b8" />
                    <input type="text" placeholder="Search doctors by name or ID…" value={search} onChange={e => setSearch(e.target.value)} />
                    {search && <button onClick={() => setSearch("")}><X size={12} /></button>}
                </div>
                <select className="dp-ctrl-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="at-risk">At Risk</option>
                </select>
                <select className="dp-ctrl-select" value={experienceFilter} onChange={e => setExperienceFilter(e.target.value)}>
                    <option>All Experience</option>
                    <option>0-5 Years</option>
                    <option>6-10 Years</option>
                    <option>11-15 Years</option>
                    <option>15+ Years</option>
                </select>
                <input type="date" className="dp-ctrl-input" />
                <input type="date" className="dp-ctrl-input" />
                <div className="dp-filter-actions">
                    <button className="dp-btn-ghost" onClick={() => { setSearch(""); setFilterStatus("all"); setSpecialtyFilter("All Specialties"); setOutletFilter("All Outlets"); }}>
                        <RotateCcw size={13} /> Reset
                    </button>
                    <button className="dp-btn-primary" style={{ padding: "7px 14px" }}>
                        <Save size={13} /> Save
                    </button>
                </div>
            </motion.div>

            {/* ── Executive KPI Cards ─────────────────────── */}
            <motion.section className="dp-section" variants={itemVariants}>
                <SectionTitle icon={Zap} iconBg="#fef3c7" iconColor="#d97706" title="Executive KPIs" subtitle="Real-time doctor performance metrics across the network" />
                <motion.div className="dp-kpi-grid" variants={containerVariants}>
                    {loading
                        ? Array(16).fill(0).map((_, i) => <SkeletonKPI key={i} />)
                        : doctorKpiData.map((k, i) => <KPICard key={i} {...k} />)
                    }
                </motion.div>
            </motion.section>

            {/* ── Doctor Leaderboard ──────────────────────────── */}
            <motion.section className="dp-section" variants={itemVariants}>
                <SectionTitle
                    icon={Trophy}
                    iconBg="#fef3c7"
                    iconColor="#d97706"
                    title="Doctor Leaderboard"
                    subtitle="Top performing doctors ranked by revenue, consultations, and satisfaction"
                />
                <div className="dp-leaderboard-grid">
                    {doctorLeaderboard.map((doctor, i) => (
                        <LeaderboardCard key={doctor.id} doctor={doctor} rank={doctor.rank} />
                    ))}
                </div>
            </motion.section>

            {/* ── Performance Scores ───────────────────────────── */}
            <motion.section className="dp-section" variants={itemVariants}>
                <SectionTitle icon={Gauge} iconBg="#ede9fe" iconColor="#7c3aed" title="Performance Scores" subtitle="Multi-dimensional doctor performance assessment" />
                <div className="dp-score-grid">
                    {doctorScores.map((s, i) => (
                        <motion.div key={i} className="dp-score-card" variants={itemVariants}>
                            <GaugeChart value={s.value} color={s.color} size={110} />
                            <div className="dp-score-label">{s.label}</div>
                            <div className="dp-score-tag" style={{ background: getScoreBg(s.value), color: getScoreColor(s.value) }}>
                                {s.value >= 90 ? "Excellent" : s.value >= 80 ? "Good" : s.value >= 70 ? "Fair" : "Needs Attention"}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* ── Consultation Analytics ────────────────────── */}
            <motion.section className="dp-section" variants={itemVariants}>
                <SectionTitle icon={Calendar} iconBg="#cffafe" iconColor="#0891b2" title="Consultation Analytics" subtitle="Trends, completion, cancellation, and consultation type breakdown" />
                <div className="dp-two-col">
                    <motion.div className="dp-card" variants={itemVariants}>
                        <h3 className="dp-card-subtitle">Weekly Consultation Trends</h3>
                        <div className="dp-stacked-chart">
                            {consultationTrend.map((d, i) => {
                                const total = d.completed + d.cancelled + d.noshow;
                                return (
                                    <div key={i} className="dp-stacked-group">
                                        <div className="dp-stacked-bar-wrap">
                                            <div className="dp-stacked-bar-total">{total}</div>
                                            <div className="dp-stacked-bar">
                                                <div style={{ height: `${(d.completed / 450) * 100}%`, background: "#016034" }} title={`Completed: ${d.completed}`} />
                                                <div style={{ height: `${(d.cancelled / 450) * 100}%`, background: "#ef4444" }} title={`Cancelled: ${d.cancelled}`} />
                                                <div style={{ height: `${(d.noshow / 450) * 100}%`, background: "#f59e0b" }} title={`No-Show: ${d.noshow}`} />
                                            </div>
                                        </div>
                                        <div className="dp-bar-label">{d.label}</div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="dp-chart-legend">
                            <span className="dp-legend-dot" style={{ background: "#016034" }} /> Completed
                            <span className="dp-legend-dot" style={{ background: "#ef4444", marginLeft: 14 }} /> Cancelled
                            <span className="dp-legend-dot" style={{ background: "#f59e0b", marginLeft: 14 }} /> No-Show
                        </div>
                    </motion.div>

                    <motion.div className="dp-card" variants={itemVariants}>
                        <h3 className="dp-card-subtitle">Consultation Type Distribution</h3>
                        <div className="dp-donut-row">
                            <svg viewBox="0 0 100 100" width={130} height={130}>
                                {[
                                    { label: "Video", value: 65, color: "#014fa1" },
                                    { label: "Physical", value: 35, color: "#428a26" },
                                ].reduce((acc, item, i) => {
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
                            <div className="dp-donut-legend">
                                <div className="dp-donut-item">
                                    <span className="dp-legend-dot" style={{ background: "#014fa1" }} />
                                    <span className="dp-donut-label">Video Consultations</span>
                                    <span className="dp-donut-val">65%</span>
                                </div>
                                <div className="dp-donut-item">
                                    <span className="dp-legend-dot" style={{ background: "#428a26" }} />
                                    <span className="dp-donut-label">Physical Consultations</span>
                                    <span className="dp-donut-val">35%</span>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                            {[
                                { label: "Avg Duration", value: "18 min", color: "#014fa1" },
                                { label: "Peak Hours", value: "10AM-12PM", color: "#428a26" },
                                { label: "Video Rate", value: "65%", color: "#7c3aed" },
                                { label: "Physical Rate", value: "35%", color: "#0891b2" },
                            ].map((item, i) => (
                                <div key={i} className="dp-stat-mini">
                                    <div className="dp-stat-mini-label">{item.label}</div>
                                    <div className="dp-stat-mini-value">{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Revenue Analytics ─────────────────────────── */}
            <motion.section className="dp-section" variants={itemVariants}>
                <SectionTitle icon={DollarSign} iconBg="#dbeafe" iconColor="#014fa1" title="Revenue Analytics" subtitle="Revenue trends, specialization breakdown, and per-doctor analysis" />
                <div className="dp-two-col">
                    <motion.div className="dp-card" variants={itemVariants}>
                        <h3 className="dp-card-subtitle">Revenue Trend (in Crores)</h3>
                        <div className="dp-bar-chart">
                            {revenueTrend.map((d, i) => (
                                <div key={i} className="dp-bar-group">
                                    <div className="dp-bars">
                                        <div className="dp-bar-wrap">
                                            <div className="dp-bar dp-bar--income" style={{ height: `${(d.revenue / 5) * 100}%` }} title={`Revenue: ৳${d.revenue}M`} />
                                        </div>
                                        <div className="dp-bar-val">৳{d.revenue}M</div>
                                    </div>
                                    <div className="dp-bar-label">{d.label}</div>
                                </div>
                            ))}
                        </div>
                        <div className="dp-chart-legend">
                            <span className="dp-legend-dot" style={{ background: "#014fa1" }} /> Revenue
                        </div>
                    </motion.div>

                    <motion.div className="dp-card" variants={itemVariants}>
                        <h3 className="dp-card-subtitle">Revenue by Specialization</h3>
                        <div className="dp-hbars">
                            {specializations.map((s, i) => (
                                <div key={i} className="dp-hbar-item">
                                    <div className="dp-hbar-meta">
                                        <span className="dp-hbar-name">{s.name}</span>
                                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                                            <span className="dp-hbar-growth" style={{ color: "#16a34a" }}>{s.growth}</span>
                                            <span className="dp-hbar-val">{s.revenue}</span>
                                        </div>
                                    </div>
                                    <ProgressBar value={(parseFloat(s.revenue.replace("৳", "").replace("M", "")) / 12) * 100} color={["#014fa1", "#428a26", "#7c3aed", "#0891b2", "#ea580c", "#ec4899"][i]} height={7} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Specialization Analytics ────────────────────── */}
            <motion.section className="dp-section" variants={itemVariants}>
                <SectionTitle icon={PieChartIcon} iconBg="#ede9fe" iconColor="#7c3aed" title="Specialization Analytics" subtitle="Compare specialties across key performance indicators" />
                <div className="dp-specialization-grid">
                    {specializations.map((s, i) => (
                        <motion.div key={i} className="dp-specialization-card" variants={itemVariants}>
                            <div className="dp-spec-header">
                                <div className="dp-spec-icon" style={{ background: ["#dbeafe", "#dcfce7", "#ede9fe", "#cffafe", "#ffedd5", "#fce7f3"][i] }}>
                                    <Stethoscope size={18} color={["#014fa1", "#428a26", "#7c3aed", "#0891b2", "#ea580c", "#ec4899"][i]} />
                                </div>
                                <div className="dp-spec-name">{s.name}</div>
                                <div className="dp-spec-growth" style={{ color: s.growth.startsWith("+") ? "#16a34a" : "#ef4444" }}>
                                    {s.growth}
                                </div>
                            </div>
                            <div className="dp-spec-stats">
                                <div className="dp-spec-stat">
                                    <span className="dp-spec-stat-label">Doctors</span>
                                    <span className="dp-spec-stat-value">{s.doctors}</span>
                                </div>
                                <div className="dp-spec-stat">
                                    <span className="dp-spec-stat-label">Consultations</span>
                                    <span className="dp-spec-stat-value">{s.consultations.toLocaleString()}</span>
                                </div>
                                <div className="dp-spec-stat">
                                    <span className="dp-spec-stat-label">Revenue</span>
                                    <span className="dp-spec-stat-value">{s.revenue}</span>
                                </div>
                                <div className="dp-spec-stat">
                                    <span className="dp-spec-stat-label">Satisfaction</span>
                                    <span className="dp-spec-stat-value">{s.satisfaction}%</span>
                                </div>
                                <div className="dp-spec-stat">
                                    <span className="dp-spec-stat-label">Rating</span>
                                    <span className="dp-spec-stat-value" style={{ color: "#f59e0b" }}>★ {s.rating}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* ── AI Insights + Alerts ──────────────────────── */}
            <motion.section className="dp-section" variants={itemVariants}>
                <div className="dp-two-col">
                    <motion.div className="dp-card" variants={itemVariants}>
                        <SectionTitle icon={Brain} iconBg="#ede9fe" iconColor="#7c3aed" title="AI Business Insights" />
                        <div className="dp-insights-list">
                            {doctorInsights.map((ins, i) => (
                                <div key={i} className={`dp-insight-item dp-insight--${ins.type}`}>
                                    <div className="dp-insight-icon"><InsightIcon type={ins.type} /></div>
                                    <div>
                                        <div className="dp-insight-title">{ins.title}</div>
                                        <div className="dp-insight-text">{ins.text}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="dp-card" variants={itemVariants}>
                        <SectionTitle icon={Bell} iconBg="#fee2e2" iconColor="#ef4444" title="Critical Alerts"
                            action={<span className="dp-alert-count">{doctorAlerts.filter(a => a.type === "error").length} Critical</span>} />
                        <div className="dp-alerts-list">
                            {doctorAlerts.map((a, i) => (
                                <div key={i} className={`dp-alert-item dp-insight--${a.type}`}>
                                    <div className="dp-insight-icon"><AlertTriangle size={15} /></div>
                                    <div style={{ flex: 1 }}>
                                        <div className="dp-alert-header">
                                            <span className="dp-insight-title">{a.title}</span>
                                            <span className="dp-alert-time">{a.time}</span>
                                        </div>
                                        <div className="dp-insight-text">{a.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Quality & Utilization Metrics ──────────────── */}
            <motion.section className="dp-section" variants={itemVariants}>
                <div className="dp-two-col">
                    <motion.div className="dp-card" variants={itemVariants}>
                        <SectionTitle icon={AwardIcon} iconBg="#dcfce7" iconColor="#428a26" title="Quality Metrics" />
                        <div className="dp-metrics-grid">
                            {qualityMetrics.map((m, i) => (
                                <div key={i} className="dp-metric-item">
                                    <div className="dp-metric-top">
                                        <span className="dp-metric-label">{m.label}</span>
                                        <span className={`dp-metric-badge ${m.ok ? "dp-metric-badge--ok" : "dp-metric-badge--warn"}`}>
                                            {m.ok ? <CheckCircle size={11} /> : <AlertTriangle size={11} />}
                                            {m.ok ? "On Target" : "Below"}
                                        </span>
                                    </div>
                                    <div className="dp-metric-value">{m.value}</div>
                                    <div className="dp-metric-target">Target: {m.target}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="dp-card" variants={itemVariants}>
                        <SectionTitle icon={Gauge} iconBg="#ffedd5" iconColor="#ea580c" title="Utilization Metrics" />
                        <div className="dp-utilization-list">
                            {utilizationMetrics.map((m, i) => (
                                <div key={i} className="dp-util-item">
                                    <div className="dp-util-meta">
                                        <span className="dp-util-label">{m.label}</span>
                                        <span className="dp-util-value" style={{ color: m.ok ? "#428a26" : "#f59e0b" }}>{m.value}</span>
                                    </div>
                                    <ProgressBar value={parseInt(m.value)} color={m.ok ? "#428a26" : "#f59e0b"} height={6} />
                                    <div className="dp-util-target">Target: {m.target}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Doctor Performance Table ────────────────────── */}
            <motion.section className="dp-section" variants={itemVariants}>
                <SectionTitle
                    icon={Users}
                    iconBg="#dbeafe"
                    iconColor="#014fa1"
                    title={`Doctor Performance Details (${filtered.length})`}
                    subtitle="Comprehensive doctor-level metrics with sorting and filtering"
                    action={
                        <div style={{ display: "flex", gap: 8 }}>
                            <button className="dp-btn-ghost"><SlidersHorizontal size={13} /> Columns</button>
                            <button className="dp-btn-ghost"><Download size={13} /> Export</button>
                            <button className="dp-btn-primary"><FileText size={13} /> PDF</button>
                        </div>
                    }
                />

                <motion.div className="dp-card dp-table-card" variants={itemVariants}>
                    <div className="dp-table-wrapper">
                        <table className="dp-perf-table">
                            <thead>
                                <tr>
                                    <th>Doctor</th>
                                    {visibleCols.specialty && <th onClick={() => handleSort("specialty")} className="dp-sortable">Specialty <SortIcon col="specialty" /></th>}
                                    {visibleCols.outlet && <th onClick={() => handleSort("outlet")} className="dp-sortable">Outlet <SortIcon col="outlet" /></th>}
                                    {visibleCols.consultations && <th onClick={() => handleSort("consultations")} className="dp-sortable">Consultations <SortIcon col="consultations" /></th>}
                                    {visibleCols.patients && <th onClick={() => handleSort("patients")} className="dp-sortable">Patients <SortIcon col="patients" /></th>}
                                    {visibleCols.revenue && <th onClick={() => handleSort("revenue")} className="dp-sortable">Revenue <SortIcon col="revenue" /></th>}
                                    {visibleCols.rating && <th onClick={() => handleSort("rating")} className="dp-sortable">Rating <SortIcon col="rating" /></th>}
                                    {visibleCols.satisfaction && <th onClick={() => handleSort("satisfaction")} className="dp-sortable">Satisfaction <SortIcon col="satisfaction" /></th>}
                                    {visibleCols.utilization && <th onClick={() => handleSort("utilization")} className="dp-sortable">Utilization <SortIcon col="utilization" /></th>}
                                    {visibleCols.cancellation && <th onClick={() => handleSort("cancellation")} className="dp-sortable">Cancellation <SortIcon col="cancellation" /></th>}
                                    {visibleCols.growth && <th onClick={() => handleSort("growth")} className="dp-sortable">Growth <SortIcon col="growth" /></th>}
                                    {visibleCols.score && <th onClick={() => handleSort("score")} className="dp-sortable">Score <SortIcon col="score" /></th>}
                                    {visibleCols.status && <th>Status</th>}
                                    {visibleCols.actions && <th>Trend</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.length === 0 ? (
                                    <tr><td colSpan={14} className="dp-empty-state">
                                        <Search size={32} color="#cbd5e1" />
                                        <div>No doctors match your search criteria.</div>
                                        <button className="dp-btn-ghost" onClick={() => { setSearch(""); setFilterStatus("all"); setSpecialtyFilter("All Specialties"); setOutletFilter("All Outlets"); }}>
                                            Clear Filters
                                        </button>
                                    </td></tr>
                                ) : paginated.map((d) => (
                                    <tr key={d.id} className="dp-table-row">
                                        <td>
                                            <div className="dp-doctor-cell">
                                                <div className="dp-doctor-avatar">
                                                    <img
                                                        src={d.image}
                                                        alt={d.name}
                                                        className="dp-doctor-img"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            e.target.parentElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#014fa1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <div className="dp-doctor-name">{d.name}</div>
                                                    <div className="dp-doctor-id">{d.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        {visibleCols.specialty && <td>{d.specialty}</td>}
                                        {visibleCols.outlet && <td>{d.outlet}</td>}
                                        {visibleCols.consultations && <td>{d.consultations}</td>}
                                        {visibleCols.patients && <td>{d.patients}</td>}
                                        {visibleCols.revenue && <td><strong style={{ color: "#1e293b" }}>{d.revenue}</strong></td>}
                                        {visibleCols.rating && (
                                            <td>
                                                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                                    <Star size={12} fill="#f59e0b" color="#f59e0b" /> {d.rating}
                                                </div>
                                            </td>
                                        )}
                                        {visibleCols.satisfaction && (
                                            <td>
                                                <div className="dp-satisfaction-bar">
                                                    <div className="dp-satisfaction-fill" style={{ width: `${d.satisfaction}%`, background: d.satisfaction >= 85 ? "#428a26" : d.satisfaction >= 70 ? "#f59e0b" : "#ef4444" }} />
                                                    <span>{d.satisfaction}%</span>
                                                </div>
                                            </td>
                                        )}
                                        {visibleCols.utilization && (
                                            <td><ProgressBar value={d.utilization} color={d.utilization >= 80 ? "#428a26" : d.utilization >= 60 ? "#f59e0b" : "#ef4444"} height={6} showLabel /></td>
                                        )}
                                        {visibleCols.cancellation && (
                                            <td><ProgressBar value={d.cancellation} color={d.cancellation <= 10 ? "#428a26" : d.cancellation <= 15 ? "#f59e0b" : "#ef4444"} height={6} showLabel /></td>
                                        )}
                                        {visibleCols.growth && (
                                            <td>
                                                <span className={`dp-growth ${d.growth.startsWith("+") ? "dp-growth--up" : "dp-growth--down"}`}>
                                                    {d.growth.startsWith("+") ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                                    {d.growth}
                                                </span>
                                            </td>
                                        )}
                                        {visibleCols.score && (
                                            <td>
                                                <span className="dp-score-pill" style={{ background: getScoreBg(d.score), color: getScoreColor(d.score) }}>
                                                    {d.score}
                                                </span>
                                            </td>
                                        )}
                                        {visibleCols.status && <td><StatusBadge status={d.status} /></td>}
                                        {visibleCols.actions && (
                                            <td>
                                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                    <Sparkline data={d.trend} color={d.growth.startsWith("+") ? "#16a34a" : "#ef4444"} />
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="dp-pagination">
                        <span className="dp-pagination-info">
                            Showing {Math.min((currentPage - 1) * rowsPerPage + 1, sorted.length)}–{Math.min(currentPage * rowsPerPage, sorted.length)} of {sorted.length} doctors
                        </span>
                        <div className="dp-pagination-controls">
                            <button className="dp-page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                                <ChevronLeft size={14} />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button key={i} className={`dp-page-btn ${currentPage === i + 1 ? "dp-page-btn--active" : ""}`}
                                    onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                            ))}
                            <button className="dp-page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.section>

        </motion.div>
    );
}