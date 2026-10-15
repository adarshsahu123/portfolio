"use client";

import { useInView } from "motion/react";
import { useEffect, useRef } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#01ABCDEFXYZ";

// Text that "decodes" from random glyphs the first time it scrolls into view.
export default function ScrambleText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tick = 0;
    const total = text.length * 1.6 + 14;
    const id = setInterval(() => {
      tick++;
      el.textContent = [...text]
        .map((ch, i) => (ch === " " || tick > i * 1.6 + 10 ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
        .join("");
      if (tick >= total) clearInterval(id);
    }, 32);
    return () => {
      clearInterval(id);
      el.textContent = text;
    };
  }, [inView, text]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
