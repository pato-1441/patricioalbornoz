import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/portfolio/section-header'
import { homeFeaturedArticles } from '@/data/articles'

export function HomeSection() {
  const [leadArticle, ...supportingArticles] = homeFeaturedArticles

  return (
    <section id="home" className="scroll-mt-24 space-y-7">
      <SectionHeader
        title="Home"
        rightContent={
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Pinned Articles
          </p>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.95fr)]">
        <Link
          to="/articles/$slug"
          params={{ slug: leadArticle.slug }}
          className="content-card group block overflow-hidden no-underline"
        >
          <div className="home-feature-media">
            {leadArticle.coverImage ? (
              <img
                src={leadArticle.coverImage}
                alt={leadArticle.coverAlt ?? leadArticle.title}
                className="home-feature-image"
                loading="eager"
                decoding="async"
              />
            ) : (
              <div className="home-feature-placeholder">
                <span>Featured essay</span>
              </div>
            )}
          </div>

          <div className="space-y-4 p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
              <span>{leadArticle.pinned ? 'Pinned article' : 'Latest article'}</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-[var(--line-strong)]" />
              <span>{leadArticle.date}</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-[var(--line-strong)]" />
              <span>{leadArticle.readTime}</span>
            </div>
            <h3 className="article-title text-4xl leading-[0.96] text-neutral-900 md:text-5xl">
              {leadArticle.title}
            </h3>
            <p className="max-w-3xl text-base leading-relaxed text-neutral-700">
              {leadArticle.excerpt}
            </p>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-600 transition-colors group-hover:text-neutral-900">
              Read article
              <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>

        <div className="home-feature-stack">
          {supportingArticles.map((article) => (
            <Link
              key={article.slug}
              to="/articles/$slug"
              params={{ slug: article.slug }}
              className="content-card home-secondary-card group no-underline"
            >
              {article.coverImage ? (
                <div className="home-secondary-media">
                  <img
                    src={article.coverImage}
                    alt={article.coverAlt ?? article.title}
                    className="home-secondary-image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : null}

              <div className="space-y-3 p-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.7rem] uppercase tracking-[0.17em] text-neutral-500">
                  <span>{article.pinned ? 'Pinned' : 'Recent'}</span>
                  <span aria-hidden className="h-1 w-1 rounded-full bg-[var(--line-strong)]" />
                  <span>{article.date}</span>
                </div>
                <h3 className="text-[1.7rem] font-semibold leading-[0.96] tracking-[-0.03em] text-neutral-900">
                  {article.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-700">{article.excerpt}</p>
              </div>
            </Link>
          ))}

          <Link to="/articles" className="home-archive-card">
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Archive</p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight text-neutral-900">
              Browse the full article library.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">
              Essays on interface clarity, system behavior, motion, and product
              communication.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-600">
              Open archive
              <ArrowUpRight className="size-3" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
