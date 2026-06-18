export interface Product {
  id: string;
  title: string;
  category: "ebook" | "programme" | "livre" | "nutrition";
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  cover: string; // gradient name
  short: string;
  description: string;
  pages: number;
  format: string;
  highlights: string[];
}

export const categories = [
  { id: "all", label: "Tout" },
  { id: "ebook", label: "Ebooks" },
  { id: "programme", label: "Programmes PDF" },
  { id: "livre", label: "Livres sportifs" },
  { id: "nutrition", label: "Guides nutrition" },
] as const;

export const products: Product[] = [
  {
    id: "p1",
    title: "La Bible de la Prise de Masse",
    category: "ebook",
    price: 39,
    oldPrice: 59,
    rating: 4.9,
    reviews: 312,
    cover: "from-gold to-neon-orange",
    short: "Le guide ultime pour gagner du muscle propre.",
    description:
      "240 pages d'expertise condensée : programmation, nutrition, supplémentation, sommeil et récupération. Tout ce qu'il faut savoir pour transformer ton physique en 6 mois.",
    pages: 240,
    format: "PDF + EPUB",
    highlights: ["12 programmes inclus", "Plans alimentaires détaillés", "Calculs précis macros", "Mises à jour à vie"],
  },
  {
    id: "p2",
    title: "Programme PPL 6 jours",
    category: "programme",
    price: 49,
    rating: 4.8,
    reviews: 187,
    cover: "from-neon-red to-neon-orange",
    short: "Push / Pull / Legs intensif sur 12 semaines.",
    description:
      "Programme avancé Push/Pull/Legs pour pratiquants intermédiaires et confirmés. 12 semaines de progression structurée avec déload programmé.",
    pages: 80,
    format: "PDF interactif",
    highlights: ["12 semaines", "Vidéos d'exécution", "Tracker Excel inclus", "Variantes débutant"],
  },
  {
    id: "p3",
    title: "Nutrition Performance",
    category: "nutrition",
    price: 29,
    oldPrice: 45,
    rating: 4.9,
    reviews: 421,
    cover: "from-gold-soft to-gold",
    short: "Mange pour performer, pas pour survivre.",
    description:
      "Guide complet de nutrition sportive : macros, micronutriments, timing, suppléments. 60 recettes haute performance incluses.",
    pages: 180,
    format: "PDF + recettes",
    highlights: ["60 recettes haute perf", "Plans 2000-4000 kcal", "Vegan / Omnivore", "Liste de courses prête"],
  },
  {
    id: "p4",
    title: "Mind & Muscle",
    category: "livre",
    price: 24,
    rating: 4.7,
    reviews: 96,
    cover: "from-anthracite to-onyx",
    short: "La psychologie de la transformation physique.",
    description:
      "Pourquoi 90% des gens échouent ? Réponse dans la tête. Ce livre te donne les outils mentaux pour aller au bout.",
    pages: 220,
    format: "PDF + audio",
    highlights: ["Audio 4h inclus", "10 exercices mentaux", "Méditation guidée", "Routines pro athlètes"],
  },
  {
    id: "p5",
    title: "Programme Spécial Femmes",
    category: "programme",
    price: 59,
    rating: 5.0,
    reviews: 248,
    cover: "from-gold to-gold-soft",
    short: "Sculpter, raffermir, transformer.",
    description:
      "Programme pensé pour les femmes : fessiers galbés, ventre plat, tonicité globale. 16 semaines progressives.",
    pages: 120,
    format: "PDF + app",
    highlights: ["16 semaines", "Cycle menstruel adapté", "Vidéos HD", "Groupe privé femmes"],
  },
  {
    id: "p6",
    title: "Le Guide du HIIT",
    category: "ebook",
    price: 19,
    rating: 4.6,
    reviews: 132,
    cover: "from-neon-orange to-neon-red",
    short: "Brûle un max de gras en un minimum de temps.",
    description:
      "40 séances HIIT prêtes à l'emploi. De 10 à 40 minutes, du débutant à l'élite. Maison ou salle.",
    pages: 90,
    format: "PDF + vidéos",
    highlights: ["40 séances clés en main", "Maison & salle", "Tous niveaux", "Suivi calories"],
  },
  {
    id: "p7",
    title: "Méal Prep Pro",
    category: "nutrition",
    price: 22,
    rating: 4.8,
    reviews: 167,
    cover: "from-gold to-anthracite",
    short: "Prépare une semaine de repas en 2 heures.",
    description:
      "Méthode pas à pas pour préparer une semaine complète de repas équilibrés en 2h chrono.",
    pages: 110,
    format: "PDF + listes",
    highlights: ["Templates listes courses", "8 menus types", "Photo pas à pas", "Économies garanties"],
  },
  {
    id: "p8",
    title: "Force & Puissance",
    category: "livre",
    price: 34,
    rating: 4.9,
    reviews: 89,
    cover: "from-onyx to-neon-red",
    short: "Devenir plus fort, sans se blesser.",
    description:
      "Tout sur le développement de la force pure : programmation, technique, prévention des blessures.",
    pages: 260,
    format: "PDF",
    highlights: ["Squat / Bench / Deadlift", "Programmes 5x5 et 5/3/1", "Mobilité incluse", "Prévention blessures"],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
