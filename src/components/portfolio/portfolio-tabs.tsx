import { useLocation, useNavigate } from '@tanstack/react-router'
import { useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { AboutSection } from '@/components/portfolio/about-section'
import { ArticlesPreviewSection } from '@/components/portfolio/articles-preview-section'
import { ProjectsSection } from '@/components/portfolio/projects-section'
import { WorkSection } from '@/components/portfolio/work-section'
import { useLocale } from '@/context/locale-context'

const tabIds = ['work', 'articles', 'projects', 'about'] as const

export function PortfolioNavigation() {
  const { locale, t } = useLocale()
  const { hash, pathname } = useLocation()
  const activeTab = pathname.includes('/articles')
    ? 'articles'
    : pathname.includes('/projects/')
      ? 'projects'
      : undefined
  const navigate = useNavigate()
  const buttons = useRef<Array<HTMLButtonElement | null>>([])
  const tabs = tabIds.map((id) => ({ id, label: t.nav[id] }))
  const selected = Math.max(
    0,
    tabs.findIndex((tab) => tab.id === (activeTab ?? hash)),
  )

  function select(index: number) {
    void navigate({
      to: '/$locale',
      params: { locale },
      hash: tabs[index].id,
      resetScroll: Boolean(activeTab),
      hashScrollIntoView: false,
    })
  }

  return (
    <header className="portfolio-navigation">
      <div
        className="portfolio-tabs"
        role="tablist"
        aria-label={t.profile.navigation}
        style={
          {
            '--tab-index': selected,
            '--tab-count': tabs.length,
          } as CSSProperties
        }
      >
        <span className="portfolio-tab-indicator" aria-hidden="true" />
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => {
              buttons.current[index] = element
            }}
            id={`${tab.id}-tab`}
            type="button"
            role="tab"
            aria-selected={index === selected}
            aria-controls={`${tab.id}-panel`}
            tabIndex={index === selected ? 0 : -1}
            onClick={() => select(index)}
            onKeyDown={(event) => {
              if (
                !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)
              )
                return
              event.preventDefault()
              const next =
                event.key === 'Home'
                  ? 0
                  : event.key === 'End'
                    ? tabs.length - 1
                    : (index +
                        (event.key === 'ArrowRight' ? 1 : -1) +
                        tabs.length) %
                      tabs.length
              select(next)
              buttons.current[next]?.focus()
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  )
}

export function PortfolioTabs({
  activeTab,
  children,
}: {
  activeTab?: 'articles' | 'projects'
  children?: ReactNode
}) {
  const hash = useLocation({ select: (location) => location.hash })
  const selected = Math.max(
    0,
    tabIds.findIndex((id) => id === (activeTab ?? hash)),
  )
  const content = [
    <WorkSection />,
    <ArticlesPreviewSection />,
    <ProjectsSection />,
    <AboutSection />,
  ]

  return (
    <div className="portfolio-content" data-detail={activeTab || undefined}>
      {tabIds.map((id, index) => (
        <div
          key={id}
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab`}
          tabIndex={0}
          hidden={index !== selected}
        >
          {index === selected ? (children ?? content[index]) : null}
        </div>
      ))}
    </div>
  )
}
