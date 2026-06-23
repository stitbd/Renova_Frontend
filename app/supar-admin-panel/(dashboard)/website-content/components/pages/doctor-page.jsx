// super-admin-panel/website-content/doctor-page/page.jsx
"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import "./doctor-page.css";
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
  Stethoscope,
  Building2,
  Calendar,
  Briefcase,
  DollarSign,
  TrendingUp,
  Shield,
  Lock,
  Key,
  Zap,
  Menu,
  UserCheck,
  UserCog,
  Activity,
  Clipboard,
  FileText,
  Globe,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Facebook
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
    stethoscope: Stethoscope,
    building: Building2,
    calendar: Calendar,
    briefcase: Briefcase,
    dollar: DollarSign,
    trend: TrendingUp,
    shield: Shield,
    lock: Lock,
    key: Key,
    zap: Zap,
    menu: Menu,
    usercheck: UserCheck,
    usercog: UserCog,
    activity: Activity,
    clipboard: Clipboard,
    filetext: FileText,
    globe: Globe,
    twitter: Twitter,
    linkedin: Linkedin,
    youtube: Youtube,
    instagram: Instagram,
    facebook: Facebook
  };

  const IconComponent = iconMap[name];
  if (IconComponent) {
    return <IconComponent size={size} className={className} />;
  }

  // Fallback: render nothing if icon not found
  return null;
};

/* ══════════════════════════════════════════════════════════════
   INITIAL DOCTOR PAGE DATA
   ══════════════════════════════════════════════════════════════ */
const INITIAL_DOCTOR_DATA = {
  hero: {
    section_header_title: "Our Doctors",
    section_header_subtitle: "Meet our expert medical professionals dedicated to your health.",
    section_description: "Internationally trained, BMDC-certified doctors dedicated to delivering the highest standard of patient care."
  },
  filter: {
    title: "Find a Doctor",
    placeholder: "Search by doctor name…",
    filters: [
      { id: "gender", label: "All Genders", options: ["Male", "Female", "Other"] },
      { id: "specialty", label: "All Specialties" },
      { id: "branch", label: "All Branches" },
      { id: "consultation", label: "Consultation Type", options: ["Online", "In-Person"] }
    ],
    button_text: "Search",
    clear_text: "Clear all"
  },
  doctor_card: {
    experience_label: "Experience",
    rating_label: "Rating",
    patients_label: "Patients",
    profile_button: "Profile",
    appointment_button: "Appointment"
  },
  cta: {
    title: "Book a Consultation",
    subtitle: "Choose your preferred specialist and schedule an appointment at your convenience.",
    button_text: "Book Appointment"
  },
  seo: {
    meta_title: "Our Doctors — Expert Medical Team at Renova Life Care",
    meta_description: "Meet BMDC-certified specialist doctors at Renova Life Care. Book appointments with expert physicians across all departments.",
    og_title: "Our Doctors | Renova Life Care",
    og_description: "Expert medical team dedicated to your health and well-being.",
    og_image: "/images/og-doctors.jpg",
    canonical_url: "https://renovalifecare.com/doctors",
    robots: "index, follow",
    keywords: "doctors, specialists, healthcare, BMDC, medical team"
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
const DoctorHeroEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="stethoscope" size={15} /> Hero Section</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Header Title</label>
              <input className="wc-input" value={data?.section_header_title || ""} onChange={e => set("section_header_title", e.target.value)} placeholder="Our Doctors" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Header Subtitle</label>
              <textarea className="wc-textarea" value={data?.section_header_subtitle || ""} onChange={e => set("section_header_subtitle", e.target.value)} rows={2} placeholder="Meet our expert medical professionals..." />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Description</label>
              <textarea className="wc-textarea" value={data?.section_description || ""} onChange={e => set("section_description", e.target.value)} rows={2} placeholder="Internationally trained, BMDC-certified doctors..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   FILTER SECTION EDITOR
   ══════════════════════════════════════════════════════════════ */
const FilterEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });

  const addFilter = () => ({
    id: `filter_${Date.now()}`,
    label: "New Filter",
    options: ["Option 1", "Option 2"]
  });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="search" size={15} /> Filter Settings</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Filter Title</label>
              <input className="wc-input" value={data?.title || ""} onChange={e => set("title", e.target.value)} placeholder="Find a Doctor" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Search Placeholder</label>
              <input className="wc-input" value={data?.placeholder || ""} onChange={e => set("placeholder", e.target.value)} placeholder="Search by doctor name…" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Search Button Text</label>
              <input className="wc-input" value={data?.button_text || ""} onChange={e => set("button_text", e.target.value)} placeholder="Search" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Clear Button Text</label>
              <input className="wc-input" value={data?.clear_text || ""} onChange={e => set("clear_text", e.target.value)} placeholder="Clear all" />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="list" size={15} /> Filter Options</h3>
        </div>
        <div className="wc-editor-card-body">
          <Repeater
            label="Filters"
            hint="Add/Edit filter dropdowns"
            items={data?.filters || []}
            onChange={v => set("filters", v)}
            onAdd={addFilter}
            className="wc-repeater-filters"
            renderItem={(filter, i, update, remove) => (
              <div className="wc-filter-card">
                <div className="wc-filter-header">
                  <input className="wc-input" value={filter.label} onChange={e => update(i, { ...filter, label: e.target.value })} placeholder="Filter Label" style={{ width: '50%' }} />
                  <button className="wc-repeater-remove-icon" onClick={() => remove(i)}>
                    <Icon name="trash" size={14} />
                  </button>
                </div>
                <input className="wc-input" value={filter.id} onChange={e => update(i, { ...filter, id: e.target.value })} placeholder="Filter ID (e.g., gender)" />
                {filter.options && (
                  <input className="wc-input" value={filter.options.join(", ")} onChange={e => update(i, { ...filter, options: e.target.value.split(",").map(s => s.trim()) })} placeholder="Options (comma separated)" />
                )}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   DOCTOR CARD EDITOR
   ══════════════════════════════════════════════════════════════ */
const DoctorCardEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });

  return (
    <div className="wc-editor-card">
      <div className="wc-editor-card-header">
        <h3 className="wc-editor-card-title"><Icon name="user" size={15} /> Doctor Card Labels</h3>
      </div>
      <div className="wc-editor-card-body">
        <div className="wc-field-grid">
          <div className="wc-field">
            <label className="wc-field-label">Experience Label</label>
            <input className="wc-input" value={data?.experience_label || ""} onChange={e => set("experience_label", e.target.value)} placeholder="Experience" />
          </div>
          <div className="wc-field">
            <label className="wc-field-label">Rating Label</label>
            <input className="wc-input" value={data?.rating_label || ""} onChange={e => set("rating_label", e.target.value)} placeholder="Rating" />
          </div>
          <div className="wc-field">
            <label className="wc-field-label">Patients Label</label>
            <input className="wc-input" value={data?.patients_label || ""} onChange={e => set("patients_label", e.target.value)} placeholder="Patients" />
          </div>
          <div className="wc-field">
            <label className="wc-field-label">Profile Button Text</label>
            <input className="wc-input" value={data?.profile_button || ""} onChange={e => set("profile_button", e.target.value)} placeholder="Profile" />
          </div>
          <div className="wc-field">
            <label className="wc-field-label">Appointment Button Text</label>
            <input className="wc-input" value={data?.appointment_button || ""} onChange={e => set("appointment_button", e.target.value)} placeholder="Appointment" />
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
            <input className="wc-input" value={data?.title || ""} onChange={e => set("title", e.target.value)} placeholder="Book a Consultation" />
          </div>
          <div className="wc-field span-2">
            <label className="wc-field-label">CTA Subtitle</label>
            <textarea className="wc-textarea" value={data?.subtitle || ""} onChange={e => set("subtitle", e.target.value)} rows={2} placeholder="Choose your preferred specialist..." />
          </div>
          <div className="wc-field">
            <label className="wc-field-label">Button Text</label>
            <input className="wc-input" value={data?.button_text || ""} onChange={e => set("button_text", e.target.value)} placeholder="Book Appointment" />
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
        <div className="wc-seo-preview-url">{data?.canonical_url || "https://renovalifecare.com/doctors"}</div>
        <div className="wc-seo-preview-title">{data?.meta_title || "Our Doctors"}</div>
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
              <input className="wc-input" value={data?.meta_title || ""} onChange={e => set("meta_title", e.target.value)} placeholder="Our Doctors — Expert Medical Team" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Meta Description <span className={`wc-field-counter ${descLen > 155 ? "warn" : ""}`}>{descLen}/170</span></label>
              <textarea className="wc-textarea" value={data?.meta_description || ""} onChange={e => set("meta_description", e.target.value)} rows={3} placeholder="Meet BMDC-certified specialist doctors..." />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Keywords</label>
              <input className="wc-input" value={data?.keywords || ""} onChange={e => set("keywords", e.target.value)} placeholder="doctors, specialists, healthcare, BMDC" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Canonical URL</label>
              <input className="wc-input" value={data?.canonical_url || ""} onChange={e => set("canonical_url", e.target.value)} placeholder="https://renovalifecare.com/doctors" />
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
              <input className="wc-input" value={data?.og_title || ""} onChange={e => set("og_title", e.target.value)} placeholder="Our Doctors | Renova Life Care" />
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
  if (sectionId === "hero") return <DoctorHeroEditor data={data} onChange={onChange} />;
  if (sectionId === "filter") return <FilterEditor data={data} onChange={onChange} />;
  if (sectionId === "doctor_card") return <DoctorCardEditor data={data} onChange={onChange} />;
  if (sectionId === "cta") return <CtaEditor data={data} onChange={onChange} />;
  if (sectionId === "seo") return <SeoEditor data={data} onChange={onChange} />;
  return <div>Unknown section</div>;
};

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function DoctorWebsiteContent() {
  const [selectedSection, setSelectedSection] = useState("hero");
  const [pageData, setPageData] = useState(INITIAL_DOCTOR_DATA);
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
    showToast("Doctor page changes saved successfully!", "success");
  };

  const handlePreview = () => {
    window.open("/doctors", "_blank");
  };

  const handleReset = () => {
    if (confirm("Reset all Doctor page content to default? This cannot be undone.")) {
      setPageData(INITIAL_DOCTOR_DATA);
      showToast("Reset to default content", "success");
    }
  };

  const sections = [
    { id: "hero", label: "Hero Section", icon: "stethoscope", desc: "Header & description" },
    { id: "filter", label: "Filter Section", icon: "search", desc: "Search & filter options" },
    { id: "doctor_card", label: "Doctor Card", icon: "user", desc: "Card labels & buttons" },
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
    <div className="wc-doctor-layout">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <Link href="/super-admin-panel/website-content" className="wc-breadcrumb-link">
              Website Content
            </Link>
            <Icon name="chevron-down" size={12} className="wc-breadcrumb-chevron" />
            <span className="wc-breadcrumb-current">Doctor Page</span>
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
                  <h2>Doctor Page Content</h2>
                  <p>Editing: {currentSection?.label} — {currentSection?.desc}</p>
                </div>
              </div>
              <div className="wc-page-info-meta">
                <span className="wc-meta-tag">
                  <Icon name="external" size={11} />
                  /doctors
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