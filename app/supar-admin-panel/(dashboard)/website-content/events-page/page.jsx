// app/supar-admin-panel/website-content/faq-page/page.jsx
"use client";

import { useState, useRef } from "react";
import {
  Info,
  Layout,
  Search,
  Save,
  RefreshCw,
  Check,
  ChevronDown,
  Clock,
  Upload,
  Trash,
  Plus,
  X,
  MessageCircle,
  Phone,
  Mail,
  HelpCircle,
  FileText,
  Users,
  CreditCard,
  Shield,
  Settings,
  Globe,
  Star,
  Award,
  Target,
  Eye,
  User,
  List,
  ExternalLink,
  Link as LinkIcon
} from "lucide-react";
import "./events.css";

const EventsPage = () => {
  const [selectedSection, setSelectedSection] = useState("events-hero");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const sections = [
    { id: "events-hero", label: "Hero Section", icon: Layout },
    { id: "events-content", label: "Event Content", icon: FileText },
    { id: "events-questions", label: "Questions & Answers", icon: HelpCircle },
    { id: "events-support", label: "Support & Contact", icon: MessageCircle },
    { id: "events-features", label: "Features Section", icon: Star },
    { id: "seo", label: "SEO & Meta", icon: Search }
  ];

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 900));
    setSaving(false);
    showToast("FAQ changes saved successfully!", "success");
  };

  const showToast = (msg, type = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "success" }), 3000);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "faq-hero":
        return <FaqHeroEditor />;
      case "faq-categories":
        return <FaqCategoriesEditor />;
      case "faq-questions":
        return <FaqQuestionsEditor />;
      case "faq-support":
        return <FaqSupportEditor />;
      case "faq-features":
        return <FaqFeaturesEditor />;
      case "seo":
        return <FaqSeoEditor />;
      default:
        return <FaqHeroEditor />;
    }
  };

  return (
    <div className="wc-faq-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">FAQ</span>
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
                  <HelpCircle size={20} />
                </div>
                <div className="wc-page-info-text">
                  <h2>FAQ Page</h2>
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

// ──────────────────────────────────────────────
// FAQ Hero Section Editor
// ──────────────────────────────────────────────
const FaqHeroEditor = () => {
  const [data, setData] = useState({
    section_title: "Frequently Asked Questions",
    section_subtitle: "Quick answers to common questions about our healthcare services. Can't find what you're looking for? Contact us.",
    search_placeholder: "Search questions (e.g., 'insurance', 'teleconsultation', 'refund')",
    search_tip: "Try keywords like appointment, billing, prescription, or privacy",
    quick_links: [
      { label: "Book an Appointment", url: "/appointments" },
      { label: "Find a Doctor", url: "/doctors" },
      { label: "View Pricing", url: "/pricing" },
      { label: "Contact Support", url: "/contact" }
    ]
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  const updateQuickLink = (index, key, value) => {
    const updated = [...data.quick_links];
    updated[index] = { ...updated[index], [key]: value };
    set("quick_links", updated);
  };

  return (
    <div className="wc-faq-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Layout size={15} /> Hero Section</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Title <span className="required">*</span></label>
              <input 
                className="wc-input" 
                value={data.section_title} 
                onChange={e => set("section_title", e.target.value)} 
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Subtitle</label>
              <textarea 
                className="wc-textarea" 
                value={data.section_subtitle} 
                onChange={e => set("section_subtitle", e.target.value)} 
                rows={2} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// FAQ Categories Editor
// ──────────────────────────────────────────────
const FaqCategoriesEditor = () => {
  const [categories, setCategories] = useState([
    { id: "A", label: "Appointments & Booking", icon: "Calendar", count: 4 },
    { id: "B", label: "Services & Treatments", icon: "Stethoscope", count: 4 },
    { id: "C", label: "Billing & Insurance", icon: "CreditCard", count: 4 },
    { id: "D", label: "Privacy & Data", icon: "Shield", count: 4 },
    { id: "E", label: "Technical Support", icon: "Settings", count: 4 },
    { id: "F", label: "Emergency & Urgent Care", icon: "AlertCircle", count: 3 }
  ]);

  const updateCategory = (index, key, value) => {
    const updated = [...categories];
    updated[index] = { ...updated[index], [key]: value };
    setCategories(updated);
  };

  const addCategory = () => {
    setCategories([...categories, { 
      id: String.fromCharCode(65 + categories.length), 
      label: "", 
      icon: "HelpCircle", 
      count: 0 
    }]);
  };

  const removeCategory = (index) => {
    const updated = [...categories];
    updated.splice(index, 1);
    setCategories(updated);
  };

  return (
    <div className="wc-faq-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><FileText size={15} /> FAQ Categories</h3>
          <span className="wc-editor-card-desc">{categories.length} categories</span>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-faq-categories-grid">
            {categories.map((cat, index) => (
              <div key={index} className="wc-faq-category-card">
                <div className="wc-faq-category-header">
                  <span className="wc-faq-category-id">{cat.id}</span>
                  <button 
                    className="wc-btn wc-btn-danger wc-btn-sm"
                    onClick={() => removeCategory(index)}
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="wc-faq-category-body">
                  <div className="wc-field">
                    <label className="wc-field-label">Category Label</label>
                    <input 
                      className="wc-input" 
                      value={cat.label} 
                      onChange={e => updateCategory(index, "label", e.target.value)} 
                      placeholder="e.g., Appointments & Booking"
                    />
                  </div>
                  <div className="wc-field">
                    <label className="wc-field-label">Icon</label>
                    <select 
                      className="wc-select" 
                      value={cat.icon} 
                      onChange={e => updateCategory(index, "icon", e.target.value)}
                    >
                      <option value="Calendar">Calendar</option>
                      <option value="Stethoscope">Stethoscope</option>
                      <option value="CreditCard">Credit Card</option>
                      <option value="Shield">Shield</option>
                      <option value="Settings">Settings</option>
                      <option value="AlertCircle">Alert Circle</option>
                      <option value="HelpCircle">Help Circle</option>
                    </select>
                  </div>
                  <div className="wc-field">
                    <label className="wc-field-label">Question Count</label>
                    <input 
                      className="wc-input" 
                      type="number" 
                      value={cat.count} 
                      onChange={e => updateCategory(index, "count", parseInt(e.target.value) || 0)} 
                      min="0"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="wc-repeater-add" onClick={addCategory}>
            <Plus size={14} /> Add Category
          </button>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// FAQ Questions & Answers Editor
// ──────────────────────────────────────────────
const FaqQuestionsEditor = () => {
  const [questions, setQuestions] = useState([
    // A. Appointments & Booking
    { id: "A1", category: "A", question: "How do I book an appointment?", answer: "" },
    { id: "A2", category: "A", question: "Can I reschedule or cancel my appointment?", answer: "" },
    { id: "A3", category: "A", question: "What should I bring to my first visit?", answer: "" },
    { id: "A4", category: "A", question: "Do you offer teleconsultations?", answer: "" },
    
    // B. Services & Treatments
    { id: "B1", category: "B", question: "What medical specialties do you offer?", answer: "" },
    { id: "B2", category: "B", question: "Do you provide diagnostic tests?", answer: "" },
    { id: "B3", category: "B", question: "Can I get a prescription refilled online?", answer: "" },
    { id: "B4", category: "B", question: "Do you offer home visit services?", answer: "" },
    
    // C. Billing & Insurance
    { id: "C1", category: "C", question: "What payment methods do you accept?", answer: "" },
    { id: "C2", category: "C", question: "Do you accept health insurance?", answer: "" },
    { id: "C3", category: "C", question: "What is your refund policy?", answer: "" },
    { id: "C4", category: "C", question: "Can I get an itemized bill?", answer: "" },
    
    // D. Privacy & Data
    { id: "D1", category: "D", question: "How is my health data protected?", answer: "" },
    { id: "D2", category: "D", question: "Who can access my medical records?", answer: "" },
    { id: "D3", category: "D", question: "Can I download or transfer my health data?", answer: "" },
    { id: "D4", category: "D", question: "Do you share my data with third parties?", answer: "" },
    
    // E. Technical Support
    { id: "E1", category: "E", question: "What browsers/devices are supported?", answer: "" },
    { id: "E2", category: "E", question: "I forgot my password. How do I reset it?", answer: "" },
    { id: "E3", category: "E", question: "My video consultation isn't working. What should I do?", answer: "" },
    { id: "E4", category: "E", question: "How do I delete my account?", answer: "" },
    
    // F. Emergency & Urgent Care
    { id: "F1", category: "F", question: "What should I do in a medical emergency?", answer: "" },
    { id: "F2", category: "F", question: "Do you offer urgent same-day appointments?", answer: "" },
    { id: "F3", category: "F", question: "Can I get advice for a child's fever at night?", answer: "" }
  ]);

  const [selectedCategory, setSelectedCategory] = useState("A");

  const categoryLabels = {
    A: "Appointments & Booking",
    B: "Services & Treatments",
    C: "Billing & Insurance",
    D: "Privacy & Data",
    E: "Technical Support",
    F: "Emergency & Urgent Care"
  };

  const updateQuestion = (index, key, value) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [key]: value };
    setQuestions(updated);
  };

  const addQuestion = () => {
    const lastId = questions[questions.length - 1]?.id || "A0";
    const newId = String.fromCharCode(lastId.charCodeAt(0)) + (parseInt(lastId.substring(1)) + 1);
    setQuestions([...questions, { 
      id: newId, 
      category: selectedCategory, 
      question: "", 
      answer: "" 
    }]);
  };

  const removeQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const getCategoryQuestions = () => {
    return questions.filter(q => q.category === selectedCategory);
  };

  const getCategoryCount = (catId) => {
    return questions.filter(q => q.category === catId).length;
  };

  return (
    <div className="wc-faq-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><HelpCircle size={15} /> Questions & Answers</h3>
          <span className="wc-editor-card-desc">{questions.length} total questions</span>
        </div>
        <div className="wc-editor-card-body">
          {/* Category Filter */}
          <div className="wc-faq-category-filter">
            <label className="wc-field-label">Filter by Category:</label>
            <select 
              className="wc-select" 
              value={selectedCategory} 
              onChange={e => setSelectedCategory(e.target.value)}
              style={{ maxWidth: '300px' }}
            >
              {Object.entries(categoryLabels).map(([id, label]) => (
                <option key={id} value={id}>
                  {id}. {label} ({getCategoryCount(id)})
                </option>
              ))}
            </select>
          </div>

          <div className="wc-faq-questions-list">
            {getCategoryQuestions().map((q, index) => {
              const globalIndex = questions.findIndex(item => item.id === q.id);
              return (
                <div key={q.id} className="wc-faq-question-item">
                  <div className="wc-faq-question-header">
                    <span className="wc-faq-question-id">{q.id}</span>
                    <button 
                      className="wc-btn wc-btn-danger wc-btn-sm"
                      onClick={() => removeQuestion(globalIndex)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div className="wc-faq-question-body">
                    <div className="wc-field">
                      <label className="wc-field-label">Question</label>
                      <input 
                        className="wc-input" 
                        value={q.question} 
                        onChange={e => updateQuestion(globalIndex, "question", e.target.value)} 
                        placeholder="Enter the question"
                      />
                    </div>
                    <div className="wc-field">
                      <label className="wc-field-label">Answer</label>
                      <textarea 
                        className="wc-textarea lg" 
                        value={q.answer} 
                        onChange={e => updateQuestion(globalIndex, "answer", e.target.value)} 
                        placeholder="Enter the answer"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="wc-repeater-add" onClick={addQuestion}>
            <Plus size={14} /> Add Question to {categoryLabels[selectedCategory] || "Selected Category"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// FAQ Support & Contact Editor
// ──────────────────────────────────────────────
const FaqSupportEditor = () => {
  const [data, setData] = useState({
    support_title: "Still have questions?",
    support_description: "Our support team is here to help. Get personalized assistance via chat, email, or phone.",
    contact_button_text: "Contact Support",
    contact_phone: "+880 1234-567890",
    contact_email: "support@renovalifecare.com",
    support_hours: "24/7 Availability",
    support_hours_desc: "Online booking & chat support anytime",
    response_time: "Fast Responses",
    response_time_desc: "Average reply time: under 2 hours",
    expert_answers: "Expert Answers",
    expert_answers_desc: "Responses reviewed by medical staff",
    secure_private: "Secure & Private",
    secure_private_desc: "Your inquiries are confidential"
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div className="wc-faq-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><MessageCircle size={15} /> Support Section</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Support Title</label>
              <input 
                className="wc-input" 
                value={data.support_title} 
                onChange={e => set("support_title", e.target.value)} 
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Support Description</label>
              <textarea 
                className="wc-textarea" 
                value={data.support_description} 
                onChange={e => set("support_description", e.target.value)} 
                rows={2} 
              />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Contact Button Text</label>
              <input 
                className="wc-input" 
                value={data.contact_button_text} 
                onChange={e => set("contact_button_text", e.target.value)} 
              />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Contact Phone</label>
              <input 
                className="wc-input" 
                value={data.contact_phone} 
                onChange={e => set("contact_phone", e.target.value)} 
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Contact Email</label>
              <input 
                className="wc-input" 
                type="email"
                value={data.contact_email} 
                onChange={e => set("contact_email", e.target.value)} 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Star size={15} /> Feature Cards (4 Items)</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-faq-features-grid">
            {[
              { key: "response_time", label: "Fast Responses", desc: "Average reply time: under 2 hours" },
              { key: "support_hours", label: "24/7 Availability", desc: "Online booking & chat support anytime" },
              { key: "expert_answers", label: "Expert Answers", desc: "Responses reviewed by medical staff" },
              { key: "secure_private", label: "Secure & Private", desc: "Your inquiries are confidential" }
            ].map(({ key, label, desc }) => (
              <div key={key} className="wc-faq-feature-card">
                <div className="wc-field">
                  <label className="wc-field-label">Feature Title</label>
                  <input 
                    className="wc-input" 
                    value={data[key.replace("_", "") + "_title"] || label} 
                    onChange={e => set(key + "_title", e.target.value)} 
                  />
                </div>
                <div className="wc-field">
                  <label className="wc-field-label">Feature Description</label>
                  <input 
                    className="wc-input" 
                    value={data[key + "_desc"] || desc} 
                    onChange={e => set(key + "_desc", e.target.value)} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// FAQ Features Editor
// ──────────────────────────────────────────────
const FaqFeaturesEditor = () => {
  const [data, setData] = useState({
    features: [
      { title: "Fast Responses", description: "Average reply time: under 2 hours", icon: "Clock" },
      { title: "24/7 Availability", description: "Online booking & chat support anytime", icon: "Globe" },
      { title: "Expert Answers", description: "Responses reviewed by medical staff", icon: "Award" },
      { title: "Secure & Private", description: "Your inquiries are confidential", icon: "Shield" }
    ]
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  const updateFeature = (index, key, value) => {
    const updated = [...data.features];
    updated[index] = { ...updated[index], [key]: value };
    set("features", updated);
  };

  return (
    <div className="wc-faq-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Star size={15} /> Features Section</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-faq-features-grid">
            {data.features.map((feature, i) => (
              <div key={i} className="wc-faq-feature-card">
                <div className="wc-field">
                  <label className="wc-field-label">Feature Title</label>
                  <input 
                    className="wc-input" 
                    value={feature.title} 
                    onChange={e => updateFeature(i, "title", e.target.value)} 
                  />
                </div>
                <div className="wc-field">
                  <label className="wc-field-label">Feature Description</label>
                  <input 
                    className="wc-input" 
                    value={feature.description} 
                    onChange={e => updateFeature(i, "description", e.target.value)} 
                  />
                </div>
                <div className="wc-field">
                  <label className="wc-field-label">Icon</label>
                  <select 
                    className="wc-select" 
                    value={feature.icon} 
                    onChange={e => updateFeature(i, "icon", e.target.value)}
                  >
                    <option value="Clock">Clock</option>
                    <option value="Globe">Globe</option>
                    <option value="Award">Award</option>
                    <option value="Shield">Shield</option>
                    <option value="Star">Star</option>
                    <option value="Heart">Heart</option>
                    <option value="Users">Users</option>
                    <option value="Settings">Settings</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// FAQ SEO Editor
// ──────────────────────────────────────────────
const FaqSeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "FAQ — Renova Life Care | Healthcare Questions Answered",
    meta_description: "Find answers to common questions about appointments, billing, teleconsultation, insurance, privacy, and more at Renova Life Care.",
    og_title: "Frequently Asked Questions — Renova Life Care",
    og_description: "Quick answers to common questions about our healthcare services. Can't find what you're looking for? Contact us.",
    og_image: "/images/og-faq.jpg",
    canonical_url: "https://renovalifecare.com/faq",
    robots: "index, follow",
    keywords: "faq, healthcare questions, appointments, billing, insurance, teleconsultation, privacy"
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div className="wc-faq-editor">
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
              <input 
                className="wc-input" 
                value={data.meta_title} 
                onChange={e => set("meta_title", e.target.value)} 
              />
              <span className="wc-field-hint">Recommended: 50-60 characters</span>
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Meta Description</label>
              <textarea 
                className="wc-textarea" 
                value={data.meta_description} 
                onChange={e => set("meta_description", e.target.value)} 
                rows={3} 
              />
              <span className="wc-field-hint">Recommended: 150-160 characters</span>
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Keywords</label>
              <input 
                className="wc-input" 
                value={data.keywords} 
                onChange={e => set("keywords", e.target.value)} 
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

export default EventsPage;