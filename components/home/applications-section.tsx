import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/layout/section-heading'
import { type ApplicationGroup, type ApplicationView } from '@/lib/repositories/applications'
import type { CategoryView } from '@/lib/repositories/products'

export function ApplicationsSection({ applications, categories, groups: groupLabels }: { applications: ApplicationView[]; categories: CategoryView[]; groups: Record<ApplicationGroup, { title: string; blurb: string }> }) {
  const byCategory = new Map(categories.map((c) => [c.slug, c]))
  const groups = Object.keys(groupLabels) as ApplicationGroup[]

  return (
    <section aria-labelledby="applications-title" className="section-pad">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Application sectors" title={<span id="applications-title">Fields where these filters are applied</span>}>
            Applicable fields and the product paths that usually serve them. Each link opens the matching product family.
          </SectionHeading>
          <Reveal variant="fade">
            <Link href="/applications" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary hover:underline">
              All applications <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-x-16 gap-y-12 lg:grid-cols-2">
          {groups.map((g, gi) => {
            const items = applications.filter((a) => a.group === g)
            return (
              <Reveal key={g} index={gi} as="div">
                <h3 className="text-xl font-extrabold">{groupLabels[g].title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{groupLabels[g].blurb}</p>
                <ul className="mt-5 border-t border-border">
                  {items.map((a, i) => (
                    <Reveal as="li" key={a.slug} index={i} className="border-b border-border py-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                        <Link href={`/applications/${a.slug}`} className="inline-flex min-h-11 items-center font-bold hover:text-primary">
                          {a.name}
                        </Link>
                        <ul className="flex flex-wrap gap-1.5">
                          {a.categorySlugs.slice(0, 3).map((slug) => {
                            const c = byCategory.get(slug)
                            return c ? (
                              <li key={slug}>
                                <Link href={`/products?category=${slug}`} className="inline-flex min-h-8 items-center rounded-sm bg-mist px-2.5 text-xs font-medium text-air-ink hover:bg-mist-deep">
                                  {c.name}
                                </Link>
                              </li>
                            ) : null
                          })}
                        </ul>
                      </div>
                    </Reveal>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
