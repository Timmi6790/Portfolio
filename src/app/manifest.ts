import type { MetadataRoute } from 'next'

import { siteConfig } from '@/lib/config'

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: '#FFFFFF',
    display: 'standalone',
    icons: [
      {
        purpose: 'any',
        sizes: '32x32',
        src: '/icon',
        type: 'image/png',
      },
      {
        purpose: 'maskable',
        sizes: '32x32',
        src: '/icon',
        type: 'image/png',
      },
      {
        purpose: 'any',
        sizes: '180x180',
        src: '/apple-icon',
        type: 'image/png',
      },
    ],
    id: 'portfolio',
    name: siteConfig.title,
    orientation: 'portrait',
    short_name: siteConfig.title,
    start_url: '/',
    theme_color: '#FFFFFF',
  }
}
