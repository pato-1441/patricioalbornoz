import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Instagram, Link2, Linkedin, Share2, X } from 'lucide-react'
import type { Locale } from '@/lib/locale'
import { copy } from '@/data/i18n'
import { buildAbsoluteUrl, siteAuthorAvatar, siteAuthorName } from '@/lib/site'

type ArticleShareProps = {
  locale: Locale
  slug: string
  title: string
  coverImage?: string
  ogImage?: string
  variant?: 'dialog' | 'sidebar'
}

type CopySource = 'link' | 'instagram' | null

// Keep this breakpoint in sync with the article layout in styles.css.
const sidebarQuery = '(min-width: 1480px)'

export function ArticleShare({
  locale,
  slug,
  title,
  coverImage,
  ogImage,
  variant = 'dialog',
}: ArticleShareProps) {
  const t = copy[locale].articleShare
  const [isDesktop, setIsDesktop] = useState(false)
  const [open, setOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [copyFrom, setCopyFrom] = useState<CopySource>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const titleId = useId()
  const shareUrl = buildAbsoluteUrl(`/${locale}/articles/${slug}`)
  const previewImage = coverImage ?? ogImage ?? null
  const modalOpen = open && !isDesktop && variant === 'dialog'

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  const xUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`

  useEffect(() => {
    const media = window.matchMedia(sidebarQuery)
    const update = () => {
      setIsDesktop(media.matches)
      setOpen(false)
    }
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!modalOpen) return
    const dialog = dialogRef.current
    if (!dialog) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      openButtonRef.current?.focus({ preventScroll: true })
    }
  }, [modalOpen])

  useEffect(() => () => clearTimeout(copyTimer.current), [])

  const copyLink = async (source: Exclude<CopySource, null>) => {
    clearTimeout(copyTimer.current)
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopyFrom(source)
      setFeedback(t.linkCopied)
      copyTimer.current = setTimeout(() => setCopyFrom(null), 2000)
    } catch {
      setCopyFrom(null)
      setFeedback(t.copyError)
    }
  }

  const handleInstagram = async () => {
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, text: title, url: shareUrl })
        setFeedback(t.thanksMessage)
        return
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return
      }
    }
    await copyLink('instagram')
  }

  if (variant === 'sidebar' ? !isDesktop : isDesktop) return null

  const content = (
    <div className="article-share-card">
      <div className="article-share-header">
        <h2 id={titleId} className="article-share-title">
          {t.title}
        </h2>
        {variant === 'dialog' && (
          <button
            type="button"
            className="article-share-close"
            onClick={() => setOpen(false)}
            aria-label={t.close}
            autoFocus
          >
            <X size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="article-share-preview">
        <div className="article-share-preview-media">
          {previewImage ? (
            <img
              src={previewImage}
              alt=""
              className="article-share-preview-img"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="article-share-preview-fallback" aria-hidden="true">
              <span className="article-share-preview-fallback-letter">
                {title.slice(0, 1).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <div className="article-share-preview-bar">
          <img
            src={siteAuthorAvatar}
            alt=""
            width={36}
            height={36}
            className="article-share-preview-avatar"
          />
          <div className="article-share-preview-text">
            <p className="article-share-preview-name">{siteAuthorName}</p>
            <p className="article-share-preview-headline">{title}</p>
          </div>
        </div>
      </div>

      <ul className="article-share-actions">
        <li>
          <button
            type="button"
            className="article-share-tile"
            onClick={() => void copyLink('link')}
            aria-label={t.ariaCopyLink}
          >
            <span className="article-share-tile-icon" aria-hidden="true">
              <Link2 strokeWidth={1.75} />
            </span>
            <span className="article-share-tile-label">
              {copyFrom === 'link' ? t.copied : t.copyLink}
            </span>
          </button>
        </li>
        <li>
          <a
            className="article-share-tile"
            href={xUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.ariaShareX}
          >
            <span className="article-share-tile-icon" aria-hidden="true">
              <span className="article-share-tile-x">𝕏</span>
            </span>
            <span className="article-share-tile-label">{t.x}</span>
          </a>
        </li>
        <li>
          <button
            type="button"
            className="article-share-tile"
            onClick={() => void handleInstagram()}
            aria-label={t.ariaShareInstagram}
          >
            <span className="article-share-tile-icon" aria-hidden="true">
              <Instagram strokeWidth={1.6} />
            </span>
            <span className="article-share-tile-label">
              {copyFrom === 'instagram' ? t.copied : t.instagram}
            </span>
          </button>
        </li>
        <li>
          <a
            className="article-share-tile"
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.ariaShareLinkedin}
          >
            <span className="article-share-tile-icon" aria-hidden="true">
              <Linkedin strokeWidth={1.75} />
            </span>
            <span className="article-share-tile-label">{t.linkedin}</span>
          </a>
        </li>
      </ul>
      <p className="article-share-feedback" role="status" aria-live="polite">
        {feedback}
      </p>
    </div>
  )

  if (variant === 'sidebar') {
    return (
      <aside className="article-share-sidebar" aria-labelledby={titleId}>
        {content}
      </aside>
    )
  }

  return (
    <>
      <button
        ref={openButtonRef}
        type="button"
        className="article-share-open"
        onClick={() => {
          setCopyFrom(null)
          setFeedback('')
          setOpen(true)
        }}
        aria-haspopup="dialog"
        aria-expanded={modalOpen}
      >
        <Share2 className="size-3.5" strokeWidth={1.9} aria-hidden="true" />
        {t.openButton}
      </button>
      {modalOpen &&
        createPortal(
          <dialog
            ref={dialogRef}
            className="article-share-dialog"
            aria-labelledby={titleId}
            onCancel={() => setOpen(false)}
            onClose={() => setOpen(false)}
            onClick={(event) => {
              if (event.target === event.currentTarget) setOpen(false)
            }}
          >
            {content}
          </dialog>,
          document.body,
        )}
    </>
  )
}
