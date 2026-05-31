import { useEffect, useRef } from "react";
import { categories } from "../data/menu";
import { useLanguage } from "../context/LanguageContext";

export default function MenuCategoryTabs({ activeId, onSelect }) {
  const { lang } = useLanguage();
  const scrollRef = useRef(null);
  const activeRef = useRef(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeId]);

  return (
    <div className="sticky top-[72px] z-40 border-b border-italiano-cream/10 bg-italiano-green/95 backdrop-blur-md md:top-[80px]">
      {/* Mobile: compact horizontal strip */}
      <div
        ref={scrollRef}
        className="mx-auto max-w-6xl overflow-x-auto px-4 py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-max min-w-full justify-start gap-2" role="tablist">
          {categories.map((cat) => {
            const isActive = cat.id === activeId;
            return (
              <button
                key={cat.id}
                ref={isActive ? activeRef : null}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelect(cat.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-italiano-gold text-italiano-green shadow-sm"
                    : "border border-italiano-cream/20 bg-italiano-green-card/80 text-italiano-cream/85"
                }`}
              >
                {cat.name[lang]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop: symmetric grid */}
      <div className="mx-auto hidden max-w-6xl px-4 py-3 md:block">
        <div className="grid grid-cols-4 gap-2 lg:grid-cols-7" role="tablist">
          {categories.map((cat) => {
            const isActive = cat.id === activeId;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelect(cat.id)}
                className={`flex min-h-11 items-center justify-center rounded-xl px-2 py-2.5 text-center text-sm font-semibold leading-snug transition-all ${
                  isActive
                    ? "bg-italiano-gold text-italiano-green shadow-md ring-2 ring-italiano-gold/25"
                    : "border border-italiano-cream/15 bg-italiano-green-card/90 text-italiano-cream/90 hover:border-italiano-gold/45 hover:bg-italiano-green-card"
                }`}
              >
                <span className="line-clamp-2">{cat.name[lang]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
