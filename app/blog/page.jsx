import Link from "next/link";
import { siteConfig, blogs } from "@/constants/siteData";
import Image from "next/image";
import "@/styles/pages/blog.css";
import "@/styles/components/HeroSection.css";
import { Stethoscope, ArrowRight } from "lucide-react";

export const metadata = {
  title: `Health Blog | ${siteConfig.name}`,
  description: `Health tips, expert medical articles, and wellness guides from the specialist team at ${siteConfig.name} — written in easy-to-understand language.`,
  openGraph: {
    title: `Health Blog | ${siteConfig.name}`,
    description: `Expert health articles and wellness tips from ${siteConfig.name}'s medical team.`,
    url: `${siteConfig.url}/blog`,
  },
};

export default function BlogPage() {
  const categories = [
    "All", "Cardiology", "Neurology", "Orthopedics",
    "Pediatrics", "Dental Care", "Nutrition", "Mental Health",
  ];

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero__container">
          <span className="page-hero__label">Health Insights</span>
          <h1 className="page-hero__title">
            Our <span className="page-hero__highlight">Health Blog</span>
          </h1>
          <p className="page-hero__subtitle">
            Expert articles, wellness tips, and health guides from our team of specialist doctors — written for everyone.
          </p>
          <nav aria-label="Breadcrumb" className="page-hero__breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Blog</span>
          </nav>
        </div>
      </section>

      {/* Category Filter */}
      <section className="page-section page-section--white" style={{ paddingBottom: 0 }}>
        <div className="page-section__container">
          <div className="page-blog-categories">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`page-blog-cat-btn${i === 0 ? " active" : ""}`}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts (reused) */}
      <section className="page-section page-section--white">
        <div className="page-section__container">
          <div className="blog-grid">
            {blogs.map((post) => (
              <Link
                key={post.id}
                href={post.href}
                className="blog-card"
              >
                {/* Image Container */}
                <div className="blog-image-container">
                  <Image
                    src={`/images/blog/image${post.id}.jpg`}
                    alt={post.title}
                    fill
                    className="blog-image"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Fallback Icon */}
                  <div className="blog-fallback" aria-hidden="true">
                    <Stethoscope size={48} color="#428a26" strokeWidth={1} />
                  </div>
                  <div className="blog-category-badge">
                    <span className="blog-category">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="blog-content">
                  <div className="blog-meta">
                    <span>{post.date}</span>
                    <span className="blog-meta-separator">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="blog-title">
                    {post.title}
                  </h3>
                  <p className="blog-excerpt">
                    {post.excerpt}
                  </p>
                  <div className="blog-read-more">
                    Read More
                    <ArrowRight size={14} className="blog-read-more-icon" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="page-section page-section--green">
        <div className="page-section__container page-cta-center">
          <span className="page-section__label">Stay Updated</span>
          <h2 className="page-cta-title">Subscribe to Our Health Newsletter</h2>
          <p className="page-cta-subtitle">
            Get the latest health tips and medical news delivered straight to your inbox every week.
          </p>
          <form className="page-newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
              className="page-newsletter-input"
              aria-label="Email address"
              required
            />
            <button type="submit" className="page-cta-btn">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}