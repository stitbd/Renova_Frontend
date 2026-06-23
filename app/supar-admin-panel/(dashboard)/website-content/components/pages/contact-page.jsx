// super-admin-panel/website-content/contact-page/page.jsx
"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import "./contact-page.css";
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
  MapPin,
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
  Send,
  MessageSquare,
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
    map: MapPin,
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
    send: Send,
    message: MessageSquare,
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
   INITIAL CONTACT PAGE DATA
   ══════════════════════════════════════════════════════════════ */
const INITIAL_CONTACT_DATA = {
  hero: {
    section_header_title: "Contact Us",
    section_header_subtitle: "We'd love to hear from you. Reach out to us anytime.",
    contact_info: [
      { icon: "map", title: "Address", value: "123 Health Avenue, Dhaka, Bangladesh" },
      { icon: "phone", title: "Phone", value: "+880 1234-567890" },
      { icon: "mail", title: "Email", value: "info@renovalifecare.com" },
      { icon: "clock", title: "Working Hours", value: "Sun-Thu: 8AM-8PM, Fri: 2PM-8PM" }
    ]
  },
  form: {
    title: "Send Us a Message",
    subtitle: "Fill in the form below and we will get back to you within 24 hours.",
    fields: [
      { name: "fullName", label: "Full Name", type: "text", required: true, placeholder: "Your full name" },
      { name: "email", label: "Email Address", type: "email", required: true, placeholder: "your@email.com" },
      { name: "phone", label: "Phone Number", type: "tel", required: false, placeholder: "+880 1XXX-XXXXXX" },
      { name: "subject", label: "Subject", type: "select", required: true, options: ["Book Appointment", "General Inquiry", "Services Info", "Billing & Payments", "Feedback", "Media & Press", "Other"] },
      { name: "message", label: "Message", type: "textarea", required: true, placeholder: "Tell us how we can help you...", rows: 5 }
    ],
    submit_text: "Send Message",
    success_text: "Message Sent!",
    success_description: "Thank you for contacting us. We will respond within 24 hours."
  },
  social: {
    title: "Connect With Us",
    links: [
      { platform: "facebook", url: "https://facebook.com/renovalifecare" },
      { platform: "twitter", url: "https://twitter.com/renovalifecare" },
      { platform: "linkedin", url: "https://linkedin.com/company/renovalifecare" },
      { platform: "youtube", url: "https://youtube.com/renovalifecare" },
      { platform: "instagram", url: "https://instagram.com/renovalifecare" }
    ]
  },
  departments: {
    title: "Department Contacts",
    items: [
      { name: "Emergency", phone: "+880 1234-567890" },
      { name: "Appointments", phone: "+880 1234-567891" },
      { name: "Pharmacy", phone: "+880 1234-567892" },
      { name: "Billing", phone: "+880 1234-567893" }
    ]
  },
  map: {
    embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9!2d90.4125!3d23.7905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ3JzI1LjgiTiA5MMKwMjQnNDUuMCJF!5e0!3m2!1sen!2sbd!4v1600000000000!5m2!1sen!2sbd"
  },
  seo: {
    meta_title: "Contact Renova Life Care — Get in Touch",
    meta_description: "Contact Renova Life Care for appointments, inquiries, and feedback. Our team is here to help you 24/7.",
    og_title: "Contact Renova Life Care",
    og_description: "Reach out to us for any questions or support.",
    og_image: "/images/og-contact.jpg",
    canonical_url: "https://renovalifecare.com/contact",
    robots: "index, follow",
    keywords: "contact Renova, healthcare Bangladesh, appointment booking, customer support"
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
const ContactHeroEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });

  const addContactInfo = () => ({
    icon: "map",
    title: "New Contact Info",
    value: "Enter value here"
  });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="layout" size={15} /> Hero Section Header</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Header Title</label>
              <input className="wc-input" value={data?.section_header_title || ""} onChange={e => set("section_header_title", e.target.value)} placeholder="Contact Us" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Header Subtitle</label>
              <textarea className="wc-textarea" value={data?.section_header_subtitle || ""} onChange={e => set("section_header_subtitle", e.target.value)} rows={2} placeholder="We'd love to hear from you..." />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="info" size={15} /> Contact Information Cards</h3>
        </div>
        <div className="wc-editor-card-body">
          <Repeater
            label="Contact Info Items"
            hint="Add/Edit the 4 contact info cards"
            items={data?.contact_info || []}
            onChange={v => set("contact_info", v)}
            onAdd={addContactInfo}
            className="wc-repeater-contact"
            renderItem={(item, i, update, remove) => (
              <div className="wc-contact-card">
                <div className="wc-contact-header">
                  <select className="wc-select" value={item.icon} onChange={e => update(i, { ...item, icon: e.target.value })} style={{ width: 'auto', minWidth: 120 }}>
                    <option value="map">Address</option>
                    <option value="phone">Phone</option>
                    <option value="mail">Email</option>
                    <option value="clock">Working Hours</option>
                    <option value="globe">Website</option>
                  </select>
                  <button className="wc-repeater-remove-icon" onClick={() => remove(i)}>
                    <Icon name="trash" size={14} />
                  </button>
                </div>
                <input className="wc-input" value={item.title} onChange={e => update(i, { ...item, title: e.target.value })} placeholder="Title" />
                <textarea className="wc-textarea" value={item.value} onChange={e => update(i, { ...item, value: e.target.value })} placeholder="Value" rows={2} />
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   FORM EDITOR
   ══════════════════════════════════════════════════════════════ */
const ContactFormEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });

  const addField = () => ({
    name: `field_${Date.now()}`,
    label: "New Field",
    type: "text",
    required: false,
    placeholder: "Enter value..."
  });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="message" size={15} /> Form Settings</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Form Title</label>
              <input className="wc-input" value={data?.title || ""} onChange={e => set("title", e.target.value)} placeholder="Send Us a Message" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Form Subtitle</label>
              <textarea className="wc-textarea" value={data?.subtitle || ""} onChange={e => set("subtitle", e.target.value)} rows={2} placeholder="Form description..." />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Submit Button Text</label>
              <input className="wc-input" value={data?.submit_text || ""} onChange={e => set("submit_text", e.target.value)} placeholder="Send Message" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Success Message Title</label>
              <input className="wc-input" value={data?.success_text || ""} onChange={e => set("success_text", e.target.value)} placeholder="Message Sent!" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Success Description</label>
              <textarea className="wc-textarea" value={data?.success_description || ""} onChange={e => set("success_description", e.target.value)} rows={2} placeholder="Thank you for contacting us..." />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="list" size={15} /> Form Fields</h3>
        </div>
        <div className="wc-editor-card-body">
          <Repeater
            label="Form Fields"
            hint="Add/Edit form fields"
            items={data?.fields || []}
            onChange={v => set("fields", v)}
            onAdd={addField}
            className="wc-repeater-fields"
            renderItem={(field, i, update, remove) => (
              <div className="wc-field-card">
                <div className="wc-field-header">
                  <span className="wc-field-name">{field.label || "Unnamed Field"}</span>
                  <button className="wc-repeater-remove-icon" onClick={() => remove(i)}>
                    <Icon name="trash" size={14} />
                  </button>
                </div>
                <div className="wc-field-grid">
                  <input className="wc-input" value={field.label} onChange={e => update(i, { ...field, label: e.target.value })} placeholder="Label" />
                  <input className="wc-input" value={field.name} onChange={e => update(i, { ...field, name: e.target.value })} placeholder="Field Name" />
                  <select className="wc-select" value={field.type} onChange={e => update(i, { ...field, type: e.target.value })}>
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="tel">Phone</option>
                    <option value="textarea">Textarea</option>
                    <option value="select">Select</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="date">Date</option>
                  </select>
                  <label className="wc-checkbox-label">
                    <input type="checkbox" checked={field.required} onChange={e => update(i, { ...field, required: e.target.checked })} />
                    Required
                  </label>
                </div>
                <input className="wc-input" value={field.placeholder || ""} onChange={e => update(i, { ...field, placeholder: e.target.value })} placeholder="Placeholder" />
                {field.type === "select" && field.options && (
                  <input className="wc-input" value={field.options.join(", ")} onChange={e => update(i, { ...field, options: e.target.value.split(",").map(s => s.trim()) })} placeholder="Options (comma separated)" />
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
   SOCIAL LINKS EDITOR
   ══════════════════════════════════════════════════════════════ */
const SocialLinksEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });

  const addLink = () => ({
    platform: "facebook",
    url: "https://"
  });

  return (
    <div className="wc-editor-card">
      <div className="wc-editor-card-header">
        <h3 className="wc-editor-card-title"><Icon name="users" size={15} /> Social Media Links</h3>
      </div>
      <div className="wc-editor-card-body">
        <div className="wc-field">
          <label className="wc-field-label">Social Section Title</label>
          <input className="wc-input" value={data?.title || ""} onChange={e => set("title", e.target.value)} placeholder="Connect With Us" />
        </div>
        <Repeater
          label="Social Links"
          hint="Add/Edit social media links"
          items={data?.links || []}
          onChange={v => set("links", v)}
          onAdd={addLink}
          className="wc-repeater-social"
          renderItem={(link, i, update, remove) => (
            <div className="wc-social-card">
              <select className="wc-select" value={link.platform} onChange={e => update(i, { ...link, platform: e.target.value })} style={{ width: 'auto', minWidth: 120 }}>
                <option value="facebook">Facebook</option>
                <option value="twitter">Twitter</option>
                <option value="linkedin">LinkedIn</option>
                <option value="youtube">YouTube</option>
                <option value="instagram">Instagram</option>
              </select>
              <input className="wc-input" value={link.url} onChange={e => update(i, { ...link, url: e.target.value })} placeholder="https://..." />
              <button className="wc-repeater-remove-icon" onClick={() => remove(i)}>
                <Icon name="trash" size={14} />
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   DEPARTMENTS EDITOR
   ══════════════════════════════════════════════════════════════ */
const DepartmentsEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });

  const addDepartment = () => ({
    name: "New Department",
    phone: "+880 "
  });

  return (
    <div className="wc-editor-card">
      <div className="wc-editor-card-header">
        <h3 className="wc-editor-card-title"><Icon name="building" size={15} /> Department Contacts</h3>
      </div>
      <div className="wc-editor-card-body">
        <div className="wc-field">
          <label className="wc-field-label">Department Section Title</label>
          <input className="wc-input" value={data?.title || ""} onChange={e => set("title", e.target.value)} placeholder="Department Contacts" />
        </div>
        <Repeater
          label="Departments"
          hint="Add/Edit department contacts"
          items={data?.items || []}
          onChange={v => set("items", v)}
          onAdd={addDepartment}
          className="wc-repeater-departments"
          renderItem={(dept, i, update, remove) => (
            <div className="wc-dept-card">
              <input className="wc-input" value={dept.name} onChange={e => update(i, { ...dept, name: e.target.value })} placeholder="Department Name" />
              <input className="wc-input" value={dept.phone} onChange={e => update(i, { ...dept, phone: e.target.value })} placeholder="Phone Number" />
              <button className="wc-repeater-remove-icon" onClick={() => remove(i)}>
                <Icon name="trash" size={14} />
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   MAP EDITOR
   ══════════════════════════════════════════════════════════════ */
const MapEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });

  return (
    <div className="wc-editor-card">
      <div className="wc-editor-card-header">
        <h3 className="wc-editor-card-title"><Icon name="map" size={15} /> Map Embed</h3>
      </div>
      <div className="wc-editor-card-body">
        <div className="wc-field">
          <label className="wc-field-label">Google Maps Embed URL</label>
          <textarea className="wc-textarea" value={data?.embed_url || ""} onChange={e => set("embed_url", e.target.value)} rows={3} placeholder="https://www.google.com/maps/embed?pb=..." />
          <span className="wc-field-hint">Get the embed URL from Google Maps Share Embed a map</span>
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
        <div className="wc-seo-preview-url">{data?.canonical_url || "https://renovalifecare.com/contact"}</div>
        <div className="wc-seo-preview-title">{data?.meta_title || "Contact Renova Life Care"}</div>
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
              <input className="wc-input" value={data?.meta_title || ""} onChange={e => set("meta_title", e.target.value)} placeholder="Contact Renova Life Care — Get in Touch" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Meta Description <span className={`wc-field-counter ${descLen > 155 ? "warn" : ""}`}>{descLen}/170</span></label>
              <textarea className="wc-textarea" value={data?.meta_description || ""} onChange={e => set("meta_description", e.target.value)} rows={3} placeholder="Contact us for appointments, inquiries, and feedback..." />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Keywords</label>
              <input className="wc-input" value={data?.keywords || ""} onChange={e => set("keywords", e.target.value)} placeholder="contact, appointment, support, inquiry" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Canonical URL</label>
              <input className="wc-input" value={data?.canonical_url || ""} onChange={e => set("canonical_url", e.target.value)} placeholder="https://renovalifecare.com/contact" />
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
              <input className="wc-input" value={data?.og_title || ""} onChange={e => set("og_title", e.target.value)} placeholder="Contact Renova Life Care" />
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
  if (sectionId === "hero") return <ContactHeroEditor data={data} onChange={onChange} />;
  if (sectionId === "form") return <ContactFormEditor data={data} onChange={onChange} />;
  if (sectionId === "social") return <SocialLinksEditor data={data} onChange={onChange} />;
  if (sectionId === "departments") return <DepartmentsEditor data={data} onChange={onChange} />;
  if (sectionId === "map") return <MapEditor data={data} onChange={onChange} />;
  if (sectionId === "seo") return <SeoEditor data={data} onChange={onChange} />;
  return <div>Unknown section</div>;
};

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function ContactWebsiteContent() {
  const [selectedSection, setSelectedSection] = useState("hero");
  const [pageData, setPageData] = useState(INITIAL_CONTACT_DATA);
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
    showToast("Contact page changes saved successfully!", "success");
  };

  const handlePreview = () => {
    window.open("/contact", "_blank");
  };

  const handleReset = () => {
    if (confirm("Reset all Contact page content to default? This cannot be undone.")) {
      setPageData(INITIAL_CONTACT_DATA);
      showToast("Reset to default content", "success");
    }
  };

  const sections = [
    { id: "hero", label: "Hero Section", icon: "layout", desc: "Header & contact info cards" },
    { id: "form", label: "Contact Form", icon: "message", desc: "Form fields & settings" },
    { id: "social", label: "Social Links", icon: "users", desc: "Social media connections" },
    { id: "departments", label: "Departments", icon: "building", desc: "Department contacts" },
    { id: "map", label: "Map", icon: "map", desc: "Google Maps embed" },
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
    <div className="wc-contact-layout">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <Link href="/super-admin-panel/website-content" className="wc-breadcrumb-link">
              Website Content
            </Link>
            <Icon name="chevron-down" size={12} className="wc-breadcrumb-chevron" />
            <span className="wc-breadcrumb-current">Contact Page</span>
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
                  <h2>Contact Page Content</h2>
                  <p>Editing: {currentSection?.label} — {currentSection?.desc}</p>
                </div>
              </div>
              <div className="wc-page-info-meta">
                <span className="wc-meta-tag">
                  <Icon name="external" size={11} />
                  /contact
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