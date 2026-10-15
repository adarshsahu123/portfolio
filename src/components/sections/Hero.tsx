import HudCard from "@/components/HudCard";
import Reveal from "@/components/ui/Reveal";
import ScrambleText from "@/components/ui/ScrambleText";
import Typewriter from "@/components/ui/Typewriter";
import { DownloadIcon, GithubIcon, LinkedinIcon, MailIcon } from "@/components/ui/Icons";
import { about, profile } from "@/data/profile";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
      {/* aurora */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-[10%] h-[480px] w-[480px] rounded-full bg-accent/15 blur-[130px]" />
        <div className="absolute right-[5%] top-[25%] h-[520px] w-[520px] rounded-full bg-accent-2/15 blur-[140px]" />
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-4 md:px-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
        <div>
          <Reveal>
            <div className="inline-flex items-center gap-3 rounded-full border border-accent/25 bg-accent/5 py-1.5 pl-2 pr-4 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-background">LIVE</span>
              System online · open to opportunities
            </div>
          </Reveal>

          <h1 className="mt-7 font-display font-bold leading-[0.88] tracking-[-0.04em]">
            <span className="block text-[clamp(3.6rem,11vw,9rem)]">
              <ScrambleText text="ADARSH" className="text-gradient" />
            </span>
            <span className="text-outline block text-[clamp(2.4rem,7.4vw,6rem)]">KUMAR SAHU</span>
          </h1>

          <Reveal delay={0.15}>
            <div className="mt-7 flex flex-wrap items-center gap-3 font-mono text-sm">
              <span className="rounded-md border border-border bg-surface px-3 py-1.5">{profile.role}</span>
              <span className="flex items-center gap-1 text-accent">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent" />▶
              </span>
              <span className="rounded-md border border-accent-2/40 bg-accent-2/10 px-3 py-1.5 text-[#d2b4ff]">
                AI Engineer <span className="text-muted">(in training)</span>
              </span>
            </div>
            <p className="mt-5 h-7 font-mono text-base text-accent-3 sm:text-lg">
              <span className="text-muted">$ </span>
              <Typewriter lines={profile.typingLines} />
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{profile.intro}</p>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-foreground px-6 py-3.5 font-medium text-background transition hover:shadow-[0_0_50px_-10px_var(--accent)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-accent to-accent-2 transition-transform duration-500 group-hover:translate-x-0" />
                <span className="relative">Explore my work</span>
                <span className="relative transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href={profile.resume}
                download
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 font-medium transition hover:border-accent/60 hover:text-accent"
              >
                <DownloadIcon width={18} height={18} /> Resume
              </a>
              <div className="flex items-center">
                {[
                  { href: profile.github, label: "GitHub", Icon: GithubIcon },
                  { href: profile.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
                  { href: `mailto:${profile.email}`, label: "Email", Icon: MailIcon },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-12 w-12 place-items-center rounded-xl text-muted transition hover:text-accent"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.45}>
            <dl className="mt-12 grid max-w-lg grid-cols-3 divide-x divide-border border-y border-border py-4">
              {about.stats.slice(0, 3).map((s) => (
                <div key={s.label} className="px-4 first:pl-0">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{s.label}</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={40}>
          <HudCard />
        </Reveal>
      </div>
    </section>
  );
}
