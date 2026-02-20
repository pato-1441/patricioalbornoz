import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
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
    <main className="relative min-h-screen selection:bg-white/20 selection:text-white">
      <div aria-hidden className="noise-overlay" />

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 py-10 lg:grid-cols-12 lg:gap-20 lg:px-12 lg:py-16">
        <SectionPills items={navItems} className="sticky top-3 z-40 -mb-3 lg:hidden" />

        <Sidebar navItems={navItems} />

        <article className="space-y-8 lg:col-span-8 xl:col-span-9">
          <div className="content-card article-card p-6 md:p-10">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-neutral-500 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-3" />
              Back to all articles
            </Link>

            <p className="mt-8 text-xs uppercase tracking-[0.2em] text-neutral-600">
              {article.date} · {article.readTime}
            </p>
            <h1 className="article-title mt-4 max-w-4xl text-4xl leading-tight text-white md:text-6xl">
              {article.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-neutral-300">
              {article.excerpt}
            </p>

            <a
              href="https://neto.substack.com/p/mystery-shopping-guia-para-espiar"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-neutral-500 transition-colors hover:text-white"
            >
              Read reference style
              <ArrowUpRight className="size-3" />
            </a>
          </div>

          <div className="reading-surface content-card article-card p-6 md:p-10">
            <div className="prose-flow mx-auto max-w-3xl space-y-5 text-base leading-relaxed text-neutral-300 md:text-[1.05rem]">
              {article.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}
