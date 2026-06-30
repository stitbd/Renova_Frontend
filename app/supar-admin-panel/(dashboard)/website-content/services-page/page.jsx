"use client";
import { useState, useMemo } from "react";
import {
  Activity, Layout, Grid, Star, Search, Clock, Check, ChevronDown,
  Save, RefreshCw, Eye, Plus, List, Heart, Users, Calendar,
  MessageCircle, Award, ExternalLink, Upload, Trash, X, Package,
  ShoppingBag, FileText, MapPin, Phone, Mail, User, Target,
  ChevronRight, Edit, Copy, AlertCircle, Stethoscope, Microscope,
  Syringe, Pill, Bone, Brain, Activity as ActivityIcon, Droplet,
  Thermometer, Scissors, Eye as EyeIcon, Ear, Baby, HeartPulse,
  HelpCircle, CheckCircle2, UserCheck, ArrowUp, ArrowDown,
  GripVertical, BookOpen, Shield
} from "lucide-react";
import "./services.css";
import "../website-content.css";

// ── Custom Tooth Icon ──────────────────────────────────────────
const ToothIcon = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 5.5c-1.5-2-4-3-6-2s-3 4-2 6c1 2 2 4 2 7s1 4 2 4 2-2 2-4 1-3 2-3 1 1 2 3 1 4 2 4 2-1 2-4 1-5 2-7c1-2 0-5-2-6s-4.5 0-6 2z" />
  </svg>
);

// ── Icon Mapping ──────────────────────────────────────────────
const getServiceIcon = (iconName) => {
  const iconMap = {
    Activity: ActivityIcon, Heart, Stethoscope, Microscope, Syringe, Pill,
    Bone, Brain, Droplet, Thermometer, Scissors, Eye: EyeIcon, Ear,
    Tooth: ToothIcon, Baby, HeartPulse, Users, Calendar, MessageCircle,
    Award, Star, Target, Package, ShoppingBag, FileText, MapPin, Phone,
    Mail, User, Grid, Layout, List, Clock, Check, Plus, X, Trash, Edit, Copy
  };
  return iconMap[iconName] || ActivityIcon;
};

// ── Mock Doctors Data (same structure as DoctorsPage) ──────────
const MOCK_DOCTORS = [
  { id: 1, name: "Dr. Fariha Rahman", specialty: "Cardiologist", credentials: "MBBS, MD (Cardiology), FCPS", experience: "18 Years", rating: 4.9, patients: "3,200++", available: true },
  { id: 2, name: "Dr. Nasreen Akter", specialty: "Cardiologist", credentials: "MBBS, MD (Cardiology), FCPS", experience: "18 Years", rating: 4.9, patients: "3,200++", available: true },
  { id: 3, name: "Dr. Tasnim Farin", specialty: "Neurologist", credentials: "MBBS, MD (Neurology), PhD", experience: "22 Years", rating: 4.8, patients: "2,800++", available: true },
  { id: 4, name: "Dr. Aysha Aktar Tripti", specialty: "Pediatrician", credentials: "MBBS, DCH, FCPS (Pediatrics)", experience: "15 Years", rating: 4.9, patients: "4,100++", available: true },
  { id: 5, name: "Dr. Humayon Kabir", specialty: "Orthopedic Surgeon", credentials: "MBBS, MS (Orthopedics), FRCS", experience: "20 Years", rating: 4.7, patients: "2,500++", available: true },
  { id: 6, name: "Dr. Alifa Aktar", specialty: "Pediatrician", credentials: "MBBS, DCH, FCPS (Pediatrics)", experience: "15 Years", rating: 4.9, patients: "4,100++", available: true },
  { id: 7, name: "Dr. Maria Hoque", specialty: "Radiologist", credentials: "MBBS, MD (Radiology)", experience: "12 Years", rating: 4.8, patients: "1,900++", available: true },
  { id: 8, name: "Dr. Shirin Sultana", specialty: "Oncologist", credentials: "MBBS, MD (Oncology)", experience: "16 Years", rating: 4.9, patients: "2,100++", available: true }
];

// ── Main Component ─────────────────────────────────────────────
const ServicesPage = () => {
  const [selectedSection, setSelectedSection] = useState("services-grid");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });
  const [activeTab, setActiveTab] = useState("all");
  const [expandedService, setExpandedService] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [services, setServices] = useState([
    {
      id: 1, title: "Pathology & Laboratory Testing", category: "Diagnostic", icon: "Microscope",
      description: "Comprehensive laboratory analysis including blood, tissue, and fluid testing for accurate disease diagnosis.",
      features: ["Blood tests", "Tissue biopsy", "Fluid analysis", "Microbiology", "Molecular diagnostics"],
      price: "BDT 500+", duration: "2-4 hours",
      whatToExpect: [
        { title: "Initial Consultation", description: "Meet with our specialist to discuss your symptoms, medical history, and health goals." },
        { title: "Comprehensive Assessment", description: "Undergo thorough evaluation using state-of-the-art diagnostic tools and laboratory testing as needed." },
        { title: "Personalized Treatment Plan", description: "Receive a clear, customized care plan with explained options, expected outcomes, and timeline." },
        { title: "Ongoing Support & Follow-up", description: "Regular check-ins, progress monitoring, and plan adjustments to ensure optimal health outcomes." }
      ],
      whyChoose: [
        "Personalized treatment plans designed for your specific health profile",
        "Board-certified specialists with extensive clinical experience",
        "Advanced diagnostic equipment for precise, accurate assessments",
        "Seamless coordination with other departments for holistic care",
        "Patient education resources to empower your health decisions",
        "Flexible scheduling including evening and weekend appointments"
      ],
      aboutText: "Our Pathology & Laboratory Testing service provides comprehensive care using evidence-based practices and the latest medical technology. Our team of BMDC-certified specialists works collaboratively to ensure you receive personalized, compassionate care tailored to your unique health needs. At Renova Life Care Ltd, we believe in treating the whole person, not just symptoms.",
      specialists: [1, 2],
      faqs: [
        { question: "How do I prepare for my first appointment?", answer: "Please bring your previous medical records, a list of current medications, and arrive 15 minutes early to complete registration forms." },
        { question: "Do you accept my insurance?", answer: "We accept most major insurance providers. Please contact our billing department to verify your specific coverage." },
        { question: "What if I need emergency care?", answer: "Our emergency department is open 24/7. For life-threatening emergencies, please call our hotline or visit the nearest emergency room." },
        { question: "Can I schedule a virtual consultation?", answer: "Yes, we offer telemedicine consultations for follow-up visits and non-emergency concerns. Book through our online portal." },
        { question: "How long will my appointment take?", answer: "Initial consultations typically last 30-45 minutes. Follow-up visits are usually 15-20 minutes." }
      ]
    },
    {
      id: 2, title: "Mammography", category: "Imaging", icon: "Heart",
      description: "Specialized low-dose X-ray imaging for early detection and screening of breast cancer.",
      features: ["Screening mammography", "Diagnostic mammography", "Breast ultrasound", "Breast MRI"],
      price: "BDT 1,500+", duration: "30-45 minutes",
      whatToExpect: [
        { title: "Initial Consultation", description: "Meet with our specialist to discuss your symptoms, medical history, and health goals. We take time to listen and understand your concerns." },
        { title: "Comprehensive Assessment", description: "Undergo thorough evaluation using state-of-the-art diagnostic tools and laboratory testing as needed." },
        { title: "Personalized Treatment Plan", description: "Receive a clear, customized care plan with explained options, expected outcomes, and timeline." },
        { title: "Ongoing Support & Follow-up", description: "Regular check-ins, progress monitoring, and plan adjustments to ensure optimal health outcomes." }
      ],
      whyChoose: [
        "Personalized treatment plans designed for your specific health profile",
        "Board-certified specialists with extensive clinical experience",
        "Advanced diagnostic equipment for precise, accurate assessments",
        "Seamless coordination with other departments for holistic care",
        "Patient education resources to empower your health decisions",
        "Flexible scheduling including evening and weekend appointments"
      ],
      aboutText: "Our Mammography service provides comprehensive care using evidence-based practices and the latest medical technology. Our team of BMDC-certified specialists works collaboratively to ensure you receive personalized, compassionate care tailored to your unique health needs. At Renova Life Care Ltd, we believe in treating the whole person, not just symptoms. Our integrated approach combines clinical excellence with compassionate care to support your journey to better health.",
      specialists: [1, 3, 4],
      faqs: [
        { question: "How do I prepare for my first appointment?", answer: "Avoid using deodorant or powder on the day of your exam. Wear a two-piece outfit for convenience." },
        { question: "Do you accept my insurance?", answer: "We accept most major insurance providers. Please contact our billing department to verify your specific coverage." },
        { question: "What if I need emergency care?", answer: "Our emergency department is open 24/7. For life-threatening emergencies, please call our hotline." },
        { question: "Can I schedule a virtual consultation?", answer: "Yes, we offer telemedicine consultations for follow-up visits and non-emergency concerns." },
        { question: "How long will my appointment take?", answer: "A typical mammography appointment takes 30-45 minutes including preparation and imaging." }
      ]
    }
  ]);

  const categories = useMemo(() => ["all", ...new Set(services.map(s => s.category))], [services]);

  const filteredServices = useMemo(() => {
    let filtered = services;
    if (selectedCategory !== "all") filtered = filtered.filter(s => s.category === selectedCategory);
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(s =>
        s.title.toLowerCase().includes(term) || s.description.toLowerCase().includes(term) || s.category.toLowerCase().includes(term)
      );
    }
    return filtered;
  }, [services, selectedCategory, searchTerm]);

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
  const toggleService = (id) => setExpandedService(expandedService === id ? null : id);
  const openAddModal = () => { setEditingService(null); setShowAddModal(true); };
  const openEditModal = (service) => { setEditingService(service); setShowAddModal(true); };
  const closeModal = () => { setShowAddModal(false); setEditingService(null); };

  const handleAddService = (newService) => {
    if (editingService) {
      setServices(prev => prev.map(s => s.id === editingService.id ? { ...newService, id: s.id } : s));
      showToast("Service updated successfully!", "success");
    } else {
      const maxId = services.reduce((max, s) => Math.max(max, s.id), 0);
      setServices(prev => [...prev, { ...newService, id: maxId + 1 }]);
      showToast("Service added successfully!", "success");
    }
    closeModal();
  };
  const deleteService = (id) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices(prev => prev.filter(s => s.id !== id));
      if (expandedService === id) setExpandedService(null);
      showToast("Service deleted successfully!", "success");
    }
  };
  const duplicateService = (id) => {
    const service = services.find(s => s.id === id);
    if (service) {
      const maxId = services.reduce((max, s) => Math.max(max, s.id), 0);
      setServices(prev => [...prev, { ...service, id: maxId + 1, title: `${service.title} (Copy)` }]);
      showToast("Service duplicated successfully!", "success");
    }
  };

  const sections = [
    { id: "hero", label: "Hero Section", icon: Layout },
    { id: "services-grid", label: "Services", icon: Grid },
    { id: "features", label: "Features / Why Us", icon: Star },
    { id: "seo", label: "SEO & Meta", icon: Search }
  ];

  const renderContent = () => {
    switch (selectedSection) {
      case "hero": return <HeroEditor />;
      case "services-grid":
        return <ServicesGridEditor services={filteredServices} categories={categories}
          selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          expandedService={expandedService} toggleService={toggleService}
          openAddModal={openAddModal} openEditModal={openEditModal}
          deleteService={deleteService} duplicateService={duplicateService} />;
      case "features": return <FeaturesEditor />;
      case "seo": return <SeoEditor />;
      default: return <ServicesGridEditor services={filteredServices} categories={categories}
        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        expandedService={expandedService} toggleService={toggleService}
        openAddModal={openAddModal} openEditModal={openEditModal}
        deleteService={deleteService} duplicateService={duplicateService} />;
    }
  };

  return (
    <div className="wc-services-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">Services</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">{sections.find(s => s.id === selectedSection)?.label}</span>
          </div>
          <div className="wc-topbar-actions">
            <div className="wc-status-dot">Live</div>
            <button className="wc-btn wc-btn-ghost"><Eye size={14} /> Preview</button>
            <button className="wc-btn wc-btn-ghost"><RefreshCw size={14} /> Reset</button>
            <button className="wc-btn wc-btn-success" onClick={handleSave} disabled={saving}>
              {saving ? <><RefreshCw size={14} className="spinning" /> Saving...</> : <><Save size={14} /> Save Changes</>}
            </button>
          </div>
        </div>
        <div className="wc-editor-body">
          <nav className="wc-sections-nav">
            <div className="wc-sections-title">Sections</div>
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button key={section.id}
                  className={`wc-section-tab ${selectedSection === section.id ? "active" : ""}`}
                  onClick={() => setSelectedSection(section.id)}>
                  <Icon size={14} />{section.label}
                  {section.id === "seo" && <span className="wc-section-tab-badge">SEO</span>}
                </button>
              );
            })}
          </nav>
          <div className="wc-content-panel">
            <div className="wc-page-info-banner">
              <div className="wc-page-info-left">
                <div className="wc-page-info-icon"><Activity size={20} /></div>
                <div className="wc-page-info-text">
                  <h2>Services Page</h2>
                  <p>Editing: {sections.find(s => s.id === selectedSection)?.label}</p>
                </div>
              </div>
              <div className="wc-page-info-meta">
                <span className="wc-meta-tag live"><Check size={11} /> Published</span>
                <span className="wc-meta-tag"><Clock size={11} /> Last saved: Just now</span>
              </div>
            </div>
            {renderContent()}
          </div>
        </div>
      </div>
      {showAddModal && <AddServiceModal onClose={closeModal} onSave={handleAddService} editingService={editingService} />}
      <div className={`wc-toast ${toast.type} ${toast.show ? "show" : ""}`}>
        <Check size={16} />{toast.msg}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// HERO EDITOR
// ═══════════════════════════════════════════════════════════════
const HeroEditor = () => {
  const [data, setData] = useState({
    trust_badge_text: "OUR SERVICES",
    headline: "Comprehensive Diagnostic & Healthcare Services",
    description: "From routine checkups to advanced diagnostics, we offer a full spectrum of healthcare services under one roof.",
    background_images: [], stats: []
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

// ═══════════════════════════════════════════════════════════════
// SERVICES GRID EDITOR (with full detail accordion)
// ═══════════════════════════════════════════════════════════════
const ServicesGridEditor = ({
  services, categories, selectedCategory, setSelectedCategory,
  searchTerm, setSearchTerm, expandedService, toggleService,
  openAddModal, openEditModal, deleteService, duplicateService
}) => {
  const getIcon = (iconName) => {
    const Icon = getServiceIcon(iconName);
    return <Icon size={18} />;
  };

  const [expandedDetail, setExpandedDetail] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title">
            <Grid size={15} /> Services
            <span className="wc-editor-card-desc">{services.length} services</span>
          </h3>
          <button className="wc-btn wc-btn-primary" onClick={openAddModal}>
            <Plus size={14} /> Add Service
          </button>
        </div>
        <div className="wc-editor-card-body">
          {/* Search & Filter */}
          <div className="wc-services-filters">
            <div className="wc-services-search">
              <Search size={14} className="wc-search-icon" />
              <input type="text" placeholder="Search services..." value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="wc-services-categories">
              {categories.map(cat => (
                <button key={cat}
                  className={`wc-filter-btn ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
            <span className="wc-services-stats">{services.length} services</span>
          </div>

          {/* Services List */}
          <div className="wc-services-list">
            {services.map(service => {
              const isExpanded = expandedService === service.id;
              return (
                <div key={service.id} className={`wc-service-accordion ${isExpanded ? "expanded" : ""}`}>
                  <div className="wc-service-accordion-header" onClick={() => toggleService(service.id)}>
                    <div className="wc-service-accordion-left">
                      <div className="wc-service-accordion-icon">{getIcon(service.icon)}</div>
                      <div className="wc-service-accordion-info">
                        <div className="wc-service-accordion-title">{service.title}</div>
                        <div className="wc-service-accordion-category">{service.category}</div>
                      </div>
                    </div>
                    <div className="wc-service-accordion-right">
                      <div className="wc-service-accordion-actions">
                        <button className="wc-icon-btn" onClick={(e) => { e.stopPropagation(); duplicateService(service.id); }} title="Duplicate">
                          <Copy size={14} />
                        </button>
                        <button className="wc-icon-btn" onClick={(e) => { e.stopPropagation(); openEditModal(service); }} title="Edit">
                          <Edit size={14} />
                        </button>
                        <button className="wc-icon-btn wc-icon-btn-danger" onClick={(e) => { e.stopPropagation(); deleteService(service.id); }} title="Delete">
                          <Trash size={14} />
                        </button>
                      </div>
                      <ChevronRight size={18} className={`wc-accordion-chevron ${isExpanded ? "rotated" : ""}`} />
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="wc-service-accordion-body">
                      <div className="wc-service-detail-grid">
                        <p className="wc-service-detail-desc">{service.description}</p>
                        <div className="wc-service-detail-meta">
                          {service.price && (
                            <div className="wc-service-detail-item"><span>💰</span><span><strong>Price:</strong> {service.price}</span></div>
                          )}
                          {service.duration && (
                            <div className="wc-service-detail-item"><Clock size={14} /><span><strong>Duration:</strong> {service.duration}</span></div>
                          )}
                          {service.specialists && service.specialists.length > 0 && (
                            <div className="wc-service-detail-item"><UserCheck size={14} /><span><strong>Specialists:</strong> {service.specialists.length} doctors</span></div>
                          )}
                        </div>
                        {service.features && service.features.length > 0 && (
                          <>
                            <strong style={{ fontSize: '13px', color: '#475569', marginTop: '4px' }}>Key Features:</strong>
                            <ul className="wc-service-detail-features">
                              {service.features.map((feature, idx) => (
                                <li key={idx}><Check size={14} />{feature}</li>
                              ))}
                            </ul>
                          </>
                        )}

                        {/* ── What to Expect ──────────────────────── */}
                        {service.whatToExpect && service.whatToExpect.length > 0 && (
                          <div style={{ marginTop: '16px' }}>
                            <strong style={{ fontSize: '14px', color: '#1a202c', display: 'block', marginBottom: '8px' }}>
                              What to Expect
                            </strong>
                            <div className="wc-expect-steps">
                              {service.whatToExpect.map((step, idx) => (
                                <div key={idx} className="wc-expect-step">
                                  <div className="wc-expect-step-icon">{idx + 1}</div>
                                  <div className="wc-expect-step-content">
                                    <h4>{step.title}</h4>
                                    <p>{step.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* ── Why Choose ────────────────────────── */}
                        {service.whyChoose && service.whyChoose.length > 0 && (
                          <div style={{ marginTop: '16px', background: '#f0fdf4', padding: '16px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                            <strong style={{ fontSize: '14px', color: '#1a202c', display: 'block', marginBottom: '8px' }}>
                              Why Choose Our {service.title} Services
                            </strong>
                            <div className="wc-why-choose-list">
                              {service.whyChoose.map((item, idx) => (
                                <div key={idx} className="wc-why-choose-item">
                                  <Check size={14} />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* ── About This Service ─────────────────── */}
                        {service.aboutText && (
                          <div style={{ marginTop: '16px' }}>
                            <strong style={{ fontSize: '14px', color: '#1a202c', display: 'block', marginBottom: '8px' }}>
                              About This Service
                            </strong>
                            <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.7', margin: 0 }}>
                              {service.aboutText}
                            </p>
                          </div>
                        )}

                        {/* ── Meet Our Specialists ───────────────── */}
                        {service.specialists && service.specialists.length > 0 && (
                          <div style={{ marginTop: '16px' }}>
                            <strong style={{ fontSize: '14px', color: '#1a202c', display: 'block', marginBottom: '8px' }}>
                              Meet Our Specialists
                            </strong>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                              {service.specialists.map(docId => {
                                const doc = MOCK_DOCTORS.find(d => d.id === docId);
                                if (!doc) return null;
                                return (
                                  <div key={doc.id} style={{
                                    background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px',
                                    padding: '16px', textAlign: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                  }}>
                                    <div style={{
                                      width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 8px',
                                      background: 'linear-gradient(135deg, #014fa1, #0a7ed9)', color: '#fff',
                                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                                      fontSize: '28px', fontWeight: '700', position: 'relative'
                                    }}>
                                      {doc.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                      {doc.available && (
                                        <span style={{
                                          position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)',
                                          background: '#f0fdf4', color: '#16a34a', fontSize: '9px', fontWeight: '700',
                                          padding: '2px 8px', borderRadius: '10px', border: '1px solid #bbf7d0', whiteSpace: 'nowrap'
                                        }}>● AVAILABLE</span>
                                      )}
                                    </div>
                                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#1a202c', marginTop: '12px' }}>{doc.name}</div>
                                    <div style={{ fontSize: '12px', color: '#014fa1', fontWeight: '600' }}>{doc.specialty}</div>
                                    <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '8px' }}>{doc.credentials}</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '10px', color: '#64748b', padding: '8px 0', borderTop: '1px solid #f1f5f9' }}>
                                      <div><div style={{ fontWeight: '700', color: '#1a202c' }}>{doc.experience}</div><div style={{ fontSize: '9px' }}>EXPERIENCE</div></div>
                                      <div><div style={{ fontWeight: '700', color: '#1a202c' }}>★ {doc.rating}</div><div style={{ fontSize: '9px' }}>RATING</div></div>
                                      <div><div style={{ fontWeight: '700', color: '#1a202c' }}>{doc.patients}</div><div style={{ fontSize: '9px' }}>PATIENTS</div></div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                                      <button style={{
                                        padding: '6px', border: '1px solid #014fa1', background: '#fff', color: '#014fa1',
                                        borderRadius: '6px', fontSize: '11px', fontWeight: '600', cursor: 'pointer'
                                      }}>👤 Doctor Profile</button>
                                      <button style={{
                                        padding: '6px', border: 'none', background: 'linear-gradient(135deg, #014fa1, #0a7ed9)',
                                        color: '#fff', borderRadius: '6px', fontSize: '11px', fontWeight: '600', cursor: 'pointer'
                                      }}> Book Appointment</button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* ── FAQ ────────────────────────────────── */}
                        {service.faqs && service.faqs.length > 0 && (
                          <div style={{ marginTop: '16px' }}>
                            <strong style={{ fontSize: '14px', color: '#1a202c', display: 'block', marginBottom: '8px' }}>
                              Frequently Asked Questions
                            </strong>
                            <div className="wc-faq-list">
                              {service.faqs.map((faq, idx) => {
                                const isFaqOpen = expandedFaq === `${service.id}-${idx}`;
                                return (
                                  <div key={idx} className={`wc-faq-item ${isFaqOpen ? "expanded" : ""}`}>
                                    <button className="wc-faq-question" onClick={() => setExpandedFaq(isFaqOpen ? null : `${service.id}-${idx}`)}>
                                      <span>{faq.question}</span>
                                      <ChevronRight size={14} style={{ transform: isFaqOpen ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
                                    </button>
                                    {isFaqOpen && <div className="wc-faq-answer">{faq.answer}</div>}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {services.length === 0 && (
              <div className="wc-services-empty-state">
                <AlertCircle size={48} className="wc-empty-icon" />
                <h3>No services found</h3>
                <p>Try adjusting your search or filter criteria</p>
                <button className="wc-btn wc-btn-primary" onClick={openAddModal}>
                  <Plus size={14} /> Add Service
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════
// FEATURES EDITOR
// ═══════════════════════════════════════════════════════════════
const FeaturesEditor = () => {
  const [data, setData] = useState({
    section_label: "Why Choose Us",
    heading: "Why Renova Life Care?",
    subheading: "We are committed to providing the highest quality healthcare services.",
    features: [
      { icon: "Star", title: "Expert Team", description: "BMDC-certified specialists with years of experience" },
      { icon: "Heart", title: "Compassionate Care", description: "Patient-first approach with personalized attention" },
      { icon: "Award", title: "Quality Assurance", description: "ISO certified processes and quality standards" },
      { icon: "Clock", title: "Timely Service", description: "On-time appointments and quick results" }
    ]
  });
  const set = (k, v) => setData({ ...data, [k]: v });
  const updateFeature = (index, key, value) => {
    const updated = [...data.features];
    updated[index] = { ...updated[index], [key]: value };
    set("features", updated);
  };
  const addFeature = () => set("features", [...data.features, { icon: "Star", title: "", description: "" }]);
  const removeFeature = (index) => {
    const updated = [...data.features];
    updated.splice(index, 1);
    set("features", updated);
  };
  const iconOptions = ["Star", "Heart", "Award", "Clock", "Target", "Users", "Shield", "Check"];
  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Star size={15} /> Features Section</h3>
          <span className="wc-editor-card-desc">{data.features.length} features</span>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field"><label className="wc-field-label">Section Label</label>
              <input className="wc-input" value={data.section_label} onChange={e => set("section_label", e.target.value)} /></div>
            <div className="wc-field span-2"><label className="wc-field-label">Heading <span className="required">*</span></label>
              <input className="wc-input" value={data.heading} onChange={e => set("heading", e.target.value)} /></div>
            <div className="wc-field span-2"><label className="wc-field-label">Sub Heading</label>
              <textarea className="wc-textarea" value={data.subheading} onChange={e => set("subheading", e.target.value)} rows={2} /></div>
          </div>
          <div style={{ marginTop: '16px' }}>
            {data.features.map((feature, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr auto', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                <select className="wc-select" value={feature.icon} onChange={e => updateFeature(i, "icon", e.target.value)}>
                  {iconOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <input className="wc-input" value={feature.title} onChange={e => updateFeature(i, "title", e.target.value)} placeholder="Title" />
                <input className="wc-input" value={feature.description} onChange={e => updateFeature(i, "description", e.target.value)} placeholder="Description" />
                <button className="wc-btn wc-btn-danger wc-btn-sm" onClick={() => removeFeature(i)}><Trash size={14} /></button>
              </div>
            ))}
          </div>
          <button className="wc-repeater-add" onClick={addFeature}><Plus size={14} /> Add Feature</button>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// SEO EDITOR
// ══════════════════════════════════════════════════════════════
const SeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "Healthcare Services — Diagnostics & Treatments | Renova Life Care",
    meta_description: "Comprehensive diagnostic and healthcare services in Bangladesh.",
    og_title: "Our Healthcare Services", og_description: "Full spectrum of healthcare services under one roof.",
    og_image: "/images/og-services.jpg", canonical_url: "https://renovalifecare.com/services",
    robots: "index, follow", keywords: "healthcare services Bangladesh, diagnostic services"
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
        <div className="wc-editor-card-header"><h3 className="wc-editor-card-title"><Search size={15} /> Meta Tags</h3></div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2"><label className="wc-field-label">Meta Title <span className="required">*</span></label>
              <input className="wc-input" value={data.meta_title} onChange={e => set("meta_title", e.target.value)} /></div>
            <div className="wc-field span-2"><label className="wc-field-label">Meta Description</label>
              <textarea className="wc-textarea" value={data.meta_description} onChange={e => set("meta_description", e.target.value)} rows={3} /></div>
            <div className="wc-field span-2"><label className="wc-field-label">Keywords</label>
              <input className="wc-input" value={data.keywords} onChange={e => set("keywords", e.target.value)} /></div>
            <div className="wc-field span-2"><label className="wc-field-label">Canonical URL</label>
              <input className="wc-input" value={data.canonical_url} onChange={e => set("canonical_url", e.target.value)} /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// ADD / EDIT SERVICE MODAL (with Specialists Selector)
// ═══════════════════════════════════════════════════════════════
const AddServiceModal = ({ onClose, onSave, editingService }) => {
  const [formData, setFormData] = useState({
    title: editingService?.title || "",
    category: editingService?.category || "Diagnostic",
    icon: editingService?.icon || "Activity",
    description: editingService?.description || "",
    features: editingService?.features || [],
    price: editingService?.price || "",
    duration: editingService?.duration || "",
    whatToExpect: editingService?.whatToExpect || [
      { title: "Initial Consultation", description: "Meet with our specialist to discuss your symptoms, medical history, and health goals." },
      { title: "Comprehensive Assessment", description: "Undergo thorough evaluation using state-of-the-art diagnostic tools." },
      { title: "Personalized Treatment Plan", description: "Receive a clear, customized care plan with explained options." },
      { title: "Ongoing Support & Follow-up", description: "Regular check-ins, progress monitoring, and plan adjustments." }
    ],
    whyChoose: editingService?.whyChoose || [
      "Personalized treatment plans designed for your specific health profile",
      "Board-certified specialists with extensive clinical experience",
      "Advanced diagnostic equipment for precise, accurate assessments",
      "Seamless coordination with other departments for holistic care"
    ],
    aboutText: editingService?.aboutText || "",
    specialists: editingService?.specialists || [],
    faqs: editingService?.faqs || [
      { question: "How do I prepare for my first appointment?", answer: "Please bring your previous medical records and arrive 15 minutes early." },
      { question: "Do you accept my insurance?", answer: "We accept most major insurance providers." },
      { question: "How long will my appointment take?", answer: "Initial consultations typically last 30-45 minutes." }
    ]
  });

  const [newFeature, setNewFeature] = useState("");
  const [errors, setErrors] = useState({});
  const [activeModalTab, setActiveModalTab] = useState("basic");

  // Specialists selector state
  const [specialistSearch, setSpecialistSearch] = useState("");
  const [specialistFilter, setSpecialistFilter] = useState("all");

  const categories = ["Diagnostic", "Imaging", "Cardiology", "Screening", "Consultation", "Preventive", "Other"];
  const iconOptions = ["Activity", "Heart", "Stethoscope", "Microscope", "Syringe", "Pill", "Bone", "Brain",
    "Droplet", "Thermometer", "Scissors", "Eye", "Ear", "Tooth", "Baby", "HeartPulse", "Users",
    "Calendar", "MessageCircle", "Award", "Star", "Target", "Package", "FileText", "MapPin", "Phone", "Mail", "User"];

  const uniqueSpecialties = useMemo(() => {
    const specs = MOCK_DOCTORS.map(d => d.specialty);
    return ["all", ...new Set(specs)];
  }, []);

  const filteredDoctors = useMemo(() => {
    let docs = MOCK_DOCTORS;
    if (specialistFilter !== "all") docs = docs.filter(d => d.specialty === specialistFilter);
    if (specialistSearch.trim()) {
      const term = specialistSearch.toLowerCase().trim();
      docs = docs.filter(d => d.name.toLowerCase().includes(term) || d.specialty.toLowerCase().includes(term));
    }
    return docs;
  }, [specialistSearch, specialistFilter]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Service title is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSave(formData);
  };

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: "" }));
  };

  // ─ What to Expect helpers ──
  const addExpectStep = () => setFormData(prev => ({
    ...prev, whatToExpect: [...prev.whatToExpect, { title: "", description: "" }]
  }));
  const updateExpectStep = (idx, key, value) => {
    const updated = [...formData.whatToExpect];
    updated[idx] = { ...updated[idx], [key]: value };
    setFormData(prev => ({ ...prev, whatToExpect: updated }));
  };
  const removeExpectStep = (idx) => setFormData(prev => ({
    ...prev, whatToExpect: prev.whatToExpect.filter((_, i) => i !== idx)
  }));
  const moveExpectStep = (idx, dir) => {
    const updated = [...formData.whatToExpect];
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= updated.length) return;
    [updated[idx], updated[newIdx]] = [updated[newIdx], updated[idx]];
    setFormData(prev => ({ ...prev, whatToExpect: updated }));
  };

  // ── Why Choose helpers ──
  const addWhyItem = () => setFormData(prev => ({ ...prev, whyChoose: [...prev.whyChoose, ""] }));
  const updateWhyItem = (idx, value) => {
    const updated = [...formData.whyChoose];
    updated[idx] = value;
    setFormData(prev => ({ ...prev, whyChoose: updated }));
  };
  const removeWhyItem = (idx) => setFormData(prev => ({
    ...prev, whyChoose: prev.whyChoose.filter((_, i) => i !== idx)
  }));

  // ── FAQ helpers ──
  const addFaq = () => setFormData(prev => ({
    ...prev, faqs: [...prev.faqs, { question: "", answer: "" }]
  }));
  const updateFaq = (idx, key, value) => {
    const updated = [...formData.faqs];
    updated[idx] = { ...updated[idx], [key]: value };
    setFormData(prev => ({ ...prev, faqs: updated }));
  };
  const removeFaq = (idx) => setFormData(prev => ({
    ...prev, faqs: prev.faqs.filter((_, i) => i !== idx)
  }));

  // ── Specialists toggle ──
  const toggleSpecialist = (docId) => {
    setFormData(prev => ({
      ...prev,
      specialists: prev.specialists.includes(docId)
        ? prev.specialists.filter(id => id !== docId)
        : [...prev.specialists, docId]
    }));
  };
  const removeSpecialist = (docId) => setFormData(prev => ({
    ...prev, specialists: prev.specialists.filter(id => id !== docId)
  }));

  const modalTabs = [
    { id: "basic", label: "Basic Info", icon: FileText },
    { id: "expect", label: "What to Expect", icon: HelpCircle },
    { id: "why", label: "Why Choose", icon: CheckCircle2 },
    { id: "about", label: "About", icon: BookOpen },
    { id: "specialists", label: "Specialists", icon: UserCheck },
    { id: "faq", label: "FAQ", icon: HelpCircle }
  ];

  return (
    <div className="wc-modal-overlay" onClick={onClose}>
      <div className="wc-modal wc-modal-service" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '720px' }}>
        <div className="wc-modal-header">
          <h3>{editingService ? "Edit Service" : "Add New Service"}</h3>
          <button className="wc-modal-close" onClick={onClose}><X size={20} /></button>
        </div>

        {/* Modal Tabs */}
        <div style={{
          display: 'flex', gap: '4px', padding: '12px 20px', borderBottom: '1px solid #e2e8f0',
          overflowX: 'auto', background: '#f8fafc'
        }}>
          {modalTabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveModalTab(tab.id)} style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px',
                background: activeModalTab === tab.id ? '#fff' : 'transparent',
                border: activeModalTab === tab.id ? '1px solid #e2e8f0' : '1px solid transparent',
                borderBottom: activeModalTab === tab.id ? '2px solid #014fa1' : 'none',
                borderRadius: '6px 6px 0 0', fontSize: '12px', fontWeight: activeModalTab === tab.id ? '600' : '500',
                color: activeModalTab === tab.id ? '#014fa1' : '#64748b', cursor: 'pointer', whiteSpace: 'nowrap',
                fontFamily: 'inherit'
              }}>
                <Icon size={13} />{tab.label}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="wc-modal-body" style={{ maxHeight: '60vh' }}>

            {/* ─ Errors ── */}
            {Object.keys(errors).length > 0 && (
              <div style={{ padding: '12px', background: '#fee2e2', border: '1px solid #fecaca', borderRadius: '8px', color: '#dc2626', fontSize: '13px', display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '16px' }}>
                <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '1px' }} />
                <div><strong>Please fix the following errors:</strong>
                  <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                    {Object.values(errors).map((err, i) => <li key={i}>{err}</li>)}
                  </ul>
                </div>
              </div>
            )}

            {/* ═══ TAB: Basic Info ══ */}
            {activeModalTab === "basic" && (
              <div className="wc-modal-service-grid">
                <div className="wc-field">
                  <label className="wc-field-label">Service Title <span className="required">*</span></label>
                  <input className="wc-input" placeholder="Enter service title..." value={formData.title}
                    onChange={e => handleChange("title", e.target.value)}
                    style={{ borderColor: errors.title ? '#dc2626' : '' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="wc-field">
                    <label className="wc-field-label">Category <span className="required">*</span></label>
                    <select className="wc-select" value={formData.category} onChange={e => handleChange("category", e.target.value)}>
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div className="wc-field">
                    <label className="wc-field-label">Icon</label>
                    <select className="wc-select" value={formData.icon} onChange={e => handleChange("icon", e.target.value)}>
                      {iconOptions.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                    </select>
                  </div>
                </div>
                <div className="wc-field">
                  <label className="wc-field-label">Description <span className="required">*</span></label>
                  <textarea className="wc-textarea" placeholder="Enter service description..." value={formData.description}
                    onChange={e => handleChange("description", e.target.value)} rows={3}
                    style={{ borderColor: errors.description ? '#dc2626' : '' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="wc-field">
                    <label className="wc-field-label">Price</label>
                    <input className="wc-input" placeholder="e.g. BDT 500+" value={formData.price}
                      onChange={e => handleChange("price", e.target.value)} />
                  </div>
                  <div className="wc-field">
                    <label className="wc-field-label">Duration</label>
                    <input className="wc-input" placeholder="e.g. 2-4 hours" value={formData.duration}
                      onChange={e => handleChange("duration", e.target.value)} />
                  </div>
                </div>
                <div className="wc-field">
                  <label className="wc-field-label">Key Features</label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input className="wc-input" placeholder="Add a feature..." value={newFeature}
                      onChange={e => setNewFeature(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), setFormData(prev => ({ ...prev, features: [...prev.features, newFeature.trim()] })), setNewFeature(""))} />
                    <button type="button" className="wc-btn wc-btn-primary" onClick={() => {
                      if (newFeature.trim()) {
                        setFormData(prev => ({ ...prev, features: [...prev.features, newFeature.trim()] }));
                        setNewFeature("");
                      }
                    }}><Plus size={14} /></button>
                  </div>
                  {formData.features.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '8px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      {formData.features.map((feature, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#eff6ff', padding: '4px 8px 4px 12px', borderRadius: '20px', fontSize: '12px', border: '1px solid #dbeafe' }}>
                          <span>{feature}</span>
                          <button type="button" onClick={() => setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }))}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: '#64748b' }}>
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ═══ TAB: What to Expect ═══ */}
            {activeModalTab === "expect" && (
              <div>
                <div style={{ marginBottom: '12px', fontSize: '13px', color: '#64748b' }}>
                  Define the step-by-step patient journey for this service.
                </div>
                {formData.whatToExpect.map((step, idx) => (
                  <div key={idx} className="wc-repeater-row" style={{ gridTemplateColumns: 'auto 1fr 1fr auto' }}>
                    <div className="wc-repeater-number">{idx + 1}</div>
                    <input className="wc-input" placeholder="Step title..." value={step.title}
                      onChange={e => updateExpectStep(idx, "title", e.target.value)} />
                    <textarea className="wc-textarea" placeholder="Step description..." value={step.description} rows={2}
                      onChange={e => updateExpectStep(idx, "description", e.target.value)} />
                    <div className="wc-repeater-row-actions" style={{ flexDirection: 'column' }}>
                      <button type="button" className="wc-btn wc-btn-ghost wc-btn-sm" onClick={() => moveExpectStep(idx, -1)} disabled={idx === 0}>
                        <ArrowUp size={12} />
                      </button>
                      <button type="button" className="wc-btn wc-btn-ghost wc-btn-sm" onClick={() => moveExpectStep(idx, 1)} disabled={idx === formData.whatToExpect.length - 1}>
                        <ArrowDown size={12} />
                      </button>
                      <button type="button" className="wc-btn wc-btn-danger wc-btn-sm" onClick={() => removeExpectStep(idx)}>
                        <Trash size={12} />
                      </button>
                    </div>
                  </div>
                ))}
                <button type="button" className="wc-repeater-add" onClick={addExpectStep}>
                  <Plus size={14} /> Add Step
                </button>
              </div>
            )}

            {/* ═══ TAB: Why Choose ═══ */}
            {activeModalTab === "why" && (
              <div>
                <div style={{ marginBottom: '12px', fontSize: '13px', color: '#64748b' }}>
                  List the key reasons patients should choose this service.
                </div>
                {formData.whyChoose.map((item, idx) => (
                  <div key={idx} className="wc-repeater-row" style={{ gridTemplateColumns: 'auto 1fr auto' }}>
                    <div className="wc-repeater-number" style={{ background: '#16a34a' }}>✓</div>
                    <input className="wc-input" placeholder="Reason..." value={item}
                      onChange={e => updateWhyItem(idx, e.target.value)} />
                    <button type="button" className="wc-btn wc-btn-danger wc-btn-sm" onClick={() => removeWhyItem(idx)}>
                      <Trash size={12} />
                    </button>
                  </div>
                ))}
                <button type="button" className="wc-repeater-add" onClick={addWhyItem}>
                  <Plus size={14} /> Add Reason
                </button>
              </div>
            )}

            {/* ═══ TAB: About ══ */}
            {activeModalTab === "about" && (
              <div className="wc-field">
                <label className="wc-field-label">About This Service</label>
                <textarea className="wc-textarea xl" placeholder="Detailed description about this service..."
                  value={formData.aboutText} onChange={e => handleChange("aboutText", e.target.value)} rows={8} />
                <span className="wc-field-hint">This text will appear in the 'About This Service' section on the frontend.</span>
              </div>
            )}

            {/* ═══ TAB: Specialists ═══ */}
            {activeModalTab === "specialists" && (
              <div className="wc-specialists-selector">
                <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>
                  Select doctors who specialize in this service. Selected: <strong style={{ color: '#014fa1' }}>{formData.specialists.length}</strong>
                </div>

                {/* Selected specialists tags */}
                {formData.specialists.length > 0 && (
                  <div className="wc-specialists-selected-tags">
                    {formData.specialists.map(docId => {
                      const doc = MOCK_DOCTORS.find(d => d.id === docId);
                      if (!doc) return null;
                      return (
                        <div key={docId} className="wc-specialist-tag">
                          <span>{doc.name}</span>
                          <button type="button" onClick={() => removeSpecialist(docId)}><X size={12} /></button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Search */}
                <div className="wc-specialists-search">
                  <Search size={14} className="wc-search-icon" />
                  <input type="text" placeholder="Search doctors by name or specialty..."
                    value={specialistSearch} onChange={e => setSpecialistSearch(e.target.value)} />
                </div>

                {/* Specialty filter */}
                <div className="wc-specialists-filter-row">
                  <span className="wc-selected-count">Filter by specialty:</span>
                  {uniqueSpecialties.map(spec => (
                    <button key={spec} type="button"
                      className={`wc-filter-btn ${specialistFilter === spec ? "active" : ""}`}
                      onClick={() => setSpecialistFilter(spec)}>
                      {spec === "all" ? "All" : spec}
                    </button>
                  ))}
                </div>

                {/* Doctors list */}
                <div className="wc-specialists-list">
                  {filteredDoctors.length === 0 ? (
                    <div className="wc-specialists-empty">No doctors found matching your criteria.</div>
                  ) : (
                    filteredDoctors.map(doc => {
                      const isSelected = formData.specialists.includes(doc.id);
                      return (
                        <label key={doc.id} className={`wc-specialist-option ${isSelected ? "selected" : ""}`}>
                          <input type="checkbox" checked={isSelected} onChange={() => toggleSpecialist(doc.id)} />
                          <div className="wc-specialist-option-avatar">
                            {doc.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div className="wc-specialist-option-info">
                            <div className="wc-specialist-option-name">{doc.name}</div>
                            <div className="wc-specialist-option-spec">{doc.specialty} · {doc.credentials}</div>
                          </div>
                          <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: '600' }}>
                            ★ {doc.rating}
                          </span>
                        </label>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* ═══ TAB: FAQ ═══ */}
            {activeModalTab === "faq" && (
              <div>
                <div style={{ marginBottom: '12px', fontSize: '13px', color: '#64748b' }}>
                  Add frequently asked questions about this service.
                </div>
                {formData.faqs.map((faq, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <div className="wc-repeater-number" style={{ background: '#f59e0b' }}>Q{idx + 1}</div>
                      <input className="wc-input" placeholder="Question..." value={faq.question}
                        onChange={e => updateFaq(idx, "question", e.target.value)} style={{ flex: 1 }} />
                      <button type="button" className="wc-btn wc-btn-danger wc-btn-sm" onClick={() => removeFaq(idx)}>
                        <Trash size={12} />
                      </button>
                    </div>
                    <textarea className="wc-textarea" placeholder="Answer..." value={faq.answer} rows={2}
                      onChange={e => updateFaq(idx, "answer", e.target.value)} />
                  </div>
                ))}
                <button type="button" className="wc-repeater-add" onClick={addFaq}>
                  <Plus size={14} /> Add FAQ
                </button>
              </div>
            )}
          </div>

          <div className="wc-modal-footer">
            <button type="button" className="wc-btn wc-btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="wc-btn wc-btn-primary">
              {editingService ? "Update Service" : "Add Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServicesPage;