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
    <aside className={`sidebar-slot ${layout === 'article' ? 'sidebar-slot-article' : ''} ${className ?? ''}`.trim()}>
      <div className="window sidebar-window">
        <div className="title-bar">
          <div className="title-bar-text">Profile Panel</div>
        </div>

        <div className="window-body sidebar-body">
          <div className="sidebar-copy-block">
            <h1 className="sidebar-name">
              Patricio Albornoz
              <span>{t.sidebar.role}</span>
            </h1>

            <p className="sidebar-copy">
              {t.sidebar.introLead}{' '}
              <a href="https://getautonoma.com" target="_blank" rel="noopener noreferrer">
                {t.sidebar.introCurrent}
              </a>
              {t.sidebar.introCurrentTail}
            </p>
            <p className="sidebar-copy">
              {t.sidebar.introPrevious}{' '}
              <a href="https://www.melian.com" target="_blank" rel="noopener noreferrer">
                {t.sidebar.introPreviousLink}
              </a>
              {t.sidebar.introPreviousTail}
            </p>
            <p className="sidebar-copy">
              {t.sidebar.introEarlier}{' '}
              <a
                href="https://www.embluemail.com/producto/whatsapp-universal-inbox/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.sidebar.introEarlierProduct}
              </a>{' '}
              {t.sidebar.introEarlierMiddle}{' '}
              <a href="https://www.embluemail.com/" target="_blank" rel="noopener noreferrer">
                {t.sidebar.introEarlierCompany}
              </a>
              {t.sidebar.introEarlierTail}
            </p>
          </div>

          <fieldset className="sidebar-nav-group">
            <legend>{t.nav.home}</legend>
            <SectionPills items={navItems} />
          </fieldset>

          <LanguageToggle />

          <div className="field-row sidebar-links">
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
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/patoalbornoz/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.sidebar.linkedinLabel}
              className="icon-link"
            >
              <Linkedin size={16} />
            </a>
            <a href="mailto:pwalbornoz@gmail.com" aria-label={t.sidebar.emailLabel} className="icon-link">
              <Mail size={16} />
            </a>
          </div>
        </div>

        <div className="status-bar sidebar-footer">
          <p className="status-bar-field">© {new Date().getFullYear()} Patricio Albornoz</p>
          <p className="status-bar-field">{t.sidebar.crafted}</p>
        </div>
      </div>
    </aside>
  )
}
