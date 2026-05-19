"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { blogs } from "@/constants/siteData";
import { Section, SectionHeader } from "@/components/common/Section";
import "./BlogSection.css";

// Animation variants - Same as AboutSection
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function BlogSection() {
  return (
    <Section id="blog" variant="alternate">
      
      {/* Section Header with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeader
          label="Health Insights"
          title="Stay Informed,  <span class='section-heading-accent'>Stay Healthy</span>"
          subtitle="Expert articles and health tips from our specialist team — written in easy-to-understand language."
        />
      </motion.div>

      {/* Blog Grid with Staggered Card Animations */}
      <div className="blog-grid">
        {blogs.map((post, index) => (
          <motion.div
            key={post.id}
            className="blog-card-wrapper"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={post.href} className="blog-card">
              
              {/* Image Container with Subtle Reveal */}
              <motion.div 
                className="blog-image-container"
                initial={{ opacity: 0.9 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.1 }}
              >
                <Image
                  src={`/images/blog/image${post.id}.jpg`}
                  alt={post.title}
                  fill
                  className="blog-image"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Fallback Icon */}
                <div className="blog-fallback" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#428a26"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                {/* Category Badge with Slide-in */}
                <motion.div 
                  className="blog-category-badge"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <span className="blog-category">{post.category}</span>
                </motion.div>
              </motion.div>
              
              {/* Content with Staggered Text Animations */}
              <div className="blog-content">
                <motion.div 
                  className="blog-meta"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.15 }}
                >
                  <span>{post.date}</span>
                  <span className="blog-meta-separator">·</span>
                  <span>{post.readTime}</span>
                </motion.div>
                
                <motion.h3 
                  className="blog-title"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {post.title}
                </motion.h3>
                
                <motion.p 
                  className="blog-excerpt"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.25 }}
                >
                  {post.excerpt}
                </motion.p>
                
                <motion.div 
                  className="blog-read-more"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ x: 4 }}
                >
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="blog-read-more-icon"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Read All Articles Button with Animation */}
      <motion.div 
        className="blog-view-all"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Link href="/blog" className="btn btn-primary blog-cta-btn">
          Read All Articles
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </motion.div>
    </Section>
  );
}