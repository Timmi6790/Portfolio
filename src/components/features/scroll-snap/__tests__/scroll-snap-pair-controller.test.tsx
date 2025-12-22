import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { ScrollSnapPairController } from '../scroll-snap-pair-controller'

// Mock window.scrollTo
const scrollToMock = vi.fn()
Object.defineProperty(window, 'scrollTo', {
  value: scrollToMock,
  writable: true,
})

// Helper to mock getBoundingClientRect for an element
function mockRect(element: HTMLElement, rect: Partial<DOMRect>) {
  vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 100,
    height: 100,
    x: 0,
    y: 0,
    toJSON: () => {},
    ...rect,
  } as DOMRect)
}

describe('ScrollSnapPairController', () => {
  let topElement: HTMLElement
  let bottomElement: HTMLElement

  beforeEach(() => {
    // Reset mocks
    scrollToMock.mockClear()
    vi.restoreAllMocks()

    // Setup DOM elements
    document.body.innerHTML = `
      <div id="hero"></div>
      <div id="main"></div>
    `
    topElement = document.getElementById('hero')!
    bottomElement = document.getElementById('main')!
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('does not snap if deltaY is below minDelta', () => {
    render(
      <ScrollSnapPairController
        topSectionId="hero"
        bottomSectionId="main"
        options={{ minDelta: 10 }}
      />
    )

    // Simulate small scroll
    const event = new WheelEvent('wheel', { deltaY: 5, bubbles: true })
    window.dispatchEvent(event)

    expect(scrollToMock).not.toHaveBeenCalled()
  })

  it('snaps down when scrolling down and top section is in view', () => {
    render(
      <ScrollSnapPairController
        topSectionId="hero"
        bottomSectionId="main"
        options={{ topZone: 50 }}
      />
    )

    // Setup geometry: Top element is at 0 (in view), Bottom is below
    mockRect(topElement, { top: 0, bottom: 800 })
    mockRect(bottomElement, { top: 800, bottom: 1600 })

    // Mock window.scrollY
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(0)

    // Simulate scroll down
    const event = new WheelEvent('wheel', {
      deltaY: 20,
      bubbles: true,
      cancelable: true,
    })
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault')
    window.dispatchEvent(event)

    expect(preventDefaultSpy).toHaveBeenCalled()
    // Should scroll to bottom element's top position (0 + 800 = 800)
    expect(scrollToMock).toHaveBeenCalledWith({ behavior: 'smooth', top: 800 })
  })

  it('snaps up when scrolling up and bottom section is in view', () => {
    render(
      <ScrollSnapPairController
        topSectionId="hero"
        bottomSectionId="main"
        options={{ topZone: 50 }}
      />
    )

    // Setup geometry: Bottom element is at 0 (in view), Top is above
    mockRect(topElement, { top: -800, bottom: 0 })
    mockRect(bottomElement, { top: 0, bottom: 800 })

    // Mock window.scrollY
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(800)

    // Simulate scroll up
    const event = new WheelEvent('wheel', {
      deltaY: -20,
      bubbles: true,
      cancelable: true,
    })
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault')
    window.dispatchEvent(event)

    expect(preventDefaultSpy).toHaveBeenCalled()
    // Should scroll to top element's top position (800 + (-800) = 0)
    expect(scrollToMock).toHaveBeenCalledWith({ behavior: 'smooth', top: 0 })
  })

  it('does not snap down if top section is not in top zone', () => {
    render(
      <ScrollSnapPairController
        topSectionId="hero"
        bottomSectionId="main"
        options={{ topZone: 50 }}
      />
    )

    // Setup geometry: Top element is scrolled out of view (-100)
    mockRect(topElement, { top: -100 })
    mockRect(bottomElement, { top: 700 })

    const event = new WheelEvent('wheel', { deltaY: 20, bubbles: true })
    window.dispatchEvent(event)

    expect(scrollToMock).not.toHaveBeenCalled()
  })

  it('does not snap up if bottom section is not in top zone', () => {
    render(
      <ScrollSnapPairController
        topSectionId="hero"
        bottomSectionId="main"
        options={{ topZone: 50 }}
      />
    )

    // Setup geometry: Bottom element is scrolled down (100)
    mockRect(topElement, { top: -700 })
    mockRect(bottomElement, { top: 100 })

    const event = new WheelEvent('wheel', { deltaY: -20, bubbles: true })
    window.dispatchEvent(event)

    expect(scrollToMock).not.toHaveBeenCalled()
  })

  it('does not snap if document body is scroll locked (dialog open)', () => {
    render(
      <ScrollSnapPairController
        topSectionId="hero"
        bottomSectionId="main"
        options={{ topZone: 50 }}
      />
    )

    // Setup geometry: Top element is at 0 (in view), Bottom is below
    mockRect(topElement, { top: 0, bottom: 800 })
    mockRect(bottomElement, { top: 800, bottom: 1600 })

    // Simulate locked body
    document.body.style.overflow = 'hidden'

    // Simulate scroll down
    const event = new WheelEvent('wheel', {
      deltaY: 20,
      bubbles: true,
      cancelable: true,
    })
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault')
    window.dispatchEvent(event)

    expect(preventDefaultSpy).not.toHaveBeenCalled()
    expect(scrollToMock).not.toHaveBeenCalled()
  })

  it('removes event listener on unmount', () => {
    const { unmount } = render(
      <ScrollSnapPairController topSectionId="hero" bottomSectionId="main" />
    )

    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'wheel',
      expect.any(Function)
    )
  })
})
