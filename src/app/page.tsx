import Link from "next/link";
import { HeroChat } from "@/components/HeroChat";
import { FeatureSection } from "@/components/FeatureSection";
import { DiscoveryMockup, ProgressMockup, NotesMockup } from "@/components/FeatureMockups";
import { CategoryGridDark } from "@/components/CategoryGridDark";
import { Testimonials } from "@/components/Testimonials";
import { SiteFooter } from "@/components/SiteFooter";

const TRUSTED_BY = ["MIT", "Stanford", "Google", "GitHub", "Coursera alumni"];

const GLOW_PURPLE = "radial-gradient(circle at 50% 100%, rgba(184,77,255,0.35) 0%, transparent 60%)";
const GLOW_PINK = "radial-gradient(circle at 50% 100%, rgba(255,77,166,0.35) 0%, transparent 60%)";
const GLOW_CYAN_PURPLE =
  "radial-gradient(circle at 50% 100%, rgba(77,196,255,0.28) 0%, rgba(184,77,255,0.28) 35%, transparent 65%)";

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

      <main className="flex-1">
        {/* HERO — the signature moment: gradient-text headline on the left,
            the interactive iridescent blob (doubling as the AI guide) on
            the right. */}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-10 sm:px-10 sm:pt-24 lg:grid-cols-5 lg:items-center">
          <div className="lg:col-span-3">
            <p className="font-mono text-[11px] tracking-[0.15em] text-paper-soft/50 uppercase">
              ✦ Free forever · No ads · Open catalog
            </p>
            <h1 className="mt-5 text-[56px] leading-[0.95] font-light tracking-[-0.03em] sm:text-[88px]">
              Learn anything.
              <br />
              <span className="text-gradient-iridescent">Master everything.</span>
            </h1>
            <p className="mt-6 max-w-md text-base text-paper-soft/70">
              The learning platform serious learners actually finish. Curated. Ad-free. Yours forever.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <Link href="/courses" className="glass rounded-full bg-paper px-6 py-3 text-sm text-void">
                Browse courses
              </Link>
              <Link href="/demo" className="text-sm text-paper-soft hover:text-paper">
                Watch demo →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <HeroChat />
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-6 pb-24 sm:px-10">
          <p className="font-mono text-[11px] tracking-[0.15em] text-paper-soft/40 uppercase">
            Trusted by learners from
          </p>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 opacity-40">
            {TRUSTED_BY.map((name) => (
              <span key={name} className="text-sm">
                {name}
              </span>
            ))}
          </div>
        </div>

        <FeatureSection
          eyebrow="Discovery"
          heading="AI-powered course discovery"
          body="Tell the guide what you want to learn, in plain language, and it searches the whole open catalog instead of you scrolling through category pages."
          href="/courses"
          glow={GLOW_PURPLE}
        >
          <DiscoveryMockup />
        </FeatureSection>

        <FeatureSection
          eyebrow="Progress"
          heading="Progress that actually sticks"
          body="A streak counter and a real calendar heatmap — the same trick that makes GitHub contributions and Duolingo work, applied to actually finishing courses."
          href="/dashboard"
          glow={GLOW_PINK}
          reversed
        >
          <ProgressMockup />
        </FeatureSection>

        <FeatureSection
          eyebrow="Notes"
          heading="Own your notes, forever"
          body="Every lesson has a notes panel that autosaves as you go. No lock-in — export everything you've written, any time, in one click."
          href="/courses"
          glow={GLOW_CYAN_PURPLE}
        >
          <NotesMockup />
        </FeatureSection>

        <CategoryGridDark />
        <Testimonials />
      </main>

      <SiteFooter />
    </div>
  );
}
