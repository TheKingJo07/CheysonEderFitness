// Mock data for dashboard & messages (no auth, no DB)
export interface Client {
  id: string;
  name: string;
  avatar: string; // initials
  program: string;
  startWeight: number;
  currentWeight: number;
  goalWeight: number;
  height: number;
  age: number;
  joinedDays: number;
  sessionsDone: number;
  sessionsTotal: number;
  status: "active" | "paused" | "completed";
  lastActive: string;
  progress: { week: number; weight: number }[];
}

export const clients: Client[] = [
  {
    id: "c1", name: "Lucas Martin", avatar: "LM",
    program: "Prise de masse débutant",
    startWeight: 68, currentWeight: 74, goalWeight: 78,
    height: 178, age: 28, joinedDays: 62, sessionsDone: 36, sessionsTotal: 52,
    status: "active", lastActive: "Il y a 2h",
    progress: [
      { week: 1, weight: 68 }, { week: 2, weight: 68.8 }, { week: 3, weight: 69.5 },
      { week: 4, weight: 70.2 }, { week: 5, weight: 71 }, { week: 6, weight: 71.8 },
      { week: 7, weight: 72.5 }, { week: 8, weight: 73.2 }, { week: 9, weight: 74 },
    ],
  },
  {
    id: "c2", name: "Emma Laurent", avatar: "EL",
    program: "Perte de poids",
    startWeight: 78, currentWeight: 69, goalWeight: 65,
    height: 168, age: 32, joinedDays: 90, sessionsDone: 56, sessionsTotal: 64,
    status: "active", lastActive: "Il y a 1j",
    progress: [
      { week: 1, weight: 78 }, { week: 2, weight: 77 }, { week: 3, weight: 76 },
      { week: 4, weight: 75 }, { week: 5, weight: 74 }, { week: 6, weight: 73 },
      { week: 7, weight: 71.5 }, { week: 8, weight: 70 }, { week: 9, weight: 69 },
    ],
  },
  {
    id: "c3", name: "Thomas Roussel", avatar: "TR",
    program: "Programme PPL 6j",
    startWeight: 82, currentWeight: 86, goalWeight: 90,
    height: 184, age: 26, joinedDays: 45, sessionsDone: 38, sessionsTotal: 54,
    status: "active", lastActive: "Il y a 4h",
    progress: [
      { week: 1, weight: 82 }, { week: 2, weight: 82.5 }, { week: 3, weight: 83.2 },
      { week: 4, weight: 84 }, { week: 5, weight: 84.8 }, { week: 6, weight: 86 },
    ],
  },
  {
    id: "c4", name: "Sarah Benali", avatar: "SB",
    program: "Spécial femmes",
    startWeight: 64, currentWeight: 60, goalWeight: 58,
    height: 165, age: 29, joinedDays: 78, sessionsDone: 44, sessionsTotal: 50,
    status: "active", lastActive: "Il y a 30min",
    progress: [
      { week: 1, weight: 64 }, { week: 2, weight: 63.5 }, { week: 3, weight: 62.8 },
      { week: 4, weight: 62 }, { week: 5, weight: 61.5 }, { week: 6, weight: 61 },
      { week: 7, weight: 60.5 }, { week: 8, weight: 60 },
    ],
  },
  {
    id: "c5", name: "Marc Dupont", avatar: "MD",
    program: "Transformation maison",
    startWeight: 91, currentWeight: 84, goalWeight: 80,
    height: 180, age: 38, joinedDays: 28, sessionsDone: 20, sessionsTotal: 30,
    status: "active", lastActive: "Il y a 5h",
    progress: [
      { week: 1, weight: 91 }, { week: 2, weight: 89 }, { week: 3, weight: 87 },
      { week: 4, weight: 84 },
    ],
  },
  {
    id: "c6", name: "Julie Moreau", avatar: "JM",
    program: "Perte de poids",
    startWeight: 72, currentWeight: 65, goalWeight: 62,
    height: 170, age: 35, joinedDays: 120, sessionsDone: 80, sessionsTotal: 80,
    status: "completed", lastActive: "Il y a 7j",
    progress: [
      { week: 1, weight: 72 }, { week: 4, weight: 69 }, { week: 8, weight: 67 },
      { week: 12, weight: 65 },
    ],
  },
];

export interface Message {
  id: string;
  fromCoach: boolean;
  text: string;
  time: string;
}

export const conversations: Record<string, Message[]> = {
  c1: [
    { id: "m1", fromCoach: false, text: "Salut coach, séance de hier difficile, mes épaules ont tiré.", time: "09:12" },
    { id: "m2", fromCoach: true, text: "Bien noté Lucas. On baisse de 10% sur le développé militaire cette semaine.", time: "09:34" },
    { id: "m3", fromCoach: false, text: "Reçu 💪", time: "09:35" },
    { id: "m4", fromCoach: true, text: "Tu m'envoies une vidéo de ton squat ce soir ?", time: "10:02" },
  ],
  c2: [
    { id: "m1", fromCoach: true, text: "Emma, photos hebdo demain matin stp 📸", time: "Hier" },
    { id: "m2", fromCoach: false, text: "Pas de soucis, je m'en occupe !", time: "Hier" },
  ],
  c3: [
    { id: "m1", fromCoach: false, text: "Coach, +2.5kg au DC cette semaine 🔥", time: "08:45" },
    { id: "m2", fromCoach: true, text: "Énorme Thomas. On continue exactement comme ça.", time: "08:50" },
  ],
  c4: [
    { id: "m1", fromCoach: false, text: "J'ai atteint mon premier objectif !!!", time: "07:20" },
    { id: "m2", fromCoach: true, text: "Bravo Sarah, immense fierté. On passe au palier 2.", time: "07:22" },
  ],
  c5: [],
  c6: [
    { id: "m1", fromCoach: true, text: "Bravo Julie, programme terminé avec brio !", time: "Lundi" },
  ],
};

export interface FailedSignup {
  email: string;
  step: string;
  date: string;
}

export const failedSignups: FailedSignup[] = [
  { email: "marie.dubois@email.com", step: "Choix programme", date: "Aujourd'hui 14:23" },
  { email: "kevin.li@email.com", step: "Paiement", date: "Aujourd'hui 11:45" },
  { email: "sophia.rocha@email.com", step: "Bilan morphologique", date: "Hier 19:02" },
  { email: "anton.k@email.com", step: "Création compte", date: "Hier 16:34" },
];
