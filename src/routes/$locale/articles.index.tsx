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
    { label: t.nav.home, href: `/${locale}#home` },
    { label: t.nav.work, href: `/${locale}#work` },
    { label: t.nav.articles, href: `/${locale}/articles` },
  ]
  const articles = getArticles(locale)

  return (
    <main className="relative min-h-screen selection:bg-amber-200/60 selection:text-neutral-900">
      <div aria-hidden className="noise-overlay" />

      <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-12 px-6 py-10 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:py-16">
        <SectionPills items={navItems} className="mb-3 lg:hidden" />

        <Sidebar navItems={navItems} layout="article" />

        <div className="space-y-9 lg:col-span-8 lg:flex lg:justify-center xl:col-span-9">
          <div className="w-full max-w-5xl space-y-9">
            <section className="space-y-5">
              <SectionHeader
                title={t.articles.title}
                rightContent={
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                    {t.articles.archive}
                  </p>
                }
              />

              <Link
                to="/$locale"
                params={{ locale }}
                hash="articles"
                className="inline-flex items-center text-xs uppercase tracking-[0.14em] text-neutral-600 transition-colors hover:text-neutral-900"
              >
                {t.articles.backToPortfolio}
              </Link>
            </section>

            <section className="article-list">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </section>

            <section className="articles-soon-note">
              <p className="articles-soon-label">{t.home.archiveLabel}</p>
              <h3 className="articles-soon-title">{t.articles.comingSoonTitle}</h3>
              <p className="articles-soon-description">{t.articles.comingSoonDescription}</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
