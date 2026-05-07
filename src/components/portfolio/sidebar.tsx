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

export function Sidebar({
  navItems,
  className,
  layout = 'default',
}: SidebarProps) {
  const { t } = useLocale()

  return (
    <aside
      className={`shrink-0 lg:w-[280px] ${layout === 'article' ? 'lg:-translate-x-5 xl:-translate-x-10' : ''} ${className ?? ''}`}
    >
      <div className="flex flex-col gap-10 lg:sticky lg:top-32">
        <div>
          <h1 className="text-lg font-medium tracking-normal text-neutral-950">
            Patricio Albornoz
          </h1>
          <p className="mt-1 text-sm text-neutral-600">{t.sidebar.role}</p>
        </div>

        <SectionPills
          items={navItems}
          className="hidden lg:flex lg:flex-col lg:items-start lg:gap-3"
        />

        <p className="max-w-md space-y-4 text-sm leading-relaxed text-neutral-600">
          <span className="block">
            {t.sidebar.introLead}{' '}
            <a
              href="https://getautonoma.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-950 link-underline"
            >
              {t.sidebar.introCurrent}
            </a>
            {t.sidebar.introCurrentTail}
          </span>
          <span className="block">
            {t.sidebar.introPrevious}{' '}
            <a
              href="https://www.melian.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-950 link-underline"
            >
              {t.sidebar.introPreviousLink}
            </a>
            {t.sidebar.introPreviousTail},{' '}
            {t.sidebar.introEarlier.toLowerCase()}{' '}
            <a
              href="https://www.embluemail.com/producto/whatsapp-universal-inbox/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-950 link-underline"
            >
              {t.sidebar.introEarlierProduct}
            </a>{' '}
            {t.sidebar.introEarlierMiddle}{' '}
            <a
              href="https://www.embluemail.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-950 link-underline"
            >
              {t.sidebar.introEarlierCompany}
            </a>
            {t.sidebar.introEarlierTail}
          </span>
        </p>

        <div className="flex flex-wrap items-center gap-4 text-neutral-600">
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
          <div className="h-4 w-px bg-(--line)" aria-hidden />
          <LanguageToggle />
        </div>

        <footer className="text-xs leading-relaxed text-neutral-400 lg:mt-8">
          © {new Date().getFullYear()} Patricio Albornoz.
          <br />
          {t.sidebar.crafted}
        </footer>
      </div>
    </aside>
  )
}
