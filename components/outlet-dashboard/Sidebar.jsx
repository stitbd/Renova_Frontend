// components/outlet-dashboard/Sidebar.jsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import useRoutePrefetch from "@/components/common/useRoutePrefetch";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Stethoscope,
  Monitor,
  ShoppingCart,
  Package,
  BarChart3,
  DollarSign,
  TrendingUp,
  Users2,
  Settings,
  Phone,
  BadgeAlert
} from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/outlet-portal/dashboard", badge: null },
    { icon: Users, label: "Patients", href: "/outlet-portal/patients", badge: null },
    { icon: Calendar, label: "Appointments", href: "/outlet-portal/appointments", badge: 12 },
    { icon: Stethoscope, label: "Consultations", href: "/outlet-portal/consultations", badge: 8 },
    { icon: Monitor, label: "Devices & Reports", href: "/outlet-portal/devices", badge: null },
    { icon: ShoppingCart, label: "Pharmacy / POS", href: "/outlet-portal/pharmacy", badge: null },
    { icon: Package, label: "Inventory", href: "/outlet-portal/inventory", badge: null },
    { icon: BarChart3, label: "Sales", href: "/outlet-portal/sales", badge: null },
    { icon: DollarSign, label: "Earnings & Commission", href: "/outlet-portal/earnings", badge: null },
    { icon: TrendingUp, label: "Outlet Performance", href: "/outlet-portal/performance", badge: null },
    { icon: Users2, label: "Users & Roles", href: "/outlet-portal/users", badge: null },
    { icon: Settings, label: "Settings", href: "/outlet-portal/settings", badge: null },
  ];
  const prefetchRoute = useRoutePrefetch(menuItems.map((item) => item.href));

  return (
    <aside className={`outlet-sidebar${isOpen ? " open" : ""}`}>
      {/* Logo — image only */}
      <div className="sidebar-logo">
        <img
          src="/images/logo2.png"
          alt="Renova Life Care"
          onError={(e) => { e.target.style.display = "none"; }}
        />
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${pathname === item.href ? "active" : ""}`}
              onMouseEnter={() => prefetchRoute(item.href)}
              onFocus={() => prefetchRoute(item.href)}
              onTouchStart={() => prefetchRoute(item.href)}
              onClick={onClose}
            >
              <span className="nav-icon"><IconComponent size={18} /></span>
              <span className="nav-label">{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="support-button">
          <Phone size={20} />
          <div className="support-text">
            <span>Need Support?</span>
            <span>Contact Support Center</span>
          </div>
        </button>
      </div>
    </aside>
  );
}