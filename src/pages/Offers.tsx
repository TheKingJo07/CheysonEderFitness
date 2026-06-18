import { Link } from "react-router-dom";
import { Check, Crown, Sparkles, Zap, ArrowRight } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";


const offers = [
  {
    name: "Entrée de Gamme",
    icon: Zap,
    price: "15€",
    period: "/ mois",
    desc: "L'entrée dans l'univers Cheyson Eder.",
    features: [
      "1 programme adapté",
      "Plan nutrition de base",
      "Accès vidéos d'exercices",
      "Support email 48h",
    ],
    color: "border-border",
    cta: "Choisir",
  },
  {
    name: "Standard",
    icon: Sparkles,
    price: "38€",
    period: "/ mois",
    desc: "Le meilleur rapport résultats / accompagnement.",
    features: [
      "Programme 100% sur-mesure",
      "Plan nutrition personnalisé",
      "Suivi WhatsApp 7j/7",
      "1 appel visio / mois",
      "Ajustements hebdomadaires",
      "Communauté privée",
    ],
    color: "border-gold shadow-gold",
    highlighted: true,
    cta: "Démarrer maintenant",
  },
  {
    name: "Premium",
    icon: Crown,
    price: "76€",
    period: "/ mois",
    desc: "Coaching haut de gamme, attention totale.",
    features: [
      "Tout du Premium",
      "Appels visio illimités",
      "Suivi nutrition quotidien",
      "Photos & analyses biweekly",
      "Réponse < 2h, 7j/7",
      "Accès produits exclusifs",
      "Place limitée (5 clients)",
    ],
    color: "border-accent shadow-fire",
    cta: "Postuler",
  },
];

export default function Offers() {
  return (
    <>
      <PageHeader
        eyebrow="Offres"
        title={<>Investis dans <span className="text-gradient-gold">toi-même</span>.</>}
        subtitle="Trois formules pensées pour s'adapter à ton ambition. Aucun engagement long terme. Résultats garantis ou je rembourse."
      />

      <section className="py-12">
        <div className="container-luxe grid md:grid-cols-3 gap-8">
          {offers.map((o, i) => {
            const Icon = o.icon;
            return (
              <div
                key={o.name}
                className={`relative rounded-3xl glass-strong border-2 ${o.color} p-8 flex flex-col animate-fade-up ${o.highlighted ? "lg:scale-105 z-10" : ""}`}
                style={{ animationDelay: `${i * 120}ms` }}
              >
                {o.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-gold text-primary-foreground text-[10px] font-bold uppercase tracking-widest rounded-full shadow-gold">
                    Le plus choisi
                  </div>
                )}
                <Icon className={`h-10 w-10 mb-4 ${o.highlighted ? "text-gold" : "text-muted-foreground"}`} />
                <h3 className="font-display text-3xl mb-2">{o.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{o.desc}</p>

                <div className="mb-6">
                  <span className="font-display text-5xl text-gradient-gold">{o.price}</span>
                  <span className="text-muted-foreground text-sm ml-1">{o.period}</span>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {o.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/assessment"
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-transform hover:scale-[1.02] ${
                    o.highlighted
                      ? "bg-gradient-gold text-primary-foreground shadow-gold"
                      : "glass border border-border hover:border-gold"
                  }`}
                >
                  Commencer mon coaching <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-12 max-w-xl mx-auto">
          Pas de paiement en ligne · Échange direct avec le coach avant tout engagement · Sans abonnement caché
        </p>
      </section>
    </>
  );
}
