"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

// Counts a numeric value up from 0 when visible; non-numeric values (like "∞") render as-is.
export default function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const num = Number(value);
  const decimals = value.includes(".") ? value.split(".")[1].length : 0;

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el || Number.isNaN(num)) return;
    const controls = animate(0, num, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = v.toFixed(decimals).padStart(value.length, "0");
      },
    });
    return () => controls.stop();
  }, [inView, num, decimals, value]);

  return <span ref={ref}>{value}</span>;
}
