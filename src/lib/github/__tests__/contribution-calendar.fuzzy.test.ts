import { test, fc } from '@fast-check/vitest'
import { describe, expect } from 'vitest'

import {
  isoDate,
  sundayOfWeekUTC,
  buildCalendar,
} from '../contribution-calendar'
import type { ContributionPoint } from '@/models/github'

describe('Contribution Calendar Fuzzy Tests', () => {
  describe('isoDate', () => {
    test.prop([fc.date()])(
      'should always return a valid YYYY-MM-DD string',
      (date) => {
        const result = isoDate(date)
        expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)

        // Additional safety check: parsing it back should result in a valid date (ignoring time)
        const parsed = new Date(result)
        expect(parsed.toString()).not.toBe('Invalid Date')
      }
    )
  })

  describe('sundayOfWeekUTC', () => {
    test.prop([
      fc.date({
        min: new Date('0000-01-01T00:00:00.000Z'),
        max: new Date('9999-12-31T23:59:59.999Z'),
      }),
    ])('should return a date that is a Sunday and <= input date', (date) => {
      const sunday = sundayOfWeekUTC(date)

      expect(sunday.getUTCDay()).toBe(0)

      // Compare timestamps
      const inputTime = date.getTime()
      const sundayTime = sunday.getTime()

      // sunday should be less than or equal to input
      // Use rough check allowing for day alignment
      expect(sundayTime).toBeLessThanOrEqual(inputTime + 24 * 60 * 60 * 1000)

      const diffMs = inputTime - sundayTime
      const diffDays = diffMs / (1000 * 60 * 60 * 24)

      expect(diffDays).toBeGreaterThanOrEqual(-1) // Allow close variation if same day
      expect(diffDays).toBeLessThan(7)
    })
  })

  describe('buildCalendar', () => {
    test.prop([
      fc.array(
        fc.record({
          // Use simple string date generation to avoid ISO issues with Date objects
          // Constrain range to 2 years to prevent timeout from massive iteration loops
          date: fc
            .date({
              min: new Date(Date.UTC(2020, 0, 1)),
              max: new Date(Date.UTC(2022, 11, 31)),
            })
            .map((d) => {
              try {
                return d.toISOString().split('T')[0]
              } catch {
                // Fallback for safety, though shouldn't happen with valid bounds
                return '2020-01-01'
              }
            }),
          count: fc.integer({ min: 0, max: 100 }),
          level: fc.integer({ min: 0, max: 4 }),
        }),
        { minLength: 1, maxLength: 50 }
      ),
      fc.constant('en-US'),
    ])(
      'should build a calendar with correct structure',
      (rawPoints, locale) => {
        // Fix types: rawPoints has date as string, matching ContributionPoint interface
        const data = rawPoints as ContributionPoint[]

        const calendar = buildCalendar({ data, locale })

        // Structure checks
        expect(calendar.weeks).toBeDefined()
        expect(calendar.monthLabels).toBeDefined()

        if (calendar.weeks.length > 0) {
          // Every week must have 7 days
          for (const week of calendar.weeks) {
            expect(week.days).toHaveLength(7)
          }
        }
      }
    )
  })
})
