import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { ArticleCard } from '@/components/portfolio/article-card'
import { SectionHeader } from '@/components/portfolio/section-header'
import { articles } from '@/data/articles'

export function ArticlesPreviewSection() {
  return (
    <section id="articles" className="scroll-mt-24 space-y-6">
      <SectionHeader
        title="Articles"
        rightContent={
          <a
            href="https://neto.substack.com/p/mystery-shopping-guia-para-espiar"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-200"
          >
            Substack Style Reference
            <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        }
      />

      <article className="content-card article-card p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
          Featured Essay
        </p>
        <h3 className="article-title mt-4 text-3xl leading-tight text-white md:text-4xl">
          Writing about product craft, creative engineering, and interface
          systems.
        </h3>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-400">
          This section mirrors a Substack reading experience: editorial cadence,
          tighter typography, and strong hierarchy around title, date, and
          excerpt.
        </p>
        <Link
          to="/articles"
          className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-neutral-400 transition-colors hover:text-white"
        >
          Browse all essays
          <ArrowUpRight className="size-3" />
        </Link>
      </article>

      <div className="space-y-4">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  )
}
