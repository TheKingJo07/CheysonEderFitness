import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import heroImg from "@/assets/hero-coach.jpg";

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt=""
          className="w-full h-full object-cover object-[60%_center] opacity-55"
          width={1280}
          height={1600}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/70" />
        <div className="absolute inset-0 bg-radial-gold opacity-70" />
      </div>

      {/* Decorative floating dumbbells */}
      <div className="absolute top-32 right-20 hidden lg:block opacity-20 animate-float" style={{ animationDelay: "0s" }}>
        <div className="h-32 w-32 rounded-full border border-gold/40 bg-radial-gold blur-xl" />
      </div>
      <div className="absolute bottom-32 left-20 hidden lg:block opacity-20 animate-float" style={{ animationDelay: "2s" }}>
        <div className="h-48 w-48 rounded-full border border-accent/30 blur-2xl" />
      </div>

      <div className="container-luxe relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8 animate-fade-up">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass border border-gold/30 text-[11px] tracking-[0.32em] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-glow" />
            <span className="text-gold">{t.hero.eyebrow}</span>
          </div>

          <h1 className="font-display leading-[0.88] tracking-tight">
            <span className="block text-[clamp(3rem,9vw,7.5rem)] text-foreground">
              {t.hero.title1}
            </span>
            <span className="block text-[clamp(3rem,9vw,7.5rem)] text-gradient-gold">
              {t.hero.title2}
            </span>
            <span className="block text-[clamp(3rem,9vw,7.5rem)] text-stroke">
              {t.hero.title3}
            </span>
          </h1>

          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-gold" />
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{t.hero.subtitle}</p>
          </div>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
            {t.hero.description}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/assessment"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gradient-gold text-primary-foreground text-sm font-bold uppercase tracking-widest shadow-gold hover:scale-[1.04] active:scale-95 transition-transform"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/programs"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full glass border border-border hover:border-gold text-foreground text-sm font-bold uppercase tracking-widest transition-colors"
            >
              <Play className="h-4 w-4 text-gold" />
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* Right column: stat cards stacked */}
        <div className="lg:col-span-5 hidden lg:block">
          <div className="space-y-4 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <div className="glass-strong rounded-2xl p-6 border border-border/60 hover-lift">
              <div className="text-[11px] uppercase tracking-[0.3em] text-gold mb-2">10 ans</div>
              <div className="font-display text-2xl">d'expérience terrain</div>
              <p className="text-sm text-muted-foreground mt-2">
                Méthode affinée sur des centaines de clients réels.
              </p>
            </div>
            <div className="glass-strong rounded-2xl p-6 border border-border/60 hover-lift ml-8">
              <div className="text-[11px] uppercase tracking-[0.3em] text-accent mb-2">95% de réussite</div>
              <div className="font-display text-2xl">objectifs atteints</div>
              <p className="text-sm text-muted-foreground mt-2">
                Mesurés à 90 jours sur les transformations physiques.
              </p>
            </div>
            <div className="glass-strong rounded-2xl p-6 border border-border/60 hover-lift">
              <div className="text-[11px] uppercase tracking-[0.3em] text-gold mb-2">Premium</div>
              <div className="font-display text-2xl">suivi sur-mesure</div>
              <p className="text-sm text-muted-foreground mt-2">
                WhatsApp, appels, vidéos, plans nutrition personnalisés.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-[10px] tracking-[0.4em] uppercase text-muted-foreground animate-float">
        <span>{t.hero.scroll}</span>
        <div className="h-10 w-px bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}
