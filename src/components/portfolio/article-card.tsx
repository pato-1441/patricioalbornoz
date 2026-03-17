import { Link } from '@tanstack/react-router'
import type { Article } from '@/data/articles'
import { useLocale } from '@/context/locale-context'
import { formatArticleDate, formatReadTime } from '@/lib/locale'

type ArticleCardProps = {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { locale, t } = useLocale()

  return (
    <Link
      to="/$locale/articles/$slug"
      params={{ locale, slug: article.slug }}
      className={`article-row ${article.coverImage ? 'article-row-with-cover' : ''}`}
    >
      {article.coverImage ? (
        <div className="article-row-cover">
          <img
            src={article.coverImage}
            alt={article.coverAlt ?? article.title}
            className="article-row-cover-image"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : null}

      <div className="article-row-content">
        <div className="article-row-kicker">
          <span>{article.pinned ? t.articles.featured : t.articles.article}</span>
          <span>{formatReadTime(article.readTimeMinutes, locale)}</span>
        </div>
        <h3 className="article-row-title">{article.title}</h3>
        <div className="article-row-meta">
          <p className="article-row-subtitle">{article.excerpt}</p>
          <p className="article-row-date">{formatArticleDate(article.publishedAt, locale)}</p>
        </div>
      </div>
    </Link>
  )
}
