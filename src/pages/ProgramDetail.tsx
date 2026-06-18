import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";
import { getProgram } from "@/data/programs";
import PageHeader from "@/components/layout/PageHeader";
import NotFound from "./NotFound";

export default function ProgramDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const program = getProgram(slug || "");

  if (!program) return <NotFound />;

  return (
    <>
      <PageHeader
        eyebrow={program.goal}
        title={<span className="text-gradient-gold">{program.title}</span>}
        subtitle={program.tagline}
      />

      <section className="py-12">
        <div className="container-luxe">
          <Link to="/programs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold mb-8">
            <ArrowLeft className="h-4 w-4" /> Tous les programmes
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="relative rounded-3xl overflow-hidden shadow-luxe">
              <img src={program.image} alt={program.title} className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <div className="glass-strong px-4 py-2 rounded-full text-xs uppercase tracking-widest">
                  {program.duration} · {program.weeklySessions}j/sem
                </div>
                <div className="glass-strong px-4 py-2 rounded-full text-xs uppercase tracking-widest text-gold">
                  {program.price}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="font-display text-3xl mb-4">À propos du programme</h2>
                <p className="text-muted-foreground leading-relaxed">{program.description}</p>
              </div>

              <div>
                <h3 className="font-display text-xl mb-4 text-gold uppercase tracking-widest">Résultats attendus</h3>
                <ul className="grid grid-cols-2 gap-3">
                  {program.results.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm">
                      <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display text-xl mb-4 text-gold uppercase tracking-widest">Inclus</h3>
                <ul className="grid grid-cols-2 gap-3">
                  {program.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => navigate(`/assessment?program=${program.slug}`)}
                className="group w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-gradient-gold text-primary-foreground text-sm font-bold uppercase tracking-widest shadow-gold hover:scale-[1.02] transition-transform"
              >
                Commencer mon coaching
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <p className="text-xs text-center text-muted-foreground">
                10 questions · 2 min · le coach te recontacte avant tout paiement
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
