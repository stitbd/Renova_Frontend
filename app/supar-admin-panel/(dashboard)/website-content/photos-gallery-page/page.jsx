"use client";

import { useState, useRef } from "react";
import {
  Image as ImageIcon,
  Layout,
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
  Grid,
  FolderOpen,
  ExternalLink,
  Upload,
  Calendar,
  Tag,
  Heart,
  ZoomIn
} from "lucide-react";
import "./photos-gallery.css";

const PhotosGalleryPage = () => {
  const [selectedSection, setSelectedSection] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const sections = [
    { id: "hero", label: "Hero Section", icon: Layout },
    { id: "photo-gallery", label: "Photo Gallery", icon: ImageIcon },
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
      case "photo-gallery":
        return <PhotoGalleryEditor />;
      case "seo":
        return <SeoEditor />;
      default:
        return <HeroEditor />;
    }
  };

  return (
    <div className="wc-photos-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">Photos Gallery</span>
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
                  <ImageIcon size={20} />
                </div>
                <div className="wc-page-info-text">
                  <h2>Photos Gallery</h2>
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
    trust_badge_text: "PHOTO GALLERY",
    headline: "Explore Our Medical Facilities",
    description: "A visual journey through our state-of-the-art healthcare center, expert medical team, and commitment to patient care.",
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

// Photo Upload Component
const PhotoUpload = ({ value, onChange, onRemove }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const imageUrls = files.map(file => URL.createObjectURL(file));
    onChange?.(imageUrls);
    
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
    onRemove?.();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        multiple
        onChange={handleFileSelect}
      />
      {value ? (
        <div className="wc-photo-preview">
          <img src={value} alt="Photo" />
          <div className="wc-photo-preview-actions">
            <button
              className="wc-img-action-btn"
              onClick={triggerUpload}
              title="Replace image"
            >
              <Upload size={12} />
            </button>
            <button
              className="wc-img-action-btn"
              onClick={removeImage}
              title="Remove image"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      ) : (
        <div className="wc-image-upload" onClick={triggerUpload}>
          <div className="wc-image-upload-icon"><Upload size={20} /></div>
          <p>Click to browse</p>
          <span>PNG, JPG, WEBP</span>
        </div>
      )}
    </div>
  );
};

// Photo Gallery Editor
const PhotoGalleryEditor = () => {
  const [data, setData] = useState({
    section_label: "Photo Gallery",
    heading: "Our Medical Facilities",
    subheading: "Explore our state-of-the-art facilities and compassionate care.",
    categories: [
      { id: "all", label: "All Photos", count: 26 },
      { id: "facilities", label: "Facilities", count: 8 },
      { id: "doctors", label: "Doctors", count: 6 }
    ],
    photos: [
      { id: 1, title: "Reception Area", category: "facilities", alt: "Modern reception area", image: "" },
      { id: 2, title: "Doctor's Consultation", category: "doctors", alt: "Doctor consulting patient", image: "" }
    ]
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  const updateCategory = (index, field, value) => {
    const updated = [...data.categories];
    updated[index] = { ...updated[index], [field]: value };
    set("categories", updated);
  };

  const addCategory = () => {
    set("categories", [...data.categories, { id: Date.now(), label: "New Category", count: 0 }]);
  };

  const removeCategory = (index) => {
    const updated = [...data.categories];
    updated.splice(index, 1);
    set("categories", updated);
  };

  const updatePhoto = (index, field, value) => {
    const updated = [...data.photos];
    updated[index] = { ...updated[index], [field]: value };
    set("photos", updated);
  };

  const addPhoto = () => {
    set("photos", [...data.photos, { 
      id: Date.now(), 
      title: "", 
      category: "", 
      alt: "", 
      image: "" 
    }]);
  };

  const removePhoto = (index) => {
    const updated = [...data.photos];
    if (updated[index].image && updated[index].image.startsWith('blob:')) {
      URL.revokeObjectURL(updated[index].image);
    }
    updated.splice(index, 1);
    set("photos", updated);
  };

  const handlePhotoUpload = (index, imageUrls) => {
    if (imageUrls && imageUrls.length > 0) {
      updatePhoto(index, "image", imageUrls[0]);
    }
  };

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><ImageIcon size={15} /> Gallery Section</h3>
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
          <h3 className="wc-editor-card-title"><Grid size={15} /> Gallery Categories</h3>
          <button className="wc-btn wc-btn-ghost" onClick={addCategory}>
            <Plus size={14} /> Add Category
          </button>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-gallery-categories">
            {data.categories.map((cat, i) => (
              <div key={i} className="wc-gallery-category">
                <input 
                  className="wc-input" 
                  value={cat.label} 
                  onChange={e => updateCategory(i, "label", e.target.value)} 
                  placeholder="Category name"
                />
                <input 
                  className="wc-input" 
                  value={cat.count} 
                  onChange={e => updateCategory(i, "count", e.target.value)} 
                  placeholder="Count"
                  style={{ width: '80px' }}
                />
                <button 
                  className="wc-btn wc-btn-danger" 
                  onClick={() => removeCategory(i)}
                  disabled={data.categories.length <= 1}
                >
                  <Trash size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><ImageIcon size={15} /> Photos ({data.photos.length})</h3>
          <span className="wc-editor-card-desc">Click on image to upload</span>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-photo-grid">
            {data.photos.map((photo, index) => (
              <div key={photo.id} className="wc-photo-item">
                <div className="wc-photo-thumb">
                  <PhotoUpload 
                    value={photo.image}
                    onChange={(urls) => handlePhotoUpload(index, urls)}
                    onRemove={() => removePhoto(index)}
                  />
                </div>
                <div className="wc-photo-info">
                  <input 
                    className="wc-input" 
                    placeholder="Photo Title" 
                    value={photo.title}
                    onChange={e => updatePhoto(index, "title", e.target.value)}
                  />
                  <input 
                    className="wc-input" 
                    placeholder="Category (e.g., facilities, doctors)" 
                    value={photo.category}
                    onChange={e => updatePhoto(index, "category", e.target.value)}
                  />
                  <input 
                    className="wc-input" 
                    placeholder="Alt Text" 
                    value={photo.alt}
                    onChange={e => updatePhoto(index, "alt", e.target.value)}
                  />
                  <button 
                    className="wc-btn wc-btn-danger" 
                    onClick={() => removePhoto(index)}
                  >
                    <Trash size={14} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="wc-repeater-add" onClick={addPhoto}>
            <Plus size={14} /> Add Photo
          </button>
        </div>
      </div>
    </div>
  );
};

// SEO Editor
const SeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "Photo Gallery — Medical Facilities | Renova Life Care",
    meta_description: "Explore our state-of-the-art medical facilities through our photo gallery.",
    og_title: "Photo Gallery | Renova Life Care",
    og_description: "A visual journey through our healthcare center.",
    og_image: "/images/og-gallery.jpg",
    canonical_url: "https://renovalifecare.com/photos",
    robots: "index, follow",
    keywords: "Renova Life Care gallery, medical facilities photos"
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

export default PhotosGalleryPage;