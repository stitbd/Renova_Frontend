import { siteConfig } from "@/constants/siteData";
import Link from "next/link";
import VideoClient from "./VideoClient";
import "@/styles/pages/videos.css";
import "@/styles/components/HeroSection.css";

export const metadata = {
  title: `Video Gallery | ${siteConfig.name}`,
  description: `Watch expert medical insights, patient testimonials, procedure explanations, and health education videos at ${siteConfig.name}.`,
  openGraph: {
    title: `Video Gallery | ${siteConfig.name}`,
    description: "Educational medical videos and patient success stories.",
    url: `${siteConfig.url}/video-gallery`,
    type: "website",
  },
};

// Sample video data (replace with your CMS/database)
const videoData = [
  {
    id: 1,
    category: "procedures",
    title: "Understanding Cardiac Catheterization",
    description: "Dr. Rahman explains this minimally invasive heart procedure step-by-step.",
    thumbnail: "https://plus.unsplash.com/premium_photo-1718349374495-b1d09644f973",
    videoUrl: "https://www.youtube.com/watch?v=DO9BdjOyo9Y",
    duration: "8:45",
    views: "12.5K",
    date: "2024-03-15",
    doctor: "Dr. Fatima Rahman",
  },
  {
    id: 2,
    category: "testimonials",
    title: "Patient Success: Recovery Journey",
    description: "Mohammed shares his experience with our orthopedic care team.",
    thumbnail: "https://plus.unsplash.com/premium_photo-1729286323722-8ec789ebdfe1",
    videoUrl: "https://www.youtube.com/watch?v=uRnbKAu28Zk",
    duration: "5:20",
    views: "8.2K",
    date: "2024-03-10",
    patient: "Mohammed Ahmed",
  },
  {
    id: 3,
    category: "education",
    title: "Diabetes Management Tips",
    description: "Essential lifestyle changes for better blood sugar control.",
    thumbnail: "https://images.unsplash.com/photo-1624454002429-40ed87a5ec04",
    videoUrl: "https://www.youtube.com/watch?v=Bp3UzN8ikA8",
    duration: "12:30",
    views: "25.1K",
    date: "2024-03-05",
    doctor: "Dr. Ayesha Khan",
  },
  {
    id: 4,
    category: "procedures",
    title: "Laparoscopic Surgery Explained",
    description: "How minimally invasive surgery reduces recovery time.",
    thumbnail: "https://images.unsplash.com/photo-1664902273556-600a6e50beda",
    videoUrl: "https://www.youtube.com/watch?v=PqFtJnSPDdc",
    duration: "10:15",
    views: "18.7K",
    date: "2024-02-28",
    doctor: "Dr. Kamal Uddin",
  },
  {
    id: 5,
    category: "events",
    title: "Annual Health Camp Highlights",
    description: "Free screenings and consultations for our community.",
    thumbnail: "https://plus.unsplash.com/premium_photo-1753788347314-d793ee6bb8d7",
    videoUrl: "https://www.youtube.com/watch?v=Re6Y0P0Yl94",
    duration: "6:40",
    views: "5.3K",
    date: "2024-02-20",
  },
  {
    id: 6,
    category: "education",
    title: "Understanding Hypertension",
    description: "Causes, symptoms, and prevention strategies explained.",
    thumbnail: "https://plus.unsplash.com/premium_photo-1673958771843-12c73b278bd0",
    videoUrl: "https://www.youtube.com/watch?v=OmKVteeuQj0",
    duration: "9:55",
    views: "31.2K",
    date: "2024-02-15",
    doctor: "Dr. Nusrat Jahan",
  },
  {
    id: 7,
    category: "testimonials",
    title: "Maternity Care Experience",
    description: "A new mother shares her journey with our OB-GYN team.",
    thumbnail: "https://plus.unsplash.com/premium_photo-1681826183557-9133034685d1",
    videoUrl: "https://www.youtube.com/watch?v=YBN5MIACQv0",
    duration: "7:10",
    views: "9.8K",
    date: "2024-02-10",
    patient: "Sadia Islam",
  },
  {
    id: 8,
    category: "procedures",
    title: "Endoscopy: What to Expect",
    description: "Preparation, procedure, and aftercare guidance.",
    thumbnail: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800",
    videoUrl: "https://www.youtube.com/watch?v=SBwEp2-g5S4",
    duration: "11:20",
    views: "14.6K",
    date: "2024-02-05",
    doctor: "Dr. Tahmid Hassan",
  },
  {
    id: 9,
    category: "education",
    title: "Mental Health Awareness",
    description: "Breaking stigma and seeking help for mental wellness.",
    thumbnail: "https://images.unsplash.com/photo-1604480132736-44c188fe4d20",
    videoUrl: "https://www.youtube.com/watch?v=cfohqU6JqWA",
    duration: "13:45",
    views: "42.1K",
    date: "2024-01-30",
    doctor: "Dr. Farzana Akter",
  },
  {
    id: 10,
    category: "events",
    title: "Medical Conference 2024",
    description: "Key highlights from our annual specialist gathering.",
    thumbnail: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
    videoUrl: "https://www.youtube.com/watch?v=ageot5o-emg",
    duration: "15:30",
    views: "3.2K",
    date: "2024-01-25",
  },
  {
    id: 11,
    category: "testimonials",
    title: "Pediatric Care Success",
    description: "Parents share their child's recovery story.",
    thumbnail: "https://plus.unsplash.com/premium_photo-1666299797563-1d4283fa93a2",
    videoUrl: "https://www.youtube.com/watch?v=ejpn5OmolGY",
    duration: "6:15",
    views: "7.4K",
    date: "2024-01-20",
    patient: "The Rahman Family",
  },
  {
    id: 12,
    category: "education",
    title: "Nutrition for Heart Health",
    description: "Dietary recommendations from our cardiologists.",
    thumbnail: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
    videoUrl: "https://www.youtube.com/watch?v=TDS7Lq2g3CE",
    duration: "10:50",
    views: "28.9K",
    date: "2024-01-15",
    doctor: "Dr. Rafiqul Islam",
  },
];

const CATEGORIES = [
  { id: "all", name: "All Videos", icon: "🎬", count: videoData.length },
  { id: "procedures", name: "Procedures", icon: "⚕️", count: videoData.filter(v => v.category === "procedures").length },
  { id: "testimonials", name: "Testimonials", icon: "💬", count: videoData.filter(v => v.category === "testimonials").length },
  { id: "education", name: "Health Education", icon: "📚", count: videoData.filter(v => v.category === "education").length },
  { id: "events", name: "Events", icon: "🎉", count: videoData.filter(v => v.category === "events").length },
];

export default function VideoGalleryPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero__container">
          <span className="page-hero__label">Video Library</span>
          <h1 className="page-hero__title">
            Watch & Learn: <span className="page-hero__highlight">Medical Videos</span>
          </h1>
          <p className="page-hero__subtitle">
            Expert insights, patient stories, and health education — all in one place.
            Empowering you with knowledge for better health decisions.
          </p>
          <nav aria-label="Breadcrumb" className="page-hero__breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Video Gallery</span>
          </nav>
        </div>
      </section>

      {/* Video Gallery Client Component */}
      <VideoClient initialData={videoData} categories={CATEGORIES} />

      {/* CTA Section */}
      <section className="video-cta">
        <div className="page-section__container">
          <div className="cta-card">
            <h2>Have a health question?</h2>
            <p>Our medical team is ready to help. Schedule a consultation to discuss your concerns with an expert.</p>
            <div className="cta-buttons">
              <Link href="/appointment" className="btn btn-primary">
                Book Consultation
              </Link>
              <Link href="/video-gallery#education" className="btn btn-secondary">
                Browse Health Tips
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}