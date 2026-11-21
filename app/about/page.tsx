import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero } from '@/components/layout/page-hero'
import { CtaBand } from '@/components/layout/cta-band'
import { Reveal } from '@/components/motion/reveal'
import { getCategories } from '@/lib/repositories/products'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About Qili',
  description: `${site.legalName} makes air filters and filter media in Kunshan, Jiangsu, China.`,
  alternates: { canonical: '/about' },
}

export default async function AboutPage() {
  const categories = await getCategories()

  return (
    <>
      <PageHero
        eyebrow="About"
        title="Air filters and filter media, made in Kunshan"
        lead={`${site.legalName} designs and manufactures air filters and filter media for buyers who need specific dimensions, media and frames.`}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      <section className="container-x grid gap-12 py-14 lg:grid-cols-12 lg:py-20" aria-labelledby="company">
        <Reveal className="lg:col-span-6">
          <h2 id="company" className="text-3xl font-extrabold sm:text-4xl">
            One company, media to finished unit
          </h2>
          <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Qili works across the filter chain: pre-filters, medium-efficiency bag filters, HEPA filters, chemical, high-temperature and oil-mist filters, activated-carbon filters, air-filter media, filter cotton, household and commercial HEPA filters, humidifier pads and high-efficiency filter units.
            </p>
            <p>That range lets us match media and structure to one requirement instead of selling a fixed catalogue. Buyers send dimensions, a drawing or a sample, and we plan the build with them.</p>
          </div>
          <dl className="mt-8 divide-y divide-border border-y border-border">
            <div className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="text-sm font-semibold text-muted-foreground">Company</dt>
              <dd className="text-sm">
                {site.legalName}
                <span lang="zh-CN" className="block text-muted-foreground">
                  {site.legalNameZh}
                </span>
              </dd>
            </div>
            <div className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="text-sm font-semibold text-muted-foreground">Registered address</dt>
              <dd className="text-sm">{site.address}</dd>
            </div>
            <div className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="text-sm font-semibold text-muted-foreground">Production base</dt>
              <dd className="text-sm">Approximately 3,000 m², seven workshops</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal variant="mask" className="lg:col-span-6">
          <figure>
            <div className="overflow-hidden rounded-lg border border-border">
              <Image src="/images/facility/park-entrance.jpg" alt="Entrance gate and office tower of the industrial park where Qili is based" width={1706} height={1279} sizes="(min-width:1024px) 46vw, 92vw" className="aspect-[4/3] h-auto w-full object-cover" />
            </div>
            <figcaption className="mt-3 text-sm text-muted-foreground">Park entrance, Zhoushi Town, Kunshan</figcaption>
          </figure>
        </Reveal>
      </section>

      <section className="border-y border-border bg-mist/60 py-14 lg:py-20" aria-labelledby="scope">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">Product scope</p>
            <h2 id="scope" className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">
              What we make
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
        <CtaBand title="Talk to the team" text="Send your requirement and we will reply to your business email." />
      </div>
    </>
  )
}
