import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { legalPageComponentMappings } from '../i18n-legal-components'

describe('legalPageComponentMappings', () => {
  describe('addressBlock', () => {
    it('renders address with whitespace preserved', () => {
      const { container } = render(
        legalPageComponentMappings.addressBlock('Line 1\nLine 2\nLine 3')
      )
      const element = container.querySelector('.whitespace-pre-line')
      expect(element).toBeDefined()
      expect(element?.textContent).toBe('Line 1\nLine 2\nLine 3')
    })
  })

  describe('contactBlock', () => {
    it('renders contact information', () => {
      const { container } = render(
        legalPageComponentMappings.contactBlock('Contact Info')
      )
      expect(container.textContent).toBe('Contact Info')
    })
  })

  describe('emailLink', () => {
    it('renders mailto link', () => {
      const { container } = render(
        legalPageComponentMappings.emailLink('test@example.com')
      )
      const link = container.querySelector('a')
      expect(link?.getAttribute('href')).toBe('mailto:test@example.com')
      expect(link?.textContent).toBe('test@example.com')
    })

    it('has correct styling classes', () => {
      const { container } = render(
        legalPageComponentMappings.emailLink('test@example.com')
      )
      const link = container.querySelector('a')
      expect(link?.className).toContain('text-primary')
      expect(link?.className).toContain('hover:underline')
    })
  })

  describe('heading', () => {
    it('renders heading with h2', () => {
      const { container } = render(
        legalPageComponentMappings.heading('Test Heading')
      )
      const heading = container.querySelector('h2')
      expect(heading).toBeDefined()
      expect(heading?.textContent).toBe('Test Heading')
    })
  })

  describe('link', () => {
    it('renders external link with correct attributes', () => {
      const { container } = render(
        legalPageComponentMappings.link('https://example.com')
      )
      const link = container.querySelector('a')
      expect(link?.getAttribute('href')).toBe('https://example.com')
      expect(link?.getAttribute('rel')).toBe('noopener noreferrer')
      expect(link?.getAttribute('target')).toBe('_blank')
      expect(link?.textContent).toBe('https://example.com')
    })
  })

  describe('list', () => {
    it('renders unordered list with correct classes', () => {
      const { container } = render(
        legalPageComponentMappings.list(<li>Item</li>)
      )
      const list = container.querySelector('ul')
      expect(list).toBeDefined()
      expect(list?.className).toContain('list-disc')
      expect(list?.className).toContain('pl-5')
    })
  })

  describe('listItem', () => {
    it('renders list item with correct classes', () => {
      const { container } = render(
        legalPageComponentMappings.listItem('Item content')
      )
      const item = container.querySelector('li')
      expect(item).toBeDefined()
      expect(item?.textContent).toBe('Item content')
      expect(item?.className).toContain('pl-1')
    })
  })

  describe('section', () => {
    it('renders section wrapper', () => {
      const { container } = render(
        legalPageComponentMappings.section('Section content')
      )
      expect(container.querySelector('div')).toBeDefined()
      expect(container.textContent).toBe('Section content')
    })
  })

  describe('text', () => {
    it('renders text paragraph', () => {
      const { container } = render(
        legalPageComponentMappings.text('Paragraph text')
      )
      const paragraph = container.querySelector('p')
      expect(paragraph).toBeDefined()
      expect(paragraph?.textContent).toBe('Paragraph text')
      expect(paragraph?.className).toContain('text-sm')
      expect(paragraph?.className).toContain('text-muted-foreground')
    })
  })
})
