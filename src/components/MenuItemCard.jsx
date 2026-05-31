import { useLanguage } from "../context/LanguageContext";

export default function MenuItemCard({ item }) {
  const { lang, t } = useLanguage();

  return (
    <article className="group overflow-hidden rounded-2xl bg-italiano-cream shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[4/3]">
        <img
          src={item.image}
          alt={item.name[lang]}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.recommended && (
          <span className="absolute top-3 start-3 rounded-full bg-flag-red px-3 py-1 text-xs font-bold text-white shadow">
            {t.menu.recommended}
          </span>
        )}
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
    </article>
  );
}
