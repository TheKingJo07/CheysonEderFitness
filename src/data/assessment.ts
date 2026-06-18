export interface QuizOption {
  id: string;
  label: string;
  desc?: string;
  emoji?: string;
}

export interface QuizStep {
  id: string;
  question: string;
  type: "single" | "multi" | "number" | "ageRange" | "morph";
  options?: QuizOption[];
  unit?: string;
  min?: number;
  max?: number;
}

export const genders: QuizOption[] = [
  { id: "male",   label: "Homme", desc: "Programme adapté à ta physiologie masculine." },
  { id: "female", label: "Femme", desc: "Programme adapté à ta physiologie féminine." },
];

export const morphologies: QuizOption[] = [
  { id: "skinny",     label: "Maigre",    desc: "Peu de masse musculaire et de graisse." },
  { id: "average",    label: "Moyenne",   desc: "Corpulence équilibrée, peu de définition." },
  { id: "athletic",   label: "Athlétique",desc: "Musculature visible, peu de graisse." },
  { id: "overweight", label: "Surpoids",  desc: "Graisse visible, surtout au ventre." },
  { id: "obese",      label: "Obésité",   desc: "Excès de masse grasse important." },
];

export const goals: QuizOption[] = [
  { id: "muscle",  label: "Prendre du muscle",       emoji: "💪" },
  { id: "loss",    label: "Perdre du poids",         emoji: "🔥" },
  { id: "tone",    label: "Me tonifier",             emoji: "⚡" },
  { id: "health",  label: "Être en meilleure santé", emoji: "❤️" },
  { id: "perform", label: "Performance sportive",    emoji: "🏆" },
];

export const frequencies: QuizOption[] = [
  { id: "none",    label: "Jamais" },
  { id: "rare",    label: "1 fois / semaine" },
  { id: "regular", label: "2-3 fois / semaine" },
  { id: "intense", label: "4-6 fois / semaine" },
  { id: "daily",   label: "Tous les jours" },
];

export const weightTrends: QuizOption[] = [
  { id: "gain",   label: "Je prends du poids",   emoji: "📈" },
  { id: "stable", label: "Mon poids est stable", emoji: "➡️" },
  { id: "loss",   label: "Je perds du poids",    emoji: "📉" },
  { id: "yoyo",   label: "Effet yoyo",           emoji: "🔄" },
];

export const problemZones: QuizOption[] = [
  { id: "neck",      label: "Cervicales" },
  { id: "shoulders", label: "Épaules" },
  { id: "back",      label: "Dos (haut)" },
  { id: "lowerBack", label: "Lombaires" },
  { id: "elbows",    label: "Coudes" },
  { id: "wrists",    label: "Poignets" },
  { id: "hips",      label: "Hanches" },
  { id: "knees",     label: "Genoux" },
  { id: "ankles",    label: "Chevilles" },
  { id: "none",      label: "Aucun problème" },
];

export const bodyFatLevels: QuizOption[] = [
  { id: "10", label: "10-12%", desc: "Très sec, abdos très visibles" },
  { id: "15", label: "13-17%", desc: "Athlétique, abdos visibles" },
  { id: "20", label: "18-22%", desc: "Normal, légère définition" },
  { id: "25", label: "23-27%", desc: "Léger surpoids" },
  { id: "30", label: "28-32%", desc: "Surpoids visible" },
  { id: "35", label: "33%+",   desc: "Surpoids important" },
];

export const imcCategory = (imc: number) => {
  if (imc < 18.5) return { label: "Maigre",          color: "text-blue-400" };
  if (imc < 25)   return { label: "Normal",          color: "text-green-400" };
  if (imc < 30)   return { label: "Surpoids",        color: "text-yellow-400" };
  if (imc < 40)   return { label: "Obésité modérée", color: "text-orange-400" };
  return            { label: "Obésité sévère",        color: "text-red-400" };
};
