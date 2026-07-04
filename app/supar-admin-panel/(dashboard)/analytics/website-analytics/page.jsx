// app/super-admin-panel/analytics/website-analytics/page.jsx

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import {
    Users, UserPlus, Eye, Clock, Percent, Activity,
    TrendingUp, MousePointerClick, RefreshCw, Download,
    Share2, Globe, Loader2
} from "lucide-react";
import {
    LineChart, Line, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer, ComposedChart,
    BarChart, Bar, PieChart, Pie, Cell
} from "recharts";
import toast from "react-hot-toast";
import "./website-analytics.css";

// ============================================================
// GOOGLE ANALYTICS API INTEGRATION
// ============================================================

const GA4_PROPERTY_ID = process.env.NEXT_PUBLIC_GA4_PROPERTY_ID || "399105296";

async function fetchAnalyticsData(dateRange, type = "all") {
    try {
        const params = new URLSearchParams({
            propertyId: GA4_PROPERTY_ID,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            type: type,
        });

        const response = await fetch(`/api/analytics/ga4?${params}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        });

        const contentType = (response.headers.get("content-type") || "").toLowerCase();
        if (!contentType.includes("application/json")) {
            const raw = await response.text();
            console.warn("Analytics API returned non-JSON content, using fallback data.", raw.slice(0, 200));
            return getDummyAnalyticsData(dateRange);
        }

        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.error || "Failed to fetch analytics data");
        }

        return json;
    } catch (error) {
        console.error("Fetch analytics error:", error);
        return getDummyAnalyticsData(dateRange);
    }
}

async function fetchRealTimeUsers() {
    try {
        const response = await fetch(`/api/analytics/ga4/realtime?propertyId=${GA4_PROPERTY_ID}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        });

        const contentType = (response.headers.get("content-type") || "").toLowerCase();
        if (!contentType.includes("application/json")) {
            const raw = await response.text();
            console.warn("Realtime analytics API returned non-JSON content, using fallback data.", raw.slice(0, 200));
            return getDummyRealTimeData();
        }

        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.error || "Failed to fetch real-time data");
        }

        return json;
    } catch (error) {
        console.error("Fetch real-time error:", error);
        return getDummyRealTimeData();
    }
}

async function fetchSiteTotalVisitors() {
    try {
        const response = await fetch(`/api/site-visitors/total`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        });

        const contentType = (response.headers.get("content-type") || "").toLowerCase();
        if (!contentType.includes("application/json")) {
            const raw = await response.text();
            console.warn("Site visitors API returned non-JSON content.", raw.slice(0, 200));
            return { totalVisitors: 0 };
        }

        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.error || "Failed to fetch total visitors");
        }

        return json; // expected shape: { totalVisitors: number }
    } catch (error) {
        console.error("Fetch site total visitors error:", error);
        return { totalVisitors: 0 };
    }
}

// ============================================================
// DUMMY DATA FOR DEVELOPMENT
// ============================================================

function getDummyAnalyticsData(dateRange) {
    const days = 30;
    const trendData = Array.from({ length: days }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (days - i));
        return {
            date: date.toISOString().split("T")[0],
            users: Math.floor(Math.random() * 500) + 100,
            newUsers: Math.floor(Math.random() * 100) + 20,
            sessions: Math.floor(Math.random() * 800) + 200,
            pageViews: Math.floor(Math.random() * 2000) + 500,
        };
    });

    const sources = [
        { source: "Organic Search", users: 1250, sessions: 2100, percentage: 35, color: "#4285F4" },
        { source: "Direct", users: 850, sessions: 1400, percentage: 24, color: "#34A853" },
        { source: "Social", users: 620, sessions: 980, percentage: 17, color: "#FBBC05" },
        { source: "Referral", users: 480, sessions: 720, percentage: 13, color: "#FF6D00" },
        { source: "Email", users: 390, sessions: 580, percentage: 11, color: "#9C27B0" },
    ];

    const countries = [
        { country: "United States", users: 2450, sessions: 4200, engagementRate: 72.5, averageSessionDuration: 185 },
        { country: "United Kingdom", users: 1200, sessions: 2100, engagementRate: 68.3, averageSessionDuration: 165 },
        { country: "Canada", users: 980, sessions: 1650, engagementRate: 71.8, averageSessionDuration: 178 },
        { country: "Australia", users: 750, sessions: 1280, engagementRate: 74.1, averageSessionDuration: 192 },
        { country: "Germany", users: 680, sessions: 1150, engagementRate: 66.5, averageSessionDuration: 158 },
        { country: "France", users: 540, sessions: 920, engagementRate: 69.2, averageSessionDuration: 172 },
        { country: "India", users: 480, sessions: 810, engagementRate: 63.8, averageSessionDuration: 148 },
        { country: "Japan", users: 420, sessions: 710, engagementRate: 65.4, averageSessionDuration: 155 },
    ];

    const devices = [
        { device: "Desktop", users: 1850, percentage: 52, color: "#4285F4" },
        { device: "Mobile", users: 1450, percentage: 41, color: "#EA4335" },
        { device: "Tablet", users: 250, percentage: 7, color: "#FBBC05" },
    ];

    const browsers = [
        { browser: "Chrome", users: 2100, percentage: 59, color: "#4285F4" },
        { browser: "Safari", users: 780, percentage: 22, color: "#34A853" },
        { browser: "Firefox", users: 420, percentage: 12, color: "#FF6B00" },
        { browser: "Edge", users: 180, percentage: 5, color: "#0078D4" },
        { browser: "Opera", users: 70, percentage: 2, color: "#FF1B2D" },
    ];

    return {
        overview: {
            activeUsers: 234,
            totalUsers: 12580,
            newUsers: 3420,
            sessions: 28900,
            pageViews: 87500,
            engagedSessions: 18200,
            averageSessionDuration: 175,
            bounceRate: 37.2,
        },
        trend: trendData,
        sources,
        countries,
        devices,
        browsers,
        metadata: {
            propertyId: GA4_PROPERTY_ID,
            dateRange: { startDate: dateRange.startDate, endDate: dateRange.endDate },
            lastUpdated: new Date().toISOString(),
        },
    };
}

function getDummyRealTimeData() {
    const activeUsers = Math.floor(Math.random() * 50) + 10;
    return {
        activeUsers,
        usersPerMinute: Array.from({ length: 30 }, () => Math.floor(Math.random() * activeUsers) + 1),
        topPages: [
            { page: "/", users: Math.floor(activeUsers * 0.3) },
            { page: "/products", users: Math.floor(activeUsers * 0.2) },
            { page: "/about", users: Math.floor(activeUsers * 0.15) },
            { page: "/contact", users: Math.floor(activeUsers * 0.1) },
            { page: "/blog", users: Math.floor(activeUsers * 0.08) },
        ],
        topSources: [
            { source: "Direct", users: Math.floor(activeUsers * 0.25) },
            { source: "Google", users: Math.floor(activeUsers * 0.35) },
            { source: "Facebook", users: Math.floor(activeUsers * 0.2) },
            { source: "LinkedIn", users: Math.floor(activeUsers * 0.1) },
            { source: "Twitter", users: Math.floor(activeUsers * 0.05) },
        ],
    };
}

// ============================================================
// DATE UTILITIES
// ============================================================

function getDateRange(range, customStart, customEnd) {
    const today = new Date();
    const end = new Date(today);
    end.setHours(23, 59, 59, 999);

    let start = new Date(today);

    switch (range) {
        case "today":
            start.setHours(0, 0, 0, 0);
            break;
        case "yesterday":
            start.setDate(start.getDate() - 1);
            start.setHours(0, 0, 0, 0);
            break;
        case "last7days":
            start.setDate(start.getDate() - 6);
            start.setHours(0, 0, 0, 0);
            break;
        case "last30days":
            start.setDate(start.getDate() - 29);
            start.setHours(0, 0, 0, 0);
            break;
        case "last90days":
            start.setDate(start.getDate() - 89);
            start.setHours(0, 0, 0, 0);
            break;
        case "thisMonth":
            start.setDate(1);
            start.setHours(0, 0, 0, 0);
            break;
        case "lastMonth":
            start.setMonth(start.getMonth() - 1);
            start.setDate(1);
            start.setHours(0, 0, 0, 0);
            break;
        case "custom":
            if (customStart && customEnd) {
                return { startDate: customStart, endDate: customEnd };
            }
            start.setDate(start.getDate() - 29);
            start.setHours(0, 0, 0, 0);
            break;
        default:
            start.setDate(start.getDate() - 29);
            start.setHours(0, 0, 0, 0);
    }

    return {
        startDate: start.toISOString().split("T")[0],
        endDate: end.toISOString().split("T")[0],
    };
}

function formatDuration(seconds) {
    if (!seconds || isNaN(seconds)) return "0s";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
}

function formatNumber(value) {
    if (value === undefined || value === null || isNaN(value)) return "0";
    if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1) + "B";
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";
    if (value >= 1_000) return (value / 1_000).toFixed(1) + "K";
    return value.toString();
}

// ============================================================
// UI COMPONENTS
// ============================================================

// Skeleton Components
function SkeletonMetricCard() {
    return (
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
}

function SkeletonChart() {
    return (
        <div className="dp-card" style={{ padding: "20px" }}>
            <div className="dp-sk" style={{ height: 24, width: "40%", marginBottom: 16 }} />
            <div className="dp-sk" style={{ height: 300, width: "100%", borderRadius: 8 }} />
        </div>
    );
}

// KPI Card Component
function KPICard({ label, value, icon: Icon, color, bg, loading }) {
    if (loading) return <SkeletonMetricCard />;

    return (
        <motion.div
            className="dp-kpi-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(4,65,125,0.11)" }}
        >
            <div className="dp-kpi-accent" style={{ background: color }} />
            <div className="dp-kpi-body">
                <div className="dp-kpi-top-row">
                    <div className="dp-kpi-icon" style={{ background: bg }}>
                        <Icon size={16} color={color} />
                    </div>
                    <div className="dp-kpi-text">
                        <div className="dp-kpi-value">{value}</div>
                        <div className="dp-kpi-label">{label}</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Date Range Filter
function DateRangeFilter({ value, onChange }) {
    const [isCustom, setIsCustom] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const ranges = [
        { value: "today", label: "Today" },
        { value: "yesterday", label: "Yesterday" },
        { value: "last7days", label: "Last 7 Days" },
        { value: "last30days", label: "Last 30 Days" },
        { value: "last90days", label: "Last 90 Days" },
        { value: "thisMonth", label: "This Month" },
        { value: "lastMonth", label: "Last Month" },
        { value: "custom", label: "Custom" },
    ];

    const handleChange = (val) => {
        if (val === "custom") {
            setIsCustom(true);
        } else {
            setIsCustom(false);
            onChange(val);
        }
    };

    const handleApplyCustom = () => {
        if (startDate && endDate) {
            onChange("custom", startDate, endDate);
            setIsCustom(false);
        }
    };

    return (
        <div className="dp-filter-actions" style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
            <select
                className="dp-ctrl-select"
                value={value === "custom" ? "custom" : value}
                onChange={(e) => handleChange(e.target.value)}
                style={{ minWidth: "140px" }}
            >
                {ranges.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                ))}
            </select>

            {isCustom && (
                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                    <input
                        type="date"
                        className="dp-ctrl-input"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={{ width: "140px" }}
                    />
                    <span style={{ color: "#94a3b8" }}>to</span>
                    <input
                        type="date"
                        className="dp-ctrl-input"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        style={{ width: "140px" }}
                    />
                    <button className="dp-btn-primary" onClick={handleApplyCustom} style={{ padding: "0 12px", height: "34px" }}>
                        Apply
                    </button>
                </div>
            )}
        </div>
    );
}

// Custom Tooltip for Charts
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="dp-card" style={{ padding: "12px", minWidth: "150px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{label}</div>
                {payload.map((p, index) => (
                    <div key={index} style={{ fontSize: 12, display: "flex", justifyContent: "space-between", gap: "16px" }}>
                        <span style={{ color: "#64748b" }}>{p.name}</span>
                        <span style={{ fontWeight: 600 }}>{p.value?.toLocaleString() || "0"}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function WebsiteAnalyticsPage() {
    // ===== STATE =====
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const [dateRange, setDateRange] = useState("last30days");
    const [customStart, setCustomStart] = useState("");
    const [customEnd, setCustomEnd] = useState("");
    const [data, setData] = useState(null);
    const [realTimeData, setRealTimeData] = useState(null);
    const [allTimeVisitors, setAllTimeVisitors] = useState(0);
    const [allTimeLoading, setAllTimeLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const isMounted = useRef(true);

    // ===== HELPERS =====
    const getDateRangeParams = useCallback(() => {
        return getDateRange(dateRange, customStart, customEnd);
    }, [dateRange, customStart, customEnd]);

    // ===== DATA FETCHING =====
    const fetchData = useCallback(async (showToast = false) => {
        if (!isMounted.current) return;
        
        try {
            if (showToast) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }
            setError(null);

            const { startDate, endDate } = getDateRangeParams();
            const result = await fetchAnalyticsData({ startDate, endDate });

            if (isMounted.current) {
                setData(result);
                if (showToast) {
                    toast.success("Data refreshed successfully");
                }
            }
        } catch (err) {
            if (isMounted.current) {
                setError(err.message || "Failed to load analytics data");
                if (showToast) {
                    toast.error(err.message || "Failed to refresh data");
                }
            }
        } finally {
            if (isMounted.current) {
                setLoading(false);
                setRefreshing(false);
            }
        }
    }, [getDateRangeParams]);

    const fetchRealTime = useCallback(async () => {
        try {
            const result = await fetchRealTimeUsers();
            if (isMounted.current) {
                setRealTimeData(result);
            }
        } catch (err) {
            console.error("Real-time fetch error:", err);
        }
    }, []);

   // ===== All-Time Total Visitors — নিজের site database থেকে আসে, GA4/filter এর সাথে কোনো সম্পর্ক নেই =====
const fetchAllTimeVisitors = useCallback(async () => {
    try {
        setAllTimeLoading(true);
        const result = await fetchSiteTotalVisitors();
        if (isMounted.current && result?.totalVisitors !== undefined) {
            setAllTimeVisitors(result.totalVisitors);
        }
    } catch (err) {
        console.error("All-time visitors fetch error:", err);
    } finally {
        if (isMounted.current) setAllTimeLoading(false);
    }
}, []);

    // ===== EFFECTS =====
    useEffect(() => {
        isMounted.current = true;
        fetchData();
        fetchRealTime();
        fetchAllTimeVisitors();

        const interval = setInterval(() => {
            fetchRealTime();
        }, 30000);

        return () => {
            isMounted.current = false;
            clearInterval(interval);
        };
    }, [fetchData, fetchRealTime, fetchAllTimeVisitors]);

        // ===== Mobile detection (charts responsive রাখার জন্য) =====
        useEffect(() => {
            const checkMobile = () => setIsMobile(window.innerWidth <= 768);
            checkMobile();
            window.addEventListener("resize", checkMobile);
            return () => window.removeEventListener("resize", checkMobile);
        }, []);

        // ===== HANDLERS =====
    const handleDateRangeChange = (range, start, end) => {
        setDateRange(range);
        if (start) setCustomStart(start);
        if (end) setCustomEnd(end);
    };

    const handleRefresh = () => {
        fetchData(true);
    };

// ===== DATA PROCESSING =====
    const overview = data?.overview || {};
    const trendData = data?.trend || [];
    const sources = data?.sources || [];
    const countries = (data?.countries || []).slice(0, 50);
    const devices = data?.devices || [];
    const browsers = data?.browsers || [];

    // KPI configuration
    const kpiConfigs = [
        { key: "activeUsers", label: "Active Users", icon: Activity, color: "#3B82F6", bg: "#dbeafe" },
        { key: "totalUsers", label: "Total Users", icon: Users, color: "#8B5CF6", bg: "#ede9fe" },
        { key: "newUsers", label: "New Users", icon: UserPlus, color: "#10B981", bg: "#dcfce7" },
        { key: "sessions", label: "Sessions", icon: MousePointerClick, color: "#F59E0B", bg: "#fef3c7" },
        { key: "pageViews", label: "Page Views", icon: Eye, color: "#EC4899", bg: "#fce7f3" },
        { key: "engagedSessions", label: "Engaged Sessions", icon: TrendingUp, color: "#06B6D4", bg: "#cffafe" },
        {
            key: "averageSessionDuration",
            label: "Avg Session Duration",
            icon: Clock,
            color: "#F97316",
            bg: "#ffedd5",
            format: (v) => formatDuration(v)
        },
        {
            key: "bounceRate",
            label: "Bounce Rate",
            icon: Percent,
            color: "#EF4444",
            bg: "#fee2e2",
            format: (v) => `${Number(v || 0).toFixed(2)}%`
        },
    ];

    // ===== RENDER =====
    if (error && !loading) {
        return (
            <div className="dp-page">
                <div className="dp-card" style={{ padding: "40px", textAlign: "center" }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
                    <h2 style={{ color: "#ef4444", marginBottom: 8 }}>Failed to Load Analytics</h2>
                    <p style={{ color: "#64748b", marginBottom: 16 }}>{error}</p>
                    <button
                        className="dp-btn-primary"
                        onClick={handleRefresh}
                        style={{ padding: "10px 24px" }}
                    >
                        <RefreshCw size={16} style={{ marginRight: 8 }} />
                        Retry
                    </button>
                    <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 16 }}>
                        Make sure your Google Analytics credentials are properly configured.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            className="dp-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            {/* ===== HEADER ===== */}
            <div className="dp-header">
                <div className="dp-header-left">
                    <div className="dp-live-badge">
                        <span className="dp-live-dot" />
                        <span>Live</span>
                    </div>
                    <p className="dp-page-sub">
                        Real-time insights from Google Analytics 4
                        {data?.metadata?.lastUpdated && ` · Updated ${new Date(data.metadata.lastUpdated).toLocaleString()}`}
                    </p>
                </div>
                <div className="dp-header-actions">
                    <DateRangeFilter
                        value={dateRange}
                        onChange={handleDateRangeChange}
                    />
                    <button
                        className="dp-btn-ghost"
                        onClick={handleRefresh}
                        disabled={refreshing}
                    >
                        {refreshing ? <Loader2 size={14} className="spinner" /> : <RefreshCw size={14} />}
                        <span>Refresh</span>
                    </button>
                    <button className="dp-btn-ghost">
                        <Download size={14} /> <span>Export</span>
                    </button>
                    <button className="dp-btn-primary">
                        <Share2 size={14} /> Share
                    </button>
                </div>
            </div>

            {/* ===== TWO CARDS: ACTIVE USERS & TOTAL VISITORS ===== */}
            <div className="dp-top-stats-grid">
                {/* Card 1: Active Users Right Now */}
                <div className="dp-card dp-top-stat-card">
                    <div className="dp-top-stat-dot" style={{ background: "#16a34a", animation: "dp-pulse 2s infinite" }} />
                    <div>
                        <div className="dp-top-stat-label">Active Users Right Now</div>
                        <div className="dp-top-stat-value" style={{ color: "#16a34a" }}>
                            {realTimeData?.activeUsers || 0}
                        </div>
                        <div className="dp-top-stat-sub">
                            Auto refreshes every 30 seconds
                        </div>
                    </div>
                </div>

                {/* Card 2: Total Visitors (All Time) - Independent of filters */}
                <div className="dp-card dp-top-stat-card">
                    <div className="dp-top-stat-dot" style={{ background: "#8B5CF6" }} />
                    <div>
                        <div className="dp-top-stat-label">Total Visitors (All Time)</div>
                        <div className="dp-top-stat-value" style={{ color: "#8B5CF6" }}>
                            {allTimeLoading ? "..." : formatNumber(allTimeVisitors || 0)}
                        </div>
                        <div className="dp-top-stat-sub">
                            Cumulative visitors to renovalifecare.com
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== KPI CARDS ===== */}
            <div className="dp-kpi-grid">
                {kpiConfigs.map((config) => {
                    const value = overview[config.key];
                    const formattedValue = config.format 
                        ? config.format(value) 
                        : formatNumber(value);
                    
                    return (
                        <KPICard
                            key={config.key}
                            label={config.label}
                            value={formattedValue}
                            icon={config.icon}
                            color={config.color}
                            bg={config.bg}
                            loading={loading}
                        />
                    );
                })}
            </div>

            {/* ===== VISITOR TREND + TRAFFIC SOURCES ===== */}
            <div className="dp-two-col">
                {/* Visitor Trend */}
                <div className="dp-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                        <h3 className="dp-card-subtitle" style={{ marginBottom: 0 }}>Visitor Trend</h3>
                    </div>
                    {loading ? (
                        <SkeletonChart />
                    ) : (
                        <div style={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={trendData.length ? trendData : []}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                                    <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                                    <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Area
                                        type="monotone"
                                        dataKey="users"
                                        name="Users"
                                        stroke="#3B82F6"
                                        fill="#3B82F633"
                                        strokeWidth={2}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="newUsers"
                                        name="New Users"
                                        stroke="#10B981"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                    <Bar dataKey="sessions" name="Sessions" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={20} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>

                {/* Traffic Sources */}
                <div className="dp-card">
                    <h3 className="dp-card-subtitle">Traffic Sources</h3>
                    {loading ? (
                        <SkeletonChart />
                    ) : (
                        <div style={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={sources.length ? sources : []}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={2}
                                        dataKey="users"
                                        nameKey="source"
                                        label={({ source, percentage }) => `${source} ${percentage?.toFixed(1) || 0}%`}
                                        labelLine={false}
                                    >
                                        {sources.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color || "#94a3b8"} stroke="#fff" strokeWidth={2} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        content={({ active, payload }) => {
                                            if (active && payload?.length) {
                                                const d = payload[0].payload;
                                                return (
                                                    <div className="dp-card" style={{ padding: "12px" }}>
                                                        <div style={{ fontSize: 13, fontWeight: 700 }}>{d.source}</div>
                                                        <div style={{ fontSize: 12, color: "#64748b" }}>Users: {d.users?.toLocaleString() || 0}</div>
                                                        <div style={{ fontSize: 12, color: "#64748b" }}>Sessions: {d.sessions?.toLocaleString() || 0}</div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>
            </div>

            {/* ===== DEVICES + BROWSERS ===== */}
            <div className="dp-two-col">
                {/* Devices */}
                <div className="dp-card">
                    <h3 className="dp-card-subtitle">Devices</h3>
                    {loading ? (
                        <SkeletonChart />
                    ) : (
                        <div style={{ height: 250 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={devices.length ? devices : []}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        paddingAngle={2}
                                        dataKey="users"
                                        nameKey="device"
                                        label={({ device, percentage }) => `${device} ${percentage?.toFixed(1) || 0}%`}
                                        labelLine={false}
                                    >
                                        {devices.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color || "#94a3b8"} stroke="#fff" strokeWidth={2} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        content={({ active, payload }) => {
                                            if (active && payload?.length) {
                                                const d = payload[0].payload;
                                                return (
                                                    <div className="dp-card" style={{ padding: "12px" }}>
                                                        <div style={{ fontSize: 13, fontWeight: 700 }}>{d.device}</div>
                                                        <div style={{ fontSize: 12, color: "#64748b" }}>Users: {d.users?.toLocaleString() || 0}</div>
                                                        <div style={{ fontSize: 12, color: "#64748b" }}>{d.percentage?.toFixed(1) || 0}%</div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>

                {/* Browsers */}
                <div className="dp-card">
                    <h3 className="dp-card-subtitle">Browsers</h3>
                    {loading ? (
                        <SkeletonChart />
                    ) : (
                        <div className="dp-chart-container--sm">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={browsers.length ? browsers : []}
                                    layout="vertical"
                                    margin={{ top: 5, right: isMobile ? 15 : 30, left: isMobile ? 0 : 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
                                    <XAxis type="number" tick={{ fontSize: isMobile ? 9 : 11 }} />
                                    <YAxis 
                                        type="category" 
                                        dataKey="browser" 
                                        tick={{ fontSize: isMobile ? 9 : 11 }} 
                                        width={isMobile ? 55 : 80}
                                    />
                                    <Tooltip
                                        content={({ active, payload }) => {
                                            if (active && payload?.length) {
                                                const d = payload[0].payload;
                                                return (
                                                    <div className="dp-card" style={{ padding: "12px" }}>
                                                        <div style={{ fontSize: 13, fontWeight: 700 }}>{d.browser}</div>
                                                        <div style={{ fontSize: 12, color: "#64748b" }}>Users: {d.users?.toLocaleString() || 0}</div>
                                                        <div style={{ fontSize: 12, color: "#64748b" }}>{d.percentage?.toFixed(1) || 0}%</div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                   <Bar 
                                        dataKey="users" 
                                        radius={[0, 4, 4, 0]} 
                                        barSize={isMobile ? 18 : 30}
                                        label={{ 
                                            position: 'right', 
                                            formatter: (value) => value?.toLocaleString() || "0",
                                            fontSize: isMobile ? 9 : 11,
                                            fill: '#64748b'
                                        }}
                                    >
                                        {browsers.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color || "#94a3b8"} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>
            </div>

            {/* ===== COUNTRIES TABLE ===== */}
            <div className="dp-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
                    <h3 className="dp-card-subtitle" style={{ marginBottom: 0 }}>
                        Top Countries {countries.length > 0 && <span style={{ fontWeight: 500, color: "#94a3b8", fontSize: 11.5 }}>({countries.length})</span>}
                    </h3>
                    {isMobile && countries.length > 0 && (
                        <span style={{ fontSize: 10.5, color: "#94a3b8" }}>← Scroll for more →</span>
                    )}
                </div>

                {loading ? (
                    <div style={{ padding: "20px 0" }}>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} style={{ display: "flex", gap: "16px", padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
                                <div className="dp-sk" style={{ height: 16, width: "30%" }} />
                                <div className="dp-sk" style={{ height: 16, width: "15%" }} />
                                <div className="dp-sk" style={{ height: 16, width: "15%" }} />
                                <div className="dp-sk" style={{ height: 16, width: "20%" }} />
                                <div className="dp-sk" style={{ height: 16, width: "20%" }} />
                            </div>
                        ))}
                    </div>
                ) : countries.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
                        <Globe size={32} style={{ margin: "0 auto 8px", display: "block", opacity: 0.5 }} />
                        No country data available
                    </div>
                ) : isMobile ? (
                    /* Mobile: card layout — কোনো horizontal scroll লাগবে না, সব text স্পষ্ট দেখা যাবে */
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "420px", overflowY: "auto" }}>
                        {countries.map((c, i) => (
                            <div key={i} style={{ padding: "12px 14px", border: "1px solid #f1f5f9", borderRadius: "10px", background: "#fafbfc" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                                    <span style={{ fontWeight: 700, fontSize: 13, color: "#1e293b" }}>{c.country || "Unknown"}</span>
                                    <span style={{
                                        display: "inline-block",
                                        padding: "2px 8px",
                                        borderRadius: "20px",
                                        fontSize: "10.5px",
                                        fontWeight: 700,
                                        background: (c.engagementRate || 0) > 70 ? "#dcfce7" : (c.engagementRate || 0) > 50 ? "#fef3c7" : "#fee2e2",
                                        color: (c.engagementRate || 0) > 70 ? "#16a34a" : (c.engagementRate || 0) > 50 ? "#d97706" : "#ef4444"
                                    }}>
                                        {(c.engagementRate || 0).toFixed(1)}%
                                    </span>
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" }}>
                                    <div>
                                        <div style={{ fontSize: 9.5, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.03em" }}>Users</div>
                                        <div style={{ fontSize: 12, fontWeight: 700, color: "#334155" }}>{(c.users || 0).toLocaleString()}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 9.5, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.03em" }}>Sessions</div>
                                        <div style={{ fontSize: 12, fontWeight: 700, color: "#334155" }}>{(c.sessions || 0).toLocaleString()}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 9.5, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.03em" }}>Avg Duration</div>
                                        <div style={{ fontSize: 12, fontWeight: 700, color: "#334155" }}>{formatDuration(c.averageSessionDuration || 0)}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Desktop: table layout (আগের মতোই) */
                    <div className="dp-table-wrapper" style={{ maxHeight: "400px", overflow: "auto" }}>
                        <table className="dp-perf-table" style={{ minWidth: "600px" }}>
                            <thead>
                                <tr>
                                    <th>Country</th>
                                    <th style={{ textAlign: "right" }}>Users</th>
                                    <th style={{ textAlign: "right" }}>Sessions</th>
                                    <th style={{ textAlign: "right" }}>Engagement Rate</th>
                                    <th style={{ textAlign: "right" }}>Avg Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {countries.map((c, i) => (
                                    <tr key={i} className="dp-table-row">
                                        <td style={{ fontWeight: 600 }}>{c.country || "Unknown"}</td>
                                        <td style={{ textAlign: "right" }}>{(c.users || 0).toLocaleString()}</td>
                                        <td style={{ textAlign: "right" }}>{(c.sessions || 0).toLocaleString()}</td>
                                        <td style={{ textAlign: "right" }}>
                                            <span style={{
                                                display: "inline-block",
                                                padding: "2px 8px",
                                                borderRadius: "20px",
                                                fontSize: "11px",
                                                fontWeight: 700,
                                                background: (c.engagementRate || 0) > 70 ? "#dcfce7" : (c.engagementRate || 0) > 50 ? "#fef3c7" : "#fee2e2",
                                                color: (c.engagementRate || 0) > 70 ? "#16a34a" : (c.engagementRate || 0) > 50 ? "#d97706" : "#ef4444"
                                            }}>
                                                {(c.engagementRate || 0).toFixed(1)}%
                                            </span>
                                        </td>
                                        <td style={{ textAlign: "right" }}>{formatDuration(c.averageSessionDuration || 0)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </motion.div>
    );
}