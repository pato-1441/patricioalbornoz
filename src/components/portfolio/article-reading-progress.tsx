import { useEffect, useState } from 'react'

function getScrollProgress(): number {
  const scrollTop = window.scrollY
  const scrollable = document.documentElement.scrollHeight - document.documentElement.clientHeight
  if (scrollable <= 0) {
    return 1
  }
  return Math.min(1, Math.max(0, scrollTop / scrollable))
}

type ArticleReadingProgressProps = {
  label: string
}

export function ArticleReadingProgress({ label }: ArticleReadingProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      setProgress(getScrollProgress())
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const pct = Math.round(progress * 100)

  return (
    <div
      className="article-reading-progress"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
    >
      <div className="article-reading-progress-bar" style={{ transform: `scaleX(${progress})` }} />
    </div>
  )
}
