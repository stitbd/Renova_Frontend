"use client";

import { useState, useMemo, useEffect } from "react";
import "@/styles/pages/photos.css";
import "@/styles/components/HeroSection.css";
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  Download,
  Share2,
  Eye,
  Building,
  Stethoscope,
  Microscope,
  Calendar,
  Camera
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   GALLERY CLIENT COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function PhotosClient({ initialData, categories }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState("grid");
  const [loadedImages, setLoadedImages] = useState(new Set());

  const filteredImages = useMemo(() => {
    return initialData.filter((image) => {
      const matchesCategory = selectedCategory === "all" || image.category === selectedCategory;
      const matchesSearch =
        image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        image.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [initialData, selectedCategory, searchQuery]);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const navigateLightbox = (direction) => {
    setCurrentImageIndex((prev) => {
      const newIndex = prev + direction;
      if (newIndex < 0) return filteredImages.length - 1;
      if (newIndex >= filteredImages.length) return 0;
      return newIndex;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, filteredImages.length]);

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => new Set(prev).add(id));
  };

  const currentImage = filteredImages[currentImageIndex];

  return (
    <section className="page-section gallery-section">
      <div className="page-section__container">
        {/* Controls */}
        <div className="gallery-controls">
          <div className="category-filter">
            {categories.map((cat) => {
              const IconComponent = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`category-btn ${selectedCategory === cat.id ? "active" : ""}`}
                >
                  <span className="category-icon"><IconComponent size={16} /></span>
                  <span className="category-name">{cat.name}</span>
                  <span className="category-count">{cat.count}</span>
                </button>
              );
            })}
          </div>

          <div className="gallery-actions">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search photos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="view-toggle">
              <button
                onClick={() => setViewMode("grid")}
                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                aria-label="Grid view"
              >
                <Grid3x3 size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="gallery-results">
          Showing <strong>{filteredImages.length}</strong> {filteredImages.length === 1 ? "photo" : "photos"}
          {selectedCategory !== "all" && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
        </div>

        {/* Gallery Grid */}
        {filteredImages.length === 0 ? (
          <div className="gallery-empty">
            <div className="empty-icon"><Camera size={48} /></div>
            <h3>No photos found</h3>
            <p>Try adjusting your search or filter to find what you're looking for.</p>
            <button
              onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={`gallery-grid ${viewMode === "masonry" ? "masonry" : ""}`}>
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className={`gallery-item ${loadedImages.has(image.id) ? "loaded" : ""}`}
                onClick={() => openLightbox(index)}
              >
                <div className="gallery-item__wrapper">
                  {!loadedImages.has(image.id) && <div className="gallery-item__skeleton" />}
                  <img
                    src={image.thumbnail}
                    alt={image.title}
                    className="gallery-item__image"
                    loading="lazy"
                    onLoad={() => handleImageLoad(image.id)}
                  />
                  <div className="gallery-item__overlay">
                    <div className="gallery-item__info">
                      <h3 className="gallery-item__title">{image.title}</h3>
                      <p className="gallery-item__desc">{image.description}</p>
                      <span className="gallery-item__date">
                        {new Date(image.date).toLocaleDateString("en-US", {
                          year: "numeric", month: "short", day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="gallery-item__actions">
                      <button className="action-btn view" aria-label="View full size">
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredImages.length > 0 && filteredImages.length < initialData.length && (
          <div className="gallery-load-more">
            <button className="btn btn-secondary">Load More Photos</button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && currentImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox__close" onClick={closeLightbox} aria-label="Close lightbox">
              <X size={24} />
            </button>

            <button className="lightbox__nav lightbox__nav--prev" onClick={() => navigateLightbox(-1)} aria-label="Previous image">
              <ChevronLeft size={24} />
            </button>
            <button className="lightbox__nav lightbox__nav--next" onClick={() => navigateLightbox(1)} aria-label="Next image">
              <ChevronRight size={24} />
            </button>

            <div className="lightbox__image-wrapper">
              <img src={currentImage.src} alt={currentImage.title} className="lightbox__image" />
            </div>

            <div className="lightbox__info">
              <div className="lightbox__meta">
                <h2 className="lightbox__title">{currentImage.title}</h2>
                <p className="lightbox__desc">{currentImage.description}</p>
                <span className="lightbox__date">
                  {new Date(currentImage.date).toLocaleDateString("en-US", {
                    weekday: "long", year: "numeric", month: "long", day: "numeric",
                  })}
                </span>
              </div>
              <div className="lightbox__actions">
                <button className="lightbox__action-btn">
                  <Download size={16} />
                  <span>Download</span>
                </button>
                <button className="lightbox__action-btn" onClick={() => {
                  navigator.share?.({
                    title: currentImage.title,
                    text: currentImage.description,
                    url: window.location.href,
                  });
                }}>
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            <div className="lightbox__thumbnails">
              {filteredImages.slice(Math.max(0, currentImageIndex - 3), currentImageIndex + 4).map((img) => (
                <button
                  key={img.id}
                  className={`lightbox__thumb ${img.id === currentImage.id ? "active" : ""}`}
                  onClick={() => setCurrentImageIndex(filteredImages.findIndex(f => f.id === img.id))}
                >
                  <img src={img.thumbnail} alt={img.title} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}