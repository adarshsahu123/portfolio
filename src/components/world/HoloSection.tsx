"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

// Wraps a section so it rises toward the viewer like a hologram, then drifts past as you fly on.
export default function HoloSection({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const scale = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0.86, 1, 1, 1.06]);
  const rotateX = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [14, 0, 0, -6]);
  // No CSS filter here: a filter on an ancestor would disable the frosted-glass panels inside.
  const opacity = useTransform(scrollYProgress, [0, 0.16, 0.85, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={reduced ? undefined : { scale, rotateX, opacity, transformPerspective: 1200 }}
      className="origin-center will-change-transform"
    >
      {children}
    </motion.div>
  );
}
