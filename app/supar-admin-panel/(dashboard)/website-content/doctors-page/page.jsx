"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import {
  UserCheck,
  Layout,
  Search,
  UserPlus,
  User,
  Users,
  List,
  Clock,
  Star,
  Heart,
  Calendar,
  MessageCircle,
  Award,
  Check,
  ChevronDown,
  Save,
  RefreshCw,
  Eye,
  Upload,
  Trash,
  Plus,
  X,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Share2,
  BookOpen,
  Globe,
  PhoneCall,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  Home,
  ChevronRight,
  Menu,
  X as XIcon,
  Edit,
  Tag,
  Stethoscope,
  Briefcase,
  GraduationCap,
  Building2,
  ShieldCheck,
  BadgeCheck,
  AlertCircle,
  Copy,
  ArrowUp,
  ArrowDown,
  Minus,
  Maximize2,
  Minimize2,
  Settings,
  Filter
} from "lucide-react";
import "./doctors.css";
import "../website-content.css";

// ──────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────
const DoctorsPage = () => {
  const [selectedSection, setSelectedSection] = useState("doctor-listing");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Fariha Rahman",
      specialty: "Cardiologist",
      credentials: "MBBS, MD (Cardiology), FCPS",
      experience: "18 Years",
      rating: 4.9,
      patients: "3,200++",
      image: "/images/doctors/doctor-1.jpg",
      available: true,
      about: "Dr. Fariha Rahman is a renowned cardiologist with expertise in interventional cardiology.",
      education: ["MBBS - Dhaka Medical College", "MD (Cardiology) - BSMMU"],
      specialties: ["Interventional Cardiology", "Heart Failure Management"],
      languages: ["Bengali", "English"],
      consultation: {
        days: "Sun, Mon, Wed, Thu",
        time: "9:00 AM – 1:00 PM | 5:00 PM – 8:00 PM",
        fee: "BDT 1,500",
        availableDays: ["Sunday", "Monday", "Wednesday", "Thursday"]
      },
      reviews: [
        { name: "Mr. Kamal Hossain", rating: 5, text: "Excellent doctor!", date: "2 weeks ago" }
      ],
      location: "House #12, Gulshan 2, Dhaka-1212, Bangladesh",
      phone: "+880 1700-000001",
      email: "dr.fariha@renovalifecare.com",
      branch: "Main Facility, Gulshan"
    },
    {
      id: 2,
      name: "Dr. Nasreen Akter",
      specialty: "Cardiologist",
      credentials: "MBBS, MD (Cardiology), FCPS",
      experience: "18 Years",
      rating: 4.9,
      patients: "3,200++",
      image: "/images/doctors/doctor-2.jpg",
      available: true,
      about: "Dr. Nasreen Akter is a highly skilled cardiologist with expertise in cardiac electrophysiology.",
      education: ["MBBS - Sir Salimullah Medical College", "MD (Cardiology) - BSMMU"],
      specialties: ["Cardiac Electrophysiology", "Arrhythmia Management"],
      languages: ["Bengali", "English", "Hindi"],
      consultation: {
        days: "Sun, Tue, Thu",
        time: "10:00 AM – 2:00 PM | 6:00 PM – 9:00 PM",
        fee: "BDT 1,500",
        availableDays: ["Sunday", "Tuesday", "Thursday"]
      },
      reviews: [{ name: "Mr. A. Rahman", rating: 5, text: "Great doctor!", date: "1 week ago" }],
      location: "House #12, Gulshan 2, Dhaka-1212, Bangladesh",
      phone: "+880 1700-000002",
      email: "dr.nasreen@renovalifecare.com",
      branch: "Main Facility, Gulshan"
    },
    {
      id: 3,
      name: "Dr. Tasnim Farin",
      specialty: "Neurologist",
      credentials: "MBBS, MD (Neurology), PhD",
      experience: "22 Years",
      rating: 4.8,
      patients: "2,800++",
      image: "/images/doctors/doctor-3.jpg",
      available: true,
      about: "Dr. Tasnim Farin is a distinguished neurologist specializing in epilepsy and stroke.",
      education: ["MBBS - Dhaka Medical College", "MD (Neurology) - BSMMU", "PhD - University of Tokyo"],
      specialties: ["Epilepsy Management", "Stroke Care", "Parkinson's Disease"],
      languages: ["Bengali", "English", "Hindi"],
      consultation: {
        days: "Sun, Mon, Sat",
        time: "10:00 AM – 2:00 PM | 6:00 PM – 9:00 PM",
        fee: "BDT 1,800",
        availableDays: ["Sunday", "Monday", "Saturday"]
      },
      reviews: [{ name: "Mr. S. Ahmed", rating: 5, text: "Excellent neurologist!", date: "1 week ago" }],
      location: "House #12, Gulshan 2, Dhaka-1212, Bangladesh",
      phone: "+880 1700-000003",
      email: "dr.tasnim@renovalifecare.com",
      branch: "Main Facility, Gulshan"
    },
    {
      id: 4,
      name: "Dr. Aysha Aktar Tripti",
      specialty: "Pediatrician",
      credentials: "MBBS, DCH, FCPS (Pediatrics)",
      experience: "15 Years",
      rating: 4.9,
      patients: "4,100++",
      image: "/images/doctors/doctor-4.jpg",
      available: true,
      about: "Dr. Aysha Aktar Tripti is a compassionate pediatrician with expertise in child development.",
      education: ["MBBS - Dhaka Medical College", "DCH - BCPS", "FCPS (Pediatrics) - BCPS"],
      specialties: ["Child Development", "Vaccination", "Pediatric Nutrition"],
      languages: ["Bengali", "English"],
      consultation: {
        days: "Sun, Mon, Wed, Thu, Sat",
        time: "8:00 AM – 12:00 PM | 4:00 PM – 7:00 PM",
        fee: "BDT 1,200",
        availableDays: ["Sunday", "Monday", "Wednesday", "Thursday", "Saturday"]
      },
      reviews: [{ name: "Mrs. N. Begum", rating: 5, text: "Best pediatrician!", date: "2 weeks ago" }],
      location: "House #12, Gulshan 2, Dhaka-1212, Bangladesh",
      phone: "+880 1700-000004",
      email: "dr.tripti@renovalifecare.com",
      branch: "Main Facility, Gulshan"
    },
    {
      id: 5,
      name: "Dr. Humayon Kabir",
      specialty: "Orthopedic Surgeon",
      credentials: "MBBS, MS (Orthopedics), FRCS",
      experience: "20 Years",
      rating: 4.7,
      patients: "2,500++",
      image: "/images/doctors/doctor-5.jpg",
      available: true,
      about: "Dr. Humayon Kabir is an experienced orthopedic surgeon specializing in joint replacement.",
      education: ["MBBS - Dhaka Medical College", "MS (Orthopedics) - BSMMU", "FRCS - UK"],
      specialties: ["Joint Replacement", "Sports Injuries", "Trauma Surgery"],
      languages: ["Bengali", "English"],
      consultation: {
        days: "Sun, Tue, Wed, Thu",
        time: "10:00 AM – 2:00 PM | 5:00 PM – 8:00 PM",
        fee: "BDT 1,600",
        availableDays: ["Sunday", "Tuesday", "Wednesday", "Thursday"]
      },
      reviews: [{ name: "Mr. K. Khan", rating: 5, text: "Excellent surgeon!", date: "3 weeks ago" }],
      location: "House #12, Gulshan 2, Dhaka-1212, Bangladesh",
      phone: "+880 1700-000005",
      email: "dr.humayon@renovalifecare.com",
      branch: "Main Facility, Gulshan"
    },
    {
      id: 6,
      name: "Dr. Alifa Aktar",
      specialty: "Pediatrician",
      credentials: "MBBS, DCH, FCPS (Pediatrics)",
      experience: "15 Years",
      rating: 4.9,
      patients: "4,100++",
      image: "/images/doctors/doctor-6.jpg",
      available: true,
      about: "Dr. Alifa Aktar is a dedicated pediatrician focused on adolescent health.",
      education: ["MBBS - Sir Salimullah Medical College", "DCH - BCPS", "FCPS (Pediatrics) - BCPS"],
      specialties: ["Adolescent Health", "Growth Disorders", "Pediatric Endocrinology"],
      languages: ["Bengali", "English", "Hindi"],
      consultation: {
        days: "Sun, Mon, Tue, Wed, Thu",
        time: "9:00 AM – 1:00 PM | 3:00 PM – 6:00 PM",
        fee: "BDT 1,200",
        availableDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]
      },
      reviews: [{ name: "Mr. M. Ali", rating: 5, text: "Very caring doctor!", date: "1 month ago" }],
      location: "House #12, Gulshan 2, Dhaka-1212, Bangladesh",
      phone: "+880 1700-000006",
      email: "dr.alifa@renovalifecare.com",
      branch: "Main Facility, Gulshan"
    }
  ]);

  // Generate a unique ID for new doctors
  const generateId = () => {
    const maxId = doctors.reduce((max, d) => Math.max(max, d.id), 0);
    return maxId + 1;
  };

  const handleAddDoctor = (newDoctorData) => {
    const newDoctor = {
      id: generateId(),
      name: newDoctorData.doctorName,
      specialty: newDoctorData.specialty,
      credentials: "MBBS, MD",
      experience: "5 Years",
      rating: parseFloat(newDoctorData.rating),
      patients: "0",
      image: "/images/doctors/default-avatar.png",
      available: true,
      about: `${newDoctorData.doctorName} is a specialist in ${newDoctorData.specialty}.`,
      education: ["MBBS - Dhaka Medical College"],
      specialties: [newDoctorData.specialty],
      languages: ["Bengali", "English"],
      consultation: {
        days: "Sun, Mon, Wed, Thu",
        time: "9:00 AM – 1:00 PM | 5:00 PM – 8:00 PM",
        fee: "BDT 1,200",
        availableDays: ["Sunday", "Monday", "Wednesday", "Thursday"]
      },
      reviews: [],
      location: "House #12, Gulshan 2, Dhaka-1212, Bangladesh",
      phone: "+880 1700-000000",
      email: `dr.${newDoctorData.doctorName.toLowerCase().replace(/\./g, '').replace(/\s/g, '.')}@renovalifecare.com`,
      branch: "Main Facility, Gulshan"
    };
    setDoctors(prev => [...prev, newDoctor]);
  };

  const sections = [
    { id: "hero", label: "Hero Section", icon: Layout },
    { id: "doctor-listing", label: "Doctor Listing", icon: Users },
    { id: "specialties", label: "Specialties", icon: Tag },
    { id: "career-cta", label: "Career CTA", icon: UserPlus },
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

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleBackToList = () => {
    setSelectedDoctor(null);
  };

  const openAddDoctorModal = () => {
    setShowAddDoctorModal(true);
  };

  const closeAddDoctorModal = () => {
    setShowAddDoctorModal(false);
  };

  const renderContent = () => {
    if (selectedDoctor) {
      return <DoctorDetailView doctor={selectedDoctor} onBack={handleBackToList} />;
    }

    switch (selectedSection) {
      case "hero":
        return <HeroEditor />;
      case "doctor-listing":
        return <DoctorListingEditor 
          doctors={doctors}
          onDoctorClick={handleDoctorClick} 
          onAddDoctor={openAddDoctorModal}
        />;
      case "specialties":
        return <SpecialtiesEditor />;
      case "career-cta":
        return <CareerCTAEditor />;
      case "seo":
        return <SeoEditor />;
      default:
        return <DoctorListingEditor 
          doctors={doctors}
          onDoctorClick={handleDoctorClick} 
          onAddDoctor={openAddDoctorModal}
        />;
    }
  };

  return (
    <div className="wc-doctors-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">Doctors</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">
              {selectedDoctor ? selectedDoctor.name : sections.find(s => s.id === selectedSection)?.label}
            </span>
          </div>

          <div className="wc-topbar-actions">
            <button 
              className="wc-btn wc-btn-ghost wc-mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
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
          <nav className={`wc-sections-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <div className="wc-sections-title">Sections</div>
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  className={`wc-section-tab ${selectedSection === section.id ? "active" : ""}`}
                  onClick={() => {
                    setSelectedSection(section.id);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Icon size={14} />
                  {section.label}
                  {section.id === "seo" && <span className="wc-section-tab-badge">SEO</span>}
                </button>
              );
            })}
          </nav>

          <div className="wc-content-panel">
            {!selectedDoctor && (
              <div className="wc-page-info-banner">
                <div className="wc-page-info-left">
                  <div className="wc-page-info-icon">
                    <UserCheck size={20} />
                  </div>
                  <div className="wc-page-info-text">
                    <h2>Doctors Page</h2>
                    <p>Editing: {sections.find(s => s.id === selectedSection)?.label}</p>
                  </div>
                </div>
                <div className="wc-page-info-meta">
                  <span className="wc-meta-tag live">
                    <Check size={11} /> Published
                  </span>
                  <span className="wc-meta-tag">
                    <Clock size={11} /> Last saved: Just now
                  </span>
                </div>
              </div>
            )}

            {renderContent()}
          </div>
        </div>
      </div>

      {/* Add Doctor Modal */}
      {showAddDoctorModal && (
        <AddDoctorModal 
          onClose={closeAddDoctorModal} 
          onAdd={handleAddDoctor}
          showToast={showToast}
        />
      )}

      <div className={`wc-toast ${toast.type} ${toast.show ? "show" : ""}`}>
        <Check size={16} />
        {toast.msg}
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// Specialties Editor Component
// ──────────────────────────────────────────────
const SpecialtiesEditor = () => {
  const [specialties, setSpecialties] = useState([
    "Cardiology",
    "Dermatology",
    "ENT",
    "General Medicine",
    "Gynecology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Surgery",
    "Ophthalmology",
    "Urology",
    "Nephrology",
    "Oncology",
    "Radiology"
  ]);

  const [newSpecialty, setNewSpecialty] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSpecialties = useMemo(() => {
    if (!searchTerm.trim()) return specialties;
    const term = searchTerm.toLowerCase().trim();
    return specialties.filter(s => s.toLowerCase().includes(term));
  }, [specialties, searchTerm]);

  const addSpecialty = () => {
    if (newSpecialty.trim() && !specialties.includes(newSpecialty.trim())) {
      setSpecialties([...specialties, newSpecialty.trim()]);
      setNewSpecialty("");
    }
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditValue(specialties[index]);
  };

  const saveEdit = () => {
    if (editValue.trim() && !specialties.includes(editValue.trim())) {
      const updated = [...specialties];
      updated[editingIndex] = editValue.trim();
      setSpecialties(updated);
    }
    setEditingIndex(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditValue("");
  };

  const deleteSpecialty = (index) => {
    if (confirm(`Delete specialty "${specialties[index]}"?`)) {
      setSpecialties(specialties.filter((_, i) => i !== index));
    }
  };

  const moveSpecialty = (index, direction) => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === specialties.length - 1)
    ) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...specialties];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setSpecialties(updated);
  };

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title">
            <Tag size={15} /> All Specialties
            <span className="wc-editor-card-desc">{specialties.length} specialties</span>
          </h3>
        </div>
        <div className="wc-editor-card-body">
          {/* Add New */}
          <div className="wc-specialties-add">
            <input
              className="wc-input"
              value={newSpecialty}
              onChange={e => setNewSpecialty(e.target.value)}
              placeholder="Enter new specialty..."
              onKeyDown={e => e.key === 'Enter' && addSpecialty()}
            />
            <button className="wc-btn wc-btn-primary" onClick={addSpecialty}>
              <Plus size={14} /> Add Specialty
            </button>
          </div>

          {/* Specialties List */}
          <div className="wc-specialties-grid">
            {filteredSpecialties.map((specialty, index) => {
              const actualIndex = specialties.indexOf(specialty);
              return (
                <div key={index} className="wc-specialty-item">
                  {editingIndex === actualIndex ? (
                    <div className="wc-specialty-edit">
                      <input
                        className="wc-input wc-input-sm"
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && saveEdit()}
                        autoFocus
                      />
                      <button className="wc-btn wc-btn-success wc-btn-sm" onClick={saveEdit}>
                        <Check size={14} />
                      </button>
                      <button className="wc-btn wc-btn-ghost wc-btn-sm" onClick={cancelEdit}>
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="wc-specialty-item-label">{specialty}</span>
                      <div className="wc-specialty-item-actions">
                        <button
                          className="wc-btn wc-btn-ghost wc-btn-sm wc-move-btn"
                          onClick={() => moveSpecialty(actualIndex, 'up')}
                          disabled={actualIndex === 0}
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          className="wc-btn wc-btn-ghost wc-btn-sm wc-move-btn"
                          onClick={() => moveSpecialty(actualIndex, 'down')}
                          disabled={actualIndex === specialties.length - 1}
                        >
                          <ArrowDown size={14} />
                        </button>
                        <button
                          className="wc-btn wc-btn-ghost wc-btn-sm"
                          onClick={() => startEdit(actualIndex)}
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          className="wc-btn wc-btn-danger wc-btn-sm"
                          onClick={() => deleteSpecialty(actualIndex)}
                        >
                          <Trash size={14} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {filteredSpecialties.length === 0 && (
            <div className="wc-specialties-empty">
              <AlertCircle size={32} />
              <p>No specialties found. Add a new specialty above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// Add Doctor Modal Component - Dynamic Filtering with Live Update
// ──────────────────────────────────────────────
const AddDoctorModal = ({ onClose, onAdd, showToast }) => {
  const [formData, setFormData] = useState({
    specialty: "",
    doctorName: "",
    rating: "4.5"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Predefined specialties list
  const specialties = [
    "Cardiology",
    "Dermatology",
    "ENT",
    "General Medicine",
    "Gynecology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Surgery",
    "Ophthalmology",
    "Urology",
    "Nephrology",
    "Oncology",
    "Radiology"
  ];

  // Predefined doctor names with their specialties
  const doctors = [
    { name: "Dr. Fariha Rahman", specialty: "Cardiology" },
    { name: "Dr. Nasreen Akter", specialty: "Cardiology" },
    { name: "Dr. Tasnim Farin", specialty: "Neurology" },
    { name: "Dr. Aysha Aktar Tripti", specialty: "Pediatrics" },
    { name: "Dr. Humayon Kabir", specialty: "Orthopedics" },
    { name: "Dr. Alifa Aktar", specialty: "Pediatrics" },
    { name: "Dr. Maria Hoque", specialty: "Orthopedics" },
    { name: "Dr. Shamsul Alam", specialty: "General Medicine" },
    { name: "Dr. Rasheda Khan", specialty: "Gynecology" },
    { name: "Dr. Kamal Hossain", specialty: "Surgery" },
    { name: "Dr. Salma Begum", specialty: "Gynecology" },
    { name: "Dr. Rafiqul Islam", specialty: "Urology" },
    { name: "Dr. Tahmina Akter", specialty: "Ophthalmology" },
    { name: "Dr. Shirin Sultana", specialty: "Dermatology" },
    { name: "Dr. Tanvir Ahmed", specialty: "Cardiology" },
    { name: "Dr. Nusrat Jahan", specialty: "ENT" },
    { name: "Dr. Farhana Begum", specialty: "Psychiatry" },
    { name: "Dr. Kamrun Nahar", specialty: "Nephrology" }
  ];

  // Filter doctors based on selected specialty
  const filteredDoctors = useMemo(() => {
    if (!formData.specialty) return doctors;
    return doctors.filter(doc => doc.specialty === formData.specialty);
  }, [formData.specialty]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value,
      // Reset doctor name when specialty changes
      ...(field === "specialty" && { doctorName: "" })
    }));
  };

  const handleSubmit = () => {
    if (!formData.specialty || !formData.doctorName) {
      showToast("Please select both specialty and doctor name", "error");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // Pass the new doctor data to the parent
      onAdd({
        doctorName: formData.doctorName,
        specialty: formData.specialty,
        rating: formData.rating
      });
      showToast(`${formData.doctorName} added successfully!`, "success");
      onClose();
    }, 800);
  };

  return (
    <div className="wc-modal-overlay" onClick={onClose}>
      <div className="wc-modal wc-modal-add-doctor" onClick={e => e.stopPropagation()}>
        <div className="wc-modal-header">
          <h3>Add New Doctor</h3>
          <button className="wc-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="wc-modal-body">
          <div className="wc-modal-add-grid">
            {/* Specialty Dropdown */}
            <div className="wc-field">
              <label className="wc-field-label">
                Specialty <span className="required">*</span>
              </label>
              <select
                className="wc-select"
                value={formData.specialty}
                onChange={e => handleChange("specialty", e.target.value)}
              >
                <option value="">Select a specialty...</option>
                {specialties.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Doctor Name Dropdown - Filtered by Specialty */}
            <div className="wc-field">
              <label className="wc-field-label">
                Doctor Name <span className="required">*</span>
              </label>
              <select
                className="wc-select"
                value={formData.doctorName}
                onChange={e => handleChange("doctorName", e.target.value)}
                disabled={!formData.specialty}
              >
                <option value="">
                  {!formData.specialty 
                    ? "Please select a specialty first..." 
                    : filteredDoctors.length === 0 
                      ? "No doctors available for this specialty" 
                      : "Select a doctor..."
                  }
                </option>
                {filteredDoctors.map(doc => (
                  <option key={doc.name} value={doc.name}>{doc.name}</option>
                ))}
              </select>
              {formData.specialty && filteredDoctors.length === 0 && (
                <span className="wc-field-hint wc-field-hint-warning">
                  No doctors available for {formData.specialty}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="wc-field">
              <label className="wc-field-label">Rating</label>
              <select
                className="wc-select"
                value={formData.rating}
                onChange={e => handleChange("rating", e.target.value)}
              >
                {[5.0, 4.9, 4.8, 4.7, 4.6, 4.5, 4.4, 4.3, 4.2, 4.1, 4.0].map(r => (
                  <option key={r} value={r}>{r.toFixed(1)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="wc-modal-footer">
          <button className="wc-btn wc-btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            className="wc-btn wc-btn-primary"
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.specialty || !formData.doctorName}
          >
            {isSubmitting ? (
              <><RefreshCw size={14} className="spinning" /> Adding...</>
            ) : (
              <><Plus size={14} /> Add Doctor</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// Hero Editor
// ──────────────────────────────────────────────
const HeroEditor = () => {
  const [data, setData] = useState({
    trust_badge_text: "OUR MEDICAL TEAM",
    headline: "Meet Our Specialist Doctors",
    description: "Internationally trained, BMDC-certified doctors dedicated to delivering the highest standard of patient care.",
    stats: [
      { label: "Specialists", value: "50+" },
      { label: "Departments", value: "15+" },
      { label: "Certified", value: "100%" }
    ]
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

// ──────────────────────────────────────────────
// Doctor Listing Editor with Professional Search
// ──────────────────────────────────────────────
const DoctorListingEditor = ({ doctors, onDoctorClick, onAddDoctor }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialtyFilter, setSelectedSpecialtyFilter] = useState("All Specialties");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Get unique specialties from doctors for filter
  const uniqueSpecialties = useMemo(() => {
    const specialties = doctors.map(d => d.specialty);
    return ["All Specialties", ...new Set(specialties)];
  }, [doctors]);

  // Filter doctors based on search term and specialty
  const filteredDoctors = useMemo(() => {
    let filtered = doctors;

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(term) ||
        doctor.specialty.toLowerCase().includes(term) ||
        doctor.credentials.toLowerCase().includes(term)
      );
    }

    // Specialty filter
    if (selectedSpecialtyFilter !== "All Specialties") {
      filtered = filtered.filter(doctor => doctor.specialty === selectedSpecialtyFilter);
    }

    return filtered;
  }, [doctors, searchTerm, selectedSpecialtyFilter]);

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title">
            <Users size={15} /> Doctor Cards
            <span className="wc-editor-card-desc">{filteredDoctors.length} doctors</span>
          </h3>
          <button className="wc-btn wc-btn-primary" onClick={onAddDoctor}>
            <Plus size={14} /> Add Doctor
          </button>
        </div>
        <div className="wc-editor-card-body">
          {/* Professional Search and Filter Bar */}
          <div className="wc-doctor-search-container">
            <div className="wc-doctor-search-bar">
              {/* Search Input */}
              <div className={`wc-search-input-wrapper ${isSearchFocused ? 'focused' : ''}`}>
                <Search size={18} className="wc-search-icon" />
                <input
                  type="text"
                  className="wc-search-input"
                  placeholder="Search by doctor name, specialty, or credentials..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                {searchTerm && (
                  <button className="wc-search-clear-btn" onClick={() => setSearchTerm("")}>
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Filter Dropdown */}
              <div className="wc-filter-wrapper">
                <Filter size={16} className="wc-filter-icon" />
                <select
                  className="wc-filter-select"
                  value={selectedSpecialtyFilter}
                  onChange={e => setSelectedSpecialtyFilter(e.target.value)}
                >
                  {uniqueSpecialties.map(specialty => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Results Counter */}
              <div className="wc-search-stats">
                <span className="wc-search-count">{filteredDoctors.length}</span>
                <span className="wc-search-label">
                  {filteredDoctors.length === 1 ? 'doctor' : 'doctors'} found
                </span>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || selectedSpecialtyFilter !== "All Specialties") && (
              <div className="wc-active-filters">
                {searchTerm && (
                  <span className="wc-active-filter">
                    <span className="wc-filter-label">Search:</span>
                    <span className="wc-filter-value">"{searchTerm}"</span>
                    <button onClick={() => setSearchTerm("")} className="wc-filter-remove">
                      <X size={12} />
                    </button>
                  </span>
                )}
                {selectedSpecialtyFilter !== "All Specialties" && (
                  <span className="wc-active-filter">
                    <span className="wc-filter-label">Specialty:</span>
                    <span className="wc-filter-value">{selectedSpecialtyFilter}</span>
                    <button onClick={() => setSelectedSpecialtyFilter("All Specialties")} className="wc-filter-remove">
                      <X size={12} />
                    </button>
                  </span>
                )}
                {(searchTerm || selectedSpecialtyFilter !== "All Specialties") && (
                  <button 
                    className="wc-clear-filters-btn"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedSpecialtyFilter("All Specialties");
                    }}
                  >
                    Clear All
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Doctor Grid */}
          <div className="wc-doctor-grid">
            {filteredDoctors.map(doctor => (
              <div 
                key={doctor.id} 
                className="wc-doctor-card clickable"
                onClick={() => onDoctorClick(doctor)}
              >
                <div className="wc-doctor-card-image">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="wc-doctor-card-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="wc-doctor-avatar-placeholder">
                          ${doctor.name.charAt(0)}
                        </div>
                      `;
                    }}
                  />
                </div>
                <div className="wc-doctor-card-info">
                  <div className="wc-doctor-name">{doctor.name}</div>
                  <div className="wc-doctor-specialty">{doctor.specialty}</div>
                  <div className="wc-doctor-credentials">{doctor.credentials}</div>
                  <div className="wc-doctor-stats">
                    <span><ClockIcon size={12} /> {doctor.experience}</span>
                    <span><Star size={12} className="star" /> {doctor.rating}</span>
                    <span><Users size={12} /> {doctor.patients}</span>
                  </div>
                  <div className="wc-doctor-actions">
                    <button className="wc-btn wc-btn-sm wc-btn-primary">View Profile</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results State */}
          {filteredDoctors.length === 0 && (
            <div className="wc-doctor-empty-state">
              <div className="wc-empty-icon-wrapper">
                <Search size={48} className="wc-empty-icon" />
              </div>
              <h3>No doctors found</h3>
              <p>
                {searchTerm || selectedSpecialtyFilter !== "All Specialties" 
                  ? "We couldn't find any doctors matching your criteria. Try adjusting your search terms." 
                  : "No doctors available. Add a new doctor to get started."}
              </p>
              {(searchTerm || selectedSpecialtyFilter !== "All Specialties") && (
                <button 
                  className="wc-btn wc-btn-primary" 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSpecialtyFilter("All Specialties");
                  }}
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// Career CTA Editor
// ──────────────────────────────────────────────
const CareerCTAEditor = () => {
  const [data, setData] = useState({
    section_label: "CAREER OPPORTUNITIES",
    heading: "Are You a Medical Professional?",
    description: "We are always looking for talented, passionate doctors and healthcare workers to join our growing team.",
    button_text: "Apply Now",
    button_url: "/careers",
    features: [
      "Competitive salary and benefits",
      "International training opportunities",
      "Modern, well-equipped facilities",
      "Collaborative and supportive team"
    ],
    stats: [
      { label: "Specialists", value: "50+" },
      { label: "Departments", value: "15+" },
      { label: "BMDC Certified", value: "100%" }
    ]
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><UserPlus size={15} /> Career CTA Section</h3>
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
              <label className="wc-field-label">Description</label>
              <textarea className="wc-textarea" value={data.description} onChange={e => set("description", e.target.value)} rows={3} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Button Text</label>
              <input className="wc-input" value={data.button_text} onChange={e => set("button_text", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Button URL</label>
              <input className="wc-input" value={data.button_url} onChange={e => set("button_url", e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Check size={15} /> Feature Bullets (4 items)</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-features-bullets">
            {data.features.map((feat, i) => (
              <input key={i} className="wc-input" value={feat} onChange={e => {
                const f = [...data.features];
                f[i] = e.target.value;
                set("features", f);
              }} />
            ))}
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><List size={15} /> Stats (3 Items)</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-stat-inputs">
            {data.stats.map((stat, i) => (
              <div key={i} className="wc-stat-input-item">
                <label>{stat.label}</label>
                <input value={stat.value} onChange={e => {
                  const s = [...data.stats];
                  s[i] = { ...s[i], value: e.target.value };
                  set("stats", s);
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ──────────────────────────────────────────────
// SEO Editor
// ──────────────────────────────────────────────
const SeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "Our Specialist Doctors | Renova Life Care Ltd.",
    meta_description: "Meet our team of BMDC-certified specialist doctors at Renova Life Care. Find the best cardiologists, neurologists, pediatricians, and orthopedic surgeons.",
    og_title: "Meet Our Specialist Doctors",
    og_description: "Internationally trained, BMDC-certified doctors dedicated to patient care.",
    og_image: "/images/og-doctors.jpg",
    canonical_url: "https://renovalifecare.com/doctors",
    robots: "index, follow",
    keywords: "specialist doctors Bangladesh, BMDC certified doctors, cardiologist, neurologist, pediatrician"
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

// ──────────────────────────────────────────────
// Doctor Detail View Component
// ──────────────────────────────────────────────
const DoctorDetailView = ({ doctor, onBack }) => {
  const [activeTab, setActiveTab] = useState("about");
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(doctor);
  const [saved, setSaved] = useState(false);

  const renderStars = (rating) => {
    return (
      <div className="wc-detail-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= Math.floor(rating) ? "active" : ""}>
            ★
          </span>
        ))}
        <span className="wc-detail-rating-text">{rating.toFixed(1)} ({doctor.reviews?.length || 0} reviews)</span>
      </div>
    );
  };

  const handleEdit = () => {
    setDraft({ ...doctor });
    setIsEditing(true);
  };

  const handleSave = () => {
    // In a real app, this would update the doctor data
    setSaved(true);
    setIsEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const updateField = (key, value) => {
    setDraft(prev => ({ ...prev, [key]: value }));
  };

  const current = isEditing ? draft : doctor;

  return (
    <div className="wc-doctor-detail-view">
      {/* Back button */}
      <button className="wc-detail-back-btn" onClick={onBack}>
        <ArrowLeft size={18} /> Back to Doctors
      </button>

      {/* Success Toast */}
      {saved && (
        <div className="wc-detail-toast success">
          <Check size={16} /> Changes saved successfully!
        </div>
      )}

      {/* Doctor Profile Header */}
      <div className="wc-detail-header">
        <div className="wc-detail-avatar">
          <img 
            src={current.image || "/images/doctors/default-avatar.png"} 
            alt={current.name}
            className="wc-detail-avatar-img"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `
                <div class="wc-doctor-avatar-placeholder large">
                  ${current.name.charAt(0)}
                </div>
              `;
            }}
          />
        </div>
        <div className="wc-detail-header-info">
          <h1 className="wc-detail-name">
            {isEditing ? (
              <input 
                className="wc-detail-edit-name" 
                value={current.name} 
                onChange={e => updateField("name", e.target.value)} 
              />
            ) : (
              current.name
            )}
          </h1>
          <p className="wc-detail-specialty">
            {isEditing ? (
              <input 
                className="wc-detail-edit-specialty" 
                value={current.specialty} 
                onChange={e => updateField("specialty", e.target.value)} 
              />
            ) : (
              current.specialty
            )}
          </p>
          <p className="wc-detail-credentials">
            {isEditing ? (
              <input 
                className="wc-detail-edit-credentials" 
                value={current.credentials} 
                onChange={e => updateField("credentials", e.target.value)} 
              />
            ) : (
              current.credentials
            )}
          </p>
          {renderStars(current.rating)}
          <div className="wc-detail-meta">
            <span><ClockIcon size={14} /> {current.experience} Experience</span>
            <span><Users size={14} /> {current.patients} Patients</span>
            <span><Globe size={14} /> {current.languages?.join(", ") || "Bengali, English"}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="wc-detail-tabs">
        <button 
          className={`wc-detail-tab ${activeTab === "about" ? "active" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>
        <button 
          className={`wc-detail-tab ${activeTab === "education" ? "active" : ""}`}
          onClick={() => setActiveTab("education")}
        >
          Education
        </button>
        <button 
          className={`wc-detail-tab ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews ({current.reviews?.length || 0})
        </button>
      </div>

      {/* Tab Content */}
      <div className="wc-detail-content">
        {activeTab === "about" && (
          <div className="wc-detail-about">
            <div className="wc-detail-section">
              <h3>About Dr. {current.name.split(" ").pop()}</h3>
              {isEditing ? (
                <textarea 
                  className="wc-detail-edit-textarea" 
                  value={current.about || ""} 
                  onChange={e => updateField("about", e.target.value)} 
                  rows={4}
                />
              ) : (
                <p>{current.about}</p>
              )}
            </div>

            <div className="wc-detail-section">
              <h3>Specialties & Expertise</h3>
              <ul className="wc-detail-specialties">
                {current.specialties?.map((spec, i) => (
                  <li key={i}>
                    {isEditing ? (
                      <input 
                        className="wc-detail-edit-input" 
                        value={spec} 
                        onChange={e => {
                          const updated = [...(current.specialties || [])];
                          updated[i] = e.target.value;
                          updateField("specialties", updated);
                        }} 
                      />
                    ) : (
                      <><Check size={14} /> {spec}</>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="wc-detail-section">
              <h3>Consultation Details</h3>
              <div className="wc-detail-consultation">
                <div className="wc-detail-consult-item">
                  <CalendarIcon size={14} />
                  <div>
                    <strong>Available Days</strong>
                    {isEditing ? (
                      <input 
                        className="wc-detail-edit-input" 
                        value={current.consultation?.days || ""} 
                        onChange={e => updateField("consultation", { ...current.consultation, days: e.target.value })} 
                      />
                    ) : (
                      <p>{current.consultation?.days}</p>
                    )}
                  </div>
                </div>
                <div className="wc-detail-consult-item">
                  <ClockIcon size={14} />
                  <div>
                    <strong>Time Slots</strong>
                    {isEditing ? (
                      <input 
                        className="wc-detail-edit-input" 
                        value={current.consultation?.time || ""} 
                        onChange={e => updateField("consultation", { ...current.consultation, time: e.target.value })} 
                      />
                    ) : (
                      <p>{current.consultation?.time}</p>
                    )}
                  </div>
                </div>
                <div className="wc-detail-consult-item">
                  <Star size={14} />
                  <div>
                    <strong>Consultation Fee</strong>
                    {isEditing ? (
                      <input 
                        className="wc-detail-edit-input" 
                        value={current.consultation?.fee || ""} 
                        onChange={e => updateField("consultation", { ...current.consultation, fee: e.target.value })} 
                      />
                    ) : (
                      <p>{current.consultation?.fee}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {activeTab === "education" && (
          <div className="wc-detail-education">
            <div className="wc-detail-section">
              <h3>Education</h3>
              <ul className="wc-detail-education-list">
                {current.education?.map((edu, i) => (
                  <li key={i}>
                    <Award size={14} />
                    {isEditing ? (
                      <input 
                        className="wc-detail-edit-input" 
                        value={edu} 
                        onChange={e => {
                          const updated = [...(current.education || [])];
                          updated[i] = e.target.value;
                          updateField("education", updated);
                        }} 
                      />
                    ) : (
                      <span>{edu}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="wc-detail-reviews">
            <div className="wc-detail-section">
              <h3>Patient Reviews</h3>
              <div className="wc-detail-review-summary">
                <div className="wc-detail-review-rating">
                  <span className="wc-detail-review-big-rating">{current.rating?.toFixed(1) || "4.5"}</span>
                  {renderStars(current.rating || 4.5)}
                  <p>Based on {current.reviews?.length || 0} reviews</p>
                </div>
              </div>
              <div className="wc-detail-review-list">
                {current.reviews?.map((review, i) => (
                  <div key={i} className="wc-detail-review-item">
                    <div className="wc-detail-review-header">
                      <strong>{review.name}</strong>
                      <div className="wc-detail-review-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className={star <= review.rating ? "active" : ""}>★</span>
                        ))}
                      </div>
                      <span className="wc-detail-review-date">{review.date}</span>
                    </div>
                    <p>{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;