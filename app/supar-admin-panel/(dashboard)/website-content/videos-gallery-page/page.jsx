"use client";

import { useState, useRef } from "react";
import {
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
  Play,
  Video,
  ExternalLink,
  Upload,
  Calendar,
  User,
  Tag,
  FileText
} from "lucide-react";
import "./videos-gallery.css";

const VideosGalleryPage = () => {
  const [selectedSection, setSelectedSection] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const sections = [
    { id: "hero", label: "Hero Section", icon: Layout },
    { id: "video-gallery", label: "Video Gallery", icon: Video },
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
      case "video-gallery":
        return <VideoGalleryEditor />;
      case "seo":
        return <SeoEditor />;
      default:
        return <HeroEditor />;
    }
  };

  return (
    <div className="wc-videos-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">Videos Gallery</span>
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
                  <Video size={20} />
                </div>
                <div className="wc-page-info-text">
                  <h2>Videos Gallery</h2>
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
    trust_badge_text: "VIDEO LIBRARY",
    headline: "Watch & Learn: Medical Videos",
    description: "Expert insights, patient stories, and health education — all in one place.",
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

// Video Upload Component
const VideoUpload = ({ value, onChange, onRemove }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const videoUrls = files.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      type: file.type
    }));
    
    onChange?.(videoUrls);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeVideo = () => {
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
        accept="video/mp4,video/webm,video/ogg,video/quicktime"
        multiple
        onChange={handleFileSelect}
      />
      {value ? (
        <div className="wc-video-preview">
          <video src={value} muted preload="metadata" />
          <div className="wc-video-play-icon">
            <Play size={48} />
          </div>
          <div className="wc-video-preview-actions">
            <button
              className="wc-img-action-btn"
              onClick={triggerUpload}
              title="Replace video"
            >
              <Upload size={12} />
            </button>
            <button
              className="wc-img-action-btn"
              onClick={removeVideo}
              title="Remove video"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      ) : (
        <div className="wc-image-upload" onClick={triggerUpload}>
          <div className="wc-image-upload-icon"><Upload size={20} /></div>
          <p>Click to upload video</p>
          <span>MP4, WEBM, OGG</span>
        </div>
      )}
    </div>
  );
};

// Thumbnail Upload Component
const ThumbnailUpload = ({ value, onChange, onRemove }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const imageUrl = URL.createObjectURL(files[0]);
    onChange?.(imageUrl);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeThumbnail = () => {
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
        accept="image/png,image/jpeg,image/webp,image/gif"
        onChange={handleFileSelect}
      />
      {value ? (
        <div className="wc-video-preview">
          <img src={value} alt="Video thumbnail" />
          <div className="wc-video-play-icon">
            <Play size={48} />
          </div>
          <div className="wc-video-preview-actions">
            <button
              className="wc-img-action-btn"
              onClick={triggerUpload}
              title="Replace thumbnail"
            >
              <Upload size={12} />
            </button>
            <button
              className="wc-img-action-btn"
              onClick={removeThumbnail}
              title="Remove thumbnail"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      ) : (
        <div className="wc-image-upload" onClick={triggerUpload}>
          <div className="wc-image-upload-icon"><Upload size={20} /></div>
          <p>Click to upload thumbnail</p>
          <span>PNG, JPG, WEBP</span>
        </div>
      )}
    </div>
  );
};

// Video Gallery Editor
const VideoGalleryEditor = () => {
  const [data, setData] = useState({
    section_label: "Video Library",
    heading: "Medical Videos & Insights",
    subheading: "Expert knowledge at your fingertips.",
    categories: [
      { id: "all", label: "All Videos", count: 12 },
      { id: "procedures", label: "Procedures", count: 3 },
      { id: "testimonials", label: "Testimonials", count: 3 }
    ],
    videos: [
      {
        id: 1,
        title: "Understanding Heart Health",
        description: "Expert cardiologist explains heart health basics and prevention tips.",
        category: "procedures",
        views: "12.5K views",
        date: "Dec 15, 2025",
        duration: "8:40",
        url: "",
        thumbnail: "",
        video: ""
      }
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

  const updateVideo = (index, field, value) => {
    const updated = [...data.videos];
    updated[index] = { ...updated[index], [field]: value };
    set("videos", updated);
  };

  const addVideo = () => {
    set("videos", [...data.videos, {
      id: Date.now(),
      title: "",
      description: "",
      category: "",
      views: "",
      date: "",
      duration: "",
      url: "",
      thumbnail: "",
      video: ""
    }]);
  };

  const removeVideo = (index) => {
    const updated = [...data.videos];
    if (updated[index].thumbnail && updated[index].thumbnail.startsWith('blob:')) {
      URL.revokeObjectURL(updated[index].thumbnail);
    }
    if (updated[index].video && updated[index].video.startsWith('blob:')) {
      URL.revokeObjectURL(updated[index].video);
    }
    updated.splice(index, 1);
    set("videos", updated);
  };

  const handleVideoUpload = (index, videoUrls) => {
    if (videoUrls && videoUrls.length > 0) {
      const video = videoUrls[0];
      updateVideo(index, "video", video.url);
      // Auto-generate thumbnail from video if not already set
      if (!data.videos[index].thumbnail) {
        // You can add video thumbnail extraction logic here
        // For now, we'll set a placeholder
        updateVideo(index, "thumbnail", "/images/video-placeholder.jpg");
      }
    }
  };

  const handleThumbnailUpload = (index, thumbnailUrl) => {
    updateVideo(index, "thumbnail", thumbnailUrl);
  };

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Video size={15} /> Gallery Section</h3>
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
          <h3 className="wc-editor-card-title"><Grid size={15} /> Video Categories</h3>
          <button className="wc-btn wc-btn-ghost" onClick={addCategory}>
            <Plus size={14} /> Add Category
          </button>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-video-categories">
            {data.categories.map((cat, i) => (
              <div key={i} className="wc-video-category">
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
          <h3 className="wc-editor-card-title"><Video size={15} /> Videos ({data.videos.length})</h3>
          <span className="wc-editor-card-desc">Click on video/thumbnail to upload</span>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-video-grid">
            {data.videos.map((video, index) => (
              <div key={video.id} className="wc-video-item">
                <div className="wc-video-thumb">
                  {video.video ? (
                    <ThumbnailUpload 
                      value={video.thumbnail}
                      onChange={(url) => handleThumbnailUpload(index, url)}
                      onRemove={() => updateVideo(index, "thumbnail", "")}
                    />
                  ) : (
                    <VideoUpload 
                      value={video.video}
                      onChange={(urls) => handleVideoUpload(index, urls)}
                      onRemove={() => updateVideo(index, "video", "")}
                    />
                  )}
                </div>
                <div className="wc-video-info">
                  <input 
                    className="wc-input" 
                    placeholder="Video Title" 
                    style={{ fontWeight: 700 }}
                    value={video.title}
                    onChange={e => updateVideo(index, "title", e.target.value)}
                  />
                  <textarea 
                    className="wc-textarea" 
                    placeholder="Video Description" 
                    rows={2}
                    value={video.description}
                    onChange={e => updateVideo(index, "description", e.target.value)}
                  />
                  <div className="wc-video-meta">
                    <input 
                      className="wc-input" 
                      placeholder="Category" 
                      value={video.category}
                      onChange={e => updateVideo(index, "category", e.target.value)}
                    />
                    <input 
                      className="wc-input" 
                      placeholder="Views (e.g. 12.5K views)" 
                      value={video.views}
                      onChange={e => updateVideo(index, "views", e.target.value)}
                    />
                  </div>
                  <div className="wc-video-meta">
                    <input 
                      className="wc-input" 
                      placeholder="Date" 
                      value={video.date}
                      onChange={e => updateVideo(index, "date", e.target.value)}
                    />
                    <input 
                      className="wc-input" 
                      placeholder="Duration (e.g. 6:40)" 
                      value={video.duration}
                      onChange={e => updateVideo(index, "duration", e.target.value)}
                    />
                  </div>
                  <input 
                    className="wc-input" 
                    placeholder="Video URL / Embed Code" 
                    value={video.url}
                    onChange={e => updateVideo(index, "url", e.target.value)}
                  />
                  <button 
                    className="wc-btn wc-btn-danger" 
                    onClick={() => removeVideo(index)}
                  >
                    <Trash size={14} /> Remove Video
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="wc-repeater-add" onClick={addVideo}>
            <Plus size={14} /> Add Video
          </button>
        </div>
      </div>
    </div>
  );
};

// SEO Editor
const SeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "Medical Videos — Watch & Learn | Renova Life Care",
    meta_description: "Watch expert medical videos, patient stories, and health education content.",
    og_title: "Medical Video Library | Renova Life Care",
    og_description: "Expert insights, patient stories, and health education videos.",
    og_image: "/images/og-videos.jpg",
    canonical_url: "https://renovalifecare.com/videos",
    robots: "index, follow",
    keywords: "medical videos Bangladesh, health education, patient stories"
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
            <div className="wc-field span-2">
              <label className="wc-field-label">Canonical URL</label>
              <input className="wc-input" value={data.canonical_url} onChange={e => set("canonical_url", e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideosGalleryPage;