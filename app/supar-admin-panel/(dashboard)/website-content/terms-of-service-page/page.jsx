// app/supar-admin-panel/website-content/terms-of-service/page.jsx
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
  ArrowUp,
  ArrowDown,
  Copy,
  AlertCircle,
  Minimize2,
  Maximize2,
  Scale,
  FileCheck,
  Gavel,
  ScrollText,
  Building2,
  Phone,
  Mail,
  MapPin,
  Award,
  ShieldCheck,
  BadgeCheck,
  Handshake
} from "lucide-react";
import "./terms-of-service.css";
import "../website-content.css";

// ──────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────
const TermsOfServicePage = () => {
  const [selectedSection, setSelectedSection] = useState("terms-content");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const sections = [
    { id: "terms-hero", label: "Hero Section", icon: Layout },
    { id: "terms-content", label: "Terms Content", icon: FileText },
    { id: "terms-features", label: "Features Section", icon: Star },
    { id: "seo", label: "SEO & Meta", icon: Search }
  ];

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1200));
    setSaving(false);
    showToast("Terms of Service changes saved successfully!", "success");
  };

  const showToast = (msg, type = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "success" }), 3000);
  };

  const renderContent = useCallback(() => {
    switch (selectedSection) {
      case "terms-hero":
        return <TermsHeroEditor />;
      case "terms-content":
        return <TermsContentEditor />;
      case "terms-features":
        return <TermsFeaturesEditor />;
      case "seo":
        return <TermsSeoEditor />;
      default:
        return <TermsContentEditor />;
    }
  }, [selectedSection]);

  return (
    <div className="wc-terms-page">
      <div className="wc-editor">
        {/* Top Bar */}
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span className="wc-breadcrumb-item">Website Content</span>
            <ChevronRight size={14} className="wc-breadcrumb-separator" />
            <span className="wc-breadcrumb-item current">Terms of Service</span>
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
                  <Scale size={20} />
                </div>
                <div className="wc-page-info-text">
                  <h2>Terms of Service</h2>
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
// Terms Hero Section Editor
// ──────────────────────────────────────────────
const TermsHeroEditor = () => {
  const [data, setData] = useState({
    section_title: "Terms of Service",
    section_subtitle: "Understanding your rights and responsibilities when using Renova Life Care Ltd's healthcare platform.",
    effective_date: "May 19, 2026",
    last_updated: "June 29, 2026",
    badge_text: "LEGAL & COMPLIANCE"
  });

  const set = (k, v) => setData(prev => ({ ...prev, [k]: v }));

  return (
    <div className="wc-terms-editor">
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
                Badge Text <span className="required">*</span>
              </label>
              <input 
                className="wc-input" 
                value={data.badge_text} 
                onChange={e => set("badge_text", e.target.value)} 
                placeholder="LEGAL & COMPLIANCE"
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">
                Section Title <span className="required">*</span>
              </label>
              <input 
                className="wc-input" 
                value={data.section_title} 
                onChange={e => set("section_title", e.target.value)} 
                placeholder="Terms of Service"
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Subtitle</label>
              <textarea 
                className="wc-textarea" 
                value={data.section_subtitle} 
                onChange={e => set("section_subtitle", e.target.value)} 
                rows={2}
                placeholder="Understanding your rights and responsibilities when using Renova Life Care Ltd's healthcare platform."
              />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Effective Date</label>
              <input 
                className="wc-input" 
                value={data.effective_date} 
                onChange={e => set("effective_date", e.target.value)} 
                placeholder="May 19, 2026"
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
// Terms Content Editor - Professional Version
// ──────────────────────────────────────────────
const TermsContentEditor = () => {
  const [termsSections, setTermsSections] = useState([
    {
      id: "acceptance",
      serial: "1",
      title: "Acceptance of Terms",
      content: "Welcome to Renova Life Care Ltd. These Terms of Service ('Terms', 'Agreement') constitute a legally binding agreement between you ('User', 'you' or 'your') and Renova Life Care Ltd. ('we', 'us', or 'our') governing your access to and use of our website, mobile applications, and healthcare services (collectively, the 'Services').\n\nBy accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, please do not use our Services.\n\nThese Terms apply to all visitors, users, and others who access or use the Services. Please read them carefully.",
      subsections: [],
      bullet_points: []
    },
    {
      id: "description",
      serial: "2",
      title: "Description of Services",
      content: "Renova Life Care Ltd. provides a digital healthcare platform that connects patients with qualified healthcare professionals in Bangladesh. Our Services include:",
      subsections: [],
      bullet_points: [
        "Teleconsultations: Virtual doctor appointments via video, audio, or chat",
        "Appointment Booking: Schedule in-person visits at partner facilities",
        "Health Records: Secure storage and management of medical history",
        "Prescriptions & Reports: Digital access to prescriptions and diagnostic results",
        "Health Content: Educational articles, wellness tips, and preventive care guidance",
        "Emergency Support: Guidance for urgent health situations (not a replacement for emergency services)"
      ]
    },
    {
      id: "eligibility",
      serial: "3",
      title: "Eligibility & Registration",
      content: "",
      subsections: [
        {
          id: "3.1",
          title: "Age Requirement",
          content: "You must be at least 16 years old to use our Services. If you are under 18, you represent that you have obtained consent from a parent or legal guardian to use the Services and that they have agreed to these Terms on your behalf."
        },
        {
          id: "3.2",
          title: "Account Registration",
          content: "To access certain features, you must create an account by providing accurate and complete information, including:\n• Full name and date of birth\n• Valid email address and phone number\n• National ID or passport number (for verification)\n• Emergency contact information\n\nYou are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately at support@renovalifecare.com of any unauthorized use."
        },
        {
          id: "3.3",
          title: "User Verification",
          content: "We may require identity verification through government-issued ID, biometric authentication, or other methods to comply with Bangladesh healthcare regulations and prevent fraud."
        }
      ],
      bullet_points: []
    },
    {
      id: "obligations",
      serial: "4",
      title: "User Obligations & Conduct",
      content: "When using our Services, you agree to:",
      subsections: [],
      bullet_points: [
        "Provide Accurate Information: Submit truthful medical history, symptoms, and personal details.",
        "Protect Your Account: Keep login credentials secure; do not share your account.",
        "Use Services Appropriately: Do not misuse teleconsultations for non-medical purposes.",
        "Comply with Laws: Follow all applicable Bangladesh laws and healthcare regulations."
      ]
    },
    {
      id: "healthcare-disclaimer",
      serial: "5",
      title: "Healthcare Disclaimer",
      content: "",
      subsections: [
        {
          id: "5.1",
          title: "Not a Substitute for Emergency Care",
          content: "Our Services are not intended for medical emergencies. If you are experiencing a life-threatening condition, chest pain, difficulty breathing, severe bleeding, or other emergency, immediately:\n• Call emergency services: 999 (Bangladesh)\n• Go to the nearest hospital emergency department\n• Contact your primary care physician directly"
        },
        {
          id: "5.2",
          title: "Limitations of Teleconsultation",
          content: "Virtual consultations have inherent limitations. Our healthcare providers may:\n• Recommend in-person evaluation if remote assessment is insufficient\n• Prescribe medications only when clinically appropriate and legally permitted\n• Refer you to specialists or facilities for further care"
        },
        {
          id: "5.3",
          title: "User Responsibility",
          content: "You acknowledge that:\n• Health outcomes depend on many factors beyond our control\n• Following medical advice is your responsibility\n• Delayed care or non-adherence may affect treatment results\n• You should maintain regular care with a primary healthcare provider"
        }
      ],
      bullet_points: []
    },
    {
      id: "payments",
      serial: "6",
      title: "Payments & Billing",
      content: "",
      subsections: [
        {
          id: "6.1",
          title: "Service Fees",
          content: "Certain Services require payment. Fees are displayed before confirmation and may include:\n• Consultation fees (vary by specialist and duration)\n• Diagnostic test packages\n• Subscription plans for premium features\n• Prescription delivery charges (if applicable)"
        },
        {
          id: "6.2",
          title: "Payment Methods",
          content: "We accept payments via:\n• Credit/Debit cards (Visa, Mastercard, Amex)\n• Mobile financial services (bKash, Nagad, Rocket)\n• Bank transfers (for corporate accounts)\n• Insurance billing (where partnered)"
        },
        {
          id: "6.3",
          title: "Refund Policy",
          content: "Refund requests must be submitted within 7 days via billing@renovalifecare.com.",
          bullet_points: [
            "Consultation not started (user cancels >2 hrs prior): Full refund",
            "Consultation not started (user cancels <2 hrs prior): 50% refund",
            "Provider cancels or no-show: Full refund + credit",
            "Technical failure preventing service delivery: Full refund",
            "Service already rendered: No refund (exceptional cases considered)"
          ]
        }
      ],
      bullet_points: []
    },
    {
      id: "privacy",
      serial: "7",
      title: "Privacy & Data Protection",
      content: "Your privacy is fundamental to our mission. By using our Services, you consent to the collection, use, and disclosure of your information as described in our Privacy Policy, which is incorporated into these Terms by reference.\n\nKey Principles:\n• Health Data Sensitivity: Medical information receives enhanced protection under Bangladesh law and our internal policies\n• Minimal Collection: We collect only data necessary to provide and improve our Services\n• User Control: You may access, correct, or request deletion of your data (subject to legal retention requirements)\n• Security First: Industry-standard encryption, access controls, and regular audits protect your information\n\nFor detailed information about our data practices, please review our full Privacy Policy.",
      subsections: [],
      bullet_points: []
    },
    {
      id: "intellectual-property",
      serial: "8",
      title: "Intellectual Property",
      content: "",
      subsections: [
        {
          id: "8.1",
          title: "Our Property",
          content: "All content, features, and functionality of the Services—including but not limited to text, graphics, logos, software, and design—are owned by Renova Life Care Ltd. or our licensors and are protected by Bangladesh and international copyright, trademark, and other intellectual property laws."
        },
        {
          id: "8.2",
          title: "Limited License",
          content: "We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Services for personal, non-commercial purposes, subject to these Terms."
        },
        {
          id: "8.3",
          title: "User Content",
          content: "If you submit content (e.g., health questions, feedback), you:\n• Retain ownership of your original content\n• Grant us a worldwide, royalty-free license to use, reproduce, and display such content solely to provide and improve the Services\n• Represent that you have the right to submit such content\n\nWe do not claim ownership of your health data. Your medical records remain your property, accessible to you per our Privacy Policy."
        }
      ],
      bullet_points: []
    },
    {
      id: "limitation",
      serial: "9",
      title: "Limitation of Liability",
      content: "To the fullest extent permitted by Bangladesh law:",
      subsections: [],
      bullet_points: [
        "Exclusion of Consequential Damages: In no event shall Renova Life Care Ltd. be liable for any indirect, incidental, special, consequential, or punitive damages.",
        "Cap on Liability: Our total aggregate liability shall not exceed the amount you paid to us in the 12 months preceding the claim.",
        "Essential Basis of Bargain: The limitations in this section are an essential basis of the bargain between you and Renova Life Care Ltd."
      ]
    },
    {
      id: "termination",
      serial: "10",
      title: "Termination & Suspension",
      content: "",
      subsections: [
        {
          id: "10.1",
          title: "By You",
          content: "You may stop using the Services at any time. To delete your account, contact us at support@renovalifecare.com. Note: Medical records may be retained per legal requirements even after account deletion."
        },
        {
          id: "10.2",
          title: "By Us",
          content: "We may suspend or terminate your access to the Services immediately, without prior notice or liability, for any reason, including if you:\n• Breach any provision of these Terms\n• Engage in fraudulent, abusive, or illegal activity\n• Fail to maintain accurate or up-to-date account information\n• Are subject to regulatory restrictions preventing service provision"
        },
        {
          id: "10.3",
          title: "Effect of Termination",
          content: "Upon termination:\n• Your right to use the Services ceases immediately\n• Accrued rights and obligations survive (including payment obligations)\n• Sections on Disclaimer, Limitation of Liability, Governing Law, and any other provisions that by nature should survive, remain in effect"
        }
      ],
      bullet_points: []
    },
    {
      id: "changes",
      serial: "11",
      title: "Changes to Terms",
      content: "We reserve the right to modify these Terms at any time. When we do, we will:\n• Post the revised Terms on this page with an updated 'Last Updated' date\n• Notify registered users via email or in-app notification for material changes\n• Provide a reasonable opportunity to review changes before they take effect\n\nYour continued use of the Services after changes become effective constitutes acceptance of the new Terms. If you do not agree, you must stop using the Services and may request account deletion.",
      subsections: [],
      bullet_points: []
    },
    {
      id: "governing-law",
      serial: "12",
      title: "Governing Law & Dispute Resolution",
      content: "",
      subsections: [
        {
          id: "12.1",
          title: "Governing Law",
          content: "These Terms and your use of the Services shall be governed by and construed in accordance with the laws of the People's Republic of Bangladesh, without regard to its conflict of law principles."
        },
        {
          id: "12.2",
          title: "Dispute Resolution",
          content: "Any dispute arising from these Terms shall be resolved as follows:\n1. Informal Resolution: Contact our support team to attempt good-faith resolution.\n2. Mediation: If unresolved within 30 days, parties agree to non-binding mediation through the Bangladesh Medical & Dental Council (BMDC) or agreed-upon mediator.\n3. Arbitration: If mediation fails, disputes shall be settled by binding arbitration in Dhaka, Bangladesh, under the Arbitration Act, 2001."
        },
        {
          id: "12.3",
          title: "Class Action Waiver",
          content: "You agree to resolve disputes on an individual basis and waive any right to participate in class, consolidated, or representative actions against Renova Life Care Ltd."
        }
      ],
      bullet_points: []
    },
    {
      id: "miscellaneous",
      serial: "13",
      title: "Miscellaneous Provisions",
      content: "",
      subsections: [
        {
          id: "13.1",
          title: "Entire Agreement",
          content: "These Terms, together with our Privacy Policy and any additional terms posted on the Services, constitute the entire agreement between you and Renova Life Care Ltd. regarding the subject matter herein."
        },
        {
          id: "13.2",
          title: "Severability",
          content: "If any provision of these Terms is held invalid or unenforceable, the remaining provisions shall remain in full force and effect, and the invalid provision shall be replaced by a valid provision that most closely reflects the original intent."
        },
        {
          id: "13.3",
          title: "Waiver",
          content: "Our failure to enforce any right or provision of these Terms shall not be deemed a waiver of such right or provision unless expressly acknowledged in writing."
        },
        {
          id: "13.4",
          title: "Assignment",
          content: "You may not assign or transfer these Terms without our prior written consent. We may assign these Terms in connection with a merger, acquisition, or sale of assets."
        },
        {
          id: "13.5",
          title: "Force Majeure",
          content: "We shall not be liable for delays or failures in performance resulting from causes beyond our reasonable control, including acts of God, government actions, war, terrorism, pandemics, or internet/telecom infrastructure failures."
        },
        {
          id: "13.6",
          title: "Contact Information",
          content: "For questions about these Terms, please contact:\n• Legal Department: legal@renovalifecare.com\n• Registered Office: House #12, Gulshan 2, Dhaka-1212, Bangladesh\n• Regulatory Reference: Bangladesh Medical & Dental Council (BMDC) - bmdc.org.bd"
        }
      ],
      bullet_points: []
    }
  ]);

  const [expandedSections, setExpandedSections] = useState(
    termsSections.reduce((acc, s) => ({ ...acc, [s.id]: false }), {})
  );
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSection = useCallback((id) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  const expandAll = useCallback(() => {
    const allExpanded = termsSections.reduce((acc, s) => ({ ...acc, [s.id]: true }), {});
    setExpandedSections(allExpanded);
  }, [termsSections]);

  const collapseAll = useCallback(() => {
    const allCollapsed = termsSections.reduce((acc, s) => ({ ...acc, [s.id]: false }), {});
    setExpandedSections(allCollapsed);
  }, [termsSections]);

  const updateTermsSection = useCallback((id, key, value) => {
    setTermsSections(prev => 
      prev.map(s => s.id === id ? { ...s, [key]: value } : s)
    );
  }, []);

  const updateSubsection = useCallback((sectionId, subId, key, value) => {
    setTermsSections(prev =>
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
    const section = termsSections.find(s => s.id === sectionId);
    const subCount = (section?.subsections || []).length + 1;
    const newSubId = `${sectionId}-${subCount}`;
    
    setTermsSections(prev =>
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
  }, [termsSections]);

  const removeSubsection = useCallback((sectionId, subId) => {
    setTermsSections(prev =>
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
    setTermsSections(prev =>
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
    setTermsSections(prev =>
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
    setTermsSections(prev =>
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
    const newSerial = termsSections.length + 1;
    const newId = `section-${Date.now()}`;
    const newSection = {
      id: newId,
      serial: String(newSerial),
      title: `New Section ${newSerial}`,
      content: "",
      subsections: [],
      bullet_points: []
    };
    setTermsSections(prev => [...prev, newSection]);
    setExpandedSections(prev => ({ ...prev, [newId]: true }));
  }, [termsSections]);

  const removeSection = useCallback((id) => {
    setTermsSections(prev => {
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
      (direction === 'down' && index === termsSections.length - 1)
    ) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    setTermsSections(prev => {
      const updated = [...prev];
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      return updated.map((s, idx) => ({ ...s, serial: String(idx + 1) }));
    });
  }, [termsSections]);

  const duplicateSection = useCallback((id) => {
    const section = termsSections.find(s => s.id === id);
    if (!section) return;

    const newId = `section-${Date.now()}`;
    const newSerial = termsSections.length + 1;
    const newSection = {
      ...section,
      id: newId,
      serial: String(newSerial),
      title: `${section.title} (Copy)`
    };
    setTermsSections(prev => [...prev, newSection]);
    setExpandedSections(prev => ({ ...prev, [newId]: true }));
  }, [termsSections]);

  const filteredSections = useMemo(() => {
    if (!searchTerm.trim()) return termsSections;
    const term = searchTerm.toLowerCase().trim();
    return termsSections.filter(s => 
      s.title.toLowerCase().includes(term) ||
      s.content?.toLowerCase().includes(term) ||
      s.serial.includes(term) ||
      s.subsections?.some(sub => 
        sub.title.toLowerCase().includes(term) || 
        sub.content.toLowerCase().includes(term)
      ) ||
      s.bullet_points?.some(b => b.toLowerCase().includes(term))
    );
  }, [termsSections, searchTerm]);

  const getSectionStats = useCallback((section) => {
    const subCount = section.subsections?.length || 0;
    const bulletCount = section.bullet_points?.length || 0;
    const hasContent = section.content?.length > 0;
    return { subCount, bulletCount, hasContent };
  }, []);

  return (
    <div className="wc-terms-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <div className="wc-editor-card-title">
            <FileText size={15} /> Terms of Service Sections
            <span className="wc-editor-card-desc">{termsSections.length} sections</span>
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
          <div className="wc-terms-search">
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
              {filteredSections.length} of {termsSections.length} sections
            </span>
          </div>

          {/* Sections List */}
          <div className="wc-terms-sections-list">
            {filteredSections.map((section, index) => {
              const stats = getSectionStats(section);
              const isExpanded = expandedSections[section.id] || false;
              const actualIndex = termsSections.indexOf(section);

              return (
                <div key={section.id} className={`wc-terms-section-item ${isExpanded ? 'expanded' : ''}`}>
                  <div className="wc-terms-section-header">
                    <div className="wc-terms-section-header-left">
                      <button 
                        className="wc-terms-section-toggle"
                        onClick={() => toggleSection(section.id)}
                        aria-label={isExpanded ? "Collapse section" : "Expand section"}
                      >
                        <ChevronDown 
                          size={18} 
                          className={`wc-terms-section-chevron ${isExpanded ? 'open' : ''}`}
                        />
                      </button>
                      <span className="wc-terms-section-serial">#{section.serial}</span>
                      <span className="wc-terms-section-title-display">
                        {section.title || "Untitled Section"}
                      </span>
                      <div className="wc-terms-section-badges">
                        {stats.subCount > 0 && (
                          <span className="wc-terms-section-badge subsections">
                            {stats.subCount} subsection{stats.subCount > 1 ? 's' : ''}
                          </span>
                        )}
                        {stats.bulletCount > 0 && (
                          <span className="wc-terms-section-badge bullets">
                            {stats.bulletCount} bullet{stats.bulletCount > 1 ? 's' : ''}
                          </span>
                        )}
                        {!stats.hasContent && !stats.subCount && !stats.bulletCount && (
                          <span className="wc-terms-section-badge empty">Empty</span>
                        )}
                      </div>
                    </div>
                    <div className="wc-terms-section-header-right">
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
                        disabled={actualIndex === termsSections.length - 1}
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
                    <div className="wc-terms-section-body">
                      <div className="wc-terms-section-detail">
                        {/* Serial Number */}
                        <div className="wc-field-row">
                          <div className="wc-field">
                            <label className="wc-field-label">Serial Number</label>
                            <input 
                              className="wc-input wc-input-sm" 
                              value={section.serial} 
                              onChange={e => updateTermsSection(section.id, "serial", e.target.value)} 
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
                            onChange={e => updateTermsSection(section.id, "title", e.target.value)} 
                            placeholder="Enter section title"
                          />
                        </div>

                        {/* Main Content */}
                        <div className="wc-field">
                          <label className="wc-field-label">Content</label>
                          <textarea 
                            className="wc-textarea xl" 
                            value={section.content || ""} 
                            onChange={e => updateTermsSection(section.id, "content", e.target.value)} 
                            rows={4}
                            placeholder="Enter section content"
                          />
                        </div>

                        {/* Subsections */}
                        {(section.subsections && section.subsections.length > 0) && (
                          <div className="wc-terms-subsections">
                            <div className="wc-terms-subsections-header">
                              <h4 className="wc-terms-subsections-title">
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
                              <div key={sub.id} className="wc-terms-subsection">
                                <div className="wc-terms-subsection-header">
                                  <span className="wc-terms-subsection-id">{sub.id}</span>
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
                          <div className="wc-terms-bullets">
                            <div className="wc-terms-bullets-header">
                              <h4 className="wc-terms-bullets-title">
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
                              <div key={idx} className="wc-terms-bullet-row">
                                <span className="wc-terms-bullet-dot">•</span>
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
                          <div className="wc-terms-empty-actions">
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
              <div className="wc-terms-empty-state">
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
// Terms Features Editor
// ──────────────────────────────────────────────
const TermsFeaturesEditor = () => {
  const [features, setFeatures] = useState([
    { 
      id: "feature-1",
      title: "Bangladesh Law Compliant", 
      description: "Aligned with Digital Security Act, 2018 & BMDC guidelines", 
      icon: "BadgeCheck" 
    },
    { 
      id: "feature-2",
      title: "Healthcare Regulated", 
      description: "Services delivered by BMDC-verified medical professionals", 
      icon: "ShieldCheck" 
    },
    { 
      id: "feature-3",
      title: "Data Protected", 
      description: "End-to-end encryption and strict access controls", 
      icon: "Lock" 
    },
    { 
      id: "feature-4",
      title: "Transparent Practices", 
      description: "Clear terms, no hidden fees, easy cancellation", 
      icon: "Handshake" 
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
    { value: "BadgeCheck", label: "Badge Check" },
    { value: "ShieldCheck", label: "Shield Check" },
    { value: "Lock", label: "Lock" },
    { value: "Handshake", label: "Handshake" },
    { value: "Shield", label: "Shield" },
    { value: "Award", label: "Award" },
    { value: "Scale", label: "Scale" },
    { value: "Gavel", label: "Gavel" },
    { value: "Building2", label: "Building" },
    { value: "FileCheck", label: "File Check" }
  ];

  const getIconComponent = (iconName) => {
    switch(iconName) {
      case "BadgeCheck": return <BadgeCheck size={20} />;
      case "ShieldCheck": return <ShieldCheck size={20} />;
      case "Lock": return <Lock size={20} />;
      case "Handshake": return <Handshake size={20} />;
      case "Shield": return <Shield size={20} />;
      case "Award": return <Award size={20} />;
      case "Scale": return <Scale size={20} />;
      case "Gavel": return <Gavel size={20} />;
      case "Building2": return <Building2 size={20} />;
      case "FileCheck": return <FileCheck size={20} />;
      default: return <Shield size={20} />;
    }
  };

  return (
    <div className="wc-terms-editor">
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
          <div className="wc-terms-features-grid">
            {features.map((feature, index) => (
              <div key={feature.id} className="wc-terms-feature-card">
                <div className="wc-terms-feature-header">
                  <div className="wc-terms-feature-header-left">
                    <div className="wc-terms-feature-icon">
                      {getIconComponent(feature.icon)}
                    </div>
                    <span className="wc-terms-feature-number">#{index + 1}</span>
                  </div>
                  <div className="wc-terms-feature-header-right">
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
                <div className="wc-terms-feature-body">
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
            <div className="wc-terms-empty-state">
              <AlertCircle size={48} className="wc-empty-icon" />
              <h3>No features added</h3>
              <p>Add a feature to highlight key terms of service aspects</p>
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
// Terms SEO Editor
// ──────────────────────────────────────────────
const TermsSeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "Terms of Service — Renova Life Care | Legal Agreement",
    meta_description: "Read the Terms of Service for Renova Life Care. Understand your rights and responsibilities when using our healthcare platform and services.",
    og_title: "Terms of Service — Renova Life Care",
    og_description: "Understanding your rights and responsibilities when using Renova Life Care Ltd's healthcare platform.",
    og_image: "/images/og-terms.jpg",
    canonical_url: "https://renovalifecare.com/terms-of-service",
    robots: "index, follow",
    keywords: "terms of service, legal agreement, healthcare terms, user agreement, Renova Life Care"
  });

  const set = (k, v) => setData(prev => ({ ...prev, [k]: v }));

  return (
    <div className="wc-terms-editor">
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

export default TermsOfServicePage;