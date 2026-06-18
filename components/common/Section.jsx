import { cn } from "@/lib/utils/cn";
import "../../styles/components/Section.css";

/**
 * Section — Wrapper component for page sections with consistent padding and layout.
 */
export function Section({
  id,
  children,
  className,
  bg = "white",
  variant
}) {
  return (
    <section
      id={id}
      className={cn(
        "section",
        bg === "slate" && "section--slate",
        bg === "white" && "section--white",
        bg === "green" && "section--green",
        variant === "alternate" && "section--alternate",
        className
      )}
    >
      <div className="section__container">
        {children}
      </div>
    </section>
  );
}

/**
 * SectionHeader — Header component for sections with label, title, and subtitle.
 */
export function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  titleClassName
}) {
  return (
    <div className={cn(
      "section-header",
      align === "center" && "section-header--center",
      align === "left" && "section-header--left"
    )}>
      {label && (
        <span className="section-header__label">
          <span className="section-header__label-bar" />
          {label}
        </span>
      )}
      <h2
        className={cn(
          "section-header__title",
          titleClassName
        )}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <p className="section-header__subtitle">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default Section;