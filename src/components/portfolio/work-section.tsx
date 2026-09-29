import { useState } from 'react'
import { MediaDialog } from '@/components/portfolio/media-dialog'
import { useLocale } from '@/context/locale-context'
import { workShowcase } from '@/data/work'

export function WorkSection() {
  const { t } = useLocale()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activeItem = activeIndex === null ? null : workShowcase[activeIndex]

  return (
    <section id="work" className="scroll-mt-24 space-y-7">
      <div className="showcase-grid">
        {workShowcase.map((item, index) => (
          <figure
            key={item.src}
            className={item.featured ? 'showcase-featured' : undefined}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="showcase-tile group block overflow-hidden"
              aria-label={t.work.openItem(item.title)}
            >
              <div
                className="showcase-media-shell"
                style={{ background: item.bgColor }}
              >
                {item.type === 'video' ? (
                  <video
                    src={item.src}
                    poster={item.poster}
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
          </figure>
        ))}
      </div>

      {activeItem && (
        <MediaDialog item={activeItem} onClose={() => setActiveIndex(null)} />
      )}
    </section>
  )
}
