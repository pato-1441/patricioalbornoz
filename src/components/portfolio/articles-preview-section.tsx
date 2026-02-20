import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { ArticleCard } from '@/components/portfolio/article-card'
import { SectionHeader } from '@/components/portfolio/section-header'
import { articles } from '@/data/articles'

export function ArticlesPreviewSection() {
  return (
    <section id="articles" className="scroll-mt-24 space-y-7">
      <SectionHeader
        title="Articles"
        rightContent={
          <Link
            to="/articles"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900"
          >
            Open archive
            <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        }
      />

      <article className="content-card article-card p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Editorial Line</p>
        <h3 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-neutral-900 md:text-5xl">
          Writing on product clarity, interface behavior, and frontend craft.
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-700">
          Short essays from real shipping work: structure, language, and interaction
          decisions that make software easier to trust.
        </p>
      </article>

      <div className="article-list">
        {articles.slice(0, 4).map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  )
}
