"use client";

import { useState, useEffect } from "react";
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
  ExternalLink,
  Upload,
  Trash,
  Plus,
  X,
  Grid,
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
  X as XIcon
} from "lucide-react";
import "./doctors.css";

// Sample doctor data
const sampleDoctors = [
  {
    id: 1,
    name: "Dr. Fariha Rahman",
    specialty: "Cardiologist",
    credentials: "MBBS, MD (Cardiology), FCPS",
    experience: "18 Years",
    rating: 4.9,
    patients: "3,200++",
    image: "/images/doctor1.jpg",
    available: true,
    about: "Dr. Fariha Rahman is a renowned cardiologist with expertise in interventional cardiology, heart failure management, and preventive cardiology. She completed her MD in Cardiology from BSMMU and has trained at leading cardiac centers in Singapore.",
    education: [
      "MBBS - Dhaka Medical College",
      "MD (Cardiology) - BSMMU",
      "FCPS - Bangladesh College of Physicians and Surgeons",
      "Fellowship in Interventional Cardiology - Singapore"
    ],
    specialties: [
      "Interventional Cardiology",
      "Heart Failure Management",
      "Preventive Cardiology",
      "Echocardiography"
    ],
    languages: ["Bengali", "English"],
    consultation: {
      days: "Sun, Mon, Wed, Thu",
      time: "9:00 AM – 1:00 PM | 5:00 PM – 8:00 PM",
      fee: "BDT 1,500",
      availableDays: ["Sunday", "Monday", "Wednesday", "Thursday"]
    },
    reviews: [
      { name: "Mr. Kamal Hossain", rating: 5, text: "Excellent doctor! Very professional and caring.", date: "2 weeks ago" },
      { name: "Mrs. Salma Begum", rating: 5, text: "Dr. Fariha is very knowledgeable and explains everything clearly.", date: "1 month ago" },
      { name: "Mr. Rafiq Islam", rating: 4, text: "Good experience. Helped me recover from my heart condition.", date: "3 months ago" }
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
    image: "/images/doctor2.jpg",
    available: true,
    about: "Dr. Nasreen Akter is a highly skilled cardiologist with expertise in cardiac electrophysiology, arrhythmia management, and cardiac rehabilitation.",
    education: [
      "MBBS - Sir Salimullah Medical College",
      "MD (Cardiology) - BSMMU",
      "FCPS - Bangladesh College of Physicians and Surgeons"
    ],
    specialties: [
      "Cardiac Electrophysiology",
      "Arrhythmia Management",
      "Cardiac Rehabilitation",
      "Pacemaker Implantation"
    ],
    languages: ["Bengali", "English", "Hindi"],
    consultation: {
      days: "Sun, Tue, Thu",
      time: "10:00 AM – 2:00 PM | 6:00 PM – 9:00 PM",
      fee: "BDT 1,500",
      availableDays: ["Sunday", "Tuesday", "Thursday"]
    },
    reviews: [
      { name: "Mr. A. Rahman", rating: 5, text: "Great doctor! Very patient and thorough.", date: "1 week ago" }
    ],
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
    image: "/images/doctor3.jpg",
    available: true,
    about: "Dr. Tasnim Farin is a distinguished neurologist specializing in epilepsy, stroke, and movement disorders. She completed her PhD in Neuroscience at University of Tokyo and has published over 40 research papers.",
    education: [
      "MBBS - Dhaka Medical College",
      "MD (Neurology) - BSMMU",
      "PhD in Neuroscience - University of Tokyo",
      "Fellowship in Epilepsy - Japan"
    ],
    specialties: [
      "Epilepsy Management",
      "Stroke Care",
      "Parkinson's Disease",
      "Neuropathy"
    ],
    languages: ["Bengali", "English", "Hindi"],
    consultation: {
      days: "Sun, Mon, Sat",
      time: "10:00 AM – 2:00 PM | 6:00 PM – 9:00 PM",
      fee: "BDT 1,800",
      availableDays: ["Sunday", "Monday", "Saturday"]
    },
    reviews: [
      { name: "Mr. S. Ahmed", rating: 5, text: "Excellent neurologist! Very knowledgeable.", date: "1 week ago" }
    ],
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
    image: "/images/doctor4.jpg",
    available: true,
    about: "Dr. Aysha Aktar Tripti is a compassionate pediatrician with expertise in child development, vaccination, and pediatric nutrition.",
    education: [
      "MBBS - Dhaka Medical College",
      "DCH - Bangladesh College of Physicians and Surgeons",
      "FCPS (Pediatrics) - Bangladesh College of Physicians and Surgeons"
    ],
    specialties: [
      "Child Development",
      "Vaccination",
      "Pediatric Nutrition",
      "Neonatal Care"
    ],
    languages: ["Bengali", "English"],
    consultation: {
      days: "Sun, Mon, Wed, Thu, Sat",
      time: "8:00 AM – 12:00 PM | 4:00 PM – 7:00 PM",
      fee: "BDT 1,200",
      availableDays: ["Sunday", "Monday", "Wednesday", "Thursday", "Saturday"]
    },
    reviews: [
      { name: "Mrs. N. Begum", rating: 5, text: "Best pediatrician! My child loves her.", date: "2 weeks ago" }
    ],
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
    image: "/images/doctor5.jpg",
    available: true,
    about: "Dr. Humayon Kabir is an experienced orthopedic surgeon specializing in joint replacement, sports injuries, and trauma surgery.",
    education: [
      "MBBS - Dhaka Medical College",
      "MS (Orthopedics) - BSMMU",
      "FRCS - Royal College of Surgeons, UK"
    ],
    specialties: [
      "Joint Replacement",
      "Sports Injuries",
      "Trauma Surgery",
      "Arthroscopy"
    ],
    languages: ["Bengali", "English"],
    consultation: {
      days: "Sun, Tue, Wed, Thu",
      time: "10:00 AM – 2:00 PM | 5:00 PM – 8:00 PM",
      fee: "BDT 1,600",
      availableDays: ["Sunday", "Tuesday", "Wednesday", "Thursday"]
    },
    reviews: [
      { name: "Mr. K. Khan", rating: 5, text: "Excellent surgeon! My knee surgery was a success.", date: "3 weeks ago" }
    ],
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
    image: "/images/doctor6.jpg",
    available: true,
    about: "Dr. Alifa Aktar is a dedicated pediatrician focused on adolescent health, growth disorders, and pediatric endocrinology.",
    education: [
      "MBBS - Sir Salimullah Medical College",
      "DCH - Bangladesh College of Physicians and Surgeons",
      "FCPS (Pediatrics) - Bangladesh College of Physicians and Surgeons"
    ],
    specialties: [
      "Adolescent Health",
      "Growth Disorders",
      "Pediatric Endocrinology",
      "Child Psychology"
    ],
    languages: ["Bengali", "English", "Hindi"],
    consultation: {
      days: "Sun, Mon, Tue, Wed, Thu",
      time: "9:00 AM – 1:00 PM | 3:00 PM – 6:00 PM",
      fee: "BDT 1,200",
      availableDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]
    },
    reviews: [
      { name: "Mr. M. Ali", rating: 5, text: "Very caring doctor. Highly recommended!", date: "1 month ago" }
    ],
    location: "House #12, Gulshan 2, Dhaka-1212, Bangladesh",
    phone: "+880 1700-000006",
    email: "dr.alifa@renovalifecare.com",
    branch: "Main Facility, Gulshan"
  },
  {
    id: 7,
    name: "Dr. Maria Hoque",
    specialty: "Orthopedic Surgeon",
    credentials: "MBBS, MS (Orthopedics), FRCS",
    experience: "20 Years",
    rating: 4.7,
    patients: "2,500++",
    image: "/images/doctor7.jpg",
    available: true,
    about: "Dr. Maria Hoque is a skilled orthopedic surgeon specializing in pediatric orthopedics, spine surgery, and musculoskeletal oncology.",
    education: [
      "MBBS - Dhaka Medical College",
      "MS (Orthopedics) - BSMMU",
      "FRCS - Royal College of Surgeons, UK"
    ],
    specialties: [
      "Pediatric Orthopedics",
      "Spine Surgery",
      "Musculoskeletal Oncology",
      "Fracture Management"
    ],
    languages: ["Bengali", "English"],
    consultation: {
      days: "Sun, Mon, Tue, Thu",
      time: "11:00 AM – 3:00 PM | 6:00 PM – 9:00 PM",
      fee: "BDT 1,600",
      availableDays: ["Sunday", "Monday", "Tuesday", "Thursday"]
    },
    reviews: [
      { name: "Mrs. R. Sultana", rating: 5, text: "Wonderful doctor! Very professional and caring.", date: "2 months ago" }
    ],
    location: "House #12, Gulshan 2, Dhaka-1212, Bangladesh",
    phone: "+880 1700-000007",
    email: "dr.maria@renovalifecare.com",
    branch: "Main Facility, Gulshan"
  }
];

const DoctorsPage = () => {
  const [selectedSection, setSelectedSection] = useState("doctor-listing");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: "hero", label: "Hero Section", icon: Layout },
    { id: "doctor-listing", label: "Doctor Listing", icon: Users },
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

  const renderContent = () => {
    if (selectedDoctor) {
      return <DoctorDetailView doctor={selectedDoctor} onBack={handleBackToList} />;
    }

    switch (selectedSection) {
      case "hero":
        return <HeroEditor />;
      case "doctor-listing":
        return <DoctorListingEditor onDoctorClick={handleDoctorClick} doctors={sampleDoctors} />;
      case "career-cta":
        return <CareerCTAEditor />;
      case "seo":
        return <SeoEditor />;
      default:
        return <DoctorListingEditor onDoctorClick={handleDoctorClick} doctors={sampleDoctors} />;
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
    trust_badge_text: "OUR MEDICAL TEAM",
    headline: "Meet Our Specialist Doctors",
    description: "Internationally trained, BMDC-certified doctors dedicated to delivering the highest standard of patient care.",
    background_images: [],
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

// Doctor Listing Editor
const DoctorListingEditor = ({ onDoctorClick, doctors }) => {
  const [data, setData] = useState({
    search_placeholder: "Search by doctor name...",
    filter_specialties_label: "All Specialties",
    filter_branches_label: "All Branches",
    filter_consultation_label: "Consultation Type",
    section_title: "Our Doctors",
    section_description: "Internationally trained, BMDC-certified doctors dedicated to delivering the highest standard of patient care."
  });

  const set = (k, v) => setData({ ...data, [k]: v });

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="wc-star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= Math.floor(rating) ? "active" : ""}>
            ★
          </span>
        ))}
        <span className="rating-value">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Layout size={15} /> Section Settings</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Title <span className="required">*</span></label>
              <input className="wc-input" value={data.section_title} onChange={e => set("section_title", e.target.value)} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Description</label>
              <textarea className="wc-textarea" value={data.section_description} onChange={e => set("section_description", e.target.value)} rows={2} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Search Placeholder Text</label>
              <input className="wc-input" value={data.search_placeholder} onChange={e => set("search_placeholder", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Specialty Filter Label</label>
              <input className="wc-input" value={data.filter_specialties_label} onChange={e => set("filter_specialties_label", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Branch Filter Label</label>
              <input className="wc-input" value={data.filter_branches_label} onChange={e => set("filter_branches_label", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Consultation Filter Label</label>
              <input className="wc-input" value={data.filter_consultation_label} onChange={e => set("filter_consultation_label", e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Users size={15} /> Doctor Cards ({doctors.length})</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-doctor-grid">
            {doctors.map(doctor => (
              <div 
                key={doctor.id} 
                className="wc-doctor-card clickable"
                onClick={() => onDoctorClick(doctor)}
              >
                <div className="wc-doctor-card-image">
                  <div className="wc-doctor-avatar-placeholder">
                    {doctor.name.charAt(0)}
                  </div>
                </div>
                <div className="wc-doctor-card-info">
                  <div className="wc-doctor-name">{doctor.name}</div>
                  <div className="wc-doctor-specialty">{doctor.specialty}</div>
                  <div className="wc-doctor-credentials">{doctor.credentials}</div>
                  <div className="wc-doctor-stats">
                    <span><ClockIcon size={12} /> {doctor.experience} Experience</span>
                    <span><Star size={12} className="star" /> {doctor.rating} Rating</span>
                    <span><Users size={12} /> {doctor.patients} Patients</span>
                  </div>
                  <div className="wc-doctor-actions">
                    <button className="wc-btn wc-btn-sm wc-btn-primary">View Profile</button>
                    <button className="wc-btn wc-btn-sm wc-btn-outline">Book Appointment</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="wc-repeater-add"><Plus size={14} /> Add Doctor</button>
        </div>
      </div>
    </div>
  );
};

// Career CTA Editor
const CareerCTAEditor = () => {
  const [data, setData] = useState({
    section_label: "CAREER OPPORTUNITIES",
    heading: "Are You a Medical Professional?",
    description: "We are always looking for talented, passionate doctors and healthcare workers to join our growing team. If you are dedicated to making a difference in patient lives, we want to hear from you.",
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

// SEO Editor
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
            <div className="wc-field span-2">
              <label className="wc-field-label">Canonical URL</label>
              <input className="wc-input" value={data.canonical_url} onChange={e => set("canonical_url", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Robots</label>
              <input className="wc-input" value={data.robots} onChange={e => set("robots", e.target.value)} />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">OG Image URL</label>
              <input className="wc-input" value={data.og_image} onChange={e => set("og_image", e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Doctor Detail View Component
const DoctorDetailView = ({ doctor, onBack }) => {
  const [activeTab, setActiveTab] = useState("about");

  const renderStars = (rating) => {
    return (
      <div className="wc-detail-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= Math.floor(rating) ? "active" : ""}>
            ★
          </span>
        ))}
        <span className="wc-detail-rating-text">{rating.toFixed(1)} ({doctor.reviews.length} reviews)</span>
      </div>
    );
  };

  return (
    <div className="wc-doctor-detail-view">
      {/* Back button */}
      <button className="wc-detail-back-btn" onClick={onBack}>
        <ArrowLeft size={18} /> Back to Doctors
      </button>

      {/* Doctor Profile Header */}
      <div className="wc-detail-header">
        <div className="wc-detail-avatar">
          <div className="wc-doctor-avatar-placeholder large">
            {doctor.name.charAt(0)}
          </div>
        </div>
        <div className="wc-detail-header-info">
          <h1 className="wc-detail-name">{doctor.name}</h1>
          <p className="wc-detail-specialty">{doctor.specialty}</p>
          <p className="wc-detail-credentials">{doctor.credentials}</p>
          {renderStars(doctor.rating)}
          <div className="wc-detail-meta">
            <span><ClockIcon size={14} /> {doctor.experience} Experience</span>
            <span><Users size={14} /> {doctor.patients} Patients</span>
            <span><Globe size={14} /> {doctor.languages.join(", ")}</span>
          </div>
          <div className="wc-detail-actions">
            <button className="wc-btn wc-btn-primary">
              <CalendarIcon size={14} /> Book Appointment
            </button>
            <button className="wc-btn wc-btn-outline">
              <Share2 size={14} /> Share Profile
            </button>
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
          Reviews ({doctor.reviews.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="wc-detail-content">
        {activeTab === "about" && (
          <div className="wc-detail-about">
            <div className="wc-detail-section">
              <h3>About Dr. {doctor.name.split(" ").pop()}</h3>
              <p>{doctor.about}</p>
            </div>

            <div className="wc-detail-section">
              <h3>Specialties & Expertise</h3>
              <ul className="wc-detail-specialties">
                {doctor.specialties.map((spec, i) => (
                  <li key={i}><Check size={14} /> {spec}</li>
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
                    <p>{doctor.consultation.days}</p>
                  </div>
                </div>
                <div className="wc-detail-consult-item">
                  <ClockIcon size={14} />
                  <div>
                    <strong>Time Slots</strong>
                    <p>{doctor.consultation.time}</p>
                  </div>
                </div>
                <div className="wc-detail-consult-item">
                  <Star size={14} />
                  <div>
                    <strong>Consultation Fee</strong>
                    <p>{doctor.consultation.fee}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="wc-detail-section">
              <h3>Location & Contact</h3>
              <div className="wc-detail-contact">
                <div className="wc-detail-contact-item">
                  <MapPin size={14} />
                  <span>{doctor.location}</span>
                </div>
                <div className="wc-detail-contact-item">
                  <Phone size={14} />
                  <span>{doctor.phone}</span>
                </div>
                <div className="wc-detail-contact-item">
                  <Mail size={14} />
                  <span>{doctor.email}</span>
                </div>
              </div>
            </div>

            <div className="wc-detail-section">
              <h3>Branch Information</h3>
              <p>{doctor.branch} with state-of-the-art diagnostic equipment and a dedicated cardiac care unit.</p>
              <button className="wc-detail-facility-btn">
                View Facility Details <ChevronRight size={14} />
              </button>
            </div>

            <div className="wc-detail-section wc-detail-before-visit">
              <h3>Before Your Visit</h3>
              <ul>
                <li><Check size={14} /> Arrive 15 minutes early for registration</li>
                <li><Check size={14} /> Bring previous medical reports if any</li>
                <li><Check size={14} /> Carry a valid ID for verification</li>
                <li><Check size={14} /> Fast for 8-12 hours if blood tests are scheduled</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "education" && (
          <div className="wc-detail-education">
            <div className="wc-detail-section">
              <h3>Education</h3>
              <ul className="wc-detail-education-list">
                {doctor.education.map((edu, i) => (
                  <li key={i}><Award size={14} /> {edu}</li>
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
                  <span className="wc-detail-review-big-rating">{doctor.rating.toFixed(1)}</span>
                  {renderStars(doctor.rating)}
                  <p>Based on {doctor.reviews.length} reviews</p>
                </div>
              </div>
              <div className="wc-detail-review-list">
                {doctor.reviews.map((review, i) => (
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