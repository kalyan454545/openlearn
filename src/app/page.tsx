import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { CatalogSearch } from "@/components/catalog-search";
import { CategoryCard } from "@/components/category-card";

// Real Dewey Decimal classes — an authentic catalog detail, not invented numbers.
const CATEGORIES = [
  { name: "Programming", callNumber: "005.1", href: "/courses?category=programming" },
  { name: "Data Science", callNumber: "006.3", href: "/courses?category=data-science" },
  { name: "Design", callNumber: "700", href: "/courses?category=design" },
  { name: "Business", callNumber: "330", href: "/courses?category=business" },
  { name: "Language", callNumber: "400", href: "/courses?category=language" },
  { name: "Math", callNumber: "510", href: "/courses?category=math" },
];

const FEATURED = [
  { callNumber: "005.133", title: "Python for Everybody", provider: "FREECODECAMP", hours: "18h" },
  { callNumber: "006.31", title: "Machine Learning Foundations", provider: "MIT OCW", hours: "42h" },
  { callNumber: "745.4", title: "Design Systems in Practice", provider: "YOUTUBE", hours: "6h" },
  { callNumber: "658.4", title: "Product Strategy Basics", provider: "KHAN ACADEMY", hours: "9h" },
  { callNumber: "510.1", title: "Linear Algebra, Start to Finish", provider: "MIT OCW", hours: "35h" },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-paper text-ink">
      {/* NAVBAR — flat, hairline bottom border, no pill shapes anywhere. */}
      <header className="flex items-center justify-between border-b border-rule px-6 py-4 sm:px-10">
        <span className="font-serif text-xl">
          Open<span className="border-b-2 border-brass">Learn</span>
        </span>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/courses" className="hover:underline hover:decoration-rule hover:underline-offset-4">
            Browse
          </Link>
          <Link href="/about" className="hover:underline hover:decoration-rule hover:underline-offset-4">
            About
          </Link>
          <ModeToggle />
        </nav>
      </header>

      <main className="flex-1 px-6 sm:px-10">
        {/* HERO — left-aligned, no gradient, no illustration. */}
        <section className="mx-auto max-w-4xl pt-16 pb-14 sm:pt-24">
          <h1 className="max-w-2xl font-serif text-5xl leading-[1.05] font-medium tracking-[-0.01em] sm:text-[64px]">
            An open catalog of everything worth learning.
          </h1>
          <p className="mt-5 font-mono text-xs tracking-[0.08em] text-ink-soft uppercase">
            412 courses · 6 subjects · $0 cost
          </p>

          <div className="mt-10 max-w-xl">
            <CatalogSearch />
          </div>
        </section>

        {/* CATEGORY GRID — index cards, not icon tiles. */}
        <section className="mx-auto max-w-4xl pb-16">
          <h2 className="mb-6 font-mono text-xs tracking-[0.08em] text-ink-soft uppercase">
            Browse the drawers
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
            {CATEGORIES.map((category, i) => (
              <CategoryCard key={category.name} {...category} rotation={[-1, 0.5, -0.5][i % 3]} />
            ))}
          </div>
        </section>

        {/* FEATURED COURSES — catalog rows, dotted leader lines, no card chrome. */}
        <section className="mx-auto max-w-4xl pb-24">
          <h2 className="mb-6 font-mono text-xs tracking-[0.08em] text-ink-soft uppercase">
            Recently catalogued
          </h2>
          <div>
            {FEATURED.map((course) => (
              <Link
                key={course.callNumber}
                href="/courses"
                className="group flex items-baseline gap-4 border-b border-rule py-4 first:border-t"
              >
                <span className="w-20 shrink-0 font-mono text-xs text-ink-soft">{course.callNumber}</span>
                <span className="font-serif text-lg whitespace-nowrap group-hover:underline group-hover:decoration-rule">
                  {course.title}
                </span>
                <span
                  aria-hidden
                  className="min-w-6 flex-1 translate-y-[-2px] border-b-2 border-dotted border-rule"
                />
                <span className="shrink-0 font-mono text-[11px] tracking-[0.08em] text-ink-soft uppercase">
                  {course.provider}
                </span>
                <span className="w-10 shrink-0 text-right font-mono text-xs text-ink-soft">{course.hours}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER — plain, archival. */}
      <footer className="border-t border-rule px-6 py-8 sm:px-10">
        <p className="text-sm text-ink-soft">
          An open collection. No ads. No accounts required to browse.
        </p>
        <div className="mt-3 flex gap-4 font-mono text-xs tracking-[0.08em] text-ink-soft uppercase">
          <Link href="/about" className="hover:text-ink">
            [About]
          </Link>
          <a
            href="https://github.com/kalyan454545/openlearn"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink"
          >
            [GitHub]
          </a>
          <Link href="/contribute" className="hover:text-ink">
            [Contribute]
          </Link>
        </div>
      </footer>
    </div>
  );
}
