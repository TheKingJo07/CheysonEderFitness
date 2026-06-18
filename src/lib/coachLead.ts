// Gestion des leads / envoi automatique au coach.
// Pas de backend pour l'instant : on combine localStorage (visible dans le
// Dashboard coach) + ouverture d'un mailto pré-rempli pour envoyer un email
// automatiquement au coach lors de la soumission finale.

export const COACH_EMAIL = "cheysonederfitness@gmail.com";
const ABANDONED_KEY = "ce-abandoned-leads";
const SUBMITTED_KEY = "ce-submitted-leads";

export interface AbandonedLead {
  email: string;
  name?: string;
  phone?: string;
  step: string;
  program?: string;
  date: string;
}

export interface SubmittedLead extends AbandonedLead {
  payload: Record<string, unknown>;
}

function safeRead<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch { return []; }
}

function safeWrite<T>(key: string, value: T[]) {
  try { localStorage.setItem(key, JSON.stringify(value.slice(0, 100))); } catch { /* ignore */ }
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export function captureAbandonedLead(input: {
  email?: string;
  name?: string;
  phone?: string;
  step: string;
  program?: string;
}) {
  if (!input.email || !isEmail(input.email)) return;
  const list = safeRead<AbandonedLead>(ABANDONED_KEY);
  // dédoublonne sur (email + step)
  const exists = list.find((x) => x.email === input.email && x.step === input.step);
  if (exists) return;
  list.unshift({
    email: input.email,
    name: input.name,
    phone: input.phone,
    step: input.step,
    program: input.program,
    date: new Date().toISOString(),
  });
  safeWrite(ABANDONED_KEY, list);
}

export function getAbandonedLeads(): AbandonedLead[] {
  return safeRead<AbandonedLead>(ABANDONED_KEY);
}

export function recordSubmittedLead(lead: SubmittedLead) {
  const list = safeRead<SubmittedLead>(SUBMITTED_KEY);
  list.unshift(lead);
  safeWrite(SUBMITTED_KEY, list);
}

export function getSubmittedLeads(): SubmittedLead[] {
  return safeRead<SubmittedLead>(SUBMITTED_KEY);
}

// === ENVOI EMAIL AUTOMATIQUE VIA FORMSUBMIT ===
// FormSubmit (https://formsubmit.co) relaie les soumissions vers l'email du coach.
// AUCUN backend / inscription requis. À la 1ère soumission, le coach reçoit
// un email de confirmation à valider — ensuite tous les emails arrivent
// directement dans sa boîte mail.
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${COACH_EMAIL}`;

export async function sendCoachEmail(opts: {
  subject: string;
  bodyLines: string[];
  replyTo?: string;
  extra?: Record<string, string | undefined>;
}): Promise<boolean> {
  try {
    const res = await fetch(FORMSUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: opts.subject,
        _template: "table",
        _captcha: "false",
        _replyto: opts.replyTo ?? "",
        message: opts.bodyLines.join("\n"),
        ...opts.extra,
      }),
    });
    const json = await res.json().catch(() => ({}));
    return res.ok && (json.success === "true" || json.success === true);
  } catch {
    return false;
  }
}

// Fallback : mailto si l'envoi automatique échoue (réseau coupé, etc.)
export function openCoachMailto(opts: {
  subject: string;
  bodyLines: string[];
  replyTo?: string;
}) {
  const subject = encodeURIComponent(opts.subject);
  const body = encodeURIComponent(opts.bodyLines.join("\n"));
  const url = `mailto:${COACH_EMAIL}?subject=${subject}&body=${body}`;
  const w = window.open(url, "_blank");
  if (!w) window.location.href = url;
}
