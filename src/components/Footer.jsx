import { restaurant } from "../data/restaurant";
import { useLanguage } from "../context/LanguageContext";
import Logo from "./Logo";

export default function Footer() {
  const { lang, t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-italiano-cream/10 px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <Logo size="md" />
        <div className="flex gap-6">
          <a
            href={restaurant.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-italiano-cream/70 transition-colors hover:text-italiano-gold"
            aria-label="Instagram"
          >
            Instagram
          </a>
          <a
            href={restaurant.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-italiano-cream/70 transition-colors hover:text-italiano-gold"
            aria-label="WhatsApp"
          >
            WhatsApp
          </a>
          <a
            href={restaurant.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="text-italiano-cream/70 transition-colors hover:text-italiano-gold"
            aria-label="Maps"
          >
            Maps
          </a>
        </div>
        <p className="text-sm text-italiano-cream/50">{restaurant.address[lang]}</p>
        <p className="text-xs text-italiano-cream/40">
          © {year} {restaurant.name}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
