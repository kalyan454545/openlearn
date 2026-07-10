import Link from "next/link";
import {
  Code2,
  BarChart3,
  Palette,
  Briefcase,
  Languages,
  Sigma,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";

const CATEGORIES = [
  { name: "Programming", href: "/courses?category=programming", icon: Code2 },
  { name: "Data Science", href: "/courses?category=data-science", icon: BarChart3 },
  { name: "Design", href: "/courses?category=design", icon: Palette },
  { name: "Business", href: "/courses?category=business", icon: Briefcase },
  { name: "Language", href: "/courses?category=language", icon: Languages },
  { name: "Math", href: "/courses?category=math", icon: Sigma },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="font-serif text-lg font-semibold text-navy dark:text-foreground">
          OpenLearn
        </span>
        <ModeToggle />
      </header>

      <main className="flex flex-1 flex-col items-center px-6 pt-12 pb-24 sm:pt-20">
        <h1 className="max-w-2xl text-center font-serif text-4xl leading-tight font-medium text-navy sm:text-5xl dark:text-foreground">
          Learn anything, for free.
        </h1>
        <p className="mt-4 text-center text-lg text-muted-foreground">
          No upsells, no clutter.
        </p>

        <form action="/courses" className="mt-10 w-full max-w-xl">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              placeholder="Search for anything — Python, design, statistics…"
              className="h-12 rounded-full border-border bg-card pl-11 text-base shadow-none"
            />
          </div>
        </form>

        <div className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
          {CATEGORIES.map(({ name, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-4 py-8 text-center transition-colors hover:border-navy/30 dark:hover:border-foreground/30"
            >
              <Icon className="size-6 text-cta" />
              <span className="text-sm font-medium text-navy dark:text-foreground">{name}</span>
            </Link>
          ))}
        </div>
      </main>

      <footer className="flex items-center justify-center gap-6 border-t border-border px-6 py-6 text-sm text-muted-foreground">
        <Link href="/about" className="hover:text-navy dark:hover:text-foreground">
          About
        </Link>
        <a
          href="https://github.com/kalyan454545/openlearn"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-navy dark:hover:text-foreground"
        >
          GitHub
        </a>
        <Link href="/contribute" className="hover:text-navy dark:hover:text-foreground">
          Contribute
        </Link>
      </footer>
    </div>
  );
}
