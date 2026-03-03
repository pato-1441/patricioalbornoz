import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { SectionHeader } from '@/components/portfolio/section-header'
import { workShowcase } from '@/data/work'

export function WorkSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activeItem = useMemo(
    () => (activeIndex === null ? null : workShowcase[activeIndex]),
    [activeIndex],
  )

  useEffect(() => {
    if (activeItem === null) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeItem])

  return (
    <section id="work" className="scroll-mt-24 space-y-7">
      <SectionHeader title="Work" />

      <div className="showcase-grid">
        {workShowcase.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`content-card card-stack showcase-tile group block overflow-hidden ${
              index === 0 ? 'showcase-featured' : ''
            }`}
            aria-label={`Open ${item.title}`}
          >
            <div className="showcase-media-shell">
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="showcase-media"
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="showcase-media"
                />
              )}
            </div>
          </button>
        ))}
      </div>

      {activeItem && typeof document !== 'undefined'
        ? createPortal(
            <div
              className="showcase-lightbox"
              role="dialog"
              aria-modal="true"
              aria-label={`${activeItem.title} preview`}
              onClick={() => setActiveIndex(null)}
            >
              <div className="showcase-lightbox-frame" onClick={(event) => event.stopPropagation()}>
                <button
                  type="button"
                  className="showcase-close"
                  onClick={() => setActiveIndex(null)}
                  aria-label="Close media preview"
                >
                  Close
                </button>

                {activeItem.type === 'video' ? (
                  <video
                    src={activeItem.src}
                    controls
                    autoPlay
                    playsInline
                    preload="metadata"
                    className="showcase-lightbox-media"
                  />
                ) : (
                  <img
                    src={activeItem.src}
                    alt={activeItem.title}
                    className="showcase-lightbox-media"
                  />
                )}
              </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  )
}
