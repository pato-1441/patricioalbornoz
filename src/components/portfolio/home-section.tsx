import { SectionHeader } from '@/components/portfolio/section-header'

export function HomeSection() {
  return (
    <section id="home" className="scroll-mt-24 space-y-7">
      <SectionHeader
        title="Home"
        rightContent={
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Studio Notes
          </p>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.95fr)]">
        <article className="content-card overflow-hidden">
          <div className="relative h-72 w-full overflow-hidden md:h-80">
            <img
              src="https://pbs.twimg.com/profile_images/2010743613538353152/sPZTaIV1_400x400.jpg"
              alt="Patricio Albornoz profile photo"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-4 p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Home</p>
            <h3 className="article-title text-4xl leading-[0.96] text-neutral-900 md:text-5xl">
              Product interfaces with editorial clarity and engineering precision.
            </h3>
            <p className="max-w-3xl text-base leading-relaxed text-neutral-700">
              I work at the intersection of design systems, animation systems, and
              production UI architecture. The goal is always the same: make complex
              products feel legible, confident, and fast.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.12em] text-neutral-600">
                Interface Direction
              </span>
              <span className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.12em] text-neutral-600">
                Motion Systems
              </span>
              <span className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.12em] text-neutral-600">
                Frontend Craft
              </span>
            </div>
          </div>
        </article>

        <article className="home-note">
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Method</p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight text-neutral-900">
            Design and code in one loop.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700">
            Instead of long handoffs, I treat implementation as part of design.
            Decisions stay sharper, systems stay cleaner, and quality survives
            delivery pressure.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-neutral-700">
            <li>Clear component architecture from day one.</li>
            <li>Deliberate micro-interactions with product intent.</li>
            <li>Copy and states designed as first-class UX surfaces.</li>
          </ul>
        </article>
      </div>
    </section>
  )
}
