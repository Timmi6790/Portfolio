import { test, fc } from '@fast-check/vitest'
import { describe, expect, vi } from 'vitest'

import {
  IconIds,
  createIcon,
  getImageDimension,
  generateIconResponse,
} from '../icon-creator'

// Mock ImageResponse from next/og
vi.mock('next/og', () => ({
  ImageResponse: class {
    constructor(element: any, options: any) {
      ;(this as any).element = element
      ;(this as any).options = options
    }
  },
}))

describe('Icon Creator Fuzzy Tests', () => {
  describe('getImageDimension', () => {
    test.prop([fc.constantFrom(...Object.values(IconIds))])(
      'should return valid positive dimensions for all known IDs',
      (iconId) => {
        const dim = getImageDimension(iconId)
        expect(dim.width).toBeGreaterThan(0)
        expect(dim.height).toBeGreaterThan(0)
        expect(Number.isInteger(dim.width)).toBe(true)
        expect(Number.isInteger(dim.height)).toBe(true)
      }
    )
  })

  describe('createIcon', () => {
    test.prop([fc.constantFrom(...Object.values(IconIds))])(
      'should create correct icon properties',
      (iconId) => {
        const icon = createIcon(iconId)

        expect(icon.id).toBe(iconId)
        expect(icon.contentType).toBe('image/png')

        const expectedDim = getImageDimension(iconId)
        expect(icon.size).toEqual(expectedDim)
      }
    )
  })

  describe('generateIconResponse', () => {
    test.prop([
      fc.base64String(),
      fc.record({
        width: fc.integer({ min: 1, max: 4000 }),
        height: fc.integer({ min: 1, max: 4000 }),
      }),
    ])(
      'should generate valid ImageResponse with correct options',
      (svgContent, size) => {
        const response: any = generateIconResponse(svgContent, size)

        expect(response).toBeDefined()
        expect(response.options).toEqual(
          expect.objectContaining({
            width: size.width,
            height: size.height,
          })
        )

        // Check internal element structure if possible (mock stores it)
        expect(response.element.type).toBe('div')
        expect(response.element.props.style).toBeDefined()
      }
    )
  })
})
