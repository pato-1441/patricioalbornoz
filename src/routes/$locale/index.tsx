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
    <main className="relative min-h-screen selection:bg-amber-200/60 selection:text-neutral-900">
      <div aria-hidden className="noise-overlay" />

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 py-10 lg:grid-cols-12 lg:gap-20 lg:px-12 lg:py-16">
        <SectionPills items={sectionNavItems} className="reveal delay-1 mb-3 lg:hidden" />

        <Sidebar navItems={sectionNavItems} className="reveal delay-1" />

        <div className="space-y-14 lg:col-span-8 lg:space-y-20 xl:col-span-9">
          <div className="reveal delay-2">
            <HomeSection />
          </div>
          <div className="reveal delay-3">
            <WorkSection />
          </div>
          <div className="reveal delay-4">
            <ArticlesPreviewSection />
          </div>
        </div>
      </div>
    </main>
  )
}
