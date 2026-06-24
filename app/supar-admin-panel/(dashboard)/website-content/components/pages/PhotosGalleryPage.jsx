// super-admin-panel/website-content/image-gallery-page/page.jsx
"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import "./image-gallery-page.css";
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
  Trash2,
  Upload,
  RefreshCw,
  ExternalLink,
  Check,
  Plus,
  X,
  ChevronDown,
  List,
  Camera,
  Film,
  Grid3x3,
  ZoomIn,
  Download,
  Share2,
  Calendar,
  Tag,
  FolderOpen,
  ImageUp,
  Palette,
  GalleryHorizontal,
  ImageOff,
  Images
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   ICON COMPONENT — uses Lucide React
   ══════════════════════════════════════════════════════════════ */
const Icon = ({ name, size = 14, className = "" }) => {
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
    trash: Trash2,
    upload: Upload,
    refresh: RefreshCw,
    external: ExternalLink,
    check: Check,
    plus: Plus,
    x: X,
    "chevron-down": ChevronDown,
    list: List,
    camera: Camera,
    film: Film,
    grid: Grid3x3,
    zoom: ZoomIn,
    download: Download,
    share: Share2,
    calendar: Calendar,
    tag: Tag,
    folder: FolderOpen,
    imageup: ImageUp,
    palette: Palette,
    gallery: GalleryHorizontal,
    imageoff: ImageOff,
    images: Images
  };

  const IconComponent = iconMap[name];
  if (IconComponent) {
    return <IconComponent size={size} className={className} />;
  }

  // Fallback: render nothing if icon not found
  return null;
};

/* ══════════════════════════════════════════════════════════════
   INITIAL IMAGE GALLERY PAGE DATA
   ══════════════════════════════════════════════════════════════ */
const INITIAL_GALLERY_DATA = {
  hero: {
    section_header_title: "Photo Gallery",
    section_header_subtitle: "Explore our state-of-the-art facilities, expert medical team, and patient care moments.",
    section_description: "A visual journey through our healthcare center, expert medical team, and commitment to patient care."
  },
  gallery: {
    title: "Medical Facilities Gallery",
    subtitle: "Browse through our collection of healthcare images",
    categories: [
      { id: "facilities", label: "Facilities", icon: "building" },
      { id: "doctors", label: "Doctors", icon: "user" },
      { id: "equipment", label: "Equipment", icon: "camera" },
      { id: "events", label: "Events", icon: "calendar" }
    ],
    view_all_text: "View All",
    no_results_text: "No photos found",
    clear_filters_text: "Clear Filters"
  },
  lightbox: {
    download_text: "Download",
    share_text: "Share",
    close_text: "Close",
    prev_text: "Previous",
    next_text: "Next"
  },
  cta: {
    title: "Visit Our Facility",
    subtitle: "Schedule a visit to experience our healthcare excellence firsthand.",
    button_text: "Book a Visit"
  },
  seo: {
    meta_title: "Photo Gallery — Renova Life Care Facilities & Team",
    meta_description: "Explore our state-of-the-art medical facilities, expert doctors, and patient care moments at Renova Life Care.",
    og_title: "Photo Gallery | Renova Life Care",
    og_description: "A visual journey through our healthcare center and medical team.",
    og_image: "/images/og-gallery.jpg",
    canonical_url: "https://renovalifecare.com/gallery",
    robots: "index, follow",
    keywords: "gallery, photos, facilities, medical team, healthcare"
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
    const files = Array.from(e.target.files ?? []);
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
              <Icon name="trash" size={13} />
            </button>
            <button className="wc-img-action-btn" onClick={handleClick} title="Replace">
              <Icon name="upload" size={13} />
            </button>
          </div>
        </div>
      ) : (
        <div className="wc-image-upload" onClick={handleClick}>
          <div className="wc-image-upload-icon"><Icon name="upload" size={20} /></div>
          <p>Click to browse from desktop</p>
          <span>PNG, JPG, WEBP up to 5MB</span>
        </div>
      )}
      {hint && <span className="wc-field-hint">{hint}</span>}
    </div>
  );
};

const Repeater = ({ label, hint, items = [], onChange, renderItem, onAdd, className = "" }) => {
  const add = () => {
    if (onAdd) {
      onChange([...items, onAdd()]);
    } else {
      onChange([...items, ""]);
    }
  };
  const remove = i => onChange(items.filter((_, idx) => idx !== i));
  const update = (i, v) => { const n = [...items]; n[i] = v; onChange(n); };

  return (
    <div className="wc-field">
      <label className="wc-field-label">{label}</label>
      <div className={`wc-repeater ${className}`}>
        {items.map((item, i) => (
          <div key={item?.id || i} className="wc-repeater-item">
            {renderItem ? renderItem(item, i, update, remove) : (
              <>
                <input value={item} onChange={e => update(i, e.target.value)} placeholder={`Item ${i + 1}`} />
                <button className="wc-repeater-remove" onClick={() => remove(i)}>
                  <Icon name="x" size={13} />
                </button>
              </>
            )}
          </div>
        ))}
        <button className="wc-repeater-add" onClick={add}>
          <Icon name="plus" size={14} /> Add Item
        </button>
      </div>
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
   HERO SECTION EDITOR
   ══════════════════════════════════════════════════════════════ */
const GalleryHeroEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });

  return (
    <div className="wc-editor-card">
      <div className="wc-editor-card-header">
        <h3 className="wc-editor-card-title"><Icon name="camera" size={15} /> Hero Section</h3>
      </div>
      <div className="wc-editor-card-body">
        <div className="wc-field-grid">
          <div className="wc-field span-2">
            <label className="wc-field-label">Section Header Title</label>
            <input className="wc-input" value={data?.section_header_title || ""} onChange={e => set("section_header_title", e.target.value)} placeholder="Photo Gallery" />
          </div>
          <div className="wc-field span-2">
            <label className="wc-field-label">Section Header Subtitle</label>
            <textarea className="wc-textarea" value={data?.section_header_subtitle || ""} onChange={e => set("section_header_subtitle", e.target.value)} rows={2} placeholder="Explore our state-of-the-art facilities..." />
          </div>
          <div className="wc-field span-2">
            <label className="wc-field-label">Section Description</label>
            <textarea className="wc-textarea" value={data?.section_description || ""} onChange={e => set("section_description", e.target.value)} rows={2} placeholder="A visual journey through our healthcare center..." />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   GALLERY SECTION EDITOR
   ══════════════════════════════════════════════════════════════ */
const GalleryEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });

  const addCategory = () => ({
    id: `cat_${Date.now()}`,
    label: "New Category",
    icon: "folder"
  });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="grid" size={15} /> Gallery Settings</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Gallery Title</label>
              <input className="wc-input" value={data?.title || ""} onChange={e => set("title", e.target.value)} placeholder="Medical Facilities Gallery" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Gallery Subtitle</label>
              <textarea className="wc-textarea" value={data?.subtitle || ""} onChange={e => set("subtitle", e.target.value)} rows={2} placeholder="Browse through our collection of healthcare images" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">View All Text</label>
              <input className="wc-input" value={data?.view_all_text || ""} onChange={e => set("view_all_text", e.target.value)} placeholder="View All" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">No Results Text</label>
              <input className="wc-input" value={data?.no_results_text || ""} onChange={e => set("no_results_text", e.target.value)} placeholder="No photos found" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Clear Filters Text</label>
              <input className="wc-input" value={data?.clear_filters_text || ""} onChange={e => set("clear_filters_text", e.target.value)} placeholder="Clear Filters" />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="list" size={15} /> Categories</h3>
        </div>
        <div className="wc-editor-card-body">
          <Repeater
            label="Categories"
            hint="Add/Edit gallery categories"
            items={data?.categories || []}
            onChange={v => set("categories", v)}
            onAdd={addCategory}
            className="wc-repeater-categories"
            renderItem={(cat, i, update, remove) => (
              <div className="wc-category-card">
                <div className="wc-category-header">
                  <input className="wc-input" value={cat.label} onChange={e => update(i, { ...cat, label: e.target.value })} placeholder="Category Label" style={{ width: '50%' }} />
                  <button className="wc-repeater-remove-icon" onClick={() => remove(i)}>
                    <Icon name="trash" size={14} />
                  </button>
                </div>
                <input className="wc-input" value={cat.id} onChange={e => update(i, { ...cat, id: e.target.value })} placeholder="Category ID (e.g., facilities)" />
                <select className="wc-select" value={cat.icon} onChange={e => update(i, { ...cat, icon: e.target.value })}>
                  <option value="building">Building</option>
                  <option value="user">User</option>
                  <option value="camera">Camera</option>
                  <option value="calendar">Calendar</option>
                  <option value="folder">Folder</option>
                  <option value="star">Star</option>
                  <option value="heart">Heart</option>
                </select>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   LIGHTBOX EDITOR
   ══════════════════════════════════════════════════════════════ */
const LightboxEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });

  return (
    <div className="wc-editor-card">
      <div className="wc-editor-card-header">
        <h3 className="wc-editor-card-title"><Icon name="zoom" size={15} /> Lightbox Labels</h3>
      </div>
      <div className="wc-editor-card-body">
        <div className="wc-field-grid">
          <div className="wc-field">
            <label className="wc-field-label">Download Text</label>
            <input className="wc-input" value={data?.download_text || ""} onChange={e => set("download_text", e.target.value)} placeholder="Download" />
          </div>
          <div className="wc-field">
            <label className="wc-field-label">Share Text</label>
            <input className="wc-input" value={data?.share_text || ""} onChange={e => set("share_text", e.target.value)} placeholder="Share" />
          </div>
          <div className="wc-field">
            <label className="wc-field-label">Close Text</label>
            <input className="wc-input" value={data?.close_text || ""} onChange={e => set("close_text", e.target.value)} placeholder="Close" />
          </div>
          <div className="wc-field">
            <label className="wc-field-label">Previous Text</label>
            <input className="wc-input" value={data?.prev_text || ""} onChange={e => set("prev_text", e.target.value)} placeholder="Previous" />
          </div>
          <div className="wc-field">
            <label className="wc-field-label">Next Text</label>
            <input className="wc-input" value={data?.next_text || ""} onChange={e => set("next_text", e.target.value)} placeholder="Next" />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   CTA EDITOR
   ══════════════════════════════════════════════════════════════ */
const CtaEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });

  return (
    <div className="wc-editor-card">
      <div className="wc-editor-card-header">
        <h3 className="wc-editor-card-title"><Icon name="trend" size={15} /> Call to Action</h3>
      </div>
      <div className="wc-editor-card-body">
        <div className="wc-field-grid">
          <div className="wc-field span-2">
            <label className="wc-field-label">CTA Title</label>
            <input className="wc-input" value={data?.title || ""} onChange={e => set("title", e.target.value)} placeholder="Visit Our Facility" />
          </div>
          <div className="wc-field span-2">
            <label className="wc-field-label">CTA Subtitle</label>
            <textarea className="wc-textarea" value={data?.subtitle || ""} onChange={e => set("subtitle", e.target.value)} rows={2} placeholder="Schedule a visit to experience our healthcare excellence..." />
          </div>
          <div className="wc-field">
            <label className="wc-field-label">Button Text</label>
            <input className="wc-input" value={data?.button_text || ""} onChange={e => set("button_text", e.target.value)} placeholder="Book a Visit" />
          </div>
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
        <div className="wc-seo-preview-url">{data?.canonical_url || "https://renovalifecare.com/gallery"}</div>
        <div className="wc-seo-preview-title">{data?.meta_title || "Photo Gallery"}</div>
        <p className="wc-seo-preview-desc">{data?.meta_description || "Meta description appears here..."}</p>
      </div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="search" size={15} /> Meta Tags</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Meta Title <span className={`wc-field-counter ${titleLen > 60 ? "warn" : ""}`}>{titleLen}/70</span></label>
              <input className="wc-input" value={data?.meta_title || ""} onChange={e => set("meta_title", e.target.value)} placeholder="Photo Gallery — Renova Life Care" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Meta Description <span className={`wc-field-counter ${descLen > 155 ? "warn" : ""}`}>{descLen}/170</span></label>
              <textarea className="wc-textarea" value={data?.meta_description || ""} onChange={e => set("meta_description", e.target.value)} rows={3} placeholder="Explore our state-of-the-art medical facilities..." />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Keywords</label>
              <input className="wc-input" value={data?.keywords || ""} onChange={e => set("keywords", e.target.value)} placeholder="gallery, photos, facilities, medical team" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Canonical URL</label>
              <input className="wc-input" value={data?.canonical_url || ""} onChange={e => set("canonical_url", e.target.value)} placeholder="https://renovalifecare.com/gallery" />
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
          <h3 className="wc-editor-card-title"><Icon name="external" size={15} /> Open Graph (Social Sharing)</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">OG Title</label>
              <input className="wc-input" value={data?.og_title || ""} onChange={e => set("og_title", e.target.value)} placeholder="Photo Gallery | Renova Life Care" />
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
  if (sectionId === "hero") return <GalleryHeroEditor data={data} onChange={onChange} />;
  if (sectionId === "gallery") return <GalleryEditor data={data} onChange={onChange} />;
  if (sectionId === "lightbox") return <LightboxEditor data={data} onChange={onChange} />;
  if (sectionId === "cta") return <CtaEditor data={data} onChange={onChange} />;
  if (sectionId === "seo") return <SeoEditor data={data} onChange={onChange} />;
  return <div>Unknown section</div>;
};

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function ImageGalleryWebsiteContent() {
  const [selectedSection, setSelectedSection] = useState("hero");
  const [pageData, setPageData] = useState(INITIAL_GALLERY_DATA);
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
    showToast("Image Gallery page changes saved successfully!", "success");
  };

  const handlePreview = () => {
    window.open("/gallery", "_blank");
  };

  const handleReset = () => {
    if (confirm("Reset all Image Gallery page content to default? This cannot be undone.")) {
      setPageData(INITIAL_GALLERY_DATA);
      showToast("Reset to default content", "success");
    }
  };

  const sections = [
    { id: "hero", label: "Hero Section", icon: "camera", desc: "Header & description" },
    { id: "gallery", label: "Gallery Settings", icon: "grid", desc: "Categories & gallery text" },
    { id: "lightbox", label: "Lightbox Labels", icon: "zoom", desc: "Lightbox button texts" },
    { id: "cta", label: "Call to Action", icon: "trend", desc: "CTA section" },
    { id: "seo", label: "SEO & Meta", icon: "search", desc: "Meta tags & social sharing" },
  ];

  const currentSection = sections.find(s => s.id === selectedSection);
  const currentData = pageData[selectedSection] || {};

  const handleDataChange = newData => {
    setPageData(prev => ({
      ...prev,
      [selectedSection]: newData,
    }));
  };

  return (
    <div className="wc-gallery-layout">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <Link href="/super-admin-panel/website-content" className="wc-breadcrumb-link">
              Website Content
            </Link>
            <Icon name="chevron-down" size={12} className="wc-breadcrumb-chevron" />
            <span className="wc-breadcrumb-current">Image Gallery Page</span>
            <Icon name="chevron-down" size={12} className="wc-breadcrumb-chevron" />
            <span className="wc-breadcrumb-current">{currentSection?.label}</span>
          </div>

          <div className="wc-topbar-actions">
            <div className="wc-status-dot">Published</div>
            <button className="wc-btn wc-btn-ghost" onClick={handlePreview}>
              <Icon name="eye" size={14} /> Preview
            </button>
            <button className="wc-btn wc-btn-ghost" onClick={handleReset}>
              <Icon name="refresh" size={14} /> Reset
            </button>
            <button className="wc-btn wc-btn-success" onClick={handleSave} disabled={saving}>
              {saving ? (
                <><Icon name="refresh" size={14} /> Saving...</>
              ) : (
                <><Icon name="save" size={14} /> Save Changes</>
              )}
            </button>
          </div>
        </div>

        <div className="wc-editor-body">
          <nav className="wc-sections-nav">
            <div className="wc-sections-title">Sections</div>
            {sections.map(section => (
              <button
                key={section.id}
                className={`wc-section-tab ${selectedSection === section.id ? "active" : ""}`}
                onClick={() => setSelectedSection(section.id)}
              >
                <Icon name={section.icon} size={14} />
                {section.label}
              </button>
            ))}
          </nav>

          <div className="wc-content-panel">
            <div className="wc-page-info-banner">
              <div className="wc-page-info-left">
                <div className="wc-page-info-icon">
                  <Icon name="info" size={22} />
                </div>
                <div className="wc-page-info-text">
                  <h2>Image Gallery Page Content</h2>
                  <p>Editing: {currentSection?.label} — {currentSection?.desc}</p>
                </div>
              </div>
              <div className="wc-page-info-meta">
                <span className="wc-meta-tag">
                  <Icon name="external" size={11} />
                  /gallery
                </span>
                <span className="wc-meta-tag">
                  <Icon name="clock" size={11} />
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
        <Icon name="check" size={16} />
        {toast.msg}
      </div>
    </div>
  );
}