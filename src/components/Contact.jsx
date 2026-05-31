import { restaurant } from "../data/restaurant";
import { useLanguage } from "../context/LanguageContext";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  const { lang, t } = useLanguage();

  return (
    <section id="contact" className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={t.contact.title} subtitle={t.contact.subtitle} />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-2xl border border-italiano-cream/10 bg-italiano-green-card p-6">
              <p className="mb-1 text-sm text-italiano-cream/50">{t.contact.phone}</p>
              <a
                href={restaurant.phoneLink}
                className="text-xl font-semibold text-italiano-gold hover:underline"
              >
                {restaurant.phone}
              </a>
            </div>

            <div className="rounded-2xl border border-italiano-cream/10 bg-italiano-green-card p-6">
              <p className="mb-1 text-sm text-italiano-cream/50">{t.contact.address}</p>
              <p className="text-lg text-italiano-cream">{restaurant.address[lang]}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={restaurant.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full bg-flag-green py-4 text-center font-semibold text-white transition-all hover:brightness-110"
              >
                {t.contact.whatsapp}
              </a>
              <a
                href={restaurant.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full border border-italiano-cream/30 py-4 text-center font-semibold text-italiano-cream transition-all hover:border-italiano-gold"
              >
                {t.contact.instagram}
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-italiano-cream/10 shadow-xl">
            <iframe
              title={t.contact.map}
              src={restaurant.googleMapsEmbed}
              className="h-72 w-full grayscale-[30%] contrast-[1.1] lg:h-full lg:min-h-[320px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
