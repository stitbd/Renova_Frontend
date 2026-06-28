"use client";

import { useState } from "react";
import {
  Layout,
  List,
  Search,
  Clock,
  Check,
  ChevronDown,
  Save,
  RefreshCw,
  Eye,
  Plus,
  Trash,
  X,
  Info,
  FileText,
  Tag,
  Filter,
  Edit2,
  AlertCircle
} from "lucide-react";
import "./text-list.css";

const TestListPage = () => {
  const [selectedSection, setSelectedSection] = useState("test-listing");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const sections = [
    { id: "hero", label: "Hero Section", icon: Layout },
    { id: "test-listing", label: "Test List", icon: List },
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
      case "hero":
        return <HeroEditor />;
      case "test-listing":
        return <TestListingEditor />;
      case "seo":
        return <SeoEditor />;
      default:
        return <TestListingEditor />;
    }
  };

  return (
    <div className="wc-packages-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">Price List</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">{sections.find(s => s.id === selectedSection)?.label}</span>
          </div>

          <div className="wc-topbar-actions">
            <div className="wc-status-dot">Live</div>
            <button className="wc-btn wc-btn-ghost">
              <Eye size={14} /> Preview
            </button>
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
                  <FileText size={20} />
                </div>
                <div className="wc-page-info-text">
                  <h2>Test Price List</h2>
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

// Hero Editor
const HeroEditor = () => {
  const [data, setData] = useState({
    trust_badge_text: "DIAGNOSTIC PRICE LIST",
    headline: "Complete Diagnostic Test Price List",
    description: "All prices in BDT. Enjoy up to 25% discount on 216+ investigations.",
    discount_note: "Prices include 25% special discount. Show this page at the reception to avail the offer."
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
              <textarea className="wc-textarea" value={data.description} onChange={e => set("description", e.target.value)} rows={2} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Discount Note</label>
              <textarea className="wc-textarea" value={data.discount_note} onChange={e => set("discount_note", e.target.value)} rows={2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Category Management Component
const CategoryManager = ({ categories, onAdd, onUpdate, onDelete }) => {
  const [newCategory, setNewCategory] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  const handleAdd = () => {
    if (newCategory.trim()) {
      onAdd(newCategory.trim());
      setNewCategory("");
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingValue(categories[index]);
  };

  const handleUpdate = () => {
    if (editingValue.trim()) {
      onUpdate(editingIndex, editingValue.trim());
      setEditingIndex(null);
      setEditingValue("");
    }
  };

  const handleDelete = (index) => {
    if (window.confirm(`Delete category "${categories[index]}"?`)) {
      onDelete(index);
    }
  };

  return (
    <div style={{ marginBottom: '16px', padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 600, color: '#1a202c' }}>Manage Categories</h4>
      
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <input 
          className="wc-input" 
          placeholder="Enter new category name..."
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleAdd()}
          style={{ flex: 1 }}
        />
        <button className="wc-btn wc-btn-primary" onClick={handleAdd}>
          <Plus size={14} /> Add Category
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {categories.map((cat, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px',
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '4px 8px 4px 12px'
          }}>
            {editingIndex === index ? (
              <>
                <input 
                  className="wc-input" 
                  value={editingValue}
                  onChange={e => setEditingValue(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleUpdate()}
                  style={{ width: '160px', fontSize: '12px', padding: '4px 8px' }}
                  autoFocus
                />
                <button className="wc-btn wc-btn-success" onClick={handleUpdate} style={{ padding: '4px 8px', fontSize: '11px' }}>
                  <Check size={12} />
                </button>
                <button className="wc-btn wc-btn-ghost" onClick={() => setEditingIndex(null)} style={{ padding: '4px 8px', fontSize: '11px' }}>
                  <X size={12} />
                </button>
              </>
            ) : (
              <>
                <span style={{ fontSize: '13px', fontWeight: 500 }}>{cat}</span>
                <button className="wc-btn wc-btn-ghost" onClick={() => handleEdit(index)} style={{ padding: '4px 6px', fontSize: '11px' }}>
                  <Edit2 size={12} />
                </button>
                <button className="wc-btn wc-btn-danger" onClick={() => handleDelete(index)} style={{ padding: '4px 6px', fontSize: '11px' }}>
                  <X size={12} />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Add Test Modal Component
const AddTestModal = ({ isOpen, onClose, onAdd, categories }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: categories.length > 0 ? categories[0] : "",
    regular_price: "",
    discount_percent: "0"
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Test name is required";
    }
    if (!formData.regular_price || parseFloat(formData.regular_price) <= 0) {
      newErrors.regular_price = "Valid price is required";
    }
    if (formData.discount_percent === "" || parseFloat(formData.discount_percent) < 0 || parseFloat(formData.discount_percent) > 100) {
      newErrors.discount_percent = "Discount must be between 0 and 100";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onAdd({
        name: formData.name.trim(),
        category: formData.category,
        regular_price: parseFloat(formData.regular_price) || 0,
        discount_percent: parseFloat(formData.discount_percent) || 0
      });
      setFormData({
        name: "",
        category: categories.length > 0 ? categories[0] : "",
        regular_price: "",
        discount_percent: "0"
      });
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      category: categories.length > 0 ? categories[0] : "",
      regular_price: "",
      discount_percent: "0"
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="wc-modal-overlay" onClick={handleClose}>
      <div className="wc-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '550px' }}>
        <div className="wc-modal-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={18} style={{ color: '#014fa1' }} />
            Add New Test
          </h3>
          <button className="wc-modal-close" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="wc-modal-body">
            {Object.keys(errors).length > 0 && (
              <div className="wc-modal-error" style={{ 
                padding: '12px', 
                background: '#fee2e2', 
                border: '1px solid #fecaca',
                borderRadius: '8px',
                color: '#dc2626',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px'
              }}>
                <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '1px' }} />
                <div>
                  <strong>Please fix the following errors:</strong>
                  <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                    {Object.values(errors).map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="wc-field">
              <label className="wc-field-label">
                Test Name <span className="required">*</span>
              </label>
              <input 
                className="wc-input" 
                placeholder="Enter test name..."
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                style={{ borderColor: errors.name ? '#dc2626' : '' }}
              />
              {errors.name && (
                <span style={{ fontSize: '12px', color: '#dc2626' }}>{errors.name}</span>
              )}
            </div>

            <div className="wc-field">
              <label className="wc-field-label">
                Category <span className="required">*</span>
              </label>
              <select 
                className="wc-select" 
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="wc-field">
                <label className="wc-field-label">
                  Regular Price (BDT) <span className="required">*</span>
                </label>
                <input 
                  className="wc-input" 
                  type="number"
                  min="0"
                  step="1"
                  placeholder="e.g. 500"
                  value={formData.regular_price}
                  onChange={e => setFormData({ ...formData, regular_price: e.target.value })}
                  style={{ borderColor: errors.regular_price ? '#dc2626' : '' }}
                />
                {errors.regular_price && (
                  <span style={{ fontSize: '12px', color: '#dc2626' }}>{errors.regular_price}</span>
                )}
              </div>

              <div className="wc-field">
                <label className="wc-field-label">
                  Discount %
                </label>
                <input 
                  className="wc-input" 
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  placeholder="e.g. 25"
                  value={formData.discount_percent}
                  onChange={e => setFormData({ ...formData, discount_percent: e.target.value })}
                  style={{ borderColor: errors.discount_percent ? '#dc2626' : '' }}
                />
                {errors.discount_percent && (
                  <span style={{ fontSize: '12px', color: '#dc2626' }}>{errors.discount_percent}</span>
                )}
                {!errors.discount_percent && formData.regular_price && parseFloat(formData.regular_price) > 0 && (
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Discounted price: BDT {Math.round(parseFloat(formData.regular_price) * (1 - (parseFloat(formData.discount_percent) || 0) / 100))}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="wc-modal-footer">
            <button type="button" className="wc-btn wc-btn-ghost" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="wc-btn wc-btn-primary">
              <Plus size={14} /> Add Test
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Test Listing Editor
const TestListingEditor = () => {
  const [data, setData] = useState({
    total_tests: "216+",
    sort_option: "A-Z",
    categories: [
      "Blood Tests",
      "Imaging & Radiology",
      "Ultrasound (USG)",
      "Urine & Stool",
      "Hormones & Tumour Markers",
      "Immunology & Infection",
      "Cardiology",
      "Neurology",
      "Procedures & Scope"
    ],
    tests: [
      { id: 1, name: "ALBUMIN (serum)", category: "Blood Tests", regular_price: 300, discount_percent: 25 },
      { id: 2, name: "ALK. PHOSPHATE", category: "Blood Tests", regular_price: 300, discount_percent: 25 },
      { id: 3, name: "AMH (ANTI MULLERIAN HORMONE)", category: "Hormones & Tumour Markers", regular_price: 3000, discount_percent: 25 },
      { id: 4, name: "AMYLASE", category: "Blood Tests", regular_price: 1100, discount_percent: 25 },
      { id: 5, name: "ANA/ANF", category: "Immunology & Infection", regular_price: 1000, discount_percent: 25 },
      { id: 6, name: "ANTI CARDIOLIPIN AB", category: "Immunology & Infection", regular_price: 3000, discount_percent: 25 },
      { id: 7, name: "ANTI CCP Antibody", category: "Immunology & Infection", regular_price: 1200, discount_percent: 25 },
      { id: 8, name: "ANTI ds DNA", category: "Immunology & Infection", regular_price: 1300, discount_percent: 25 },
      { id: 9, name: "ANTI PHOSPHOLIPID AB", category: "Blood Tests", regular_price: 2400, discount_percent: 25 },
      { id: 10, name: "ANTI THYROID AB", category: "Immunology & Infection", regular_price: 2200, discount_percent: 25 },
      { id: 11, name: "ANTI-HBe/HBeAb/A-HBeA", category: "Immunology & Infection", regular_price: 1000, discount_percent: 25 },
      { id: 12, name: "ANTI-HCV", category: "Immunology & Infection", regular_price: 1000, discount_percent: 25 },
      { id: 13, name: "ASO TITRE", category: "Immunology & Infection", regular_price: 600, discount_percent: 25 },
      { id: 14, name: "B-HCG", category: "Blood Tests", regular_price: 1100, discount_percent: 25 },
      { id: 15, name: "B.SUGAR FASTING (FBS)", category: "Blood Tests", regular_price: 200, discount_percent: 25 },
      { id: 16, name: "B.SUGAR RANDOM (RBS)", category: "Blood Tests", regular_price: 200, discount_percent: 25 },
      { id: 17, name: "B/S 2HRS.ABF", category: "Blood Tests", regular_price: 200, discount_percent: 25 },
      { id: 18, name: "BASAL CORTISOL MORNING", category: "Hormones & Tumour Markers", regular_price: 1000, discount_percent: 25 },
      { id: 19, name: "BETA2 MICROGLOBULIN", category: "Hormones & Tumour Markers", regular_price: 1000, discount_percent: 25 },
      { id: 20, name: "BILIRUBIN (Total)", category: "Blood Tests", regular_price: 300, discount_percent: 25 },
      { id: 21, name: "Bilirubin D/T", category: "Blood Tests", regular_price: 500, discount_percent: 25 },
      { id: 22, name: "BLOOD C/S (Fan Method)", category: "Blood Tests", regular_price: 1500, discount_percent: 25 },
      { id: 23, name: "BLOOD FILM", category: "Blood Tests", regular_price: 300, discount_percent: 25 },
      { id: 24, name: "BLOOD GROUP (ABO+RH)", category: "Blood Tests", regular_price: 200, discount_percent: 25 },
      { id: 25, name: "BONE MARROW", category: "Procedures & Scope", regular_price: 3000, discount_percent: 25 },
      { id: 26, name: "CA-125", category: "Hormones & Tumour Markers", regular_price: 1000, discount_percent: 25 },
      { id: 27, name: "CA-153", category: "Hormones & Tumour Markers", regular_price: 1000, discount_percent: 25 },
      { id: 28, name: "CA-199", category: "Hormones & Tumour Markers", regular_price: 1000, discount_percent: 25 },
      { id: 29, name: "CALCIUM", category: "Blood Tests", regular_price: 500, discount_percent: 25 },
      { id: 30, name: "CEA", category: "Hormones & Tumour Markers", regular_price: 1000, discount_percent: 25 },
      { id: 31, name: "ELECTROLYTES", category: "Blood Tests", regular_price: 850, discount_percent: 25 },
      { id: 32, name: "ESTRADIOL", category: "Hormones & Tumour Markers", regular_price: 1000, discount_percent: 25 },
      { id: 33, name: "FREE TESTOSTERONE", category: "Hormones & Tumour Markers", regular_price: 1200, discount_percent: 25 },
      { id: 34, name: "HBsAg", category: "Immunology & Infection", regular_price: 1100, discount_percent: 25 },
      { id: 35, name: "HBs C/S", category: "Blood Tests", regular_price: 600, discount_percent: 25 },
      { id: 36, name: "IgE Serum", category: "Immunology & Infection", regular_price: 950, discount_percent: 25 },
      { id: 37, name: "IRON", category: "Blood Tests", regular_price: 1200, discount_percent: 25 },
      { id: 38, name: "IRON PROFILE", category: "Blood Tests", regular_price: 3000, discount_percent: 25 },
      { id: 39, name: "LDL", category: "Blood Tests", regular_price: 400, discount_percent: 25 },
      { id: 40, name: "LUPUS ANTICOAGULANT", category: "Blood Tests", regular_price: 5000, discount_percent: 25 },
      { id: 41, name: "LFT (LIVER FUNCTION TEST)", category: "Blood Tests", regular_price: 1600, discount_percent: 25 },
      { id: 42, name: "LH (Luteinizing Hormone)", category: "Hormones & Tumour Markers", regular_price: 1000, discount_percent: 25 },
      { id: 43, name: "LH FSH RATIO", category: "Hormones & Tumour Markers", regular_price: 2000, discount_percent: 25 },
      { id: 44, name: "LIPID PROFILE", category: "Blood Tests", regular_price: 1200, discount_percent: 25 },
      { id: 45, name: "P04 (IN.PHOS)", category: "Blood Tests", regular_price: 500, discount_percent: 25 },
      { id: 46, name: "PROLACTIN", category: "Hormones & Tumour Markers", regular_price: 1000, discount_percent: 25 },
      { id: 47, name: "PROTEIN ELECTROPHORESIS", category: "Immunology & Infection", regular_price: 1100, discount_percent: 25 },
      { id: 48, name: "PROTEIN-C", category: "Immunology & Infection", regular_price: 4000, discount_percent: 25 },
      { id: 49, name: "PROTEIN-S", category: "Immunology & Infection", regular_price: 4000, discount_percent: 25 },
      { id: 50, name: "PSA", category: "Hormones & Tumour Markers", regular_price: 1000, discount_percent: 25 },
      { id: 51, name: "R/A TEST", category: "Immunology & Infection", regular_price: 600, discount_percent: 25 },
      { id: 52, name: "RH, ANTI TITRE", category: "Blood Tests", regular_price: 700, discount_percent: 25 },
      { id: 53, name: "SEMEN ANALYSIS", category: "Immunology & Infection", regular_price: 1000, discount_percent: 25 },
      { id: 54, name: "SERUM LIPASE", category: "Blood Tests", regular_price: 1000, discount_percent: 25 },
      { id: 55, name: "SGOT (AST)", category: "Blood Tests", regular_price: 500, discount_percent: 25 },
      { id: 56, name: "SGPT (ALT)", category: "Blood Tests", regular_price: 500, discount_percent: 25 },
      { id: 57, name: "SHBG", category: "Hormones & Tumour Markers", regular_price: 1500, discount_percent: 25 },
      { id: 58, name: "TSH", category: "Hormones & Tumour Markers", regular_price: 800, discount_percent: 25 },
      { id: 59, name: "T3", category: "Hormones & Tumour Markers", regular_price: 800, discount_percent: 25 },
      { id: 60, name: "T4", category: "Hormones & Tumour Markers", regular_price: 800, discount_percent: 25 },
      { id: 61, name: "Testosterone", category: "Hormones & Tumour Markers", regular_price: 1000, discount_percent: 25 },
      { id: 62, name: "Tg", category: "Blood Tests", regular_price: 300, discount_percent: 25 },
      { id: 63, name: "TgAb", category: "Blood Tests", regular_price: 800, discount_percent: 25 },
      { id: 64, name: "TPHA (Q+Q)", category: "Immunology & Infection", regular_price: 750, discount_percent: 25 },
      { id: 65, name: "TR-AB", category: "Hormones & Tumour Markers", regular_price: 4000, discount_percent: 25 },
      { id: 66, name: "TRIPLE ANTIGEN", category: "Immunology & Infection", regular_price: 900, discount_percent: 25 },
      { id: 67, name: "TROPONIN-I", category: "Blood Tests", regular_price: 1000, discount_percent: 25 },
      { id: 68, name: "TSH", category: "Hormones & Tumour Markers", regular_price: 800, discount_percent: 25 },
      { id: 69, name: "UREA", category: "Blood Tests", regular_price: 400, discount_percent: 25 },
      { id: 70, name: "URIC ACID", category: "Blood Tests", regular_price: 500, discount_percent: 25 },
      { id: 71, name: "URINE ACR", category: "Urine & Stool", regular_price: 900, discount_percent: 25 }
    ]
  });

  const [selectedCategory, setSelectedCategory] = useState("All Tests");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("A-Z");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const set = (k, v) => setData({ ...data, [k]: v });

  const calculateDiscountedPrice = (regularPrice, discountPercent) => {
    const discountAmount = (regularPrice * discountPercent) / 100;
    return Math.round(regularPrice - discountAmount);
  };

  const calculateSave = (regularPrice, discountedPrice) => {
    const save = regularPrice - discountedPrice;
    const savePercent = regularPrice > 0 ? Math.round((save / regularPrice) * 100) : 0;
    return `${save} (${savePercent}%)`;
  };

  const handleAddCategory = (newCategory) => {
    if (!data.categories.includes(newCategory)) {
      setData({ ...data, categories: [...data.categories, newCategory] });
    }
  };

  const handleUpdateCategory = (index, newValue) => {
    const oldValue = data.categories[index];
    const updatedCategories = [...data.categories];
    updatedCategories[index] = newValue;
    
    const updatedTests = data.tests.map(test => {
      if (test.category === oldValue) {
        return { ...test, category: newValue };
      }
      return test;
    });
    
    setData({ ...data, categories: updatedCategories, tests: updatedTests });
    
    if (selectedCategory === oldValue) {
      setSelectedCategory(newValue);
    }
  };

  const handleDeleteCategory = (index) => {
    const categoryToDelete = data.categories[index];
    const updatedCategories = data.categories.filter((_, i) => i !== index);
    const reassignCategory = updatedCategories.length > 0 ? updatedCategories[0] : "Uncategorized";
    
    const updatedTests = data.tests.map(test => {
      if (test.category === categoryToDelete) {
        return { ...test, category: reassignCategory };
      }
      return test;
    });
    
    setData({ ...data, categories: updatedCategories, tests: updatedTests });
    
    if (selectedCategory === categoryToDelete) {
      setSelectedCategory("All Tests");
    }
  };

  const updateTest = (index, field, value) => {
    const updated = [...data.tests];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, tests: updated });
  };

  const addTest = (testData) => {
    const newTest = {
      id: Date.now(),
      name: testData.name,
      category: testData.category,
      regular_price: testData.regular_price,
      discount_percent: testData.discount_percent
    };
    setData({ ...data, tests: [...data.tests, newTest] });
  };

  const removeTest = (index) => {
    const updated = [...data.tests];
    updated.splice(index, 1);
    setData({ ...data, tests: updated });
  };

  // Apply filters and sorting
  let filteredTests = data.tests;

  if (selectedCategory !== "All Tests") {
    filteredTests = filteredTests.filter(test => test.category === selectedCategory);
  }

  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase().trim();
    filteredTests = filteredTests.filter(test => 
      test.name.toLowerCase().includes(term)
    );
  }

  switch (sortOption) {
    case "A-Z":
      filteredTests = [...filteredTests].sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "Z-A":
      filteredTests = [...filteredTests].sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "Price Low":
      filteredTests = [...filteredTests].sort((a, b) => {
        const priceA = calculateDiscountedPrice(a.regular_price, a.discount_percent);
        const priceB = calculateDiscountedPrice(b.regular_price, b.discount_percent);
        return priceA - priceB;
      });
      break;
    case "Price High":
      filteredTests = [...filteredTests].sort((a, b) => {
        const priceA = calculateDiscountedPrice(a.regular_price, a.discount_percent);
        const priceB = calculateDiscountedPrice(b.regular_price, b.discount_percent);
        return priceB - priceA;
      });
      break;
    default:
      break;
  }

  const categories = ["All Tests", ...data.categories];

  return (
    <div>
      {/* Add Test Modal */}
      <AddTestModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addTest}
        categories={data.categories}
      />

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Tag size={15} /> Categories</h3>
        </div>
        <div className="wc-editor-card-body">
          <CategoryManager 
            categories={data.categories}
            onAdd={handleAddCategory}
            onUpdate={handleUpdateCategory}
            onDelete={handleDeleteCategory}
          />
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><List size={15} /> Tests ({data.tests.length})</h3>
          <button className="wc-btn wc-btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={14} /> Add New Test
          </button>
        </div>
        <div className="wc-editor-card-body">
          {/* Filter and Search Section */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr 1fr', 
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div className="wc-field">
              <label className="wc-field-label"><Search size={14} /> Search Test</label>
              <div style={{ position: 'relative' }}>
                <input 
                  className="wc-input" 
                  placeholder="Search test name..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{ paddingLeft: '32px' }}
                />
                <Search size={14} style={{ 
                  position: 'absolute', 
                  left: '10px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: '#94a3b8'
                }} />
              </div>
            </div>
            <div className="wc-field">
              <label className="wc-field-label"><Filter size={14} /> Filter by Category</label>
              <select 
                className="wc-select" 
                value={selectedCategory} 
                onChange={e => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="wc-field">
              <label className="wc-field-label">Sort By</label>
              <select 
                className="wc-select" 
                value={sortOption} 
                onChange={e => setSortOption(e.target.value)}
              >
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="Price Low">Price Low to High</option>
                <option value="Price High">Price High to Low</option>
              </select>
            </div>
          </div>

          {/* Test Table */}
          <div style={{ 
            overflowX: 'auto',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            background: '#fff'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '13px',
              fontFamily: 'var(--font-body, DM Sans, sans-serif)'
            }}>
              <thead style={{ background: '#f8fafc' }}>
                <tr>
                  <th style={{ 
                    padding: '10px 12px', 
                    textAlign: 'center', 
                    fontWeight: 700,
                    color: '#475569',
                    borderBottom: '1px solid #e2e8f0',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    width: '60px'
                  }}>#</th>
                  <th style={{ 
                    padding: '10px 12px', 
                    textAlign: 'left', 
                    fontWeight: 700,
                    color: '#475569',
                    borderBottom: '1px solid #e2e8f0',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>Test Name</th>
                  <th style={{ 
                    padding: '10px 12px', 
                    textAlign: 'left', 
                    fontWeight: 700,
                    color: '#475569',
                    borderBottom: '1px solid #e2e8f0',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>Category</th>
                  <th style={{ 
                    padding: '10px 12px', 
                    textAlign: 'right', 
                    fontWeight: 700,
                    color: '#475569',
                    borderBottom: '1px solid #e2e8f0',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>Regular Price</th>
                  <th style={{ 
                    padding: '10px 12px', 
                    textAlign: 'right', 
                    fontWeight: 700,
                    color: '#475569',
                    borderBottom: '1px solid #e2e8f0',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>Discount %</th>
                  <th style={{ 
                    padding: '10px 12px', 
                    textAlign: 'right', 
                    fontWeight: 700,
                    color: '#014fa1',
                    borderBottom: '1px solid #e2e8f0',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>Discounted</th>
                  <th style={{ 
                    padding: '10px 12px', 
                    textAlign: 'right', 
                    fontWeight: 700,
                    color: '#16a34a',
                    borderBottom: '1px solid #e2e8f0',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>You Save</th>
                  <th style={{ 
                    padding: '10px 12px', 
                    textAlign: 'center', 
                    fontWeight: 700,
                    color: '#475569',
                    borderBottom: '1px solid #e2e8f0',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    width: '80px'
                  }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTests.map((test, index) => {
                  const actualIndex = data.tests.indexOf(test);
                  const discountedPrice = calculateDiscountedPrice(test.regular_price, test.discount_percent);
                  const saveText = calculateSave(test.regular_price, discountedPrice);
                  const serialNumber = index + 1;
                  
                  return (
                    <tr key={test.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ 
                        padding: '8px 12px', 
                        textAlign: 'center',
                        fontWeight: 600,
                        color: '#94a3b8',
                        fontSize: '12px'
                      }}>
                        {serialNumber}
                      </td>
                      <td style={{ padding: '8px 12px' }}>
                        <input 
                          className="wc-input" 
                          value={test.name} 
                          onChange={e => updateTest(actualIndex, "name", e.target.value)}
                          style={{ 
                            border: 'none', 
                            background: 'transparent', 
                            padding: '4px 0',
                            fontSize: '13px',
                            fontWeight: 500
                          }}
                        />
                      </td>
                      <td style={{ padding: '8px 12px' }}>
                        <select 
                          className="wc-select" 
                          value={test.category} 
                          onChange={e => updateTest(actualIndex, "category", e.target.value)}
                          style={{ 
                            border: 'none', 
                            background: 'transparent', 
                            padding: '4px 0',
                            fontSize: '12px',
                            width: '140px'
                          }}
                        >
                          {data.categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </td>
                      <td style={{ padding: '8px 12px', textAlign: 'right' }}>
                        <input 
                          className="wc-input" 
                          type="number"
                          value={test.regular_price} 
                          onChange={e => {
                            const val = parseFloat(e.target.value) || 0;
                            updateTest(actualIndex, "regular_price", val);
                          }}
                          style={{ 
                            border: 'none', 
                            background: 'transparent', 
                            padding: '4px 0',
                            fontSize: '13px',
                            width: '80px',
                            textAlign: 'right',
                            textDecoration: 'line-through',
                            color: '#94a3b8'
                          }}
                        />
                      </td>
                      <td style={{ padding: '8px 12px', textAlign: 'right' }}>
                        <input 
                          className="wc-input" 
                          type="number"
                          min="0"
                          max="100"
                          value={test.discount_percent} 
                          onChange={e => {
                            const val = parseFloat(e.target.value) || 0;
                            const clampedVal = Math.min(Math.max(val, 0), 100);
                            updateTest(actualIndex, "discount_percent", clampedVal);
                          }}
                          style={{ 
                            border: 'none', 
                            background: 'transparent', 
                            padding: '4px 0',
                            fontSize: '13px',
                            width: '60px',
                            textAlign: 'right',
                            fontWeight: 600,
                            color: '#dc2626'
                          }}
                        />
                      </td>
                      <td style={{ padding: '8px 12px', textAlign: 'right' }}>
                        <span style={{ 
                          fontSize: '13px',
                          fontWeight: 700,
                          color: '#014fa1'
                        }}>
                          BDT {discountedPrice}
                        </span>
                      </td>
                      <td style={{ padding: '8px 12px', textAlign: 'right' }}>
                        <span style={{ 
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#16a34a'
                        }}>
                          BDT {saveText}
                        </span>
                      </td>
                      <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                        <button 
                          className="wc-btn wc-btn-danger" 
                          onClick={() => removeTest(actualIndex)}
                          style={{ padding: '4px 8px', fontSize: '11px' }}
                        >
                          <X size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredTests.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px 20px', 
              color: '#94a3b8',
              border: '1px dashed #e2e8f0',
              borderRadius: '8px',
              marginTop: '16px'
            }}>
              <p>No tests found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// SEO Editor
const SeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "Diagnostic Test Price List | Renova Life Care Ltd.",
    meta_description: "Complete diagnostic test price list in BDT. Enjoy up to 25% discount on 216+ investigations. All major tests including blood tests, imaging, and more.",
    og_title: "Complete Diagnostic Test Price List",
    og_description: "All prices in BDT. Enjoy up to 25% discount on 216+ investigations.",
    og_image: "/images/og-price-list.jpg",
    canonical_url: "https://renovalifecare.com/price-list",
    robots: "index, follow",
    keywords: "diagnostic test price list, blood test price Bangladesh, imaging cost, ultrasound price, health checkup cost"
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
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Meta Description</label>
              <textarea className="wc-textarea" value={data.meta_description} onChange={e => set("meta_description", e.target.value)} rows={3} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Keywords</label>
              <input className="wc-input" value={data.keywords} onChange={e => set("keywords", e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestListPage;