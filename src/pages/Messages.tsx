import { useState, useEffect, useRef, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { Send, Search, Paperclip, Phone, Video, MoreVertical } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { clients, conversations, type Message } from "@/data/mock";

export default function Messages() {
  const [params] = useSearchParams();
  const initialId = params.get("client") || clients[0].id;
  const [activeId, setActiveId] = useState(initialId);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [convos, setConvos] = useState<Record<string, Message[]>>(conversations);
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = clients.find((c) => c.id === activeId)!;
  const messages = convos[activeId] || [];
  const filtered = clients.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [activeId, messages.length]);

  const send = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      fromCoach: true,
      text: draft.trim(),
      time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
    };
    setConvos({ ...convos, [activeId]: [...messages, newMsg] });
    setDraft("");
  };

  return (
    <>
      <PageHeader
        eyebrow="Messagerie"
        title={<>Coach ↔ <span className="text-gradient-gold">Clients</span></>}
        subtitle="Suivi en temps réel, ajustements et motivation au quotidien."
      />

      <section className="pb-20">
        <div className="container-luxe">
          <div className="glass-strong rounded-3xl border border-border/60 overflow-hidden grid md:grid-cols-[320px_1fr] h-[700px]">
            {/* Sidebar list */}
            <aside className="border-r border-border/40 flex flex-col">
              <div className="p-4 border-b border-border/40">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    value={query} onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher un client…"
                    className="w-full pl-9 pr-3 py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:border-gold"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-auto divide-y divide-border/40">
                {filtered.map((c) => {
                  const last = convos[c.id]?.[convos[c.id].length - 1];
                  return (
                    <button
                      key={c.id} onClick={() => setActiveId(c.id)}
                      className={`w-full flex items-center gap-3 p-4 text-left hover:bg-gold/5 transition-colors ${activeId === c.id ? "bg-gold/10" : ""}`}
                    >
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground text-xs font-bold">
                          {c.avatar}
                        </div>
                        {c.status === "active" && <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 border-2 border-card" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold truncate">{c.name}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {last ? (last.fromCoach ? "Toi : " : "") + last.text : "Aucun message"}
                        </div>
                      </div>
                      {last && <div className="text-[10px] text-muted-foreground self-start">{last.time}</div>}
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Conversation */}
            <div className="flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-border/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground text-xs font-bold">
                    {active.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{active.name}</div>
                    <div className="text-xs text-green-400">En ligne</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <IconBtn><Phone className="h-4 w-4" /></IconBtn>
                  <IconBtn><Video className="h-4 w-4" /></IconBtn>
                  <IconBtn><MoreVertical className="h-4 w-4" /></IconBtn>
                </div>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-auto p-6 space-y-4">
                {messages.length === 0 && (
                  <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                    Démarre la conversation avec {active.name.split(" ")[0]}.
                  </div>
                )}
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.fromCoach ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                      m.fromCoach
                        ? "bg-gradient-gold text-primary-foreground rounded-br-md"
                        : "glass border border-border/40 rounded-bl-md"
                    }`}>
                      <div>{m.text}</div>
                      <div className={`text-[10px] mt-1 ${m.fromCoach ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Composer */}
              <form onSubmit={send} className="p-4 border-t border-border/40 flex items-center gap-2">
                <IconBtn><Paperclip className="h-4 w-4" /></IconBtn>
                <input
                  value={draft} onChange={(e) => setDraft(e.target.value)} maxLength={1000}
                  placeholder="Écris ton message…"
                  className="flex-1 bg-card border border-border rounded-full px-4 py-3 text-sm focus:outline-none focus:border-gold"
                />
                <button
                  type="submit" disabled={!draft.trim()}
                  className="h-11 w-11 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground shadow-gold disabled:opacity-40 disabled:shadow-none hover:scale-105 transition-transform"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button type="button" className="h-9 w-9 rounded-full glass border border-border/40 flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
      {children}
    </button>
  );
}
