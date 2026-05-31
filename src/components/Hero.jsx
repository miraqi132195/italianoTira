import { Link } from "react-router-dom";
import { restaurant } from "../data/restaurant";
import { useLanguage } from "../context/LanguageContext";
import Logo from "./Logo";

export default function Hero() {
  const { lang, t } = useLanguage();

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${restaurant.heroImage})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-italiano-green/85 via-italiano-green/70 to-italiano-green" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 py-16 text-center">
        <Logo size="xl" className="mb-8" />

        <p className="mb-4 text-base font-medium tracking-wide text-italiano-gold sm:text-lg md:text-xl">
          {restaurant.tagline[lang]}
        </p>

        <h1 className="font-display mb-6 text-4xl leading-tight text-italiano-cream sm:text-5xl md:text-6xl">
          {t.hero.headline}
        </h1>

        <p className="mb-10 max-w-xl text-base leading-relaxed text-italiano-cream/75 sm:text-lg">
          {t.hero.subtitle}
        </p>

        <div className="flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <Link
            to="/menu"
            className="rounded-full bg-italiano-cream px-8 py-4 text-center text-sm font-semibold text-italiano-green shadow-lg transition-all hover:bg-italiano-cream-muted hover:shadow-xl"
          >
            {t.hero.ctaMenu}
          </Link>
          <a
            href={restaurant.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-italiano-cream/40 px-8 py-4 text-center text-sm font-semibold text-italiano-cream backdrop-blur-sm transition-all hover:border-italiano-gold hover:bg-italiano-green-card"
          >
            {t.hero.ctaNavigate}
          </a>
          <a
            href={restaurant.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-flag-green px-8 py-4 text-center text-sm font-semibold text-white shadow-lg transition-all hover:brightness-110"
          >
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
