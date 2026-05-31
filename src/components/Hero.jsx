import { Link } from "react-router-dom";
import { restaurant } from "../data/restaurant";
import { useLanguage } from "../context/LanguageContext";
import Logo from "./Logo";

export default function Hero() {
  const { lang, t } = useLanguage();

  return (
    <section className="relative flex min-h-[72svh] items-center justify-center overflow-hidden pt-20 pb-8 sm:min-h-[78svh]">
      <div
        className="hero-bg-animate absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${restaurant.heroImage})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-italiano-green/85 via-italiano-green/70 to-italiano-green" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 py-6 text-center sm:py-8">
        <Logo size="xl" className="hero-animate mb-5" />

        <p className="hero-animate hero-animate-delay-1 mb-2 text-base font-medium tracking-wide text-italiano-gold sm:text-lg md:text-xl">
          {restaurant.tagline[lang]}
        </p>

        <h1 className="font-display hero-animate hero-animate-delay-2 mb-3 text-4xl leading-tight text-italiano-cream sm:text-5xl md:text-6xl">
          {t.hero.headline}
        </h1>

        <p className="hero-animate hero-animate-delay-3 mb-6 max-w-xl text-base leading-relaxed text-italiano-cream/75 sm:text-lg">
          {t.hero.subtitle}
        </p>

        <div className="hero-animate hero-animate-delay-4 flex flex-col items-center gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
          <Link
            to="/menu"
            className="group inline-flex min-w-[9.5rem] items-center justify-center gap-2 rounded-full bg-italiano-cream px-6 py-3 text-sm font-semibold tracking-wide text-italiano-green shadow-lg shadow-black/25 ring-1 ring-italiano-cream/50 transition-all duration-200 hover:-translate-y-0.5 hover:bg-italiano-cream-muted hover:shadow-xl active:translate-y-0"
          >
            <svg
              className="h-5 w-5 shrink-0 opacity-80 transition-transform group-hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            {t.hero.ctaMenu}
          </Link>
          <a
            href={restaurant.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-w-[9.5rem] items-center justify-center gap-2 rounded-full border border-italiano-cream/30 bg-italiano-green/50 px-6 py-3 text-sm font-semibold tracking-wide text-italiano-cream shadow-md shadow-black/15 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-italiano-gold/70 hover:bg-italiano-green-card/90 hover:text-italiano-gold hover:shadow-lg active:translate-y-0"
          >
            <svg
              className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110"
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
            {t.hero.ctaNavigate}
          </a>
          <a
            href={restaurant.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-w-[9.5rem] items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-lg shadow-[#25D366]/30 ring-1 ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#20bd5a] hover:shadow-xl hover:shadow-[#25D366]/40 active:translate-y-0"
          >
            <svg
              className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.89-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t.hero.ctaWhatsapp}
          </a>
        </div>
      </div>

      {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <span className="block h-8 w-5 rounded-full border-2 border-italiano-cream/30" />
      </div> */}
    </section>
  );
}
