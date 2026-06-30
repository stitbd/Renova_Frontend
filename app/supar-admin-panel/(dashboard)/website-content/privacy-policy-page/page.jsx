// app/supar-admin-panel/website-content/privacy-policy/page.jsx
"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import {
  Info,
  Layout,
  Search,
  Save,
  RefreshCw,
  Check,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Clock,
  Upload,
  Trash,
  Plus,
  X,
  Shield,
  FileText,
  Users,
  Star,
  Eye,
  Lock,
  Database,
  Cookie,
  Globe,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Copy,
  AlertCircle,
  Settings,
  Edit,
  Minimize2,
  Maximize2
} from "lucide-react";
import "./privacy-policy.css";
import "../website-content.css";

// ──────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────
const PrivacyPolicyPage = () => {
  const [selectedSection, setSelectedSection] = useState("privacy-content");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const sections = [
    { id: "privacy-hero", label: "Hero Section", icon: Layout },
    { id: "privacy-content", label: "Privacy Content", icon: FileText },
    { id: "privacy-features", label: "Features Section", icon: Star },
    { id: "seo", label: "SEO & Meta", icon: Search }
  ];

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1200));
    setSaving(false);
    showToast("Privacy Policy changes saved successfully!", "success");
  };

  const showToast = (msg, type = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "success" }), 3000);
  };

  const renderContent = useCallback(() => {
    switch (selectedSection) {
      case "privacy-hero":
        return <PrivacyHeroEditor />;
      case "privacy-content":
        return <PrivacyContentEditor />;
      case "privacy-features":
        return <PrivacyFeaturesEditor />;
      case "seo":
        return <PrivacySeoEditor />;
      default:
        return <PrivacyContentEditor />;
    }
  }, [selectedSection]);

  return (
    <div className="wc-privacy-page">
      <div className="wc-editor">
        {/* Top Bar */}
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span className="wc-breadcrumb-item">Website Content</span>
            <ChevronRight size={14} className="wc-breadcrumb-separator" />
            <span className="wc-breadcrumb-item current">Privacy Policy</span>
            <ChevronRight size={14} className="wc-breadcrumb-separator" />
            <span className="wc-breadcrumb-item current">
              {sections.find(s => s.id === selectedSection)?.label}
            </span>
          </div>

          <div className="wc-topbar-actions">
            <div className="wc-status-dot">
              <span className="wc-status-label">Live</span>
            </div>
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

        {/* Editor Body */}
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
                  <Shield size={20} />
                </div>
                <div className="wc-page-info-text">
                  <h2>Privacy Policy</h2>
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

      {/* Toast Notification */}
      <div className={`wc-toast ${toast.type} ${toast.show ? "show" : ""}`}>
        <Check size={16} />
        {toast.msg}
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// Privacy Hero Section Editor
// ──────────────────────────────────────────────
const PrivacyHeroEditor = () => {
  const [data, setData] = useState({
    section_title: "Privacy Policy",
    section_subtitle: "Your privacy matters to us. Learn how we collect, use, and protect your personal information.",
    effective_date: "January 1, 2026",
    last_updated: "June 29, 2026"
  });

  const set = (k, v) => setData(prev => ({ ...prev, [k]: v }));

  return (
    <div className="wc-privacy-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title">
            <Layout size={15} /> Hero Section
          </h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">
                Section Title <span className="required">*</span>
              </label>
              <input 
                className="wc-input" 
                value={data.section_title} 
                onChange={e => set("section_title", e.target.value)} 
                placeholder="Privacy Policy"
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Subtitle</label>
              <textarea 
                className="wc-textarea" 
                value={data.section_subtitle} 
                onChange={e => set("section_subtitle", e.target.value)} 
                rows={2}
                placeholder="Your privacy matters to us. Learn how we collect, use, and protect your personal information."
              />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Effective Date</label>
              <input 
                className="wc-input" 
                value={data.effective_date} 
                onChange={e => set("effective_date", e.target.value)} 
                placeholder="January 1, 2026"
              />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Last Updated</label>
              <input 
                className="wc-input" 
                value={data.last_updated} 
                onChange={e => set("last_updated", e.target.value)} 
                placeholder="June 29, 2026"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// Privacy Content Editor - Professional Version
// ──────────────────────────────────────────────
const PrivacyContentEditor = () => {
  const [privacySections, setPrivacySections] = useState([
    {
      id: "introduction",
      serial: "1",
      title: "Introduction",
      content: "Welcome to Privacy Policy. This Privacy Policy is designed to help you understand how we collect, use, and disclose your personal information when you visit our website. This Privacy Policy applies to all users of our website, including visitors, customers, and partners.",
      subsections: [],
      bullet_points: []
    },
    {
      id: "information-collect",
      serial: "2",
      title: "Information We Collect",
      content: "",
      subsections: [
        {
          id: "2.1",
          title: "Personal Information You Provide",
          content: "We collect personal information from you, such as your name, email address, phone number, and other contact information. We may also collect information about your website usage, including the pages you visit, the duration of your visits, and the pages you interact with."
        },
        {
          id: "2.2",
          title: "Automatically Collected Information",
          content: "We collect information automatically, such as your IP address, browser type, operating system, and device information. This information is collected to help us improve our website and services."
        },
        {
          id: "2.3",
          title: "Cookies and Similar Technologies",
          content: "We use cookies and similar technologies to enhance your experience on our website. Cookies are small text files that are stored on your device when you visit our website. They help us remember your preferences and settings, and they allow us to analyze how you use our website."
        }
      ],
      bullet_points: []
    },
    {
      id: "how-we-use",
      serial: "3",
      title: "How We Use Your Information",
      content: "We use your information for the following purposes:",
      subsections: [],
      bullet_points: [
        "Personalization: To provide you with a better experience on our website.",
        "Communication: To send you promotional emails and newsletters.",
        "Analytics: To analyze how you use our website and to improve our website and services."
      ]
    },
    {
      id: "data-sharing",
      serial: "4",
      title: "Data Sharing & Disclosure",
      content: "We do not sell or share your personal information with third parties. However, we may share your information with:",
      subsections: [],
      bullet_points: [
        "Service Providers: We may share your information with service providers who help us operate our website and services, such as hosting providers and payment processors.",
        "Legal Requirements: We may disclose your information if required to do so by law, or if we believe in good faith that the disclosure is necessary to protect our rights or property, or to prevent or investigate a crime."
      ]
    },
    {
      id: "your-choices",
      serial: "5",
      title: "Your Choices & Choices",
      content: "You can choose not to provide certain personal information. However, this may limit your ability to use certain features of our website. For example, you may not be able to access certain features if you do not provide your name, email address, or phone number.",
      subsections: [],
      bullet_points: []
    },
    {
      id: "your-rights",
      serial: "6",
      title: "Your Rights & Choices",
      content: "You have the right to:",
      subsections: [],
      bullet_points: [
        "Access: To access the personal information we hold about you.",
        "Correct: To request that we correct any inaccurate or incomplete personal information we hold about you.",
        "Delete: To request that we delete your personal information.",
        "Restrict: To restrict the processing of your personal information."
      ]
    },
    {
      id: "cookies",
      serial: "7",
      title: "Cookies & Tracking Technologies",
      content: "We use cookies and similar technologies to enhance your experience on our website. Cookies are small text files that are stored on your device when you visit our website. They help us remember your preferences and settings, and they allow us to analyze how you use our website.",
      subsections: [],
      bullet_points: []
    },
    {
      id: "childrens-privacy",
      serial: "8",
      title: "Children's Privacy",
      content: "We do not knowingly collect personal information from children under the age of 13. We encourage parents to monitor their children's online activities and to discuss online safety with their children.",
      subsections: [],
      bullet_points: []
    },
    {
      id: "international-transfers",
      serial: "9",
      title: "International Data Transfers",
      content: "We transfer personal information to countries with data protection laws that are similar to the laws of your country. We may transfer personal information to countries with data protection laws that are similar to the laws of your country. However, we may transfer personal information to countries with less stringent data protection laws, such as the European Union.",
      subsections: [],
      bullet_points: []
    },
    {
      id: "changes",
      serial: "10",
      title: "Changes to Privacy Policy",
      content: "We may update this Privacy Policy from time to time. We will post the updated Privacy Policy on our website. We encourage you to review this Privacy Policy periodically to stay informed about how we collect, use, and disclose your personal information.",
      subsections: [],
      bullet_points: []
    }
  ]);

  const [expandedSections, setExpandedSections] = useState(
    privacySections.reduce((acc, s) => ({ ...acc, [s.id]: false }), {})
  );
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSection = useCallback((id) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  const expandAll = useCallback(() => {
    const allExpanded = privacySections.reduce((acc, s) => ({ ...acc, [s.id]: true }), {});
    setExpandedSections(allExpanded);
  }, [privacySections]);

  const collapseAll = useCallback(() => {
    const allCollapsed = privacySections.reduce((acc, s) => ({ ...acc, [s.id]: false }), {});
    setExpandedSections(allCollapsed);
  }, [privacySections]);

  const updatePrivacySection = useCallback((id, key, value) => {
    setPrivacySections(prev => 
      prev.map(s => s.id === id ? { ...s, [key]: value } : s)
    );
  }, []);

  const updateSubsection = useCallback((sectionId, subId, key, value) => {
    setPrivacySections(prev =>
      prev.map(s => {
        if (s.id === sectionId) {
          const updatedSubs = (s.subsections || []).map(sub =>
            sub.id === subId ? { ...sub, [key]: value } : sub
          );
          return { ...s, subsections: updatedSubs };
        }
        return s;
      })
    );
  }, []);

  const addSubsection = useCallback((sectionId) => {
    const section = privacySections.find(s => s.id === sectionId);
    const subCount = (section?.subsections || []).length + 1;
    const newSubId = `${sectionId}-${subCount}`;
    
    setPrivacySections(prev =>
      prev.map(s => {
        if (s.id === sectionId) {
          return {
            ...s,
            subsections: [...(s.subsections || []), {
              id: newSubId,
              title: `Subsection ${subCount}`,
              content: ""
            }]
          };
        }
        return s;
      })
    );
  }, [privacySections]);

  const removeSubsection = useCallback((sectionId, subId) => {
    setPrivacySections(prev =>
      prev.map(s => {
        if (s.id === sectionId) {
          return {
            ...s,
            subsections: (s.subsections || []).filter(sub => sub.id !== subId)
          };
        }
        return s;
      })
    );
  }, []);

  const updateBulletPoint = useCallback((sectionId, index, value) => {
    setPrivacySections(prev =>
      prev.map(s => {
        if (s.id === sectionId) {
          const bullets = [...(s.bullet_points || [])];
          bullets[index] = value;
          return { ...s, bullet_points: bullets };
        }
        return s;
      })
    );
  }, []);

  const addBulletPoint = useCallback((sectionId) => {
    setPrivacySections(prev =>
      prev.map(s => {
        if (s.id === sectionId) {
          return {
            ...s,
            bullet_points: [...(s.bullet_points || []), "New bullet point"]
          };
        }
        return s;
      })
    );
  }, []);

  const removeBulletPoint = useCallback((sectionId, index) => {
    setPrivacySections(prev =>
      prev.map(s => {
        if (s.id === sectionId) {
          const bullets = [...(s.bullet_points || [])];
          bullets.splice(index, 1);
          return { ...s, bullet_points: bullets };
        }
        return s;
      })
    );
  }, []);

  const addNewSection = useCallback(() => {
    const newSerial = privacySections.length + 1;
    const newId = `section-${Date.now()}`;
    const newSection = {
      id: newId,
      serial: String(newSerial),
      title: `New Section ${newSerial}`,
      content: "",
      subsections: [],
      bullet_points: []
    };
    setPrivacySections(prev => [...prev, newSection]);
    setExpandedSections(prev => ({ ...prev, [newId]: true }));
  }, [privacySections]);

  const removeSection = useCallback((id) => {
    setPrivacySections(prev => {
      const updated = prev.filter(s => s.id !== id);
      return updated.map((s, index) => ({ ...s, serial: String(index + 1) }));
    });
    setExpandedSections(prev => {
      const newExpanded = { ...prev };
      delete newExpanded[id];
      return newExpanded;
    });
  }, []);

  const moveSection = useCallback((index, direction) => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === privacySections.length - 1)
    ) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    setPrivacySections(prev => {
      const updated = [...prev];
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      return updated.map((s, idx) => ({ ...s, serial: String(idx + 1) }));
    });
  }, [privacySections]);

  const duplicateSection = useCallback((id) => {
    const section = privacySections.find(s => s.id === id);
    if (!section) return;

    const newId = `section-${Date.now()}`;
    const newSerial = privacySections.length + 1;
    const newSection = {
      ...section,
      id: newId,
      serial: String(newSerial),
      title: `${section.title} (Copy)`
    };
    setPrivacySections(prev => [...prev, newSection]);
    setExpandedSections(prev => ({ ...prev, [newId]: true }));
  }, [privacySections]);

  const filteredSections = useMemo(() => {
    if (!searchTerm.trim()) return privacySections;
    const term = searchTerm.toLowerCase().trim();
    return privacySections.filter(s => 
      s.title.toLowerCase().includes(term) ||
      s.content?.toLowerCase().includes(term) ||
      s.serial.includes(term)
    );
  }, [privacySections, searchTerm]);

  const getSectionStats = useCallback((section) => {
    const subCount = section.subsections?.length || 0;
    const bulletCount = section.bullet_points?.length || 0;
    const hasContent = section.content?.length > 0;
    return { subCount, bulletCount, hasContent };
  }, []);

  return (
    <div className="wc-privacy-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <div className="wc-editor-card-title">
            <FileText size={15} /> Privacy Policy Sections
            <span className="wc-editor-card-desc">{privacySections.length} sections</span>
          </div>
          <div className="wc-editor-card-actions">
            <button className="wc-btn wc-btn-ghost wc-btn-sm" onClick={expandAll}>
              <Maximize2 size={14} /> Expand All
            </button>
            <button className="wc-btn wc-btn-ghost wc-btn-sm" onClick={collapseAll}>
              <Minimize2 size={14} /> Collapse All
            </button>
            <button className="wc-btn wc-btn-primary" onClick={addNewSection}>
              <Plus size={14} /> Add New Section
            </button>
          </div>
        </div>

        <div className="wc-editor-card-body">
          {/* Search Bar */}
          <div className="wc-privacy-search">
            <div className="wc-search-wrapper">
              <Search size={16} className="wc-search-icon" />
              <input
                type="text"
                className="wc-search-input"
                placeholder="Search sections by title, content, or serial number..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="wc-search-clear" onClick={() => setSearchTerm("")}>
                  <X size={14} />
                </button>
              )}
            </div>
            <span className="wc-search-results">
              {filteredSections.length} of {privacySections.length} sections
            </span>
          </div>

          {/* Sections List */}
          <div className="wc-privacy-sections-list">
            {filteredSections.map((section, index) => {
              const stats = getSectionStats(section);
              const isExpanded = expandedSections[section.id] || false;
              const actualIndex = privacySections.indexOf(section);

              return (
                <div key={section.id} className={`wc-privacy-section-item ${isExpanded ? 'expanded' : ''}`}>
                  <div className="wc-privacy-section-header">
                    <div className="wc-privacy-section-header-left">
                      <button 
                        className="wc-privacy-section-toggle"
                        onClick={() => toggleSection(section.id)}
                        aria-label={isExpanded ? "Collapse section" : "Expand section"}
                      >
                        <ChevronDown 
                          size={18} 
                          className={`wc-privacy-section-chevron ${isExpanded ? 'open' : ''}`}
                        />
                      </button>
                      <span className="wc-privacy-section-serial">#{section.serial}</span>
                      <span className="wc-privacy-section-title-display">
                        {section.title || "Untitled Section"}
                      </span>
                      <div className="wc-privacy-section-badges">
                        {stats.subCount > 0 && (
                          <span className="wc-privacy-section-badge subsections">
                            {stats.subCount} subsection{stats.subCount > 1 ? 's' : ''}
                          </span>
                        )}
                        {stats.bulletCount > 0 && (
                          <span className="wc-privacy-section-badge bullets">
                            {stats.bulletCount} bullet{stats.bulletCount > 1 ? 's' : ''}
                          </span>
                        )}
                        {!stats.hasContent && !stats.subCount && !stats.bulletCount && (
                          <span className="wc-privacy-section-badge empty">Empty</span>
                        )}
                      </div>
                    </div>
                    <div className="wc-privacy-section-header-right">
                      <button 
                        className="wc-btn wc-btn-ghost wc-btn-sm wc-move-btn"
                        onClick={() => moveSection(actualIndex, 'up')}
                        disabled={actualIndex === 0}
                        aria-label="Move up"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button 
                        className="wc-btn wc-btn-ghost wc-btn-sm wc-move-btn"
                        onClick={() => moveSection(actualIndex, 'down')}
                        disabled={actualIndex === privacySections.length - 1}
                        aria-label="Move down"
                      >
                        <ArrowDown size={14} />
                      </button>
                      <button 
                        className="wc-btn wc-btn-ghost wc-btn-sm"
                        onClick={() => duplicateSection(section.id)}
                        aria-label="Duplicate section"
                      >
                        <Copy size={14} />
                      </button>
                      <button 
                        className="wc-btn wc-btn-danger wc-btn-sm"
                        onClick={() => removeSection(section.id)}
                        aria-label="Delete section"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="wc-privacy-section-body">
                      <div className="wc-privacy-section-detail">
                        {/* Serial Number */}
                        <div className="wc-field-row">
                          <div className="wc-field">
                            <label className="wc-field-label">Serial Number</label>
                            <input 
                              className="wc-input wc-input-sm" 
                              value={section.serial} 
                              onChange={e => updatePrivacySection(section.id, "serial", e.target.value)} 
                              placeholder="e.g., 1, 2, 3..."
                              style={{ maxWidth: '120px' }}
                            />
                          </div>
                          <div className="wc-field">
                            <label className="wc-field-label">Section ID</label>
                            <input 
                              className="wc-input wc-input-sm" 
                              value={section.id} 
                              disabled
                              style={{ maxWidth: '200px', background: '#f8fafc', cursor: 'not-allowed' }}
                            />
                          </div>
                        </div>

                        {/* Section Title */}
                        <div className="wc-field">
                          <label className="wc-field-label">
                            Section Title <span className="required">*</span>
                          </label>
                          <input 
                            className="wc-input" 
                            value={section.title} 
                            onChange={e => updatePrivacySection(section.id, "title", e.target.value)} 
                            placeholder="Enter section title"
                          />
                        </div>

                        {/* Main Content */}
                        <div className="wc-field">
                          <label className="wc-field-label">Content</label>
                          <textarea 
                            className="wc-textarea xl" 
                            value={section.content || ""} 
                            onChange={e => updatePrivacySection(section.id, "content", e.target.value)} 
                            rows={4}
                            placeholder="Enter section content"
                          />
                        </div>

                        {/* Subsections */}
                        {(section.subsections && section.subsections.length > 0) && (
                          <div className="wc-privacy-subsections">
                            <div className="wc-privacy-subsections-header">
                              <h4 className="wc-privacy-subsections-title">
                                Subsections ({section.subsections.length})
                              </h4>
                              <button 
                                className="wc-btn wc-btn-ghost wc-btn-sm"
                                onClick={() => addSubsection(section.id)}
                              >
                                <Plus size={14} /> Add Subsection
                              </button>
                            </div>
                            {section.subsections.map((sub) => (
                              <div key={sub.id} className="wc-privacy-subsection">
                                <div className="wc-privacy-subsection-header">
                                  <span className="wc-privacy-subsection-id">{sub.id}</span>
                                  <button 
                                    className="wc-btn wc-btn-danger wc-btn-sm"
                                    onClick={() => removeSubsection(section.id, sub.id)}
                                  >
                                    <X size={14} />
                                  </button>
                                </div>
                                <div className="wc-field">
                                  <label className="wc-field-label">Subsection Title</label>
                                  <input 
                                    className="wc-input" 
                                    value={sub.title} 
                                    onChange={e => updateSubsection(section.id, sub.id, "title", e.target.value)} 
                                  />
                                </div>
                                <div className="wc-field">
                                  <label className="wc-field-label">Subsection Content</label>
                                  <textarea 
                                    className="wc-textarea lg" 
                                    value={sub.content} 
                                    onChange={e => updateSubsection(section.id, sub.id, "content", e.target.value)} 
                                    rows={3}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Bullet Points */}
                        {(section.bullet_points && section.bullet_points.length > 0) && (
                          <div className="wc-privacy-bullets">
                            <div className="wc-privacy-bullets-header">
                              <h4 className="wc-privacy-bullets-title">
                                Bullet Points ({section.bullet_points.length})
                              </h4>
                              <button 
                                className="wc-btn wc-btn-ghost wc-btn-sm"
                                onClick={() => addBulletPoint(section.id)}
                              >
                                <Plus size={14} /> Add Bullet
                              </button>
                            </div>
                            {section.bullet_points.map((bullet, idx) => (
                              <div key={idx} className="wc-privacy-bullet-row">
                                <span className="wc-privacy-bullet-dot">•</span>
                                <input 
                                  className="wc-input" 
                                  value={bullet} 
                                  onChange={e => updateBulletPoint(section.id, idx, e.target.value)} 
                                  placeholder="Enter bullet point"
                                />
                                <button 
                                  className="wc-btn wc-btn-danger wc-btn-sm"
                                  onClick={() => removeBulletPoint(section.id, idx)}
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Empty State Actions */}
                        {!section.content && !section.subsections?.length && !section.bullet_points?.length && (
                          <div className="wc-privacy-empty-actions">
                            <button 
                              className="wc-btn wc-btn-ghost wc-btn-sm"
                              onClick={() => addSubsection(section.id)}
                            >
                              <Plus size={14} /> Add Subsection
                            </button>
                            <button 
                              className="wc-btn wc-btn-ghost wc-btn-sm"
                              onClick={() => addBulletPoint(section.id)}
                            >
                              <Plus size={14} /> Add Bullet Point
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredSections.length === 0 && (
              <div className="wc-privacy-empty-state">
                <AlertCircle size={48} className="wc-empty-icon" />
                <h3>No sections found</h3>
                <p>Try adjusting your search or add a new section</p>
                <button className="wc-btn wc-btn-primary" onClick={addNewSection}>
                  <Plus size={14} /> Add New Section
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// Privacy Features Editor
// ──────────────────────────────────────────────
const PrivacyFeaturesEditor = () => {
  const [features, setFeatures] = useState([
    { 
      id: "feature-1",
      title: "Data Protection", 
      description: "We use industry-standard encryption and security measures to protect your personal information.", 
      icon: "Shield" 
    },
    { 
      id: "feature-2",
      title: "Your Rights", 
      description: "You have the right to access, correct, delete, or restrict the processing of your personal information.", 
      icon: "Users" 
    },
    { 
      id: "feature-3",
      title: "Cookie Control", 
      description: "You can manage your cookie preferences at any time through your browser settings.", 
      icon: "Cookie" 
    },
    { 
      id: "feature-4",
      title: "Transparency", 
      description: "We are committed to being transparent about how we collect, use, and share your information.", 
      icon: "Eye" 
    }
  ]);

  const updateFeature = useCallback((id, key, value) => {
    setFeatures(prev => prev.map(f => f.id === id ? { ...f, [key]: value } : f));
  }, []);

  const addFeature = useCallback(() => {
    const newId = `feature-${Date.now()}`;
    setFeatures(prev => [...prev, { 
      id: newId,
      title: "", 
      description: "", 
      icon: "Shield" 
    }]);
  }, []);

  const removeFeature = useCallback((id) => {
    setFeatures(prev => prev.filter(f => f.id !== id));
  }, []);

  const moveFeature = useCallback((index, direction) => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === features.length - 1)
    ) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    setFeatures(prev => {
      const updated = [...prev];
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      return updated;
    });
  }, [features]);

  const iconOptions = [
    { value: "Shield", label: "Shield" },
    { value: "Users", label: "Users" },
    { value: "Cookie", label: "Cookie" },
    { value: "Eye", label: "Eye" },
    { value: "Lock", label: "Lock" },
    { value: "Database", label: "Database" },
    { value: "Globe", label: "Globe" },
    { value: "Star", label: "Star" }
  ];

  const getIconComponent = (iconName) => {
    switch(iconName) {
      case "Shield": return <Shield size={20} />;
      case "Users": return <Users size={20} />;
      case "Cookie": return <Cookie size={20} />;
      case "Eye": return <Eye size={20} />;
      case "Lock": return <Lock size={20} />;
      case "Database": return <Database size={20} />;
      case "Globe": return <Globe size={20} />;
      case "Star": return <Star size={20} />;
      default: return <Shield size={20} />;
    }
  };

  return (
    <div className="wc-privacy-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title">
            <Star size={15} /> Features Section
            <span className="wc-editor-card-desc">{features.length} features</span>
          </h3>
          <button className="wc-btn wc-btn-primary" onClick={addFeature}>
            <Plus size={14} /> Add Feature
          </button>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-privacy-features-grid">
            {features.map((feature, index) => (
              <div key={feature.id} className="wc-privacy-feature-card">
                <div className="wc-privacy-feature-header">
                  <div className="wc-privacy-feature-header-left">
                    <div className="wc-privacy-feature-icon">
                      {getIconComponent(feature.icon)}
                    </div>
                    <span className="wc-privacy-feature-number">#{index + 1}</span>
                  </div>
                  <div className="wc-privacy-feature-header-right">
                    <button 
                      className="wc-btn wc-btn-ghost wc-btn-sm"
                      onClick={() => moveFeature(index, 'up')}
                      disabled={index === 0}
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button 
                      className="wc-btn wc-btn-ghost wc-btn-sm"
                      onClick={() => moveFeature(index, 'down')}
                      disabled={index === features.length - 1}
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button 
                      className="wc-btn wc-btn-danger wc-btn-sm"
                      onClick={() => removeFeature(feature.id)}
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                </div>
                <div className="wc-privacy-feature-body">
                  <div className="wc-field">
                    <label className="wc-field-label">Feature Title</label>
                    <input 
                      className="wc-input" 
                      value={feature.title} 
                      onChange={e => updateFeature(feature.id, "title", e.target.value)} 
                      placeholder="Feature Title"
                    />
                  </div>
                  <div className="wc-field">
                    <label className="wc-field-label">Feature Description</label>
                    <textarea 
                      className="wc-textarea" 
                      value={feature.description} 
                      onChange={e => updateFeature(feature.id, "description", e.target.value)} 
                      placeholder="Feature description"
                      rows={2}
                    />
                  </div>
                  <div className="wc-field">
                    <label className="wc-field-label">Icon</label>
                    <select 
                      className="wc-select" 
                      value={feature.icon} 
                      onChange={e => updateFeature(feature.id, "icon", e.target.value)}
                    >
                      {iconOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {features.length === 0 && (
            <div className="wc-privacy-empty-state">
              <AlertCircle size={48} className="wc-empty-icon" />
              <h3>No features added</h3>
              <p>Add a feature to highlight key privacy aspects</p>
              <button className="wc-btn wc-btn-primary" onClick={addFeature}>
                <Plus size={14} /> Add Feature
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// Privacy SEO Editor
// ──────────────────────────────────────────────
const PrivacySeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "Privacy Policy — Renova Life Care | Your Privacy Matters",
    meta_description: "Learn how Renova Life Care collects, uses, and protects your personal information. Read our comprehensive privacy policy to understand your rights and choices.",
    og_title: "Privacy Policy — Renova Life Care",
    og_description: "Your privacy matters to us. Learn how we collect, use, and protect your personal information.",
    og_image: "/images/og-privacy.jpg",
    canonical_url: "https://renovalifecare.com/privacy-policy",
    robots: "index, follow",
    keywords: "privacy policy, data protection, personal information, cookies, privacy rights, healthcare privacy"
  });

  const set = (k, v) => setData(prev => ({ ...prev, [k]: v }));

  return (
    <div className="wc-privacy-editor">
      {/* SEO Preview */}
      <div className="wc-seo-preview">
        <div className="wc-seo-preview-label">Google Search Preview</div>
        <div className="wc-seo-preview-url">{data.canonical_url}</div>
        <div className="wc-seo-preview-title">{data.meta_title}</div>
        <p className="wc-seo-preview-desc">{data.meta_description}</p>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title">
            <Search size={15} /> Meta Tags
          </h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">
                Meta Title <span className="required">*</span>
                <span className="wc-field-counter">{data.meta_title.length}/60</span>
              </label>
              <input 
                className="wc-input" 
                value={data.meta_title} 
                onChange={e => set("meta_title", e.target.value)} 
                placeholder="Enter meta title"
              />
              <span className="wc-field-hint">Recommended: 50-60 characters</span>
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">
                Meta Description
                <span className="wc-field-counter">{data.meta_description.length}/160</span>
              </label>
              <textarea 
                className="wc-textarea" 
                value={data.meta_description} 
                onChange={e => set("meta_description", e.target.value)} 
                rows={3}
                placeholder="Enter meta description"
              />
              <span className="wc-field-hint">Recommended: 150-160 characters</span>
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Keywords</label>
              <input 
                className="wc-input" 
                value={data.keywords} 
                onChange={e => set("keywords", e.target.value)} 
                placeholder="Comma separated keywords"
              />
              <span className="wc-field-hint">Comma separated keywords</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// Helper Components
// ──────────────────────────────────────────────
const ImageUploadField = ({ label, hint, value, onChange }) => {
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
    <div className="wc-field">
      {label && <label className="wc-field-label">{label}</label>}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        onChange={handleFileSelect}
      />
      {value ? (
        <div className="wc-image-preview">
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
        <div className="wc-image-upload" onClick={triggerUpload}>
          <div className="wc-image-upload-icon">
            <Upload size={20} />
          </div>
          <p>Click to browse from desktop</p>
          <span>PNG, JPG, WEBP up to 5MB</span>
        </div>
      )}
      {hint && <span className="wc-field-hint">{hint}</span>}
    </div>
  );
};

export default PrivacyPolicyPage;