import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="inline-flex items-center rounded-full glass border border-border/60 p-0.5 text-[11px] font-bold tracking-widest">
      {(["fr", "en"] as const).map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={cn(
            "px-3 py-1.5 rounded-full transition-all uppercase",
            lang === code
              ? "bg-gradient-gold text-primary-foreground shadow-gold"
              : "text-muted-foreground hover:text-foreground",
          )}
          aria-pressed={lang === code}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
