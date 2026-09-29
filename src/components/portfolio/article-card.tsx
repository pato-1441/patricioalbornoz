import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Pause, Play } from 'lucide-react'
import type { Article } from '@/data/articles'
import { useLocale } from '@/context/locale-context'
import { formatArticleDate, formatReadTime } from '@/lib/locale'

export function ArticleCard({ article }: { article: Article }) {
  const { locale } = useLocale()
  const preview = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = preview.current
    if (!video) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePlayback = () => {
      if (reducedMotion.matches) video.pause()
      else void video.play().catch(() => {})
    }
    updatePlayback()
    reducedMotion.addEventListener('change', updatePlayback)
    return () => reducedMotion.removeEventListener('change', updatePlayback)
  }, [article.coverPreviewVideo])

  return (
    <div className="relative">
      <Link
        to="/$locale/articles/$slug"
        params={{ locale, slug: article.slug }}
        className="writing-card h-full"
      >
        {(article.coverImage || article.coverPreviewVideo) && (
          <div className="collection-cover">
            {article.coverPreviewVideo ? (
              <video
                ref={preview}
                src={article.coverPreviewVideo}
                poster={article.coverImage}
                muted
                loop
                playsInline
                preload="none"
                aria-hidden="true"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              />
            ) : (
              <img
                src={article.coverImage}
                alt={article.coverAlt ?? article.title}
                loading="lazy"
                decoding="async"
              />
            )}
          </div>
        )}
        <div className="collection-copy">
          <p className="collection-meta">
            <time dateTime={article.publishedAt}>
              {formatArticleDate(article.publishedAt, locale)}
            </time>
            <span aria-hidden="true">·</span>
            <span>{formatReadTime(article.readTimeMinutes, locale)}</span>
          </p>
          <h2>{article.title}</h2>
          <p className="collection-description">{article.excerpt}</p>
          <span className="collection-action">
            {locale === 'es' ? 'Leer historia' : 'Read story'}{' '}
            <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </div>
      </Link>
      {article.coverPreviewVideo && (
        <button
          type="button"
          className="absolute top-3 right-3 grid size-8 cursor-pointer place-items-center rounded-full border border-(--line) bg-(--paper) text-(--text)"
          aria-label={
            playing
              ? locale === 'es'
                ? 'Pausar vista previa'
                : 'Pause preview'
              : locale === 'es'
                ? 'Reproducir vista previa'
                : 'Play preview'
          }
          onClick={() => {
            if (preview.current?.paused) {
              void preview.current.play().catch(() => {})
            } else {
              preview.current?.pause()
            }
          }}
        >
          {playing ? (
            <Pause size={14} aria-hidden="true" />
          ) : (
            <Play size={14} aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  )
}
