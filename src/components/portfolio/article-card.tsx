import { Link } from '@tanstack/react-router'
import type { Article } from '@/data/articles'

type ArticleCardProps = {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      to="/articles/$slug"
      params={{ slug: article.slug }}
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
          <span>{article.pinned ? 'Featured' : 'Article'}</span>
          <span>{article.readTime}</span>
        </div>
        <h3 className="article-row-title">{article.title}</h3>
        <div className="article-row-meta">
          <p className="article-row-subtitle">{article.excerpt}</p>
          <p className="article-row-date">{article.date}</p>
        </div>
      </div>
    </Link>
  )
}
