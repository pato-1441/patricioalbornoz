import { Link } from '@tanstack/react-router'
import { ArrowRight, PenSquare } from 'lucide-react'
import type { Article } from '@/data/articles'

type ArticleCardProps = {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link to="/articles/$slug" params={{ slug: article.slug }} className="article-row group">
      <div className="text-xs uppercase tracking-[0.14em] text-neutral-500">
        <div className="inline-flex items-center gap-2">
          <PenSquare className="size-3.5" />
          Essay
        </div>
        <div className="mt-2">{article.date}</div>
      </div>

      <div>
        <h3 className="text-3xl font-semibold leading-[0.95] tracking-tight text-neutral-900 transition-colors group-hover:text-neutral-700 md:text-4xl">
          {article.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-700">{article.excerpt}</p>
        <p className="mt-3 text-xs uppercase tracking-[0.14em] text-neutral-500">{article.readTime}</p>
      </div>

      <span className="article-arrow hidden self-center md:inline-flex">
        <ArrowRight className="size-4" />
      </span>
    </Link>
  )
}
