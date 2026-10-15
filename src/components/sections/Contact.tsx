import Reveal from "@/components/ui/Reveal";
import { DownloadIcon, GithubIcon, LinkedinIcon, MailIcon } from "@/components/ui/Icons";
import { profile } from "@/data/profile";

export default function Contact() {
  const channels = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon },
    { label: "LinkedIn", value: "in/aks111", href: profile.linkedin, Icon: LinkedinIcon },
    { label: "GitHub", value: "adarshsahu123", href: profile.github, Icon: GithubIcon },
  ];

  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <div className="glass glow-border relative overflow-hidden rounded-3xl px-6 py-14 text-center md:px-16 md:py-20">
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent-2/20 blur-3xl" />

            <p className="relative font-mono text-xs uppercase tracking-[0.25em] text-accent">07 — Contact</p>
            <h2 className="relative mt-4 font-display text-4xl font-semibold tracking-tight md:text-6xl">
              Let&apos;s build something <span className="text-gradient">intelligent</span>
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-muted md:text-lg">
              I&apos;m looking for roles and projects where I can grow as an AI engineer. If you have an opportunity — or
              just want to talk tech — my inbox is open.
            </p>

            <div className="relative mt-10 flex flex-wrap justify-center gap-3">
              {channels.map(({ label, value, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-background/40 px-5 py-3.5 text-left transition hover:-translate-y-0.5 hover:border-accent/60"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-surface-strong text-accent transition group-hover:bg-accent group-hover:text-background">
                    <Icon />
                  </span>
                  <span>
                    <span className="block text-xs text-muted">{label}</span>
                    <span className="block text-sm font-medium">{value}</span>
                  </span>
                </a>
              ))}
            </div>

            <a
              href={profile.resume}
              download
              className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-7 py-3.5 font-medium text-background shadow-[0_0_40px_-8px_var(--accent)] transition hover:shadow-[0_0_60px_-6px_var(--accent-2)]"
            >
              <DownloadIcon width={18} height={18} /> Download resume
            </a>
          </div>
        </Reveal>

        <footer className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 text-sm text-muted md:flex-row">
          <p>© {profile.name}</p>
          <p className="font-mono text-xs">Built with Next.js · Three.js · a lot of curiosity</p>
        </footer>
      </div>
    </section>
  );
}
