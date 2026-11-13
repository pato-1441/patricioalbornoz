// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import { PortfolioNavigation } from './portfolio-tabs'
import { LocaleProvider } from '@/context/locale-context'

const router = vi.hoisted(() => ({
  location: { pathname: '/en', hash: '' },
  navigate: vi.fn(),
}))
vi.mock('@tanstack/react-router', () => ({
  useLocation: () => router.location,
  useNavigate: () => router.navigate,
  Link: () => null,
}))
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

test('navigation keeps article routes selected and wraps keyboard focus', () => {
  for (const pathname of ['/en/articles', '/en/articles/introducing-tambo']) {
    router.location = { pathname, hash: '' }
    const { unmount } = render(
      <LocaleProvider locale="en">
        <PortfolioNavigation />
      </LocaleProvider>,
    )
    expect(
      screen
        .getByRole('tab', { name: 'Writing' })
        .getAttribute('aria-selected'),
    ).toBe('true')
    unmount()
  }
  router.location = { pathname: '/en', hash: 'work' }
  render(
    <LocaleProvider locale="en">
      <PortfolioNavigation />
    </LocaleProvider>,
  )
  fireEvent.keyDown(screen.getByRole('tab', { name: 'Work' }), {
    key: 'ArrowLeft',
  })
  expect(document.activeElement).toBe(
    screen.getByRole('tab', { name: 'About me' }),
  )
  expect(router.navigate).toHaveBeenCalledWith(
    expect.objectContaining({ hash: 'about', params: { locale: 'en' } }),
  )
})
