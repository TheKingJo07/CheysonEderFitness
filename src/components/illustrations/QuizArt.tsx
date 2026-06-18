// Illustrations PHOTORÉALISTES pour le quiz d'évaluation.
// Photos réelles + overlays SVG (cercles or) pour les zones sensibles.

import maleSkinny from "@/assets/morph/male-skinny.jpg";
import maleAverage from "@/assets/morph/male-average.jpg";
import maleAthletic from "@/assets/morph/male-athletic.jpg";
import maleOverweight from "@/assets/morph/male-overweight.jpg";
import maleObese from "@/assets/morph/male-obese.jpg";
import femaleSkinny from "@/assets/morph/female-skinny.jpg";
import femaleAverage from "@/assets/morph/female-average.jpg";
import femaleAthletic from "@/assets/morph/female-athletic.jpg";
import femaleOverweight from "@/assets/morph/female-overweight.jpg";
import femaleObese from "@/assets/morph/female-obese.jpg";
import bodyFront from "@/assets/morph/body-front.jpg";
import bodyBack from "@/assets/morph/body-back.jpg";

type Gender = "male" | "female";
type MorphId = "skinny" | "average" | "athletic" | "overweight" | "obese";

const MORPH_IMG: Record<Gender, Record<MorphId, string>> = {
  male: {
    skinny: maleSkinny, average: maleAverage, athletic: maleAthletic,
    overweight: maleOverweight, obese: maleObese,
  },
  female: {
    skinny: femaleSkinny, average: femaleAverage, athletic: femaleAthletic,
    overweight: femaleOverweight, obese: femaleObese,
  },
};

// ===== Wrapper photo : cadre cohérent, sombre, bord or subtil
function PhotoFrame({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative w-full aspect-[3/5] rounded-xl overflow-hidden bg-black/40 border border-gold/20 shadow-[0_0_30px_rgba(247,215,116,0.08)] ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

// === GENDER (intro) ===
export const GenderArt = ({ gender }: { gender: Gender }) => (
  <PhotoFrame
    src={gender === "male" ? maleAthletic : femaleAthletic}
    alt={gender === "male" ? "Homme" : "Femme"}
  />
);

// === MORPHOLOGY ===
export const MorphologyArt = ({ id, gender }: { id: MorphId; gender: Gender }) => (
  <PhotoFrame src={MORPH_IMG[gender][id]} alt={`Morphologie ${id}`} />
);

// === BODY FAT % ===
type BfId = "10" | "15" | "20" | "25" | "30" | "35";
const bfToMorph: Record<BfId, MorphId> = {
  "10": "athletic", "15": "athletic", "20": "average",
  "25": "overweight", "30": "overweight", "35": "obese",
};
export const BodyFatArt = ({ id, gender }: { id: BfId; gender: Gender }) => (
  <MorphologyArt id={bfToMorph[id]} gender={gender} />
);

// === BODY PARTS (problem zones) ===
// Coordonnées en % (x, y) relatives à la photo. Utilise la photo front ou back.
type ZoneId =
  | "back" | "knees" | "wrists" | "shoulders" | "ankles" | "neck"
  | "lowerBack" | "elbows" | "hips" | "none";

interface Zone {
  view: "front" | "back";
  points: Array<{ x: number; y: number; r: number }>;
}

const ZONES: Record<Exclude<ZoneId, "none">, Zone> = {
  neck:      { view: "front", points: [{ x: 50, y: 18, r: 7 }] },
  shoulders: { view: "front", points: [{ x: 36, y: 27, r: 7 }, { x: 64, y: 27, r: 7 }] },
  back:      { view: "back",  points: [{ x: 50, y: 38, r: 10 }] },
  lowerBack: { view: "back",  points: [{ x: 50, y: 55, r: 9 }] },
  elbows:    { view: "front", points: [{ x: 26, y: 50, r: 6 }, { x: 74, y: 50, r: 6 }] },
  wrists:    { view: "front", points: [{ x: 22, y: 62, r: 6 }, { x: 78, y: 62, r: 6 }] },
  hips:      { view: "front", points: [{ x: 40, y: 60, r: 6 }, { x: 60, y: 60, r: 6 }] },
  knees:     { view: "front", points: [{ x: 44, y: 80, r: 7 }, { x: 56, y: 80, r: 7 }] },
  ankles:    { view: "front", points: [{ x: 45, y: 95, r: 6 }, { x: 55, y: 95, r: 6 }] },
};

export const BodyPartArt = ({ id }: { id: ZoneId }) => {
  if (id === "none") {
    return (
      <div className="relative w-full aspect-[3/5] rounded-xl overflow-hidden bg-gradient-to-br from-emerald-900/30 to-black/60 border border-emerald-500/30 flex items-center justify-center">
        <svg viewBox="0 0 120 120" className="w-1/2 h-1/2">
          <defs>
            <linearGradient id="gold-ok" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f7d774" />
              <stop offset="100%" stopColor="#c9962a" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r="42" fill="none" stroke="url(#gold-ok)" strokeWidth="4" />
          <path d="M40 62 L54 76 L82 46" fill="none" stroke="url(#gold-ok)"
                strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  const zone = ZONES[id];
  const src = zone.view === "front" ? bodyFront : bodyBack;
  return (
    <div className="relative w-full aspect-[3/5] rounded-xl overflow-hidden bg-black/40 border border-gold/20">
      <img src={src} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/30" />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id="zone-glow">
            <stop offset="0%" stopColor="rgba(247,215,116,0.6)" />
            <stop offset="60%" stopColor="rgba(247,215,116,0.15)" />
            <stop offset="100%" stopColor="rgba(247,215,116,0)" />
          </radialGradient>
        </defs>
        {zone.points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={p.r * 1.8} fill="url(#zone-glow)" />
            <circle cx={p.x} cy={p.y} r={p.r} fill="none"
                    stroke="#f7d774" strokeWidth="0.8"
                    strokeDasharray="2 1.5"
                    style={{ filter: "drop-shadow(0 0 4px rgba(247,215,116,0.9))" }}>
              <animate attributeName="r" values={`${p.r};${p.r * 1.15};${p.r}`}
                       dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx={p.x} cy={p.y} r="0.8" fill="#f7d774" />
          </g>
        ))}
      </svg>
    </div>
  );
};

// === SUMMARY (récap final) : Aujourd'hui vs Objectif athlétique
export const SummaryArt = ({
  gender, morph,
}: { gender: Gender; morph: MorphId }) => (
  <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center max-w-xl mx-auto">
    <div>
      <PhotoFrame src={MORPH_IMG[gender][morph]} alt="Aujourd'hui" />
      <div className="mt-2 text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        Aujourd'hui
      </div>
    </div>
    <div className="text-gold text-3xl font-display">→</div>
    <div>
      <PhotoFrame src={MORPH_IMG[gender].athletic} alt="Objectif" className="ring-2 ring-gold/40" />
      <div className="mt-2 text-center text-[10px] uppercase tracking-[0.3em] text-gold">
        Objectif
      </div>
    </div>
  </div>
);
