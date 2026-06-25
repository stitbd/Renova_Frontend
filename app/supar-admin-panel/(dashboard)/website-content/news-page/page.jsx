// super-admin-panel/website-content/news-page/page.jsx
"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import {
  Home,
  Info,
  Users,
  Target,
  Award,
  Clock,
  Heart,
  Star,
  Layout,
  Image as ImageIcon,
  User,
  UserPlus,
  Phone,
  Mail,
  Search,
  Save,
  Eye,
  Trash,
  Upload,
  RefreshCw,
  ExternalLink,
  Check,
  Plus,
  X,
  ChevronDown,
  List,
  UserCheck,
  FileText,
  Calendar,
  Newspaper,
  Tag
} from "lucide-react";
import "./news.css";

/* ══════════════════════════════════════════════════════════════
   INITIAL NEWS PAGE DATA
   ══════════════════════════════════════════════════════════════ */
const INITIAL_NEWS_DATA = {
  hero: {
    trust_badge_text: "NEWS",
    headline: "Latest News & Updates",
    description: "Stay up-to-date with the latest announcements, events, and developments at Renova Life Care.",
    background_images: [],
    stats: []
  },
  newsList: {
    section_label: "News & Announcements",
    heading: "Company News",
    subheading: "Important updates and announcements from Renova Life Care.",
    news_items: [
      {
        id: "news-1",
        date: "Dec 15, 2024",
        title: "Renova Life Care Opens New Diagnostic Center",
        summary: "We are proud to announce the opening of our new state-of-the-art diagnostic center in Gulshan.",
        category: "Expansion",
        source: "Company Announcement",
        link: "/news/new-diagnostic-center"
      },
      {
        id: "news-2",
        date: "Dec 10, 2024",
        title: "Free Health Camp in Dhanmondi",
        summary: "Renova Life Care organized a free health camp serving over 500 patients in the community.",
        category: "Community Service",
        source: "Event Report",
        link: "/news/health-camp-dhanmondi"
      }
    ]
  },
  seo: {
    meta_title: "News & Updates — Renova Life Care Bangladesh",
    meta_description: "Latest news, announcements, and updates from Renova Life Care.",
    og_title: "Company News & Updates",
    og_description: "Stay informed with the latest news.",
    og_image: "/images/og-news.jpg",
    canonical_url: "https://renovalifecare.com/news",
    robots: "index, follow",
    keywords: "news, updates, announcements, Renova Life Care"
  }
};

/* ══════════════════════════════════════════════════════════════
   FIELD COMPONENTS
   ══════════════════════════════════════════════════════════════ */
const ImageUploadField = ({ label, hint, value, onChange }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0 && onChange) {
      const url = URL.createObjectURL(files[0]);
      onChange(url);
    }
    e.target.value = "";
  };

  return (
    <div className="wc-field">
      <label className="wc-field-label">{label}</label>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {value ? (
        <div className="wc-image-preview">
          <img src={value} alt="preview" />
          <div className="wc-image-preview-actions">
            <button className="wc-img-action-btn" onClick={() => onChange?.("")} title="Remove">
              <Trash size={13} />
            </button>
            <button className="wc-img-action-btn" onClick={handleClick} title="Replace">
              <Upload size={13} />
            </button>
          </div>
        </div>
      ) : (
        <div className="wc-image-upload" onClick={handleClick}>
          <div className="wc-image-upload-icon"><Upload size={20} /></div>
          <p>Click to browse from desktop</p>
          <span>PNG, JPG, WEBP up to 5MB</span>
        </div>
      )}
      {hint && <span className="wc-field-hint">{hint}</span>}
    </div>
  );
};

const ToggleSwitch = ({ label, desc, checked, onChange }) => (
  <div className="wc-toggle-row">
    <div className="wc-toggle-info">
      <h4>{label}</h4>
      {desc && <p>{desc}</p>}
    </div>
    <label className="wc-switch">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <span className="wc-switch-slider" />
    </label>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   HERO EDITOR
   ══════════════════════════════════════════════════════════════ */
const HeroEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });

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
              <input className="wc-input" value={data?.trust_badge_text || ""} onChange={e => set("trust_badge_text", e.target.value)} placeholder="NEWS" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Main Headline <span className="required">*</span></label>
              <textarea className="wc-textarea" value={data?.headline || ""} onChange={e => set("headline", e.target.value)} rows={2} placeholder="Latest News & Updates" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Description</label>
              <textarea className="wc-textarea" value={data?.description || ""} onChange={e => set("description", e.target.value)} rows={3} placeholder="Stay up-to-date with the latest announcements..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   NEWS LIST EDITOR
   ══════════════════════════════════════════════════════════════ */
const NewsListEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });

  const addNewsItem = () => ({
    id: `news-${Date.now()}`,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    title: "New News Item",
    summary: "Enter news summary here...",
    category: "General",
    source: "Source",
    link: "/news/new-item"
  });

  const updateItem = (index, field, value) => {
    const items = [...(data?.news_items || [])];
    items[index] = { ...items[index], [field]: value };
    set("news_items", items);
  };

  const removeItem = (index) => {
    const items = [...(data?.news_items || [])];
    items.splice(index, 1);
    set("news_items", items);
  };

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Newspaper size={15} /> News Section</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field">
              <label className="wc-field-label">Section Label</label>
              <input className="wc-input" value={data?.section_label || ""} onChange={e => set("section_label", e.target.value)} placeholder="News & Announcements" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Heading <span className="required">*</span></label>
              <input className="wc-input" value={data?.heading || ""} onChange={e => set("heading", e.target.value)} placeholder="Company News" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Sub Heading</label>
              <textarea className="wc-textarea" value={data?.subheading || ""} onChange={e => set("subheading", e.target.value)} rows={2} placeholder="Important updates and announcements..." />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Newspaper size={15} /> News Items</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-news-grid">
            {(data?.news_items || []).map((item, index) => (
              <div key={item.id || index} className="wc-news-item">
                <div className="wc-news-date">
                  <input 
                    className="wc-input" 
                    value={item.date || ""} 
                    onChange={e => updateItem(index, "date", e.target.value)} 
                    placeholder="Date"
                  />
                </div>
                <div className="wc-news-content">
                  <input 
                    className="wc-input" 
                    value={item.title || ""} 
                    onChange={e => updateItem(index, "title", e.target.value)} 
                    placeholder="News Title" 
                    style={{ fontWeight: 700 }} 
                  />
                  <textarea 
                    className="wc-textarea" 
                    value={item.summary || ""} 
                    onChange={e => updateItem(index, "summary", e.target.value)} 
                    placeholder="News Summary" 
                    rows={2} 
                  />
                  <div className="wc-news-meta">
                    <input 
                      className="wc-input" 
                      value={item.category || ""} 
                      onChange={e => updateItem(index, "category", e.target.value)} 
                      placeholder="Category" 
                    />
                    <input 
                      className="wc-input" 
                      value={item.source || ""} 
                      onChange={e => updateItem(index, "source", e.target.value)} 
                      placeholder="Source" 
                    />
                  </div>
                  <input 
                    className="wc-input" 
                    value={item.link || ""} 
                    onChange={e => updateItem(index, "link", e.target.value)} 
                    placeholder="Link URL" 
                  />
                  <button className="wc-btn wc-btn-danger" onClick={() => removeItem(index)}>
                    <Trash size={14} /> Remove News
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="wc-repeater-add" onClick={() => set("news_items", [...(data?.news_items || []), addNewsItem()])}>
            <Plus size={14} /> Add News Item
          </button>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   SEO EDITOR
   ══════════════════════════════════════════════════════════════ */
const SeoEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });
  const titleLen = (data?.meta_title || "").length;
  const descLen = (data?.meta_description || "").length;

  return (
    <div>
      <div className="wc-seo-preview">
        <div className="wc-seo-preview-label">Google Search Preview</div>
        <div className="wc-seo-preview-url">{data?.canonical_url || "https://renovalifecare.com/news"}</div>
        <div className="wc-seo-preview-title">{data?.meta_title || "News & Updates"}</div>
        <p className="wc-seo-preview-desc">{data?.meta_description || "Latest news and updates..."}</p>
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
                <span className={`wc-field-counter ${titleLen > 60 ? "warn" : ""}`}>{titleLen}/70</span>
              </label>
              <input className="wc-input" value={data?.meta_title || ""} onChange={e => set("meta_title", e.target.value)} placeholder="News & Updates — Renova Life Care" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">
                Meta Description
                <span className={`wc-field-counter ${descLen > 155 ? "warn" : ""}`}>{descLen}/170</span>
              </label>
              <textarea className="wc-textarea" value={data?.meta_description || ""} onChange={e => set("meta_description", e.target.value)} rows={3} placeholder="Latest news and updates from Renova Life Care..." />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Keywords</label>
              <input className="wc-input" value={data?.keywords || ""} onChange={e => set("keywords", e.target.value)} placeholder="news, updates, announcements" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Canonical URL</label>
              <input className="wc-input" value={data?.canonical_url || ""} onChange={e => set("canonical_url", e.target.value)} placeholder="https://renovalifecare.com/news" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Robots</label>
              <select className="wc-select" value={data?.robots || "index, follow"} onChange={e => set("robots", e.target.value)}>
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
              <input className="wc-input" value={data?.og_title || ""} onChange={e => set("og_title", e.target.value)} placeholder="Company News & Updates" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">OG Description</label>
              <textarea className="wc-textarea" value={data?.og_description || ""} onChange={e => set("og_description", e.target.value)} rows={2} />
            </div>
            <div className="wc-field span-2">
              <ImageUploadField label="OG Image" hint="Recommended: 1200×630px" value={data?.og_image} onChange={v => set("og_image", v)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   SECTION RENDERER
   ══════════════════════════════════════════════════════════════ */
const SectionEditor = ({ sectionId, data, onChange }) => {
  if (sectionId === "hero") return <HeroEditor data={data} onChange={onChange} />;
  if (sectionId === "news-list") return <NewsListEditor data={data} onChange={onChange} />;
  if (sectionId === "seo") return <SeoEditor data={data} onChange={onChange} />;
  return <div className="wc-empty-state">Unknown section: {sectionId}</div>;
};

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function NewsPage() {
  const [selectedSection, setSelectedSection] = useState("hero");
  const [pageData, setPageData] = useState(INITIAL_NEWS_DATA);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });
  const toastTimeout = useRef(null);

  const showToast = useCallback((msg, type = "success") => {
    setToast({ show: true, msg, type });
    clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToast(t => ({ ...t, show: false })), 3000);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 900));
    setSaving(false);
    showToast("News page changes saved successfully!", "success");
  };

  const handlePreview = () => {
    window.open("/news", "_blank");
  };

  const handleReset = () => {
    if (confirm("Reset all News page content to default? This cannot be undone.")) {
      setPageData(INITIAL_NEWS_DATA);
      showToast("Reset to default content", "success");
    }
  };

  const sections = [
    { id: "hero", label: "Hero Section", icon: Layout },
    { id: "news-list", label: "News List", icon: Newspaper },
    { id: "seo", label: "SEO & Meta", icon: Search }
  ];

  const currentSection = sections.find(s => s.id === selectedSection);
  const currentData = pageData[selectedSection] || {};

  const handleDataChange = (newData) => {
    setPageData(prev => ({
      ...prev,
      [selectedSection]: newData,
    }));
  };

  // Get the appropriate icon component
  const getIcon = (iconType) => {
    const iconMap = {
      Layout: Layout,
      Newspaper: Newspaper,
      Search: Search
    };
    return iconMap[iconType.name] || Layout;
  };

  return (
    <div className="wc-news-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <Link href="/super-admin-panel/website-content" className="wc-breadcrumb-link">
              Website Content
            </Link>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="wc-breadcrumb-current">News Page</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="wc-breadcrumb-current">{currentSection?.label}</span>
          </div>

          <div className="wc-topbar-actions">
            <div className="wc-status-dot">Published</div>
            <button className="wc-btn wc-btn-ghost" onClick={handlePreview}>
              <Eye size={14} /> Preview
            </button>
            <button className="wc-btn wc-btn-ghost" onClick={handleReset}>
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
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  className={`wc-section-tab ${selectedSection === section.id ? "active" : ""}`}
                  onClick={() => setSelectedSection(section.id)}
                >
                  <IconComponent size={14} />
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
                  <Newspaper size={22} />
                </div>
                <div className="wc-page-info-text">
                  <h2>News Page Content</h2>
                  <p>Editing: {currentSection?.label}</p>
                </div>
              </div>
              <div className="wc-page-info-meta">
                <span className="wc-meta-tag">
                  <ExternalLink size={11} />
                  /news
                </span>
                <span className="wc-meta-tag">
                  <Clock size={11} />
                  Last saved: Just now
                </span>
              </div>
            </div>

            <SectionEditor
              sectionId={selectedSection}
              data={currentData}
              onChange={handleDataChange}
            />
          </div>
        </div>
      </div>

      <div className={`wc-toast ${toast.type} ${toast.show ? "show" : ""}`}>
        <Check size={16} />
        {toast.msg}
      </div>
    </div>
  );
}