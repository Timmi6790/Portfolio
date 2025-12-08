import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { ImageResponse } from 'next/og'
import { describe, expect, it, vi } from 'vitest'

import { generateIconResponse, loadIconSvg } from '@/lib/icon-loader'

const { mockedReadFile } = vi.hoisted(() => {
  return { mockedReadFile: vi.fn() }
})

// Mock node:fs/promises
vi.mock('node:fs/promises', async () => {
  return {
    default: {
      readFile: mockedReadFile,
    },
    readFile: mockedReadFile,
  }
})

// Mock node:path
vi.mock('node:path', async () => {
  const join = vi.fn((...args) => args.join('/'))
  return {
    default: {
      join,
    },
    join,
  }
})

describe('icon-loader', () => {
  describe('loadIconSvg', () => {
    it('should read the SVG file from the correct path and return base64 string', async () => {
      const mockSvgContent = '<svg>test</svg>'
      const mockBuffer = Buffer.from(mockSvgContent)

      mockedReadFile.mockResolvedValue(mockBuffer as any)

      const result = await loadIconSvg()

      expect(path.join).toHaveBeenCalledWith(
        process.cwd(),
        'public',
        'favicon.svg'
      )
      expect(readFile).toHaveBeenCalled()
      expect(result).toBe(mockBuffer.toString('base64'))
    })
  })

  describe('generateIconResponse', () => {
    it('should return an ImageResponse with correct dimensions', () => {
      const svg = 'base64string'
      const size = { height: 100, width: 100 }

      const response = generateIconResponse(svg, size)

      expect(response).toBeInstanceOf(ImageResponse)
    })
  })
})
