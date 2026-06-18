// components/common/Button.jsx
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import "../../styles/components/Button.css";

/**
 * Reusable Button Component
 * 
 * @param {React.ReactNode} children - Button content
 * @param {string} [href] - If provided, renders as Link; otherwise renders as button
 * @param {'primary' | 'secondary' | 'outline-white'} [variant] - Button style variant
 * @param {string} [className] - Additional CSS classes
 * @param {Object} props - Additional props passed to button/link
 * 
 * @example
 * <Button variant="primary" href="/contact">Contact Us</Button>
 * <Button variant="secondary" onClick={handleClick}>Learn More</Button>
 */
export default function Button({
  children,
  href,
  variant = "primary",
  className,
  ...props
}) {
  const baseClass = "btn";
  const variantClass = `btn-${variant}`;

  const combinedClassName = cn(baseClass, variantClass, className);

  if (href) {
    return (
      <Link href={href} className={combinedClassName} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}