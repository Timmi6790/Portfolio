import { test, expect } from '@playwright/test'

/**
 * CONFIG
 * Tune the “must-be-used” window relative to FCP (ms).
 * Many apps use font-display:swap; keeping this modest avoids false positives.
 */
const USE_WITHIN_MS_AFTER_FCP = Number(process.env.FONT_PRELOAD_MAX_MS ?? 3000)

test.describe('Font preloads are actually used', () => {
  test('every <link rel="preload" as="font"> is applied on initial render', async ({
    page,
  }) => {
    // Navigate: pick your key entry point or loop routes with test.step(...)
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    // Wait for fonts and first paint context
    await page.waitForFunction(() => (document as any).fonts?.ready, null, {
      timeout: 10_000,
    })

    type Result = {
      fcp: number
      threshold: number
      preloads: Array<{
        href: string
        family?: string
        usedBySelectors: string[]
        performanceStart?: number
        lateRelativeToFcp?: number
        matchedFontFace: boolean
      }>
    }

    const result = (await page.evaluate((thresholdMs) => {
      // Helpers
      const toPath = (u: string) => {
        try {
          return new URL(u, location.href).pathname
        } catch {
          return u
        }
      }
      const visible = (el: Element) => {
        const rect = (el as HTMLElement).getBoundingClientRect?.()
        if (!rect) return false
        const styles = getComputedStyle(el as HTMLElement)
        return (
          rect.width > 0 &&
          rect.height > 0 &&
          rect.bottom > 0 &&
          rect.right > 0 &&
          styles.visibility !== 'hidden' &&
          styles.display !== 'none' &&
          styles.opacity !== '0'
        )
      }

      // 1) Collect preloaded font hrefs
      const preloadLinks = Array.from(
        document.querySelectorAll<HTMLLinkElement>(
          'link[rel="preload"][as="font"]'
        )
      )
      const preloadPaths = preloadLinks.map((l) => ({
        href: l.href,
        path: toPath(l.href),
      }))

      // 2) Build url(path) -> font-family mapping from @font-face
      type Face = { family: string; urls: string[] }
      const faces: Face[] = []
      for (const sheet of Array.from(document.styleSheets)) {
        let rules: CSSRuleList | undefined
        try {
          rules = sheet.cssRules
        } catch {
          continue
        } // cross-origin sheet
        if (!rules) continue
        for (const rule of Array.from(rules)) {
          const FONT_FACE_RULE = 5 // CSSRule.FONT_FACE_RULE
          if ((rule as CSSRule).type === FONT_FACE_RULE) {
            const ff = rule as CSSFontFaceRule
            const fam = ff.style
              .getPropertyValue('font-family')
              ?.trim()
              .replace(/^["']|["']$/g, '')
            const src = ff.style.getPropertyValue('src') || ''
            const urls = Array.from(src.matchAll(/url\(([^)]+)\)/g))
              .map((m) => m[1].trim().replace(/^["']|["']$/g, ''))
              .map(toPath)
            if (fam && urls.length) faces.push({ family: fam, urls })
          }
        }
      }

      // Map preloaded path -> family (if any)
      const mapPreloadToFamily = new Map<string, string>()
      for (const p of preloadPaths) {
        const hit = faces.find((f) =>
          f.urls.some((u) => u === p.path || u.endsWith(p.path))
        )
        if (hit) mapPreloadToFamily.set(p.href, hit.family)
      }

      // 3) Gather visible, texty elements in the viewport
      const candidates = Array.from(
        document.querySelectorAll(
          'h1,h2,h3,h4,h5,h6,p,li,button,a,span,div,code,pre,input,textarea'
        )
      )
        .filter(
          (el) => visible(el) && (el.textContent?.trim()?.length ?? 0) > 0
        )
        .slice(0, 300) // cap for perf

      // 4) Grab performance entries for fonts
      const entries = performance.getEntriesByType(
        'resource'
      ) as PerformanceResourceTiming[]
      const fontEntries = entries.filter((e) =>
        /\.(woff2?|ttf|otf)(\?|$)/i.test(e.name)
      )
      const entryByPath = new Map<string, PerformanceResourceTiming>()
      for (const e of fontEntries) {
        try {
          const path = new URL(e.name, location.href).pathname
          entryByPath.set(path, e)
        } catch {
          /* ignore */
        }
      }

      const paintEntries = performance.getEntriesByType(
        'paint'
      ) as PerformanceEntry[]
      const fcp =
        paintEntries.find((e) => e.name === 'first-contentful-paint')
          ?.startTime ?? 0

      // 5) For each preloaded font, verify usage
      const preloads = preloadPaths.map(({ href, path }) => {
        const family = mapPreloadToFamily.get(href)
        let usedBySelectors: string[] = []
        if (family) {
          // Check if any candidate actually computes to this family as the first usable family
          for (const el of candidates) {
            const cs = getComputedStyle(el as HTMLElement)
            // The browser returns a comma-separated list; the first one is the one it *tries* to use.
            // We also check document.fonts.check to ensure it’s available.
            const families = cs.fontFamily
              .split(',')
              .map((s) => s.trim().replace(/^["']|["']$/g, ''))
            const first = families[0]
            const isCandidate = first === family
            const usable =
              (document as any).fonts?.check?.(`16px "${family}"`) ?? true
            if (isCandidate && usable) {
              usedBySelectors.push(el.tagName.toLowerCase())
              // one is enough to prove usage
              break
            }
          }
        }

        const perf = entryByPath.get(path)
        const pStart = perf?.startTime
        const late =
          typeof pStart === 'number'
            ? Math.max(0, pStart - (fcp + thresholdMs))
            : undefined

        return {
          href,
          family,
          usedBySelectors,
          performanceStart: pStart,
          lateRelativeToFcp: late,
          matchedFontFace: Boolean(family),
        }
      })

      return { fcp, threshold: thresholdMs, preloads }
    }, USE_WITHIN_MS_AFTER_FCP)) as Result

    // Build assertions with helpful output
    const orphaned = result.preloads.filter((p) => !p.matchedFontFace)
    const unused = result.preloads.filter(
      (p) => p.matchedFontFace && p.usedBySelectors.length === 0
    )
    const late = result.preloads.filter(
      (p) => typeof p.lateRelativeToFcp === 'number' && p.lateRelativeToFcp! > 0
    )

    // 1) Every preload must match an @font-face
    expect
      .soft(
        orphaned,
        [
          'Found preloaded fonts with no matching @font-face.',
          ...orphaned.map((o) => `- href: ${o.href}`),
        ].join('\n')
      )
      .toHaveLength(0)

    // 2) Every matched family must be used by at least one visible element
    expect
      .soft(
        unused,
        [
          'Found preloaded fonts that were not applied to any visible element.',
          ...unused.map((u) => `- href: ${u.href}  family: ${u.family}`),
        ].join('\n')
      )
      .toHaveLength(0)

    // 3) Optional timing check: flag late fonts relative to FCP
    // Make this a soft expectation so you get feedback without failing CI by default.
    test.info().annotations.push({
      type: 'font-usage',
      description: [
        `FCP: ${Math.round(result.fcp)}ms`,
        `Threshold: ${result.threshold}ms`,
        `Late preloaded fonts: ${late.length ? late.map((l) => new URL(l.href).pathname).join(', ') : 'none'}`,
      ].join(' | '),
    })

    // If you want to make timing strict, flip to expect(...).toHaveLength(0)
    expect
      .soft(
        late,
        [
          `Some preloaded fonts started loading more than ${USE_WITHIN_MS_AFTER_FCP}ms after FCP.`,
          ...late.map(
            (l) =>
              `- href: ${l.href}  family: ${l.family}  start: ${Math.round(l.performanceStart ?? -1)}ms  lateBy: ${Math.round(l.lateRelativeToFcp ?? 0)}ms`
          ),
        ].join('\n')
      )
      .toHaveLength(0)
  })
})
