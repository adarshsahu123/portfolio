"use client";

import { useEffect, useRef, useState } from "react";
import { DEPTH } from "./config";

const SECTORS = [
  { id: "top", label: "Entry" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

// Spaceship-style readout: current sector, flight progress and depth.
export default function DepthHud() {
  const [sector, setSector] = useState(0);
  const depth = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (depth.current) depth.current.textContent = (p * DEPTH).toFixed(1).padStart(5, "0");
      if (bar.current) bar.current.style.transform = `scaleY(${p})`;
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setSector(SECTORS.findIndex((s) => s.id === e.target.id));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTORS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <aside
      aria-hidden
      className="pointer-events-none fixed bottom-8 left-6 z-40 hidden items-end gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted lg:flex"
    >
      <div className="relative h-40 w-px bg-border">
        <div ref={bar} className="absolute inset-0 origin-top bg-gradient-to-b from-accent to-accent-2" />
      </div>
      <div className="space-y-1.5">
        <p>
          Sector <span className="text-accent">{String(sector + 1).padStart(2, "0")}</span> / {String(SECTORS.length).padStart(2, "0")}
        </p>
        <p className="text-foreground">{SECTORS[Math.max(sector, 0)].label}</p>
        <p>
          Depth <span ref={depth} className="text-accent-3">000.0</span> ly
        </p>
      </div>
    </aside>
  );
}
