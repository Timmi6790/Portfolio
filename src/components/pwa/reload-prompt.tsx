'use client'

import { useEffect } from 'react'

import { toast } from 'sonner'

interface Workbox {
  addEventListener: (event: string, callback: () => void) => void
  messageSkipWaiting: () => void
  register: () => void
}

declare global {
  interface Window {
    workbox?: Workbox
  }
}

export const ReloadPrompt: () => null = (): null => {
  useEffect((): void => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.workbox !== undefined
    ) {
      const workbox: Workbox = window.workbox

      const handleControlling: () => void = (): void => {
        window.location.reload()
      }

      const handleReload: () => void = (): void => {
        workbox.addEventListener('controlling', handleControlling)
        workbox.messageSkipWaiting()
      }

      const promptNewVersionAvailable: () => void = (): void => {
        toast('New version available', {
          action: {
            label: 'Reload',
            onClick: handleReload,
          },
          duration: Number.POSITIVE_INFINITY,
        })
      }

      workbox.addEventListener('waiting', promptNewVersionAvailable)
      workbox.register()
    }
  }, [])

  return null
}
