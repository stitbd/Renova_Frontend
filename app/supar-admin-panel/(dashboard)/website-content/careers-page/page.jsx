// app/supar-admin-panel/website-content/careers-page/page.jsx
"use client";

import { useState, useRef } from "react";
import {
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
  Briefcase,
  Users,
  Heart,
  Award,
  Star,
  Eye,
  FileText,
  MapPin,
  Calendar,
  DollarSign,
  Shield,
  TrendingUp,
  Clock as ClockIcon,
  Mail,
  Phone,
  MessageCircle,
  Edit,
  Copy,
  ChevronRight,
  Building,
  GraduationCap,
  UserPlus,
  Filter,
  Globe,
  Link as LinkIcon,
  ExternalLink
} from "lucide-react";
import "./careers.css";
import "../website-content.css";

const CareersPage = () => {
  const [selectedSection, setSelectedSection] = useState("careers-hero");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const sections = [
    { id: "careers-hero", label: "Hero Section", icon: Layout },
    { id: "careers-benefits", label: "Benefits & Perks", icon: Award },
    { id: "careers-positions", label: "Open Positions", icon: Briefcase },
    { id: "careers-process", label: "Hiring Process", icon: UserPlus },
    { id: "seo", label: "SEO & Meta", icon: Search }
  ];

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 900));
    setSaving(false);
    showToast("Careers changes saved successfully!", "success");
  };

  const showToast = (msg, type = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "success" }), 3000);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "careers-hero":
        return <CareersHeroEditor />;
      case "careers-benefits":
        return <CareersBenefitsEditor />;
      case "careers-positions":
        return <CareersPositionsEditor />;
      case "careers-process":
        return <CareersProcessEditor />;
      case "seo":
        return <CareersSeoEditor />;
      default:
        return <CareersHeroEditor />;
    }
  };

  return (
    <div className="wc-careers-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">Careers</span>
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
                  <Briefcase size={20} />
                </div>
                <div className="wc-page-info-text">
                  <h2>Careers Page</h2>
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
// Careers Hero Section Editor
// ──────────────────────────────────────────────
const CareersHeroEditor = () => {
  const [data, setData] = useState({
    title: "Build Your Career With Us",
    description: "At Renova Life Care Ltd., we're always looking for compassionate, skilled professionals who want to make a real difference in healthcare.",
    button_text: "View Open Positions",
    button_url: "#positions",
    background_image: "/images/careers-hero.jpg"
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div className="wc-careers-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Layout size={15} /> Hero Section</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Title <span className="required">*</span></label>
              <input 
                className="wc-input" 
                value={data.title} 
                onChange={e => set("title", e.target.value)} 
                placeholder="Build Your Career With Us"
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Description</label>
              <textarea 
                className="wc-textarea" 
                value={data.description} 
                onChange={e => set("description", e.target.value)} 
                rows={3}
                placeholder="Company description for careers page"
              />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Button Text</label>
              <input 
                className="wc-input" 
                value={data.button_text} 
                onChange={e => set("button_text", e.target.value)} 
                placeholder="View Open Positions"
              />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Button URL</label>
              <input 
                className="wc-input" 
                value={data.button_url} 
                onChange={e => set("button_url", e.target.value)} 
                placeholder="#positions"
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Background Image</label>
              <ImageUploadField 
                value={data.background_image} 
                onChange={(val) => set("background_image", val)} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// Careers Benefits Editor
// ──────────────────────────────────────────────
const CareersBenefitsEditor = () => {
  const [data, setData] = useState({
    title: "Benefits & Perks",
    subtitle: "We invest in our people because they're the heart of everything we do.",
    benefits: [
      { 
        id: 1,
        title: "Competitive Salary", 
        description: "Market-leading compensation with annual performance reviews.",
        icon: "DollarSign"
      },
      { 
        id: 2,
        title: "Health Coverage", 
        description: "Full medical insurance for you and your immediate family.",
        icon: "Shield"
      },
      { 
        id: 3,
        title: "Learning & Training", 
        description: "Sponsored certifications, workshops, and conference access.",
        icon: "GraduationCap"
      },
      { 
        id: 4,
        title: "Flexible Scheduling", 
        description: "Shift flexibility for clinical and non-clinical roles.",
        icon: "ClockIcon"
      },
      { 
        id: 5,
        title: "Career Growth", 
        description: "Clear promotion pathways and internal mobility across departments.",
        icon: "TrendingUp"
      },
      { 
        id: 6,
        title: "Inclusive Culture", 
        description: "A collaborative, respectful workplace that values every voice.",
        icon: "Users"
      }
    ]
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  const updateBenefit = (index, key, value) => {
    const updated = [...data.benefits];
    updated[index] = { ...updated[index], [key]: value };
    set("benefits", updated);
  };

  const addBenefit = () => {
    setData({
      ...data,
      benefits: [...data.benefits, { 
        id: Date.now(),
        title: "", 
        description: "",
        icon: "Star"
      }]
    });
  };

  const removeBenefit = (index) => {
    const updated = [...data.benefits];
    updated.splice(index, 1);
    set("benefits", updated);
  };

  const iconOptions = [
    "DollarSign", "Shield", "GraduationCap", "ClockIcon", 
    "TrendingUp", "Users", "Star", "Heart", "Award", 
    "Globe", "MessageCircle", "Building"
  ];

  return (
    <div className="wc-careers-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Award size={15} /> Benefits & Perks</h3>
          <div className="wc-editor-card-actions">
            <span className="wc-editor-card-desc">{data.benefits.length} benefits</span>
            <button className="wc-btn wc-btn-primary wc-btn-sm" onClick={addBenefit}>
              <Plus size={14} /> Add Benefit
            </button>
          </div>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid span-2">
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Title</label>
              <input 
                className="wc-input" 
                value={data.title} 
                onChange={e => set("title", e.target.value)} 
                placeholder="Benefits & Perks"
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Subtitle</label>
              <input 
                className="wc-input" 
                value={data.subtitle} 
                onChange={e => set("subtitle", e.target.value)} 
                placeholder="We invest in our people because they're the heart of everything we do."
              />
            </div>
          </div>

          <div className="wc-benefits-grid">
            {data.benefits.map((benefit, index) => (
              <div key={benefit.id} className="wc-benefit-card">
                <div className="wc-benefit-header">
                  <span className="wc-benefit-number">#{index + 1}</span>
                  <button 
                    className="wc-icon-btn wc-icon-btn-danger" 
                    onClick={() => removeBenefit(index)}
                    title="Remove benefit"
                  >
                    <Trash size={14} />
                  </button>
                </div>
                <div className="wc-benefit-body">
                  <div className="wc-field">
                    <label className="wc-field-label">Title</label>
                    <input 
                      className="wc-input" 
                      value={benefit.title} 
                      onChange={e => updateBenefit(index, "title", e.target.value)} 
                      placeholder="Benefit title"
                    />
                  </div>
                  <div className="wc-field">
                    <label className="wc-field-label">Description</label>
                    <input 
                      className="wc-input" 
                      value={benefit.description} 
                      onChange={e => updateBenefit(index, "description", e.target.value)} 
                      placeholder="Benefit description"
                    />
                  </div>
                  <div className="wc-field">
                    <label className="wc-field-label">Icon</label>
                    <select 
                      className="wc-select" 
                      value={benefit.icon} 
                      onChange={e => updateBenefit(index, "icon", e.target.value)}
                    >
                      {iconOptions.map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
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
// Careers Positions Editor with Accordion
// ──────────────────────────────────────────────
const CareersPositionsEditor = () => {
  const [positions, setPositions] = useState([
    {
      id: 1,
      title: "Consultant Cardiologist",
      department: "Medical",
      location: "Dhaka",
      type: "Full-time",
      posted: "3 days ago",
      description: "Seeking an experienced cardiologist to lead our cardiac care unit.",
      requirements: [
        "MD in Cardiology",
        "5+ years of experience",
        "Board certified"
      ]
    },
    {
      id: 2,
      title: "Senior Staff Nurse",
      department: "Nursing",
      location: "Dhaka",
      type: "Full-time",
      posted: "5 days ago",
      description: "Looking for a dedicated senior nurse to join our patient care team.",
      requirements: [
        "BSc in Nursing",
        "3+ years of clinical experience",
        "Valid nursing license"
      ]
    },
    {
      id: 3,
      title: "Lab Technologist",
      department: "Diagnostics",
      location: "Dhaka",
      type: "Full-time",
      posted: "1 week ago",
      description: "Join our diagnostic team as a skilled lab technologist.",
      requirements: [
        "BSc in Medical Technology",
        "2+ years of lab experience",
        "Proficient in lab equipment"
      ]
    },
    {
      id: 4,
      title: "Front Desk Coordinator",
      department: "Operations",
      location: "Dhaka",
      type: "Full-time",
      posted: "1 week ago",
      description: "Manage front desk operations and patient scheduling.",
      requirements: [
        "Bachelor's degree",
        "Excellent communication skills",
        "Experience in healthcare admin"
      ]
    },
    {
      id: 5,
      title: "Radiologic Technician",
      department: "Diagnostics",
      location: "Chattogram",
      type: "Full-time",
      posted: "2 weeks ago",
      description: "Perform diagnostic imaging procedures with precision and care.",
      requirements: [
        "Diploma in Radiologic Technology",
        "2+ years of experience",
        "Knowledge of imaging equipment"
      ]
    },
    {
      id: 6,
      title: "HR Executive",
      department: "Human Resources",
      location: "Dhaka",
      type: "Full-time",
      posted: "2 weeks ago",
      description: "Manage recruitment, onboarding, and employee relations.",
      requirements: [
        "MBA in HR",
        "3+ years of HR experience",
        "Strong interpersonal skills"
      ]
    },
    {
      id: 7,
      title: "Telemedicine Support Officer",
      department: "IT & Telehealth",
      location: "Remote",
      type: "Full-time",
      posted: "3 weeks ago",
      description: "Support our telemedicine platform and assist patients remotely.",
      requirements: [
        "Bachelor's in IT or related field",
        "Experience with telehealth systems",
        "Excellent problem-solving skills"
      ]
    },
    {
      id: 8,
      title: "Pharmacist",
      department: "Pharmacy",
      location: "Dhaka",
      type: "Full-time",
      posted: "3 weeks ago",
      description: "Dispense medications and provide pharmaceutical care.",
      requirements: [
        "BPharm or PharmD",
        "Valid pharmacy license",
        "2+ years of experience"
      ]
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPosition, setEditingPosition] = useState(null);
  const [expandedPosition, setExpandedPosition] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const [formData, setFormData] = useState({
    title: "",
    department: "Medical",
    location: "",
    type: "Full-time",
    posted: "",
    description: "",
    requirements: []
  });

  const [requirementInput, setRequirementInput] = useState("");

  const departments = ["all", "Medical", "Nursing", "Diagnostics", "Operations", "Human Resources", "IT & Telehealth", "Pharmacy"];

  const openModal = (position = null) => {
    if (position) {
      setEditingPosition(position);
      setFormData({
        title: position.title,
        department: position.department,
        location: position.location,
        type: position.type,
        posted: position.posted,
        description: position.description || "",
        requirements: position.requirements || []
      });
    } else {
      setEditingPosition(null);
      setFormData({
        title: "",
        department: "Medical",
        location: "",
        type: "Full-time",
        posted: "",
        description: "",
        requirements: []
      });
    }
    setRequirementInput("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPosition(null);
    setFormData({
      title: "",
      department: "Medical",
      location: "",
      type: "Full-time",
      posted: "",
      description: "",
      requirements: []
    });
    setRequirementInput("");
  };

  const handleFormChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const addRequirement = () => {
    if (requirementInput.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...prev.requirements, requirementInput.trim()]
      }));
      setRequirementInput("");
    }
  };

  const removeRequirement = (index) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      alert("Please enter a position title");
      return;
    }

    if (editingPosition) {
      const updated = positions.map(pos => 
        pos.id === editingPosition.id 
          ? { ...pos, ...formData }
          : pos
      );
      setPositions(updated);
    } else {
      const newPosition = {
        id: Date.now(),
        ...formData
      };
      setPositions([...positions, newPosition]);
    }
    closeModal();
  };

  const removePosition = (id) => {
    const updated = positions.filter(pos => pos.id !== id);
    setPositions(updated);
    if (expandedPosition === id) setExpandedPosition(null);
  };

  const duplicatePosition = (id) => {
    const position = positions.find(p => p.id === id);
    if (position) {
      const newPosition = {
        ...position,
        id: Date.now(),
        title: `${position.title} (Copy)`
      };
      setPositions([...positions, newPosition]);
    }
  };

  const toggleExpand = (id) => {
    setExpandedPosition(expandedPosition === id ? null : id);
  };

  const getDepartmentIcon = (department) => {
    const icons = {
      "Medical": "Heart",
      "Nursing": "Users",
      "Diagnostics": "Search",
      "Operations": "Building",
      "Human Resources": "UserPlus",
      "IT & Telehealth": "Globe",
      "Pharmacy": "Shield"
    };
    return icons[department] || "Briefcase";
  };

  const filteredPositions = positions.filter(pos => {
    const matchesSearch = pos.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pos.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pos.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || pos.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="wc-careers-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Briefcase size={15} /> Open Positions</h3>
          <div className="wc-editor-card-actions">
            <span className="wc-editor-card-desc">{positions.length} positions</span>
            <button className="wc-btn wc-btn-primary wc-btn-sm" onClick={() => openModal()}>
              <Plus size={14} /> Add Position
            </button>
          </div>
        </div>
        <div className="wc-editor-card-body">
          {/* Filters */}
          <div className="wc-positions-filters">
            <div className="wc-positions-departments">
              {departments.map(dept => (
                <button
                  key={dept}
                  className={`wc-filter-btn ${selectedDepartment === dept ? "active" : ""}`}
                  onClick={() => setSelectedDepartment(dept)}
                >
                  {dept === "all" ? "All" : dept}
                </button>
              ))}
            </div>
            <div className="wc-search">
              <Search size={14} className="wc-search-icon" />
              <input 
                type="text" 
                placeholder="Search positions..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Positions List */}
          <div className="wc-positions-list">
            {filteredPositions.length === 0 ? (
              <div className="wc-empty-state">
                <div className="wc-empty-state-icon"><Briefcase size={30} /></div>
                <h3>No positions found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              filteredPositions.map(pos => {
                const isExpanded = expandedPosition === pos.id;
                const IconComponent = getDepartmentIcon(pos.department);

                return (
                  <div key={pos.id} className={`wc-position-accordion ${isExpanded ? "expanded" : ""}`}>
                    <div className="wc-position-accordion-header" onClick={() => toggleExpand(pos.id)}>
                      <div className="wc-position-accordion-left">
                        <div className="wc-position-icon">
                          {IconComponent === "Heart" && <Heart size={18} />}
                          {IconComponent === "Users" && <Users size={18} />}
                          {IconComponent === "Search" && <Search size={18} />}
                          {IconComponent === "Building" && <Building size={18} />}
                          {IconComponent === "UserPlus" && <UserPlus size={18} />}
                          {IconComponent === "Globe" && <Globe size={18} />}
                          {IconComponent === "Shield" && <Shield size={18} />}
                          {!["Heart","Users","Search","Building","UserPlus","Globe","Shield"].includes(IconComponent) && <Briefcase size={18} />}
                        </div>
                        <div className="wc-position-info">
                          <div className="wc-position-title">{pos.title}</div>
                          <div className="wc-position-meta">
                            <span className="wc-position-department">{pos.department}</span>
                            <span className="wc-position-location">
                              <MapPin size={12} />
                              {pos.location}
                            </span>
                            <span className="wc-position-type">{pos.type}</span>
                            <span className="wc-position-posted">
                              <ClockIcon size={12} />
                              {pos.posted}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="wc-position-accordion-right">
                        <div className="wc-position-actions">
                          <button 
                            className="wc-icon-btn" 
                            onClick={(e) => { e.stopPropagation(); duplicatePosition(pos.id); }}
                            title="Duplicate"
                          >
                            <Copy size={14} />
                          </button>
                          <button 
                            className="wc-icon-btn" 
                            onClick={(e) => { e.stopPropagation(); openModal(pos); }}
                            title="Edit"
                          >
                            <Edit size={14} />
                          </button>
                          <button 
                            className="wc-icon-btn wc-icon-btn-danger" 
                            onClick={(e) => { e.stopPropagation(); removePosition(pos.id); }}
                            title="Delete"
                          >
                            <Trash size={14} />
                          </button>
                        </div>
                        <ChevronRight 
                          size={18} 
                          className={`wc-accordion-chevron ${isExpanded ? "rotated" : ""}`}
                        />
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="wc-position-accordion-body">
                        <div className="wc-position-detail">
                          <div className="wc-position-description">
                            <h4>Job Description</h4>
                            <p>{pos.description || "No description provided."}</p>
                          </div>
                          {pos.requirements && pos.requirements.length > 0 && (
                            <div className="wc-position-requirements">
                              <h4>Requirements</h4>
                              <ul>
                                {pos.requirements.map((req, idx) => (
                                  <li key={idx}>{req}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="wc-modal-overlay" onClick={closeModal}>
          <div className="wc-modal wc-modal-lg" onClick={e => e.stopPropagation()}>
            <div className="wc-modal-header">
              <h3 className="wc-modal-title">
                {editingPosition ? "Edit Position" : "Create New Position"}
              </h3>
              <button className="wc-modal-close" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>
            <div className="wc-modal-body">
              <div className="wc-field">
                <label className="wc-field-label">
                  Position Title <span className="required">*</span>
                </label>
                <input 
                  className="wc-input" 
                  value={formData.title} 
                  onChange={e => handleFormChange("title", e.target.value)} 
                  placeholder="e.g., Consultant Cardiologist"
                  autoFocus
                />
              </div>
              <div className="wc-field-grid-2">
                <div className="wc-field">
                  <label className="wc-field-label">Department</label>
                  <select 
                    className="wc-select" 
                    value={formData.department} 
                    onChange={e => handleFormChange("department", e.target.value)}
                  >
                    <option value="Medical">Medical</option>
                    <option value="Nursing">Nursing</option>
                    <option value="Diagnostics">Diagnostics</option>
                    <option value="Operations">Operations</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="IT & Telehealth">IT & Telehealth</option>
                    <option value="Pharmacy">Pharmacy</option>
                  </select>
                </div>
                <div className="wc-field">
                  <label className="wc-field-label">Location</label>
                  <input 
                    className="wc-input" 
                    value={formData.location} 
                    onChange={e => handleFormChange("location", e.target.value)} 
                    placeholder="e.g., Dhaka"
                  />
                </div>
              </div>
              <div className="wc-field-grid-2">
                <div className="wc-field">
                  <label className="wc-field-label">Employment Type</label>
                  <select 
                    className="wc-select" 
                    value={formData.type} 
                    onChange={e => handleFormChange("type", e.target.value)}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div className="wc-field">
                  <label className="wc-field-label">Posted Date</label>
                  <input 
                    className="wc-input" 
                    value={formData.posted} 
                    onChange={e => handleFormChange("posted", e.target.value)} 
                    placeholder="e.g., 3 days ago"
                  />
                </div>
              </div>
              <div className="wc-field">
                <label className="wc-field-label">Job Description</label>
                <textarea 
                  className="wc-textarea" 
                  value={formData.description} 
                  onChange={e => handleFormChange("description", e.target.value)} 
                  rows={3}
                  placeholder="Brief description of the position"
                />
              </div>
              <div className="wc-field">
                <label className="wc-field-label">Requirements</label>
                <div className="wc-requirements-input">
                  <input 
                    className="wc-input" 
                    value={requirementInput} 
                    onChange={e => setRequirementInput(e.target.value)} 
                    placeholder="Add a requirement"
                    onKeyPress={e => e.key === "Enter" && addRequirement()}
                  />
                  <button className="wc-btn wc-btn-primary wc-btn-sm" onClick={addRequirement}>
                    <Plus size={14} /> Add
                  </button>
                </div>
                {formData.requirements.length > 0 && (
                  <div className="wc-requirements-list">
                    {formData.requirements.map((req, index) => (
                      <span key={index} className="wc-requirement-tag">
                        {req}
                        <button 
                          className="wc-requirement-remove" 
                          onClick={() => removeRequirement(index)}
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="wc-modal-footer">
              <button className="wc-btn wc-btn-ghost" onClick={closeModal}>
                Cancel
              </button>
              <button className="wc-btn wc-btn-primary" onClick={handleSubmit}>
                {editingPosition ? "Update Position" : "Create Position"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ──────────────────────────────────────────────
// Careers Process Editor
// ──────────────────────────────────────────────
const CareersProcessEditor = () => {
  const [data, setData] = useState({
    title: "Our Hiring Process",
    description: "A transparent, four-step journey from application to your first day.",
    steps: [
      {
        id: 1,
        title: "Apply Online",
        description: "Submit your CV and cover letter through our careers portal.",
        icon: "FileText"
      },
      {
        id: 2,
        title: "Initial Screening",
        description: "Our HR team reviews your application and schedules a call.",
        icon: "Users"
      },
      {
        id: 3,
        title: "Interview & Assessment",
        description: "Meet the hiring team and showcase your skills.",
        icon: "MessageCircle"
      },
      {
        id: 4,
        title: "Offer & Onboarding",
        description: "Receive your offer and join our welcoming onboarding program.",
        icon: "UserPlus"
      }
    ]
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  const updateStep = (index, key, value) => {
    const updated = [...data.steps];
    updated[index] = { ...updated[index], [key]: value };
    set("steps", updated);
  };

  return (
    <div className="wc-careers-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><UserPlus size={15} /> Hiring Process</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid span-2">
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Title</label>
              <input 
                className="wc-input" 
                value={data.title} 
                onChange={e => set("title", e.target.value)} 
                placeholder="Our Hiring Process"
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Description</label>
              <input 
                className="wc-input" 
                value={data.description} 
                onChange={e => set("description", e.target.value)} 
                placeholder="A transparent, four-step journey from application to your first day."
              />
            </div>
          </div>

          <div className="wc-process-steps">
            {data.steps.map((step, index) => (
              <div key={step.id} className="wc-process-step">
                <div className="wc-process-step-number">{index + 1}</div>
                <div className="wc-process-step-body">
                  <div className="wc-field">
                    <label className="wc-field-label">Step Title</label>
                    <input 
                      className="wc-input" 
                      value={step.title} 
                      onChange={e => updateStep(index, "title", e.target.value)} 
                      placeholder="Step title"
                    />
                  </div>
                  <div className="wc-field">
                    <label className="wc-field-label">Step Description</label>
                    <textarea 
                      className="wc-textarea" 
                      value={step.description} 
                      onChange={e => updateStep(index, "description", e.target.value)} 
                      rows={2}
                      placeholder="Step description"
                    />
                  </div>
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
// SEO Editor
// ──────────────────────────────────────────────
const CareersSeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "Careers — Renova Life Care | Join Our Healthcare Team",
    meta_description: "Explore career opportunities at Renova Life Care. Join our team of dedicated healthcare professionals making a difference in Bangladesh.",
    og_title: "Careers — Renova Life Care",
    og_description: "Build your career with Renova Life Care. We're always looking for compassionate, skilled professionals who want to make a real difference.",
    og_image: "/images/og-careers.jpg",
    canonical_url: "https://renovalifecare.com/careers",
    robots: "index, follow",
    keywords: "careers, healthcare jobs, medical jobs, nursing jobs, Bangladesh healthcare, Renova careers"
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div className="wc-careers-editor">
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
// Image Upload Field Component
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

export default CareersPage;