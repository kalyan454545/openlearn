import Link from "next/link";
import type { ReactNode } from "react";

// Repeated 3x on the homepage: text on one side, a UI mockup "floating" on a
// large radial glow on the other. These are hand-built representative
// mockups (course-discovery, progress, notes), not real screenshots — the
// actual pages don't exist yet (later build steps).
export function FeatureSection({
  eyebrow,
  heading,
  body,
  href,
  glow,
  reversed = false,
  children,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  href: string;
  glow: string;
  reversed?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
      <div className={`grid items-center gap-12 lg:grid-cols-2 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div>
          <p className="font-mono text-[11px] tracking-[0.15em] text-paper-soft/50 uppercase">{eyebrow}</p>
          <h2 className="mt-4 max-w-md text-3xl font-light tracking-[-0.01em] sm:text-[48px]">{heading}</h2>
          <p className="mt-5 max-w-md text-base text-paper-soft/70">{body}</p>
          <Link href={href} className="mt-6 inline-block text-sm text-paper-soft hover:text-paper">
            Learn more →
          </Link>
        </div>

        <div className="relative flex items-center justify-center py-10">
          <div
            aria-hidden
            className="absolute inset-x-0 -bottom-10 top-0 -z-10"
            style={{ background: glow }}
          />
          <div className="glass w-full max-w-md overflow-hidden rounded-xl">{children}</div>
        </div>
      </div>
    </section>
  );
}
