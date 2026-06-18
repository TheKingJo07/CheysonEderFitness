import { Youtube, Mail, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import ScrollReveal from "@/components/effects/ScrollReveal";
import coachImg from "@/assets/coach-portrait.jpg";

export default function CoachSection() {
  const { t } = useLanguage();
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-radial-gold opacity-50 pointer-events-none" />
      <div className="container-luxe grid lg:grid-cols-12 gap-16 items-center">
        <ScrollReveal className="lg:col-span-5 relative">
          <div className="relative">
            <div className="absolute -inset-3 bg-gradient-gold opacity-30 blur-2xl rounded-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-gold/30 shadow-luxe">
              <img
                src={coachImg}
                alt="Cheyson Eder, coach sportif premium"
                className="w-full h-[600px] object-cover"
                loading="lazy"
                width={1024}
                height={1280}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <div className="text-[10px] tracking-[0.4em] text-gold uppercase">Coach</div>
                  <div className="font-display text-2xl">Cheyson Eder</div>
                </div>
                <div className="glass border border-gold/40 px-3 py-1.5 rounded-full text-[10px] tracking-[0.3em] uppercase text-gold">
                  Premium
                </div>
              </div>
            </div>
          </div>

          {/* Floating stat */}
          <div className="hidden md:block absolute -bottom-8 -left-8 glass-strong border border-gold/30 rounded-2xl p-5 shadow-gold animate-float">
            <div className="text-[10px] tracking-[0.4em] uppercase text-gold">Since 2015</div>
            <div className="font-display text-3xl text-gradient-gold mt-1">1240+</div>
            <div className="text-xs text-muted-foreground">transformations</div>
          </div>
        </ScrollReveal>

        <div className="lg:col-span-7 space-y-8">
          <ScrollReveal>
            <p className="text-[11px] tracking-[0.4em] uppercase text-gold mb-3">— {t.coach.eyebrow} —</p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">{t.coach.title}</h2>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <p className="text-muted-foreground text-lg leading-relaxed">{t.coach.p1}</p>
            <p className="text-muted-foreground text-lg leading-relaxed mt-4">{t.coach.p2}</p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-3 gap-4">
            {t.coach.values.map((v, i) => (
              <ScrollReveal
                key={v.title}
                delay={200 + i * 100}
                className="glass border border-border rounded-2xl p-5 hover:border-gold/50 transition-colors group"
              >
                <div className="h-9 w-9 rounded-full bg-gradient-gold inline-flex items-center justify-center shadow-gold mb-3 group-hover:scale-110 transition-transform">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl text-foreground">{v.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{v.desc}</p>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={500} className="flex flex-wrap gap-3 pt-4">
            <a
              href="https://www.youtube.com/@cheysonederfitness"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass border border-border hover:border-gold transition-colors text-sm"
            >
              <Youtube className="h-4 w-4 text-accent" />
              {t.coach.youtube}
            </a>
            <a
              href="mailto:cheysonederfitness@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass border border-border hover:border-gold transition-colors text-sm"
            >
              <Mail className="h-4 w-4 text-gold" />
              {t.coach.email}
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
