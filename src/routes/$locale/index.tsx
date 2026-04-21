import { createFileRoute } from '@tanstack/react-router'
import type { NavItem } from '@/components/portfolio/section-pills'
import { ArticlesPreviewSection } from '@/components/portfolio/articles-preview-section'
import { HomeSection } from '@/components/portfolio/home-section'
import { SectionPills } from '@/components/portfolio/section-pills'
import { Sidebar } from '@/components/portfolio/sidebar'
import { WorkSection } from '@/components/portfolio/work-section'
import { useLocale } from '@/context/locale-context'
import { copy } from '@/data/i18n'
import { defaultLocale, isLocale } from '@/lib/locale'
import { createSeoHead } from '@/lib/seo'
import { buildAbsoluteUrl, siteName } from '@/lib/site'

function resolveLocale(value: string) {
  return isLocale(value) ? value : defaultLocale
}

export const Route = createFileRoute('/$locale/')({
  head: ({ params }) => {
    const locale = resolveLocale(params.locale)
    const t = copy[locale]

    return createSeoHead({
      title: t.seo.homeTitle,
      description: t.seo.homeDescription,
      locale,
      path: `/${locale}`,
      alternates: {
        en: '/en',
        es: '/es',
      },
      structuredData: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteName,
          url: buildAbsoluteUrl(`/${locale}`),
          description: t.seo.homeDescription,
          inLanguage: locale,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: siteName,
          url: buildAbsoluteUrl(`/${locale}`),
          image: buildAbsoluteUrl('/profile.jpeg'),
          jobTitle: 'Product Design Engineer',
          worksFor: {
            '@type': 'Organization',
            name: 'Autonoma',
          },
          sameAs: [
            'https://x.com/patoalbornozz',
            'https://github.com/pato-1441',
            'https://www.linkedin.com/in/patoalbornoz/',
          ],
        },
      ],
    })
  },
  component: App,
})

function App() {
  const { t } = useLocale()

  const sectionNavItems: Array<NavItem> = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.work, href: '#work' },
    { label: t.nav.articles, href: '#articles' },
  ]

  return (
    <main className="xp-desktop">
      <div className="desktop-shell home-shell">
        <SectionPills items={sectionNavItems} className="mobile-nav" />

        <Sidebar navItems={sectionNavItems} />

        <div className="main-stack">
          <HomeSection />
          <WorkSection />
          <ArticlesPreviewSection />
        </div>
      </div>
    </main>
  )
}
