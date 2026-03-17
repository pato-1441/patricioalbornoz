import { Github, Linkedin, Mail } from 'lucide-react'
import type { NavItem } from '@/components/portfolio/section-pills'
import { LanguageToggle } from '@/components/portfolio/language-toggle'
import { SectionPills } from '@/components/portfolio/section-pills'
import { X } from '@/components/icons/x'
import { useLocale } from '@/context/locale-context'

type SidebarProps = {
  navItems: Array<NavItem>
  className?: string
  layout?: 'default' | 'article'
}

export function Sidebar({ navItems, className, layout = 'default' }: SidebarProps) {
  const { t } = useLocale()

  return (
    <aside
      className={`lg:col-span-4 xl:col-span-3 lg:sticky lg:top-16 lg:h-[calc(100vh-8rem)] lg:flex lg:flex-col lg:justify-between ${layout === 'article' ? 'lg:-translate-x-5 xl:-translate-x-10' : ''} ${className ?? ''}`}
    >
      <div className="space-y-6">
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold leading-[0.98] tracking-[-0.02em] text-neutral-900 sm:text-5xl">
            Patricio
            <br />
            Albornoz
            <br />
            <span className="display-serif text-[0.92em] font-medium italic text-neutral-600">
              {t.sidebar.role}
            </span>
          </h1>

          <p className="max-w-md text-lg leading-relaxed text-neutral-700">
            <span className="block">
              {t.sidebar.introLead}{' '}
              <a
                href="https://getautonoma.com"
                target="_blank"
                rel="noopener noreferrer"
                className="display-serif text-[1.28em] font-bold italic text-neutral-800 link-underline"
              >
                {t.sidebar.introCurrent}
              </a>
              {t.sidebar.introCurrentTail}
            </span>
            <span className="mt-3 block">
              {t.sidebar.introPrevious}{' '}
              <a
                href="https://www.melian.com"
                target="_blank"
                rel="noopener noreferrer"
                className="display-serif text-[1.28em] font-bold italic text-neutral-800 link-underline"
              >
                {t.sidebar.introPreviousLink}
              </a>
              {t.sidebar.introPreviousTail}
            </span>
            <span className="mt-3 block">
              {t.sidebar.introEarlier}{' '}
              <a
                href="https://www.embluemail.com/producto/whatsapp-universal-inbox/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-neutral-800 link-underline"
              >
                {t.sidebar.introEarlierProduct}
              </a>{' '}
              {t.sidebar.introEarlierMiddle}{' '}
              <a
                href="https://www.embluemail.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="display-serif font-semibold italic text-[1.28em] text-neutral-800 link-underline"
              >
                {t.sidebar.introEarlierCompany}
              </a>
              {t.sidebar.introEarlierTail}
            </span>
          </p>
        </div>

        <SectionPills items={navItems} className="hidden lg:flex lg:py-1" />
        <LanguageToggle />

        <div className="flex items-center gap-3">
          <a
            href="https://x.com/patoalbornozz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.sidebar.xLabel}
            className="icon-link"
          >
            <X />
          </a>
          <a
            href="https://github.com/pato-1441"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.sidebar.githubLabel}
            className="icon-link"
          >
            <Github className="size-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/patoalbornoz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.sidebar.linkedinLabel}
            className="icon-link"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href="mailto:pwalbornoz@gmail.com"
            aria-label={t.sidebar.emailLabel}
            className="icon-link"
          >
            <Mail className="size-4" />
          </a>
        </div>
      </div>

      <footer className="pt-8 text-xs leading-relaxed text-neutral-500">
        © {new Date().getFullYear()} Patricio Albornoz.
        <br />
        {t.sidebar.crafted}
        <br />
      </footer>
    </aside>
  )
}
