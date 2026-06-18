"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import "@/styles/pages/videos.css";

/* ═══════════════════════════════════════════════════════════════
   SVG ICONS
   ═══════════════════════════════════════════════════════════════ */
const Icons = {
  Search: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),
  ArrowLeft: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m15 18-6-6 6-6" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  Play: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  PlaySmall: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  Heart: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  HeartFilled: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  Share: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  ),
  Clock: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Eye: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Volume: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  ),
  VolumeMute: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  ),
  Maximize: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  ),
};

/* ═══════════════════════════════════════════════════════════════
   VIDEO CLIENT COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function VideoClient({ initialData, categories }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const playerRef = useRef(null);

  // Filter videos based on category and search
  const filteredVideos = useMemo(() => {
    return initialData.filter((video) => {
      const matchesCategory = selectedCategory === "all" || video.category === selectedCategory;
      const matchesSearch =
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (video.doctor && video.doctor.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [initialData, selectedCategory, searchQuery]);

  // Toggle favorite
  const toggleFavorite = (id, e) => {
    e?.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  // Open video lightbox
  const openLightbox = (index) => {
    setCurrentVideoIndex(index);
    setLightboxOpen(true);
    setIsPlaying(true);
    document.body.style.overflow = "hidden";
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    setIsPlaying(false);
    setProgress(0);
    document.body.style.overflow = "";
    if (playerRef.current) {
      const iframe = playerRef.current.querySelector('iframe');
      if (iframe) {
        iframe.src = iframe.src;
      }
    }
  };

  // Navigate lightbox
  const navigateLightbox = (direction) => {
    setCurrentVideoIndex((prev) => {
      const newIndex = prev + direction;
      if (newIndex < 0) return filteredVideos.length - 1;
      if (newIndex >= filteredVideos.length) return 0;
      return newIndex;
    });
    setProgress(0);
  };

  // Handle video progress (simulated for embedded videos)
  useEffect(() => {
    let interval;
    if (isPlaying && lightboxOpen) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 0.5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, lightboxOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "ArrowRight") navigateLightbox(1);
      if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
      if (e.key === "m") setIsMuted((prev) => !prev);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, filteredVideos.length]);

  const currentVideo = filteredVideos[currentVideoIndex];
  const formatDuration = (duration) => duration;

  return (
    <section className="page-section video-section">
      <div className="page-section__container">
        {/* Controls */}
        <div className="video-controls">
          {/* Category Filter */}
          <div className="category-filter">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`category-btn ${selectedCategory === cat.id ? "active" : ""}`}
              >
                <span className="category-icon">{cat.icon}</span>
                <span className="category-name">{cat.name}</span>
                <span className="category-count">{cat.count}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="video-actions">
            <div className="search-box">
              <Icons.Search />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="video-results">
          Showing <strong>{filteredVideos.length}</strong> {filteredVideos.length === 1 ? "video" : "videos"}
          {selectedCategory !== "all" && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
        </div>

        {/* Video Grid */}
        {filteredVideos.length === 0 ? (
          <div className="video-empty">
            <div className="empty-icon">🎬</div>
            <h3>No videos found</h3>
            <p>Try adjusting your search or filter to find what you're looking for.</p>
            <button
              onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="video-grid">
            {filteredVideos.map((video, index) => (
              <div
                key={video.id}
                className="video-item"
                onClick={() => openLightbox(index)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="video-item__wrapper">
                  {/* Thumbnail */}
                  <div className="video-item__thumbnail">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="video-item__image"
                      loading="lazy"
                    />

                    {/* Play Button Overlay */}
                    <div className="video-item__play-overlay">
                      <div className="play-button">
                        <Icons.Play />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <span className="video-item__duration">
                      <Icons.Clock /> {formatDuration(video.duration)}
                    </span>

                    {/* Category Badge */}
                    <span className={`video-item__category category-${video.category}`}>
                      {categories.find(c => c.id === video.category)?.icon}
                    </span>
                  </div>

                  {/* Video Info */}
                  <div className="video-item__info">
                    <h3 className="video-item__title">{video.title}</h3>
                    <p className="video-item__desc">{video.description}</p>

                    <div className="video-item__meta">
                      {(video.doctor || video.patient) && (
                        <span className="video-item__author">
                          {video.doctor ? `👨‍⚕️ ${video.doctor}` : `💬 ${video.patient}`}
                        </span>
                      )}
                      <span className="video-item__stats">
                        <Icons.Eye /> {video.views} views
                      </span>
                    </div>

                    <div className="video-item__date">
                      {new Date(video.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  {/* Hover Actions */}
                  <div className="video-item__actions">
                    <button
                      onClick={(e) => toggleFavorite(video.id, e)}
                      className={`action-btn favorite ${favorites.includes(video.id) ? "active" : ""}`}
                      aria-label={favorites.includes(video.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      {favorites.includes(video.id) ? <Icons.HeartFilled /> : <Icons.Heart />}
                    </button>
                    <button
                      className="action-btn share"
                      aria-label="Share video"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.share?.({
                          title: video.title,
                          text: video.description,
                          url: window.location.href,
                        });
                      }}
                    >
                      <Icons.Share />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredVideos.length > 0 && filteredVideos.length < initialData.length && (
          <div className="video-load-more">
            <button className="btn btn-secondary">Load More Videos</button>
          </div>
        )}
      </div>

      {/* Video Lightbox Modal */}
      {lightboxOpen && currentVideo && (
        <div className="video-lightbox" onClick={closeLightbox}>
          <div className="video-lightbox__content" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button className="video-lightbox__close" onClick={closeLightbox} aria-label="Close video">
              <Icons.Close />
            </button>

            {/* Navigation */}
            <button
              className="video-lightbox__nav video-lightbox__nav--prev"
              onClick={() => navigateLightbox(-1)}
              aria-label="Previous video"
            >
              <Icons.ArrowLeft />
            </button>

            <button
              className="video-lightbox__nav video-lightbox__nav--next"
              onClick={() => navigateLightbox(1)}
              aria-label="Next video"
            >
              <Icons.ArrowRight />
            </button>

            {/* Video Player */}
            <div className="video-lightbox__player" ref={playerRef}>
              <iframe
                src={`${currentVideo.videoUrl}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}`}
                title={currentVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-lightbox__iframe"
              />

              {/* Custom Controls Overlay */}
              <div className="video-lightbox__controls">
                <div className="video-progress">
                  <div className="video-progress__bar" style={{ width: `${progress}%` }} />
                </div>

                <div className="video-controls-bar">
                  <button className="control-btn" onClick={() => setIsPlaying(!isPlaying)} aria-label={isPlaying ? "Pause" : "Play"}>
                    {isPlaying ? "⏸" : "▶"}
                  </button>
                  <button className="control-btn" onClick={() => setIsMuted(!isMuted)} aria-label={isMuted ? "Unmute" : "Mute"}>
                    {isMuted ? <Icons.VolumeMute /> : <Icons.Volume />}
                  </button>
                  <span className="video-time">
                    {Math.floor((progress / 100) * 10)}:{String(Math.floor(((progress / 100) * 10 * 60) % 60)).padStart(2, '0')} / {currentVideo.duration}
                  </span>
                  <div className="video-controls-spacer" />
                  <button className="control-btn" aria-label="Fullscreen">
                    <Icons.Maximize />
                  </button>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="video-lightbox__info">
              <div className="video-lightbox__meta">
                <h2 className="video-lightbox__title">{currentVideo.title}</h2>
                <p className="video-lightbox__desc">{currentVideo.description}</p>
                <div className="video-lightbox__details">
                  {(currentVideo.doctor || currentVideo.patient) && (
                    <span className="video-detail">
                      {currentVideo.doctor ? `👨‍⚕️ ${currentVideo.doctor}` : `💬 ${currentVideo.patient}`}
                    </span>
                  )}
                  <span className="video-detail"><Icons.Clock /> {currentVideo.duration}</span>
                  <span className="video-detail"><Icons.Eye /> {currentVideo.views} views</span>
                  <span className="video-detail">
                    {new Date(currentVideo.date).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="video-lightbox__actions">
                <button
                  onClick={() => toggleFavorite(currentVideo.id)}
                  className={`lightbox-action-btn ${favorites.includes(currentVideo.id) ? "active" : ""}`}
                >
                  {favorites.includes(currentVideo.id) ? <Icons.HeartFilled /> : <Icons.Heart />}
                  <span>{favorites.includes(currentVideo.id) ? "Saved" : "Save"}</span>
                </button>
                <button className="lightbox-action-btn" onClick={() => {
                  navigator.share?.({
                    title: currentVideo.title,
                    text: currentVideo.description,
                    url: window.location.href,
                  });
                }}>
                  <Icons.Share />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Related Videos Strip */}
            <div className="video-lightbox__related">
              <span className="related-label">Related Videos</span>
              <div className="related-scroll">
                {filteredVideos
                  .filter((v, i) => i !== currentVideoIndex && v.category === currentVideo.category)
                  .slice(0, 5)
                  .map((video) => (
                    <button
                      key={video.id}
                      className="related-video"
                      onClick={() => setCurrentVideoIndex(filteredVideos.findIndex(f => f.id === video.id))}
                    >
                      <img src={video.thumbnail} alt={video.title} />
                      <span className="related-video__duration">{video.duration}</span>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}