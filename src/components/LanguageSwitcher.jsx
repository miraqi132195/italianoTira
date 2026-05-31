import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher({ className = "" }) {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      className={`inline-flex items-center gap-2 rounded-full border border-italiano-cream/20 bg-italiano-green-card/80 px-4 py-2 text-sm font-medium text-italiano-cream backdrop-blur-sm transition-all hover:border-italiano-gold/50 hover:bg-italiano-green-light ${className}`}
      aria-label={`Switch to ${t.switchTo}`}
    >
      <span className="h-1.5 w-8 rounded-full flag-accent" aria-hidden />
      <span className={lang === "he" ? "text-italiano-gold" : "text-italiano-cream/70"}>
        עברית
      </span>
      <span className="text-italiano-cream/30">|</span>
      <span className={lang === "ar" ? "text-italiano-gold" : "text-italiano-cream/70"}>
        العربية
      </span>
    </button>
  );
}
