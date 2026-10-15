"use client";

import { useEffect, useState } from "react";

export default function Typewriter({ lines }: { lines: string[] }) {
  const [line, setLine] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = lines[line];
    let delay = deleting ? 28 : 55;
    if (!deleting && text === full) delay = 1800;
    if (deleting && text === "") delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === full) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setLine((l) => (l + 1) % lines.length);
      } else setText(full.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, line, lines]);

  return (
    <span aria-label={lines[line]}>
      <span aria-hidden>{text}</span>
      <span aria-hidden className="caret ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-accent" />
    </span>
  );
}
