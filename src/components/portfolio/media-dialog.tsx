import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { WorkShowcaseItem } from '@/data/work'
import { useLocale } from '@/context/locale-context'

export function MediaDialog({
  item,
  onClose,
}: {
  item: WorkShowcaseItem
  onClose: () => void
}) {
  const { t } = useLocale()
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const element = dialog.current!
    const previousOverflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      element.close()
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <dialog
      ref={dialog}
      className="media-dialog"
      aria-label={t.work.previewItem(item.title)}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close()
      }}
    >
      <div className="media-dialog-content">
        <div className="media-dialog-heading">
          <p>{item.title}</p>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label={t.work.closePreview}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        {item.type === 'video' ? (
          <video
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="media-dialog-media"
            aria-label={item.title}
          />
        ) : (
          <img src={item.src} alt={item.title} className="media-dialog-media" />
        )}
      </div>
    </dialog>
  )
}
