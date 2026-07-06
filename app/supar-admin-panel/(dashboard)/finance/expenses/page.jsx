// app/super-admin/finance/expenses/page.jsx
"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import "./expense-management.css";
import AddExpenseModal from "./components/AddExpenseModal";
import AddCategoryModal from "./components/AddCategoryModal";
import AddVendorModal from "./components/AddVendorModal";
import ExpenseDetailsModal from "./components/ExpenseDetailsModal";
import DocumentViewerModal from "./components/DocumentViewerModal";
import VendorDetailsModal from "./components/VendorDetailsModal";
import AllExpensesModal from "./components/AllExpensesModal";
import PrintableReport from "./components/PrintableReport";
import { exportOverviewToPDF, exportExpensesToExcel } from "./utils/exportUtils";
import {
    DollarSign, Calendar, TrendingUp, TrendingDown, CreditCard, Building2,
    Activity, Users, CheckCircle, AlertTriangle, Info, XCircle,
    Download, FileText, Share2, RefreshCw, BarChart3, Search,
    Filter, ChevronDown, MapPin, Clock, ArrowUpRight, ArrowDownRight,
    Target, Zap, RotateCcw, Percent, AlertCircle, ChevronUp, ChevronLeft,
    ChevronRight, SlidersHorizontal, Save, Plus, Edit, Trash2, Copy,
    Upload, FileCheck, Shield, Lock, Archive, Undo2, Briefcase,
    Microscope, Heart, Brain, Syringe, Ambulance, Home, UserCog,
    Receipt, BookOpen, Globe, Server, Megaphone, Wrench, Settings,
    Package, Layers, Award, Star, X, MoreHorizontal, Eye, Mail, Phone,
    Truck, Send, TrendingUpIcon
} from "lucide-react";

// ─── Custom SVG Icons ──────────────────────────────────────────
const WalletIcon = ({ size = 16, color = "currentColor" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
        <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
);

const CheckSquareIcon = ({ size = 16, color = "currentColor" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
);

// ─── Animation Variants ─────────────────────────────────────────
const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const stagger = {
    visible: { transition: { staggerChildren: 0.04 } }
};

// ─── Mock Data ──────────────────────────────────────────────────
const kpiMetrics = [
    { label: "Today's Expenses", value: "৳142,500", trend: "+5.2%", up: true, icon: Calendar, variant: "primary" },
    { label: "Weekly Expenses", value: "৳985,000", trend: "+2.1%", up: true, icon: Clock, variant: "secondary" },
    { label: "Monthly Expenses", value: "৳4.2M", trend: "-1.4%", up: false, icon: Calendar, variant: "tertiary" },
    { label: "Yearly Expenses", value: "৳48.5M", trend: "+12.8%", up: true, icon: TrendingUp, variant: "quaternary" },
    { label: "Total Expenses", value: "৳48.5M", trend: "+12.8%", up: true, icon: DollarSign, variant: "quinary" },
    { label: "Pending Approval", value: "24", trend: "+4", up: true, icon: AlertCircle, variant: "senary" },
    { label: "Approved Expenses", value: "1,240", trend: "+120", up: true, icon: CheckCircle, variant: "septenary" },
    { label: "Rejected Expenses", value: "18", trend: "-2", up: false, icon: XCircle, variant: "octonary" },
    { label: "Cash Expense", value: "৳12.5M", trend: "+2%", up: true, icon: CreditCard, variant: "nonary" },
    { label: "Bank Expense", value: "৳28.4M", trend: "+8%", up: true, icon: Building2, variant: "denary" },
    { label: "Online Payment", value: "৳7.6M", trend: "+15%", up: true, icon: Globe, variant: "primary" },
    { label: "Staff Salary", value: "৳18.5M", trend: "+0%", up: true, icon: Users, variant: "tertiary" },
    { label: "Doctor Payments", value: "৳12.4M", trend: "+5%", up: true, icon: UserCog, variant: "quaternary" },
    { label: "Marketing Exp", value: "৳3.2M", trend: "+18%", up: true, icon: Megaphone, variant: "quinary" },
    { label: "Utility Expense", value: "৳1.8M", trend: "+1%", up: true, icon: Zap, variant: "senary" },
    { label: "Equipment Exp", value: "৳4.5M", trend: "+12%", up: true, icon: Settings, variant: "septenary" },
    { label: "Maintenance Exp", value: "৳1.2M", trend: "-5%", up: false, icon: Wrench, variant: "octonary" },
    { label: "Medicine Purchase", value: "৳8.4M", trend: "+8%", up: true, icon: Package, variant: "nonary" },
    { label: "Medical Consumables", value: "৳3.1M", trend: "+4%", up: true, icon: Syringe, variant: "denary" },
    { label: "Inventory Cost", value: "৳5.2M", trend: "+2%", up: true, icon: Layers, variant: "primary" },
    { label: "Sample Collection", value: "৳1.5M", trend: "+10%", up: true, icon: Microscope, variant: "secondary" },
    { label: "Courier Cost", value: "৳0.6M", trend: "+3%", up: true, icon: Send, variant: "tertiary" },
    { label: "Transportation Cost", value: "৳1.1M", trend: "-1%", up: false, icon: Truck, variant: "quaternary" },
    { label: "Others", value: "৳2.1M", trend: "+10%", up: true, icon: DollarSign, variant: "secondary" },
];

const initialExpenses = [
    { id: "EXP-1042", date: "2026-07-05", title: "Reagent Purchase - Q3", category: "Laboratory", sub: "Diagnostic Reagents", branch: "Dhanmondi", dept: "Pathology", vendor: "MedSupply Co.", method: "Bank Transfer", invoice: "INV-9921", amount: 145000, tax: 5, discount: 0, net: 152250, created: "Admin 1", approved: "Super Admin", status: "approved", attachment: 2, remarks: "Urgent restock",
        docs: [
            { name: "Invoice.pdf", url: "/images/docs/Invoice.pdf" },
            { name: "Invoice.jpg", url: "/images/docs/Invoice.jpg" },
        ] },
    { id: "EXP-1041", date: "2026-07-04", title: "Facebook Ads Campaign", category: "Marketing", sub: "Digital Marketing", branch: "Head Office", dept: "Marketing", vendor: "Meta Platforms", method: "Credit Card", invoice: "INV-8832", amount: 50000, tax: 0, discount: 0, net: 50000, created: "Manager 2", approved: "-", status: "pending", attachment: 1, remarks: "July campaign",
        docs: [
            { name: "Invoice.jpg", url: "/images/docs/Invoice.jpg" },
        ] },
    { id: "EXP-1040", date: "2026-07-03", title: "Ambulance Fuel", category: "Transportation", sub: "Fuel", branch: "Uttara", dept: "Administration", vendor: "Padma Oil", method: "Cash", invoice: "INV-7712", amount: 12000, tax: 0, discount: 0, net: 12000, created: "Staff 4", approved: "Admin 1", status: "approved", attachment: 1, remarks: "Monthly fuel",
        docs: [
            { name: "Prescription.jpg", url: "/images/docs/Prescription.jpg" },
        ] },
    { id: "EXP-1039", date: "2026-07-02", title: "Cloud Hosting AWS", category: "IT", sub: "Cloud Hosting", branch: "Head Office", dept: "IT", vendor: "AWS", method: "Online Payment", invoice: "INV-6601", amount: 85000, tax: 0, discount: 5, net: 80750, created: "Admin 2", approved: "Super Admin", status: "approved", attachment: 1, remarks: "Monthly bill",
        docs: [
            { name: "Invoice.pdf", url: "/images/docs/Invoice.pdf" },
        ] },
    { id: "EXP-1038", date: "2026-07-01", title: "Office Rent - July", category: "Administrative", sub: "Office Rent", branch: "Mirpur", dept: "Accounts", vendor: "RealState BD", method: "Bank Transfer", invoice: "INV-5590", amount: 120000, tax: 0, discount: 0, net: 120000, created: "Admin 1", approved: "-", status: "rejected", attachment: 3, remarks: "Duplicate entry",
        docs: [
            { name: "Invoice.pdf", url: "/images/docs/Invoice.pdf" },
            { name: "Invoice.jpg", url: "/images/docs/Invoice.jpg" },
            { name: "Prescription.jpg", url: "/images/docs/Prescription.jpg" },
        ] },
    { id: "EXP-1037", date: "2026-07-05", title: "Reagent Purchase - Q3", category: "Laboratory", sub: "Diagnostic Reagents", branch: "Dhanmondi", dept: "Pathology", vendor: "MedSupply Co.", method: "Bank Transfer", invoice: "INV-9921", amount: 145000, tax: 5, discount: 0, net: 152250, created: "Admin 1", approved: "Super Admin", status: "approved", attachment: 2, remarks: "Urgent restock",
        docs: [
            { name: "Invoice.pdf", url: "/images/docs/Invoice.pdf" },
            { name: "Invoice.jpg", url: "/images/docs/Invoice.jpg" },
        ] },
    { id: "EXP-1036", date: "2026-07-04", title: "Facebook Ads Campaign", category: "Marketing", sub: "Digital Marketing", branch: "Head Office", dept: "Marketing", vendor: "Meta Platforms", method: "Credit Card", invoice: "INV-8832", amount: 50000, tax: 0, discount: 0, net: 50000, created: "Manager 2", approved: "-", status: "pending", attachment: 1, remarks: "July campaign",
        docs: [
            { name: "Invoice.jpg", url: "/images/docs/Invoice.jpg" },
        ] },
    { id: "EXP-1035", date: "2026-07-03", title: "Ambulance Fuel", category: "Transportation", sub: "Fuel", branch: "Uttara", dept: "Administration", vendor: "Padma Oil", method: "Cash", invoice: "INV-7712", amount: 12000, tax: 0, discount: 0, net: 12000, created: "Staff 4", approved: "Admin 1", status: "approved", attachment: 1, remarks: "Monthly fuel",
        docs: [
            { name: "Prescription.jpg", url: "/images/docs/Prescription.jpg" },
        ] },
    { id: "EXP-1034", date: "2026-07-02", title: "Cloud Hosting AWS", category: "IT", sub: "Cloud Hosting", branch: "Head Office", dept: "IT", vendor: "AWS", method: "Online Payment", invoice: "INV-6601", amount: 85000, tax: 0, discount: 5, net: 80750, created: "Admin 2", approved: "Super Admin", status: "approved", attachment: 1, remarks: "Monthly bill",
        docs: [
            { name: "Invoice.pdf", url: "/images/docs/Invoice.pdf" },
        ] },
    { id: "EXP-1033", date: "2026-07-01", title: "Office Rent - July", category: "Administrative", sub: "Office Rent", branch: "Mirpur", dept: "Accounts", vendor: "RealState BD", method: "Bank Transfer", invoice: "INV-5590", amount: 120000, tax: 0, discount: 0, net: 120000, created: "Admin 1", approved: "-", status: "rejected", attachment: 3, remarks: "Duplicate entry",
        docs: [
            { name: "Invoice.pdf", url: "/images/docs/Invoice.pdf" },
            { name: "Invoice.jpg", url: "/images/docs/Invoice.jpg" },
            { name: "Prescription.jpg", url: "/images/docs/Prescription.jpg" },
        ] },
    { id: "EXP-1032", date: "2026-07-02", title: "Cloud Hosting AWS", category: "IT", sub: "Cloud Hosting", branch: "Head Office", dept: "IT", vendor: "AWS", method: "Online Payment", invoice: "INV-6601", amount: 85000, tax: 0, discount: 5, net: 80750, created: "Admin 2", approved: "Super Admin", status: "approved", attachment: 1, remarks: "Monthly bill",
        docs: [
            { name: "Invoice.pdf", url: "/images/docs/Invoice.pdf" },
        ] },
];

const initialCategories = [
    "Staff Salary", "Consultant Fee", "Laboratory Equipment",
    "Medical Equipment", "Medical Consumables", "Diagnostic Reagents", "Medicine Purchase", "Sample Collection",
    "Courier", "Electricity", "Water", "Gas", "Internet", "Software Subscription", "Marketing", "Office Rent",
    "Vehicle", "Ambulance", "Insurance", "Repair", "Training", "Legal", "Miscellaneous"
];

const departments = [
    { name: "Laboratory", icon: Microscope, color: "#2563eb" },
    { name: "Radiology", icon: Activity, color: "#7c3aed" },
    { name: "Pathology", icon: Syringe, color: "#059669" },
    { name: "Telemedicine", icon: Heart, color: "#ec4899" },
    { name: "IT", icon: Server, color: "#0891b2" },
    { name: "Marketing", icon: Megaphone, color: "#ea580c" },
    { name: "Administration", icon: Briefcase, color: "#64748b" },
    { name: "Accounts", icon: BookOpen, color: "#d97706" },
];

const branches = [
    { name: "Dhanmondi", color: "#2563eb" },
    { name: "Uttara", color: "#059669" },
    { name: "Mirpur", color: "#7c3aed" },
    { name: "Chattogram", color: "#ea580c" },
];

const initialVendors = [
    { name: "MedSupply Co.", contact: "support@medsupply.com", phone: "+880 1711-000001", address: "Dhanmondi, Dhaka", category: "Laboratory", paymentTerms: "Net 30", paid: 1250000, outstanding: 145000,  status: "active",
        profileImage: "/images/vendor/01.jpg",
        docs: [
            { name: "trade-license.jpg", url: "/images/docs/trade-license.jpg" },
            { name: "Agreement.jpg", url: "/images/docs/Agreement.jpg" },
        ] },
    { name: "Meta Platforms", contact: "billing@meta.com", phone: "+1 650-543-4800", address: "Menlo Park, USA", category: "Digital Marketing", paymentTerms: "Immediate", paid: 450000, outstanding: 50000,  status: "active",
        profileImage: "/images/vendor/02.jpg",
        docs: [
            { name: "Agreement.jpg", url: "/images/docs/Agreement.jpg" },
        ] },
    { name: "AWS", contact: "aws@amazon.com", phone: "+1 206-266-1000", address: "Seattle, USA", category: "Cloud Hosting", paymentTerms: "Net 15", paid: 850000, outstanding: 0,  status: "active",
        profileImage: "/images/vendor/03.jpg",
        docs: [
            { name: "License.pdf", url: "/images/docs/License.pdf" },
        ] },
    { name: "Padma Oil", contact: "sales@padmaoil.com", phone: "+880 1911-000002", address: "Uttara, Dhaka", category: "Fuel Supply", paymentTerms: "Net 30", paid: 120000, outstanding: 12000,  status: "active",
        profileImage: "/images/vendor/04.jpg",
        docs: [
            { name: "trade-license.jpg", url: "/images/docs/trade-license.jpg" },
        ] },
    { name: "RealState BD", contact: "rent@realstate.com", phone: "+880 1811-000003", address: "Mirpur, Dhaka", category: "Property Rental", paymentTerms: "Net 60", paid: 1200000, outstanding: 120000,  status: "warning",
        profileImage: "/images/vendor/05.jpg",
        docs: [
            { name: "License.pdf", url: "/images/docs/License.pdf" },
            { name: "trade-license.jpg", url: "/images/docs/trade-license.jpg" },
            { name: "Agreement.jpg", url: "/images/docs/Agreement.jpg" },
        ] },
];

const approvals = [
    { id: "EXP-1041", title: "Facebook Ads Campaign", amount: 50000, requester: "Manager 2", date: "2h ago", status: "pending" },
    { id: "EXP-1045", title: "New MRI Machine Part", amount: 250000, requester: "Admin 3", date: "5h ago", status: "pending" },
    { id: "EXP-1039", title: "Cloud Hosting AWS", amount: 85000, requester: "Admin 2", date: "1d ago", status: "pending" },
    { id: "EXP-1038", title: "Office Rent - July", amount: 120000, requester: "Admin 1", date: "2d ago", status: "pending" },
];

const documents = [
    { name: "INV-9921.pdf", type: "Invoice", size: "2.4 MB", date: "Jul 05", status: "verified" },
    { name: "REC-8832.jpg", type: "Receipt", size: "1.1 MB", date: "Jul 04", status: "verified" },
    { name: "PO-7712.pdf", type: "Purchase Order", size: "3.2 MB", date: "Jul 03", status: "pending" },
    { name: "BILL-6601.pdf", type: "Bill", size: "850 KB", date: "Jul 02", status: "verified" },
];

const auditLogs = [
    { action: "Expense Approved", user: "Super Admin", target: "EXP-1039", time: "2026-07-05 10:42 AM", ip: "192.168.1.10" },
    { action: "Expense Created", user: "Manager 2", target: "EXP-1041", time: "2026-07-05 09:15 AM", ip: "192.168.1.15" },
    { action: "Vendor Updated", user: "Admin 1", target: "MedSupply Co.", time: "2026-07-04 04:20 PM", ip: "192.168.1.12" },
];

const activities = [
    { text: "Super Admin approved expense EXP-1039", time: "10:42 AM", icon: CheckCircle, color: "#10b981" },
    { text: "Manager 2 created expense EXP-1041", time: "09:15 AM", icon: Plus, color: "#2563eb" },
    { text: "Admin 1 updated vendor MedSupply Co.", time: "Yesterday", icon: Edit, color: "#7c3aed" },
    { text: "System rejected expense EXP-1038 (Duplicate)", time: "2 days ago", icon: XCircle, color: "#ef4444" },
];

const topVendorsSpend = [
    { name: "MedSupply Co.", value: 1250000, color: "#2563eb" },
    { name: "RealState BD", value: 1200000, color: "#7c3aed" },
    { name: "AWS", value: 850000, color: "#0891b2" },
    { name: "Meta Platforms", value: 450000, color: "#ea580c" },
    { name: "Padma Oil", value: 120000, color: "#059669" },
];

const topCategorySpend = [
    { name: "Staff Salary", value: 18500000, color: "#0f172a" },
    { name: "Doctor Payments", value: 12400000, color: "#2563eb" },
    { name: "Medicine Purchase", value: 8400000, color: "#059669" },
    { name: "Admin Expense", value: 8200000, color: "#64748b" },
    { name: "Technician Pay", value: 6800000, color: "#7c3aed" },
];

const yearlyComparison = [
    { year: "2023", value: 32 }, { year: "2024", value: 38 }, { year: "2025", value: 44 }, { year: "2026", value: 48.5 },
];

const cashFlowMonths = [38, 41, 36, 45, 40, 48, 44, 52, 47, 55, 50, 58];

const statusOptions = ["approved", "pending", "rejected"];
const methodOptions = ["Bank Transfer", "Cash", "Credit Card", "Online Payment"];

// ─── Dynamic Financial Overview KPI builder (today/monthly/yearly/custom) ───
const kpiVariantCycle = ["primary", "secondary", "tertiary", "quaternary", "quinary", "senary", "septenary", "octonary", "nonary", "denary"];

const formatKpiAmount = (n) => {
    return `৳${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const periodTotalLabel = {
    today: "Today's Expenses",
    monthly: "Monthly Expenses",
    yearly: "Yearly Expenses",
    custom: "Custom Range Expenses",
};

const buildOverviewKpis = (periodExpenses, period, allCategories) => {
    const sumNet = (arr) => arr.reduce((s, e) => s + e.net, 0);
    const total = sumNet(periodExpenses);
    const cash = sumNet(periodExpenses.filter((e) => e.method === "Cash"));
    const bank = sumNet(periodExpenses.filter((e) => e.method === "Bank Transfer"));
    const online = sumNet(periodExpenses.filter((e) => e.method === "Online Payment" || e.method === "Credit Card"));
    const pendingCount = periodExpenses.filter((e) => e.status === "pending").length;
    const approvedCount = periodExpenses.filter((e) => e.status === "approved").length;
    const rejectedCount = periodExpenses.filter((e) => e.status === "rejected").length;

    const cards = [
        { label: periodTotalLabel[period], value: formatKpiAmount(total), trend: "", up: true, icon: DollarSign, variant: "primary" },
        { label: "Cash Expense", value: formatKpiAmount(cash), trend: "", up: true, icon: CreditCard, variant: "nonary" },
        { label: "Bank Expense", value: formatKpiAmount(bank), trend: "", up: true, icon: Building2, variant: "denary" },
        { label: "Online Payment", value: formatKpiAmount(online), trend: "", up: true, icon: Globe, variant: "quinary" },
        { label: "Pending Approval", value: String(pendingCount), trend: "", up: true, icon: AlertCircle, variant: "senary" },
        { label: "Approved Expenses", value: String(approvedCount), trend: "", up: true, icon: CheckCircle, variant: "septenary" },
        { label: "Rejected Expenses", value: String(rejectedCount), trend: "", up: false, icon: XCircle, variant: "octonary" },
    ];

    const categoryTotals = {};
    periodExpenses.forEach((e) => {
        if (!e.category || e.category === "-") return;
        categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.net;
    });

    // Always show one card per category from the Expense Categories list, even if 0
    allCategories.forEach((cat, i) => {
        const val = categoryTotals[cat] || 0;
        cards.push({ label: cat, value: formatKpiAmount(val), trend: "", up: true, icon: Package, variant: kpiVariantCycle[i % kpiVariantCycle.length] });
    });

    return cards;
};

// ─── Sub-Components ─────────────────────────────────────────────
const SectionHeader = ({ icon: Icon, title, subtitle, action, color = "#2563eb", bg = "#eff6ff" }) => (
    <div className="em-section-header">
        <div className="em-section-header-left">
            <div className="em-section-icon" style={{ background: bg, color }}>
                <Icon size={18} />
            </div>
            <div>
                <h2 className="em-section-title">{title}</h2>
                {subtitle && <p className="em-section-subtitle">{subtitle}</p>}
            </div>
        </div>
        {action && <div className="em-section-actions">{action}</div>}
    </div>
);

const KpiCard = ({ label, value, trend, up, icon: Icon, color, variant }) => (
    <motion.div className={`em-kpi-card ${variant}`} variants={fadeUp}>
        <div className="em-kpi-row-top">
            <div className="em-kpi-icon">
                <Icon size={16} />
            </div>
            <div className="em-kpi-value">{value}</div>
        </div>
        <div className="em-kpi-row-bottom">
            <div className="em-kpi-label">{label}</div>
            {trend ? (
                <span className={`em-kpi-trend ${up ? "up" : "down"}`}>
                    {up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    {trend}
                </span>
            ) : null}
        </div>
    </motion.div>
);

const ProgressBar = ({ value, max, color, height = 6 }) => (
    <div className="em-progress" style={{ height }}>
        <div className="em-progress-bar" style={{ width: `${Math.min((value / max) * 100, 100)}%`, background: color }} />
    </div>
);

const StatusBadge = ({ status }) => {
    const config = {
        approved: { bg: "#ecfdf5", color: "#059669", label: "Approved" },
        pending: { bg: "#fffbeb", color: "#d97706", label: "Pending" },
        rejected: { bg: "#fef2f2", color: "#dc2626", label: "Rejected" },
        active: { bg: "#ecfdf5", color: "#059669", label: "Active" },
        warning: { bg: "#fffbeb", color: "#d97706", label: "Warning" },
        verified: { bg: "#ecfdf5", color: "#059669", label: "Verified" },
        enabled: { bg: "#ecfdf5", color: "#059669", label: "Enabled" },
    };
    const c = config[status] || config.pending;
    return <span className="em-badge" style={{ background: c.bg, color: c.color }}>{c.label}</span>;
};

const RankedBarList = ({ items }) => {
    const max = Math.max(...items.map((i) => i.value));
    return (
        <div className="em-ranked-list">
            {items.map((item, i) => (
                <div key={i} className="em-ranked-row">
                    <div className="em-ranked-top">
                        <span className="em-ranked-name">{i + 1}. {item.name}</span>
                        <span className="em-ranked-value">৳{(item.value / 1000).toFixed(0)}K</span>
                    </div>
                    <ProgressBar value={item.value} max={max} color={item.color} height={6} />
                </div>
            ))}
        </div>
    );
};

// ─── Main Page ──────────────────────────────────────────────────
export default function ExpenseManagementPage() {
    const [expenses, setExpenses] = useState(initialExpenses);
    const [categories, setCategories] = useState(initialCategories);
    const [vendors, setVendors] = useState(initialVendors);

    const [search, setSearch] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        category: "", branch: "", department: "", vendor: "", status: "", method: "", from: "", to: "",
    });

    const [modal, setModal] = useState(null); // 'expense' | 'category' | 'vendor' | null
    const [editingExpense, setEditingExpense] = useState(null); // row object being edited, null = "Add" mode
    const [viewingExpense, setViewingExpense] = useState(null); // row object being viewed in details modal
    const [showAllExpenses, setShowAllExpenses] = useState(false);
    const [viewingDocs, setViewingDocs] = useState(null); // { documents: [...], index: number } | null
    const [editingVendor, setEditingVendor] = useState(null); // vendor object being edited, null = "Add" mode
    const [viewingVendor, setViewingVendor] = useState(null); // vendor object being viewed in details modal
    const [categoryDetails, setCategoryDetails] = useState({}); // { [categoryName]: { type, budgetHead, description, status } }
    const [editingCategory, setEditingCategory] = useState(null); // original category name being edited, null = "Add" mode

    const [approvalRequests, setApprovalRequests] = useState(approvals);
    const [requestChangesTarget, setRequestChangesTarget] = useState(null);
    const [requestChangesNote, setRequestChangesNote] = useState("");

    const [overviewPeriod, setOverviewPeriod] = useState("monthly"); // 'today' | 'monthly' | 'yearly' | 'custom'
    const [overviewCustomFrom, setOverviewCustomFrom] = useState("");
    const [overviewCustomTo, setOverviewCustomTo] = useState("");

    const branchNames = branches.map((b) => b.name).concat(["Head Office"]);
    const deptNames = [...new Set(departments.map((d) => d.name))];
    const vendorNames = vendors.map((v) => v.name);

    const pendingApprovals = approvalRequests.filter((a) => a.status === "pending");

    const getPeriodExpenses = (period, customFrom, customTo) => {
        const now = new Date();
        return expenses.filter((row) => {
            const d = new Date(row.date);
            if (period === "today") {
                return row.date === now.toISOString().slice(0, 10);
            }
            if (period === "monthly") {
                return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
            }
            if (period === "yearly") {
                return d.getFullYear() === now.getFullYear();
            }
            if (period === "custom") {
                if (!customFrom || !customTo) return false;
                return row.date >= customFrom && row.date <= customTo;
            }
            return true;
        });
    };

    const overviewExpenses = useMemo(
        () => getPeriodExpenses(overviewPeriod, overviewCustomFrom, overviewCustomTo),
        [expenses, overviewPeriod, overviewCustomFrom, overviewCustomTo]
    );

    const overviewKpiMetrics = useMemo(
        () => buildOverviewKpis(overviewExpenses, overviewPeriod, categories),
        [overviewExpenses, overviewPeriod, categories]
    );

    const overviewPeriodLabel = overviewPeriod === "custom"
        ? (overviewCustomFrom && overviewCustomTo ? `${overviewCustomFrom} to ${overviewCustomTo}` : "Custom Range")
        : { today: "Today", monthly: "This Month", yearly: "This Year" }[overviewPeriod];

    const currentMonthExpenses = useMemo(() => {
        const now = new Date();
        return expenses.filter((row) => {
            const d = new Date(row.date);
            return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
        });
    }, [expenses]);

    const filteredExpenses = useMemo(() => {
        return currentMonthExpenses.filter((row) => {
            const q = search.trim().toLowerCase();
            if (q && !(`${row.id} ${row.title} ${row.vendor} ${row.invoice}`.toLowerCase().includes(q))) return false;
            if (filters.category && row.category !== filters.category) return false;
            if (filters.branch && row.branch !== filters.branch) return false;
            if (filters.department && row.dept !== filters.department) return false;
            if (filters.vendor && row.vendor !== filters.vendor) return false;
            if (filters.status && row.status !== filters.status) return false;
            if (filters.method && row.method !== filters.method) return false;
            if (filters.from && row.date < filters.from) return false;
            if (filters.to && row.date > filters.to) return false;
            return true;
        });
    }, [currentMonthExpenses, search, filters]);

    const clearFilters = () => setFilters({ category: "", branch: "", department: "", vendor: "", status: "", method: "", from: "", to: "" });
    const activeFilterCount = Object.values(filters).filter(Boolean).length;

    const toggleRow = (id) => {
        setSelectedRows((prev) => prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]);
    };

    const toggleAll = () => {
        if (selectedRows.length === filteredExpenses.length) setSelectedRows([]);
        else setSelectedRows(filteredExpenses.map((e) => e.id));
    };

    const bulkSetStatus = (status) => {
        setExpenses((prev) => prev.map((e) => selectedRows.includes(e.id) ? { ...e, status } : e));
        setSelectedRows([]);
    };

    const bulkDelete = () => {
        setExpenses((prev) => prev.filter((e) => !selectedRows.includes(e.id)));
        setSelectedRows([]);
    };

    const handleSaveExpense = (form) => {
        if (editingExpense) {
            // ── UPDATE existing row ──
            setExpenses((prev) => prev.map((e) =>
                e.id === editingExpense.id
                    ? {
                        ...e,
                        date: form.expenseDate || e.date,
                        title: form.title,
                        category: form.category,
                        sub: form.subCategory,
                        branch: form.branch,
                        dept: form.department,
                        vendor: form.vendor,
                        method: form.paymentMethod,
                        invoice: form.invoice,
                        amount: parseFloat(form.amount) || 0,
                        tax: parseFloat(form.tax) || 0,
                        discount: parseFloat(form.discount) || 0,
                        net: parseFloat(form.net) || 0,
                        status: form.status?.toLowerCase() || e.status,
                        attachment: form.attachments?.length ?? e.attachment,
                        remarks: form.remarks,
                    }
                    : e
            ));
            setEditingExpense(null);
            return;
        }

        // ── ADD new row (existing behavior) ──
        const nextId = `EXP-${1043 + expenses.length}`;
        setExpenses((prev) => [{
            id: nextId,
            date: form.expenseDate || new Date().toISOString().slice(0, 10),
            title: form.title,
            category: form.category,
            sub: form.subCategory,
            branch: form.branch,
            dept: form.department,
            vendor: form.vendor,
            method: form.paymentMethod,
            invoice: form.invoice,
            amount: parseFloat(form.amount) || 0,
            tax: parseFloat(form.tax) || 0,
            discount: parseFloat(form.discount) || 0,
            net: parseFloat(form.net) || 0,
            created: "Super Admin",
            approved: "-",
            status: form.status?.toLowerCase() || "pending",
            attachment: form.attachments?.length || 0,
            remarks: form.remarks,
        }, ...prev]);
    };
    const handleSaveCategory = (form) => {
        if (!form.name) return;

        if (editingCategory) {
            // ── UPDATE existing category (supports rename) ──
            setCategories((prev) => prev.map((c) => (c === editingCategory ? form.name : c)));
            setCategoryDetails((prev) => {
                const next = { ...prev };
                delete next[editingCategory];
                next[form.name] = {
                    type: form.type,
                    description: form.description,
                    status: form.status,
                };
                return next;
            });
            setEditingCategory(null);
            return;
        }

        // ── ADD new category (existing behavior) ──
        if (!categories.includes(form.name)) {
            setCategories((prev) => [form.name, ...prev]);
            setCategoryDetails((prev) => ({
                ...prev,
                [form.name]: {
                    type: form.type,
                    description: form.description,
                    status: form.status,
                },
            }));
        }
    };

    const handleSaveVendor = (form) => {
        if (editingVendor) {
            // ── UPDATE existing vendor ──
            setVendors((prev) => prev.map((v) =>
                v.name === editingVendor.name
                    ? {
                        ...v,
                        name: form.name,
                        contact: form.email || v.contact,
                        phone: form.phone,
                        address: form.address,
                        category: form.category,
                        paymentTerms: form.paymentTerms,
                        outstanding: parseFloat(form.openingBalance) || v.outstanding,
                        status: form.status?.toLowerCase() || v.status,
                        profileImage: form.profileImage || v.profileImage,
                    }
                    : v
            ));
            setEditingVendor(null);
            return;
        }

        // ── ADD new vendor (existing behavior) ──
        setVendors((prev) => [{
            name: form.name,
            contact: form.email || "-",
            phone: form.phone || "",
            address: form.address || "",
            category: form.category || "",
            paymentTerms: form.paymentTerms || "Net 30",
            paid: 0,
            outstanding: parseFloat(form.openingBalance) || 0,
            rating: 0,
            status: form.status?.toLowerCase() || "active",
            profileImage: form.profileImage || null,
            docs: [],
        }, ...prev]);
    };

    const handleApprovalDecision = (approvalId, decision) => {
        setExpenses((prev) => {
            const existingIndex = prev.findIndex((e) => e.id === approvalId);
            const approval = approvalRequests.find((a) => a.id === approvalId);
            if (existingIndex !== -1) {
                const updated = { ...prev[existingIndex], status: decision, approved: decision === "approved" ? "Super Admin" : "-" };
                const rest = prev.filter((e) => e.id !== approvalId);
                return [updated, ...rest];
            }
            if (!approval) return prev;
            const newExpense = {
                id: approval.id,
                date: new Date().toISOString().slice(0, 10),
                title: approval.title,
                category: "-", sub: "-", branch: "-", dept: "-", vendor: "-", method: "-", invoice: "-",
                amount: approval.amount,
                tax: 0, discount: 0,
                net: approval.amount,
                created: approval.requester,
                approved: decision === "approved" ? "Super Admin" : "-",
                status: decision,
                attachment: 0,
                remarks: "-",
            };
            return [newExpense, ...prev];
        });
        setApprovalRequests((prev) => prev.filter((a) => a.id !== approvalId));
    };

    const openDocuments = (docs, startIdx = 0) => {
        if (!docs || docs.length === 0) return;
        setViewingDocs({ documents: docs, index: startIdx });
    };

    const openRequestChanges = (approvalId) => {
        setRequestChangesTarget(approvalId);
        setRequestChangesNote("");
    };

    const submitRequestChanges = () => {
        setRequestChangesTarget(null);
        setRequestChangesNote("");
    };

    return (
        <div className="em-page">
            <PrintableReport
                kpiMetrics={overviewKpiMetrics}
                periodLabel={overviewPeriodLabel}
                topCategorySpend={topCategorySpend}
                topVendorsSpend={topVendorsSpend}
                yearlyComparison={yearlyComparison}
                monthlyTrend={[35, 42, 38, 55, 48, 62, 58, 72, 68, 85, 78, 92]}
                categoryDistribution={[
                    { label: "Salary", pct: 32, color: "#2563eb" },
                    { label: "Medical", pct: 24, color: "#059669" },
                    { label: "Operations", pct: 20, color: "#7c3aed" },
                    { label: "Others", pct: 24, color: "#ea580c" },
                ]}
                cashFlowMonths={cashFlowMonths}
            />
            <main className="em-main">
                {/* ─── HEADER ─────────────────────────────────── */}
                <header className="em-header">
                    <div className="em-header-top">
                        <div className="em-header-title-group">
                            <h1 className="em-page-title">Expenses Management</h1>
                        </div>
                        <div className="em-header-stats">
                            <div className="em-header-stat">
                                <span className="em-header-stat-label">Today's Expenses</span>
                                <span className="em-header-stat-value">৳142,500</span>
                            </div>
                            <div className="em-header-stat">
                                <span className="em-header-stat-label">Current Month</span>
                                <span className="em-header-stat-value">৳4.2M</span>
                            </div>
                        </div>
                    </div>
                    <div className="em-header-actions">
                        <button className="em-btn em-btn-primary" onClick={() => { setEditingExpense(null); setModal("expense"); }}>
                            <Plus size={14} /> Add Expense
                        </button>
                        <button className="em-btn em-btn-ghost" onClick={() => { setEditingCategory(null); setModal("category"); }}><Layers size={14} /> Add Category</button>
                        <button className="em-btn em-btn-ghost" onClick={() => { setEditingVendor(null); setModal("vendor"); }}><Users size={14} /> Add Vendor</button>
                        <button className="em-btn em-btn-ghost" onClick={() => exportOverviewToPDF()}><FileText size={14} /> Export PDF</button>
                        <button className="em-btn em-btn-ghost" onClick={() => window.print()}><Receipt size={14} /> Print</button>
                    </div>
                </header>

                {/* ─── SECTION 1: FINANCIAL OVERVIEW ───────────────── */}
                <motion.section className="em-section" variants={fadeUp} initial="hidden" animate="visible">
                    <SectionHeader
                        icon={DollarSign}
                        title="Financial Overview"
                        subtitle={`Real-time expense tracking — ${overviewPeriodLabel}`}
                        action={
                            <div className="em-overview-filter">
                                <button className={`em-btn em-btn-ghost ${overviewPeriod === "today" ? "em-btn-active" : ""}`} onClick={() => setOverviewPeriod("today")}>Today</button>
                                <button className={`em-btn em-btn-ghost ${overviewPeriod === "monthly" ? "em-btn-active" : ""}`} onClick={() => setOverviewPeriod("monthly")}>Monthly</button>
                                <button className={`em-btn em-btn-ghost ${overviewPeriod === "yearly" ? "em-btn-active" : ""}`} onClick={() => setOverviewPeriod("yearly")}>Yearly</button>
                                <button className={`em-btn em-btn-ghost ${overviewPeriod === "custom" ? "em-btn-active" : ""}`} onClick={() => setOverviewPeriod("custom")}>Custom</button>
                                {overviewPeriod === "custom" && (
                                    <>
                                        <input type="date" className="em-overview-date-input" value={overviewCustomFrom} onChange={(e) => setOverviewCustomFrom(e.target.value)} />
                                        <input type="date" className="em-overview-date-input" value={overviewCustomTo} onChange={(e) => setOverviewCustomTo(e.target.value)} />
                                    </>
                                )}
                            </div>
                        }
                    />
                    {overviewKpiMetrics.length > 0 ? (
                        <motion.div className="em-kpi-grid" variants={stagger} initial="hidden" animate="visible">
                            {overviewKpiMetrics.map((kpi, i) => <KpiCard key={i} {...kpi} />)}
                        </motion.div>
                    ) : (
                        <div className="em-card">
                            <p className="em-card-footnote" style={{ margin: 0 }}>No expenses found for the selected period.</p>
                        </div>
                    )}
                </motion.section>

                {/* ─── SECTION 2: EXPENSE ANALYTICS ────────────────── */}
                <motion.section className="em-section" variants={fadeUp} initial="hidden" animate="visible">
                    <SectionHeader icon={BarChart3} title="Expense Analytics" subtitle="Interactive trends, distributions, and comparisons" />
                    <div className="em-grid-2">
                        <div className="em-card">
                            <h3 className="em-card-title">Monthly Expense Trend</h3>
                            <div className="em-chart-bar">
                                {[35, 42, 38, 55, 48, 62, 58, 72, 68, 85, 78, 92].map((val, i) => (
                                    <div key={i} className="em-bar-col">
                                        <div className="em-bar" style={{ height: `${val}%`, background: `linear-gradient(to top, #2563eb, #60a5fa)` }} />
                                        <span className="em-bar-label">{["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="em-card">
                            <h3 className="em-card-title">Expense Category Distribution</h3>
                            <div className="em-donut-container">
                                <svg viewBox="0 0 100 100" className="em-donut">
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#2563eb" strokeWidth="15" strokeDasharray="80 251" strokeDashoffset="0" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#059669" strokeWidth="15" strokeDasharray="60 251" strokeDashoffset="-80" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#7c3aed" strokeWidth="15" strokeDasharray="50 251" strokeDashoffset="-140" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#ea580c" strokeWidth="15" strokeDasharray="61 251" strokeDashoffset="-190" />
                                </svg>
                                <div className="em-donut-legend">
                                    <div><span className="em-legend-dot" style={{ background: "#2563eb" }} /> Salary (32%)</div>
                                    <div><span className="em-legend-dot" style={{ background: "#059669" }} /> Medical (24%)</div>
                                    <div><span className="em-legend-dot" style={{ background: "#7c3aed" }} /> Operations (20%)</div>
                                    <div><span className="em-legend-dot" style={{ background: "#ea580c" }} /> Others (24%)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="em-grid-4">
                        <div className="em-card">
                            <h3 className="em-card-title">Yearly Comparison</h3>
                            <div className="em-chart-bar em-chart-bar-yearly">
                                {yearlyComparison.map((y, i) => (
                                    <div key={i} className="em-bar-col">
                                        <div className="em-bar" style={{ height: `${(y.value / 50) * 100}%`, background: "linear-gradient(to top, #059669, #6ee7b7)" }} />
                                        <span className="em-bar-label">{y.year}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="em-card-footnote">Total spend in ৳ Millions per year</p>
                        </div>
                        <div className="em-card">
                            <h3 className="em-card-title">Cash Flow (Outflow Trend)</h3>
                            <svg viewBox="0 0 300 100" className="em-cashflow-chart" preserveAspectRatio="none">
                                <polyline
                                    fill="none" stroke="#2563eb" strokeWidth="2.5"
                                    points={cashFlowMonths.map((v, i) => `${(i / (cashFlowMonths.length - 1)) * 300},${100 - v}`).join(" ")}
                                />
                                <polygon
                                    fill="url(#cashflowGradient)" opacity="0.25"
                                    points={`0,100 ${cashFlowMonths.map((v, i) => `${(i / (cashFlowMonths.length - 1)) * 300},${100 - v}`).join(" ")} 300,100`}
                                />
                                <defs>
                                    <linearGradient id="cashflowGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#2563eb" />
                                        <stop offset="100%" stopColor="#ffffff" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <p className="em-card-footnote">Monthly outflow, Jan – Dec 2026</p>
                        </div>
                        <div className="em-card">
                            <h3 className="em-card-title">Top Spending Categories</h3>
                            <RankedBarList items={topCategorySpend} />
                        </div>
                        <div className="em-card">
                            <h3 className="em-card-title">Top Vendors by Spend</h3>
                            <RankedBarList items={topVendorsSpend} />
                        </div>
                    </div>
                </motion.section>

                {/* ─── SECTION 3: EXPENSE TABLE ────────────────────── */}
                <motion.section className="em-section" variants={fadeUp} initial="hidden" animate="visible">
                    <SectionHeader icon={FileText} title="Expense Records" subtitle="Comprehensive data table with advanced filtering"
                        action={
                            <div className="em-table-actions">
                                <div className="em-search-box">
                                    <Search size={14} />
                                    <input type="text" placeholder="Search ID, title, vendor, invoice..." value={search} onChange={(e) => setSearch(e.target.value)} />
                                </div>
                                <button className={`em-btn em-btn-ghost ${activeFilterCount ? "em-btn-active" : ""}`} onClick={() => setShowFilters((s) => !s)}>
                                    <Filter size={14} /> Filters {activeFilterCount > 0 && <span className="em-filter-count">{activeFilterCount}</span>}
                                </button>
                                <button className="em-btn em-btn-ghost" onClick={() => exportExpensesToExcel(expenses)}><Download size={14} /> Export Excel</button>
                                <button className="em-btn em-btn-primary em-view-all-desktop" onClick={() => setShowAllExpenses(true)}>
                                    <Eye size={14} /> View All Expenses
                                </button>
                            </div>
                        }
                    />

                    {showFilters && (
                        <div className="em-card em-filter-bar">
                            <div className="em-filter-grid">
                                <div className="em-form-group">
                                    <label>Category</label>
                                    <select value={filters.category} onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}>
                                        <option value="">All Categories</option>
                                        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="em-form-group">
                                    <label>Branch</label>
                                    <select value={filters.branch} onChange={(e) => setFilters((f) => ({ ...f, branch: e.target.value }))}>
                                        <option value="">All Branches</option>
                                        {branchNames.map((b) => <option key={b} value={b}>{b}</option>)}
                                    </select>
                                </div>
                                <div className="em-form-group">
                                    <label>Department</label>
                                    <select value={filters.department} onChange={(e) => setFilters((f) => ({ ...f, department: e.target.value }))}>
                                        <option value="">All Departments</option>
                                        {deptNames.map((d) => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                                <div className="em-form-group">
                                    <label>Vendor</label>
                                    <select value={filters.vendor} onChange={(e) => setFilters((f) => ({ ...f, vendor: e.target.value }))}>
                                        <option value="">All Vendors</option>
                                        {vendorNames.map((v) => <option key={v} value={v}>{v}</option>)}
                                    </select>
                                </div>
                                <div className="em-form-group">
                                    <label>Status</label>
                                    <select value={filters.status} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}>
                                        <option value="">All Statuses</option>
                                        {statusOptions.map((s) => <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}
                                    </select>
                                </div>
                                <div className="em-form-group">
                                    <label>Payment Method</label>
                                    <select value={filters.method} onChange={(e) => setFilters((f) => ({ ...f, method: e.target.value }))}>
                                        <option value="">All Methods</option>
                                        {methodOptions.map((m) => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                </div>
                                <div className="em-form-group">
                                    <label>From Date</label>
                                    <input type="date" value={filters.from} onChange={(e) => setFilters((f) => ({ ...f, from: e.target.value }))} />
                                </div>
                                <div className="em-form-group">
                                    <label>To Date</label>
                                    <input type="date" value={filters.to} onChange={(e) => setFilters((f) => ({ ...f, to: e.target.value }))} />
                                </div>
                            </div>
                            <div className="em-filter-actions">
                                <button className="em-btn em-btn-ghost" onClick={clearFilters}><RotateCcw size={14} /> Clear Filters</button>
                            </div>
                        </div>
                    )}

                    {selectedRows.length > 0 && (
                        <div className="em-bulk-bar">
                            <span>{selectedRows.length} selected</span>
                            <div className="em-bulk-actions">
                                <button className="em-btn em-btn-success" onClick={() => bulkSetStatus("approved")}><CheckCircle size={14} /> Bulk Approve</button>
                                <button className="em-btn em-btn-danger" onClick={() => bulkSetStatus("rejected")}><XCircle size={14} /> Bulk Reject</button>
                                <button className="em-btn em-btn-ghost"><Download size={14} /> Export Excel Selected</button>
                                <button className="em-btn em-btn-outline-danger" onClick={bulkDelete}><Trash2 size={14} /> Bulk Delete</button>
                                <button className="em-btn em-btn-ghost" onClick={() => setSelectedRows([])}><X size={14} /> Clear</button>
                            </div>
                        </div>
                    )}

                    <div className="em-table-wrapper em-table-scroll-limit em-table-wrapper-noscroll">
                        <table className="em-table em-table-fluid">
                            <colgroup>
                                <col style={{ width: "2%" }} />
                                <col style={{ width: "6%" }} />
                                <col style={{ width: "7%" }} />
                                <col style={{ width: "15%" }} />
                                <col style={{ width: "8%" }} />
                                <col style={{ width: "7%" }} />
                                <col style={{ width: "8%" }} />
                                <col style={{ width: "6%" }} />
                                <col style={{ width: "8%" }} />
                                <col style={{ width: "7%" }} />
                                <col style={{ width: "8%" }} />
                                <col style={{ width: "7%" }} />
                                <col style={{ width: "5%" }} />
                                <col style={{ width: "6%" }} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th><input type="checkbox" checked={selectedRows.length === filteredExpenses.length && filteredExpenses.length > 0} onChange={toggleAll} /></th>
                                    <th>Exp: ID</th><th>Date</th><th>Title</th><th>Category</th><th>Branch</th>
                                    <th>Method</th><th>Invoice</th>
                                    <th>Net Amount</th>
                                    <th>Created By</th><th>Approved By</th><th>Status</th><th>Docs</th><th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredExpenses.map((row) => (
                                    <tr key={row.id} className={selectedRows.includes(row.id) ? "selected" : ""}>
                                        <td><input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => toggleRow(row.id)} /></td>
                                        <td><strong>{row.id}</strong></td>
                                        <td>{row.date}</td>
                                        <td className="em-cell-title">{row.title}</td>
                                        <td>{row.category}</td>
                                        <td>{row.branch}</td>
                                        <td>{row.method}</td>
                                        <td><code>{row.invoice}</code></td>
                                        <td><strong>৳{row.net.toLocaleString()}</strong></td>
                                        <td>{row.created}</td>
                                        <td>{row.approved}</td>
                                        <td><StatusBadge status={row.status} /></td>
                                        <td>
                                            <button
                                                type="button"
                                                className="em-attachment-badge em-attachment-btn"
                                                onClick={() => openDocuments(row.docs, 0)}
                                                disabled={!row.docs?.length}
                                                title={row.docs?.length ? "View attached documents" : "No documents attached"}
                                            >
                                                <FileCheck size={12} /> {row.docs?.length ?? row.attachment}
                                            </button>
                                        </td>
                                        <td>
                                            <div className="em-row-actions">
                                                <button title="View" onClick={() => setViewingExpense(row)}><Eye size={14} /></button>
                                                <button title="Edit" onClick={() => { setEditingExpense(row); setModal("expense"); }}>
                                                    <Edit size={14} />
                                                </button>
                                                <button title="Delete" onClick={() => setExpenses((prev) => prev.filter((e) => e.id !== row.id))}><Trash2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredExpenses.length === 0 && (
                                    <tr><td colSpan={19} className="em-empty-row">No expenses match the current filters.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <button className="em-btn em-btn-primary em-view-all-mobile" onClick={() => setShowAllExpenses(true)}>
                        <Eye size={14} /> View All Expenses
                    </button>
                    <p className="em-card-footnote" style={{ marginTop: 1 }}>Showing this month's {filteredExpenses.length} expense(s). Scroll to see more.</p>
                </motion.section>

                {/* ─── SECTION 4: APPROVAL MANAGEMENT ──────────────── */}
                {pendingApprovals.length > 0 && (
                    <motion.section className="em-section" variants={fadeUp} initial="hidden" animate="visible">
                        <SectionHeader icon={CheckSquareIcon} title="Approval Management" subtitle="Review and process pending expense requests" />
                        <div className="em-grid-4">
                            {pendingApprovals.map((a) => (
                                <div key={a.id} className={`em-card em-approval-card ${a.status}`}>
                                    <div className="em-approval-header">
                                        <span className="em-approval-id">{a.id}</span>
                                        <StatusBadge status={a.status} />
                                    </div>
                                    <h4>{a.title}</h4>
                                    <div className="em-approval-amount">৳{a.amount.toLocaleString()}</div>
                                    <div className="em-approval-meta">
                                        <span>Requested by: <strong>{a.requester}</strong></span>
                                        <span>{a.date}</span>
                                    </div>
                                    <div className="em-approval-actions">
                                        <button className="em-btn em-btn-success" onClick={() => handleApprovalDecision(a.id, "approved")}><CheckCircle size={14} /> Approve</button>
                                        <button className="em-btn em-btn-danger" onClick={() => handleApprovalDecision(a.id, "rejected")}><XCircle size={14} /> Reject</button>
                                        <button className="em-btn em-btn-ghost" onClick={() => openRequestChanges(a.id)}><Edit size={14} /> Request Changes</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {/* ─── SECTION 5: VENDOR MANAGEMENT ────────────────── */}
                <motion.section className="em-section" variants={fadeUp} initial="hidden" animate="visible">
                    <SectionHeader icon={Users} title="Vendor Management" subtitle="Track payments, outstanding bills, and vendor performance"
                        action={<button className="em-btn em-btn-primary" onClick={() => { setEditingVendor(null); setModal("vendor"); }}><Plus size={14} /> Add Vendor</button>} />
                    <div className="em-table-wrapper">
                        <table className="em-table em-table-compact">
                            <thead>
                                <tr>
                                    <th>Vendor</th><th>Phone</th><th>Emial</th><th>Total Paid</th><th>Outstanding</th><th>Status</th><th>Docs</th><th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendors.map((v, i) => (
                                    <tr key={i}>
                                        <td>
                                            <div className="em-vendor-name-cell">
                                                <div className="em-vendor-avatar">
                                                    {v.profileImage ? <img src={v.profileImage} alt={v.name} /> : <Users size={14} />}
                                                </div>
                                                <strong>{v.name}</strong>
                                            </div>
                                        </td>
                                        <td><a href={`tel:${v.phone}`}>{v.phone}</a></td>
                                        <td><a href={`mailto:${v.contact}`}>{v.contact}</a></td>
                                        <td>৳{v.paid.toLocaleString()}</td>
                                        <td className={v.outstanding > 0 ? "text-warning" : ""}>৳{v.outstanding.toLocaleString()}</td>
                                        <td><StatusBadge status={v.status} /></td>
                                        <td>
                                            <button
                                                type="button"
                                                className="em-attachment-badge em-attachment-btn"
                                                onClick={() => openDocuments(v.docs, 0)}
                                                disabled={!v.docs?.length}
                                                title={v.docs?.length ? "View attached documents" : "No documents attached"}
                                            >
                                                <FileCheck size={12} /> {v.docs?.length ?? 0}
                                            </button>
                                        </td>
                                        <td>
                                            <div className="em-row-actions">
                                                <button title="View" onClick={() => setViewingVendor(v)}><Eye size={14} /></button>
                                                <button title="Edit" onClick={() => { setEditingVendor(v); setModal("vendor"); }}><Edit size={14} /></button>
                                                <button title="Delete" onClick={() => setVendors((prev) => prev.filter((x) => x.name !== v.name))}><Trash2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.section>

                {/* ─── SECTION 6: EXPENSE CATEGORIES ───────────────── */}
                <motion.section className="em-section" variants={fadeUp} initial="hidden" animate="visible">
                    <SectionHeader icon={Layers} title="Expense Categories" subtitle="Manage and organize expense classifications"
                        action={<button className="em-btn em-btn-primary" onClick={() => { setEditingCategory(null); setModal("category"); }}><Plus size={14} /> Add Category</button>} />
                    <div className="em-categories-grid">
                        {categories.map((cat, i) => (
                            <div key={i} className="em-category-card">
                                <span className="em-category-name">{cat}</span>
                                <div className="em-category-actions">
                                    <button title="Edit" onClick={() => { setEditingCategory(cat); setModal("category"); }}><Edit size={12} /></button>
                                    <button title="Delete" onClick={() => setCategories((prev) => prev.filter((c) => c !== cat))}><Trash2 size={12} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

            </main>

            {/* ─── MODALS ──────────────────────────────────────────── */}
           <AddExpenseModal
                open={modal === "expense"}
                onClose={() => { setModal(null); setEditingExpense(null); }}
                onSave={handleSaveExpense}
                categories={categories}
                departments={deptNames}
                branches={branchNames}
                vendors={vendorNames}
                initialData={editingExpense}
            />
            <AddCategoryModal
                open={modal === "category"}
                onClose={() => { setModal(null); setEditingCategory(null); }}
                onSave={handleSaveCategory}
                initialData={editingCategory ? { name: editingCategory, ...categoryDetails[editingCategory] } : null}
            />
            
            <AddVendorModal
                open={modal === "vendor"}
                onClose={() => { setModal(null); setEditingVendor(null); }}
                onSave={handleSaveVendor}
                initialData={editingVendor}
            />

            <ExpenseDetailsModal
                open={!!viewingExpense}
                onClose={() => setViewingExpense(null)}
                expense={viewingExpense}
                onEdit={(row) => {
                    setViewingExpense(null);
                    setEditingExpense(row);
                    setModal("expense");
                }}
                onOpenDocument={(docs, idx) => openDocuments(docs, idx)}
            />

            <DocumentViewerModal
                open={!!viewingDocs}
                onClose={() => setViewingDocs(null)}
                documents={viewingDocs?.documents || []}
                startIndex={viewingDocs?.index || 0}
            />

            <VendorDetailsModal
                open={!!viewingVendor}
                onClose={() => setViewingVendor(null)}
                vendor={viewingVendor}
                onEdit={(v) => {
                    setViewingVendor(null);
                    setEditingVendor(v);
                    setModal("vendor");
                }}
                onOpenDocument={(docs, idx) => openDocuments(docs, idx)}
            />

            <AllExpensesModal
                open={showAllExpenses}
                onClose={() => setShowAllExpenses(false)}
                expenses={expenses}
                categories={categories}
                branchNames={branchNames}
                deptNames={deptNames}
                vendorNames={vendorNames}
                onView={(row) => { setShowAllExpenses(false); setViewingExpense(row); }}
                onEdit={(row) => { setShowAllExpenses(false); setEditingExpense(row); setModal("expense"); }}
                onDelete={(id) => setExpenses((prev) => prev.filter((e) => e.id !== id))}
                onOpenDocument={(docs, idx) => openDocuments(docs, idx)}
            />

            {requestChangesTarget && (
                <div className="em-modal-overlay" onClick={() => setRequestChangesTarget(null)}>
                    <div className="em-modal em-modal-sm" onClick={(e) => e.stopPropagation()}>
                        <div className="em-modal-header">
                            <div className="em-modal-header-left">
                                <div className="em-modal-icon"><Edit size={18} /></div>
                                <div>
                                    <h3>Request Changes</h3>
                                    <p>{requestChangesTarget}</p>
                                </div>
                            </div>
                            <button className="em-modal-close" onClick={() => setRequestChangesTarget(null)}><X size={16} /></button>
                        </div>
                        <div className="em-modal-body">
                            <div className="em-form-group">
                                <label>Note to Requester</label>
                                <textarea rows={4} placeholder="Describe what needs to be changed..." value={requestChangesNote} onChange={(e) => setRequestChangesNote(e.target.value)} />
                            </div>
                            <div className="em-form-actions" style={{ display: "flex" }}>
                                <button className="em-btn em-btn-ghost" onClick={() => setRequestChangesTarget(null)}>Cancel</button>
                                <button className="em-btn em-btn-primary" onClick={submitRequestChanges}>Send Request</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}