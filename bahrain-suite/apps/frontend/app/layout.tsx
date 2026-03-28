import type { ReactNode } from 'react';
import { DM_Sans, Inter, Noto_Sans_Arabic } from 'next/font/google';
import { AppShell } from '../components/AppShell';
import { LocaleDocument } from '../components/LocaleDocument';
import './globals.css';

/** Single loader avoids rare Next dev bugs with multiple `next/font` + RSC module maps. */
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

/** Bold wordmarks / modular product logos (see `--font-display` in globals.css). */
const interBrand = Inter({
  subsets: ['latin'],
  variable: '--font-brand',
  display: 'swap',
  weight: ['600', '700'],
});

export const metadata = {
  title: {
    default: 'Axtella Property Management Co. | Enterprise Suite',
    template: '%s | Axtella',
  },
  description:
    'Axtella — commercial property operations, finance, reporting, and compliance for authorized teams.',
  themeColor: '#114A9F',
  icons: {
    icon: [
      { url: '/icons/app-icon.svg', type: 'image/svg+xml' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/icons/icon-192.png',
  },
  appleWebApp: {
    capable: true,
    title: 'Axtella',
    statusBarStyle: 'default',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${dmSans.variable} ${notoArabic.variable} ${interBrand.variable}`}
    >
      <head>
        <link rel="stylesheet" href="/commercial-ui-fallback.css" />
      </head>
      <body className={dmSans.className}>
        <LocaleDocument>
          <AppShell>{children}</AppShell>
        </LocaleDocument>
      </body>
    </html>
  );
}
