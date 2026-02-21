import { ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/portfolio/section-header'
import { workHighlights, xScreenshots } from '@/data/work'

export function WorkSection() {
  const [featuredWork, ...otherWork] = workHighlights

  return (
    <section id="work" className="scroll-mt-24 space-y-7">
      <SectionHeader
        title="Work"
        rightContent={
          <a
            href="https://x.com/patoalbornozz"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900"
          >
            Live feed
            <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        }
      />

      {featuredWork ? (
        <article className="content-card work-feature p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] md:items-end">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Featured Collaboration</p>
              <h3 className="text-4xl font-semibold leading-[0.94] tracking-tight text-neutral-900 md:text-5xl">
                {featuredWork.title}
              </h3>
              <p className="text-base leading-relaxed text-neutral-700">
                {featuredWork.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {featuredWork.tags.map((tag) => (
                  <span
                    key={`${featuredWork.title}-${tag}`}
                    className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-neutral-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:justify-self-end">
              <a
                href={featuredWork.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-white/65 px-4 py-2 text-xs uppercase tracking-[0.14em] text-neutral-700 transition-colors hover:text-neutral-900"
              >
                Open case
                <ArrowUpRight className="size-3" />
              </a>
            </div>
          </div>
        </article>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {otherWork.map(({ title, description, tags, href }) => (
          <article key={title} className="content-card card-stack p-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-neutral-900">{title}</h3>
              <span className="rounded-full border border-[var(--line)] bg-white/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-neutral-500">
                Work
              </span>
            </div>

            <p className="text-sm leading-relaxed text-neutral-700">{description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={`${title}-${tag}`}
                  className="rounded-full border border-[var(--line)] bg-white/70 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-neutral-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-neutral-600 transition-colors hover:text-neutral-900"
            >
              Open
              <ArrowUpRight className="size-3" />
            </a>
          </article>
        ))}

        {xScreenshots.map((shot) => (
          <a
            key={shot.title}
            href={shot.href}
            target="_blank"
            rel="noopener noreferrer"
            className="content-card card-stack group block overflow-hidden"
          >
            <div className="relative overflow-hidden">
              <img
                src={shot.image}
                alt={`${shot.title} from @patoalbornozz on X`}
                loading="lazy"
                className="x-shot-image h-56 w-full md:h-64"
              />
              <div className="absolute right-3 top-3 rounded-full border border-[var(--line)] bg-white/88 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-neutral-600">
                X capture
              </div>
            </div>

            <div className="flex items-start justify-between p-4">
              <div>
                <h3 className="text-sm font-semibold text-neutral-800 transition-colors group-hover:text-neutral-900">
                  {shot.title}
                </h3>
                <p className="mt-1 text-xs text-neutral-600">{shot.caption}</p>
              </div>
              <ArrowUpRight className="mt-0.5 size-3.5 text-neutral-500 transition-colors group-hover:text-neutral-800" />
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
