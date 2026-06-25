// app/supar-admin-panel/website-content/testimonials/page.jsx
"use client";

import { useState } from "react";
import {
  Home,
  Layout,
  MessageCircle,
  Search,
  Eye,
  Save,
  RefreshCw,
  Check,
  Users,
  Image as ImageIcon,
  Star,
  Upload,
  Plus,
  X,
  Clock,
  ChevronDown,
  List,
  ExternalLink,
  Award
} from "lucide-react";
import "./testimonials.css";

const TestimonialsPage = () => {
  const [selectedSection, setSelectedSection] = useState("testimonials");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  // Section definitions for Testimonials & SEO page
  const sections = [
    { id: "testimonials", label: "Testimonials", icon: MessageCircle },
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
      case "testimonials":
        return <TestimonialsEditor />;
      case "seo":
        return <SeoEditor />;
      default:
        return <TestimonialsEditor />;
    }
  };

  return (
    <div className="wc-home-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">Testimonials & SEO</span>
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
                  <h2>Testimonials & SEO Page</h2>
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

// Testimonials Editor Component
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
    testimonials: [
      {
        id: 1,
        name: "Dr. Md. Abdur Rahman",
        designation: "Cardiologist",
        address: "Dhaka, Bangladesh",
        rating: 5,
        text: "Renova Life Care has transformed my practice. The state-of-the-art facilities and compassionate care approach have significantly improved patient outcomes. I'm proud to be associated with this institution.",
        image: "/images/testimonial-1.jpg"
      },
      {
        id: 2,
        name: "Professor Dr. Shahida Akhtar",
        designation: "Neurology Specialist",
        address: "Chittagong, Bangladesh",
        rating: 5,
        text: "The level of expertise and patient-centered care at Renova is exceptional. Their diagnostic capabilities and treatment protocols are world-class, making them a trusted choice for neurological care.",
        image: "/images/testimonial-2.jpg"
      },
      {
        id: 3,
        name: "Dr. Md. Kamal Hossain",
        designation: "Orthopedic Surgeon",
        address: "Sylhet, Bangladesh",
        rating: 4.5,
        text: "I've been practicing at Renova Life Care for over 5 years. The advanced surgical facilities and multidisciplinary approach enable us to provide comprehensive orthopedic care to our patients.",
        image: "/images/testimonial-3.jpg"
      }
    ]
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  const addTestimonial = () => {
    const newTestimonial = {
      id: Date.now(),
      name: "",
      designation: "",
      address: "",
      rating: 5,
      text: "",
      image: ""
    };
    set("testimonials", [...data.testimonials, newTestimonial]);
  };

  const removeTestimonial = (id) => {
    set("testimonials", data.testimonials.filter(t => t.id !== id));
  };

  const updateTestimonial = (id, field, value) => {
    set("testimonials", data.testimonials.map(t =>
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  const renderStars = (rating, id) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <button key={i} className="wc-star-btn active" onClick={() => updateTestimonial(id, "rating", i)}>
            ★
          </button>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <button key={i} className="wc-star-btn active" onClick={() => updateTestimonial(id, "rating", i - 0.5)}>
            ★
          </button>
        );
      } else {
        stars.push(
          <button key={i} className="wc-star-btn" onClick={() => updateTestimonial(id, "rating", i)}>
            ★
          </button>
        );
      }
    }
    return stars;
  };

  return (
    <div className="wc-home-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><MessageCircle size={15} /> Testimonials Section</h3>
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
              <ToggleSwitch label="Show Ratings" checked={true} />
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
          <h3 className="wc-editor-card-title"><List size={15} /> Satisfaction Stats</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-stat-inputs">
            {data.stats.map((stat, i) => (
              <div key={i} className="wc-stat-input-item">
                <label>{stat.label}</label>
                <input
                  value={stat.value}
                  onChange={e => {
                    const s = [...data.stats];
                    s[i] = { ...s[i], value: e.target.value };
                    set("stats", s);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Star size={15} /> Testimonial Cards</h3>
          <span className="wc-editor-card-desc">{data.testimonials.length} entries</span>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-repeater-testimonials">
            {data.testimonials.map((testimonial) => (
              <div key={testimonial.id} className="wc-testimonial-card">
                <div className="wc-testimonial-card-header">
                  <div className="wc-testimonial-avatar">
                    {testimonial.image ? (
                      <img src={testimonial.image} alt={testimonial.name} />
                    ) : (
                      <User size={24} />
                    )}
                  </div>
                  <div className="wc-testimonial-info">
                    <input
                      className="wc-testimonial-name"
                      placeholder="Full Name *"
                      value={testimonial.name}
                      onChange={e => updateTestimonial(testimonial.id, "name", e.target.value)}
                      style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%' }}
                    />
                    <input
                      className="wc-testimonial-designation"
                      placeholder="Designation"
                      value={testimonial.designation}
                      onChange={e => updateTestimonial(testimonial.id, "designation", e.target.value)}
                      style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '12px', color: '#64748b' }}
                    />
                    <input
                      className="wc-testimonial-address"
                      placeholder="Location"
                      value={testimonial.address}
                      onChange={e => updateTestimonial(testimonial.id, "address", e.target.value)}
                      style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '12px', color: '#94a3b8' }}
                    />
                  </div>
                  <button
                    className="wc-testimonial-remove"
                    onClick={() => removeTestimonial(testimonial.id)}
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="wc-testimonial-card-body">
                  <div className="wc-testimonial-rating">
                    {renderStars(testimonial.rating, testimonial.id)}
                  </div>
                  <textarea
                    className="wc-testimonial-text"
                    placeholder="Write the testimonial text..."
                    value={testimonial.text}
                    onChange={e => updateTestimonial(testimonial.id, "text", e.target.value)}
                    rows={3}
                    style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px', fontSize: '13px', fontFamily: 'inherit', width: '100%', resize: 'vertical' }}
                  />
                </div>
                <div className="wc-testimonial-card-footer">
                  <ImageUploadField
                    label="Photo"
                    hint="Upload testimonial photo"
                    value={testimonial.image}
                    onChange={(val) => updateTestimonial(testimonial.id, "image", val)}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="wc-repeater-add" onClick={addTestimonial}>
            <Plus size={14} /> Add Testimonial
          </button>
        </div>
      </div>
    </div>
  );
};

// Seo Editor Component
const SeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "Patient Testimonials | Renova Life Care Bangladesh",
    meta_description: "Read real patient testimonials and success stories from Renova Life Care. See how our expert healthcare services have transformed lives across Bangladesh.",
    og_title: "Patient Testimonials | Renova Life Care",
    og_description: "Real patient experiences at Renova Life Care - Bangladesh's trusted healthcare provider.",
    og_image: "/images/og-testimonials.jpg",
    canonical_url: "https://renovalifecare.com/testimonials",
    robots: "index, follow",
    keywords: "patient testimonials, healthcare reviews, Renova Life Care, Bangladesh healthcare"
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
                <span className="wc-field-counter">0/60</span>
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
                <span className="wc-field-counter">0/160</span>
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
          <h3 className="wc-editor-card-title"><Award size={15} /> Schema Markup</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">JSON-LD Schema</label>
              <textarea
                className="wc-textarea xl"
                value={`{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Patient Testimonials",
  "description": "Real patient experiences at Renova Life Care",
  "about": {
    "@type": "MedicalOrganization",
    "name": "Renova Life Care Ltd.",
    "medicalSpecialty": "General Healthcare"
  },
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Dr. Md. Abdur Rahman"
        },
        "reviewBody": "Renova Life Care has transformed my practice.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ]
  }
}`}
                onChange={() => { }}
                style={{ fontFamily: 'monospace', fontSize: '12px' }}
              />
              <span className="wc-field-hint">This schema helps search engines understand your testimonials page</span>
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
        <div className="wc-image-upload" onClick={() => onChange?.("/images/placeholder.jpg")}>
          <div className="wc-image-upload-icon"><Upload size={20} /></div>
          <p>Click to upload image</p>
          <span>PNG, JPG, WEBP up to 5MB</span>
        </div>
      )}
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

// User icon for avatar placeholder
const User = ({ size }) => (
  <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default TestimonialsPage;