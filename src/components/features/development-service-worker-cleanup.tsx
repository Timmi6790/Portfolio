/* eslint-disable no-console */
'use client'

import { useEffect } from 'react'

import type { FCNullable } from '@/types/fc'

/**
 * Component to guard against service workers left over from previous builds.
 * The current production service worker is sadly causing the dev version to fully break.
 *
 * @constructor
 */
export const DevelopmentServiceWorkerGuard: FCNullable = (): null => {
  useEffect((): void => {
    if (
      process.env.NODE_ENV === 'development' &&
      'serviceWorker' in navigator
    ) {
      void cleanupServiceWorkers()
    }
  }, [])

  return null
}

/**
 * Unregisters all service workers and clears caches.
 * Forces a page refresh if any service workers were found.
 */
const cleanupServiceWorkers: () => Promise<void> = async (): Promise<void> => {
  const foundServiceWorker: boolean = await unregisterServiceWorkers()
  await clearCaches(foundServiceWorker)

  if (foundServiceWorker) {
    window.location.reload()
  }
}

/**
 * Unregisters all service workers.
 * @returns True if any service workers were found and unregistered
 */
const unregisterServiceWorkers: () => Promise<boolean> =
  async (): Promise<boolean> => {
    try {
      const registrations: readonly ServiceWorkerRegistration[] =
        await navigator.serviceWorker.getRegistrations()

      if (registrations.length === 0) {
        return false
      }

      await Promise.all(
        registrations.map(
          async (registration: ServiceWorkerRegistration): Promise<void> => {
            await registration.unregister()
          }
        )
      )

      return true
    } catch (error: unknown) {
      console.error('Failed to unregister service workers:', error)
      return false
    }
  }

/**
 * Clears all browser caches.
 * @param foundServiceWorker - Whether service workers were found
 */
const clearCaches: (foundServiceWorker: boolean) => Promise<void> = async (
  foundServiceWorker: boolean
): Promise<void> => {
  if (typeof globalThis.caches?.keys !== 'function') {
    return
  }

  try {
    const keys: string[] = await caches.keys()

    await Promise.all(
      keys.map(async (key: string): Promise<void> => {
        await caches.delete(key)
      })
    )

    if (foundServiceWorker) {
      console.log('Service workers and caches cleared, refreshing page...')
    }
  } catch (error: unknown) {
    console.error('Failed to clear caches:', error)
  }
}
