import Link from "next/link";
// react-three-fiber's Canvas touches WebGL/window at module load — not
// SSR-safe. Next.js forbids `ssr: false` inside this Server Component, so
// the dynamic(..., { ssr: false }) call lives in its own Client Component
// wrapper instead (see HeroBlobLoader.tsx).
import { HeroBlob } from "@/components/HeroBlobLoader";

// NOTE: this file currently only has Steps 1–3 applied (tokens, navbar, the
// HeroBlob 3D object). The old "Open Stacks" catalog sections (category
// grid, featured courses, footer) referenced tokens that no longer exist
// after the palette swap, so they're removed here rather than left rendering
// broken — full hero copy + those later sections come back in steps 4–8.
export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-void text-paper">
      {/* NAVBAR — no background, no pill shapes, just a hairline bottom border. */}
      <header className="flex items-center justify-between border-b border-rule px-6 py-5 sm:px-10">
        <span className="text-lg font-medium">OpenLearn</span>
        <nav className="hidden items-center gap-8 text-sm text-paper-soft sm:flex">
          <Link href="/products" className="hover:text-paper">Products</Link>
          <Link href="/courses" className="hover:text-paper">Courses</Link>
          <Link href="/about" className="hover:text-paper">About</Link>
          <Link href="/resources" className="hover:text-paper">Resources</Link>
        </nav>
        <div className="flex items-center gap-5 text-sm">
          <Link href="/sign-in" className="text-paper-soft hover:text-paper">
            Sign in
          </Link>
          <Link
            href="/courses"
            className="glass rounded-full bg-paper px-4 py-2 text-void hover:bg-paper/90"
          >
            Start learning →
          </Link>
        </div>
      </header>

      {/* Temporary Step 1–3 checkpoint: just the 3D blob on its own, so it
          can be verified before the full hero layout (step 4) is built. */}
      <main className="flex flex-1 items-center justify-center">
        <div className="h-[420px] w-[420px]">
          <HeroBlob />
        </div>
      </main>
    </div>
  );
}
