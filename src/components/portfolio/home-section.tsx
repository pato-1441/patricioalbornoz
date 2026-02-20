import { SectionHeader } from '@/components/portfolio/section-header'

export function HomeSection() {
  return (
    <section id="home" className="scroll-mt-24 space-y-6">
      <SectionHeader
        title="Home"
        rightContent={
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
            Profile
          </p>
        }
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <article className="content-card md:col-span-2">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src="https://pbs.twimg.com/profile_images/2010743613538353152/sPZTaIV1_400x400.jpg"
              alt="Patricio Albornoz profile photo"
              className="h-64 w-full object-cover md:h-72"
            />
          </div>
          <div className="space-y-3 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">Home</p>
            <h3 className="text-2xl font-medium tracking-tight text-white">
              Design engineer focused on product clarity and polished interaction.
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-neutral-400">
              I build fast, resilient interfaces for product teams that care
              about craft. Most recently: growth surfaces, observability UX, and
              reusable design-system building blocks.
            </p>
          </div>
        </article>

        <article className="content-card p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">Focus</p>
          <h3 className="mt-3 text-lg font-medium text-white">What I bring</h3>
          <ul className="mt-4 space-y-3 text-sm text-neutral-400">
            <li>High-fidelity interface implementation.</li>
            <li>Systems thinking for scalable UI patterns.</li>
            <li>Hands-on collaboration with product teams.</li>
          </ul>
        </article>
      </div>
    </section>
  )
}
