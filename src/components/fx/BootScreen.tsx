// Short "system boot" intro. Pure CSS: it fades itself out, so it never blocks the page even without JS.
const lines = [
  "> initializing adarsh.ai",
  "> loading modules: python · sql · rag · llm",
  "> calibrating curiosity ........ ok",
  "> system online",
];

export default function BootScreen() {
  return (
    <div aria-hidden className="boot fixed inset-0 z-[100] grid place-items-center bg-background">
      <div className="w-[min(420px,85vw)] font-mono text-xs text-muted sm:text-sm">
        {lines.map((l, i) => (
          <p
            key={l}
            className={`boot-line ${i === lines.length - 1 ? "text-accent" : ""}`}
            style={{ animationDelay: `${0.1 + i * 0.28}s` }}
          >
            {l}
          </p>
        ))}
        <div className="mt-5 h-px w-full overflow-hidden bg-border">
          <div className="boot-bar h-full w-full bg-gradient-to-r from-accent to-accent-2" />
        </div>
      </div>
    </div>
  );
}
