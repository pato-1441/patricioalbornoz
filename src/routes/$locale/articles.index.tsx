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
    <main className="xp-desktop">
      <div className="desktop-shell articles-shell">
        <SectionPills items={navItems} className="mobile-nav" />

        <Sidebar navItems={navItems} layout="article" />

        <div className="main-stack">
          <section className="xp-section">
            <SectionHeader title={t.articles.title} rightContent={<p>{t.articles.archive}</p>} />

            <Link to="/$locale" params={{ locale }} hash="articles" className="section-action-link">
              {t.articles.backToPortfolio}
            </Link>
          </section>

          <section className="article-list">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </section>

          <section className="window articles-soon-window">
            <div className="title-bar">
              <div className="title-bar-text">{t.home.archiveLabel}</div>
            </div>
            <div className="window-body">
              <h3 className="articles-soon-title">{t.articles.comingSoonTitle}</h3>
              <p className="articles-soon-description">{t.articles.comingSoonDescription}</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
