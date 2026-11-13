// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import { PortfolioCursor } from './portfolio-cursor'

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

function mockPointer(matches: boolean) {
  vi.stubGlobal('matchMedia', () => ({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }))
}

function move(target: Element, pointerType = 'mouse') {
  fireEvent(
    target,
    Object.assign(new Event('pointermove', { bubbles: true }), {
      pointerType,
      clientX: 120,
      clientY: 240,
    }),
  )
}

test('cursor follows the mouse, labels actions, and restores native controls and keyboard use', () => {
  mockPointer(true)
  const { unmount } = render(
    <>
      <PortfolioCursor />
      <button data-cursor-label="View">Project</button>
      <input aria-label="Name" />
    </>,
  )
  const cursor = document.querySelector<HTMLElement>('.portfolio-cursor')!
  const button = screen.getByRole('button')
  expect(cursor.hidden).toBe(true)
  move(button)
  expect(cursor.hidden).toBe(false)
  expect(cursor.textContent).toBe('View')
  expect(cursor.style.transform).toBe('translate3d(120px, 240px, 0)')
  expect(
    document.documentElement.classList.contains('custom-cursor-active'),
  ).toBe(true)
  move(screen.getByRole('textbox'))
  expect(cursor.hidden).toBe(true)
  expect(
    document.documentElement.classList.contains('custom-cursor-active'),
  ).toBe(false)
  move(button)
  fireEvent.keyDown(document, { key: 'Tab' })
  expect(cursor.hidden).toBe(true)
  move(button)
  fireEvent.blur(window)
  expect(cursor.hidden).toBe(true)
  move(button)
  unmount()
  expect(
    document.documentElement.classList.contains('custom-cursor-active'),
  ).toBe(false)
})

test('touch and coarse pointers keep the native cursor', () => {
  mockPointer(false)
  render(<PortfolioCursor />)
  const cursor = document.querySelector<HTMLElement>('.portfolio-cursor')!
  move(document.body)
  expect(cursor.hidden).toBe(true)
  cleanup()
  mockPointer(true)
  render(<PortfolioCursor />)
  move(document.body, 'touch')
  expect(
    document.documentElement.classList.contains('custom-cursor-active'),
  ).toBe(false)
})
