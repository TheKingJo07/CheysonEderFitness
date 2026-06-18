import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users, TrendingUp, Target, Activity, MessageCircle, Mail,
  ArrowUpRight, ArrowDownRight, ChevronRight, Trophy,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, CartesianGrid } from "recharts";
import PageHeader from "@/components/layout/PageHeader";
import { clients, failedSignups, type Client } from "@/data/mock";
import { getAbandonedLeads, getSubmittedLeads, type AbandonedLead } from "@/lib/coachLead";


export default function Dashboard() {
  const [selected, setSelected] = useState<Client>(clients[0]);
  const [liveAbandoned, setLiveAbandoned] = useState<AbandonedLead[]>([]);
  const [liveSubmitted, setLiveSubmitted] = useState<AbandonedLead[]>([]);

  useEffect(() => {
    setLiveAbandoned(getAbandonedLeads());
    setLiveSubmitted(getSubmittedLeads());
  }, []);


  const total = clients.length;
  const active = clients.filter((c) => c.status === "active").length;
  const completed = clients.filter((c) => c.status === "completed").length;
  const totalKgChanged = clients.reduce((acc, c) => acc + Math.abs(c.currentWeight - c.startWeight), 0);

  const monthlyData = [
    { m: "Jan", clients: 12, revenue: 4800 },
    { m: "Fév", clients: 18, revenue: 7200 },
    { m: "Mar", clients: 25, revenue: 10500 },
    { m: "Avr", clients: 31, revenue: 13900 },
    { m: "Mai", clients: 38, revenue: 17600 },
    { m: "Juin",clients: 44, revenue: 21800 },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Espace coach"
        title={<>Bonjour <span className="text-gradient-gold">Cheyson</span></>}
        subtitle="Tableau de bord global — clients, progressions et performance business."
      />

      <section className="py-10">
        <div className="container-luxe space-y-8">
          {/* KPIs */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Kpi icon={<Users className="h-5 w-5" />} label="Clients" value={total.toString()} delta="+18%" up />
            <Kpi icon={<Activity className="h-5 w-5" />} label="Actifs" value={active.toString()} delta="+12%" up />
            <Kpi icon={<Trophy className="h-5 w-5" />} label="Terminés" value={completed.toString()} delta="+5" up />
            <Kpi icon={<TrendingUp className="h-5 w-5" />} label="kg transformés" value={`${totalKgChanged.toFixed(0)} kg`} delta="-3%" />
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-strong rounded-2xl p-6 border border-border/60">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg">Croissance clients</h3>
                <span className="text-xs text-muted-foreground">6 derniers mois</span>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={monthlyData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="m" stroke="#888" fontSize={11} />
                  <YAxis stroke="#888" fontSize={11} />
                  <Tooltip
                    contentStyle={{ background: "#0f0f12", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }}
                  />
                  <Line type="monotone" dataKey="clients" stroke="oklch(0.82 0.16 85)" strokeWidth={3} dot={{ r: 4, fill: "oklch(0.82 0.16 85)" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-strong rounded-2xl p-6 border border-border/60">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg">Revenus mensuels (€)</h3>
                <span className="text-xs text-muted-foreground">6 derniers mois</span>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={monthlyData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="m" stroke="#888" fontSize={11} />
                  <YAxis stroke="#888" fontSize={11} />
                  <Tooltip contentStyle={{ background: "#0f0f12", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                  <Bar dataKey="revenue" fill="oklch(0.72 0.22 45)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Clients + selected detail */}
          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 glass-strong rounded-2xl border border-border/60 overflow-hidden">
              <div className="p-5 border-b border-border/40 flex items-center justify-between">
                <h3 className="font-display text-lg">Mes clients</h3>
                <Link to="/coach/messages" className="text-xs text-gold inline-flex items-center gap-1 hover:underline">
                  <MessageCircle className="h-3.5 w-3.5" /> Messagerie
                </Link>
              </div>
              <div className="divide-y divide-border/40 max-h-[480px] overflow-auto">
                {clients.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelected(c)}
                    className={`w-full flex items-center gap-3 p-4 text-left hover:bg-gold/5 transition-colors ${selected.id === c.id ? "bg-gold/10" : ""}`}
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground text-xs font-bold">
                      {c.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold truncate">{c.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{c.program}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-[10px] uppercase tracking-wider ${c.status === "active" ? "text-green-400" : c.status === "completed" ? "text-gold" : "text-muted-foreground"}`}>
                        {c.status}
                      </div>
                      <div className="text-[10px] text-muted-foreground">{c.lastActive}</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 glass-strong rounded-2xl p-6 border border-border/60 space-y-5">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground text-base font-bold">
                  {selected.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-2xl">{selected.name}</h3>
                  <p className="text-xs text-muted-foreground">{selected.program} · {selected.age} ans · {selected.height} cm</p>
                </div>
                <Link to={`/coach/messages?client=${selected.id}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-gold/40 text-xs uppercase tracking-widest text-gold hover:bg-gold/10 transition-colors">
                  <MessageCircle className="h-3.5 w-3.5" /> Message
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Mini label="Poids initial" value={`${selected.startWeight} kg`} />
                <Mini label="Poids actuel" value={`${selected.currentWeight} kg`} highlight />
                <Mini label="Objectif" value={`${selected.goalWeight} kg`} />
              </div>

              <ProgressBar
                from={selected.startWeight}
                to={selected.goalWeight}
                current={selected.currentWeight}
              />

              <div>
                <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
                  <span>Séances : {selected.sessionsDone} / {selected.sessionsTotal}</span>
                  <span>{Math.round((selected.sessionsDone / selected.sessionsTotal) * 100)}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-gradient-gold" style={{ width: `${(selected.sessionsDone / selected.sessionsTotal) * 100}%` }} />
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Évolution du poids</h4>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={selected.progress}>
                    <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="week" stroke="#888" fontSize={11} tickFormatter={(v) => `S${v}`} />
                    <YAxis stroke="#888" fontSize={11} domain={["auto", "auto"]} />
                    <Tooltip contentStyle={{ background: "#0f0f12", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
                    <Line type="monotone" dataKey="weight" stroke="oklch(0.72 0.22 45)" strokeWidth={3} dot={{ r: 4, fill: "oklch(0.72 0.22 45)" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Failed signups capture */}
          <div className="glass-strong rounded-2xl border border-border/60 overflow-hidden">
            <div className="p-5 border-b border-border/40 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gold" /> Bilans envoyés & abandons
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Prospects ayant rempli un bilan, soumis ou abandonné — relance possible.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] uppercase tracking-widest">
                {liveAbandoned.length + liveSubmitted.length + failedSignups.length} leads
              </span>
            </div>
            <div className="divide-y divide-border/40">
              {liveSubmitted.map((s) => (
                <LeadRow key={`s-${s.email}-${s.date}`} email={s.email} step={`✅ Bilan complet · ${s.program ?? "Bilan libre"}`} date={fmtDate(s.date)} />
              ))}
              {liveAbandoned.map((s) => (
                <LeadRow key={`a-${s.email}-${s.step}`} email={s.email} step={`⚠️ Abandon · ${s.step}${s.program ? " · " + s.program : ""}`} date={fmtDate(s.date)} />
              ))}
              {failedSignups.map((s) => (
                <LeadRow key={s.email} email={s.email} step={s.step} date={s.date} />
              ))}
              {liveSubmitted.length + liveAbandoned.length === 0 && (
                <div className="p-6 text-center text-xs text-muted-foreground">
                  Les leads réels apparaîtront ici dès qu'un prospect remplira le bilan.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function fmtDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
  } catch { return iso; }
}

function LeadRow({ email, step, date }: { email: string; step: string; date: string }) {
  return (
    <div className="p-4 flex items-center justify-between gap-3 text-sm">
      <div className="flex-1 min-w-0">
        <div className="font-bold truncate">{email}</div>
        <div className="text-xs text-muted-foreground">{step}</div>
      </div>
      <div className="text-xs text-muted-foreground hidden sm:block">{date}</div>
      <a href={`mailto:${email}`}
        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-gold text-primary-foreground text-[10px] uppercase tracking-widest font-bold">
        Relancer
      </a>
    </div>
  );
}

function Kpi({ icon, label, value, delta, up }: { icon: React.ReactNode; label: string; value: string; delta: string; up?: boolean }) {
  return (
    <div className="glass-strong rounded-2xl p-5 border border-border/60 hover-lift">
      <div className="flex items-center justify-between mb-3">
        <span className="h-9 w-9 rounded-full bg-gold/10 text-gold flex items-center justify-center">{icon}</span>
        <span className={`inline-flex items-center gap-1 text-xs ${up ? "text-green-400" : "text-red-400"}`}>
          {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />} {delta}
        </span>
      </div>
      <div className="font-display text-3xl text-gradient-gold">{value}</div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function Mini({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`p-3 rounded-xl border ${highlight ? "border-gold/40 bg-gold/5" : "border-border/40 glass"}`}>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`font-display text-xl mt-1 ${highlight ? "text-gradient-gold" : ""}`}>{value}</div>
    </div>
  );
}

function ProgressBar({ from, to, current }: { from: number; to: number; current: number }) {
  const total = Math.abs(to - from);
  const done = Math.abs(current - from);
  const pct = total === 0 ? 0 : Math.min(100, Math.max(0, (done / total) * 100));
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">Vers l'objectif</span>
        <span className="text-gold font-bold flex items-center gap-1"><Target className="h-3 w-3" />{pct.toFixed(0)}%</span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div className="h-full bg-gradient-fire" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
