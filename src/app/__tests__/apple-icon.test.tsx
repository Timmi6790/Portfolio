import { describe, expect, it, vi } from 'vitest'

import AppleIcon, { generateImageMetadata } from '@/app/apple-icon'
import * as iconLoader from '@/lib/icon-loader'

// Mock the icon-loader dependency
vi.mock('@/lib/icon-loader', () => ({
  generateIconResponse: vi.fn(),
  loadIconSvg: vi.fn().mockResolvedValue('mock-svg'),
}))

describe('AppleIcon', () => {
  describe('generateImageMetadata', () => {
    it('should return correct metadata', () => {
      const metadata = generateImageMetadata()

      expect(metadata).toEqual([
        {
          contentType: 'image/png',
          id: 'apple',
          size: { height: 180, width: 180 },
        },
      ])
    })
  })

  describe('AppleIcon Component', () => {
    it('should generate apple icon with correct params', async () => {
      await AppleIcon()

      expect(iconLoader.loadIconSvg).toHaveBeenCalled()
      expect(iconLoader.generateIconResponse).toHaveBeenCalledWith('mock-svg', {
        height: 180,
        width: 180,
      })
    })
  })
})
