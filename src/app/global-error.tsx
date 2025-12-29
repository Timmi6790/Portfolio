'use client'

import { type JSX, useEffect } from 'react'

import * as Sentry from '@sentry/nextjs'
import NextError from 'next/error'

const GlobalError: (properties: Readonly<{ error: Error }>) => JSX.Element = ({
  error,
}: Readonly<{ error: Error }>): JSX.Element => {
  useEffect((): void => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose the status code for exception-based errors, we simply
        pass in null to force the default editor error handling. */}
        {/* @ts-expect-error -- NextError requires statusCode */}
        <NextError statusCode={undefined} />
      </body>
    </html>
  )
}

export default GlobalError
