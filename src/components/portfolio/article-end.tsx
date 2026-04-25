import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { ArticleShare } from '@/components/portfolio/article-share'
import { copy } from '@/data/i18n'
import type { Article } from '@/data/articles'
import type { Locale } from '@/lib/locale'

type ArticleEndNoteProps = {
  locale: Locale
  currentSlug: string
  title: string
  coverImage?: string
  ogImage?: string
  nextArticle?: Article | null
}

export function ArticleEndNote({
  locale,
  currentSlug,
  title,
  coverImage,
  ogImage,
  nextArticle,
}: ArticleEndNoteProps) {
  const t = copy[locale]

  return (
    <footer className="end-reading-note" aria-label={t.articleContent.endOfArticle}>
      <div className="end-reading-emoji-pill" aria-hidden>
        <span className="end-reading-emoji">🎉</span>
        <span className="end-reading-emoji end-reading-emoji--delay">✨</span>
      </div>
      <p className="end-reading-copy">{t.articleContent.thanks}</p>
      <div className="end-reading-actions">
        {nextArticle ? (
          <Link
            to="/$locale/articles/$slug"
            params={{ locale, slug: nextArticle.slug }}
            className="end-reading-next"
            aria-label={`${t.articleContent.readNext}: ${nextArticle.title}`}
          >
            <span className="end-reading-next-kicker">{t.articleContent.readNext}</span>
            <span className="end-reading-next-title">{nextArticle.title}</span>
            <ArrowRight
              className="end-reading-next-chevron"
              strokeWidth={2}
              aria-hidden
            />
          </Link>
        ) : null}
        <div className="end-reading-share">
          <ArticleShare
            locale={locale}
            slug={currentSlug}
            title={title}
            coverImage={coverImage}
            ogImage={ogImage}
          />
        </div>
      </div>
    </footer>
  )
}
