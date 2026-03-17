import { Link, createFileRoute, notFound, redirect } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { ArticleContent } from '@/components/portfolio/article-content'
import { copy } from '@/data/i18n'
import {
  getArticleSlugRedirect,
  getArticleTranslationBySlug,
  getAvailableArticleLocales,
  hasArticleTranslation,
} from '@/data/articles'
import { defaultLocale, formatArticleDate, formatReadTime, isLocale } from '@/lib/locale'
import { createSeoHead } from '@/lib/seo'
import { buildAbsoluteUrl, siteAuthorName, siteName } from '@/lib/site'

function resolveLocale(value: string) {
  return isLocale(value) ? value : defaultLocale
}

export const Route = createFileRoute('/$locale/articles/$slug')({
  loader: ({ params }) => {
    const locale = resolveLocale(params.locale)
    const redirectSlug = getArticleSlugRedirect(params.slug)

    if (redirectSlug) {
      throw redirect({
        to: '/$locale/articles/$slug',
        params: {
          locale,
          slug: redirectSlug,
        },
      })
    }

    if (!hasArticleTranslation(params.slug, locale)) {
      throw notFound()
    }

    return {
      slug: params.slug,
      locale,
    }
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return createSeoHead({
        title: siteName,
        description: siteName,
        locale: defaultLocale,
        path: '/en/articles',
        robots: 'noindex,follow',
      })
    }

    const article = getArticleTranslationBySlug(loaderData.slug, loaderData.locale)

    if (!article) {
      return createSeoHead({
        title: siteName,
        description: siteName,
        locale: loaderData.locale,
        path: `/${loaderData.locale}/articles`,
        robots: 'noindex,follow',
      })
    }

    const availableLocales = getAvailableArticleLocales(article.slug)
    const alternates = Object.fromEntries(
      availableLocales.map((locale) => [locale, `/${locale}/articles/${article.slug}`]),
    )

    return createSeoHead({
      title: article.title,
      description: article.excerpt,
      locale: loaderData.locale,
      path: `/${loaderData.locale}/articles/${article.slug}`,
      image: article.ogImage ?? article.coverImage,
      imageAlt: article.ogImageAlt ?? article.coverAlt ?? article.title,
      type: 'article',
      publishedTime: article.publishedAt,
      authorName: siteAuthorName,
      alternates,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.excerpt,
        datePublished: article.publishedAt,
        author: {
          '@type': 'Person',
          name: siteAuthorName,
        },
        publisher: {
          '@type': 'Person',
          name: siteAuthorName,
        },
        image: buildAbsoluteUrl(article.ogImage ?? article.coverImage ?? '/profile.jpeg'),
        mainEntityOfPage: buildAbsoluteUrl(`/${loaderData.locale}/articles/${article.slug}`),
        inLanguage: loaderData.locale,
      },
    })
  },
  component: ArticlePage,
})

function ArticlePage() {
  const { slug, locale } = Route.useLoaderData()
  const t = copy[locale]
  const article = getArticleTranslationBySlug(slug, locale)

  if (!article) {
    throw notFound()
  }

  return (
    <main className="article-page relative min-h-screen selection:bg-amber-200/60 selection:text-neutral-900">
      <div className="article-page-wrap">
        <article className="article-shell">
          <Link
            to="/$locale/articles"
            params={{ locale }}
            className="article-backlink"
          >
            <ArrowLeft className="size-3" />
            {t.articles.backToAll}
          </Link>

          {article.coverImage ? (
            <div className="article-cover">
              <img
                src={article.coverImage}
                alt={article.coverAlt ?? article.title}
                className="article-cover-image"
                loading="eager"
                decoding="async"
              />
            </div>
          ) : null}

          <div className="article-meta">
            <span>{formatArticleDate(article.publishedAt, locale)}</span>
            <span aria-hidden className="article-meta-dot" />
            <span>{formatReadTime(article.readTimeMinutes, locale)}</span>
            <span aria-hidden className="article-meta-dot" />
            <span>{`${t.articles.byAuthor} ${siteAuthorName}`}</span>
          </div>
          <header className="article-header">
            <h1 className="article-title">{article.title}</h1>
            <p className="article-excerpt">{article.excerpt}</p>
          </header>

          <div className="article-divider" />

          <ArticleContent blocks={article.blocks} />
        </article>
      </div>
    </main>
  )
}
