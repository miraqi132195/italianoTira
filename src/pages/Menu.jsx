import { useEffect, useMemo, useState } from "react";
import { categories, menuItems } from "../data/menu";
import { useLanguage } from "../context/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BottomActionBar from "../components/BottomActionBar";
import MenuCategoryTabs from "../components/MenuCategoryTabs";
import MenuItemCard from "../components/MenuItemCard";
import SectionHeading from "../components/SectionHeading";
import AnimateIn from "../components/AnimateIn";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [breakpoint]);

  return isMobile;
}

export default function Menu() {
  const { lang, t } = useLanguage();
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return menuItems.filter((item) => {
      const name = item.name[lang].toLowerCase();
      const desc = item.description[lang].toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }, [search, lang]);

  const visibleCategories = useMemo(() => {
    if (search || !isMobile) return categories;
    return categories.filter((cat) => cat.id === activeCategory);
  }, [search, isMobile, activeCategory]);

  useEffect(() => {
    if (isMobile || search) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id.replace("cat-", ""));
          }
        });
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0 }
    );

    categories.forEach((cat) => {
      const el = document.getElementById(`cat-${cat.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isMobile, search]);

  const selectCategory = (id) => {
    setActiveCategory(id);
    if (isMobile && !search) {
      document.getElementById("menu-items")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: "smooth" });
  };

  const activeCategoryName =
    categories.find((c) => c.id === activeCategory)?.name[lang] ?? "";

  return (
    <>
      <Navbar showBack />
      <main className="pb-24 pt-20 md:pb-8 md:pt-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeading
            title={t.menu.title}
            subtitle={t.menu.subtitle}
            className="pt-4 md:pt-6"
          />

          <AnimateIn animation="fade-up" delay={120} className="mb-4 md:mb-6">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.menu.search}
              className="w-full rounded-full border border-italiano-cream/20 bg-italiano-green-card px-5 py-2.5 text-italiano-cream placeholder:text-italiano-cream/40 focus:border-italiano-gold focus:outline-none md:px-6 md:py-3"
            />
          </AnimateIn>
        </div>

        {!search && (
          <MenuCategoryTabs activeId={activeCategory} onSelect={selectCategory} />
        )}

        <div id="menu-items" className="mx-auto max-w-6xl scroll-mt-[7.5rem] px-4 pt-3 md:scroll-mt-52 md:pt-8">
          {search ? (
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {filtered.length > 0 ? (
                filtered.map((item, i) => (
                  <MenuItemCard key={item.id} item={item} delay={i * 60} />
                ))
              ) : (
                <p className="col-span-full py-12 text-center text-italiano-cream/60">
                  {t.menu.noResults}
                </p>
              )}
            </div>
          ) : (
            <>
              {isMobile && (
                <h2 className="font-display mb-3 text-xl text-italiano-gold md:hidden">
                  {activeCategoryName}
                </h2>
              )}
              {visibleCategories.map((cat) => {
                const items = menuItems.filter((i) => i.categoryId === cat.id);
                if (!items.length) return null;
                return (
                  <section
                    key={cat.id}
                    id={`cat-${cat.id}`}
                    className="mb-10 md:mb-16"
                  >
                    <h2 className="font-display mb-4 hidden text-2xl text-italiano-gold md:mb-6 md:block">
                      {cat.name[lang]}
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                      {items.map((item, i) => (
                        <MenuItemCard key={item.id} item={item} delay={i * 60} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </>
          )}
        </div>
      </main>
      <Footer />
      <BottomActionBar />
    </>
  );
}
