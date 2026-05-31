import { useLanguage } from "../context/LanguageContext";
import SectionHeading from "./SectionHeading";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title={t.about.title} />
        <p className="text-center text-lg leading-relaxed text-italiano-cream/85">
          {t.about.text}
        </p>
      </div>
    </section>
  );
}
