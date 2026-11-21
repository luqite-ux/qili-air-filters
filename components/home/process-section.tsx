import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/layout/section-heading'
import type { HomeContent } from '@/lib/content/home'

export function ProcessSection({ steps }: { steps: HomeContent['process'] }) {
  return (
    <section aria-labelledby="process-title" className="section-pad">
      <div className="container-x">
        <SectionHeading eyebrow="Custom cooperation" title={<span id="process-title">From requirement to delivery in five steps</span>}>
          A clear sequence keeps specification, sample and production aligned.
        </SectionHeading>

        <ol className="relative mt-14 grid gap-10 lg:grid-cols-5 lg:gap-6">
          <Reveal variant="line" aria-hidden className="absolute left-0 right-0 top-[1.15rem] hidden h-px bg-border lg:block" />
          <Reveal variant="line-y" aria-hidden className="absolute bottom-2 left-[1.15rem] top-2 w-px bg-border lg:hidden" />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} index={i} className="relative pl-14 lg:pl-0 lg:pt-14">
              <span className="absolute left-0 top-0 grid size-10 place-items-center rounded-full border border-air bg-background font-mono text-sm font-bold text-air-ink">{i + 1}</span>
              <h3 className="text-lg font-extrabold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
