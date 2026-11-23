import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/layout/page-hero'
import { CtaBand } from '@/components/layout/cta-band'
import { CategoryFilter } from '@/components/products/category-filter'
import { ProductCard } from '@/components/products/product-card'
import { Reveal } from '@/components/motion/reveal'
import { getCategories, getProducts } from '@/lib/repositories/products'
import { getProductListingCopy } from '@/lib/repositories/listing-copy'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getProductListingCopy()
  return { title: copy.seo_title, description: copy.seo_description, alternates: { canonical: '/products' } }
}

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams
  const [categories, all, copy] = await Promise.all([getCategories(), getProducts(), getProductListingCopy()])
  const active = categories.find((c) => c.slug === category)
  const products = active ? all.filter((p) => p.categorySlug === active.slug) : all
  const counts = Object.fromEntries(categories.map((c) => [c.slug, all.filter((p) => p.categorySlug === c.slug).length]))

  return (
    <>
      <PageHero
        eyebrow={copy.hero_eyebrow}
        title={active ? active.name : copy.hero_title}
        lead={
          active
            ? active.summary
            : copy.hero_lead
        }
        crumbs={[{ label: 'Home', href: '/' }, { label: copy.hero_eyebrow, href: active ? '/products' : undefined }, ...(active ? [{ label: active.name }] : [])]}
      />

      <section className="container-x py-12 lg:py-16" aria-labelledby="products-list">
        <h2 id="products-list" className="sr-only">
          {copy.list_title}
        </h2>
        <CategoryFilter categories={categories} active={active?.slug} counts={counts} />

        {active?.leadTime && (
          <Reveal className="mt-8 flex flex-col gap-1 rounded-lg border border-border bg-mist p-5 sm:flex-row sm:items-baseline sm:gap-6">
            <p className="text-sm font-bold">{copy.planning_label} {active.leadTime.window}</p>
            <p className="text-sm text-muted-foreground">{active.leadTime.note}</p>
          </Reveal>
        )}

        {products.length > 0 ? (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <li key={product.slug} className="h-full">
                <ProductCard product={product} category={categories.find((c) => c.slug === product.categorySlug)} index={i} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 rounded-lg border border-dashed border-border p-10 text-center">
            <p className="text-lg font-bold">{copy.empty_title}</p>
            <p className="mt-2 text-muted-foreground">{copy.empty_text}</p>
            <Link href="/contact" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-sm bg-primary px-6 text-sm font-bold text-primary-foreground">
              {copy.empty_cta} <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        )}
      </section>

      {!active && (
        <section className="border-t border-border bg-mist/60 py-16 lg:py-20" aria-labelledby="family-guide">
          <div className="container-x">
            <Reveal>
              <p className="eyebrow">{copy.families_eyebrow}</p>
              <h2 id="family-guide" className="mt-3 max-w-2xl text-3xl font-extrabold sm:text-4xl">
                {copy.families_title}
              </h2>
            </Reveal>
            <ul className="mt-10 grid gap-x-10 gap-y-2 md:grid-cols-2">
              {categories.map((c, i) => (
                <Reveal as="li" key={c.slug} index={i} className="border-t border-border">
                  <Link href={`/products?category=${c.slug}`} className="group grid min-h-11 grid-cols-[1fr_auto] items-start gap-4 py-5">
                    <span>
                      <span className="eyebrow block">{c.role}</span>
                      <span className="mt-1 block text-lg font-bold group-hover:text-primary">{c.name}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{c.summary}</span>
                    </span>
                    <ArrowRight className="mt-6 size-4 text-primary transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <div className="pt-16 lg:pt-20">
        <CtaBand title={copy.cta_title} text={copy.cta_text} />
      </div>
    </>
  )
}
