import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/portfolio/section-header'
import { useLocale } from '@/context/locale-context'
import { getHomeFeaturedArticles } from '@/data/articles'
import { formatArticleDate, formatReadTime } from '@/lib/locale'

export function HomeSection() {
  const { locale, t } = useLocale()
  const [leadArticle, ...supportingArticles] = getHomeFeaturedArticles(locale)

  return (
    <section id="home" className="xp-section">
      <SectionHeader title={t.home.title} rightContent={<p>{t.home.featuredLabel}</p>} />

      <div className="xp-home-grid">
        <Link to="/$locale/articles/$slug" params={{ locale, slug: leadArticle.slug }} className="window xp-feature-link">
          <div className="title-bar">
            <div className="title-bar-text">{leadArticle.pinned ? t.home.pinnedArticle : t.home.latestArticle}</div>
          </div>

          <div className="window-body xp-card-body">
            <div className="article-media article-media-large">
              {leadArticle.coverImage ? (
                <img
                  src={leadArticle.coverImage}
                  alt={leadArticle.coverAlt ?? leadArticle.title}
                  className="article-media-image"
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <div className="article-media-placeholder">{t.home.featuredFallback}</div>
              )}
            </div>

            <h3 className="xp-card-title xp-card-title-large">{leadArticle.title}</h3>
            <p className="xp-card-description">{leadArticle.excerpt}</p>
            <div className="article-meta-line">
              <span>{formatArticleDate(leadArticle.publishedAt, locale)}</span>
              <span>{formatReadTime(leadArticle.readTimeMinutes, locale)}</span>
            </div>
            <span className="xp-inline-action">
              {t.home.readArticle}
              <ArrowUpRight size={13} />
            </span>
          </div>
        </Link>

        <div className="home-feature-stack">
          {supportingArticles.map((article) => (
            <Link
              key={article.slug}
              to="/$locale/articles/$slug"
              params={{ locale, slug: article.slug }}
              className="window xp-mini-link"
            >
              <div className="title-bar">
                <div className="title-bar-text">{article.pinned ? t.home.pinned : t.home.recent}</div>
              </div>

              <div className="window-body xp-card-body xp-card-body-compact">
                {article.coverImage ? (
                  <div className="article-media article-media-small">
                    <img
                      src={article.coverImage}
                      alt={article.coverAlt ?? article.title}
                      className="article-media-image"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : null}

                <h3 className="xp-card-title">{article.title}</h3>
                <p className="xp-card-description">{article.excerpt}</p>
                <div className="article-meta-line">
                  <span>{formatArticleDate(article.publishedAt, locale)}</span>
                </div>
              </div>
            </Link>
          ))}

          <Link to="/$locale/articles" params={{ locale }} className="window archive-window">
            <div className="title-bar">
              <div className="title-bar-text">{t.home.archiveLabel}</div>
            </div>
            <div className="window-body xp-card-body xp-card-body-compact">
              <h3 className="xp-card-title">{t.home.archiveTitle}</h3>
              <p className="xp-card-description">{t.home.archiveDescription}</p>
              <span className="xp-inline-action">
                {t.home.openArchive}
                <ArrowUpRight size={13} />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
