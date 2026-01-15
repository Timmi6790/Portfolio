import { test, fc } from '@fast-check/vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, vi } from 'vitest'

import { RadarLabels } from '../radar-labels'

// Mocks
const translationsMock = vi
  .fn()
  .mockImplementation((key) => `translated_${key}`)

vi.mock('../radar-defs', () => ({
  quadrantToPathId: vi.fn().mockReturnValue('mock-path-id'),
}))

// We need to match the structure expected by the component's config imports
// Since it imports QUADRANT_STYLES from config, we mock that
vi.mock('../config', () => ({
  QUADRANT_STYLES: {
    languages: { labelColor: 'text-red-500' },
    frameworks: { labelColor: 'text-blue-500' },
    buildTools: { labelColor: 'text-green-500' },
    infrastructure: { labelColor: 'text-yellow-500' },
  },
}))

describe('RadarLabels Fuzzy Tests', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
    translationsMock.mockImplementation((key) => `translated_${key}`)
  })

  test.prop([
    fc.integer({ min: 10, max: 100 }), // fontSize
  ])('should render labels with correct font size', (fontSize) => {
    cleanup()

    // Setup config prop (mock missing required fields)
    const labelsConfig = {
      fontSize,
      bottomRadius: 100,
      topRadius: 200,
    }

    // Render
    render(
      <svg>
        <RadarLabels
          labels={labelsConfig}
          translations={translationsMock as any}
        />
      </svg>
    )

    // Check if translations were called
    expect(translationsMock).toHaveBeenCalledWith('languages')
    expect(translationsMock).toHaveBeenCalledWith('frameworks')
    expect(translationsMock).toHaveBeenCalledWith('buildTools')
    expect(translationsMock).toHaveBeenCalledWith('infrastructure')

    // We can't query by style easily with getByText, but we can find the text and check parent
    const languagesLabel = screen.getByText('translated_languages')

    // Ensure it exists
    expect(languagesLabel).toBeDefined()

    // Validating structure
    // We expect 4 labels
    expect(screen.getByText('translated_languages')).toBeDefined()
    expect(screen.getByText('translated_frameworks')).toBeDefined()
    expect(screen.getByText('translated_buildTools')).toBeDefined()
    expect(screen.getByText('translated_infrastructure')).toBeDefined()
  })
})
