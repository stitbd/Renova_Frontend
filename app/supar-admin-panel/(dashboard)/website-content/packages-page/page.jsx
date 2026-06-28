"use client";

import { useState } from "react";
import {
  Package,
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
  Tag,
  AlertCircle,
  Percent
} from "lucide-react";
import "./packages.css";

const PackagesPage = () => {
  const [selectedSection, setSelectedSection] = useState("packages-listing");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const sections = [
    { id: "hero", label: "Hero Section", icon: Layout },
    { id: "packages-listing", label: "Packages List", icon: List },
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
      case "packages-listing":
        return <PackagesListingEditor />;
      case "seo":
        return <SeoEditor />;
      default:
        return <PackagesListingEditor />;
    }
  };

  return (
    <div className="wc-packages-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">Packages</span>
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
                  <Package size={20} />
                </div>
                <div className="wc-page-info-text">
                  <h2>Packages Page</h2>
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
    trust_badge_text: "HEALTH PACKAGES",
    headline: "Our Health Packages & Discounts",
    description: "Comprehensive diagnostic packages for your family's well-being. All prices in BDT."
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

// Add Package Modal Component
const AddPackageModal = ({ isOpen, onClose, onAdd, availableTests }) => {
  const [formData, setFormData] = useState({
    name: "",
    badge: "",
    selectedTests: [],
    discount_percent: 0
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState({});

  const calculateTotalCost = () => {
    const total = formData.selectedTests.reduce((sum, test) => sum + test.price, 0);
    return total;
  };

  const calculateDiscountedPrice = () => {
    const total = calculateTotalCost();
    if (total === 0) return "";
    const discounted = total - (total * formData.discount_percent / 100);
    return `BDT ${Math.round(discounted).toLocaleString()}.00`;
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Package name is required";
    }
    if (formData.selectedTests.length === 0) {
      newErrors.selectedTests = "At least one test must be selected";
    }
    if (formData.discount_percent < 0 || formData.discount_percent > 100) {
      newErrors.discount_percent = "Discount must be between 0 and 100";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const total = calculateTotalCost();
      const discounted = total - (total * formData.discount_percent / 100);
      
      onAdd({
        name: formData.name.trim(),
        badge: formData.badge.trim() || "Health Package",
        items: formData.selectedTests.map(test => ({
          test: test.name,
          price: `BDT ${test.price.toFixed(2)}`
        })),
        total_cost: `BDT ${Math.round(total).toLocaleString()}.00`,
        discounted_price: `BDT ${Math.round(discounted).toLocaleString()}.00`,
        discount_percent: formData.discount_percent
      });
      setFormData({
        name: "",
        badge: "",
        selectedTests: [],
        discount_percent: 0
      });
      setSearchTerm("");
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      badge: "",
      selectedTests: [],
      discount_percent: 0
    });
    setSearchTerm("");
    setErrors({});
    onClose();
  };

  const toggleTestSelection = (test) => {
    const isSelected = formData.selectedTests.some(t => t.id === test.id);
    if (isSelected) {
      setFormData({
        ...formData,
        selectedTests: formData.selectedTests.filter(t => t.id !== test.id)
      });
    } else {
      setFormData({
        ...formData,
        selectedTests: [...formData.selectedTests, test]
      });
    }
  };

  const removeSelectedTest = (testId) => {
    setFormData({
      ...formData,
      selectedTests: formData.selectedTests.filter(t => t.id !== testId)
    });
  };

  const filteredTests = availableTests.filter(test =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  const totalCost = calculateTotalCost();
  const totalCostDisplay = totalCost > 0 ? `BDT ${Math.round(totalCost).toLocaleString()}.00` : "";
  const discountedPriceDisplay = calculateDiscountedPrice();

  return (
    <div className="wc-modal-overlay" onClick={handleClose}>
      <div className="wc-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '750px', maxHeight: '90vh' }}>
        <div className="wc-modal-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={18} style={{ color: '#014fa1' }} />
            Create New Package
          </h3>
          <button className="wc-modal-close" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxHeight: 'calc(90vh - 80px)' }}>
          <div className="wc-modal-body" style={{ overflowY: 'auto', flex: 1 }}>
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
                gap: '8px',
                marginBottom: '16px'
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
                Package Name <span className="required">*</span>
              </label>
              <input 
                className="wc-input" 
                placeholder="e.g. Package-1"
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
                Badge <span className="field-hint">(Optional)</span>
              </label>
              <input 
                className="wc-input" 
                placeholder="e.g. Essential health screening"
                value={formData.badge}
                onChange={e => setFormData({ ...formData, badge: e.target.value })}
              />
            </div>

            <div className="wc-field">
              <label className="wc-field-label">
                Select Tests <span className="required">*</span>
              </label>
              <div style={{ 
                border: `1px solid ${errors.selectedTests ? '#dc2626' : '#e2e8f0'}`,
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  padding: '8px 12px', 
                  background: '#f8fafc',
                  borderBottom: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Search size={14} style={{ color: '#94a3b8' }} />
                  <input 
                    className="wc-input" 
                    placeholder="Search tests..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ border: 'none', background: 'transparent', padding: '4px 0' }}
                  />
                </div>
                <div style={{ maxHeight: '200px', overflowY: 'auto', padding: '8px' }}>
                  {filteredTests.map(test => (
                    <label key={test.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 8px',
                      cursor: 'pointer',
                      borderRadius: '4px',
                      transition: 'background 0.15s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <input 
                        type="checkbox"
                        checked={formData.selectedTests.some(t => t.id === test.id)}
                        onChange={() => toggleTestSelection(test)}
                        style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '13px', flex: 1 }}>{test.name}</span>
                      <span style={{ fontSize: '12px', color: '#94a3b8' }}>BDT {test.price}</span>
                    </label>
                  ))}
                  {filteredTests.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>
                      No tests found
                    </div>
                  )}
                </div>
              </div>
              {errors.selectedTests && (
                <span style={{ fontSize: '12px', color: '#dc2626' }}>{errors.selectedTests}</span>
              )}
            </div>

            {formData.selectedTests.length > 0 && (
              <div className="wc-field">
                <label className="wc-field-label">
                  Selected Tests ({formData.selectedTests.length})
                </label>
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '6px',
                  padding: '8px',
                  background: '#f8fafc',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  maxHeight: '100px',
                  overflowY: 'auto'
                }}>
                  {formData.selectedTests.map(test => (
                    <div key={test.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: '#eff6ff',
                      padding: '4px 8px 4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      border: '1px solid #dbeafe'
                    }}>
                      <span>{test.name}</span>
                      <button
                        type="button"
                        onClick={() => removeSelectedTest(test.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '2px',
                          display: 'flex',
                          alignItems: 'center',
                          color: '#64748b',
                          borderRadius: '50%'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#fee2e2'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="wc-field">
              <label className="wc-field-label">
                Discount % <span className="required">*</span>
              </label>
              <input 
                className="wc-input" 
                type="number"
                min="0"
                max="100"
                placeholder="e.g. 25"
                value={formData.discount_percent}
                onChange={e => {
                  const val = parseFloat(e.target.value) || 0;
                  setFormData({ ...formData, discount_percent: Math.min(Math.max(val, 0), 100) });
                }}
                style={{ borderColor: errors.discount_percent ? '#dc2626' : '' }}
              />
              {errors.discount_percent && (
                <span style={{ fontSize: '12px', color: '#dc2626' }}>{errors.discount_percent}</span>
              )}
            </div>

            {totalCost > 0 && (
              <>
                <div style={{
                  padding: '12px 16px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '13px', color: '#475569' }}>
                    <strong>Total Cost:</strong>
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#94a3b8', textDecoration: 'line-through' }}>
                    {totalCostDisplay}
                  </span>
                </div>

                <div style={{
                  padding: '12px 16px',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '13px', color: '#166534' }}>
                    <strong>Discounted Price:</strong>
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#014fa1' }}>
                    {discountedPriceDisplay}
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="wc-modal-footer">
            <button type="button" className="wc-btn wc-btn-ghost" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="wc-btn wc-btn-primary">
              <Plus size={14} /> Create Package
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Add Test to Package Dropdown Component
const AddTestDropdown = ({ isOpen, onClose, onAddTest, availableTests, currentTests }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter out tests already in the package
  const available = availableTests.filter(test => 
    !currentTests.some(t => t.test === test.name)
  );

  const filteredTests = available.filter(test =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectTest = (test) => {
    onAddTest(test);
    setSearchTerm("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="wc-modal-overlay" onClick={onClose}>
      <div className="wc-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        <div className="wc-modal-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Search size={18} style={{ color: '#014fa1' }} />
            Add Test to Package
          </h3>
          <button className="wc-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="wc-modal-body">
          <div className="wc-field">
            <label className="wc-field-label">Search Tests</label>
            <input 
              className="wc-input" 
              placeholder="Search test name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>

          <div style={{ 
            maxHeight: '300px', 
            overflowY: 'auto',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            marginTop: '8px'
          }}>
            {filteredTests.length > 0 ? (
              filteredTests.map(test => (
                <div
                  key={test.id}
                  onClick={() => handleSelectTest(test)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 12px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f1f5f9',
                    transition: 'background 0.15s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontSize: '13px', flex: 1 }}>{test.name}</span>
                  <span style={{ fontSize: '12px', color: '#94a3b8', marginLeft: '12px' }}>BDT {test.price}</span>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
                {available.length === 0 ? 'All tests already added to this package' : 'No tests found'}
              </div>
            )}
          </div>
        </div>

        <div className="wc-modal-footer">
          <button type="button" className="wc-btn wc-btn-ghost" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Packages Listing Editor
const PackagesListingEditor = () => {
  const [data, setData] = useState({
    packages: [
      {
        id: 1,
        name: "Package-1",
        badge: "Essential health screening",
        items: [
          { test: "Complete Blood Count (CBC)", price: "BDT 400.00" },
          { test: "Random Blood Sugar", price: "BDT 200.00" },
          { test: "Lipid Profile (Random)", price: "BDT 1,400.00" },
          { test: "Blood Grouping & RH Factor", price: "BDT 300.00" },
          { test: "Serum Creatinine", price: "BDT 1,000.00" },
          { test: "Urine R/E", price: "BDT 400.00" },
          { test: "ECG", price: "BDT 400.00" },
          { test: "Digital X-Ray of Chest P/A View (Digital)", price: "BDT 2,500.00" },
          { test: "Ultrasonography of Whole Abdomen", price: "BDT 110.00" }
        ],
        total_cost: "BDT 7,710.00",
        discounted_price: "BDT 5,900.00",
        discount_percent: 25
      },
      {
        id: 2,
        name: "Package-2",
        badge: "Comprehensive wellness check",
        items: [
          { test: "Complete Blood Count (CBC)", price: "BDT 400.00" },
          { test: "Blood Sugar (Fasting & 2 hrs ABF)", price: "BDT 1,400.00" },
          { test: "HbA1c", price: "BDT 1,400.00" },
          { test: "Lipid Profile (Fasting)", price: "BDT 1,000.00" },
          { test: "Serum Creatinine", price: "BDT 400.00" },
          { test: "Serum Uric Acid", price: "BDT 400.00" },
          { test: "Serum Electrolytes", price: "BDT 400.00" },
          { test: "TSH", price: "BDT 400.00" },
          { test: "PSA", price: "BDT 400.00" },
          { test: "Urine R/E", price: "BDT 400.00" },
          { test: "ECG", price: "BDT 400.00" },
          { test: "Digital X-Ray of Chest P/A View (Digital)", price: "BDT 2,500.00" },
          { test: "Ultrasonography of Whole Abdomen", price: "BDT 130.00" }
        ],
        total_cost: "BDT 14,030.00",
        discounted_price: "BDT 10,650.00",
        discount_percent: 25
      },
      {
        id: 3,
        name: "Package-3",
        badge: "Advanced full-body package",
        items: [
          { test: "Complete Blood Count (CBC)", price: "BDT 400.00" },
          { test: "Blood Sugar (Fasting & 2 hrs ABF)", price: "BDT 1,400.00" },
          { test: "HbA1c", price: "BDT 1,400.00" },
          { test: "Lipid Profile (Fasting)", price: "BDT 1,000.00" },
          { test: "Serum Creatinine", price: "BDT 400.00" },
          { test: "Serum Uric Acid", price: "BDT 400.00" },
          { test: "Serum Electrolytes", price: "BDT 400.00" },
          { test: "TSH", price: "BDT 400.00" },
          { test: "PSA", price: "BDT 400.00" },
          { test: "Urine R/E", price: "BDT 400.00" },
          { test: "ECG", price: "BDT 400.00" },
          { test: "Digital X-Ray of Chest P/A View (Digital)", price: "BDT 2,500.00" },
          { test: "Ultrasonography of Whole Abdomen", price: "BDT 130.00" }
        ],
        total_cost: "BDT 16,930.00",
        discounted_price: "BDT 12,850.00",
        discount_percent: 25
      },
      {
        id: 4,
        name: "Package-4",
        badge: "Essential health screening",
        items: [
          { test: "Complete Blood Count (CBC)", price: "BDT 400.00" },
          { test: "Random Blood Sugar", price: "BDT 200.00" },
          { test: "Lipid Profile (Random)", price: "BDT 1,400.00" },
          { test: "Serum Creatinine", price: "BDT 400.00" },
          { test: "Urine R/E", price: "BDT 400.00" },
          { test: "ECG", price: "BDT 400.00" },
          { test: "Digital X-Ray of Chest P/A View (Digital)", price: "BDT 2,500.00" },
          { test: "Ultrasonography of Whole Abdomen", price: "BDT 110.00" }
        ],
        total_cost: "BDT 7,710.00",
        discounted_price: "BDT 5,900.00",
        discount_percent: 25
      },
      {
        id: 5,
        name: "Package-5",
        badge: "Comprehensive wellness check",
        items: [
          { test: "Complete Blood Count (CBC)", price: "BDT 400.00" },
          { test: "Blood Sugar (Fasting & 2 hrs ABF)", price: "BDT 1,400.00" },
          { test: "HbA1c", price: "BDT 1,400.00" },
          { test: "Lipid Profile (Fasting)", price: "BDT 1,000.00" },
          { test: "Serum Creatinine", price: "BDT 400.00" },
          { test: "Serum Uric Acid", price: "BDT 400.00" },
          { test: "Serum Electrolytes", price: "BDT 400.00" },
          { test: "TSH", price: "BDT 400.00" },
          { test: "PSA", price: "BDT 400.00" },
          { test: "Urine R/E", price: "BDT 400.00" },
          { test: "ECG", price: "BDT 400.00" },
          { test: "Digital X-Ray of Chest P/A View (Digital)", price: "BDT 2,500.00" },
          { test: "Ultrasonography of Whole Abdomen", price: "BDT 130.00" }
        ],
        total_cost: "BDT 40,000.00",
        discounted_price: "BDT 20,000.00",
        discount_percent: 50
      },
      {
        id: 6,
        name: "Package-6",
        badge: "Advanced full-body package",
        items: [
          { test: "Complete Blood Count (CBC)", price: "BDT 400.00" },
          { test: "Blood Sugar (Fasting & 2 hrs ABF)", price: "BDT 1,400.00" },
          { test: "HbA1c", price: "BDT 1,400.00" },
          { test: "Lipid Profile (Fasting)", price: "BDT 1,000.00" },
          { test: "Serum Creatinine", price: "BDT 400.00" },
          { test: "Serum Uric Acid", price: "BDT 400.00" },
          { test: "Serum Electrolytes", price: "BDT 400.00" },
          { test: "TSH", price: "BDT 400.00" },
          { test: "PSA", price: "BDT 400.00" },
          { test: "Urine R/E", price: "BDT 400.00" },
          { test: "ECG", price: "BDT 400.00" },
          { test: "Digital X-Ray of Chest P/A View (Digital)", price: "BDT 2,500.00" },
          { test: "Ultrasonography of Whole Abdomen", price: "BDT 130.00" }
        ],
        total_cost: "BDT 40,000.00",
        discounted_price: "BDT 20,000.00",
        discount_percent: 50
      },
      {
        id: 7,
        name: "Package-7",
        badge: "Essential health screening",
        items: [
          { test: "Complete Blood Count (CBC)", price: "BDT 400.00" },
          { test: "Random Blood Sugar", price: "BDT 200.00" },
          { test: "Lipid Profile (Random)", price: "BDT 1,400.00" },
          { test: "Serum Creatinine", price: "BDT 400.00" },
          { test: "Serum Uric Acid", price: "BDT 400.00" },
          { test: "Serum Electrolytes", price: "BDT 400.00" },
          { test: "TSH", price: "BDT 400.00" },
          { test: "PSA", price: "BDT 400.00" },
          { test: "Urine R/E", price: "BDT 400.00" },
          { test: "ECG", price: "BDT 400.00" },
          { test: "Digital X-Ray of Chest P/A View (Digital)", price: "BDT 2,500.00" },
          { test: "Ultrasonography of Whole Abdomen", price: "BDT 130.00" }
        ],
        total_cost: "BDT 10,000.00",
        discounted_price: "BDT 5,900.00",
        discount_percent: 25
      },
      {
        id: 8,
        name: "Package-8",
        badge: "Comprehensive wellness check",
        items: [
          { test: "Complete Blood Count (CBC)", price: "BDT 400.00" },
          { test: "Random Blood Sugar", price: "BDT 200.00" },
          { test: "Lipid Profile (Random)", price: "BDT 1,400.00" },
          { test: "Serum Creatinine", price: "BDT 400.00" },
          { test: "Serum Uric Acid", price: "BDT 400.00" },
          { test: "Serum Electrolytes", price: "BDT 400.00" },
          { test: "TSH", price: "BDT 400.00" },
          { test: "PSA", price: "BDT 400.00" },
          { test: "Urine R/E", price: "BDT 400.00" },
          { test: "ECG", price: "BDT 400.00" },
          { test: "Digital X-Ray of Chest P/A View (Digital)", price: "BDT 2,500.00" },
          { test: "Ultrasonography of Whole Abdomen", price: "BDT 130.00" }
        ],
        total_cost: "BDT 14,030.00",
        discounted_price: "BDT 10,650.00",
        discount_percent: 25
      }
    ]
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const availableTests = [
    { id: 1, name: "ALBUMIN (serum)", price: 300 },
    { id: 2, name: "ALK. PHOSPHATE", price: 300 },
    { id: 3, name: "AMH (ANTI MULLERIAN HORMONE)", price: 3000 },
    { id: 4, name: "AMYLASE", price: 1100 },
    { id: 5, name: "ANA/ANF", price: 1000 },
    { id: 6, name: "ANTI CARDIOLIPIN AB", price: 3000 },
    { id: 7, name: "ANTI CCP Antibody", price: 1200 },
    { id: 8, name: "ANTI ds DNA", price: 1300 },
    { id: 9, name: "ANTI PHOSPHOLIPID AB", price: 2400 },
    { id: 10, name: "ANTI THYROID AB", price: 2200 },
    { id: 11, name: "ANTI-HBe/HBeAb/A-HBeA", price: 1000 },
    { id: 12, name: "ANTI-HCV", price: 1000 },
    { id: 13, name: "ASO TITRE", price: 600 },
    { id: 14, name: "B-HCG", price: 1100 },
    { id: 15, name: "B.SUGAR FASTING (FBS)", price: 200 },
    { id: 16, name: "B.SUGAR RANDOM (RBS)", price: 200 },
    { id: 17, name: "B/S 2HRS.ABF", price: 200 },
    { id: 18, name: "BASAL CORTISOL MORNING", price: 1000 },
    { id: 19, name: "BETA2 MICROGLOBULIN", price: 1000 },
    { id: 20, name: "BILIRUBIN (Total)", price: 300 },
    { id: 21, name: "Bilirubin D/T", price: 500 },
    { id: 22, name: "BLOOD C/S (Fan Method)", price: 1500 },
    { id: 23, name: "BLOOD FILM", price: 300 },
    { id: 24, name: "BLOOD GROUP (ABO+RH)", price: 200 },
    { id: 25, name: "BONE MARROW", price: 3000 },
    { id: 26, name: "CA-125", price: 1000 },
    { id: 27, name: "CA-153", price: 1000 },
    { id: 28, name: "CA-199", price: 1000 },
    { id: 29, name: "CALCIUM", price: 500 },
    { id: 30, name: "CEA", price: 1000 },
    { id: 31, name: "Complete Blood Count (CBC)", price: 400 },
    { id: 32, name: "Random Blood Sugar", price: 200 },
    { id: 33, name: "Lipid Profile (Random)", price: 1400 },
    { id: 34, name: "Blood Grouping & RH Factor", price: 300 },
    { id: 35, name: "Serum Creatinine", price: 1000 },
    { id: 36, name: "HBsAg", price: 1100 },
    { id: 37, name: "Urine R/E", price: 400 },
    { id: 38, name: "ECG", price: 400 },
    { id: 39, name: "Digital X-Ray of Chest P/A View (Digital)", price: 2500 },
    { id: 40, name: "Ultrasonography of Whole Abdomen", price: 110 },
    { id: 41, name: "Blood Sugar (Fasting & 2 hrs ABF)", price: 1400 },
    { id: 42, name: "HbA1c", price: 1400 },
    { id: 43, name: "Lipid Profile (Fasting)", price: 1000 },
    { id: 44, name: "Serum Uric Acid", price: 600 },
    { id: 45, name: "Serum Electrolytes", price: 1000 },
    { id: 46, name: "TSH", price: 800 },
    { id: 47, name: "PSA", price: 1000 }
  ];

  const updatePackage = (index, field, value) => {
    const updated = [...data.packages];
    updated[index] = { ...updated[index], [field]: value };
    
    if (field === 'discount_percent') {
      const totalCost = parseFloat(updated[index].total_cost.replace(/[^0-9.]/g, ''));
      if (!isNaN(totalCost) && totalCost > 0) {
        const discounted = totalCost - (totalCost * value / 100);
        updated[index].discounted_price = `BDT ${Math.round(discounted).toLocaleString()}.00`;
      }
    }
    
    setData({ ...data, packages: updated });
  };

  const updateItem = (pkgIndex, itemIndex, field, value) => {
    // Only allow updating test name, not price
    if (field === 'test') {
      const updated = [...data.packages];
      const items = [...updated[pkgIndex].items];
      items[itemIndex] = { ...items[itemIndex], [field]: value };
      updated[pkgIndex].items = items;
      setData({ ...data, packages: updated });
    }
  };

  const addItemToPackage = (pkgIndex, test) => {
    const updated = [...data.packages];
    updated[pkgIndex].items.push({ test: test.name, price: `BDT ${test.price.toFixed(2)}` });
    
    const totalCost = updated[pkgIndex].items.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      return sum + (isNaN(price) ? 0 : price);
    }, 0);
    
    updated[pkgIndex].total_cost = `BDT ${Math.round(totalCost).toLocaleString()}.00`;
    
    const discountPercent = updated[pkgIndex].discount_percent || 0;
    const discounted = totalCost - (totalCost * discountPercent / 100);
    updated[pkgIndex].discounted_price = `BDT ${Math.round(discounted).toLocaleString()}.00`;
    
    setData({ ...data, packages: updated });
    setDropdownOpen(null);
  };

  const removeItem = (pkgIndex, itemIndex) => {
    const updated = [...data.packages];
    updated[pkgIndex].items = updated[pkgIndex].items.filter((_, i) => i !== itemIndex);
    
    const totalCost = updated[pkgIndex].items.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      return sum + (isNaN(price) ? 0 : price);
    }, 0);
    
    updated[pkgIndex].total_cost = `BDT ${Math.round(totalCost).toLocaleString()}.00`;
    
    const discountPercent = updated[pkgIndex].discount_percent || 0;
    const discounted = totalCost - (totalCost * discountPercent / 100);
    updated[pkgIndex].discounted_price = `BDT ${Math.round(discounted).toLocaleString()}.00`;
    
    setData({ ...data, packages: updated });
  };

  const addPackage = (packageData) => {
    const newPkg = {
      id: Date.now(),
      name: packageData.name,
      badge: packageData.badge,
      items: packageData.items,
      total_cost: packageData.total_cost,
      discounted_price: packageData.discounted_price,
      discount_percent: packageData.discount_percent || 0
    };
    setData({ ...data, packages: [...data.packages, newPkg] });
  };

  const removePackage = (index) => {
    const updated = [...data.packages];
    updated.splice(index, 1);
    setData({ ...data, packages: updated });
  };

  return (
    <div>
      <AddPackageModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addPackage}
        availableTests={availableTests}
      />

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Package size={15} /> Health Packages ({data.packages.length})</h3>
          <button className="wc-btn wc-btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={14} /> Add New Package
          </button>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-packages-grid">
            {data.packages.map((pkg, pkgIndex) => (
              <div key={pkg.id} className="wc-package-card">
                <div className="wc-package-header">
                  <input 
                    className="wc-input" 
                    value={pkg.name} 
                    onChange={e => updatePackage(pkgIndex, "name", e.target.value)}
                    style={{ fontWeight: 700 }}
                    placeholder="Package Name"
                  />
                  <input 
                    className="wc-input" 
                    value={pkg.badge} 
                    onChange={e => updatePackage(pkgIndex, "badge", e.target.value)}
                    style={{ width: '40%' }}
                    placeholder="Badge"
                  />
                </div>
                
                <div className="wc-package-items">
                  {pkg.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="wc-package-item">
                      <input 
                        className="wc-input" 
                        value={item.test} 
                        onChange={e => updateItem(pkgIndex, itemIndex, "test", e.target.value)}
                        style={{ flex: 2 }}
                        placeholder="Test name"
                      />
                      <input 
                        className="wc-input" 
                        value={item.price} 
                        readOnly
                        style={{ flex: 1, background: '#f8fafc', cursor: 'not-allowed', color: '#64748b' }}
                      />
                      <button className="wc-btn wc-btn-danger" onClick={() => removeItem(pkgIndex, itemIndex)}>
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <button className="wc-btn wc-btn-ghost" onClick={() => setDropdownOpen(pkgIndex)}>
                    <Plus size={14} /> Add Test Item
                  </button>
                </div>

                <div className="wc-package-pricing" style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 0.5fr 1fr', 
                  gap: '8px',
                  alignItems: 'end'
                }}>
                  <div className="wc-field">
                    <label className="wc-field-label" style={{ fontSize: '11px', color: '#94a3b8' }}>Total Cost</label>
                    <input 
                      className="wc-input" 
                      value={pkg.total_cost} 
                      readOnly
                      style={{ textDecoration: 'line-through', color: '#94a3b8', cursor: 'not-allowed', background: '#f8fafc' }}
                    />
                  </div>
                  <div className="wc-field">
                    <label className="wc-field-label" style={{ fontSize: '11px', color: '#94a3b8' }}>Discount %</label>
                    <input 
                      className="wc-input" 
                      type="number"
                      min="0"
                      max="100"
                      value={pkg.discount_percent || 0}
                      onChange={e => {
                        const val = parseFloat(e.target.value) || 0;
                        updatePackage(pkgIndex, "discount_percent", Math.min(Math.max(val, 0), 100));
                      }}
                      style={{ fontWeight: 600, color: '#dc2626', textAlign: 'center' }}
                    />
                  </div>
                  <div className="wc-field">
                    <label className="wc-field-label" style={{ fontSize: '11px', color: '#94a3b8' }}>Discounted Price</label>
                    <input 
                      className="wc-input" 
                      value={pkg.discounted_price} 
                      readOnly
                      style={{ borderColor: '#014fa1', fontWeight: 700, color: '#014fa1', cursor: 'not-allowed', background: '#f0fdf4' }}
                    />
                  </div>
                </div>
                <button className="wc-btn wc-btn-danger" onClick={() => removePackage(pkgIndex)}>
                  <Trash size={14} /> Remove Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {dropdownOpen !== null && (
        <AddTestDropdown
          isOpen={dropdownOpen !== null}
          onClose={() => setDropdownOpen(null)}
          onAddTest={(test) => addItemToPackage(dropdownOpen, test)}
          availableTests={availableTests}
          currentTests={data.packages[dropdownOpen]?.items || []}
        />
      )}
    </div>
  );
};

// SEO Editor
const SeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "Health Packages & Discounts | Renova Life Care Ltd.",
    meta_description: "Comprehensive diagnostic packages for your family's well-being. All prices in BDT.",
    og_title: "Our Health Packages & Discounts",
    og_description: "Comprehensive diagnostic packages for your family's well-being.",
    og_image: "/images/og-packages.jpg",
    canonical_url: "https://renovalifecare.com/packages",
    robots: "index, follow",
    keywords: "health packages Bangladesh, diagnostic packages, health checkup BDT"
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

export default PackagesPage;