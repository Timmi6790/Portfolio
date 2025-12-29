import * as Sentry from '@sentry/nextjs'

import { environment } from '@/environment'

export function init(): void {
  if (
    environment.NEXT_PUBLIC_SENTRY_DSN !== undefined &&
    environment.NEXT_PUBLIC_SENTRY_DSN !== ''
  ) {
    Sentry.init({
      dsn: environment.NEXT_PUBLIC_SENTRY_DSN,
      sendDefaultPii: false,

      // Disable all performance monitoring and tracing
      tracesSampleRate: 0,
    })
  }
}
