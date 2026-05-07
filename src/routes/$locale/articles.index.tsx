import { Link, createFileRoute } from '@tanstack/react-router'
import type { NavItem } from '@/components/portfolio/section-pills'
import { ArticleCard } from '@/components/portfolio/article-card'
import { SectionHeader } from '@/components/portfolio/section-header'
import { SectionPills } from '@/components/portfolio/section-pills'
import { Sidebar } from '@/components/portfolio/sidebar'
import { copy } from '@/data/i18n'
import { getArticles } from '@/data/articles'
import { defaultLocale, isLocale } from '@/lib/locale'
import { createSeoHead } from '@/lib/seo'
import { buildAbsoluteUrl, siteName } from '@/lib/site'

function resolveLocale(value: string) {
  return isLocale(value) ? value : defaultLocale
}

export const Route = createFileRoute('/$locale/articles/')({
  head: ({ params }) => {
    const locale = resolveLocale(params.locale)
    const t = copy[locale]

    return createSeoHead({
      title: t.seo.articlesTitle,
      description: t.seo.articlesDescription,
      locale,
      path: `/${locale}/articles`,
      alternates: {
        en: '/en/articles',
        es: '/es/articles',
      },
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${t.seo.articlesTitle} | ${siteName}`,
        url: buildAbsoluteUrl(`/${locale}/articles`),
        description: t.seo.articlesDescription,
        inLanguage: locale,
      },
    })
  },
  component: ArticlesPage,
})

function ArticlesPage() {
  const locale = resolveLocale(Route.useParams().locale)
  const t = copy[locale]
  const navItems: Array<NavItem> = [
    { label: t.nav.work, href: `/${locale}#work` },
    { label: t.nav.articles, href: `/${locale}/articles` },
    { label: t.nav.projects, href: `/${locale}#projects` },
  ]
  const articles = getArticles(locale)

  return (
    <main className="relative min-h-screen selection:bg-neutral-200 selection:text-neutral-950">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-16 px-6 py-16 sm:px-12 lg:min-h-screen lg:flex-row lg:gap-24 lg:px-16 lg:py-32">
        <SectionPills items={navItems} className="mb-3 lg:hidden" />

        <Sidebar navItems={navItems} />

        <div className="flex min-w-0 flex-1 flex-col gap-8">
          <section className="space-y-5">
            <SectionHeader title={t.articles.title} />

            <Link
              to="/$locale"
              params={{ locale }}
              hash="articles"
              className="inline-flex items-center text-sm text-neutral-600 transition-colors hover:text-neutral-950"
            >
              {t.articles.backToPortfolio}
            </Link>
          </section>

          <section className="article-list">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </section>
        </div>
      </div>
    </main>
  )
}
