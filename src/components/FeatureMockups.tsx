// Small hand-built stand-ins for real product screenshots (the actual
// course-discovery/dashboard/notes pages are later build steps) — just
// enough visual specificity to read as "a real UI", not abstract shapes.

export function DiscoveryMockup() {
  const rows = [
    { title: "Python for Everybody", pct: 72 },
    { title: "Machine Learning Foundations", pct: 34 },
    { title: "Design Systems in Practice", pct: 100 },
  ];
  return (
    <div className="p-5">
      <div className="rounded-lg border border-rule bg-void-raised/60 px-3 py-2 text-xs text-paper-soft/60">
        Search 412 courses…
      </div>
      <div className="mt-4 space-y-3">
        {rows.map((r) => (
          <div key={r.title}>
            <div className="flex justify-between text-xs">
              <span>{r.title}</span>
              <span className="text-paper-soft/60">{r.pct}%</span>
            </div>
            <div className="mt-1.5 h-1 rounded-full bg-void-raised">
              <div
                className="h-1 rounded-full bg-gradient-to-r from-glow-pink to-glow-purple"
                style={{ width: `${r.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProgressMockup() {
  const days = Array.from({ length: 28 }, (_, i) => (i * 37) % 5); // deterministic fake intensities
  return (
    <div className="p-5">
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-light">14-day streak</span>
        <span className="font-mono text-xs text-paper-soft/50">6.5h this week</span>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1.5">
        {days.map((intensity, i) => (
          <div
            key={i}
            className="aspect-square rounded-sm"
            style={{
              background:
                intensity === 0
                  ? "var(--rule)"
                  : `color-mix(in oklab, var(--glow-purple) ${intensity * 22}%, var(--void-raised))`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function NotesMockup() {
  return (
    <div className="p-5 font-mono text-xs leading-relaxed text-paper-soft/70">
      <p className="text-paper-soft/40">— Lesson 4: Gradient Descent</p>
      <p className="mt-2">
        loss decreases fastest in the direction of<br />
        the negative gradient. learning rate too<br />
        high → overshoot. too low → slow.
      </p>
      <p className="mt-3 text-paper-soft/40">— saved locally, exportable anytime</p>
    </div>
  );
}
