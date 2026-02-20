import { Link } from '@tanstack/react-router'
import { ArrowRight, PenSquare } from 'lucide-react'
import type { Article } from '@/data/articles'

type ArticleCardProps = {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link to="/articles/$slug" params={{ slug: article.slug }} className="group block">
      <article className="content-card article-card border-stone-300/90 p-6">
        <div className="mb-4 flex items-center justify-between text-xs text-neutral-500">
          <div className="inline-flex items-center gap-2 uppercase tracking-[0.16em]">
            <PenSquare className="size-3.5" />
            Essay
          </div>
          <time>{article.date}</time>
        </div>
        <h3 className="article-title text-2xl leading-tight text-neutral-900 transition-colors group-hover:text-neutral-700">
          {article.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-neutral-700">
          {article.excerpt}
        </p>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.14em] text-neutral-600">
            {article.readTime}
          </span>
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-neutral-600 transition-colors group-hover:text-neutral-900">
            Read Article
            <ArrowRight className="size-3" />
          </span>
        </div>
      </article>
    </Link>
  )
}
