import Link from "next/link";

// An index card, not an icon tile — slightly askew like real cards in a
// drawer, with a punched hole at the top. Only motion in this component:
// straighten + lift 4px on hover (200ms), off entirely under
// prefers-reduced-motion via the motion-reduce: variant below.
export function CategoryCard({
  name,
  callNumber,
  href,
  rotation,
}: {
  name: string;
  callNumber: string;
  href: string;
  rotation: number;
}) {
  return (
    <Link
      href={href}
      style={{ "--rotation": `${rotation}deg` } as React.CSSProperties}
      className="group relative block rotate-[var(--rotation)] border border-ink bg-paper-raised px-4 pt-7 pb-5 text-center transition-transform duration-200 ease-out hover:-translate-y-1 hover:rotate-0 motion-reduce:transition-none motion-reduce:hover:rotate-[var(--rotation)]"
    >
      <span
        aria-hidden
        className="absolute top-2 left-1/2 size-3 -translate-x-1/2 rounded-full bg-paper shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)]"
      />
      <span className="block font-serif text-lg italic">{name}</span>
      <span className="mt-2 block font-mono text-[11px] tracking-[0.08em] text-ink-soft uppercase">
        {callNumber} — {name}
      </span>
    </Link>
  );
}
