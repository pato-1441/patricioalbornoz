// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import { StylePreview } from './style-preview'

afterEach(cleanup)

test('invalid style links fall back; each direction can be selected and survives reload', () => {
  window.history.replaceState(null, '', '/style-preview/?style=unknown')
  const { unmount } = render(<StylePreview />)
  expect(
    screen.getByRole('button', { name: 'quiet' }).getAttribute('aria-pressed'),
  ).toBe('true')
  for (const style of ['editorial', 'studio', 'quiet']) {
    fireEvent.click(screen.getByRole('button', { name: style }))
    expect(
      screen.getByRole('button', { name: style }).getAttribute('aria-pressed'),
    ).toBe('true')
    expect(new URLSearchParams(window.location.search).get('style')).toBe(style)
    expect(
      screen
        .getByRole('link', { name: /Autonoma/ })
        .querySelector('img')
        ?.getAttribute('src'),
    ).toBe('/autonoma-logo.png')
  }
  fireEvent.click(screen.getByRole('button', { name: 'studio' }))
  unmount()
  render(<StylePreview />)
  expect(
    screen.getByRole('button', { name: 'studio' }).getAttribute('aria-pressed'),
  ).toBe('true')
})
