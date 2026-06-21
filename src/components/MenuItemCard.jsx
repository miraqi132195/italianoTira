import { useLanguage } from "../context/LanguageContext";

function formatPrice(item) {
  if (item.priceLabel) return item.priceLabel;
  if (item.price != null) return String(item.price);
  return null;
}

export default function MenuItemCard({ item }) {
  const { lang } = useLanguage();
  const priceText = formatPrice(item);

  return (
    <article className="overflow-hidden rounded-2xl bg-italiano-cream shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[4/3]">
        <img
          src={item.image}
          alt={item.name[lang]}
          loading="lazy"
          className="h-full w-full object-cover object-center"
        />
        {priceText ? (
          <span className="absolute bottom-3 end-3 rounded-xl bg-italiano-green px-3.5 py-1.5 font-display text-xl font-bold tracking-wide text-italiano-cream shadow-lg ring-2 ring-italiano-gold/40 sm:bottom-4 sm:end-4 sm:px-4 sm:py-2 sm:text-2xl">
            ₪{priceText}
          </span>
        ) : null}
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="text-base font-semibold leading-snug text-italiano-green sm:text-lg">
          {item.name[lang]}
        </h3>
        {item.description[lang] ? (
          <p className="mt-1.5 text-sm leading-relaxed text-italiano-green/70 sm:mt-2">
            {item.description[lang]}
          </p>
        ) : null}
      </div>
    </article>
  );
}
