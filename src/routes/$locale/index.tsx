import { createFileRoute } from '@tanstack/react-router'
import type { NavItem } from '@/components/portfolio/section-pills'
import { ArticlesPreviewSection } from '@/components/portfolio/articles-preview-section'
import { ProjectsSection } from '@/components/portfolio/projects-section'
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
    { label: t.nav.work, href: '#work' },
    { label: t.nav.articles, href: '#articles' },
    { label: t.nav.projects, href: '#projects' },
  ]

  return (
    <main className="relative min-h-screen selection:bg-neutral-200 selection:text-neutral-950">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-16 px-6 py-16 sm:px-12 lg:min-h-screen lg:flex-row lg:gap-24 lg:px-16 lg:py-32">
        <SectionPills
          items={sectionNavItems}
          className="reveal delay-1 lg:hidden"
        />

        <Sidebar navItems={sectionNavItems} className="reveal delay-1" />

        <div className="flex min-w-0 flex-1 flex-col gap-32">
          <div className="reveal delay-2">
            <WorkSection />
          </div>
          <div className="reveal delay-3">
            <ArticlesPreviewSection />
          </div>
          <div className="reveal delay-4">
            <ProjectsSection />
          </div>
        </div>
      </div>
    </main>
  )
}
