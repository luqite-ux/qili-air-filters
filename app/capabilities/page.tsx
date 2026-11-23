import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero } from '@/components/layout/page-hero'
import { CtaBand } from '@/components/layout/cta-band'
import { Reveal } from '@/components/motion/reveal'
import { getSiteContent } from '@/lib/site-content/site-content'
import { getCapabilitiesCopy } from '@/lib/repositories/capabilities-copy'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getCapabilitiesCopy()
  return { title: copy.seoTitle, description: copy.seoDescription, alternates: { canonical: '/capabilities' } }
}

export default async function CapabilitiesPage() {
  const snapshot = await getSiteContent('en')
  const copy = await getCapabilitiesCopy()
  const modules = snapshot?.pages.find(page => page.key === 'capabilities')?.modules
  const equipment = modules?.find(module => module.key === 'equipment')?.values.items as Array<{title:string;items:Array<{description:string}>}> | undefined
  if (!equipment?.length) throw new Error('Published equipment list missing')
  const equipmentGroups = equipment.map(group => ({title:group.title,items:group.items.map(item=>item.description)}))
  const overview = modules?.find(module => module.key === 'overview')?.values as {lead:string;area:string;workshops:string} | undefined
  if (!overview?.lead || !overview.area || !overview.workshops) throw new Error('Published capabilities overview missing')
  const galleryModule = snapshot?.pages.find(page => page.key === 'capabilities')?.modules.find(module => module.key === 'gallery')
  const items = galleryModule?.values.items as Array<{ id: string; image: { url: string; alt: string }; caption: string; group: string }> | undefined
  if (!items?.length) throw new Error('Published facility gallery missing')
  const gallery = items.map(item => ({ src: item.image.url, alt: item.image.alt, caption: item.caption, group: item.group }))
  const groups = [...new Set(gallery.map(item => item.group))]
  return (
    <>
      <PageHero
        eyebrow={copy.heroEyebrow}
        title={copy.heroTitle}
        lead={overview.lead}
        crumbs={[{ label: 'Home', href: '/' }, { label: copy.heroEyebrow }]}
        aside={
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">
            <div className="bg-white p-5">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{copy.floorAreaLabel}</dt>
              <dd className="mt-1 text-2xl font-extrabold">{overview.area}</dd>
            </div>
            <div className="bg-white p-5">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{copy.workshopsLabel}</dt>
              <dd className="mt-1 text-2xl font-extrabold">{overview.workshops}</dd>
            </div>
          </dl>
        }
      />

      <section className="container-x py-14 lg:py-20" aria-labelledby="flow">
        <Reveal>
          <p className="eyebrow">{copy.flowEyebrow}</p>
          <h2 id="flow" className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">
            {copy.flowTitle}
          </h2>
        </Reveal>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
          {copy.stages.map((s, i) => (
            <Reveal as="li" key={s.title} index={i} className="bg-white p-6">
              <span className="text-sm font-bold text-air-ink">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="border-y border-border bg-mist/60 py-14 lg:py-20" aria-labelledby="equipment">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">{copy.equipmentEyebrow}</p>
            <h2 id="equipment" className="mt-3 text-3xl font-extrabold sm:text-4xl">
              {copy.equipmentTitle}
            </h2>
            <p className="mt-4 text-muted-foreground">{copy.equipmentLead}</p>
          </Reveal>
          <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:col-span-8">
            {equipmentGroups.map((group, i) => (
              <Reveal as="li" key={group.title} index={i} className="bg-white p-5">
                <h3 className="font-bold">{group.title}</h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x py-14 lg:py-20" aria-labelledby="site" data-hq-content-version={galleryModule ? snapshot?.version : undefined}>
        <Reveal>
          <p className="eyebrow">{copy.galleryEyebrow}</p>
          <h2 id="site" className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">
            {copy.galleryTitle}
          </h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">{copy.galleryLead}</p>
        </Reveal>
        <div className="mt-10 space-y-6">
        {groups.map((group, groupIndex) => (
          <details key={group} open={groupIndex === 0} className="group border-b border-border pb-6">
          <summary className="cursor-pointer py-3 text-xl font-bold">{group} <span className="ml-2 text-sm font-normal text-muted-foreground">{copy.galleryExpandLabel}</span></summary>
          <ul className="mt-6 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {gallery.filter(item => item.group === group).map((f) => (
            <Reveal as="li" key={f.src} className="mb-6 break-inside-avoid">
              <figure>
                <div className="overflow-hidden rounded-lg border border-border">
                  <Image src={f.src} alt={f.alt} width={1800} height={1200} sizes="(min-width:1024px) 30vw, (min-width:640px) 46vw, 92vw" className="h-auto w-full" />
                </div>
                <figcaption className="mt-3 text-sm text-muted-foreground">{f.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
          </ul>
          </details>
        ))}
        </div>
      </section>

      <CtaBand title={copy.ctaTitle} text={copy.ctaText} />
    </>
  )
}
