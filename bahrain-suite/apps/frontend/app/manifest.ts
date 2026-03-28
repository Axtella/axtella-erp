import type { MetadataRoute } from 'next';

/** PWA / install — uses simplified vector icon (add PNG 192/512 for older Android if needed). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Axtella Property Management Co.',
    short_name: 'Axtella',
    description:
      'Commercial property operations, finance, reporting, and compliance.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0F1C',
    theme_color: '#114A9F',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/app-icon.svg',
        sizes: '128x128',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
