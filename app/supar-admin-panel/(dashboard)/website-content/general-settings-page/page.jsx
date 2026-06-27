"use client";

import { useState, useRef } from "react";
import {
  Settings,
  Layout,
  Search,
  Globe,
  CreditCard,
  MessageSquare,
  BarChart,
  Clock,
  Check,
  ChevronDown,
  Save,
  RefreshCw,
  Eye,
  Plus,
  Trash,
  X,
  ExternalLink,
  Upload,
  Users,
  Mail,
  Phone,
  MapPin,
  Lock,
  Key,
  Database,
  Shield,
  Bell,
  Moon,
  Sun,
  List,
  FileText
} from "lucide-react";
import "./general-settings.css";

const GeneralSettingsPage = () => {
  const [selectedSection, setSelectedSection] = useState("general");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const sections = [
    { id: "general", label: "General Settings", icon: Settings },
    { id: "social-media", label: "Social Media", icon: Globe },
    { id: "payment-gateway", label: "Payment Gateway", icon: CreditCard },
    { id: "sms-gateway", label: "SMS Gateway", icon: MessageSquare },
    { id: "analytics", label: "Analytics & Tag Manager", icon: BarChart }
  ];

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 900));
    setSaving(false);
    showToast("Settings saved successfully!", "success");
  };

  const showToast = (msg, type = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type: "success" }), 3000);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "general":
        return <GeneralSettingsEditor />;
      case "social-media":
        return <SocialMediaEditor />;
      case "payment-gateway":
        return <PaymentGatewayEditor />;
      case "sms-gateway":
        return <SMSGatewayEditor />;
      case "analytics":
        return <AnalyticsEditor />;
      default:
        return <GeneralSettingsEditor />;
    }
  };

  return (
    <div className="wc-settings-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">General Settings</span>
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
                <><Save size={14} /> Save Settings</>
              )}
            </button>
          </div>
        </div>

        <div className="wc-editor-body">
          <nav className="wc-sections-nav">
            <div className="wc-sections-title">Settings</div>
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
                </button>
              );
            })}
          </nav>

          <div className="wc-content-panel">
            <div className="wc-page-info-banner">
              <div className="wc-page-info-left">
                <div className="wc-page-info-icon">
                  <Settings size={20} />
                </div>
                <div className="wc-page-info-text">
                  <h2>General Settings</h2>
                  <p>Editing: {sections.find(s => s.id === selectedSection)?.label}</p>
                </div>
              </div>
              <div className="wc-page-info-meta">
                <span className="wc-meta-tag live">
                  <Check size={11} />
                  Configured
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

// General Settings Editor
const GeneralSettingsEditor = () => {
  const [data, setData] = useState({
    site_name: "Renova Life Care Ltd.",
    site_tagline: "Your Health, Our Priority",
    site_logo: "/images/logo.png",
    favicon: "/images/favicon.ico",
    contact_email: "info@renovalifecare.com",
    contact_phone: "+880 1234-567890",
    address: "123, Dhanmondi, Dhaka, Bangladesh",
    stats: [
      { label: "Happy Patients", value: "15,000+" },
      { label: "Expert Doctors", value: "120+" },
      { label: "Departments", value: "25+" },
      { label: "Years Experience", value: "15+" }
    ]
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  const handleLogoUpload = (imageUrl) => {
    set("site_logo", imageUrl);
  };

  const handleFaviconUpload = (imageUrl) => {
    set("favicon", imageUrl);
  };

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Settings size={15} /> Site Information</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Site Name <span className="required">*</span></label>
              <input className="wc-input" value={data.site_name} onChange={e => set("site_name", e.target.value)} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Site Tagline</label>
              <input className="wc-input" value={data.site_tagline} onChange={e => set("site_tagline", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Site Logo</label>
              <ImageUploadField 
                value={data.site_logo}
                onChange={handleLogoUpload}
                hint="Recommended: 200×60px"
                type="logo"
              />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Favicon</label>
              <ImageUploadField 
                value={data.favicon}
                onChange={handleFaviconUpload}
                hint="Recommended: 32×32px"
                type="favicon"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Mail size={15} /> Contact Information</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field">
              <label className="wc-field-label">Hotmail <span className="required">*</span></label>
              <input className="wc-input" type="email" value={data.contact_email} onChange={e => set("contact_email", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Hotline <span className="required">*</span></label>
              <input className="wc-input" value={data.contact_phone} onChange={e => set("contact_phone", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Contact Email <span className="required">*</span></label>
              <input className="wc-input" type="email" value={data.contact_email} onChange={e => set("contact_email", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Contact Phone <span className="required">*</span></label>
              <input className="wc-input" value={data.contact_phone} onChange={e => set("contact_phone", e.target.value)} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Address</label>
              <textarea className="wc-textarea" value={data.address} onChange={e => set("address", e.target.value)} rows={2} />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><List size={15} /> Stats Counter Strip</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-stat-inputs">
            {data.stats.map((stat, i) => (
              <div key={i} className="wc-stat-input-item">
                <label>{stat.label}</label>
                <input
                  value={stat.value}
                  onChange={e => {
                    const s = [...data.stats];
                    s[i] = { ...s[i], value: e.target.value };
                    set("stats", s);
                  }}
                  placeholder="Enter value"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Social Media Editor
const SocialMediaEditor = () => {
  const [data, setData] = useState({
    social_platforms: [
      { platform: "Facebook", url: "https://facebook.com/renova", active: true },
      { platform: "YouTube", url: "https://youtube.com/renova", active: true },
      { platform: "LinkedIn", url: "https://linkedin.com/renova", active: true },
      { platform: "Instagram", url: "https://instagram.com/renova", active: false },
      { platform: "Twitter", url: "https://twitter.com/renova", active: false }
    ],
    social_share_enabled: true,
    social_login_enabled: false
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Globe size={15} /> Social Media Platforms</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-social-platforms">
            {data.social_platforms.map((platform, i) => (
              <div key={i} className="wc-social-platform">
                <input className="wc-input" value={platform.platform} onChange={e => {
                  const p = [...data.social_platforms];
                  p[i] = { ...p[i], platform: e.target.value };
                  set("social_platforms", p);
                }} placeholder="Platform Name" style={{ width: '150px' }} />
                <input className="wc-input" value={platform.url} onChange={e => {
                  const p = [...data.social_platforms];
                  p[i] = { ...p[i], url: e.target.value };
                  set("social_platforms", p);
                }} placeholder="Profile URL" style={{ flex: 1 }} />
                <ToggleSwitch label="Active" checked={platform.active} />
                <button className="wc-btn wc-btn-danger"><Trash size={14} /></button>
              </div>
            ))}
            <button className="wc-repeater-add"><Plus size={14} /> Add Social Platform</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Payment Gateway Editor
const PaymentGatewayEditor = () => {
  const [data, setData] = useState({
    gateways: [
      { name: "bKash", enabled: true, merchant_id: "BKASH001", api_key: "***" },
      { name: "Nagad", enabled: true, merchant_id: "NAGAD001", api_key: "***" },
      { name: "Rocket", enabled: false, merchant_id: "ROCKET001", api_key: "***" },
      { name: "SSLCommerz", enabled: true, merchant_id: "SSL001", api_key: "***" }
    ],
    default_gateway: "bKash",
    test_mode: true,
    currency: "BDT"
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><CreditCard size={15} /> Payment Gateways</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-gateways">
            {data.gateways.map((gateway, i) => (
              <div key={i} className="wc-gateway">
                <input className="wc-input" value={gateway.name} onChange={e => {
                  const g = [...data.gateways];
                  g[i] = { ...g[i], name: e.target.value };
                  set("gateways", g);
                }} placeholder="Gateway Name" style={{ width: '130px' }} />
                <input className="wc-input" value={gateway.merchant_id} onChange={e => {
                  const g = [...data.gateways];
                  g[i] = { ...g[i], merchant_id: e.target.value };
                  set("gateways", g);
                }} placeholder="Merchant ID" style={{ width: '150px' }} />
                <input className="wc-input" type="password" value={gateway.api_key} onChange={e => {
                  const g = [...data.gateways];
                  g[i] = { ...g[i], api_key: e.target.value };
                  set("gateways", g);
                }} placeholder="API Key" style={{ width: '130px' }} />
                <ToggleSwitch label="Enabled" checked={gateway.enabled} />
                <button className="wc-btn wc-btn-danger"><Trash size={14} /></button>
              </div>
            ))}
            <button className="wc-repeater-add"><Plus size={14} /> Add Payment Gateway</button>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Settings size={15} /> Payment Settings</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field">
              <label className="wc-field-label">Default Payment Gateway</label>
              <select className="wc-select" value={data.default_gateway} onChange={e => set("default_gateway", e.target.value)}>
                {data.gateways.filter(g => g.enabled).map(g => (
                  <option key={g.name} value={g.name}>{g.name}</option>
                ))}
              </select>
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Currency</label>
              <select className="wc-select" value={data.currency} onChange={e => set("currency", e.target.value)}>
                <option value="BDT">BDT</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
          <ToggleSwitch label="Test Mode" desc="Use sandbox environment for testing payments" checked={data.test_mode} />
        </div>
      </div>
    </div>
  );
};

// SMS Gateway Editor
// SMS Gateway Editor - Fixed
const SMSGatewayEditor = () => {
  const [data, setData] = useState({
    provider: "Twilio",
    enabled: true,
    account_sid: "AC***",
    auth_token: "***",
    phone_number: "+8801234567890",
    message_template: "Hello {name}, your appointment at Renova Life Care is confirmed for {date} at {time}.",
    enable_appointment_reminders: true,
    enable_promotional_sms: false,
    sender_id: "RENOVA"
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><MessageSquare size={15} /> SMS Gateway Configuration</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field">
              <label className="wc-field-label">SMS Provider</label>
              <select className="wc-select" value={data.provider} onChange={e => set("provider", e.target.value)}>
                <option value="Twilio">Twilio</option>
                <option value="Vonage">Vonage</option>
                <option value="MessageBird">MessageBird</option>
                <option value="Custom">Custom</option>
              </select>
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Sender ID</label>
              <input className="wc-input" value={data.sender_id} onChange={e => set("sender_id", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Account SID</label>
              <input className="wc-input" value={data.account_sid} onChange={e => set("account_sid", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Auth Token</label>
              <input className="wc-input" type="password" value={data.auth_token} onChange={e => set("auth_token", e.target.value)} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Phone Number</label>
              <input className="wc-input" value={data.phone_number} onChange={e => set("phone_number", e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><MessageSquare size={15} /> SMS Templates & Settings</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field">
            <label className="wc-field-label">SMS Message Template</label>
            <textarea className="wc-textarea" value={data.message_template} onChange={e => set("message_template", e.target.value)} rows={4} />
            <span className="wc-field-hint">Available variables: &#123;name&#125;, &#123;date&#125;, &#123;time&#125;, &#123;phone&#125;, &#123;email&#125;</span>
          </div>
          <div style={{ marginTop: 16 }}>
            <ToggleSwitch label="Enable SMS Gateway" checked={data.enabled} />
            <ToggleSwitch label="Enable Appointment Reminders" desc="Send SMS reminders for appointments" checked={data.enable_appointment_reminders} />
            <ToggleSwitch label="Enable Promotional SMS" desc="Send promotional messages to patients" checked={data.enable_promotional_sms} />
          </div>
        </div>
      </div>
    </div>
  );
};
// Analytics Editor
const AnalyticsEditor = () => {
  const [data, setData] = useState({
    google_search_console: {
      enabled: false,
      verification_code: "",
      property_url: "https://renovalifecare.com"
    },
    google_analytics: {
      enabled: true,
      measurement_id: "G-XXXXXXXXXX",
      tracking_id: "UA-XXXXXXXX-X"
    },
    google_tag_manager: {
      enabled: true,
      container_id: "GTM-XXXXXXX"
    },
    facebook_pixel: {
      enabled: false,
      pixel_id: "XXXXXXXXXXXXXXX"
    }
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><FileText size={15} /> Google Search Console</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Property URL</label>
              <input 
                className="wc-input" 
                value={data.google_search_console.property_url} 
                onChange={e => set("google_search_console", { ...data.google_search_console, property_url: e.target.value })} 
                placeholder="https://yourwebsite.com" 
              />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Verification Code</label>
              <textarea 
                className="wc-textarea" 
                value={data.google_search_console.verification_code} 
                onChange={e => set("google_search_console", { ...data.google_search_console, verification_code: e.target.value })} 
                rows={3}
                placeholder="Paste the HTML meta tag verification code here..."
              />
              <span className="wc-field-hint">Copy the meta tag content from Google Search Console and paste it here</span>
            </div>
          </div>
          <ToggleSwitch label="Enable Google Search Console" checked={data.google_search_console.enabled} />
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><BarChart size={15} /> Google Analytics</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Measurement ID (GA4)</label>
              <input className="wc-input" value={data.google_analytics.measurement_id} onChange={e => set("google_analytics", { ...data.google_analytics, measurement_id: e.target.value })} placeholder="G-XXXXXXXXXX" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Tracking ID (Universal Analytics)</label>
              <input className="wc-input" value={data.google_analytics.tracking_id} onChange={e => set("google_analytics", { ...data.google_analytics, tracking_id: e.target.value })} placeholder="UA-XXXXXXXX-X" />
            </div>
          </div>
          <ToggleSwitch label="Enable Google Analytics" checked={data.google_analytics.enabled} />
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Database size={15} /> Google Tag Manager</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field">
            <label className="wc-field-label">Container ID</label>
            <input className="wc-input" value={data.google_tag_manager.container_id} onChange={e => set("google_tag_manager", { ...data.google_tag_manager, container_id: e.target.value })} placeholder="GTM-XXXXXXX" />
          </div>
          <ToggleSwitch label="Enable Google Tag Manager" checked={data.google_tag_manager.enabled} />
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Users size={15} /> Facebook Pixel</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field">
            <label className="wc-field-label">Pixel ID</label>
            <input className="wc-input" value={data.facebook_pixel.pixel_id} onChange={e => set("facebook_pixel", { ...data.facebook_pixel, pixel_id: e.target.value })} placeholder="XXXXXXXXXXXXXXX" />
          </div>
          <ToggleSwitch label="Enable Facebook Pixel" checked={data.facebook_pixel.enabled} />
        </div>
      </div>
    </div>
  );
};

// ImageUploadField Component
const ImageUploadField = ({ value, onChange, hint, type = 'default' }) => {
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

  const getPreviewClass = () => {
    if (type === 'logo') return 'wc-image-preview logo-preview';
    if (type === 'favicon') return 'wc-image-preview favicon-preview';
    return 'wc-image-preview';
  };

  return (
    <div className="wc-field">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        onChange={handleFileSelect}
      />
      {value ? (
        <div className={getPreviewClass()}>
          <img src={value} alt={type === 'logo' ? 'Site Logo' : type === 'favicon' ? 'Favicon' : 'Uploaded image'} />
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
          <p>Click to browse</p>
          <span>{hint || 'Upload image'}</span>
        </div>
      )}
    </div>
  );
};

// ToggleSwitch Component
const ToggleSwitch = ({ label, desc, checked }) => {
  return (
    <div className="wc-toggle-row">
      <div className="wc-toggle-info">
        <h4>{label}</h4>
        {desc && <p>{desc}</p>}
      </div>
      <label className="wc-switch">
        <input type="checkbox" defaultChecked={checked} />
        <span className="wc-switch-slider" />
      </label>
    </div>
  );
};

export default GeneralSettingsPage;