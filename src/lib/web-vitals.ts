/**
 * Web Vitals Utilities
 *
 * Comprehensive utilities for tracking and analyzing Core Web Vitals metrics
 * aligned with 2025 standards.
 *
 * @see https://web.dev/vitals/
 */

/* --------------------------------- Types ---------------------------------- */

import type { Metric, MetricWithAttribution } from 'web-vitals'

/* ------------------------------- Metric Types ----------------------------- */

/**
 * Union type for all supported metrics
 */
export type WebVitalsMetric = Metric & {
  attribution?: MetricWithAttribution['attribution']
}

/**
 * Metric rating based on Google's Core Web Vitals thresholds
 */
export type MetricRating = Metric['rating']

/**
 * Core Web Vitals metric names
 */
export type MetricName = Metric['name']

/* ------------------------------- Thresholds ------------------------------- */

/**
 * 2025 Core Web Vitals thresholds based on Google's guidelines
 * @see https://web.dev/articles/defining-core-web-vitals-thresholds
 */
interface MetricThresholds {
  readonly good: number
  readonly poor: number
}

/**
 * Threshold configuration for all metrics
 */
export const METRIC_THRESHOLDS: Readonly<Record<MetricName, MetricThresholds>> =
  {
    /**
     * CLS (Cumulative Layout Shift)
     */
    CLS: { good: 0.1, poor: 0.25 },

    /**
     * FCP (First Contentful Paint)
     */
    FCP: { good: 1800, poor: 3000 },

    /**
     * INP (Interaction to Next Paint)
     */
    INP: { good: 200, poor: 500 },

    /**
     * LCP (Largest Contentful Paint)
     */
    LCP: { good: 2500, poor: 4000 },

    /**
     * TTFB (Time to First Byte)
     */
    TTFB: { good: 800, poor: 1800 },
  } as const

/* ----------------------------- Helper Functions --------------------------- */

/**
 * Format metric value with appropriate unit and precision
 */
export function formatMetricValue(name: MetricName, value: number): string {
  // CLS is a unitless score
  if (name === 'CLS') {
    return value.toFixed(4)
  }

  // All other metrics are in milliseconds
  return `${String(Math.round(value))}ms`
}

/**
 * Report web vitals metric to console (development only)
 */
export function reportToConsole(metric: WebVitalsMetric): void {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const rating: MetricRating = metric.rating
  const formattedValue: string = formatMetricValue(metric.name, metric.value)

  const ratingEmoji: Record<MetricRating, string> = {
    good: '✅',
    'needs-improvement': '⚠️',
    poor: '❌',
  }

  // eslint-disable-next-line no-console
  console.log(
    // eslint-disable-next-line security/detect-object-injection
    `${ratingEmoji[rating]} ${metric.name}: ${formattedValue} (${rating})`
  )

  // Log attribution data if available
  if (metric.attribution && Object.keys(metric.attribution).length > 0) {
    // eslint-disable-next-line no-console
    console.log(`   Attribution:`, metric.attribution)
  }
}

/**
 * Get color class for metric rating (Tailwind CSS)
 */
export function getMetricColorClass(rating: MetricRating): string {
  const colorMap: Record<MetricRating, string> = {
    good: 'text-emerald-400',
    'needs-improvement': 'text-yellow-400',
    poor: 'text-red-400',
  }

  // eslint-disable-next-line security/detect-object-injection
  return colorMap[rating]
}
