import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";
import { skillGroups, type SkillLevel } from "@/data/profile";

const levelStyle: Record<SkillLevel, { dot: string; chip: string; meter: number }> = {
  strong: { dot: "bg-accent", chip: "border-accent/30 bg-accent/10 text-accent", meter: 3 },
  working: { dot: "bg-accent-3", chip: "border-accent-3/25 bg-accent-3/5 text-accent-3", meter: 2 },
  learning: { dot: "bg-accent-2", chip: "border-dashed border-accent-2/40 bg-accent-2/5 text-[#c4a1ff]", meter: 1 },
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title="An honest skill map"
          subtitle="No inflated percentages — just where I'm confident, where I'm comfortable, and what I'm learning right now."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {skillGroups.map((g, i) => {
            const s = levelStyle[g.level];
            return (
              <Reveal key={g.level} delay={i * 0.1} className="h-full">
                <TiltCard className="glass h-full p-6 md:p-7">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-semibold">{g.title}</h3>
                    <div className="flex gap-1" role="img" aria-label={`Level ${s.meter} of 3`}>
                      {[1, 2, 3].map((n) => (
                        <span key={n} className={`h-1.5 w-5 rounded-full ${n <= s.meter ? s.dot : "bg-border"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-muted">{g.caption}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {g.skills.map((skill) => (
                      <li key={skill} className={`rounded-lg border px-3 py-1.5 text-sm ${s.chip}`}>
                        {g.level === "learning" && (
                          <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent-2 align-middle" />
                        )}
                        {skill}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
