// app/super-admin-panel/finance/settlements/page.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./settlement-analytics.css";
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
    // Settlement Specific Icons
    Wallet, Banknote, Landmark, Receipt, FileCheck, FileX, Hourglass,
    Timer, Gauge, Scale, PiggyBank, Briefcase, Globe, MapPin as MapPinIcon,
    CreditCard as CardIcon, Smartphone, Building, Home, Truck, Ship,
    Plane, Train, Bus, Car, Bike, Footprints, Compass, Navigation,
    Layers as LayersIcon, Grid3x3, List, Table, Maximize2, Minimize2,
    Filter as FilterIcon, Sliders, Calendar as CalendarIcon, Clock as ClockIcon,
    ArrowUp, ArrowDown, AlertOctagon, AlertCircle as AlertCircleIcon,
    Check, Minus, Plus, Edit2, Trash2, Copy, Printer, Upload, Cloud,
    Database, Server, Cpu, HardDrive, Shield as ShieldIcon, Lock, Unlock,
    Key, Fingerprint, User, UserPlus, UserMinus, UserCheck as UserCheckIcon,
    UserX as UserXIcon, Users as UsersIcon, UserCog, UserCircle,
    Briefcase as BriefcaseIcon, Clipboard, ClipboardList, FileText as FileTextIcon,
    FileCheck as FileCheckIcon, FileX as FileXIcon, Folder, FolderOpen,
    FolderPlus, FolderMinus, Archive, Trash, RefreshCw as RefreshCwIcon,
    Settings as SettingsIcon, Sliders as SlidersIcon, HelpCircle,
    LifeBuoy, MessageCircle, MessageSquare, Mail as MailIcon,
    Phone as PhoneIcon, Video, Camera, Image, Monitor, Smartphone as SmartphoneIcon,
    Tablet, Laptop, Desktop, Watch, Headphones, Speaker, Mic,
    Volume2, VolumeX, Music, Radio, Tv, Film, Clapperboard,
    // Payment/Settlement specific
    CreditCard as CreditCardIcon, Coins, ReceiptText, BanknoteIcon,
    Wallet as WalletIcon, Landmark as LandmarkIcon, PiggyBank as PiggyBankIcon,
    Briefcase as BriefcaseIcon2, Building as BuildingIcon, Home as HomeIcon,
    Globe as GlobeIcon, MapPin as MapPinIcon2, Navigation as NavigationIcon,
    Compass as CompassIcon, Layers as LayersIcon2, Grid3x3 as Grid3x3Icon,
    List as ListIcon, Table as TableIcon, Maximize2 as Maximize2Icon,
    Minimize2 as Minimize2Icon, Filter as FilterIcon2, Sliders as SlidersIcon2,
    Calendar as CalendarIcon2, Clock as ClockIcon2, ArrowUp as ArrowUpIcon,
    ArrowDown as ArrowDownIcon, AlertOctagon as AlertOctagonIcon,
    AlertCircle as AlertCircleIcon2, Check as CheckIcon, Minus as MinusIcon,
    Plus as PlusIcon, Edit2 as Edit2Icon, Trash2 as Trash2Icon, Copy as CopyIcon,
    Printer as PrinterIcon, Upload as UploadIcon, Cloud as CloudIcon,
    Database as DatabaseIcon, Server as ServerIcon, Cpu as CpuIcon,
    HardDrive as HardDriveIcon, Shield as ShieldIcon2, Lock as LockIcon,
    Unlock as UnlockIcon, Key as KeyIcon, Fingerprint as FingerprintIcon,
    User as UserIcon, UserPlus as UserPlusIcon, UserMinus as UserMinusIcon,
    UserCheck as UserCheckIcon2, UserX as UserXIcon2, Users as UsersIcon2,
    UserCog as UserCogIcon, UserCircle as UserCircleIcon,
    Briefcase as BriefcaseIcon3, Clipboard as ClipboardIcon,
    ClipboardList as ClipboardListIcon, FileText as FileTextIcon2,
    FileCheck as FileCheckIcon2, FileX as FileXIcon2, Folder as FolderIcon,
    FolderOpen as FolderOpenIcon, FolderPlus as FolderPlusIcon,
    FolderMinus as FolderMinusIcon, Archive as ArchiveIcon, Trash as TrashIcon,
    RefreshCw as RefreshCwIcon2, Settings as SettingsIcon2,
    Sliders as SlidersIcon3, HelpCircle as HelpCircleIcon,
    LifeBuoy as LifeBuoyIcon, MessageCircle as MessageCircleIcon,
    MessageSquare as MessageSquareIcon, Mail as MailIcon2,
    Phone as PhoneIcon2, Video as VideoIcon, Camera as CameraIcon,
    Image as ImageIcon, Monitor as MonitorIcon, Smartphone as SmartphoneIcon2,
    Tablet as TabletIcon, Laptop as LaptopIcon, Desktop as DesktopIcon,
    Watch as WatchIcon, Headphones as HeadphonesIcon, Speaker as SpeakerIcon,
    Mic as MicIcon, Volume2 as Volume2Icon, VolumeX as VolumeXIcon,
    Music as MusicIcon, Radio as RadioIcon, Tv as TvIcon, Film as FilmIcon,
    Clapperboard as ClapperboardIcon,
    // Additional settlement icons
    Receipt as ReceiptIcon, Coins as CoinsIcon, Banknote as BanknoteIcon2,
    Wallet as WalletIcon2, Landmark as LandmarkIcon2, PiggyBank as PiggyBankIcon2,
    Briefcase as BriefcaseIcon4, Building as BuildingIcon2, Home as HomeIcon2,
    Globe as GlobeIcon2, MapPin as MapPinIcon3, Navigation as NavigationIcon2,
    Compass as CompassIcon2, Layers as LayersIcon3, Grid3x3 as Grid3x3Icon2,
    List as ListIcon2, Table as TableIcon2, Maximize2 as Maximize2Icon2,
    Minimize2 as Minimize2Icon2, Filter as FilterIcon3, Sliders as SlidersIcon4,
    Calendar as CalendarIcon3, Clock as ClockIcon3, ArrowUp as ArrowUpIcon2,
    ArrowDown as ArrowDownIcon2, AlertOctagon as AlertOctagonIcon2,
    AlertCircle as AlertCircleIcon3, Check as CheckIcon2, Minus as MinusIcon2,
    Plus as PlusIcon2, Edit2 as Edit2Icon2, Trash2 as Trash2Icon2,
    Copy as CopyIcon2, Printer as PrinterIcon2, Upload as UploadIcon2,
    Cloud as CloudIcon2, Database as DatabaseIcon2, Server as ServerIcon2,
    Cpu as CpuIcon2, HardDrive as HardDriveIcon2, Shield as ShieldIcon3,
    Lock as LockIcon2, Unlock as UnlockIcon2, Key as KeyIcon2,
    Fingerprint as FingerprintIcon2, User as UserIcon2, UserPlus as UserPlusIcon2,
    UserMinus as UserMinusIcon2, UserCheck as UserCheckIcon3,
    UserX as UserXIcon3, Users as UsersIcon3, UserCog as UserCogIcon2,
    UserCircle as UserCircleIcon2, Briefcase as BriefcaseIcon5,
    Clipboard as ClipboardIcon2, ClipboardList as ClipboardListIcon2,
    FileText as FileTextIcon3, FileCheck as FileCheckIcon3,
    FileX as FileXIcon3, Folder as FolderIcon2, FolderOpen as FolderOpenIcon2,
    FolderPlus as FolderPlusIcon2, FolderMinus as FolderMinusIcon2,
    Archive as ArchiveIcon2, Trash as TrashIcon2, RefreshCw as RefreshCwIcon3,
    Settings as SettingsIcon3, Sliders as SlidersIcon5,
    HelpCircle as HelpCircleIcon2, LifeBuoy as LifeBuoyIcon2,
    MessageCircle as MessageCircleIcon2, MessageSquare as MessageSquareIcon2,
    Mail as MailIcon3, Phone as PhoneIcon3, Video as VideoIcon2,
    Camera as CameraIcon2, Image as ImageIcon2, Monitor as MonitorIcon2,
    Smartphone as SmartphoneIcon3, Tablet as TabletIcon2,
    Laptop as LaptopIcon2, Desktop as DesktopIcon2, Watch as WatchIcon2,
    Headphones as HeadphonesIcon2, Speaker as SpeakerIcon2, Mic as MicIcon2,
    Volume2 as Volume2Icon2, VolumeX as VolumeXIcon2, Music as MusicIcon2,
    Radio as RadioIcon2, Tv as TvIcon2, Film as FilmIcon2,
    Clapperboard as ClapperboardIcon2
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
    { label: "Total Settlements", value: "৳42.8M", change: "+14.2%", trend: "up", sub: "vs last month", icon: DollarSign, color: "#014fa1", bg: "#dbeafe" },
    { label: "Successful Settlements", value: "৳39.6M", change: "+12.8%", trend: "up", sub: "92.5% success rate", icon: CheckCircle, color: "#16a34a", bg: "#dcfce7" },
    { label: "Pending Settlements", value: "৳2.4M", change: "+8.6%", trend: "down", sub: "5.6% pending", icon: Hourglass, color: "#f59e0b", bg: "#fef3c7" },
    { label: "Processing", value: "৳0.8M", change: "-3.2%", trend: "up", sub: "1.9% processing", icon: RotateCcw, color: "#0891b2", bg: "#cffafe" },
    { label: "Failed Settlements", value: "৳0.2M", change: "+15.4%", trend: "down", sub: "0.5% failure rate", icon: XCircle, color: "#ef4444", bg: "#fee2e2" },
    { label: "Success Rate", value: "92.5%", change: "+1.8%", trend: "up", sub: "vs 90.7% prior", icon: Percent, color: "#16a34a", bg: "#dcfce7" },
    { label: "Failure Rate", value: "7.5%", change: "-1.8%", trend: "up", sub: "vs 9.3% prior", icon: AlertTriangle, color: "#ef4444", bg: "#fee2e2" },
    { label: "Avg Settlement Time", value: "2.4 hrs", change: "-0.8 hrs", trend: "up", sub: "vs 3.2 hrs prior", icon: Clock, color: "#7c3aed", bg: "#ede9fe" },
    { label: "Avg Settlement Value", value: "৳3,240", change: "+6.2%", trend: "up", sub: "per transaction", icon: Target, color: "#014fa1", bg: "#dbeafe" },
    { label: "Same-day Settlement", value: "78.5%", change: "+4.2%", trend: "up", sub: "vs 74.3% prior", icon: CheckCircle, color: "#428a26", bg: "#dcfce7" },
    { label: "Delayed Settlement", value: "21.5%", change: "-4.2%", trend: "up", sub: "vs 25.7% prior", icon: Clock, color: "#f59e0b", bg: "#fef3c7" },
    { label: "Reconciled Payments", value: "98.2%", change: "+1.1%", trend: "up", sub: "vs 97.1% prior", icon: FileCheck, color: "#16a34a", bg: "#dcfce7" },
    { label: "Unreconciled", value: "1.8%", change: "-1.1%", trend: "up", sub: "vs 2.9% prior", icon: FileX, color: "#ef4444", bg: "#fee2e2" },
    { label: "Outstanding Liability", value: "৳3.6M", change: "+9.8%", trend: "down", sub: "vs ৳3.28M prior", icon: PiggyBank, color: "#ea580c", bg: "#ffedd5" },
    { label: "Settlement Growth", value: "+14.2%", change: "+5.6%", trend: "up", sub: "MoM growth", icon: TrendingUp, color: "#428a26", bg: "#dcfce7" },
    { label: "Settlement Efficiency", value: "86/100", change: "+4pts", trend: "up", sub: "vs 82/100 prior", icon: Gauge, color: "#014fa1", bg: "#dbeafe" },
];

const scores = [
    { label: "Overall Health", value: 86, color: "#014fa1" },
    { label: "Processing Speed", value: 92, color: "#428a26" },
    { label: "Success Rate", value: 95, color: "#16a34a" },
    { label: "Reconciliation", value: 88, color: "#0891b2" },
    { label: "Financial Efficiency", value: 78, color: "#7c3aed" },
    { label: "Liabilities", value: 72, color: "#ea580c" },
];

const insights = [
    { type: "success", title: "Processing Speed Improved", text: "Average settlement time reduced by 0.8 hours — 25% faster than last month." },
    { type: "success", title: "Same-day Settlement", text: "78.5% of settlements now processed same-day — up 4.2% from last month." },
    { type: "warning", title: "Failed Settlements Increase", text: "Failed settlements up 15.4% — Payment gateway issues detected with Bkash." },
    { type: "warning", title: "Outstanding Liability", text: "Outstanding settlements increased by 9.8% — ৳3.6M pending." },
    { type: "info", title: "Reconciliation Improvement", text: "Reconciliation rate improved to 98.2% — 1.1% increase from prior period." },
];

const alerts = [
    { type: "error", title: "High Pending Settlements", desc: "2 outlets have pending settlements exceeding 30 days — ৳1.2M total.", time: "1h ago" },
    { type: "warning", title: "Bkash Gateway Issues", desc: "Failure rate on Bkash payments increased to 12.4% in the last 24 hours.", time: "3h ago" },
    { type: "warning", title: "Reconciliation Delay", desc: "3 departments have unreconciled transactions older than 7 days.", time: "5h ago" },
    { type: "error", title: "Cash Flow Risk", desc: "Outstanding liability exceeds 15% of monthly revenue — ৳3.6M pending.", time: "8h ago" },
];

const settlementTrend = [
    { label: "Jan", successful: 32, pending: 4, failed: 2, processing: 2 },
    { label: "Feb", successful: 35, pending: 3, failed: 1, processing: 2 },
    { label: "Mar", successful: 30, pending: 5, failed: 3, processing: 2 },
    { label: "Apr", successful: 38, pending: 3, failed: 1, processing: 3 },
    { label: "May", successful: 36, pending: 4, failed: 2, processing: 2 },
    { label: "Jun", successful: 42, pending: 2, failed: 1, processing: 3 },
];

const payoutData = [
    { label: "Week 1", completed: 320, pending: 45, failed: 12, processing: 18 },
    { label: "Week 2", completed: 345, pending: 38, failed: 8, processing: 15 },
    { label: "Week 3", completed: 318, pending: 52, failed: 15, processing: 22 },
    { label: "Week 4", completed: 401, pending: 28, failed: 6, processing: 12 },
];

const settlementByOutlet = [
    { name: "Renova Dhanmondi", value: "৳12.5M", settlements: 3840, success: 94, color: "#014fa1" },
    { name: "Renova Mirpur", value: "৳8.2M", settlements: 2630, success: 91, color: "#428a26" },
    { name: "Renova Chattogram", value: "৳5.8M", settlements: 1890, success: 88, color: "#7c3aed" },
    { name: "Renova Sylhet", value: "৳4.5M", settlements: 1480, success: 85, color: "#0891b2" },
    { name: "Renova Uttara", value: "৳3.2M", settlements: 1020, success: 82, color: "#ea580c" },
];

const settlementByPaymentMethod = [
    { name: "Bkash/Mobile", value: "৳15.8M", percent: 37, success: 92, color: "#e11d48" },
    { name: "Cash", value: "৳12.8M", percent: 30, success: 95, color: "#428a26" },
    { name: "Card", value: "৳9.8M", percent: 23, success: 94, color: "#014fa1" },
    { name: "Insurance", value: "৳4.2M", percent: 10, success: 88, color: "#7c3aed" },
];

const settlementByGateway = [
    { name: "Bkash", value: "৳15.8M", percent: 37, success: 92, color: "#e11d48" },
    { name: "Rocket", value: "৳8.5M", percent: 20, success: 90, color: "#ea580c" },
    { name: "Nagad", value: "৳7.2M", percent: 17, success: 89, color: "#f59e0b" },
    { name: "SSLCommerz", value: "৳6.8M", percent: 16, success: 94, color: "#014fa1" },
    { name: "Bank Transfer", value: "৳4.5M", percent: 10, success: 96, color: "#428a26" },
];

const reconciliationData = [
    { label: "Reconciled", value: 98.2, color: "#16a34a" },
    { label: "Unreconciled", value: 1.8, color: "#ef4444" },
    { label: "Pending Review", value: 0.8, color: "#f59e0b" },
    { label: "Discrepancies", value: 0.4, color: "#ef4444" },
];

const liabilityTrend = [
    { label: "Jan", pending: 2.8, overdue: 0.4, current: 1.2 },
    { label: "Feb", pending: 3.2, overdue: 0.3, current: 1.0 },
    { label: "Mar", pending: 2.6, overdue: 0.5, current: 1.4 },
    { label: "Apr", pending: 3.0, overdue: 0.2, current: 1.1 },
    { label: "May", pending: 2.4, overdue: 0.6, current: 0.9 },
    { label: "Jun", pending: 3.6, overdue: 0.8, current: 1.2 },
];

const comparisonData = [
    { metric: "Settlement Volume", dhanmondi: "৳12.5M", mirpur: "৳8.2M", uttara: "৳3.2M", avg: "৳6.8M" },
    { metric: "Success Rate", dhanmondi: "94%", mirpur: "91%", uttara: "82%", avg: "88%" },
    { metric: "Avg Processing Time", dhanmondi: "1.8h", mirpur: "2.4h", uttara: "3.2h", avg: "2.4h" },
    { metric: "Same-day %", dhanmondi: "85%", mirpur: "78%", uttara: "65%", avg: "76%" },
    { metric: "Reconciliation", dhanmondi: "99%", mirpur: "97%", uttara: "92%", avg: "96%" },
    { metric: "Growth Rate", dhanmondi: "+16%", mirpur: "+12%", uttara: "-3%", avg: "+9.8%" },
];

const settlementData = [
    { id: "SET-001", date: "2026-06-22", outlet: "Renova Dhanmondi", doctor: "Dr. S. Rahman", amount: "৳45,200", method: "Bkash", gateway: "Bkash", status: "successful", reconciliation: "reconciled", time: "1.2h", trend: [20, 32, 28, 45, 38, 52, 47, 58] },
    { id: "SET-002", date: "2026-06-22", outlet: "Renova Mirpur", doctor: "Dr. M. Hasan", amount: "৳38,500", method: "Card", gateway: "SSLCommerz", status: "successful", reconciliation: "reconciled", time: "1.8h", trend: [15, 22, 19, 31, 28, 38, 34, 42] },
    { id: "SET-003", date: "2026-06-22", outlet: "Renova Chattogram", doctor: "Dr. F. Ahmed", amount: "৳22,800", method: "Cash", gateway: "N/A", status: "pending", reconciliation: "pending", time: "4.2h", trend: [12, 18, 15, 24, 21, 30, 27, 35] },
    { id: "SET-004", date: "2026-06-21", outlet: "Renova Sylhet", doctor: "Dr. N. Islam", amount: "৳18,200", method: "Nagad", gateway: "Nagad", status: "failed", reconciliation: "unreconciled", time: "8.6h", trend: [10, 14, 12, 18, 16, 22, 19, 24] },
    { id: "SET-005", date: "2026-06-21", outlet: "Renova Uttara", doctor: "Dr. R. Khan", amount: "৳12,400", method: "Bkash", gateway: "Bkash", status: "processing", reconciliation: "pending", time: "3.4h", trend: [18, 16, 20, 15, 18, 14, 17, 13] },
    { id: "SET-006", date: "2026-06-21", outlet: "Renova Dhanmondi", doctor: "Dr. S. Rahman", amount: "৳52,800", method: "Card", gateway: "SSLCommerz", status: "successful", reconciliation: "reconciled", time: "0.9h", trend: [25, 35, 30, 48, 42, 55, 50, 62] },
    { id: "SET-007", date: "2026-06-20", outlet: "Renova Mirpur", doctor: "Dr. M. Hasan", amount: "৳28,600", method: "Cash", gateway: "N/A", status: "successful", reconciliation: "reconciled", time: "2.1h", trend: [18, 24, 20, 28, 25, 35, 30, 40] },
    { id: "SET-008", date: "2026-06-20", outlet: "Renova Chattogram", doctor: "Dr. F. Ahmed", amount: "৳15,800", method: "Rocket", gateway: "Rocket", status: "pending", reconciliation: "pending", time: "5.6h", trend: [14, 16, 18, 22, 20, 28, 25, 32] },
    { id: "SET-009", date: "2026-06-20", outlet: "Renova Sylhet", doctor: "Dr. N. Islam", amount: "৳9,200", method: "Bkash", gateway: "Bkash", status: "failed", reconciliation: "unreconciled", time: "12.4h", trend: [8, 12, 10, 14, 12, 18, 15, 20] },
    { id: "SET-010", date: "2026-06-19", outlet: "Renova Uttara", doctor: "Dr. R. Khan", amount: "৳8,400", method: "Card", gateway: "SSLCommerz", status: "successful", reconciliation: "reconciled", time: "1.6h", trend: [12, 14, 16, 18, 20, 22, 24, 26] },
    { id: "SET-011", date: "2026-06-19", outlet: "Renova Dhanmondi", doctor: "Dr. S. Rahman", amount: "৳42,200", method: "Bkash", gateway: "Bkash", status: "successful", reconciliation: "reconciled", time: "1.4h", trend: [22, 28, 24, 38, 32, 45, 40, 50] },
    { id: "SET-012", date: "2026-06-19", outlet: "Renova Mirpur", doctor: "Dr. M. Hasan", amount: "৳32,400", method: "Nagad", gateway: "Nagad", status: "processing", reconciliation: "pending", time: "2.8h", trend: [16, 20, 18, 26, 22, 32, 28, 38] },
];

const statusConfig = {
    successful: { bg: "#dcfce7", color: "#16a34a", label: "Successful" },
    pending: { bg: "#fef3c7", color: "#d97706", label: "Pending" },
    processing: { bg: "#cffafe", color: "#0891b2", label: "Processing" },
    failed: { bg: "#fee2e2", color: "#ef4444", label: "Failed" },
    cancelled: { bg: "#f1f5f9", color: "#64748b", label: "Cancelled" },
    on_hold: { bg: "#fef3c7", color: "#d97706", label: "On Hold" },
    reversed: { bg: "#fef3c7", color: "#d97706", label: "Reversed" },
    refunded: { bg: "#f1f5f9", color: "#64748b", label: "Refunded" },
};

const reconciliationConfig = {
    reconciled: { bg: "#dcfce7", color: "#16a34a", label: "Reconciled" },
    pending: { bg: "#fef3c7", color: "#d97706", label: "Pending" },
    unreconciled: { bg: "#fee2e2", color: "#ef4444", label: "Unreconciled" },
    discrepancy: { bg: "#fee2e2", color: "#ef4444", label: "Discrepancy" },
};

// ─── Helpers ─────────────────────────────────────────────────────
const getScoreColor = (s) => s >= 90 ? "#16a34a" : s >= 80 ? "#014fa1" : s >= 70 ? "#f59e0b" : "#ef4444";
const getScoreBg = (s) => s >= 90 ? "#dcfce7" : s >= 80 ? "#dbeafe" : s >= 70 ? "#fef3c7" : "#fee2e2";

const StatusBadge = ({ status }) => {
    const c = statusConfig[status] || statusConfig.pending;
    return (
        <span className="sa-status-badge" style={{ background: c.bg, color: c.color }}>
            <span className="sa-status-dot" style={{ background: c.color }} />
            {c.label}
        </span>
    );
};

const ReconciliationBadge = ({ status }) => {
    const c = reconciliationConfig[status] || reconciliationConfig.pending;
    return (
        <span className="sa-recon-badge" style={{ background: c.bg, color: c.color }}>
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
    <div className="sa-section-title">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="sa-title-icon" style={{ background: iconBg, color: iconColor }}>
                <Icon size={16} />
            </div>
            <div>
                <h2 className="sa-title-text">{title}</h2>
                {subtitle && <p className="sa-title-sub">{subtitle}</p>}
            </div>
        </div>
        {action && <div className="sa-title-action">{action}</div>}
    </div>
);

const KPICard = ({ label, value, change, trend, sub, icon: Icon, color, bg }) => (
    <motion.div className="sa-kpi-card" variants={itemVariants} whileHover={{ y: -3, boxShadow: "0 10px 32px rgba(4,65,125,0.13)" }}>
        <div className="sa-kpi-top">
            <div className="sa-kpi-icon" style={{ background: bg }}>
                <Icon size={17} color={color} />
            </div>
            <div className={`sa-kpi-badge ${trend === "up" ? "sa-kpi-badge--up" : "sa-kpi-badge--down"}`}>
                {trend === "up" ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                {change}
            </div>
        </div>
        <div className="sa-kpi-value">{value}</div>
        <div className="sa-kpi-label">{label}</div>
        <div className="sa-kpi-sub">{sub}</div>
        <div className="sa-kpi-spark">
            <MiniSparkline color={color} />
        </div>
    </motion.div>
);

const MiniSparkline = ({ color }) => {
    const pts = "0,22 12,18 24,20 36,12 48,15 60,8 72,11 84,4";
    return (
        <svg viewBox="0 0 84 28" width="84" height="28" style={{ display: "block" }}>
            <defs>
                <linearGradient id={`sasg-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.18" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon fill={`url(#sasg-${color.replace("#", "")})`} points={`0,22 12,18 24,20 36,12 48,15 60,8 72,11 84,4 84,28 0,28`} />
            <polyline fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" points={pts} />
        </svg>
    );
};

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

const ProgressBar = ({ value, color, height = 6, showLabel = false }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {showLabel && <span style={{ fontSize: 11, fontWeight: 700, color: "#1e293b", minWidth: 32 }}>{value}%</span>}
        <div style={{ flex: 1, height, background: "#f1f5f9", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${value}%`, background: color, borderRadius: 99, transition: "width 0.8s ease" }} />
        </div>
        {!showLabel && <span style={{ fontSize: 10, fontWeight: 700, color: "#64748b", minWidth: 28 }}>{value}%</span>}
    </div>
);

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

const SkeletonKPI = () => (
    <div className="sa-kpi-card sa-skeleton-card">
        <div className="sa-sk sa-sk--icon" />
        <div className="sa-sk sa-sk--val" />
        <div className="sa-sk sa-sk--lbl" />
        <div className="sa-sk sa-sk--spark" />
    </div>
);

// ─── Main Page ───────────────────────────────────────────────────
export default function SettlementAnalyticsPage() {
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortCol, setSortCol] = useState(null);
    const [sortDir, setSortDir] = useState("asc");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterRecon, setFilterRecon] = useState("all");
    const [filterOpen, setFilterOpen] = useState(false);
    const [outletFilter, setOutletFilter] = useState("All Outlets");
    const [dateRange, setDateRange] = useState({ start: "", end: "" });
    const rowsPerPage = 10;

    const [visibleCols, setVisibleCols] = useState({
        id: true, date: true, outlet: true, doctor: true, amount: true,
        method: true, gateway: true, status: true, reconciliation: true,
        time: true, trend: true, actions: true
    });

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 1400);
        return () => clearTimeout(t);
    }, []);

    const filtered = settlementData.filter(s => {
        const matchSearch = s.id.toLowerCase().includes(search.toLowerCase()) ||
            s.outlet.toLowerCase().includes(search.toLowerCase()) ||
            s.doctor.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === "all" || s.status === filterStatus;
        const matchRecon = filterRecon === "all" || s.reconciliation === filterRecon;
        const matchOutlet = outletFilter === "All Outlets" || s.outlet === outletFilter;
        return matchSearch && matchStatus && matchRecon && matchOutlet;
    });

    const sorted = sortCol
        ? [...filtered].sort((a, b) => {
            const av = a[sortCol]; const bv = b[sortCol];
            if (typeof av === "number") return sortDir === "asc" ? av - bv : bv - av;
            if (sortCol === "amount") {
                const clean = (v) => parseFloat(v.replace(/[^0-9.]/g, ""));
                return sortDir === "asc" ? clean(av) - clean(bv) : clean(bv) - clean(av);
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
        <span className="sa-sort-icon">
            {sortCol === col ? (sortDir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />) : <ChevronDown size={12} style={{ opacity: 0.3 }} />}
        </span>
    );

    // Get unique outlets for filter dropdown
    const uniqueOutlets = [...new Set(settlementData.map(s => s.outlet))];

    return (
        <motion.div className="sa-page" initial="hidden" animate="visible" variants={containerVariants}>

            {/* ── Page Header ────────────────────────────── */}
            <motion.div className="sa-header" variants={itemVariants}>
                <div className="sa-header-left">
                    <div className="sa-live-badge">
                        <span className="sa-live-dot" />
                        <span>Live</span>
                    </div>
                    <h1 className="sa-page-title">Settlement Analytics</h1>
                    <p className="sa-page-sub">Last updated 2 minutes ago · Real-time settlement monitoring</p>
                </div>
                <div className="sa-header-actions">
                    <select className="sa-ctrl-select" title="Select Outlet" value={outletFilter} onChange={e => setOutletFilter(e.target.value)}>
                        <option>All Outlets</option>
                        {uniqueOutlets.map(o => <option key={o}>{o}</option>)}
                    </select>
                    <input type="date" className="sa-ctrl-input" title="Start Date" value={dateRange.start} onChange={e => setDateRange({ ...dateRange, start: e.target.value })} />
                    <input type="date" className="sa-ctrl-input" title="End Date" value={dateRange.end} onChange={e => setDateRange({ ...dateRange, end: e.target.value })} />
                    <select className="sa-ctrl-select" title="Compare Period">
                        <option>vs Previous Period</option>
                        <option>vs Same Period Last Year</option>
                    </select>
                    <button className="sa-btn-ghost" title="Refresh"><RefreshCw size={14} /></button>
                    <button className="sa-btn-ghost" title="Download Excel"><Download size={14} /> <span>Excel</span></button>
                    <button className="sa-btn-ghost" title="Download PDF"><FileText size={14} /> <span>PDF</span></button>
                    <button className="sa-btn-primary" title="Share Report"><Share2 size={14} /> Share</button>
                </div>
            </motion.div>

            {/* ── Smart Filters ───────────────────────────── */}
            <motion.div className="sa-filters" variants={itemVariants}>
                <div className="sa-filter-search">
                    <Search size={14} color="#94a3b8" />
                    <input type="text" placeholder="Search by ID, outlet, or doctor…" value={search} onChange={e => setSearch(e.target.value)} />
                    {search && <button onClick={() => setSearch("")}><X size={12} /></button>}
                </div>
                <select className="sa-ctrl-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                    <option value="all">All Status</option>
                    <option value="successful">Successful</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="failed">Failed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="on_hold">On Hold</option>
                    <option value="reversed">Reversed</option>
                    <option value="refunded">Refunded</option>
                </select>
                <select className="sa-ctrl-select" value={filterRecon} onChange={e => setFilterRecon(e.target.value)}>
                    <option value="all">All Reconciliation</option>
                    <option value="reconciled">Reconciled</option>
                    <option value="pending">Pending</option>
                    <option value="unreconciled">Unreconciled</option>
                    <option value="discrepancy">Discrepancy</option>
                </select>
                <select className="sa-ctrl-select" title="Payment Method">
                    <option>All Methods</option>
                    <option>Bkash</option>
                    <option>Rocket</option>
                    <option>Nagad</option>
                    <option>Card</option>
                    <option>Cash</option>
                    <option>Insurance</option>
                </select>
                <select className="sa-ctrl-select" title="Payment Gateway">
                    <option>All Gateways</option>
                    <option>Bkash</option>
                    <option>Rocket</option>
                    <option>Nagad</option>
                    <option>SSLCommerz</option>
                    <option>Bank Transfer</option>
                </select>
                <div className="sa-filter-actions">
                    <button className="sa-btn-ghost" onClick={() => { setSearch(""); setFilterStatus("all"); setFilterRecon("all"); setOutletFilter("All Outlets"); }}>
                        <RotateCcw size={13} /> Reset
                    </button>
                    <button className="sa-btn-primary" style={{ padding: "7px 14px" }}>
                        <Save size={13} /> Save
                    </button>
                </div>
            </motion.div>

            {/* ── Executive KPI Cards ─────────────────────── */}
            <motion.section className="sa-section" variants={itemVariants}>
                <SectionTitle icon={Zap} iconBg="#fef3c7" iconColor="#d97706" title="Settlement KPIs" subtitle="Real-time settlement performance metrics" />
                <motion.div className="sa-kpi-grid" variants={containerVariants}>
                    {loading
                        ? Array(16).fill(0).map((_, i) => <SkeletonKPI key={i} />)
                        : kpiData.map((k, i) => <KPICard key={i} {...k} />)
                    }
                </motion.div>
            </motion.section>

            {/* ── Performance Score Gauges ─────────────────── */}
            <motion.section className="sa-section" variants={itemVariants}>
                <SectionTitle icon={Award} iconBg="#ede9fe" iconColor="#7c3aed" title="Settlement Health Score" subtitle="Composite health indicators per dimension" />
                <div className="sa-score-grid">
                    {scores.map((s, i) => (
                        <motion.div key={i} className="sa-score-card" variants={itemVariants}>
                            <GaugeChart value={s.value} color={s.color} size={110} />
                            <div className="sa-score-label">{s.label}</div>
                            <div className="sa-score-tag" style={{ background: getScoreBg(s.value), color: getScoreColor(s.value) }}>
                                {s.value >= 90 ? "Excellent" : s.value >= 80 ? "Good" : s.value >= 70 ? "Fair" : "Needs Attention"}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* ── AI Insights + Alerts ─────────────────────── */}
            <motion.section className="sa-section" variants={itemVariants}>
                <div className="sa-two-col">
                    <motion.div className="sa-card" variants={itemVariants}>
                        <SectionTitle icon={Brain} iconBg="#ede9fe" iconColor="#7c3aed" title="AI Settlement Insights" />
                        <div className="sa-insights-list">
                            {insights.map((ins, i) => (
                                <div key={i} className={`sa-insight-item sa-insight--${ins.type}`}>
                                    <div className="sa-insight-icon"><InsightIcon type={ins.type} /></div>
                                    <div>
                                        <div className="sa-insight-title">{ins.title}</div>
                                        <div className="sa-insight-text">{ins.text}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="sa-card" variants={itemVariants}>
                        <SectionTitle icon={Bell} iconBg="#fee2e2" iconColor="#ef4444" title="Critical Alerts"
                            action={<span className="sa-alert-count">{alerts.filter(a => a.type === "error").length} Critical</span>} />
                        <div className="sa-alerts-list">
                            {alerts.map((a, i) => (
                                <div key={i} className={`sa-alert-item sa-insight--${a.type}`}>
                                    <div className="sa-insight-icon"><AlertTriangle size={15} /></div>
                                    <div style={{ flex: 1 }}>
                                        <div className="sa-alert-header">
                                            <span className="sa-insight-title">{a.title}</span>
                                            <span className="sa-alert-time">{a.time}</span>
                                        </div>
                                        <div className="sa-insight-text">{a.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Settlement Trend Analytics ───────────────── */}
            <motion.section className="sa-section" variants={itemVariants}>
                <SectionTitle icon={BarChart3} iconBg="#dbeafe" iconColor="#014fa1" title="Settlement Trends" subtitle="Daily, weekly, and monthly settlement patterns" />
                <div className="sa-two-col">
                    <motion.div className="sa-card" variants={itemVariants}>
                        <h3 className="sa-card-subtitle">Monthly Settlement Trend</h3>
                        <div className="sa-stacked-chart">
                            {settlementTrend.map((d, i) => {
                                const total = d.successful + d.pending + d.failed + d.processing;
                                return (
                                    <div key={i} className="sa-stacked-group">
                                        <div className="sa-stacked-bar-wrap">
                                            <div className="sa-stacked-bar-total">৳{total}M</div>
                                            <div className="sa-stacked-bar">
                                                <div style={{ height: `${(d.successful / 45) * 100}%`, background: "#16a34a" }} title={`Successful: ৳${d.successful}M`} />
                                                <div style={{ height: `${(d.pending / 45) * 100}%`, background: "#f59e0b" }} title={`Pending: ৳${d.pending}M`} />
                                                <div style={{ height: `${(d.failed / 45) * 100}%`, background: "#ef4444" }} title={`Failed: ৳${d.failed}M`} />
                                                <div style={{ height: `${(d.processing / 45) * 100}%`, background: "#0891b2" }} title={`Processing: ৳${d.processing}M`} />
                                            </div>
                                        </div>
                                        <div className="sa-bar-label">{d.label}</div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="sa-chart-legend">
                            <span className="sa-legend-dot" style={{ background: "#16a34a" }} /> Successful
                            <span className="sa-legend-dot" style={{ background: "#f59e0b", marginLeft: 14 }} /> Pending
                            <span className="sa-legend-dot" style={{ background: "#ef4444", marginLeft: 14 }} /> Failed
                            <span className="sa-legend-dot" style={{ background: "#0891b2", marginLeft: 14 }} /> Processing
                        </div>
                    </motion.div>

                    <motion.div className="sa-card" variants={itemVariants}>
                        <h3 className="sa-card-subtitle">Weekly Payout Processing</h3>
                        <div className="sa-bar-chart">
                            {payoutData.map((d, i) => {
                                const total = d.completed + d.pending + d.failed + d.processing;
                                return (
                                    <div key={i} className="sa-bar-group">
                                        <div className="sa-bars">
                                            <div className="sa-bar-wrap">
                                                <div className="sa-bar sa-bar--completed" style={{ height: `${(d.completed / 450) * 100}%` }} title={`Completed: ${d.completed}`} />
                                                <div className="sa-bar sa-bar--pending" style={{ height: `${(d.pending / 450) * 100}%` }} title={`Pending: ${d.pending}`} />
                                                <div className="sa-bar sa-bar--failed" style={{ height: `${(d.failed / 450) * 100}%` }} title={`Failed: ${d.failed}`} />
                                                <div className="sa-bar sa-bar--processing" style={{ height: `${(d.processing / 450) * 100}%` }} title={`Processing: ${d.processing}`} />
                                            </div>
                                            <div className="sa-bar-val">{total}</div>
                                        </div>
                                        <div className="sa-bar-label">{d.label}</div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="sa-chart-legend">
                            <span className="sa-legend-dot" style={{ background: "#16a34a" }} /> Completed
                            <span className="sa-legend-dot" style={{ background: "#f59e0b", marginLeft: 14 }} /> Pending
                            <span className="sa-legend-dot" style={{ background: "#ef4444", marginLeft: 14 }} /> Failed
                            <span className="sa-legend-dot" style={{ background: "#0891b2", marginLeft: 14 }} /> Processing
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Settlement by Outlet & Payment Method ─────── */}
            <motion.section className="sa-section" variants={itemVariants}>
                <div className="sa-two-col">
                    <motion.div className="sa-card" variants={itemVariants}>
                        <SectionTitle icon={Building2} iconBg="#dbeafe" iconColor="#014fa1" title="Settlement by Outlet" subtitle="Volume and success rate by outlet" />
                        <div className="sa-outlet-list">
                            {settlementByOutlet.map((o, i) => (
                                <div key={i} className="sa-outlet-item">
                                    <div className="sa-outlet-meta">
                                        <span className="sa-outlet-name">{o.name}</span>
                                        <div style={{ textAlign: "right" }}>
                                            <div className="sa-outlet-val">{o.value}</div>
                                            <div style={{ fontSize: 10, color: "#94a3b8" }}>{o.settlements.toLocaleString()} settlements</div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <span style={{ fontSize: 11, fontWeight: 700, color: o.success >= 90 ? "#16a34a" : "#f59e0b", minWidth: 36 }}>{o.success}%</span>
                                        <ProgressBar value={o.success} color={o.color} height={8} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="sa-card" variants={itemVariants}>
                        <SectionTitle icon={Wallet} iconBg="#fef3c7" iconColor="#d97706" title="Settlement by Payment Method" subtitle="Volume and success rate by method" />
                        <div className="sa-donut-row">
                            <svg viewBox="0 0 100 100" width={130} height={130}>
                                {settlementByPaymentMethod.reduce((acc, pm, i) => {
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
                                <text x="50" y="46" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1e293b">৳42.8M</text>
                                <text x="50" y="58" textAnchor="middle" fontSize="7" fill="#64748b">Total</text>
                            </svg>
                            <div className="sa-donut-legend">
                                {settlementByPaymentMethod.map((pm, i) => (
                                    <div key={i} className="sa-donut-item">
                                        <span className="sa-legend-dot" style={{ background: pm.color }} />
                                        <span className="sa-donut-label">{pm.name}</span>
                                        <span className="sa-donut-val">{pm.percent}%</span>
                                        <span className="sa-donut-success" style={{ color: pm.success >= 90 ? "#16a34a" : "#f59e0b" }}>{pm.success}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Payment Gateway Analytics ─────────────────── */}
            <motion.section className="sa-section" variants={itemVariants}>
                <SectionTitle icon={Landmark} iconBg="#cffafe" iconColor="#0891b2" title="Payment Gateway Analytics" subtitle="Performance and reliability by gateway" />
                <div className="sa-two-col">
                    <motion.div className="sa-card" variants={itemVariants}>
                        <h3 className="sa-card-subtitle">Gateway Performance</h3>
                        <div className="sa-gateway-list">
                            {settlementByGateway.map((g, i) => (
                                <div key={i} className="sa-gateway-item">
                                    <div className="sa-gateway-meta">
                                        <span className="sa-gateway-name">{g.name}</span>
                                        <span className="sa-gateway-val">{g.value}</span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <ProgressBar value={g.percent} color={g.color} height={6} />
                                        <span className="sa-gateway-success" style={{ color: g.success >= 92 ? "#16a34a" : g.success >= 85 ? "#f59e0b" : "#ef4444" }}>
                                            {g.success}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div className="sa-card" variants={itemVariants}>
                        <h3 className="sa-card-subtitle">Reconciliation Status</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 8 }}>
                            <div className="sa-recon-pie">
                                <svg viewBox="0 0 100 100" width={120} height={120}>
                                    {reconciliationData.reduce((acc, item, i) => {
                                        const offset = acc.offset;
                                        const dash = item.value * 2.827;
                                        const gap = 251.2;
                                        acc.elements.push(
                                            <circle key={i} cx="50" cy="50" r="40" fill="none" stroke={item.color} strokeWidth="18"
                                                strokeDasharray={`${dash} ${gap}`} strokeDashoffset={-offset}
                                                style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }} />
                                        );
                                        acc.offset += dash;
                                        return acc;
                                    }, { offset: 0, elements: [] }).elements}
                                    <text x="50" y="48" textAnchor="middle" fontSize="12" fontWeight="800" fill="#1e293b">98.2%</text>
                                    <text x="50" y="60" textAnchor="middle" fontSize="7" fill="#64748b">Reconciled</text>
                                </svg>
                                <div className="sa-recon-legend">
                                    {reconciliationData.map((item, i) => (
                                        <div key={i} className="sa-recon-item">
                                            <span className="sa-legend-dot" style={{ background: item.color }} />
                                            <span className="sa-recon-label">{item.label}</span>
                                            <span className="sa-recon-val">{item.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Financial Liability Analytics ────────────── */}
            <motion.section className="sa-section" variants={itemVariants}>
                <SectionTitle icon={PiggyBank} iconBg="#ffedd5" iconColor="#ea580c" title="Financial Liability Analytics" subtitle="Outstanding settlements and cash flow impact" />
                <div className="sa-two-col">
                    <motion.div className="sa-card" variants={itemVariants}>
                        <h3 className="sa-card-subtitle">Liability Trend (৳M)</h3>
                        <div className="sa-liability-chart">
                            {liabilityTrend.map((d, i) => {
                                const total = d.pending + d.overdue + d.current;
                                return (
                                    <div key={i} className="sa-liability-group">
                                        <div className="sa-liability-bars">
                                            <div className="sa-liability-bar sa-liability--pending" style={{ height: `${(d.pending / 5) * 100}%` }} title={`Pending: ৳${d.pending}M`} />
                                            <div className="sa-liability-bar sa-liability--overdue" style={{ height: `${(d.overdue / 5) * 100}%` }} title={`Overdue: ৳${d.overdue}M`} />
                                            <div className="sa-liability-bar sa-liability--current" style={{ height: `${(d.current / 5) * 100}%` }} title={`Current: ৳${d.current}M`} />
                                        </div>
                                        <div className="sa-bar-label">{d.label}</div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="sa-chart-legend">
                            <span className="sa-legend-dot" style={{ background: "#f59e0b" }} /> Pending
                            <span className="sa-legend-dot" style={{ background: "#ef4444", marginLeft: 14 }} /> Overdue
                            <span className="sa-legend-dot" style={{ background: "#0891b2", marginLeft: 14 }} /> Current
                        </div>
                    </motion.div>

                    <motion.div className="sa-card" variants={itemVariants}>
                        <h3 className="sa-card-subtitle">Liability Summary</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
                            {[
                                { label: "Total Outstanding", value: "৳3.6M", sub: "6.2% of monthly revenue", color: "#ea580c", icon: PiggyBank },
                                { label: "Pending Settlements", value: "৳2.4M", sub: "5.6% success rate", color: "#f59e0b", icon: Hourglass },
                                { label: "Overdue Settlements", value: "৳0.8M", sub: "22% of pending", color: "#ef4444", icon: AlertTriangle },
                                { label: "Current Liabilities", value: "৳1.2M", sub: "33% of total", color: "#0891b2", icon: Clock },
                                { label: "Cash Flow Impact", value: "-৳1.8M", sub: "8.4% of revenue", color: "#ef4444", icon: TrendingDown },
                            ].map((m, i) => (
                                <div key={i} className="sa-liability-row">
                                    <div className="sa-metric-icon" style={{ background: `${m.color}18`, color: m.color }}>
                                        <m.icon size={14} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div className="sa-metric-label">{m.label}</div>
                                        <div style={{ fontSize: 10, color: "#94a3b8" }}>{m.sub}</div>
                                    </div>
                                    <div className="sa-metric-val" style={{ color: m.color }}>{m.value}</div>
                                </div>
                            ))}
                        </div>
                        <div className="sa-liability-tip">
                            <Info size={13} color="#ea580c" />
                            <span>Outstanding liability exceeds recommended threshold of 5% of monthly revenue.</span>
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ── Settlement Comparison ────────────────────── */}
            <motion.section className="sa-section" variants={itemVariants}>
                <SectionTitle icon={Scale} iconBg="#ede9fe" iconColor="#7c3aed" title="Settlement Comparison" subtitle="Key metrics side-by-side across outlets" />
                <motion.div className="sa-card" variants={itemVariants}>
                    <div className="sa-comp-wrapper">
                        <table className="sa-comp-table">
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
                                        <td className="sa-comp-best">{row.dhanmondi}</td>
                                        <td>{row.mirpur}</td>
                                        <td className={row.uttara.startsWith("-") ? "sa-comp-bad" : ""}>{row.uttara}</td>
                                        <td style={{ color: "#64748b" }}>{row.avg}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </motion.section>

            {/* ── Settlement Analytics Table ────────────────── */}
            <motion.section className="sa-section" variants={itemVariants}>
                <SectionTitle icon={ReceiptText} iconBg="#dcfce7" iconColor="#16a34a"
                    title={`Settlement Transactions (${filtered.length})`}
                    subtitle="Detailed settlement records with sorting and filtering"
                    action={
                        <div style={{ display: "flex", gap: 8 }}>
                            <button className="sa-btn-ghost"><SlidersHorizontal size={13} /> Columns</button>
                            <button className="sa-btn-ghost"><Download size={13} /> Export</button>
                            <button className="sa-btn-primary"><FileText size={13} /> PDF</button>
                        </div>
                    }
                />

                <motion.div className="sa-card sa-table-card" variants={itemVariants}>
                    <div className="sa-table-wrapper">
                        <table className="sa-perf-table">
                            <thead>
                                <tr>
                                    <th onClick={() => handleSort("id")} className="sa-sortable">Settlement ID <SortIcon col="id" /></th>
                                    {visibleCols.date && <th onClick={() => handleSort("date")} className="sa-sortable">Date <SortIcon col="date" /></th>}
                                    {visibleCols.outlet && <th>Outlet</th>}
                                    {visibleCols.doctor && <th>Doctor</th>}
                                    {visibleCols.amount && <th onClick={() => handleSort("amount")} className="sa-sortable">Amount <SortIcon col="amount" /></th>}
                                    {visibleCols.method && <th>Method</th>}
                                    {visibleCols.gateway && <th>Gateway</th>}
                                    {visibleCols.status && <th>Status</th>}
                                    {visibleCols.reconciliation && <th>Reconciliation</th>}
                                    {visibleCols.time && <th onClick={() => handleSort("time")} className="sa-sortable">Processing Time <SortIcon col="time" /></th>}
                                    {visibleCols.trend && <th>Trend</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.length === 0 ? (
                                    <tr><td colSpan={12} className="sa-empty-state">
                                        <Search size={32} color="#cbd5e1" />
                                        <div>No settlements match your search.</div>
                                        <button className="sa-btn-ghost" onClick={() => { setSearch(""); setFilterStatus("all"); setFilterRecon("all"); setOutletFilter("All Outlets"); }}>Clear Filters</button>
                                    </td></tr>
                                ) : paginated.map((s) => (
                                    <tr key={s.id} className="sa-table-row">
                                        <td>
                                            <div className="sa-settlement-cell">
                                                <span className="sa-settlement-id">{s.id}</span>
                                            </div>
                                        </td>
                                        {visibleCols.date && <td>{s.date}</td>}
                                        {visibleCols.outlet && <td>{s.outlet}</td>}
                                        {visibleCols.doctor && <td>{s.doctor}</td>}
                                        {visibleCols.amount && <td><strong style={{ color: "#1e293b" }}>{s.amount}</strong></td>}
                                        {visibleCols.method && <td>{s.method}</td>}
                                        {visibleCols.gateway && <td>{s.gateway}</td>}
                                        {visibleCols.status && <td><StatusBadge status={s.status} /></td>}
                                        {visibleCols.reconciliation && <td><ReconciliationBadge status={s.reconciliation} /></td>}
                                        {visibleCols.time && <td>{s.time}</td>}
                                        {visibleCols.trend && (
                                            <td>
                                                <Sparkline data={s.trend} color={s.status === "successful" ? "#16a34a" : s.status === "failed" ? "#ef4444" : "#f59e0b"} />
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="sa-pagination">
                        <span className="sa-pagination-info">
                            Showing {Math.min((currentPage - 1) * rowsPerPage + 1, sorted.length)}–{Math.min(currentPage * rowsPerPage, sorted.length)} of {sorted.length} settlements
                        </span>
                        <div className="sa-pagination-controls">
                            <button className="sa-page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                                <ChevronLeft size={14} />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button key={i} className={`sa-page-btn ${currentPage === i + 1 ? "sa-page-btn--active" : ""}`}
                                    onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                            ))}
                            <button className="sa-page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.section>

        </motion.div>
    );
}