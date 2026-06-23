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
  Image,
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
  UserCheck
} from "lucide-react";
import "./news-page.css";

/* ══════════════════════════════════════════════════════════════
   INITIAL ABOUT PAGE DATA
   ══════════════════════════════════════════════════════════════ */
const INITIAL_ABOUT_DATA = {
  hero: {
    section_header_title: "About Lenova Life Care",
    section_header_subtitle: "Delivering compassionate, world-class medicine to the people of Bangladesh since 2010.",
    about_title: "Compassionate Care, Expert Medicine",
    about_description: "Renova Life Care Ltd. delivers world-class healthcare services across Bangladesh. From general checkups to specialized treatments, our expert doctors are here for you.",
    features: [
      { icon: "user-plus", title: "Expert Doctors", description: "BMDC-certified specialists with international training" },
      { icon: "layout", title: "Modern Facilities", description: "State-of-the-art equipment and hygienic environment" },
      { icon: "heart", title: "Patient-First Approach", description: "Compassionate care tailored to your needs" }
    ],
    stats: [
      { label: "Happy Patients", value: "15,000+" },
      { label: "Network in South Asia", value: "120+" },
      { label: "Setting new standards", value: "Excellence" }
    ]
  },
  missionVision: {
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
  },
  team: {
    section_title: "Our Leadership",
    section_subtitle: "The Team Behind Our Excellence",
    description: "Experienced leaders driving innovation, compassion, and quality across every department.",
    members: [
      {
        id: "md-1",
        name: "Dr. Homayon Kabir",
        role: "MANAGING DIRECTOR",
        specialty: "MBBS, FCPS (Medicine)",
        photo: "/images/team/md.jpg",
        quote: "At Renova Life Care, our mission has always been simple: to deliver world-class healthcare with a human touch. Every patient who walks through our doors deserves the best medical expertise paired with genuine compassion. We are committed to continuous growth, ethical practice, and making quality care accessible to all."
      },
      {
        id: "md-2",
        name: "Prof. Nasrin Akter",
        role: "MEDICAL DIRECTOR",
        specialty: "MBBS, MS (Gynaecology)",
        photo: "/images/team/medical-director.jpg"
      },
      {
        id: "coo-1",
        name: "Dr. Kamrun Nahar",
        role: "CHIEF OPERATIONS OFFICER",
        specialty: "MBA (Healthcare Management)",
        photo: "/images/team/coo.jpg"
      },
      {
        id: "hod-1",
        name: "Dr. Shirin Sultana",
        role: "HEAD OF DIAGNOSTICS",
        specialty: "MBBS, MD (Pathology)",
        photo: "/images/team/hod-diagnostics.jpg"
      },
      {
        id: "cfo-1",
        name: "Dr. Shehreen Amin Monami",
        role: "CHIEF FINANCIAL OFFICER",
        specialty: "CA, MBA (Finance)",
        photo: "/images/team/cfo.jpg"
      },
      {
        id: "hon-1",
        name: "Dr. Farhana Begum",
        role: "HEAD OF NURSING",
        specialty: "BSc Nursing, MPH",
        photo: "/images/team/hod-nursing.jpg"
      }
    ]
  },
  statsBar: {
    happy_patients: "15,000+",
    expert_doctors: "120+",
    departments: "35+",
    years_experience: "14"
  },
  seo: {
    meta_title: "About Renova Life Care — Compassionate Healthcare in Bangladesh",
    meta_description: "Learn about Renova Life Care's mission, vision, and leadership. World-class diagnostic and treatment services across Bangladesh since 2010.",
    og_title: "About Renova Life Care Ltd.",
    og_description: "Compassionate Care, Expert Medicine — Serving Bangladesh since 2010.",
    og_image: "/images/og-about.jpg",
    canonical_url: "https://renovalifecare.com/about",
    robots: "index, follow",
    keywords: "about Renova, healthcare Bangladesh, diagnostic center, medical services, doctor team"
  }
};

/* ══════════════════════════════════════════════════════════════
   FIELD COMPONENTS
   ══════════════════════════════════════════════════════════════ */
const ImageUploadField = ({ label, hint, value, onChange, onFileSelect }) => {
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
                  <X size={13} />
                </button>
              </>
            )}
          </div>
        ))}
        <button className="wc-repeater-add" onClick={add}>
          <Plus size={14} /> Add Item
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
const AboutHeroEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });

  const addFeature = () => ({
    icon: "heart",
    title: "New Feature",
    description: "Feature description goes here"
  });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Layout size={15} /> Hero Section Header</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Header Title</label>
              <input className="wc-input" value={data?.section_header_title || ""} onChange={e => set("section_header_title", e.target.value)} placeholder="About Lenova Life Care" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Header Subtitle</label>
              <textarea className="wc-textarea" value={data?.section_header_subtitle || ""} onChange={e => set("section_header_subtitle", e.target.value)} rows={2} placeholder="Delivering compassionate, world-class medicine..." />
            </div>
          </div>
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
              <input className="wc-input" value={data?.about_title || ""} onChange={e => set("about_title", e.target.value)} placeholder="Compassionate Care, Expert Medicine" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">About Description</label>
              <textarea className="wc-textarea" value={data?.about_description || ""} onChange={e => set("about_description", e.target.value)} rows={4} placeholder="Description about the company..." />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Star size={15} /> Features (3 Items)</h3>
        </div>
        <div className="wc-editor-card-body">
          <Repeater
            label="Features"
            hint="Add/Edit the 3 feature cards shown on about page"
            items={data?.features || []}
            onChange={v => set("features", v)}
            onAdd={addFeature}
            className="wc-repeater-features"
            renderItem={(feature, i, update, remove) => (
              <div className="wc-feature-card">
                <div className="wc-feature-header">
                  <select className="wc-select" value={feature.icon} onChange={e => update(i, { ...feature, icon: e.target.value })} style={{ width: 'auto', minWidth: 120 }}>
                    <option value="user-plus">Expert Doctors</option>
                    <option value="layout">Modern Facilities</option>
                    <option value="heart">Patient-First Approach</option>
                    <option value="star">Star</option>
                    <option value="clock">Clock</option>
                  </select>
                  <button className="wc-repeater-remove-icon" onClick={() => remove(i)}>
                    <Trash size={14} />
                  </button>
                </div>
                <input className="wc-input" value={feature.title} onChange={e => update(i, { ...feature, title: e.target.value })} placeholder="Feature Title" />
                <textarea className="wc-textarea" value={feature.description} onChange={e => update(i, { ...feature, description: e.target.value })} placeholder="Feature description" rows={2} />
              </div>
            )}
          />
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><List size={15} /> Hero Stats</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-stat-inputs">
            {(data?.stats || []).map((stat, i) => (
              <div key={i} className="wc-stat-input-item">
                <label>{stat.label}</label>
                <input value={stat.value} onChange={e => {
                  const s = [...(data.stats || [])];
                  s[i] = { ...s[i], value: e.target.value };
                  set("stats", s);
                }} placeholder="Value" />
                <div className="wc-stat-sub">
                  <input value={stat.label} onChange={e => {
                    const s = [...(data.stats || [])];
                    s[i] = { ...s[i], label: e.target.value };
                    set("stats", s);
                  }} placeholder="Label" style={{ width: "100%", border: "none", background: "transparent", fontSize: 11, color: "#94a3b8", outline: "none" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   MISSION & VISION EDITOR
   ══════════════════════════════════════════════════════════════ */
const MissionVisionEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Target size={15} /> Mission</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field">
            <label className="wc-field-label">Mission Title</label>
            <input className="wc-input" value={data?.mission?.title || ""} onChange={e => set("mission", { ...data?.mission, title: e.target.value })} placeholder="Our Mission" />
          </div>
          <div className="wc-field">
            <label className="wc-field-label">Mission Text</label>
            <textarea className="wc-textarea" value={data?.mission?.text || ""} onChange={e => set("mission", { ...data?.mission, text: e.target.value })} rows={4} placeholder="Mission statement..." />
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Eye size={15} /> Vision</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field">
            <label className="wc-field-label">Vision Title</label>
            <input className="wc-input" value={data?.vision?.title || ""} onChange={e => set("vision", { ...data?.vision, title: e.target.value })} placeholder="Our Vision" />
          </div>
          <div className="wc-field">
            <label className="wc-field-label">Vision Text</label>
            <textarea className="wc-textarea" value={data?.vision?.text || ""} onChange={e => set("vision", { ...data?.vision, text: e.target.value })} rows={4} placeholder="Vision statement..." />
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Award size={15} /> Values</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field">
            <label className="wc-field-label">Values Title</label>
            <input className="wc-input" value={data?.values?.title || ""} onChange={e => set("values", { ...data?.values, title: e.target.value })} placeholder="Our Values" />
          </div>
          <div className="wc-field">
            <label className="wc-field-label">Values Text</label>
            <textarea className="wc-textarea" value={data?.values?.text || ""} onChange={e => set("values", { ...data?.values, text: e.target.value })} rows={4} placeholder="Values statement..." />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   TEAM EDITOR
   ══════════════════════════════════════════════════════════════ */
const TeamEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });

  const addMember = () => ({
    id: `member-${Date.now()}`,
    name: "New Member",
    role: "ROLE",
    specialty: "Credentials",
    photo: "",
    quote: ""
  });

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
              <input className="wc-input" value={data?.section_title || ""} onChange={e => set("section_title", e.target.value)} placeholder="Our Leadership" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Subtitle</label>
              <input className="wc-input" value={data?.section_subtitle || ""} onChange={e => set("section_subtitle", e.target.value)} placeholder="The Team Behind Our Excellence" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Description</label>
              <textarea className="wc-textarea" value={data?.description || ""} onChange={e => set("description", e.target.value)} rows={2} placeholder="Team description..." />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Users size={15} /> Team Members</h3>
        </div>
        <div className="wc-editor-card-body">
          <Repeater
            label="Team Members"
            hint="Add/edit leadership team members"
            items={data?.members || []}
            onChange={v => set("members", v)}
            onAdd={addMember}
            className="wc-repeater-team"
            renderItem={(member, i, update, remove) => (
              <div className="wc-team-card">
                <div className="wc-team-header">
                  <div className="wc-team-avatar">
                    <ImageUploadField 
                      label=""
                      value={member.photo}
                      onChange={v => update(i, { ...member, photo: v })}
                      hint=""
                    />
                  </div>
                  <button className="wc-team-remove" onClick={() => remove(i)}>
                    <Trash size={14} /> Remove
                  </button>
                </div>
                <div className="wc-team-info">
                  <input className="wc-input" value={member.name} onChange={e => update(i, { ...member, name: e.target.value })} placeholder="Full Name" />
                  <input className="wc-input" value={member.role} onChange={e => update(i, { ...member, role: e.target.value })} placeholder="Role (e.g., MANAGING DIRECTOR)" />
                  <input className="wc-input" value={member.specialty} onChange={e => update(i, { ...member, specialty: e.target.value })} placeholder="Credentials (e.g., MBBS, FCPS)" />
                  <textarea className="wc-textarea" value={member.quote || ""} onChange={e => update(i, { ...member, quote: e.target.value })} placeholder="Quote (optional) - Only for Managing Director" rows={3} />
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   STATS BAR EDITOR
   ══════════════════════════════════════════════════════════════ */
const StatsBarEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });

  return (
    <div className="wc-editor-card">
      <div className="wc-editor-card-header">
        <h3 className="wc-editor-card-title"><List size={15} /> Stats Bar (4 Items)</h3>
      </div>
      <div className="wc-editor-card-body">
        <div className="wc-stats-grid">
          <div className="wc-stat-input-item">
            <label>Happy Patients</label>
            <input value={data?.happy_patients || ""} onChange={e => set("happy_patients", e.target.value)} placeholder="15,000+" />
          </div>
          <div className="wc-stat-input-item">
            <label>Expert Doctors</label>
            <input value={data?.expert_doctors || ""} onChange={e => set("expert_doctors", e.target.value)} placeholder="120+" />
          </div>
          <div className="wc-stat-input-item">
            <label>Departments</label>
            <input value={data?.departments || ""} onChange={e => set("departments", e.target.value)} placeholder="35+" />
          </div>
          <div className="wc-stat-input-item">
            <label>Years Experience</label>
            <input value={data?.years_experience || ""} onChange={e => set("years_experience", e.target.value)} placeholder="14" />
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
        <div className="wc-seo-preview-url">{data?.canonical_url || "https://renovalifecare.com/about"}</div>
        <div className="wc-seo-preview-title">{data?.meta_title || "About Renova Life Care"}</div>
        <p className="wc-seo-preview-desc">{data?.meta_description || "Meta description appears here..."}</p>
      </div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Search size={15} /> Meta Tags</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Meta Title <span className={`wc-field-counter ${titleLen > 60 ? "warn" : ""}`}>{titleLen}/70</span></label>
              <input className="wc-input" value={data?.meta_title || ""} onChange={e => set("meta_title", e.target.value)} placeholder="About Renova Life Care — Compassionate Healthcare" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Meta Description <span className={`wc-field-counter ${descLen > 155 ? "warn" : ""}`}>{descLen}/170</span></label>
              <textarea className="wc-textarea" value={data?.meta_description || ""} onChange={e => set("meta_description", e.target.value)} rows={3} placeholder="Learn about our mission, vision, and leadership..." />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Keywords</label>
              <input className="wc-input" value={data?.keywords || ""} onChange={e => set("keywords", e.target.value)} placeholder="about, healthcare, diagnostic, medical services" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Canonical URL</label>
              <input className="wc-input" value={data?.canonical_url || ""} onChange={e => set("canonical_url", e.target.value)} placeholder="https://renovalifecare.com/about" />
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
              <input className="wc-input" value={data?.og_title || ""} onChange={e => set("og_title", e.target.value)} placeholder="About Renova Life Care Ltd." />
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
  if (sectionId === "hero") return <AboutHeroEditor data={data} onChange={onChange} />;
  if (sectionId === "mission-vision") return <MissionVisionEditor data={data} onChange={onChange} />;
  if (sectionId === "team") return <TeamEditor data={data} onChange={onChange} />;
  if (sectionId === "stats-bar") return <StatsBarEditor data={data} onChange={onChange} />;
  if (sectionId === "seo") return <SeoEditor data={data} onChange={onChange} />;
  return <div>Unknown section</div>;
};

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function NewsWebsiteContent() {
  const [selectedSection, setSelectedSection] = useState("hero");
  const [pageData, setPageData] = useState(INITIAL_ABOUT_DATA);
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
    showToast("About page changes saved successfully!", "success");
  };

  const handlePreview = () => {
    window.open("/about", "_blank");
  };

  const handleReset = () => {
    if (confirm("Reset all About page content to default? This cannot be undone.")) {
      setPageData(INITIAL_ABOUT_DATA);
      showToast("Reset to default content", "success");
    }
  };

  const sections = [
    { id: "hero", label: "Hero Section", icon: "layout", desc: "Header, about content, features & stats" },
    { id: "mission-vision", label: "Mission & Vision", icon: "target", desc: "Mission, Vision & Values text" },
    { id: "team", label: "Our Team", icon: "users", desc: "Leadership team members" },
    { id: "stats-bar", label: "Stats Bar", icon: "list", desc: "4 key statistics" },
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
    <div className="wc-about-layout">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <Link href="/super-admin-panel/website-content" className="wc-breadcrumb-link">
              Website Content
            </Link>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="wc-breadcrumb-current">About Page</span>
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
                <><RefreshCw size={14} /> Saving...</>
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
              const IconComponent = section.id === "hero" ? Layout :
                section.id === "mission-vision" ? Target :
                section.id === "team" ? Users :
                section.id === "stats-bar" ? List :
                Search;
              return (
                <button
                  key={section.id}
                  className={`wc-section-tab ${selectedSection === section.id ? "active" : ""}`}
                  onClick={() => setSelectedSection(section.id)}
                >
                  <IconComponent size={14} />
                  {section.label}
                </button>
              );
            })}
          </nav>

          <div className="wc-content-panel">
            <div className="wc-page-info-banner">
              <div className="wc-page-info-left">
                <div className="wc-page-info-icon">
                  <Info size={22} />
                </div>
                <div className="wc-page-info-text">
                  <h2>About Page Content</h2>
                  <p>Editing: {currentSection?.label} — {currentSection?.desc}</p>
                </div>
              </div>
              <div className="wc-page-info-meta">
                <span className="wc-meta-tag">
                  <ExternalLink size={11} />
                  /about
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