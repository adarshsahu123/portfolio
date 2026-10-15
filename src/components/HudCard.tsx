import Image from "next/image";
import { profile } from "@/data/profile";

function Corner({ className }: { className: string }) {
  return <span aria-hidden className={`absolute h-5 w-5 border-accent ${className}`} />;
}

// Sci-fi "identity card" framing the portrait.
export default function HudCard() {
  const rows = [
    ["NAME", profile.name],
    ["ROLE", profile.role],
    ["TARGET", "AI Engineer"],
    ["BASE", profile.location],
  ];

  return (
    <div className="relative mx-auto w-full max-w-[400px]">
      <div aria-hidden className="absolute -inset-8 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(34,211,238,0.22),transparent)] blur-2xl" />
      <div aria-hidden className="absolute -inset-8 translate-x-10 translate-y-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(168,85,247,0.22),transparent)] blur-2xl" />

      <div className="relative rounded-2xl border border-border bg-[#060915]/85 p-3 backdrop-blur-xl">
        <Corner className="-left-px -top-px rounded-tl-2xl border-l-2 border-t-2" />
        <Corner className="-right-px -top-px rounded-tr-2xl border-r-2 border-t-2" />
        <Corner className="-bottom-px -left-px rounded-bl-2xl border-b-2 border-l-2" />
        <Corner className="-bottom-px -right-px rounded-br-2xl border-b-2 border-r-2" />

        {/* header */}
        <div className="flex items-center justify-between px-1 pb-3 font-mono text-[10px] tracking-[0.2em] text-muted">
          <span>ID // AKS-001</span>
          <span className="flex items-center gap-1.5 text-accent-3">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-3" /> LIVE
          </span>
        </div>

        {/* portrait */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[radial-gradient(120%_80%_at_50%_15%,#16264a_0%,#0a0f22_55%,#05070f_100%)]">
          <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />
          <div aria-hidden className="absolute left-1/2 top-[14%] h-48 w-48 -translate-x-1/2 rounded-full bg-accent/25 blur-3xl" />
          <Image
            src="/images/adarsh-portrait.webp"
            alt={`Portrait of ${profile.name}`}
            fill
            priority
            sizes="(min-width: 768px) 400px, 90vw"
            className="object-cover object-top"
          />
          {/* face-lock box */}
          <div aria-hidden className="absolute left-[27%] top-[9%] h-[40%] w-[46%]">
            <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-accent" />
            <span className="absolute right-0 top-0 h-4 w-4 border-r border-t border-accent" />
            <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-accent" />
            <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-accent" />
            <span className="absolute -top-5 left-0 rounded-sm bg-accent px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-wider text-background">
              SUBJECT · MATCH
            </span>
          </div>
          {/* scanning beam */}
          <div aria-hidden className="animate-scan absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-accent/15 to-transparent">
            <div className="absolute inset-x-0 top-1/2 h-px bg-accent/70 shadow-[0_0_12px_var(--accent)]" />
          </div>
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#060915] to-transparent" />
        </div>

        {/* telemetry */}
        <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 px-1 font-mono text-[11px]">
          {rows.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-muted">{k}</dt>
              <dd className={`truncate text-right ${k === "TARGET" ? "text-gradient font-semibold" : "text-foreground/90"}`}>{v}</dd>
            </div>
          ))}
        </dl>

        {/* training progress */}
        <div className="mt-3 rounded-lg border border-border bg-background/60 p-2.5">
          <div className="flex justify-between font-mono text-[10px] tracking-wider text-muted">
            <span>TRAINING · adarsh → ai-engineer</span>
            <span className="text-accent">58%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-strong">
            <div
              className="relative h-full w-[58%] overflow-hidden rounded-full bg-gradient-to-r from-accent to-accent-2"
              style={{ animation: "train 2.2s cubic-bezier(0.22,1,0.36,1) 1.8s both" }}
            >
              <span className="animate-shimmer absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* floating tags */}
      <span className="animate-float-slow absolute -left-3 top-[30%] z-10 rounded-lg border border-border bg-[#0a0e1d]/95 px-2.5 py-1.5 font-mono text-[11px] shadow-xl md:-left-12">
        <span className="text-accent">●</span> python
      </span>
      <span
        className="animate-float-slow absolute -right-3 top-[52%] z-10 rounded-lg border border-border bg-[#0a0e1d]/95 px-2.5 py-1.5 font-mono text-[11px] shadow-xl md:-right-12"
        style={{ animationDelay: "-3.5s" }}
      >
        <span className="text-accent-2">●</span> rag · llms
      </span>
    </div>
  );
}
