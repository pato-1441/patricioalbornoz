// @vitest-environment jsdom
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { ArticleShare } from './article-share'

const article = {
  locale: 'es' as const,
  slug: 'introducing-tambo',
  title: 'Presentando tambo',
  coverImage: '/tambo-landing-hero.jpg',
}
let desktop = false
const listeners = new Set<() => void>()
const writeText = vi.fn()

beforeEach(() => {
  desktop = false
  listeners.clear()
  writeText.mockReset().mockResolvedValue(undefined)
  vi.stubGlobal('matchMedia', () => ({
    get matches() {
      return desktop
    },
    addEventListener: (_event: string, listener: () => void) =>
      listeners.add(listener),
    removeEventListener: (_event: string, listener: () => void) =>
      listeners.delete(listener),
  }))
  vi.stubGlobal('navigator', { clipboard: { writeText } })
  // jsdom does not implement the native dialog methods.
  Object.defineProperties(HTMLDialogElement.prototype, {
    showModal: {
      configurable: true,
      value: function (this: HTMLDialogElement) {
        this.setAttribute('open', '')
      },
    },
    close: {
      configurable: true,
      value: function (this: HTMLDialogElement) {
        this.removeAttribute('open')
      },
    },
  })
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal')
  Reflect.deleteProperty(HTMLDialogElement.prototype, 'close')
  document.body.style.overflow = ''
})

function renderShareControls() {
  return render(
    <>
      <ArticleShare {...article} />
      <ArticleShare {...article} />
      <ArticleShare {...article} variant="sidebar" />
    </>,
  )
}

test('desktop shows one share panel, keeps the page scrollable, and leaves actions available after copying', async () => {
  desktop = true
  renderShareControls()
  expect(screen.queryByRole('button', { name: 'Compartir' })).toBeNull()
  expect(screen.getAllByRole('complementary')).toHaveLength(1)
  expect(screen.queryByRole('dialog')).toBeNull()
  expect(document.body.style.overflow).toBe('')

  fireEvent.click(
    screen.getByRole('button', {
      name: 'Copiar enlace del artículo al portapapeles',
    }),
  )
  await waitFor(() =>
    expect(screen.getByRole('status').textContent).toContain('Enlace copiado'),
  )
  expect(writeText).toHaveBeenCalledWith(
    'https://patricioalbornoz.com/es/articles/introducing-tambo',
  )
  expect(
    screen
      .getByRole('link', { name: 'Compartir en X (Twitter)' })
      .getAttribute('href'),
  ).toContain('introducing-tambo')
  expect(
    screen
      .getByRole('link', { name: 'Compartir en LinkedIn' })
      .getAttribute('href'),
  ).toContain('introducing-tambo')
})

test('mobile opens a modal from either trigger and releases the scroll lock when closed, resized, or unmounted', () => {
  const { unmount } = renderShareControls()
  const triggers = screen.getAllByRole('button', {
    name: 'Compartir',
  })
  expect(triggers).toHaveLength(2)
  expect(screen.queryByRole('complementary')).toBeNull()
  document.body.style.overflow = 'auto'

  fireEvent.click(triggers[1])
  expect(screen.getByRole('dialog').hasAttribute('open')).toBe(true)
  expect(document.body.style.overflow).toBe('hidden')
  fireEvent.click(screen.getByRole('button', { name: 'Cerrar' }))
  expect(screen.queryByRole('dialog')).toBeNull()
  expect(document.body.style.overflow).toBe('auto')
  expect(document.activeElement).toBe(triggers[1])

  fireEvent.click(triggers[0])
  act(() => {
    desktop = true
    listeners.forEach((listener) => listener())
  })
  expect(screen.queryByRole('dialog')).toBeNull()
  expect(screen.getByRole('complementary')).toBeTruthy()
  expect(document.body.style.overflow).toBe('auto')

  act(() => {
    desktop = false
    listeners.forEach((listener) => listener())
  })
  expect(screen.queryByRole('dialog')).toBeNull()
  fireEvent.click(screen.getAllByRole('button', { name: 'Compartir' })[0])
  unmount()
  expect(document.body.style.overflow).toBe('auto')
})

test('copy failures are announced and Instagram falls back to copying when native sharing is unavailable', async () => {
  desktop = true
  writeText.mockRejectedValueOnce(new Error('Permission denied'))
  renderShareControls()
  fireEvent.click(
    screen.getByRole('button', {
      name: 'Copiar enlace del artículo al portapapeles',
    }),
  )
  await waitFor(() =>
    expect(screen.getByRole('status').textContent).toContain(
      'No se pudo copiar',
    ),
  )
  fireEvent.click(
    screen.getByRole('button', {
      name: 'Compartir en Instagram o copiar enlace',
    }),
  )
  await waitFor(() =>
    expect(screen.getByRole('status').textContent).toContain('Enlace copiado'),
  )
  expect(writeText).toHaveBeenCalledTimes(2)
})
