import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export function PortfolioCursor() {
  const cursor = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = cursor.current!
    const label = element.querySelector('span')!
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const root = document.documentElement
    let x = 0
    let y = 0

    const hide = () => {
      root.classList.remove('custom-cursor-active')
      element.hidden = true
      element.dataset.pressed = 'false'
    }
    const updateTarget = (target: Element | null) => {
      if (
        !pointer.matches ||
        !target ||
        target.closest(
          'input, textarea, select, [contenteditable]:not([contenteditable="false"]), video[controls], iframe',
        )
      ) {
        hide()
        return
      }
      const action = target.closest('a, button, [role="button"], [role="tab"]')
      const text = action?.getAttribute('data-cursor-label') ?? ''
      if (label.textContent !== text) label.textContent = text
      element.dataset.interactive = String(Boolean(action))
      // Flip the label near the right edge so it stays inside the viewport.
      element.dataset.flip = String(x > window.innerWidth - 160)
      element.hidden = false
      root.classList.add('custom-cursor-active')
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') {
        hide()
        return
      }
      x = event.clientX
      y = event.clientY
      element.style.transform = `translate3d(${x}px, ${y}px, 0)`
      updateTarget(event.target instanceof Element ? event.target : null)
    }
    const down = () => {
      element.dataset.pressed = 'true'
    }
    const up = () => {
      element.dataset.pressed = 'false'
    }
    const scroll = () => {
      if (!element.hidden) updateTarget(document.elementFromPoint(x, y))
    }
    document.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerdown', down)
    document.addEventListener('pointerup', up)
    document.documentElement.addEventListener('pointerleave', hide)
    document.addEventListener('keydown', hide)
    document.addEventListener('visibilitychange', hide)
    window.addEventListener('blur', hide)
    window.addEventListener('scroll', scroll, true)
    pointer.addEventListener('change', hide)
    return () => {
      hide()
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerdown', down)
      document.removeEventListener('pointerup', up)
      document.documentElement.removeEventListener('pointerleave', hide)
      document.removeEventListener('keydown', hide)
      document.removeEventListener('visibilitychange', hide)
      window.removeEventListener('blur', hide)
      window.removeEventListener('scroll', scroll, true)
      pointer.removeEventListener('change', hide)
    }
  }, [])

  return createPortal(
    <div ref={cursor} className="portfolio-cursor" aria-hidden="true" hidden>
      <i />
      <span />
    </div>,
    document.body,
  )
}
