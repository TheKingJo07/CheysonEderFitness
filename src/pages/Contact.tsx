import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Instagram, Youtube, Send, Zap, Clock, Shield } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "@/components/layout/PageHeader";
import { sendCoachEmail, openCoachMailto } from "@/lib/coachLead";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "coaching", message: "" });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Tous les champs obligatoires doivent être remplis.");
      return;
    }
    setLoading(true);
    const subject = `Contact site — ${form.subject} — ${form.name}`;
    const bodyLines = [
      "🔔 NOUVEAU MESSAGE DEPUIS LE SITE",
      "",
      `Nom    : ${form.name}`,
      `Email  : ${form.email}`,
      `Tél    : ${form.phone || "(non renseigné)"}`,
      `Sujet  : ${form.subject}`,
      "",
      "─── MESSAGE ───",
      form.message,
    ];
    const ok = await sendCoachEmail({
      subject, bodyLines, replyTo: form.email,
      extra: { nom: form.name, email: form.email, telephone: form.phone, sujet: form.subject },
    });
    setLoading(false);
    if (ok) {
      toast.success("Message envoyé ! Le coach te répond sous 24h.");
      setForm({ name: "", email: "", phone: "", subject: "coaching", message: "" });
    } else {
      toast.message("Envoi direct indisponible — ouverture de ton client mail.");
      openCoachMailto({ subject, bodyLines, replyTo: form.email });
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={<>Parlons de <span className="text-gradient-gold">ta transformation</span>.</>}
        subtitle="Une question, un projet, une ambition ? Le coach lit chaque message personnellement."
      />

      <section className="py-12">
        <div className="container-luxe grid lg:grid-cols-5 gap-10">
          {/* Left — info & motivation */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-strong rounded-3xl p-8 border border-gold/30 shadow-gold">
              <h2 className="font-display text-3xl mb-2">Cheyson Eder</h2>
              <p className="text-sm uppercase tracking-[0.3em] text-gold mb-6">Coach sportif premium</p>
              <div className="space-y-4 text-sm">
                <Info icon={<Mail className="h-4 w-4" />} label="Email" value="contact@cheyson-eder.fit" />
                <Info icon={<Phone className="h-4 w-4" />} label="WhatsApp" value="+33 6 12 34 56 78" />
                <Info icon={<MapPin className="h-4 w-4" />} label="Studio" value="Paris · Coaching en ligne mondial" />
                <Info icon={<Clock className="h-4 w-4" />} label="Réponse" value="Sous 24h, 7j/7" />
              </div>
              <div className="mt-6 pt-6 border-t border-border/40 flex gap-3">
                <SocialBtn icon={<Instagram className="h-4 w-4" />} label="Instagram" />
                <SocialBtn icon={<Youtube className="h-4 w-4" />} label="YouTube" />
              </div>
            </div>

            <div className="space-y-4">
              <Motivation
                icon={<Zap className="h-5 w-5" />}
                title="Le bon moment, c'est maintenant."
                text="Tous ceux qui ont transformé leur corps ont commencé exactement comme toi : avec un seul message."
              />
              <Motivation
                icon={<Shield className="h-5 w-5" />}
                title="Aucun jugement, que des résultats."
                text="Peu importe ton niveau de départ. Ce qui compte, c'est où tu vas."
              />
            </div>
          </div>

          {/* Right — form */}
          <form
            onSubmit={onSubmit}
            className="lg:col-span-3 glass-strong rounded-3xl p-8 md:p-10 border border-border/60 space-y-6"
          >
            <h2 className="font-display text-3xl">Envoie un message au coach</h2>
            <p className="text-sm text-muted-foreground -mt-4">
              Réponse personnelle garantie sous 24h.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Nom complet *">
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-luxe" placeholder="Jean Dupont" maxLength={80} />
              </Field>
              <Field label="Email *">
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-luxe" placeholder="jean@email.com" maxLength={120} />
              </Field>
              <Field label="Téléphone">
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input-luxe" placeholder="+33 6 …" maxLength={20} />
              </Field>
              <Field label="Sujet">
                <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="input-luxe">
                  <option value="coaching">Coaching personnalisé</option>
                  <option value="programme">Programme PDF / ebook</option>
                  <option value="partenariat">Partenariat / sponsoring</option>
                  <option value="autre">Autre</option>
                </select>
              </Field>
            </div>
            <Field label="Message *">
              <textarea
                required rows={6} value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="input-luxe resize-none" maxLength={1500}
                placeholder="Parle-moi de tes objectifs, ton niveau, tes contraintes…"
              />
            </Field>

            <button
              type="submit" disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-gold text-primary-foreground text-sm font-bold uppercase tracking-widest shadow-gold hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:scale-100"
            >
              {loading ? "Envoi…" : <>Envoyer mon message <Send className="h-4 w-4" /></>}
            </button>
            <p className="text-[11px] text-center text-muted-foreground">
              En envoyant ce message, tu acceptes d'être recontacté par email ou téléphone.
            </p>
          </form>
        </div>
      </section>

      {/* Inline style for input-luxe via styles.css is not added; use Tailwind directly */}
      <style>{`
        .input-luxe {
          width: 100%;
          background: oklch(0.12 0.008 240 / 0.6);
          border: 1px solid oklch(1 0 0 / 0.08);
          border-radius: 0.75rem;
          padding: 0.85rem 1rem;
          color: var(--foreground);
          font-size: 0.875rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-luxe:focus {
          outline: none;
          border-color: var(--gold);
          box-shadow: 0 0 0 3px oklch(0.82 0.16 85 / 0.15);
        }
      `}</style>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 h-8 w-8 rounded-full bg-gold/10 text-gold flex items-center justify-center">{icon}</span>
      <div>
        <div className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
        <div className="text-sm">{value}</div>
      </div>
    </div>
  );
}
function SocialBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <a href="#" className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full glass border border-border hover:border-gold text-xs uppercase tracking-widest transition-colors">
      {icon} {label}
    </a>
  );
}
function Motivation({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="glass rounded-2xl p-5 border border-border/60">
      <div className="flex items-center gap-3 mb-2 text-gold">
        {icon}
        <h3 className="font-display text-lg uppercase tracking-wide">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
