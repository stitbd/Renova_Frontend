"use client";

import { useState } from "react";
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
  Sun
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
    timezone: "Asia/Dhaka",
    date_format: "MMM DD, YYYY",
    time_format: "24 Hour",
    maintenance_mode: false,
    enable_registration: true,
    enable_appointments: true,
    enable_online_payments: true
  });

  const set = (k, v) => setData({ ...data, [k]: v });

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
              <ImageUploadField label="" hint="Recommended: 200×60px" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Favicon</label>
              <ImageUploadField label="" hint="Recommended: 32×32px" />
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
          <h3 className="wc-editor-card-title"><Clock size={15} /> Regional Settings</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field">
              <label className="wc-field-label">Timezone</label>
              <select className="wc-select" value={data.timezone} onChange={e => set("timezone", e.target.value)}>
                <option value="Asia/Dhaka">Asia/Dhaka (UTC+6)</option>
                <option value="Asia/Kolkata">Asia/Kolkata (UTC+5:30)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Date Format</label>
              <select className="wc-select" value={data.date_format} onChange={e => set("date_format", e.target.value)}>
                <option value="MMM DD, YYYY">MMM DD, YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Time Format</label>
              <select className="wc-select" value={data.time_format} onChange={e => set("time_format", e.target.value)}>
                <option value="24 Hour">24 Hour</option>
                <option value="12 Hour">12 Hour</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Shield size={15} /> Site Features</h3>
        </div>
        <div className="wc-editor-card-body">
          <ToggleSwitch label="Maintenance Mode" desc="Show maintenance page to visitors" checked={data.maintenance_mode} />
          <ToggleSwitch label="Enable User Registration" desc="Allow new user registrations" checked={data.enable_registration} />
          <ToggleSwitch label="Enable Appointments" desc="Allow patients to book appointments online" checked={data.enable_appointments} />
          <ToggleSwitch label="Enable Online Payments" desc="Accept online payments for services" checked={data.enable_online_payments} />
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

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Settings size={15} /> Social Features</h3>
        </div>
        <div className="wc-editor-card-body">
          <ToggleSwitch label="Enable Social Sharing" desc="Allow users to share content on social media" checked={data.social_share_enabled} />
          <ToggleSwitch label="Enable Social Login" desc="Allow users to login using social accounts" checked={data.social_login_enabled} />
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
            <span className="wc-field-hint">Available variables: {name}, {date}, {time}, {phone}, {email}</span>
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
    },
    enable_consent_banner: true,
    track_events: true,
    anonymize_ip: true
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
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

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Shield size={15} /> Privacy & Tracking Settings</h3>
        </div>
        <div className="wc-editor-card-body">
          <ToggleSwitch label="Enable Consent Banner" desc="Show cookie consent banner to visitors" checked={data.enable_consent_banner} />
          <ToggleSwitch label="Track Events" desc="Track user interactions and events" checked={data.track_events} />
          <ToggleSwitch label="Anonymize IP" desc="Anonymize IP addresses for privacy" checked={data.anonymize_ip} />
        </div>
      </div>
    </div>
  );
};

// Helper Components
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