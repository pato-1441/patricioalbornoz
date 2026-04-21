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
    <section id="articles" className="xp-section">
      <SectionHeader
        title={t.articles.title}
        rightContent={
          <Link to="/$locale/articles" params={{ locale }} className="section-action-link">
            {t.articles.openArchive}
            <ArrowUpRight size={13} />
          </Link>
        }
      />

      <div className="article-list">
        {articlePreviewArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      <div className="window articles-soon-window">
        <div className="title-bar">
          <div className="title-bar-text">{t.home.archiveLabel}</div>
        </div>
        <div className="window-body">
          <h3 className="articles-soon-title">{t.articles.comingSoonTitle}</h3>
          <p className="articles-soon-description">{t.articles.comingSoonDescription}</p>
        </div>
      </div>
    </section>
  )
}
