import { Plus } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/layout/section-heading'
import type { HomeContent } from '@/lib/content/home'

export function FaqSection({ groups }: { groups: HomeContent['faq'] }) {
  return (
    <section aria-labelledby="faq-title" className="section-pad">
      <div className="container-x">
        <SectionHeading eyebrow="Buyer FAQ" title={<span id="faq-title">Questions buyers ask before they inquire</span>} />
        <div className="mt-12 divide-y divide-border border-y border-border">
          {groups.map((g, gi) => (
            <div key={g.group} className="grid gap-4 py-8 lg:grid-cols-12 lg:gap-12">
              <Reveal index={gi} className="lg:col-span-4">
                <h3 className="text-lg font-extrabold">{g.group}</h3>
              </Reveal>
              <div className="lg:col-span-8">
                {g.items.map((item, i) => (
                  <Reveal key={item.q} index={i} className="border-b border-border last:border-b-0">
                    <details className="group">
                      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-6 py-3 font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
                        {item.q}
                        <Plus className="size-4 shrink-0 text-primary transition-transform group-open:rotate-45" aria-hidden />
                      </summary>
                      <p className="max-w-2xl pb-5 leading-relaxed text-muted-foreground">{item.a}</p>
                    </details>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
