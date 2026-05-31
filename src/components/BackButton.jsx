import { Link } from "react-router-dom";

export default function BackButton({ label, className = "" }) {
  return (
    <Link
      to="/"
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border border-italiano-cream/20 bg-italiano-green-card/80 px-4 py-2 text-sm font-medium text-italiano-cream backdrop-blur-sm transition-all hover:border-italiano-gold/50 hover:bg-italiano-green-light ${className}`}
    >
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {label}
    </Link>
  );
}
