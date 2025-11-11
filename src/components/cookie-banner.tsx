'use client'

import React, {
  type Dispatch,
  type JSX,
  type SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { useTranslations } from 'next-intl'

import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heading } from '@/components/ui/heading'
import type { FCNullable, FCStrict } from '@/types/fc'
import type { Translations } from '@/types/i18n'

/* ───────────────────────────── Types & consts ───────────────────────────── */

interface CookieConsent {
  readonly analytics: boolean
  readonly essential: true
}

const CONSENT_KEY: string = 'cookie-consent'

/* ───────────────────────────── Helpers (pure) ───────────────────────────── */

function defer(function_: () => void): void {
  setTimeout(function_, 0)
}

const loadConsent: () => CookieConsent | null = (): CookieConsent | null => {
  const raw: string | null =
    typeof window === 'undefined'
      ? null
      : window.localStorage.getItem(CONSENT_KEY)
  if (raw === null) {
    return null
  }

  try {
    const parsed: unknown = JSON.parse(raw)
    // Narrow carefully
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      (parsed as { essential?: unknown }).essential === true &&
      typeof (parsed as { analytics?: unknown }).analytics === 'boolean'
    ) {
      return {
        analytics: (parsed as { analytics: boolean }).analytics,
        essential: true,
      }
    }
  } catch {
    // ignore parse errors and treat as no consent
  }
  return null
}

const saveConsent: (consent: CookieConsent) => void = (
  consent: CookieConsent
): void => {
  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
}

/* ───────────────────────────── Subcomponents ───────────────────────────── */

interface HeaderProperties {
  readonly onClose: () => void
  readonly title: string
}
const Header: FCStrict<HeaderProperties> = ({
  onClose,
  title,
}: HeaderProperties): JSX.Element => (
  <div className="mb-4 flex items-start justify-between">
    <Heading as="h3" className="text-xl font-semibold">
      {title}
    </Heading>
    <Button
      aria-label={title}
      className="h-8 w-8"
      size="icon"
      variant="ghost"
      onClick={onClose}
    >
      <X className="h-4 w-4" />
    </Button>
  </div>
)

interface SummaryActionsProperties {
  readonly onAcceptAll: () => void
  readonly onCustomize: () => void
  readonly onRejectAll: () => void
  readonly translations: Translations<'cookies'>
}
const SummaryActions: FCStrict<SummaryActionsProperties> = ({
  onAcceptAll,
  onCustomize,
  onRejectAll,
  translations,
}: SummaryActionsProperties): JSX.Element => (
  <div className="flex flex-col gap-3 sm:flex-row">
    <Button className="flex-1" onClick={onAcceptAll}>
      {translations('acceptAll')}
    </Button>
    <Button
      className="flex-1 bg-transparent"
      variant="outline"
      onClick={onRejectAll}
    >
      {translations('rejectAll')}
    </Button>
    <Button className="flex-1" variant="secondary" onClick={onCustomize}>
      {translations('customize')}
    </Button>
  </div>
)

interface EssentialRowProperties {
  readonly requiredLabel: string
  readonly translations: Translations<'cookies'>
}
const EssentialRow: FCStrict<EssentialRowProperties> = ({
  requiredLabel,
  translations,
}: EssentialRowProperties): JSX.Element => (
  <div className="bg-muted/50 flex items-start justify-between rounded-lg border p-4">
    <div className="flex-1">
      <Heading as="h4" className="mb-1 font-medium">
        {translations('essential')}
      </Heading>
      <p className="text-muted-foreground text-sm">
        {translations('essentialDesc')}
      </p>
    </div>
    <div className="text-muted-foreground ml-4 text-sm font-medium">
      {requiredLabel}
    </div>
  </div>
)

interface AnalyticsRowProperties {
  readonly checked: boolean
  readonly onChange: (next: boolean) => void
  readonly translations: Translations<'cookies'>
}
const AnalyticsRow: FCStrict<AnalyticsRowProperties> = ({
  checked,
  onChange,
  translations,
}: AnalyticsRowProperties): JSX.Element => (
  <div className="flex items-start justify-between rounded-lg border p-4">
    <div className="flex-1">
      <Heading as="h4" className="mb-1 font-medium">
        {translations('analytics')}
      </Heading>
      <p className="text-muted-foreground text-sm">
        {translations('analyticsDesc')}
      </p>
    </div>

    <label
      className="relative ml-4 inline-flex cursor-pointer items-center"
      htmlFor="allow-analytics"
    >
      <input
        aria-labelledby="allow-analytics-label"
        checked={checked}
        className="peer sr-only"
        id="allow-analytics"
        type="checkbox"
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
          onChange(event.target.checked)
        }}
      />
      <div className="bg-muted peer-focus:ring-primary/20 peer peer-checked:bg-primary h-6 w-11 rounded-full peer-focus:ring-4 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white" />
      <span className="sr-only" id="allow-analytics-label">
        {translations('analyticsDesc')}
      </span>
    </label>
  </div>
)

interface CustomizeActionsProperties {
  readonly backLabel: string
  readonly onBack: () => void
  readonly onSave: () => void
  readonly translations: Translations<'cookies'>
}
const CustomizeActions: FCStrict<CustomizeActionsProperties> = ({
  backLabel,
  onBack,
  onSave,
  translations,
}: CustomizeActionsProperties): JSX.Element => (
  <div className="flex flex-col gap-3 sm:flex-row">
    <Button className="flex-1" onClick={onSave}>
      {translations('save')}
    </Button>
    <Button className="flex-1" variant="outline" onClick={onBack}>
      {backLabel}
    </Button>
  </div>
)

/* ───────────────────────────── Main component ───────────────────────────── */

// eslint-disable-next-line max-lines-per-function
export const CookieBanner: FCNullable = (): JSX.Element | null => {
  const translations: Translations<'cookies'> = useTranslations('cookies')

  const [showBanner, setShowBanner]: [
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ] = useState<boolean>(false)

  const [expanded, setExpanded]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState<boolean>(false)

  const [customize, setCustomize]: [
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ] = useState<boolean>(false)
  const [analytics, setAnalytics]: [
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ] = useState<boolean>(false)

  // bootstrap from localStorage
  useEffect((): void => {
    const existing: CookieConsent | null = loadConsent()
    if (existing === null) {
      setShowBanner(true)
      return
    }
    setAnalytics(existing.analytics)
  }, [])

  useEffect((): (() => undefined) | undefined => {
    if (!showBanner) {
      return undefined
    }
    const requestId: NodeJS.Timeout | number =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? window.requestIdleCallback((): void => {
            setExpanded(true)
          })
        : setTimeout((): void => {
            setExpanded(true)
          }, 0)
    return (): undefined => {
      if (typeof requestId === 'number') {
        clearTimeout(requestId)
      } else if (
        typeof window !== 'undefined' &&
        'cancelIdleCallback' in window
      ) {
        // @ts-expect-error - window typing
        window.cancelIdleCallback(requestId)
      }
    }
  }, [showBanner])

  const handleAcceptAll: () => void = useCallback((): void => {
    setShowBanner(false)
    defer((): void => {
      saveConsent({ analytics: true, essential: true })
    })
  }, [])

  const handleRejectAll: () => void = useCallback((): void => {
    setShowBanner(false)
    defer((): void => {
      saveConsent({ analytics: false, essential: true })
    })
  }, [])

  const handleSavePreferences: () => void = useCallback((): void => {
    setShowBanner(false)
    defer((): void => {
      saveConsent({ analytics, essential: true })
    })
  }, [analytics])

  if (!showBanner) {
    return null
  }

  const requiredLabel: string = translations('required')
  const backLabel: string = translations('back')

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center p-4"
    >
      <Card
        aria-hidden={!expanded}
        aria-modal="true"
        className={[
          'bg-background/95 pointer-events-auto w-full max-w-2xl border-2 p-6 shadow-2xl backdrop-blur-sm',
          'overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out motion-reduce:transition-none',
          expanded
            ? 'max-h-96 translate-y-0 opacity-100'
            : 'max-h-0 translate-y-2 opacity-0',
          '@starting-style:max-h-0 @starting-style:opacity-0 @starting-style:translate-y-2',
        ].join(' ')}
        role="dialog"
      >
        <Header title={translations('title')} onClose={handleRejectAll} />

        {customize ? (
          <>
            <div className="mb-6 space-y-4">
              <EssentialRow
                requiredLabel={requiredLabel}
                translations={translations}
              />
              <AnalyticsRow
                checked={analytics}
                translations={translations}
                onChange={(next: boolean): void => {
                  setAnalytics(next)
                }}
              />
            </div>
            <CustomizeActions
              backLabel={backLabel}
              translations={translations}
              onBack={(): void => {
                setCustomize(false)
              }}
              onSave={handleSavePreferences}
            />
          </>
        ) : (
          <>
            <p className="text-muted-foreground mb-6 text-sm">
              {translations('description')}
            </p>
            <SummaryActions
              translations={translations}
              onAcceptAll={handleAcceptAll}
              onCustomize={(): void => {
                setCustomize(true)
              }}
              onRejectAll={handleRejectAll}
            />
          </>
        )}
      </Card>
    </div>
  )
}
