import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import { ArrowIcon } from "@/components/ui/Icons";
import { projects } from "@/data/profile";

// Small animated diagram of a RAG pipeline for the featured card
function RagDiagram() {
  const steps = ["Docs", "Chunks", "Embed", "Retrieve", "LLM", "Answer"];
  return (
    <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <span
            className="rounded-md border bg-background/60 px-2.5 py-1.5"
            style={{ animation: `node-glow 3s ease-in-out ${i * 0.45}s infinite` }}
          >
            {s}
          </span>
          {i < steps.length - 1 && <span className="text-muted">→</span>}
        </div>
      ))}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          index="04"
          eyebrow="Projects"
          title="Things I've worked on"
          subtitle="One AI project so far, real product work behind it, and more on the way."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} className={p.featured ? "md:col-span-2" : ""}>
              <TiltCard max={p.featured ? 4 : 7} className={`glass h-full p-6 md:p-8 ${p.featured ? "glow-border" : ""}`}>
                {p.featured && (
                  <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-2/20 blur-3xl" />
                )}
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-widest text-accent">{p.tag}</p>
                      <h3 className={`mt-2 font-display font-semibold ${p.featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
                        {p.title}
                      </h3>
                    </div>
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${p.title} on GitHub`}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border text-muted transition hover:border-accent hover:text-accent"
                      >
                        <ArrowIcon width={18} height={18} />
                      </a>
                    )}
                  </div>
                  <p className={`mt-4 leading-relaxed text-muted ${p.featured ? "max-w-3xl md:text-lg" : ""}`}>
                    {p.description}
                  </p>
                  {p.featured && <RagDiagram />}
                  <ul className="mt-5 space-y-1.5 text-sm text-muted">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="text-accent-3">✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <li key={s} className="rounded-md bg-surface-strong px-2.5 py-1 font-mono text-xs text-foreground/80">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </Reveal>
          ))}

          <Reveal delay={0.3}>
            <div className="grid h-full min-h-48 place-items-center rounded-2xl border border-dashed border-border p-6 text-center">
              <div>
                <p className="font-display text-lg font-semibold">Next AI project</p>
                <p className="mt-1 text-sm text-muted">In progress — check back soon.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
