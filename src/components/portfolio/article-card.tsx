import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import type { Article } from '@/data/articles'
import { useLocale } from '@/context/locale-context'
import { formatArticleDate, formatReadTime } from '@/lib/locale'

export function ArticleCard({ article }: { article: Article }) {
  const { locale } = useLocale()
  return (
    <Link
      to="/$locale/articles/$slug"
      params={{ locale, slug: article.slug }}
      className="writing-card"
    >
      {article.coverImage && (
        <div className="collection-cover">
          <img
            src={article.coverImage}
            alt={article.coverAlt ?? article.title}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      <div className="collection-copy">
        <p className="collection-meta">
          <time dateTime={article.publishedAt}>
            {formatArticleDate(article.publishedAt, locale)}
          </time>
          <span aria-hidden="true">·</span>
          <span>{formatReadTime(article.readTimeMinutes, locale)}</span>
        </p>
        <h2>{article.title}</h2>
        <p className="collection-description">{article.excerpt}</p>
        <span className="collection-action">
          {locale === 'es' ? 'Leer historia' : 'Read story'}{' '}
          <ArrowUpRight size={16} aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}
