// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

import { environment } from '@/environment'

if (environment.NEXT_PUBLIC_SENTRY_DSN !== undefined) {
  Sentry.init({
    dsn: environment.NEXT_PUBLIC_SENTRY_DSN,
    sendDefaultPii: false,

    // Disable all performance monitoring and tracing
    tracesSampleRate: 0,
  })
}

export const onRouterTransitionStart: typeof Sentry.captureRouterTransitionStart =
  Sentry.captureRouterTransitionStart
