"use client";

import { useState } from "react";
import {
  Home,
  Layout,
  Calendar,
  MessageCircle,
  Award,
  Search,
  Eye,
  Save,
  RefreshCw,
  Check,
  Users,
  Image as ImageIcon,
  List,
  Star,
  Upload,
  Trash,
  Plus,
  X,
  Clock,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  ChevronDown,
  Target,
  User,
  UserPlus,
  Grid,
  ShoppingBag,
  Package,
  FileText,
  Link as LinkIcon,
  Menu,
  MoreHorizontal
} from "lucide-react";
import "./styles/home.css";

const HomePage = () => {
  const [selectedSection, setSelectedSection] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  // Section definitions for Home page
  const sections = [
    { id: "hero", label: "Hero Section", icon: Layout },
    { id: "appointment-cta", label: "Appointment CTA", icon: Calendar },
    { id: "testimonials", label: "Testimonials", icon: MessageCircle },
    { id: "partners", label: "Partners & Affiliations", icon: Award },
    { id: "seo", label: "SEO & Meta", icon: Search }
  ];

  const SectionIcon = sections.find(s => s.id === selectedSection)?.icon || Layout;

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
      case "appointment-cta":
        return <AppointmentCTAEditor />;
      case "testimonials":
        return <TestimonialsEditor />;
      case "partners":
        return <PartnersEditor />;
      case "seo":
        return <SeoEditor />;
      default:
        return <HeroEditor />;
    }
  };

  return (
    <div className="wc-home-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">Home</span>
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
                  <Home size={20} />
                </div>
                <div className="wc-page-info-text">
                  <h2>Home Page</h2>
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

// Hero Editor Component
const HeroEditor = () => {
  const [data, setData] = useState({
    trust_badge_text: "Your Health, Our Priority",
    headline: "Your Health, Our Priority — Expert Care, Every Step",
    description: "Renova Life Care Ltd. delivers world-class healthcare services across Bangladesh.",
    background_images: [],
    patient_images: [],
    stats: [
      { label: "Happy Patients", value: "15,000+" },
      { label: "Expert Doctors", value: "120+" },
      { label: "Departments", value: "25+" },
      { label: "Years Experience", value: "15+" }
    ]
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div className="wc-home-editor">
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

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><ImageIcon size={15} /> Background Images</h3>
        </div>
        <div className="wc-editor-card-body">
          <ImageUploadField label="Hero Background Images" hint="Recommended: 1920×800px" />
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Users size={15} /> Patient Trust Images</h3>
        </div>
        <div className="wc-editor-card-body">
          <Repeater label="Patient Photos" hint="Add up to 5 patient images" />
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><List size={15} /> Stats Counter Strip</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-stat-inputs">
            {data.stats.map((stat, i) => (
              <div key={i} className="wc-stat-input-item">
                <label>{stat.label}</label>
                <input value={stat.value} onChange={e => {
                  const s = [...data.stats];
                  s[i] = { ...s[i], value: e.target.value };
                  set("stats", s);
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AppointmentCTAEditor = () => {
  const [data, setData] = useState({
    heading: "Your Health Deserves Expert Care, Right Now.",
    subheading: "Schedule a consultation — be it in-person, video, or home visit.",
    stats: [
      { label: "Patients Served", value: "50K+" },
      { label: "Specialist Doctors", value: "120+" },
      { label: "Average Rating", value: "4.98" }
    ]
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Calendar size={15} /> Appointment CTA Content</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
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
          <h3 className="wc-editor-card-title"><List size={15} /> Trust Stats</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-stat-inputs">
            {data.stats.map((stat, i) => (
              <div key={i} className="wc-stat-input-item">
                <label>{stat.label}</label>
                <input value={stat.value} onChange={e => {
                  const s = [...data.stats];
                  s[i] = { ...s[i], value: e.target.value };
                  set("stats", s);
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialsEditor = () => {
  const [data, setData] = useState({
    section_label: "Testimonials",
    heading: "Real Patients, Real Transformations",
    subheading: "Thousands of families across Bangladesh trust Renova Life Care.",
    stats: [
      { label: "Patient Satisfaction", value: "98%" },
      { label: "Average Rating", value: "4.9/5" },
      { label: "Reviews Collected", value: "2,500+" }
    ],
    cards: []
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><MessageCircle size={15} /> Testimonials Section</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field">
              <label className="wc-field-label">Section Label</label>
              <input className="wc-input" value={data.section_label} onChange={e => set("section_label", e.target.value)} />
            </div>
            <div className="wc-field">
              <ToggleSwitch label="Show Ratings" checked={true} />
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
          <h3 className="wc-editor-card-title"><List size={15} /> Satisfaction Stats</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-stat-inputs">
            {data.stats.map((stat, i) => (
              <div key={i} className="wc-stat-input-item">
                <label>{stat.label}</label>
                <input value={stat.value} onChange={e => {
                  const s = [...data.stats];
                  s[i] = { ...s[i], value: e.target.value };
                  set("stats", s);
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PartnersEditor = () => {
  const [data, setData] = useState({
    section_label: "Our Trusted Partners",
    heading: "Affiliations & Partnerships",
    subheading: "We collaborate with leading healthcare organizations."
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Award size={15} /> Partners Section</h3>
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
    </div>
  );
};

const SeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "Renova Life Care Ltd. — Expert Healthcare, Every Step",
    meta_description: "World-class healthcare across Bangladesh.",
    og_title: "Renova Life Care Ltd.",
    og_description: "Compassionate Care, Expert Medicine.",
    og_image: "/images/og-home.jpg",
    canonical_url: "https://renovalifecare.com",
    robots: "index, follow",
    keywords: "healthcare Bangladesh, diagnostic center"
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
            <div className="wc-field">
              <label className="wc-field-label">Canonical URL</label>
              <input className="wc-input" value={data.canonical_url} onChange={e => set("canonical_url", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Robots</label>
              <select className="wc-select" value={data.robots} onChange={e => set("robots", e.target.value)}>
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
              <input className="wc-input" value={data.og_title} onChange={e => set("og_title", e.target.value)} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">OG Description</label>
              <textarea className="wc-textarea" value={data.og_description} onChange={e => set("og_description", e.target.value)} rows={2} />
            </div>
            <div className="wc-field span-2">
              <ImageUploadField label="OG Image" hint="Recommended: 1200×630px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const ImageUploadField = ({ label, hint, value, onChange, multiple = false }) => {
  return (
    <div className="wc-field">
      <label className="wc-field-label">{label}</label>
      <div className="wc-image-upload">
        <div className="wc-image-upload-icon"><Upload size={20} /></div>
        <p>Click to browse from desktop</p>
        <span>PNG, JPG, WEBP up to 5MB {multiple ? "(multiple allowed)" : ""}</span>
      </div>
      {hint && <span className="wc-field-hint">{hint}</span>}
    </div>
  );
};

const Repeater = ({ label, hint, items = [], onChange }) => {
  return (
    <div className="wc-field">
      <label className="wc-field-label">{label}</label>
      <div className="wc-repeater">
        {items.map((item, i) => (
          <div key={i} className="wc-repeater-item">
            <input value={item} placeholder={`Item ${i + 1}`} />
            <button className="wc-repeater-remove"><X size={13} /> Remove</button>
          </div>
        ))}
        <button className="wc-repeater-add"><Plus size={14} /> Add Item</button>
      </div>
      {hint && <span className="wc-field-hint">{hint}</span>}
    </div>
  );
};

const ToggleSwitch = ({ label, desc, checked, onChange }) => {
  return (
    <div className="wc-toggle-row">
      <div className="wc-toggle-info">
        <h4>{label}</h4>
        {desc && <p>{desc}</p>}
      </div>
      <label className="wc-switch">
        <input type="checkbox" checked={checked} onChange={e => onChange?.(e.target.checked)} />
        <span className="wc-switch-slider" />
      </label>
    </div>
  );
};

export default HomePage;