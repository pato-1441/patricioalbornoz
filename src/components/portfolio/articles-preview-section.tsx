import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { ArticleCard } from '@/components/portfolio/article-card'
import { SectionHeader } from '@/components/portfolio/section-header'
import { useLocale } from '@/context/locale-context'
import { getArticlePreviewArticles } from '@/data/articles'

export function ArticlesPreviewSection() {
  const { locale, t } = useLocale()
  const articlePreviewArticles = getArticlePreviewArticles(locale)

  return (
    <section id="articles" className="scroll-mt-24 space-y-7">
      <SectionHeader
        title={t.articles.title}
        rightContent={
          <Link
            to="/$locale/articles"
            params={{ locale }}
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900"
          >
            {t.articles.openArchive}
            <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        }
      />

      <div className="article-list">
        {articlePreviewArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      <div className="articles-soon-note">
        <p className="articles-soon-label">{t.home.archiveLabel}</p>
        <h3 className="articles-soon-title">{t.articles.comingSoonTitle}</h3>
        <p className="articles-soon-description">{t.articles.comingSoonDescription}</p>
      </div>
    </section>
  )
}
