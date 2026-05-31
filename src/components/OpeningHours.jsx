import { restaurant } from "../data/restaurant";
import { useLanguage } from "../context/LanguageContext";
import SectionHeading from "./SectionHeading";

export default function OpeningHours() {
  const { lang, t } = useLanguage();

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-lg">
        <SectionHeading title={t.hours.title} subtitle={t.hours.subtitle} />
        <div className="overflow-hidden rounded-2xl border border-italiano-cream/10 bg-italiano-green-card shadow-xl">
          <div className="flag-accent h-1" />
          <ul className="divide-y divide-italiano-cream/10">
            {restaurant.openingHours.map((row) => (
              <li
                key={row.day.he}
                className="flex items-center justify-between px-6 py-4"
              >
                <span className="font-medium text-italiano-cream">
                  {row.day[lang]}
                </span>
                <span className="text-italiano-gold">{row.hours[lang]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
