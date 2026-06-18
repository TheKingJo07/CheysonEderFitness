import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Dumbbell } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/programs", label: t.nav.programs },
    { to: "/offers", label: t.nav.offers },
    { to: "/assessment", label: t.nav.assessment },
    { to: "/shop", label: t.nav.shop },
    { to: "/contact", label: t.nav.contact },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "glass-strong py-3 border-b border-border" : "py-5 bg-transparent",
      )}
    >
      <div className="container-luxe flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 group" aria-label="Cheyson Eder Fitness">
          <div className="relative">
            <Dumbbell className="h-6 w-6 text-gold transition-transform group-hover:rotate-12" />
            <div className="absolute inset-0 blur-md bg-gold opacity-40 group-hover:opacity-70 transition-opacity" />
          </div>
          <div className="leading-none">
            <div className="font-display text-base tracking-[0.18em] text-foreground">CHEYSON EDER</div>
            <div className="text-[10px] tracking-[0.32em] text-gold mt-0.5">FITNESS</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "relative text-sm font-medium tracking-wide uppercase transition-colors",
                  "after:absolute after:left-0 after:-bottom-1.5 after:h-px after:bg-gold after:transition-all",
                  isActive
                    ? "text-gold after:w-full"
                    : "text-muted-foreground hover:text-foreground after:w-0 hover:after:w-full",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            to="/assessment"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-gold text-primary-foreground text-xs font-bold uppercase tracking-widest shadow-gold hover:scale-[1.04] active:scale-95 transition-transform"
          >
            {t.nav.cta}
          </Link>
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-[var(--mobile-top,72px)] glass-strong border-t border-border overflow-hidden transition-[max-height,opacity] duration-500",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none",
        )}
      >
        <nav className="container-luxe py-6 flex flex-col gap-4">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "text-lg font-display tracking-wide uppercase py-2 border-b border-border/40",
                  isActive ? "text-gold" : "text-foreground",
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/assessment"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-gold text-primary-foreground text-sm font-bold uppercase tracking-widest"
          >
            {t.nav.cta}
          </Link>
        </nav>
      </div>
    </header>
  );
}
