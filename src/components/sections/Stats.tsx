import { useLanguage } from "@/context/LanguageContext";
import ScrollReveal from "@/components/effects/ScrollReveal";
import CountUp from "@/components/effects/CountUp";

export default function Stats() {
  const { t } = useLanguage();
  return (
    <section className="relative py-24 md:py-32 border-y border-border/40 bg-gradient-to-b from-onyx via-background to-onyx">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.82_0.16_85/0.08),transparent_60%)] pointer-events-none" />
      <div className="container-luxe relative">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-3">— STATS —</p>
          <h2 className="font-display text-4xl md:text-6xl leading-tight">{t.stats.title}</h2>
          <p className="text-muted-foreground mt-4">{t.stats.subtitle}</p>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border/60 rounded-2xl overflow-hidden glass-strong">
          {t.stats.items.map((item, i) => (
            <ScrollReveal
              key={item.label}
              delay={i * 120}
              className="bg-background/40 p-8 md:p-10 text-center hover:bg-background/70 transition-colors group"
            >
              <div className="font-display text-5xl md:text-7xl text-gradient-gold leading-none group-hover:scale-105 transition-transform">
                <CountUp end={item.value} suffix={item.suffix} />
              </div>
              <div className="mt-4 text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
                {item.label}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
