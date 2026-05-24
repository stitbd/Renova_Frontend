"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import "@/styles/pages/super-admin-dashboard.css";
import "./website-content.css";

// Navigation links configuration
export const navLinks = [
  { label: "Home", href: "/", icon: "home" },
  { label: "About", href: "/about", icon: "info" },
  { label: "Doctors", href: "/doctors", icon: "doctors" },
  { 
    label: "Services", 
    href: "/services",
    icon: "services",
    children: [
      { label: "Pathology & Laboratory Testing", href: "/services/pathology-laboratory-testing" },
      { label: "Blood Test & Biochemistry", href: "/services/blood-test-biochemistry" },
      { label: "Hematology Services", href: "/services/hematology-services" },
      { label: "Hormone & Immunology Tests", href: "/services/hormone-immunology-tests" },
      { label: "Urine & Stool Analysis", href: "/services/urine-stool-analysis" },
      { label: "Digital X-Ray", href: "/services/digital-x-ray" },
      { label: "Ultrasonography (USG)", href: "/services/ultrasonography-usg" },
      { label: "Color Doppler Imaging", href: "/services/color-doppler-imaging" },
      { label: "ECG (Electrocardiogram)", href: "/services/ecg-electrocardiogram" },
      { label: "Echocardiography (ECHO)", href: "/services/echocardiography-echo" },
      { label: "CT Scan Services", href: "/services/ct-scan-services" },
      { label: "MRI Scan Services", href: "/services/mri-scan-services" },
      { label: "Mammography", href: "/services/mammography" },
      { label: "Endoscopy & Colonoscopy", href: "/services/endoscopy-colonoscopy" },
      { label: "Pulmonary Function Test (PFT)", href: "/services/pulmonary-function-test-pft" },
      { label: "EEG & EMG Testing", href: "/services/eeg-emg-testing" },
      { label: "Cardiology Diagnostic Services", href: "/services/cardiology-diagnostic-services" },
      { label: "Diabetes Screening & Management", href: "/services/diabetes-screening-management" },
      { label: "Kidney Function Tests", href: "/services/kidney-function-tests" },
      { label: "Liver Function Tests", href: "/services/liver-function-tests" },
      { label: "Thyroid Profile Tests", href: "/services/thyroid-profile-tests" },
      { label: "Cancer Screening", href: "/services/cancer-screening" },
      { label: "Preventive Health Checkup Packages", href: "/services/preventive-health-checkup-packages" },
      { label: "Full Body Health Checkup", href: "/services/full-body-health-checkup" },
      { label: "Covid-19 & Viral Screening", href: "/services/covid-19-viral-screening" },
      { label: "Home Sample Collection", href: "/services/home-sample-collection" },
      { label: "Doctor Consultation Services", href: "/services/doctor-consultation-services" },
      { label: "Specialist Chamber Services", href: "/services/specialist-chamber-services" },
      { label: "Women's Health Diagnostics", href: "/services/womens-health-diagnostics" },
      { label: "Child Health Diagnostics", href: "/services/child-health-diagnostics" },
      { label: "Prenatal & Pregnancy Checkups", href: "/services/prenatal-pregnancy-checkups" },
      { label: "Health Screening for Corporate Clients", href: "/services/health-screening-corporate-clients" },
      { label: "Emergency Diagnostic Support", href: "/services/emergency-diagnostic-support" },
      { label: "Digital Reporting & Online Reports", href: "/services/digital-reporting-online-reports" },
    ]
  },
  { label: "Packages", href: "/packages", icon: "package" },
  { label: "Shop", href: "/shop", icon: "shop" },
  { 
    label: "Media", 
    href: "/media",
    icon: "blog",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "News", href: "/news" },
      { label: "Photos Gallery", href: "/photos" },
      { label: "Videos Gallery", href: "/videos" },
    ]
  },
  { label: "Contact", href: "/contact", icon: "contact" },
];

export const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Events", href: "/events" },
    { label: "Careers", href: "/careers" },
    { label: "Our Team", href: "/our-team" },
    { label: "Contact Us", href: "/contact" },
    { label: "Complain & Advise", href: "/complain" },
  ],
  support: [
    { label: "Book Appointment", href: "/appointment" },
    { label: "Doctor Portal", href: "/doctor-portal/doctor-signin" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/renovalifecare", icon: "facebook" },
  { label: "LinkedIn", href: "https://linkedin.com/company/renovalifecare", icon: "linkedin" },
  { label: "Instagram", href: "https://instagram.com/renovalifecare", icon: "instagram" },
  { label: "YouTube", href: "https://youtube.com/@renovalifecare", icon: "youtube" },
];

// Helper: Flatten navLinks with children into editable pages
const flattenNavLinks = (links, parentLabel = null) => {
  return links.flatMap(link => {
    const pageId = link.href.replace(/\//g, '-').replace(/^-|-$/g, '') || 'home';
    const hasChildren = link.children && link.children.length > 0;
    
    const basePage = {
      id: pageId,
      title: link.label,
      description: hasChildren 
        ? `Manage ${link.label.toLowerCase()} section and its ${link.children.length} subsections`
        : `Edit content for ${link.label.toLowerCase()} page`,
      icon: link.icon || 'page',
      href: link.href,
      lastUpdated: new Date().toISOString().split('T')[0],
      status: 'published',
      hasChildren,
      sections: hasChildren 
        ? ['Hero', 'Content', link.children.map(c => c.label), 'SEO']
        : ['Hero', 'Main Content', 'SEO', 'Meta Tags']
    };

    if (hasChildren) {
      // Return parent + all children as separate editable pages
      return [
        basePage,
        ...link.children.map(child => ({
          id: `${pageId}-${child.href.replace(/\//g, '-').replace(/^-|-$/g, '')}`,
          title: child.label,
          description: `Edit content for ${child.label.toLowerCase()}`,
          icon: 'subpage',
          href: child.href,
          lastUpdated: new Date().toISOString().split('T')[0],
          status: 'published',
          hasChildren: false,
          sections: ['Hero', 'Main Content', 'SEO', 'Meta Tags'],
          parent: link.label
        }))
      ];
    }
    return basePage;
  });
};

export default function WebsiteContentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Generate pages from navLinks
  const websitePages = useMemo(() => flattenNavLinks(navLinks), []);

  const filteredPages = useMemo(() => {
    return websitePages.filter(page => {
      const matchesSearch = 
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        filterCategory === "all" || 
        (filterCategory === "parent" && !page.parent) ||
        (filterCategory === "child" && page.parent);
      
      return matchesSearch && matchesCategory;
    });
  }, [websitePages, searchQuery, filterCategory]);

  const renderIcon = (iconName) => {
    const icons = {
      home: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      info: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      ),
      services: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      ),
      doctors: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      package: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      ),
      shop: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      ),
      blog: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      contact: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      page: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
      subpage: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="9" x2="15" y2="9" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="17" x2="11" y2="17" />
        </svg>
      )
    };
    return icons[iconName] || icons.page;
  };

  const categoryCounts = useMemo(() => {
    const counts = { all: websitePages.length, parent: 0, child: 0 };
    websitePages.forEach(page => {
      if (page.parent) counts.child++;
      else counts.parent++;
    });
    return counts;
  }, [websitePages]);

  return (
    <div className="website-content-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Website Content Management</h1>
          <p className="page-subtitle">Manage and update content across all pages of your website</p>
        </div>
        <div className="header-actions">
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${filterCategory === 'all' ? 'active' : ''}`}
              onClick={() => setFilterCategory('all')}
            >
              All <span className="count">{categoryCounts.all}</span>
            </button>
            <button 
              className={`filter-tab ${filterCategory === 'parent' ? 'active' : ''}`}
              onClick={() => setFilterCategory('parent')}
            >
              Main Pages <span className="count">{categoryCounts.parent}</span>
            </button>
            <button 
              className={`filter-tab ${filterCategory === 'child' ? 'active' : ''}`}
              onClick={() => setFilterCategory('child')}
            >
              Sub Pages <span className="count">{categoryCounts.child}</span>
            </button>
          </div>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>
      </div>

      {filteredPages.length === 0 ? (
        <div className="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <h3>No pages found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="pages-grid">
          {filteredPages.map((page) => (
            <Link 
              key={page.id} 
              href={`/supar-admin-panel/website-content/${page.id}`}
              className={`page-card ${page.parent ? 'child-page' : ''}`}
            >
              <div className="page-card-header">
                <div className={`page-icon ${page.parent ? 'sub-icon' : ''}`}>
                  {renderIcon(page.icon)}
                </div>
                <span className={`status-badge ${page.status}`}>{page.status}</span>
              </div>
              
              {page.parent && (
                <div className="parent-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                  {page.parent}
                </div>
              )}
              
              <h3 className="page-card-title">{page.title}</h3>
              <p className="page-card-description">{page.description}</p>
              
              <div className="page-meta">
                <div className="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>Updated: {page.lastUpdated}</span>
                </div>
                <div className="meta-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span>{page.sections.length} sections</span>
                </div>
              </div>
              
              <div className="page-card-footer">
                <span className="edit-btn">Edit Content →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}