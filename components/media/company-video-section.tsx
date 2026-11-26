import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/layout/section-heading'
import { CompanyVideoPlayer } from './company-video-player'

export const COMPANY_PROMO_VIDEO = {
  src: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/tenants/qili-air-filters/videos/aa5dec8c5706733d645d.mp4',
  poster: 'https://pub-c7a22068052144a5805830c30d280128.r2.dev/tenants/qili-air-filters/videos/1cdabb41416ed5b0533d.jpg',
  title: 'Suzhou Qili Environmental Protection Technology company film',
  durationLabel: '01:41',
} as const

const filmHighlights = [
  {
    step: '01',
    title: 'Integrated Kunshan campus',
    text: 'Overview of our manufacturing base covering ~3,000 m² across 7 dedicated production workshops.',
  },
  {
    step: '02',
    title: 'Complete filtration product range',
    text: 'Air filter media, primary and medium efficiency filters, HEPA units, chemical filters, and humidifier pads.',
  },
  {
    step: '03',
    title: 'In-house production lines',
    text: 'Media pleating, ultrasonic bag welding, frame forming, and finished filter assembly under one roof.',
  },
] as const

export function CompanyVideoSection({
  id = 'company-film',
  className = 'section-pad border-b border-border bg-background',
}: {
  id?: string
  className?: string
}) {
  const titleId = `${id}-title`

  return (
    <section id={id} aria-labelledby={titleId} className={className}>
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Company film"
            title={<span id={titleId}>Inside our filtration manufacturing base</span>}
          >
            Watch a concise tour of Suzhou Qili Environmental Protection Technology—from raw filter media processing to finished industrial and cleanroom air filters.
          </SectionHeading>
          <Reveal variant="fade">
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              Request factory quotation <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-12 lg:items-center lg:gap-12">
          <Reveal variant="fade" className="lg:col-span-8">
            <CompanyVideoPlayer
              src={COMPANY_PROMO_VIDEO.src}
              poster={COMPANY_PROMO_VIDEO.poster}
              title={COMPANY_PROMO_VIDEO.title}
              durationLabel={COMPANY_PROMO_VIDEO.durationLabel}
            />
          </Reveal>

          <div className="lg:col-span-4">
            <ul className="divide-y divide-border border-y border-border">
              {filmHighlights.map((item, i) => (
                <Reveal as="li" key={item.step} index={i} className="py-5">
                  <span className="font-mono text-xs text-air-ink">{item.step}</span>
                  <h3 className="mt-1.5 text-base font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
