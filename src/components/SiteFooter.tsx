import Link from "next/link";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Courses", href: "/courses" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { label: "Programming", href: "/courses?category=programming" },
      { label: "Data Science", href: "/courses?category=data-science" },
      { label: "Design", href: "/courses?category=design" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Discussions", href: "/community" },
      { label: "GitHub", href: "https://github.com/kalyan454545/openlearn" },
      { label: "Contribute", href: "/contribute" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Sign in", href: "/sign-in" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="font-mono text-[11px] tracking-[0.15em] text-paper-soft/40 uppercase">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-paper-soft/80 hover:text-paper">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-rule pt-6 text-xs text-paper-soft/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} OpenLearn. Free forever.</span>
          <span className="font-mono">Made in Cleveland · v0.1.0</span>
        </div>
      </div>
    </footer>
  );
}
