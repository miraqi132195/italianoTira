import { useLanguage } from "../context/LanguageContext";
import AnimateIn from "./AnimateIn";

export default function MenuItemCard({ item, delay = 0 }) {
  const { lang } = useLanguage();

  return (
    <AnimateIn
      as="article"
      animation="fade-up"
      delay={delay}
      className="group overflow-hidden rounded-2xl bg-italiano-cream shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[4/3]">
        <img
          src={item.image}
          alt={item.name[lang]}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4 sm:p-5">
        <div className="mb-1.5 flex items-start justify-between gap-3 sm:mb-2">
          <h3 className="text-base font-semibold text-italiano-green sm:text-lg">{item.name[lang]}</h3>
          <span className="shrink-0 font-display text-lg text-italiano-gold sm:text-xl">
            ₪{item.price}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-italiano-green/70">
          {item.description[lang]}
        </p>
      </div>
    </AnimateIn>
  );
}
