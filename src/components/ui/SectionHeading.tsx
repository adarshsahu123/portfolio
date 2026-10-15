import Reveal from "./Reveal";
import ScrambleText from "./ScrambleText";

export default function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
}: {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-12 md:mb-16">
      <Reveal>
        <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted">
          <span className="text-accent">[{index}]</span>
          <span>{`// ${eyebrow}`}</span>
          <span className="h-px max-w-40 flex-1 bg-gradient-to-r from-border to-transparent" />
        </p>
      </Reveal>
      <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
        <ScrambleText text={title} />
      </h2>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
