import { describe, expect, it, vi } from 'vitest'

import Icon, { generateImageMetadata } from '@/app/icon'
import * as iconLoader from '@/lib/icon-loader'

// Mock the icon-loader dependency
vi.mock('@/lib/icon-loader', () => ({
  generateIconResponse: vi.fn().mockImplementation(() => 'mock-response'),
  loadIconSvg: vi.fn().mockResolvedValue('mock-svg'),
}))

describe('Icon', () => {
  describe('generateImageMetadata', () => {
    it('should return metadata for all icon types', () => {
      const metadata = generateImageMetadata()

      expect(metadata).toHaveLength(4)
      expect(metadata).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 'favicon',
            size: { height: 32, width: 32 },
          }),
          expect.objectContaining({
            id: 'icon-192',
            size: { height: 192, width: 192 },
          }),
          expect.objectContaining({
            id: 'icon-512',
            size: { height: 512, width: 512 },
          }),
          expect.objectContaining({
            id: 'screenshot-wide',
            size: { height: 720, width: 1280 },
          }),
        ])
      )
    })
  })

  describe('Icon Component', () => {
    it('should generate icon for favicon', async () => {
      await Icon({ id: Promise.resolve('favicon') })

      expect(iconLoader.loadIconSvg).toHaveBeenCalled()
      expect(iconLoader.generateIconResponse).toHaveBeenCalledWith('mock-svg', {
        height: 32,
        width: 32,
      })
    })

    it('should generate icon for icon-192', async () => {
      await Icon({ id: Promise.resolve('icon-192') })

      expect(iconLoader.generateIconResponse).toHaveBeenCalledWith('mock-svg', {
        height: 192,
        width: 192,
      })
    })

    it('should generate icon for icon-512', async () => {
      await Icon({ id: Promise.resolve('icon-512') })

      expect(iconLoader.generateIconResponse).toHaveBeenCalledWith('mock-svg', {
        height: 512,
        width: 512,
      })
    })

    it('should generate icon for screenshot-wide', async () => {
      await Icon({ id: Promise.resolve('screenshot-wide') })

      expect(iconLoader.generateIconResponse).toHaveBeenCalledWith('mock-svg', {
        height: 720,
        width: 1280,
      })
    })
  })
})
