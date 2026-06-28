import { Github, Linkedin, Mail } from 'lucide-react'
import type { NavItem } from '@/components/portfolio/section-pills'
import { LanguageToggle } from '@/components/portfolio/language-toggle'
import { SectionPills } from '@/components/portfolio/section-pills'
import { X } from '@/components/icons/x'
import { useLocale } from '@/context/locale-context'

type CompanyKey = 'pulso' | 'autonoma' | 'melian' | 'emblue'

type CompanyMeta = {
  name: string
  href: string
  logoSrc: string
}

type SidebarProps = {
  navItems: Array<NavItem>
  className?: string
  layout?: 'default' | 'article'
}

const companies: Record<CompanyKey, CompanyMeta> = {
  pulso: {
    name: 'Pulso',
    href: 'https://pulso.health/',
    logoSrc:
      'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://pulso.health/&size=256',
  },
  autonoma: {
    name: 'Autonoma',
    href: 'https://getautonoma.com/',
    logoSrc:
      'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://getautonoma.com/&size=256',
  },
  melian: {
    name: 'Melian',
    href: 'https://www.melian.com/',
    logoSrc:
      'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://melian.com/&size=256',
  },
  emblue: {
    name: 'emBlue',
    href: 'https://www.embluemail.com/',
    logoSrc:
      'https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://embluemail.com/&size=256',
  },
}

type CompanyLinkProps = {
  company: CompanyKey
  className: string
  label: string
}

function CompanyLink({ company, className, label }: CompanyLinkProps) {
  const { href, logoSrc } = companies[company]

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`company-link link-underline ${className}`}
    >
      <img src={logoSrc} alt="" aria-hidden="true" className="company-link-logo" />
      <span>{label}</span>
    </a>
  )
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
              <CompanyLink
                company="pulso"
                label={t.sidebar.introCurrent}
                className="text-[1em] font-semibold text-neutral-800"
              />
              {t.sidebar.introCurrentTail}
            </span>
            <span className="mt-3 block">
              {t.sidebar.introPrevious}{' '}
              <CompanyLink
                company="autonoma"
                label={t.sidebar.introPreviousLink}
                className="text-[1em] font-semibold text-neutral-800"
              />
              {t.sidebar.introPreviousTail}{' '}
              <CompanyLink
                company="melian"
                label={t.sidebar.introPreviousSecondLink}
                className="text-[1em] font-semibold text-neutral-800"
              />
              {t.sidebar.introPreviousSecondTail}
            </span>
            <span className="mt-3 block">
              {t.sidebar.introEarlier}{' '}
              <span className="text-neutral-800">
                {t.sidebar.introEarlierProduct}
              </span>{' '}
              {t.sidebar.introEarlierMiddle}{' '}
              <CompanyLink
                company="emblue"
                label={t.sidebar.introEarlierCompany}
                className="text-[1em] font-semibold text-neutral-800"
              />
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
