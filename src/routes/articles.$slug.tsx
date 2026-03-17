import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { ArticleContent } from '@/components/portfolio/article-content'
import { getArticleBySlug } from '@/data/articles'

export const Route = createFileRoute('/articles/$slug')({
  loader: ({ params }) => {
    const article = getArticleBySlug(params.slug)

    if (!article) {
      throw notFound()
    }

    return { article }
  },
  component: ArticlePage,
})

function ArticlePage() {
  const { article } = Route.useLoaderData()

  return (
    <main className="relative min-h-screen selection:bg-amber-200/60 selection:text-neutral-900">
      <div aria-hidden className="noise-overlay" />

      <div className="mx-auto max-w-[980px] px-6 py-10 lg:px-10 lg:py-16">
        <article className="mx-auto w-full max-w-[780px] space-y-10">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-neutral-600 transition-colors hover:text-neutral-900"
          >
            <ArrowLeft className="size-3" />
            Back to all articles
          </Link>

          {article.coverImage ? (
            <div className="overflow-hidden rounded-[1.25rem] border border-[var(--line)] bg-[var(--paper-soft)]">
              <img
                src={article.coverImage}
                alt={article.coverAlt ?? article.title}
                className="aspect-[16/9] w-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.2em] text-neutral-500">
            <span>{article.date}</span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-[var(--line-strong)]" />
            <span>{article.readTime}</span>
          </div>
          <h1 className="max-w-4xl text-4xl font-semibold leading-[0.95] tracking-tight text-neutral-900 md:text-5xl">
            {article.title}
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-neutral-700">
            {article.excerpt}
          </p>

          <div className="h-px w-full bg-[var(--line)]" />

          <ArticleContent blocks={article.blocks} />
        </article>
      </div>
    </main>
  )
}
