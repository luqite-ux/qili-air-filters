import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/layout/page-hero'
import { CtaBand } from '@/components/layout/cta-band'
import { Reveal } from '@/components/motion/reveal'
import { getApplicationPresentation, getApplications, type ApplicationGroup } from '@/lib/repositories/applications'
import { getCategories } from '@/lib/repositories/products'

export const metadata: Metadata = {
  title: 'Applications',
  description: 'Air filter and filter media paths for microelectronics, semiconductors, laboratories, pharmaceuticals, food, hospitals, HVAC and agricultural ventilation.',
  alternates: { canonical: '/applications' },
}

const groupOrder: ApplicationGroup[] = ['precision', 'life-science', 'industrial', 'building']

export default async function ApplicationsPage() {
  const [applications, categories, copy] = await Promise.all([getApplications(), getCategories(), getApplicationPresentation()])

  return (
    <>
      <PageHero
        eyebrow="Applications"
        title={copy.heroTitle}
        lead={copy.heroLead}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Applications' }]}
      />

      <div className="container-x space-y-16 py-14 lg:space-y-20 lg:py-20">
        {groupOrder.map((group, gi) => {
          const items = applications.filter((a) => a.group === group)
          if (!items.length) return null
          const label = copy.groups[group]
          return (
            <section key={group} className="grid gap-8 lg:grid-cols-12 lg:gap-12" aria-labelledby={`group-${group}`}>
              <Reveal className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
                <p className="eyebrow">{String(gi + 1).padStart(2, '0')}</p>
                <h2 id={`group-${group}`} className="mt-3 text-2xl font-extrabold sm:text-3xl">
                  {label.title}
                </h2>
                <p className="mt-3 text-muted-foreground">{label.blurb}</p>
              </Reveal>
              <ul className="divide-y divide-border border-y border-border lg:col-span-8">
                {items.map((a, i) => (
                  <Reveal as="li" key={a.slug} index={i}>
                    <Link href={`/applications/${a.slug}`} className="group grid min-h-11 gap-3 py-6 sm:grid-cols-[1fr_auto] sm:gap-8">
                      <span>
                        <span className="block text-lg font-bold group-hover:text-primary">{a.name}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{a.summary}</span>
                        <span className="mt-3 flex flex-wrap gap-2">
                          {a.categorySlugs.map((s) => (
                            <span key={s} className="rounded-sm bg-mist px-2.5 py-1 text-xs font-semibold">
                              {categories.find((c) => c.slug === s)?.name ?? s}
                            </span>
                          ))}
                        </span>
                      </span>
                      <ArrowRight className="size-5 self-center text-primary transition-transform group-hover:translate-x-1" aria-hidden />
                    </Link>
                  </Reveal>
                ))}
              </ul>
            </section>
          )
        })}
      </div>

      <CtaBand title={copy.ctaTitle} text={copy.ctaText} />
    </>
  )
}
