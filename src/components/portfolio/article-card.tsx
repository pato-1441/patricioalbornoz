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
    <Link to="/$locale/articles/$slug" params={{ locale, slug: article.slug }} className="window article-row">
      <div className="title-bar">
        <div className="title-bar-text">{article.pinned ? t.articles.featured : t.articles.article}</div>
      </div>

      <div className={`window-body article-row-body ${article.coverImage ? 'article-row-with-cover' : ''}`.trim()}>
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
          <h3 className="article-row-title">{article.title}</h3>
          <p className="article-row-subtitle">{article.excerpt}</p>
        </div>
      </div>

      <div className="status-bar article-row-status">
        <p className="status-bar-field">{formatArticleDate(article.publishedAt, locale)}</p>
        <p className="status-bar-field">{formatReadTime(article.readTimeMinutes, locale)}</p>
      </div>
    </Link>
  )
}
