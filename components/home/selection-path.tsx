import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/layout/section-heading'
import type { HomeContent } from '@/lib/content/home'

export function SelectionPath({ steps }: { steps: HomeContent['selection'] }) {
  return (
    <section aria-labelledby="selection-title" className="section-pad mist-wash">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading eyebrow="Selection path" title={<span id="selection-title">Choose from four facts about your air</span>}>
              You do not need a part number. Four pieces of information let us propose a filter stage, media and frame.
            </SectionHeading>
            <Reveal delay={240} className="mt-8">
              <Link href="/contact" className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-primary px-6 text-sm font-bold text-primary-foreground hover:bg-primary/90">
                Send your conditions <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Reveal>
          </div>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:col-span-8">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} index={i} variant="scale" className="flex flex-col bg-background p-7 sm:p-9">
              <span className="font-mono text-sm text-air-ink">0{i + 1}</span>
              <p className="mt-6 text-2xl font-extrabold leading-tight sm:text-[1.7rem]">{s.question}</p>
              <h3 className="mt-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">{s.title}</h3>
              <p className="mt-3 text-muted-foreground">{s.text}</p>
              <p className="mt-auto pt-6 text-sm font-medium text-foreground/80">
                <span className="mb-3 block h-px w-10 bg-air" aria-hidden />
                {s.hint}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
