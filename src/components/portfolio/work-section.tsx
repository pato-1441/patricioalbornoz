import { ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/portfolio/section-header'
import { workHighlights, xScreenshots } from '@/data/work'

export function WorkSection() {
  return (
    <section id="work" className="scroll-mt-24 space-y-6">
      <SectionHeader
        title="Work"
        rightContent={
          <a
            href="https://x.com/patoalbornozz"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900"
          >
            X Profile
            <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        }
      />

      <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
        {workHighlights.map(({ title, description, tags, href, icon: Icon }) => (
          <article key={title} className="content-card card-stack">
            <div className="p-6">
              <div className="mb-4 flex size-10 items-center justify-center rounded-lg border border-stone-300 bg-stone-100 text-neutral-700">
                <Icon className="size-5" />
              </div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-medium text-neutral-900">{title}</h3>
                <span className="rounded border border-stone-300 bg-stone-100/80 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-neutral-500">
                  Work
                </span>
              </div>
              <p className="text-sm leading-relaxed text-neutral-700">{description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={`${title}-${tag}`}
                    className="rounded-full border border-stone-300 bg-stone-100 px-2 py-0.5 text-[10px] text-neutral-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-neutral-500 transition-colors hover:text-neutral-900"
              >
                Open
                <ArrowUpRight className="size-3" />
              </a>
            </div>
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
              <div className="absolute right-3 top-3 rounded border border-stone-300 bg-white/85 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-neutral-600">
                X Shot
              </div>
            </div>
            <div className="flex items-start justify-between p-4">
              <div>
                <h3 className="text-sm font-medium text-neutral-800 transition-colors group-hover:text-neutral-900">
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
