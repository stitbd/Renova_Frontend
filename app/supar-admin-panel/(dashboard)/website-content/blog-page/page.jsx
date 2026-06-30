"use client";

import { useState, useEffect } from "react";
import {
  BookOpen,
  Layout,
  Search,
  Clock,
  Check,
  ChevronDown,
  ChevronRight,
  Save,
  RefreshCw,
  Eye,
  Plus,
  Trash,
  X,
  User,
  Calendar,
  MessageCircle,
  Award,
  ExternalLink,
  Upload,
  Tag,
  Heart,
  Share2,
  Edit,
  ArrowLeft,
  FileText,
  Image,
  Link
} from "lucide-react";
import "./blog.css";
import "../website-content.css";

// ============================================================
// MAIN BLOG PAGE COMPONENT
// ============================================================
const BlogPage = () => {
  const [selectedSection, setSelectedSection] = useState("blog-list");
  const [selectedPost, setSelectedPost] = useState(null);
  const [view, setView] = useState("list"); // "list" | "details" | "edit"
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dental Care", "Nutrition", "Mental Health"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setView("details");
  };

  const handleEditClick = (post) => {
    setSelectedPost(post);
    setView("edit");
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedPost(null);
  };

  const handleSavePost = async (updatedPost) => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 900));
    const updatedPosts = blogPosts.map(p => 
      p.id === updatedPost.id ? updatedPost : p
    );
    setBlogPosts(updatedPosts);
    setSelectedPost(updatedPost);
    setSaving(false);
    showToast("Blog post updated successfully!", "success");
    setView("details");
  };

  const handleDeletePost = async (postId) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      const updatedPosts = blogPosts.filter(p => p.id !== postId);
      setBlogPosts(updatedPosts);
      showToast("Blog post deleted successfully!", "success");
      setView("list");
      setSelectedPost(null);
    }
  };

  const handleAddPost = () => {
    const newPost = {
      id: Date.now(),
      title: "New Blog Post",
      excerpt: "Write your blog excerpt here...",
      content: "Write your full blog content here...",
      category: "Health",
      author: "Admin",
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: "5 min read",
      image: "",
      slug: "new-blog-post",
      tags: ["health", "wellness"],
      published: true
    };
    setBlogPosts([newPost, ...blogPosts]);
    setSelectedPost(newPost);
    setView("edit");
    showToast("New blog post created!", "success");
  };

  const showToast = (msg, type = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "success" }), 3000);
  };

  const sections = [
    { id: "blog-list", label: "Blog Posts", icon: BookOpen },
    { id: "seo", label: "SEO & Meta", icon: Search }
  ];

  // ============================================================
  // RENDER: LIST VIEW
  // ============================================================
  const renderListView = () => (
    <div>
      {/* Blog Posts Grid */}
      <div className="wc-blog-grid">
        {filteredPosts.map(post => (
          <div key={post.id} className="wc-blog-card" onClick={() => handlePostClick(post)}>
            <div className="wc-blog-image">
              {post.image ? (
                <img src={post.image} alt={post.title} className="wc-blog-card-image" />
              ) : (
                <div className="wc-blog-image-placeholder">
                  <FileText size={32} />
                  <span>No image</span>
                </div>
              )}
            </div>
            <div className="wc-blog-content">
              <span className="wc-blog-category">{post.category}</span>
              <h3 className="wc-blog-title">{post.title}</h3>
              <p className="wc-blog-excerpt">{post.excerpt}</p>
              <div className="wc-blog-footer">
                <div className="wc-blog-meta">
                  <span><User size={12} /> {post.author}</span>
                  <span><Calendar size={12} /> {post.date}</span>
                </div>
                <span className="wc-blog-read-time"><Clock size={12} /> {post.readTime}</span>
              </div>
              <div className="wc-blog-actions" onClick={e => e.stopPropagation()}>
                <button className="wc-btn wc-btn-ghost" onClick={() => handleEditClick(post)}>
                  <Edit size={14} /> Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="wc-empty-state">
          <div className="wc-empty-state-icon"><BookOpen size={30} /></div>
          <h3>No blog posts found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );

  // ============================================================
  // RENDER: DETAILS VIEW
  // ============================================================
  const renderDetailsView = () => {
    if (!selectedPost) return null;

    return (
      <div className="wc-blog-details">
        <div className="wc-details-header">
          <button className="wc-btn wc-btn-ghost" onClick={handleBackToList}>
            <ArrowLeft size={14} /> Back to Blog
          </button>
          <div className="wc-details-actions">
            <button className="wc-btn wc-btn-ghost" onClick={() => handleEditClick(selectedPost)}>
              <Edit size={14} /> Edit Post
            </button>
            <button className="wc-btn wc-btn-danger" onClick={() => handleDeletePost(selectedPost.id)}>
              <Trash size={14} /> Delete
            </button>
          </div>
        </div>

        <div className="wc-details-content">
          {selectedPost.image && (
            <div className="wc-details-image">
              <img src={selectedPost.image} alt={selectedPost.title} />
            </div>
          )}
          
          <div className="wc-details-meta">
            <span className="wc-blog-category">{selectedPost.category}</span>
            <span className="wc-details-date"><Calendar size={14} /> {selectedPost.date}</span>
            <span className="wc-details-readtime"><Clock size={14} /> {selectedPost.readTime}</span>
          </div>

          <h1 className="wc-details-title">{selectedPost.title}</h1>
          
          <div className="wc-details-author">
            <div className="wc-details-author-avatar">
              <User size={20} />
            </div>
            <div>
              <strong>{selectedPost.author}</strong>
              <span>Health Writer</span>
            </div>
          </div>

          <div className="wc-details-body">
            <p className="wc-details-excerpt">{selectedPost.excerpt}</p>
            <div className="wc-details-full-content">
              {selectedPost.content.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {selectedPost.tags && selectedPost.tags.length > 0 && (
            <div className="wc-details-tags">
              <strong>Tags:</strong>
              {selectedPost.tags.map((tag, i) => (
                <span key={i} className="wc-details-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ============================================================
  // RENDER: EDIT VIEW
  // ============================================================
  const renderEditView = () => {
    if (!selectedPost) return null;

    return <BlogEditor post={selectedPost} onSave={handleSavePost} onCancel={handleBackToList} />;
  };

  // ============================================================
  // RENDER: SEO VIEW
  // ============================================================
  const renderSeoView = () => <SeoEditor />;

  // ============================================================
  // MAIN RENDER
  // ============================================================
  const renderContent = () => {
    if (view === "details") return renderDetailsView();
    if (view === "edit") return renderEditView();
    
    switch (selectedSection) {
      case "blog-list":
        return renderListView();
      case "seo":
        return renderSeoView();
      default:
        return renderListView();
    }
  };

  return (
    <div className="wc-blog-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">Blog</span>
            {view !== "list" && (
              <>
                <ChevronDown size={12} className="wc-breadcrumb-chevron" />
                <span className="current">{view === "details" ? selectedPost?.title : "Edit Post"}</span>
              </>
            )}
          </div>

          <div className="wc-topbar-actions">
            {view === "list" && (
              <>
                <div className="wc-status-dot">Live</div>
                <button className="wc-btn wc-btn-primary" onClick={handleAddPost}>
                  <Plus size={14} /> New Post
                </button>
              </>
            )}
            {view === "details" && (
              <button className="wc-btn wc-btn-primary" onClick={() => handleEditClick(selectedPost)}>
                <Edit size={14} /> Edit Post
              </button>
            )}
            {view === "edit" && (
              <button className="wc-btn wc-btn-success" onClick={() => document.getElementById('save-blog-form')?.click()}>
                <Save size={14} /> Save Changes
              </button>
            )}
          </div>
        </div>

        <div className="wc-editor-body">
          {view === "list" && (
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
          )}

          <div className="wc-content-panel">
            {view === "list" && (
              <div className="wc-page-info-banner">
                <div className="wc-page-info-left">
                  <div className="wc-page-info-icon">
                    <BookOpen size={20} />
                  </div>
                  <div className="wc-page-info-text">
                    <h2>Blog Management</h2>
                    <p>{blogPosts.length} posts • Manage your blog content</p>
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
            )}

            {/* Category Filter & Search - Only in list view */}
            {view === "list" && (
              <div className="wc-blog-filters">
                <div className="wc-blog-categories">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      className={`wc-filter-btn ${selectedCategory === cat ? "active" : ""}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="wc-search">
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                  <Search size={14} className="wc-search-icon" />
                </div>
              </div>
            )}

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

// ============================================================
// BLOG EDITOR COMPONENT
// ============================================================
const BlogEditor = ({ post, onSave, onCancel }) => {
  const [data, setData] = useState({ ...post });
  const [activeTab, setActiveTab] = useState("content");

  const handleChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleSave = () => {
    onSave(data);
  };

  return (
    <div className="wc-blog-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Edit size={15} /> Edit Blog Post</h3>
          <div className="wc-editor-card-actions">
            <button className="wc-btn wc-btn-ghost" onClick={onCancel}>
              <X size={14} /> Cancel
            </button>
            <button className="wc-btn wc-btn-success" onClick={handleSave} id="save-blog-form">
              <Save size={14} /> Save Post
            </button>
          </div>
        </div>
        <div className="wc-editor-card-body">
          {/* Editor Tabs */}
          <div className="wc-editor-tabs">
            <button
              className={`wc-editor-tab ${activeTab === "content" ? "active" : ""}`}
              onClick={() => setActiveTab("content")}
            >
              <FileText size={14} /> Content
            </button>
            <button
              className={`wc-editor-tab ${activeTab === "media" ? "active" : ""}`}
              onClick={() => setActiveTab("media")}
            >
              <Image size={14} /> Media
            </button>
            <button
              className={`wc-editor-tab ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <Layout size={14} /> Settings
            </button>
          </div>

          {/* Content Tab */}
          {activeTab === "content" && (
            <div className="wc-editor-tab-content">
              <div className="wc-field-grid">
                <div className="wc-field span-2">
                  <label className="wc-field-label">Title <span className="required">*</span></label>
                  <input
                    className="wc-input"
                    value={data.title}
                    onChange={e => handleChange("title", e.target.value)}
                    placeholder="Enter blog title"
                  />
                </div>
                <div className="wc-field span-2">
                  <label className="wc-field-label">Slug <span className="required">*</span></label>
                  <input
                    className="wc-input"
                    value={data.slug}
                    onChange={e => handleChange("slug", e.target.value)}
                    placeholder="url-friendly-slug"
                  />
                </div>
                <div className="wc-field span-2">
                  <label className="wc-field-label">Excerpt <span className="field-hint">(Short summary)</span></label>
                  <textarea
                    className="wc-textarea"
                    value={data.excerpt}
                    onChange={e => handleChange("excerpt", e.target.value)}
                    rows={2}
                    placeholder="Brief summary of the blog post"
                  />
                </div>
                <div className="wc-field span-2">
                  <label className="wc-field-label">Content <span className="required">*</span></label>
                  <div className="wc-rich-text-editor">
                    <div className="wc-rich-toolbar">
                      <button className="wc-rich-btn"><b>B</b></button>
                      <button className="wc-rich-btn"><i>I</i></button>
                      <button className="wc-rich-btn"><u>U</u></button>
                      <span className="wc-rich-divider"></span>
                      <button className="wc-rich-btn">H1</button>
                      <button className="wc-rich-btn">H2</button>
                      <button className="wc-rich-btn">H3</button>
                      <span className="wc-rich-divider"></span>
                      <button className="wc-rich-btn">
                        <Link size={13} />
                      </button>
                      <button className="wc-rich-btn">
                        <Image size={13} />
                      </button>
                    </div>
                    <textarea
                      className="wc-rich-content"
                      value={data.content}
                      onChange={e => handleChange("content", e.target.value)}
                      rows={10}
                      placeholder="Write your blog content here..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Media Tab */}
          {activeTab === "media" && (
            <div className="wc-editor-tab-content">
              <div className="wc-field-grid">
                <div className="wc-field span-2">
                  <label className="wc-field-label">Featured Image</label>
                  <div className="wc-image-upload">
                    <div className="wc-image-upload-icon"><Upload size={24} /></div>
                    <p>Click or drag to upload</p>
                    <span>Recommended: 1200×630px</span>
                  </div>
                </div>
                {data.image && (
                  <div className="wc-field span-2">
                    <div className="wc-image-preview">
                      <img src={data.image} alt={data.title} />
                      <div className="wc-image-preview-actions">
                        <button className="wc-img-action-btn">
                          <Trash size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="wc-editor-tab-content">
              <div className="wc-field-grid">
                <div className="wc-field">
                  <label className="wc-field-label">Category <span className="required">*</span></label>
                  <select
                    className="wc-select"
                    value={data.category}
                    onChange={e => handleChange("category", e.target.value)}
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Dental Care">Dental Care</option>
                    <option value="Nutrition">Nutrition</option>
                    <option value="Mental Health">Mental Health</option>
                    <option value="General Health">General Health</option>
                  </select>
                </div>
                <div className="wc-field">
                  <label className="wc-field-label">Author <span className="required">*</span></label>
                  <input
                    className="wc-input"
                    value={data.author}
                    onChange={e => handleChange("author", e.target.value)}
                    placeholder="Author name"
                  />
                </div>
                <div className="wc-field">
                  <label className="wc-field-label">Date</label>
                  <input
                    className="wc-input"
                    type="date"
                    value={data.date}
                    onChange={e => handleChange("date", e.target.value)}
                  />
                </div>
                <div className="wc-field">
                  <label className="wc-field-label">Read Time</label>
                  <input
                    className="wc-input"
                    value={data.readTime}
                    onChange={e => handleChange("readTime", e.target.value)}
                    placeholder="e.g. 5 min read"
                  />
                </div>
                <div className="wc-field span-2">
                  <label className="wc-field-label">Tags</label>
                  <input
                    className="wc-input"
                    value={data.tags?.join(", ")}
                    onChange={e => handleChange("tags", e.target.value.split(", ").filter(t => t))}
                    placeholder="health, wellness, medical"
                  />
                </div>
                <div className="wc-field span-2">
                  <div className="wc-toggle-row">
                    <div className="wc-toggle-info">
                      <h4>Published</h4>
                      <p>Make this post visible to visitors</p>
                    </div>
                    <label className="wc-switch">
                      <input
                        type="checkbox"
                        checked={data.published !== false}
                        onChange={e => handleChange("published", e.target.checked)}
                      />
                      <span className="wc-switch-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// SEO EDITOR COMPONENT
// ============================================================
const SeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "Health Blog — Wellness Tips & Medical Insights | Renova Life Care",
    meta_description: "Expert health tips, medical insights, and wellness advice from our healthcare professionals.",
    og_title: "Health & Wellness Blog",
    og_description: "Expert insights for better health.",
    og_image: "/images/og-blog.jpg",
    canonical_url: "https://renovalifecare.com/blog",
    robots: "index, follow",
    keywords: "health blog, wellness tips, medical insights, healthcare Bangladesh"
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

// ============================================================
// INITIAL DATA
// ============================================================
const initialBlogPosts = [
  {
    id: 1,
    title: "10 Early Warning Signs of Heart Disease You Shouldn't Ignore",
    excerpt: "Cardiovascular disease remains the leading cause of death worldwide. Learn the warning signs that require immediate medical attention.",
    content: `Cardiovascular disease remains the leading cause of death worldwide, affecting millions of people each year. Recognizing the early warning signs can be life-saving.

Heart disease often develops silently over many years, but there are key symptoms that should never be ignored. Understanding these signs and acting quickly can make a significant difference in outcomes.

If you or someone you know experiences any of these symptoms, seek medical attention immediately. Early detection and treatment are crucial for preventing serious complications.

Remember: when it comes to heart health, it's always better to be safe than sorry.`,
    category: "Cardiology",
    author: "Dr. Sarah Ahmed",
    date: "April 15, 2025",
    readTime: "5 min read",
    image: "",
    slug: "early-warning-signs-heart-disease",
    tags: ["heart disease", "cardiology", "health awareness", "prevention"],
    published: true
  },
  {
    id: 2,
    title: "Managing Diabetes in Bangladesh: A Practical Guide",
    excerpt: "With rising diabetes rates in Bangladesh, here's how to manage your blood sugar through diet, exercise, and medication.",
    content: `Diabetes has become a growing health concern in Bangladesh, with prevalence rates increasing rapidly over the past decade. Lifestyle changes, dietary habits, and genetic factors all play a role in this epidemic.

Proper management of diabetes involves a comprehensive approach that includes medication, regular monitoring, healthy eating, and physical activity. Understanding the local food culture and adapting it to diabetes-friendly options is key.

Many Bangladeshi traditional foods can be modified to support blood sugar control. Simple changes like choosing brown rice over white, incorporating more vegetables, and controlling portion sizes can make a significant difference.

Regular check-ups with healthcare providers and community support are essential for managing diabetes effectively.`,
    category: "Nutrition",
    author: "Dr. Rahim Khan",
    date: "April 8, 2025",
    readTime: "7 min read",
    image: "",
    slug: "managing-diabetes-bangladesh-guide",
    tags: ["diabetes", "nutrition", "Bangladesh", "health management"],
    published: true
  },
  {
    id: 3,
    title: "Your Child's Vaccination Schedule: A Complete Guide",
    excerpt: "Keeping up with childhood vaccinations is crucial. Here's everything Bangladeshi parents need to know about the EPI schedule.",
    content: `Vaccinations are one of the most effective ways to protect children from serious diseases. The Expanded Programme on Immunization (EPI) in Bangladesh provides a comprehensive schedule that covers all essential vaccines.

Following the recommended vaccination schedule ensures your child develops immunity at the right time. Delays or missed vaccinations can leave children vulnerable to preventable diseases.

Common vaccines in the schedule include BCG, Pentavalent, Polio, Measles, and Rubella. Each vaccine is given at specific ages to provide optimal protection.

Consult with your pediatrician to ensure your child stays on track with their vaccinations. Keeping a vaccination card and setting reminders can help maintain the schedule.`,
    category: "Pediatrics",
    author: "Dr. Fatima Begum",
    date: "March 30, 2025",
    readTime: "6 min read",
    image: "",
    slug: "child-vaccination-schedule-guide",
    tags: ["vaccination", "children", "pediatrics", "EPI"],
    published: true
  }
];

export default BlogPage;