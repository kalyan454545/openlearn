import Link from "next/link";
import { Code2, BarChart3, Palette, Briefcase, Languages, Sigma } from "lucide-react";

const CATEGORIES = [
  { name: "Programming", count: 84, href: "/courses?category=programming", icon: Code2 },
  { name: "Data Science", count: 47, href: "/courses?category=data-science", icon: BarChart3 },
  { name: "Design", count: 39, href: "/courses?category=design", icon: Palette },
  { name: "Business", count: 62, href: "/courses?category=business", icon: Briefcase },
  { name: "Language", count: 28, href: "/courses?category=language", icon: Languages },
  { name: "Math", count: 51, href: "/courses?category=math", icon: Sigma },
];

export function CategoryGridDark() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
      <p className="font-mono text-[11px] tracking-[0.15em] text-paper-soft/50 uppercase">Browse by subject</p>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {CATEGORIES.map(({ name, count, href, icon: Icon }) => (
          <Link
            key={name}
            href={href}
            className="card-iridescent-border group relative overflow-hidden rounded-xl p-5"
          >
            <Icon className="size-6 text-paper-soft" />
            <span className="mt-6 block text-base font-medium">{name}</span>
            <span className="mt-1 block font-mono text-xs text-paper-soft/50">{count} courses</span>
            <span
              aria-hidden
              className="absolute top-5 right-5 text-paper-soft opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
