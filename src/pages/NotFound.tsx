import { Link } from "react-router-dom";
import { Dumbbell, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-radial-gold pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,oklch(0.62_0.28_22/0.18),transparent_55%)]" />
      <div className="relative text-center max-w-2xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="relative animate-float">
            <Dumbbell className="h-24 w-24 text-gold" />
            <div className="absolute inset-0 blur-3xl bg-gold opacity-40" />
          </div>
        </div>
        <h1 className="font-display text-[clamp(6rem,18vw,12rem)] leading-none text-stroke">
          {t.notFound.title}
        </h1>
        <p className="font-display text-2xl md:text-4xl tracking-wide text-gradient-gold mt-4">
          {t.notFound.heading}
        </p>
        <p className="text-muted-foreground mt-6 max-w-md mx-auto">{t.notFound.desc}</p>
        <Link
          to="/"
          className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-gold text-primary-foreground text-sm font-bold uppercase tracking-widest shadow-gold hover:scale-105 active:scale-95 transition-transform"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.notFound.cta}
        </Link>
      </div>
    </section>
  );
}
