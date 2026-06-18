import { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  className?: string;
}

export default function PageHeader({ eyebrow, title, subtitle, className = "" }: PageHeaderProps) {
  return (
    <section className={`relative pt-36 pb-16 overflow-hidden ${className}`}>
      <div className="absolute inset-0 -z-10 bg-radial-gold opacity-60" />
      <div className="absolute inset-x-0 bottom-0 h-px divider-gold" />
      <div className="container-luxe text-center animate-fade-up">
        {eyebrow && (
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass border border-gold/30 text-[11px] tracking-[0.32em] uppercase mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-glow" />
            <span className="text-gold">{eyebrow}</span>
          </div>
        )}
        <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
