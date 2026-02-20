import { Github, Linkedin, Mail } from 'lucide-react'
import { X } from '@/components/icons/x'
import { SectionPills, type NavItem } from '@/components/portfolio/section-pills'

type SidebarProps = {
  navItems: NavItem[]
}

export function Sidebar({ navItems }: SidebarProps) {
  return (
    <aside className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-16 lg:h-[calc(100vh-8rem)] lg:flex lg:flex-col lg:justify-between">
      <div className="space-y-8">
        <div className="space-y-6">
          <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
            Patricio Albornoz
          </p>
          <h1 className="text-3xl font-medium leading-[1.04] tracking-tight text-neutral-900 sm:text-4xl">
            Patricio
            <br />
            Albornoz
            <br />
            <span className="text-neutral-500">Design Engineer</span>
          </h1>
          <p className="max-w-md text-base leading-relaxed text-neutral-700">
            Building <span className="display-serif italic text-neutral-900">polished</span>{' '}
            interfaces and{' '}
            <span className="display-serif italic text-neutral-900">fluid</span>{' '}
            interactions at the intersection of design systems and creative
            coding.
          </p>
          <p className="max-w-md text-sm leading-relaxed text-neutral-600">
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

        <SectionPills items={navItems} className="hidden lg:flex" />

        <div className="flex items-center gap-5 text-neutral-500">
          <a
            href="https://x.com/patoalbornozz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X profile"
            className="transition-colors hover:text-neutral-900"
          >
            <X />
          </a>
          <a
            href="https://github.com/pato-1441"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="transition-colors hover:text-neutral-900"
          >
            <Github className="size-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/patoalbornoz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="transition-colors hover:text-neutral-900"
          >
            <Linkedin className="size-5" />
          </a>
          <a
            href="mailto:pato@patricioalbornoz.com"
            aria-label="Email Patricio"
            className="transition-colors hover:text-neutral-900"
          >
            <Mail className="size-5" />
          </a>
        </div>

        <div className="inline-flex rounded-full border border-stone-300 bg-stone-100 px-3 py-1.5 text-xs tracking-[0.08em] text-neutral-600">
          <span className="mr-2 inline-flex size-2 animate-pulse rounded-full bg-emerald-500/80" />
          OPEN TO ADVISORY
        </div>
      </div>

      <footer className="mt-12 border-t border-stone-300 pt-8 text-xs leading-relaxed text-neutral-500">
        © {new Date().getFullYear()} Patricio Albornoz.
        <br />
        Crafted with intention in San Francisco.
        <br />
        Typeset in Geist &amp; Newsreader.
      </footer>
    </aside>
  )
}
