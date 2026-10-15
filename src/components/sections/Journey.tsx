import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { roadmap } from "@/data/profile";

// "Learning curve" chart: confusion goes down epoch by epoch.
function LearningCurve({ current, total }: { current: number; total: number }) {
  const w = 320;
  const h = 140;
  const pts = Array.from({ length: total }, (_, i) => {
    const x = 16 + (i / (total - 1)) * (w - 32);
    const y = 20 + (h - 44) * (1 - Math.exp(-i * 0.55)) ;
    return [x, h - y + 4] as const;
  });
  const done = pts.slice(0, current + 1);
  const toPath = (p: readonly (readonly [number, number])[]) => p.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full" role="img" aria-label="Learning curve: confusion decreasing over time">
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1="16" x2={w - 16} y1={h * f} y2={h * f} stroke="rgba(148,163,255,0.1)" strokeDasharray="3 4" />
      ))}
      <path d={toPath(pts)} fill="none" stroke="rgba(148,163,255,0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
      <path d={toPath(done)} fill="none" stroke="url(#lc)" strokeWidth="2.5" strokeLinecap="round" />
      <defs>
        <linearGradient id="lc" x1="0" x2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === current ? 5 : 3} fill={i <= current ? (i === current ? "#a855f7" : "#22d3ee") : "#03040a"} stroke={i > current ? "rgba(148,163,255,0.4)" : "none"}>
          {i === current && <animate attributeName="r" values="4;7;4" dur="1.8s" repeatCount="indefinite" />}
        </circle>
      ))}
      <text x="16" y="12" fill="#8790ab" fontSize="9" fontFamily="monospace" letterSpacing="1.5">CONFUSION ↓</text>
      <text x={w - 16} y={h - 2} fill="#8790ab" fontSize="9" fontFamily="monospace" textAnchor="end" letterSpacing="1.5">EPOCHS →</text>
    </svg>
  );
}

export default function Journey() {
  const current = roadmap.findIndex((r) => r.status === "now");
  const doneCount = roadmap.filter((r) => r.status === "done").length;
  const pct = Math.round(((doneCount + 0.5) / roadmap.length) * 100);

  return (
    <section id="journey" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          index="05"
          eyebrow="Journey"
          title="Training run: AI engineer"
          subtitle="I treat my growth like training a model — one epoch at a time. Here's the live run."
        />

        <div className="grid gap-5 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <div className="glass glow-border h-full rounded-3xl p-6 md:p-8">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em]">
                <span className="text-muted">run · adarsh → ai-engineer</span>
                <span className="flex items-center gap-1.5 text-accent-3">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-3" /> training
                </span>
              </div>
              <p className="mt-6 font-display text-6xl font-semibold text-gradient">{pct}%</p>
              <p className="mt-1 font-mono text-xs text-muted">
                epoch {current + 1} / {roadmap.length}
              </p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-strong">
                <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2" style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-8">
                <LearningCurve current={current} total={roadmap.length} />
              </div>
            </div>
          </Reveal>

          <ol className="space-y-3">
            {roadmap.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.05}>
                <li
                  className={`flex items-center gap-4 rounded-2xl border p-4 md:p-5 ${
                    step.status === "now"
                      ? "border-accent-2/50 bg-accent-2/10 shadow-[0_0_40px_-15px_var(--accent-2)]"
                      : step.status === "done"
                        ? "glass"
                        : "border-dashed border-border bg-transparent opacity-60"
                  }`}
                >
                  <span className="w-16 shrink-0 font-mono text-[11px] text-muted">EPOCH {String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs ${
                      step.status === "done"
                        ? "bg-accent/15 text-accent"
                        : step.status === "now"
                          ? "bg-accent-2 text-background"
                          : "border border-border text-muted"
                    }`}
                  >
                    {step.status === "done" ? "✓" : step.status === "now" ? "◉" : "○"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{step.title}</p>
                    <p className="truncate text-sm text-muted">{step.detail}</p>
                  </div>
                  <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:block">
                    {step.status === "done" ? "converged" : step.status === "now" ? "training" : "queued"}
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
