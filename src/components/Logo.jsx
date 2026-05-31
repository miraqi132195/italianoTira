import { restaurant } from "../data/restaurant";

export default function Logo({ className = "", size = "md", showName = false }) {
  const sizes = {
    sm: "h-12",
    md: "h-16",
    lg: "h-24",
    xl: "h-32",
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <img
        src={restaurant.logo}
        alt={restaurant.name}
        className={`${sizes[size]} w-auto max-w-[280px] object-contain drop-shadow-lg`}
      />
      {showName && (
        <span className="font-display mt-2 text-lg tracking-[0.35em] uppercase text-italiano-gold">
          {restaurant.name}
        </span>
      )}
    </div>
  );
}
