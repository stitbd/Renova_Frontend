// app/outlet/settings/page.jsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Building2, Bell, Lock, CreditCard, Link,
  Edit, Save, AlertTriangle, Shield, Key,
  Mail, Phone, MapPin, Globe, Clock as ClockIcon
} from "lucide-react";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("outlet");
  const [isEditing, setIsEditing] = useState(false);

  const outletSettings = {
    name: "Renova Dhanmondi Outlet",
    outletId: "OUT-1001",
    address: "House #45, Road #12, Dhanmondi, Dhaka-1209",
    phone: "+880 2-9876543",
    email: "dhanmondi@renova.life",
    subdomain: "dhanmondi.renova.life",
    workingHours: "09:00 AM - 09:00 PM",
  };

  const notificationSettings = {
    email: true,
    sms: false,
    push: true,
    appointmentReminders: true,
    lowStockAlerts: true,
    dailyReports: true,
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="settings-layout">
      {/* Settings Sidebar */}
      <motion.aside className="settings-sidebar">
        <nav className="settings-nav">
          {[
            { id: "outlet", label: "Outlet Info", icon: Building2 },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "security", label: "Security", icon: Shield },
            { id: "billing", label: "Billing", icon: CreditCard },
            { id: "integrations", label: "Integrations", icon: Link },
          ].map(section => {
            const IconComponent = section.icon;
            return (
              <motion.button
                key={section.id}
                className={`settings-nav-item ${activeSection === section.id ? "active" : ""}`}
                onClick={() => setActiveSection(section.id)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="nav-icon"><IconComponent size={18} /></span>
                <span className="nav-label">{section.label}</span>
              </motion.button>
            );
          })}
        </nav>
      </motion.aside>

      {/* Settings Content */}
      <motion.div className="settings-content">
        {activeSection === "outlet" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="section-header">
              <h2 className="section-title">Outlet Information</h2>
              <motion.button
                className="btn-edit"
                onClick={() => setIsEditing(!isEditing)}
                whileHover={{ scale: 1.02 }}
              >
                {isEditing ? <Save size={16} /> : <Edit size={16} />}
                {isEditing ? "Save Changes" : "Edit"}
              </motion.button>
            </div>

            <div className="settings-form">
              {[
                { label: "Outlet Name", key: "name", type: "text", icon: Building2 },
                { label: "Outlet ID", key: "outletId", type: "text", icon: CreditCard, disabled: true },
                { label: "Address", key: "address", type: "textarea", icon: MapPin },
                { label: "Phone", key: "phone", type: "tel", icon: Phone },
                { label: "Email", key: "email", type: "email", icon: Mail },
                { label: "Subdomain", key: "subdomain", type: "text", icon: Globe, disabled: true },
                { label: "Working Hours", key: "workingHours", type: "text", icon: ClockIcon },
              ].map(field => {
                const IconComponent = field.icon;
                return (
                  <motion.div key={field.key} className="form-row" whileHover={{ backgroundColor: "#f8fafc" }}>
                    <label className="form-label">
                      <IconComponent size={14} /> {field.label}
                    </label>
                    {isEditing && !field.disabled ? (
                      field.type === "textarea" ? (
                        <textarea
                          className="form-input"
                          defaultValue={outletSettings[field.key]}
                          rows={3}
                        />
                      ) : (
                        <input
                          type={field.type}
                          className="form-input"
                          defaultValue={outletSettings[field.key]}
                        />
                      )
                    ) : (
                      <p className="form-value">{outletSettings[field.key]}</p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeSection === "notifications" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="section-header">
              <h2 className="section-title">Notification Preferences</h2>
            </div>

            <div className="notification-settings">
              {[
                { label: "Email Notifications", desc: "Receive updates via email", key: "email" },
                { label: "SMS Notifications", desc: "Receive text message alerts", key: "sms" },
                { label: "Push Notifications", desc: "Browser/app notifications", key: "push" },
                { label: "Appointment Reminders", desc: "Send reminders to patients", key: "appointmentReminders" },
                { label: "Low Stock Alerts", desc: "Alert when inventory is low", key: "lowStockAlerts" },
                { label: "Daily Reports", desc: "Receive daily summary reports", key: "dailyReports" },
              ].map(setting => (
                <motion.div
                  key={setting.key}
                  className="notification-row"
                  whileHover={{ backgroundColor: "#f8fafc" }}
                >
                  <div>
                    <label className="notification-label">{setting.label}</label>
                    <p className="notification-desc">{setting.desc}</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      defaultChecked={notificationSettings[setting.key]}
                      disabled={!isEditing}
                    />
                    <span className="toggle-slider" />
                  </label>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === "security" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="section-header">
              <h2 className="section-title">Security Settings</h2>
            </div>

            <div className="security-settings">
              <div className="security-card">
                <h4><Key size={16} /> Change Password</h4>
                <p className="security-desc">Update your account password regularly</p>
                <motion.button className="btn-secondary" whileHover={{ scale: 1.02 }}>
                  Change Password
                </motion.button>
              </div>

              <div className="security-card">
                <h4><Shield size={16} /> Two-Factor Authentication</h4>
                <p className="security-desc">Add an extra layer of security to your account</p>
                <label className="toggle-switch large">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider" />
                </label>
              </div>

              <div className="security-card danger">
                <h4><AlertTriangle size={16} /> Danger Zone</h4>
                <p className="security-desc">Once you delete your outlet, there is no going back.</p>
                <motion.button className="btn-danger" whileHover={{ scale: 1.02 }}>
                  Delete Outlet
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}