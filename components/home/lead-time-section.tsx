import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/layout/section-heading'
import type { HomeContent } from '@/lib/content/home'

const SCALE_MAX = 30

export function LeadTimeSection({ items }: { items: HomeContent['leadTimes'] }) {
  return (
    <section aria-labelledby="lead-title" className="section-pad bg-mist">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="Lead-time reference" title={<span id="lead-title">Plan your order window</span>}>
            Indicative planning references by product family. Firm timing depends on specification, quantity and order confirmation.
          </SectionHeading>
        </div>

        <div className="layer-sheet rounded-xl p-6 sm:p-10 lg:col-span-8">
          <ul className="flex flex-col gap-9">
            {items.map((item, i) => (
              <Reveal as="li" key={item.id} index={i}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-2xl font-extrabold text-air-ink">{item.window}</p>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
                <div className="relative mt-4 h-3 rounded-full bg-mist-deep/60" role="img" aria-label={`Planning reference of ${item.window}`}>
                  <Reveal
                    variant="line"
                    delay={200}
                    className="absolute inset-y-0 rounded-full bg-gradient-to-r from-air to-primary"
                    style={{ left: `${(item.min / SCALE_MAX) * 100}%`, width: `${((item.max - item.min) / SCALE_MAX) * 100}%` }}
                  />
                </div>
              </Reveal>
            ))}
          </ul>
          <div className="mt-6 flex justify-between font-mono text-xs text-muted-foreground" aria-hidden>
            <span>0 days</span>
            <span>10</span>
            <span>20</span>
            <span>30</span>
          </div>
          <p className="mt-8 border-t border-border pt-5 text-sm text-muted-foreground">
            Reference only. Your quotation states the schedule that applies to your confirmed order.
          </p>
        </div>
      </div>
    </section>
  )
}
