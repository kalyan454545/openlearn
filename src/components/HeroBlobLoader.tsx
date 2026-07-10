"use client";

// Next.js forbids `dynamic(..., { ssr: false })` inside a Server Component
// (page.tsx has no "use client", so it is one) — the dynamic call itself has
// to live in its own Client Component wrapper.
import dynamic from "next/dynamic";

export const HeroBlob = dynamic(() => import("@/components/HeroBlob").then((m) => m.HeroBlob), {
  ssr: false,
});
