import { skillGroups } from "@/data/profile";

export default function Marquee() {
  const items = skillGroups.flatMap((g) => g.skills);
  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-border bg-background/40 py-4 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      <div className="animate-marquee flex w-max gap-10">
        {[...items, ...items].map((s, i) => (
          <span key={i} className="flex items-center gap-10 font-mono text-sm uppercase tracking-[0.2em] text-muted">
            {s}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
