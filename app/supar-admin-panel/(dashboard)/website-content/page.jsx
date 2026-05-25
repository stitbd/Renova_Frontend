"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import "./website-content.css";

/* ══════════════════════════════════════════════════════════════
   PAGE TREE — Mirrors your navLinks
   ══════════════════════════════════════════════════════════════ */
const PAGE_TREE = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: "home",
    sections: ["hero", "appointment-cta", "testimonials", "partners", "seo"],
  },
{
    id: "about",
    label: "About",
    href: "/about",
    icon: "info",
    sections: ["about-hero", "mission-vision", "stats-bar", "managing-director", "company-history", "certifications", "seo"],
  },
  {
    id: "doctors",
    label: "Doctors",
    href: "/doctors",
    icon: "doctors",
    sections: ["hero", "doctor-listing", "career-cta", "seo"],
  },
  {
    id: "services",
    label: "Services",
    href: "/services",
    icon: "services",
    sections: ["hero", "services-grid", "features", "seo"],
    children: [
      { id: "services-pathology", label: "Pathology & Lab Testing", href: "/services/pathology-laboratory-testing" },
      { id: "services-blood", label: "Blood Test & Biochemistry", href: "/services/blood-test-biochemistry" },
      { id: "services-hematology", label: "Hematology Services", href: "/services/hematology-services" },
      { id: "services-hormone", label: "Hormone & Immunology Tests", href: "/services/hormone-immunology-tests" },
      { id: "services-urine", label: "Urine & Stool Analysis", href: "/services/urine-stool-analysis" },
      { id: "services-xray", label: "Digital X-Ray", href: "/services/digital-x-ray" },
      { id: "services-usg", label: "Ultrasonography (USG)", href: "/services/ultrasonography-usg" },
      { id: "services-doppler", label: "Color Doppler Imaging", href: "/services/color-doppler-imaging" },
      { id: "services-ecg", label: "ECG (Electrocardiogram)", href: "/services/ecg-electrocardiogram" },
      { id: "services-echo", label: "Echocardiography (ECHO)", href: "/services/echocardiography-echo" },
      { id: "services-ct", label: "CT Scan Services", href: "/services/ct-scan-services" },
      { id: "services-mri", label: "MRI Scan Services", href: "/services/mri-scan-services" },
      { id: "services-mammography", label: "Mammography", href: "/services/mammography" },
      { id: "services-endoscopy", label: "Endoscopy & Colonoscopy", href: "/services/endoscopy-colonoscopy" },
      { id: "services-pft", label: "Pulmonary Function Test", href: "/services/pulmonary-function-test-pft" },
      { id: "services-eeg", label: "EEG & EMG Testing", href: "/services/eeg-emg-testing" },
      { id: "services-cardiology", label: "Cardiology Diagnostics", href: "/services/cardiology-diagnostic-services" },
      { id: "services-diabetes", label: "Diabetes Screening", href: "/services/diabetes-screening-management" },
      { id: "services-kidney", label: "Kidney Function Tests", href: "/services/kidney-function-tests" },
      { id: "services-liver", label: "Liver Function Tests", href: "/services/liver-function-tests" },
      { id: "services-thyroid", label: "Thyroid Profile Tests", href: "/services/thyroid-profile-tests" },
      { id: "services-cancer", label: "Cancer Screening", href: "/services/cancer-screening" },
      { id: "services-packages", label: "Health Checkup Packages", href: "/services/preventive-health-checkup-packages" },
      { id: "services-fullbody", label: "Full Body Health Checkup", href: "/services/full-body-health-checkup" },
      { id: "services-covid", label: "Covid-19 & Viral Screening", href: "/services/covid-19-viral-screening" },
      { id: "services-home-sample", label: "Home Sample Collection", href: "/services/home-sample-collection" },
      { id: "services-consultation", label: "Doctor Consultation", href: "/services/doctor-consultation-services" },
      { id: "services-specialist", label: "Specialist Chamber", href: "/services/specialist-chamber-services" },
      { id: "services-womens", label: "Women's Health Diagnostics", href: "/services/womens-health-diagnostics" },
      { id: "services-child", label: "Child Health Diagnostics", href: "/services/child-health-diagnostics" },
      { id: "services-prenatal", label: "Prenatal & Pregnancy", href: "/services/prenatal-pregnancy-checkups" },
      { id: "services-corporate", label: "Corporate Health Screening", href: "/services/health-screening-corporate-clients" },
      { id: "services-emergency", label: "Emergency Diagnostic", href: "/services/emergency-diagnostic-support" },
      { id: "services-digital", label: "Digital Reporting", href: "/services/digital-reporting-online-reports" },
    ],
  },
  {
    id: "packages",
    label: "Packages",
    href: "/packages",
    icon: "package",
    sections: ["hero", "packages-listing", "seo"],
  },
  {
    id: "shop",
    label: "Shop",
    href: "/shop",
    icon: "shop",
    sections: ["hero", "products", "categories", "seo"],
  },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "news", label: "News", href: "/news" },
  { id: "photos", label: "Photos Gallery", href: "/photos", icon: "image", sections: ["hero", "photo-gallery", "seo"] },
  { id: "videos", label: "Videos Gallery", href: "/videos", icon: "layout", sections: ["hero", "video-gallery", "seo"] },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
    icon: "contact",
    sections: ["hero", "contact-info", "map", "form-settings", "seo"],
  },
];

/* ══════════════════════════════════════════════════════════════
   SECTION DEFINITIONS PER PAGE
   ══════════════════════════════════════════════════════════════ */
const SECTION_DEFS = {
  hero: { label: "Hero Section", icon: "layout", desc: "Banner, headline, description, stats, trust images" },
  "appointment-cta": { label: "Appointment CTA", icon: "calendar", desc: "Book appointment banner with stats" },
  testimonials: { label: "Testimonials", icon: "message-circle", desc: "Patient reviews & satisfaction stats" },
  partners: { label: "Partners & Affiliations", icon: "award", desc: "Partner logos and affiliations" },
  seo: { label: "SEO & Meta", icon: "search", desc: "Title, description, OG tags" },


  "about-hero": { label: "Hero Section", icon: "layout", desc: "Header, about content, features & stats" },
  "mission-vision": { label: "Mission & Vision", icon: "target", desc: "Mission, Vision & Values text" },
  "managing-director": { label: "Managing Director", icon: "user", desc: "MD photo, message, quote & stats" },
  "stats-bar": { label: "Stats Bar", icon: "list", desc: "4 key statistics" },
  "certifications": { label: "Certifications", icon: "award", desc: "Accreditations & certificates" },
  "company-history": { label: "Company History", icon: "clock", desc: "Timeline and milestones" },
  

  "doctor-listing": { label: "Doctor Listing", icon: "list", desc: "All doctor cards & filters" },
  specializations: { label: "Specializations", icon: "tag", desc: "Filter by specialty" },
  "career-cta": { label: "Career CTA", icon: "user-plus", desc: "Are You a Medical Professional section" },
  "packages-listing": { label: "Packages List", icon: "list", desc: "All health packages with pricing" },
  "photo-gallery": { label: "Photo Gallery", icon: "image", desc: "Gallery categories & images" },
  "video-gallery": { label: "Video Gallery", icon: "layout", desc: "Video categories & video cards" },


  "about-snippet": { label: "About Snippet", icon: "info", desc: "Homepage about preview" },
  "services-grid": { label: "Services Grid", icon: "grid", desc: "Service cards display" },
  doctors: { label: "Featured Doctors", icon: "user", desc: "Doctor listing on homepage" },
  shop: { label: "Shop Section", icon: "shopping-bag", desc: "Product showcase" },
  packages: { label: "Packages Section", icon: "package", desc: "Health packages display" },
  blog: { label: "Blog / News", icon: "file-text", desc: "Latest articles section" },
  features: { label: "Features / Why Us", icon: "star", desc: "Key differentiators" },
  "packages-listing": { label: "Packages List", icon: "list", desc: "All health packages" },
  products: { label: "Products", icon: "shopping-bag", desc: "Product grid" },
  categories: { label: "Categories", icon: "grid", desc: "Product categories" },
  "contact-info": { label: "Contact Info", icon: "phone", desc: "Address, phone, email" },
  map: { label: "Map & Location", icon: "map-pin", desc: "Google map embed" },
  "form-settings": { label: "Contact Form", icon: "mail", desc: "Form fields and settings" },
};

/* ══════════════════════════════════════════════════════════════
   INITIAL DATA
   ══════════════════════════════════════════════════════════════ */
const INITIAL_DATA = {
  home: {
    hero: {
      trust_badge_text: "Your Health, Our Priority",
      headline: "Your Health, Our Priority — Expert Care, Every Step",
      description: "Renova Life Care Ltd. delivers world-class healthcare services across Bangladesh. From general checkups to specialized treatments, our expert doctors are here for you.",
      background_images: [
        "/images/sliders/01.jpg",
        "/images/sliders/02.jpg",
        "/images/sliders/03.jpg",
        "/images/sliders/04.jpg",
        "/images/sliders/05.jpg",
        "/images/sliders/06.jpg",
      ],
      patient_images: [
        "/images/patients/01.jpg",
        "/images/patients/02.jpg",
        "/images/patients/03.jpg",
        "/images/patients/04.jpg",
        "/images/patients/05.jpg",
      ],
      stats: [
        { label: "Happy Patients", value: "15,000+", suffix: "" },
        { label: "Expert Doctors", value: "120+", suffix: "" },
        { label: "Departments", value: "25+", suffix: "" },
        { label: "Years Experience", value: "15+", suffix: "" },
      ],
    },
    "appointment-cta": {
      heading: "Your Health Deserves Expert Care, Right Now.",
      subheading: "Schedule a consultation — be it in-person, video, or home visit — and ensure your wellbeing is looked after.",
      background_type: "gradient",
      stats: [
        { label: "Patients Served", value: "50K+" },
        { label: "Specialist Doctors", value: "120+" },
        { label: "Average Rating", value: "4.98" },
      ],
    },
    testimonials: {
      section_label: "Testimonials",
      heading: "Real Patients, Real Transformations",
      subheading: "Thousands of families across Bangladesh trust Renova Life Care with their precious lives—their health.",
      show_rating: true,
      show_total_patients: true,
      stats: [
        { label: "Patient Satisfaction", value: "98%" },
        { label: "Average Rating", value: "4.9/5" },
        { label: "Reviews Collected", value: "2,500+" },
      ],
      cards: [
        {
          id: "t1",
          text: "The care I received at Renova Life Care was exceptional. The doctors were knowledgeable and the staff was very supportive throughout my treatment.",
          rating: 5,
          customer_name: "Dr. Sarah Ahmed",
          designation: "Patient",
          address: "Dhanmondi, Dhaka",
          image: "/images/testimonials/01.jpg",
        },
        {
          id: "t2",
          text: "Highly recommended! The diagnostic services are top-notch and the reports were delivered quickly. Very professional team.",
          rating: 5,
          customer_name: "Mohammad Rahman",
          designation: "Regular Patient",
          address: "Gulshan, Dhaka",
          image: "/images/testimonials/02.jpg",
        },
        {
          id: "t3",
          text: "Excellent service from start to finish. The home sample collection is very convenient for elderly patients.",
          rating: 5,
          customer_name: "Fatema Begum",
          designation: "Senior Citizen",
          address: "Uttara, Dhaka",
          image: "/images/testimonials/03.jpg",
        },
        {
          id: "t4",
          text: "The most professional diagnostic center in Dhaka. Their reports are accurate and delivered on time.",
          rating: 5,
          customer_name: "Dr. Kamal Hossain",
          designation: "Healthcare Professional",
          address: "Baridhara, Dhaka",
          image: "/images/testimonials/04.jpg",
        },
        {
          id: "t5",
          text: "I have been using their services for 3 years. Consistently excellent care and support.",
          rating: 5,
          customer_name: "Rina Khan",
          designation: "Regular Patient",
          address: "Mohammadpur, Dhaka",
          image: "/images/testimonials/05.jpg",
        },
      ],
    },
    partners: {
      section_label: "Our Trusted Partners",
      heading: "Affiliations & Partnerships",
      subheading: "We collaborate with leading healthcare organizations to provide the best care possible.",
      logos: [
        { id: "p1", image: "/images/partners/01.png", alt: "Partner 1", url: "https://partner1.com" },
        { id: "p2", image: "/images/partners/02.png", alt: "Partner 2", url: "https://partner2.com" },
        { id: "p3", image: "/images/partners/03.png", alt: "Partner 3", url: "https://partner3.com" },
        { id: "p4", image: "/images/partners/04.png", alt: "Partner 4", url: "https://partner4.com" },
        { id: "p5", image: "/images/partners/05.png", alt: "Partner 5", url: "https://partner5.com" },
        { id: "p6", image: "/images/partners/06.png", alt: "Partner 6", url: "https://partner6.com" },
      ],
    },
    seo: {
      meta_title: "Renova Life Care Ltd. — Expert Healthcare, Every Step",
      meta_description: "World-class healthcare across Bangladesh. Book appointments, lab tests, specialist consultations and more at Renova Life Care.",
      og_title: "Renova Life Care Ltd.",
      og_description: "Compassionate Care, Expert Medicine.",
      og_image: "/images/og-home.jpg",
      canonical_url: "https://renovalifecare.com",
      robots: "index, follow",
      keywords: "healthcare Bangladesh, diagnostic center, lab test, specialist doctor, Renova Life Care",
    },
  },
  about: {
    "about-hero": {
      about_image: "/images/about/hero.jpg",
      section_header_title: "About Renova Life Care",
      section_header_subtitle: "Delivering compassionate, world-class medicine to the people of Bangladesh since 2010.",
      about_title: "Compassionate Care, Expert Medicine",
      about_description: "Renova Life Care Ltd. delivers world-class healthcare services across Bangladesh. From general checkups to specialized treatments, our expert doctors are here for you.",
      features: [
        { icon: "user-plus", title: "Expert Doctors", description: "BMDC-certified specialists with international training" },
        { icon: "layout", title: "Modern Facilities", description: "State-of-the-art equipment and hygienic environment" },
        { icon: "heart", title: "Patient-First Approach", description: "Compassionate care tailored to your needs" }
      ],
      stats: [
        { label: "Happy Patients", value: "15,000+" },
        { label: "Network in South Asia", value: "120+" },
        { label: "Setting new standards", value: "Excellence" }
      ]
    },
    "mission-vision": {
      mission: { title: "Our Mission", text: "To provide accessible, affordable, and high-quality healthcare to every individual in Bangladesh." },
      vision: { title: "Our Vision", text: "To be the most trusted and comprehensive healthcare network in South Asia." },
      values: { title: "Our Values", text: "Integrity, compassion, excellence, and continuous learning." }
    },
    "team": {
      section_title: "Our Leadership",
      section_subtitle: "The Team Behind Our Excellence",
      description: "Experienced leaders driving innovation, compassion, and quality across every department.",
      members: [
        { id: "md-1", name: "Dr. Homayon Kabir", role: "MANAGING DIRECTOR", specialty: "MBBS, FCPS (Medicine)", photo: "/images/team/md.jpg", quote: "At Renova Life Care, our mission has always been simple: to deliver world-class healthcare with a human touch." },
        { id: "md-2", name: "Prof. Nasrin Akter", role: "MEDICAL DIRECTOR", specialty: "MBBS, MS (Gynaecology)", photo: "/images/team/medical-director.jpg", quote: "" },
        { id: "coo-1", name: "Dr. Kamrun Nahar", role: "CHIEF OPERATIONS OFFICER", specialty: "MBA (Healthcare Management)", photo: "/images/team/coo.jpg", quote: "" },
        { id: "hod-1", name: "Dr. Shirin Sultana", role: "HEAD OF DIAGNOSTICS", specialty: "MBBS, MD (Pathology)", photo: "/images/team/hod-diagnostics.jpg", quote: "" },
        { id: "cfo-1", name: "Dr. Shehreen Amin Monami", role: "CHIEF FINANCIAL OFFICER", specialty: "CA, MBA (Finance)", photo: "/images/team/cfo.jpg", quote: "" },
        { id: "hon-1", name: "Dr. Farhana Begum", role: "HEAD OF NURSING", specialty: "BSc Nursing, MPH", photo: "/images/team/hod-nursing.jpg", quote: "" }
      ]
    },
    "stats-bar": {
      happy_patients: "15,000+",
      expert_doctors: "120+",
      departments: "35+",
      years_experience: "14"
    },
    "managing-director": {
      md_photo: "/images/team/md.jpg",
      md_name: "Dr. Homayon Kabir",
      md_role: "MANAGING DIRECTOR",
      md_specialty: "MBBS, FCPS (Medicine)",
      md_badge: "BMDC Verified",
      section_label: "MESSAGE FROM OUR MD",
      heading: "A Word From Our",
      heading_highlight: "Managing Director",
      quote: "At Renova Life Care, our mission has always been simple: to deliver world-class healthcare with a human touch. Every patient who walks through our doors deserves the best medical expertise paired with genuine compassion. We are committed to continuous growth, ethical practice, and making quality care accessible to all.",
      stats: [
        { label: "Years Leading", value: "15+" },
        { label: "Lives Touched", value: "50K+" },
        { label: "Patient Satisfaction", value: "98%" }
      ]
    },
    "company-history": {
      heading: "Our Journey",
      subheading: "A decade of compassionate care and innovation",
      milestones: [
        { year: "2010", title: "Founded", description: "Renova Life Care was established in Dhaka." },
        { year: "2015", title: "Expanded", description: "Opened 5 new branches across Bangladesh." },
        { year: "2020", title: "Digital Transformation", description: "Launched online consultation and digital reporting." },
        { year: "2024", title: "15,000+ Patients", description: "Reached a milestone of 15,000 happy patients." }
      ]
    },
    "certifications": {
      heading: "Accreditations & Certifications",
      subheading: "Recognized by leading healthcare organizations",
      items: [
        { id: "cert-1", title: "ISO 9001:2015", description: "Quality Management System", image: "/images/certs/iso.png" },
        { id: "cert-2", title: "DGDA Approved", description: "Directorate General of Drug Administration", image: "/images/certs/dgda.png" }
      ]
    },
    "seo": {
      meta_title: "About Renova Life Care — Compassionate Healthcare in Bangladesh",
      meta_description: "Learn about Renova Life Care's mission, vision, and leadership team.",
      og_title: "About Renova Life Care Ltd.",
      og_description: "Compassionate Care, Expert Medicine — Serving Bangladesh since 2010.",
      og_image: "/images/og-about.jpg",
      canonical_url: "https://renovalifecare.com/about",
      robots: "index, follow",
      keywords: "about Renova, healthcare Bangladesh"
    }
},
  doctors: {
    hero: {
      trust_badge_text: "OUR MEDICAL TEAM",
      headline: "Meet Our Specialist Doctors",
      description: "Internationally trained, BMDC-certified doctors dedicated to delivering the highest standard of patient care.",
      background_images: ["/images/sliders/01.jpg"],
      patient_images: [],
      stats: [],
    },
    "doctor-listing": {
      search_placeholder: "Search by doctor name...",
      filter_genders: ["All Genders", "Male", "Female"],
      filter_specialties_label: "All Specialties",
      filter_branches_label: "All Branches",
      filter_consultation_label: "Consultation Type",
      doctors: [
        { id: "doc1", name: "Dr. Fariha Rahman", specialty: "Cardiologist", credentials: "MBBS, MD (Cardiology), FCPS", experience: "18 Years", rating: "4.9", patients: "3,200++", available: true, photo: "/images/doctors/01.jpg" },
        { id: "doc2", name: "Dr. Tasnim Farin", specialty: "Neurologist", credentials: "MBBS, MD (Neurology), PhD", experience: "22 Years", rating: "4.8", patients: "2,800++", available: true, photo: "/images/doctors/02.jpg" },
        { id: "doc3", name: "Dr. Aysha Aktar Tripti", specialty: "Pediatrician", credentials: "MBBS, DCH, FCPS (Pediatrics)", experience: "15 Years", rating: "4.9", patients: "4,100++", available: true, photo: "/images/doctors/03.jpg" },
        { id: "doc4", name: "Dr. Humayon Kabir", specialty: "Orthopedic Surgeon", credentials: "MBBS, MS (Orthopedics), FRCS", experience: "20 Years", rating: "4.7", patients: "2,500++", available: true, photo: "/images/doctors/04.jpg" },
        { id: "doc5", name: "Dr. Nasreen Akter", specialty: "Cardiologist", credentials: "MBBS, MD (Cardiology), FCPS", experience: "18 Years", rating: "4.9", patients: "3,200++", available: true, photo: "/images/doctors/05.jpg" },
        { id: "doc6", name: "Dr. Katrina Kaif", specialty: "Neurologist", credentials: "MBBS, MD (Neurology), PhD", experience: "22 Years", rating: "4.8", patients: "2,800++", available: true, photo: "/images/doctors/06.jpg" },
        { id: "doc7", name: "Dr. Alifa Aktar", specialty: "Pediatrician", credentials: "MBBS, DCH, FCPS (Pediatrics)", experience: "15 Years", rating: "4.9", patients: "4,100++", available: true, photo: "/images/doctors/07.jpg" },
        { id: "doc8", name: "Dr. Maria Hoque", specialty: "Orthopedic Surgeon", credentials: "MBBS, MS (Orthopedics), FRCS", experience: "20 Years", rating: "4.7", patients: "2,500++", available: true, photo: "/images/doctors/08.jpg" },
      ],
    },
    "career-cta": {
      section_label: "CAREER OPPORTUNITIES",
      heading: "Are You a Medical Professional?",
      description: "We are always looking for talented, passionate doctors and healthcare workers to join our growing team. If you are dedicated to making a difference in patient lives, we want to hear from you.",
      button_text: "Apply Now",
      button_url: "/careers",
      features: [
        "Competitive salary and benefits",
        "Modern, well-equipped facilities",
        "International training opportunities",
        "Collaborative and supportive team",
      ],
      stats: [
        { label: "SPECIALISTS", value: "50+" },
        { label: "DEPARTMENTS", value: "15+" },
        { label: "BMDC CERTIFIED", value: "100%" },
      ],
    },
    seo: {
      meta_title: "Our Specialist Doctors | Renova Life Care Ltd.",
      meta_description: "Meet our team of BMDC-certified specialist doctors at Renova Life Care. Expert cardiologists, neurologists, pediatricians and more.",
      og_title: "Meet Our Specialist Doctors",
      og_description: "Internationally trained, BMDC-certified doctors dedicated to patient care.",
      og_image: "/images/og-doctors.jpg",
      canonical_url: "https://renovalifecare.com/doctors",
      robots: "index, follow",
      keywords: "specialist doctors Bangladesh, BMDC certified doctors, cardiologist Dhaka",
    },
  },
  packages: {
    hero: {
      trust_badge_text: "HEALTH PACKAGES",
      headline: "Our Health Packages & Discounts",
      description: "Comprehensive diagnostic packages for your family's well-being. All prices in BDT.",
      background_images: ["/images/sliders/01.jpg"],
      patient_images: [],
      stats: [],
    },
    "packages-listing": {
      custom_note: "Custom packages available for corporate health programs.",
      contact_link_text: "Contact us →",
      contact_link_url: "/contact",
      packages: [
        {
          id: "pkg1", name: "Package-1", badge: "SAVE 13%", type: "Essential health screening",
          items: [
            { test: "Complete Blood Count (CBC)", price: "BDT 400.00" },
            { test: "Random Blood Sugar", price: "BDT 200.00" },
            { test: "Lipid Profile (Random)", price: "BDT 1,400.00" },
            { test: "Blood Grouping & RH Factor", price: "BDT 300.00" },
            { test: "Serum Creatinine", price: "BDT 400.00" },
            { test: "HBsAg", price: "BDT 1,000.00" },
            { test: "Urine R/E", price: "BDT 400.00" },
            { test: "ECG", price: "BDT 400.00" },
            { test: "Digital X-Ray of Chest P/A View (Digital)", price: "BDT 600.00" },
            { test: "Ultrasonography of Whole Abdomen", price: "BDT 2,500.00" },
            { test: "Needle, Tube & Reg. Charges", price: "BDT 110.00" },
          ],
          total_cost: "BDT 7,710.00", discounted_price: "BDT 5,900.00",
        },
        {
          id: "pkg2", name: "Package-2", badge: "SAVE 24%", type: "Comprehensive wellness check",
          items: [
            { test: "Complete Blood Count (CBC)", price: "BDT 400.00" },
            { test: "Blood Sugar (Fasting & 2 hrs ABF)", price: "BDT 400.00" },
            { test: "HbA1c", price: "BDT 1,400.00" },
            { test: "Lipid Profile (Fasting)", price: "BDT 1,400.00" },
            { test: "Liver Function Test", price: "BDT 1,000.00" },
            { test: "Serum Creatinine", price: "BDT 400.00" },
            { test: "Serum Uric Acid", price: "BDT 600.00" },
            { test: "Serum Electrolytes", price: "BDT 1,000.00" },
            { test: "HBsAg", price: "BDT 1,000.00" },
            { test: "PSA", price: "BDT 1,400.00" },
            { test: "Urine R/E", price: "BDT 400.00" },
            { test: "ECG", price: "BDT 400.00" },
            { test: "Digital X-Ray of Chest P/A View (Digital)", price: "BDT 600.00" },
            { test: "Ultrasonography of Whole Abdomen", price: "BDT 2,500.00" },
            { test: "Needle, Tube & Reg. Charges", price: "BDT 130.00" },
          ],
          total_cost: "BDT 14,030.00", discounted_price: "BDT 10,650.00",
        },
        {
          id: "pkg3", name: "Package-3", badge: "SAVE 23%", type: "Advanced full-body package",
          items: [
            { test: "Complete Blood Count (CBC)", price: "BDT 400.00" },
            { test: "Blood Sugar (Fasting & 2 hrs ABF)", price: "BDT 400.00" },
            { test: "HbA1c", price: "BDT 1,400.00" },
            { test: "Lipid Profile (Fasting)", price: "BDT 1,400.00" },
            { test: "Liver Function Test", price: "BDT 1,000.00" },
            { test: "Serum Creatinine", price: "BDT 400.00" },
            { test: "Serum Uric Acid", price: "BDT 600.00" },
            { test: "Serum Electrolytes", price: "BDT 1,000.00" },
            { test: "TSH", price: "BDT 1,000.00" },
            { test: "HBsAg", price: "BDT 1,000.00" },
            { test: "Pap Smear", price: "BDT 1,200.00" },
            { test: "Urine R/E", price: "BDT 400.00" },
            { test: "ECG", price: "BDT 400.00" },
            { test: "Digital X-Ray of Chest P/A View (Digital)", price: "BDT 600.00" },
            { test: "Mammography of Both Breast", price: "BDT 3,000.00" },
            { test: "Ultrasonography of Whole Abdomen", price: "BDT 2,500.00" },
            { test: "Needle, Tube & Reg. Charges", price: "BDT 230.00" },
          ],
          total_cost: "BDT 16,930.00", discounted_price: "BDT 12,850.00",
        },
        {
          id: "pkg4", name: "Package-4", badge: "SAVE 13%", type: "Essential health screening",
          items: [
            { test: "Complete Blood Count (CBC)", price: "BDT 400.00" },
            { test: "Random Blood Sugar", price: "BDT 200.00" },
            { test: "Lipid Profile (Random)", price: "BDT 1,400.00" },
            { test: "Blood Grouping & RH Factor", price: "BDT 300.00" },
            { test: "Serum Creatinine", price: "BDT 400.00" },
            { test: "HBsAg", price: "BDT 1,000.00" },
            { test: "Urine R/E", price: "BDT 400.00" },
            { test: "ECG", price: "BDT 400.00" },
            { test: "Digital X-Ray of Chest P/A View (Digital)", price: "BDT 600.00" },
            { test: "Ultrasonography of Whole Abdomen", price: "BDT 2,500.00" },
            { test: "Needle, Tube & Reg. Charges", price: "BDT 110.00" },
          ],
          total_cost: "BDT 7,710.00", discounted_price: "BDT 5,900.00",
        },
        {
          id: "pkg5", name: "Package-5", badge: "SAVE 24%", type: "Comprehensive wellness check",
          items: [
            { test: "Complete Blood Count (CBC)", price: "BDT 400.00" },
            { test: "Blood Sugar (Fasting & 2 hrs ABF)", price: "BDT 400.00" },
            { test: "HbA1c", price: "BDT 1,400.00" },
            { test: "Lipid Profile (Fasting)", price: "BDT 1,400.00" },
            { test: "Liver Function Test", price: "BDT 1,000.00" },
            { test: "Serum Creatinine", price: "BDT 400.00" },
            { test: "Serum Uric Acid", price: "BDT 600.00" },
            { test: "Serum Electrolytes", price: "BDT 1,000.00" },
            { test: "TSH", price: "BDT 1,000.00" },
            { test: "HBsAg", price: "BDT 1,000.00" },
            { test: "PSA", price: "BDT 1,400.00" },
            { test: "Urine R/E", price: "BDT 400.00" },
            { test: "ECG", price: "BDT 400.00" },
            { test: "Digital X-Ray of Chest P/A View (Digital)", price: "BDT 600.00" },
            { test: "Ultrasonography of Whole Abdomen", price: "BDT 2,500.00" },
            { test: "Needle, Tube & Reg. Charges", price: "BDT 130.00" },
          ],
          total_cost: "BDT 14,030.00", discounted_price: "BDT 10,650.00",
        },
        {
          id: "pkg6", name: "Package-6", badge: "SAVE 23%", type: "Advanced full-body package",
          items: [
            { test: "Complete Blood Count (CBC)", price: "BDT 400.00" },
            { test: "Blood Sugar (Fasting & 2 hrs ABF)", price: "BDT 400.00" },
            { test: "HbA1c", price: "BDT 1,400.00" },
            { test: "Lipid Profile (Fasting)", price: "BDT 1,400.00" },
            { test: "Liver Function Test", price: "BDT 1,000.00" },
            { test: "Serum Creatinine", price: "BDT 400.00" },
            { test: "Serum Uric Acid", price: "BDT 600.00" },
            { test: "Serum Electrolytes", price: "BDT 1,000.00" },
            { test: "TSH", price: "BDT 1,000.00" },
            { test: "HBsAg", price: "BDT 1,000.00" },
            { test: "Pap Smear", price: "BDT 1,200.00" },
            { test: "Urine R/E", price: "BDT 400.00" },
            { test: "ECG", price: "BDT 400.00" },
            { test: "Digital X-Ray of Chest P/A View (Digital)", price: "BDT 600.00" },
            { test: "Mammography of Both Breast", price: "BDT 3,000.00" },
            { test: "Ultrasonography of Whole Abdomen", price: "BDT 2,500.00" },
            { test: "Needle, Tube & Reg. Charges", price: "BDT 230.00" },
          ],
          total_cost: "BDT 16,990.00", discounted_price: "BDT 12,850.00",
        },
        {
          id: "pkg7", name: "Package-7", badge: "SAVE 13%", type: "Essential health screening",
          items: [
            { test: "Complete Blood Count (CBC)", price: "BDT 400.00" },
            { test: "Random Blood Sugar", price: "BDT 200.00" },
            { test: "Lipid Profile (Random)", price: "BDT 1,400.00" },
            { test: "Blood Grouping & RH Factor", price: "BDT 300.00" },
            { test: "Serum Creatinine", price: "BDT 400.00" },
            { test: "HBsAg", price: "BDT 1,000.00" },
            { test: "Urine R/E", price: "BDT 400.00" },
            { test: "ECG", price: "BDT 400.00" },
            { test: "Digital X-Ray of Chest P/A View (Digital)", price: "BDT 600.00" },
            { test: "Ultrasonography of Whole Abdomen", price: "BDT 2,500.00" },
            { test: "Needle, Tube & Reg. Charges", price: "BDT 110.00" },
          ],
          total_cost: "BDT 7,710.00", discounted_price: "BDT 5,900.00",
        },
        {
          id: "pkg8", name: "Package-8", badge: "SAVE 24%", type: "Comprehensive wellness check",
          items: [
            { test: "Complete Blood Count (CBC)", price: "BDT 400.00" },
            { test: "Blood Sugar (Fasting & 2 hrs ABF)", price: "BDT 400.00" },
            { test: "HbA1c", price: "BDT 1,400.00" },
            { test: "Lipid Profile (Fasting)", price: "BDT 1,400.00" },
            { test: "Liver Function Test", price: "BDT 1,000.00" },
            { test: "Serum Creatinine", price: "BDT 400.00" },
            { test: "Serum Uric Acid", price: "BDT 600.00" },
            { test: "Serum Electrolytes", price: "BDT 1,000.00" },
            { test: "TSH", price: "BDT 1,000.00" },
            { test: "HBsAg", price: "BDT 1,000.00" },
            { test: "PSA", price: "BDT 1,400.00" },
            { test: "Urine R/E", price: "BDT 400.00" },
            { test: "ECG", price: "BDT 400.00" },
            { test: "Digital X-Ray of Chest P/A View (Digital)", price: "BDT 600.00" },
            { test: "Ultrasonography of Whole Abdomen", price: "BDT 2,500.00" },
            { test: "Needle, Tube & Reg. Charges", price: "BDT 130.00" },
          ],
          total_cost: "BDT 14,030.00", discounted_price: "BDT 10,650.00",
        },
      ],
    },
    seo: {
      meta_title: "Health Packages & Discounts | Renova Life Care Ltd.",
      meta_description: "Comprehensive diagnostic packages for your family's well-being. All prices in BDT. View our health checkup packages.",
      og_title: "Our Health Packages & Discounts",
      og_description: "Comprehensive diagnostic packages for your family's well-being.",
      og_image: "/images/og-packages.jpg",
      canonical_url: "https://renovalifecare.com/packages",
      robots: "index, follow",
      keywords: "health packages Bangladesh, diagnostic packages, health checkup BDT",
    },
  },
  photos: {
    hero: {
      trust_badge_text: "PHOTO GALLERY",
      headline: "Explore Our Medical Facilities",
      description: "A visual journey through our state-of-the-art healthcare center, expert medical team, and commitment to patient care.",
      background_images: ["/images/sliders/01.jpg"],
      patient_images: [],
      stats: [],
    },
    "photo-gallery": {
      categories: [
        { id: "all", label: "All Photos", count: 26 },
        { id: "facilities", label: "Facilities", count: 8 },
        { id: "doctors", label: "Doctors", count: 6 },
        { id: "equipment", label: "Equipment", count: 7 },
        { id: "events", label: "Events", count: 5 },
      ],
      photos: [
        { id: "ph1", image: "/images/gallery/01.jpg", category: "doctors", alt: "Doctor 1" },
        { id: "ph2", image: "/images/gallery/02.jpg", category: "doctors", alt: "Doctor 2" },
        { id: "ph3", image: "/images/gallery/03.jpg", category: "doctors", alt: "Doctor 3" },
        { id: "ph4", image: "/images/gallery/04.jpg", category: "doctors", alt: "Doctor 4" },
        { id: "ph5", image: "/images/gallery/05.jpg", category: "facilities", alt: "Facility 1" },
        { id: "ph6", image: "/images/gallery/06.jpg", category: "facilities", alt: "Facility 2" },
      ],
      cta_heading: "Want to see more?",
      cta_description: "Visit our facility or schedule a virtual tour to experience our healthcare excellence firsthand.",
      cta_primary_btn: "Book a Visit",
      cta_primary_url: "/contact",
      cta_secondary_btn: "Contact Us",
      cta_secondary_url: "/contact",
    },
    seo: {
      meta_title: "Photo Gallery — Medical Facilities | Renova Life Care",
      meta_description: "Explore our state-of-the-art medical facilities through our photo gallery.",
      og_title: "Photo Gallery | Renova Life Care",
      og_description: "A visual journey through our healthcare center.",
      og_image: "/images/og-gallery.jpg",
      canonical_url: "https://renovalifecare.com/photos",
      robots: "index, follow",
      keywords: "Renova Life Care gallery, medical facilities photos",
    },
  },
  videos: {
    hero: {
      trust_badge_text: "VIDEO LIBRARY",
      headline: "Watch & Learn: Medical Videos",
      description: "Expert insights, patient stories, and health education — all in one place. Empowering you with knowledge for better health decisions.",
      background_images: ["/images/sliders/01.jpg"],
      patient_images: [],
      stats: [],
    },
    "video-gallery": {
      categories: [
        { id: "all", label: "All Videos", count: 12 },
        { id: "procedures", label: "Procedures", count: 3 },
        { id: "testimonials", label: "Testimonials", count: 3 },
        { id: "health-education", label: "Health Education", count: 4 },
        { id: "events", label: "Events", count: 2 },
      ],
      videos: [
        { id: "v1", title: "Understanding Cardiac Catheterization", description: "Dr. Rahman explains this minimally invasive heart procedure step-by-step.", thumbnail: "/images/videos/01.jpg", doctor: "Dr. Fatima Rahman", views: "12.5K views", date: "Mar 15, 2024", duration: "", category: "procedures" },
        { id: "v2", title: "Patient Success: Recovery Journey", description: "Mohammed shares his experience with our orthopedic care team.", thumbnail: "/images/videos/02.jpg", doctor: "Mohammed Ahmed", views: "8.2K views", date: "Mar 10, 2024", duration: "", category: "testimonials" },
        { id: "v3", title: "Diabetes Management Tips", description: "Essential lifestyle changes for better blood sugar control.", thumbnail: "/images/videos/03.jpg", doctor: "Dr. Ayesha Khan", views: "25.3K views", date: "Mar 5, 2024", duration: "", category: "health-education" },
        { id: "v4", title: "Laparoscopic Surgery Explained", description: "How minimally invasive surgery reduces recovery time.", thumbnail: "/images/videos/04.jpg", doctor: "Dr. Kamal Uddin", views: "18.7K views", date: "Feb 28, 2024", duration: "", category: "procedures" },
        { id: "v5", title: "Annual Health Camp Highlights", description: "Free screenings and consultations for our community.", thumbnail: "/images/videos/05.jpg", doctor: "", views: "5.3K views", date: "Feb 20, 2024", duration: "6:40", category: "events" },
        { id: "v6", title: "Understanding Hypertension", description: "Causes, symptoms, and prevention strategies overview.", thumbnail: "/images/videos/06.jpg", doctor: "Dr. Nusrat Jahan", views: "31.2K views", date: "Feb 11, 2024", duration: "9:55", category: "health-education" },
        { id: "v7", title: "Maternity Care Experience", description: "A new mother shares her journey with our OB-GYN team.", thumbnail: "/images/videos/07.jpg", doctor: "Sadia Islam", views: "9.8K views", date: "Feb 10, 2024", duration: "7:10", category: "testimonials" },
        { id: "v8", title: "Endoscopy: What to Expect", description: "Preparation, procedure, and aftercare guidance.", thumbnail: "/images/videos/08.jpg", doctor: "Dr. Tahmid Hassan", views: "14.6K views", date: "Feb 5, 2024", duration: "11:20", category: "procedures" },
      ],
    },
    seo: {
      meta_title: "Medical Videos — Watch & Learn | Renova Life Care",
      meta_description: "Watch expert medical videos, patient stories, and health education content from Renova Life Care.",
      og_title: "Medical Video Library | Renova Life Care",
      og_description: "Expert insights, patient stories, and health education videos.",
      og_image: "/images/og-videos.jpg",
      canonical_url: "https://renovalifecare.com/videos",
      robots: "index, follow",
      keywords: "medical videos Bangladesh, health education, patient stories Renova",
    },
  },
};

/* ══════════════════════════════════════════════════════════════
   ICONS


   ══════════════════════════════════════════════════════════════ */
const Icon = ({ name, size = 14, className = "" }) => {
  const paths = {
    home: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>,
    info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    services: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>,
    doctors: <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>,
    package: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>,
    shop: <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></>,
    blog: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    contact: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    layout: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>,
    grid: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    "shopping-bag": <><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></>,
    "message-circle": <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></>,
    "file-text": <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    award: <><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></>,
    list: <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>,
    tag: <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>,
    "map-pin": <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    chevron: <polyline points="9 18 15 12 9 6"/>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    save: <><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    trash: <><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></>,
    upload: <><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></>,
    refresh: <><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></>,
    external: <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>,
    check: <polyline points="20 6 9 17 4 12"/>,
    drag: <><line x1="9" y1="5" x2="9" y2="19"/><line x1="15" y1="5" x2="15" y2="19"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></>,
    "user-plus": <><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></>,
    heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>,
    target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

/* ══════════════════════════════════════════════════════════════
   FIELD COMPONENTS
   ══════════════════════════════════════════════════════════════ */
const RichEditor = ({ value, onChange, minHeight = 120 }) => (
  <div>
    <div className="wc-rich-toolbar">
      {[
        { label: "B", style: "bold" }, { label: "I", style: "italic" }, { label: "U", style: "underline" },
      ].map(({ label, style }) => (
        <button key={style} className="wc-rich-btn" onMouseDown={e => { e.preventDefault(); document.execCommand(style); }}
          style={{ fontStyle: style === "italic" ? "italic" : "normal", fontWeight: style === "bold" ? "800" : "400", textDecoration: style === "underline" ? "underline" : "none" }}>
          {label}
        </button>
      ))}
      <div className="wc-rich-divider" />
      <button className="wc-rich-btn"><Icon name="link" size={13} /></button>
      <button className="wc-rich-btn"><Icon name="image" size={13} /></button>
    </div>
    <div
      className="wc-rich-content"
      contentEditable
      suppressContentEditableWarning
      style={{ minHeight }}
      onInput={e => onChange && onChange(e.currentTarget.innerHTML)}
      dangerouslySetInnerHTML={{ __html: value || "" }}
    />
  </div>
);

const ImageUploadField = ({ label, hint, value, onChange, multiple = false, onFileSelect }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      if (onFileSelect) {
        onFileSelect(files);
      } else if (!multiple) {
        const url = URL.createObjectURL(files[0]);
        onChange?.(url);
      } else {
        const urls = files.map(f => URL.createObjectURL(f));
        onChange?.(urls);
      }
    }
    e.target.value = "";
  };

  return (
    <div className="wc-field">
      <label className="wc-field-label">{label}</label>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {value ? (
        Array.isArray(value) && value.length > 0 ? (
          <div className="wc-image-preview-grid">
            {value.map((img, idx) => (
              <div key={idx} className="wc-image-preview">
                <img src={img} alt={`preview-${idx}`} />
                <div className="wc-image-preview-actions">
                  <button className="wc-img-action-btn" onClick={() => {
                    const newArr = [...value];
                    newArr.splice(idx, 1);
                    onChange?.(newArr);
                  }} title="Remove">
                    <Icon name="trash" size={13} />
                  </button>
                </div>
              </div>
            ))}
            <div className="wc-image-upload wc-add-more" onClick={handleClick}>
              <Icon name="plus" size={24} />
            </div>
          </div>
        ) : (
          <div className="wc-image-preview">
            <img src={value} alt="preview" />
            <div className="wc-image-preview-actions">
              <button className="wc-img-action-btn" onClick={() => onChange?.("")} title="Remove">
                <Icon name="trash" size={13} />
              </button>
              <button className="wc-img-action-btn" onClick={handleClick} title="Replace">
                <Icon name="upload" size={13} />
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="wc-image-upload" onClick={handleClick}>
          <div className="wc-image-upload-icon"><Icon name="upload" size={20} /></div>
          <p>Click to browse from desktop</p>
          <span>PNG, JPG, WEBP up to 5MB {multiple ? "(multiple allowed)" : ""}</span>
        </div>
      )}
      {hint && <span className="wc-field-hint">{hint}</span>}
    </div>
  );
};

const Repeater = ({ label, hint, items = [], onChange, renderItem, onAdd, className = "" }) => {
  const add = () => {
    if (onAdd) {
      onChange([...items, onAdd()]);
    } else {
      onChange([...items, ""]);
    }
  };
  const remove = i => onChange(items.filter((_, idx) => idx !== i));
  const update = (i, v) => { const n = [...items]; n[i] = v; onChange(n); };
  
  return (
    <div className="wc-field">
      <label className="wc-field-label">{label}</label>
      <div className={`wc-repeater ${className}`}>
        {items.map((item, i) => (
          <div key={item?.id || i} className="wc-repeater-item">
            {renderItem ? renderItem(item, i, update, remove) : (
              <>
                <input value={item} onChange={e => update(i, e.target.value)} placeholder={`Item ${i + 1}`} />
                <button className="wc-repeater-remove" onClick={() => remove(i)}>
                  <Icon name="x" size={13} />
                </button>
              </>
            )}
          </div>
        ))}
        <button className="wc-repeater-add" onClick={add}>
          <Icon name="plus" size={14} /> Add Item
        </button>
      </div>
      {hint && <span className="wc-field-hint">{hint}</span>}
    </div>
  );
};

const ToggleSwitch = ({ label, desc, checked, onChange }) => (
  <div className="wc-toggle-row">
    <div className="wc-toggle-info">
      <h4>{label}</h4>
      {desc && <p>{desc}</p>}
    </div>
    <label className="wc-switch">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <span className="wc-switch-slider" />
    </label>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   HERO SECTION EDITOR
   ══════════════════════════════════════════════════════════════ */
const HeroEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });
  const [titleLen, setTitleLen] = useState((data?.headline || "").length);
  const [descLen, setDescLen] = useState((data?.description || "").length);

  const handleBgImagesChange = (files) => {
    const urls = files.map(f => URL.createObjectURL(f));
    set("background_images", [...(data?.background_images || []), ...urls]);
  };

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="layout" size={15} /> Hero Content <span className="wc-editor-card-desc">— Main banner section</span></h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Trust Badge Text <span className="wc-field-hint">— Small label above headline</span></label>
              <input className="wc-input" value={data?.trust_badge_text || ""} onChange={e => set("trust_badge_text", e.target.value)} placeholder="Your Health, Our Priority" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">
                Main Headline <span className="required">*</span>
                <span className={`wc-field-counter ${titleLen > 80 ? "warn" : ""} ${titleLen > 100 ? "danger" : ""}`}>{titleLen}/100</span>
              </label>
              <textarea className="wc-textarea" value={data?.headline || ""} onChange={e => { set("headline", e.target.value); setTitleLen(e.target.value.length); }} rows={2} placeholder="Your Health, Our Priority — Expert Care, Every Step" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">
                Description
                <span className={`wc-field-counter ${descLen > 180 ? "warn" : ""}`}>{descLen}/200</span>
              </label>
              <textarea className="wc-textarea" value={data?.description || ""} onChange={e => { set("description", e.target.value); setDescLen(e.target.value.length); }} rows={3} placeholder="Supporting text below headline..." />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="image" size={15} /> Background Images</h3>
        </div>
        <div className="wc-editor-card-body">
          <ImageUploadField 
            label="Hero Background Images" 
            hint="Recommended: 1920×800px, max 5MB each. Multiple images for slider/carousel."
            value={data?.background_images || []}
            multiple={true}
            onFileSelect={handleBgImagesChange}
            onChange={(urls) => set("background_images", urls)}
          />
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="users" size={15} /> Patient Trust Images</h3>
        </div>
        <div className="wc-editor-card-body">
          <Repeater 
            label="Patient/Customer Photos" 
            hint="Add up to 5 patient images (recommended: 80×80px circular)"
            items={data?.patient_images || []} 
            onChange={v => set("patient_images", v)}
            className="wc-repeater-patient"
            renderItem={(item, i, update, remove) => (
              <>
                <ImageUploadField 
                  label="" 
                  value={item} 
                  onChange={v => update(i, v)}
                  hint=""
                />
                <button className="wc-repeater-remove" onClick={() => remove(i)} style={{ marginTop: 8 }}>
                  <Icon name="x" size={13} /> Remove
                </button>
              </>
            )}
          />
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="list" size={15} /> Stats Counter Strip</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-stat-inputs">
            {(data?.stats || []).map((stat, i) => (
              <div key={i} className="wc-stat-input-item">
                <label>{stat.label}</label>
                <input value={stat.value} onChange={e => {
                  const s = [...(data.stats || [])];
                  s[i] = { ...s[i], value: e.target.value };
                  set("stats", s);
                }} placeholder="15,000+" />
                <div className="wc-stat-sub">
                  <input value={stat.label} onChange={e => {
                    const s = [...(data.stats || [])];
                    s[i] = { ...s[i], label: e.target.value };
                    set("stats", s);
                  }} placeholder="Label" style={{ width: "100%", border: "none", background: "transparent", fontSize: 11, color: "#94a3b8", outline: "none", fontFamily: "inherit" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   APPOINTMENT CTA EDITOR
   ══════════════════════════════════════════════════════════════ */
const AppointmentCTAEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });
  
  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="calendar" size={15} /> Appointment CTA Content</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Heading <span className="required">*</span></label>
              <input className="wc-input" value={data?.heading || ""} onChange={e => set("heading", e.target.value)} placeholder="Your Health Deserves Expert Care, Right Now." />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Sub Heading</label>
              <textarea className="wc-textarea" value={data?.subheading || ""} onChange={e => set("subheading", e.target.value)} rows={2} placeholder="Supporting description..." />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="list" size={15} /> Trust Stats</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-stat-inputs">
            {(data?.stats || []).map((stat, i) => (
              <div key={i} className="wc-stat-input-item">
                <label>{stat.label}</label>
                <input value={stat.value} onChange={e => {
                  const s = [...(data.stats || [])];
                  s[i] = { ...s[i], value: e.target.value };
                  set("stats", s);
                }} placeholder="50K+" />
                <div className="wc-stat-sub">
                  <input value={stat.label} onChange={e => {
                    const s = [...(data.stats || [])];
                    s[i] = { ...s[i], label: e.target.value };
                    set("stats", s);
                  }} placeholder="Label" style={{ width: "100%", border: "none", background: "transparent", fontSize: 11, color: "#94a3b8", outline: "none", fontFamily: "inherit" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   TESTIMONIALS EDITOR
   ══════════════════════════════════════════════════════════════ */
const TestimonialsEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });
  
  const addTestimonial = () => ({
    id: `t${Date.now()}`,
    text: "",
    rating: 5,
    customer_name: "",
    designation: "",
    address: "",
    image: "/images/testimonials/01.jpg",
  });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="message-circle" size={15} /> Testimonials Section</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field">
              <label className="wc-field-label">Section Label</label>
              <input className="wc-input" value={data?.section_label || ""} onChange={e => set("section_label", e.target.value)} placeholder="Testimonials" />
            </div>
            <div className="wc-field">
              <ToggleSwitch label="Show Ratings" checked={data?.show_rating} onChange={v => set("show_rating", v)} />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Heading <span className="required">*</span></label>
              <input className="wc-input" value={data?.heading || ""} onChange={e => set("heading", e.target.value)} placeholder="Real Patients, Real Transformations" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Sub Heading</label>
              <textarea className="wc-textarea" value={data?.subheading || ""} onChange={e => set("subheading", e.target.value)} rows={2} placeholder="Supporting description..." />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="list" size={15} /> Satisfaction Stats</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-stat-inputs">
            {(data?.stats || []).map((stat, i) => (
              <div key={i} className="wc-stat-input-item">
                <label>{stat.label}</label>
                <input value={stat.value} onChange={e => {
                  const s = [...(data.stats || [])];
                  s[i] = { ...s[i], value: e.target.value };
                  set("stats", s);
                }} placeholder="98%" />
                <div className="wc-stat-sub">
                  <input value={stat.label} onChange={e => {
                    const s = [...(data.stats || [])];
                    s[i] = { ...s[i], label: e.target.value };
                    set("stats", s);
                  }} placeholder="Label" style={{ width: "100%", border: "none", background: "transparent", fontSize: 11, color: "#94a3b8", outline: "none", fontFamily: "inherit" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="users" size={15} /> Testimonial Cards</h3>
        </div>
        <div className="wc-editor-card-body">
          <Repeater
            label="Customer Testimonials"
            hint="Add patient reviews with ratings and details"
            items={data?.cards || []}
            onChange={v => set("cards", v)}
            onAdd={addTestimonial}
            className="wc-repeater-testimonials"
            renderItem={(card, i, update, remove) => (
              <div className="wc-testimonial-card">
                <div className="wc-testimonial-card-header">
                  <div className="wc-testimonial-avatar">
                    {card.image ? (
                      <img src={card.image} alt={card.customer_name} />
                    ) : (
                      <Icon name="user" size={24} />
                    )}
                  </div>
                  <div className="wc-testimonial-info">
                    <input 
                      className="wc-input wc-testimonial-name" 
                      value={card.customer_name} 
                      onChange={e => update(i, { ...card, customer_name: e.target.value })} 
                      placeholder="Customer Name"
                    />
                    <input 
                      className="wc-input wc-testimonial-designation" 
                      value={card.designation} 
                      onChange={e => update(i, { ...card, designation: e.target.value })} 
                      placeholder="Designation"
                    />
                    <input 
                      className="wc-input wc-testimonial-address" 
                      value={card.address} 
                      onChange={e => update(i, { ...card, address: e.target.value })} 
                      placeholder="Address"
                    />
                  </div>
                  <button className="wc-testimonial-remove" onClick={() => remove(i)}>
                    <Icon name="trash" size={14} />
                  </button>
                </div>
                <div className="wc-testimonial-card-body">
                  <div className="wc-testimonial-rating">
                    {[1,2,3,4,5].map(n => (
                      <button
                        key={n}
                        className={`wc-star-btn ${n <= card.rating ? 'active' : ''}`}
                        onClick={() => update(i, { ...card, rating: n })}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <textarea 
                    className="wc-textarea wc-testimonial-text" 
                    value={card.text} 
                    onChange={e => update(i, { ...card, text: e.target.value })} 
                    placeholder="Write customer testimonial here..."
                    rows={4}
                  />
                </div>
                <div className="wc-testimonial-card-footer">
                  <ImageUploadField 
                    label=""
                    value={card.image}
                    onChange={v => update(i, { ...card, image: v })}
                    hint=""
                  />
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   PARTNERS EDITOR
   ══════════════════════════════════════════════════════════════ */
const PartnersEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });
  
  const addPartner = () => ({
    id: `p${Date.now()}`,
    image: "/images/partners/01.png",
    alt: "Partner Logo",
    url: "",
  });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="award" size={15} /> Partners Section</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field">
              <label className="wc-field-label">Section Label</label>
              <input className="wc-input" value={data?.section_label || ""} onChange={e => set("section_label", e.target.value)} placeholder="Our Trusted Partners" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Heading <span className="required">*</span></label>
              <input className="wc-input" value={data?.heading || ""} onChange={e => set("heading", e.target.value)} placeholder="Affiliations & Partnerships" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Sub Heading</label>
              <textarea className="wc-textarea" value={data?.subheading || ""} onChange={e => set("subheading", e.target.value)} rows={2} placeholder="Supporting description..." />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="grid" size={15} /> Partner Logos</h3>
        </div>
        <div className="wc-editor-card-body">
          <Repeater
            label="Partner Logos"
            hint="Add partner/affiliation logos (recommended: 200×80px transparent PNG)"
            items={data?.logos || []}
            onChange={v => set("logos", v)}
            onAdd={addPartner}
            className="wc-repeater-partners"
            renderItem={(logo, i, update, remove) => (
              <>
                <ImageUploadField 
                  label=""
                  value={logo.image}
                  onChange={v => update(i, { ...logo, image: v })}
                  hint=""
                />
                <button className="wc-repeater-remove" onClick={() => remove(i)}>
                  <Icon name="x" size={13} /> Remove
                </button>
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   SEO EDITOR
   ══════════════════════════════════════════════════════════════ */
const SeoEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });
  const titleLen = (data?.meta_title || "").length;
  const descLen = (data?.meta_description || "").length;
  return (
    <div>
      <div className="wc-seo-preview">
        <div className="wc-seo-preview-label">Google Search Preview</div>
        <div className="wc-seo-preview-url">{data?.canonical_url || "https://renovalifecare.com"}</div>
        <div className="wc-seo-preview-title">{data?.meta_title || "Page Title — Renova Life Care"}</div>
        <p className="wc-seo-preview-desc">{data?.meta_description || "Meta description will appear here in search results."}</p>
      </div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="search" size={15} /> Meta Tags</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">
                Meta Title <span className="required">*</span>
                <span className={`wc-field-counter ${titleLen > 60 ? "warn" : ""} ${titleLen > 70 ? "danger" : ""}`}>{titleLen}/70</span>
              </label>
              <input className="wc-input" value={data?.meta_title || ""} onChange={e => set("meta_title", e.target.value)} placeholder="Page Title — Site Name" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">
                Meta Description
                <span className={`wc-field-counter ${descLen > 155 ? "warn" : ""} ${descLen > 170 ? "danger" : ""}`}>{descLen}/170</span>
              </label>
              <textarea className="wc-textarea" value={data?.meta_description || ""} onChange={e => set("meta_description", e.target.value)} rows={3} placeholder="A concise description for search engines..." />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Keywords</label>
              <input className="wc-input" value={data?.keywords || ""} onChange={e => set("keywords", e.target.value)} placeholder="keyword1, keyword2, keyword3" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Canonical URL</label>
              <input className="wc-input" value={data?.canonical_url || ""} onChange={e => set("canonical_url", e.target.value)} placeholder="https://renovalifecare.com" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Robots</label>
              <select className="wc-select" value={data?.robots || "index, follow"} onChange={e => set("robots", e.target.value)}>
                <option value="index, follow">index, follow</option>
                <option value="noindex, follow">noindex, follow</option>
                <option value="index, nofollow">index, nofollow</option>
                <option value="noindex, nofollow">noindex, nofollow</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="external" size={15} /> Open Graph (Social Sharing)</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">OG Title</label>
              <input className="wc-input" value={data?.og_title || ""} onChange={e => set("og_title", e.target.value)} placeholder="Title shown when sharing on Facebook, WhatsApp..." />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">OG Description</label>
              <textarea className="wc-textarea" value={data?.og_description || ""} onChange={e => set("og_description", e.target.value)} rows={2} />
            </div>
            <div className="wc-field span-2">
              <ImageUploadField label="OG Image" hint="Recommended: 1200×630px. Shown on social media previews." value={data?.og_image} onChange={v => set("og_image", v)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   ADD PAGE MODAL COMPONENT
   ══════════════════════════════════════════════════════════════ */
const AddPageModal = ({ isOpen, onClose, onAdd, parentPageId }) => {
  const [pageLabel, setPageLabel] = useState("");
  const [pageId, setPageId] = useState("");
  const [pageHref, setPageHref] = useState("");
  const [error, setError] = useState("");

  const handleLabelChange = (label) => {
    setPageLabel(label);
    const generatedId = label
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    setPageId(`${parentPageId}-${generatedId}`);
    setPageHref(`/${parentPageId}/${generatedId}`);
    setError("");
  };

  const handleSubmit = () => {
    if (!pageLabel.trim()) {
      setError("Page label is required");
      return;
    }
    if (!pageId.trim()) {
      setError("Page ID is required");
      return;
    }
    
    onAdd({
      id: pageId,
      label: pageLabel,
      href: pageHref,
    });
    
    setPageLabel("");
    setPageId("");
    setPageHref("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="wc-modal-overlay" onClick={onClose}>
      <div className="wc-modal" onClick={(e) => e.stopPropagation()}>
        <div className="wc-modal-header">
          <h3>Add New Service Page</h3>
          <button className="wc-modal-close" onClick={onClose}>
            <Icon name="x" size={18} />
          </button>
        </div>
        <div className="wc-modal-body">
          <div className="wc-field">
            <label className="wc-field-label">Page Label <span className="required">*</span></label>
            <input
              className="wc-input"
              value={pageLabel}
              onChange={(e) => handleLabelChange(e.target.value)}
              placeholder="e.g., CT Scan Services"
              autoFocus
            />
            <span className="wc-field-hint">This will be displayed in the menu</span>
          </div>
          <div className="wc-field">
            <label className="wc-field-label">Page ID (Auto-generated)</label>
            <input
              className="wc-input"
              value={pageId}
              readOnly
              style={{ background: "#f1f5f9", cursor: "not-allowed" }}
            />
            <span className="wc-field-hint">Unique identifier for the page</span>
          </div>
          <div className="wc-field">
            <label className="wc-field-label">URL Path (Auto-generated)</label>
            <input
              className="wc-input"
              value={pageHref}
              readOnly
              style={{ background: "#f1f5f9", cursor: "not-allowed" }}
            />
            <span className="wc-field-hint">The page will be accessible at this URL</span>
          </div>
          {error && <div className="wc-modal-error">{error}</div>}
        </div>
        <div className="wc-modal-footer">
          <button className="wc-btn wc-btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="wc-btn wc-btn-primary" onClick={handleSubmit}>
            <Icon name="plus" size={14} /> Add Page
          </button>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   ABOUT HERO EDITOR
   ══════════════════════════════════════════════════════════════ */
const AboutHeroEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });
  const addFeature = () => ({ icon: "heart", title: "New Feature", description: "Feature description" });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="layout" size={15} /> Hero Section Header</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Header Title</label>
              <input className="wc-input" value={data?.section_header_title || ""} onChange={e => set("section_header_title", e.target.value)} placeholder="About Renova Life Care" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Header Subtitle</label>
              <textarea className="wc-textarea" value={data?.section_header_subtitle || ""} onChange={e => set("section_header_subtitle", e.target.value)} rows={2} placeholder="Delivering compassionate, world-class medicine..." />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="image" size={15} /> About Section Image</h3>
        </div>
        <div className="wc-editor-card-body">
          <ImageUploadField
            label="About Hero Image"
            hint="Recommended: 600×500px. The main image shown on the left side of the about section."
            value={data?.about_image || ""}
            onChange={v => set("about_image", v)}
          />
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="info" size={15} /> About Content</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">About Title</label>
              <input className="wc-input" value={data?.about_title || ""} onChange={e => set("about_title", e.target.value)} placeholder="Compassionate Care, Expert Medicine" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">About Description</label>
              <textarea className="wc-textarea" value={data?.about_description || ""} onChange={e => set("about_description", e.target.value)} rows={4} placeholder="Description about the company..." />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="star" size={15} /> Features (3 Items)</h3>
        </div>
        <div className="wc-editor-card-body">
          <Repeater
            label="Features"
            hint="The 3 feature bullet points shown below the description"
            items={data?.features || []}
            onChange={v => set("features", v)}
            onAdd={addFeature}
            className="wc-repeater-features"
            renderItem={(feature, i, update, remove) => (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <select className="wc-select" value={feature.icon} onChange={e => update(i, { ...feature, icon: e.target.value })} style={{ width: "auto", minWidth: 140 }}>
                    <option value="user-plus">Expert Doctors</option>
                    <option value="layout">Modern Facilities</option>
                    <option value="heart">Patient-First</option>
                    <option value="star">Star</option>
                    <option value="clock">Clock</option>
                    <option value="award">Award</option>
                  </select>
                  <button className="wc-repeater-remove" onClick={() => remove(i)} style={{ width: "auto", padding: "6px 12px", marginTop: 0 }}>
                    <Icon name="trash" size={13} />
                  </button>
                </div>
                <input className="wc-input" value={feature.title} onChange={e => update(i, { ...feature, title: e.target.value })} placeholder="Feature Title" />
                <textarea className="wc-textarea" value={feature.description} onChange={e => update(i, { ...feature, description: e.target.value })} placeholder="Feature description" rows={2} />
              </div>
            )}
          />
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="list" size={15} /> Hero Stats (shown below features)</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-stat-inputs">
            {(data?.stats || []).map((stat, i) => (
              <div key={i} className="wc-stat-input-item">
                <label>{stat.label}</label>
                <input value={stat.value} onChange={e => { const s = [...(data.stats||[])]; s[i]={...s[i],value:e.target.value}; set("stats",s); }} placeholder="Value" />
                <div className="wc-stat-sub">
                  <input value={stat.label} onChange={e => { const s=[...(data.stats||[])]; s[i]={...s[i],label:e.target.value}; set("stats",s); }} placeholder="Label" style={{width:"100%",border:"none",background:"transparent",fontSize:11,color:"#94a3b8",outline:"none",fontFamily:"inherit"}} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   MISSION & VISION EDITOR
   ══════════════════════════════════════════════════════════════ */
const MissionVisionEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div>
      {[
        { key: "mission", label: "Mission", icon: "target" },
        { key: "vision", label: "Vision", icon: "eye" },
        { key: "values", label: "Values", icon: "award" },
      ].map(({ key, label, icon }) => (
        <div className="wc-editor-card" key={key}>
          <div className="wc-editor-card-header">
            <h3 className="wc-editor-card-title"><Icon name={icon} size={15} /> {label}</h3>
          </div>
          <div className="wc-editor-card-body">
            <div className="wc-field">
              <label className="wc-field-label">{label} Title</label>
              <input className="wc-input" value={data?.[key]?.title || ""} onChange={e => set(key, { ...data?.[key], title: e.target.value })} placeholder={`Our ${label}`} />
            </div>
            <div className="wc-field" style={{ marginTop: 12 }}>
              <label className="wc-field-label">{label} Text</label>
              <textarea className="wc-textarea" value={data?.[key]?.text || ""} onChange={e => set(key, { ...data?.[key], text: e.target.value })} rows={4} placeholder={`${label} statement...`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   TEAM EDITOR
   ══════════════════════════════════════════════════════════════ */
const TeamEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });
  const addMember = () => ({ id: `member-${Date.now()}`, name: "New Member", role: "ROLE", specialty: "Credentials", photo: "", quote: "" });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="users" size={15} /> Team Section Header</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Title</label>
              <input className="wc-input" value={data?.section_title || ""} onChange={e => set("section_title", e.target.value)} placeholder="Our Leadership" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Subtitle</label>
              <input className="wc-input" value={data?.section_subtitle || ""} onChange={e => set("section_subtitle", e.target.value)} placeholder="The Team Behind Our Excellence" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Description</label>
              <textarea className="wc-textarea" value={data?.description || ""} onChange={e => set("description", e.target.value)} rows={2} placeholder="Team description..." />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="users" size={15} /> Team Members</h3>
        </div>
        <div className="wc-editor-card-body">
          <Repeater
            label="Team Members"
            hint="Add/edit leadership team members"
            items={data?.members || []}
            onChange={v => set("members", v)}
            onAdd={addMember}
            className="wc-repeater-testimonials"
            renderItem={(member, i, update, remove) => (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button className="wc-repeater-remove" onClick={() => remove(i)} style={{ width: "auto", padding: "6px 12px", marginTop: 0 }}>
                    <Icon name="trash" size={13} /> Remove
                  </button>
                </div>
                <ImageUploadField label="Photo" value={member.photo} onChange={v => update(i, { ...member, photo: v })} hint="Recommended: 400×400px" />
                <input className="wc-input" value={member.name} onChange={e => update(i, { ...member, name: e.target.value })} placeholder="Full Name" />
                <input className="wc-input" value={member.role} onChange={e => update(i, { ...member, role: e.target.value })} placeholder="Role (e.g., MANAGING DIRECTOR)" />
                <input className="wc-input" value={member.specialty} onChange={e => update(i, { ...member, specialty: e.target.value })} placeholder="Credentials (e.g., MBBS, FCPS)" />
                <textarea className="wc-textarea" value={member.quote || ""} onChange={e => update(i, { ...member, quote: e.target.value })} placeholder="Quote (optional)" rows={3} />
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   MANAGING DIRECTOR EDITOR
   ══════════════════════════════════════════════════════════════ */
const ManagingDirectorEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="user" size={15} /> MD Section Labels</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Section Label <span className="wc-field-hint">— small text above heading</span></label>
              <input className="wc-input" value={data?.section_label || ""} onChange={e => set("section_label", e.target.value)} placeholder="MESSAGE FROM OUR MD" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Heading</label>
              <input className="wc-input" value={data?.heading || ""} onChange={e => set("heading", e.target.value)} placeholder="A Word From Our" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Heading Highlight <span className="wc-field-hint">— green colored part</span></label>
              <input className="wc-input" value={data?.heading_highlight || ""} onChange={e => set("heading_highlight", e.target.value)} placeholder="Managing Director" />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="user" size={15} /> MD Profile</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <ImageUploadField
                label="MD Photo"
                hint="Recommended: 400×400px. Shown on the left side."
                value={data?.md_photo || ""}
                onChange={v => set("md_photo", v)}
              />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Full Name</label>
              <input className="wc-input" value={data?.md_name || ""} onChange={e => set("md_name", e.target.value)} placeholder="Dr. Homayon Kabir" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Role / Title</label>
              <input className="wc-input" value={data?.md_role || ""} onChange={e => set("md_role", e.target.value)} placeholder="MANAGING DIRECTOR" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Specialty / Credentials</label>
              <input className="wc-input" value={data?.md_specialty || ""} onChange={e => set("md_specialty", e.target.value)} placeholder="MBBS, FCPS (Medicine)" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Badge Text <span className="wc-field-hint">— e.g. BMDC Verified</span></label>
              <input className="wc-input" value={data?.md_badge || ""} onChange={e => set("md_badge", e.target.value)} placeholder="BMDC Verified" />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="message-circle" size={15} /> MD Quote / Message</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field">
            <label className="wc-field-label">Quote Text <span className="wc-field-hint">— displayed in blockquote style</span></label>
            <textarea className="wc-textarea lg" value={data?.quote || ""} onChange={e => set("quote", e.target.value)} rows={5} placeholder="At Renova Life Care, our mission has always been simple..." />
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="list" size={15} /> MD Stats (3 Items)</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-stat-inputs" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {(data?.stats || []).map((stat, i) => (
              <div key={i} className="wc-stat-input-item">
                <label>{stat.label}</label>
                <input
                  value={stat.value}
                  onChange={e => {
                    const s = [...(data.stats || [])];
                    s[i] = { ...s[i], value: e.target.value };
                    set("stats", s);
                  }}
                  placeholder="15+"
                />
                <div className="wc-stat-sub">
                  <input
                    value={stat.label}
                    onChange={e => {
                      const s = [...(data.stats || [])];
                      s[i] = { ...s[i], label: e.target.value };
                      set("stats", s);
                    }}
                    placeholder="Label"
                    style={{ width: "100%", border: "none", background: "transparent", fontSize: 11, color: "#94a3b8", outline: "none", fontFamily: "inherit" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   STATS BAR EDITOR
   ══════════════════════════════════════════════════════════════ */
const StatsBarEditor = ({ data, onChange }) => {
  const fields = [
    { key: "happy_patients", label: "Happy Patients", placeholder: "15,000+" },
    { key: "expert_doctors", label: "Expert Doctors", placeholder: "120+" },
    { key: "departments", label: "Departments", placeholder: "35+" },
    { key: "years_experience", label: "Years Experience", placeholder: "14" },
  ];
  return (
    <div className="wc-editor-card">
      <div className="wc-editor-card-header">
        <h3 className="wc-editor-card-title"><Icon name="list" size={15} /> Stats Bar (4 Items)</h3>
      </div>
      <div className="wc-editor-card-body">
        <div className="wc-stat-inputs" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {fields.map(({ key, label, placeholder }) => (
            <div key={key} className="wc-stat-input-item">
              <label>{label}</label>
              <input value={data?.[key] || ""} onChange={e => onChange({ ...data, [key]: e.target.value })} placeholder={placeholder} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   COMPANY HISTORY EDITOR
   ══════════════════════════════════════════════════════════════ */
const CompanyHistoryEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });
  const addMilestone = () => ({ year: "", title: "", description: "" });
  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="clock" size={15} /> Company History</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Heading</label>
              <input className="wc-input" value={data?.heading || ""} onChange={e => set("heading", e.target.value)} placeholder="Our Journey" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Subheading</label>
              <input className="wc-input" value={data?.subheading || ""} onChange={e => set("subheading", e.target.value)} placeholder="A decade of compassionate care" />
            </div>
          </div>
          <Repeater
            label="Milestones"
            items={data?.milestones || []}
            onChange={v => set("milestones", v)}
            onAdd={addMilestone}
            renderItem={(m, i, update, remove) => (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", gap: 8 }}>
                  <input className="wc-input" value={m.year} onChange={e => update(i, { ...m, year: e.target.value })} placeholder="Year (e.g. 2010)" style={{ width: 100 }} />
                  <input className="wc-input" value={m.title} onChange={e => update(i, { ...m, title: e.target.value })} placeholder="Milestone Title" style={{ flex: 1 }} />
                </div>
                <textarea className="wc-textarea" value={m.description} onChange={e => update(i, { ...m, description: e.target.value })} placeholder="Description" rows={2} />
                <button className="wc-repeater-remove" onClick={() => remove(i)}><Icon name="trash" size={13} /> Remove</button>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   CERTIFICATIONS EDITOR
   ══════════════════════════════════════════════════════════════ */
const CertificationsEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });
  const addCert = () => ({ id: `cert-${Date.now()}`, title: "", description: "", image: "" });
  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="award" size={15} /> Certifications</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Heading</label>
              <input className="wc-input" value={data?.heading || ""} onChange={e => set("heading", e.target.value)} placeholder="Accreditations & Certifications" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Subheading</label>
              <input className="wc-input" value={data?.subheading || ""} onChange={e => set("subheading", e.target.value)} placeholder="Recognized by leading healthcare organizations" />
            </div>
          </div>
          <Repeater
            label="Certifications"
            items={data?.items || []}
            onChange={v => set("items", v)}
            onAdd={addCert}
            className="wc-repeater-testimonials"
            renderItem={(cert, i, update, remove) => (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <ImageUploadField label="Logo/Badge" value={cert.image} onChange={v => update(i, { ...cert, image: v })} hint="PNG transparent recommended" />
                <input className="wc-input" value={cert.title} onChange={e => update(i, { ...cert, title: e.target.value })} placeholder="Certification Title (e.g. ISO 9001:2015)" />
                <input className="wc-input" value={cert.description} onChange={e => update(i, { ...cert, description: e.target.value })} placeholder="Description" />
                <button className="wc-repeater-remove" onClick={() => remove(i)}><Icon name="trash" size={13} /> Remove</button>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   DOCTOR LISTING EDITOR
   ══════════════════════════════════════════════════════════════ */
const DoctorListingEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });
  const addDoctor = () => ({
    id: `doc-${Date.now()}`,
    name: "Dr. New Doctor",
    specialty: "Specialist",
    credentials: "MBBS",
    experience: "5 Years",
    rating: "4.5",
    patients: "500++",
    available: true,
    photo: "",
  });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="search" size={15} /> Search & Filter Labels</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Search Placeholder Text</label>
              <input className="wc-input" value={data?.search_placeholder || ""} onChange={e => set("search_placeholder", e.target.value)} placeholder="Search by doctor name..." />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Specialty Filter Label</label>
              <input className="wc-input" value={data?.filter_specialties_label || ""} onChange={e => set("filter_specialties_label", e.target.value)} placeholder="All Specialties" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Branch Filter Label</label>
              <input className="wc-input" value={data?.filter_branches_label || ""} onChange={e => set("filter_branches_label", e.target.value)} placeholder="All Branches" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Consultation Filter Label</label>
              <input className="wc-input" value={data?.filter_consultation_label || ""} onChange={e => set("filter_consultation_label", e.target.value)} placeholder="Consultation Type" />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="users" size={15} /> Doctor Cards</h3>
        </div>
        <div className="wc-editor-card-body">
          <Repeater
            label="Doctors"
            hint="Add/edit doctor cards shown on the listing page"
            items={data?.doctors || []}
            onChange={v => set("doctors", v)}
            onAdd={addDoctor}
            className="wc-repeater-testimonials"
            renderItem={(doc, i, update, remove) => (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: doc.available ? "#16a34a" : "#94a3b8", background: doc.available ? "#f0fdf4" : "#f1f5f9", padding: "3px 10px", borderRadius: 20, border: `1px solid ${doc.available ? "#bbf7d0" : "#e2e8f0"}` }}>
                    {doc.available ? "● AVAILABLE" : "○ UNAVAILABLE"}
                  </span>
                  <button className="wc-repeater-remove" onClick={() => remove(i)} style={{ width: "auto", padding: "6px 12px", marginTop: 0 }}>
                    <Icon name="trash" size={13} />
                  </button>
                </div>
                <ImageUploadField label="Doctor Photo" value={doc.photo} onChange={v => update(i, { ...doc, photo: v })} hint="Recommended: 300×300px circular" />
                <input className="wc-input" value={doc.name} onChange={e => update(i, { ...doc, name: e.target.value })} placeholder="Dr. Full Name" />
                <input className="wc-input" value={doc.specialty} onChange={e => update(i, { ...doc, specialty: e.target.value })} placeholder="Specialty (e.g. Cardiologist)" />
                <input className="wc-input" value={doc.credentials} onChange={e => update(i, { ...doc, credentials: e.target.value })} placeholder="Credentials (e.g. MBBS, MD, FCPS)" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 11, color: "#94a3b8", display: "block", marginBottom: 4 }}>Experience</label>
                    <input className="wc-input" value={doc.experience} onChange={e => update(i, { ...doc, experience: e.target.value })} placeholder="18 Years" />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: "#94a3b8", display: "block", marginBottom: 4 }}>Rating</label>
                    <input className="wc-input" value={doc.rating} onChange={e => update(i, { ...doc, rating: e.target.value })} placeholder="4.9" />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: "#94a3b8", display: "block", marginBottom: 4 }}>Patients</label>
                    <input className="wc-input" value={doc.patients} onChange={e => update(i, { ...doc, patients: e.target.value })} placeholder="3,200++" />
                  </div>
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                  <input type="checkbox" checked={doc.available} onChange={e => update(i, { ...doc, available: e.target.checked })} />
                  Mark as Available
                </label>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   CAREER CTA EDITOR
   ══════════════════════════════════════════════════════════════ */
const CareerCTAEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });
  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="user-plus" size={15} /> Career CTA Section</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field">
              <label className="wc-field-label">Section Label <span className="wc-field-hint">— small text above heading</span></label>
              <input className="wc-input" value={data?.section_label || ""} onChange={e => set("section_label", e.target.value)} placeholder="CAREER OPPORTUNITIES" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Heading <span className="required">*</span></label>
              <input className="wc-input" value={data?.heading || ""} onChange={e => set("heading", e.target.value)} placeholder="Are You a Medical Professional?" />
            </div>
            <div className="wc-field span-2">
              <label className="wc-field-label">Description</label>
              <textarea className="wc-textarea" value={data?.description || ""} onChange={e => set("description", e.target.value)} rows={3} placeholder="We are always looking for talented, passionate doctors..." />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Button Text</label>
              <input className="wc-input" value={data?.button_text || ""} onChange={e => set("button_text", e.target.value)} placeholder="Apply Now" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Button URL</label>
              <input className="wc-input" value={data?.button_url || ""} onChange={e => set("button_url", e.target.value)} placeholder="/careers" />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="check" size={15} /> Feature Bullets (4 items)</h3>
        </div>
        <div className="wc-editor-card-body">
          <Repeater
            label="Features"
            hint="The 4 bullet points shown in 2 columns"
            items={data?.features || []}
            onChange={v => set("features", v)}
            renderItem={(feat, i, update, remove) => (
              <>
                <input className="wc-input" value={feat} onChange={e => update(i, e.target.value)} placeholder="Feature text" style={{ flex: 1 }} />
                <button className="wc-repeater-remove" onClick={() => remove(i)} style={{ marginTop: 4 }}>
                  <Icon name="x" size={13} /> Remove
                </button>
              </>
            )}
          />
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="list" size={15} /> Stats (3 Items)</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-stat-inputs" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {(data?.stats || []).map((stat, i) => (
              <div key={i} className="wc-stat-input-item">
                <label>{stat.label}</label>
                <input value={stat.value} onChange={e => { const s = [...(data.stats||[])]; s[i]={...s[i],value:e.target.value}; set("stats",s); }} placeholder="50+" />
                <div className="wc-stat-sub">
                  <input value={stat.label} onChange={e => { const s=[...(data.stats||[])]; s[i]={...s[i],label:e.target.value}; set("stats",s); }} placeholder="Label" style={{width:"100%",border:"none",background:"transparent",fontSize:11,color:"#94a3b8",outline:"none",fontFamily:"inherit"}} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   PACKAGES LISTING EDITOR
   ══════════════════════════════════════════════════════════════ */
const PackagesListingEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });
  const addPackage = () => ({
    id: `pkg-${Date.now()}`,
    name: "Package-New",
    badge: "SAVE 10%",
    type: "Health screening",
    items: [{ test: "Complete Blood Count (CBC)", price: "BDT 400.00" }],
    total_cost: "BDT 0.00",
    discounted_price: "BDT 0.00",
  });
  const addItem = () => ({ test: "", price: "" });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="info" size={15} /> Bottom Note</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-field-grid">
            <div className="wc-field span-2">
              <label className="wc-field-label">Custom Package Note</label>
              <input className="wc-input" value={data?.custom_note || ""} onChange={e => set("custom_note", e.target.value)} placeholder="Custom packages available for corporate health programs." />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Contact Link Text</label>
              <input className="wc-input" value={data?.contact_link_text || ""} onChange={e => set("contact_link_text", e.target.value)} placeholder="Contact us →" />
            </div>
            <div className="wc-field">
              <label className="wc-field-label">Contact Link URL</label>
              <input className="wc-input" value={data?.contact_link_url || ""} onChange={e => set("contact_link_url", e.target.value)} placeholder="/contact" />
            </div>
          </div>
        </div>
      </div>

      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="package" size={15} /> Health Packages</h3>
        </div>
        <div className="wc-editor-card-body">
          <Repeater
            label="Packages"
            hint="Add/edit health packages with test items and pricing"
            items={data?.packages || []}
            onChange={v => set("packages", v)}
            onAdd={addPackage}
            className="wc-repeater-testimonials"
            renderItem={(pkg, i, update, remove) => (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#014fa1", background: "#eff6ff", padding: "3px 10px", borderRadius: 20, border: "1px solid #dbeafe" }}>{pkg.badge}</span>
                  <button className="wc-repeater-remove" onClick={() => remove(i)} style={{ width: "auto", padding: "6px 12px", marginTop: 0 }}>
                    <Icon name="trash" size={13} />
                  </button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 11, color: "#94a3b8", display: "block", marginBottom: 4 }}>Package Name</label>
                    <input className="wc-input" value={pkg.name} onChange={e => update(i, { ...pkg, name: e.target.value })} placeholder="Package-1" />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: "#94a3b8", display: "block", marginBottom: 4 }}>Badge (e.g. SAVE 13%)</label>
                    <input className="wc-input" value={pkg.badge} onChange={e => update(i, { ...pkg, badge: e.target.value })} placeholder="SAVE 13%" />
                  </div>
                </div>
                <input className="wc-input" value={pkg.type} onChange={e => update(i, { ...pkg, type: e.target.value })} placeholder="Package type description" />
                
                <div style={{ background: "#f8fafc", borderRadius: 8, padding: 12, border: "1px solid #e2e8f0" }}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#374151", display: "block", marginBottom: 8 }}>Test Items</label>
                  {(pkg.items || []).map((item, j) => (
                    <div key={j} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                      <input className="wc-input" value={item.test} onChange={e => { const items = [...pkg.items]; items[j] = { ...items[j], test: e.target.value }; update(i, { ...pkg, items }); }} placeholder="Test name" style={{ flex: 2 }} />
                      <input className="wc-input" value={item.price} onChange={e => { const items = [...pkg.items]; items[j] = { ...items[j], price: e.target.value }; update(i, { ...pkg, items }); }} placeholder="BDT 400.00" style={{ flex: 1 }} />
                      <button onClick={() => { const items = pkg.items.filter((_, idx) => idx !== j); update(i, { ...pkg, items }); }} style={{ background: "#fee2e2", border: "1px solid #fecaca", borderRadius: 6, color: "#dc2626", cursor: "pointer", padding: "6px 8px", fontSize: 12 }}>✕</button>
                    </div>
                  ))}
                  <button onClick={() => update(i, { ...pkg, items: [...(pkg.items || []), { test: "", price: "" }] })} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "1px dashed #cbd5e1", borderRadius: 6, padding: "6px 12px", fontSize: 12, color: "#64748b", cursor: "pointer", width: "100%", justifyContent: "center", marginTop: 4 }}>
                    <Icon name="plus" size={12} /> Add Test Item
                  </button>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div>
                    <label style={{ fontSize: 11, color: "#94a3b8", display: "block", marginBottom: 4 }}>Total Cost (strikethrough)</label>
                    <input className="wc-input" value={pkg.total_cost} onChange={e => update(i, { ...pkg, total_cost: e.target.value })} placeholder="BDT 7,710.00" />
                  </div>
                  <div>
                    <label style={{ fontSize: 11, color: "#014fa1", fontWeight: 700, display: "block", marginBottom: 4 }}>Discounted Price</label>
                    <input className="wc-input" value={pkg.discounted_price} onChange={e => update(i, { ...pkg, discounted_price: e.target.value })} placeholder="BDT 5,900.00" style={{ borderColor: "#014fa1" }} />
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   PHOTO GALLERY EDITOR
   ══════════════════════════════════════════════════════════════ */
const PhotoGalleryEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });
  const addPhoto = () => ({
    id: `ph-${Date.now()}`,
    image: "",
    title: "",
    subtitle: "",
    date: "",
  });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="image" size={15} /> Photo Gallery Items</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-gallery-grid">
            {(data?.photos || []).map((photo, i) => {
              const update = (val) => {
                const arr = [...(data.photos || [])];
                arr[i] = val;
                set("photos", arr);
              };
              const remove = () => set("photos", (data.photos || []).filter((_, idx) => idx !== i));
              return (
                <div key={photo.id || i} className="wc-gallery-item">
                  <div className="wc-gallery-item-image" onClick={() => document.getElementById(`photo-upload-${i}`).click()}>
                    {photo.image ? (
                      <img src={photo.image} alt={photo.title || "photo"} />
                    ) : (
                      <div className="wc-gallery-item-placeholder">
                        <Icon name="image" size={28} />
                        <span>Click to upload</span>
                      </div>
                    )}
                    <input
                      id={`photo-upload-${i}`}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) update({ ...photo, image: URL.createObjectURL(file) });
                        e.target.value = "";
                      }}
                    />
                    {photo.image && (
                      <div className="wc-gallery-item-overlay">
                        <button className="wc-gallery-overlay-btn" onClick={e => { e.stopPropagation(); document.getElementById(`photo-upload-${i}`).click(); }} title="Change image">
                          <Icon name="upload" size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="wc-gallery-item-fields">
                    <input
                      className="wc-input"
                      value={photo.title || ""}
                      onChange={e => update({ ...photo, title: e.target.value })}
                      placeholder="Title"
                    />
                    <input
                      className="wc-input"
                      value={photo.subtitle || ""}
                      onChange={e => update({ ...photo, subtitle: e.target.value })}
                      placeholder="Subtitle"
                    />
                    <input
                      className="wc-input"
                      type="date"
                      value={photo.date || ""}
                      onChange={e => update({ ...photo, date: e.target.value })}
                    />
                    <button className="wc-gallery-delete-btn" onClick={remove}>
                      <Icon name="trash" size={13} /> Delete
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="wc-gallery-add-item" onClick={() => set("photos", [...(data?.photos || []), addPhoto()])}>
              <Icon name="plus" size={28} />
              <span>Add Photo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   VIDEO GALLERY EDITOR
   ══════════════════════════════════════════════════════════════ */
const VideoGalleryEditor = ({ data, onChange }) => {
  const set = (k, v) => onChange({ ...data, [k]: v });
  const addVideo = () => ({
    id: `v-${Date.now()}`,
    thumbnail: "",
    title: "",
    subtitle: "",
    date: "",
  });

  return (
    <div>
      <div className="wc-editor-card">
        <div className="wc-editor-card-header">
          <h3 className="wc-editor-card-title"><Icon name="layout" size={15} /> Video Gallery Items</h3>
        </div>
        <div className="wc-editor-card-body">
          <div className="wc-gallery-grid">
            {(data?.videos || []).map((vid, i) => {
              const update = (val) => {
                const arr = [...(data.videos || [])];
                arr[i] = val;
                set("videos", arr);
              };
              const remove = () => set("videos", (data.videos || []).filter((_, idx) => idx !== i));
              return (
                <div key={vid.id || i} className="wc-gallery-item">
                  <div className="wc-gallery-item-image wc-gallery-item-video" onClick={() => document.getElementById(`video-upload-${i}`).click()}>
                    {vid.thumbnail ? (
                      <>
                        <img src={vid.thumbnail} alt={vid.title || "video thumbnail"} />
                        <div className="wc-video-play-badge"><Icon name="layout" size={18} /></div>
                      </>
                    ) : (
                      <div className="wc-gallery-item-placeholder">
                        <Icon name="layout" size={28} />
                        <span>Click to upload thumbnail</span>
                      </div>
                    )}
                    <input
                      id={`video-upload-${i}`}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) update({ ...vid, thumbnail: URL.createObjectURL(file) });
                        e.target.value = "";
                      }}
                    />
                    {vid.thumbnail && (
                      <div className="wc-gallery-item-overlay">
                        <button className="wc-gallery-overlay-btn" onClick={e => { e.stopPropagation(); document.getElementById(`video-upload-${i}`).click(); }} title="Change thumbnail">
                          <Icon name="upload" size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="wc-gallery-item-fields">
                    <input
                      className="wc-input"
                      value={vid.title || ""}
                      onChange={e => update({ ...vid, title: e.target.value })}
                      placeholder="Title"
                    />
                    <input
                      className="wc-input"
                      value={vid.subtitle || ""}
                      onChange={e => update({ ...vid, subtitle: e.target.value })}
                      placeholder="Subtitle"
                    />
                    <input
                      className="wc-input"
                      type="date"
                      value={vid.date || ""}
                      onChange={e => update({ ...vid, date: e.target.value })}
                    />
                    <button className="wc-gallery-delete-btn" onClick={remove}>
                      <Icon name="trash" size={13} /> Delete
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="wc-gallery-add-item" onClick={() => set("videos", [...(data?.videos || []), addVideo()])}>
              <Icon name="plus" size={28} />
              <span>Add Video</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   SECTION RENDERER
   ══════════════════════════════════════════════════════════════ */
const SectionEditor = ({ pageId, sectionId, data, onChange }) => {
  if (sectionId === "hero") return <HeroEditor data={data} onChange={onChange} />;
  if (sectionId === "about-hero") return <AboutHeroEditor data={data} onChange={onChange} />;
  if (sectionId === "appointment-cta") return <AppointmentCTAEditor data={data} onChange={onChange} />;
  if (sectionId === "testimonials") return <TestimonialsEditor data={data} onChange={onChange} />;
  if (sectionId === "partners") return <PartnersEditor data={data} onChange={onChange} />;
  if (sectionId === "mission-vision") return <MissionVisionEditor data={data} onChange={onChange} />;
  if (sectionId === "team") return <TeamEditor data={data} onChange={onChange} />;
  if (sectionId === "managing-director") return <ManagingDirectorEditor data={data} onChange={onChange} />;
  if (sectionId === "stats-bar") return <StatsBarEditor data={data} onChange={onChange} />;
  if (sectionId === "company-history") return <CompanyHistoryEditor data={data} onChange={onChange} />;
  if (sectionId === "certifications") return <CertificationsEditor data={data} onChange={onChange} />;
  if (sectionId === "doctor-listing") return <DoctorListingEditor data={data} onChange={onChange} />;
  if (sectionId === "career-cta") return <CareerCTAEditor data={data} onChange={onChange} />;
  if (sectionId === "packages-listing") return <PackagesListingEditor data={data} onChange={onChange} />;
  if (sectionId === "photo-gallery") return <PhotoGalleryEditor data={data} onChange={onChange} />;
  if (sectionId === "video-gallery") return <VideoGalleryEditor data={data} onChange={onChange} />;
  if (sectionId === "seo") return <SeoEditor data={data} onChange={onChange} />;
  return null;
};

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════ */
export default function WebsiteContentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openParents, setOpenParents] = useState({ home: true, services: true, media: false });
  const [selectedPage, setSelectedPage] = useState("home");
  const [selectedSection, setSelectedSection] = useState("hero");
  const [pageData, setPageData] = useState(INITIAL_DATA);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [pageTree, setPageTree] = useState(PAGE_TREE);
  const toastTimeout = useRef(null);

  const showToast = useCallback((msg, type = "success") => {
    setToast({ show: true, msg, type });
    clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToast(t => ({ ...t, show: false })), 3000);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 900));
    setSaving(false);
    showToast("Changes saved successfully!", "success");
  };

  const handlePreview = () => {
    const page = pageTree.find(p => p.id === selectedPage) || pageTree.flatMap(p => p.children || []).find(c => c.id === selectedPage);
    if (page) window.open(page.href, "_blank");
  };

  const toggleParent = id => setOpenParents(o => ({ ...o, [id]: !o[id] }));

  const selectPage = (pageId, firstSection) => {
    setSelectedPage(pageId);
    setSelectedSection(firstSection || "hero");
  };

  const handleAddSubPage = (newPage) => {
    setPageTree(prevTree => {
      return prevTree.map(page => {
        if (page.id === "services") {
          return {
            ...page,
            children: [...(page.children || []), newPage]
          };
        }
        return page;
      });
    });
    
    setPageData(prev => ({
      ...prev,
      [newPage.id]: {
        hero: {
          trust_badge_text: "New Service",
          headline: newPage.label,
          description: `Welcome to our ${newPage.label} service.`,
          background_images: [],
          patient_images: [],
          stats: [
            { label: "Happy Patients", value: "0+", suffix: "" },
            { label: "Expert Care", value: "100%", suffix: "" },
          ],
        },
        seo: {
          meta_title: `${newPage.label} | Renova Life Care`,
          meta_description: `Professional ${newPage.label} services at Renova Life Care.`,
          og_title: newPage.label,
          og_description: `Quality ${newPage.label} services`,
          og_image: "/images/og-default.jpg",
          canonical_url: `https://renovalifecare.com${newPage.href}`,
          robots: "index, follow",
          keywords: newPage.label.toLowerCase(),
        },
      }
    }));
    
    selectPage(newPage.id, "hero");
    showToast(`${newPage.label} page added successfully!`, "success");
  };

  const currentPageDef = pageTree.find(p => p.id === selectedPage)
    || pageTree.flatMap(p => p.children || []).find(c => c.id === selectedPage);

  const currentParentDef = pageTree.find(p =>
    p.id === selectedPage || (p.children || []).some(c => c.id === selectedPage)
  );

  const sections = currentPageDef?.sections || ["hero", "seo"];

  const currentData = pageData?.[selectedPage]?.[selectedSection] || {};

  const handleDataChange = newData => {
    setPageData(prev => ({
      ...prev,
      [selectedPage]: {
        ...(prev[selectedPage] || {}),
        [selectedSection]: newData,
      },
    }));
  };

  const filteredTree = searchQuery
    ? pageTree.map(p => {
        const matchParent = p.label.toLowerCase().includes(searchQuery.toLowerCase());
        const matchedChildren = (p.children || []).filter(c => c.label.toLowerCase().includes(searchQuery.toLowerCase()));
        if (matchParent || matchedChildren.length > 0) {
          return { ...p, children: matchParent ? p.children : matchedChildren };
        }
        return null;
      }).filter(Boolean)
    : pageTree;

  const pageIcons = {
    home: "home", info: "info", doctors: "doctors", services: "services",
    package: "package", shop: "shop", blog: "blog", contact: "contact",
  };

  return (
    <div className="wc-layout">
      <aside className="wc-sidebar">
        <div className="wc-sidebar-header">
          <p className="wc-sidebar-title">Website Pages</p>
          <div className="wc-search">
            <svg className="wc-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search pages..." />
          </div>
        </div>

        <div className="wc-page-tree">
          {filteredTree.map(page => {
            const hasChildren = page.children && page.children.length > 0;
            const isOpen = openParents[page.id];
            const isActive = selectedPage === page.id;
            const hasActiveChild = hasChildren && (page.children || []).some(c => c.id === selectedPage);

            return (
              <div key={page.id} className="wc-tree-parent">
                <button
                  className={`wc-tree-parent-btn ${isActive ? "active" : ""} ${hasActiveChild ? "has-active-child" : ""}`}
                  onClick={() => {
                    if (hasChildren) toggleParent(page.id);
                    selectPage(page.id, page.sections?.[0] || "hero");
                  }}
                >
                  <div className="wc-tree-page-icon">
                    <Icon name={pageIcons[page.icon] || "layout"} size={14} />
                  </div>
                  <span className="wc-tree-parent-label">{page.label}</span>
                  <span className="wc-tree-status" />
                  {hasChildren && (
                    <svg className={`wc-tree-chevron ${isOpen ? "open" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  )}
                </button>

                {hasChildren && (
                  <div className={`wc-tree-children ${isOpen ? "open" : ""}`}>
                    {(page.children || []).map(child => (
                      <button
                        key={child.id}
                        className={`wc-tree-child-btn ${selectedPage === child.id ? "active" : ""}`}
                        onClick={() => selectPage(child.id, "hero")}
                      >
                        {child.label}
                      </button>
                    ))}
                    {page.id === "services" && (
                      <button
                        className="wc-tree-add-btn"
                        onClick={() => setIsAddModalOpen(true)}
                      >
                        <Icon name="plus" size={12} />
                        Add New Service
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="wc-sidebar-footer">
          <div className="wc-sidebar-note">
            <Icon name="info" size={10} />
            <span>Only Services subpages can be added</span>
          </div>
        </div>
      </aside>

      <div className="wc-editor">
        <div className="wc-editor-topbar">
          <div className="wc-breadcrumb">
            <span>Website Content</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
            {currentParentDef && currentParentDef.id !== selectedPage && (
              <>
                <span onClick={() => selectPage(currentParentDef.id, currentParentDef.sections?.[0])} style={{ cursor: "pointer" }}>
                  {currentParentDef.label}
                </span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </>
            )}
            <span className="current">{currentPageDef?.label || selectedPage}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
            <span className="current">{SECTION_DEFS[selectedSection]?.label || selectedSection}</span>
          </div>

          <div className="wc-topbar-actions">
            <div className="wc-status-dot">Live</div>
            <button className="wc-btn wc-btn-ghost" onClick={handlePreview}>
              <Icon name="eye" size={14} /> Preview
            </button>
            <button className="wc-btn wc-btn-ghost">
              <Icon name="refresh" size={14} /> Reset
            </button>
            <button className="wc-btn wc-btn-success" onClick={handleSave} disabled={saving}>
              {saving ? (
                <><Icon name="refresh" size={14} /> Saving...</>
              ) : (
                <><Icon name="save" size={14} /> Save Changes</>
              )}
            </button>
          </div>
        </div>

        <div className="wc-editor-body">
          <nav className="wc-sections-nav">
            <div className="wc-sections-title">Sections</div>
            {sections.map(sectionId => {
              const def = SECTION_DEFS[sectionId] || { label: sectionId, icon: "layout" };
              return (
                <button
                  key={sectionId}
                  className={`wc-section-tab ${selectedSection === sectionId ? "active" : ""}`}
                  onClick={() => setSelectedSection(sectionId)}
                >
                  <Icon name={def.icon || "layout"} size={14} />
                  {def.label}
                  {sectionId === "seo" && <span className="wc-section-tab-badge">SEO</span>}
                </button>
              );
            })}
          </nav>

          <div className="wc-content-panel">
            <div className="wc-page-info-banner">
              <div className="wc-page-info-left">
                <div className="wc-page-info-icon">
                  <img src="/images/logo.png" alt="Renova Life Care Logo" style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
                </div>
                <div className="wc-page-info-text">
                  <h2>{currentPageDef?.label || selectedPage} Page</h2>
                  <p>Editing: {SECTION_DEFS[selectedSection]?.label || selectedSection} — {SECTION_DEFS[selectedSection]?.desc}</p>
                </div>
              </div>
              <div className="wc-page-info-meta">
                <span className="wc-meta-tag live">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11"><circle cx="12" cy="12" r="10"/></svg>
                  Published
                </span>
                <span className="wc-meta-tag">
                  <Icon name="external" size={11} />
                  {currentPageDef?.href || "/"}
                </span>
                <span className="wc-meta-tag">
                  <Icon name="clock" size={11} />
                  Last saved: Just now
                </span>
              </div>
            </div>

            <SectionEditor
              pageId={selectedPage}
              sectionId={selectedSection}
              data={currentData}
              onChange={handleDataChange}
            />
          </div>
        </div>
      </div>

      <AddPageModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddSubPage}
        parentPageId="services"
      />

      <div className={`wc-toast ${toast.type} ${toast.show ? "show" : ""}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        {toast.msg}
      </div>
    </div>
  );
}