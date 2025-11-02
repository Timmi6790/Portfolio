import { type NextRequest, NextResponse } from 'next/server'
import { defaultLocale, locales } from '@/lib/i18n-config'

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Get the preferred locale from the Accept-Language header
    const locale = getLocale(request) ?? defaultLocale

    // Redirect to URL with locale
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
  }

  // Add security headers
  const response = NextResponse.next()

  // Add cache control for static assets
  if (pathname.startsWith('/_next/static') || pathname.startsWith('/public')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }

  return response
}

function getLocale(request: NextRequest): string | null {
  // Get locale from cookie if exists
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value
  if (
    localeCookie &&
    locales.includes(localeCookie as (typeof locales)[number])
  ) {
    return localeCookie
  }

  // Get locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const parts = acceptLanguage.split(',')
    const firstPart = parts[0]?.split('-')
    const preferredLocale = firstPart?.[0]?.toLowerCase()

    if (
      preferredLocale &&
      locales.includes(preferredLocale as (typeof locales)[number])
    ) {
      return preferredLocale
    }
  }

  return null
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt (static files)
     */
    '/((?!api/|_next/|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
}
