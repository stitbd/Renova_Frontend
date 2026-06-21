"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera, BadgeCheck, Pencil, Check, X, User, Calendar, Droplet,
  Phone, Mail, MapPin, Briefcase, Heart, Ruler, Scale, AlertCircle,
  Pill, Scissors, Users, Cigarette, Wine, Dumbbell, FileText, TestTube,
  Syringe, Award, Eye, Download, Share2, Video, MessageSquare, Stethoscope,
  Globe, ChevronRight, CalendarCheck, CalendarClock,
  Scan, Flag, Activity,
} from "lucide-react";
import "./outlet-patient-profile.css";

/* ───────────────────────── Helpers ───────────────────────── */

function calculateAge(dob) {
  if (!dob) return "—";
  const birth = new Date(dob);
  if (isNaN(birth)) return "—";
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d)) return value;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function getBMI(height, weight) {
  const h = parseFloat(height);
  const w = parseFloat(weight);
  if (!h || !w) return null;
  const m = h / 100;
  return +(w / (m * m)).toFixed(1);
}

function bmiCategory(bmi) {
  if (bmi == null) return { label: "—", tone: "muted" };
  if (bmi < 18.5) return { label: "Underweight", tone: "blue" };
  if (bmi < 25) return { label: "Normal", tone: "green" };
  if (bmi < 30) return { label: "Overweight", tone: "orange" };
  return { label: "Obese", tone: "red" };
}

/* ───────────────────────── Animation Variants ───────────────────────── */

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 110 } },
};

/* ───────────────────────── Static Data ───────────────────────── */

const initialProfile = {
  avatar: "/images/patients/01.jpg",
  name: "Md. Rakib Hasan",
  patientId: "PT-2025-000123",
  verified: true,

  // Personal Information
  dob: "1993-01-15",
  gender: "Male",
  bloodGroup: "B+",
  nationality: "Bangladeshi",
  maritalStatus: "Married",
  occupation: "Software Engineer",

  // Contact Information
  phone: "+880 1712-345678",
  email: "rakib.hasan@email.com",
  emergencyContactName: "Karim Hasan",
  emergencyContactPhone: "+880 1812-987654",
  address: "House #45, Road #12, Dhanmondi",
  city: "Dhaka",
  country: "Bangladesh",

  // Medical Information
  height: 170,
  weight: 68,
  allergies: "Penicillin, Dust, Pollen",
  chronicDiseases: { diabetes: false, hypertension: true, asthma: false, heartDisease: false },
  currentMedications: "Losartan 50mg — once daily\nMetformin 500mg — twice daily",
  pastSurgeries: "Appendectomy (2015)",
  familyHistory: "Father: Diabetes, Hypertension\nMother: Hypertension",
  smoking: "Never",
  alcohol: "Occasionally",
  physicalActivity: "Moderate",
  sleep: "6–7 hrs/night"
};

const healthSummary = [
  { label: "Total Consultations", value: 18, icon: Stethoscope, color: "blue" },
  { label: "Upcoming Appointments", value: 2, icon: CalendarClock, color: "orange" },
  { label: "Completed Appointments", value: 16, icon: CalendarCheck, color: "green" },
  { label: "Prescriptions", value: 22, icon: Pill, color: "purple" },
  { label: "Medical Reports", value: 12, icon: FileText, color: "cyan" },
];

const personalFields = [
  { key: "name", label: "Full Name", type: "text", icon: User },
  { key: "dob", label: "Date of Birth", type: "date", icon: Calendar },
  { key: "gender", label: "Gender", type: "select", icon: User, options: ["Male", "Female", "Other"] },
  { key: "bloodGroup", label: "Blood Group", type: "select", icon: Droplet, options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
  { key: "nationality", label: "Nationality", type: "text", icon: Flag },
  { key: "maritalStatus", label: "Marital Status", type: "select", icon: Heart, options: ["Single", "Married", "Divorced", "Widowed"] },
  { key: "occupation", label: "Occupation", type: "text", icon: Briefcase },
];

const contactFields = [
  { key: "phone", label: "Mobile Number", type: "tel", icon: Phone },
  { key: "email", label: "Email Address", type: "email", icon: Mail },
  { key: "emergencyContactName", label: "Emergency Contact Name", type: "text", icon: User },
  { key: "emergencyContactPhone", label: "Emergency Contact Number", type: "tel", icon: Phone },
  { key: "address", label: "Address", type: "textarea", icon: MapPin, full: true },
  { key: "city", label: "City", type: "text", icon: MapPin },
  { key: "country", label: "Country", type: "text", icon: Globe },
];

const chronicDiseaseOptions = [
  { key: "diabetes", label: "Diabetes" },
  { key: "hypertension", label: "Hypertension" },
  { key: "asthma", label: "Asthma" },
  { key: "heartDisease", label: "Heart Disease" },
];

const lifestyleFields = [
  { key: "smoking", label: "Smoking", icon: Cigarette, options: ["Never", "Former", "Current"] },
  { key: "alcohol", label: "Alcohol", icon: Wine, options: ["Never", "Occasionally", "Regularly"] },
  { key: "sleep", label: "Sleep", icon: Wine, options: ["6–7 hrs/night", "5–6 hrs/night", "4–5 hrs/night"] },
  { key: "physicalActivity", label: "Physical Activity", icon: Dumbbell, options: ["Sedentary", "Light", "Moderate", "Active"] },
];

const recordCategories = ["All", "Prescriptions", "Diagnostic Reports", "Lab Test Results", "Vaccination Records", "Medical Certificates"];

const medicalRecords = [
  { id: 1, category: "Prescriptions", title: "Prescription — Cardiology Follow-up", issuer: "Dr. Ayesha Rahman", date: "31 May 2025", icon: Pill, color: "blue" },
  { id: 2, category: "Prescriptions", title: "Prescription — Hypertension Management", issuer: "Dr. Abdullah Al Noman", date: "08 May 2025", icon: Pill, color: "blue" },
  { id: 3, category: "Diagnostic Reports", title: "Chest X-Ray Report", issuer: "Dhanmondi Diagnostic Center", date: "10 May 2025", icon: Scan, color: "purple" },
  { id: 4, category: "Diagnostic Reports", title: "ECG Report", issuer: "Dhanmondi Diagnostic Center", date: "09 May 2025", icon: Activity, color: "purple" },
  { id: 5, category: "Lab Test Results", title: "Lipid Profile Test", issuer: "Popular Diagnostics", date: "15 May 2025", icon: TestTube, color: "orange" },
  { id: 6, category: "Lab Test Results", title: "Complete Blood Count (CBC)", issuer: "Popular Diagnostics", date: "01 Mar 2025", icon: TestTube, color: "orange" },
  { id: 7, category: "Vaccination Records", title: "COVID-19 Booster Dose", issuer: "Dhanmondi Outlet", date: "12 Jan 2025", icon: Syringe, color: "green" },
  { id: 8, category: "Medical Certificates", title: "Fitness Certificate", issuer: "Dr. Farhana Akter", date: "20 Dec 2024", icon: Award, color: "cyan" },
];

const consultationHistory = [
  { id: 1, doctor: "Dr. Abdullah Al Noman", specialty: "Cardiologist", date: "31 May 2025", time: "10:30 AM", type: "Video", status: "Completed" },
  { id: 2, doctor: "Dr. Farhana Akter", specialty: "General Physician", date: "15 May 2025", time: "09:15 AM", type: "Audio", status: "Completed" },
  { id: 3, doctor: "Dr. Hasan Mahmud", specialty: "Radiologist", date: "10 May 2025", time: "11:00 AM", type: "Chat", status: "Completed" },
  { id: 4, doctor: "Dr. Ayesha Rahman", specialty: "Dermatologist", date: "20 Jun 2025", time: "11:30 AM", type: "Video", status: "Upcoming" },
  { id: 5, doctor: "Dr. Sumaiya Khan", specialty: "Gynecologist", date: "29 May 2025", time: "03:45 PM", type: "Video", status: "Cancelled" },
  { id: 6, doctor: "Dr. Rafiq Ahmed", specialty: "Orthopedic", date: "28 May 2025", time: "02:30 PM", type: "Audio", status: "Missed" },
];

const typeIcons = { Video, Audio: Phone, Chat: MessageSquare };

/* ───────────────────────── Small Components ───────────────────────── */

function FieldRow({ field, value, editing, onChange }) {
  const Icon = field.icon;
  return (
    <div className={`pp-field${field.full ? " full" : ""}`}>
      <label><Icon size={13} /> {field.label}</label>
      {editing ? (
        field.type === "select" ? (
          <select value={value} onChange={onChange}>
            {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        ) : field.type === "textarea" ? (
          <textarea rows={3} value={value} onChange={onChange} />
        ) : (
          <input type={field.type} value={value} onChange={onChange} />
        )
      ) : (
        <p>{field.type === "date" ? formatDate(value) : (value || "—")}</p>
      )}
    </div>
  );
}

/* ───────────────────────── Main Page ───────────────────────── */

export default function PatientProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);
  const [saved, setSaved] = useState(false);
  const [recordFilter, setRecordFilter] = useState("All");

  const handleEdit = () => {
    setDraft({ ...profile, chronicDiseases: { ...profile.chronicDiseases } });
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile({ ...draft, chronicDiseases: { ...draft.chronicDiseases } });
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setDraft({ ...profile, chronicDiseases: { ...profile.chronicDiseases } });
    setIsEditing(false);
  };

  const set = (field) => (e) => setDraft((p) => ({ ...p, [field]: e.target.value }));

  const toggleChronic = (key) =>
    setDraft((p) => ({ ...p, chronicDiseases: { ...p.chronicDiseases, [key]: !p.chronicDiseases[key] } }));

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setDraft((p) => ({ ...p, avatar: URL.createObjectURL(file) }));
  };

  const current = isEditing ? draft : profile;
  const age = calculateAge(current.dob);
  const bmi = getBMI(current.height, current.weight);
  const bmiInfo = bmiCategory(bmi);
  const checkedConditions = chronicDiseaseOptions.filter((o) => profile.chronicDiseases[o.key]);
  const filteredRecords = medicalRecords.filter((r) => recordFilter === "All" || r.category === recordFilter);

  return (
    <motion.div className="pp-page" variants={container} initial="hidden" animate="show">
      {/* Save toast */}
      <AnimatePresence>
        {saved && (
          <motion.div
            className="pp-success"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Check size={16} />
            Profile updated successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 1. Profile Header ── */}
      <motion.div className="pp-header-card" variants={item}>
        <div className="pp-header-main">
          <div className="pp-avatar-wrap">
            <div className="pp-avatar">
              <User size={32} className="pp-avatar-fallback" />
              <img
                src={current.avatar}
                alt={current.name}
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>
            {isEditing && (
              <label className="pp-avatar-edit" title="Change photo">
                <Camera size={13} />
                <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: "none" }} />
              </label>
            )}
          </div>

          <div className="pp-header-info">
            <div className="pp-name-row">
              {isEditing ? (
                <input className="pp-name-input" value={draft.name} onChange={set("name")} />
              ) : (
                <h2>{profile.name}</h2>
              )}
              {profile.verified && (
                <span className="pp-verified-badge"><BadgeCheck size={13} /> Verified</span>
              )}
            </div>
            <p className="pp-patient-id">Patient ID: <strong>{profile.patientId}</strong></p>
            <div className="pp-chip-row">
              <span className="pp-chip"><Calendar size={12} /> {age} Years</span>
              <span className="pp-chip"><User size={12} /> {current.gender}</span>
              <span className="pp-chip pp-chip-blood"><Droplet size={12} /> {current.bloodGroup}</span>
            </div>
          </div>

          <div className="pp-header-actions">
            {isEditing ? (
              <>
                <button className="pp-btn pp-btn-primary" onClick={handleSave}>
                  <Check size={15} /> Save Changes
                </button>
                <button className="pp-btn pp-btn-ghost" onClick={handleCancel}>
                  <X size={15} /> Cancel
                </button>
              </>
            ) : (
              <button className="pp-btn pp-btn-primary" onClick={handleEdit}>
                <Pencil size={15} /> Edit Profile
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* ── 5. Health Summary ── */}
      <motion.div className="pp-summary-grid" variants={container} initial="hidden" animate="show">
        {healthSummary.map((s, i) => (
          <motion.div
            key={i}
            className={`pp-summary-card pp-${s.color}`}
            variants={item}
            whileHover={{ y: -6, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", transition: { duration: 0.2 } }}
          >
            <motion.div
              className="pp-summary-icon"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <s.icon size={20} />
            </motion.div>
            <div className="pp-summary-text">
              <span className="pp-summary-value">{s.value}</span>
              <span className="pp-summary-label">{s.label}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Main Content Grid ── */}
      <div className="pp-content-grid">
        <div className="pp-main-col">

          {/* ── 2 & 3. Personal + Contact Information ── */}
          <div className="pp-two-col">
            <motion.div className="pp-card" variants={item} initial="hidden" animate="show">
              <h3 className="pp-card-title"><User size={16} /> Personal Information</h3>
              <div className="pp-field-grid">
                {personalFields.map((f) => (
                  <FieldRow key={f.key} field={f} value={current[f.key]} editing={isEditing} onChange={set(f.key)} />
                ))}
              </div>
            </motion.div>

            <motion.div className="pp-card" variants={item} initial="hidden" animate="show">
              <h3 className="pp-card-title"><Phone size={16} /> Contact Information</h3>
              <div className="pp-field-grid">
                {contactFields.map((f) => (
                  <FieldRow key={f.key} field={f} value={current[f.key]} editing={isEditing} onChange={set(f.key)} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── 4. Medical Information ── */}
          <motion.div className="pp-card" variants={item} initial="hidden" animate="show">
            <h3 className="pp-card-title"><Heart size={16} /> Medical Information</h3>

            <h4 className="pp-sub-heading">Body Metrics</h4>
            <div className="pp-metrics-row">
              <div className="pp-metric-box">
                <span className="pp-metric-label"><Ruler size={13} /> Height</span>
                {isEditing ? (
                  <div className="pp-metric-input">
                    <input type="number" value={draft.height} onChange={set("height")} />
                    <span>cm</span>
                  </div>
                ) : (
                  <span className="pp-metric-value">{profile.height} <small>cm</small></span>
                )}
              </div>
              <div className="pp-metric-box">
                <span className="pp-metric-label"><Scale size={13} /> Weight</span>
                {isEditing ? (
                  <div className="pp-metric-input">
                    <input type="number" value={draft.weight} onChange={set("weight")} />
                    <span>kg</span>
                  </div>
                ) : (
                  <span className="pp-metric-value">{profile.weight} <small>kg</small></span>
                )}
              </div>
              <div className="pp-metric-box">
                <span className="pp-metric-label"><Activity size={13} /> BMI (Auto)</span>
                <span className="pp-metric-value">
                  {bmi ?? "—"}
                  {bmi != null && <span className={`pp-bmi-tag pp-tag-${bmiInfo.tone}`}>{bmiInfo.label}</span>}
                </span>
              </div>
            </div>

            <h4 className="pp-sub-heading">Allergies &amp; Chronic Conditions</h4>
            <div className="pp-field full">
              <label><AlertCircle size={13} /> Allergies</label>
              {isEditing ? (
                <input type="text" value={draft.allergies} onChange={set("allergies")} placeholder="Separate with commas" />
              ) : (
                <div className="pp-tag-list">
                  {profile.allergies.split(",").map((a) => a.trim()).filter(Boolean).map((a, i) => (
                    <span key={i} className="pp-allergy-tag">{a}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="pp-field full">
              <label><Stethoscope size={13} /> Chronic Diseases</label>
              {isEditing ? (
                <div className="pp-check-grid">
                  {chronicDiseaseOptions.map((opt) => (
                    <label key={opt.key} className="pp-check-item">
                      <input
                        type="checkbox"
                        checked={draft.chronicDiseases[opt.key]}
                        onChange={() => toggleChronic(opt.key)}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              ) : (
                <div className="pp-tag-list">
                  {checkedConditions.length === 0 ? (
                    <span className="pp-muted">No chronic conditions reported</span>
                  ) : (
                    checkedConditions.map((o) => <span key={o.key} className="pp-condition-tag">{o.label}</span>)
                  )}
                </div>
              )}
            </div>

            <h4 className="pp-sub-heading">Medical History</h4>
            <div className="pp-field-grid">
              <div className="pp-field full">
                <label><Pill size={13} /> Current Medications</label>
                {isEditing ? (
                  <textarea rows={3} value={draft.currentMedications} onChange={set("currentMedications")} />
                ) : (
                  <p className="pp-multiline">{profile.currentMedications}</p>
                )}
              </div>
              <div className="pp-field">
                <label><Scissors size={13} /> Past Surgeries</label>
                {isEditing ? (
                  <textarea rows={2} value={draft.pastSurgeries} onChange={set("pastSurgeries")} />
                ) : (
                  <p className="pp-multiline">{profile.pastSurgeries}</p>
                )}
              </div>
              <div className="pp-field">
                <label><Users size={13} /> Family Medical History</label>
                {isEditing ? (
                  <textarea rows={2} value={draft.familyHistory} onChange={set("familyHistory")} />
                ) : (
                  <p className="pp-multiline">{profile.familyHistory}</p>
                )}
              </div>
            </div>

            <h4 className="pp-sub-heading">Lifestyle Information</h4>
            <div className="pp-lifestyle-grid">
              {lifestyleFields.map((f) => (
                <div key={f.key} className="pp-lifestyle-item">
                  <span className="pp-lifestyle-icon"><f.icon size={16} /></span>
                  <div className="pp-lifestyle-body">
                    <span className="pp-lifestyle-label">{f.label}</span>
                    {isEditing ? (
                      <select value={draft[f.key]} onChange={set(f.key)}>
                        {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    ) : (
                      <span className="pp-lifestyle-value">{profile[f.key]}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── 6. Medical Records ── */}
          <motion.div className="pp-card" variants={item} initial="hidden" animate="show">
            <h3 className="pp-card-title"><FileText size={16} /> Medical Records</h3>
            <div className="pp-tabs">
              {recordCategories.map((cat) => (
                <button
                  key={cat}
                  className={`pp-tab${recordFilter === cat ? " active" : ""}`}
                  onClick={() => setRecordFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="pp-records-grid">
              {filteredRecords.length === 0 && <p className="pp-empty">No records in this category yet.</p>}
              {filteredRecords.map((r) => (
                <div key={r.id} className="pp-record-card">
                  <div className={`pp-record-icon pp-${r.color}`}><r.icon size={18} /></div>
                  <div className="pp-record-info">
                    <p className="pp-record-title">{r.title}</p>
                    <p className="pp-record-meta">{r.issuer} • {r.date}</p>
                    <span className="pp-record-category">{r.category}</span>
                  </div>
                  <div className="pp-record-actions">
                    <button className="pp-icon-btn" title="View"><Eye size={14} /></button>
                    <button className="pp-icon-btn" title="Download PDF"><Download size={14} /></button>
                    <button className="pp-icon-btn" title="Share with Doctor"><Share2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── 7. Consultation History ── */}
          <motion.div className="pp-card" variants={item} initial="hidden" animate="show">
            <h3 className="pp-card-title"><Stethoscope size={16} /> Consultation History</h3>

            <div className="pp-history-table-wrap">
              <table className="pp-history-table">
                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Specialty</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {consultationHistory.map((c) => {
                    const TypeIcon = typeIcons[c.type];
                    return (
                      <tr key={c.id}>
                        <td>{c.doctor}</td>
                        <td>{c.specialty}</td>
                        <td>{c.date}<span className="pp-sub">{c.time}</span></td>
                        <td><span className="pp-type-pill"><TypeIcon size={13} /> {c.type}</span></td>
                        <td><span className={`pp-status-badge pp-status-${c.status.toLowerCase()}`}>{c.status}</span></td>
                        <td><button className="pp-link-btn">View Details <ChevronRight size={14} /></button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="pp-history-cards">
              {consultationHistory.map((c) => {
                const TypeIcon = typeIcons[c.type];
                return (
                  <div key={c.id} className="pp-history-card">
                    <div className="pp-history-card-top">
                      <div>
                        <p className="pp-history-doctor">{c.doctor}</p>
                        <p className="pp-history-specialty">{c.specialty}</p>
                      </div>
                      <span className={`pp-status-badge pp-status-${c.status.toLowerCase()}`}>{c.status}</span>
                    </div>
                    <div className="pp-history-card-bottom">
                      <span className="pp-type-pill"><TypeIcon size={13} /> {c.type}</span>
                      <span className="pp-sub">{c.date} · {c.time}</span>
                    </div>
                    <button className="pp-link-btn full">View Details <ChevronRight size={14} /></button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}