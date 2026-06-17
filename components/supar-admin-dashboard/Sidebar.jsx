// components/supar-admin-dashboard/Sidebar.jsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  UserCog,
  Building2,
  PlusCircle,
  Settings,
  UserCheck,
  Award,
  DollarSign,
  HandCoins,
  FileText,
  BarChart3,
  LineChart,
  TrendingUp,
  Shield,
  FileCheck,
  Globe,
  Receipt,
  Bell,
  ToggleLeft,
  Wrench
} from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  const menuSections = [
    {
      title: null,
      items: [
        { icon: LayoutDashboard, label: "Dashboard", href: "/supar-admin-panel/dashboard" },
      ],
    },
    {
      title: "USER MANAGEMENT",
      items: [
        { icon: Users, label: "Patients", href: "/supar-admin-panel/patients" },
        { icon: Stethoscope, label: "Doctors", href: "/supar-admin-panel/doctors" },
        { icon: UserCog, label: "Outlet Staff", href: "/supar-admin-panel/staff" },
      ],
    },
    {
      title: "OUTLET MANAGEMENT",
      items: [
        { icon: Building2, label: "All Outlets", href: "/supar-admin-panel/outlets" },
        { icon: PlusCircle, label: "Create Outlet", href: "/supar-admin-panel/outlets/create" },
        { icon: Settings, label: "Outlet Settings", href: "/supar-admin-panel/outlets/settings" },
      ],
    },
    {
      title: "DOCTOR MANAGEMENT",
      items: [
        { icon: UserCheck, label: "Doctor Approval", href: "/supar-admin-panel/doctors/approvals" },
        { icon: Award, label: "Specialization", href: "/supar-admin-panel/specializations" },
      ],
    },
    {
      title: "FINANCE",
      items: [
        { icon: DollarSign, label: "Revenue", href: "/supar-admin-panel/revenue" },
        { icon: HandCoins, label: "Commissions", href: "/supar-admin-panel/commissions" },
        { icon: FileText, label: "Settlements", href: "/supar-admin-panel/settlements" },
      ],
    },
    {
      title: "ANALYTICS",
      items: [
        { icon: BarChart3, label: "Outlet Performance", href: "/supar-admin-panel/analytics/outlets" },
        { icon: LineChart, label: "Doctor Performance", href: "/supar-admin-panel/analytics/doctors" },
        { icon: TrendingUp, label: "Patient Trends", href: "/supar-admin-panel/analytics/trends" },
      ],
    },
    {
      title: "ACCESS CONTROL",
      items: [
        { icon: Shield, label: "Roles & Permissions", href: "/supar-admin-panel/roles" },
        { icon: FileCheck, label: "Audit Logs", href: "/supar-admin-panel/audit-logs" },
      ],
    },
    {
      title: "WEBSITE CONTENT",
      items: [
        { icon: Globe, label: "Website Content", href: "/supar-admin-panel/website-content" },
      ],
    },
    {
      title: "SYSTEM SETTINGS",
      items: [
        { icon: Receipt, label: "Pricing Rules", href: "/supar-admin-panel/settings/pricing" },
        { icon: Bell, label: "Notification Templates", href: "/supar-admin-panel/settings/notifications" },
        { icon: ToggleLeft, label: "Feature Toggles", href: "/supar-admin-panel/settings/features" },
        { icon: Wrench, label: "System Configuration", href: "/supar-admin-panel/settings/config" },
      ],
    },
  ];

  return (
    <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-logo">
        <img
          src="/images/logo2.png"
          alt="Renova Life Care"
          onError={(e) => { e.target.style.display = "none"; }}
        />
      </div>

      <nav className="sidebar-nav">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="nav-section">
            {section.title && (
              <div className="nav-section-title">{section.title}</div>
            )}
            {section.items.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-item ${pathname === item.href ? "active" : ""}`}
                  onClick={onClose}
                >
                  <span className="nav-icon">
                    <IconComponent size={17} />
                  </span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}