"use client";

// The "card catalog drawer" search bar — a vertical SEARCH tab that fills
// brass on focus (150ms), attached to a rectangular (never pilled) input.
export function CatalogSearch() {
  return (
    <form action="/courses" className="group flex border-[1.5px] border-ink">
      <span
        className="flex shrink-0 items-center justify-center border-r-[1.5px] border-ink bg-paper px-2 py-3 font-mono text-[10px] tracking-[0.15em] text-ink-soft transition-colors duration-150 [writing-mode:vertical-rl] group-focus-within:bg-brass group-focus-within:text-paper motion-reduce:transition-none"
        aria-hidden
      >
        SEARCH
      </span>
      <input
        name="q"
        type="text"
        placeholder="Python, design systems, statistics…"
        className="h-14 flex-1 bg-paper-raised px-4 font-sans text-base text-ink placeholder:text-ink-soft focus:outline-none"
      />
    </form>
  );
}
