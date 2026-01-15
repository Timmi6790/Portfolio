import { test, fc } from '@fast-check/vitest'
import { describe, expect } from 'vitest'

import {
  formatMetricValue,
  getMetricColorClass,
  type MetricName,
  type MetricRating,
} from '../web-vitals'

describe('Web Vitals Fuzzy Tests', () => {
  describe('formatMetricValue', () => {
    test.prop([
      fc.double({ noNaN: true, min: -1e12, max: 1e12 }), // Value (constrain to avoid scientific notation fallback at 1e21)
      fc.constantFrom<MetricName>('CLS', 'FCP', 'LCP', 'TTFB', 'INP'), // Metric Name
    ])('should format values correctly based on metric type', (value, name) => {
      const result = formatMetricValue(name, value)

      if (name === 'CLS') {
        // CLS: fixed to 4 decimals
        expect(result).toMatch(/^-?\d+\.\d{4}$/)
        // Verify value preservation (approximate)
        expect(parseFloat(result)).toBeCloseTo(value, 4)
      } else {
        // Others: rounded integer + ms
        expect(result).toMatch(/^-?\d+ms$/)
        const numberPart = parseInt(result.replace('ms', ''), 10)
        // String(-0) is "0", so we normalize expected -0 to 0
        const expected = Math.round(value)
        expect(numberPart).toBe(expected === -0 ? 0 : expected)
      }
    })

    test.prop([
      fc.constantFrom<MetricName>('CLS', 'FCP', 'LCP', 'TTFB', 'INP'),
    ])('should handle NaN and Infinity gracefully if possible', (name) => {
      // We just ensure it doesn't crash.
      expect(() => formatMetricValue(name, NaN)).not.toThrow()
      expect(() => formatMetricValue(name, Infinity)).not.toThrow()
    })
  })

  describe('getMetricColorClass', () => {
    test.prop([
      fc.constantFrom<MetricRating>('good', 'needs-improvement', 'poor'),
    ])('should return a valid tailwind text color class', (rating) => {
      const result = getMetricColorClass(rating)
      expect(result).toMatch(/^text-(emerald|yellow|red)-400$/)
    })
  })
})
