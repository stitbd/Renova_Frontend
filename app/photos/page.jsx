import { siteConfig } from "@/constants/siteData";
import Link from "next/link";
import PhotosClient from "./PhotosClient";
import "@/styles/pages/photos.css";
import "@/styles/components/HeroSection.css";

export const metadata = {
  title: `Photo Gallery | ${siteConfig.name}`,
  description: `Explore our state-of-the-art facilities, expert medical team, and patient care moments at ${siteConfig.name}.`,
  openGraph: {
    title: `Photo Gallery | ${siteConfig.name}`,
    description: "Browse photos of our medical facilities and healthcare services.",
    url: `${siteConfig.url}/gallery`,
  },
};

// Sample gallery data with LOCAL image paths (01.jpg to 26.jpg)
const galleryData = [
  { id: 1, category: "facilities", title: "Modern Diagnostic Center", description: "State-of-the-art imaging equipment", src: "/images/photos/01.jpg", thumbnail: "/images/photos/01.jpg", date: "2024-01-15" },
  { id: 2, category: "doctors", title: "Expert Medical Team", description: "Our specialist doctors", src: "/images/photos/02.jpg", thumbnail: "/images/photos/02.jpg", date: "2024-01-20" },
  { id: 3, category: "facilities", title: "Patient Care Ward", description: "Comfortable patient rooms", src: "/images/photos/03.jpg", thumbnail: "/images/photos/03.jpg", date: "2024-02-05" },
  { id: 4, category: "equipment", title: "Advanced MRI Machine", description: "Latest imaging technology", src: "/images/photos/04.jpg", thumbnail: "/images/photos/04.jpg", date: "2024-02-10" },
  { id: 5, category: "events", title: "Health Camp 2024", description: "Community health initiative", src: "/images/photos/05.jpg", thumbnail: "/images/photos/05.jpg", date: "2024-02-15" },
  { id: 6, category: "doctors", title: "Surgical Team", description: "Expert surgeons in action", src: "/images/photos/06.jpg", thumbnail: "/images/photos/06.jpg", date: "2024-02-20" },
  { id: 7, category: "facilities", title: "Reception Area", description: "Welcoming entrance", src: "/images/photos/07.jpg", thumbnail: "/images/photos/07.jpg", date: "2024-03-01" },
  { id: 8, category: "equipment", title: "Laboratory", description: "Modern testing facilities", src: "/images/photos/08.jpg", thumbnail: "/images/photos/08.jpg", date: "2024-03-05" },
  { id: 9, category: "events", title: "Medical Conference", description: "Knowledge sharing session", src: "/images/photos/09.jpg", thumbnail: "/images/photos/09.jpg", date: "2024-03-10" },
  { id: 10, category: "doctors", title: "Pediatric Care", description: "Child-friendly environment", src: "/images/photos/10.jpg", thumbnail: "/images/photos/10.jpg", date: "2024-03-15" },
  { id: 11, category: "facilities", title: "Emergency Ward", description: "24/7 emergency services", src: "/images/photos/11.jpg", thumbnail: "/images/photos/11.jpg", date: "2024-03-20" },
  { id: 12, category: "equipment", title: "CT Scanner", description: "Advanced diagnostic imaging", src: "/images/photos/12.jpg", thumbnail: "/images/photos/12.jpg", date: "2024-03-25" },
  { id: 13, category: "facilities", title: "Pharmacy Section", description: "Well-stocked medication center", src: "/images/photos/13.jpg", thumbnail: "/images/photos/13.jpg", date: "2024-03-28" },
  { id: 14, category: "doctors", title: "Consultation Room", description: "Private patient discussions", src: "/images/photos/14.jpg", thumbnail: "/images/photos/14.jpg", date: "2024-04-01" },
  { id: 15, category: "equipment", title: "Ultrasound Machine", description: "High-resolution imaging", src: "/images/photos/15.jpg", thumbnail: "/images/photos/15.jpg", date: "2024-04-05" },
  { id: 16, category: "events", title: "Health Awareness Drive", description: "Community outreach program", src: "/images/photos/16.jpg", thumbnail: "/images/photos/16.jpg", date: "2024-04-10" },
  { id: 17, category: "facilities", title: "ICU Unit", description: "Critical care facilities", src: "/images/photos/17.jpg", thumbnail: "/images/photos/17.jpg", date: "2024-04-15" },
  { id: 18, category: "doctors", title: "Nursing Staff", description: "Compassionate care team", src: "/images/photos/18.jpg", thumbnail: "/images/photos/18.jpg", date: "2024-04-20" },
  { id: 19, category: "equipment", title: "X-Ray Department", description: "Digital radiography suite", src: "/images/photos/19.jpg", thumbnail: "/images/photos/19.jpg", date: "2024-04-25" },
  { id: 20, category: "events", title: "Doctor Training Session", description: "Continuous medical education", src: "/images/photos/20.jpg", thumbnail: "/images/photos/20.jpg", date: "2024-05-01" },
  { id: 21, category: "facilities", title: "Operation Theater", description: "Sterile surgical environment", src: "/images/photos/21.jpg", thumbnail: "/images/photos/21.jpg", date: "2024-05-05" },
  { id: 22, category: "doctors", title: "Specialist Consultation", description: "Expert medical advice", src: "/images/photos/22.jpg", thumbnail: "/images/photos/22.jpg", date: "2024-05-10" },
  { id: 23, category: "equipment", title: "Pathology Lab", description: "Advanced diagnostic testing", src: "/images/photos/23.jpg", thumbnail: "/images/photos/23.jpg", date: "2024-05-15" },
  { id: 24, category: "events", title: "Patient Appreciation Day", description: "Celebrating our community", src: "/images/photos/24.jpg", thumbnail: "/images/photos/24.jpg", date: "2024-05-20" },
  { id: 25, category: "facilities", title: "Waiting Lounge", description: "Comfortable patient area", src: "/images/photos/25.jpg", thumbnail: "/images/photos/25.jpg", date: "2024-05-25" },
  { id: 26, category: "equipment", title: "ECG Monitoring", description: "Cardiac health assessment", src: "/images/photos/26.jpg", thumbnail: "/images/photos/26.jpg", date: "2024-05-30" },
];

const CATEGORIES = [
  { id: "all", name: "All Photos", icon: "📷", count: galleryData.length },
  { id: "facilities", name: "Facilities", icon: "🏥", count: galleryData.filter(g => g.category === "facilities").length },
  { id: "doctors", name: "Doctors", icon: "👨‍⚕️", count: galleryData.filter(g => g.category === "doctors").length },
  { id: "equipment", name: "Equipment", icon: "🔬", count: galleryData.filter(g => g.category === "equipment").length },
  { id: "events", name: "Events", icon: "🎉", count: galleryData.filter(g => g.category === "events").length },
];

export default function GalleryPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero__container">
          <span className="page-hero__label">Photo Gallery</span>
          <h1 className="page-hero__title">
            Explore Our <span className="page-hero__highlight">Medical Facilities</span>
          </h1>
          <p className="page-hero__subtitle">
            A visual journey through our state-of-the-art healthcare center,
            expert medical team, and commitment to patient care.
          </p>
          <nav aria-label="Breadcrumb" className="page-hero__breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Gallery</span>
          </nav>
        </div>
      </section>

      {/* Gallery Client Component */}
      <PhotosClient initialData={galleryData} categories={CATEGORIES} />

      {/* CTA Section */}
      <section className="gallery-cta">
        <div className="page-section__container">
          <div className="cta-card">
            <h2>Want to see more?</h2>
            <p>Visit our facility or schedule a virtual tour to experience our healthcare excellence firsthand.</p>
            <div className="cta-buttons">
              <Link href="/appointment" className="btn btn-primary">
                Book a Visit
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}