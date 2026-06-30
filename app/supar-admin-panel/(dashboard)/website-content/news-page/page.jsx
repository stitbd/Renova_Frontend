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
  Image as ImageIcon,
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
  UserCheck,
  FileText,
  Calendar,
  Newspaper,
  Tag,
  Edit,
  ArrowLeft,
  File,
  MessageCircle,
  Share2
} from "lucide-react";
import "./news.css";
import "../website-content.css";

/* ══════════════════════════════════════════════════════════════
   INITIAL DATA
   ══════════════════════════════════════════════════════════════ */
const INITIAL_NEWS_ITEMS = [
  {
    id: "news-1",
    date: "April 28, 2026",
    title: "Renova Life Care Opens New Cardiology Wing with Advanced Cath Lab",
    summary: "We are proud to announce the inauguration of our state-of-the-art Cardiac Catheterization Laboratory, equipped with the latest imaging technology to serve patients across Bangladesh.",
    content: `We are thrilled to announce the grand opening of our new Cardiology Wing at Renova Life Care's main campus in Dhaka. This state-of-the-art facility features the most advanced Cardiac Catheterization Laboratory (Cath Lab) in Bangladesh.

The new Cath Lab is equipped with:
- High-resolution digital imaging systems
- Advanced hemodynamic monitoring
- Dedicated interventional suites
- 24/7 emergency cardiac care

This expansion represents a significant milestone in our mission to provide world-class healthcare services to the people of Bangladesh. The new facility will enable us to perform complex cardiac procedures including angioplasty, stenting, and diagnostic catheterizations with greater precision and safety.

"We are committed to bringing the best possible cardiac care to our patients," said Dr. Ahmed Rahman, Chief of Cardiology. "This new wing will reduce wait times and allow us to treat more patients with complex heart conditions."

The Cardiology Wing is now fully operational and accepting patients.`,
    category: "Expansion",
    source: "Press Release",
    type: "press-release",
    link: "/news/cardiology-wing-opening",
    image: "",
    tags: ["cardiology", "expansion", "healthcare", "Bangladesh"],
    published: true
  },
  {
    id: "news-2",
    date: "March 15, 2026",
    title: "Renova Life Care Receives National Healthcare Excellence Award 2026",
    summary: "The Bangladesh Medical Association has recognized Renova Life Care Ltd. with the National Healthcare Excellence Award for outstanding contributions to public health.",
    content: `Renova Life Care Ltd. has been honored with the prestigious National Healthcare Excellence Award 2026 by the Bangladesh Medical Association (BMA). This recognition celebrates our unwavering commitment to providing exceptional healthcare services and improving public health outcomes across Bangladesh.

The award ceremony, held at the Dhaka Convention Center, brought together healthcare leaders, policymakers, and medical professionals from across the country. Renova Life Care was recognized for:
- Excellence in patient care and safety
- Innovative healthcare delivery models
- Community health initiatives
- Medical research and education

"We are deeply honored to receive this recognition," said Mr. Hasan Ali, CEO of Renova Life Care. "This award is a testament to the hard work and dedication of our entire team. It motivates us to continue pushing boundaries and setting new standards in healthcare."

The National Healthcare Excellence Award is one of the most prestigious honors in Bangladesh's healthcare sector, recognizing organizations that demonstrate outstanding performance and innovation.`,
    category: "Award",
    source: "BMA Announcement",
    type: "news",
    link: "/news/healthcare-excellence-award",
    image: "",
    tags: ["award", "recognition", "healthcare", "BMA"],
    published: true
  },
  {
    id: "news-3",
    date: "February 10, 2026",
    title: "Strategic Partnership with Apollo Hospitals for Advanced Medical Training",
    summary: "Renova Life Care announces a landmark partnership with Apollo Hospitals India to provide international training opportunities for our medical staff.",
    content: `Renova Life Care is proud to announce a strategic partnership with Apollo Hospitals, one of India's leading healthcare providers. This collaboration will bring world-class medical training and expertise to Bangladesh.

The partnership includes:
- International exchange programs for doctors and nurses
- Joint research initiatives
- Telemedicine consultations with Apollo specialists
- Access to advanced surgical techniques

"We believe in investing in our people," said Dr. Fariha Sultana, Chief Medical Officer. "This partnership will allow our medical staff to learn from some of the best healthcare professionals in the world."

The training programs will cover various specialties including cardiology, oncology, neurology, and orthopedics. The first cohort of doctors will begin their training in March 2026.`,
    category: "Partnership",
    source: "Press Release",
    type: "press-release",
    link: "/news/apollo-partnership",
    image: "",
    tags: ["partnership", "training", "Apollo Hospitals", "collaboration"],
    published: true
  },
  {
    id: "news-4",
    date: "January 5, 2026",
    title: "Free Health Camp Reaches 10,000 Patients Across Rural Bangladesh",
    summary: "Our annual free health camp initiative has successfully provided essential medical check-ups and treatment to over 10,000 underprivileged patients in rural areas.",
    content: `Renova Life Care's annual free health camp initiative has achieved a remarkable milestone, reaching over 10,000 patients across 15 rural districts of Bangladesh. This community outreach program provides essential healthcare services to underserved populations.

Services provided include:
- General health check-ups
- Eye examinations and basic eye care
- Dental check-ups
- Basic diagnostic tests
- Health education and awareness sessions

"We believe healthcare is a basic human right," said Ms. Nasrin Begum, Director of Community Health. "These camps are our way of giving back to the community and ensuring that everyone has access to quality healthcare."

The health camps were organized in partnership with local community organizations and government health facilities. The initiative will continue throughout the year, reaching more communities.`,
    category: "Community",
    source: "Program Report",
    type: "community",
    link: "/news/health-camp-rural",
    image: "",
    tags: ["community", "health camp", "rural", "outreach"],
    published: true
  },
  {
    id: "news-5",
    date: "December 1, 2025",
    title: "Launch of Digital Patient Portal for Seamless Healthcare Access",
    summary: "Renova Life Care launches its comprehensive digital patient portal, enabling patients to book appointments, access health records, and consult doctors online.",
    content: `Renova Life Care has launched a state-of-the-art Digital Patient Portal, revolutionizing the way patients interact with our healthcare services. This innovative platform provides a seamless digital experience for all our patients.

Features of the Digital Patient Portal include:
- Online appointment booking
- Access to medical records and test results
- Secure messaging with healthcare providers
- Prescription refill requests
- Teleconsultation services

"We are embracing digital transformation to make healthcare more accessible and convenient," said Mr. Kamal Ahmed, Chief Technology Officer. "The portal empowers patients to take control of their health journey."

The platform is available on both web and mobile devices, ensuring patients can access their health information anytime, anywhere. Registration is simple and can be completed in minutes.`,
    category: "Technology",
    source: "Product Launch",
    type: "news",
    link: "/news/digital-patient-portal",
    image: "",
    tags: ["technology", "digital health", "patient portal", "innovation"],
    published: true
  },
  {
    id: "news-6",
    date: "October 22, 2025",
    title: "Renova Research Team Publishes Landmark Study on Diabetic Care in Bangladesh",
    summary: "Our internal research team's study on diabetes management in Bangladesh has been published in the International Journal of Medicine, drawing global attention.",
    content: `A groundbreaking study on diabetes management in Bangladesh, conducted by Renova Life Care's internal research team, has been published in the prestigious International Journal of Medicine. The study provides valuable insights into diabetes prevalence and management strategies in Bangladesh.

Key findings include:
- Rising prevalence of diabetes in urban and rural areas
- Barriers to effective diabetes management
- Effective community-based intervention strategies
- Recommendations for policy makers

"This research is a significant contribution to the global understanding of diabetes management," said Dr. Mahmud Hasan, Lead Researcher. "It provides evidence-based recommendations that can improve diabetes care not only in Bangladesh but across developing nations."

The study is already generating international attention and has been cited by several global health organizations. The research team is now expanding the study to include other chronic conditions.`,
    category: "Research",
    source: "Research Publication",
    type: "research",
    link: "/news/diabetic-care-study",
    image: "",
    tags: ["research", "diabetes", "publication", "study"],
    published: true
  }
];

/* ══════════════════════════════════════════════════════════════
   FIELD COMPONENTS
   ══════════════════════════════════════════════════════════════ */
const ImageUploadField = ({ label, hint, value, onChange }) => {
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
   NEWS DETAILS VIEW
   ══════════════════════════════════════════════════════════════ */
const NewsDetailsView = ({ news, onBack, onEdit, onDelete }) => {
  const getTypeIcon = (type) => {
    switch(type) {
      case 'press-release': return <FileText size={14} />;
      case 'research': return <Award size={14} />;
      case 'community': return <Heart size={14} />;
      default: return <Newspaper size={14} />;
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'press-release': return 'Press Release';
      case 'research': return 'Research';
      case 'community': return 'Community';
      default: return 'News';
    }
  };

  return (
    <div className="wc-news-details">
      <div className="wc-details-header">
        <button className="wc-btn wc-btn-ghost" onClick={onBack}>
          <ArrowLeft size={14} /> Back to News
        </button>
        <div className="wc-details-actions">
          <button className="wc-btn wc-btn-ghost" onClick={onEdit}>
            <Edit size={14} /> Edit
          </button>
          <button className="wc-btn wc-btn-danger" onClick={onDelete}>
            <Trash size={14} /> Delete
          </button>
        </div>
      </div>

      <div className="wc-details-content">
        {news.image && (
          <div className="wc-details-image">
            <img src={news.image} alt={news.title} />
          </div>
        )}

        <div className="wc-details-meta">
          <span className="wc-news-type-badge">
            {getTypeIcon(news.type)} {getTypeLabel(news.type)}
          </span>
          <span className="wc-details-date">
            <Calendar size={14} /> {news.date}
          </span>
          <span className="wc-details-category">
            <Tag size={14} /> {news.category}
          </span>
        </div>

        <h1 className="wc-details-title">{news.title}</h1>

        <div className="wc-details-source">
          <span>Source: {news.source}</span>
        </div>

        <div className="wc-details-excerpt">
          {news.summary}
        </div>

        <div className="wc-details-full-content">
          {news.content.split('\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {news.tags && news.tags.length > 0 && (
          <div className="wc-details-tags">
            <strong>Tags:</strong>
            {news.tags.map((tag, i) => (
              <span key={i} className="wc-details-tag">{tag}</span>
            ))}
          </div>
        )}

        <div className="wc-details-footer">
          <div className="wc-details-status">
            <span className={`wc-status-indicator ${news.published ? 'published' : 'draft'}`}>
              {news.published ? 'Published' : 'Draft'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   NEWS EDITOR
   ══════════════════════════════════════════════════════════════ */
const NewsEditor = ({ news, onSave, onCancel }) => {
  const [data, setData] = useState({ ...news });
  const [activeTab, setActiveTab] = useState("content");

  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleSave = () => {
    onSave(data);
  };

  const newsTypes = [
    { value: 'news', label: 'News' },
    { value: 'press-release', label: 'Press Release' },
    { value: 'research', label: 'Research' },
    { value: 'community', label: 'Community' }
  ];

  const categories = [
    'Expansion', 'Award', 'Partnership', 'Community', 'Technology', 'Research', 'General'
  ];

  return (
    <div className="wc-news-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Edit size={15} /> Edit News</h3>
          <div className="wc-editor-card-actions">
            <button className="wc-btn wc-btn-ghost" onClick={onCancel}>
              <X size={14} /> Cancel
            </button>
            <button className="wc-btn wc-btn-success" onClick={handleSave} id="save-news-form">
              <Save size={14} /> Save News
            </button>
          </div>
        </div>
        <div className="wc-editor-card-body">
          {/* Editor Tabs */}
          <div className="wc-editor-tabs">
            <button
              className={`wc-editor-tab ${activeTab === "content" ? "active" : ""}`}
              onClick={() => setActiveTab("content")}
            >
              <FileText size={14} /> Content
            </button>
            <button
              className={`wc-editor-tab ${activeTab === "media" ? "active" : ""}`}
              onClick={() => setActiveTab("media")}
            >
              <ImageIcon size={14} /> Media
            </button>
            <button
              className={`wc-editor-tab ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <Layout size={14} /> Settings
            </button>
          </div>

          {/* Content Tab */}
          {activeTab === "content" && (
            <div className="wc-editor-tab-content">
              <div className="wc-field-grid">
                <div className="wc-field span-2">
                  <label className="wc-field-label">Title <span className="required">*</span></label>
                  <input
                    className="wc-input"
                    value={data.title}
                    onChange={e => handleChange("title", e.target.value)}
                    placeholder="Enter news title"
                  />
                </div>
                <div className="wc-field span-2">
                  <label className="wc-field-label">Summary <span className="field-hint">(Short description)</span></label>
                  <textarea
                    className="wc-textarea"
                    value={data.summary}
                    onChange={e => handleChange("summary", e.target.value)}
                    rows={2}
                    placeholder="Brief summary of the news"
                  />
                </div>
                <div className="wc-field span-2">
                  <label className="wc-field-label">Full Content <span className="required">*</span></label>
                  <textarea
                    className="wc-textarea xl"
                    value={data.content}
                    onChange={e => handleChange("content", e.target.value)}
                    rows={10}
                    placeholder="Write the full news content here..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Media Tab */}
          {activeTab === "media" && (
            <div className="wc-editor-tab-content">
              <div className="wc-field-grid">
                <div className="wc-field span-2">
                  <ImageUploadField 
                    label="Featured Image" 
                    hint="Recommended: 1200×630px" 
                    value={data.image} 
                    onChange={v => handleChange("image", v)} 
                  />
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="wc-editor-tab-content">
              <div className="wc-field-grid">
                <div className="wc-field">
                  <label className="wc-field-label">Date <span className="required">*</span></label>
                  <input
                    className="wc-input"
                    type="text"
                    value={data.date}
                    onChange={e => handleChange("date", e.target.value)}
                    placeholder="e.g. April 28, 2026"
                  />
                </div>
                <div className="wc-field">
                  <label className="wc-field-label">Type</label>
                  <select
                    className="wc-select"
                    value={data.type || 'news'}
                    onChange={e => handleChange("type", e.target.value)}
                  >
                    {newsTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                <div className="wc-field">
                  <label className="wc-field-label">Category <span className="required">*</span></label>
                  <select
                    className="wc-select"
                    value={data.category}
                    onChange={e => handleChange("category", e.target.value)}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="wc-field">
                  <label className="wc-field-label">Source</label>
                  <input
                    className="wc-input"
                    value={data.source}
                    onChange={e => handleChange("source", e.target.value)}
                    placeholder="e.g. Press Release"
                  />
                </div>
                <div className="wc-field span-2">
                  <label className="wc-field-label">Link URL</label>
                  <input
                    className="wc-input"
                    value={data.link}
                    onChange={e => handleChange("link", e.target.value)}
                    placeholder="/news/slug-url"
                  />
                </div>
                <div className="wc-field span-2">
                  <label className="wc-field-label">Tags</label>
                  <input
                    className="wc-input"
                    value={data.tags?.join(", ")}
                    onChange={e => handleChange("tags", e.target.value.split(", ").filter(t => t))}
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
                <div className="wc-field span-2">
                  <div className="wc-toggle-row">
                    <div className="wc-toggle-info">
                      <h4>Published</h4>
                      <p>Make this news item visible to visitors</p>
                    </div>
                    <label className="wc-switch">
                      <input
                        type="checkbox"
                        checked={data.published !== false}
                        onChange={e => handleChange("published", e.target.checked)}
                      />
                      <span className="wc-switch-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   HERO EDITOR
   ══════════════════════════════════════════════════════════════ */
const HeroEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });

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
              <input className="wc-input" value={data?.trust_badge_text || ""} onChange={e => set("trust_badge_text", e.target.value)} placeholder="NEWS" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Main Headline <span className="required">*</span></label>
              <textarea className="wc-textarea" value={data?.headline || ""} onChange={e => set("headline", e.target.value)} rows={2} placeholder="Press & Media" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Description</label>
              <textarea className="wc-textarea" value={data?.description || ""} onChange={e => set("description", e.target.value)} rows={3} placeholder="Latest news, press releases, and media resources..." />
            </div>
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
        <div className="wc-seo-preview-url">{data?.canonical_url || "https://renovalifecare.com/news"}</div>
        <div className="wc-seo-preview-title">{data?.meta_title || "News & Updates"}</div>
        <p className="wc-seo-preview-desc">{data?.meta_description || "Latest news and updates..."}</p>
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
                <span className={`wc-field-counter ${titleLen > 60 ? "warn" : ""}`}>{titleLen}/70</span>
              </label>
              <input className="wc-input" value={data?.meta_title || ""} onChange={e => set("meta_title", e.target.value)} placeholder="Press & Media — Renova Life Care" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">
                Meta Description
                <span className={`wc-field-counter ${descLen > 155 ? "warn" : ""}`}>{descLen}/170</span>
              </label>
              <textarea className="wc-textarea" value={data?.meta_description || ""} onChange={e => set("meta_description", e.target.value)} rows={3} placeholder="Latest news, press releases, and media resources..." />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Keywords</label>
              <input className="wc-input" value={data?.keywords || ""} onChange={e => set("keywords", e.target.value)} placeholder="news, press releases, media" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   MAIN NEWS PAGE COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function NewsPage() {
  const [selectedSection, setSelectedSection] = useState("news-list");
  const [selectedNews, setSelectedNews] = useState(null);
  const [view, setView] = useState("list"); // "list" | "details" | "edit"
  const [newsItems, setNewsItems] = useState(INITIAL_NEWS_ITEMS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });
  const toastTimeout = useRef(null);

  // Page data for hero and seo sections
  const [pageData, setPageData] = useState({
    hero: {
      trust_badge_text: "NEWS",
      headline: "Press & Media",
      description: "Latest news, press releases, and media resources from Renova Life Care Ltd."
    },
    seo: {
      meta_title: "Press & Media — Renova Life Care Bangladesh",
      meta_description: "Latest news, press releases, and media resources from Renova Life Care.",
      og_title: "Press & Media",
      og_description: "Latest news and updates.",
      og_image: "/images/og-news.jpg",
      canonical_url: "https://renovalifecare.com/news",
      robots: "index, follow",
      keywords: "news, press releases, media, Renova Life Care"
    }
  });

  const categories = ["All", ...new Set(newsItems.map(item => item.category))];

  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory && item.published !== false;
  });

  const showToast = useCallback((msg, type = "success") => {
    setToast({ show: true, msg, type });
    clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToast(t => ({ ...t, show: false })), 3000);
  }, []);

  const handleNewsClick = (news) => {
    setSelectedNews(news);
    setView("details");
  };

  const handleEditClick = (news) => {
    setSelectedNews(news);
    setView("edit");
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedNews(null);
  };

  const handleSaveNews = async (updatedNews) => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 900));
    const updatedItems = newsItems.map(item => 
      item.id === updatedNews.id ? updatedNews : item
    );
    setNewsItems(updatedItems);
    setSelectedNews(updatedNews);
    setSaving(false);
    showToast("News item updated successfully!", "success");
    setView("details");
  };

  const handleDeleteNews = async (newsId) => {
    if (confirm("Are you sure you want to delete this news item?")) {
      const updatedItems = newsItems.filter(item => item.id !== newsId);
      setNewsItems(updatedItems);
      showToast("News item deleted successfully!", "success");
      setView("list");
      setSelectedNews(null);
    }
  };

  const handleAddNews = () => {
    const newNews = {
      id: `news-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      title: "New News Item",
      summary: "Write your news summary here...",
      content: "Write the full news content here...",
      category: "General",
      source: "Source",
      type: "news",
      link: "/news/new-item",
      image: "",
      tags: ["news", "update"],
      published: true
    };
    setNewsItems([newNews, ...newsItems]);
    setSelectedNews(newNews);
    setView("edit");
    showToast("New news item created!", "success");
  };

  const sections = [
    { id: "news-list", label: "News Items", icon: Newspaper },
    { id: "hero", label: "Hero Section", icon: Layout },
    { id: "seo", label: "SEO & Meta", icon: Search }
  ];

  const handlePageDataChange = (section, data) => {
    setPageData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  // ============================================================
  // RENDER: LIST VIEW
  // ============================================================
  const renderListView = () => (
    <div>
      {/* News Grid */}
      <div className="wc-news-grid">
        {filteredNews.map(news => (
          <div key={news.id} className="wc-news-card" onClick={() => handleNewsClick(news)}>
            <div className="wc-news-image">
              {news.image ? (
                <img src={news.image} alt={news.title} className="wc-news-card-image" />
              ) : (
                <div className="wc-news-image-placeholder">
                  <Newspaper size={32} />
                  <span>No image</span>
                </div>
              )}
              <span className="wc-news-type-badge">
                {news.type === 'press-release' ? 'Press Release' : 
                 news.type === 'research' ? 'Research' :
                 news.type === 'community' ? 'Community' : 'News'}
              </span>
            </div>
            <div className="wc-news-content">
              <div className="wc-news-meta">
                <span className="wc-news-date-label"><Calendar size={12} /> {news.date}</span>
                <span className="wc-news-category-label"><Tag size={12} /> {news.category}</span>
              </div>
              <h3 className="wc-news-title">{news.title}</h3>
              <p className="wc-news-excerpt">{news.summary}</p>
              <div className="wc-news-footer">
                <span className="wc-news-source">Source: {news.source}</span>
                <button className="wc-btn wc-btn-ghost" onClick={(e) => {
                  e.stopPropagation();
                  handleEditClick(news);
                }}>
                  <Edit size={14} /> Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="wc-empty-state">
          <div className="wc-empty-state-icon"><Newspaper size={30} /></div>
          <h3>No news items found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );

  // ============================================================
  // RENDER: CONTENT
  // ============================================================
  const renderContent = () => {
    if (view === "details" && selectedNews) {
      return (
        <NewsDetailsView 
          news={selectedNews} 
          onBack={handleBackToList} 
          onEdit={() => handleEditClick(selectedNews)}
          onDelete={() => handleDeleteNews(selectedNews.id)}
        />
      );
    }

    if (view === "edit" && selectedNews) {
      return (
        <NewsEditor 
          news={selectedNews} 
          onSave={handleSaveNews} 
          onCancel={handleBackToList} 
        />
      );
    }

    switch (selectedSection) {
      case "news-list":
        return renderListView();
      case "hero":
        return <HeroEditor data={pageData.hero} onChange={(data) => handlePageDataChange("hero", data)} />;
      case "seo":
        return <SeoEditor data={pageData.seo} onChange={(data) => handlePageDataChange("seo", data)} />;
      default:
        return renderListView();
    }
  };

  // ============================================================
  // MAIN RENDER
  // ============================================================
  return (
    <div className="wc-news-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <Link href="/super-admin-panel/website-content" className="wc-breadcrumb-link">
              Website Content
            </Link>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="wc-breadcrumb-current">News</span>
            {view !== "list" && (
              <>
                <ChevronDown size={12} className="wc-breadcrumb-chevron" />
                <span className="wc-breadcrumb-current">{view === "details" ? selectedNews?.title : "Edit News"}</span>
              </>
            )}
          </div>

          <div className="wc-topbar-actions">
            {view === "list" && (
              <>
                <div className="wc-status-dot">Live</div>
                <button className="wc-btn wc-btn-primary" onClick={handleAddNews}>
                  <Plus size={14} /> Add News
                </button>
              </>
            )}
            {view === "details" && selectedNews && (
              <>
                <button className="wc-btn wc-btn-ghost" onClick={() => handleEditClick(selectedNews)}>
                  <Edit size={14} /> Edit
                </button>
                <button className="wc-btn wc-btn-danger" onClick={() => handleDeleteNews(selectedNews.id)}>
                  <Trash size={14} /> Delete
                </button>
              </>
            )}
            {view === "edit" && (
              <button className="wc-btn wc-btn-success" onClick={() => document.getElementById('save-news-form')?.click()}>
                <Save size={14} /> Save Changes
              </button>
            )}
          </div>
        </div>

        <div className="wc-editor-body">
          {view === "list" && (
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
          )}

          <div className="wc-content-panel">
            {view === "list" && (
              <div className="wc-page-info-banner">
                <div className="wc-page-info-left">
                  <div className="wc-page-info-icon">
                    <Newspaper size={22} />
                  </div>
                  <div className="wc-page-info-text">
                    <h2>News Management</h2>
                    <p>{newsItems.length} items • Manage your news and press releases</p>
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
            )}

            {/* Filters - Only in list view */}
            {view === "list" && selectedSection === "news-list" && (
              <div className="wc-news-filters">
                <div className="wc-news-categories">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      className={`wc-filter-btn ${selectedCategory === cat ? "active" : ""}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="wc-search">
                  <input
                    type="text"
                    placeholder="Search news..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                  <Search size={14} className="wc-search-icon" />
                </div>
              </div>
            )}

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
}