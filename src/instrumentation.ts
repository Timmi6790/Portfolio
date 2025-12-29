import * as Sentry from '@sentry/nextjs'

import { environment } from '@/environment'

export function register(): void {
  if (
    (process.env['NEXT_RUNTIME'] === 'nodejs' ||
      process.env['NEXT_RUNTIME'] === 'edge') &&
    environment.NEXT_PUBLIC_SENTRY_DSN !== undefined
  ) {
    Sentry.init({
      dsn: environment.NEXT_PUBLIC_SENTRY_DSN,
      sendDefaultPii: false,
      tracesSampleRate: 0,
    })
  }
}

export const onRequestError: typeof Sentry.captureRequestError =
  Sentry.captureRequestError
