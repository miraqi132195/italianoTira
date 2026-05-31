import { restaurant } from "../data/restaurant";
import { useLanguage } from "../context/LanguageContext";
import AnimateIn from "./AnimateIn";
import SectionHeading from "./SectionHeading";

export default function Gallery() {
  const { t } = useLanguage();

  return (
    <section id="gallery" className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={t.gallery.title} subtitle={t.gallery.subtitle} />
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
          {restaurant.gallery.map((src, i) => (
            <AnimateIn
              key={src}
              animation="scale-in"
              delay={i * 70}
              className={`group relative overflow-hidden rounded-2xl ${
                i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
              }`}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-italiano-green/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
