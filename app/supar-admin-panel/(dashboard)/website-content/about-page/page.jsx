// app/supar-admin-panel/website-content/about-page/page.jsx
"use client";

import { useState, useRef, useCallback, useMemo } from "react";
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
  Globe,
  ArrowUp,
  ArrowDown,
  Copy,
  AlertCircle,
  Maximize2,
  Minimize2,
  ChevronUp,
  ChevronRight,
  Edit,
  Settings,
  Tags,
  UserCog,
  Building2,
  ShieldCheck,
  Lock,
  UsersRound,
  Filter
} from "lucide-react";
import "./about.css";
import "../website-content.css";

// Custom LinkedIn Icon (SVG)
const LinkedinIcon = ({ size = 14 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// ──────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────
const AboutPage = () => {
  const [selectedSection, setSelectedSection] = useState("about-hero");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const sections = [
    { id: "about-hero", label: "Hero Section", icon: Layout },
    { id: "mission-vision", label: "Mission & Vision", icon: Target },
    { id: "team", label: "Our Leadership", icon: Users },
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
                  <Check size={11} /> Published
                </span>
                <span className="wc-meta-tag">
                  <Clock size={11} /> Last saved: Just now
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
// About Hero Editor
// ──────────────────────────────────────────────
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

// ──────────────────────────────────────────────
// Mission Vision Editor
// ──────────────────────────────────────────────
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

// ──────────────────────────────────────────────
// Team Photo Upload Component
// ──────────────────────────────────────────────
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

// ──────────────────────────────────────────────
// MD Photo Upload Component
// ──────────────────────────────────────────────
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

// ──────────────────────────────────────────────
// Team Editor with Tab View & Expandable Details
// ──────────────────────────────────────────────
const TeamEditor = () => {
  // State for section header data
  const [sectionData, setSectionData] = useState({
    section_title: "Our Leadership",
    section_subtitle: "The Team Behind Our Excellence",
    description: "Experienced leaders driving innovation, compassion, and quality across every department."
  });

  // Roles and Departments
  const roles = [
    "MEDICAL DIRECTOR",
    "CHIEF OPERATIONS OFFICER",
    "CHIEF FINANCIAL OFFICER",
    "HEAD OF DIAGNOSTICS",
    "HEAD OF NURSING"
  ];

  const departments = [
    "Executive Office",
    "Finance",
    "Operations",
    "Diagnostics",
    "Nursing"
  ];

  // Member names with profile images
  const memberOptions = [
    { name: "Prof. Nasrin Akter", image: "/images/team/01.jpg" },
    { name: "Dr. Kamrun Nahar", image: "/images/team/02.jpg" },
    { name: "Dr. Shirin Sultana", image: "/images/team/03.jpg" },
    { name: "Dr. Shehreen Amin Monami", image: "/images/team/04.jpg" },
    { name: "Dr. Farhana Begum", image: "/images/team/05.jpg" },
    { name: "Dr. Homayon Kabir", image: "/images/team/06.jpg" },
    { name: "Mr. Tanvir Ahmed", image: "/images/team/07.jpg" },
    { name: "Ms. Kamrun Nahar", image: "/images/team/08.jpg" }
  ];

  const [teamMembers, setTeamMembers] = useState([
    {
      id: "member-1",
      name: "Prof. Nasrin Akter",
      role: "MEDICAL DIRECTOR",
      department: "Executive Office",
      credentials: "MBBS, MS (Gynaecology)",
      description: "Leading medical strategy and clinical excellence across all departments.",
      social_linkedin: true,
      linkedin_url: "https://linkedin.com/in/nasrin-akter",
      image: "/images/team/01.jpg",
      expanded: false
    },
    {
      id: "member-2",
      name: "Dr. Kamrun Nahar",
      role: "CHIEF OPERATIONS OFFICER",
      department: "Executive Office",
      credentials: "MBIA (Healthcare Management)",
      description: "Oversees daily operations, process optimization, and service quality across all departments.",
      social_linkedin: true,
      linkedin_url: "https://linkedin.com/in/kamrun-nahar",
      image: "/images/team/02.jpg",
      expanded: false
    },
    {
      id: "member-3",
      name: "Dr. Shirin Sultana",
      role: "HEAD OF DIAGNOSTICS",
      department: "Diagnostics",
      credentials: "MBBS, MD (Pathology)",
      description: "Manages diagnostic services, laboratory operations, and quality control standards.",
      social_linkedin: true,
      linkedin_url: "https://linkedin.com/in/shirin-sultana",
      image: "/images/team/03.jpg",
      expanded: false
    },
    {
      id: "member-4",
      name: "Dr. Shehreen Amin Monami",
      role: "CHIEF FINANCIAL OFFICER",
      department: "Finance",
      credentials: "CA, MBA (Finance)",
      description: "Directs financial strategy, budgeting, and investment planning for growth.",
      social_linkedin: true,
      linkedin_url: "https://linkedin.com/in/shehreen-monami",
      image: "/images/team/04.jpg",
      expanded: false
    },
    {
      id: "member-5",
      name: "Dr. Farhana Begum",
      role: "HEAD OF NURSING",
      department: "Nursing",
      credentials: "BSc Nursing, MPH",
      description: "Leads nursing staff development, patient care protocols, and clinical training.",
      social_linkedin: true,
      linkedin_url: "https://linkedin.com/in/farhana-begum",
      image: "/images/team/05.jpg",
      expanded: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newMember, setNewMember] = useState({
    role: "",
    department: "",
    memberIndex: null
  });
  const [savingMember, setSavingMember] = useState(null);

  // Update section data
  const updateSectionData = (key, value) => {
    setSectionData(prev => ({ ...prev, [key]: value }));
  };

  // Filter members based on search and department
  const filteredMembers = useMemo(() => {
    let filtered = [...teamMembers];
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(m => 
        m.name.toLowerCase().includes(term) ||
        m.role.toLowerCase().includes(term) ||
        m.department.toLowerCase().includes(term) ||
        (m.description && m.description.toLowerCase().includes(term))
      );
    }
    
    if (selectedDepartment !== "all") {
      filtered = filtered.filter(m => m.department === selectedDepartment);
    }
    
    return filtered;
  }, [teamMembers, searchTerm, selectedDepartment]);

  // Toggle member expansion
  const toggleExpand = (id) => {
    setTeamMembers(prev => 
      prev.map(m => 
        m.id === id ? { ...m, expanded: !m.expanded } : { ...m, expanded: false }
      )
    );
  };

  const getDepartmentIcon = (dept) => {
    const icons = {
      "Executive Office": <Building2 size={16} />,
      "Finance": <Briefcase size={16} />,
      "Operations": <UserCog size={16} />,
      "Diagnostics": <ShieldCheck size={16} />,
      "Nursing": <Heart size={16} />,
      "Other": <UsersRound size={16} />
    };
    return icons[dept] || <UsersRound size={16} />;
  };

  const handleNewMemberChange = (key, value) => {
    setNewMember(prev => ({ ...prev, [key]: value }));
  };

  const openModal = () => {
    setNewMember({ role: "", department: "", memberIndex: null });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewMember({ role: "", department: "", memberIndex: null });
  };

  const handleAddMember = async () => {
    if (!newMember.role || !newMember.department || newMember.memberIndex === null) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    const selectedMember = memberOptions[newMember.memberIndex];
    if (!selectedMember) return;

    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 800));

    const newId = `member-${Date.now()}`;
    setTeamMembers(prev => [...prev, {
      id: newId,
      name: selectedMember.name,
      role: newMember.role,
      department: newMember.department,
      credentials: "",
      description: "",
      social_linkedin: false,
      linkedin_url: "",
      image: selectedMember.image,
      expanded: false
    }]);

    setIsSubmitting(false);
    closeModal();
    showToast(`${selectedMember.name} added successfully!`, "success");
  };

  const removeMember = (id) => {
    if (confirm(`Remove this member?`)) {
      setTeamMembers(prev => prev.filter(m => m.id !== id));
    }
  };

  const updateMember = (id, key, value) => {
    setTeamMembers(prev => 
      prev.map(m => m.id === id ? { ...m, [key]: value } : m)
    );
  };

  const saveMember = async (id) => {
    setSavingMember(id);
    await new Promise(r => setTimeout(r, 800));
    setSavingMember(null);
    const member = teamMembers.find(m => m.id === id);
    showToast(`${member?.name || 'Member'} saved successfully!`, "success");
  };

  const duplicateMember = (id) => {
    const member = teamMembers.find(m => m.id === id);
    if (!member) return;
    const newId = `member-${Date.now()}`;
    setTeamMembers(prev => [...prev, {
      ...member,
      id: newId,
      name: `${member.name} (Copy)`,
      expanded: false
    }]);
  };

  const moveMember = (id, direction) => {
    const index = teamMembers.findIndex(m => m.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === teamMembers.length - 1)
    ) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...teamMembers];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setTeamMembers(updated);
  };

  // Photo Upload Component for tab body (left side)
  const TabPhotoUploadField = ({ value, onChange, name }) => {
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

    const removePhoto = () => {
      if (value && value.startsWith('blob:')) {
        URL.revokeObjectURL(value);
      }
      onChange?.(null);
    };

    return (
      <div className="wc-photo-upload-wrapper">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
          onChange={handleFileSelect}
        />
        {value ? (
          <div className="wc-photo-preview">
            <img src={value} alt={name || "Team member"} />
            <div className="wc-photo-overlay">
              <button 
                className="wc-photo-action-btn"
                onClick={(e) => { e.stopPropagation(); triggerUpload(); }}
                title="Replace photo"
              >
                <Upload size={14} />
              </button>
              <button 
                className="wc-photo-action-btn wc-photo-remove"
                onClick={(e) => { e.stopPropagation(); removePhoto(); }}
                title="Remove photo"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        ) : (
          <div className="wc-photo-upload" onClick={(e) => { e.stopPropagation(); triggerUpload(); }}>
            <div className="wc-photo-upload-icon">
              <UserPlus size={24} />
            </div>
            <p>Upload Photo</p>
            <span>Click to browse</span>
          </div>
        )}
      </div>
    );
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
              <input 
                className="wc-input" 
                value={sectionData.section_title} 
                onChange={e => updateSectionData("section_title", e.target.value)} 
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Subtitle</label>
              <input 
                className="wc-input" 
                value={sectionData.section_subtitle} 
                onChange={e => updateSectionData("section_subtitle", e.target.value)} 
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Description</label>
              <textarea 
                className="wc-textarea" 
                value={sectionData.description} 
                onChange={e => updateSectionData("description", e.target.value)} 
                rows={2} 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <div className="wc-editor-card-title">
            <Users size={15} /> Our Leadership ({teamMembers.length})
          </div>
          <button className="wc-btn wc-btn-primary" onClick={openModal}>
            <Plus size={14} /> Add Team Member
          </button>
        </div>
        <div className="wc-editor-card-body">
          {/* Search and Filter */}
          <div className="wc-team-filters">
            <div className="wc-search-wrapper">
              <Search size={16} className="wc-search-icon" />
              <input
                type="text"
                className="wc-search-input"
                placeholder="Search members by name, role, or department..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="wc-search-clear" onClick={() => setSearchTerm("")}>
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="wc-department-filter">
              <select 
                className="wc-select" 
                value={selectedDepartment} 
                onChange={e => setSelectedDepartment(e.target.value)}
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <span className="wc-search-results">
              {filteredMembers.length} of {teamMembers.length} members
            </span>
          </div>

          {/* Members Tab View */}
          <div className="wc-team-tabs">
            {filteredMembers.map((member, index) => {
              const isExpanded = member.expanded;
              const isSaving = savingMember === member.id;
              
              return (
                <div key={member.id} className="wc-team-tab">
                  {/* Tab Header - #1, Profile Image, Name, Role */}
                  <div 
                    className={`wc-team-tab-header ${isExpanded ? 'expanded' : ''}`}
                    onClick={() => toggleExpand(member.id)}
                  >
                    <div className="wc-team-tab-left">
                      <span className="wc-team-tab-sl">#{index + 1}</span>
                      <div className="wc-team-tab-avatar">
                        {member.image ? (
                          <img src={member.image} alt={member.name} />
                        ) : (
                          <User size={20} />
                        )}
                      </div>
                      <div className="wc-team-tab-info">
                        <span className="wc-team-tab-name">{member.name}</span>
                        <span className="wc-team-tab-role">{member.role}</span>
                      </div>
                    </div>
                    <div className="wc-team-tab-right">
                      <span className="wc-team-tab-dept">
                        {getDepartmentIcon(member.department)}
                        {member.department}
                      </span>
                      <ChevronUp 
                        size={18} 
                        className={`wc-team-tab-chevron ${isExpanded ? 'expanded' : ''}`}
                      />
                    </div>
                  </div>

                  {/* Tab Content (Expanded) - With Profile Image on Left */}
                  {isExpanded && (
                    <div className="wc-team-tab-content">
                      <div className="wc-team-tab-details">
                        {/* Photo Section - Left Side */}
                        <div className="wc-team-tab-photo-section">
                          <TabPhotoUploadField 
                            value={member.image}
                            onChange={(val) => updateMember(member.id, "image", val)}
                            name={member.name || "Team Member"}
                          />
                        </div>
                        
                        {/* Info Section - Right Side */}
                        <div className="wc-team-tab-info-section">
                          <div className="wc-team-tab-fields">
                            {/* Full Name */}
                            <div className="wc-field span-2">
                              <label className="wc-field-label">Full Name <span className="required">*</span></label>
                              <input 
                                className="wc-input" 
                                value={member.name} 
                                onChange={e => updateMember(member.id, "name", e.target.value)} 
                                placeholder="Full name"
                              />
                            </div>
                            
                            {/* Role */}
                            <div className="wc-field">
                              <label className="wc-field-label">Role <span className="required">*</span></label>
                              <select 
                                className="wc-select" 
                                value={member.role} 
                                onChange={e => updateMember(member.id, "role", e.target.value)}
                              >
                                <option value="">Select a role...</option>
                                {roles.map(role => (
                                  <option key={role} value={role}>{role}</option>
                                ))}
                              </select>
                            </div>
                            
                            {/* Department */}
                            <div className="wc-field">
                              <label className="wc-field-label">Department <span className="required">*</span></label>
                              <select 
                                className="wc-select" 
                                value={member.department} 
                                onChange={e => updateMember(member.id, "department", e.target.value)}
                              >
                                <option value="">Select a department...</option>
                                {departments.map(dept => (
                                  <option key={dept} value={dept}>{dept}</option>
                                ))}
                              </select>
                            </div>
                            
                            {/* Description */}
                            <div className="wc-field span-2">
                              <label className="wc-field-label">Description</label>
                              <textarea 
                                className="wc-textarea" 
                                value={member.description || ""} 
                                onChange={e => updateMember(member.id, "description", e.target.value)} 
                                placeholder="Member description"
                                rows={2}
                              />
                            </div>
                            
                            {/* LinkedIn URL */}
                            <div className="wc-field span-2">
                              <label className="wc-field-label">LinkedIn URL</label>
                              <input 
                                className="wc-input" 
                                value={member.linkedin_url || ""} 
                                onChange={e => updateMember(member.id, "linkedin_url", e.target.value)} 
                                placeholder="https://linkedin.com/in/username"
                              />
                            </div>
                            
                            {/* LinkedIn Toggle + Save Button Row */}
                            <div className="wc-team-tab-actions span-2">
                              <div className="wc-toggle-row" style={{ paddingTop: 0, paddingBottom: 0, borderBottom: 'none' }}>
                                <div className="wc-toggle-info">
                                  <h4 style={{ fontSize: 12 }}>Show LinkedIn badge on member profile</h4>
                                </div>
                                <label className="wc-switch">
                                  <input 
                                    type="checkbox" 
                                    checked={member.social_linkedin} 
                                    onChange={e => updateMember(member.id, "social_linkedin", e.target.checked)} 
                                  />
                                  <span className="wc-switch-slider" />
                                </label>
                              </div>
                              <button 
                                className="wc-btn wc-btn-success wc-btn-sm"
                                onClick={(e) => { e.stopPropagation(); saveMember(member.id); }}
                                disabled={isSaving}
                              >
                                {isSaving ? (
                                  <><RefreshCw size={14} className="spinning" /> Saving...</>
                                ) : (
                                  <><Save size={14} /> Save</>
                                )}
                              </button>
                            </div>
                            
                            {/* Action Buttons - Move, Copy, Delete */}
                            <div className="wc-team-tab-actions-bottom span-2">
                              <div className="wc-member-actions">
                                <button 
                                  className="wc-btn wc-btn-ghost wc-btn-sm"
                                  onClick={(e) => { e.stopPropagation(); moveMember(member.id, 'up'); }}
                                  disabled={teamMembers.findIndex(m => m.id === member.id) === 0}
                                >
                                  <ArrowUp size={14} />
                                </button>
                                <button 
                                  className="wc-btn wc-btn-ghost wc-btn-sm"
                                  onClick={(e) => { e.stopPropagation(); moveMember(member.id, 'down'); }}
                                  disabled={teamMembers.findIndex(m => m.id === member.id) === teamMembers.length - 1}
                                >
                                  <ArrowDown size={14} />
                                </button>
                                <button 
                                  className="wc-btn wc-btn-ghost wc-btn-sm"
                                  onClick={(e) => { e.stopPropagation(); duplicateMember(member.id); }}
                                >
                                  <Copy size={14} />
                                </button>
                                <button 
                                  className="wc-btn wc-btn-danger wc-btn-sm"
                                  onClick={(e) => { e.stopPropagation(); removeMember(member.id); }}
                                >
                                  <Trash size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredMembers.length === 0 && (
            <div className="wc-team-empty-state">
              <AlertCircle size={48} />
              <h3>No members found</h3>
              <p>Try adjusting your search filters or add a new team member</p>
              <button className="wc-btn wc-btn-primary" onClick={openModal}>
                <Plus size={14} /> Add Team Member
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Member Modal */}
      {showModal && (
        <div className="wc-modal-overlay" onClick={closeModal}>
          <div className="wc-modal wc-modal-add-member" onClick={(e) => e.stopPropagation()}>
            <div className="wc-modal-header">
              <h3>Add New Team Member</h3>
              <button className="wc-modal-close" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>
            <div className="wc-modal-body">
              <div className="wc-modal-add-grid">
                {/* Role Dropdown */}
                <div className="wc-field">
                  <label className="wc-field-label">
                    Role <span className="required">*</span>
                  </label>
                  <select
                    className="wc-select"
                    value={newMember.role}
                    onChange={e => handleNewMemberChange("role", e.target.value)}
                  >
                    <option value="">Select a role...</option>
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                {/* Department Dropdown */}
                <div className="wc-field">
                  <label className="wc-field-label">
                    Department <span className="required">*</span>
                  </label>
                  <select
                    className="wc-select"
                    value={newMember.department}
                    onChange={e => handleNewMemberChange("department", e.target.value)}
                  >
                    <option value="">Select a department...</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                {/* Member Name Dropdown with Image */}
                <div className="wc-field">
                  <label className="wc-field-label">
                    Member Name <span className="required">*</span>
                  </label>
                  <select
                    className="wc-select"
                    value={newMember.memberIndex !== null ? newMember.memberIndex : ""}
                    onChange={e => handleNewMemberChange("memberIndex", parseInt(e.target.value))}
                  >
                    <option value="">Select a member...</option>
                    {memberOptions.map((member, index) => (
                      <option key={index} value={index}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                  {newMember.memberIndex !== null && memberOptions[newMember.memberIndex] && (
                    <div style={{ 
                      marginTop: '8px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      padding: '8px',
                      background: '#f8fafc',
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <img 
                        src={memberOptions[newMember.memberIndex].image} 
                        alt={memberOptions[newMember.memberIndex].name}
                        style={{ 
                          width: '32px', 
                          height: '32px', 
                          borderRadius: '50%', 
                          objectFit: 'cover'
                        }}
                      />
                      <span style={{ fontSize: '13px', fontWeight: '500' }}>
                        {memberOptions[newMember.memberIndex].name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="wc-modal-footer">
              <button className="wc-btn wc-btn-ghost" onClick={closeModal}>
                Cancel
              </button>
              <button
                className="wc-btn wc-btn-primary"
                onClick={handleAddMember}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <><RefreshCw size={14} className="spinning" /> Adding...</>
                ) : (
                  <><Plus size={14} /> Add Member</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ──────────────────────────────────────────────
// Managing Director Editor
// ──────────────────────────────────────────────
const ManagingDirectorEditor = () => {
  const [data, setData] = useState({
    section_label: "MESSAGE FROM OUR MD",
    heading: "A Word From Our",
    heading_highlight: "Managing Director",
    md_name: "Dr. Homayon Kabir",
    md_role: "MANAGING DIRECTOR",
    md_specialty: "MBBS, FCPS (Medicine)",
    md_badge: "15+ Years Leading | 50K+ Lives Touched | 98% Patient Satisfaction",
    md_image: "/images/team/md.jpg",
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

// ──────────────────────────────────────────────
// SEO Editor
// ──────────────────────────────────────────────
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
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// Helper Components
// ──────────────────────────────────────────────
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