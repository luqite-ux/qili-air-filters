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
import { getCategories } from '@/lib/repositories/products'
import { DEFAULT_LOCALE } from '@/lib/i18n'

export default async function HomePage() {
  const locale = DEFAULT_LOCALE
  const [content, categories, applications] = await Promise.all([getHomeContent(locale), getCategories(locale), getApplications(locale)])

  return (
    <>
      <HeroCarousel slides={content.slides} />
      <ProductFamilies categories={categories} />
      <SelectionPath steps={content.selection} />
      <AirflowSection layers={content.airflowLayers} />
      <ManufacturingSection equipment={content.equipment} />
      <ApplicationsSection applications={applications} categories={categories} />
      <CertificationsSection certifications={content.certifications} />
      <ProcessSection steps={content.process} />
      <LeadTimeSection items={content.leadTimes} />
      <FaqSection groups={content.faq} />
      <RfqSection />
    </>
  )
}
