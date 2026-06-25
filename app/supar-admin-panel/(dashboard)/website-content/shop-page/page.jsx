"use client";

import { useState } from "react";
import {
  ShoppingBag,
  Layout,
  Grid,
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
  Tag,
  Star,
  Heart,
  Users,
  Calendar,
  MessageCircle,
  Award,
  ExternalLink,
  Upload,
  List,
  Filter,
  DollarSign,
  Package,
  ShoppingCart
} from "lucide-react";
import "./shop.css";

const ShopPage = () => {
  const [selectedSection, setSelectedSection] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const sections = [
    { id: "hero", label: "Hero Section", icon: Layout },
    { id: "products", label: "Products", icon: Package },
    { id: "categories", label: "Categories", icon: Grid },
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
      case "products":
        return <ProductsEditor />;
      case "categories":
        return <CategoriesEditor />;
      case "seo":
        return <SeoEditor />;
      default:
        return <HeroEditor />;
    }
  };

  return (
    <div className="wc-shop-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">Shop</span>
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
                  <ShoppingBag size={20} />
                </div>
                <div className="wc-page-info-text">
                  <h2>Shop Page</h2>
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
    trust_badge_text: "SHOP",
    headline: "Shop Health & Wellness Products",
    description: "Discover high-quality health products, supplements, and wellness essentials curated by our experts.",
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

// Products Editor
const ProductsEditor = () => {
  const [data, setData] = useState({
    section_label: "Featured Products",
    heading: "Premium Health Products",
    subheading: "Carefully selected for your health and wellness journey.",
    products: []
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Package size={15} /> Products Section</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field">
              <label className="wc-field-label">Section Label</label>
              <input className="wc-input" value={data.section_label} onChange={e => set("section_label", e.target.value)} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Heading <span className="required">*</span></label>
              <input className="wc-input" value={data.heading} onChange={e => set("heading", e.target.value)} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Sub Heading</label>
              <textarea className="wc-textarea" value={data.subheading} onChange={e => set("subheading", e.target.value)} rows={2} />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Package size={15} /> Product Cards</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-products-grid">
            <div className="wc-product-card">
              <div className="wc-product-image">
                <ImageUploadField label="Product Image" hint="Recommended: 300×300px" />
              </div>
              <div className="wc-product-info">
                <input className="wc-input" placeholder="Product Name" />
                <input className="wc-input" placeholder="Product Category" />
                <div className="wc-product-pricing">
                  <input className="wc-input" placeholder="Original Price" />
                  <input className="wc-input" placeholder="Discounted Price" style={{ fontWeight: 700 }} />
                </div>
                <div className="wc-product-rating">
                  <input className="wc-input" placeholder="Rating (e.g. 4.5)" style={{ width: '50%' }} />
                  <input className="wc-input" placeholder="Reviews (e.g. 120)" style={{ width: '50%' }} />
                </div>
                <ToggleSwitch label="In Stock" checked={true} />
                <button className="wc-btn wc-btn-danger"><Trash size={14} /> Remove Product</button>
              </div>
            </div>
          </div>
          <button className="wc-repeater-add"><Plus size={14} /> Add Product</button>
        </div>
      </div>
    </div>
  );
};

// Categories Editor
const CategoriesEditor = () => {
  const [data, setData] = useState({
    section_label: "Shop by Category",
    heading: "Browse Categories",
    subheading: "Find what you need quickly by exploring our product categories.",
    categories: []
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Grid size={15} /> Categories Section</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field">
              <label className="wc-field-label">Section Label</label>
              <input className="wc-input" value={data.section_label} onChange={e => set("section_label", e.target.value)} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Heading <span className="required">*</span></label>
              <input className="wc-input" value={data.heading} onChange={e => set("heading", e.target.value)} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Sub Heading</label>
              <textarea className="wc-textarea" value={data.subheading} onChange={e => set("subheading", e.target.value)} rows={2} />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Grid size={15} /> Category Items</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-categories-grid">
            <div className="wc-category-item">
              <div className="wc-category-icon">
                <input className="wc-input" placeholder="Icon Name (e.g. heart)" />
              </div>
              <input className="wc-input" placeholder="Category Name" />
              <input className="wc-input" placeholder="Product Count (e.g. 24)" />
              <button className="wc-btn wc-btn-danger"><Trash size={14} /></button>
            </div>
          </div>
          <button className="wc-repeater-add"><Plus size={14} /> Add Category</button>
        </div>
      </div>
    </div>
  );
};

// SEO Editor
const SeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "Health & Wellness Shop | Renova Life Care",
    meta_description: "Shop high-quality health products, supplements, and wellness essentials.",
    og_title: "Health & Wellness Shop",
    og_description: "Curated health products for your wellness journey.",
    og_image: "/images/og-shop.jpg",
    canonical_url: "https://renovalifecare.com/shop",
    robots: "index, follow",
    keywords: "health products, wellness shop, supplements Bangladesh"
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

// Helper Components (ImageUploadField, Repeater, ToggleSwitch)
const ImageUploadField = ({ label, hint }) => {
  return (
    <div className="wc-field">
      <label className="wc-field-label">{label}</label>
      <div className="wc-image-upload">
        <div className="wc-image-upload-icon"><Upload size={20} /></div>
        <p>Click to browse</p>
        <span>{hint}</span>
      </div>
    </div>
  );
};

const ToggleSwitch = ({ label, checked }) => {
  return (
    <div className="wc-toggle-row">
      <div className="wc-toggle-info">
        <h4>{label}</h4>
      </div>
      <label className="wc-switch">
        <input type="checkbox" defaultChecked={checked} />
        <span className="wc-switch-slider" />
      </label>
    </div>
  );
};

export default ShopPage;