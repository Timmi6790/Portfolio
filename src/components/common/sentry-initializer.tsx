'use client'

import { type JSX, type RefObject, useEffect, useRef } from 'react'

import { init as initSentry } from '@/lib/sentry-client'
import type { FCNullable } from '@/types/fc'

/* ---------- component ---------- */
export const SentryInitializer: FCNullable = (): JSX.Element | null => {
  // Use a ref to ensure we only initialize once
  const initialized: RefObject<boolean> = useRef<boolean>(false)

  useEffect((): void => {
    if (initialized.current) {
      return
    }

    initialized.current = true

    // Initialize Sentry immediately without delay
    initSentry()
  }, [])

  return null
}
