import { cn } from "@/lib/utils/utils";
import "../../styles/components/Card.css";

/**
 * Card — Base card component with hover elevation.
 */
export function Card({ children, className, hover = true, ...props }) {
  return (
    <div
      className={cn(
        "card",
        hover && "card--hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}


export function ServiceCard({
  title,
  description,
  icon: Icon,
  color = "#428a26",
  href
}) {
  const iconBg = `${color}15`; // 15 = ~9% opacity in hex

  return (
    <a
      href={href}
      className={cn(
        "service-card",
        "group"
      )}
      style={{ '--service-color': color, '--service-bg': iconBg }}
    >
      {/* Icon */}
      <div className="service-card__icon">
        <div className="service-card__icon-bg" />
      </div>

      {/* Content */}
      <div className="service-card__content">
        <h3 className="service-card__title">{title}</h3>
        <p className="service-card__description">{description}</p>
      </div>

      {/* CTA Arrow */}
      <div className="service-card__cta">
        <span>Learn More</span>
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
          className="service-card__arrow"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </a>
  );
}



/**
 * DoctorCard — Card for displaying a doctor profile.
 */
export function DoctorCard({
  name,
  specialty,
  qualification,
  experience,
  available,
  rating,
  patients,
  image
}) {
  return (
    <div className="doctor-card group">
      {/* Image Section */}
      <div className="doctor-card__image">
        <div className="doctor-card__image-placeholder">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#428a26"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="doctor-card__avatar-icon"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>

        {/* Availability Badge */}
        {available && (
          <div className="doctor-card__badge">
            <span className="doctor-card__badge-dot" aria-hidden="true" />
            <span className="doctor-card__badge-text">Available</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="doctor-card__content">
        <div className="doctor-card__header">
          <h3 className="doctor-card__name">{name}</h3>
          <div className="doctor-card__rating">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="doctor-card__star"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="doctor-card__rating-value">{rating}</span>
          </div>
        </div>

        <p className="doctor-card__specialty">{specialty}</p>
        <p className="doctor-card__qualification">{qualification}</p>

        <div className="doctor-card__meta">
          <span>{experience} Exp.</span>
          <span>{patients} Patients</span>
        </div>

        <a
          href="/appointment"
          className="doctor-card__cta"
          aria-label={`Book appointment with ${name}`}
        >
          Book Appointment
        </a>
      </div>
    </div>
  );
}



/**
 * TestimonialCard — Card for patient reviews.
 */
export function TestimonialCard({
  name,
  location,
  rating,
  review,
  service,
  index = 0
}) {
  const stars = Array.from({ length: 5 }, (_, i) => i < rating);

  return (
    <div className={cn("testimonial-card", "h-full")}>
      {/* Stars */}
      <div className="testimonial-card__stars" role="img" aria-label={`${rating} out of 5 stars`}>
        {stars.map((filled, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={filled ? "#f59e0b" : "none"}
            stroke="#f59e0b"
            strokeWidth="2"
            aria-hidden="true"
            className={cn("testimonial-card__star", !filled && "testimonial-card__star--empty")}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="testimonial-card__quote">
        &ldquo;{review}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="testimonial-card__author">
        <div className="testimonial-card__avatar">
          <span className="testimonial-card__avatar-initial" aria-hidden="true">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="testimonial-card__name">{name}</p>
          <p className="testimonial-card__meta">{location} · {service}</p>
        </div>
      </div>
    </div>
  );
}



/**
 * BlogCard — Card for blog/news posts.
 */
export function BlogCard({
  title,
  excerpt,
  category,
  date,
  readTime,
  author,
  href
}) {
  return (
    <a
      href={href}
      className={cn("blog-card", "group")}
      aria-label={`Read article: ${title}`}
    >
      {/* Image Placeholder */}
      <div className="blog-card__image">
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
          aria-hidden="true"
          className="blog-card__image-icon"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
        <span className="blog-card__category">{category}</span>
      </div>

      {/* Content */}
      <div className="blog-card__content">
        <div className="blog-card__meta">
          <span>{date}</span>
          <span className="blog-card__meta-separator">·</span>
          <span>{readTime}</span>
        </div>

        <h3 className="blog-card__title">{title}</h3>
        <p className="blog-card__excerpt">{excerpt}</p>

        <div className="blog-card__cta">
          <span>Read More</span>
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
            className="blog-card__arrow"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
}

export default BlogCard;