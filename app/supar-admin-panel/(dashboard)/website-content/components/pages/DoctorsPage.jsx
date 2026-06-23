"use client";

import { useState } from "react";
import {
  UserCheck,
  Layout,
  Search,
  UserPlus,
  User,
  Users,
  List,
  Clock,
  Star,
  Heart,
  Calendar,
  MessageCircle,
  Award,
  Check,
  ChevronDown,
  Save,
  RefreshCw,
  Eye,
  ExternalLink,
  Upload,
  Trash,
  Plus,
  X,
  Grid,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import "./styles/doctors.css";

const DoctorsPage = () => {
  const [selectedSection, setSelectedSection] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const sections = [
    { id: "hero", label: "Hero Section", icon: Layout },
    { id: "doctor-listing", label: "Doctor Listing", icon: Users },
    { id: "career-cta", label: "Career CTA", icon: UserPlus },
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
      case "doctor-listing":
        return <DoctorListingEditor />;
      case "career-cta":
        return <CareerCTAEditor />;
      case "seo":
        return <SeoEditor />;
      default:
        return <HeroEditor />;
    }
  };

  return (
    <div className="wc-doctors-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">Doctors</span>
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
                  <UserCheck size={20} />
                </div>
                <div className="wc-page-info-text">
                  <h2>Doctors Page</h2>
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

// Hero Editor (reused from Home)
const HeroEditor = () => {
  const [data, setData] = useState({
    trust_badge_text: "OUR MEDICAL TEAM",
    headline: "Meet Our Specialist Doctors",
    description: "Internationally trained, BMDC-certified doctors dedicated to delivering the highest standard of patient care.",
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

// Doctor Listing Editor
const DoctorListingEditor = () => {
  const [data, setData] = useState({
    search_placeholder: "Search by doctor name...",
    filter_specialties_label: "All Specialties",
    filter_branches_label: "All Branches",
    filter_consultation_label: "Consultation Type",
    doctors: []
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Search size={15} /> Search & Filter Labels</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Search Placeholder Text</label>
              <input className="wc-input" value={data.search_placeholder} onChange={e => set("search_placeholder", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Specialty Filter Label</label>
              <input className="wc-input" value={data.filter_specialties_label} onChange={e => set("filter_specialties_label", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Branch Filter Label</label>
              <input className="wc-input" value={data.filter_branches_label} onChange={e => set("filter_branches_label", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Consultation Filter Label</label>
              <input className="wc-input" value={data.filter_consultation_label} onChange={e => set("filter_consultation_label", e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Users size={15} /> Doctor Cards</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-doctor-grid">
            {/* Doctor cards will be rendered here */}
            <div className="wc-doctor-card">
              <div className="wc-doctor-card-image">
                <ImageUploadField label="Doctor Photo" hint="300×300px circular" />
              </div>
              <div className="wc-doctor-card-info">
                <input className="wc-input" placeholder="Dr. Full Name" />
                <input className="wc-input" placeholder="Specialty" />
                <input className="wc-input" placeholder="Credentials" />
                <div className="wc-doctor-card-stats">
                  <input className="wc-input" placeholder="Experience" />
                  <input className="wc-input" placeholder="Rating" />
                  <input className="wc-input" placeholder="Patients" />
                </div>
                <ToggleSwitch label="Available" checked={true} />
              </div>
            </div>
          </div>
          <button className="wc-repeater-add"><Plus size={14} /> Add Doctor</button>
        </div>
      </div>
    </div>
  );
};

// Career CTA Editor
const CareerCTAEditor = () => {
  const [data, setData] = useState({
    section_label: "CAREER OPPORTUNITIES",
    heading: "Are You a Medical Professional?",
    description: "We are always looking for talented, passionate doctors and healthcare workers to join our growing team.",
    button_text: "Apply Now",
    button_url: "/careers",
    features: [
      "Competitive salary and benefits",
      "Modern, well-equipped facilities",
      "International training opportunities",
      "Collaborative and supportive team"
    ],
    stats: [
      { label: "SPECIALISTS", value: "50+" },
      { label: "DEPARTMENTS", value: "15+" },
      { label: "BMDC CERTIFIED", value: "100%" }
    ]
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><UserPlus size={15} /> Career CTA Section</h3>
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
              <label className="wc-field-label">Description</label>
              <textarea className="wc-textarea" value={data.description} onChange={e => set("description", e.target.value)} rows={3} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Button Text</label>
              <input className="wc-input" value={data.button_text} onChange={e => set("button_text", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Button URL</label>
              <input className="wc-input" value={data.button_url} onChange={e => set("button_url", e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Check size={15} /> Feature Bullets (4 items)</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-features-bullets">
            {data.features.map((feat, i) => (
              <input key={i} className="wc-input" value={feat} onChange={e => {
                const f = [...data.features];
                f[i] = e.target.value;
                set("features", f);
              }} />
            ))}
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><List size={15} /> Stats (3 Items)</h3>
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

// SEO Editor (reused)
const SeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "Our Specialist Doctors | Renova Life Care Ltd.",
    meta_description: "Meet our team of BMDC-certified specialist doctors at Renova Life Care.",
    og_title: "Meet Our Specialist Doctors",
    og_description: "Internationally trained, BMDC-certified doctors dedicated to patient care.",
    og_image: "/images/og-doctors.jpg",
    canonical_url: "https://renovalifecare.com/doctors",
    robots: "index, follow",
    keywords: "specialist doctors Bangladesh, BMDC certified doctors"
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

export default DoctorsPage;