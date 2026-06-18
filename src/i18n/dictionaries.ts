export type Lang = "fr" | "en";

export interface Dict {
  nav: { home: string; programs: string; offers: string; assessment: string; shop: string; contact: string; cta: string };
  hero: { eyebrow: string; title1: string; title2: string; title3: string; subtitle: string; description: string; ctaPrimary: string; ctaSecondary: string; scroll: string };
  stats: { title: string; subtitle: string; items: { label: string; value: number; suffix: string }[] };
  coach: { eyebrow: string; title: string; p1: string; p2: string; values: { title: string; desc: string }[]; youtube: string; email: string };
  beforeAfter: { eyebrow: string; title: string; subtitle: string; cases: { name: string; duration: string; result: string }[]; labelBefore: string; labelAfter: string };
  testimonials: { eyebrow: string; title: string; items: { name: string; role: string; quote: string }[] };
  footer: { tagline: string; navTitle: string; legalTitle: string; followTitle: string; legal: string[]; rights: string };
  notFound: { title: string; heading: string; desc: string; cta: string };
  cta: { bookCall: string; learnMore: string };
}

export const dictionaries: Record<Lang, Dict> = {
  fr: {
    nav: {
      home: "Accueil",
      programs: "Programmes",
      offers: "Offres",
      assessment: "Bilan",
      shop: "Boutique",
      contact: "Contact",
      cta: "Commencer",
    },
    hero: {
      eyebrow: "Coach sportif premium",
      title1: "TRANSFORME",
      title2: "TON CORPS",
      title3: "TA VIE",
      subtitle: "10 ans d'expérience · 95% de réussite",
      description:
        "Programmes sur-mesure, suivi haut de gamme et résultats mesurables. Rejoins une communauté d'élite qui ne fait pas de compromis.",
      ctaPrimary: "Commencer ma transformation",
      ctaSecondary: "Voir les programmes",
      scroll: "Découvrir",
    },
    stats: {
      title: "Des résultats qui parlent",
      subtitle: "Chiffres réels, transformations réelles.",
      items: [
        { label: "Années d'expérience", value: 10, suffix: "+" },
        { label: "Taux de réussite", value: 95, suffix: "%" },
        { label: "Clients transformés", value: 1240, suffix: "+" },
        { label: "Programmes réalisés", value: 320, suffix: "+" },
      ],
    },
    coach: {
      eyebrow: "Le coach",
      title: "Discipline. Constance. Résultats.",
      p1:
        "HOUNGUE Cheyson Eder à l’etat civil, je suis coach sportif depuis bientôt 8 ans. Je suis passionné par ce métier et j’ai aidé beaucoup de gens à transformer leurs corps en devenant une meilleure version d’eux mêmes. La raison pour laquelle je fais ce métier c’est de pouvoir transformer des vies parce qu’avant tout le sport est une question de bien-être et de santé.",
      p2:
        "...",
      values: [
        { title: "Discipline", desc: "La rigueur est non négociable. Elle est la fondation de tout résultat durable." },
        { title: "Constance", desc: "Mieux qu'intense un jour : intense chaque jour. Le progrès vit dans la répétition." },
        { title: "Résultats", desc: "Mesurés, photographiés, célébrés. Tu ne fais pas du sport pour rien." },
      ],
      youtube: "Chaîne YouTube",
      email: "Écris-moi",
    },
    beforeAfter: {
      eyebrow: "Transformations",
      title: "Avant / Après",
      subtitle: "Glisse pour révéler la transformation. Aucune retouche, que du travail.",
      cases: [
        { name: "Lucas, 28 ans", duration: "90 jours", result: "+8 kg de muscle" },
        { name: "Sarah, 32 ans", duration: "120 jours", result: "−12 kg, +tonicité" },
      ],
      labelBefore: "AVANT",
      labelAfter: "APRÈS",
    },
    testimonials: {
      eyebrow: "Ils l'ont fait",
      title: "Ce qu'ils en disent",
      items: [
        {
          name: "Thomas R.",
          role: "Programme prise de masse",
          quote:
            "Le meilleur investissement que j'ai fait pour mon corps. Cheyson est exigeant mais juste, et la méthode fonctionne.",
        },
        {
          name: "Emma L.",
          role: "Programme transformation",
          quote:
            "J'ai perdu 11 kg en 4 mois sans frustration. Le suivi quotidien fait toute la différence.",
        },
        {
          name: "Marc D.",
          role: "Coaching premium",
          quote:
            "Pro, premium, humain. Trois mois et je ne reconnais plus mon reflet. Merci Cheyson.",
        },
      ],
    },
    footer: {
      tagline: "Coach sportif premium. Transformation physique haut de gamme.",
      navTitle: "Navigation",
      legalTitle: "Légal",
      followTitle: "Suivre",
      legal: ["Mentions légales", "Politique de confidentialité", "CGV"],
      rights: "Tous droits réservés.",
    },
    notFound: {
      title: "404",
      heading: "Tu t'es perdu en salle.",
      desc: "Cette page n'existe pas ou a été déplacée. Retourne à l'entraînement.",
      cta: "Retour à l'accueil",
    },
    cta: {
      bookCall: "Réserver un appel",
      learnMore: "En savoir plus",
    },
  },
  en: {
    nav: {
      home: "Home",
      programs: "Programs",
      offers: "Plans",
      assessment: "Assessment",
      shop: "Shop",
      contact: "Contact",
      cta: "Start now",
    },
    hero: {
      eyebrow: "Premium fitness coach",
      title1: "TRANSFORM",
      title2: "YOUR BODY",
      title3: "YOUR LIFE",
      subtitle: "10 years of experience · 95% success rate",
      description:
        "Tailored programs, premium coaching, measurable results. Join an elite community that doesn't compromise.",
      ctaPrimary: "Start my transformation",
      ctaSecondary: "View programs",
      scroll: "Discover",
    },
    stats: {
      title: "Results that speak",
      subtitle: "Real numbers. Real transformations.",
      items: [
        { label: "Years of experience", value: 10, suffix: "+" },
        { label: "Success rate", value: 95, suffix: "%" },
        { label: "Clients transformed", value: 1240, suffix: "+" },
        { label: "Programs delivered", value: 320, suffix: "+" },
      ],
    },
    coach: {
      eyebrow: "The coach",
      title: "Discipline. Consistency. Results.",
      p1:
        "For 10 years Cheyson Eder has guided men and women toward the best version of themselves. Premium approach, proven method, absolute standards.",
      p2:
        "Every program is designed for your body, your lifestyle, your goals — never a copy-paste.",
      values: [
        { title: "Discipline", desc: "Rigor is non-negotiable. It is the foundation of every lasting result." },
        { title: "Consistency", desc: "Better than intense once: intense every day. Progress lives in repetition." },
        { title: "Results", desc: "Measured, photographed, celebrated. You don't train for nothing." },
      ],
      youtube: "YouTube channel",
      email: "Email me",
    },
    beforeAfter: {
      eyebrow: "Transformations",
      title: "Before / After",
      subtitle: "Drag to reveal the transformation. No retouching — only work.",
      cases: [
        { name: "Lucas, 28", duration: "90 days", result: "+8 kg of muscle" },
        { name: "Sarah, 32", duration: "120 days", result: "−12 kg, +tone" },
      ],
      labelBefore: "BEFORE",
      labelAfter: "AFTER",
    },
    testimonials: {
      eyebrow: "They did it",
      title: "What they say",
      items: [
        {
          name: "Thomas R.",
          role: "Mass-gain program",
          quote:
            "Best investment I've ever made for my body. Cheyson is demanding but fair, and the method works.",
        },
        {
          name: "Emma L.",
          role: "Transformation program",
          quote:
            "Lost 11 kg in 4 months without frustration. The daily follow-up makes all the difference.",
        },
        {
          name: "Marc D.",
          role: "Premium coaching",
          quote:
            "Pro, premium, human. Three months in and I don't recognize my reflection. Thank you Cheyson.",
        },
      ],
    },
    footer: {
      tagline: "Premium fitness coach. High-end physical transformation.",
      navTitle: "Navigation",
      legalTitle: "Legal",
      followTitle: "Follow",
      legal: ["Legal notice", "Privacy policy", "Terms"],
      rights: "All rights reserved.",
    },
    notFound: {
      title: "404",
      heading: "You got lost in the gym.",
      desc: "This page doesn't exist or has been moved. Get back to training.",
      cta: "Back to home",
    },
    cta: {
      bookCall: "Book a call",
      learnMore: "Learn more",
    },
  },
};
