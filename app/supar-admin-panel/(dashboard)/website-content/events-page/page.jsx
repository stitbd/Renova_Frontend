// app/supar-admin-panel/website-content/events-page/page.jsx
"use client";

import { useState, useRef } from "react";
import {
  Layout,
  Search,
  Save,
  RefreshCw,
  Check,
  ChevronDown,
  Clock,
  Upload,
  Trash,
  Plus,
  X,
  Calendar,
  MapPin,
  Users,
  Heart,
  Award,
  Eye,
  FileText,
  Image,
  Tag,
  Filter,
  ArrowRight,
  CalendarDays,
  Clock as ClockIcon,
  Globe,
  MessageCircle,
  Share2,
  Edit,
  Copy,
  Link as LinkIcon,
  ChevronRight
} from "lucide-react";
import "./events.css";

const EventsPage = () => {
  const [selectedSection, setSelectedSection] = useState("events-content");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const sections = [
    { id: "events-hero", label: "Hero Section", icon: Layout },
    { id: "events-content", label: "Event Content", icon: Calendar },
    { id: "events-outreach", label: "Community Outreach", icon: Users },
    { id: "events-volunteer", label: "Volunteer Section", icon: Heart },
    { id: "seo", label: "SEO & Meta", icon: Search }
  ];

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 900));
    setSaving(false);
    showToast("Events changes saved successfully!", "success");
  };

  const showToast = (msg, type = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "success" }), 3000);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "events-hero":
        return <EventsHeroEditor />;
      case "events-content":
        return <EventsContentEditor />;
      case "events-outreach":
        return <EventsOutreachEditor />;
      case "events-volunteer":
        return <EventsVolunteerEditor />;
      case "seo":
        return <EventsSeoEditor />;
      default:
        return <EventsContentEditor />;
    }
  };

  return (
    <div className="wc-events-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">Events</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">{sections.find(s => s.id === selectedSection)?.label}</span>
          </div>

          <div className="wc-topbar-actions">
            <div className="wc-status-dot">Live</div>
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
                  <Calendar size={20} />
                </div>
                <div className="wc-page-info-text">
                  <h2>Events Page</h2>
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

// ──────────────────────────────────────────────
// Events Hero Section Editor
// ──────────────────────────────────────────────
const EventsHeroEditor = () => {
  const [data, setData] = useState({
    section_title: "COMMUNITY & OUTREACH",
    section_subtitle: "Our Events",
    section_description: "Free health camps, awareness seminars, and community drives – bringing quality healthcare closer to the people of Bangladesh.",
    breadcrumb_home: "Home",
    breadcrumb_events: "Events",
    stats: [
      { number: "98", label: "Events Hosted" },
      { number: "20", label: "Communities Served" }
    ]
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  const updateStat = (index, key, value) => {
    const updated = [...data.stats];
    updated[index] = { ...updated[index], [key]: value };
    set("stats", updated);
  };

  return (
    <div className="wc-events-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Layout size={15} /> Hero Section</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Title <span className="required">*</span></label>
              <input 
                className="wc-input" 
                value={data.section_title} 
                onChange={e => set("section_title", e.target.value)} 
                placeholder="COMMUNITY & OUTREACH"
              />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Subtitle <span className="required">*</span></label>
              <input 
                className="wc-input" 
                value={data.section_subtitle} 
                onChange={e => set("section_subtitle", e.target.value)} 
                placeholder="Our Events"
              />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Breadcrumb - Home</label>
              <input 
                className="wc-input" 
                value={data.breadcrumb_home} 
                onChange={e => set("breadcrumb_home", e.target.value)} 
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Description</label>
              <textarea 
                className="wc-textarea" 
                value={data.section_description} 
                onChange={e => set("section_description", e.target.value)} 
                rows={2} 
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Breadcrumb - Events</label>
              <input 
                className="wc-input" 
                value={data.breadcrumb_events} 
                onChange={e => set("breadcrumb_events", e.target.value)} 
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Statistics</label>
              <div className="wc-stats-grid">
                {data.stats.map((stat, index) => (
                  <div key={index} className="wc-stat-item">
                    <input 
                      className="wc-input" 
                      value={stat.number} 
                      onChange={e => updateStat(index, "number", e.target.value)} 
                      placeholder="Number"
                    />
                    <input 
                      className="wc-input" 
                      value={stat.label} 
                      onChange={e => updateStat(index, "label", e.target.value)} 
                      placeholder="Label"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// Events Content Editor with Tab View
// ──────────────────────────────────────────────
const EventsContentEditor = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Free Diabetes Screening Camp",
      description: "Complimentary blood sugar testing, diet counseling, and consultations with our endocrinology specialists.",
      time: "9:00 AM – 4:00 PM",
      location: "Renova Life Care, Main Campus, Dhaka",
      image: "/images/events/01.jpg",
      category: "Health Camp",
      date: "2025-04-15"
    },
    {
      id: 2,
      title: "Heart Health Awareness Seminar",
      description: "Cardiologists discuss prevention, early warning signs, and Q&A on cardiovascular wellness.",
      time: "10:00 AM – 1:00 PM",
      location: "Renova Auditorium, 3rd Floor",
      image: "/images/events/02.jpg",
      category: "Seminar",
      date: "2025-04-20"
    },
    {
      id: 3,
      title: "Rural Community Health Drive",
      description: "Free general checkups, medicine distribution, and maternal health support for underserved communities.",
      time: "8:00 AM – 5:00 PM",
      location: "Savar Union, Dhaka Division",
      image: "/images/events/03.jpg",
      category: "Community Drive",
      date: "2025-05-25"
    },
    {
      id: 4,
      title: "Child Nutrition & Vaccination Camp",
      description: "Free vaccinations, growth monitoring, and nutrition guidance for children under 12.",
      time: "11:00 AM – 2:00 PM",
      location: "Renova Pediatric Wing",
      image: "/images/events/04.jpg",
      category: "Health Camp",
      date: "2025-05-01"
    },
    {
      id: 5,
      title: "World Health Day Free Checkup Camp",
      description: "Free health checkups and consultations for the community.",
      time: "9:00 AM – 6:00 PM",
      location: "Renova Main Campus, Dhaka",
      image: "/images/events/05.jpg",
      category: "Health Camp",
      date: "2025-04-07"
    },
    {
      id: 6,
      title: "Annual Blood Donation Drive",
      description: "Community blood donation drive in partnership with local hospitals.",
      time: "8:00 AM – 4:00 PM",
      location: "Renova Blood Bank, Dhaka",
      image: "/images/events/06.jpg",
      category: "Community Drive",
      date: "2025-09-05"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("upcoming");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    time: "",
    location: "",
    image: "",
    category: "Health Camp",
    date: ""
  });

  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Separate events into upcoming and past
  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= today;
  });

  const pastEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate < today;
  });

  const openModal = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        description: event.description,
        time: event.time,
        location: event.location,
        image: event.image,
        category: event.category,
        date: event.date
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: "",
        description: "",
        time: "",
        location: "",
        image: "",
        category: "Health Camp",
        date: ""
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
    setFormData({
      title: "",
      description: "",
      time: "",
      location: "",
      image: "",
      category: "Health Camp",
      date: ""
    });
  };

  const handleFormChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      alert("Please enter an event title");
      return;
    }

    if (editingEvent) {
      const updated = events.map(event => 
        event.id === editingEvent.id 
          ? { ...event, ...formData }
          : event
      );
      setEvents(updated);
    } else {
      const newEvent = {
        id: Date.now(),
        ...formData
      };
      setEvents([...events, newEvent]);
    }
    closeModal();
  };

  const removeEvent = (id) => {
    const updated = events.filter(event => event.id !== id);
    setEvents(updated);
    if (expandedEvent === id) setExpandedEvent(null);
  };

  const duplicateEvent = (id) => {
    const event = events.find(e => e.id === id);
    if (event) {
      const newEvent = {
        ...event,
        id: Date.now(),
        title: `${event.title} (Copy)`
      };
      setEvents([...events, newEvent]);
    }
  };

  const toggleExpand = (id) => {
    setExpandedEvent(expandedEvent === id ? null : id);
  };

  const categories = ["all", "Health Camp", "Seminar", "Community Drive", "Workshop"];

  const getFilteredEvents = (eventList) => {
    return eventList.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const filteredUpcoming = getFilteredEvents(upcomingEvents);
  const filteredPast = getFilteredEvents(pastEvents);

  const renderEventList = (eventList, isPast = false) => {
    if (eventList.length === 0) {
      return (
        <div className="wc-empty-state">
          <div className="wc-empty-state-icon">
            {isPast ? <Clock size={30} /> : <Calendar size={30} />}
          </div>
          <h3>{isPast ? "No past events" : "No upcoming events"}</h3>
          <p>{isPast ? "Past events will appear here" : "Click 'Add Event' to create a new event"}</p>
        </div>
      );
    }

    return eventList.map(event => {
      const isExpanded = expandedEvent === event.id;
      const imagePath = event.image || "/images/events/01.jpg";

      return (
        <div key={event.id} className={`wc-event-accordion ${isExpanded ? "expanded" : ""}`}>
          <div className="wc-event-accordion-header" onClick={() => toggleExpand(event.id)}>
            <div className="wc-event-accordion-left">
              <div className="wc-event-accordion-thumb">
                <img src={imagePath} alt={event.title} />
              </div>
              <div className="wc-event-accordion-info">
                <div className="wc-event-accordion-title">{event.title}</div>
                <div className="wc-event-accordion-meta">
                  <span className="wc-event-accordion-date">
                    <CalendarDays size={12} />
                    {event.date ? new Date(event.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) : "Date TBD"}
                  </span>
                  <span className="wc-event-accordion-category">{event.category}</span>
                </div>
              </div>
            </div>
            <div className="wc-event-accordion-right">
              <div className="wc-event-accordion-actions">
                <button 
                  className="wc-icon-btn" 
                  onClick={(e) => { e.stopPropagation(); duplicateEvent(event.id); }}
                  title="Duplicate"
                >
                  <Copy size={14} />
                </button>
                <button 
                  className="wc-icon-btn" 
                  onClick={(e) => { e.stopPropagation(); openModal(event); }}
                  title="Edit"
                >
                  <Edit size={14} />
                </button>
                <button 
                  className="wc-icon-btn wc-icon-btn-danger" 
                  onClick={(e) => { e.stopPropagation(); removeEvent(event.id); }}
                  title="Delete"
                >
                  <Trash size={14} />
                </button>
              </div>
              <ChevronRight 
                size={18} 
                className={`wc-accordion-chevron ${isExpanded ? "rotated" : ""}`}
              />
            </div>
          </div>
          {isExpanded && (
            <div className="wc-event-accordion-body">
              <div className="wc-event-detail-grid">
                <div className="wc-event-detail-image">
                  <img src={imagePath} alt={event.title} />
                </div>
                <div className="wc-event-detail-content">
                  <p className="wc-event-detail-desc">{event.description}</p>
                  <div className="wc-event-detail-meta">
                    <div className="wc-event-detail-item">
                      <ClockIcon size={14} />
                      <span>{event.time}</span>
                    </div>
                    <div className="wc-event-detail-item">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                    <div className="wc-event-detail-item">
                      <CalendarDays size={14} />
                      <span>{event.date ? new Date(event.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }) : "Date TBD"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="wc-events-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Calendar size={15} /> Events</h3>
          <div className="wc-editor-card-actions">
            <span className="wc-editor-card-desc">{events.length} total events</span>
            <button className="wc-btn wc-btn-primary wc-btn-sm" onClick={() => openModal()}>
              <Plus size={14} /> Add Event
            </button>
          </div>
        </div>
        <div className="wc-editor-card-body">
          {/* Filters */}
          <div className="wc-events-filters">
            <div className="wc-events-categories">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`wc-filter-btn ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
            <div className="wc-search">
              <Search size={14} className="wc-search-icon" />
              <input 
                type="text" 
                placeholder="Search events..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="wc-event-tabs">
            <button 
              className={`wc-event-tab ${activeTab === "upcoming" ? "active" : ""}`}
              onClick={() => setActiveTab("upcoming")}
            >
              <Calendar size={14} />
              Upcoming Events
              <span className="wc-event-tab-count">{filteredUpcoming.length}</span>
            </button>
            <button 
              className={`wc-event-tab ${activeTab === "past" ? "active" : ""}`}
              onClick={() => setActiveTab("past")}
            >
              <Clock size={14} />
              Past Events
              <span className="wc-event-tab-count">{filteredPast.length}</span>
            </button>
          </div>

          {/* Event List */}
          <div className="wc-event-accordion-list">
            {activeTab === "upcoming" 
              ? renderEventList(filteredUpcoming, false)
              : renderEventList(filteredPast, true)
            }
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="wc-modal-overlay" onClick={closeModal}>
          <div className="wc-modal" onClick={e => e.stopPropagation()}>
            <div className="wc-modal-header">
              <h3 className="wc-modal-title">
                {editingEvent ? "Edit Event" : "Create New Event"}
              </h3>
              <button className="wc-modal-close" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>
            <div className="wc-modal-body">
              <div className="wc-field">
                <label className="wc-field-label">
                  Event Title <span className="required">*</span>
                </label>
                <input 
                  className="wc-input" 
                  value={formData.title} 
                  onChange={e => handleFormChange("title", e.target.value)} 
                  placeholder="Enter event title"
                  autoFocus
                />
              </div>
              <div className="wc-field">
                <label className="wc-field-label">Description</label>
                <textarea 
                  className="wc-textarea" 
                  value={formData.description} 
                  onChange={e => handleFormChange("description", e.target.value)} 
                  rows={3}
                  placeholder="Brief description of the event"
                />
              </div>
              <div className="wc-field-grid-2">
                <div className="wc-field">
                  <label className="wc-field-label">Date</label>
                  <input 
                    className="wc-input" 
                    type="date"
                    value={formData.date} 
                    onChange={e => handleFormChange("date", e.target.value)} 
                  />
                </div>
                <div className="wc-field">
                  <label className="wc-field-label">Time</label>
                  <input 
                    className="wc-input" 
                    value={formData.time} 
                    onChange={e => handleFormChange("time", e.target.value)} 
                    placeholder="9:00 AM – 4:00 PM"
                  />
                </div>
              </div>
              <div className="wc-field">
                <label className="wc-field-label">Location</label>
                <input 
                  className="wc-input" 
                  value={formData.location} 
                  onChange={e => handleFormChange("location", e.target.value)} 
                  placeholder="Venue location"
                />
              </div>
              <div className="wc-field">
                <label className="wc-field-label">Category</label>
                <select 
                  className="wc-select" 
                  value={formData.category} 
                  onChange={e => handleFormChange("category", e.target.value)}
                >
                  <option value="Health Camp">Health Camp</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Community Drive">Community Drive</option>
                  <option value="Workshop">Workshop</option>
                </select>
              </div>
              <div className="wc-field">
                <label className="wc-field-label">Event Image</label>
                <ImageUploadField 
                  value={formData.image} 
                  onChange={(val) => handleFormChange("image", val)} 
                />
              </div>
            </div>
            <div className="wc-modal-footer">
              <button className="wc-btn wc-btn-ghost" onClick={closeModal}>
                Cancel
              </button>
              <button className="wc-btn wc-btn-primary" onClick={handleSubmit}>
                {editingEvent ? "Update Event" : "Create Event"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ──────────────────────────────────────────────
// Community Outreach Editor
// ──────────────────────────────────────────────
const EventsOutreachEditor = () => {
  const [data, setData] = useState({
    title: "COMMUNITY & OUTREACH",
    subtitle: "Our Events",
    description: "Free health camps, awareness seminars, and community drives – bringing quality healthcare closer to the people of Bangladesh.",
    stats: [
      { number: "98", label: "Events Hosted" },
      { number: "20", label: "Communities Served" }
    ]
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  const updateStat = (index, key, value) => {
    const updated = [...data.stats];
    updated[index] = { ...updated[index], [key]: value };
    set("stats", updated);
  };

  return (
    <div className="wc-events-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Users size={15} /> Community Outreach Section</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Title</label>
              <input 
                className="wc-input" 
                value={data.title} 
                onChange={e => set("title", e.target.value)} 
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Subtitle</label>
              <input 
                className="wc-input" 
                value={data.subtitle} 
                onChange={e => set("subtitle", e.target.value)} 
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Description</label>
              <textarea 
                className="wc-textarea" 
                value={data.description} 
                onChange={e => set("description", e.target.value)} 
                rows={2} 
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Statistics</label>
              <div className="wc-stats-grid">
                {data.stats.map((stat, index) => (
                  <div key={index} className="wc-stat-item">
                    <input 
                      className="wc-input" 
                      value={stat.number} 
                      onChange={e => updateStat(index, "number", e.target.value)} 
                      placeholder="Number"
                    />
                    <input 
                      className="wc-input" 
                      value={stat.label} 
                      onChange={e => updateStat(index, "label", e.target.value)} 
                      placeholder="Label"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// Volunteer Section Editor
// ──────────────────────────────────────────────
const EventsVolunteerEditor = () => {
  const [data, setData] = useState({
    title: "Want to Partner or Volunteer?",
    description: "Reach out to our outreach team to collaborate on the next community health initiative.",
    button_text: "Get in Touch",
    button_url: "/contact",
    image: "/images/volunteer.jpg"
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div className="wc-events-editor">
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Heart size={15} /> Volunteer / Partner Section</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Title <span className="required">*</span></label>
              <input 
                className="wc-input" 
                value={data.title} 
                onChange={e => set("title", e.target.value)} 
                placeholder="Want to Partner or Volunteer?"
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Description</label>
              <textarea 
                className="wc-textarea" 
                value={data.description} 
                onChange={e => set("description", e.target.value)} 
                rows={2} 
              />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Button Text</label>
              <input 
                className="wc-input" 
                value={data.button_text} 
                onChange={e => set("button_text", e.target.value)} 
              />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Button URL</label>
              <input 
                className="wc-input" 
                value={data.button_url} 
                onChange={e => set("button_url", e.target.value)} 
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Background Image</label>
              <ImageUploadField 
                value={data.image} 
                onChange={(val) => set("image", val)} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// SEO Editor
// ──────────────────────────────────────────────
const EventsSeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "Events — Renova Life Care | Health Camps & Community Outreach",
    meta_description: "Join Renova Life Care's health camps, awareness seminars, and community drives. Free checkups, vaccinations, and health education in Bangladesh.",
    og_title: "Community Events — Renova Life Care",
    og_description: "Free health camps, awareness seminars, and community drives – bringing quality healthcare closer to the people of Bangladesh.",
    og_image: "/images/og-events.jpg",
    canonical_url: "https://renovalifecare.com/events",
    robots: "index, follow",
    keywords: "health camps, community outreach, awareness seminars, free checkups, healthcare Bangladesh"
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div className="wc-events-editor">
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
              <input 
                className="wc-input" 
                value={data.meta_title} 
                onChange={e => set("meta_title", e.target.value)} 
              />
              <span className="wc-field-hint">Recommended: 50-60 characters</span>
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Meta Description</label>
              <textarea 
                className="wc-textarea" 
                value={data.meta_description} 
                onChange={e => set("meta_description", e.target.value)} 
                rows={3} 
              />
              <span className="wc-field-hint">Recommended: 150-160 characters</span>
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">OG Title</label>
              <input 
                className="wc-input" 
                value={data.og_title} 
                onChange={e => set("og_title", e.target.value)} 
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">OG Description</label>
              <textarea 
                className="wc-textarea" 
                value={data.og_description} 
                onChange={e => set("og_description", e.target.value)} 
                rows={2} 
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">OG Image</label>
              <ImageUploadField 
                value={data.og_image} 
                onChange={(val) => set("og_image", val)} 
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Canonical URL</label>
              <input 
                className="wc-input" 
                value={data.canonical_url} 
                onChange={e => set("canonical_url", e.target.value)} 
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Keywords</label>
              <input 
                className="wc-input" 
                value={data.keywords} 
                onChange={e => set("keywords", e.target.value)} 
              />
              <span className="wc-field-hint">Comma separated keywords</span>
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Robots</label>
              <select 
                className="wc-select" 
                value={data.robots} 
                onChange={e => set("robots", e.target.value)}
              >
                <option value="index, follow">Index, Follow</option>
                <option value="index, nofollow">Index, No Follow</option>
                <option value="noindex, follow">No Index, Follow</option>
                <option value="noindex, nofollow">No Index, No Follow</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// Image Upload Field Component
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

export default EventsPage;