import type { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'
import { Manrope, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { MotionRoot } from '@/components/motion/motion-root'
import { site } from '@/lib/site'
import { PREVIEW_COOKIE } from '@/lib/site-content/site-content'
import { previewUiState } from '@/lib/site-content/preview-ui.mjs'
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

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const preview = Boolean((await cookies()).get(PREVIEW_COOKIE)?.value)
  const previewUi = previewUiState(preview, process.env.NODE_ENV === 'production')

  return (
    <html lang="en" className={`${manrope.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionMarker }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      </head>
      <body>
        {previewUi.showPreviewBar && (
          <aside className="sticky top-0 z-[110] flex items-center justify-center gap-4 bg-slate-950 px-4 py-2 text-sm text-white" aria-label="Content preview mode">
            <span>You are previewing unpublished content.</span>
            <form action="/api/site-content/exit-preview" method="post">
              <button type="submit" className="rounded-sm border border-white/50 px-3 py-1 font-semibold hover:bg-white hover:text-slate-950">
                Exit preview
              </button>
            </form>
          </aside>
        )}
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
        {previewUi.showAnalytics && <Analytics />}
        <script
          async
          src={`https://admin.globle-trade.com/api/public/analytics.js?tenantId=${encodeURIComponent(process.env.NEXT_PUBLIC_TENANT_ID || "967a7fc2-7c38-49a9-a629-86cb7e5c8445")}`}
        />
      </body>
    </html>
  )
}
