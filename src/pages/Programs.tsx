import { Link } from "react-router-dom";
import { ArrowRight, Clock, Dumbbell, Target, TrendingUp } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { programs } from "@/data/programs";

const colorMap = {
  gold: "from-gold to-neon-orange",
  fire: "from-neon-red to-neon-orange",
  neon: "from-neon-orange to-gold",
} as const;

export default function Programs() {
  return (
    <>
      <PageHeader
        eyebrow="Programmes"
        title={
          <>
            <span className="block text-foreground">EN FONCTION DE L’OBJECTIF QUE TU SOUHAITERAIS ATTEINDRE,</span>
            <span className="block text-gradient-gold">CHOISIS UN DE CES PROGRAMMES</span>
          </>
        }
        subtitle="Quatre programmes phares conçus par Cheyson Eder. Chaque parcours est encadré, mesurable et adapté à ton niveau."
      />

      <section className="py-16">
        <div className="container-luxe grid md:grid-cols-2 gap-8">
          {programs.map((p, i) => (
            <Link
              key={p.slug}
              to={`/programs/${p.slug}`}
              className="group relative overflow-hidden rounded-3xl glass-strong border border-border/60 hover-lift animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gradient-to-r ${colorMap[p.color]} text-primary-foreground text-[10px] font-bold uppercase tracking-widest`}>
                  {p.goal}
                </div>
                <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest text-foreground">
                  {p.level}
                </div>
              </div>

              <div className="p-7 space-y-5">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.3em] text-gold mb-2">{p.duration}</div>
                  <h3 className="font-display text-3xl leading-tight">{p.title}</h3>
                  <p className="mt-2 text-gold-soft text-sm font-medium">{p.tagline}</p>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-3">{p.description}</p>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border/40">
                  <Stat icon={<Clock className="h-4 w-4" />} label={p.duration} />
                  <Stat icon={<Dumbbell className="h-4 w-4" />} label={`${p.weeklySessions}j/sem`} />
                  <Stat icon={<Target className="h-4 w-4" />} label={p.level} />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-muted-foreground">{p.price}</span>
                  <span className="inline-flex items-center gap-2 text-gold text-sm font-bold uppercase tracking-widest group-hover:gap-3 transition-all">
                    Découvrir <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container-luxe glass-strong border border-gold/30 rounded-3xl p-10 md:p-16 text-center shadow-gold">
          <TrendingUp className="h-10 w-10 text-gold mx-auto mb-4" />
          <h2 className="font-display text-4xl md:text-5xl mb-4">Tu hésites ?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Réponds à quelques questions et reçois la recommandation personnalisée du coach.
          </p>
          <Link
            to="/assessment"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-gold text-primary-foreground text-sm font-bold uppercase tracking-widest shadow-gold hover:scale-[1.04] transition-transform"
          >
            Faire mon bilan gratuit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span className="text-gold">{icon}</span>
      {label}
    </div>
  );
}
