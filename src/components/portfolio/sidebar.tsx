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
              Design Engineer
            </span>
          </h1>

          <p className="max-w-md text-lg leading-relaxed text-neutral-700">
            Building <span className="display-serif text-[1.28em] italic text-neutral-900">polished</span>{' '}
            interfaces and <span className="display-serif text-[1.28em] italic text-neutral-900">fluid</span>{' '}
            interaction systems with a strong editorial eye and production rigor.
          </p>

          <p className="max-w-md text-base leading-relaxed text-neutral-600">
            Currently crafting next-gen tools at{' '}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-neutral-800"
            >
              Vercel
            </a>
            . Previously reshaping payments at Stripe.
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
            href="mailto:pato@patricioalbornoz.com"
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

      <footer className="mt-14 border-t border-[var(--line)] pt-8 text-xs leading-relaxed text-neutral-500">
        © {new Date().getFullYear()} Patricio Albornoz.
        <br />
        Crafted with intention in San Francisco.
        <br />
        Typeset in Manrope &amp; Cormorant Garamond.
      </footer>
    </aside>
  )
}
