// app/supar-admin-panel/website-content/about-page/page.jsx
"use client";

import { useState } from "react";
import {
  Info,
  Layout,
  Target,
  Eye,
  Award,
  User,
  List,
  Clock,
  Image as ImageIcon,
  Search,
  Save,
  RefreshCw,
  Check,
  ChevronDown,
  Users,
  Star,
  Heart,
  UserPlus,
  Calendar,
  MessageCircle,
  ExternalLink,
  Upload,
  Trash,
  Plus,
  X
} from "lucide-react";
import "./about.css";

const AboutPage = () => {
  const [selectedSection, setSelectedSection] = useState("about-hero");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const sections = [
    { id: "about-hero", label: "Hero Section", icon: Layout },
    { id: "mission-vision", label: "Mission & Vision", icon: Target },
    { id: "team", label: "Team", icon: Users },
    { id: "stats-bar", label: "Stats Bar", icon: List },
    { id: "managing-director", label: "Managing Director", icon: User },
    { id: "company-history", label: "Company History", icon: Clock },
    { id: "certifications", label: "Certifications", icon: Award },
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
      case "about-hero":
        return <AboutHeroEditor />;
      case "mission-vision":
        return <MissionVisionEditor />;
      case "team":
        return <TeamEditor />;
      case "stats-bar":
        return <StatsBarEditor />;
      case "managing-director":
        return <ManagingDirectorEditor />;
      case "company-history":
        return <CompanyHistoryEditor />;
      case "certifications":
        return <CertificationsEditor />;
      case "seo":
        return <SeoEditor />;
      default:
        return <AboutHeroEditor />;
    }
  };

  return (
    <div className="wc-about-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">About</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">{sections.find(s => s.id === selectedSection)?.label}</span>
          </div>

          <div className="wc-topbar-actions">
            <div className="wc-status-dot">Live</div>
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
                  <Info size={20} />
                </div>
                <div className="wc-page-info-text">
                  <h2>About Page</h2>
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

// About Hero Editor
const AboutHeroEditor = () => {
  const [data, setData] = useState({
    section_header_title: "About Renova Life Care",
    section_header_subtitle: "Delivering compassionate, world-class medicine to the people of Bangladesh since 2010.",
    about_image: "/images/about/hero.jpg",
    about_title: "Compassionate Care, Expert Medicine",
    about_description: "Renova Life Care Ltd. delivers world-class healthcare services across Bangladesh.",
    features: [
      { icon: "user-plus", title: "Expert Doctors", description: "BMDC-certified specialists" },
      { icon: "layout", title: "Modern Facilities", description: "State-of-the-art equipment" },
      { icon: "heart", title: "Patient-First Approach", description: "Compassionate care tailored to your needs" }
    ],
    stats: [
      { label: "Happy Patients", value: "15,000+" },
      { label: "Network in South Asia", value: "120+" },
      { label: "Setting new standards", value: "Excellence" }
    ]
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div className="wc-about-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Layout size={15} /> Hero Section Header</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Header Title</label>
              <input className="wc-input" value={data.section_header_title} onChange={e => set("section_header_title", e.target.value)} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Header Subtitle</label>
              <textarea className="wc-textarea" value={data.section_header_subtitle} onChange={e => set("section_header_subtitle", e.target.value)} rows={2} />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><ImageIcon size={15} /> About Section Image</h3>
        </div>
        <div className="wc-editor-card-body">
          <ImageUploadField label="About Hero Image" hint="Recommended: 600×500px" />
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Info size={15} /> About Content</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">About Title</label>
              <input className="wc-input" value={data.about_title} onChange={e => set("about_title", e.target.value)} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">About Description</label>
              <textarea className="wc-textarea" value={data.about_description} onChange={e => set("about_description", e.target.value)} rows={4} />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Star size={15} /> Features (3 Items)</h3>
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

// Mission Vision Editor
const MissionVisionEditor = () => {
  const [data, setData] = useState({
    mission: { title: "Our Mission", text: "To provide accessible, affordable, and high-quality healthcare to every individual in Bangladesh." },
    vision: { title: "Our Vision", text: "To be the most trusted and comprehensive healthcare network in South Asia." },
    values: { title: "Our Values", text: "Integrity, compassion, excellence, and continuous learning." }
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      {[
        { key: "mission", label: "Mission", icon: Target },
        { key: "vision", label: "Vision", icon: Eye },
        { key: "values", label: "Values", icon: Award }
      ].map(({ key, label, icon: IconComponent }) => (
        <div className="wc-editor-card" key={key}>
          <div className="wc-editor-card-header">
            <h3 className="wc-editor-card-title"><IconComponent size={15} /> {label}</h3>
          </div>
          <div className="wc-editor-card-body">
            <div className="wc-field">
              <label className="wc-field-label">{label} Title</label>
              <input className="wc-input" value={data[key]?.title || ""} onChange={e => set(key, { ...data[key], title: e.target.value })} />
            </div>
            <div className="wc-field" style={{ marginTop: 12 }}>
              <label className="wc-field-label">{label} Text</label>
              <textarea className="wc-textarea" value={data[key]?.text || ""} onChange={e => set(key, { ...data[key], text: e.target.value })} rows={4} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Team Editor
const TeamEditor = () => {
  const [data, setData] = useState({
    section_title: "Our Leadership",
    section_subtitle: "The Team Behind Our Excellence",
    description: "Experienced leaders driving innovation, compassion, and quality across every department.",
    members: []
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Users size={15} /> Team Section Header</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Title</label>
              <input className="wc-input" value={data.section_title} onChange={e => set("section_title", e.target.value)} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Subtitle</label>
              <input className="wc-input" value={data.section_subtitle} onChange={e => set("section_subtitle", e.target.value)} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Description</label>
              <textarea className="wc-textarea" value={data.description} onChange={e => set("description", e.target.value)} rows={2} />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Users size={15} /> Team Members</h3>
        </div>
        <div className="wc-editor-card-body">
          <Repeater label="Team Members" />
        </div>
      </div>
    </div>
  );
};

// Stats Bar Editor
const StatsBarEditor = () => {
  const [data, setData] = useState({
    happy_patients: "15,000+",
    expert_doctors: "120+",
    departments: "35+",
    years_experience: "14"
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div className="wc-editor-card">
      <div className="wc-editor-card-header">
        <h3 className="wc-editor-card-title"><List size={15} /> Stats Bar (4 Items)</h3>
      </div>
      <div className="wc-editor-card-body">
        <div className="wc-stat-inputs">
          {[
            { key: "happy_patients", label: "Happy Patients" },
            { key: "expert_doctors", label: "Expert Doctors" },
            { key: "departments", label: "Departments" },
            { key: "years_experience", label: "Years Experience" }
          ].map(({ key, label }) => (
            <div key={key} className="wc-stat-input-item">
              <label>{label}</label>
              <input value={data[key] || ""} onChange={e => set(key, e.target.value)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Managing Director Editor
const ManagingDirectorEditor = () => {
  const [data, setData] = useState({
    section_label: "MESSAGE FROM OUR MD",
    heading: "A Word From Our",
    heading_highlight: "Managing Director",
    md_name: "Dr. Homayon Kabir",
    md_role: "MANAGING DIRECTOR",
    md_specialty: "MBBS, FCPS (Medicine)",
    md_badge: "BMDC Verified",
    quote: "At Renova Life Care, our mission has always been simple: to deliver world-class healthcare with a human touch.",
    stats: [
      { label: "Years Leading", value: "15+" },
      { label: "Lives Touched", value: "50K+" },
      { label: "Patient Satisfaction", value: "98%" }
    ]
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><User size={15} /> MD Section Labels</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Label</label>
              <input className="wc-input" value={data.section_label} onChange={e => set("section_label", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Heading</label>
              <input className="wc-input" value={data.heading} onChange={e => set("heading", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Heading Highlight</label>
              <input className="wc-input" value={data.heading_highlight} onChange={e => set("heading_highlight", e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><User size={15} /> MD Profile</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <ImageUploadField label="MD Photo" hint="Recommended: 400×400px" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Full Name</label>
              <input className="wc-input" value={data.md_name} onChange={e => set("md_name", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Role / Title</label>
              <input className="wc-input" value={data.md_role} onChange={e => set("md_role", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Specialty / Credentials</label>
              <input className="wc-input" value={data.md_specialty} onChange={e => set("md_specialty", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Badge Text</label>
              <input className="wc-input" value={data.md_badge} onChange={e => set("md_badge", e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><MessageCircle size={15} /> MD Quote / Message</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field">
            <label className="wc-field-label">Quote Text</label>
            <textarea className="wc-textarea lg" value={data.quote} onChange={e => set("quote", e.target.value)} rows={5} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Company History Editor
const CompanyHistoryEditor = () => {
  const [data, setData] = useState({
    heading: "Our Journey",
    subheading: "A decade of compassionate care and innovation",
    milestones: [
      { year: "2010", title: "Founded", description: "Renova Life Care was established in Dhaka." },
      { year: "2015", title: "Expanded", description: "Opened 5 new branches across Bangladesh." }
    ]
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Clock size={15} /> Company History</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Heading</label>
              <input className="wc-input" value={data.heading} onChange={e => set("heading", e.target.value)} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Subheading</label>
              <input className="wc-input" value={data.subheading} onChange={e => set("subheading", e.target.value)} />
            </div>
          </div>
          <Repeater label="Milestones" />
        </div>
      </div>
    </div>
  );
};

// Certifications Editor
const CertificationsEditor = () => {
  const [data, setData] = useState({
    heading: "Accreditations & Certifications",
    subheading: "Recognized by leading healthcare organizations"
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Award size={15} /> Certifications</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Heading</label>
              <input className="wc-input" value={data.heading} onChange={e => set("heading", e.target.value)} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Subheading</label>
              <input className="wc-input" value={data.subheading} onChange={e => set("subheading", e.target.value)} />
            </div>
          </div>
          <Repeater label="Certifications" />
        </div>
      </div>
    </div>
  );
};

// SEO Editor (reused from Home page)
const SeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "About Renova Life Care — Compassionate Healthcare in Bangladesh",
    meta_description: "Learn about Renova Life Care's mission, vision, and leadership team.",
    og_title: "About Renova Life Care Ltd.",
    og_description: "Compassionate Care, Expert Medicine — Serving Bangladesh since 2010.",
    og_image: "/images/og-about.jpg",
    canonical_url: "https://renovalifecare.com/about",
    robots: "index, follow",
    keywords: "about Renova, healthcare Bangladesh"
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

// Helper components (ImageUploadField, Repeater, ToggleSwitch)
// These are the same as in HomePage.jsx

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

export default AboutPage;