import { restaurant } from "../data/restaurant";
import { useLanguage } from "../context/LanguageContext";
import AnimateIn from "./AnimateIn";
import SectionHeading from "./SectionHeading";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title={t.about.title} />

        <AnimateIn
          animation="scale-in"
          delay={80}
          className="group relative mb-8 overflow-hidden rounded-2xl border border-italiano-cream/10 shadow-xl"
        >
          <div className="flag-accent h-1" />
          <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[5/3]">
            <img
              src={restaurant.aboutImage}
              alt={t.about.imageAlt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-italiano-green/50 via-transparent to-transparent" />
          </div>
        </AnimateIn>

        <AnimateIn animation="fade-up" delay={160}>
          <p className="text-center text-lg leading-relaxed text-italiano-cream/85">
            {t.about.text}
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
