import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero } from '@/components/layout/page-hero'
import { CtaBand } from '@/components/layout/cta-band'
import { CompanyVideoSection } from '@/components/media/company-video-section'
import { Reveal } from '@/components/motion/reveal'
import { getCategories } from '@/lib/repositories/products'
import { getPublishedSiteSettings } from '@/lib/site-settings'
import { getAboutCopy } from '@/lib/repositories/about-copy'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const [copy, settings] = await Promise.all([getAboutCopy(), getPublishedSiteSettings()])
  return { title: copy.seoTitle, description: `${settings.legalName} ${copy.seoDescriptionSuffix}`, alternates: { canonical: '/about' } }
}

export default async function AboutPage() {
  const categories = await getCategories()
  const site = await getPublishedSiteSettings()
  const copy = await getAboutCopy()

  return (
    <>
      <PageHero
        eyebrow={copy.heroEyebrow}
        title={copy.heroTitle}
        lead={`${site.legalName} ${copy.heroLeadSuffix}`}
        crumbs={[{ label: 'Home', href: '/' }, { label: copy.heroEyebrow }]}
      />

      <section className="container-x grid gap-12 py-14 lg:grid-cols-12 lg:py-20" aria-labelledby="company">
        <Reveal className="lg:col-span-6">
          <h2 id="company" className="text-3xl font-extrabold sm:text-4xl">
            {copy.companyTitle}
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              {copy.companyParagraph1}
            </p>
            <p>{copy.companyParagraph2}</p>
          </div>
          <dl className="mt-8 divide-y divide-border border-y border-border">
            <div className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="text-sm font-semibold text-muted-foreground">{copy.brandLabel}</dt>
              <dd className="text-sm" lang="zh-CN">{site.brand}</dd>
            </div>
            <div className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="text-sm font-semibold text-muted-foreground">{copy.companyLabel}</dt>
              <dd className="text-sm">
                {site.legalName}
                <span lang="zh-CN" className="block text-muted-foreground">
                  {site.legalNameZh}
                </span>
              </dd>
            </div>
            <div className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="text-sm font-semibold text-muted-foreground">{copy.addressLabel}</dt>
              <dd className="text-sm">{site.address}</dd>
            </div>
            <div className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="text-sm font-semibold text-muted-foreground">{copy.productionLabel}</dt>
              <dd className="text-sm">{copy.productionValue}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal variant="mask" className="lg:col-span-6">
          <figure>
            <div className="overflow-hidden rounded-lg border border-border">
              <Image src={copy.image.url} alt={copy.image.alt} width={1706} height={1279} sizes="(min-width:1024px) 46vw, 92vw" className="aspect-[4/3] h-auto w-full object-cover" />
            </div>
            <figcaption className="mt-3 text-sm text-muted-foreground">{copy.imageCaption}</figcaption>
          </figure>
        </Reveal>
      </section>

      <CompanyVideoSection id="about-company-film" className="border-t border-border bg-background py-14 lg:py-20" />

      <section className="border-y border-border bg-mist/60 py-14 lg:py-20" aria-labelledby="scope">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">{copy.scopeEyebrow}</p>
            <h2 id="scope" className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">
              {copy.scopeTitle}
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal as="li" key={c.slug} index={i} className="border-t border-border py-4 font-semibold">
                {c.name}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <div className="pt-16 lg:pt-20">
        <CtaBand title={copy.ctaTitle} text={copy.ctaText} />
      </div>
    </>
  )
}
