// app/supar-admin-panel/website-content/partners-page/page.jsx
"use client";

import { useState } from "react";
import {
  Home,
  Layout,
  Award,
  Search,
  Eye,
  Save,
  RefreshCw,
  Check,
  Image as ImageIcon,
  Upload,
  Plus,
  X,
  Clock,
  ChevronDown,
  List,
  ExternalLink,
  Users
} from "lucide-react";
import "./partners.css";
import "../website-content.css";

const PartnersPage = () => {
  const [selectedSection, setSelectedSection] = useState("partners");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  // Section definitions for Partners Page
  const sections = [
    { id: "partners", label: "Partners & Affiliations", icon: Award },
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
      case "partners":
        return <PartnersEditor />;
      case "seo":
        return <SeoEditor />;
      default:
        return <PartnersEditor />;
    }
  };

  return (
    <div className="wc-home-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">Partners Page</span>
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
                  <Award size={20} />
                </div>
                <div className="wc-page-info-text">
                  <h2>Partners Page</h2>
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

// Partners Editor Component
const PartnersEditor = () => {
  const [data, setData] = useState({
    section_label: "Our Trusted Partners",
    heading: "Affiliations & Partnerships",
    subheading: "We collaborate with leading healthcare organizations worldwide.",
    partners: [
      { id: 1, name: "World Health Organization", logo: "/images/partners/who.png", website: "https://www.who.int" },
      { id: 2, name: "Bangladesh Medical Association", logo: "/images/partners/bma.png", website: "https://www.bma.org" },
      { id: 3, name: "International Red Cross", logo: "/images/partners/redcross.png", website: "https://www.icrc.org" },
      { id: 4, name: "Dhaka Medical College", logo: "/images/partners/dmc.png", website: "https://www.dmc.gov.bd" },
      { id: 5, name: "World Medical Association", logo: "/images/partners/wma.png", website: "https://www.wma.net" },
      { id: 6, name: "Bangladesh Health Ministry", logo: "/images/partners/health-ministry.png", website: "https://www.mohfw.gov.bd" }
    ]
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  const addPartner = () => {
    const newPartner = {
      id: Date.now(),
      name: "",
      logo: "",
      website: ""
    };
    set("partners", [...data.partners, newPartner]);
  };

  const removePartner = (id) => {
    set("partners", data.partners.filter(p => p.id !== id));
  };

  const updatePartner = (id, field, value) => {
    set("partners", data.partners.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  return (
    <div className="wc-home-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Award size={15} /> Partners Section</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field">
              <label className="wc-field-label">Section Label</label>
              <input
                className="wc-input"
                value={data.section_label}
                onChange={e => set("section_label", e.target.value)}
              />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Number of Partners</label>
              <span className="wc-field-hint">{data.partners.length} partners</span>
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Heading <span className="required">*</span></label>
              <input
                className="wc-input"
                value={data.heading}
                onChange={e => set("heading", e.target.value)}
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Sub Heading</label>
              <textarea
                className="wc-textarea"
                value={data.subheading}
                onChange={e => set("subheading", e.target.value)}
                rows={2}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Users size={15} /> Partner Logos</h3>
          <span className="wc-editor-card-desc">{data.partners.length} partners</span>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-repeater-partners">
            {data.partners.map((partner) => (
              <div key={partner.id} className="wc-repeater-item">
                <div className="wc-repeater-drag">
                  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="12" r="1" />
                    <circle cx="15" cy="12" r="1" />
                    <circle cx="9" cy="16" r="1" />
                    <circle cx="15" cy="16" r="1" />
                    <circle cx="9" cy="8" r="1" />
                    <circle cx="15" cy="8" r="1" />
                  </svg>
                </div>

                {partner.logo ? (
                  <div className="wc-image-preview">
                    <img src={partner.logo} alt={partner.name} />
                    <div className="wc-image-preview-actions">
                      <button
                        className="wc-img-action-btn"
                        onClick={() => updatePartner(partner.id, "logo", "")}
                        title="Remove logo"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="wc-image-upload" onClick={() => updatePartner(partner.id, "logo", "/images/partners/placeholder.png")}>
                    <div className="wc-image-upload-icon"><Upload size={16} /></div>
                    <p>Upload Logo</p>
                    <span>PNG, JPG</span>
                  </div>
                )}

                <input
                  placeholder="Partner Name *"
                  value={partner.name}
                  onChange={e => updatePartner(partner.id, "name", e.target.value)}
                />
                <input
                  placeholder="Website URL"
                  value={partner.website}
                  onChange={e => updatePartner(partner.id, "website", e.target.value)}
                />
                <button className="wc-repeater-remove" onClick={() => removePartner(partner.id)}>
                  <X size={13} /> Remove
                </button>
              </div>
            ))}
            <button className="wc-repeater-add" onClick={addPartner}>
              <Plus size={14} /> Add Partner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Seo Editor Component
const SeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "Our Partners & Affiliations | Renova Life Care Bangladesh",
    meta_description: "Discover our trusted partners and affiliations at Renova Life Care. We collaborate with leading healthcare organizations to deliver world-class medical services.",
    og_title: "Partners & Affiliations | Renova Life Care",
    og_description: "Renova Life Care's strategic partnerships with global healthcare leaders.",
    og_image: "/images/og-partners.jpg",
    canonical_url: "https://renovalifecare.com/partners",
    robots: "index, follow",
    keywords: "healthcare partners, medical affiliations, Renova Life Care, Bangladesh healthcare partnerships"
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

export default PartnersPage;