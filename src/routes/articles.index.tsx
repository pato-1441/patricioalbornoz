import { createFileRoute, Link } from '@tanstack/react-router'
import { ArticleCard } from '@/components/portfolio/article-card'
import { SectionHeader } from '@/components/portfolio/section-header'
import { SectionPills, type NavItem } from '@/components/portfolio/section-pills'
import { Sidebar } from '@/components/portfolio/sidebar'
import { articles } from '@/data/articles'

export const Route = createFileRoute('/articles/')({
  component: ArticlesPage,
})

const navItems: NavItem[] = [
  { label: 'Home', href: '/#home' },
  { label: 'Work', href: '/#work' },
  { label: 'Articles', href: '/articles' },
]

function ArticlesPage() {
  return (
    <main className="relative min-h-screen selection:bg-amber-200/60 selection:text-neutral-900">
      <div aria-hidden className="noise-overlay" />

      <div className="mx-auto grid max-w-[1640px] grid-cols-1 gap-12 px-6 py-10 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:py-16">
        <SectionPills items={navItems} className="mb-3 lg:hidden" />

        <Sidebar navItems={navItems} layout="article" />

        <div className="space-y-9 lg:col-span-8 lg:flex lg:justify-center xl:col-span-9">
          <div className="w-full max-w-5xl space-y-9">
            <section className="space-y-5">
              <SectionHeader
                title="Articles"
                rightContent={
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                    Archive
                  </p>
                }
              />

              <Link
                to="/"
                hash="articles"
                className="inline-flex items-center text-xs uppercase tracking-[0.14em] text-neutral-600 transition-colors hover:text-neutral-900"
              >
                Back to portfolio section
              </Link>
            </section>

            <section className="article-list">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
