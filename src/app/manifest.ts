import type { MetadataRoute } from 'next'

import { siteConfig } from '@/lib/config'

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: '#FFFFFF',
    display: 'standalone',
    id: 'portfolio',
    name: siteConfig.title,
    orientation: 'portrait',
    short_name: siteConfig.title,
    start_url: '/',
    theme_color: '#FFFFFF',
  }
}
