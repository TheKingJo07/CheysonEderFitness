import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ScrollReveal from "@/components/effects/ScrollReveal";
import testi1 from "@/assets/testi-1.jpg";
import testi2 from "@/assets/testi-2.jpg";
import testi3 from "@/assets/testi-3.jpg";

const avatars = [testi1, testi2, testi3];

export default function Testimonials() {
  const { t } = useLanguage();
  const items = t.testimonials.items.map((it, i) => ({ ...it, avatar: avatars[i % avatars.length] }));
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % items.length), 6500);
    return () => clearInterval(id);
  }, [items.length]);

  const go = (dir: 1 | -1) => setIdx((i) => (i + dir + items.length) % items.length);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-background via-onyx to-background">
      <div className="absolute inset-0 bg-radial-gold opacity-50 pointer-events-none" />
      <div className="container-luxe relative">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-3">— {t.testimonials.eyebrow} —</p>
          <h2 className="font-display text-4xl md:text-6xl leading-tight">{t.testimonials.title}</h2>
        </ScrollReveal>

        <ScrollReveal className="relative max-w-4xl mx-auto">
          <div className="relative glass-strong rounded-3xl border border-gold/20 p-10 md:p-14 overflow-hidden">
            <Quote className="absolute -top-2 -left-2 h-32 w-32 text-gold/10" />

            <div className="relative min-h-[260px] flex flex-col items-center text-center">
              {items.map((item, i) => (
                <div
                  key={item.name}
                  className={`absolute inset-0 flex flex-col items-center transition-all duration-700 ${
                    i === idx ? "opacity-100 translate-x-0" : i < idx ? "opacity-0 -translate-x-8 pointer-events-none" : "opacity-0 translate-x-8 pointer-events-none"
                  }`}
                >
                  <div className="flex gap-1 text-gold mb-5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl font-serif italic leading-relaxed max-w-2xl text-foreground">
                    "{item.quote}"
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="h-14 w-14 rounded-full object-cover border-2 border-gold/40"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 rounded-full ring-1 ring-gold/20" />
                    </div>
                    <div className="text-left">
                      <div className="font-display text-lg">{item.name}</div>
                      <div className="text-xs tracking-[0.2em] uppercase text-gold">{item.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              className="h-11 w-11 rounded-full glass border border-border hover:border-gold hover:text-gold flex items-center justify-center transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === idx ? "w-10 bg-gradient-gold" : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground"
                  }`}
                  aria-label={`Témoignage ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              className="h-11 w-11 rounded-full glass border border-border hover:border-gold hover:text-gold flex items-center justify-center transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
