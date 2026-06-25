"use client";

import { useState } from "react";
import {
  Layout,
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
  Grid,
  Play,
  Video,
  ExternalLink,
  Upload,
  Calendar,
  User,
  Tag,
  FileText
} from "lucide-react";
import "./videos-gallery.css";

const VideosGalleryPage = () => {
  const [selectedSection, setSelectedSection] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const sections = [
    { id: "hero", label: "Hero Section", icon: Layout },
    { id: "video-gallery", label: "Video Gallery", icon: Video },
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
      case "video-gallery":
        return <VideoGalleryEditor />;
      case "seo":
        return <SeoEditor />;
      default:
        return <HeroEditor />;
    }
  };

  return (
    <div className="wc-videos-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">Videos Gallery</span>
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
                  <Video size={20} />
                </div>
                <div className="wc-page-info-text">
                  <h2>Videos Gallery</h2>
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
    trust_badge_text: "VIDEO LIBRARY",
    headline: "Watch & Learn: Medical Videos",
    description: "Expert insights, patient stories, and health education — all in one place.",
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

// Video Gallery Editor
const VideoGalleryEditor = () => {
  const [data, setData] = useState({
    section_label: "Video Library",
    heading: "Medical Videos & Insights",
    subheading: "Expert knowledge at your fingertips.",
    categories: [
      { id: "all", label: "All Videos", count: 12 },
      { id: "procedures", label: "Procedures", count: 3 },
      { id: "testimonials", label: "Testimonials", count: 3 }
    ],
    videos: []
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Video size={15} /> Gallery Section</h3>
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
          <h3 className="wc-editor-card-title"><Grid size={15} /> Video Categories</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-video-categories">
            {data.categories.map((cat, i) => (
              <div key={i} className="wc-video-category">
                <input className="wc-input" value={cat.label} onChange={e => {
                  const c = [...data.categories];
                  c[i] = { ...c[i], label: e.target.value };
                  set("categories", c);
                }} />
                <input className="wc-input" value={cat.count} onChange={e => {
                  const c = [...data.categories];
                  c[i] = { ...c[i], count: e.target.value };
                  set("categories", c);
                }} style={{ width: '80px' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Video size={15} /> Videos</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-video-grid">
            <div className="wc-video-item">
              <div className="wc-video-thumb">
                <div className="wc-video-play-icon"><Play size={32} /></div>
                <ImageUploadField label="" hint="Click to upload thumbnail" />
              </div>
              <div className="wc-video-info">
                <input className="wc-input" placeholder="Video Title" style={{ fontWeight: 700 }} />
                <textarea className="wc-textarea" placeholder="Video Description" rows={2} />
                <div className="wc-video-meta">
                  <input className="wc-input" placeholder="Category" />
                  <input className="wc-input" placeholder="Views (e.g. 12.5K views)" />
                </div>
                <div className="wc-video-meta">
                  <input className="wc-input" placeholder="Date" />
                  <input className="wc-input" placeholder="Duration (e.g. 6:40)" />
                </div>
                <input className="wc-input" placeholder="Video URL / Embed Code" />
                <button className="wc-btn wc-btn-danger"><Trash size={14} /> Remove Video</button>
              </div>
            </div>
          </div>
          <button className="wc-repeater-add"><Plus size={14} /> Add Video</button>
        </div>
      </div>
    </div>
  );
};

// SEO Editor
const SeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "Medical Videos — Watch & Learn | Renova Life Care",
    meta_description: "Watch expert medical videos, patient stories, and health education content.",
    og_title: "Medical Video Library | Renova Life Care",
    og_description: "Expert insights, patient stories, and health education videos.",
    og_image: "/images/og-videos.jpg",
    canonical_url: "https://renovalifecare.com/videos",
    robots: "index, follow",
    keywords: "medical videos Bangladesh, health education, patient stories"
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

// Helper Components
const ImageUploadField = ({ label, hint }) => {
  return (
    <div className="wc-field">
      <label className="wc-field-label">{label}</label>
      <div className="wc-image-upload">
        <div className="wc-image-upload-icon"><Upload size={20} /></div>
        <p>Click to browse</p>
        <span>{hint}</span>
      </div>
    </div>
  );
};

export default VideosGalleryPage;