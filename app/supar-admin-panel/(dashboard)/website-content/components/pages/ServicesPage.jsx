"use client";

import { useState } from "react";
import {
  Activity,
  Layout,
  Grid,
  Star,
  Search,
  Clock,
  Check,
  ChevronDown,
  Save,
  RefreshCw,
  Eye,
  Plus,
  List,
  Image as ImageIcon,
  Heart,
  Users,
  Calendar,
  MessageCircle,
  Award,
  ExternalLink,
  Upload,
  Trash,
  X,
  Package,
  ShoppingBag,
  FileText,
  MapPin,
  Phone,
  Mail,
  User,
  Target
} from "lucide-react";
import "./styles/services.css";

const ServicesPage = () => {
  const [selectedSection, setSelectedSection] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const sections = [
    { id: "hero", label: "Hero Section", icon: Layout },
    { id: "services-grid", label: "Services Grid", icon: Grid },
    { id: "features", label: "Features / Why Us", icon: Star },
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
      case "services-grid":
        return <ServicesGridEditor />;
      case "features":
        return <FeaturesEditor />;
      case "seo":
        return <SeoEditor />;
      default:
        return <HeroEditor />;
    }
  };

  return (
    <div className="wc-services-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">Services</span>
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
                  <Activity size={20} />
                </div>
                <div className="wc-page-info-text">
                  <h2>Services Page</h2>
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
    trust_badge_text: "OUR SERVICES",
    headline: "Comprehensive Diagnostic & Healthcare Services",
    description: "From routine checkups to advanced diagnostics, we offer a full spectrum of healthcare services under one roof.",
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

// Services Grid Editor
const ServicesGridEditor = () => {
  const [data, setData] = useState({
    section_label: "Our Services",
    heading: "World-Class Healthcare Services",
    subheading: "Explore our comprehensive range of diagnostic and healthcare services.",
    services: []
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Grid size={15} /> Services Grid Section</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field">
              <label className="wc-field-label">Section Label</label>
              <input className="wc-input" value={data.section_label} onChange={e => set("section_label", e.target.value)} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Heading <span className="required">*</span></label>
              <input className="wc-input" value={data.heading} onChange={e => set("heading", e.target.value)} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Sub Heading</label>
              <textarea className="wc-textarea" value={data.subheading} onChange={e => set("subheading", e.target.value)} rows={2} />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Grid size={15} /> Service Cards</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-services-grid">
            <div className="wc-service-card">
              <div className="wc-service-card-icon">
                <Heart size={24} />
              </div>
              <input className="wc-input" placeholder="Service Title" />
              <textarea className="wc-textarea" placeholder="Service Description" rows={3} />
              <div className="wc-service-card-actions">
                <input className="wc-input" placeholder="Icon name" style={{ width: '60%' }} />
                <button className="wc-btn wc-btn-danger"><Trash size={14} /> Remove</button>
              </div>
            </div>
          </div>
          <button className="wc-repeater-add"><Plus size={14} /> Add Service</button>
        </div>
      </div>
    </div>
  );
};

// Features Editor
const FeaturesEditor = () => {
  const [data, setData] = useState({
    section_label: "Why Choose Us",
    heading: "Why Renova Life Care?",
    subheading: "We are committed to providing the highest quality healthcare services.",
    features: [
      { icon: "star", title: "Expert Team", description: "BMDC-certified specialists" },
      { icon: "heart", title: "Compassionate Care", description: "Patient-first approach" },
      { icon: "award", title: "Quality Assurance", description: "ISO certified processes" },
      { icon: "clock", title: "Timely Service", description: "On-time appointments" }
    ]
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Star size={15} /> Features Section</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field">
              <label className="wc-field-label">Section Label</label>
              <input className="wc-input" value={data.section_label} onChange={e => set("section_label", e.target.value)} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Heading <span className="required">*</span></label>
              <input className="wc-input" value={data.heading} onChange={e => set("heading", e.target.value)} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Sub Heading</label>
              <textarea className="wc-textarea" value={data.subheading} onChange={e => set("subheading", e.target.value)} rows={2} />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Star size={15} /> Feature Items</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-features-grid">
            {data.features.map((feature, i) => (
              <div key={i} className="wc-feature-item">
                <input className="wc-input" value={feature.title} onChange={e => {
                  const f = [...data.features];
                  f[i] = { ...f[i], title: e.target.value };
                  set("features", f);
                }} placeholder="Feature Title" />
                <textarea className="wc-textarea" value={feature.description} onChange={e => {
                  const f = [...data.features];
                  f[i] = { ...f[i], description: e.target.value };
                  set("features", f);
                }} placeholder="Feature description" rows={2} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// SEO Editor
const SeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "Healthcare Services — Diagnostics & Treatments | Renova Life Care",
    meta_description: "Comprehensive diagnostic and healthcare services in Bangladesh.",
    og_title: "Our Healthcare Services",
    og_description: "Full spectrum of healthcare services under one roof.",
    og_image: "/images/og-services.jpg",
    canonical_url: "https://renovalifecare.com/services",
    robots: "index, follow",
    keywords: "healthcare services Bangladesh, diagnostic services, treatment"
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

// Helper Components (ImageUploadField, Repeater, ToggleSwitch)
// Same as in HomePage.jsx

export default ServicesPage;