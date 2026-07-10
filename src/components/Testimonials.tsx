const QUOTES = [
  {
    quote:
      "I've bounced off three other course platforms. This is the first one where I actually finished something — the streak heatmap is embarrassingly effective.",
    name: "Priya Raman",
    role: "Software Engineer, Cleveland",
  },
  {
    quote:
      "Free and ad-free doesn't usually mean well-curated. OpenLearn is the exception — the catalog feels hand-picked, not scraped.",
    name: "Marcus Webb",
    role: "Grad Student, Toronto",
  },
  {
    quote:
      "I asked the guide for a design-systems course and it actually found the right one in one try instead of me digging through category pages.",
    name: "Lena Fischer",
    role: "Designer, Berlin",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
      <p className="font-mono text-[11px] tracking-[0.15em] text-paper-soft/50 uppercase">
        What learners say
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {QUOTES.map((q) => (
          <figure key={q.name} className="glass rounded-xl p-6">
            <blockquote className="text-sm leading-relaxed text-paper-soft/80">
              “{q.quote}”
            </blockquote>
            <figcaption className="mt-5 text-sm">
              <span className="block text-paper">{q.name}</span>
              <span className="block text-paper-soft/50">{q.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
