import { Link } from "react-router-dom";
import { Dumbbell, Youtube, Mail, Instagram } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t border-border/60 bg-onyx">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
      <div className="container-luxe py-16 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5 space-y-5">
          <Link to="/" className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-gold" />
            <div className="leading-none">
              <div className="font-display text-lg tracking-[0.18em]">CHEYSON EDER</div>
              <div className="text-[10px] tracking-[0.32em] text-gold mt-0.5">FITNESS</div>
            </div>
          </Link>
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">{t.footer.tagline}</p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://www.youtube.com/@cheysonederfitness"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="h-10 w-10 inline-flex items-center justify-center rounded-full glass border border-border/60 hover:border-gold hover:text-gold transition-colors"
            >
              <Youtube className="h-4 w-4" />
            </a>
            <a
              href="mailto:cheysonederfitness@gmail.com"
              aria-label="Email"
              className="h-10 w-10 inline-flex items-center justify-center rounded-full glass border border-border/60 hover:border-gold hover:text-gold transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="h-10 w-10 inline-flex items-center justify-center rounded-full glass border border-border/60 hover:border-gold hover:text-gold transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-3">
          <h4 className="font-display text-sm tracking-[0.3em] text-gold mb-4">{t.footer.navTitle}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">{t.nav.home}</Link></li>
            <li><Link to="/programs" className="text-muted-foreground hover:text-foreground transition-colors">{t.nav.programs}</Link></li>
            <li><Link to="/offers" className="text-muted-foreground hover:text-foreground transition-colors">{t.nav.offers}</Link></li>
            <li><Link to="/assessment" className="text-muted-foreground hover:text-foreground transition-colors">{t.nav.assessment}</Link></li>
            <li><Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">{t.nav.shop}</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">{t.nav.contact}</Link></li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h4 className="font-display text-sm tracking-[0.3em] text-gold mb-4">{t.footer.followTitle}</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://www.youtube.com/@cheysonederfitness" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                youtube.com/@cheysonederfitness
              </a>
            </li>
            <li>
              <a href="mailto:cheysonederfitness@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
                cheysonederfitness@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="divider-gold" />
      <div className="container-luxe py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>© {year} Cheyson Eder Fitness. {t.footer.rights}</p>
        <ul className="flex gap-5">
          {t.footer.legal.map((label) => (
            <li key={label}><a href="#" className="hover:text-foreground transition-colors">{label}</a></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
