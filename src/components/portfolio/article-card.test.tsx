// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { ArticleCard } from './article-card'
import type { ReactNode } from 'react'
import { LocaleProvider } from '@/context/locale-context'
import { getArticles } from '@/data/articles'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children }: { children: ReactNode }) => (
    <a href="/article">{children}</a>
  ),
}))

test('previews loop silently, can be paused separately from the link, and respect reduced motion', () => {
  const play = vi
    .spyOn(HTMLMediaElement.prototype, 'play')
    .mockImplementation(function (this: HTMLMediaElement) {
      Object.defineProperty(this, 'paused', {
        value: false,
        configurable: true,
      })
      this.dispatchEvent(new Event('play'))
      return Promise.resolve()
    })
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(function (
    this: HTMLMediaElement,
  ) {
    Object.defineProperty(this, 'paused', { value: true, configurable: true })
    this.dispatchEvent(new Event('pause'))
  })
  try {
    for (const reducedMotion of [false, true]) {
      play.mockClear()
      vi.stubGlobal('matchMedia', () => ({
        matches: reducedMotion,
        addEventListener() {},
        removeEventListener() {},
      }))
      const article = getArticles('es').find((item) => item.coverPreviewVideo)!
      const { container } = render(
        <LocaleProvider locale="es">
          <ArticleCard article={article} />
        </LocaleProvider>,
      )
      const video = container.querySelector('video')!
      expect(video.getAttribute('src')).toBe(article.coverPreviewVideo)
      expect(video.getAttribute('poster')).toBe(article.coverImage)
      expect(video.muted && video.loop && video.playsInline).toBe(true)
      expect(play).toHaveBeenCalledTimes(reducedMotion ? 0 : 1)
      if (reducedMotion)
        fireEvent.click(
          screen.getByRole('button', { name: 'Reproducir vista previa' }),
        )
      const pause = screen.getByRole('button', { name: 'Pausar vista previa' })
      expect(pause.closest('a')).toBeNull()
      fireEvent.click(pause)
      expect(video.paused).toBe(true)
      expect(
        screen.getByRole('button', { name: 'Reproducir vista previa' }),
      ).toBeTruthy()
      cleanup()
    }
    const article = getArticles('es').find((item) => !item.coverPreviewVideo)!
    const { container } = render(
      <LocaleProvider locale="es">
        <ArticleCard article={article} />
      </LocaleProvider>,
    )
    expect(container.querySelector('video')).toBeNull()
    expect(container.querySelector('img')?.getAttribute('src')).toBe(
      article.coverImage,
    )
  } finally {
    cleanup()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  }
})
