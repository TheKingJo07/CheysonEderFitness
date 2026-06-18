import { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Trophy, Mail, Phone, User } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import {
  morphologies, goals, frequencies, weightTrends, problemZones, bodyFatLevels, imcCategory,
  genders, type QuizOption,
} from "@/data/assessment";
import { getProgram } from "@/data/programs";
import { toast } from "sonner";
import {
  GenderArt, MorphologyArt, BodyFatArt, BodyPartArt, SummaryArt,
} from "@/components/illustrations/QuizArt";
import {
  captureAbandonedLead, recordSubmittedLead, sendCoachEmail, openCoachMailto,
} from "@/lib/coachLead";

type Gender = "male" | "female";
type MorphId = "skinny" | "average" | "athletic" | "overweight" | "obese";

type Answers = {
  gender?: Gender;
  age?: number;
  morph?: MorphId;
  goal?: string;
  frequency?: string;
  weightTrend?: string;
  problems?: string[];
  bodyFat?: string;
  weight?: number;
  height?: number;
};

const STEPS = [
  "gender", "age", "morph", "goal", "frequency", "weightTrend",
  "problems", "bodyFat", "metrics", "contact", "result",
] as const;
type StepId = (typeof STEPS)[number];

const STEP_LABELS: Record<StepId, string> = {
  gender: "Genre",
  age: "Âge",
  morph: "Morphologie",
  goal: "Objectif",
  frequency: "Fréquence sport",
  weightTrend: "Évolution poids",
  problems: "Zones sensibles",
  bodyFat: "% graisse",
  metrics: "Poids & taille",
  contact: "Coordonnées",
  result: "Récapitulatif",
};

export default function Assessment() {
  const [params] = useSearchParams();
  const programSlug = params.get("program");
  const program = programSlug ? getProgram(programSlug) : null;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ problems: [] });
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const progress = ((step + 1) / STEPS.length) * 100;
  const current = STEPS[step];

  const imc = useMemo(() => {
    if (!answers.weight || !answers.height) return null;
    const h = answers.height / 100;
    return answers.weight / (h * h);
  }, [answers.weight, answers.height]);

  const canNext = (() => {
    switch (current) {
      case "gender":      return !!answers.gender;
      case "age":         return !!answers.age;
      case "morph":       return !!answers.morph;
      case "goal":        return !!answers.goal;
      case "frequency":   return !!answers.frequency;
      case "weightTrend": return !!answers.weightTrend;
      case "problems":    return (answers.problems?.length ?? 0) > 0;
      case "bodyFat":     return !!answers.bodyFat;
      case "metrics":     return !!answers.weight && !!answers.height;
      case "contact":
        return !!contact.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email);
      default: return true;
    }
  })();

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  // Capture des abandons : dès que l'utilisateur a renseigné un email valide
  // et change d'étape sans soumettre, on enregistre la tentative.
  useEffect(() => {
    if (!contact.email || submitted) return;
    captureAbandonedLead({
      email: contact.email,
      name: contact.name,
      phone: contact.phone,
      step: STEP_LABELS[current],
      program: program?.title,
    });
  }, [current, contact.email, contact.name, contact.phone, program?.title, submitted]);

  // Capture également si l'utilisateur ferme l'onglet
  useEffect(() => {
    const handler = () => {
      if (!submitted && contact.email) {
        captureAbandonedLead({
          email: contact.email,
          name: contact.name,
          phone: contact.phone,
          step: `Quitté à : ${STEP_LABELS[current]}`,
          program: program?.title,
        });
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [current, contact, submitted, program?.title]);

  const buildEmailBody = () => {
    const morph = morphologies.find((m) => m.id === answers.morph);
    const goal = goals.find((g) => g.id === answers.goal);
    const freq = frequencies.find((f) => f.id === answers.frequency);
    const trend = weightTrends.find((w) => w.id === answers.weightTrend);
    const bf = bodyFatLevels.find((b) => b.id === answers.bodyFat);
    const probs = (answers.problems ?? []).map((id) =>
      problemZones.find((p) => p.id === id)?.label
    ).filter(Boolean).join(", ");

    return [
      "🎯 NOUVEAU PROSPECT — CHEYSON EDER FITNESS",
      "",
      "─── COORDONNÉES ───",
      `Nom    : ${contact.name}`,
      `Email  : ${contact.email}`,
      `Tél    : ${contact.phone || "(non renseigné)"}`,
      "",
      "─── PROGRAMME ───",
      `Programme choisi : ${program?.title ?? "(aucun — bilan libre)"}`,
      "",
      "─── BILAN ───",
      `Genre        : ${answers.gender === "male" ? "Homme" : "Femme"}`,
      `Âge          : ${answers.age} ans`,
      `Morphologie  : ${morph?.label}`,
      `Objectif     : ${goal?.label}`,
      `Fréquence    : ${freq?.label}`,
      `Évolution    : ${trend?.label}`,
      `Zones sensibles : ${probs || "—"}`,
      `% graisse estimé : ${bf?.label}`,
      `Poids / Taille : ${answers.weight} kg · ${answers.height} cm`,
      imc ? `IMC          : ${imc.toFixed(1)} (${imcCategory(imc).label})` : "",
      "",
      "─── PROCHAINE ÉTAPE ───",
      "Recontacter le prospect pour valider le coaching avant paiement.",
    ].filter(Boolean);
  };

  const [sending, setSending] = useState(false);
  const handleSubmit = async () => {
    if (!contact.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      toast.error("Nom et email valides requis.");
      return;
    }
    setSending(true);
    const bodyLines = buildEmailBody();
    const subject = `Nouveau prospect — ${contact.name}${program ? " · " + program.title : ""}`;
    recordSubmittedLead({
      email: contact.email, name: contact.name, phone: contact.phone,
      step: "Bilan complet envoyé", program: program?.title,
      date: new Date().toISOString(), payload: { ...answers, imc },
    });
    const ok = await sendCoachEmail({
      subject, bodyLines, replyTo: contact.email,
      extra: {
        nom: contact.name, email: contact.email, telephone: contact.phone,
        programme: program?.title ?? "Bilan libre",
      },
    });
    setSending(false);
    if (ok) {
      toast.success("Bilan envoyé au coach. Il te recontacte sous 24h.");
    } else {
      toast.message("Envoi direct indisponible — ouverture de ton client mail.");
      openCoachMailto({ subject, bodyLines, replyTo: contact.email });
    }
    setSubmitted(true);
  };

  return (
    <>
      <PageHeader
        eyebrow={program ? `Programme : ${program.title}` : "Bilan gratuit"}
        title={<>Commence ton <span className="text-gradient-gold">coaching</span></>}
        subtitle="10 questions, 2 minutes. Le coach analyse ton profil et te recontacte personnellement avant tout engagement."
      />

      <section className="py-10">
        <div className="container-luxe max-w-3xl">
          {/* Progress */}
          <div className="mb-10">
            <div className="flex justify-between text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-2">
              <span>Étape {step + 1} / {STEPS.length} · {STEP_LABELS[current]}</span>
              <span className="text-gold">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
              <div className="h-full bg-gradient-gold transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="glass-strong rounded-3xl border border-border/60 p-8 md:p-12 min-h-[460px] flex flex-col">
            <div key={current} className="flex-1 animate-fade-up">
              {current === "gender" && (
                <StepShell title="Tu es ?" subtitle="Pour adapter ton programme à ta physiologie.">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {genders.map((g) => (
                      <Choice
                        key={g.id}
                        selected={answers.gender === g.id}
                        onClick={() => setAnswers({ ...answers, gender: g.id as Gender })}
                      >
                        <GenderArt gender={g.id as Gender} />
                        <div className="font-display text-xl mt-2 text-center">{g.label}</div>
                        <div className="text-xs text-muted-foreground mt-1 text-center">{g.desc}</div>
                      </Choice>
                    ))}
                  </div>
                </StepShell>
              )}

              {current === "age" && (
                <StepShell title="Quel âge as-tu ?" subtitle="Pour adapter intensité et récupération.">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[16, 22, 28, 35, 45, 55].map((a) => (
                      <Choice key={a} selected={answers.age === a} onClick={() => setAnswers({ ...answers, age: a })}>
                        <div className="font-display text-3xl text-gradient-gold text-center">{a}</div>
                        <div className="text-xs text-muted-foreground mt-1 text-center">
                          {a < 20 ? "16-20 ans" : a < 25 ? "20-25" : a < 32 ? "25-32" : a < 40 ? "32-40" : a < 50 ? "40-50" : "50+"}
                        </div>
                      </Choice>
                    ))}
                  </div>
                </StepShell>
              )}

              {current === "morph" && (
                <StepShell title="Ta forme corporelle actuelle ?" subtitle="Sois honnête, c'est ton point de départ.">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {morphologies.map((m) => (
                      <Choice
                        key={m.id}
                        selected={answers.morph === m.id}
                        onClick={() => setAnswers({ ...answers, morph: m.id as MorphId })}
                      >
                        <MorphologyArt id={m.id as MorphId} gender={answers.gender ?? "male"} />
                        <div className="font-bold text-sm mt-2 text-center">{m.label}</div>
                        <div className="text-[11px] text-muted-foreground mt-1 text-center">{m.desc}</div>
                      </Choice>
                    ))}
                  </div>
                </StepShell>
              )}

              {current === "goal" && (
                <StepShell title="Quel est ton objectif ?" subtitle="Une seule réponse — la plus prioritaire.">
                  <Grid options={goals} selected={answers.goal} onSelect={(id) => setAnswers({ ...answers, goal: id })} />
                </StepShell>
              )}

              {current === "frequency" && (
                <StepShell title="À quelle fréquence fais-tu du sport ?" subtitle="Aujourd'hui, pas demain.">
                  <Grid options={frequencies} selected={answers.frequency} onSelect={(id) => setAnswers({ ...answers, frequency: id })} cols={2} />
                </StepShell>
              )}

              {current === "weightTrend" && (
                <StepShell title="Comment ton poids évolue-t-il ?" subtitle="Sur les 3 derniers mois.">
                  <Grid options={weightTrends} selected={answers.weightTrend} onSelect={(id) => setAnswers({ ...answers, weightTrend: id })} />
                </StepShell>
              )}

              {current === "problems" && (
                <StepShell title="Zones sensibles / douleurs ?" subtitle="Sélectionne toutes les zones concernées.">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {problemZones.map((p) => {
                      const sel = (answers.problems ?? []).includes(p.id);
                      return (
                        <Choice
                          key={p.id}
                          selected={sel}
                          onClick={() => {
                            const cur = answers.problems ?? [];
                            const isNone = p.id === "none";
                            let nxt: string[];
                            if (isNone) nxt = cur.includes("none") ? [] : ["none"];
                            else nxt = cur.includes(p.id) ? cur.filter((x) => x !== p.id) : [...cur.filter((x) => x !== "none"), p.id];
                            setAnswers({ ...answers, problems: nxt });
                          }}
                        >
                          <BodyPartArt id={p.id as any} />
                          <div className="font-bold text-sm mt-2 text-center">{p.label}</div>
                        </Choice>
                      );
                    })}
                  </div>
                </StepShell>
              )}

              {current === "bodyFat" && (
                <StepShell title="Estime ton % de graisse corporelle" subtitle="Choisis la silhouette qui te ressemble le plus.">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {bodyFatLevels.map((o) => (
                      <Choice
                        key={o.id}
                        selected={answers.bodyFat === o.id}
                        onClick={() => setAnswers({ ...answers, bodyFat: o.id })}
                      >
                        <BodyFatArt id={o.id as any} gender={answers.gender ?? "male"} />
                        <div className="font-display text-lg text-gradient-gold text-center mt-1">{o.label}</div>
                        <div className="text-[11px] text-muted-foreground mt-1 text-center">{o.desc}</div>
                      </Choice>
                    ))}
                  </div>
                </StepShell>
              )}

              {current === "metrics" && (
                <StepShell title="Ton poids et ta taille" subtitle="Pour calculer ton IMC.">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <NumberInput label="Poids (kg)" min={35} max={250} value={answers.weight}
                      onChange={(v) => setAnswers({ ...answers, weight: v })} />
                    <NumberInput label="Taille (cm)" min={120} max={230} value={answers.height}
                      onChange={(v) => setAnswers({ ...answers, height: v })} />
                  </div>
                  {imc && (
                    <div className="mt-8 p-6 rounded-2xl glass border border-gold/30 text-center">
                      <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Ton IMC</div>
                      <div className="font-display text-5xl text-gradient-gold mt-2">{imc.toFixed(1)}</div>
                      <div className={`mt-2 text-sm font-bold ${imcCategory(imc).color}`}>
                        {imcCategory(imc).label}
                      </div>
                    </div>
                  )}
                </StepShell>
              )}

              {current === "contact" && (
                <StepShell title="Tes coordonnées" subtitle="Le coach Cheyson te recontacte personnellement pour échanger avant tout engagement.">
                  <div className="space-y-4">
                    <ContactField label="Nom complet *" icon={<User className="h-4 w-4" />}>
                      <input className="input-quiz" maxLength={80} required
                        value={contact.name}
                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                        placeholder="Jean Dupont" />
                    </ContactField>
                    <ContactField label="Email *" icon={<Mail className="h-4 w-4" />}>
                      <input className="input-quiz" type="email" maxLength={120} required
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        placeholder="jean@email.com" />
                    </ContactField>
                    <ContactField label="Téléphone / WhatsApp" icon={<Phone className="h-4 w-4" />}>
                      <input className="input-quiz" maxLength={20}
                        value={contact.phone}
                        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                        placeholder="+33 6 …" />
                    </ContactField>
                    <p className="text-[11px] text-muted-foreground pt-2">
                      Aucun paiement n'est demandé. Le coach valide d'abord ton profil par échange direct.
                    </p>
                  </div>
                </StepShell>
              )}

              {current === "result" && (
                <ResultStep
                  answers={answers}
                  imc={imc}
                  program={program}
                  contact={contact}
                  submitted={submitted}
                  sending={sending}
                  onSubmit={handleSubmit}
                />
              )}
            </div>

            {/* Footer nav */}
            {current !== "result" && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/40">
                <button onClick={prev} disabled={step === 0}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass border border-border text-xs uppercase tracking-widest disabled:opacity-30">
                  <ArrowLeft className="h-4 w-4" /> Retour
                </button>
                <button onClick={next} disabled={!canNext}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-gold text-primary-foreground text-xs font-bold uppercase tracking-widest shadow-gold disabled:opacity-30 disabled:shadow-none hover:scale-[1.03] transition-transform">
                  {step === STEPS.length - 2 ? "Voir mes résultats" : "Suivant"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        .input-quiz {
          width: 100%;
          background: oklch(0.12 0.008 240 / 0.6);
          border: 1px solid oklch(1 0 0 / 0.08);
          border-radius: 0.75rem;
          padding: 0.85rem 1rem;
          color: var(--foreground);
          font-size: 0.875rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-quiz:focus { outline: none; border-color: var(--gold); box-shadow: 0 0 0 3px oklch(0.82 0.16 85 / 0.15); }
      `}</style>
    </>
  );
}

// ============ UI helpers ============
function StepShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-3xl md:text-4xl">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function Choice({ selected, onClick, children }: { selected?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick}
      className={`relative text-left p-4 rounded-2xl border-2 transition-all hover:scale-[1.02] ${
        selected ? "border-gold bg-gold/10 shadow-gold" : "border-border/60 glass hover:border-gold/60"
      }`}>
      {selected && (
        <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-gradient-gold flex items-center justify-center z-10">
          <Check className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
      )}
      {children}
    </button>
  );
}

function Grid({ options, selected, onSelect, cols = 3 }: {
  options: QuizOption[]; selected?: string; onSelect: (id: string) => void; cols?: number;
}) {
  return (
    <div className={`grid gap-3 ${cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 md:grid-cols-3"}`}>
      {options.map((o) => (
        <Choice key={o.id} selected={selected === o.id} onClick={() => onSelect(o.id)}>
          {o.emoji && <div className="text-3xl mb-2">{o.emoji}</div>}
          <div className="font-bold text-sm">{o.label}</div>
          {o.desc && <div className="text-xs text-muted-foreground mt-1">{o.desc}</div>}
        </Choice>
      ))}
    </div>
  );
}

function NumberInput({ label, min, max, value, onChange }: {
  label: string; min: number; max: number; value?: number; onChange: (n: number) => void;
}) {
  return (
    <label className="block space-y-3">
      <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      <input type="number" min={min} max={max} value={value ?? ""}
        onChange={(e) => onChange(e.target.value ? Math.max(min, Math.min(max, parseInt(e.target.value))) : 0)}
        className="w-full bg-card border border-border rounded-xl px-4 py-4 text-2xl font-display text-center text-gradient-gold focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
        placeholder={`${min}-${max}`} />
    </label>
  );
}

function ContactField({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground inline-flex items-center gap-2">
        <span className="text-gold">{icon}</span> {label}
      </span>
      {children}
    </label>
  );
}

function ResultStep({ answers, imc, program, contact, submitted, sending, onSubmit }: any) {
  if (submitted) {
    return (
      <div className="text-center py-8 space-y-6">
        <div className="mx-auto h-20 w-20 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
          <Trophy className="h-10 w-10 text-primary-foreground" />
        </div>
        <h2 className="font-display text-4xl">Bilan envoyé !</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Le coach Cheyson a reçu ton bilan complet et tes coordonnées. Tu reçois sa réponse personnalisée sous 24h.
          Aucun paiement n'est demandé à ce stade — vous échangerez d'abord directement.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-gold text-primary-foreground text-xs font-bold uppercase tracking-widest shadow-gold">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  const morph = morphologies.find((m) => m.id === answers.morph);
  const goal = goals.find((g) => g.id === answers.goal);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl">Récapitulatif de ton bilan</h2>
        <p className="text-sm text-muted-foreground mt-2">Vérifie les infos, puis envoie au coach.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Recap label="Nom" value={contact.name || "—"} />
        <Recap label="Email" value={contact.email || "—"} />
        <Recap label="Téléphone" value={contact.phone || "—"} />
        <Recap label="Genre" value={answers.gender === "male" ? "Homme" : answers.gender === "female" ? "Femme" : "—"} />
        <Recap label="Âge" value={`${answers.age ?? "?"} ans`} />
        <Recap label="Morphologie" value={morph?.label ?? "—"} />
        <Recap label="Objectif" value={`${goal?.emoji ?? ""} ${goal?.label ?? "—"}`} />
        <Recap label="Fréquence sport" value={frequencies.find((f) => f.id === answers.frequency)?.label ?? "—"} />
        <Recap label="Évolution poids" value={weightTrends.find((w) => w.id === answers.weightTrend)?.label ?? "—"} />
        <Recap label="% graisse estimé" value={bodyFatLevels.find((b) => b.id === answers.bodyFat)?.label ?? "—"} />
        <Recap label="Zones sensibles" value={(answers.problems ?? []).map((id: string) => problemZones.find((p) => p.id === id)?.label).join(", ") || "—"} />
        <Recap label="Poids / Taille" value={`${answers.weight ?? "?"} kg · ${answers.height ?? "?"} cm`} />
      </div>

      {imc && (
        <div className="p-6 rounded-2xl bg-gradient-to-br from-gold/10 to-transparent border border-gold/30 text-center">
          <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Indice de masse corporelle</div>
          <div className="font-display text-5xl text-gradient-gold mt-2">{imc.toFixed(1)}</div>
          <div className={`mt-2 text-sm font-bold ${imcCategory(imc).color}`}>{imcCategory(imc).label}</div>
        </div>
      )}

      {program && (
        <div className="p-5 rounded-2xl bg-accent/10 border border-accent/30">
          <div className="text-[11px] uppercase tracking-[0.3em] text-accent mb-1">Programme choisi</div>
          <div className="font-display text-xl">{program.title}</div>
          <p className="text-xs text-muted-foreground mt-1">{program.tagline}</p>
        </div>
      )}

      {/* Visualisation finale : ton physique actuel → objectif */}
      {answers.gender && answers.morph && (
        <div className="p-6 rounded-2xl glass-strong border border-gold/30 text-center space-y-3">
          <div className="text-[11px] uppercase tracking-[0.3em] text-gold">Ta transformation potentielle</div>
          <SummaryArt gender={answers.gender} morph={answers.morph} />
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Voici ton point de départ et l'objectif réaliste que le coach va t'aider à atteindre.
          </p>
        </div>
      )}

      <div className="space-y-3 pt-4 border-t border-border/40">
        <button onClick={onSubmit} disabled={sending}
          className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-gold text-primary-foreground text-sm font-bold uppercase tracking-widest shadow-gold hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:scale-100">
          {sending ? "Envoi en cours…" : <>Envoyer mon bilan au coach <ArrowRight className="h-4 w-4" /></>}
        </button>
        <p className="text-[11px] text-muted-foreground text-center">
          Le coach reçoit automatiquement ton bilan complet et te recontacte sous 24h — pas de paiement à ce stade.
        </p>
      </div>
    </div>
  );
}

function Recap({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 rounded-xl glass border border-border/60">
      <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
      <div className="text-sm mt-1 break-words">{value}</div>
    </div>
  );
}
