import { Github, Linkedin, Mail } from 'lucide-react'
import { X } from '@/components/icons/x'
import { SectionPills, type NavItem } from '@/components/portfolio/section-pills'

type SidebarProps = {
  navItems: NavItem[]
  className?: string
  layout?: 'default' | 'article'
}

export function Sidebar({ navItems, className, layout = 'default' }: SidebarProps) {
  return (
    <aside
      className={`lg:col-span-4 xl:col-span-3 lg:sticky lg:top-16 lg:h-[calc(100vh-8rem)] lg:flex lg:flex-col lg:justify-between ${layout === 'article' ? 'lg:-translate-x-5 xl:-translate-x-10' : ''} ${className ?? ''}`}
    >
      <div className="space-y-10">
        <div className="space-y-6">
          <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
            Design Systems · Product Craft
          </p>

          <h1 className="text-4xl font-semibold leading-[0.98] tracking-[-0.02em] text-neutral-900 sm:text-5xl">
            Patricio
            <br />
            Albornoz
            <br />
            <span className="display-serif text-[0.92em] font-medium italic text-neutral-600">
              Product Engineer
            </span>
          </h1>

          <p className="max-w-md text-lg leading-relaxed text-neutral-700">
            <span className="block">
              Building autonomous AI testing at{' '}
              <a
                href="https://getautonoma.com"
                target="_blank"
                rel="noopener noreferrer"
                className="display-serif text-[1.28em] font-bold italic text-neutral-800 link-underline"
              >
                Autonoma
              </a>
              , an agent that find bugs, heals them, and manages tests by itself.
            </span>
            <span className="mt-3 block">
              Previously reimagined product discovery at Sirvana (now{' '}
              <a
                href="https://www.melian.com"
                target="_blank"
                rel="noopener noreferrer"
                className="display-serif text-[1.28em] font-bold italic text-neutral-800 link-underline"
              >
                Melian
              </a>
              ), where every online product lives in one AI-driven feed.
            </span>
          </p>
        </div>

        <SectionPills items={navItems} className="hidden lg:flex lg:py-1" />

        <div className="flex items-center gap-3">
          <a
            href="https://x.com/patoalbornozz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X profile"
            className="icon-link"
          >
            <X />
          </a>
          <a
            href="https://github.com/pato-1441"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="icon-link"
          >
            <Github className="size-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/patoalbornoz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="icon-link"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href="mailto:pwalbornoz@gmail.com"
            aria-label="Email Patricio"
            className="icon-link"
          >
            <Mail className="size-4" />
          </a>
        </div>

        <div className="availability-tag">
          <span className="dot" />
          Open to advisory
        </div>
      </div>

      <footer className="mt-14 border-t border-(--line) pt-8 text-xs leading-relaxed text-neutral-500">
        © {new Date().getFullYear()} Patricio Albornoz.
        <br />
        Crafted with intention in Buenos Aires.
        <br />
      </footer>
    </aside>
  )
}
