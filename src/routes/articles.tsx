import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { ArticleCard } from '@/components/portfolio/article-card'
import { SectionHeader } from '@/components/portfolio/section-header'
import { SectionPills, type NavItem } from '@/components/portfolio/section-pills'
import { Sidebar } from '@/components/portfolio/sidebar'
import { articles } from '@/data/articles'

export const Route = createFileRoute('/articles')({
  component: ArticlesPage,
})

const navItems: NavItem[] = [
  { label: 'Home', href: '/#home' },
  { label: 'Work', href: '/#work' },
  { label: 'Articles', href: '/articles' },
]

function ArticlesPage() {
  return (
    <main className="relative min-h-screen selection:bg-white/20 selection:text-white">
      <div aria-hidden className="noise-overlay" />

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 py-10 lg:grid-cols-12 lg:gap-20 lg:px-12 lg:py-16">
        <SectionPills items={navItems} className="sticky top-3 z-40 -mb-3 lg:hidden" />

        <Sidebar navItems={navItems} />

        <div className="space-y-10 lg:col-span-8 xl:col-span-9">
          <section className="space-y-6">
            <SectionHeader
              title="Articles"
              rightContent={
                <a
                  href="https://neto.substack.com/p/mystery-shopping-guia-para-espiar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-200"
                >
                  Substack Tone
                  <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              }
            />

            <article className="content-card article-card p-6 md:p-10">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
                Editorial Notes
              </p>
              <h2 className="article-title mt-4 max-w-4xl text-4xl leading-tight text-white md:text-5xl">
                Essays about product craft and engineering decisions that scale.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-400">
                This archive collects writing on interface systems, product clarity,
                and the execution details that make teams ship better software.
              </p>
              <a
                href="/#articles"
                className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-neutral-400 transition-colors hover:text-white"
              >
                Back to portfolio section
                <ArrowUpRight className="size-3" />
              </a>
            </article>
          </section>

          <section className="space-y-4">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </section>
        </div>
      </div>
    </main>
  )
}
