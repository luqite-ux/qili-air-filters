import type { Metadata, Viewport } from 'next'
import { Manrope, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { MotionRoot } from '@/components/motion/motion-root'
import { site } from '@/lib/site'
import './globals.css'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' })
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Qili Air Filters | Air filters and filter media manufacturer in Kunshan, China',
    template: '%s | Qili Air Filters',
  },
  description:
    'Qili Air Filters, by Suzhou Qili Environmental Protection Technology Co., Ltd., manufactures pre-filters, bag filters, HEPA filters, chemical filters and filter media in Kunshan, China. Request a quote.',
  applicationName: 'Qili Air Filters',
  openGraph: {
    type: 'website',
    siteName: 'Qili Air Filters',
    title: 'Qili Air Filters',
    description: 'Air filters and filter media made to your dimensions, media and frame.',
    url: site.url,
  },
}

export const viewport: Viewport = {
  themeColor: '#f4f9fb',
  width: 'device-width',
  initialScale: 1,
}

const motionMarker = `(function(){var d=document.documentElement;try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){d.setAttribute('data-motion-ready','true');setTimeout(function(){if(!d.hasAttribute('data-motion-hydrated'))d.removeAttribute('data-motion-ready')},6000)}}catch(e){}})();`

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.legalName,
  alternateName: site.displayName,
  url: site.url,
  logo: `${site.url}/images/brand/qili-logo.jpg`,
  email: site.email,
  telephone: '+86 135 8429 5396',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No. 688 Huangpujiang North Road, Zhoushi Town',
    addressLocality: 'Kunshan',
    addressRegion: 'Jiangsu',
    addressCountry: 'CN',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionMarker }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MotionRoot />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
