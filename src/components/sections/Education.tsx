import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import { certifications, education } from "@/data/profile";

export default function Education() {
  return (
    <section id="education" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading index="06" eyebrow="Education" title="Education & certificates" />

        <div className="grid gap-5 md:grid-cols-3">
          {education.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.08} className="h-full">
              <TiltCard className={`glass h-full p-6 ${i === 0 ? "glow-border" : ""}`}>
                <p className="font-display text-3xl font-semibold text-gradient">{e.score}</p>
                <h3 className="mt-4 font-display text-lg font-semibold">{e.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{e.place}</p>
                {e.period && <p className="mt-3 font-mono text-xs text-muted">{e.period}</p>}
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-5">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">Certifications</h3>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {certifications.map((c) => (
                <li key={c} className="flex items-start gap-3 text-foreground/85">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-[11px] text-accent">✓</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
