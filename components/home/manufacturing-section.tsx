import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/layout/section-heading'
import type { HomeContent } from '@/lib/content/home'

export const facilityImages = [
  { src: '/images/facility/production/pleating-line.jpg', alt: 'Filter media pleating line', caption: 'Media pleating' },
  { src: '/images/facility/production/bag-filter-assembly.jpg', alt: 'Bag filter assembly work area', caption: 'Bag filter assembly' },
  { src: '/images/facility/production/frame-forming.jpg', alt: 'Filter frame forming equipment', caption: 'Frame forming' },
]

export function ManufacturingSection({ equipment }: { equipment: HomeContent['equipment'] }) {
  return (
    <section aria-labelledby="manufacturing-title" className="section-pad bg-mist">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Manufacturing and equipment" title={<span id="manufacturing-title">Media, pleating, framing and assembly in one place</span>}>
              Our site in Kunshan covers roughly 3,000 m² across seven workshops, so media and finished filters are made under one roof.
            </SectionHeading>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8">
              <Reveal>
                <dt className="eyebrow">Site area</dt>
                <dd className="mt-2 text-4xl font-extrabold">≈3,000 m²</dd>
              </Reveal>
              <Reveal delay={90}>
                <dt className="eyebrow">Workshops</dt>
                <dd className="mt-2 text-4xl font-extrabold">7</dd>
              </Reveal>
            </dl>
            <Reveal delay={180} className="mt-8">
              <Link href="/capabilities" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary hover:underline">
                Manufacturing capabilities <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-4 self-start lg:col-span-7">
            {facilityImages.map((img, i) => (
              <figure key={img.src} className={i === 0 ? 'col-span-2' : ''}>
                <Reveal variant="fade" delay={i * 120} className="overflow-hidden rounded-lg">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={1706}
                    height={1279}
                    sizes={i === 0 ? '(min-width:1024px) 55vw, 100vw' : '(min-width:1024px) 27vw, 50vw'}
                    className={i === 0 ? 'aspect-[16/9] w-full object-cover' : 'aspect-[4/3] w-full object-cover'}
                  />
                </Reveal>
                <figcaption className="mt-2 text-xs text-muted-foreground">{img.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <ul className="mt-16 grid gap-x-8 border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {equipment.map((e, i) => (
            <Reveal as="li" key={e.title} index={i} className="border-b border-border py-6">
              <span className="font-mono text-xs text-air-ink">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 font-bold">{e.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{e.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
