// app/supar-admin-panel/website-content/layout.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Info, Users, Target, Award, Clock, Heart, Star, Layout,
  Image as ImageIcon, User, UserPlus, Phone, Mail, Search, Save,
  Eye, Trash, Upload, RefreshCw, ExternalLink, Check, Plus, X,
  ChevronDown, List, Grid, Calendar, ShoppingBag, MessageCircle,
  FileText, MapPin, Tag, Link as LinkIcon, Package, UserCheck,
  BookOpen, Activity, AlertCircle, Layers, Menu, MoreHorizontal,
  CheckCircle, XCircle, Settings, Globe, CreditCard, BarChart,
  Newspaper, Video
} from "lucide-react";
import "./website-content.css";

/* ══════════════════════════════════════════════════════════════
   PAGE TREE — Mirrors your navLinks with correct paths
   ══════════════════════════════════════════════════════════════ */
const PAGE_TREE = [
  { id: "home", label: "Home", href: "/home-page", icon: "home" },
  { id: "about", label: "About", href: "/about-page", icon: "info" },
  { id: "doctors", label: "Doctors", href: "/doctors-page", icon: "doctors" },
  {id: "services", label: "Services", href: "/services-page", icon: "services" },
  { id: "packages", label: "Packages", href: "/packages-page", icon: "package" },
  { id: "test-list", label: "Test List", href: "/test-list-page", icon: "package" },
  { id: "shop", label: "Shop", href: "/shop-page", icon: "shop" },
  { id: "blog", label: "Blog", href: "/blog-page", icon: "blog" },
  { id: "news", label: "News", href: "/news-page", icon: "news" },
  { id: "photos", label: "Photos Gallery", href: "/photos-gallery-page", icon: "image" },
  { id: "videos", label: "Videos Gallery", href: "/videos-gallery-page", icon: "video" },
  { id: "contact", label: "Contact", href: "/contact-page", icon: "contact" },
  { id: "faq", label: "Faq", href: "/faq-page", icon: "faq" },
  { id: "privacy-policy", label: "Privacy Policy", href: "/privacy-policy-page", icon: "faq" },
  { id: "terms-of-service", label: "Terms of Service", href: "/terms-of-service-page", icon: "terms" },
  { id: "our-team", label: "Our Team", href: "/our-team-page", icon: "team" },
  { id: "events", label: "Events", href: "/events-page", icon: "events" },
  { id: "careers", label: "Careers", href: "/careers-page", icon: "careers" },
  { id: "appointment", label: "Appointment", href: "/appointment-page", icon: "calendar" },
  { id: "testimonials", label: "Testimonials", href: "/testimonials-page", icon: "testimonials" },
  { id: "partners", label: "Partners", href: "/partners-page", icon: "partners" },
  { id: "general-settings", label: "General Settings", href: "/general-settings-page", icon: "settings" },
];
/* ══════════════════════════════════════════════════════════════
   ICON MAP - Maps icon names to Lucide components
   ══════════════════════════════════════════════════════════════ */
const getIconComponent = (iconName) => {
  const iconMap = {
    home: Home,
    info: Info,
    users: Users,
    target: Target,
    award: Award,
    clock: Clock,
    heart: Heart,
    star: Star,
    layout: Layout,
    image: ImageIcon,
    user: User,
    "user-plus": UserPlus,
    phone: Phone,
    mail: Mail,
    search: Search,
    save: Save,
    eye: Eye,
    trash: Trash,
    upload: Upload,
    refresh: RefreshCw,
    external: ExternalLink,
    check: Check,
    plus: Plus,
    x: X,
    "chevron-down": ChevronDown,
    list: List,
    grid: Grid,
    calendar: Calendar,
    "shopping-bag": ShoppingBag,
    "message-circle": MessageCircle,
    "file-text": FileText,
    "map-pin": MapPin,
    tag: Tag,
    link: LinkIcon,
    package: Package,
    services: Activity,
    doctors: UserCheck,
    contact: Phone,
    blog: BookOpen,
    shop: ShoppingBag,
    settings: Settings,
    globe: Globe,
    "credit-card": CreditCard,
    "bar-chart": BarChart,
    newspaper: Newspaper,
    video: Video,
    news: Newspaper,
  };
  return iconMap[iconName] || Layout;
};

/* ══════════════════════════════════════════════════════════════
   MAIN LAYOUT COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function WebsiteContentLayout({ children }) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [openParents, setOpenParents] = useState({
    home: true,
    services: true,
    media: false
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Determine which page is active based on pathname
  const getActivePageFromPath = () => {
    const path = pathname || "";
    // Remove the base path - FIXED: Use correct path
    const cleanPath = path.replace(/^\/supar-admin-panel\/website-content/, '');

    for (const page of PAGE_TREE) {
      if (cleanPath === page.href || cleanPath === page.href + '/') {
        return page.id;
      }
      // Check for child pages
      if (page.children) {
        for (const child of page.children) {
          if (cleanPath === child.href || cleanPath === child.href + '/') {
            return child.id;
          }
        }
      }
    }
    // Default to home
    return "home";
  };

  const activePageId = getActivePageFromPath();
  const activePage = PAGE_TREE.find(p => p.id === activePageId) ||
    PAGE_TREE.flatMap(p => p.children || []).find(c => c.id === activePageId);

  const toggleParent = (id) => {
    setOpenParents(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const filteredTree = searchQuery
    ? PAGE_TREE.map(p => {
      const matchParent = p.label.toLowerCase().includes(searchQuery.toLowerCase());
      const matchedChildren = (p.children || []).filter(c =>
        c.label.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchParent || matchedChildren.length > 0) {
        return { ...p, children: matchParent ? p.children : matchedChildren };
      }
      return null;
    }).filter(Boolean)
    : PAGE_TREE;

  const renderPageIcon = (iconName, size = 14) => {
    const Icon = getIconComponent(iconName);
    return <Icon size={size} />;
  };

  // Check if sidebar should be visible
  const showSidebar = isSidebarOpen || isMobileSidebarOpen;

  return (
    <div className="wc-layout">
      {/* Mobile sidebar toggle */}
      <button
        className="wc-mobile-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Overlay for mobile */}
      {isMobileSidebarOpen && (
        <div className="wc-overlay" onClick={() => setIsMobileSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`wc-sidebar ${showSidebar ? 'open' : 'closed'}`}>
        <div className="wc-sidebar-header">
          <div className="wc-sidebar-brand">
            <span className="wc-sidebar-logo">📋</span>
            <span className="wc-sidebar-title">Website Content</span>
          </div>
          <button className="wc-sidebar-close" onClick={toggleSidebar}>
            <X size={18} />
          </button>
        </div>

        <div className="wc-page-tree">
          {filteredTree.map(page => {
            const hasChildren = page.children && page.children.length > 0;
            const isOpen = openParents[page.id];
            const isActive = activePageId === page.id;
            const hasActiveChild = hasChildren && (page.children || []).some(c => c.id === activePageId);

            return (
              <div key={page.id} className="wc-tree-parent">
                <Link
                  href={`/supar-admin-panel/website-content${page.href}`}
                  className={`wc-tree-parent-btn ${isActive ? "active" : ""} ${hasActiveChild ? "has-active-child" : ""}`}
                  onClick={(e) => {
                    if (hasChildren) {
                      e.preventDefault();
                      toggleParent(page.id);
                    }
                  }}
                >
                  <div className="wc-tree-page-icon">
                    {renderPageIcon(page.icon, 14)}
                  </div>
                  <span className="wc-tree-parent-label">{page.label}</span>
                  <span className="wc-tree-status" />
                  {hasChildren && (
                    <ChevronDown
                      className={`wc-tree-chevron ${isOpen ? "open" : ""}`}
                      size={16}
                    />
                  )}
                </Link>

                {hasChildren && (
                  <div className={`wc-tree-children ${isOpen ? "open" : ""}`}>
                    {(page.children || []).map(child => {
                      const isChildActive = activePageId === child.id;
                      return (
                        <Link
                          key={child.id}
                          href={`/supar-admin-panel/website-content${child.href}`}
                          className={`wc-tree-child-btn ${isChildActive ? "active" : ""}`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="wc-sidebar-footer">
          <div className="wc-sidebar-note">
            <Info size={10} />
            <span>Only Services subpages can be added</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="wc-main-content">
        {/* Page Content */}
        <div className="wc-page-content">
          {children}
        </div>
      </main>
    </div>
  );
}