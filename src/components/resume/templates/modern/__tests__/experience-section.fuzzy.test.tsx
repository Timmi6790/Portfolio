import { test, fc } from '@fast-check/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, describe, expect, vi } from 'vitest'

import { ExperienceSection } from '../experience-section'

// Mock styles
vi.mock('../modern.styles', () => ({
  styles: {
    sectionTitleFirst: {},
    sectionDivider: {},
    experienceItem: {},
    experienceItemCompact: {},
    jobHeader: {},
    jobHeaderCompact: {},
    jobTitle: {},
    jobTitleCompact: {},
    dateText: {},
    dateTextCompact: {},
    companyRow: {},
    companyText: {},
    companyTextCompact: {},
    achievement: {},
    achievementCompact: {},
  },
}))

// Mock @react-pdf/renderer components
vi.mock('@react-pdf/renderer', () => ({
  Text: ({ children }: any) => JSON.stringify({ type: 'Text', children }),
  View: ({ children }: any) => JSON.stringify({ type: 'View', children }),
  StyleSheet: { create: (s: any) => s },
  Font: { register: () => {} },
}))

// Mock translations and formatting
const mockTranslations = vi.fn((key) => `t(${key})`)
const mockRawTranslations = vi.fn()
;(mockTranslations as any).raw = mockRawTranslations

const mockFormatDate = {
  dateTime: vi.fn((date) => `formatted_${date.toISOString()}`),
  number: vi.fn(),
  relativeTime: vi.fn(),
  list: vi.fn(),
} as any

describe('ExperienceSection Fuzzy Tests', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
    mockTranslations.mockClear()
    mockRawTranslations.mockClear()
  })

  // Define arbitrary for ResumeExperience
  const experienceArbitrary = fc.record({
    company: fc.string(),
    location: fc.string(),
    title: fc.string(),
    start: fc.record({
      month: fc.integer({ min: 1, max: 12 }),
      year: fc.integer({ min: 1900, max: 2100 }),
    }),
    end: fc.oneof(
      fc.constant(null),
      fc.record({
        month: fc.integer({ min: 1, max: 12 }),
        year: fc.integer({ min: 1900, max: 2100 }),
      })
    ),
    achievements: fc.array(fc.string()),
  })

  test.prop([fc.array(experienceArbitrary)])(
    'should execute rendering logic without throwing for any experience data',
    (experiences) => {
      // Setup mock return
      mockRawTranslations.mockReturnValue(experiences)

      // Execute component function directly
      const result = ExperienceSection({
        formatDate: mockFormatDate,
        translations: mockTranslations as any,
      })

      // Assertions for parent component
      expect(mockTranslations).toHaveBeenCalledWith(
        'resume.sectionTitles.experience'
      )
      expect(mockRawTranslations).toHaveBeenCalledWith('resume.experience')
      expect(result).toBeDefined()

      // Helper to recursively "render" the component tree to trigger logic
      const renderChildren = (node: any) => {
        if (!node) return

        // If it's an array, render each item
        if (Array.isArray(node)) {
          node.forEach(renderChildren)
          return
        }

        // If the node type is a function (Functional Component), call it
        // This targets ExperienceItem which is used inside ExperienceSection
        if (node.type && typeof node.type === 'function') {
          try {
            // Call the component with its props to execute its logic
            // Ensure props exist
            const props = node.props || {}
            const childResult = node.type(props)
            // Recursively render its result
            renderChildren(childResult)
          } catch (e) {
            // Rethrow to fail test
            throw e
          }
        }

        // If it has children props, render them
        if (node.props && node.props.children) {
          renderChildren(node.props.children)
        }
      }

      // "Render" the result deeply
      renderChildren(result)

      // If we have experiences, ensure internal logic for dates ran
      if (experiences.length > 0) {
        expect(mockFormatDate.dateTime).toHaveBeenCalled()
      }
    }
  )
})
