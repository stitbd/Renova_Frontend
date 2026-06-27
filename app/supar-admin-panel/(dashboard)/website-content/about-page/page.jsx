// app/supar-admin-panel/website-content/about-page/page.jsx
"use client";

import { useState, useRef } from "react";
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
  X,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Quote,
  Briefcase,
  GraduationCap,
  FileText,
  Globe
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
    { id: "managing-director", label: "Managing Director", icon: User },
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
      case "managing-director":
        return <ManagingDirectorEditor />;
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
    about_title: "Compassionate Care, Expert Medicine",
    about_description: "Renova Life Care Ltd. delivers world-class healthcare services across Bangladesh. From general checkups to specialized treatments, our expert doctors are here for you.",
    about_image: "",
    features: [
      { title: "Expert Doctors", description: "BMDC-certified specialists" },
      { title: "Modern Facilities", description: "State-of-the-art equipment" },
      { title: "Patient-First Approach", description: "Compassionate care tailored to your needs" }
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
          <ImageUploadField 
            label="About Hero Image" 
            hint="Recommended: 600×500px"
            value={data.about_image}
            onChange={(val) => set("about_image", val)}
          />
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
              <textarea className="wc-textarea lg" value={data.about_description} onChange={e => set("about_description", e.target.value)} rows={4} />
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
    mission: { 
      title: "Our Mission", 
      text: "To provide accessible, affordable, and high-quality healthcare to every individual in Bangladesh — ensuring no one is left without expert medical attention regardless of their background." 
    },
    vision: { 
      title: "Our Vision", 
      text: "To be the most trusted and comprehensive healthcare network in South Asia — setting new standards in patient care, medical innovation, and community wellness." 
    },
    values: { 
      title: "Our Values", 
      text: "Integrity, compassion, excellence, and continuous learning — these are the pillars that define every decision we make and every patient interaction we have." 
    }
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
              <textarea className="wc-textarea lg" value={data[key]?.text || ""} onChange={e => set(key, { ...data[key], text: e.target.value })} rows={4} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Team Photo Upload Component
const TeamPhotoUpload = ({ value, onChange, name }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onChange?.(imageUrl);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeImage = () => {
    if (value && value.startsWith('blob:')) {
      URL.revokeObjectURL(value);
    }
    onChange?.(null);
  };

  return (
    <div className="wc-team-photo-wrapper">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        onChange={handleFileSelect}
      />
      {value ? (
        <div className="wc-team-photo-preview">
          <img src={value} alt={name || "Team member"} />
          <div className="wc-team-photo-overlay">
            <button 
              className="wc-photo-action-btn"
              onClick={triggerUpload}
              title="Replace photo"
            >
              <Upload size={14} />
            </button>
            <button 
              className="wc-photo-action-btn wc-photo-remove"
              onClick={removeImage}
              title="Remove photo"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div className="wc-team-photo-upload" onClick={triggerUpload}>
          <div className="wc-team-photo-icon">
            <Upload size={24} />
          </div>
          <p>Upload Photo</p>
          <span>Click to browse</span>
        </div>
      )}
    </div>
  );
};

// MD Photo Upload Component
const MDPhotoUpload = ({ value, onChange, name }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onChange?.(imageUrl);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeImage = () => {
    if (value && value.startsWith('blob:')) {
      URL.revokeObjectURL(value);
    }
    onChange?.(null);
  };

  return (
    <div className="wc-md-photo-wrapper">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        onChange={handleFileSelect}
      />
      {value ? (
        <div className="wc-md-photo-preview">
          <img src={value} alt={name || "Managing Director"} />
          <div className="wc-md-photo-overlay">
            <button 
              className="wc-photo-action-btn"
              onClick={triggerUpload}
              title="Replace photo"
            >
              <Upload size={14} />
            </button>
            <button 
              className="wc-photo-action-btn wc-photo-remove"
              onClick={removeImage}
              title="Remove photo"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        <div className="wc-md-photo-upload" onClick={triggerUpload}>
          <div className="wc-md-photo-icon">
            <User size={32} />
          </div>
          <p>Upload Photo</p>
          <span>Click to browse</span>
        </div>
      )}
    </div>
  );
};

// Team Editor
const TeamEditor = () => {
  const [data, setData] = useState({
    section_title: "Our Leadership",
    section_subtitle: "The Team Behind Our Excellence",
    description: "Experienced leaders driving innovation, compassion, and quality across every department.",
    members: [
      {
        name: "Prof. Nasrin Akter",
        role: "MEDICAL DIRECTOR",
        credentials: "MBBS, MS (Gynaecology)",
        social_linkedin: true,
        image: ""
      },
      {
        name: "Dr. Kamrun Nahar",
        role: "CHIEF OPERATIONS OFFICER",
        credentials: "MBIA (Healthcare Management)",
        social_linkedin: true,
        image: ""
      },
      {
        name: "Dr. Shirin Sultana",
        role: "HEAD OF DIAGNOSTICS",
        credentials: "MBBS, MD (Pathology)",
        social_linkedin: true,
        image: ""
      },
      {
        name: "Dr. Shehreen Amin Monami",
        role: "CHIEF FINANCIAL OFFICER",
        credentials: "CA, MBA (Finance)",
        social_linkedin: true,
        image: ""
      },
      {
        name: "Dr. Farhana Begum",
        role: "HEAD OF NURSING",
        credentials: "BSc Nursing, MPH",
        social_linkedin: true,
        image: ""
      }
    ]
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  const updateMember = (index, key, value) => {
    const updated = [...data.members];
    updated[index] = { ...updated[index], [key]: value };
    set("members", updated);
  };

  const addMember = () => {
    set("members", [...data.members, { 
      name: "", 
      role: "", 
      credentials: "", 
      social_linkedin: false,
      image: "" 
    }]);
  };

  const removeMember = (index) => {
    const updated = [...data.members];
    updated.splice(index, 1);
    set("members", updated);
  };

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
          <h3 className="wc-editor-card-title"><Users size={15} /> Team Members ({data.members.length})</h3>
          <span className="wc-editor-card-desc">Click on photo to upload</span>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-team-grid">
            {data.members.map((member, index) => (
              <div key={index} className="wc-team-member-card">
                <div className="wc-team-member-header">
                  <TeamPhotoUpload 
                    value={member.image}
                    onChange={(val) => updateMember(index, "image", val)}
                    name={member.name || "Team Member"}
                  />
                  <button 
                    className="wc-team-remove-btn"
                    onClick={() => removeMember(index)}
                    title="Remove member"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="wc-field">
                  <label className="wc-field-label">Name</label>
                  <input 
                    className="wc-input" 
                    value={member.name} 
                    onChange={e => updateMember(index, "name", e.target.value)} 
                    placeholder="Full name"
                  />
                </div>
                <div className="wc-field">
                  <label className="wc-field-label">Role</label>
                  <input 
                    className="wc-input" 
                    value={member.role} 
                    onChange={e => updateMember(index, "role", e.target.value)} 
                    placeholder="Job title"
                  />
                </div>
                <div className="wc-field">
                  <label className="wc-field-label">Credentials</label>
                  <input 
                    className="wc-input" 
                    value={member.credentials} 
                    onChange={e => updateMember(index, "credentials", e.target.value)} 
                    placeholder="Degrees / certifications"
                  />
                </div>
                <div className="wc-toggle-row" style={{ paddingTop: 8 }}>
                  <div className="wc-toggle-info">
                    <h4 style={{ fontSize: 12 }}>Show LinkedIn</h4>
                  </div>
                  <label className="wc-switch">
                    <input 
                      type="checkbox" 
                      checked={member.social_linkedin} 
                      onChange={e => updateMember(index, "social_linkedin", e.target.checked)} 
                    />
                    <span className="wc-switch-slider" />
                  </label>
                </div>
              </div>
            ))}
          </div>
          <button className="wc-repeater-add" onClick={addMember}>
            <Plus size={14} /> Add Team Member
          </button>
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
    md_badge: "15+ Years Leading | 50K+ Lives Touched | 98% Patient Satisfaction",
    md_image: "",
    quote: "At Renova Life Care, our mission has always been simple: to deliver world-class healthcare with a human touch. Every patient who walks through our doors deserves the best medical expertise paired with genuine compassion. We are committed to continuous growth, ethical practice, and making quality care accessible to all.",
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
          <span className="wc-editor-card-desc">Click on photo to upload</span>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-md-profile">
            <div className="wc-md-photo-section">
              <MDPhotoUpload 
                value={data.md_image}
                onChange={(val) => set("md_image", val)}
                name={data.md_name || "Managing Director"}
              />
            </div>
            <div className="wc-md-info-section">
              <div className="wc-field-grid">
                <div className="wc-field">
                  <label className="wc-field-label">Full Name</label>
                  <input className="wc-input" value={data.md_name} onChange={e => set("md_name", e.target.value)} />
                </div>
                <div className="wc-field">
                  <label className="wc-field-label">Role / Title</label>
                  <input className="wc-input" value={data.md_role} onChange={e => set("md_role", e.target.value)} />
                </div>
                <div className="wc-field span-2">
                  <label className="wc-field-label">Specialty / Credentials</label>
                  <input className="wc-input" value={data.md_specialty} onChange={e => set("md_specialty", e.target.value)} />
                </div>
                <div className="wc-field span-2">
                  <label className="wc-field-label">Badge Text</label>
                  <input className="wc-input" value={data.md_badge} onChange={e => set("md_badge", e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Quote size={15} /> MD Quote / Message</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field">
            <label className="wc-field-label">Quote Text</label>
            <textarea className="wc-textarea xl" value={data.quote} onChange={e => set("quote", e.target.value)} rows={6} />
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><List size={15} /> MD Stats</h3>
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

// SEO Editor
const SeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "About Renova Life Care — Compassionate Healthcare in Bangladesh",
    meta_description: "Learn about Renova Life Care's mission, vision, and leadership team. Delivering compassionate, world-class medicine to the people of Bangladesh since 2010.",
    og_title: "About Renova Life Care Ltd.",
    og_description: "Compassionate Care, Expert Medicine — Serving Bangladesh since 2010.",
    og_image: "/images/og-about.jpg",
    canonical_url: "https://renovalifecare.com/about",
    robots: "index, follow",
    keywords: "about Renova, healthcare Bangladesh, compassionate care"
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
              <span className="wc-field-hint">Recommended: 50-60 characters</span>
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Meta Description</label>
              <textarea className="wc-textarea" value={data.meta_description} onChange={e => set("meta_description", e.target.value)} rows={3} />
              <span className="wc-field-hint">Recommended: 150-160 characters</span>
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Keywords</label>
              <input className="wc-input" value={data.keywords} onChange={e => set("keywords", e.target.value)} />
              <span className="wc-field-hint">Comma separated keywords</span>
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Canonical URL</label>
              <input className="wc-input" value={data.canonical_url} onChange={e => set("canonical_url", e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const ImageUploadField = ({ label, hint, value, onChange, isAvatar = false, multiple = false }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    if (multiple) {
      const imageUrls = files.map(file => URL.createObjectURL(file));
      onChange?.(imageUrls);
    } else {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      onChange?.(imageUrl);
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeImage = () => {
    if (value && value.startsWith('blob:')) {
      URL.revokeObjectURL(value);
    }
    onChange?.(null);
  };

  return (
    <div className="wc-field">
      {label && <label className="wc-field-label">{label}</label>}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        multiple={multiple}
        onChange={handleFileSelect}
      />
      {value ? (
        <div className={`wc-image-preview ${isAvatar ? 'wc-avatar-preview' : ''}`}>
          <img src={value} alt={label || "Uploaded image"} />
          <div className="wc-image-preview-actions">
            <button
              className="wc-img-action-btn"
              onClick={triggerUpload}
              title="Replace image"
            >
              <Upload size={13} />
            </button>
            <button
              className="wc-img-action-btn"
              onClick={removeImage}
              title="Remove image"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      ) : (
        <div className={`wc-image-upload ${isAvatar ? 'wc-avatar-upload' : ''}`} onClick={triggerUpload}>
          <div className="wc-image-upload-icon">
            <Upload size={20} />
          </div>
          <p>Click to browse from desktop</p>
          <span>PNG, JPG, WEBP up to 5MB {multiple ? "(multiple allowed)" : ""}</span>
        </div>
      )}
      {hint && <span className="wc-field-hint">{hint}</span>}
    </div>
  );
};

export default AboutPage;