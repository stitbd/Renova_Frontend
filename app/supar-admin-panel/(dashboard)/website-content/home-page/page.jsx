// app/supar-admin-panel/website-content/home-page/page.jsx
"use client";

import { useState, useRef } from "react";
import {
  Home,
  Layout,
  Search,
  Eye,
  Save,
  RefreshCw,
  Check,
  Users,
  Image as ImageIcon,
  List,
  Upload,
  Plus,
  X,
  Clock,
  ExternalLink,
  ChevronDown,
  Heart,
  Award,
  Stethoscope,
  Calendar,
  Globe
} from "lucide-react";
import "./home.css";
import "../website-content.css";

const HomePage = () => {
  const [selectedSection, setSelectedSection] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  // Section definitions for Home page
  const sections = [
    { id: "hero", label: "Hero Section", icon: Layout },
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
      case "seo":
        return <SeoEditor />;
      default:
        return <HeroEditor />;
    }
  };

  return (
    <div className="wc-home-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">Home</span>
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
                  <Home size={20} />
                </div>
                <div className="wc-page-info-text">
                  <h2>Home Page</h2>
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

// Hero Editor Component with Image Upload
const HeroEditor = () => {
  const [data, setData] = useState({
    badge_text: "BANGLADESH'S MOST TRUSTED HEALTHCARE",
    headline: "Your Health, Our Priority — Expert Care, Every Step",
    description: "Renova Life Care Ltd. delivers world-class healthcare services across Bangladesh.\nFrom general checkups to specialized treatments, our expert doctors are here for you.\nExperience compassionate, world-class medicine with a personal touch.",
    background_images: [
      { id: 1, url: "/images/hero-bg-1.jpg", alt: "Hero Background 1" },
      { id: 2, url: "/images/hero-bg-2.jpg", alt: "Hero Background 2" },
      { id: 3, url: "/images/hero-bg-3.jpg", alt: "Hero Background 3" }
    ],
    patient_images: [],
    stats: [
      { label: "Happy Patients", value: "15,000+" },
      { label: "Expert Doctors", value: "120+" },
      { label: "Departments", value: "25+" },
      { label: "Years Experience", value: "15+" }
    ]
  });

  const fileInputRef = useRef(null);
  const patientFileInputRef = useRef(null);
  const currentImageId = useRef(null);

  const set = (k, v) => setData({ ...data, [k]: v });

  // Handle file selection for background images
  const handleBackgroundFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const newImages = files.map((file, index) => ({
      id: Date.now() + index,
      url: URL.createObjectURL(file),
      alt: file.name || "Hero Background",
      file: file,
      fileName: file.name,
      fileSize: file.size
    }));

    if (currentImageId.current) {
      // Replace specific image
      const updatedImages = data.background_images.map(img => 
        img.id === currentImageId.current ? newImages[0] : img
      );
      set("background_images", updatedImages);
      currentImageId.current = null;
    } else {
      // Add multiple images
      set("background_images", [...data.background_images, ...newImages]);
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Trigger file input for background images
  const triggerBackgroundUpload = (id = null) => {
    currentImageId.current = id;
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file selection for patient images
  const handlePatientFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const newImages = files.map((file, index) => ({
      id: Date.now() + index,
      url: URL.createObjectURL(file),
      alt: file.name || "Patient Image",
      file: file,
      fileName: file.name,
      fileSize: file.size
    }));

    if (currentImageId.current) {
      // Replace specific image
      const updatedImages = data.patient_images.map(img => 
        img.id === currentImageId.current ? newImages[0] : img
      );
      set("patient_images", updatedImages);
      currentImageId.current = null;
    } else {
      // Add multiple images
      set("patient_images", [...data.patient_images, ...newImages]);
    }
    
    // Reset file input
    if (patientFileInputRef.current) {
      patientFileInputRef.current.value = '';
    }
  };

  // Trigger file input for patient images
  const triggerPatientUpload = (id = null) => {
    currentImageId.current = id;
    if (patientFileInputRef.current) {
      patientFileInputRef.current.click();
    }
  };

  const addBackgroundImage = () => {
    triggerBackgroundUpload();
  };

  const removeBackgroundImage = (id) => {
    const imageToRemove = data.background_images.find(img => img.id === id);
    if (imageToRemove && imageToRemove.url && imageToRemove.url.startsWith('blob:')) {
      URL.revokeObjectURL(imageToRemove.url);
    }
    set("background_images", data.background_images.filter(img => img.id !== id));
  };

  const updateBackgroundImage = (id, field, value) => {
    set("background_images", data.background_images.map(img =>
      img.id === id ? { ...img, [field]: value } : img
    ));
  };

  const addPatientImage = () => {
    triggerPatientUpload();
  };

  const removePatientImage = (id) => {
    const imageToRemove = data.patient_images.find(img => img.id === id);
    if (imageToRemove && imageToRemove.url && imageToRemove.url.startsWith('blob:')) {
      URL.revokeObjectURL(imageToRemove.url);
    }
    set("patient_images", data.patient_images.filter(img => img.id !== id));
  };

  const updatePatientImage = (id, field, value) => {
    set("patient_images", data.patient_images.map(img =>
      img.id === id ? { ...img, [field]: value } : img
    ));
  };

  return (
    <div className="wc-home-editor">
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        multiple
        onChange={handleBackgroundFileSelect}
      />
      <input
        type="file"
        ref={patientFileInputRef}
        style={{ display: 'none' }}
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        multiple
        onChange={handlePatientFileSelect}
      />

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Layout size={15} /> Hero Content</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">
                <Award size={13} /> Badge Text
              </label>
              <input
                className="wc-input"
                value={data.badge_text}
                onChange={e => set("badge_text", e.target.value)}
                placeholder="e.g., BANGLADESH'S MOST TRUSTED HEALTHCARE"
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">
                <Stethoscope size={13} /> Main Headline <span className="required">*</span>
              </label>
              <textarea
                className="wc-textarea"
                value={data.headline}
                onChange={e => set("headline", e.target.value)}
                rows={2}
                placeholder="Your Health, Our Priority — Expert Care, Every Step"
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">
                <Heart size={13} /> Description
              </label>
              <textarea
                className="wc-textarea"
                value={data.description}
                onChange={e => set("description", e.target.value)}
                rows={4}
                placeholder="Describe your healthcare services..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><ImageIcon size={15} /> Slider Images</h3>
          <span className="wc-editor-card-desc">{data.background_images.length} images</span>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-background-images-grid">
            {data.background_images.map((image) => (
              <div key={image.id} className="wc-background-image-item">
                {image.url ? (
                  <div className="wc-image-preview">
                    <img src={image.url} alt={image.alt} />
                    <div className="wc-image-preview-actions">
                      <button
                        className="wc-img-action-btn"
                        onClick={() => triggerBackgroundUpload(image.id)}
                        title="Replace image"
                      >
                        <Upload size={13} />
                      </button>
                      <button
                        className="wc-img-action-btn"
                        onClick={() => removeBackgroundImage(image.id)}
                        title="Remove image"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="wc-image-upload" 
                    onClick={() => triggerBackgroundUpload(image.id)}
                  >
                    <div className="wc-image-upload-icon"><Upload size={20} /></div>
                    <p>Upload Background</p>
                    <span>1920×800px</span>
                  </div>
                )}
                <input
                  className="wc-image-alt-input"
                  value={image.alt}
                  onChange={e => updateBackgroundImage(image.id, "alt", e.target.value)}
                  placeholder="Image alt text"
                />
                <button className="wc-remove-image-btn" onClick={() => removeBackgroundImage(image.id)}>
                  <X size={14} /> Remove
                </button>
              </div>
            ))}
            <button className="wc-add-image-btn" onClick={addBackgroundImage}>
              <Plus size={16} /> Add Slider Image
            </button>
          </div>
          <span className="wc-field-hint">Click on image or "Add Slider Image" to upload. Supports multiple selection. Recommended: 1920×800px. PNG, JPG, WEBP up to 5MB</span>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Users size={15} /> Patient Trust Images</h3>
          <span className="wc-editor-card-desc">{data.patient_images.length} images</span>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-patient-images-grid">
            {data.patient_images.map((image) => (
              <div key={image.id} className="wc-patient-image-item">
                {image.url ? (
                  <div className="wc-image-preview">
                    <img src={image.url} alt={image.alt} />
                    <div className="wc-image-preview-actions">
                      <button
                        className="wc-img-action-btn"
                        onClick={() => triggerPatientUpload(image.id)}
                        title="Replace image"
                      >
                        <Upload size={13} />
                      </button>
                      <button
                        className="wc-img-action-btn"
                        onClick={() => removePatientImage(image.id)}
                        title="Remove image"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="wc-image-upload" 
                    onClick={() => triggerPatientUpload(image.id)}
                  >
                    <div className="wc-image-upload-icon"><Upload size={20} /></div>
                    <p>Upload Photo</p>
                    <span>Square recommended</span>
                  </div>
                )}
                <input
                  className="wc-image-alt-input"
                  value={image.alt}
                  onChange={e => updatePatientImage(image.id, "alt", e.target.value)}
                  placeholder="Patient name or alt text"
                />
                <button className="wc-remove-image-btn" onClick={() => removePatientImage(image.id)}>
                  <X size={14} /> Remove
                </button>
              </div>
            ))}
            <button className="wc-add-image-btn" onClick={addPatientImage}>
              <Plus size={16} /> Add Patient Image
            </button>
          </div>
          <span className="wc-field-hint">Click on image or "Add Patient Image" to upload. Supports multiple selection. Recommended: 1:1 ratio</span>
        </div>
      </div>
    </div>
  );
};

// Seo Editor Component
const SeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "Renova Life Care Ltd. — Expert Healthcare, Every Step",
    meta_description: "Renova Life Care Ltd. delivers world-class healthcare services across Bangladesh. From general checkups to specialized treatments, our expert doctors are here for you.",
    og_title: "Renova Life Care Ltd. — Bangladesh's Most Trusted Healthcare",
    og_description: "Experience compassionate, world-class medicine with a personal touch at Renova Life Care Ltd.",
    og_image: "/images/og-home.jpg",
    canonical_url: "https://renovalifecare.com",
    robots: "index, follow",
    keywords: "healthcare Bangladesh, diagnostic center, Renova Life Care, expert doctors, medical services"
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
              <label className="wc-field-label">
                Meta Title <span className="required">*</span>
                <span className="wc-field-counter">{data.meta_title.length}/60</span>
              </label>
              <input
                className="wc-input"
                value={data.meta_title}
                onChange={e => set("meta_title", e.target.value)}
                placeholder="Enter meta title (max 60 characters)"
              />
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
                placeholder="Enter meta description (max 160 characters)"
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Keywords</label>
              <input
                className="wc-input"
                value={data.keywords}
                onChange={e => set("keywords", e.target.value)}
                placeholder="Enter keywords separated by commas"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

// Helper Components
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
      <label className="wc-field-label">{label}</label>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/png,image/jpeg,image/webp,image/gif"
        onChange={handleFileSelect}
      />
      {value ? (
        <div className="wc-image-preview">
          <img src={value} alt={label} />
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
          <div className="wc-image-upload-icon"><Upload size={20} /></div>
          <p>Click to upload image</p>
          <span>PNG, JPG, WEBP up to 5MB</span>
        </div>
      )}
      {hint && <span className="wc-field-hint">{hint}</span>}
    </div>
  );
};

export default HomePage;