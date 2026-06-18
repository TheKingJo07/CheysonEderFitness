import gymBg from "@/assets/gym-bg.jpg";
import heroCoach from "@/assets/hero-coach.jpg";
import after1 from "@/assets/after-1.jpg";
import after2 from "@/assets/after-2.jpg";

export interface Program {
  slug: string;
  title: string;
  tagline: string;
  duration: string;
  level: string;
  goal: string;
  color: "gold" | "fire" | "neon";
  image: string;
  description: string;
  results: string[];
  features: string[];
  weeklySessions: number;
  equipment: string;
  price: string;
}

export const programs: Program[] = [
  {
    slug: "prise-de-masse-debutant",
    title: "Prise de masse débutant",
    tagline: "+5 kg de muscle en 90 jours",
    duration: "90 jours",
    level: "Débutant",
    goal: "Prise de masse",
    color: "gold",
    image: heroCoach,
    description:
      "Programme structuré pour construire une base musculaire solide. Progression linéaire, focus sur les mouvements polyarticulaires et une nutrition adaptée à la prise de masse propre.",
    results: ["+5 kg de muscle", "Force +40%", "Posture corrigée", "Volume visible"],
    features: ["Plan nutrition complet", "Vidéos d'exécution HD", "Suivi WhatsApp", "Ajustements hebdo"],
    weeklySessions: 4,
    equipment: "Salle complète",
    price: "À partir de 149€",
  },
  {
    slug: "transformation-maison",
    title: "Transformation physique maison",
    tagline: "Challenge 30 jours sans matériel",
    duration: "30 jours",
    level: "Tous niveaux",
    goal: "Recomposition",
    color: "fire",
    image: gymBg,
    description:
      "Un challenge intense de 30 jours, conçu pour transformer ton corps depuis chez toi. Zéro matériel requis, résultats garantis si tu suis le protocole.",
    results: ["−4 kg en moyenne", "Cardio +60%", "Tonicité visible", "Énergie au max"],
    features: ["Aucun équipement", "Sessions 25-40 min", "Plan alimentaire", "Communauté privée"],
    weeklySessions: 5,
    equipment: "Aucun",
    price: "À partir de 79€",
  },
  {
    slug: "perte-de-poids",
    title: "Perte de poids",
    tagline: "−10 kg en 90 jours",
    duration: "90 jours",
    level: "Intermédiaire",
    goal: "Perte de poids",
    color: "neon",
    image: after1,
    description:
      "Méthode éprouvée pour une perte de poids durable et saine. Combinaison HIIT, musculation et nutrition flexible pour cramer la graisse sans perdre de muscle.",
    results: ["−10 kg en moyenne", "Tour de taille −12 cm", "Métabolisme boosté", "Habitudes durables"],
    features: ["Coaching nutrition", "Plans HIIT exclusifs", "Bilans biweekly", "Recettes premium"],
    weeklySessions: 4,
    equipment: "Salle ou maison",
    price: "À partir de 169€",
  },
  {
    slug: "special-femmes",
    title: "Programme spécial femmes",
    tagline: "Ventre plat + fessiers galbés en 90 jours",
    duration: "90 jours",
    level: "Tous niveaux",
    goal: "Sculpter",
    color: "gold",
    image: after2,
    description:
      "Programme dédié aux femmes pour sculpter ventre plat, fessiers galbés et silhouette tonique. Approche bienveillante, exigeante et terriblement efficace.",
    results: ["Ventre plat", "+3 cm de fessiers", "Tonicité globale", "Confiance retrouvée"],
    features: ["Cycle menstruel respecté", "Plan nutrition femme", "Suivi photos mensuel", "Communauté féminine"],
    weeklySessions: 4,
    equipment: "Salle ou maison",
    price: "À partir de 179€",
  },
];

export const getProgram = (slug: string) => programs.find((p) => p.slug === slug);
