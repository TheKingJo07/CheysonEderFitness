import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import ScrollReveal from "@/components/effects/ScrollReveal";
import before1 from "@/assets/before-1.jpg";
import after1 from "@/assets/after-1.jpg";
import before2 from "@/assets/before-2.jpg";
import after2 from "@/assets/after-2.jpg";

interface SliderProps {
  before: string;
  after: string;
  labelBefore: string;
  labelAfter: string;
}

function CompareSlider({ before, after, labelBefore, labelAfter }: SliderProps) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setFromClientX(e.clientX);
  };
  const onPointerUp = () => { dragging.current = false; };

  return (
    <div
      ref={ref}
      className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-gold/20 select-none touch-none cursor-ew-resize"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* After (base) */}
      <img src={after} alt={labelAfter} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-gold text-primary-foreground text-[10px] font-bold tracking-[0.3em]">
        {labelAfter}
      </div>

      {/* Before (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img src={before} alt={labelBefore} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass border border-border text-[10px] font-bold tracking-[0.3em] text-foreground">
          {labelBefore}
        </div>
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-px bg-gold shadow-[0_0_20px_oklch(0.82_0.16_85/0.7)] pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-gradient-gold shadow-gold flex items-center justify-center pointer-events-none">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-foreground" fill="currentColor">
            <path d="M9 6l-6 6 6 6V6zm6 0v12l6-6-6-6z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const { t } = useLanguage();
  const items = [
    { ...t.beforeAfter.cases[0], before: before1, after: after1 },
    { ...t.beforeAfter.cases[1], before: before2, after: after2 },
  ];

  return (
    <section className="relative py-24 md:py-32">
      <div className="container-luxe">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-3">— {t.beforeAfter.eyebrow} —</p>
          <h2 className="font-display text-4xl md:text-6xl leading-tight">{t.beforeAfter.title}</h2>
          <p className="text-muted-foreground mt-4">{t.beforeAfter.subtitle}</p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <ScrollReveal key={item.name} delay={i * 150} className="space-y-4">
              <CompareSlider
                before={item.before}
                after={item.after}
                labelBefore={t.beforeAfter.labelBefore}
                labelAfter={t.beforeAfter.labelAfter}
              />
              <div className="flex items-end justify-between px-1">
                <div>
                  <div className="font-display text-xl">{item.name}</div>
                  <div className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-1">
                    {item.duration}
                  </div>
                </div>
                <div className="text-gold font-display text-lg">{item.result}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
