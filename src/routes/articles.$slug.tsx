import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { ArticleContent } from '@/components/portfolio/article-content'
import { SectionPills, type NavItem } from '@/components/portfolio/section-pills'
import { Sidebar } from '@/components/portfolio/sidebar'
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

const navItems: NavItem[] = [
  { label: 'Home', href: '/#home' },
  { label: 'Work', href: '/#work' },
  { label: 'Articles', href: '/articles' },
]

function ArticlePage() {
  const { article } = Route.useLoaderData()

  return (
    <main className="relative min-h-screen selection:bg-amber-200/60 selection:text-neutral-900">
      <div aria-hidden className="noise-overlay" />

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 py-10 lg:grid-cols-12 lg:gap-20 lg:px-12 lg:py-16">
        <SectionPills items={navItems} className="mb-3 lg:hidden" />

        <Sidebar navItems={navItems} />

        <article className="space-y-8 lg:col-span-8 xl:col-span-9">
          <div className="content-card article-card p-6 md:p-10">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-neutral-600 transition-colors hover:text-neutral-900"
            >
              <ArrowLeft className="size-3" />
              Back to all articles
            </Link>

            <p className="mt-8 text-xs uppercase tracking-[0.2em] text-neutral-500">
              {article.date} · {article.readTime}
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[0.92] tracking-tight text-neutral-900 md:text-7xl">
              {article.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-700">
              {article.excerpt}
            </p>
          </div>

          <div className="reading-surface content-card article-card p-6 md:p-10">
            <ArticleContent blocks={article.blocks} />
          </div>
        </article>
      </div>
    </main>
  )
}
