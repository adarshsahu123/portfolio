import Terminal from "@/components/Terminal";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import { about, roadmap } from "@/data/profile";

export default function About() {
  const now = roadmap.filter((r) => r.status === "now");

  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading index="01" eyebrow="About" title="From code to intelligence" />

        {/* bento grid */}
        <div className="grid gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-4 md:row-span-2">
            <div className="glass glow-border h-full rounded-3xl p-7 md:p-9">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{"// story.md"}</p>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-muted md:text-[17px]">
                {about.paragraphs.map((p, i) => (
                  <p key={i} className={i === 2 ? "border-l-2 border-accent pl-4 text-foreground/90" : ""}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          {about.stats.map((s, i) => (
            <Reveal key={s.label} delay={0.05 * i} className={i < 2 ? "md:col-span-1" : "hidden"}>
              <TiltCard className="glass h-full rounded-3xl p-6">
                <p className="font-display text-5xl font-semibold text-gradient">
                  <CountUp value={s.value} />
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{s.label}</p>
              </TiltCard>
            </Reveal>
          ))}

          <Reveal delay={0.1} className="md:col-span-2">
            <div className="glass h-full rounded-3xl p-6">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[#c4a1ff]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent-2" /> Currently training on
              </p>
              <ul className="mt-4 space-y-2">
                {now.map((r) => (
                  <li key={r.title}>
                    <p className="font-medium">{r.title}</p>
                    <p className="text-sm text-muted">{r.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-6">
            <div className="grid items-center gap-8 pt-6 md:grid-cols-[1fr_1.5fr] md:pt-10">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{"// interactive"}</p>
                <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  Don&apos;t just read about me — <span className="text-gradient">query me.</span>
                </h3>
                <p className="mt-4 text-muted">
                  Type a command like <code className="text-accent-3">whoami</code>,{" "}
                  <code className="text-accent-3">skills</code> or <code className="text-accent-3">projects</code>, or
                  tap the shortcuts. Psst — try <code className="text-accent-3">sudo hire adarsh</code>.
                </p>
              </div>
              <Terminal />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
