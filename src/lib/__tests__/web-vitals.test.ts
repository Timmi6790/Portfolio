import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  formatMetricValue,
  getMetricColorClass,
  METRIC_THRESHOLDS,
  reportToConsole,
  type WebVitalsMetric,
} from '../web-vitals'

describe('Web Vitals Utilities', () => {
  describe('METRIC_THRESHOLDS', () => {
    it('defines 2025 standard thresholds', () => {
      // INP (replaced FID)
      expect(METRIC_THRESHOLDS.INP).toEqual({ good: 200, poor: 500 })
      // LCP
      expect(METRIC_THRESHOLDS.LCP).toEqual({ good: 2500, poor: 4000 })
      // CLS
      expect(METRIC_THRESHOLDS.CLS).toEqual({ good: 0.1, poor: 0.25 })
      // FCP
      expect(METRIC_THRESHOLDS.FCP).toEqual({ good: 1800, poor: 3000 })
      // TTFB
      expect(METRIC_THRESHOLDS.TTFB).toEqual({ good: 800, poor: 1800 })
    })
  })

  describe('formatMetricValue', () => {
    it('formats CLS with 4 decimal places', () => {
      expect(formatMetricValue('CLS', 0.123456)).toBe('0.1235')
      expect(formatMetricValue('CLS', 0)).toBe('0.0000')
    })

    it('formats other metrics as rounded ms', () => {
      expect(formatMetricValue('LCP', 2500.123)).toBe('2500ms')
      expect(formatMetricValue('INP', 123.9)).toBe('124ms')
      expect(formatMetricValue('FCP', 1000)).toBe('1000ms')
    })
  })

  describe('getMetricColorClass', () => {
    it('returns emerald for good', () => {
      expect(getMetricColorClass('good')).toBe('text-emerald-400')
    })

    it('returns yellow for needs-improvement', () => {
      expect(getMetricColorClass('needs-improvement')).toBe('text-yellow-400')
    })

    it('returns red for poor', () => {
      expect(getMetricColorClass('poor')).toBe('text-red-400')
    })
  })

  describe('reportToConsole', () => {
    const originalEnv = process.env.NODE_ENV
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let consoleSpy: any

    beforeEach(() => {
      consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      vi.clearAllMocks()
    })

    afterEach(() => {
      consoleSpy.mockRestore()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(process.env as any).NODE_ENV = originalEnv
    })

    it('logs to console in development', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(process.env as any).NODE_ENV = 'development'

      const metric: WebVitalsMetric = {
        name: 'LCP',
        value: 1200,
        rating: 'good',
        id: 'test-id',
        delta: 1200,
        entries: [],
        navigationType: 'navigate',
      }

      reportToConsole(metric)

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('✅ LCP: 1200ms (good)')
      )
    })

    it('logs attribution if available', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(process.env as any).NODE_ENV = 'development'

      const metric: WebVitalsMetric = {
        name: 'CLS',
        value: 0.05,
        rating: 'good',
        id: 'test-id',
        delta: 0.05,
        entries: [],
        navigationType: 'navigate',
        attribution: {
          time: 100,
          loadState: 'dom-interactive',
          largestShiftTarget: 'div.layout-shift',
          largestShiftTime: 100,
          largestShiftValue: 0.05,
          largestShiftSource: null,
          largestShiftEntry: null,
          firstInputTime: 0,
        } as any,
      }

      reportToConsole(metric)

      expect(consoleSpy).toHaveBeenCalledTimes(2)
      expect(consoleSpy).toHaveBeenLastCalledWith(
        '   Attribution:',
        expect.anything()
      )
    })

    it('does not log in production', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(process.env as any).NODE_ENV = 'production'

      const metric: WebVitalsMetric = {
        name: 'LCP',
        value: 1200,
        rating: 'good',
        id: 'test-id',
        delta: 1200,
        entries: [],
        navigationType: 'navigate',
      }

      reportToConsole(metric)

      expect(consoleSpy).not.toHaveBeenCalled()
    })
  })
})
