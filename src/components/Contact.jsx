import { restaurant } from "../data/restaurant";
import { useLanguage } from "../context/LanguageContext";
import AnimateIn from "./AnimateIn";
import SectionHeading from "./SectionHeading";

function ContactIcon({ children, className = "" }) {
  return (
    <span
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-italiano-green/60 ring-1 ring-italiano-gold/25 ${className}`}
    >
      {children}
    </span>
  );
}

function SocialButton({ href, label, children, variant = "outline" }) {
  const styles =
    variant === "whatsapp"
      ? "bg-[#25D366] text-white hover:bg-[#20bd5a] ring-white/20"
      : "border border-italiano-cream/25 bg-italiano-green/40 text-italiano-cream hover:border-italiano-gold/60 hover:text-italiano-gold";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`inline-flex h-12 w-12 items-center justify-center rounded-full shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${styles}`}
    >
      {children}
    </a>
  );
}

export default function Contact() {
  const { lang, t } = useLanguage();

  return (
    <section id="contact" className="px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title={t.contact.title} subtitle={t.contact.subtitle} />

        <AnimateIn animation="fade-up" delay={80}>
          <div className="overflow-hidden rounded-2xl border border-italiano-cream/10 bg-italiano-green-card shadow-xl">
            <div className="flag-accent h-1" />

            <div className="grid lg:grid-cols-5">
              <div className="flex flex-col gap-6 p-6 sm:p-8 lg:col-span-2">
                <a
                  href={restaurant.phoneLink}
                  className="group flex items-center gap-4 transition-colors"
                >
                  <ContactIcon>
                    <svg
                      className="h-5 w-5 text-italiano-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </ContactIcon>
                  <div className="min-w-0 text-start">
                    <p className="text-xs font-medium tracking-wider text-italiano-cream/50 uppercase">
                      {t.contact.phone}
                    </p>
                    <p className="text-xl font-semibold text-italiano-gold transition-colors group-hover:text-italiano-cream">
                      {restaurant.phone}
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <ContactIcon>
                    <svg
                      className="h-5 w-5 text-italiano-gold"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </ContactIcon>
                  <div className="min-w-0 text-start">
                    <p className="text-xs font-medium tracking-wider text-italiano-cream/50 uppercase">
                      {t.contact.address}
                    </p>
                    <p className="text-lg text-italiano-cream">{restaurant.address[lang]}</p>
                  </div>
                </div>

                <div className="border-t border-italiano-cream/10 pt-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <SocialButton
                      href={restaurant.whatsapp}
                      label={t.contact.whatsapp}
                      variant="whatsapp"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.89-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </SocialButton>
                    <SocialButton href={restaurant.instagram} label={t.contact.instagram}>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </SocialButton>
                    <SocialButton href={restaurant.googleMaps} label={t.contact.map}>
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </SocialButton>
                  </div>
                </div>
              </div>

              <div className="relative min-h-64 border-t border-italiano-cream/10 sm:min-h-72 lg:col-span-3 lg:min-h-[320px] lg:border-t-0 lg:border-s lg:border-italiano-cream/10">
                <iframe
                  title={t.contact.map}
                  src={restaurant.googleMapsEmbed}
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <a
                  href={restaurant.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 start-4 rounded-full border border-italiano-cream/20 bg-italiano-green/90 px-4 py-2 text-xs font-semibold text-italiano-cream backdrop-blur-md transition-colors hover:border-italiano-gold hover:text-italiano-gold"
                >
                  {t.contact.map}
                </a>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
