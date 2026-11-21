import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero } from '@/components/layout/page-hero'
import { CtaBand } from '@/components/layout/cta-band'
import { Reveal } from '@/components/motion/reveal'
import { getHomeContent } from '@/lib/content/home'
import { DEFAULT_LOCALE } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Manufacturing and Equipment',
  description: 'Filter media, pleating, bag filter, frame, gluing, welding and assembly capability at the Qili production base in Kunshan, Jiangsu.',
  alternates: { canonical: '/capabilities' },
}

const facility = [
  { src: '/images/facility/workshop-building.jpg', alt: 'Production building in the Kunshan industrial park under a clear sky', caption: 'Production building' },
  { src: '/images/facility/park-street.jpg', alt: 'Street between production buildings in the Kunshan industrial park', caption: 'Park street between buildings' },
  { src: '/images/facility/park-entrance.jpg', alt: 'Entrance gate and office tower of the industrial park', caption: 'Park entrance' },
]

const stages = [
  { title: 'Media', text: 'Meltblown and nonwoven lines for filter media and filter cotton.' },
  { title: 'Forming', text: 'Pleating and bag-making for panel, bag and V-bank structures.' },
  { title: 'Framing', text: 'Frame making, gluing and welding for the frame and media you specify.' },
  { title: 'Assembly', text: 'Final assembly into filters and high-efficiency filter units.' },
]

export default async function CapabilitiesPage() {
  const content = await getHomeContent(DEFAULT_LOCALE)

  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="From filter media to finished filter, under one roof"
        lead="Our Kunshan base covers approximately 3,000 m² across seven workshops, so media, forming, framing and assembly stay close together."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Capabilities' }]}
        aside={
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">
            <div className="bg-white p-5">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Floor area</dt>
              <dd className="mt-1 text-2xl font-extrabold">~3,000 m²</dd>
            </div>
            <div className="bg-white p-5">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Workshops</dt>
              <dd className="mt-1 text-2xl font-extrabold">7</dd>
            </div>
          </dl>
        }
      />

      <section className="container-x py-14 lg:py-20" aria-labelledby="flow">
        <Reveal>
          <p className="eyebrow">Production flow</p>
          <h2 id="flow" className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Four stages, one route
          </h2>
        </Reveal>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
          {stages.map((s, i) => (
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
            <p className="eyebrow">Equipment</p>
            <h2 id="equipment" className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Listed equipment
            </h2>
            <p className="mt-4 text-muted-foreground">Equipment types in use across the workshops. Quantities and specifications are shared with you during project discussion.</p>
          </Reveal>
          <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:col-span-8">
            {content.equipment.map((e, i) => (
              <Reveal as="li" key={e.title} index={i} className="bg-white p-5">
                <h3 className="font-bold">{e.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{e.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x py-14 lg:py-20" aria-labelledby="site">
        <Reveal>
          <p className="eyebrow">The site</p>
          <h2 id="site" className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">
            Zhoushi Town, Kunshan
          </h2>
        </Reveal>
        <ul className="mt-10 grid gap-6 md:grid-cols-12">
          {facility.map((f, i) => (
            <li key={f.src} className={i === 0 ? 'md:col-span-7' : 'md:col-span-5'}>
              <Reveal variant="mask" delay={i * 80}>
                <figure>
                  <div className="overflow-hidden rounded-lg border border-border">
                    <Image src={f.src} alt={f.alt} width={1706} height={1279} sizes={i === 0 ? '(min-width:768px) 58vw, 92vw' : '(min-width:768px) 40vw, 92vw'} className="aspect-[4/3] h-auto w-full object-cover" />
                  </div>
                  <figcaption className="mt-3 text-sm text-muted-foreground">{f.caption}</figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand title="Send a drawing or sample" text="Share dimensions, media and frame requirements. We will plan the build with you." />
    </>
  )
}
