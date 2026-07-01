"use client";
import { useState, useMemo } from "react";
import {
  Activity, Layout, Grid, Star, Search, Clock, Check, ChevronDown,
  Save, RefreshCw, Eye, Plus, List, Heart, Users, Calendar,
  MessageCircle, Award, ExternalLink, Upload, Trash, X, Package,
  ShoppingBag, FileText, MapPin, Phone, Mail, User, Target,
  ChevronRight, Edit, Copy, AlertCircle, Stethoscope, Microscope,
  Syringe, Pill, Bone, Brain, Activity as ActivityIcon, Droplet,
  Thermometer, Scissors, Eye as EyeIcon, Ear, Baby, HeartPulse,
  HelpCircle, CheckCircle2, UserCheck, ArrowUp, ArrowDown,
  GripVertical, BookOpen, Shield, Wind, Zap, Dna, Scan
} from "lucide-react";
import "./services.css";
import "../website-content.css";

// ── Custom Tooth Icon ──────────────────────────────────────────
const ToothIcon = ({ size = 24, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 5.5c-1.5-2-4-3-6-2s-3 4-2 6c1 2 2 4 2 7s1 4 2 4 2-2 2-4 1-3 2-3 1 1 2 3 1 4 2 4 2-1 2-4 1-5 2-7c1-2 0-5-2-6s-4.5 0-6 2z" />
  </svg>
);

// ── Icon Mapping ──────────────────────────────────────────────
const getServiceIcon = (iconName) => {
  const iconMap = {
    Activity: ActivityIcon, Heart, Stethoscope, Microscope, Syringe, Pill,
    Bone, Brain, Droplet, Thermometer, Scissors, Eye: EyeIcon, Ear,
    Tooth: ToothIcon, Baby, HeartPulse, Users, Calendar, MessageCircle,
    Award, Star, Target, Package, ShoppingBag, FileText, MapPin, Phone,
    Mail, User, Grid, Layout, List, Clock, Check, Plus, X, Trash, Edit, Copy,
    Wind, Zap, Dna, Scan
  };
  return iconMap[iconName] || ActivityIcon;
};

// ── Mock Doctors Data with Image Paths ────────────────────────
const MOCK_DOCTORS = [
  { id: 1, name: "Dr. Fariha Rahman", specialty: "Cardiologist", credentials: "MBBS, MD (Cardiology), FCPS", experience: "18 Years", rating: 4.9, patients: "3,200++", available: true, image: "/images/doctors/doctor-1.jpg" },
  { id: 2, name: "Dr. Nasreen Akter", specialty: "Cardiologist", credentials: "MBBS, MD (Cardiology), FCPS", experience: "18 Years", rating: 4.9, patients: "3,200++", available: true, image: "/images/doctors/doctor-2.jpg" },
  { id: 3, name: "Dr. Tasnim Farin", specialty: "Neurologist", credentials: "MBBS, MD (Neurology), PhD", experience: "22 Years", rating: 4.8, patients: "2,800++", available: true, image: "/images/doctors/doctor-3.jpg" },
  { id: 4, name: "Dr. Aysha Aktar Tripti", specialty: "Pediatrician", credentials: "MBBS, DCH, FCPS (Pediatrics)", experience: "15 Years", rating: 4.9, patients: "4,100++", available: true, image: "/images/doctors/doctor-4.jpg" },
  { id: 5, name: "Dr. Humayon Kabir", specialty: "Orthopedic Surgeon", credentials: "MBBS, MS (Orthopedics), FRCS", experience: "20 Years", rating: 4.7, patients: "2,500++", available: true, image: "/images/doctors/doctor-5.jpg" },
  { id: 6, name: "Dr. Alifa Aktar", specialty: "Pediatrician", credentials: "MBBS, DCH, FCPS (Pediatrics)", experience: "15 Years", rating: 4.9, patients: "4,100++", available: true, image: "/images/doctors/doctor-6.jpg" },
  { id: 7, name: "Dr. Maria Hoque", specialty: "Radiologist", credentials: "MBBS, MD (Radiology)", experience: "12 Years", rating: 4.8, patients: "1,900++", available: true, image: "/images/doctors/doctor-7.jpg" },
  { id: 8, name: "Dr. Shirin Sultana", specialty: "Oncologist", credentials: "MBBS, MD (Oncology)", experience: "16 Years", rating: 4.9, patients: "2,100++", available: true, image: "/images/doctors/doctor-8.jpg" },
  { id: 9, name: "Dr. Kamal Hossain", specialty: "Gastroenterologist", credentials: "MBBS, MD (Gastro)", experience: "14 Years", rating: 4.7, patients: "1,800++", available: true, image: "/images/doctors/doctor-9.jpg" },
  { id: 10, name: "Dr. Laila Begum", specialty: "Endocrinologist", credentials: "MBBS, MD (Endocrinology)", experience: "13 Years", rating: 4.8, patients: "1,600++", available: true, image: "/images/doctors/doctor-10.jpg" },
  { id: 11, name: "Dr. Rafiqul Islam", specialty: "Nephrologist", credentials: "MBBS, MD (Nephrology)", experience: "17 Years", rating: 4.9, patients: "2,000++", available: true, image: "/images/doctors/doctor-1.jpg" },
  { id: 12, name: "Dr. Sonia Akhter", specialty: "Gynecologist", credentials: "MBBS, DGO, FCPS (Obs/Gynae)", experience: "16 Years", rating: 4.9, patients: "3,500++", available: true, image: "/images/doctors/doctor-2.jpg" },
  { id: 13, name: "Dr. Mahbubur Rahman", specialty: "Pulmonologist", credentials: "MBBS, MD (Chest)", experience: "15 Years", rating: 4.8, patients: "1,700++", available: true, image: "/images/doctors/doctor-3.jpg" },
  { id: 14, name: "Dr. Nusrat Jahan", specialty: "Rheumatologist", credentials: "MBBS, MD (Rheumatology)", experience: "12 Years", rating: 4.7, patients: "1,200++", available: true, image: "/images/doctors/doctor-4.jpg" },
  { id: 15, name: "Dr. Shahidul Alam", specialty: "Urologist", credentials: "MBBS, MS (Urology)", experience: "19 Years", rating: 4.8, patients: "2,100++", available: true, image: "/images/doctors/doctor-5.jpg" }
];

// ── Doctor Card Component ─────────────────────────────────────
const DoctorCard = ({ doctor }) => {
  return (
    <div className="wc-doctor-card">
      <div className="wc-doctor-card-image-wrapper">
        <img 
          src={doctor.image} 
          alt={doctor.name}
          className="wc-doctor-card-image"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.style.background = 'linear-gradient(135deg, #014fa1, #0a7ed9)';
            e.target.parentElement.style.color = '#fff';
            e.target.parentElement.style.display = 'flex';
            e.target.parentElement.style.alignItems = 'center';
            e.target.parentElement.style.justifyContent = 'center';
            e.target.parentElement.style.fontSize = '28px';
            e.target.parentElement.style.fontWeight = '700';
            e.target.parentElement.textContent = doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2);
          }}
        />
        {doctor.available && (
          <span className="wc-doctor-card-available">● AVAILABLE</span>
        )}
      </div>
      <div className="wc-doctor-card-name">{doctor.name}</div>
      <div className="wc-doctor-card-specialty">{doctor.specialty}</div>
      <div className="wc-doctor-card-credentials">{doctor.credentials}</div>
      <div className="wc-doctor-card-stats">
        <div className="wc-doctor-card-stat">
          <div className="wc-doctor-card-stat-value">{doctor.experience}</div>
          <div className="wc-doctor-card-stat-label">EXPERIENCE</div>
        </div>
        <div className="wc-doctor-card-stat">
          <div className="wc-doctor-card-stat-value">★ {doctor.rating}</div>
          <div className="wc-doctor-card-stat-label">RATING</div>
        </div>
        <div className="wc-doctor-card-stat">
          <div className="wc-doctor-card-stat-value">{doctor.patients}</div>
          <div className="wc-doctor-card-stat-label">PATIENTS</div>
        </div>
      </div>
      <div className="wc-doctor-card-actions">
        <button className="wc-doctor-card-btn wc-doctor-card-btn-outline">👤 Doctor Profile</button>
        <button className="wc-doctor-card-btn wc-doctor-card-btn-primary">📅 Book Appointment</button>
      </div>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────
const ServicesPage = () => {
  const [selectedSection, setSelectedSection] = useState("services-grid");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });
  const [activeTab, setActiveTab] = useState("all");
  const [expandedService, setExpandedService] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [services, setServices] = useState([
    {
      id: 1, title: "Pathology & Laboratory Testing", category: "Diagnostic", icon: "Microscope",
      description: "Comprehensive laboratory analysis including blood, tissue, and fluid testing for accurate disease diagnosis.",
      features: ["Blood tests", "Tissue biopsy", "Fluid analysis", "Microbiology", "Molecular diagnostics"],
      price: "BDT 500+", duration: "2-4 hours",
      whatToExpect: [
        { title: "Sample Collection", description: "Our trained phlebotomists collect blood, tissue, or fluid samples using sterile techniques." },
        { title: "Laboratory Analysis", description: "Samples are processed using state-of-the-art equipment for accurate results." },
        { title: "Result Review", description: "Our pathologists review and interpret your results for clinical accuracy." },
        { title: "Report Delivery", description: "Get your comprehensive report with expert interpretation and recommendations." }
      ],
      whyChoose: [
        "State-of-the-art laboratory with ISO certification",
        "Experienced pathologists and technicians",
        "Accurate and reliable test results",
        "Quick turnaround time",
        "Comprehensive test menu"
      ],
      aboutText: "Our Pathology & Laboratory Testing service provides comprehensive diagnostic solutions using evidence-based practices and the latest medical technology. Our team of BMDC-certified specialists works collaboratively to ensure accurate diagnosis and personalized care.",
      specialists: [1, 7],
      faqs: [
        { question: "How should I prepare for a blood test?", answer: "Most blood tests require 8-12 hours of fasting. Please follow the specific instructions provided during booking." },
        { question: "How long does it take to get results?", answer: "Results are typically available within 2-4 hours for routine tests and 24-48 hours for specialized tests." },
        { question: "Do I need a doctor's prescription?", answer: "Yes, most laboratory tests require a prescription from a registered medical practitioner." }
      ]
    },
    {
      id: 2, title: "Blood Test & Biochemistry", category: "Diagnostic", icon: "Droplet",
      description: "Advanced blood analysis to assess organ function, detect deficiencies, and monitor chronic conditions.",
      features: ["Complete blood count", "Lipid profile", "Liver function tests", "Kidney function tests", "Thyroid profile"],
      price: "BDT 300+", duration: "2-3 hours",
      whatToExpect: [
        { title: "Blood Sample Collection", description: "A small blood sample is drawn by our experienced phlebotomists." },
        { title: "Biochemical Analysis", description: "Advanced analyzers process your samples for various biochemical markers." },
        { title: "Result Interpretation", description: "Our biochemists analyze results for any abnormalities." },
        { title: "Comprehensive Report", description: "Receive a detailed report with reference ranges and interpretations." }
      ],
      whyChoose: [
        "Advanced biochemistry analyzers",
        "Comprehensive test panels",
        "Accurate and precise results",
        "Expert interpretation",
        "Affordable pricing"
      ],
      aboutText: "Our Blood Test & Biochemistry service offers comprehensive blood analysis using cutting-edge technology. We provide accurate results for organ function assessment, deficiency detection, and chronic condition monitoring.",
      specialists: [1, 7],
      faqs: [
        { question: "Do I need to fast before a blood test?", answer: "Yes, most blood chemistry tests require 8-12 hours of fasting for accurate results." },
        { question: "How soon can I get my results?", answer: "Results are typically available within 2-3 hours." }
      ]
    },
    {
      id: 3, title: "Hematology Services", category: "Diagnostic", icon: "Activity",
      description: "Specialized testing for blood disorders, anemia, clotting issues, and blood cancer screening.",
      features: ["CBC with differential", "Coagulation studies", "Hemoglobin electrophoresis", "Bone marrow examination"],
      price: "BDT 400+", duration: "3-4 hours",
      whatToExpect: [
        { title: "Blood Sample Collection", description: "Blood samples are collected using sterile techniques." },
        { title: "Hematological Analysis", description: "Specialized tests for blood cell counts, morphology, and function." },
        { title: "Coagulation Studies", description: "Tests to assess blood clotting function and disorders." },
        { title: "Result Interpretation", description: "Expert interpretation by hematologists." }
      ],
      whyChoose: [
        "Specialized hematology laboratory",
        "Expert hematologists on staff",
        "Advanced testing equipment",
        "Comprehensive blood disorder screening",
        "Accurate and timely results"
      ],
      aboutText: "Our Hematology Services provide comprehensive testing for blood disorders including anemia, clotting issues, and blood cancers. Our specialized team uses advanced diagnostic tools for accurate detection and monitoring.",
      specialists: [1, 7, 8],
      faqs: [
        { question: "What is a CBC test?", answer: "A Complete Blood Count test measures different components of your blood including red cells, white cells, and platelets." },
        { question: "How is bone marrow examination performed?", answer: "A small sample of bone marrow is taken from your hip bone using a special needle under local anesthesia." }
      ]
    },
    {
      id: 4, title: "Hormone & Immunology Tests", category: "Diagnostic", icon: "Target",
      description: "Precise measurement of hormones and immune markers for endocrine and autoimmune conditions.",
      features: ["Thyroid function tests", "Diabetes screening", "Autoimmune markers", "Allergy testing"],
      price: "BDT 350+", duration: "2-4 hours",
      whatToExpect: [
        { title: "Blood/Urine Sample Collection", description: "Samples are collected for hormone and immunology testing." },
        { title: "Hormone Analysis", description: "Advanced testing for various hormone levels." },
        { title: "Immunology Screening", description: "Tests for autoimmune markers and immune function." },
        { title: "Comprehensive Report", description: "Detailed report with expert interpretation." }
      ],
      whyChoose: [
        "Advanced hormone testing",
        "Comprehensive immunology panels",
        "Expert endocrinologists",
        "Accurate autoimmune screening",
        "Personalized treatment guidance"
      ],
      aboutText: "Our Hormone & Immunology Tests offer precise measurement of hormones and immune markers for diagnosing endocrine and autoimmune conditions. Our expert team ensures accurate results for effective treatment planning.",
      specialists: [10, 11],
      faqs: [
        { question: "What hormones can be tested?", answer: "We test various hormones including thyroid, reproductive, adrenal, and growth hormones." },
        { question: "How are autoimmune conditions diagnosed?", answer: "Through specific antibody tests and immune marker analysis combined with clinical evaluation." }
      ]
    },
    {
      id: 5, title: "Urine & Stool Analysis", category: "Diagnostic", icon: "Droplet",
      description: "Non-invasive diagnostic testing to detect infections, kidney issues, and digestive health concerns.",
      features: ["Urinalysis", "Stool culture", "Parasite examination", "Microscopic analysis"],
      price: "BDT 200+", duration: "1-2 hours",
      whatToExpect: [
        { title: "Sample Collection", description: "Urine and stool samples are collected in sterile containers." },
        { title: "Physical Analysis", description: "Physical properties including color, odor, and consistency are examined." },
        { title: "Chemical & Microscopic Analysis", description: "Chemical composition and microscopic examination for cells, crystals, and organisms." },
        { title: "Microbiological Culture", description: "Culture tests for bacterial growth and identification." }
      ],
      whyChoose: [
        "Non-invasive testing",
        "Comprehensive analysis",
        "Quick results",
        "Expert interpretation",
        "Affordable pricing"
      ],
      aboutText: "Our Urine & Stool Analysis provides non-invasive diagnostic testing for infections, kidney issues, and digestive health concerns. Using advanced laboratory techniques, we ensure accurate and timely results.",
      specialists: [1, 7],
      faqs: [
        { question: "How should I collect a urine sample?", answer: "Use the clean-catch method: cleanse the area, start urinating, then collect the mid-stream urine in the sterile container." },
        { question: "What can stool analysis detect?", answer: "Stool analysis can detect infections, parasites, digestive disorders, and colon health issues." }
      ]
    },
    {
      id: 6, title: "Digital X-Ray", category: "Imaging", icon: "Scan",
      description: "High-resolution imaging for bones, chest, and internal organs with minimal radiation exposure.",
      features: ["Chest X-ray", "Bone X-ray", "Abdominal X-ray", "Dental X-ray"],
      price: "BDT 800+", duration: "15-30 minutes",
      whatToExpect: [
        { title: "Preparation", description: "You'll be asked to remove any jewelry or metal objects and wear a hospital gown if needed." },
        { title: "Positioning", description: "Our radiology technician will position you correctly for the X-ray." },
        { title: "Image Capture", description: "The X-ray machine captures high-resolution digital images." },
        { title: "Result Review", description: "Our radiologist reviews the images and provides a detailed report." }
      ],
      whyChoose: [
        "Advanced digital X-ray technology",
        "Minimal radiation exposure",
        "High-resolution images",
        "Expert radiologists",
        "Quick results"
      ],
      aboutText: "Our Digital X-Ray service provides high-resolution imaging for bones, chest, and internal organs with minimal radiation exposure. Using state-of-the-art digital technology, we ensure precise diagnostic quality.",
      specialists: [7],
      faqs: [
        { question: "Is X-ray radiation safe?", answer: "Modern digital X-rays use minimal radiation and are considered safe. We use lead shielding for additional protection." },
        { question: "Do I need to prepare for an X-ray?", answer: "Generally no special preparation is needed, but you may need to remove jewelry or metal objects." }
      ]
    },
    {
      id: 7, title: "Ultrasonography (USG)", category: "Imaging", icon: "Activity",
      description: "Safe, real-time imaging for abdominal, pelvic, vascular, and prenatal examinations.",
      features: ["Abdominal USG", "Pelvic USG", "Obstetric USG", "Vascular USG"],
      price: "BDT 1,200+", duration: "30-45 minutes",
      whatToExpect: [
        { title: "Preparation", description: "You may be asked to drink water and avoid using the restroom before the scan." },
        { title: "Gel Application", description: "A water-based gel is applied to the skin for better sound wave transmission." },
        { title: "Scanning Process", description: "The ultrasound probe is moved over the area being examined." },
        { title: "Result Review", description: "Our radiologist interprets the images and provides a comprehensive report." }
      ],
      whyChoose: [
        "Safe, radiation-free imaging",
        "Real-time imaging capabilities",
        "Expert radiologists",
        "Comprehensive examinations",
        "Comfortable environment"
      ],
      aboutText: "Our Ultrasonography (USG) service provides safe, real-time imaging for abdominal, pelvic, vascular, and prenatal examinations. Using advanced ultrasound technology, we offer accurate diagnostic insights.",
      specialists: [7, 12],
      faqs: [
        { question: "Is ultrasound safe during pregnancy?", answer: "Yes, ultrasound is completely safe for both mother and baby as it uses sound waves, not radiation." },
        { question: "Do I need to fast before an abdominal ultrasound?", answer: "Yes, you should fast for 8-12 hours before an abdominal ultrasound for optimal visualization." }
      ]
    },
    {
      id: 8, title: "Color Doppler Imaging", category: "Imaging", icon: "Heart",
      description: "Advanced ultrasound technology to visualize blood flow and detect vascular abnormalities.",
      features: ["Carotid Doppler", "Peripheral vascular Doppler", "Cardiac Doppler", "Renal Doppler"],
      price: "BDT 1,500+", duration: "30-45 minutes",
      whatToExpect: [
        { title: "Preparation", description: "No special preparation is usually required." },
        { title: "Gel Application", description: "Gel is applied to the skin over the area being examined." },
        { title: "Doppler Scanning", description: "The Doppler probe evaluates blood flow direction and velocity." },
        { title: "Result Review", description: "Expert interpretation of blood flow patterns and vascular health." }
      ],
      whyChoose: [
        "Advanced Doppler technology",
        "Expert vascular specialists",
        "Non-invasive testing",
        "Accurate blood flow assessment",
        "Comprehensive vascular evaluation"
      ],
      aboutText: "Our Color Doppler Imaging service uses advanced ultrasound technology to visualize blood flow and detect vascular abnormalities. This non-invasive test provides crucial information about circulatory health.",
      specialists: [7, 1],
      faqs: [
        { question: "What is a Doppler test used for?", answer: "It's used to evaluate blood flow in veins and arteries, detect blockages, and assess vascular health." },
        { question: "Is it painful?", answer: "No, it's a completely painless, non-invasive procedure similar to a regular ultrasound." }
      ]
    },
    {
      id: 9, title: "ECG (Electrocardiogram)", category: "Cardiology", icon: "HeartPulse",
      description: "Quick, painless heart rhythm monitoring to detect arrhythmias, heart attacks, and cardiac conditions.",
      features: ["Resting ECG", "Stress ECG", "Holter monitoring", "Event recording"],
      price: "BDT 400+", duration: "10-20 minutes",
      whatToExpect: [
        { title: "Preparation", description: "You'll be asked to lie down and electrodes will be placed on your chest, arms, and legs." },
        { title: "Recording", description: "The ECG machine records your heart's electrical activity for a few minutes." },
        { title: "Analysis", description: "Our cardiologist analyzes the ECG pattern for any abnormalities." },
        { title: "Result Review", description: "Detailed interpretation and recommendations are provided." }
      ],
      whyChoose: [
        "Quick and painless procedure",
        "Expert cardiologists",
        "Advanced ECG equipment",
        "Accurate heart rhythm analysis",
        "Comprehensive cardiac evaluation"
      ],
      aboutText: "Our ECG (Electrocardiogram) service provides quick, painless heart rhythm monitoring to detect arrhythmias, heart attacks, and cardiac conditions. Our expert cardiologists ensure accurate interpretation for timely intervention.",
      specialists: [1, 2],
      faqs: [
        { question: "How long does an ECG take?", answer: "A resting ECG takes about 5-10 minutes to perform." },
        { question: "Is an ECG safe?", answer: "Yes, it's completely safe and non-invasive." }
      ]
    },
    {
      id: 10, title: "Echocardiography (ECHO)", category: "Cardiology", icon: "Heart",
      description: "Detailed ultrasound imaging of heart structure and function for comprehensive cardiac assessment.",
      features: ["Transthoracic ECHO", "Transesophageal ECHO", "Stress ECHO", "3D ECHO"],
      price: "BDT 2,000+", duration: "45-60 minutes",
      whatToExpect: [
        { title: "Preparation", description: "You'll need to remove clothing from the chest area and wear a hospital gown." },
        { title: "Gel Application", description: "Gel is applied to the chest for better image quality." },
        { title: "Ultrasound Scanning", description: "The ultrasound probe is moved over the chest to capture heart images." },
        { title: "Result Analysis", description: "Detailed analysis of heart structure and function by our cardiologist." }
      ],
      whyChoose: [
        "State-of-the-art ECHO equipment",
        "Expert cardiologists",
        "Comprehensive heart assessment",
        "Non-invasive procedure",
        "Detailed structural analysis"
      ],
      aboutText: "Our Echocardiography (ECHO) service provides detailed ultrasound imaging of heart structure and function for comprehensive cardiac assessment. Using advanced technology, we offer precise diagnostic insights.",
      specialists: [1, 2],
      faqs: [
        { question: "How long does an ECHO take?", answer: "A typical echocardiogram takes 30-45 minutes." },
        { question: "Is there any preparation needed?", answer: "No special preparation is usually needed, but you may be asked to avoid eating for a few hours before the test." }
      ]
    },
    {
      id: 11, title: "CT Scan Services", category: "Imaging", icon: "Scan",
      description: "Cross-sectional imaging for detailed views of bones, blood vessels, and soft tissues.",
      features: ["Brain CT", "Chest CT", "Abdominal CT", "Musculoskeletal CT"],
      price: "BDT 3,000+", duration: "30-45 minutes",
      whatToExpect: [
        { title: "Preparation", description: "You may need to remove metal objects and wear a hospital gown." },
        { title: "Contrast Media (if needed)", description: "Intravenous contrast may be administered for better visualization." },
        { title: "Scanning Process", description: "You'll lie on a table that moves through the CT scanner." },
        { title: "Result Review", description: "Our radiologist reviews and interprets the cross-sectional images." }
      ],
      whyChoose: [
        "Advanced CT technology",
        "Expert radiologists",
        "Detailed cross-sectional imaging",
        "Fast and accurate results",
        "Comprehensive evaluation"
      ],
      aboutText: "Our CT Scan Services provide detailed cross-sectional imaging for bones, blood vessels, and soft tissues. Using advanced technology, we deliver high-quality images for accurate diagnosis.",
      specialists: [7],
      faqs: [
        { question: "What is a CT scan?", answer: "A CT scan uses X-rays to create detailed cross-sectional images of the body." },
        { question: "Is it safe?", answer: "CT scans use low doses of radiation and are considered safe when medically necessary. We use dose-reduction techniques." }
      ]
    },
    {
      id: 12, title: "MRI Scan Services", category: "Imaging", icon: "Brain",
      description: "High-definition magnetic resonance imaging for brain, spine, joints, and soft tissue evaluation.",
      features: ["Brain MRI", "Spine MRI", "Joint MRI", "Soft tissue MRI"],
      price: "BDT 4,000+", duration: "45-60 minutes",
      whatToExpect: [
        { title: "Preparation", description: "Remove all metal objects and wear a hospital gown." },
        { title: "Positioning", description: "You'll lie on the MRI table and be moved into the scanner." },
        { title: "Scanning Process", description: "The MRI machine captures high-resolution images of the targeted area." },
        { title: "Result Review", description: "Expert interpretation of MRI images by our radiologist." }
      ],
      whyChoose: [
        "High-definition MRI technology",
        "Expert radiologists",
        "Detailed soft tissue imaging",
        "No radiation exposure",
        "Comprehensive evaluation"
      ],
      aboutText: "Our MRI Scan Services provide high-definition magnetic resonance imaging for brain, spine, joints, and soft tissue evaluation. Using advanced technology, we offer superior image quality without radiation exposure.",
      specialists: [7],
      faqs: [
        { question: "Is an MRI claustrophobic?", answer: "We offer open MRI options for claustrophobic patients and provide comfort measures during the scan." },
        { question: "What should I tell the technician?", answer: "Inform them about any metal implants, pregnancy, or claustrophobia concerns." }
      ]
    },
    {
      id: 13, title: "Mammography", category: "Imaging", icon: "Heart",
      description: "Specialized low-dose X-ray imaging for early detection and screening of breast cancer.",
      features: ["Screening mammography", "Diagnostic mammography", "Breast ultrasound", "Breast MRI"],
      price: "BDT 1,500+", duration: "30-45 minutes",
      whatToExpect: [
        { title: "Preparation", description: "Avoid using deodorant, powder, or lotion on the day of the exam." },
        { title: "Positioning", description: "Your breast will be positioned on the mammography machine and compressed." },
        { title: "Image Capture", description: "Images are taken from multiple angles for complete evaluation." },
        { title: "Result Review", description: "Expert interpretation by our radiologist." }
      ],
      whyChoose: [
        "Low-dose mammography technology",
        "Expert radiologists",
        "Comfortable environment",
        "Early breast cancer detection",
        "Comprehensive breast health evaluation"
      ],
      aboutText: "Our Mammography service provides specialized low-dose X-ray imaging for early detection and screening of breast cancer. Using advanced technology, we ensure accurate and comfortable examinations.",
      specialists: [7, 12],
      faqs: [
        { question: "At what age should I start mammography?", answer: "The recommended age to start is 40-45 years, but earlier screening may be recommended based on risk factors." },
        { question: "Is mammography painful?", answer: "Some women experience mild discomfort during compression, but it lasts only a few seconds." }
      ]
    },
    {
      id: 14, title: "Endoscopy & Colonoscopy", category: "Diagnostic", icon: "Activity",
      description: "Minimally invasive procedures to examine and treat conditions of the digestive tract.",
      features: ["Upper GI endoscopy", "Colonoscopy", "Sigmoidoscopy", "Biopsy"],
      price: "BDT 2,500+", duration: "1-2 hours",
      whatToExpect: [
        { title: "Preparation", description: "You'll need to follow specific dietary restrictions and take laxatives for colonoscopy." },
        { title: "Sedation", description: "You'll receive sedation for comfort during the procedure." },
        { title: "Examination", description: "The endoscope is gently inserted to visualize the digestive tract." },
        { title: "Recovery", description: "You'll recover from sedation before going home with your results." }
      ],
      whyChoose: [
        "Experienced gastroenterologists",
        "Advanced endoscopy equipment",
        "Comfortable sedation",
        "Comprehensive digestive evaluation",
        "Biopsy capabilities"
      ],
      aboutText: "Our Endoscopy & Colonoscopy services provide minimally invasive procedures to examine and treat conditions of the digestive tract. Using advanced equipment, we ensure accurate diagnosis and treatment.",
      specialists: [9],
      faqs: [
        { question: "Do I need to be sedated?", answer: "Yes, you'll receive conscious sedation to ensure comfort during the procedure." },
        { question: "How long does it take to recover?", answer: "You'll be monitored for 1-2 hours before going home and should not drive for 24 hours." }
      ]
    },
    {
      id: 15, title: "Pulmonary Function Test (PFT)", category: "Diagnostic", icon: "Wind",
      description: "Comprehensive lung function assessment for asthma, COPD, and respiratory disorder diagnosis.",
      features: ["Spirometry", "Lung volume measurement", "Gas diffusion test", "Bronchoprovocation testing"],
      price: "BDT 1,000+", duration: "45-60 minutes",
      whatToExpect: [
        { title: "Preparation", description: "Avoid heavy meals and stop smoking 2 hours before the test." },
        { title: "Breathing Instructions", description: "You'll be guided through different breathing maneuvers." },
        { title: "Multiple Measurements", description: "Various lung function parameters are measured." },
        { title: "Result Analysis", description: "Expert interpretation by our pulmonologist." }
      ],
      whyChoose: [
        "Comprehensive pulmonary testing",
        "Expert pulmonologists",
        "Advanced testing equipment",
        "Accurate lung function assessment",
        "Personalized treatment guidance"
      ],
      aboutText: "Our Pulmonary Function Test (PFT) provides comprehensive lung function assessment for asthma, COPD, and respiratory disorder diagnosis. Using advanced technology, we ensure accurate evaluation.",
      specialists: [13],
      faqs: [
        { question: "Do I need to stop my medications?", answer: "You may need to stop some medications 12-24 hours before the test. Follow your doctor's instructions." },
        { question: "Is the test painful?", answer: "No, the test is not painful, but it may require some effort to breathe forcefully." }
      ]
    },
    {
      id: 16, title: "EEG & EMG Testing", category: "Diagnostic", icon: "Brain",
      description: "Neurological diagnostics to evaluate brain activity and nerve-muscle function for seizure and neuropathy assessment.",
      features: ["EEG", "EMG", "Nerve conduction studies", "Evoked potentials"],
      price: "BDT 1,500+", duration: "1-2 hours",
      whatToExpect: [
        { title: "EEG Preparation", description: "Wash your hair and avoid caffeine before the test." },
        { title: "Electrode Placement", description: "Small electrodes are placed on your scalp for EEG or on muscles for EMG." },
        { title: "Recording", description: "Brain wave or muscle activity is recorded while you relax." },
        { title: "Result Review", description: "Expert interpretation by our neurologist." }
      ],
      whyChoose: [
        "Advanced neurological testing",
        "Expert neurologists",
        "Comprehensive evaluation",
        "Accurate seizure and neuropathy diagnosis",
        "State-of-the-art equipment"
      ],
      aboutText: "Our EEG & EMG Testing provides comprehensive neurological diagnostics to evaluate brain activity and nerve-muscle function. Using advanced equipment, we ensure accurate seizure and neuropathy assessment.",
      specialists: [3],
      faqs: [
        { question: "What is an EEG test?", answer: "An EEG measures brain wave activity and helps diagnose seizures, epilepsy, and sleep disorders." },
        { question: "Is EMG painful?", answer: "Some people experience mild discomfort during EMG, but it's generally well-tolerated." }
      ]
    },
    {
      id: 17, title: "Cardiology Diagnostic Services", category: "Cardiology", icon: "HeartPulse",
      description: "Complete heart health evaluation including stress tests, Holter monitoring, and advanced cardiac imaging.",
      features: ["Stress test", "Holter monitoring", "Cardiac CT", "Cardiac MRI"],
      price: "BDT 2,500+", duration: "1-2 hours",
      whatToExpect: [
        { title: "Heart Health Assessment", description: "Comprehensive evaluation of heart function and structure." },
        { title: "Stress Testing", description: "Your heart's response to physical activity is monitored." },
        { title: "Heart Rhythm Monitoring", description: "24-48 hour Holter monitoring for rhythm analysis." },
        { title: "Result Review", description: "Expert interpretation and treatment recommendations." }
      ],
      whyChoose: [
        "Comprehensive cardiac evaluation",
        "Expert cardiologists",
        "Advanced diagnostic technology",
        "Non-invasive testing options",
        "Personalized heart health plans"
      ],
      aboutText: "Our Cardiology Diagnostic Services provide complete heart health evaluation including stress tests, Holter monitoring, and advanced cardiac imaging. Our expert cardiologists ensure comprehensive cardiac assessment.",
      specialists: [1, 2],
      faqs: [
        { question: "What is a stress test?", answer: "A stress test evaluates your heart's function during physical activity to detect coronary artery disease." },
        { question: "How long is Holter monitoring?", answer: "Holter monitoring typically lasts 24-48 hours for continuous heart rhythm recording." }
      ]
    },
    {
      id: 18, title: "Diabetes Screening & Management", category: "Screening", icon: "Droplet",
      description: "Comprehensive glucose testing, HbA1c monitoring, and personalized diabetes care planning.",
      features: ["Blood glucose test", "HbA1c test", "Oral glucose tolerance test", "Diabetes education"],
      price: "BDT 300+", duration: "1-2 hours",
      whatToExpect: [
        { title: "Blood Sample Collection", description: "Blood samples are collected for glucose and HbA1c testing." },
        { title: "Screening Results", description: "Your blood sugar levels are analyzed and interpreted." },
        { title: "Diabetes Education", description: "Learn about diabetes management and lifestyle modifications." },
        { title: "Personalized Plan", description: "Create a customized diabetes care plan with our experts." }
      ],
      whyChoose: [
        "Comprehensive diabetes screening",
        "Expert endocrinologists",
        "Personalized care planning",
        "Diabetes education",
        "Ongoing monitoring support"
      ],
      aboutText: "Our Diabetes Screening & Management service provides comprehensive glucose testing, HbA1c monitoring, and personalized diabetes care planning. We help you manage diabetes effectively for better health outcomes.",
      specialists: [10],
      faqs: [
        { question: "What is HbA1c?", answer: "HbA1c measures your average blood sugar levels over the past 2-3 months." },
        { question: "How often should I check my blood sugar?", answer: "This depends on your treatment plan. Some need daily monitoring, others less frequently." }
      ]
    },
    {
      id: 19, title: "Kidney Function Tests", category: "Diagnostic", icon: "Activity",
      description: "Essential blood and urine tests to evaluate kidney health and detect renal disorders early.",
      features: ["Serum creatinine", "BUN test", "Glomerular filtration rate", "Urine albumin"],
      price: "BDT 350+", duration: "2-3 hours",
      whatToExpect: [
        { title: "Blood Sample Collection", description: "Blood samples are collected for kidney function tests." },
        { title: "Urine Sample Collection", description: "24-hour urine collection may be required." },
        { title: "Laboratory Analysis", description: "Samples are analyzed for kidney function markers." },
        { title: "Result Interpretation", description: "Expert interpretation of kidney health status." }
      ],
      whyChoose: [
        "Comprehensive kidney evaluation",
        "Expert nephrologists",
        "Early detection of renal issues",
        "Accurate testing",
        "Personalized treatment guidance"
      ],
      aboutText: "Our Kidney Function Tests provide essential blood and urine tests to evaluate kidney health and detect renal disorders early. Using advanced laboratory techniques, we ensure accurate assessment.",
      specialists: [11],
      faqs: [
        { question: "What is GFR?", answer: "Glomerular Filtration Rate measures how well your kidneys are filtering waste from your blood." },
        { question: "Do I need to fast for kidney tests?", answer: "Fasting for 8-12 hours is usually required for accurate creatinine levels." }
      ]
    },
    {
      id: 20, title: "Liver Function Tests", category: "Diagnostic", icon: "Activity",
      description: "Critical blood panels to assess liver health, detect hepatitis, and monitor treatment effectiveness.",
      features: ["Liver enzyme tests", "Bilirubin test", "Protein test", "Hepatitis panel"],
      price: "BDT 400+", duration: "2-3 hours",
      whatToExpect: [
        { title: "Blood Sample Collection", description: "Blood samples are collected for liver function testing." },
        { title: "Liver Enzyme Analysis", description: "Enzyme levels are measured to assess liver function." },
        { title: "Hepatitis Screening", description: "Screening for hepatitis viruses if indicated." },
        { title: "Result Review", description: "Expert interpretation and treatment recommendations." }
      ],
      whyChoose: [
        "Comprehensive liver assessment",
        "Expert hepatologists",
        "Accurate hepatitis screening",
        "Treatment monitoring",
        "Personalized care"
      ],
      aboutText: "Our Liver Function Tests provide critical blood panels to assess liver health, detect hepatitis, and monitor treatment effectiveness. Our expert team ensures accurate diagnosis and management.",
      specialists: [9],
      faqs: [
        { question: "What does a liver function test show?", answer: "It measures enzymes, proteins, and bilirubin to assess liver health and detect diseases." },
        { question: "Do I need to fast?", answer: "Yes, fasting for 8-12 hours is usually required for accurate results." }
      ]
    },
    {
      id: 21, title: "Thyroid Profile Tests", category: "Diagnostic", icon: "Target",
      description: "Accurate thyroid hormone testing for diagnosing hypothyroidism, hyperthyroidism, and metabolic disorders.",
      features: ["TSH test", "T3 test", "T4 test", "Free T3/T4"],
      price: "BDT 350+", duration: "2-3 hours",
      whatToExpect: [
        { title: "Blood Sample Collection", description: "Blood samples are collected for thyroid hormone testing." },
        { title: "Hormone Analysis", description: "Thyroid hormone levels are measured and analyzed." },
        { title: "Result Interpretation", description: "Expert interpretation of thyroid function." },
        { title: "Treatment Guidance", description: "Personalized treatment recommendations based on results." }
      ],
      whyChoose: [
        "Accurate thyroid testing",
        "Expert endocrinologists",
        "Comprehensive hormone panels",
        "Quick results",
        "Personalized treatment plans"
      ],
      aboutText: "Our Thyroid Profile Tests provide accurate thyroid hormone testing for diagnosing hypothyroidism, hyperthyroidism, and metabolic disorders. Our expert endocrinologists ensure precise diagnosis and treatment.",
      specialists: [10],
      faqs: [
        { question: "What is TSH?", answer: "Thyroid Stimulating Hormone is the key test to screen for thyroid disorders." },
        { question: "Do I need to fast?", answer: "Fasting is not usually required for thyroid tests, but it's best to follow your doctor's instructions." }
      ]
    },
    {
      id: 22, title: "Cancer Screening", category: "Screening", icon: "Award",
      description: "Early detection programs using advanced markers and imaging for various cancer types.",
      features: ["Tumor markers", "Genetic testing", "Cancer antigen tests", "Screening imaging"],
      price: "BDT 2,000+", duration: "2-4 hours",
      whatToExpect: [
        { title: "Risk Assessment", description: "Your personal and family history is reviewed for cancer risk." },
        { title: "Screening Tests", description: "Blood tests, imaging, and/or genetic testing as indicated." },
        { title: "Result Analysis", description: "Expert interpretation of cancer screening results." },
        { title: "Follow-up Plan", description: "Recommendations for further evaluation or monitoring." }
      ],
      whyChoose: [
        "Comprehensive cancer screening",
        "Expert oncologists",
        "Advanced screening technology",
        "Early detection programs",
        "Personalized risk assessment"
      ],
      aboutText: "Our Cancer Screening service provides early detection programs using advanced markers and imaging for various cancer types. We help identify cancer early when treatment is most effective.",
      specialists: [8],
      faqs: [
        { question: "What are tumor markers?", answer: "Tumor markers are substances produced by cancer cells that can be detected in blood tests." },
        { question: "How often should I get screened?", answer: "Screening frequency depends on your age, family history, and risk factors." }
      ]
    },
    {
      id: 23, title: "Preventive Health Checkup Packages", category: "Preventive", icon: "Package",
      description: "Customized wellness packages designed to identify health risks before symptoms appear.",
      features: ["Basic wellness package", "Executive package", "Senior citizen package", "Women's wellness package"],
      price: "BDT 1,500+", duration: "2-3 hours",
      whatToExpect: [
        { title: "Health Assessment", description: "Comprehensive evaluation of your overall health status." },
        { title: "Screening Tests", description: "Age-appropriate health screening tests." },
        { title: "Risk Analysis", description: "Identification of potential health risks." },
        { title: "Wellness Plan", description: "Personalized wellness recommendations." }
      ],
      whyChoose: [
        "Customized wellness packages",
        "Comprehensive screening",
        "Early risk detection",
        "Affordable pricing",
        "Professional guidance"
      ],
      aboutText: "Our Preventive Health Checkup Packages are customized wellness programs designed to identify health risks before symptoms appear. We help you maintain optimal health through proactive screening.",
      specialists: [4, 6, 12],
      faqs: [
        { question: "Which package is right for me?", answer: "We'll help you choose based on your age, gender, medical history, and risk factors." },
        { question: "How often should I get a checkup?", answer: "Generally annual checkups are recommended for healthy adults, but frequency may vary." }
      ]
    },
    {
      id: 24, title: "Full Body Health Checkup", category: "Preventive", icon: "Users",
      description: "Comprehensive head-to-toe evaluation covering all major organ systems for complete health assessment.",
      features: ["Complete blood work", "Imaging studies", "Cardiac evaluation", "Organ function tests"],
      price: "BDT 3,000+", duration: "3-4 hours",
      whatToExpect: [
        { title: "Complete Evaluation", description: "Head-to-toe health assessment covering all systems." },
        { title: "Laboratory Testing", description: "Comprehensive blood and urine analysis." },
        { title: "Imaging Studies", description: "Selected imaging studies based on your age and risk." },
        { title: "Comprehensive Report", description: "Detailed health report with recommendations." }
      ],
      whyChoose: [
        "Complete health evaluation",
        "Comprehensive testing",
        "Expert interpretation",
        "Personalized recommendations",
        "Value for money"
      ],
      aboutText: "Our Full Body Health Checkup provides comprehensive head-to-toe evaluation covering all major organ systems for complete health assessment. This thorough evaluation helps identify any underlying health concerns.",
      specialists: [1, 4, 7, 10, 11],
      faqs: [
        { question: "How long does a full body checkup take?", answer: "A complete checkup typically takes 3-4 hours including all tests and consultation." },
        { question: "What should I bring?", answer: "Bring your medical history, previous reports, and current medications list." }
      ]
    },
    {
      id: 25, title: "Covid-19 & Viral Screening", category: "Screening", icon: "Zap",
      description: "Rapid and PCR testing for coronavirus and other viral infections with quick, reliable results.",
      features: ["RT-PCR test", "Antigen test", "Antibody test", "Viral screening panels"],
      price: "BDT 500+", duration: "1-2 hours",
      whatToExpect: [
        { title: "Sample Collection", description: "Nasal/oral swab or blood sample is collected." },
        { title: "Rapid Testing", description: "Quick antigen tests provide results in 15-30 minutes." },
        { title: "PCR Testing", description: "More accurate PCR testing with results in 24-48 hours." },
        { title: "Result Delivery", description: "Reports are delivered through our secure portal." }
      ],
      whyChoose: [
        "Rapid and reliable testing",
        "Multiple test options",
        "Quick turnaround time",
        "Accurate results",
        "Convenient scheduling"
      ],
      aboutText: "Our Covid-19 & Viral Screening service provides rapid and PCR testing for coronavirus and other viral infections with quick, reliable results. We offer convenient testing options for your peace of mind.",
      specialists: [1, 7],
      faqs: [
        { question: "What's the difference between PCR and antigen tests?", answer: "PCR tests are more accurate but take longer, while antigen tests are faster but less sensitive." },
        { question: "How soon can I get results?", answer: "Rapid antigen tests provide results in 15-30 minutes, while PCR results take 24-48 hours." }
      ]
    },
    {
      id: 26, title: "Home Sample Collection", category: "Consultation", icon: "MapPin",
      description: "Convenient at-home blood and specimen collection by trained phlebotomists for your comfort.",
      features: ["At-home blood draw", "Specimen collection", "Lab pickup", "Online results"],
      price: "BDT 200+", duration: "30-45 minutes",
      whatToExpect: [
        { title: "Booking", description: "Schedule a convenient time for home collection." },
        { title: "Collection", description: "Trained phlebotomists visit your home for sample collection." },
        { title: "Sample Processing", description: "Samples are transported to our laboratory for testing." },
        { title: "Result Delivery", description: "Results are available through our online portal." }
      ],
      whyChoose: [
        "Convenient at-home service",
        "Trained phlebotomists",
        "Safe sample handling",
        "Quick and efficient",
        "Comfortable experience"
      ],
      aboutText: "Our Home Sample Collection service provides convenient at-home blood and specimen collection by trained phlebotomists for your comfort. We bring laboratory services to your doorstep.",
      specialists: [1, 7],
      faqs: [
        { question: "How do I book a home collection?", answer: "You can book online through our portal or call our hotline to schedule." },
        { question: "What samples can be collected at home?", answer: "Blood, urine, stool, and other specimens as recommended by your doctor." }
      ]
    },
    {
      id: 27, title: "Doctor Consultation Services", category: "Consultation", icon: "Stethoscope",
      description: "Easy access to experienced physicians for diagnosis, treatment planning, and health guidance.",
      features: ["General consultation", "Specialist referral", "Follow-up care", "Second opinion"],
      price: "BDT 500+", duration: "30-45 minutes",
      whatToExpect: [
        { title: "Initial Visit", description: "Discuss your health concerns with our experienced doctor." },
        { title: "Physical Examination", description: "Thorough physical examination as needed." },
        { title: "Treatment Planning", description: "Receive personalized treatment recommendations." },
        { title: "Follow-up Schedule", description: "Plan for ongoing care and monitoring." }
      ],
      whyChoose: [
        "Experienced physicians",
        "Comprehensive consultations",
        "Personalized care",
        "Convenient scheduling",
        "Continuity of care"
      ],
      aboutText: "Our Doctor Consultation Services provide easy access to experienced physicians for diagnosis, treatment planning, and health guidance. We ensure personalized care for every patient.",
      specialists: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      faqs: [
        { question: "How do I book a consultation?", answer: "Book online through our website or call our hotline to schedule an appointment." },
        { question: "Can I choose my doctor?", answer: "Yes, you can choose from our available specialists based on your needs." }
      ]
    },
    {
      id: 28, title: "Specialist Chamber Services", category: "Consultation", icon: "User",
      description: "Dedicated consultation rooms with expert specialists across multiple medical disciplines.",
      features: ["All specialties", "Private consultation", "Friendly environment", "Personalized care"],
      price: "BDT 600+", duration: "30-45 minutes",
      whatToExpect: [
        { title: "Specialist Consultation", description: "Consult with a specialist in your area of concern." },
        { title: "Detailed Evaluation", description: "Comprehensive evaluation and diagnosis." },
        { title: "Treatment Planning", description: "Specialized treatment recommendations." },
        { title: "Ongoing Care", description: "Continuous monitoring and follow-up." }
      ],
      whyChoose: [
        "Expert specialists",
        "Private consultation rooms",
        "Comprehensive care",
        "Multidisciplinary approach",
        "Patient-centered care"
      ],
      aboutText: "Our Specialist Chamber Services provide dedicated consultation rooms with expert specialists across multiple medical disciplines. We offer specialized care in a comfortable environment.",
      specialists: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      faqs: [
        { question: "What specialties are available?", answer: "We have specialists in cardiology, neurology, pediatrics, orthopedics, oncology, and many more." },
        { question: "Do I need a referral?", answer: "A referral from a primary care physician may be required for some specialists." }
      ]
    },
    {
      id: 29, title: "Women's Health Diagnostics", category: "Diagnostic", icon: "Heart",
      description: "Specialized screening and testing for reproductive health, hormonal balance, and women-specific conditions.",
      features: ["Pap smear", "HPV testing", "Hormonal panel", "Breast ultrasound"],
      price: "BDT 800+", duration: "2-3 hours",
      whatToExpect: [
        { title: "Health Assessment", description: "Comprehensive evaluation of women's health concerns." },
        { title: "Screening Tests", description: "Age-appropriate screening tests for women's health." },
        { title: "Hormonal Analysis", description: "Assessment of hormonal balance and reproductive health." },
        { title: "Treatment Planning", description: "Personalized care recommendations." }
      ],
      whyChoose: [
        "Women's health specialists",
        "Comprehensive screenings",
        "Sensitive and caring approach",
        "Advanced diagnostic tools",
        "Holistic care"
      ],
      aboutText: "Our Women's Health Diagnostics provide specialized screening and testing for reproductive health, hormonal balance, and women-specific conditions. We offer compassionate care in a comfortable environment.",
      specialists: [12],
      faqs: [
        { question: "When should I start Pap smear screening?", answer: "Pap smear screening is recommended from age 21 onwards, or earlier based on risk factors." },
        { question: "What is HPV testing?", answer: "HPV testing detects the presence of high-risk HPV strains associated with cervical cancer." }
      ]
    },
    {
      id: 30, title: "Child Health Diagnostics", category: "Diagnostic", icon: "Baby",
      description: "Gentle, age-appropriate diagnostic services tailored for infants, children, and adolescents.",
      features: ["Pediatric blood tests", "Growth monitoring", "Vaccination tracking", "Developmental assessment"],
      price: "BDT 400+", duration: "2-3 hours",
      whatToExpect: [
        { title: "Child-Friendly Approach", description: "Gentle, age-appropriate testing procedures." },
        { title: "Growth Assessment", description: "Monitoring of growth and development milestones." },
        { title: "Health Screening", description: "Age-appropriate health screening tests." },
        { title: "Vaccination Review", description: "Review and tracking of vaccination schedules." }
      ],
      whyChoose: [
        "Pediatric specialists",
        "Child-friendly environment",
        "Gentle approach",
        "Comprehensive screening",
        "Developmental monitoring"
      ],
      aboutText: "Our Child Health Diagnostics provide gentle, age-appropriate diagnostic services tailored for infants, children, and adolescents. We ensure a comfortable experience for young patients.",
      specialists: [4, 6],
      faqs: [
        { question: "How do you make children comfortable during tests?", answer: "We use child-friendly techniques, distractions, and ensure minimal discomfort." },
        { question: "What developmental assessments do you offer?", answer: "We assess physical, cognitive, and social development milestones appropriate for age." }
      ]
    },
    {
      id: 31, title: "Prenatal & Pregnancy Checkups", category: "Screening", icon: "Baby",
      description: "Comprehensive maternal care including ultrasounds, genetic screening, and pregnancy monitoring.",
      features: ["Obstetric USG", "Genetic screening", "Glucose tolerance", "Fetal monitoring"],
      price: "BDT 1,200+", duration: "2-3 hours",
      whatToExpect: [
        { title: "Maternal Assessment", description: "Comprehensive evaluation of maternal health." },
        { title: "Fetal Monitoring", description: "Regular monitoring of fetal growth and development." },
        { title: "Screening Tests", description: "Genetic screening and routine pregnancy tests." },
        { title: "Birth Planning", description: "Guidance for a healthy pregnancy and delivery." }
      ],
      whyChoose: [
        "Expert obstetricians",
        "Comprehensive maternal care",
        "Advanced fetal monitoring",
        "Genetic screening options",
        "Supportive care"
      ],
      aboutText: "Our Prenatal & Pregnancy Checkups provide comprehensive maternal care including ultrasounds, genetic screening, and pregnancy monitoring. We support you throughout your pregnancy journey.",
      specialists: [12],
      faqs: [
        { question: "How often should I have prenatal checkups?", answer: "Monthly visits until 28 weeks, biweekly from 28-36 weeks, and weekly from 36 weeks onwards." },
        { question: "What genetic screening is available?", answer: "We offer screening for Down syndrome and other genetic conditions through specialized tests." }
      ]
    },
    {
      id: 32, title: "Health Screening for Corporate Clients", category: "Preventive", icon: "Users",
      description: "Customized employee wellness programs with on-site or clinic-based health assessments.",
      features: ["On-site health checks", "Employee wellness", "Group screening", "Corporate packages"],
      price: "BDT 1,000+", duration: "2-4 hours",
      whatToExpect: [
        { title: "Corporate Assessment", description: "Customized health screening for your employees." },
        { title: "On-site Services", description: "We can come to your workplace for convenience." },
        { title: "Group Screening", description: "Efficient group health checks for your team." },
        { title: "Wellness Reports", description: "Comprehensive wellness reports for your organization." }
      ],
      whyChoose: [
        "Customized corporate packages",
        "On-site screening options",
        "Employee wellness focus",
        "Efficient group testing",
        "Comprehensive reporting"
      ],
      aboutText: "Our Health Screening for Corporate Clients provides customized employee wellness programs with on-site or clinic-based health assessments. We help you maintain a healthy workforce.",
      specialists: [1, 4, 7, 10],
      faqs: [
        { question: "What does a corporate health package include?", answer: "Basic health screening, cardiac evaluation, and diagnostic tests as needed." },
        { question: "How many employees can you screen?", answer: "We can screen any number of employees, from small teams to large corporations." }
      ]
    },
    {
      id: 33, title: "Emergency Diagnostic Support", category: "Diagnostic", icon: "Activity",
      description: "Rapid testing and imaging services available 24/7 for urgent and critical care situations.",
      features: ["24/7 availability", "Stat testing", "Emergency imaging", "Critical care support"],
      price: "BDT 1,000+", duration: "Varies",
      whatToExpect: [
        { title: "Immediate Response", description: "Rapid response for emergency diagnostic needs." },
        { title: "24/7 Availability", description: "Round-the-clock testing and imaging services." },
        { title: "Priority Processing", description: "Stat tests and imaging for emergency cases." },
        { title: "Critical Care Support", description: "Support for critical care decisions." }
      ],
      whyChoose: [
        "24/7 availability",
        "Rapid response",
        "Emergency ready",
        "Priority processing",
        "Critical care support"
      ],
      aboutText: "Our Emergency Diagnostic Support provides rapid testing and imaging services available 24/7 for urgent and critical care situations. We ensure timely diagnostic support for emergency cases.",
      specialists: [1, 7],
      faqs: [
        { question: "Are services available 24/7?", answer: "Yes, we offer emergency diagnostic services 24 hours a day, 7 days a week." },
        { question: "How quickly can I get results?", answer: "Stat results are available within hours for emergency cases." }
      ]
    },
    {
      id: 34, title: "Digital Reporting & Online Reports", category: "Consultation", icon: "FileText",
      description: "Secure, instant access to your test results via our patient portal with expert interpretation.",
      features: ["Secure online portal", "Instant results", "Expert interpretation", "Health records"],
      price: "Free", duration: "Varies",
      whatToExpect: [
        { title: "Secure Access", description: "Access your results through a secure patient portal." },
        { title: "Instant Results", description: "Get your results as soon as they're available." },
        { title: "Expert Interpretation", description: "Results include expert interpretation and recommendations." },
        { title: "Health Records", description: "Maintain a complete history of your health records." }
      ],
      whyChoose: [
        "Secure online access",
        "Instant results delivery",
        "Expert interpretation",
        "Complete health records",
        "Convenient and easy"
      ],
      aboutText: "Our Digital Reporting & Online Reports service provides secure, instant access to your test results via our patient portal with expert interpretation. We make health information easily accessible.",
      specialists: [],
      faqs: [
        { question: "How do I access the patient portal?", answer: "You'll receive login credentials via email/SMS when your account is created." },
        { question: "Are my health records secure?", answer: "Yes, all data is encrypted and stored securely in compliance with privacy regulations." }
      ]
    }
  ]);

  const categories = useMemo(() => ["all", ...new Set(services.map(s => s.category))], [services]);

  const filteredServices = useMemo(() => {
    let filtered = services;
    if (selectedCategory !== "all") filtered = filtered.filter(s => s.category === selectedCategory);
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(s =>
        s.title.toLowerCase().includes(term) || s.description.toLowerCase().includes(term) || s.category.toLowerCase().includes(term)
      );
    }
    return filtered;
  }, [services, selectedCategory, searchTerm]);

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
  const toggleService = (id) => setExpandedService(expandedService === id ? null : id);
  const openAddModal = () => { setEditingService(null); setShowAddModal(true); };
  const openEditModal = (service) => { setEditingService(service); setShowAddModal(true); };
  const closeModal = () => { setShowAddModal(false); setEditingService(null); };

  const handleAddService = (newService) => {
    if (editingService) {
      setServices(prev => prev.map(s => s.id === editingService.id ? { ...newService, id: s.id } : s));
      showToast("Service updated successfully!", "success");
    } else {
      const maxId = services.reduce((max, s) => Math.max(max, s.id), 0);
      setServices(prev => [...prev, { ...newService, id: maxId + 1 }]);
      showToast("Service added successfully!", "success");
    }
    closeModal();
  };
  const deleteService = (id) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices(prev => prev.filter(s => s.id !== id));
      if (expandedService === id) setExpandedService(null);
      showToast("Service deleted successfully!", "success");
    }
  };
  const duplicateService = (id) => {
    const service = services.find(s => s.id === id);
    if (service) {
      const maxId = services.reduce((max, s) => Math.max(max, s.id), 0);
      setServices(prev => [...prev, { ...service, id: maxId + 1, title: `${service.title} (Copy)` }]);
      showToast("Service duplicated successfully!", "success");
    }
  };

  const sections = [
    { id: "hero", label: "Hero Section", icon: Layout },
    { id: "services-grid", label: "Services", icon: Grid },
    { id: "features", label: "Features / Why Us", icon: Star },
    { id: "seo", label: "SEO & Meta", icon: Search }
  ];

  const renderContent = () => {
    switch (selectedSection) {
      case "hero": return <HeroEditor />;
      case "services-grid":
        return <ServicesGridEditor services={filteredServices} categories={categories}
          selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          expandedService={expandedService} toggleService={toggleService}
          openAddModal={openAddModal} openEditModal={openEditModal}
          deleteService={deleteService} duplicateService={duplicateService} />;
      case "features": return <FeaturesEditor />;
      case "seo": return <SeoEditor />;
      default: return <ServicesGridEditor services={filteredServices} categories={categories}
        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        expandedService={expandedService} toggleService={toggleService}
        openAddModal={openAddModal} openEditModal={openEditModal}
        deleteService={deleteService} duplicateService={duplicateService} />;
    }
  };

  return (
    <div className="wc-services-page">
      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">Services</span>
            <ChevronDown size={12} className="wc-breadcrumb-chevron" />
            <span className="current">{sections.find(s => s.id === selectedSection)?.label}</span>
          </div>
          <div className="wc-topbar-actions">
            <div className="wc-status-dot">Live</div>
            <button className="wc-btn wc-btn-ghost"><Eye size={14} /> Preview</button>
            <button className="wc-btn wc-btn-ghost"><RefreshCw size={14} /> Reset</button>
            <button className="wc-btn wc-btn-success" onClick={handleSave} disabled={saving}>
              {saving ? <><RefreshCw size={14} className="spinning" /> Saving...</> : <><Save size={14} /> Save Changes</>}
            </button>
          </div>
        </div>
        <div className="wc-editor-body">
          <nav className="wc-sections-nav">
            <div className="wc-sections-title">Sections</div>
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button key={section.id}
                  className={`wc-section-tab ${selectedSection === section.id ? "active" : ""}`}
                  onClick={() => setSelectedSection(section.id)}>
                  <Icon size={14} />{section.label}
                  {section.id === "seo" && <span className="wc-section-tab-badge">SEO</span>}
                </button>
              );
            })}
          </nav>
          <div className="wc-content-panel">
            <div className="wc-page-info-banner">
              <div className="wc-page-info-left">
                <div className="wc-page-info-icon"><Activity size={20} /></div>
                <div className="wc-page-info-text">
                  <h2>Services Page</h2>
                  <p>Editing: {sections.find(s => s.id === selectedSection)?.label}</p>
                </div>
              </div>
              <div className="wc-page-info-meta">
                <span className="wc-meta-tag live"><Check size={11} /> Published</span>
                <span className="wc-meta-tag"><Clock size={11} /> Last saved: Just now</span>
              </div>
            </div>
            {renderContent()}
          </div>
        </div>
      </div>
      {showAddModal && <AddServiceModal onClose={closeModal} onSave={handleAddService} editingService={editingService} />}
      <div className={`wc-toast ${toast.type} ${toast.show ? "show" : ""}`}>
        <Check size={16} />{toast.msg}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// HERO EDITOR
// ═══════════════════════════════════════════════════════════════
const HeroEditor = () => {
  const [data, setData] = useState({
    trust_badge_text: "OUR SERVICES",
    headline: "Comprehensive Diagnostic & Healthcare Services",
    description: "From routine checkups to advanced diagnostics, we offer a full spectrum of healthcare services under one roof.",
    background_images: [], stats: []
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

// ═══════════════════════════════════════════════════════════════
// SERVICES GRID EDITOR (with full detail accordion)
// ═══════════════════════════════════════════════════════════════
const ServicesGridEditor = ({
  services, categories, selectedCategory, setSelectedCategory,
  searchTerm, setSearchTerm, expandedService, toggleService,
  openAddModal, openEditModal, deleteService, duplicateService
}) => {
  const getIcon = (iconName) => {
    const Icon = getServiceIcon(iconName);
    return <Icon size={18} />;
  };

  const [expandedFaq, setExpandedFaq] = useState(null);

  // Calculate grid positioning for doctor cards - UPDATED
  const getDoctorGridPosition = (totalItems, index) => {
    if (totalItems === 1) return '2 / 3';
    if (totalItems === 2) return index === 0 ? '2 / 3' : '3 / 4';
    if (totalItems === 3) {
      if (index === 0) return '2 / 3';
      if (index === 1) return '2 / 3';
      return '3 / 4';
    }
    return 'auto';
  };

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title">
            <Grid size={15} /> Services
            <span className="wc-editor-card-desc">{services.length} services</span>
          </h3>
          <button className="wc-btn wc-btn-primary" onClick={openAddModal}>
            <Plus size={14} /> Add Service
          </button>
        </div>
        <div className="wc-editor-card-body">
          {/* Search & Filter */}
          <div className="wc-services-filters">
            <div className="wc-services-search">
              <Search size={14} className="wc-search-icon" />
              <input type="text" placeholder="Search services..." value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="wc-services-categories">
              {categories.map(cat => (
                <button key={cat}
                  className={`wc-filter-btn ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
            <span className="wc-services-stats">{services.length} services</span>
          </div>

          {/* Services List */}
          <div className="wc-services-list">
            {services.map(service => {
              const isExpanded = expandedService === service.id;
              return (
                <div key={service.id} className={`wc-service-accordion ${isExpanded ? "expanded" : ""}`}>
                  <div className="wc-service-accordion-header" onClick={() => toggleService(service.id)}>
                    <div className="wc-service-accordion-left">
                      <div className="wc-service-accordion-icon">{getIcon(service.icon)}</div>
                      <div className="wc-service-accordion-info">
                        <div className="wc-service-accordion-title">{service.title}</div>
                        <div className="wc-service-accordion-category">{service.category}</div>
                      </div>
                    </div>
                    <div className="wc-service-accordion-right">
                      <div className="wc-service-accordion-actions">
                        <button className="wc-icon-btn" onClick={(e) => { e.stopPropagation(); duplicateService(service.id); }} title="Duplicate">
                          <Copy size={14} />
                        </button>
                        <button className="wc-icon-btn" onClick={(e) => { e.stopPropagation(); openEditModal(service); }} title="Edit">
                          <Edit size={14} />
                        </button>
                        <button className="wc-icon-btn wc-icon-btn-danger" onClick={(e) => { e.stopPropagation(); deleteService(service.id); }} title="Delete">
                          <Trash size={14} />
                        </button>
                      </div>
                      <ChevronRight size={18} className={`wc-accordion-chevron ${isExpanded ? "rotated" : ""}`} />
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="wc-service-accordion-body">
                      <div className="wc-service-detail-grid">
                        <p className="wc-service-detail-desc">{service.description}</p>
                        <div className="wc-service-detail-meta">
                          {service.price && (
                            <div className="wc-service-detail-item">
                              <span>💰</span>
                              <span><strong>Price:</strong> {service.price}</span>
                            </div>
                          )}
                          {service.duration && (
                            <div className="wc-service-detail-item">
                              <Clock size={14} />
                              <span><strong>Duration:</strong> {service.duration}</span>
                            </div>
                          )}
                          {service.specialists && service.specialists.length > 0 && (
                            <div className="wc-service-detail-item">
                              <UserCheck size={14} />
                              <span><strong>Specialists:</strong> {service.specialists.length} doctors</span>
                            </div>
                          )}
                        </div>
                        {service.features && service.features.length > 0 && (
                          <>
                            <strong className="wc-service-features-title">Key Features:</strong>
                            <ul className="wc-service-detail-features">
                              {service.features.map((feature, idx) => (
                                <li key={idx}><Check size={14} />{feature}</li>
                              ))}
                            </ul>
                          </>
                        )}

                        {/* ── What to Expect ──────────────────────── */}
                        {service.whatToExpect && service.whatToExpect.length > 0 && (
                          <div className="wc-what-to-expect-section">
                            <strong className="wc-what-to-expect-title">What to Expect</strong>
                            <div className="wc-expect-steps">
                              {service.whatToExpect.map((step, idx) => (
                                <div key={idx} className="wc-expect-step">
                                  <div className="wc-expect-step-icon">{idx + 1}</div>
                                  <div className="wc-expect-step-content">
                                    <h4>{step.title}</h4>
                                    <p>{step.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* ── Why Choose ────────────────────────── */}
                        {service.whyChoose && service.whyChoose.length > 0 && (
                          <div className="wc-why-choose-section">
                            <strong className="wc-why-choose-title">Why Choose Our {service.title} Services</strong>
                            <div className="wc-why-choose-list">
                              {service.whyChoose.map((item, idx) => (
                                <div key={idx} className="wc-why-choose-item">
                                  <Check size={14} />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* ── About This Service ─────────────────── */}
                        {service.aboutText && (
                          <div className="wc-about-service-section">
                            <strong className="wc-about-service-title">About This Service</strong>
                            <p className="wc-about-service-text">{service.aboutText}</p>
                          </div>
                        )}

                        {/* ── Meet Our Specialists ───────────────── */}
                        {service.specialists && service.specialists.length > 0 && (
                          <div className="wc-specialists-section">
                            <strong className="wc-specialists-title">Meet Our Specialists</strong>
                            {/* UPDATED: Grid container with centering */}
                            <div className="wc-specialists-grid" style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(4, 1fr)',
                              gap: '12px',
                              justifyItems: 'center',
                              justifyContent: 'center'
                            }}>
                              {service.specialists.map((docId, index) => {
                                const doc = MOCK_DOCTORS.find(d => d.id === docId);
                                if (!doc) return null;
                                
                                const gridColumn = getDoctorGridPosition(service.specialists.length, index);
                                
                                return (
                                  // UPDATED: Grid item with centering
                                  <div key={doc.id} className="wc-specialists-grid-item" style={{
                                    gridColumn: gridColumn,
                                    width: '100%',
                                    maxWidth: '280px',
                                    justifySelf: 'center'
                                  }}>
                                    <DoctorCard doctor={doc} />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* ── FAQ ────────────────────────────────── */}
                        {service.faqs && service.faqs.length > 0 && (
                          <div className="wc-faq-section">
                            <strong className="wc-faq-title">Frequently Asked Questions</strong>
                            <div className="wc-faq-list">
                              {service.faqs.map((faq, idx) => {
                                const isFaqOpen = expandedFaq === `${service.id}-${idx}`;
                                return (
                                  <div key={idx} className={`wc-faq-item ${isFaqOpen ? "expanded" : ""}`}>
                                    <button className="wc-faq-question" onClick={() => setExpandedFaq(isFaqOpen ? null : `${service.id}-${idx}`)}>
                                      <span>{faq.question}</span>
                                      <ChevronRight size={14} className={`wc-faq-chevron ${isFaqOpen ? "rotated" : ""}`} />
                                    </button>
                                    {isFaqOpen && <div className="wc-faq-answer">{faq.answer}</div>}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {services.length === 0 && (
              <div className="wc-services-empty-state">
                <AlertCircle size={48} className="wc-empty-icon" />
                <h3>No services found</h3>
                <p>Try adjusting your search or filter criteria</p>
                <button className="wc-btn wc-btn-primary" onClick={openAddModal}>
                  <Plus size={14} /> Add Service
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
// ══════════════════════════════════════════════════════════════
// FEATURES EDITOR
// ═══════════════════════════════════════════════════════════════
const FeaturesEditor = () => {
  const [data, setData] = useState({
    section_label: "Why Choose Us",
    heading: "Why Renova Life Care?",
    subheading: "We are committed to providing the highest quality healthcare services.",
    features: [
      { icon: "Star", title: "Expert Team", description: "BMDC-certified specialists with years of experience" },
      { icon: "Heart", title: "Compassionate Care", description: "Patient-first approach with personalized attention" },
      { icon: "Award", title: "Quality Assurance", description: "ISO certified processes and quality standards" },
      { icon: "Clock", title: "Timely Service", description: "On-time appointments and quick results" }
    ]
  });
  const set = (k, v) => setData({ ...data, [k]: v });
  const updateFeature = (index, key, value) => {
    const updated = [...data.features];
    updated[index] = { ...updated[index], [key]: value };
    set("features", updated);
  };
  const addFeature = () => set("features", [...data.features, { icon: "Star", title: "", description: "" }]);
  const removeFeature = (index) => {
    const updated = [...data.features];
    updated.splice(index, 1);
    set("features", updated);
  };
  const iconOptions = ["Star", "Heart", "Award", "Clock", "Target", "Users", "Shield", "Check"];
  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Star size={15} /> Features Section</h3>
          <span className="wc-editor-card-desc">{data.features.length} features</span>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field"><label className="wc-field-label">Section Label</label>
              <input className="wc-input" value={data.section_label} onChange={e => set("section_label", e.target.value)} /></div>
            <div className="wc-field span-2"><label className="wc-field-label">Heading <span className="required">*</span></label>
              <input className="wc-input" value={data.heading} onChange={e => set("heading", e.target.value)} /></div>
            <div className="wc-field span-2"><label className="wc-field-label">Sub Heading</label>
              <textarea className="wc-textarea" value={data.subheading} onChange={e => set("subheading", e.target.value)} rows={2} /></div>
          </div>
          <div className="wc-features-list">
            {data.features.map((feature, i) => (
              <div key={i} className="wc-feature-row">
                <select className="wc-select" value={feature.icon} onChange={e => updateFeature(i, "icon", e.target.value)}>
                  {iconOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <input className="wc-input" value={feature.title} onChange={e => updateFeature(i, "title", e.target.value)} placeholder="Title" />
                <input className="wc-input" value={feature.description} onChange={e => updateFeature(i, "description", e.target.value)} placeholder="Description" />
                <button className="wc-btn wc-btn-danger wc-btn-sm" onClick={() => removeFeature(i)}><Trash size={14} /></button>
              </div>
            ))}
          </div>
          <button className="wc-repeater-add" onClick={addFeature}><Plus size={14} /> Add Feature</button>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// SEO EDITOR
// ══════════════════════════════════════════════════════════════
const SeoEditor = () => {
  const [data, setData] = useState({
    meta_title: "Healthcare Services — Diagnostics & Treatments | Renova Life Care",
    meta_description: "Comprehensive diagnostic and healthcare services in Bangladesh.",
    og_title: "Our Healthcare Services", og_description: "Full spectrum of healthcare services under one roof.",
    og_image: "/images/og-services.jpg", canonical_url: "https://renovalifecare.com/services",
    robots: "index, follow", keywords: "healthcare services Bangladesh, diagnostic services"
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
        <div className="wc-editor-card-header"><h3 className="wc-editor-card-title"><Search size={15} /> Meta Tags</h3></div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2"><label className="wc-field-label">Meta Title <span className="required">*</span></label>
              <input className="wc-input" value={data.meta_title} onChange={e => set("meta_title", e.target.value)} /></div>
            <div className="wc-field span-2"><label className="wc-field-label">Meta Description</label>
              <textarea className="wc-textarea" value={data.meta_description} onChange={e => set("meta_description", e.target.value)} rows={3} /></div>
            <div className="wc-field span-2"><label className="wc-field-label">Keywords</label>
              <input className="wc-input" value={data.keywords} onChange={e => set("keywords", e.target.value)} /></div>
            <div className="wc-field span-2"><label className="wc-field-label">Canonical URL</label>
              <input className="wc-input" value={data.canonical_url} onChange={e => set("canonical_url", e.target.value)} /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// ADD / EDIT SERVICE MODAL (Full Detail with all tabs)
// ═══════════════════════════════════════════════════════════════
const AddServiceModal = ({ onClose, onSave, editingService }) => {
  const [formData, setFormData] = useState({
    title: editingService?.title || "",
    category: editingService?.category || "Diagnostic",
    icon: editingService?.icon || "Activity",
    description: editingService?.description || "",
    features: editingService?.features || [],
    price: editingService?.price || "",
    duration: editingService?.duration || "",
    whatToExpect: editingService?.whatToExpect || [
      { title: "Initial Consultation", description: "Meet with our specialist to discuss your symptoms, medical history, and health goals." },
      { title: "Comprehensive Assessment", description: "Undergo thorough evaluation using state-of-the-art diagnostic tools." },
      { title: "Personalized Treatment Plan", description: "Receive a clear, customized care plan with explained options." },
      { title: "Ongoing Support & Follow-up", description: "Regular check-ins, progress monitoring, and plan adjustments." }
    ],
    whyChoose: editingService?.whyChoose || [
      "Personalized treatment plans designed for your specific health profile",
      "Board-certified specialists with extensive clinical experience",
      "Advanced diagnostic equipment for precise, accurate assessments",
      "Seamless coordination with other departments for holistic care"
    ],
    aboutText: editingService?.aboutText || "",
    specialists: editingService?.specialists || [],
    faqs: editingService?.faqs || [
      { question: "How do I prepare for my first appointment?", answer: "Please bring your previous medical records and arrive 15 minutes early." },
      { question: "Do you accept my insurance?", answer: "We accept most major insurance providers." },
      { question: "How long will my appointment take?", answer: "Initial consultations typically last 30-45 minutes." }
    ]
  });

  const [newFeature, setNewFeature] = useState("");
  const [errors, setErrors] = useState({});
  const [activeModalTab, setActiveModalTab] = useState("basic");

  // Specialists selector state
  const [specialistSearch, setSpecialistSearch] = useState("");
  const [specialistFilter, setSpecialistFilter] = useState("all");

  const categories = ["Diagnostic", "Imaging", "Cardiology", "Screening", "Consultation", "Preventive", "Other"];
  const iconOptions = ["Activity", "Heart", "Stethoscope", "Microscope", "Syringe", "Pill", "Bone", "Brain",
    "Droplet", "Thermometer", "Scissors", "Eye", "Ear", "Tooth", "Baby", "HeartPulse", "Users",
    "Calendar", "MessageCircle", "Award", "Star", "Target", "Package", "FileText", "MapPin", "Phone", "Mail", "User",
    "Wind", "Zap", "Dna", "Scan"];

  const uniqueSpecialties = useMemo(() => {
    const specs = MOCK_DOCTORS.map(d => d.specialty);
    return ["all", ...new Set(specs)];
  }, []);

  const filteredDoctors = useMemo(() => {
    let docs = MOCK_DOCTORS;
    if (specialistFilter !== "all") docs = docs.filter(d => d.specialty === specialistFilter);
    if (specialistSearch.trim()) {
      const term = specialistSearch.toLowerCase().trim();
      docs = docs.filter(d => d.name.toLowerCase().includes(term) || d.specialty.toLowerCase().includes(term));
    }
    return docs;
  }, [specialistSearch, specialistFilter]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Service title is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSave(formData);
  };

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: "" }));
  };

  // ─ What to Expect helpers ──
  const addExpectStep = () => setFormData(prev => ({
    ...prev, whatToExpect: [...prev.whatToExpect, { title: "", description: "" }]
  }));
  const updateExpectStep = (idx, key, value) => {
    const updated = [...formData.whatToExpect];
    updated[idx] = { ...updated[idx], [key]: value };
    setFormData(prev => ({ ...prev, whatToExpect: updated }));
  };
  const removeExpectStep = (idx) => setFormData(prev => ({
    ...prev, whatToExpect: prev.whatToExpect.filter((_, i) => i !== idx)
  }));
  const moveExpectStep = (idx, dir) => {
    const updated = [...formData.whatToExpect];
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= updated.length) return;
    [updated[idx], updated[newIdx]] = [updated[newIdx], updated[idx]];
    setFormData(prev => ({ ...prev, whatToExpect: updated }));
  };

  // ── Why Choose helpers ──
  const addWhyItem = () => setFormData(prev => ({ ...prev, whyChoose: [...prev.whyChoose, ""] }));
  const updateWhyItem = (idx, value) => {
    const updated = [...formData.whyChoose];
    updated[idx] = value;
    setFormData(prev => ({ ...prev, whyChoose: updated }));
  };
  const removeWhyItem = (idx) => setFormData(prev => ({
    ...prev, whyChoose: prev.whyChoose.filter((_, i) => i !== idx)
  }));

  // ── FAQ helpers ──
  const addFaq = () => setFormData(prev => ({
    ...prev, faqs: [...prev.faqs, { question: "", answer: "" }]
  }));
  const updateFaq = (idx, key, value) => {
    const updated = [...formData.faqs];
    updated[idx] = { ...updated[idx], [key]: value };
    setFormData(prev => ({ ...prev, faqs: updated }));
  };
  const removeFaq = (idx) => setFormData(prev => ({
    ...prev, faqs: prev.faqs.filter((_, i) => i !== idx)
  }));

  // ── Specialists toggle ──
  const toggleSpecialist = (docId) => {
    setFormData(prev => ({
      ...prev,
      specialists: prev.specialists.includes(docId)
        ? prev.specialists.filter(id => id !== docId)
        : [...prev.specialists, docId]
    }));
  };
  const removeSpecialist = (docId) => setFormData(prev => ({
    ...prev, specialists: prev.specialists.filter(id => id !== docId)
  }));

  const modalTabs = [
    { id: "basic", label: "Basic Info", icon: FileText },
    { id: "expect", label: "What to Expect", icon: HelpCircle },
    { id: "why", label: "Why Choose", icon: CheckCircle2 },
    { id: "about", label: "About", icon: BookOpen },
    { id: "specialists", label: "Specialists", icon: UserCheck },
    { id: "faq", label: "FAQ", icon: HelpCircle }
  ];

  return (
    <div className="wc-modal-overlay" onClick={onClose}>
      <div className="wc-modal wc-modal-service" onClick={(e) => e.stopPropagation()}>
        <div className="wc-modal-header">
          <h3>{editingService ? "Edit Service" : "Add New Service"}</h3>
          <button className="wc-modal-close" onClick={onClose}><X size={20} /></button>
        </div>

        {/* Modal Tabs */}
        <div className="wc-modal-tabs">
          {modalTabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} 
                className={`wc-modal-tab ${activeModalTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveModalTab(tab.id)}>
                <Icon size={13} />{tab.label}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="wc-modal-body">

            {/* ─ Errors ── */}
            {Object.keys(errors).length > 0 && (
              <div className="wc-modal-errors">
                <AlertCircle size={18} />
                <div>
                  <strong>Please fix the following errors:</strong>
                  <ul>
                    {Object.values(errors).map((err, i) => <li key={i}>{err}</li>)}
                  </ul>
                </div>
              </div>
            )}

            {/* ═══ TAB: Basic Info ══ */}
            {activeModalTab === "basic" && (
              <div className="wc-modal-service-grid">
                <div className="wc-field">
                  <label className="wc-field-label">Service Title <span className="required">*</span></label>
                  <input className="wc-input" placeholder="Enter service title..." value={formData.title}
                    onChange={e => handleChange("title", e.target.value)}
                    style={{ borderColor: errors.title ? '#dc2626' : '' }} />
                </div>
                <div className="wc-field-row">
                  <div className="wc-field">
                    <label className="wc-field-label">Category <span className="required">*</span></label>
                    <select className="wc-select" value={formData.category} onChange={e => handleChange("category", e.target.value)}>
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div className="wc-field">
                    <label className="wc-field-label">Icon</label>
                    <select className="wc-select" value={formData.icon} onChange={e => handleChange("icon", e.target.value)}>
                      {iconOptions.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                    </select>
                  </div>
                </div>
                <div className="wc-field">
                  <label className="wc-field-label">Description <span className="required">*</span></label>
                  <textarea className="wc-textarea" placeholder="Enter service description..." value={formData.description}
                    onChange={e => handleChange("description", e.target.value)} rows={3}
                    style={{ borderColor: errors.description ? '#dc2626' : '' }} />
                </div>
                <div className="wc-field-row">
                  <div className="wc-field">
                    <label className="wc-field-label">Price</label>
                    <input className="wc-input" placeholder="e.g. BDT 500+" value={formData.price}
                      onChange={e => handleChange("price", e.target.value)} />
                  </div>
                  <div className="wc-field">
                    <label className="wc-field-label">Duration</label>
                    <input className="wc-input" placeholder="e.g. 2-4 hours" value={formData.duration}
                      onChange={e => handleChange("duration", e.target.value)} />
                  </div>
                </div>
                <div className="wc-field">
                  <label className="wc-field-label">Key Features</label>
                  <div className="wc-feature-input-row">
                    <input className="wc-input" placeholder="Add a feature..." value={newFeature}
                      onChange={e => setNewFeature(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), setFormData(prev => ({ ...prev, features: [...prev.features, newFeature.trim()] })), setNewFeature(""))} />
                    <button type="button" className="wc-btn wc-btn-primary" onClick={() => {
                      if (newFeature.trim()) {
                        setFormData(prev => ({ ...prev, features: [...prev.features, newFeature.trim()] }));
                        setNewFeature("");
                      }
                    }}><Plus size={14} /></button>
                  </div>
                  {formData.features.length > 0 && (
                    <div className="wc-features-tags">
                      {formData.features.map((feature, index) => (
                        <div key={index} className="wc-feature-tag">
                          <span>{feature}</span>
                          <button type="button" onClick={() => setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }))}>
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ═══ TAB: What to Expect ═══ */}
            {activeModalTab === "expect" && (
              <div>
                <div className="wc-modal-tab-description">
                  Define the step-by-step patient journey for this service.
                </div>
                {formData.whatToExpect.map((step, idx) => (
                  <div key={idx} className="wc-repeater-row wc-repeater-row-3col">
                    <div className="wc-repeater-number">{idx + 1}</div>
                    <input className="wc-input" placeholder="Step title..." value={step.title}
                      onChange={e => updateExpectStep(idx, "title", e.target.value)} />
                    <textarea className="wc-textarea" placeholder="Step description..." value={step.description} rows={2}
                      onChange={e => updateExpectStep(idx, "description", e.target.value)} />
                    <div className="wc-repeater-row-actions">
                      <button type="button" className="wc-btn wc-btn-ghost wc-btn-sm" onClick={() => moveExpectStep(idx, -1)} disabled={idx === 0}>
                        <ArrowUp size={12} />
                      </button>
                      <button type="button" className="wc-btn wc-btn-ghost wc-btn-sm" onClick={() => moveExpectStep(idx, 1)} disabled={idx === formData.whatToExpect.length - 1}>
                        <ArrowDown size={12} />
                      </button>
                      <button type="button" className="wc-btn wc-btn-danger wc-btn-sm" onClick={() => removeExpectStep(idx)}>
                        <Trash size={12} />
                      </button>
                    </div>
                  </div>
                ))}
                <button type="button" className="wc-repeater-add" onClick={addExpectStep}>
                  <Plus size={14} /> Add Step
                </button>
              </div>
            )}

            {/* ═══ TAB: Why Choose ═══ */}
            {activeModalTab === "why" && (
              <div>
                <div className="wc-modal-tab-description">
                  List the key reasons patients should choose this service.
                </div>
                {formData.whyChoose.map((item, idx) => (
                  <div key={idx} className="wc-repeater-row wc-repeater-row-2col">
                    <div className="wc-repeater-number wc-repeater-number-success">✓</div>
                    <input className="wc-input" placeholder="Reason..." value={item}
                      onChange={e => updateWhyItem(idx, e.target.value)} />
                    <button type="button" className="wc-btn wc-btn-danger wc-btn-sm" onClick={() => removeWhyItem(idx)}>
                      <Trash size={12} />
                    </button>
                  </div>
                ))}
                <button type="button" className="wc-repeater-add" onClick={addWhyItem}>
                  <Plus size={14} /> Add Reason
                </button>
              </div>
            )}

            {/* ═══ TAB: About ══ */}
            {activeModalTab === "about" && (
              <div className="wc-field">
                <label className="wc-field-label">About This Service</label>
                <textarea className="wc-textarea wc-textarea-xl" placeholder="Detailed description about this service..."
                  value={formData.aboutText} onChange={e => handleChange("aboutText", e.target.value)} rows={8} />
                <span className="wc-field-hint">This text will appear in the 'About This Service' section on the frontend.</span>
              </div>
            )}

            {/* ═══ TAB: Specialists ═══ */}
            {activeModalTab === "specialists" && (
              <div className="wc-specialists-selector">
                <div className="wc-specialists-selector-header">
                  Select doctors who specialize in this service. Selected: <strong>{formData.specialists.length}</strong>
                </div>

                {/* Selected specialists tags */}
                {formData.specialists.length > 0 && (
                  <div className="wc-specialists-selected-tags">
                    {formData.specialists.map(docId => {
                      const doc = MOCK_DOCTORS.find(d => d.id === docId);
                      if (!doc) return null;
                      return (
                        <div key={docId} className="wc-specialist-tag">
                          <span>{doc.name}</span>
                          <button type="button" onClick={() => removeSpecialist(docId)}><X size={12} /></button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Search */}
                <div className="wc-specialists-search">
                  <Search size={14} className="wc-search-icon" />
                  <input type="text" placeholder="Search doctors by name or specialty..."
                    value={specialistSearch} onChange={e => setSpecialistSearch(e.target.value)} />
                </div>

                {/* Specialty filter */}
                <div className="wc-specialists-filter-row">
                  <span className="wc-selected-count">Filter by specialty:</span>
                  {uniqueSpecialties.map(spec => (
                    <button key={spec} type="button"
                      className={`wc-filter-btn ${specialistFilter === spec ? "active" : ""}`}
                      onClick={() => setSpecialistFilter(spec)}>
                      {spec === "all" ? "All" : spec}
                    </button>
                  ))}
                </div>

                {/* Doctors list */}
                <div className="wc-specialists-list">
                  {filteredDoctors.length === 0 ? (
                    <div className="wc-specialists-empty">No doctors found matching your criteria.</div>
                  ) : (
                    filteredDoctors.map(doc => {
                      const isSelected = formData.specialists.includes(doc.id);
                      return (
                        <label key={doc.id} className={`wc-specialist-option ${isSelected ? "selected" : ""}`}>
                          <input type="checkbox" checked={isSelected} onChange={() => toggleSpecialist(doc.id)} />
                          <div className="wc-specialist-option-avatar">
                            <img 
                              src={doc.image} 
                              alt={doc.name}
                              className="wc-specialist-option-avatar-img"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.style.background = 'linear-gradient(135deg, #014fa1, #0a7ed9)';
                                e.target.parentElement.style.color = '#fff';
                                e.target.parentElement.style.display = 'flex';
                                e.target.parentElement.style.alignItems = 'center';
                                e.target.parentElement.style.justifyContent = 'center';
                                e.target.parentElement.style.fontSize = '14px';
                                e.target.parentElement.style.fontWeight = '700';
                                e.target.parentElement.textContent = doc.name.split(' ').map(n => n[0]).join('').slice(0, 2);
                              }}
                            />
                          </div>
                          <div className="wc-specialist-option-info">
                            <div className="wc-specialist-option-name">{doc.name}</div>
                            <div className="wc-specialist-option-spec">{doc.specialty} · {doc.credentials}</div>
                          </div>
                          <span className="wc-specialist-option-rating">★ {doc.rating}</span>
                        </label>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* ═══ TAB: FAQ ═══ */}
            {activeModalTab === "faq" && (
              <div>
                <div className="wc-modal-tab-description">
                  Add frequently asked questions about this service.
                </div>
                {formData.faqs.map((faq, idx) => (
                  <div key={idx} className="wc-faq-editor-item">
                    <div className="wc-faq-editor-header">
                      <div className="wc-repeater-number wc-repeater-number-warning">Q{idx + 1}</div>
                      <input className="wc-input" placeholder="Question..." value={faq.question}
                        onChange={e => updateFaq(idx, "question", e.target.value)} />
                      <button type="button" className="wc-btn wc-btn-danger wc-btn-sm" onClick={() => removeFaq(idx)}>
                        <Trash size={12} />
                      </button>
                    </div>
                    <textarea className="wc-textarea" placeholder="Answer..." value={faq.answer} rows={2}
                      onChange={e => updateFaq(idx, "answer", e.target.value)} />
                  </div>
                ))}
                <button type="button" className="wc-repeater-add" onClick={addFaq}>
                  <Plus size={14} /> Add FAQ
                </button>
              </div>
            )}
          </div>

          <div className="wc-modal-footer">
            <button type="button" className="wc-btn wc-btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="wc-btn wc-btn-primary">
              {editingService ? "Update Service" : "Add Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServicesPage;