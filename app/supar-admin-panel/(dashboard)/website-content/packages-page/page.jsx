"use client";

import { useState } from "react";
import {
  Package,
  Layout,
  List,
  Search,
  Clock,
  Check,
  ChevronDown,
  Save,
  RefreshCw,
  Eye,
  Plus,
  Trash,
  X,
  Info,
  Tag,
  Users,
  Calendar,
  MessageCircle,
  Award,
  ExternalLink,
  Upload
} from "lucide-react";
import "./packages.css";

const PackagesPage = () => {
  const [selectedSection, setSelectedSection] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const sections = [
    { id: "hero", label: "Hero Section", icon: Layout },
    { id: "packages-listing", label: "Packages List", icon: List },
    { id: "seo", label: "SEO & Meta", icon: Search }
  ];

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 900));
    setSaving(false);
    showToast("Changes saved successfully!", "success");
  };

  const showToast = (msg, type = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "success" }), 3000);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "hero":
        return <HeroEditor />;
      case "packages-listing":
        return <PackagesListingEditor />;
      case "seo":
        return <SeoEditor />;
      default:
        return <HeroEditor />;
    }
  };

  return (
    <div className="wc-packages-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">Packages</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">{sections.find(s => s.id === selectedSection)?.label}</span>
          </div>

          <div className="wc-topbar-actions">
            <div className="wc-status-dot">Live</div>
            <button className="wc-btn wc-btn-ghost">
              <Eye size={14} /> Preview
            </button>
            <button className="wc-btn wc-btn-ghost">
              <RefreshCw size={14} /> Reset
            </button>
            <button className="wc-btn wc-btn-success" onClick={handleSave} disabled={saving}>
              {saving ? (
                <><RefreshCw size={14} className="spinning" /> Saving...</>
              ) : (
                <><Save size={14} /> Save Changes</>
              )}
            </button>
          </div>
        </div>

        <div className="wc-editor-body">
          <nav className="wc-sections-nav">
            <div className="wc-sections-title">Sections</div>
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  className={`wc-section-tab ${selectedSection === section.id ? "active" : ""}`}
                  onClick={() => setSelectedSection(section.id)}
                >
                  <Icon size={14} />
                  {section.label}
                  {section.id === "seo" && <span className="wc-section-tab-badge">SEO</span>}
                </button>
              );
            })}
          </nav>

          <div className="wc-content-panel">
            <div className="wc-page-info-banner">
              <div className="wc-page-info-left">
                <div className="wc-page-info-icon">
                  <Package size={20} />
                </div>
                <div className="wc-page-info-text">
                  <h2>Packages Page</h2>
                  <p>Editing: {sections.find(s => s.id === selectedSection)?.label}</p>
                </div>
              </div>
              <div className="wc-page-info-meta">
                <span className="wc-meta-tag live">
                  <Check size={11} />
                  Published
                </span>
                <span className="wc-meta-tag">
                  <Clock size={11} />
                  Last saved: Just now
                </span>
              </div>
            </div>

            {renderContent()}
          </div>
        </div>
      </div>

      <div className={`wc-toast ${toast.type} ${toast.show ? "show" : ""}`}>
        <Check size={16} />
        {toast.msg}
      </div>
    </div>
  );
};

// Hero Editor
const HeroEditor = () => {
  const [data, setData] = useState({
    trust_badge_text: "HEALTH PACKAGES",
    headline: "Our Health Packages & Discounts",
    description: "Comprehensive diagnostic packages for your family's well-being. All prices in BDT.",
    background_images: [],
    stats: []
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Layout size={15} /> Hero Content</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Trust Badge Text</label>
              <input className="wc-input" value={data.trust_badge_text} onChange={e => set("trust_badge_text", e.target.value)} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Main Headline <span className="required">*</span></label>
              <textarea className="wc-textarea" value={data.headline} onChange={e => set("headline", e.target.value)} rows={2} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Description</label>
              <textarea className="wc-textarea" value={data.description} onChange={e => set("description", e.target.value)} rows={3} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Packages Listing Editor
const PackagesListingEditor = () => {
  const [data, setData] = useState({
    custom_note: "Custom packages available for corporate health programs.",
    contact_link_text: "Contact us →",
    contact_link_url: "/contact",
    packages: []
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Info size={15} /> Bottom Note</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Custom Package Note</label>
              <input className="wc-input" value={data.custom_note} onChange={e => set("custom_note", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Contact Link Text</label>
              <input className="wc-input" value={data.contact_link_text} onChange={e => set("contact_link_text", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Contact Link URL</label>
              <input className="wc-input" value={data.contact_link_url} onChange={e => set("contact_link_url", e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Package size={15} /> Health Packages</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-packages-grid">
            <div className="wc-package-card">
              <div className="wc-package-header">
                <input className="wc-input" placeholder="Package Name" style={{ fontWeight: 700 }} />
                <input className="wc-input" placeholder="Badge (e.g. SAVE 13%)" style={{ width: '40%' }} />
              </div>
              <input className="wc-input" placeholder="Package type description" />
              
              <div className="wc-package-items">
                <div className="wc-package-item">
                  <input className="wc-input" placeholder="Test name" style={{ flex: 2 }} />
                  <input className="wc-input" placeholder="BDT 400.00" style={{ flex: 1 }} />
                  <button className="wc-btn wc-btn-danger"><X size={14} /></button>
                </div>
                <button className="wc-btn wc-btn-ghost"><Plus size={14} /> Add Test Item</button>
              </div>

              <div className="wc-package-pricing">
                <input className="wc-input" placeholder="Total Cost (strikethrough)" />
                <input className="wc-input" placeholder="Discounted Price" style={{ borderColor: '#014fa1', fontWeight: 700 }} />
              </div>
              <button className="wc-btn wc-btn-danger"><Trash size={14} /> Remove Package</button>
            </div>
          </div>
          <button className="wc-repeater-add"><Plus size={14} /> Add Package</button>
        </div>
      </div>
    </div>
  );
};

// SEO Editor
const SeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "Health Packages & Discounts | Renova Life Care Ltd.",
    meta_description: "Comprehensive diagnostic packages for your family's well-being. All prices in BDT.",
    og_title: "Our Health Packages & Discounts",
    og_description: "Comprehensive diagnostic packages for your family's well-being.",
    og_image: "/images/og-packages.jpg",
    canonical_url: "https://renovalifecare.com/packages",
    robots: "index, follow",
    keywords: "health packages Bangladesh, diagnostic packages, health checkup BDT"
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-seo-preview">
        <div className="wc-seo-preview-label">Google Search Preview</div>
        <div className="wc-seo-preview-url">{data.canonical_url}</div>
        <div className="wc-seo-preview-title">{data.meta_title}</div>
        <p className="wc-seo-preview-desc">{data.meta_description}</p>
      </div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Search size={15} /> Meta Tags</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Meta Title <span className="required">*</span></label>
              <input className="wc-input" value={data.meta_title} onChange={e => set("meta_title", e.target.value)} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Meta Description</label>
              <textarea className="wc-textarea" value={data.meta_description} onChange={e => set("meta_description", e.target.value)} rows={3} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Keywords</label>
              <input className="wc-input" value={data.keywords} onChange={e => set("keywords", e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;