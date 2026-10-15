"use client";

import { motion, useScroll } from "motion/react";
import { useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { experience } from "@/data/profile";

export default function Experience() {
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 75%", "end 55%"] });

  return (
    <section id="experience" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading index="03" eyebrow="Experience" title="Where I've built things" />

        <ol ref={list} className="relative ml-2 md:ml-4">
          {/* track + beam that fills as you scroll */}
          <span className="absolute left-0 top-0 h-full w-px bg-border" />
          <motion.span
            style={{ scaleY: scrollYProgress }}
            className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent shadow-[0_0_12px_var(--accent)]"
          />
          {experience.map((job, i) => (
            <li key={job.company} className="relative pb-12 pl-8 last:pb-0 md:pl-14">
              <span
                className={`absolute -left-[6px] top-7 h-3 w-3 rotate-45 border ${
                  job.current ? "border-accent bg-accent shadow-[0_0_16px_var(--accent)]" : "border-accent-2 bg-background"
                }`}
              />
              <Reveal delay={i * 0.06}>
                <div className="glass group rounded-2xl p-6 transition-colors hover:border-accent/40 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                        {String(i + 1).padStart(2, "0")} · {job.current ? "active process" : "completed"}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-semibold">{job.role}</h3>
                      <p className="mt-0.5 text-accent">{job.company}</p>
                    </div>
                    <span
                      className={`rounded-md border px-3 py-1 font-mono text-xs ${
                        job.current ? "border-accent/40 bg-accent/10 text-accent" : "border-border text-muted"
                      }`}
                    >
                      {job.current && <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent align-middle" />}
                      {job.period}
                    </span>
                  </div>
                  <ul className="mt-5 space-y-2 text-muted">
                    {job.points.map((p) => (
                      <li key={p} className="flex gap-3 leading-relaxed">
                        <span className="mt-[9px] h-px w-3 shrink-0 bg-accent-3" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
