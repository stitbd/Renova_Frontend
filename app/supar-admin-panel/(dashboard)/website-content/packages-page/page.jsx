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
  Users,
  Calendar,
  MessageCircle,
  Award,
  ExternalLink,
  Upload,
  GripVertical
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
    description: "Comprehensive diagnostic packages for your family's well-being. All prices in BDT.",
    background_images: [],
    stats: []
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

// Packages Listing Editor with all 8 packages from image
const PackagesListingEditor = () => {
  const [data, setData] = useState({
    custom_note: "Custom packages available for corporate health programs.",
    contact_link_text: "Contact us →",
    contact_link_url: "/contact",
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
        discounted_price: "BDT 5,900.00"
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
        discounted_price: "BDT 10,650.00"
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
        discounted_price: "BDT 12,850.00"
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
        discounted_price: "BDT 5,900.00"
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
        discounted_price: "BDT 20,000.00"
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
        discounted_price: "BDT 20,000.00"
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
        discounted_price: "BDT 5,900.00"
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
        discounted_price: "BDT 10,650.00"
      }
    ]
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  const updatePackage = (index, field, value) => {
    const updated = [...data.packages];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, packages: updated });
  };

  const updateItem = (pkgIndex, itemIndex, field, value) => {
    const updated = [...data.packages];
    const items = [...updated[pkgIndex].items];
    items[itemIndex] = { ...items[itemIndex], [field]: value };
    updated[pkgIndex].items = items;
    setData({ ...data, packages: updated });
  };

  const addItem = (pkgIndex) => {
    const updated = [...data.packages];
    updated[pkgIndex].items.push({ test: "New Test", price: "BDT 0.00" });
    setData({ ...data, packages: updated });
  };

  const removeItem = (pkgIndex, itemIndex) => {
    const updated = [...data.packages];
    updated[pkgIndex].items = updated[pkgIndex].items.filter((_, i) => i !== itemIndex);
    setData({ ...data, packages: updated });
  };

  const addPackage = () => {
    const newPkg = {
      id: Date.now(),
      name: `Package-${data.packages.length + 1}`,
      badge: "New package",
      items: [{ test: "New Test", price: "BDT 0.00" }],
      total_cost: "BDT 0.00",
      discounted_price: "BDT 0.00"
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
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Info size={15} /> Bottom Note</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Custom Package Note</label>
              <input className="wc-input" value={data.custom_note} onChange={e => set("custom_note", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Contact Link Text</label>
              <input className="wc-input" value={data.contact_link_text} onChange={e => set("contact_link_text", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Contact Link URL</label>
              <input className="wc-input" value={data.contact_link_url} onChange={e => set("contact_link_url", e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Package size={15} /> Health Packages ({data.packages.length})</h3>
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
                    placeholder="Badge (e.g. SAVE 13%)"
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
                        onChange={e => updateItem(pkgIndex, itemIndex, "price", e.target.value)}
                        style={{ flex: 1 }}
                        placeholder="BDT 0.00"
                      />
                      <button className="wc-btn wc-btn-danger" onClick={() => removeItem(pkgIndex, itemIndex)}>
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <button className="wc-btn wc-btn-ghost" onClick={() => addItem(pkgIndex)}>
                    <Plus size={14} /> Add Test Item
                  </button>
                </div>

                <div className="wc-package-pricing">
                  <input 
                    className="wc-input" 
                    value={pkg.total_cost} 
                    onChange={e => updatePackage(pkgIndex, "total_cost", e.target.value)}
                    placeholder="Total Cost (strikethrough)"
                  />
                  <input 
                    className="wc-input" 
                    value={pkg.discounted_price} 
                    onChange={e => updatePackage(pkgIndex, "discounted_price", e.target.value)}
                    style={{ borderColor: '#014fa1', fontWeight: 700 }}
                    placeholder="Discounted Price"
                  />
                </div>
                <button className="wc-btn wc-btn-danger" onClick={() => removePackage(pkgIndex)}>
                  <Trash size={14} /> Remove Package
                </button>
              </div>
            ))}
          </div>
          <button className="wc-repeater-add" onClick={addPackage}>
            <Plus size={14} /> Add Package
          </button>
        </div>
      </div>
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