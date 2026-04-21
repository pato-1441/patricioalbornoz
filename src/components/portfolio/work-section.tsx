import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { SectionHeader } from '@/components/portfolio/section-header'
import { useLocale } from '@/context/locale-context'
import { workShowcase } from '@/data/work'

export function WorkSection() {
  const { t } = useLocale()
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
    <section id="work" className="xp-section">
      <SectionHeader title={t.work.title} />

      <div className="showcase-grid">
        {workShowcase.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="window showcase-tile"
            style={{ backgroundColor: item.bgColor }}
            aria-label={t.work.openItem(item.title)}
          >
            <div className="title-bar">
              <div className="title-bar-text">{item.title}</div>
            </div>
            <div className="window-body showcase-media-shell">
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
                <img src={item.src} alt={item.title} loading="lazy" className="showcase-media" />
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
              aria-label={t.work.previewItem(activeItem.title)}
              onClick={() => setActiveIndex(null)}
            >
              <div className="window showcase-lightbox-frame" onClick={(event) => event.stopPropagation()}>
                <div className="title-bar">
                  <div className="title-bar-text">{activeItem.title}</div>
                  <div className="title-bar-controls">
                    <button
                      type="button"
                      aria-label="Close"
                      onClick={() => setActiveIndex(null)}
                    />
                  </div>
                </div>

                <div className="window-body">
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
                    <img src={activeItem.src} alt={activeItem.title} className="showcase-lightbox-media" />
                  )}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  )
}
