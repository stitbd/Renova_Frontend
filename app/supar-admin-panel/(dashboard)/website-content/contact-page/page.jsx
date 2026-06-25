"use client";

import { useState } from "react";
import {
  Phone,
  Layout,
  Search,
  MapPin,
  Mail,
  Clock,
  Check,
  ChevronDown,
  Save,
  RefreshCw,
  Eye,
  Plus,
  Trash,
  X,
  ExternalLink,
  Upload,
  Globe,
  Users,
  MessageSquare,
  Send,
  Calendar,
  User
} from "lucide-react";
import "./contact.css";

const ContactPage = () => {
  const [selectedSection, setSelectedSection] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const sections = [
    { id: "hero", label: "Hero Section", icon: Layout },
    { id: "contact-info", label: "Contact Info", icon: Phone },
    { id: "map", label: "Map & Location", icon: MapPin },
    { id: "form-settings", label: "Form Settings", icon: MessageSquare },
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
      case "contact-info":
        return <ContactInfoEditor />;
      case "map":
        return <MapEditor />;
      case "form-settings":
        return <FormSettingsEditor />;
      case "seo":
        return <SeoEditor />;
      default:
        return <HeroEditor />;
    }
  };

  return (
    <div className="wc-contact-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">Contact</span>
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
                  <Phone size={20} />
                </div>
                <div className="wc-page-info-text">
                  <h2>Contact Page</h2>
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
    trust_badge_text: "CONTACT US",
    headline: "Get in Touch With Us",
    description: "We're here to help. Reach out to us for appointments, inquiries, or any assistance you need.",
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

// Contact Info Editor
const ContactInfoEditor = () => {
  const [data, setData] = useState({
    section_label: "Contact Information",
    heading: "Reach Out to Us",
    subheading: "We're available 24/7 to assist you with your healthcare needs.",
    contact_items: [
      { icon: "phone", label: "Phone", value: "+880 1234-567890" },
      { icon: "mail", label: "Email", value: "info@renovalifecare.com" },
      { icon: "map-pin", label: "Address", value: "Dhaka, Bangladesh" },
      { icon: "clock", label: "Working Hours", value: "24/7 Available" }
    ],
    social_links: [
      { platform: "Facebook", url: "https://facebook.com/renova" },
      { platform: "YouTube", url: "https://youtube.com/renova" },
      { platform: "LinkedIn", url: "https://linkedin.com/renova" }
    ]
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Phone size={15} /> Contact Info Section</h3>
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
          <h3 className="wc-editor-card-title"><Phone size={15} /> Contact Details</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-contact-items">
            {data.contact_items.map((item, i) => (
              <div key={i} className="wc-contact-item">
                <div className="wc-contact-item-icon">
                  <input className="wc-input" value={item.icon} onChange={e => {
                    const items = [...data.contact_items];
                    items[i] = { ...items[i], icon: e.target.value };
                    set("contact_items", items);
                  }} placeholder="Icon name" style={{ width: '100px' }} />
                </div>
                <div className="wc-contact-item-fields">
                  <input className="wc-input" value={item.label} onChange={e => {
                    const items = [...data.contact_items];
                    items[i] = { ...items[i], label: e.target.value };
                    set("contact_items", items);
                  }} placeholder="Label" />
                  <input className="wc-input" value={item.value} onChange={e => {
                    const items = [...data.contact_items];
                    items[i] = { ...items[i], value: e.target.value };
                    set("contact_items", items);
                  }} placeholder="Value" />
                  <button className="wc-btn wc-btn-danger"><Trash size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Globe size={15} /> Social Media Links</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-social-links">
            {data.social_links.map((link, i) => (
              <div key={i} className="wc-social-link">
                <input className="wc-input" value={link.platform} onChange={e => {
                  const links = [...data.social_links];
                  links[i] = { ...links[i], platform: e.target.value };
                  set("social_links", links);
                }} placeholder="Platform" />
                <input className="wc-input" value={link.url} onChange={e => {
                  const links = [...data.social_links];
                  links[i] = { ...links[i], url: e.target.value };
                  set("social_links", links);
                }} placeholder="URL" />
                <button className="wc-btn wc-btn-danger"><Trash size={14} /></button>
              </div>
            ))}
            <button className="wc-repeater-add"><Plus size={14} /> Add Social Link</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Map Editor
const MapEditor = () => {
  const [data, setData] = useState({
    section_label: "Our Location",
    heading: "Find Us",
    subheading: "Visit us at our main branch or find a location near you.",
    map_embed_code: '<iframe src="https://www.google.com/maps/embed?pb=!1m18..." width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe>',
    branches: [
      { name: "Dhanmondi Branch", address: "123, Dhanmondi, Dhaka", phone: "+880 1234-567890" },
      { name: "Gulshan Branch", address: "456, Gulshan, Dhaka", phone: "+880 1234-567891" }
    ]
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><MapPin size={15} /> Map Section</h3>
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
          <h3 className="wc-editor-card-title"><MapPin size={15} /> Map Embed Code</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field">
            <label className="wc-field-label">Google Maps Embed Code</label>
            <textarea className="wc-textarea lg" value={data.map_embed_code} onChange={e => set("map_embed_code", e.target.value)} rows={6} />
            <span className="wc-field-hint">Paste the iframe embed code from Google Maps</span>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><MapPin size={15} /> Branch Locations</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-branches">
            {data.branches.map((branch, i) => (
              <div key={i} className="wc-branch-item">
                <input className="wc-input" value={branch.name} onChange={e => {
                  const b = [...data.branches];
                  b[i] = { ...b[i], name: e.target.value };
                  set("branches", b);
                }} placeholder="Branch Name" />
                <input className="wc-input" value={branch.address} onChange={e => {
                  const b = [...data.branches];
                  b[i] = { ...b[i], address: e.target.value };
                  set("branches", b);
                }} placeholder="Address" />
                <input className="wc-input" value={branch.phone} onChange={e => {
                  const b = [...data.branches];
                  b[i] = { ...b[i], phone: e.target.value };
                  set("branches", b);
                }} placeholder="Phone" />
                <button className="wc-btn wc-btn-danger"><Trash size={14} /></button>
              </div>
            ))}
            <button className="wc-repeater-add"><Plus size={14} /> Add Branch</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Form Settings Editor
const FormSettingsEditor = () => {
  const [data, setData] = useState({
    section_label: "Send Us a Message",
    heading: "Contact Form",
    subheading: "Fill in the form below and we'll get back to you within 24 hours.",
    form_fields: [
      { label: "Name", type: "text", required: true, placeholder: "Your Name" },
      { label: "Email", type: "email", required: true, placeholder: "your@email.com" },
      { label: "Phone", type: "tel", required: false, placeholder: "Phone Number" },
      { label: "Subject", type: "text", required: false, placeholder: "Subject" },
      { label: "Message", type: "textarea", required: true, placeholder: "Your Message" }
    ],
    submit_button_text: "Send Message",
    success_message: "Thank you for contacting us! We'll get back to you soon.",
    email_recipient: "info@renovalifecare.com",
    email_subject: "New Contact Form Submission"
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><MessageSquare size={15} /> Form Section</h3>
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
          <h3 className="wc-editor-card-title"><MessageSquare size={15} /> Form Fields</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-form-fields">
            {data.form_fields.map((field, i) => (
              <div key={i} className="wc-form-field">
                <input className="wc-input" value={field.label} onChange={e => {
                  const f = [...data.form_fields];
                  f[i] = { ...f[i], label: e.target.value };
                  set("form_fields", f);
                }} placeholder="Field Label" />
                <input className="wc-input" value={field.type} onChange={e => {
                  const f = [...data.form_fields];
                  f[i] = { ...f[i], type: e.target.value };
                  set("form_fields", f);
                }} placeholder="Field Type (text, email, tel, textarea)" />
                <input className="wc-input" value={field.placeholder} onChange={e => {
                  const f = [...data.form_fields];
                  f[i] = { ...f[i], placeholder: e.target.value };
                  set("form_fields", f);
                }} placeholder="Placeholder" />
                <div className="wc-form-field-actions">
                  <ToggleSwitch label="Required" checked={field.required} />
                  <button className="wc-btn wc-btn-danger"><Trash size={14} /></button>
                </div>
              </div>
            ))}
            <button className="wc-repeater-add"><Plus size={14} /> Add Form Field</button>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Send size={15} /> Form Settings</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field">
              <label className="wc-field-label">Submit Button Text</label>
              <input className="wc-input" value={data.submit_button_text} onChange={e => set("submit_button_text", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Email Recipient</label>
              <input className="wc-input" value={data.email_recipient} onChange={e => set("email_recipient", e.target.value)} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Email Subject</label>
              <input className="wc-input" value={data.email_subject} onChange={e => set("email_subject", e.target.value)} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Success Message</label>
              <textarea className="wc-textarea" value={data.success_message} onChange={e => set("success_message", e.target.value)} rows={2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// SEO Editor
const SeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "Contact Us — Renova Life Care | Healthcare Bangladesh",
    meta_description: "Get in touch with Renova Life Care for appointments, inquiries, and healthcare assistance.",
    og_title: "Contact Us | Renova Life Care",
    og_description: "We're here to help with all your healthcare needs.",
    og_image: "/images/og-contact.jpg",
    canonical_url: "https://renovalifecare.com/contact",
    robots: "index, follow",
    keywords: "contact, healthcare Bangladesh, appointment, Renova Life Care"
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
const ToggleSwitch = ({ label, checked }) => {
  return (
    <div className="wc-toggle-row">
      <div className="wc-toggle-info">
        <h4>{label}</h4>
      </div>
      <label className="wc-switch">
        <input type="checkbox" defaultChecked={checked} />
        <span className="wc-switch-slider" />
      </label>
    </div>
  );
};

export default ContactPage;