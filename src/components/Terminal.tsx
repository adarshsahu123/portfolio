"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { experience, profile, projects, roadmap, skillGroups } from "@/data/profile";

type Line = { kind: "in" | "out" | "accent" | "muted"; text: string };

const COMMANDS: Record<string, () => Line[]> = {
  help: () => [
    { kind: "muted", text: "available commands:" },
    ...[
      ["whoami", "who I am"],
      ["skills", "what I know (honestly)"],
      ["experience", "where I've worked"],
      ["projects", "what I've built"],
      ["learning", "what I'm learning now"],
      ["contact", "how to reach me"],
      ["resume", "download my resume"],
      ["clear", "clear the screen"],
    ].map(([c, d]) => ({ kind: "out" as const, text: `  ${c.padEnd(12)}${d}` })),
  ],
  whoami: () => [
    { kind: "accent", text: profile.name },
    { kind: "out", text: `${profile.role} → ${profile.aspiration} · ${profile.location}` },
    { kind: "out", text: profile.intro },
  ],
  skills: () =>
    skillGroups.flatMap((g) => [
      { kind: "accent" as const, text: `[${g.title}]` },
      { kind: "out" as const, text: `  ${g.skills.join(" · ")}` },
    ]),
  experience: () =>
    experience.map((e) => ({ kind: "out" as const, text: `${e.period.padEnd(20)}${e.role} @ ${e.company}` })),
  projects: () =>
    projects.flatMap((p) => [
      { kind: "accent" as const, text: p.title },
      { kind: "out" as const, text: `  ${p.description}` },
    ]),
  learning: () => [
    ...roadmap.filter((r) => r.status === "now").map((r) => ({ kind: "accent" as const, text: `◉ ${r.title} — ${r.detail}` })),
    ...roadmap.filter((r) => r.status === "next").map((r) => ({ kind: "muted" as const, text: `○ next: ${r.title}` })),
  ],
  contact: () => [
    { kind: "out", text: `email     ${profile.email}` },
    { kind: "out", text: `linkedin  ${profile.linkedin.replace("https://", "")}` },
    { kind: "out", text: `github    ${profile.github.replace("https://", "")}` },
  ],
  resume: () => {
    window.open(profile.resume, "_blank", "noopener");
    return [{ kind: "accent", text: "opening resume…" }];
  },
  "sudo hire adarsh": () => [{ kind: "accent", text: "permission granted ✓ — let's talk: " + profile.email }],
};

const QUICK = ["whoami", "skills", "projects", "learning", "contact"];

const WELCOME: Line[] = [
  { kind: "muted", text: "adarsh.ai terminal v1.0 — type 'help' to get started" },
];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const scroller = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setHistory((h) => [cmd, ...h]);
    setCursor(-1);
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    const out = COMMANDS[cmd]?.() ?? [{ kind: "muted" as const, text: `command not found: ${cmd} — try 'help'` }];
    setLines((l) => [...l, { kind: "in", text: cmd }, ...out]);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    run(input);
    setInput("");
  };

  const color: Record<Line["kind"], string> = {
    in: "text-foreground",
    out: "text-foreground/75",
    accent: "text-accent",
    muted: "text-muted",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-[#05070f]/90 shadow-[0_30px_80px_-30px_rgba(34,211,238,0.25)] backdrop-blur-xl">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-muted">adarsh@ai: ~</span>
      </div>

      <div
        ref={scroller}
        data-lenis-prevent
        onClick={() => field.current?.focus({ preventScroll: true })}
        className="h-72 cursor-text overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed sm:text-[13px]"
      >
        {lines.map((l, i) => (
          <p key={i} className={`whitespace-pre-wrap break-words ${color[l.kind]}`}>
            {l.kind === "in" && <span className="text-accent-3">➜ ~ </span>}
            {l.text}
          </p>
        ))}
        <form onSubmit={onSubmit} className="flex items-center">
          <span className="text-accent-3">➜ ~&nbsp;</span>
          <input
            ref={field}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp" && history.length) {
                e.preventDefault();
                const next = Math.min(cursor + 1, history.length - 1);
                setCursor(next);
                setInput(history[next]);
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                const next = cursor - 1;
                setCursor(Math.max(next, -1));
                setInput(next >= 0 ? history[next] : "");
              }
            }}
            aria-label="Terminal command"
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent text-foreground caret-accent outline-none"
            placeholder="type a command…"
          />
        </form>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-border px-4 py-3">
        {QUICK.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => run(c)}
            className="rounded-md border border-border px-2.5 py-1 font-mono text-xs text-muted transition hover:border-accent hover:text-accent"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
