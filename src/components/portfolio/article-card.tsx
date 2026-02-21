import { Link } from '@tanstack/react-router'
import type { Article } from '@/data/articles'

type ArticleCardProps = {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link to="/articles/$slug" params={{ slug: article.slug }} className="article-row">
      <h3 className="article-row-title">{article.title}</h3>
      <div className="article-row-meta">
        <p className="article-row-subtitle">{article.excerpt}</p>
        <p className="article-row-date">{article.date}</p>
      </div>
    </Link>
  )
}
