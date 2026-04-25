import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Instagram, Link2, Linkedin, Share2, X } from 'lucide-react'
import type { Locale } from '@/lib/locale'
import { copy } from '@/data/i18n'
import { buildAbsoluteUrl, siteAuthorName } from '@/lib/site'

const AUTHOR_AVATAR = '/patoalbornoz.jpg'

type ArticleShareProps = {
  locale: Locale
  slug: string
  title: string
  coverImage?: string
  ogImage?: string
}

type CopySource = 'link' | 'instagram' | null

export function ArticleShare({ locale, slug, title, coverImage, ogImage }: ArticleShareProps) {
  const t = copy[locale].articleShare
  const [open, setOpen] = useState(false)
  const [copyFrom, setCopyFrom] = useState<CopySource>(null)
  const openButtonRef = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)
  const titleId = useId()
  const shareUrl = buildAbsoluteUrl(`/${locale}/articles/${slug}`)
  const previewImage = coverImage ?? ogImage ?? null

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  const xUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`

  useEffect(() => {
    if (!open) {
      return
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    if (open) {
      setCopyFrom(null)
      wasOpen.current = true
    } else if (wasOpen.current) {
      openButtonRef.current?.focus()
      wasOpen.current = false
    }
  }, [open])

  const setCopied = (source: 'link' | 'instagram') => {
    setCopyFrom(source)
    window.setTimeout(() => {
      setCopyFrom((current) => (current === source ? null : current))
    }, 2000)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied('link')
    } catch {
      setCopyFrom(null)
    }
  }

  const handleInstagram = async () => {
    const nativeShare: typeof navigator.share | undefined = navigator.share
    if (typeof nativeShare === 'function') {
      try {
        await nativeShare.call(navigator, { title, text: title, url: shareUrl })
        return
      } catch (e) {
        if (e instanceof Error && e.name === 'AbortError') {
          return
        }
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied('instagram')
    } catch {
      setCopyFrom(null)
    }
  }

  const openExternal = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const panel =
    open && typeof document !== 'undefined'
      ? createPortal(
          <div
            className="article-share-backdrop"
            role="presentation"
            onClick={() => setOpen(false)}
          >
            <div
              className="article-share-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="article-share-header">
                <h2 id={titleId} className="article-share-title">
                  {t.title}
                </h2>
                <button
                  type="button"
                  className="article-share-close"
                  onClick={() => setOpen(false)}
                  aria-label={t.close}
                >
                  <X className="size-5" strokeWidth={1.75} />
                </button>
              </div>

              <div className="article-share-preview">
                <div className="article-share-preview-media">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt=""
                      className="article-share-preview-img"
                      loading="eager"
                      decoding="async"
                    />
                  ) : (
                    <div className="article-share-preview-fallback" aria-hidden>
                      <span className="article-share-preview-fallback-letter">
                        {title.slice(0, 1).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="article-share-preview-bar">
                  <img
                    src={AUTHOR_AVATAR}
                    alt=""
                    width={40}
                    height={40}
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
                    onClick={() => {
                      void handleCopyLink()
                    }}
                    aria-label={t.ariaCopyLink}
                  >
                    <span className="article-share-tile-icon" aria-hidden>
                      <Link2 strokeWidth={1.75} />
                    </span>
                    <span className="article-share-tile-label">
                      {copyFrom === 'link' ? t.copied : t.copyLink}
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="article-share-tile"
                    onClick={() => {
                      openExternal(xUrl)
                    }}
                    aria-label={t.ariaShareX}
                  >
                    <span className="article-share-tile-icon" aria-hidden>
                      <span className="article-share-tile-x">𝕏</span>
                    </span>
                    <span className="article-share-tile-label">{t.x}</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="article-share-tile"
                    onClick={() => {
                      void handleInstagram()
                    }}
                    aria-label={t.ariaShareInstagram}
                  >
                    <span className="article-share-tile-icon" aria-hidden>
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
                    <span className="article-share-tile-icon" aria-hidden>
                      <Linkedin strokeWidth={1.75} />
                    </span>
                    <span className="article-share-tile-label">{t.linkedin}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>,
          document.body,
        )
      : null

  return (
    <>
      <button
        ref={openButtonRef}
        type="button"
        className="article-share-open"
        onClick={() => {
          setOpen(true)
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <Share2 className="size-3.5" strokeWidth={1.9} />
        {t.openButton}
      </button>
      {panel}
    </>
  )
}
