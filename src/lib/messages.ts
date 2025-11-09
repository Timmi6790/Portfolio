import 'server-only'

import { type Locale } from 'next-intl'
import type { Messages } from 'next-intl'

import { routing } from '@/i18n/routing'

type MessageDictionary = Messages

const FALLBACK_LOCALE: Locale = routing.defaultLocale

const importMessages = async (locale: Locale): Promise<MessageDictionary> => {
  const messagesModule = await import(
    `../../messages/${locale}.json`
  )
  return messagesModule.default as MessageDictionary
}

export const loadMessages = async (
  locale: Locale
): Promise<MessageDictionary> => {
  try {
    return await importMessages(locale)
  } catch (error) {
    if (locale !== FALLBACK_LOCALE) {
      try {
        return await importMessages(FALLBACK_LOCALE)
      } catch {
        // fall through to error below
      }
    }

    throw error
  }
}
