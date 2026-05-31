import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";

export default function Navbar() {
  const { t } = useLanguage();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const links = [
    { to: "/", label: t.nav.home, hash: null },
    { to: "/menu", label: t.nav.menu, hash: null },
    ...(isHome
      ? [
          { to: "/#about", label: t.nav.about, hash: "about" },
          { to: "/#gallery", label: t.nav.gallery, hash: "gallery" },
          { to: "/#contact", label: t.nav.contact, hash: "contact" },
        ]
      : []),
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-italiano-cream/10 bg-italiano-green/90 backdrop-blur-md">
      <div className="flag-accent h-0.5 w-full" />
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="shrink-0">
          <Logo size="sm" />
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                className="text-sm font-medium text-italiano-cream/80 transition-colors hover:text-italiano-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <LanguageSwitcher />
      </nav>
    </header>
  );
}
