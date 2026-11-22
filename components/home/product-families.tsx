import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/layout/section-heading'
import { ProductVisual } from '@/components/products/product-visual'
import type { CategoryView, ProductView } from '@/lib/repositories/products'

export function ProductFamilies({ categories, products }: { categories: CategoryView[]; products: ProductView[] }) {
  const firstProductByCategory = new Map<string, ProductView>()
  for (const product of products) {
    if (!firstProductByCategory.has(product.categorySlug)) firstProductByCategory.set(product.categorySlug, product)
  }
  const featured = categories.slice(0, 6).map((category) => {
    const product = firstProductByCategory.get(category.slug)
    const image = category.slug === 'medium-efficiency-bag-filter-roll-media' ? undefined : category.image ?? product?.images[0]
    return {
      ...category,
      image,
      summary: product?.summary || category.summary,
    }
  })
  const rest = categories.slice(6)

  return (
    <section aria-labelledby="families-title" className="section-pad">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Product families" title={<span id="families-title">Know the grade, the structure and the media</span>}>
            Each family has a place in the filtration train. Start with the stage you need, then narrow by structure and media.
          </SectionHeading>
          <Reveal variant="fade">
            <Link href="/products" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary hover:underline">
              All product families <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c, i) => (
            <Reveal as="li" key={c.slug} index={i}>
              <Link href={`/products?category=${c.slug}`} className="lift group flex h-full overflow-hidden rounded-lg border border-border bg-card sm:flex-col">
                <ProductVisual image={c.image} kind={c.visual} sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 112px" className="w-28 shrink-0 border-r border-border sm:aspect-[16/9] sm:w-full sm:border-b sm:border-r-0" />
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <p className="eyebrow">{c.role}</p>
                  <h3 className="mt-2 font-bold leading-snug">{c.name}</h3>
                  <p className="mt-2 hidden flex-1 text-sm leading-relaxed text-muted-foreground sm:block">{c.summary}</p>
                  <span className="mt-3 inline-flex min-h-11 items-center gap-1 text-sm font-bold text-primary">
                    Explore <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

        <div className="mt-12 flex items-end justify-between gap-6 border-b border-border pb-4">
          <div>
            <p className="eyebrow">More product families</p>
            <h3 className="mt-2 text-xl font-bold">Browse by media and construction</h3>
          </div>
          <span className="hidden text-sm text-muted-foreground sm:block">Select a family to view matching products</span>
        </div>

        <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((c, i) => (
            <Reveal as="li" key={c.slug} index={i} className="border-b border-border">
              <Link href={`/products?category=${c.slug}`} className="group flex min-h-11 items-start justify-between gap-4 py-5">
                <span>
                  <span className="eyebrow block">{c.role}</span>
                  <span className="mt-1 block font-bold group-hover:text-primary">{c.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{c.summary}</span>
                </span>
                <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
