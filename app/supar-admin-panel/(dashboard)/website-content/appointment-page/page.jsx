// app/supar-admin-panel/website-content/appointment-page/page.jsx
"use client";

import { useState } from "react";
import {
  Home,
  Calendar,
  Search,
  Eye,
  Save,
  RefreshCw,
  Check,
  Clock,
  ChevronDown,
  ExternalLink,
  CheckCircle,
  Shield,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  FileText,
  Headphones,
  UserPlus
} from "lucide-react";
import "./appointment.css";

const AppointmentPage = () => {
  const [selectedSection, setSelectedSection] = useState("appointment-cta");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  // Section definitions for Appointment Page
  const sections = [
    { id: "appointment-cta", label: "Appointment CTA", icon: Calendar },
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
      case "appointment-cta":
        return <AppointmentCTAEditor />;
      case "seo":
        return <SeoEditor />;
      default:
        return <AppointmentCTAEditor />;
    }
  };

  return (
    <div className="wc-appointment-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">Appointment Page</span>
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
                  <Calendar size={20} />
                </div>
                <div className="wc-page-info-text">
                  <h2>Appointment Page</h2>
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

// Appointment CTA Editor Component
const AppointmentCTAEditor = () => {
  const [data, setData] = useState({
    badge_text: "NOW ACCEPTING PATIENTS",
    heading: "Your Health Deserves Expert Care, Right Now.",
    subheading: "Connect with Bangladesh's leading specialists in seconds. Smart, secure, and built around your wellbeing—book an appointment in under two minutes.",
    features: [
      { id: 1, text: "Instant confirmation", icon: "CheckCircle" },
      { id: 2, text: "Free rescheduling", icon: "Calendar" },
      { id: 3, text: "SSL-encrypted data", icon: "Shield" },
      { id: 4, text: "Board-certified doctors", icon: "UserPlus" },
      { id: 5, text: "Digital reports delivered", icon: "FileText" },
      { id: 6, text: "24/7 support available", icon: "Headphones" }
    ]
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  const updateFeature = (id, value) => {
    set("features", data.features.map(f =>
      f.id === id ? { ...f, text: value } : f
    ));
  };

  const addFeature = () => {
    const newFeature = {
      id: Date.now(),
      text: "",
      icon: "CheckCircle"
    };
    set("features", [...data.features, newFeature]);
  };

  const removeFeature = (id) => {
    set("features", data.features.filter(f => f.id !== id));
  };

  const getIconComponent = (iconName) => {
    const icons = {
      CheckCircle: CheckCircle,
      Calendar: CalendarIcon,
      Shield: Shield,
      UserPlus: UserPlus,
      FileText: FileText,
      Headphones: Headphones
    };
    return icons[iconName] || CheckCircle;
  };

  return (
    <div className="wc-appointment-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Calendar size={15} /> Appointment CTA Content</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Badge Text</label>
              <input
                className="wc-input"
                value={data.badge_text}
                onChange={e => set("badge_text", e.target.value)}
                placeholder="e.g., NOW ACCEPTING PATIENTS"
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Heading <span className="required">*</span></label>
              <textarea
                className="wc-textarea"
                value={data.heading}
                onChange={e => set("heading", e.target.value)}
                rows={2}
                placeholder="Main heading for appointment section"
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Sub Heading</label>
              <textarea
                className="wc-textarea"
                value={data.subheading}
                onChange={e => set("subheading", e.target.value)}
                rows={3}
                placeholder="Supporting text for appointment section"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><CheckCircle size={15} /> Why Book With Us?</h3>
          <span className="wc-editor-card-desc">{data.features.length} features</span>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-features-grid">
            {data.features.map((feature) => {
              const IconComponent = getIconComponent(feature.icon);
              return (
                <div key={feature.id} className="wc-feature-item">
                  <div className="wc-feature-icon">
                    <IconComponent size={18} />
                  </div>
                  <input
                    className="wc-feature-input"
                    value={feature.text}
                    onChange={e => updateFeature(feature.id, e.target.value)}
                    placeholder="Enter feature text"
                  />
                  <button
                    className="wc-feature-remove"
                    onClick={() => removeFeature(feature.id)}
                    title="Remove feature"
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>
          <button className="wc-repeater-add" onClick={addFeature}>
            <Plus size={14} /> Add Feature
          </button>
        </div>
      </div>
    </div>
  );
};

// Seo Editor Component
const SeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "Book Appointment | Renova Life Care Bangladesh",
    meta_description: "Schedule your appointment with Renova Life Care's expert doctors. Book in-person, video consultation, or home visit. World-class healthcare across Bangladesh.",
    og_title: "Book Appointment | Renova Life Care",
    og_description: "Expert healthcare consultation at your convenience. Book now.",
    og_image: "/images/og-appointment.jpg",
    canonical_url: "https://renovalifecare.com/appointment",
    robots: "index, follow",
    keywords: "book appointment, healthcare consultation, Renova Life Care, doctor appointment Bangladesh"
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
              <label className="wc-field-label">
                Meta Title <span className="required">*</span>
                <span className="wc-field-counter">{data.meta_title.length}/60</span>
              </label>
              <input
                className="wc-input"
                value={data.meta_title}
                onChange={e => set("meta_title", e.target.value)}
                placeholder="Enter meta title (max 60 characters)"
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">
                Meta Description
                <span className="wc-field-counter">{data.meta_description.length}/160</span>
              </label>
              <textarea
                className="wc-textarea"
                value={data.meta_description}
                onChange={e => set("meta_description", e.target.value)}
                rows={3}
                placeholder="Enter meta description (max 160 characters)"
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Keywords</label>
              <input
                className="wc-input"
                value={data.keywords}
                onChange={e => set("keywords", e.target.value)}
                placeholder="Enter keywords separated by commas"
              />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Canonical URL</label>
              <input
                className="wc-input"
                value={data.canonical_url}
                onChange={e => set("canonical_url", e.target.value)}
              />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Robots Meta</label>
              <select
                className="wc-select"
                value={data.robots}
                onChange={e => set("robots", e.target.value)}
              >
                <option value="index, follow">index, follow</option>
                <option value="noindex, follow">noindex, follow</option>
                <option value="index, nofollow">index, nofollow</option>
                <option value="noindex, nofollow">noindex, nofollow</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><ExternalLink size={15} /> Open Graph (Social Sharing)</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">OG Title</label>
              <input
                className="wc-input"
                value={data.og_title}
                onChange={e => set("og_title", e.target.value)}
                placeholder="Open Graph title"
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">OG Description</label>
              <textarea
                className="wc-textarea"
                value={data.og_description}
                onChange={e => set("og_description", e.target.value)}
                rows={2}
                placeholder="Open Graph description"
              />
            </div>
            <div className="wc-field span-2">
              <ImageUploadField
                label="OG Image"
                hint="Recommended: 1200×630px for social sharing"
                value={data.og_image}
                onChange={(val) => set("og_image", val)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Calendar size={15} /> Schema Markup</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Medical Appointment Schema</label>
              <textarea
                className="wc-textarea xl"
                value={`{
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "name": "Book Appointment",
  "description": "Schedule your consultation with expert doctors",
  "url": "${data.canonical_url}",
  "about": {
    "@type": "MedicalOrganization",
    "name": "Renova Life Care Ltd.",
    "medicalSpecialty": "General Healthcare"
  },
  "potentialAction": {
    "@type": "ReserveAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "${data.canonical_url}/book",
      "inLanguage": "en-US",
      "actionPlatform": [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform"
      ]
    }
  }
}`}
                onChange={() => { }}
                style={{ fontFamily: 'monospace', fontSize: '12px' }}
              />
              <span className="wc-field-hint">This schema helps search engines understand your appointment booking page</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const ImageUploadField = ({ label, hint, value, onChange }) => {
  return (
    <div className="wc-field">
      <label className="wc-field-label">{label}</label>
      {value ? (
        <div className="wc-image-preview">
          <img src={value} alt={label} />
          <div className="wc-image-preview-actions">
            <button
              className="wc-img-action-btn"
              onClick={() => onChange?.(null)}
              title="Remove image"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      ) : (
        <div className="wc-image-upload" onClick={() => onChange?.("/images/og-placeholder.jpg")}>
          <div className="wc-image-upload-icon"><Upload size={20} /></div>
          <p>Click to upload image</p>
          <span>PNG, JPG, WEBP up to 5MB</span>
        </div>
      )}
      {hint && <span className="wc-field-hint">{hint}</span>}
    </div>
  );
};

// Icons used
const Plus = ({ size }) => (
  <svg width={size || 14} height={size || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const X = ({ size }) => (
  <svg width={size || 14} height={size || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Upload = ({ size }) => (
  <svg width={size || 20} height={size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

export default AppointmentPage;