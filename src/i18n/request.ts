import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'
import { type Locale } from 'next-intl'

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as never)) {
    locale = routing.defaultLocale
  }

  return {
    locale: locale as Locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
