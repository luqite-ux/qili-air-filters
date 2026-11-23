import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import { PageHero } from '@/components/layout/page-hero'
import { ProductVisual } from '@/components/products/product-visual'
import { RfqForm } from '@/components/inquiry/rfq-form'
import { Reveal } from '@/components/motion/reveal'
import { applicationGroupLabels, getApplication, getApplications } from '@/lib/repositories/applications'
import { getCategories } from '@/lib/repositories/products'

type Params = { params: Promise<{ slug: string }> }

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const app = await getApplication(slug)
  if (!app) return {}
  return { title: `${app.name} Air Filters`, description: app.summary, alternates: { canonical: `/applications/${app.slug}` } }
}

export default async function ApplicationPage({ params }: Params) {
  const { slug } = await params
  const app = await getApplication(slug)
  if (!app) notFound()
  const [categories, all] = await Promise.all([getCategories(), getApplications()])
  const paths = app.categorySlugs.map((s) => categories.find((c) => c.slug === s)).filter((c) => !!c)
  const others = all.filter((a) => a.group === app.group && a.slug !== app.slug)

  return (
    <>
      <PageHero
        eyebrow={applicationGroupLabels[app.group].title}
        title={app.name}
        lead={app.summary}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Applications', href: '/applications' }, { label: app.name }]}
      />

      <section className="container-x grid gap-12 py-14 lg:grid-cols-12 lg:py-20" aria-labelledby="app-considerations">
        <Reveal className="lg:col-span-5">
          <h2 id="app-considerations" className="text-2xl font-extrabold sm:text-3xl">
            What to settle first
          </h2>
          <ul className="mt-6 space-y-4">
            {app.considerations.map((c) => (
              <li key={c} className="flex gap-3 leading-relaxed">
                <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
          {others.length > 0 && (
            <div className="mt-10">
              <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Related fields</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/applications/${o.slug}`} className="inline-flex min-h-11 items-center rounded-sm border border-border px-4 text-sm font-semibold hover:bg-mist">
                      {o.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="text-2xl font-extrabold sm:text-3xl">Product paths</h2>
            <p className="mt-2 text-muted-foreground">Families to start from for this field.</p>
          </Reveal>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {paths.map((c, i) => (
              <Reveal as="li" key={c.slug} index={i} className="h-full">
                <Link href={`/products?category=${c.slug}`} className="lift group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card">
                  <ProductVisual image={c.image} kind={c.visual} sizes="(min-width:1024px) 22vw, (min-width:640px) 40vw, 92vw" className="border-b border-border" />
                  <span className="flex flex-1 flex-col p-5">
                    <span className="eyebrow">{c.role}</span>
                    <span className="mt-1 text-base font-bold">{c.name}</span>
                    <span className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-bold text-primary">
                      View family <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-mist/60 py-16 lg:py-20" aria-labelledby="app-rfq">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow">Request a Quote</p>
            <h2 id="app-rfq" className="mt-3 max-w-3xl text-3xl font-extrabold sm:text-4xl">
              Filters for {app.name.toLowerCase()}
            </h2>
          </Reveal>
          <div className="mt-8">
            <RfqForm captchaScope={`application-${app.slug}`} sourcePath={`/applications/${app.slug}`} defaultApplication={app.name} />
          </div>
        </div>
      </section>
    </>
  )
}
