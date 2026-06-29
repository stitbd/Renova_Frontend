// app/supar-admin-panel/website-content/our-team/page.jsx
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
  Users,
  User,
  Star,
  Eye,
  Lock,
  Globe,
  ArrowUp,
  ArrowDown,
  Copy,
  AlertCircle,
  Minimize2,
  Maximize2,
  Briefcase,
  Award,
  ShieldCheck,
  BadgeCheck,
  Mail,
  Phone,
  MapPin,
  Building2,
  FileText,
  UserPlus,
  UserCheck,
  UserCog,
  UsersRound,
  ChevronUp,
  Edit,
  Settings,
  ListChecks,
  Tags
} from "lucide-react";
import "./our-team.css";

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
const OurTeamPage = () => {
  const [selectedSection, setSelectedSection] = useState("team-content");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const sections = [
    { id: "team-hero", label: "Hero Section", icon: Layout },
    { id: "team-content", label: "Team Content", icon: Users },
    { id: "team-roles", label: "Roles & Departments", icon: Tags },
    { id: "team-features", label: "Features Section", icon: Star },
    { id: "seo", label: "SEO & Meta", icon: Search }
  ];

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1200));
    setSaving(false);
    showToast("Team changes saved successfully!", "success");
  };

  const showToast = (msg, type = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "success" }), 3000);
  };

  const renderContent = useCallback(() => {
    switch (selectedSection) {
      case "team-hero":
        return <TeamHeroEditor />;
      case "team-content":
        return <TeamContentEditor />;
      case "team-roles":
        return <RolesDepartmentsEditor />;
      case "team-features":
        return <TeamFeaturesEditor />;
      case "seo":
        return <TeamSeoEditor />;
      default:
        return <TeamContentEditor />;
    }
  }, [selectedSection]);

  return (
    <div className="wc-team-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span className="wc-breadcrumb-item">Website Content</span>
            <ChevronRight size={14} className="wc-breadcrumb-separator" />
            <span className="wc-breadcrumb-item current">Our Team</span>
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
                  <Users size={20} />
                </div>
                <div className="wc-page-info-text">
                  <h2>Our Team</h2>
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
// Team Hero Section Editor
// ──────────────────────────────────────────────
const TeamHeroEditor = () => {
  const [data, setData] = useState({
    section_title: "Our Leadership Team",
    section_subtitle: "Visionary administrators guiding operational excellence and strategic growth.",
    badge_text: "MANAGEMENT TEAM"
  });

  const set = (k, v) => setData(prev => ({ ...prev, [k]: v }));

  return (
    <div className="wc-team-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title">
            <Layout size={15} /> Hero Section
          </h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Badge Text <span className="required">*</span></label>
              <input 
                className="wc-input" 
                value={data.badge_text} 
                onChange={e => set("badge_text", e.target.value)} 
                placeholder="MANAGEMENT TEAM"
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Title <span className="required">*</span></label>
              <input 
                className="wc-input" 
                value={data.section_title} 
                onChange={e => set("section_title", e.target.value)} 
                placeholder="Our Leadership Team"
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Subtitle</label>
              <textarea 
                className="wc-textarea" 
                value={data.section_subtitle} 
                onChange={e => set("section_subtitle", e.target.value)} 
                rows={2}
                placeholder="Visionary administrators guiding operational excellence and strategic growth."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// Roles & Departments Editor (Separate Tab)
// ──────────────────────────────────────────────
const RolesDepartmentsEditor = () => {
  // Predefined Roles
  const [roles, setRoles] = useState([
    "MANAGING DIRECTOR",
    "CHIEF OPERATIONS OFFICER",
    "CHIEF FINANCIAL OFFICER",
    "HEAD OF NURSING ADMINISTRATION",
    "LAB OPERATIONS MANAGER",
    "FRONT DESK SUPERVISOR",
    "FINANCE MANAGER",
    "DATA & RECORDS OFFICER",
    "QUALITY ASSURANCE MANAGER"
  ]);

  // Predefined Departments
  const [departments, setDepartments] = useState([
    "Executive Office",
    "Finance",
    "Operations",
    "Information Technology",
    "Quality & Compliance"
  ]);

  const [editingRole, setEditingRole] = useState(null);
  const [editRoleValue, setEditRoleValue] = useState("");
  const [newRole, setNewRole] = useState("");

  const [editingDept, setEditingDept] = useState(null);
  const [editDeptValue, setEditDeptValue] = useState("");
  const [newDept, setNewDept] = useState("");

  // Role management functions
  const addRole = useCallback(() => {
    if (newRole.trim() && !roles.includes(newRole.trim())) {
      setRoles(prev => [...prev, newRole.trim()]);
      setNewRole("");
      showToast(`Role "${newRole.trim()}" added successfully!`, "success");
    } else if (newRole.trim() && roles.includes(newRole.trim())) {
      showToast("Role already exists!", "error");
    }
  }, [newRole, roles]);

  const startEditRole = useCallback((role) => {
    setEditingRole(role);
    setEditRoleValue(role);
  }, []);

  const updateRole = useCallback(() => {
    if (editRoleValue.trim() && editingRole && !roles.includes(editRoleValue.trim())) {
      setRoles(prev => prev.map(r => r === editingRole ? editRoleValue.trim() : r));
      setEditingRole(null);
      setEditRoleValue("");
      showToast(`Role updated successfully!`, "success");
    } else if (editRoleValue.trim() && roles.includes(editRoleValue.trim())) {
      showToast("Role already exists!", "error");
    }
  }, [editRoleValue, editingRole, roles]);

  const cancelEditRole = useCallback(() => {
    setEditingRole(null);
    setEditRoleValue("");
  }, []);

  const deleteRole = useCallback((role) => {
    if (confirm(`Delete role "${role}"? This will remove the role from all team members.`)) {
      setRoles(prev => prev.filter(r => r !== role));
      showToast(`Role "${role}" deleted successfully!`, "success");
    }
  }, []);

  // Department management functions
  const addDepartment = useCallback(() => {
    if (newDept.trim() && !departments.includes(newDept.trim())) {
      setDepartments(prev => [...prev, newDept.trim()]);
      setNewDept("");
      showToast(`Department "${newDept.trim()}" added successfully!`, "success");
    } else if (newDept.trim() && departments.includes(newDept.trim())) {
      showToast("Department already exists!", "error");
    }
  }, [newDept, departments]);

  const startEditDept = useCallback((dept) => {
    setEditingDept(dept);
    setEditDeptValue(dept);
  }, []);

  const updateDepartment = useCallback(() => {
    if (editDeptValue.trim() && editingDept && !departments.includes(editDeptValue.trim())) {
      setDepartments(prev => prev.map(d => d === editingDept ? editDeptValue.trim() : d));
      setEditingDept(null);
      setEditDeptValue("");
      showToast(`Department updated successfully!`, "success");
    } else if (editDeptValue.trim() && departments.includes(editDeptValue.trim())) {
      showToast("Department already exists!", "error");
    }
  }, [editDeptValue, editingDept, departments]);

  const cancelEditDept = useCallback(() => {
    setEditingDept(null);
    setEditDeptValue("");
  }, []);

  const deleteDepartment = useCallback((dept) => {
    if (confirm(`Delete department "${dept}"? This will remove the department from all team members.`)) {
      setDepartments(prev => prev.filter(d => d !== dept));
      showToast(`Department "${dept}" deleted successfully!`, "success");
    }
  }, []);

  return (
    <div className="wc-team-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title">
            <Tags size={15} /> Roles & Departments Management
          </h3>
          <span className="wc-editor-card-desc">Manage all roles and departments</span>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-roles-depts-grid">
            {/* Roles Section */}
            <div className="wc-roles-section">
              <div className="wc-roles-section-header">
                <h4 className="wc-roles-section-title">
                  <UserCog size={16} /> Roles
                  <span className="wc-roles-count">{roles.length}</span>
                </h4>
              </div>
              <div className="wc-roles-list">
                {roles.map((role, index) => (
                  <div key={index} className="wc-role-item">
                    {editingRole === role ? (
                      <div className="wc-role-edit">
                        <input 
                          className="wc-input wc-input-sm" 
                          value={editRoleValue} 
                          onChange={e => setEditRoleValue(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && updateRole()}
                          autoFocus
                        />
                        <button className="wc-btn wc-btn-success wc-btn-sm" onClick={updateRole}>
                          <Check size={14} />
                        </button>
                        <button className="wc-btn wc-btn-ghost wc-btn-sm" onClick={cancelEditRole}>
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="wc-role-item-label">{role}</span>
                        <div className="wc-role-item-actions">
                          <button className="wc-btn wc-btn-ghost wc-btn-sm" onClick={() => startEditRole(role)}>
                            <Edit size={12} />
                          </button>
                          <button className="wc-btn wc-btn-danger wc-btn-sm" onClick={() => deleteRole(role)}>
                            <Trash size={12} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="wc-role-add">
                <input 
                  className="wc-input wc-input-sm" 
                  value={newRole} 
                  onChange={e => setNewRole(e.target.value)}
                  placeholder="Add new role..."
                  onKeyDown={e => e.key === 'Enter' && addRole()}
                />
                <button className="wc-btn wc-btn-primary wc-btn-sm" onClick={addRole}>
                  <Plus size={14} /> Add
                </button>
              </div>
            </div>

            {/* Departments Section */}
            <div className="wc-departments-section">
              <div className="wc-departments-section-header">
                <h4 className="wc-departments-section-title">
                  <Building2 size={16} /> Departments
                  <span className="wc-departments-count">{departments.length}</span>
                </h4>
              </div>
              <div className="wc-departments-list">
                {departments.map((dept, index) => (
                  <div key={index} className="wc-dept-item">
                    {editingDept === dept ? (
                      <div className="wc-dept-edit">
                        <input 
                          className="wc-input wc-input-sm" 
                          value={editDeptValue} 
                          onChange={e => setEditDeptValue(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && updateDepartment()}
                          autoFocus
                        />
                        <button className="wc-btn wc-btn-success wc-btn-sm" onClick={updateDepartment}>
                          <Check size={14} />
                        </button>
                        <button className="wc-btn wc-btn-ghost wc-btn-sm" onClick={cancelEditDept}>
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="wc-dept-item-label">{dept}</span>
                        <div className="wc-dept-item-actions">
                          <button className="wc-btn wc-btn-ghost wc-btn-sm" onClick={() => startEditDept(dept)}>
                            <Edit size={12} />
                          </button>
                          <button className="wc-btn wc-btn-danger wc-btn-sm" onClick={() => deleteDepartment(dept)}>
                            <Trash size={12} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="wc-dept-add">
                <input 
                  className="wc-input wc-input-sm" 
                  value={newDept} 
                  onChange={e => setNewDept(e.target.value)}
                  placeholder="Add new department..."
                  onKeyDown={e => e.key === 'Enter' && addDepartment()}
                />
                <button className="wc-btn wc-btn-primary wc-btn-sm" onClick={addDepartment}>
                  <Plus size={14} /> Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// Team Content Editor
// ──────────────────────────────────────────────
const TeamContentEditor = () => {
  // These will be shared with the Roles & Departments tab via state management
  // For now, we'll keep them here for the dropdowns
  const [roles] = useState([
    "MANAGING DIRECTOR",
    "CHIEF OPERATIONS OFFICER",
    "CHIEF FINANCIAL OFFICER",
    "HEAD OF NURSING ADMINISTRATION",
    "LAB OPERATIONS MANAGER",
    "FRONT DESK SUPERVISOR",
    "FINANCE MANAGER",
    "DATA & RECORDS OFFICER",
    "QUALITY ASSURANCE MANAGER"
  ]);

  const [departments] = useState([
    "Executive Office",
    "Finance",
    "Operations",
    "Information Technology",
    "Quality & Compliance"
  ]);

  const [teamMembers, setTeamMembers] = useState([
    {
      id: "member-1",
      name: "Dr. Homayon Kabir",
      role: "MANAGING DIRECTOR",
      department: "Executive Office",
      description: "Strategic leader with 20+ years in healthcare administration and business development.",
      linkedin: true,
      linkedin_url: "https://linkedin.com/in/homayon-kabir",
      photo: "/images/team/01.jpg",
      order: 1,
      saving: false
    },
    {
      id: "member-2",
      name: "Ms. Kamrun Nahar",
      role: "CHIEF OPERATIONS OFFICER",
      department: "Executive Office",
      description: "Oversees daily operations, process optimization, and service quality across all departments.",
      linkedin: true,
      linkedin_url: "https://linkedin.com/in/kamrun-nahar",
      photo: "/images/team/02.jpg",
      order: 2,
      saving: false
    },
    {
      id: "member-3",
      name: "Mr. Tanvir Ahmed",
      role: "CHIEF FINANCIAL OFFICER",
      department: "Finance",
      description: "Manages financial planning, budgeting, and compliance with healthcare industry standards.",
      linkedin: true,
      linkedin_url: "https://linkedin.com/in/tanvir-ahmed",
      photo: "/images/team/03.jpg",
      order: 3,
      saving: false
    },
    {
      id: "member-4",
      name: "Ms. Farhana Begum",
      role: "HEAD OF NURSING ADMINISTRATION",
      department: "Operations",
      description: "Coordinates nursing staff schedules, training, and patient care protocols.",
      linkedin: true,
      linkedin_url: "https://linkedin.com/in/farhana-begum",
      photo: "/images/team/04.jpg",
      order: 4,
      saving: false
    },
    {
      id: "member-5",
      name: "Mr. Rafiqul Islam",
      role: "LAB OPERATIONS MANAGER",
      department: "Operations",
      description: "Ensures efficient diagnostic workflows, equipment maintenance, and quality control.",
      linkedin: true,
      linkedin_url: "https://linkedin.com/in/rafiqul-islam",
      photo: "/images/team/05.jpg",
      order: 5,
      saving: false
    },
    {
      id: "member-6",
      name: "Ms. Nusrat Jahan",
      role: "FRONT DESK SUPERVISOR",
      department: "Operations",
      description: "Leads patient reception, appointment coordination, and first-point customer service.",
      linkedin: true,
      linkedin_url: "https://linkedin.com/in/nusrat-jahan",
      photo: "/images/team/06.jpg",
      order: 6,
      saving: false
    },
    {
      id: "member-7",
      name: "Mr. Kamal Hossain",
      role: "FINANCE MANAGER",
      department: "Finance",
      description: "Handles accounts payable/receivable, payroll, and financial reporting.",
      linkedin: true,
      linkedin_url: "https://linkedin.com/in/kamal-hossain",
      photo: "/images/team/07.jpg",
      order: 7,
      saving: false
    },
    {
      id: "member-8",
      name: "Ms. Tahmina Akter",
      role: "DATA & RECORDS OFFICER",
      department: "Information Technology",
      description: "Ensures accurate patient data management, privacy compliance, and digital archiving.",
      linkedin: true,
      linkedin_url: "https://linkedin.com/in/tahmina-akter",
      photo: "/images/team/08.jpg",
      order: 8,
      saving: false
    },
    {
      id: "member-9",
      name: "Ms. Shirin Sultana",
      role: "QUALITY ASSURANCE MANAGER",
      department: "Quality & Compliance",
      description: "Leads accreditation processes, internal audits, and continuous improvement initiatives.",
      linkedin: true,
      linkedin_url: "https://linkedin.com/in/shirin-sultana",
      photo: "/images/team/09.jpg",
      order: 9,
      saving: false
    }
  ]);

  const [expandedMembers, setExpandedMembers] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    department: "",
    description: "",
    linkedin: false,
    linkedin_url: "",
    photo: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get unique departments for filter
  const departmentOptions = useMemo(() => {
    return ["all", ...departments];
  }, [departments]);

  const toggleMember = useCallback((id) => {
    setExpandedMembers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  const expandAll = useCallback(() => {
    const allExpanded = teamMembers.reduce((acc, m) => ({ ...acc, [m.id]: true }), {});
    setExpandedMembers(allExpanded);
  }, [teamMembers]);

  const collapseAll = useCallback(() => {
    setExpandedMembers({});
  }, []);

  const updateMember = useCallback((id, key, value) => {
    setTeamMembers(prev => 
      prev.map(m => m.id === id ? { ...m, [key]: value } : m)
    );
  }, []);

  const saveMember = useCallback(async (id) => {
    setTeamMembers(prev => 
      prev.map(m => m.id === id ? { ...m, saving: true } : m)
    );

    await new Promise(r => setTimeout(r, 800));

    setTeamMembers(prev => 
      prev.map(m => m.id === id ? { ...m, saving: false } : m)
    );

    const member = teamMembers.find(m => m.id === id);
    showToast(`${member?.name || 'Member'} saved successfully!`, "success");
  }, [teamMembers]);

  const openModal = useCallback(() => {
    setNewMember({
      name: "",
      role: "",
      department: "",
      description: "",
      linkedin: false,
      linkedin_url: "",
      photo: ""
    });
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setNewMember({
      name: "",
      role: "",
      department: "",
      description: "",
      linkedin: false,
      linkedin_url: "",
      photo: ""
    });
  }, []);

  const handleNewMemberChange = useCallback((key, value) => {
    setNewMember(prev => ({ ...prev, [key]: value }));
  }, []);

  const handlePhotoUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewMember(prev => ({ ...prev, photo: imageUrl }));
    }
  }, []);

  const handleAddMember = useCallback(async () => {
    if (!newMember.name.trim() || !newMember.role || !newMember.department) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    setIsSubmitting(true);

    await new Promise(r => setTimeout(r, 800));

    const newOrder = teamMembers.length + 1;
    const newId = `member-${Date.now()}`;
    
    setTeamMembers(prev => [...prev, {
      id: newId,
      name: newMember.name.trim(),
      role: newMember.role,
      department: newMember.department,
      description: newMember.description.trim(),
      linkedin: newMember.linkedin,
      linkedin_url: newMember.linkedin_url.trim(),
      photo: newMember.photo || "",
      order: newOrder,
      saving: false
    }]);

    setIsSubmitting(false);
    closeModal();
    showToast(`${newMember.name} added successfully!`, "success");
  }, [newMember, teamMembers, closeModal]);

  const removeMember = useCallback((id) => {
    setTeamMembers(prev => {
      const updated = prev.filter(m => m.id !== id);
      return updated.map((m, index) => ({ ...m, order: index + 1 }));
    });
    setExpandedMembers(prev => {
      const newExpanded = { ...prev };
      delete newExpanded[id];
      return newExpanded;
    });
  }, []);

  const moveMember = useCallback((id, direction) => {
    setTeamMembers(prev => {
      const index = prev.findIndex(m => m.id === id);
      if (
        (direction === 'up' && index === 0) || 
        (direction === 'down' && index === prev.length - 1)
      ) return prev;

      const newIndex = direction === 'up' ? index - 1 : index + 1;
      const updated = [...prev];
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      return updated.map((m, idx) => ({ ...m, order: idx + 1 }));
    });
  }, []);

  const duplicateMember = useCallback((id) => {
    const member = teamMembers.find(m => m.id === id);
    if (!member) return;

    const newId = `member-${Date.now()}`;
    const newOrder = teamMembers.length + 1;
    setTeamMembers(prev => [...prev, {
      ...member,
      id: newId,
      order: newOrder,
      name: `${member.name} (Copy)`,
      saving: false
    }]);
    setExpandedMembers(prev => ({ ...prev, [newId]: true }));
  }, [teamMembers]);

  const filteredMembers = useMemo(() => {
    let filtered = [...teamMembers];
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(m => 
        m.name.toLowerCase().includes(term) ||
        m.role.toLowerCase().includes(term) ||
        m.department.toLowerCase().includes(term) ||
        m.description.toLowerCase().includes(term)
      );
    }
    
    if (selectedDepartment !== "all") {
      filtered = filtered.filter(m => m.department === selectedDepartment);
    }
    
    return filtered.sort((a, b) => a.order - b.order);
  }, [teamMembers, searchTerm, selectedDepartment]);

  const groupedMembers = useMemo(() => {
    const groups = {};
    filteredMembers.forEach(member => {
      const dept = member.department || "Other";
      if (!groups[dept]) groups[dept] = [];
      groups[dept].push(member);
    });
    return groups;
  }, [filteredMembers]);

  const getDepartmentIcon = (dept) => {
    const icons = {
      "Executive Office": <Building2 size={16} />,
      "Finance": <Briefcase size={16} />,
      "Operations": <UserCog size={16} />,
      "Information Technology": <Lock size={16} />,
      "Quality & Compliance": <ShieldCheck size={16} />,
      "Other": <UsersRound size={16} />
    };
    return icons[dept] || <UsersRound size={16} />;
  };

  // Photo Upload Component for modal
  const ModalPhotoUpload = ({ value, onChange }) => {
    const fileInputRef = useRef(null);

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
      <div className="wc-modal-photo-wrapper">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
          onChange={onChange}
        />
        {value ? (
          <div className="wc-modal-photo-preview">
            <img src={value} alt="New member" />
            <div className="wc-modal-photo-overlay">
              <button className="wc-modal-photo-btn" onClick={triggerUpload}>
                <Upload size={14} />
              </button>
              <button className="wc-modal-photo-btn wc-modal-photo-remove" onClick={removePhoto}>
                <X size={14} />
              </button>
            </div>
          </div>
        ) : (
          <div className="wc-modal-photo-upload" onClick={triggerUpload}>
            <UserPlus size={32} />
            <p>Upload Photo</p>
            <span>Click to browse</span>
          </div>
        )}
      </div>
    );
  };

  // Photo Upload Component for tab body
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
    <div className="wc-team-editor">
      {/* Add Member Modal */}
      {showModal && (
        <div className="wc-modal-overlay" onClick={closeModal}>
          <div className="wc-modal" onClick={(e) => e.stopPropagation()}>
            <div className="wc-modal-header">
              <h3>Add New Team Member</h3>
              <button className="wc-modal-close" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>
            <div className="wc-modal-body">
              <div className="wc-modal-photo-section">
                <ModalPhotoUpload 
                  value={newMember.photo}
                  onChange={handlePhotoUpload}
                />
              </div>
              <div className="wc-modal-fields">
                <div className="wc-field">
                  <label className="wc-field-label">Full Name <span className="required">*</span></label>
                  <input 
                    className="wc-input" 
                    value={newMember.name} 
                    onChange={e => handleNewMemberChange("name", e.target.value)} 
                    placeholder="Enter full name"
                  />
                </div>
                <div className="wc-field">
                  <label className="wc-field-label">Role <span className="required">*</span></label>
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
                <div className="wc-field">
                  <label className="wc-field-label">Department <span className="required">*</span></label>
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
                <div className="wc-field">
                  <label className="wc-field-label">Description</label>
                  <textarea 
                    className="wc-textarea" 
                    value={newMember.description} 
                    onChange={e => handleNewMemberChange("description", e.target.value)} 
                    placeholder="Enter member description"
                    rows={2}
                  />
                </div>
                <div className="wc-field">
                  <label className="wc-field-label">LinkedIn URL</label>
                  <input 
                    className="wc-input" 
                    value={newMember.linkedin_url} 
                    onChange={e => handleNewMemberChange("linkedin_url", e.target.value)} 
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div className="wc-field">
                  <div className="wc-toggle-row wc-toggle-inline">
                    <div className="wc-toggle-info">
                      <p>Show LinkedIn badge on member profile</p>
                    </div>
                    <label className="wc-switch">
                      <input 
                        type="checkbox" 
                        checked={newMember.linkedin} 
                        onChange={e => handleNewMemberChange("linkedin", e.target.checked)} 
                      />
                      <span className="wc-switch-slider" />
                    </label>
                  </div>
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

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <div className="wc-editor-card-title">
            <Users size={15} /> Team Members
            <span className="wc-editor-card-desc">{teamMembers.length} members</span>
          </div>
          <div className="wc-editor-card-actions">
            <button className="wc-btn wc-btn-ghost wc-btn-sm" onClick={expandAll}>
              <Maximize2 size={14} /> Expand All
            </button>
            <button className="wc-btn wc-btn-ghost wc-btn-sm" onClick={collapseAll}>
              <Minimize2 size={14} /> Collapse All
            </button>
            <button className="wc-btn wc-btn-primary" onClick={openModal}>
              <Plus size={14} /> Add Team Member
            </button>
          </div>
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
                {departmentOptions.map(dept => (
                  <option key={dept} value={dept}>
                    {dept === "all" ? "All Departments" : dept}
                  </option>
                ))}
              </select>
            </div>
            <span className="wc-search-results">
              {filteredMembers.length} of {teamMembers.length} members
            </span>
          </div>

          {/* Members List */}
          <div className="wc-team-members-list">
            {Object.entries(groupedMembers).map(([department, members]) => (
              <div key={department} className="wc-team-department-group">
                <div className="wc-team-department-header">
                  <span className="wc-team-department-icon">
                    {getDepartmentIcon(department)}
                  </span>
                  <h4 className="wc-team-department-title">{department}</h4>
                  <span className="wc-team-department-count">{members.length} members</span>
                </div>
                <div className="wc-team-department-members">
                  {members.map((member) => {
                    const isExpanded = expandedMembers[member.id] || false;
                    const actualIndex = teamMembers.findIndex(m => m.id === member.id);
                    const isFirst = actualIndex === 0;
                    const isLast = actualIndex === teamMembers.length - 1;

                    return (
                      <div key={member.id} className={`wc-team-member-tab ${isExpanded ? 'expanded' : ''}`}>
                        {/* Tab Header */}
                        <div 
                          className="wc-team-member-tab-header"
                          onClick={() => toggleMember(member.id)}
                        >
                          <div className="wc-team-member-tab-left">
                            <div className="wc-team-member-tab-avatar">
                              {member.photo ? (
                                <img src={member.photo} alt={member.name || "Team member"} />
                              ) : (
                                <div className="wc-team-member-tab-avatar-placeholder">
                                  <User size={18} />
                                </div>
                              )}
                            </div>
                            <div className="wc-team-member-tab-info">
                              <span className="wc-team-member-tab-name">
                                {member.name || "Unnamed Member"}
                              </span>
                              <span className="wc-team-member-tab-role">
                                {member.role || "No role specified"}
                              </span>
                              {member.linkedin && member.linkedin_url && (
                                <a 
                                  href={member.linkedin_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="wc-team-member-tab-linkedin"
                                  onClick={(e) => e.stopPropagation()}
                                  title="View LinkedIn Profile"
                                >
                                  <LinkedinIcon size={12} />
                                </a>
                              )}
                            </div>
                          </div>
                          <div className="wc-team-member-tab-right">
                            <span className="wc-team-member-tab-order">#{member.order}</span>
                            <div className="wc-team-member-tab-actions">
                              <button 
                                className="wc-btn wc-btn-ghost wc-btn-sm wc-move-btn"
                                onClick={(e) => { e.stopPropagation(); moveMember(member.id, 'up'); }}
                                disabled={isFirst}
                              >
                                <ArrowUp size={14} />
                              </button>
                              <button 
                                className="wc-btn wc-btn-ghost wc-btn-sm wc-move-btn"
                                onClick={(e) => { e.stopPropagation(); moveMember(member.id, 'down'); }}
                                disabled={isLast}
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
                              <span className="wc-team-member-tab-chevron">
                                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Tab Body */}
                        {isExpanded && (
                          <div className="wc-team-member-tab-body">
                            <div className="wc-team-member-tab-details">
                              <div className="wc-team-member-tab-photo-section">
                                <TabPhotoUploadField 
                                  value={member.photo}
                                  onChange={(val) => updateMember(member.id, "photo", val)}
                                  name={member.name || "Team Member"}
                                />
                              </div>
                              
                              <div className="wc-team-member-tab-info-section">
                                <div className="wc-field-row">
                                  <div className="wc-field">
                                    <label className="wc-field-label">Full Name <span className="required">*</span></label>
                                    <input 
                                      className="wc-input" 
                                      value={member.name} 
                                      onChange={e => updateMember(member.id, "name", e.target.value)} 
                                      placeholder="Full name"
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                  </div>
                                  <div className="wc-field">
                                    <label className="wc-field-label">Role <span className="required">*</span></label>
                                    <select 
                                      className="wc-select" 
                                      value={member.role} 
                                      onChange={e => updateMember(member.id, "role", e.target.value)}
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <option value="">Select a role...</option>
                                      {roles.map(role => (
                                        <option key={role} value={role}>{role}</option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                                <div className="wc-field">
                                  <label className="wc-field-label">Department <span className="required">*</span></label>
                                  <select 
                                    className="wc-select" 
                                    value={member.department} 
                                    onChange={e => updateMember(member.id, "department", e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <option value="">Select a department...</option>
                                    {departments.map(dept => (
                                      <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                  </select>
                                </div>
                                <div className="wc-field">
                                  <label className="wc-field-label">Description</label>
                                  <textarea 
                                    className="wc-textarea" 
                                    value={member.description} 
                                    onChange={e => updateMember(member.id, "description", e.target.value)} 
                                    placeholder="Member description"
                                    rows={2}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>
                                
                                <div className="wc-field">
                                  <label className="wc-field-label">LinkedIn URL</label>
                                  <input 
                                    className="wc-input" 
                                    value={member.linkedin_url || ""} 
                                    onChange={e => updateMember(member.id, "linkedin_url", e.target.value)} 
                                    placeholder="https://linkedin.com/in/username"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>
                                
                                <div className="wc-field">
                                  <div className="wc-linkedin-save-row">
                                    <div className="wc-toggle-row wc-toggle-inline">
                                      <div className="wc-toggle-info">
                                        <p>Show LinkedIn badge on member profile</p>
                                      </div>
                                      <label className="wc-switch" onClick={(e) => e.stopPropagation()}>
                                        <input 
                                          type="checkbox" 
                                          checked={member.linkedin} 
                                          onChange={e => updateMember(member.id, "linkedin", e.target.checked)} 
                                        />
                                        <span className="wc-switch-slider" />
                                      </label>
                                    </div>
                                    <button 
                                      className={`wc-btn wc-btn-success wc-btn-sm wc-save-member-btn ${member.saving ? 'saving' : ''}`}
                                      onClick={(e) => { 
                                        e.stopPropagation(); 
                                        saveMember(member.id); 
                                      }}
                                      disabled={member.saving}
                                    >
                                      {member.saving ? (
                                        <>
                                          <RefreshCw size={14} className="spinning" /> Saving...
                                        </>
                                      ) : (
                                        <>
                                          <Save size={14} /> Save
                                        </>
                                      )}
                                    </button>
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
              </div>
            ))}

            {filteredMembers.length === 0 && (
              <div className="wc-team-empty-state">
                <AlertCircle size={48} className="wc-empty-icon" />
                <h3>No members found</h3>
                <p>Try adjusting your search filters or add a new team member</p>
                <button className="wc-btn wc-btn-primary" onClick={openModal}>
                  <Plus size={14} /> Add Team Member
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
// Team Features Editor
// ──────────────────────────────────────────────
const TeamFeaturesEditor = () => {
  const [features, setFeatures] = useState([
    { 
      id: "feature-1",
      title: "Experienced Leadership", 
      description: "Our team brings decades of combined experience in healthcare administration and clinical excellence.", 
      icon: "Award" 
    },
    { 
      id: "feature-2",
      title: "Patient-First Culture", 
      description: "Every decision is guided by our commitment to patient safety, comfort, and satisfaction.", 
      icon: "Users" 
    },
    { 
      id: "feature-3",
      title: "Innovation Driven", 
      description: "We embrace cutting-edge technology and best practices to deliver superior healthcare outcomes.", 
      icon: "Star" 
    },
    { 
      id: "feature-4",
      title: "Comprehensive Care", 
      description: "From administration to clinical care, every department works together for holistic patient wellness.", 
      icon: "ShieldCheck" 
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
    { value: "Award", label: "Award" },
    { value: "Users", label: "Users" },
    { value: "Star", label: "Star" },
    { value: "ShieldCheck", label: "Shield Check" },
    { value: "BadgeCheck", label: "Badge Check" },
    { value: "Briefcase", label: "Briefcase" },
    { value: "Building2", label: "Building" },
    { value: "UserCheck", label: "User Check" },
    { value: "UserCog", label: "User Cog" },
    { value: "UsersRound", label: "Users Round" }
  ];

  const getIconComponent = (iconName) => {
    switch(iconName) {
      case "Award": return <Award size={20} />;
      case "Users": return <Users size={20} />;
      case "Star": return <Star size={20} />;
      case "ShieldCheck": return <ShieldCheck size={20} />;
      case "BadgeCheck": return <BadgeCheck size={20} />;
      case "Briefcase": return <Briefcase size={20} />;
      case "Building2": return <Building2 size={20} />;
      case "UserCheck": return <UserCheck size={20} />;
      case "UserCog": return <UserCog size={20} />;
      case "UsersRound": return <UsersRound size={20} />;
      default: return <Award size={20} />;
    }
  };

  return (
    <div className="wc-team-editor">
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
          <div className="wc-team-features-grid">
            {features.map((feature, index) => (
              <div key={feature.id} className="wc-team-feature-card">
                <div className="wc-team-feature-header">
                  <div className="wc-team-feature-header-left">
                    <div className="wc-team-feature-icon">
                      {getIconComponent(feature.icon)}
                    </div>
                    <span className="wc-team-feature-number">#{index + 1}</span>
                  </div>
                  <div className="wc-team-feature-header-right">
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
                <div className="wc-team-feature-body">
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
            <div className="wc-team-empty-state">
              <AlertCircle size={48} className="wc-empty-icon" />
              <h3>No features added</h3>
              <p>Add a feature to highlight key team attributes</p>
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
// Team SEO Editor
// ──────────────────────────────────────────────
const TeamSeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "Our Leadership Team — Renova Life Care | Management Team",
    meta_description: "Meet the experienced leadership team at Renova Life Care. Our management team is committed to operational excellence and patient satisfaction.",
    og_title: "Our Leadership Team — Renova Life Care",
    og_description: "Visionary administrators guiding operational excellence and strategic growth.",
    og_image: "/images/og-team.jpg",
    canonical_url: "https://renovalifecare.com/our-team",
    robots: "index, follow",
    keywords: "leadership team, management, healthcare administrators, Renova Life Care, executive team"
  });

  const set = (k, v) => setData(prev => ({ ...prev, [k]: v }));

  return (
    <div className="wc-team-editor">
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

export default OurTeamPage;