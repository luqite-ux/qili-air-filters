import type { Metadata } from 'next'
import { HeroCarousel } from '@/components/home/hero-carousel'
import { ProductFamilies } from '@/components/home/product-families'
import { SelectionPath } from '@/components/home/selection-path'
import { AirflowSection } from '@/components/home/airflow-section'
import { ManufacturingSection } from '@/components/home/manufacturing-section'
import { ApplicationsSection } from '@/components/home/applications-section'
import { CertificationsSection } from '@/components/home/certifications-section'
import { ProcessSection } from '@/components/home/process-section'
import { LeadTimeSection } from '@/components/home/lead-time-section'
import { FaqSection } from '@/components/home/faq-section'
import { RfqSection } from '@/components/home/rfq-section'
import { getHomeContent } from '@/lib/content/home'
import { getApplications } from '@/lib/repositories/applications'
import { getCategories, getProducts } from '@/lib/repositories/products'
import { DEFAULT_LOCALE } from '@/lib/i18n'
import { getSiteContent } from '@/lib/site-content/site-content'
import { siteContentMetadata } from '@/lib/site-content/site-content'
import { baseHomeMetadata, mergeHomeMetadata } from './home-metadata.mjs'

export async function generateMetadata(): Promise<Metadata> {
  const managed = process.env.SITE_CONTENT_INTEGRATION_KEY ? await siteContentMetadata('/', DEFAULT_LOCALE) : {}
  return mergeHomeMetadata(baseHomeMetadata, managed)
}

export default async function HomePage() {
  const locale = DEFAULT_LOCALE
  const [content, categories, products, applications, snapshot] = await Promise.all([
    getHomeContent(locale),
    getCategories(locale),
    getProducts(locale),
    getApplications(locale),
    process.env.SITE_CONTENT_INTEGRATION_KEY ? getSiteContent(locale) : null,
  ])

  return (
    <div className="contents" {...(snapshot?.version ? { 'data-hq-content-version': snapshot.version } : {})}>
      <HeroCarousel slides={content.slides} />
      <ProductFamilies categories={categories} products={products} />
      <SelectionPath steps={content.selection} />
      <AirflowSection layers={content.airflowLayers} />
      <ManufacturingSection equipment={content.equipment} />
      <ApplicationsSection applications={applications} categories={categories} />
      <CertificationsSection certifications={content.certifications} />
      <ProcessSection steps={content.process} />
      <LeadTimeSection items={content.leadTimes} />
      <FaqSection groups={content.faq} />
      <RfqSection />
    </div>
  )
}
